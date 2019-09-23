import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import MCurrenciesController from "../controllers/m_currencies/MCurrenciesController"
import MCurrenciesValidator from "../controllers/m_currencies/MCurrenciesValidator"

const router = express.Router()

router.get("/check-exists", ValidatorHandling(MCurrenciesValidator.checkExists), MCurrenciesController.checkExists)

router.get("/", MCurrenciesController.list)
router.get("/:id", ValidatorHandling(MCurrenciesValidator.getMCurrenciesDetail), MCurrenciesController.detail)
router.post("/", ValidatorHandling(MCurrenciesValidator.createMCurrency), MCurrenciesController.save)
router.put("/:id", ValidatorHandling(MCurrenciesValidator.updateMCurrency), MCurrenciesController.update)
router.delete("/:id", ValidatorHandling(MCurrenciesValidator.deleteMCurrency), MCurrenciesController.delete)

export default router