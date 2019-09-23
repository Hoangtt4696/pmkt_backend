const fs = require ("fs")
const dotenv = require("dotenv")

// dotenv.config({path: __dirname + "/.env"})
// const NODE_ENV = process.env.NODE_ENV || "development"



const envConfig = dotenv.parse(fs.readFileSync(__dirname + 'C:\Users\Admin\Desktop\sourcetree\libs\migrationDB\config\environments\.env.development'))
// Override variables
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}
