import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"

// Define collection name
const collectionName = "m_currencies"

// Define collection schema
const MCurrenciesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    round_type: {type: Number, required: true},
})

MCurrenciesSchema.loadClass(BaseModel)
MCurrenciesSchema.plugin(BaseSchema)

const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ];

MCurrenciesSchema.statics.findAll = (query) => {
    return this.default.find({status: 'active'}).select(excludeFields.join(' '))
        .sort(query.sort)
        .limit(Number(query.limit))
        .skip(Number(query.limit)*Number(query.page - 1))
        .lean()
}


MCurrenciesSchema.statics.mCurrencyDetail = id => {
    return this.default.findOne({_id: id}).select(excludeFields.join(' ')).lean()
}


MCurrenciesSchema.statics.createMCurrency = async item => {
    const data = {
        name: item.name,
        round_type: item.round_type
    }
    await this.default.create(data)
    return this.default.findOne({name: item.name}).select(excludeFields.join(' ')).lean()
}


MCurrenciesSchema.statics.updateMCurrency = item => {
    const data = {
        name: item.name,
        round_type: item.round_type,
    }
    return this.default.findOneAndUpdate({_id: item.currency_id}, data, {new: true}).select(excludeFields.join(' '))
}


MCurrenciesSchema.statics.checkId = (id) => {
    const idTest = new mongoose.Types.ObjectId(id)
    return idTest.toString() === id
}


MCurrenciesSchema.statics.checkExists = async params => {

    let result
    switch (params.type) {
        case 'name':
            result = await this.default.findOne({status: 'active', name: params.name.toUpperCase()})
            break
        case 'id':
            result = await this.default.findOne({status: 'active', _id: params.id})
            break
        default:
            return
    }

    return !!result
}


MCurrenciesSchema.statics.checkCurrency = async (name, m_currency_id) => {
    const currency = await this.default.findOne({status: 'active', name: name, _id: { $nin: m_currency_id}}).lean()

    return !!currency
}

export default mongoose.model(collectionName, MCurrenciesSchema, collectionName)