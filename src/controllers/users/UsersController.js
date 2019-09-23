import _uniqBy from "lodash/uniqBy"

import UsersModel from "../../models/UsersModel"
import HashPassword from "../../utils/HashPassword"
import Session from "../../utils/Session"
import Exception from "../../utils/Exception"

class UsersController {
    async list(req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.findAllUser(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }


    async detailMembers(req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.detailMembers(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }


    async detailSubUsers (req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.detailSubUsers(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async generateUsername(req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.generateUsername(query)
            const data = {
                username: result.substring(result.length -3,0),
                s0 : result.substring(result.length -2,result.length -3),
                s1 : result.substring(result.length -1,result.length -2),
                s2 : result.substring(result.length   ,result.length -1)
            }

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: data
            })
        } catch (err) {
            next(err)
        }
    }

   

    async saveMember(req, res, next) {
        try {
            let username ;
            const data = req.body
            const options = {
                type: data.type,
                fullname: data.fullname,
                password: data.password,
                username : username,
                role: 11
            };
            options.username = await UsersModel.generateUsername(options)
            const result = await UsersModel.Create(options)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async saveSubUser(req, res, next) {
        try {
            let username ;
            const data = req.body
            const options = {
                type: data.type,
                fullname: data.fullname,
                password: data.password,
                username : username,
                role: 12
            };
            options.username = await UsersModel.generateUsername(options)
            const result = await UsersModel.Create(options)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async saveUser(req, res, next) {
        try {
            const data = req.body
            const options = {
                type: data.type,
                fullname: data.fullname,
                username : data.username,
                password: data.password,
                role: 10
            };
            const result = await UsersModel.Create(options)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async checkExist(req, res, next) {
        try {
            const options = {
                value: req.query.value,
                fullname : req.query.fullname,
                accountName: req.query.accountName,
                type: req.query.type,
            }
            const result = await UsersModel.checkExist(options)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result,
            })
        } catch (err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        const id = req.params.id
        try {
            await UsersModel.softDelete(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: id
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new UsersController()