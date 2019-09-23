import AccountFormulaModel from '../../models/AccountFormulaModel'
import Recursive from "../../utils/Recursive"
import Exception from '../../utils/Exception'

class AccountFormulaController {
    async list(req, res, next) {
        try {
            const { query } = req
            const options = query.search

            const accountFormulaList = await AccountFormulaModel.findDoc({ options, terms: req.query })

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: accountFormulaList
            })
        } catch (err) {
            next(err)
        }
    }

    async save(req, res, next) {
        try {
            const account = await AccountFormulaModel.createDoc(req.body)

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: account
            })
        } catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const result = await AccountsModel.updateDoc(req.params.id, { formData: req.body })

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result
            })
        } catch(err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            await Recursive.softDeleteTree(AccountsModel, req.params.id)

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: req.params.id
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new AccountFormulaController()