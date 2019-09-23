import jwt from "jsonwebtoken"

import AuthConfig from "../../configs/AuthConfig"

class Authentication {
    constructor() {
    }

    getToken(payload) {
        const options = {
            expiresIn: AuthConfig.TOKEN_LIFE
        }
        return jwt.sign(payload || {}, AuthConfig.TOKEN_SECRET_KEY, options)
    }

    getRefreshToken(payload ) {
        const options = {
            expiresIn: AuthConfig.REFRESH_TOKEN_LIFE
        }
        return jwt.sign(payload || {}, AuthConfig.REFRESH_TOKEN_SECRET_KEY, options)
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, AuthConfig.TOKEN_SECRET_KEY)
        } catch {
            return false
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, AuthConfig.REFRESH_TOKEN_SECRET_KEY)
        } catch (err) {
            return false
        }
    }
}

export default new Authentication()