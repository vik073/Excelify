// App imports
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import Dimension from 'modules/dimension/model'

// Item update
export default async function update({ params: { worksheetId, dimensionId, isVisible }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: worksheetId },
        check: 'isNotEmpty',
        message: 'Invalid worksheet.'
      },
      {
        data: { value: dimensionId },
        check: 'isNotEmpty',
        message: 'Invalid dimension.'
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {
      const data = await Dimension.updateOne({ _id: dimensionId, worksheetId }, { $set: { isVisible } })

      return {
        data,
        message: `Dimension toggle state has been saved successfully.`
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
