/*
|--------------------------------------------------------------------------
| Base Model Class
| Define base method
|--------------------------------------------------------------------------
*/
import mongoose from "mongoose"

import Session from "../Session"

// Exclude fields
const ExcludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ]

// External fields
const BaseFields = {
    status: { type: String, lowercase: true, trim: true, enum: ["active", "inactive", "deleted"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
}


// BaseSchema process middleware
const BaseSchema = schema => {
    // Add Exteneral fields
    schema.add(BaseFields)

    // Disabled version key in collection
    schema.set("versionKey", false)
    schema.set("timestamps", true)

    // Create a pre-save hook
    schema.pre("save", function(next) {
        const userID = Session.get("user._id")
        if (userID) {
            this.updatedBy = userID
            if (!this.createdAt) {
                this.createdBy = userID
            }
        }
        next()
    })

    // Create a pre-findOneAndUpdate hook
    schema.pre("findOneAndUpdate", function(next) {
        const userID = Session.get("user._id")
        if (userID && this._update) {
            this._update.updatedBy = userID
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

    static parseQuery(query) {
        if (query.limit && !Number(query.limit)) delete query.limit

        if (query.page && !Number(query.page)) delete query.page

        if (query.sort) {
            Object.entries(query.sort).forEach(item => {
                if (!(new RegExp("desc|asc|1|-1", 'i')).test(item[1])) {
                    delete query.sort[item[0]]
                }
            })
        }
        return query
    }
}

export default BaseModel
export {
    BaseSchema,
    BaseFields,
    ExcludeFields
}