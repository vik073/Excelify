// App imports
import { ENV } from 'setup/config/env';
import params from 'setup/config/params';

// Helpers

// Check development env
export function isDevelopment() {
  return ENV === 'development';
}

// Substring with ...
export function subString(string = '', length = 0, append = true) {
  return string.length > length
    ? `${string.substr(0, length)}${append ? '...' : ''}`
    : string;
}

// Slug
export function slug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Auth check
export function authCheck(auth, role = '', exact = false) {
  return (
    auth &&
    auth.isAuthenticated &&
    auth.user &&
    (role
      ? exact
        ? auth.user.role === role
        : auth.user.role === role ||
          params.user.roles[auth.user.role].access.indexOf(role) !== -1
      : true)
  );
}
