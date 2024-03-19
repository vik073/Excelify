// App imports
import { authCheck } from 'setup/helpers/utils'
import { AuthError } from 'modules/common/errors'
import Formula from 'modules/formula/model'
import formulaCompute from 'modules/formula/mutation/compute'

// Save
export default async function save({ params: { worksheetId, formulas }, auth }) {
  if(authCheck(auth)) {
    try {
      // Steps
      // 1. Save formulas
      // 2. Calculate LHS and RHS
      // 3. Process LHS
      //  3.1 Get all affected mark items (registers)
      //  3.2 Loop over affected mark items and process RHS for each item
      //    3.2.1 Process RHS
      //    3.2.1 Process RHS
      // 4. Compute view
      // 5. Compute table

      let data

      // Formula - save
      const formula = await Formula.findOne({ worksheetId, userId: auth.user._id })

      if(formula) {
        data = await Formula.updateOne({ _id: formula._id }, { formulas })
      } else {
        data = await Formula.create({ worksheetId, formulas, userId: auth.user._id, isDeleted: false })
      }

      // Formula - compute
      await formulaCompute({ params: { worksheetId }, auth })

      return {
        data,
        message: `Formulas were saved successfully.`
      }
    } catch (error) {
      console.log(error)
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
