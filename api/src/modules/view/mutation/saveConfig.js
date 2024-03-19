// App imports
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import View from 'modules/view/model'
import viewCompute from 'modules/view/mutation/compute'

// Save config
export default async function saveConfig({ params: { viewId, dimensionsRow, dimensionsCol, dimensionsMark }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: viewId },
        check: 'isNotEmpty',
        message: 'Invalid worksheet.'
      },
      {
        data: { value: dimensionsRow },
        check: 'isNotEmpty',
        message: 'Invalid dimensions row.'
      },
      {
        data: { value: dimensionsCol },
        check: 'isNotEmpty',
        message: 'Invalid dimensions column.'
      },
      {
        data: { value: dimensionsMark },
        check: 'isNotEmpty',
        message: 'Invalid dimensions mark.'
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {
      // View - update
      const data = await View.updateOne(
        { _id: viewId, userId: auth.user._id },
        { $set: { dimensionsRow, dimensionsCol, dimensionsMark } }
      )

      // View - find
      const view = await View.findOne({ _id: viewId })

      // View - compute
      await viewCompute({ params: { worksheetId: view.worksheetId }, auth })

      return {
        data,
        message: `View has been saved successfully.`
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
