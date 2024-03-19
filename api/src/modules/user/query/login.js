// Imports
import bcrypt from 'bcrypt'

// App Imports
import params from 'setup/config/params'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import authResponse from 'modules/user/query/authResponse'
import User from 'modules/user/model'

// Login
export default async function login({ params: { email, password } }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'isValidEmail',
      message: `Please enter your email.`
    },
    {
      data: { value: password },
      check: 'isNotEmpty',
      message: `Please enter valid password.`
    }
  ]

  // Validate
  try {
    v.validate(rules)
  } catch(error) {
    throw new ValidationError(error.message)
  }

  // Check if user exists with same email
  try {
    // Get user
    const user = await User.findOne({ email, isDeleted: false })

    if(user) {
      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (passwordsMatch) {
        return {
          data: authResponse(user),
          message: `Welcome ${ user.email }!`
        }
      }
    } else {
      return {
        success: false,
        message: 'You are not a registered user. Please create an account.'
      }
    }
  } catch (error) {
    throw new Error(`An error occurred. ${ error.message }`)
  }

  throw new AuthError('You are not authorized to perform this action')
}