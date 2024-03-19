// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// Worksheet update
export default function update(worksheet) {
  return axios.post(URL_API, {
    operation: 'worksheetUpdate',
    params: worksheet
  })
}
