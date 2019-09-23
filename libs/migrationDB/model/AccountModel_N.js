
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "accounts"

// Define collection schema
const _NSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    banker_id: mongoose.Types.ObjectId,
    parent_id: mongoose.Types.ObjectId,
    name: String,
    checked: Boolean,
    is_confirm: Boolean,
    is_sub: Boolean,
    sub_user: String,
    sub_pass: String,
    sub_code: String,
    sub_login_num: Number,
    sub_locked: Boolean,
    sub_locked_reason: String,
    flag_type: Number,
    data_center_sync: Boolean,
    banker_locked: Boolean,
    banker_locked_reason: String
})
// Load BaseModel
_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,_NSchema,collectionName_N)