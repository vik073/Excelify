// Imports
import { action, thunk } from 'easy-peasy'
import isEmpty from 'lodash/isEmpty'

export default {
  auth: {
    isAuthenticated: false,
    user: null
  },

  // actions
  authSet: action((state, user) => {
    state.auth = {
      isAuthenticated: !isEmpty(user),
      user: user
    }
  }),

  authReset: action(state => {
    state.auth = {
      isAuthenticated: false,
      user: null
    }
  }),

}
