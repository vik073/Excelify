// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../../setup/config/env'

// Table compute
export default function compute(worksheetId) {
  return axios.post(URL_API, {
    operation: 'tableCompute',
    params: { worksheetId }
  })
}
