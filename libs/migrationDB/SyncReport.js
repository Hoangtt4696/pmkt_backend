import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import ReportCycleModel from "./model/old/ReportCycleModel"
import ReportDetailModel from "./model/old/ReportDetailModel"
import ReportHandleModel from "./model/old/ReportHandleModel"
import AccountModel from "./model/old/AccountModel"
import FormulaPatternModel from "./model/old/FormulaPatternModel"
import FormulaFieldValueModel from "./model/old/FormulaFieldValueModel"

import ReportsModel_N from './model/ReportsModel_N'
import ReportHandlesModel_N from './model/ReportHandlesModel_N'
import ReportDetailsModel_N from './model/ReportDetailsModel_N'


const type_report_enum = {
    2: 'payment', // 'Payment'
    3: 'old_owing', // Old Owing
    4: 'money_exchange', // Money Exchange
    9: 'other' // Other
};

class SyncReport {
	async Truncate() {
		return Promise.all([
			ReportsModel_N.remove(),
			ReportHandlesModel_N.remove(),
			ReportDetailsModel_N.remove()
		])
	}

	async Report(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await ReportCycleModel.find({
														deleted: { $eq: 0 }
													})
													.limit(limit)
													.skip(skip * limit)
													.sort({ created: 1 })
													.lean()
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Reports Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))
						const query = new ReportsModel_N({
							_id				: mongoose.Types.ObjectId(_item._id),
							user_id			: mongoose.Types.ObjectId(_item.uid),
							name			: _item.chuky ? String(_item.chuky) : "",
							is_exported		: _item.is_exported ? Boolean(_item.is_exported) : false,
							status			: Number(_item.deleted) !== 0 ? "deleted" : "active"
						})
						const result = await query.save()
						console.log(result)
					})
				)
			}
		} catch (error) {
			console.error(error)
		}
	}

	async ReportHandleExchange(_limit, _skip, _maxSkip) {
		try {
			let data = await ReportHandleModel.find({
													deleted: { $eq: 0 },
													type_report: 4
												})
												.sort({ created: 1 })
												.lean()
			await Promise.all(
				data.map(async item => {
	
					const _item = JSON.parse(JSON.stringify(item))

					let type_report = _item.type_report ? Number(_item.type_report) : 9
					type_report = type_report_enum[type_report]

					let origin_t_currentcy_id = null
					let t_currentcy_id = null
					let origin_amount = null
					let amount = null
					let query = null



					let sameData = await ReportHandleModel.aggregate([
						{
							$match : {
								deleted: { $eq: 0 },
								type_report: 4,
								uid: mongoose.Types.ObjectId(_item.uid),
								user_id: mongoose.Types.ObjectId(_item.user_id),
								chukybaocaotuan_id: mongoose.Types.ObjectId(_item.chukybaocaotuan_id),
								note: String(_item.note),
								created: Number(_item.created)
							}
						},
						{
							$group: {
								_id: {
									dv_tien_te: "$dv_tien_te",
									dv_tien_te_id: "$dv_tien_te_id"
								},
								item: {$first: "$$ROOT"}
							}
						},
						{ $sort: { created: 1 }}
					])

					if (sameData && sameData.length === 2) {
						let __ITEM = null
						sameData.forEach(s_item => {
							const _s_item = JSON.parse(JSON.stringify(s_item))
							__ITEM = _s_item.item
							if (__ITEM.note.indexOf(__ITEM.dv_tien_te) === 0) {
								origin_t_currentcy_id =  mongoose.Types.ObjectId(__ITEM.dv_tien_te_id)
								origin_amount = __ITEM.result
							}

							if (__ITEM.note.indexOf(__ITEM.dv_tien_te) > 0) {
								t_currentcy_id =  mongoose.Types.ObjectId(__ITEM.dv_tien_te_id)
								amount = __ITEM.result
							}
						})


						// Find Duplicate
						const exists = await ReportHandlesModel_N.find({
												report_id					: mongoose.Types.ObjectId(__ITEM.chukybaocaotuan_id),
												user_id						: mongoose.Types.ObjectId(__ITEM.user_id),
												member_id					: mongoose.Types.ObjectId(__ITEM.uid),
												origin_t_currentcy_id		: origin_t_currentcy_id,
												t_currentcy_id				: t_currentcy_id,
											})
											.lean()
						if (!exists || !exists.length) {
							query = new ReportHandlesModel_N({
								_id							: mongoose.Types.ObjectId(__ITEM._id),
								report_id					: __ITEM.chukybaocaotuan_id ? mongoose.Types.ObjectId(__ITEM.chukybaocaotuan_id) : null,
								user_id						: __ITEM.user_id ? mongoose.Types.ObjectId(__ITEM.user_id) : null,
								member_id					: __ITEM.uid ? mongoose.Types.ObjectId(__ITEM.uid) : null,
								origin_t_currentcy_id		: origin_t_currentcy_id,
								t_currentcy_id				: t_currentcy_id,
								ref_transaction_id			: __ITEM.ref_transaction_id ? mongoose.Types.ObjectId(__ITEM.ref_transaction_id) : null,
								type						: type_report,
								origin_amount				: origin_amount,
								amount						: amount,
								note						: __ITEM.note ? String(__ITEM.note).trim() : "",
								status						: Number(__ITEM.deleted) !== 0 ? "deleted" : "active"
								
							})
							const result = await query.save()
							console.log(result)
						}
					}
				})
			)
			console.log("===================== Migration Reports Handle Money Exchange Collection Done ================================")
		} catch (error) {
			console.error(error)
		}
	}

	async ReportHandle(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_skip) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await ReportHandleModel.find({
														deleted: { $eq: 0 },
														type_report: {$ne: 4}
													})
													.limit(limit)
													.skip(skip * limit)
													.sort({ created: 1 })
													.lean()
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Reports Handle Other Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
		
						const _item = JSON.parse(JSON.stringify(item))

						let type_report = _item.type_report ? Number(_item.type_report) : 9
						type_report = type_report_enum[type_report]

						let origin_t_currentcy_id = null
						let t_currentcy_id = null
						let origin_amount = null
						let amount = null
						
						origin_t_currentcy_id = mongoose.Types.ObjectId(_item.dv_tien_te_id)
						t_currentcy_id = mongoose.Types.ObjectId(_item.dv_tien_te_id)

						origin_amount = _item.result ? Number(_item.result) : null
						amount = _item.result ? Number(_item.result) : null

						const query = new ReportHandlesModel_N({
							_id							: mongoose.Types.ObjectId(_item._id),
							report_id					: _item.chukybaocaotuan_id ? mongoose.Types.ObjectId(_item.chukybaocaotuan_id) : null,
							user_id						: _item.user_id ? mongoose.Types.ObjectId(_item.user_id) : null,
							member_id					: _item.uid ? mongoose.Types.ObjectId(_item.uid) : null,
							origin_t_currentcy_id		: origin_t_currentcy_id,
							t_currentcy_id				: t_currentcy_id,
							ref_transaction_id			: _item.ref_transaction_id ? mongoose.Types.ObjectId(_item.ref_transaction_id) : null,
							type						: type_report,
							origin_amount				: origin_amount,
							amount						: amount,
							note						: _item.note ? String(_item.note).trim() : "",
							status						: Number(_item.deleted) !== 0 ? "deleted" : "active"
						})
						const result = await query.save()
						console.log(result)
					})
				)
			}
		} catch (error) {
			console.error(error)
		}
	}

	

	async ReportDetail(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_skip) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await ReportDetailModel.find({
														deleted: { $eq: 0 },
													})
													.limit(limit)
													.skip(skip * limit)
													.sort({ created: 1 })
													.lean()
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Reports Detail Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))

						const formulaDetailParse = _item.formula_detail ? JSON.parse(JSON.parse(_item.formula_detail)) : {}
						// console.log("formulaDetailParse", formulaDetailParse, formulaDetailParse.f_pattern_id)
						const formulaInfo = await FormulaPatternModel.findOne({
																			_id: mongoose.Types.ObjectId(formulaDetailParse.f_pattern_id)
																		})
																		.lean()

						const formulaFieldValue = await FormulaFieldValueModel.find({
																	f_pattern_id: mongoose.Types.ObjectId(formulaDetailParse.f_pattern_id),
																	deleted: {$eq: 0}
																})
																.lean()
						const formulaFields = []
						if (formulaFieldValue && formulaFieldValue.length) {
							formulaFieldValue.forEach(el => {
								const _el = JSON.parse(JSON.stringify(el))
								formulaFields.push({
									formula_field_id	: mongoose.Types.ObjectId(_el.f_field_id),
									value				: Number(_el.value)
								})
							})
						}

						const formula_detail = formulaInfo && formulaInfo !== {} ? {
							t_currency_id			: mongoose.Types.ObjectId(formulaInfo._id),
							formula_id				: mongoose.Types.ObjectId(formulaInfo._id),
							formula_format_id		: mongoose.Types.ObjectId(formulaInfo.f_format_id),
							name					: formulaInfo.tenct ? String(formulaInfo.tenct) : "",
							fields					: formulaFields,
							rec_pay					: formulaInfo.giaonhan,
						} : {}


						const accountInfo = await AccountModel.findOne({
															acc_name: { "$regex": new RegExp(`^${_item.account_name}$`), "$options": "i" },
															deleted: 0,
															uid: mongoose.Types.ObjectId(_item.uid)
														})
														.lean()
						

						const query = new ReportDetailsModel_N({
							_id							: mongoose.Types.ObjectId(_item._id),
							report_id					: _item.chukybaocaotuan_id ? mongoose.Types.ObjectId(_item.chukybaocaotuan_id) : null,
							user_id						: _item.uid ? mongoose.Types.ObjectId(_item.uid) : null,
							member_id					: _item.user_id ? mongoose.Types.ObjectId(_item.user_id) : null,
							account_id					: accountInfo._id ? mongoose.Types.ObjectId(accountInfo._id) : null,
							flag						: _item.flag ? String(_item.flag).trim() : "",
							amount						: _item.result ? Number(_item.result) : 0,
							formula_detail				: formula_detail
							
						})
						const result = await query.save()
						console.log(result)
					})
				)
			}
		} catch (error) {
			console.error(error)
		}
	}
}

export default new SyncReport()


