import AccountsModel from '../../models/AccountsModel'
import Recursive from "../../utils/Recursive"
import Exception from '../../utils/Exception'

class AccountsController {
    async list(req, res, next) {
        try {
            const { query } = req;

            let accountList = await AccountsModel.findDoc({ terms: query })

            if (query.type && query.type === 'tree') {
                accountList = Recursive.flatToTree(accountList)

                if (query.page && query.limit) {
                    accountList = accountList.splice((query.page - 1)*query.limit, query.limit);
                }
            }

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: accountList
            })
        } catch (err) {
            next(err)
        }
    }

    async detail(req, res, next) {
        try {
            const query = { _id: req.params.id }
            const result = await AccountsModel.findDoc({ options: query})

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
            const account = await AccountsModel.createDoc(req.body)

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

export default new AccountsController()