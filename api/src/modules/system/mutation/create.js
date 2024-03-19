// App Imports
import params from 'setup/config/params'
import v from 'setup/helpers/validation'
import System from 'modules/system/model'

// Create
export default async function create({ params: { event, type = params.system.types.api.key } }) {
  // Validation rules
  const rules = [
    {
      data: { value: event },
      check: 'isNotEmpty',
      message: 'Invalid event.'
    },
    {
      data: { value: type },
      check: 'isNotEmpty',
      message: 'Invalid type.'
    },
  ]

  // Validate
  try {
    v.validate(rules)
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    // System
    const data = await System.create({ event, type })

    return {
      data,
      message: `System entry has been created successfully.`
    }
  } catch (error) {
    throw new Error(`An error occurred. ${ error.message }`)
  }
}
