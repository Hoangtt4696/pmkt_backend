/*
|--------------------------------------------------------------------------
| Base Model Class
| Define base method
|--------------------------------------------------------------------------
*/


import mongoose from"../query/mongoose"

import Moment from"../utils/Moment"
// const Moment = require("../utils/Moment")
// Exteneral fields
const BaseFields = {
    status: { type: String, lowercase: true, trim: true, enum: ["active", "inactive", "deleted"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    createdAt: { type: Date},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
	updatedAt: { type: Date },
}

// BaseSchema process middleware
const BaseSchema = schema => {
    // Add Exteneral fields
    schema.add(BaseFields)

    // Disabled version key in collection
    schema.set('versionKey', false)

    // Create a pre-save hook
    schema.pre("save", function(next) {
        const now = Moment.format()
        this.createdBy = mongoose.mongo.ObjectID() //Temp data
        this.createdAt = now
        if (!this.created_at) {
            this.updatedBy = mongoose.mongo.ObjectID() //Temp data
            this.updatedAt = now
        }
        next()
    })
}

// Based function
class BaseModel {
    // Update status => "delete"
    static softDelete(id) {
        return this.updateOne({_id: id}, {status: "deleted"})
    }

    static findUserAndCount() {
        return this.aggregate([
            // {$match:{status : "active"}},
            {$group: { _id: {status:"$status"} , total:{ $sum: 1}}},
            //  {$match:{status : "active"}},
            // , _id:{ createdBy: "$createdBy",createdAt:"$createdAt",updatedBy:"$updatedBy",updateddAt:"$updateddAt",username :"$username",password:"$password"}
        ])
    }

    // Temp function
    static findByFullName(username) {
        return this.find({ username: username })
    }
}

// export default
export {
    BaseModel,
    BaseSchema,
    BaseFields
}


