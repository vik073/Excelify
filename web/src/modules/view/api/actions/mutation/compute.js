// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../../setup/config/env'

// View compute
export default function compute(worksheetId) {
  return axios.post(URL_API, {
    operation: 'viewCompute',
    params: { worksheetId }
  })
}
