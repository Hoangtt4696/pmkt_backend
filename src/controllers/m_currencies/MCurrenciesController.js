import MCurrenciesModel from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception"


class MCurrenciesController {
    async list (req, res, next) {
        try {
            const query = req.query

            const mcurrencies = await MCurrenciesModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: mcurrencies,
            })
        } catch (err) {
            next (err)
        }
    }

    async detail (req, res, next) {
        try {
            const currency_id = req.params.id

            const mcurrency_detail = await MCurrenciesModel.mCurrencyDetail(currency_id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: mcurrency_detail,
            })
        } catch (err) {
            next (err)
        }
    }

    async save (req, res, next) {
        try {
            const item = req.body

            const result = await MCurrenciesModel.createMCurrency(item)
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
            item.currency_id = req.params.id

            const result = await MCurrenciesModel.updateMCurrency(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result,
            })
        } catch (err) {
            next (err)
        }
    }

    async checkExists (req, res, next) {
        try {
            const response = {}
            const params = {
                name: req.query.name,
                type: 'name'
            }

            const result = await MCurrenciesModel.checkExists(params)
            if(result){
                response.message = Exception.COMMON.VALUE_EXISTS
                response.data = true
            } else {
                response.message = Exception.COMMON.VALUE_NOT_EXISTS
                response.data = false
            }

            return res.jsonSuccess({
                message: Exception.getMessage(response.message, {field: req.query.name}),
                data: response.data,
            })
        } catch (err) {
            next (err)
        }
    }

    async delete (req, res, next) {
        try {
            const id = req.params.id

            await MCurrenciesModel.softDelete(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: id,
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new MCurrenciesController()