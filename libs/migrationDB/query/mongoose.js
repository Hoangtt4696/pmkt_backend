const mongoose = require('mongoose');

DB_SCHEME = "mongodb"
DB_HOST = "124.248.229.43"
DB_PORT = 27017
DB_USER = "mongoTest123"
DB_PASS = "1111qqqq#Q"
DB_NAME = "stt_manage_db"

DB_SCHEME_N = "mongodb"
DB_HOST_N = "124.248.229.43"
DB_PORT_N = 27027
DB_USER_N = "pmkt_dev"
DB_PASS_N = "passpass"
DB_NAME_N = "pmkt_db"


const uri = `${DB_SCHEME}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
const uri_N = `${DB_SCHEME_N}://${DB_USER_N}:${DB_PASS_N}@${DB_HOST_N}:${DB_PORT_N}/${DB_NAME_N}`
const options = {
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE
}


mongoose.db = mongoose.createConnection(uri, options)
if (process.env.NODE_ENV !== "test") console.log("|>>>>>>>>>>>>>>>>>>>>>>> Connect Mongo Database Successfully")

mongoose.db_N = mongoose.createConnection(uri_N, options)
if (process.env.NODE_ENV !== "test") console.log("|>>>>>>>>>>>>>>>>>>>>>>> Connect Mongo Database_N Successfully")

module.exports = mongoose;









