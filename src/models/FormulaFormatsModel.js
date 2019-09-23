import mongoose from "mongoose"


import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

import Session from "../utils/Session"
import { type } from "os"



// Define collection name
const collectionName = "formula_formats"


// Define collection schema
const FormulaFormatsSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    banker_id: mongoose.Types.ObjectId,
    name: String,
    short: String,
    type: Number,
    data: mongoose.Schema.Types.Mixed
})

// Load BaseModel
FormulaFormatsSchema.loadClass(BaseModel)
FormulaFormatsSchema.plugin(BaseSchema)



FormulaFormatsSchema.statics.findAll = async () => {
    return  await FormulaFormatsSchema
    .find()
    .select('name')
    .then((result) => console.log(result))
}

// FormulaFormatsSchema.static()



// Export Model
export default mongoose.model(collectionName, FormulaFormatsSchema, collectionName) 

