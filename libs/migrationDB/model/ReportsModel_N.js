
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "reports"

// Define collection schema
const Reports_NSchema = new mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        user_id: mongoose.Types.ObjectId,
        name: String,
        is_exported: Boolean
})

Reports_NSchema.plugin(BaseSchema_N)


export default mongoose.db_N.model(collectionName_N,Reports_NSchema,collectionName_N)