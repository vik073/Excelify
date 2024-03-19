// App imports
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import View from 'modules/view/model'

// Save
export default async function save({ params: { worksheetId, dimensionsRow, dimensionsCol, dimensionsMark }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: worksheetId },
        check: 'isNotEmpty',
        message: 'Invalid worksheet.'
      },
      {
        data: { value: dimensionsMark },
        check: 'isNotEmpty',
        message: 'Invalid dimension mark.'
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {
      const fields = { worksheetId, dimensionsRow, dimensionsCol, dimensionsMark }

      // View - create
      const data = await View.create({ ...fields, userId: auth.user._id })

      return {
        data,
        message: `View has been saved successfully.`
      }
    } catch (error) {
      console.log('viewSave')
      console.log(error)
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
