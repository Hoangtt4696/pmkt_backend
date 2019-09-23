import Logger from "../utils/Logger"
import Moment from "../utils/Moment"
import Exception from "../utils/Exception"

export default (err, req, res, next) => {
	Logger.log({
        level: "error",
        label: "INTERNAL_SERVER_ERROR",
        message: {
            time: Moment.format(),
            path: req.url,
            header: req.headers,
            body: req.body,
            method: req.method,
            error_name: err.name,
            error: err.stack.toString(),
            ip: req.ip
        }
    })
    
    // Response data
    if (process.env.NODE_ENV === "production") {
        res.jsonError({
            code: 500,
            message: Exception.getMessage(Exception.COMMON.INTERNAL_ERROR)
        })
    }

    res.jsonError({
        code: 500,
        message: err.message.toString(),
        errors: err.stack.toString()
    })
}
