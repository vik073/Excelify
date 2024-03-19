// App imports
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import Item from 'modules/item/model'
import computeView from 'modules/view/mutation/compute'
import computeTable from 'modules/table/mutation/compute'
import formulaCompute from 'modules/formula/mutation/compute'
import Worksheet from 'modules/worksheet/model'
import User from 'modules/user/model'

// Item update
export default async function update({ params: { worksheetId, dimensionId, itemId, value = '' }, auth }) {
  if (authCheck(auth)) {
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
      {
        data: { value: itemId },
        check: 'isNotEmpty',
        message: 'Invalid item.'
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {

      console.log(worksheetId)
      const worksheetDetails = await Worksheet.findOne({ _id: worksheetId, userId: auth.user._id });
      console.log(worksheetDetails)
      const worksheetName = worksheetDetails['name']
      if (worksheetName === 'permissionWorksheet') {
        const check = await User.countDocuments({ email: value })
        console.log(check)
        if (check === 0) {
          return {
            success: false,
            message: `user "${value}" doesn't exists, please enter different name.`
          }
        } else {
          // Item - update
          const data = await Item.updateOne({ _id: itemId }, { $set: { value } })

          // Formula - compute
          await formulaCompute({ params: { worksheetId }, auth })

          // View - compute
          await computeView({ params: { worksheetId }, auth })

          // Table - compute
          await computeTable({ params: { worksheetId }, auth })
          return {
            data,
            message: `Item has been saved successfully.`
          }
        }
      }

      else {
        // Item - update
        const data = await Item.updateOne({ _id: itemId }, { $set: { value } })

        // Formula - compute
        await formulaCompute({ params: { worksheetId }, auth })

        // View - compute
        await computeView({ params: { worksheetId }, auth })

        // Table - compute
        await computeTable({ params: { worksheetId }, auth })


        return {
          data,
          message: `Item has been saved successfully.`
        }
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
