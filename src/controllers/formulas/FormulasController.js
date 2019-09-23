import FormulasModel from "../../models/FormulasModel"

import Exception from "../../utils/Exception"

class FormulasController {
    async list(req, res, next) {
        try {
            const formulaList = await FormulasModel.findDoc({ terms: req.query })

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: formulaList
            })
        } catch (err) {
            next(err)
        }
    }
    async detail(req, res, next) {
        try {
            let result = await FormulasModel.findDoc({ options: { _id: req.params.id } })

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
            const result = await FormulasModel.createDoc(req.body)

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
            const result = await FormulasModel.updateDoc(req.params.id, { formData: req.body })

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result

            })
        } catch (err) {
            next(err)
        }
    }
    async delete(req, res, next) {
        try {
            await FormulasModel.softDelete(req.params.id)

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: req.params.id
            })
        } catch (err) {
            next(err)
        }
    }

    async checkExists(req, res, next) {
        try {
            const isExist = await FormulasModel.checkExisted({ name: req.query.name })

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: isExist
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new FormulasController()