import express from 'express'

import ValidatorHandling from '../middlewares/ValidatorHandling'

import AccountsController from '../controllers/accounts/AccountsController'
import AccountsValidator from '../controllers/accounts/AccountsValidator'

const router = express.Router()

router.get('/', AccountsController.list)
router.post('/', ValidatorHandling(AccountsValidator.postCreateAccount), AccountsController.save)
router.get('/:id', AccountsController.detail)
router.put('/:id', ValidatorHandling(AccountsValidator.putUpdateAccount), AccountsController.update)
router.delete('/:id', AccountsController.delete)

export default router