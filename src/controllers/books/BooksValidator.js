import { check } from "express-validator"

import BooksModel from "../../models/BooksModel"
import Exception from "../../utils/Exception"

const BooksValidator = {
    getBooks: [

        check(`sort[${'*'}]`)
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom( async value => {
                if(value !== 'asc' && value !== '1' && value !== '-1' && value !== 'desc'){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            }),

        // check('limit')
        //     .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
        //     .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
        //     .isNumeric().withMessage(Exception.getMessage(Exception.VALIDATION.INVALID_NUMBER))
        //     .custom( async value => {
        //         if(Number(value) < 0) return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
        //     }),
        //
        // check('page')
        //     .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
        //     .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
        //     .isNumeric().withMessage(Exception.getMessage(Exception.VALIDATION.INVALID_NUMBER))
        //     .custom( async value => {
        //         if(Number(value) < 1) return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
        //     }),
    ]

}

export default BooksValidator