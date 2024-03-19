// Imports
import jwt from 'jsonwebtoken'

// App Imports
import { SECURITY_SECRET } from 'setup/config/env'

// Auth Response (token and user info)
export default function userAuthResponse(user) {
  user = user.toJSON()

  delete user.password
  if(user.github && user.github.isConnected) {
    delete user.github.access
    delete user.github.info
  }
  if(user.digitalocean && user.digitalocean.isConnected) {
    delete user.digitalocean.access
    delete user.digitalocean.info
  }

  return {
    token: jwt.sign({ id: user._id }, SECURITY_SECRET),
    user: user
  }
}
