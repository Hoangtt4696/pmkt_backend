import session from "express-session"
import connectMongo from "connect-mongo"

import MongoDb from "../databases/MongoDb"
import Session from "../utils/Session"
import SessionConfig from "../configs/SessionConfig"

const MongoStore = connectMongo(session)
const MongoOpts = MongoDb.getOptions()
// Remove unnecessary value
delete MongoOpts["useCreateIndex"]
delete MongoOpts["useFindAndModify"]

const mongoSessionStore = new MongoStore({
    url: MongoDb.getUri(),
    mongoOptions: MongoOpts
})

const SessionMiddleware = session({
    secret: SessionConfig.SESSION_SECRET_KEY,
    saveUninitialized: true, // don't create session until something stored
    resave: true, //don't save session if unmodified
    store: mongoSessionStore,
    cookie: { maxAge: SessionConfig.SESSION_MAX_AGE },
})

const SessionHandling = ( req, res, next) => {
    Session.instance(req.session)
    next()
}


export default SessionMiddleware
export {
    SessionHandling
}