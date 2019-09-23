import ReportsModel from "../../models/ReportsModel"
import Exception from "../../utils/Exception"
import MCurrenciesModel from "../../models/MCurrenciesModel";


class ReportsController {
    async list (req, res, next) {
        try {
            const query = req.query

            const reports = await ReportsModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: reports,
            })
        } catch (err) {
            next (err)
        }
    }

    async detail (req, res, next) {
        try {
            const report_id = req.params.id

            const report_detail = await ReportsModel.reportDetail(report_id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: report_detail,
            })
        } catch (err) {
            next (err)
        }
    }

    async delete (req, res, next) {
        try {
            const report_id = req.params.id

            await ReportsModel.softDelete(report_id)
            await ReportsModel.deleteReport(report_id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: report_id,
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new ReportsController()