import Helper from "../utils/Helpers"

export default (req, res, next) => {

    // Initialization class Helpers with request & response
    Helper.instance(req, res)

    next()
}
