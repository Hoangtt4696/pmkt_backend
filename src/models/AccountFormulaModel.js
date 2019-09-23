import mongoose from 'mongoose'
import _isEmpty from 'lodash/isEmpty'

import BaseModel, { BaseSchema, ExcludeFields } from '../utils/mongoose/BaseModel'
import Session from '../utils/Session'

// Define collection name
const collectionName = 'account_formula'

// Define collection schema
const Schema = mongoose.Schema
const AccountFormulaSchema = new mongoose.Schema({
    account_id: { type: Schema.Types.ObjectId, required: true },
    member_id: { type: Schema.Types.ObjectId, required: true },
    formula_id: { type: Schema.Types.ObjectId, required: true },
    formula_group_id: { type: Schema.Types.ObjectId, default: null },
})

// Load BaseModel
AccountFormulaSchema.loadClass(BaseModel)
AccountFormulaSchema.plugin(BaseSchema)

// Load Exclude Fields
const excludeFields = [ ...ExcludeFields ]

// Defined methods
AccountFormulaSchema.statics.findDoc = ({ options = {}, terms = {}} = {}) => {
    options.status = 'active'

    terms = this.default.parseQuery(terms)

    let query = this.default.find(options)

    if (terms.sort) query = query.sort(terms.sort)

    if (Number(terms.limit) > 0) {
        const skip = Number(terms.page) > 0
            ? (Number(terms.page) - 1) * Number(terms.limit)
            : 0

        query = query.limit(Number(terms.limit)).skip(skip)
    }

    return query.select(excludeFields.join(' ')).lean()
}

AccountFormulaSchema.statics.checkExisted = async (options) => {
    if (!options || _isEmpty(options)) return false

    options.status = 'active'
    options.user_id = Session.get('user._id')

    const result = await this.default.countDocuments(options)

    return !!result
}

AccountFormulaSchema.statics.createDoc = formData => {
    let query = null

    if (Array.isArray(formData)) {
        query = Promise.all(formData.map(item => this.default.findOneAndUpdate(
            {
                status: 'active',
                account_id: item.account_id,
                member_id: item.member_id,
                formula_id: item.formula_id
            },

            { ...item, status: 'active' },
            { upsert: true, new: true, setDefaultsOnInsert: true })
        ))
    } else {
        query = this.default.findOneAndUpdate(
            {
                status: 'active',
                account_id: formData.account_id,
                member_id: formData.member_id,
                formula_id: formData.formula_id
            },
            { ...formData, status: 'active' },
            { upsert: true, new: true, setDefaultsOnInsert: true })
    }

    return query.select(excludeFields.join(' ')).lean()
}

AccountFormulaSchema.statics.updateDoc = (id, { formData }) => {
    delete formData.status
    delete formData.name

    return this.default.findByIdAndUpdate(id, formData, { new: true })
        .select(excludeFields.join(' '))
        .lean()
}

// Export Model
export default mongoose.model(collectionName, AccountFormulaSchema, collectionName)