// Imports
import moment from 'moment'

// App imports
import { authCheck } from 'setup/helpers/utils'
import { AuthError } from 'modules/common/errors'
import Worksheet from 'modules/worksheet/model'
import View from 'modules/view/model'
import Table from 'modules/table/model'
import Formula from 'modules/formula/model'
import viewCompute from 'modules/view/mutation/compute'

// Detail
export default async function detail({ params: { worksheetId }, auth }) {
  if (authCheck(auth)) {
    try {
      // @todo
      // await viewCompute({ params: { worksheetId }, auth })

      // Worksheet - find
      const worksheet = await Worksheet.findOne({ _id: worksheetId, userId: auth.user._id, isDeleted: false })

      // View - find
      const view = await View
        .findOne({ worksheetId: worksheet._id, userId: auth.user._id })
        .populate([
          { path: 'worksheetId' },
          { path: 'dimensionsRow', populate: 'userId' },
          { path: 'dimensionsCol', populate: 'userId' },
          { path: 'dimensionsMark', populate: 'userId' }
        ])

      // Table - find
      const table = await Table.findOne({ worksheetId: worksheet._id, userId: auth.user._id })

      // Formula - find
      const formula = await Formula.findOne({ worksheetId: worksheet._id, userId: auth.user._id })

      const lastelement = await Formula.findOne({ worksheetId: worksheet._id, userId: auth.user._id })

      return {
        data: {
          worksheet,
          view,
          table,
          formula,
          timestamp: moment().unix()
        }
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
