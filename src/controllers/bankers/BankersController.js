import BankersModel from "../../models/BankersModel"
import Exception from "../../utils/Exception"

class BankersController {
    async list (req, res, next) {
        try {
            const query = req.query

            const bankers = await BankersModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: bankers,
            })
        } catch (err) {
            next (err)
        }
    }

    async save (req, res, next) {
        try {
            const item = req.body

            const result = await BankersModel.createHostBanker(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result,
            })
        } catch (err) {
            next (err)
        }
    }

    async update (req, res, next) {
        try {
            const item = req.body
            item.host_id = req.params.id

            const result = await BankersModel.updateHostBanker(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result,
            })
        } catch (err) {
            next (err)
        }
    }

    async delete (req, res, next) {
        try {
            const item = req.body
            item.host_id = req.params.id

            const result = await BankersModel.deleteHostBanker(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: result,
            })
        } catch (err) {
            next (err)
        }
    }

}

export default new BankersController()