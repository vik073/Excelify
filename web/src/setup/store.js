// Imports
import { createStore } from 'easy-peasy';

// App Imports
import common from '../modules/common/api/state';
import user from '../modules/user/api/state';
import dimension from '../modules/dimension/api/state';
import worksheet from '../modules/worksheet/api/state';

// Store
export default createStore({
  common,
  user,
  dimension,
  worksheet
});
