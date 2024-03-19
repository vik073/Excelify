// Imports
import axios from 'axios';

// App Imports
import { URL_API } from 'setup/config/env';

// Worksheet create
export default function addPermissionMarkItem(worksheetId, markId) {
    return axios.post(URL_API, {

        operation: 'addPermissionmarkitem',
        params: { worksheetId, markId }
    })
}
