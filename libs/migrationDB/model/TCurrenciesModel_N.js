
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "t_currencies"

// Define collection schema
const TCurrenciesModel_NSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    m_currency_id: mongoose.Types.ObjectId,
    round_type: Number,
    note: String
})
// Load BaseModel
TCurrenciesModel_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,TCurrenciesModel_NSchema,collectionName_N)