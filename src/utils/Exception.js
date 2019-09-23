import _isEmpty from 'lodash/isEmpty'

const Exception = {}
Exception.COMMON = {
    REQUEST_SUCCESS         : "The request has succeeded",
    ITEM_CREATE_SUCCESS     : "The item was created successfully",
    ITEM_UPDATE_SUCCESS     : "The item was updated successfully",
    ITEM_DELETE_SUCCESS     : "The item was deleted successfully",
    ITEM_NOT_FOUND          : "The item does not exist",
    VALIDATION_ERROR        : "Validation errors in your request",
    SERVER_OVERLOAD         : "The server is up, but overloaded with requests. Try again later!",
    INTERNAL_ERROR          : "Unexpected Error",

    VALUE_EXISTS            : "{{field}} already exists",
    VALUE_NOT_EXISTS        : "{{field}} does not exists",
}

Exception.VALIDATION = {
    REQUIRE_FIELD           : "This field is required",
    REQUIRE_INCORECT        : "This field is incorect",
    INVALID_EMAIL           : "Please enter the valid email",
    INVALID_NUMBER          : "Please enter the number",
    IS_EXISTED              : "{{field}} is existed",
    INCORRECT_TYPE          : "Incorrect data type",
    NOT_FOUND_ERR           : "Not found item by {{field}}",
    NOT_SAME                : "Please enter the same {{field}}",
    INCORRECT_FIELD         : "This field is incorrect",
    PASSWORD_FORMAT         : "{{field}} had at least 8 char & contain 1 uppercase letter, 1 lowercase letter, 1 number, 1 special letter",
    MUST_NOT_EQUAL          : "{{first_field}} must not equal {{second_field}}",
    REPASSWORD_INCORECT     : "Confirm password incorect"
}

Exception.AUTH = {
    LOGIN_SUCCESS           : "You are successfully logged in",
    LOGIN_FAIL              : "You have entered an invalid username or password",
    ACCOUNT_LOCK            : "Account has been locked. Please contact to support",
    LOGOUT_SUCCESS          : "You have successfully logged out!",
    MISSING_TOKEN           : "No token provided.",
    MISSING_REFRESH_TOKEN   : "No refresh_token provided.",
    UNAUTHORIZED            : "Access denied due to missing subscription key. Make sure to include subscription key when making requests to this API.",
    INVALID_SECURE_CODE     : "Wrong security code"
}

Exception.getMessage = (message, params) => {
    try {
        if (!_isEmpty(params)) {
            Object.keys(params).forEach(key => {
                message = message.replace(`{{${key}}}`, params[key])
            })
        }
        return message
    } catch {
        return message
    }
}

export default Exception