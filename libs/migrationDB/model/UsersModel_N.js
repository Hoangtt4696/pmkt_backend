
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "users"

// Define collection schema
const Users_NSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	parent_id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    password2:String,
    role: Number,
    secure_code: Number,
    login_failed: Number,
    login_ip: String,
    lang_code: String,
    allow_export: Boolean,
    allow_report_detail: Boolean,
    enable_start: Date,
    enable_end: Date,
    old_password: String,
    is_updated_password: Boolean,
    old_password2: String,
    is_updated_password2: Boolean,
    is_lock: Boolean
})
// Load BaseModel
Users_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,Users_NSchema,collectionName_N)