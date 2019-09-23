
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "bankers"

// Define collection schema
const Bankers_NSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	book_id: mongoose.Schema.Types.ObjectId,
	name: String,
	short_name: String,
	need_security: Boolean,
	agent_host: [
		{
			_id: mongoose.Schema.Types.ObjectId,
			url: String
		}
	],
	url: String,

})

// Load BaseModel
Bankers_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,Bankers_NSchema,collectionName_N)