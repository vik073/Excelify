// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// dimension add from library
export default function dimensionAddFromLibrary(worksheetId, dimensionId) {
  return axios.post(URL_API, {
    operation: 'worksheetDimensionAddFromLibrary',
    params: { worksheetId, dimensionId }
  })
}
