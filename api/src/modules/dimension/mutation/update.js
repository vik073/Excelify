// App imports
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import Dimension from 'modules/dimension/model'

// Item update
export default async function update({ params: { dimensionId, name = '' }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
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
      const checkDuplicateName = await Dimension.findOne({ name, userId: auth.user._id, })

      if(!checkDuplicateName) {
        const data = await Dimension.updateOne({ _id: dimensionId, userId: auth.user._id }, { $set: { name } })

        return {
          data,
          message: `Dimension has been saved successfully.`
        }
      } else {
        return {
          success: false,
          message: `Dimension "${ name }" already exists, please enter different name.`
        }
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
