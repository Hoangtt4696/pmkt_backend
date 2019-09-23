

import mongoose from '../../query/mongoose'

// Define collection name
const collectionName = "user"
const Schema = new mongoose.Schema()
export default mongoose.db.model(collectionName,Schema,collectionName)