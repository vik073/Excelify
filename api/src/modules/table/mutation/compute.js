// App imports
import params from 'setup/config/params'
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import View from 'modules/view/model'
import Item from 'modules/item/model'
import Dimension from 'modules/dimension/model'
import Table from 'modules/table/model'

// Compute
export default async function compute({ params: { worksheetId }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: worksheetId },
        check: 'isNotEmpty',
        message: 'Invalid worksheet to compute.'
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {
      // 1. get the Dimension which is mark
      // 2. get all dimensions which are dimension create hash map of dimensions
      // 3. get all Items with dimensionId of above mark
      // 4. map each mark with it's relationship dimension

      let table = []

      const view = await View.findOne({ worksheetId, userId: auth.user._id })

      // 1. get the Dimension which is a mark
      const dimensionMark = await Dimension.findOne({ _id: view.dimensionsMark[0], userId: auth.user._id })

      let rowHeader = [
        {
          _id: dimensionMark._id,
          value: dimensionMark.name,
        }
      ]

      // 2. get all dimensions which are dimension and create hash map of dimensions
      const dimensionsDimension = await Dimension.find({ _id: { $in: [...view.dimensionsRow, ...view.dimensionsCol] }, userId: auth.user._id })
      for(const c of dimensionsDimension) {
        rowHeader.push({
          _id: c._id,
          value: c.name
        })
      }

      table.push(rowHeader)

      // 3. get all Items with dimensionId of above mark
      const itemsMarks = await Item.find({ dimensionId: dimensionMark._id }).populate('relationshipId')

      const itemsDimensions = await Item.find({ dimensionId: { $ne: dimensionMark._id } })
      const itemDimensionsDimensionIdMap = {}
      for(const i of itemsDimensions) {
        itemDimensionsDimensionIdMap[i._id] = {
          _id: i.dimensionId,
          value: i.value
        }
      }

      // 4. map each mark with it's relationship dimension
      for(const item of itemsMarks) {
        let rowBody = [{
          _id: item._id,
          value: item.value
        }]

        for(const dimension of dimensionsDimension) {
          for(const itemId of item.relationshipId.relationships) {
            if((dimension && itemDimensionsDimensionIdMap[itemId]) && dimension._id.toString() === itemDimensionsDimensionIdMap[itemId]._id.toString()) {
              rowBody.push({
                _id: itemDimensionsDimensionIdMap[itemId]._id,
                value: itemDimensionsDimensionIdMap[itemId].value,
              })
            }
          }
        }

        table.push(rowBody)
      }

      const tableExisting = await Table.findOne({ worksheetId, userId: auth.user._id })
      if(tableExisting) {
        await Table.updateOne({ worksheetId, userId: auth.user._id }, { $set: { view: table } })
      } else {
        await Table.create({ worksheetId, userId: auth.user._id, view: table })
      }

      return {
        data: table
      }
    } catch (error) {
      console.log('tableCompute')
      console.log(error)

      throw new Error(`An error occurred. ${ error.message }`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
