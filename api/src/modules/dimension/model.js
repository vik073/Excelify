// Imports
import mongoose, { Schema } from 'mongoose'

// App imports
import { collection as User } from 'modules/user/model'

// Collection name
export const collection = 'Dimension'

// Schema
const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
    index: true
  },

  name: {
    type: String
  },

  color: {
    type: String,
    required: true
  },

  isMark: {
    type: Boolean,
    required: true,
    default: false
  },

  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
    index: true
  },
}, { timestamps: true })

// Model
export default mongoose.model(collection, schema, collection)
