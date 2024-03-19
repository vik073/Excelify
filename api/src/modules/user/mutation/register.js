// Imports
import bcrypt from 'bcrypt'
import React from 'react'

// App imports
import { SECURITY_SALT_ROUNDS } from 'setup/config/env'
import v from 'setup/helpers/validation'
import params from 'setup/config/params'
import { AuthError, ValidationError } from 'modules/common/errors'
import User from 'modules/user/model'

// User register
export default async function register({ params: { name, email, password } }) {
  // Validation rules
  const rules = [
    {
      data: { value: name },
      check: 'isNotEmpty',
      message: 'Please enter your name.'
    },
    {
      data: { value: email },
      check: 'isValidEmail',
      message: 'Please enter your valid email address.'
    },
    {
      data: { value: password },
      check: 'isNotEmpty',
      message: 'Please enter a valid password.'
    },
  ]

  // Validate
  try {
    v.validate(rules)
  } catch (error) {
    throw new ValidationError(error.message)
  }

  try {
    // User - check if already exists
    let user = await User.findOne({ email, isDeleted: false })

    if (!user) {
      // User - create
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(`${ password }`, SECURITY_SALT_ROUNDS),
        role: params.user.roles.user.key,
        isVerified: false,
        isDeleted: false
      })

      if (user) {
        return {
          data: true,
          message: `Thanks for signing up!`
        }
      }
    } else {
      return {
        success: false,
        data: false,
        message: `You have already registered.`
      }
    }
  } catch (error) {
    throw new Error(`An error occurred. ${ error.message }`)
  }

  throw new AuthError('You are not authorized to perform this action.')
}
