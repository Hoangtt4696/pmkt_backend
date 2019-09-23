import fs from "fs"
import dotenv from "dotenv"
import path from "path"


const rootPath = path.dirname(__dirname)
dotenv.config({path: rootPath + "/../environments/.env"})
const NODE_ENV = process.env.NODE_ENV || "development"

const envConfig = dotenv.parse(fs.readFileSync(rootPath + `/../environments/.env.${NODE_ENV.toLowerCase()}`))
// Override variables
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}
