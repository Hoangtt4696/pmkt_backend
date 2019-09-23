import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import AccountModel from "./model/old/AccountModel"
import CongthuctinModel from "./model/old/CongthuctinModel"

import AccountFormulaModel_N from './model/AccountFormulaModel_N'
import AccountModel_N from './model/AccountModel_N'

class SyncAccount {
	async Truncate() {
		return Promise.all([
			AccountModel_N.remove(),
			AccountFormulaModel_N.remove()
		])
	}

	async Account(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await AccountModel.find({
												deleted: {$eq: 0}
											})
											.lean()
											.limit(limit)
											.skip(skip * limit)
											.sort({created: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Account Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))

						const query = new AccountModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							user_id					: _item.uid ? mongoose.Types.ObjectId(_item.uid) : null,
							banker_id				: _item.banker ? mongoose.Types.ObjectId(_item.banker) : null,
							parent_id				: _item.acc_parent_id ? mongoose.Types.ObjectId(_item.acc_parent_id) : null,
							name					: _item.acc_name ? String(_item.acc_name) : "",
							checked					: _item.acc_name ? Boolean(_item.checked) : null,
							is_confirm				: _item.is_sub ? Boolean(_item.is_sub) : false,
							is_sub					: _item.is_sub ? Boolean(_item.is_sub) : false,
							sub_user				: _item.sub_user ? String(_item.sub_user) : "",
							sub_pass				: _item.sub_pass ? String(_item.sub_pass) : "",
							sub_code				: _item.sub_code ? String(_item.sub_code) : "",
							sub_login_num			: _item.sub_login_num ? Number(_item.sub_login_num) : null,
							sub_locked				: _item.sub_locked ? Boolean(_item.sub_locked) : false,
							sub_locked_reason		: _item.sub_locked_reason ? String(_item.sub_locked_reason) : "",
							flag_type				: _item.flag_type ? Number(_item.flag_type) : null,
							data_center_sync		: _item.data_center_sync ? Boolean(_item.data_center_sync) : null,
							banker_locked			: _item.banker_locked ? Boolean(_item.banker_locked) : false,
							banker_locked_reason	: _item.banker_locked_reason ? String(_item.banker_locked_reason) : "",
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

	async AccountFormula(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await CongthuctinModel.find({
														deleted: {$eq: 0}
													})
													.lean()
													.limit(limit)
													.skip(skip * limit)
													.sort({created: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Account Formula Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))

						const query = new AccountFormulaModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							account_id				: _item.account_id ? mongoose.Types.ObjectId(_item.account_id) : null,
							member_id				: _item.user_id ? mongoose.Types.ObjectId(_item.user_id) : null,
							formula_id				: _item.congthucmau_id ? mongoose.Types.ObjectId(_item.congthucmau_id) : null,
							formula_group_id		: _item.formula_group_id ? mongoose.Types.ObjectId(_item.formula_group_id) : null,
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

export default new SyncAccount()


