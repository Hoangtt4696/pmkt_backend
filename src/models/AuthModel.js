import UsersModel from "./UsersModel"
import HashPassword from "../utils/HashPassword"
import Helpers from "../utils/Helpers"

const TYPE = {
	LOGIN_SUCCESS	: "LOGIN_SUCCESS",
	LOGIN_FAILED	: "LOGIN_FAILED",
	ACCOUNT_LOCK	: "ACCOUNT_LOCK"
}

class AuthModel {

	/*
	|--------------------------------------------------------------------------
	| Check username & password user
	|--------------------------------------------------------------------------
	*/
	async login (username, password) {
		if (username && password) {
			username = username.trim()
			password = password.trim()
			const userInfo = await UsersModel.findOne({
												username: String(username),
												status: "active"
											})
											.select("-status -createdBy -createdAt -updatedBy -updatedAt")
											.lean()
			if (userInfo) {
				const passMD5 = HashPassword.md5(password)
				// Login By password2
				if (userInfo.is_updated_password2 === false) {
					if (passMD5 === userInfo.old_password2) {
						// Check User Lock
						if (this.checkUserLock(userInfo)) return { status: false, type: TYPE.ACCOUNT_LOCK }
						// Update new is_updated_password2
						return this.afterLoginSuccess(userInfo, { is_updated_password2: true, password2: HashPassword.hash(password), is_lock: true })
					}
				} else {
					if (HashPassword.compareHash(password, userInfo.password2)) {
						// Check User Lock
						if (this.checkUserLock(userInfo)) return { status: false, type: TYPE.ACCOUNT_LOCK }
						return this.afterLoginSuccess(userInfo, { is_lock: true })
					}
				}

				// Login By Password
				if (userInfo.is_updated_password === false) {
					if (passMD5 === userInfo.old_password) {
						// Check User Lock
						if (this.checkUserLock(userInfo)) return { status: false, type: TYPE.ACCOUNT_LOCK }
						return this.afterLoginSuccess(userInfo, { is_updated_password: true, password: HashPassword.hash(password) })
					}
				} else {
					if (HashPassword.compareHash(password, userInfo.password)) {
						// Check User Lock
						if (this.checkUserLock(userInfo)) return { status: false, type: TYPE.ACCOUNT_LOCK }
						return this.afterLoginSuccess(userInfo)
					}
				}

				// Update when user login fail
				this.afterLoginFailed(userInfo)
			}
		}
		return { status: false, type: TYPE.LOGIN_FAILED }
	}

	/*
	|--------------------------------------------------------------------------
	| Process after login success / post-
	|--------------------------------------------------------------------------
	*/
	async afterLoginSuccess(userInfo, data = {}) {
		const formData = { ...data,
							login_failed: 0,
							login_ip: Helpers.getRemoteIpAddress()
						}
		const user = await UsersModel.findOneAndUpdate({ _id: userInfo._id}, formData, { new: true})
										.select("-status -createdBy -createdAt -updatedBy -updatedAt")
										.lean()
		return { status: true, type: TYPE.LOGIN_SUCCESS, payload: this.excludeFieldsUserInfo(user), origin_payload: user }
	}

	/*
	|--------------------------------------------------------------------------
	| Process after login success
	|--------------------------------------------------------------------------
	*/
	async afterLoginFailed(userInfo, data = {}) {
		const formData = { ...data,
							login_failed: Number(userInfo.login_failed) + 1
						}
		await UsersModel.findOneAndUpdate({_id: userInfo._id}, formData, { new: true})
	}
	
	/*
	|--------------------------------------------------------------------------
	| Check user info is locked (login failed over 5 times)
	|--------------------------------------------------------------------------
	*/
	checkUserLock(payload) {
		try {
			return payload.login_failed > 5 ? true : false
		} catch {
			return true
		}
	}

	/*
	|--------------------------------------------------------------------------
	| Remove unnecessary fields when response to client
	|--------------------------------------------------------------------------
	*/
	excludeFieldsUserInfo(payload) {
		const excludeFields = ["password", "password2", "old_password", "old_password2", "is_updated_password", "is_updated_password2"]
		try {
			payload = JSON.parse(JSON.stringify(payload))
			excludeFields.forEach(item => delete payload[item])
			return payload
		} catch {
			return payload
		}
	}
}

export default new AuthModel()
export {
	TYPE
}