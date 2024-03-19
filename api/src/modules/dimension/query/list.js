// App imports
import { authCheck } from 'setup/helpers/utils'
import { AuthError } from 'modules/common/errors'
import Dimension from 'modules/dimension/model'

// List
export default async function list({ auth }) {
  if(authCheck(auth)) {
    try {
      // Dimension
      const data = await Dimension
        .find({ userId: auth.user._id, isMark: false, isDeleted: false })
        .sort({ createdAt: -1 })
        .populate('userId')

      return {
        data
      }
    } catch (error) {
      throw new Error(`An error occurred. ${ error.message }`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
