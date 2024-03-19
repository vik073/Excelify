// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config({ path: '.env.local' })

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Security
export const SECURITY_SECRET = process.env.SECURITY_SECRET
export const SECURITY_SALT_ROUNDS = parseInt(process.env.SECURITY_SALT_ROUNDS)

// Port
export const PORT = process.env.PORT

// Database
export const DATABASE_URL = process.env.DATABASE_URL

// URL
export const URL_API = process.env.URL_API
export const URL_WEB = process.env.URL_WEB
