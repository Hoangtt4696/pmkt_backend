import mongoose from '../query/mongoose'
import {BaseModel, BaseSchema } from "../cores/baseModel"

// Define collection name
const collectionName = "formula_formats";

// Define collection schema
const FormulaFormatsSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    banker_id: mongoose.Types.ObjectId,
    name: String,
    short: String,
    type: Number,
    data: mongoose.Schema.Types.Mixed
});
// Load BaseModel
FormulaFormatsSchema.plugin(BaseSchema);

export default mongoose.db_N.model(collectionName,FormulaFormatsSchema,collectionName)