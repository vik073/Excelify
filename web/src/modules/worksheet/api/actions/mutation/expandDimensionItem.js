// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// Worksheet expand dimension item
export default function expandDimensionItem({ dimensionItem, value }) {
  return axios.post(URL_API, {
    operation: 'worksheetExpandDimensionItem',
    params: { dimensionItem, value }
  })
}
