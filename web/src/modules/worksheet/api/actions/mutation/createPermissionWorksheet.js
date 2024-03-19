// Imports
import axios from 'axios';

// App Imports
import { URL_API } from 'setup/config/env';

// Worksheet create
export default function createPermissions(worksheet) {
  return axios.post(URL_API, {
    operation: 'permissionWorksheetCreate',
    params: worksheet
  })
}
