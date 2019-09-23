import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"

// Define collection name
const collectionName = "reports"

// Define collection schema
const ReportsSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    is_exported: {type: Boolean},
})

ReportsSchema.loadClass(BaseModel)
ReportsSchema.plugin(BaseSchema)

const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ];

ReportsSchema.statics.findAll = (query) => {
    return this.default.find({status: 'active'}).select(excludeFields.join(' '))
        .sort(query.sort)
        .limit(Number(query.limit))
        .skip(Number(query.limit)*Number(query.page - 1))
        .lean()
}


ReportsSchema.statics.reportDetail = report_id => {
    return this.default.findOne({_id: report_id}).select(excludeFields.join(' ')).lean()
}


ReportsSchema.statics.deleteReport = async report_id => {

}

export default mongoose.model(collectionName, ReportsSchema, collectionName)