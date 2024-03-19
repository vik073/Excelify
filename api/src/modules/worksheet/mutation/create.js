// App imports
import { authCheck, getRandomColor } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import params from 'setup/config/params'
import { AuthError, ValidationError } from 'modules/common/errors'
import Worksheet from 'modules/worksheet/model'
import Dimension from 'modules/dimension/model'
import Item from 'modules/item/model'
import Relationship from 'modules/relationship/model'
import viewSave from 'modules/view/mutation/save'
import viewCompute from 'modules/view/mutation/compute'
import tableCompute from 'modules/table/mutation/compute'

// Create
export default async function create({ params: { _id, name, template }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: name },
        check: 'isNotEmpty',
        message: 'Invalid name.'
      },
      {
        data: { value: template },
        check: 'isNotEmpty',
        message: 'Invalid template.'
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {
      const fields = { name }

      // Worksheet
      let worksheet

      const check = await Worksheet.countDocuments({ name })
      if (check === 0) {
        worksheet = await Worksheet.create({ ...fields, userId: auth.user._id, isDeleted: false })
      } else {
        return {
          success: false,
          message: `Worksheet "${name}" already exists, please enter different name.`
        }
      }

      if (worksheet) {
        let dimensions = []
        let dimensionsRow = []
        let dimensionsCol = []
        let dimensionsMark = []

        // Dimension mark
        const dimensionEmpty = await Dimension.create({
          userId: auth.user._id,
          name: '',
          color: getRandomColor(),
          isMark: true
        })

        // Dimension - Mark - Item - Relationships
        const dimensionEmptyItemRelationship =
          await Relationship.create({ worksheetId: worksheet._id, relationships: [] })

        // Dimension - Mark - Item
        await Item.create({
          dimensionId: dimensionEmpty._id,
          relationshipId: dimensionEmptyItemRelationship._id,
          value: '',
        })

        // View - Row Dimensions
        dimensionsRow = []

        // View - Col Dimensions
        dimensionsCol = []

        // View - Mark Dimension
        dimensionsMark = [
          dimensionEmpty._id
        ]

        dimensions.push(dimensionEmpty._id)

        // View - save
        await viewSave({ params: { worksheetId: worksheet._id, dimensionsRow, dimensionsCol, dimensionsMark }, auth })

        // View - compute
        await viewCompute({ params: { worksheetId: worksheet._id }, auth })

        // Table - compute
        await tableCompute({ params: { worksheetId: worksheet._id }, auth })

        await Worksheet.updateOne({ _id: worksheet._id }, { dimensions })
      }

      return {
        data: worksheet,
        message: `Worksheet has been saved successfully.`
      }
    } catch (error) {
      console.log(error)
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
