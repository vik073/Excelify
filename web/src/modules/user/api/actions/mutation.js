// Imports
import axios from 'axios'

// App imports
import { URL_API } from '../../../../setup/config/env'

// Actions

// Register
export function register(user) {
  return axios.post(URL_API, {
    operation: 'userRegister',
    params: user
  })
}
