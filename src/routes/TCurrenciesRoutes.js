import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import TCurrenciesController from "../controllers/t_currencies/TCurrenciesController"
import TCurrenciesValidator from "../controllers/t_currencies/TCurrenciesValidator"

const router = express.Router()

router.get("/", TCurrenciesController.list)
router.post("/save-config", ValidatorHandling(TCurrenciesValidator.saveConfig), TCurrenciesController.saveConfig)
router.put("/:id", ValidatorHandling(TCurrenciesValidator.updateTCurrencies), TCurrenciesController.update)


export default router