import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import LanguageModel from "./model/old/LanguageModel"
import NoticeKeyModel from "./model/old/NoticeKeyModel"
import NoticeDescriptionModel from "./model/old/NoticeDescriptionModel"

import LanguagesModel_N from './model/LanguagesModel_N'
import NoticesModel_N from './model/NoticesModel_N'

class SyncLanguage {
	async Truncate() {
		return Promise.all([
			LanguagesModel_N.remove(),
			NoticesModel_N.remove()
		])
	}

	async Language(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await LanguageModel.find({
													deleted: {$eq: 0}
												})
												.lean()
												.limit(limit)
												.skip(skip * limit)
												.sort({ created: 1 })
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Language Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))

						const query = new LanguagesModel_N({
							_id				: mongoose.Types.ObjectId(_item._id),
							name			: _item.name ? String(_item.name) : "",
							code			: _item.code ? String(_item.code) : "",
							order			: _item.sort_order ? Number(_item.sort_order) : 9999,
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

	async Notice(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await NoticeKeyModel.find({
													deleted: {$eq: 0}
												})
												.lean()
												.limit(limit)
												.skip(skip * limit)
												.sort({ created: 1 })
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Notice Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))

						// Get Notice Content
						const noticeContent = await NoticeDescriptionModel.find({
														notice_key_id: mongoose.Types.ObjectId(_item._id),
														deleted: { $eq: 0 }
													})
													.lean()
						const contents = []
						if (noticeContent && noticeContent.length) {
							noticeContent.forEach(el => {
								const _el = JSON.parse(JSON.stringify(el))
								contents.push({
									_id				: mongoose.Types.ObjectId(_el._id),
									language_id		: mongoose.Types.ObjectId(_el.language_id),
									content			: String(_el.name).trim()
								})
							})
						}

						const query = new NoticesModel_N({
							_id				: mongoose.Types.ObjectId(_item._id),
							name			: _item.name ? String(_item.name).trim() : "",
							type			: _item.type ? Number(_item.type) : 0,
							date			: new Date(Number(_item.created) * 1000),
							contents		: contents,
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
}

export default new SyncLanguage()


