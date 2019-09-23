import mongoose from 'mongoose'
import _isEmpty from 'lodash/isEmpty'

import BaseModel, { BaseSchema, ExcludeFields } from "../utils/mongoose/BaseModel"
import Session from '../utils/Session'
// Define collection name
const collectionName = "formulas"

// Define collection schema
const FormulasSchema = new mongoose.Schema({
    banker_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    t_currency_id: mongoose.Schema.Types.ObjectId,
    formula_format_id: mongoose.Schema.Types.ObjectId,
    name: String,
    fields: [{
        formula_field_id: mongoose.Schema.Types.ObjectId,
        value: Number
    }],
    rec_pay: Number
})

FormulasSchema.virtual('total_accounts', {
    ref: 'account_formula', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'formula_id', // is equal to `foreignField`
    count: true // And only get the number of docs
})

// Load BaseModel
FormulasSchema.loadClass(BaseModel)
FormulasSchema.plugin(BaseSchema)

const excludeFields = [ ...ExcludeFields ]

FormulasSchema.statics.findDoc = ({ options = {}, terms = {} } = {}) => {
    options.status = 'active'
    options.user_id = Session.get('user._id')

    terms = this.default.parseQuery(terms)

    let query = this.default.find(options)

    if (terms.sort) query = query.sort(terms.sort)

    if (Number(terms.limit) > 0) {
        const skip = Number(terms.page) > 0
            ? (Number(terms.page) - 1) * Number(terms.limit)
            : 0

        query = query.limit(Number(terms.limit)).skip(skip)
    }

    return query.populate('total_account').select(excludeFields.join(' ')).lean()
}

FormulasSchema.statics.checkExisted = async (options) => {
    if (!options || _isEmpty(options)) return false

    options.status = 'active'
    options.user_id = Session.get('user._id')

    const result = await this.default.countDocuments(options)

    return !!result
}

FormulasSchema.statics.createDoc = formData => {
    const options = {
        status: 'active',
        user_id: Session.get('user._id'),
        banker_id: formData.banker_id,
        name: formData.name
    };

    formData.status = 'active'
    formData.user_id = Session.get('user._id')

    return this.default.findOneAndUpdate(options, formData, { upsert: true, new: true })
        .select(excludeFields.join(' '))
        .lean()
}

FormulasSchema.statics.updateDoc = (id, { formData }) => {
    delete formData.status
    delete formData.banker_id

    return this.default.findByIdAndUpdate(id, formData, { new: true })
        .select(excludeFields.join(' '))
        .lean()
}

export default mongoose.model(collectionName, FormulasSchema, collectionName)


