// Imports
import axios from 'axios';

// App Imports
import { URL_API } from '../../../../../setup/config/env';

// Get detail
export default function detail(itemId) {
  return axios.post(URL_API, {
    operation: 'itemDetail',
    params: { itemId }
  });
}
