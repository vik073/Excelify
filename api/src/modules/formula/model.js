// Imports
import mongoose, { Schema } from 'mongoose'

// App imports
import { collection as User } from 'modules/user/model'
import { collection as Worksheet } from 'modules/worksheet/model'

// Collection name
export const collection = 'Formula'

// Schema
const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
    index: true
  },

  worksheetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Worksheet,
    index: true
  },

  formulas: {
    type: String,
    required: true,
  }
}, { timestamps: true })

// Model
export default mongoose.model(collection, schema, collection)
