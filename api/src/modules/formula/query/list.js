// App imports
import { authCheck } from 'setup/helpers/utils'
import { AuthError } from 'modules/common/errors'
import Formula from 'modules/formula/model'

// List
export default async function list({ auth }) {
  if(authCheck(auth)) {
    try {
      // Formula
      const data = await Formula
        .find({ userId: auth.user._id, isDeleted: false })
        .sort({ createdAt: -1 })
        .select(['_id', 'name', 'createdAt'])

      return {
        data
      }
    } catch (error) {
      throw new Error(`An error occurred. ${ error.message }`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
