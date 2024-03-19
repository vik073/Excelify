// Imports
import mongoose, { Schema } from 'mongoose'

// App Imports
import params from 'setup/config/params'

// Collection name
export const collection = 'User'

// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    index: true
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    default: params.user.roles.user.key
  },

  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },

  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
    index: true
  }
}, { timestamps: true })

// Model
export default mongoose.model(collection, schema, collection)
