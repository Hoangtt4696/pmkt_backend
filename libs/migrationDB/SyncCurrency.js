import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import CurrencyTypeModel from "./model/old/CurrencyTypeModel"
import CurrencyModel from "./model/old/CurrencyModel"

import MCurrenciesModel_N from './model/MCurrenciesModel_N'
import TCurrenciesModel_N from './model/TCurrenciesModel_N'


class SyncCurrency {
	async Truncate() {
		return Promise.all([
			MCurrenciesModel_N.remove(),
			TCurrenciesModel_N.remove()
		])
	}

	async MCurrency(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0

			while (true) {
				const data = await CurrencyTypeModel.find({
														deleted: {$eq: 0}
													})
													.lean()
													.limit(limit)
													.skip(skip * limit)
													.sort({created: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration MCurrency Collection Done ================================")
					break
				}
				skip++
				data.map(async item => {
					const _item = JSON.parse(JSON.stringify(item))
					const query = new MCurrenciesModel_N({
						_id						: mongoose.Types.ObjectId(_item._id),
						name					: _item.name ? String(_item.name) : "",
						round_type				: _item.filter ? Number(_item.filter) : 0,
						status					: Number(_item.deleted) !== 0 ? "deleted" : "active"
					})
					const result = await query.save()
					console.log(result)

				})
			}
		} catch (error) {
			console.error(error)
		}
	}
	
	async TCurrency(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0

			while (true) {
				const data = await CurrencyModel.find({
													deleted: {$eq: 0}
												})
												.lean()
												.limit(limit)
												.skip(skip * limit)
												.sort({created: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration TCurrency Collection Done ================================")
					break
				}
				skip++
				data.map(async item => {
					const _item = JSON.parse(JSON.stringify(item))

					const query = new TCurrenciesModel_N({
						_id						: mongoose.Types.ObjectId(_item._id),
						user_id					: mongoose.Types.ObjectId(_item.uid),
						m_currency_id			: mongoose.Types.ObjectId(_item._id),
						round_type				: _item.filter ? Number(_item.filter) : 0,
						note					: _item.note ? String(_item.note) : "",
						status					: Number(_item.deleted) !== 0 ? "deleted" : "active"
					})
					const result = await query.save()
					console.log(result)
				})
			}
		} catch (error) {
			console.error(error)
		}
	}

}

export default new SyncCurrency()
