import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import Session from "../utils/Session"
import Helpers from "../utils/Helpers"
import Hashpassword from "../utils/HashPassword"

// Define collection name
const collectionName = "users"

// Define collection schema
const UsersSchema = new mongoose.Schema({
    parent_id: mongoose.Types.ObjectId,
    fullname: String,
    username: String,
    password: String,
    password2: String,
    role: Number,
	secure_code :{type: Number, default:9999},
	login_failed :{type: Number, default:0},
	login_ip :{type: String ,default: null},
	lang_code : {type: String , defaul : "vi"},
	allow_export : {type: Boolean ,default: false},
	allow_report_detail : {type: Boolean ,default: false},
	enable_start : {type: Date ,default: null},
	enable_end : {type: Date ,default: null},
	old_password : {type: String ,default: null},
	is_updated_password : {type: Boolean ,default: false},
	old_password2 : {type: String ,default: null},
	is_updated_password2 : {type: Boolean ,default: false},
    is_lock : {type: Boolean ,default: null},
})
// Load BaseModel
UsersSchema.loadClass(BaseModel)
UsersSchema.plugin(BaseSchema)


const excludeFields = ['-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy']

UsersSchema.statics.findAllUser = async (query) => {
    const parent_id = Session.get('user.parent_id')
    const limit = parseInt(query.limit, 10)
    const skip = (parseInt(query.page, 10) - 1) * limit
    const result = await this.default.find({ status: 'active', parent_id: parent_id, role: 10 })
        .select(excludeFields.join(' ')).lean()
        .sort(query.sort)
        .limit(limit)
        .skip(skip)
    return result
}


UsersSchema.statics.detailMembers = async (query) => {
    const parent_id = Session.get('user.parent_id')
    const limit = parseInt(query.limit, 10)
    const skip = (parseInt(query.page, 10) - 1) * limit
    const result = await this.default.find({ status: 'active', parent_id: parent_id, role: 11 })
        .select(excludeFields.join(' ')).lean()
        .sort(query.sort)
        .limit(limit)
        .skip(skip)
    return result
}


UsersSchema.statics.detailSubUsers = async (query) => {
    const user_id = Session.get('user._id')
    const limit = parseInt(query.limit, 10)
    const skip = (parseInt(query.page, 10) - 1) * limit
    const result = await this.default.find({ status: 'active', parent_id: user_id, role: 12 })
        .select(excludeFields.join(' ')).lean()
        .sort(query.sort)
        .limit(limit)
        .skip(skip)
    return result
}

UsersSchema.statics.generateUsername = async (query) => {
    const user_id = Session.get('user._id')
    const username = Session.get('user.username')
    let _username
    let options = {}
    let listUsernameCompare = []
    if (query.type === 'sub') {
        _username = username + query.type
        options = {
            status: 'active',
            username: { "$regex": new RegExp(`^${_username}`), "$options": "i" },
            parent_id: user_id,
            role: 12
        }
    } else if (query.type === 'member') {
        _username = username
        options = {
            status: 'active',
            username: { "$regex": new RegExp(`^${_username}`), "$options": "i" },
            parent_id: user_id,
            role: 11
        }
    }

    const result = await this.default.find(options)
        .select('username -_id').lean()
        .sort("username")
        .lean()


    const arrUserName = result.map(item => item.username)
    return getAvailableUserName(_username, arrUserName)

}

UsersSchema.statics.checkExist = async name => {
    const result = await this.default.findOne({ name: name, status: 'active' })
        .select('name')
        .lean()
    if (result) {
        return result
    } else {
        return 'Username is not existed'
    }
}


UsersSchema.statics.Create = async (options) => {

    const user_id = Session.get('user._id')
    // let options = {};
    // if (data.type === 'sub') {
    //     options = {
    //         type: data.type,
    //         fullname: data.fullname,
    //         password: data.password,
    //         role: 12
    //     };
    // } else if (data.type === 'member') {
    //     options = {
    //         type: data.type,
    //         fullname: data.fullname,
    //         password: data.password,
    //         role: 11
    //     };
    // }

    const password = Hashpassword.hash(options.password)
    let newObject = {
        _id: new mongoose.Types.ObjectId(),
        parent_id: user_id,
        fullname: options.fullname,
        username: options.username,
        password: password,
        role: options.role,
    }
    const User = await this.default.create(newObject)

    return this.default.findById(User._id)
        .select(excludeFields.join(' ')).lean()
}






// UsersSchema.statics.checkUniqueUsername = (username) => {
//     return this.default.find({
//         username: username,
//     })
//         .then((users) => {
//             if (users.length !== 0 && users[0].status === 'active') {
//                 return false
//             } else return true
//         })
// }

/*
|--------------------------------------------------------------------------
| Private function
| Generate not exists username in array
|--------------------------------------------------------------------------
*/
const getAvailableUserName = (username, arrCurrentUsername) => {
    for (let i = 1; i < 1000; i++) {
        const _username = `${username}${Helpers.getNumberPad(i)}`
        if (arrCurrentUsername.indexOf(_username) === -1) return _username
    }
}

// Export Model
export default mongoose.model(collectionName, UsersSchema, collectionName)