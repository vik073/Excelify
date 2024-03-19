// Imports
import mongoose, { Schema } from 'mongoose'

// App imports
import { collection as User } from 'modules/user/model'
import { collection as Worksheet } from 'modules/worksheet/model'
import { collection as Dimension } from 'modules/dimension/model'

// Collection name
export const collection = 'View'

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

  // Array of Ids for Row Dimensions in view "matrix"
  dimensionsRow: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Dimension
  }],

  // Array of Ids for Col Dimensions in view "matrix"
  dimensionsCol: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Dimension
  }],

  // Array of Ids for Mark Dimensions in view "matrix"
  dimensionsMark: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Dimension
  }],

  // config (span, depth) of dimensions for Row and Col Dimensions in view "matrix"
  dimensionConfig: Object,

  // computed view
  matrix: Array,

}, { timestamps: true })

// Model
export default mongoose.model(collection, schema, collection)
