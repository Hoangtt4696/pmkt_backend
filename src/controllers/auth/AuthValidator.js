import { check } from "express-validator"

import Exception from "../../utils/Exception"
import Session from "../../utils/Session"
import HashPassword from "../../utils/HashPassword"

const AuthValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/login
    | Method: POST
    |--------------------------------------------------------------------------
    */
	postLogin: [
        check("username")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check("password")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/refresh-token
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postRefreshToken: [
        check("refresh_token")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/check-secure-code
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postCheckSecureCode: [
        check("secure_codes")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/change-secure-code
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postChangeSecureCode: [
        check("current_secure")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom(value => {
                    return Number(value) === Number(Session.get("user.secure_code"))
                }).withMessage(Exception.getMessage(Exception.VALIDATION.INCORRECT_FIELD)),
        check("new_secure")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check("re_new_secure")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom((value, { req }) => value === req.body.new_secure)
                .withMessage(Exception.getMessage(Exception.VALIDATION.NOT_SAME, {field: "secure code"})),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/change-password
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postChangePassword: [
        check("current_password")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,}$/)
                .withMessage(Exception.getMessage(Exception.VALIDATION.PASSWORD_FORMAT, {field: "Password"}))
            .custom(value => {
                    return Session.get("user.password") && HashPassword.compareHash(value, Session.get("user.password"))
                }).withMessage(Exception.getMessage(Exception.VALIDATION.INCORRECT_FIELD)),
        check("new_password")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,}$/)
                .withMessage(Exception.getMessage(Exception.VALIDATION.PASSWORD_FORMAT, {field: "Password"}))
            .custom((value, { req }) => value !== req.body.current_password)
                .withMessage(Exception.getMessage(Exception.VALIDATION.MUST_NOT_EQUAL, {first_field: "New Password", second_field: "Password"})),
        check("re_new_password")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,}$/)
                .withMessage(Exception.getMessage(Exception.VALIDATION.PASSWORD_FORMAT, {field: "Password"}))
            .custom((value, { req }) => value === req.body.new_password)
                .withMessage(Exception.getMessage(Exception.VALIDATION.NOT_SAME, {field: "password"})),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/change-password2
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postChangePassword2: [
        check("current_password2")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,}$/)
                .withMessage(Exception.getMessage(Exception.VALIDATION.PASSWORD_FORMAT, {field: "Password2"}))
            .custom(value => {
                    return Session.get("user.password2") && HashPassword.compareHash(value, Session.get("user.password2"))
                }).withMessage(Exception.getMessage(Exception.VALIDATION.INCORRECT_FIELD)),
        check("new_password2")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,}$/)
                .withMessage(Exception.getMessage(Exception.VALIDATION.PASSWORD_FORMAT, {field: "Password2"}))
            .custom((value, { req }) => value !== req.body.current_password2)
                .withMessage(Exception.getMessage(Exception.VALIDATION.MUST_NOT_EQUAL, {first_field: "New Password2", second_field: "Password2"})),
        check("re_new_password2")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,}$/)
                .withMessage(Exception.getMessage(Exception.VALIDATION.PASSWORD_FORMAT, {field: "Password2"}))
            .custom((value, { req }) => value === req.body.new_password2)
                .withMessage(Exception.getMessage(Exception.VALIDATION.NOT_SAME, {field: "password2"})),
    ],
}

export default AuthValidator