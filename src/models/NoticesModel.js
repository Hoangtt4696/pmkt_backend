
import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

// Define collection name
const collectionName = "notices"

// Define collection schema
const NoticesSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    type: Number,
    contents: [{
            _id: mongoose.Types.ObjectId,
            language_id: mongoose.Types.ObjectId,
            content: String
        }
    ],
})

// NoticesSchema.virtual('total_language', {
//     ref: 'languages', // The model to use
//     localField: 'contents.language_id', // Find people where `localField`
//     foreignField: 'code', // is equal to `foreignField`
//     count: true // And only get the number of docs
// });

// Load BaseModel
NoticesSchema.loadClass(BaseModel);
NoticesSchema.plugin(BaseSchema)

const excludeFields = ['-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy']

NoticesSchema.statics.findAll = async (language_id, query) => {
    const limit = parseInt(query.limit, 10)
    const skip = (parseInt(query.page, 10) - 1)*limit
    if(!language_id){
        const result = await this.default.find({})
                                     .select(excludeFields.join(' ')).lean()
                                     .sort(query.sort)
                                     .limit(limit)
                                     .skip(skip)
                                     return result

    } else{
    const result = await this.default.find({"contents.language_id" : {$eq: language_id}},{contents: {$elemMatch:{ "language_id":language_id}}})
                                     .select(excludeFields.join(' ')).lean()
                                     .sort(query.sort)
                                     .limit(limit)
                                     .skip(skip)

                                     return result

    }
 
   
}


NoticesSchema.statics.find_id = async (id) => {
    const result = await this.default.find({ _id: id, status: 'active' })
                                    .select(excludeFields.join(' ')).lean()

    return result
}


NoticesSchema.statics.createNotices = async (data) => {
    const contents = JSON.parse(data.contents)
    let newObject = {
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
        type: data.type,
        contents: contents
    }
    const Notice = await this.default.create(newObject)
    return this.default.findById(Notice._id)
                        .select(excludeFields.join(' ')).lean()
}


NoticesSchema.statics.updateNotice = async (data) => {
    return this.default.findOneAndUpdate(
                            { _id: data.id },
                            {
                                '$set': {
                                    'name': data.name,
                                    'type': data.type,
                                    'contents': data.contents ,
                                }
                            },
                            { new: true },
                        )
                        .select(excludeFields.join(' ')).lean()
}

NoticesSchema.statics.checkName = async (value) => {
    const result = await this.default.findOne({ name: value }, { status: 'active' })
    if (result) return false
    return true
}

export default mongoose.model(collectionName, NoticesSchema, collectionName)