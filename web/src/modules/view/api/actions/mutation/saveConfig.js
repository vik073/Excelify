// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../../setup/config/env'

// View save config
export default function saveConfig(view) {
  return axios.post(URL_API, {
    operation: 'viewSaveConfig',
    params: view
  })
}
