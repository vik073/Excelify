// Imports
import randomColor from 'randomcolor'

// App Imports
import params from 'setup/config/params'

// Utility functions

// No operation
export const noop = () => {}

// Generate random number
export function randomNumber(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

// Auth check user (can be also accessed by admin/creator)
export function authCheck(auth) {
  return auth && auth.user
}

// Auth check admin
export function authCheckAdmin(auth) {
  return authCheck(auth) && auth.user.role === params.user.roles.admin.key
}

// Slug
export function slug(text) {
  return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
}

// Random string generator
export function randomString(length) {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for(let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text
}

// Capitalize first letter of string
export function capitalizeFirstLetter(string) {
  return string.replace(/^./, str => str.toUpperCase())
}

export function getRandomColor(seed = null) {
  return randomColor({ luminosity: 'light', hue: 'green', format: 'rgba', alpha: 0.7, seed })
}

export function cartesian(arg) {
  let r = [], max = arg.length-1
  function helper(arr, i) {
    for (let j=0, l=arg[i].length; j<l; j++) {
      let a = arr.slice(0) // clone arr
      a.push(arg[i][j])
      if (i===max)
        r.push(a)
      else
        helper(a, i+1)
    }
  }
  helper([], 0)
  return r
}