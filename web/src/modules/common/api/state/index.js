// Imports
import { action, thunk } from 'easy-peasy';
import axios from 'axios';

// App imports
import { URL_API } from 'setup/config/env';
import params from 'setup/config/params';

// common state
export default {
  // message
  message: {
    success: false,
    message: 'Error',
    open: false
  },

  // message show
  messageShow: thunk(async (actions, payload) => {
    actions.messageSet(payload);

    setTimeout(() => {
      actions.messageHide();
    }, params.common.message.timers.long);
  }),

  // message set
  messageSet: action((state, payload) => {
    state.message = {
      success: payload.success,
      message: payload.message,
      open: true
    };
  }),

  // message hide
  messageHide: action((state, payload) => {
    state.message = {
      success: false,
      message: 'Error',
      open: false
    };
  }),

  // upload
  upload: thunk(actions => {
    return axios.post(`${URL_API}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  })
};
