import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import FormulaFieldModel from "./model/old/FormulaFieldModel"
import FormulaFieldValueModel from "./model/old/FormulaFieldValueModel"
import FormulaFormatModel from "./model/old/FormulaFormatModel"
import FormulaGroupModel from "./model/old/FormulaGroupModel"
import FormulaPatternModel from "./model/old/FormulaPatternModel"
import AccountFormulaGroupModel from "./model/old/AccountFormulaGroupModel"

import FormulaFieldsModel_N from './model/FormulaFieldsModel_N'
import FormulasModel_N from './model/FormulasModel_N'
import FormulaFormatsModel_N from './model/FormulaFormatsModel_N'
import FormulaGroupsModel_N from './model/FormulaGroupsModel_N';

class SyncFormula {
	async Truncate() {
		return Promise.all([
			FormulaFieldsModel_N.remove(),
			FormulaFormatsModel_N.remove(),
			FormulasModel_N.remove(),
			FormulaGroupsModel_N.remove(),
		])
	}

	async FormulaField(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await FormulaFieldModel.find({
												deleted: {$eq: 0}
											})
											.lean()
											.limit(limit)
											.skip(skip * limit)
											.sort({created: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Formula Fields Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))

						const query = new FormulaFieldsModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							name					: _item.name ? String(_item.name.toLowerCase()) : "",
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

	async FormulaFormat(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await FormulaFormatModel.find({
												deleted: {$eq: 0}
											})
											.lean()
											.limit(limit)
											.skip(skip * limit)
											.sort({created: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Formula Format Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))
						const query = new FormulaFormatsModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							banker_id				: mongoose.Types.ObjectId(_item.banker_id),
							name					: _item.name ? String(_item.name) : "",
							short					: _item.short ? String(_item.short) : "",
							type					: _item.type ? Number(_item.type) : "",
							data					: _item.data ? JSON.parse(_item.data) : "",
							status					: Number(_item.deleted) !== 0 ? "deleted" : "active"
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

	async Formula(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await FormulaPatternModel.find({
												deleted: {$eq: 0}
											})
											.lean()
											.limit(limit)
											.skip(skip * limit)
											.sort({createdAt: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Formula Collection Done ================================")
					break
				}
				skip++

				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))
						// Get Field Value
						const formulaFieldValue = await FormulaFieldValueModel.find({
																f_pattern_id: mongoose.Types.ObjectId(_item._id),
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

						const query = new FormulasModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							banker_id				: mongoose.Types.ObjectId(_item.banker_id),
							user_id					: mongoose.Types.ObjectId(_item.uid),
							t_currency_id			: mongoose.Types.ObjectId(_item.dv_tiente),
							formula_format_id		: mongoose.Types.ObjectId(_item.f_format_id),
							name					: _item.tenct ? String(_item.tenct) : "",
							fields					: formulaFields,
							rec_pay					: _item.giaonhan,
							status					: Number(_item.deleted) !== 0 ? "deleted" : "active"
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

	async FormulaGroup(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await FormulaGroupModel.find({
												deleted: {$eq: 0}
											})
											.lean()
											.limit(limit)
											.skip(skip * limit)
											.sort({createdAt: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Formula Groups Collection Done ================================")
					break
				}
				skip++

				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))
						// Get Field Value
						const formulaGroupRelation = await AccountFormulaGroupModel.find({
																formula_group_id: mongoose.Types.ObjectId(_item._id),
																deleted: {$eq: 0}
															})
															.lean()
						const formulas = []
						if (formulaGroupRelation && formulaGroupRelation.length) {
							formulaGroupRelation.forEach(el => {
								const _el = JSON.parse(JSON.stringify(el))
								formulas.push(mongoose.Types.ObjectId(_el.f_pattern_id))
							})
						}

						const query = new FormulaGroupsModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							user_id					: mongoose.Types.ObjectId(_item.uid),
							name					: _item.name ? String(_item.name) : "",
							formulas				: formulas,
							status					: Number(_item.deleted) !== 0 ? "deleted" : "active"
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

export default new SyncFormula()

