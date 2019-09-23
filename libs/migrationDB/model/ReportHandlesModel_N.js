
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "report_handles"

// Define collection schema
const ReportHandles_NSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    report_id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    member_id: mongoose.Types.ObjectId,
    origin_t_currentcy_id: mongoose.Types.ObjectId,
    t_currentcy_id: mongoose.Types.ObjectId,
    ref_transaction_id: mongoose.Types.ObjectId,
    type: { type: String, lowercase: true, trim: true, enum: ["payment", "old_owing", "money_exchange", "other"], default: "other" },
    origin_amount: Number,
    amount: Number,
    note: String,
})
ReportHandles_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,ReportHandles_NSchema,collectionName_N)
