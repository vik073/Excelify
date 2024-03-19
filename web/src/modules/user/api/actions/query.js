// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../setup/config/env'

// Actions

// Login
export function login({ email, password }) {
  return axios.post(URL_API, {
    operation: 'userLogin',
    params: { email, password }
  })
}

// Logout user and remove token from localStorage
export function logout() {
  logoutUnsetUserLocalStorage()

  delete axios.defaults.headers.common['Authorization']

  // Clear cache
  for (let key in localStorage) {
    if (key.indexOf('CACHE.KEY.') !== -1) {
      window.localStorage.removeItem(key)
    }
  }
}

// Set user token and info in localStorage and axios auth headers
export function loginSetUserLocalStorage(token, user) {
  if (token) {
    axios.defaults.headers.common['Authentication'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authentication'];
  }

  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorage() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('permissionWorksheetsOpened')
}

// Clear application cache
export function clearApplicationCache() {
  // Clear cache
  for (let key in localStorage) {
    if (key.indexOf('CACHE.KEY.') !== -1) {
      window.localStorage.removeItem(key)
    }
  }

  window.localStorage.removeItem('worksheetsOpened')
  window.localStorage.removeItem('worksheetActive')
}
