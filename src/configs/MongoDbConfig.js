import "../utils/LoadEnv"

const MongoDbConfig = {
	DB_SCHEME       : process.env.DB_SCHEME || "mongodb",
	DB_HOST         : process.env.DB_HOST || "127.0.0.1",
    DB_PORT         : process.env.DB_PORT || "27017",
    DB_USER         : process.env.DB_USER,
    DB_PASS         : process.env.DB_PASS,
    DB_NAME         : process.env.DB_NAME
}

export default MongoDbConfig
