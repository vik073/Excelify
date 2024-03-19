// App imports
import { authCheck } from 'setup/helpers/utils'
import { AuthError } from 'modules/common/errors'
import View from 'modules/view/model'

// Detail
export default async function detail({ params: { worksheetId }, auth }) {
  if(authCheck(auth)) {
    try {
      // Worksheet
      const data = await View
        .findOne({ userId: auth.user._id, worksheetId })
        .populate([
          { path: 'worksheetId' },
          { path: 'dimensionsRow', populate: 'userId' },
          { path: 'dimensionsCol', populate: 'userId' },
          { path: 'dimensionsMark', populate: 'userId' }
        ])

      return {
        data
      }
    } catch (error) {
      throw new Error(`An error occurred. ${ error.message }`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
