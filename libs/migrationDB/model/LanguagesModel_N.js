
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "languages"

// Define collection schema
const Languages_NSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
    name: String,
    code: String,
    order: Number
})
// Load BaseModel
Languages_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,Languages_NSchema,collectionName_N)