import LanguagesModel from "../../models/LanguagesModel"

import Exception from "../../utils/Exception"


class LanguagesController {
    async list(req, res, next) {
        try {
            const query = req.query
            let result = await LanguagesModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async detail(req, res, next) {
        try {
            const code = req.query.code
            let result = await LanguagesModel.findByCode(code)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async save(req, res, next) {
        try {
            const name = req.body.name
            const code = req.body.code
            const order = req.body.order

            const result = await LanguagesModel.createLanguage(name, code, order)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async update(req, res, next) {
        try {
            const item = req.body
            item._id = req.params.id

            let data = await LanguagesModel.updateLanguage(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: data

            })
        } catch (err) {
            next(err)
        }
    }
    async delete(req, res, next) {
        try {
            await LanguagesModel.softDelete(req.params.id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: req.params.id
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new LanguagesController()