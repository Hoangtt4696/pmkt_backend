import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"

// Define collection name
const collectionName = "bankers"

// Define collection schema
const BankersSchema = new mongoose.Schema({
    book_id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    short_name: {type: String, require: true},
    need_security: Boolean,
    agent_host: [
        {
            url: String
        }
    ],
    url: String,
})

BankersSchema.loadClass(BaseModel)
BankersSchema.plugin(BaseSchema)

const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ]

BankersSchema.statics.findAll = (query) => {
    return this.default.find({status: 'active'}).select(excludeFields.join(' '))
        .sort(query.sort)
        .limit(Number(query.limit))
        .skip(Number(query.limit)*Number(query.page - 1))
        .lean()
}


BankersSchema.statics.updateHostBanker = item => {
    return this.default.findOneAndUpdate(
        {_id: item.banker_id, "agent_host._id": item.host_id},
        {
            '$set': {
                'agent_host.$.url': item.host_url,
            }
        },
        {new: true}
    ).select(excludeFields.join(' ')).lean()
}


BankersSchema.statics.createHostBanker = item => {
    let data = {
        url: item.host_url,
    }
    return this.default.findOneAndUpdate(
        {_id: item.banker_id},
        { $push: {"agent_host": data}},
        {new: true}
    ).select(excludeFields.join(' ')).lean()
}


BankersSchema.statics.deleteHostBanker = item => {
    return this.default.findOneAndUpdate(
        {_id: item.banker_id},
        { $pull: {"agent_host": {_id: item.host_id}}},
        {new: true}
    ).select(excludeFields.join(' ')).lean()
}


BankersSchema.statics.checkBanker = async id => {
    const result = await this.default.findOne({_id: id})

    return !!result
}

BankersSchema.statics.checkHostBanker = async (banker_id, host_id) => {
    const result = await this.default.findOne({_id: banker_id, "agent_host._id": host_id})

    return !!result
}


// Export Model
export default mongoose.model(collectionName, BankersSchema, collectionName)
