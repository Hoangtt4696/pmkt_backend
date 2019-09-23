export default ( req, res, next) => {
    // Define response format incase success
    res.jsonSuccess = ({...args}) => {
        let objRes = {
            success: true,
            message: args.message || null,
            data: args.data !== undefined ? args.data : null
        }

        if (args.total && Number(args.total)) objRes.total = Number(args.total)
        if (args.token) objRes.token = String(args.token)
        if (args.refresh_token) objRes.refresh_token = String(args.refresh_token)

        return res.status(args.code || 200).json(objRes)
    }

    // Define response format incase error
    res.jsonError = ({...args}) => {
        let objRes = {
            success: false,
            message: args.message || null,
            errors: args.errors || null
        }

        return res.status(args.code || 404).json(objRes)
    }
    next()
}