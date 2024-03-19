// Imports
import axios from 'axios';

// App Imports
import { URL_API } from '../../../../../setup/config/env';

// visible toggle
export default function visibleToggle(worksheetId, dimensionId, isVisible) {
  return axios.post(URL_API, {
    operation: 'dimensionVisibleToggle',
    params: { worksheetId, dimensionId, isVisible }
  });
}
