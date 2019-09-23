/*
|--------------------------------------------------------------------------
| Config Pm2 System
|--------------------------------------------------------------------------
*/
const path = require("path")
const moment = require("moment")

const logPath = path.join(__dirname, `/logs/${moment().format("YYYY/MM/DD")}`)

module.exports = {
	apps: [{
		name: "Nodejs rest api",
		script: "src/app.js",
		node_args: "-r esm --experimental-modules",
		// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
		instances: 1,
		autorestart: true,
		watch: true,
		max_memory_restart: "8G",

		// Config Log
		error_file: `${logPath}/pm2-error.log`
	}],
}
