import TCurrenciesModel from "../../models/TCurrenciesModel"
import Exception from "../../utils/Exception"


class TCurrenciesController {
    async list (req, res, next) {
        try {
            const query = req.query

            const tcurrencies = await TCurrenciesModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: tcurrencies,
            })
        } catch (err) {
            next (err)
        }
    }

    async saveConfig (req, res, next) {
        try {
            const type = req.body.type
            const data = JSON.parse(req.body.data)

            await TCurrenciesModel.saveConfig(type, data)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: data,
            })
        } catch (err) {
            next (err)
        }
    }

    async update (req, res, next) {
        try {
            const item = req.body
            item.t_currency_id = req.params.id

            await TCurrenciesModel.updateTCurrencies(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: item,
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new TCurrenciesController()