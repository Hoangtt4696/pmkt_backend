
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "account_formula"

// Define collection schema
const _NSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
    account_id: mongoose.Types.ObjectId,
    member_id: mongoose.Types.ObjectId,
    formula_id: mongoose.Types.ObjectId,
    formula_group_id: mongoose.Types.ObjectId,
})
// Load BaseModel
_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,_NSchema,collectionName_N)