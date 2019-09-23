import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import BookModel from "./model/old/BookModel"
import BankerModel from "./model/old/BankerModel"
import BankerHostModel from "./model/old/BankerHostModel"

import BooksModel_N from './model/BooksModel_N'
import BankersModel_N from './model/BankersModel_N'


const memberLinkConfig = {
	'332': {
		member_url: 'http://www.332bet.com/'
	},
	'3IN': {
		member_url: 'http://wwww.3in1bet.com/'
	},
	'7SA': {
		member_url: ''
	},
	'ABE': {
		member_url: ''
	},
	'ISN': {
		member_url: 'http://isn99.com/'
	},
	'B88': {
		member_url: 'http://www.bong88.com/'
	},
	'SBC': {
		member_url: 'http://www.sbc168.com/'
	},
	'SB8': {
		member_url: 'http://www.sbo868.com/'
	},
	'SBB': {
		member_url: 'http://www.sbobet.com/'
	},
	'V88': {
		member_url: 'http://vbong888.com/'
	},
	'EDY': {
		member_url: 'https://lvs788.com/'
	},
	'GDB': {
		member_url: 'http://gdbet.net/'
	},
	'SGD': {
		member_url: 'http://www.sgd777.com/'
	},
	'234VN': {
		member_url: 'http://www.234vn.net/'
	},
	'567VN': {
		member_url: 'http://www.567vn.net/'
	},
	'VN868': {
		member_url: 'http://www.vn868.com/'
	},
	'LD789': {
		member_url: 'http://ld789.net/'
	},
	'LT188': {
		member_url: 'http://loto188.com/'
	},
	'N789': {
		member_url: 'http://new789.net/'
	},
	'OK368': {
		member_url: 'http://www.ok368.biz/'
	},
	'SGN': {
		member_url: 'http://888.sgn888.com/'
	},
	'CFT': {
		member_url: 'http://s1288.net/'
	},
	'NCFT': {
		member_url: 'http://s128.net/'
	},
	'LVS': {
		member_url: ''
	},
	'TBS': {
		member_url: 'http://www.tbsbet.com'
	},
	'ASB': {
		member_url: 'https://www.sbobet.com/'
	},
	'SV3': {
		member_url: 'http://www.sv388.com/'
	},
	'NAGA': {
		member_url: 'http://fish.cash/'
	},
	'SABONG': {
		member_url: 'http://ss5456.com/'
	},
	'MBS39': {
		member_url: 'https://www.mbs39.com/'
	},
	'CFC': {
		member_url: 'http://cfc88.net'
	},
	'S1288': {
		member_url: 'http://www4.s1288.net/'
	},
	'HK1119': {
		member_url: 'http://hk1101.com/'
	},
	'6D9VN': {
		member_url: 'http://www.vn9988.info/'
	},
	'SB668': {
		member_url: 'http://www.sb668.com/'
	},
	'IBC': {
		member_url: 'http://www.maxbet.com/'
	}
}

class SyncBanker {
	async Truncate() {
		return Promise.all([
			BooksModel_N.remove(),
			BankersModel_N.remove()
		])
	}

	async Book(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await BookModel.find({
												deleted: {$eq: 0}
											})
											.lean()
											.limit(limit)
											.skip(skip * limit)
											.sort({created: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Books Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))
						const query = new BooksModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							name					: String(_item.book_name),
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

	async Banker(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await BankerModel.find({
													deleted: {$eq: 0}
												})
												.lean()
												.limit(limit)
												.skip(skip * limit)
												.sort({created: 1})
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Banker Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))

						let url = ""
						if (memberLinkConfig[_item.short_name.toUpperCase()]) {
							url = memberLinkConfig[_item.short_name.toUpperCase()].member_url
						}

						// Get Banker Host
						const bankerHost = await BankerHostModel.find({
																	banker_id: mongoose.Types.ObjectId(_item._id),
																	deleted: {$eq: 0}
																	})
																	.lean()
						let agentHost = []
						if (bankerHost && bankerHost.length) {
							bankerHost.forEach(el => {
								const _el = JSON.parse(JSON.stringify(el))
								agentHost.push({
									_id		: mongoose.Types.ObjectId(),
									url		: _el.host ? _el.host.toLowerCase() : ""
								})
							})
						}
						
						const query = new BankersModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							book_id					: mongoose.Types.ObjectId(_item.book_id),
							name					: _item.name ? String(_item.name) : "",
							short_name				: _item.short_name ? String(_item.short_name) : "",
							need_security			: _item.need_security ? Boolean(_item.need_security) : false,
							agent_host				: agentHost,
							url						: String(url),
							status					: Boolean(_item.status) === true ? "active" : "inactive"
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

export default new SyncBanker()


