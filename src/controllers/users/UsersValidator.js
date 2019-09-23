import { check } from "express-validator"

import UsersSchema from "../../models/UsersModel"
import Exception from "../../utils/Exception"
const UserValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/user
    | Method: POST
    |--------------------------------------------------------------------------
    */
	postCreate: [
        // check('username')
        //     .custom( async value => {
        //         let isUnique = await UsersSchema.checkUniqueUsername(value)
        //         if(!isUnique){
        //             return Promise.reject(value + ' is already in use')
        //         }
        //     })

        // check("email")
        //     .isLength({ min: 5 }).withMessage("must be at least 5 chars long")
        //     .isEmail().withMessage("have to email"),
        // check("sub_email")
        //     .isLength({ min: 5 }).withMessage("must be at least 5 chars long")
        //     .isEmail().withMessage("have to email"),

        check('fullname')
                .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
                .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),

        check('password')
                .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
                .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
                .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,}$/)
                .withMessage(Exception.getMessage(Exception.VALIDATION.PASSWORD_FORMAT, {field: "Password"})),

       
        check('password2')
                .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
                .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
                .custom(async (value, { req }) => {
                    if(req.body.password !== req.body.password2)
                        return Promise.reject(Exception.getMessage(Exception.VALIDATION.REPASSWORD_INCORECT, { field: value }))
                }),

    ]
}

export default UserValidator