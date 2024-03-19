// Imports
import mongoose, { Schema } from 'mongoose'

// App imports
import { collection as Dimension } from 'modules/dimension/model'
import { collection as Relationship } from 'modules/relationship/model'

// Collection name
export const collection = 'Item'

// Schema
const schema = new Schema({
  dimensionId: {
    type: Schema.Types.ObjectId,
    ref: Dimension,
    index: true
  },

  relationshipId: {
    type: Schema.Types.ObjectId,
    ref: Relationship,
    index: true
  },

  sequence: {
    type: Number
  },

  value: {
    type: String
  },

  isComputed: {
    type: Boolean,
    required: true,
    default: false,
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
