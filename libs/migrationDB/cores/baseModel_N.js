/*
|--------------------------------------------------------------------------
| Base Model Class
| Define base method
|--------------------------------------------------------------------------
*/


import mongoose from "../query/mongoose"

import Moment from"../utils/Moment"

// Exteneral fields
const BaseFields = {
    status: { type: String, lowercase: true, trim: true, enum: ["active", "inactive", "deleted"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    createdAt: { type: Date },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
	updatedAt: { type: Date },
}


// BaseSchema process middleware
const BaseSchema_N = schema => {
    // Add Exteneral fields
    schema.add(BaseFields)

    // Disabled version key in collection
    schema.set('versionKey', false)

    // Create a pre-save hook
    schema.pre("save", function(next) {
        const now = Moment.format()
        this.createdBy = mongoose.mongo.ObjectID("56850ba0097802b9f23929ea") //bedbug
        this.createdAt = now
        if (!this.created_at) {
            this.updatedBy = mongoose.mongo.ObjectID("56850ba0097802b9f23929ea") //bedbug
            this.updatedAt = now
        }
        next()
    })
}

// export default BaseModel_N
export {
    BaseSchema_N,
    BaseFields
}


