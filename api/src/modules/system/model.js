// Imports
import mongoose, { Schema } from 'mongoose'

// Collection name
export const collection = 'System'

// Schema
const schema = new Schema({
  event: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },
}, { timestamps: true })

// Model
export default mongoose.model(collection, schema, collection)
