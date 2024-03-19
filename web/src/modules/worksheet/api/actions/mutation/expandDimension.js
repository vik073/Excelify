// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// Worksheet expand dimension
export default function expandDimension(worksheetId, axis) {
  return axios.post(URL_API, {
    operation: 'worksheetExpandDimension',
    params: { worksheetId, axis }
  })
}
