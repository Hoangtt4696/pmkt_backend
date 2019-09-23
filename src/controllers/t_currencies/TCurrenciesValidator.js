import { check } from "express-validator"

import TCurrenciesModel from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception"

const TCurrenciesValidator = {

    saveConfig: [
        check('type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom( async value => {
                if( value !== 'all' && value !== 'single') return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
            }),

        check('data')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom( async value=> {
                try {
                    JSON.parse(value)
                } catch (e) {
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            }),
    ],

}

export default TCurrenciesValidator