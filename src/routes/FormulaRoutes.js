import express from "express"

import ValidatorHandling from '../middlewares/ValidatorHandling'
import FormulasController from '../controllers/formulas/FormulasController'
import FormulasValidator from '../controllers/formulas/FormulasValidator'

const router = express.Router()

router.get('/', FormulasController.list)
router.get('/check-exists', ValidatorHandling(FormulasValidator.getCheckExists), FormulasController.checkExists)
router.get('/:id', FormulasController.detail)
router.post('/', ValidatorHandling(FormulasValidator.postCreateFormula), FormulasController.save)
router.put('/:id', ValidatorHandling(FormulasValidator.putUpdateFormula), FormulasController.update)
router.delete('/:id',FormulasController.delete)

export default router