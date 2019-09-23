

import mongoose from '../../query/mongoose'

// Define collection name
const collectionName = "formula_field_value"
const Schema = new mongoose.Schema()
export default mongoose.db.model(collectionName,Schema,collectionName)