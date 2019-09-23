import { validationResult } from "express-validator"

import Exception from "../utils/Exception"

/*
|--------------------------------------------------------------------------
| Define Validation Error Format
|--------------------------------------------------------------------------
*/
const ValidationFormatter = validationResult.withDefaults({
    formatter: (error) => {
        return {
            value: error.value,
            message: error.msg,
            field: error.param,
        }
    }
})


const ValidatorHandling = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = ValidationFormatter(req)
        if (errors.isEmpty()) return next()

        return res.jsonError({
            code: 400,
            message: Exception.getMessage(Exception.COMMON.VALIDATION_ERROR),
            errors: errors.mapped()
        })
    }
}

export default ValidatorHandling