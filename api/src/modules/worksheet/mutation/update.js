// App imports
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import Worksheet from 'modules/worksheet/model'

// Update
export default async function update({ params: { worksheetId, name }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: worksheetId },
        check: 'isNotEmpty',
        message: 'Invalid worksheet.'
      },
      {
        data: { value: name },
        check: 'isNotEmpty',
        message: 'Invalid name.'
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

      const data = await Worksheet.updateOne({ _id: worksheetId, userId: auth.user._id }, { $set: fields })

      return {
        data,
        message: `Worksheet has been saved successfully.`
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
