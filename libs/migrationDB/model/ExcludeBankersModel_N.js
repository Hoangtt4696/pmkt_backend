
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "exclude_bankers"

// Define collection schema
const ExcludeBankers_NSchema = new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId,
	banker_ids: mongoose.Schema.Types.Mixed,

})
// Load BaseModel
ExcludeBankers_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,ExcludeBankers_NSchema,collectionName_N)