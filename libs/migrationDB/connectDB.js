
const Logger = require ("../../src/utils/Logger")
const Moment = require ("../../src/utils/Moment")

const mongoose = require('mongoose')


const UsersModel = require ("./UsersModel")
const UsersModel_N = require('./UsersModel_N')


const A = async () =>  {

try {
                    DB_SCHEME="mongodb"
                    DB_HOST="124.248.229.43"
                    DB_PORT=27017
                    DB_USER="mongoTest123"
                    DB_PASS="1111qqqq#Q"
                    DB_NAME="stt_manage_db"

                    DB_SCHEME_N="mongodb"
                    DB_HOST_N="124.248.229.43"
                    DB_PORT_N=27027
                    DB_USER_N="pmkt_dev"
                    DB_PASS_N="passpass"
                    DB_NAME_N="pmkt_db"

                
                // const DB_SCHEME = MongoDbConfig.DB_SCHEME 
                // const DB_HOST = MongoDbConfig.DB_HOST
                // const DB_PORT = MongoDbConfig.DB_PORT
                // const DB_USER = MongoDbConfig.DB_USER
                // const DB_PASS = MongoDbConfig.DB_PASS
                // const DB_NAME = MongoDbConfig.DB_NAME
    
                const uri = `${DB_SCHEME}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
                const uri_N = ` ${DB_SCHEME_N}://${DB_USER_N}:${DB_PASS_N}@${DB_HOST_N}:${DB_PORT_N}/${DB_NAME_N}`
                const options = {
                    connectTimeoutMS: 10000,
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    autoReconnect: true,
                    reconnectTries: Number.MAX_VALUE
                }

                
            await mongoose.connect(uri, options)
            if( process.env.NODE_ENV !== "test") console.log("|>>>>>>>>>>>>>>>>>>>>>>> Connect Mongo Database Successfully")
            const data = await UsersModel.find()
            console.log(data)
                
            

            await mongoose.connect(uri_N, options)
            
            if( process.env.NODE_ENV !== "test") console.log("|>>>>>>>>>>>>>>>>>>>>>>> Connect Mongo Database_N Successfully")
            const data_N = await UsersModel_N.find()
            console.log(data_N)
            
           


            // const modelA = connectDB_N.model('userTest', new mongoose.Schema({
            //     title : { type : String, default : 'model in testA database' }
            // }))

            // const modelB = connectDB_N.model('modelB', new mongoose.Schema({
            //     title : { type : String, default : 'model in testA database' }
            //   }))

            // const modelB_N = new modelB({ type:"test"})
            // modelB_N.save().then(() => console.log('save'))
            // const data_N = await UsersModel.find()
            // console.log(data_N)
            

            } catch (error) {
                Logger.log({
                    level: "error",
                    label: "MongoDb",
                    message: {
                        time: Moment.format(),
                        error: error
                    }
                })
                if( process.env.NODE_ENV !== "test") console.log("|>>>>>>>>>>>>>>>>>>>>>>> Cannot Connect Mongo Database")
            }
        }


        
      

A()




