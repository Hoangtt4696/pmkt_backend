import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"
import Session from '../utils/Session'
import MCurrenciesModel from "./MCurrenciesModel";

// Define collection name
const collectionName = "t_currencies"

// Define collection schema
const Schema = mongoose.Schema
const TCurrenciesSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    m_currency_id: { type: Schema.Types.ObjectId, required: true, ref: 'MCurrency' },
    round_type: {type: Number, required: true},
    note: String,
})

TCurrenciesSchema.virtual('total_formulas', {
    ref: 'formulas', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 't_currency_id', // is equal to `foreignField`
    count: true // And only get the number of docs
})

TCurrenciesSchema.loadClass(BaseModel)
TCurrenciesSchema.plugin(BaseSchema)

const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ]


TCurrenciesSchema.statics.findAll = (query) => {
    const option = {
        status : 'active',
        user_id: mongoose.Types.ObjectId(Session.get('user._id'))
    }
    return this.default.find(option).select(excludeFields.join(' '))
        .populate("total_formulas")
        .populate({ model: MCurrenciesModel,
                    path: "m_currency_id",
                    select: "name",})
        .sort(query.sort)
        .limit(Number(query.limit))
        .skip(Number(query.limit)*Number(query.page - 1))
        .lean()
}


TCurrenciesSchema.statics.saveConfig = async (type, data) => {

    if(data.length === 0){
        return this.default.updateMany({user_id: Session.get('user._id')}, {$set:{status: "delete"}})
    } else {
        switch (type) {
            case "all":
                let ids = []
                data.forEach( async item => {
                    ids.push(item.m_currency_id)
                    const result = await TCurrenciesSchema.statics.checkExists(item)

                    await result ? TCurrenciesSchema.statics.updateTCurrencies(item) : TCurrenciesSchema.statics.createTCurrencies(item)
                })
                await TCurrenciesSchema.statics.updateStatus(ids)
                break

            case "single":
                data.forEach( async item => {
                    const result = await TCurrenciesSchema.statics.checkExists(item)

                    result ? TCurrenciesSchema.statics.updateTCurrencies(item) : TCurrenciesSchema.statics.createTCurrencies(item)
                })
                break

            default:
                return
        }
    }
}


TCurrenciesSchema.statics.checkExists = async item => {
    const result = await this.default.findOne({m_currency_id: item.m_currency_id, user_id: Session.get('user._id')})

    return !!result
}


TCurrenciesSchema.statics.createTCurrencies = item => {
    const data = {
        user_id: Session.get('user._id'),
        m_currency_id: item.m_currency_id,
        round_type: item.round_type,
        note: ''
    }
    return this.default.create(data)
}


TCurrenciesSchema.statics.updateTCurrencies = item => {
    const data = {
        round_type: item.round_type,
        status: "active"
    }
    return this.default.updateOne({m_currency_id: item.m_currency_id}, data, {new: true})
}


TCurrenciesSchema.statics.updateStatus = (ids) => {

    return this.default.updateMany({user_id: Session.get('user._id'), m_currency_id: { $nin: ids}}, {status: "delete"}, {new: true})
}

export default mongoose.model(collectionName, TCurrenciesSchema, collectionName)