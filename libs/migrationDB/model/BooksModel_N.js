
import mongoose from "../query/mongoose"

import {BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "books"

// Define collection schema
const Books_NSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,

})
// Load BaseModel
Books_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,Books_NSchema,collectionName_N)