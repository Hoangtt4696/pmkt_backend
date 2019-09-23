
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "m_currencies"

// Define collection schema
const MCurrenciesModel_NSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
    name: String,
    round_type: Number
})
// Load BaseModel
MCurrenciesModel_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,MCurrenciesModel_NSchema,collectionName_N)