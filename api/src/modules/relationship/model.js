// Imports
import mongoose, { Schema } from 'mongoose'

// App imports
import { collection as Worksheet } from 'modules/worksheet/model'

// Collection name
export const collection = 'Relationship'

// Schema
const schema = new Schema({
  worksheetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Worksheet,
    index: true
  },

  relationships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, { timestamps: true })

// Model
export default mongoose.model(collection, schema, collection)
