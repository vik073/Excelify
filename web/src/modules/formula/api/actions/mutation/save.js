// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// Formula save
export default function save({ worksheetId, formulas }) {
  return axios.post(URL_API, {
    operation: 'formulaSave',
    params: { worksheetId, formulas }
  })
}
