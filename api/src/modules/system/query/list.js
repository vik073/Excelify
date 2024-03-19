// App Imports
import params from 'setup/config/params'
import { authCheckAdmin } from 'setup/helpers/utils'
import { AuthError } from 'modules/common/errors'
import System from 'modules/system/model'

// List
export default async function list({ auth }) {
  if(authCheckAdmin(auth)) {
    try {
      // Get persons
      const data = await System.find().sort({ createdAt: -1 }).limit(params.system.limit.default)

      return {
        data
      }
    } catch (error) {
      throw new Error(`An error occurred. ${ error.message }`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
