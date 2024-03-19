// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// Get detail
export default function detail(worksheetId) {
  return axios.post(URL_API, {
    operation: 'worksheetDetail',
    params: { worksheetId }
  })
}
