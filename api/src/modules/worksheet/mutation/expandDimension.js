// App imports
import { authCheck, getRandomColor } from 'setup/helpers/utils'
import params from 'setup/config/params'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import View from 'modules/view/model'
import Item from 'modules/item/model'
import Dimension from 'modules/dimension/model'
import Relationship from 'modules/relationship/model'
import Worksheet from 'modules/worksheet/model'
import viewCompute from 'modules/view/mutation/compute'
import tableCompute from 'modules/table/mutation/compute'
import dimensionMap from 'modules/worksheet/mutation/dimensionMap'

// Expand
export default async function expandDimension({ params: { worksheetId, axis }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: worksheetId },
        check: 'isNotEmpty',
        message: 'Invalid worksheet.'
      },
      {
        data: { value: axis },
        check: 'isNotEmpty',
        message: 'Invalid axis to expand.'
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    // 1. Add a new dimension at the max depth of that axis +1
    // 2. Add new item with seq=0, newCatId,
    // 3. Force inheritance to all marks in view. (because of one-many)
    // 4. update 'view' config,
    // 5. map new dimension to worksheet
    // 6. compute view
    // 7. compute table

    try {
      // Add a new dimension at the max depth of that axis +1
      // Dimension - create
      const dimension = await Dimension.create({
        userId: auth.user._id,
        name: ``,
        color: getRandomColor()
      })

      // 2. Add new item with seq=0, newCatId,
      // Item - create
      const dimensionItem = await Item.create({
        worksheetId,
        dimensionId: dimension._id,
        sequence: 0,
        value: '',
      })

      // 3. Force inheritance to all marks in view. (because of one-many)
      // Item - update
      await Relationship.updateMany({ worksheetId }, { $push: { relationships: dimensionItem._id } }, { multi: true })

      // 4. update 'view' config, compute the span there
      let viewUpdateQuery = {}

      // col
      if(axis === params.common.axis.col.key) {
        viewUpdateQuery = { $push: { dimensionsCol: dimension._id } }
      }

      // row
      if(axis === params.common.axis.row.key) {
        viewUpdateQuery = { $push: { dimensionsRow: dimension._id } }
      }

      // View - update
      await View.updateOne({ worksheetId }, viewUpdateQuery)

      // 5. map new dimension to worksheet
      await dimensionMap({ worksheetId, dimensionId: dimension._id })

      // 6. compute view
      await viewCompute({ params: { worksheetId }, auth })

      // 7. compute table
      await tableCompute({ params: { worksheetId }, auth })

      return {
        data: dimension,
        message: `Dimension has been created.`
      }
    } catch (error) {
      console.log(error)
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
