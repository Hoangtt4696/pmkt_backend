import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import FormulasModel from "./FormulasModel"
import BankersModel from "./BankersModel"
import Session from '../utils/Session'
// Define collection name
const collectionName = "formula_groups"

// Define collection schema
const FormulaGroupSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    name: {type :String, uppercase : true },
    formulas: [mongoose.Schema.Types.ObjectId]
})

// Load BaseModel
FormulaGroupSchema.loadClass(BaseModel)
FormulaGroupSchema.plugin(BaseSchema)

const excludeFields = ['-status -createdAt -updatedAt -createdBy -updatedBy -updateddAt']

FormulaGroupSchema.statics.findAll = async ( query) => {
    const user_id = Session.get('user._id');
    const limit = parseInt(query.limit, 10)
    const skip = (parseInt(query.page, 10) - 1)*limit
    const result = await this.default.find({ status: 'active', user_id : user_id })
                                     .populate({
                                        model: FormulasModel,
                                        path: "formulas",
                                        select: "banker_id _id status",
                                        populate: {
                                            model: BankersModel,
                                            path: "banker_id",
                                            select: "_id name status",
                                        }
                                    })
                                    .select('status user_id name')
                                    .sort(query.sort)
                                    .limit(limit)
                                    .skip(skip)
                                    .lean()
    return result
}

FormulaGroupSchema.statics.find_id = async (id) => {
    const result = await this.default.find({ _id: id, status: 'active' })
                                     .select(excludeFields.join(' '))
                                     .lean()
    return result
}

FormulaGroupSchema.statics.createFormulaGroup = async (name) => {
    const data = {
        _id: new mongoose.Types.ObjectId(),
        name: name
    }
    const FormulaGroup = await this.default.create(data)
    return this.default.findById(FormulaGroup._id)
                       .select(excludeFields.join(' '))
                       .lean()
}


FormulaGroupSchema.statics.addByBanker = (item) => {
    if (!item.formula_id) {
        return false
    } else {
        const result = this.default.findOneAndUpdate(
                                    { _id: item.id },
                                    { $push: { "formulas": [item.formula_id] } },
                                    { new: true }
                                )
                                    .select(excludeFields.join(' '))
                                    .lean()
        return result
    }
}

FormulaGroupSchema.statics.updateFormulaGroup = async (item) => {
    return this.default.findOneAndUpdate(
                            { _id: item._id , status :'active' },
                            { '$set': { 'name': item.name } },
                            { new: true },
                        )
                        .select(excludeFields.join(' '))
                        .lean()
}


FormulaGroupSchema.statics.deleteByBanker = async (item) => {
    const FormulaGroup = await this.default.findById(item.id,{ status: 'active' })
                                            .populate({
                                                model: FormulasModel,
                                                path: "formulas",
                                                select: "_id name banker_id"
                                            })
    const formulas = FormulaGroup.formulas
    const Banker = formulas.find(formulas => formulas.banker_id == item.banker_id)
    if (!Banker) {
        return false
    } else {
        const result = await this.default.findByIdAndUpdate(
                                        { _id: item.id },
                                        { $pull: { "formulas": { $in: [Banker._id] } } },
                                        { new: true },
                                    )
                                        .select(excludeFields.join(' '))
                                        .lean()
        return result
    }
}


FormulaGroupSchema.statics.checkFormulas = async (id, value) => {
    const result = await this.default.findOne({ _id: id }, { status: 'active' })
                                     .populate()
                                     .select('formulas')
    if (result.formulas.indexOf(value) !== -1) return false
    return true
}


FormulaGroupSchema.statics.checkName = async (value) => {
    const result = await this.default.findOne({ name: value }, { status: 'active' })
    if (result) return false
    return true
}


FormulaGroupSchema.statics.checkExistName = async name => {
            const result = await this.default.findOne({name: name, status : 'active'})
                                             .select('name')
                                             .lean()
            if(result){
                return result
            }else{
                return 'Username is not existed'
            }
}


FormulaGroupSchema.statics.checkBanker_id = async (value) => {
    const result = await this.default.findOne({ name: value }, { status: 'active' })
    if (result) return false
    return true
}
// Export Model
export default mongoose.model(collectionName, FormulaGroupSchema, collectionName)



