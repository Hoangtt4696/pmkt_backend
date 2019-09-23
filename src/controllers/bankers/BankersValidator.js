import { check } from "express-validator"

import BankersModel from "../../models/BankersModel"
import Exception from "../../utils/Exception"

const BankerValidator = {

    createHostBanker: [
        check('banker_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom( async value => {
                let isUnique = await BankersModel.checkBanker(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: value}))
                }
            }),

        check('host_url')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

    updateHostBanker: [
        check('banker_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom( async value => {
                let isUnique = await BankersModel.checkBanker(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: value}))
                }
            }),

        check('host_url')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),

        check('id')
            .custom( async (host_id, {req}) => {
                const banker_id = req.body.banker_id

                let isUnique = await BankersModel.checkHostBanker(banker_id, host_id)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: host_id}))
                }
            })

    ],

    deleteHostBanker: [
        check('banker_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom( async (value) => {
                let isUnique = await BankersModel.checkBanker(value)
                console.log("isUnique", isUnique)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: value}))
                }
            }),

        check('id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom( async (host_id, {req}) => {
                const banker_id = req.body.banker_id
                let isUnique = await BankersModel.checkHostBanker(banker_id, host_id)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: host_id}))
                }
            })
    ]

}

export default BankerValidator