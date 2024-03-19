// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../../setup/config/env'

// Item save
export default function save(item) {
  return axios.post(URL_API, {
    operation: 'itemUpdate',
    params: item
  })
}
