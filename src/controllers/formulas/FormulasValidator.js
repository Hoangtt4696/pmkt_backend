import {check} from "express-validator"
import Exception from "../../utils/Exception"
import Session from '../../utils/Session'

import FormulasModel from '../../models/FormulasModel'

const FormulasValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/formulas
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postCreateFormula: [
        check('banker_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check('formula_format_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check('rec_pay')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom((val) => {
                if (Number(val) !== -1 && Number(val) !== 1) {
                    throw new Error()
                }

                return true
            }).withMessage(Exception.getMessage(Exception.VALIDATION.INCORRECT_FIELD)),
        check('t_currency_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/formulas/:id
    | Method: PUT
    |--------------------------------------------------------------------------
    */
    putUpdateFormula: [
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom(async (val, { req }) => {
                const formula = await FormulasModel.checkExisted({
                    _id: { $ne: req.params.id },
                    name: val
                })

                if (formula) throw new Error()

                return true
            }).withMessage(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: 'Formula name' }))
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/formulas/:id
    | Method: GET
    |--------------------------------------------------------------------------
    */
    getCheckExists: [
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
    ],
}

export default FormulasValidator