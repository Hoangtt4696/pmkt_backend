
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "report_details"

// Define collection schema
const ReportDetails_NSchema = new mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        report_id: mongoose.Types.ObjectId,
        user_id: mongoose.Types.ObjectId,
        member_id: mongoose.Types.ObjectId,
        account_id: mongoose.Types.ObjectId,
        formula_detail: {
            t_currency_id: mongoose.Types.ObjectId,
            formula_id: mongoose.Types.ObjectId,
            formula_format_id: mongoose.Types.ObjectId,
            name: String,
            rec_pay: Number,
            fields: [
                {
                    formula_field_id: mongoose.Types.ObjectId,
                    value: Number
                }
            ],
        },
        // formula_detail: mongoose.Schema.Types.Mixed,
        flag: String,
        amount: Number,
})


ReportDetails_NSchema.plugin(BaseSchema_N)


export default mongoose.db_N.model(collectionName_N,ReportDetails_NSchema,collectionName_N)