// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// Get list
export default function list(worksheets) {
  return axios.post(URL_API, {
    operation: 'formulaList',
    params: { worksheets }
  })
}
