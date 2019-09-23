import { check } from "express-validator"
import Exception from "../../utils/Exception"

const AccountFormulaValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/account-formula
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postCreateAccountFormula: [
        check('account_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check('member_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check('formula_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],
}

export default AccountFormulaValidator