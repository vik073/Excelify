// Imports
import axios from 'axios';

// App Imports
import { URL_API } from '../../../../../setup/config/env';

// Update
export default function update(dimension) {
  return axios.post(URL_API, {
    operation: 'dimensionUpdate',
    params: dimension
  });
}
