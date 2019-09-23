import mongoose from '../query/mongoose'
import { BaseSchema } from "../cores/baseModel"

// Define collection name
const collectionName = "formula_fields";

// Define collection schema
const FormulaFieldsSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String
});
// Load BaseModel
FormulaFieldsSchema.plugin(BaseSchema);

export default mongoose.db_N.model(collectionName,FormulaFieldsSchema,collectionName)