import {check} from "express-validator"
import Exception from "../../utils/Exception"
import Session from '../../utils/Session'

import AccountsModel from '../../models/AccountsModel'

const AccountsValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/accounts
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postCreateAccount: [
        check('banker_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check('sub_user')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom(async (name, {req}) => {
                try {
                    const options = {
                        banker_id: req.body.banker_id,
                        sub_user: req.body.sub_user,
                        user_id: Session.get('user._id')
                    }

                    const account = await AccountsModel.checkExisted(options)

                    if (account) throw new Error()
                } catch (e) {
                    throw e
                }
            }).withMessage(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, {field: 'Account'})),
        check('sub_pass')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

    /*
   |--------------------------------------------------------------------------
   | Routes /api/v1/accounts/:id
   | Method: PUT
   |--------------------------------------------------------------------------
   */
    putUpdateAccount: [
        check('banker_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check('sub_user')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom(async (name, {req}) => {
                try {
                    const options = {
                        _id: {$ne: req.params.id},
                        banker_id: req.body.banker_id,
                        sub_user: req.body.sub_user,
                    }

                    const account = await AccountsModel.checkExisted(options)

                    if (account) throw new Error()
                } catch (e) {
                    throw e
                }
            }).withMessage(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, {field: 'Account'}))
    ]
}

export default AccountsValidator