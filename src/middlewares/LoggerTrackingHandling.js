import uuidv4 from "uuid/v4"

import LoggerConfig from "../configs/LoggerConfig"
import Logger from "../utils/Logger"
import Moment from "../utils/Moment"

/*
|--------------------------------------------------------------------------
| Unexpected Request From Node Engine
|--------------------------------------------------------------------------
*/
const exceptedPath = [
	"/contentDocumentStart.js"
]

export default (req, res, next) => {
	// Tracking request data
	if (LoggerConfig.LOGGER_ENABLE_TRACKING && exceptedPath.indexOf(req.url) === -1 && process.env.NODE_ENV !== "test") {
		const objLogger = {
			level: "info",
			label: "REQUEST_TRACKING",
			message: {
				type: "REQUEST",
				uuid: uuidv4(),
				time: Moment.format(),
				path: req.url,
				header: req.headers,
				body: req.body,
				method: req.method,
				response: null,
				ip: req.ip
			}
		}
		Logger.log(objLogger)

		// Tracking response data
		if (LoggerConfig.LOGGER_ENABLE_TRACKING_RESPONSE) {
			// Parse Response body
			const { write, end } = res
			const chunks = []
		
			res.write = function newWrite(chunk) {
				chunks.push(chunk)
				write.apply(res, arguments)
			}
		
			res.end = function newEnd(chunk) {
				if (chunk) { chunks.push(chunk) }
				end.apply(res, arguments)
			}
			// Write log when request finish
			res.once("finish", () => {
				objLogger.message.response = {
					statusCode: res.statusCode,
					statusMessage: res.statusMessage,
				}
				
				try {
					objLogger.message.response.body = JSON.parse(Buffer.concat(chunks).toString("utf8"))
				} catch {
					objLogger.message.response.body = Buffer.concat(chunks).toString("utf8")
				}

				objLogger.message.type = "RESPONSE"
				Logger.log(objLogger)
			})
		} else {
			// Write log when request finish
			res.once("finish", () => {
				objLogger.message.type = "RESPONSE"
				Logger.log(objLogger)
			})
		}
	}
	next()
}
