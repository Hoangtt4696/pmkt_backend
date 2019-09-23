import _uniqBy from "lodash/uniqBy"
import FormulaGroupsModel from "../../models/FormulaGroupsModel"

import Session from "../../utils/Session"
import Exception from "../../utils/Exception"


class FormulaGroupsController {
    async list(req, res, next) {
        try {
            const query = req.query
            let formulaGroup = await FormulaGroupsModel.findAll(query)
            // Get Banker Info
            formulaGroup = formulaGroup.map(item => {
                const _item = JSON.parse(JSON.stringify(item))
                _item.bankers = _uniqBy(_item.formulas, "banker_id._id").map(elem => elem.banker_id)

                return _item
            })
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }

    async detail(req, res, next) {
        try {
            const id = req.params.id
            let formulaGroup = await FormulaGroupsModel.find_id(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }

    async checkExistName(req, res, next) {
        try {
            const name = req.query.name.toUpperCase()
            const result = await FormulaGroupsModel.checkExistName(name)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result,
            })
        } catch (err) {
            next(err)
        }
    }

    async save(req, res, next) {
        try {
            const name = req.body.name.toUpperCase()
            const formulaGroup = await FormulaGroupsModel.createFormulaGroup(name)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }

   

    async addByBanker(req, res, next) {
        try {
            const item = req.body
            item.id = req.params.id
            const result = await FormulaGroupsModel.addByBanker(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
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
            let data = await FormulaGroupsModel.updateFormulaGroup(item)
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
            await FormulaGroupsModel.softDelete(req.params.id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: req.params.id
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteByBanker(req, res, next) {
        try {
            const item = req.body
            item.id = req.params.id
            let result = await FormulaGroupsModel.deleteByBanker(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

}

export default new FormulaGroupsController()