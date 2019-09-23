
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "include_bankers"

// Define collection schema
const IncludeBankers_NSchema = new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId,
	banker_ids: [mongoose.Schema.Types.ObjectId],

})
// Load BaseModel
IncludeBankers_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,IncludeBankers_NSchema,collectionName_N)