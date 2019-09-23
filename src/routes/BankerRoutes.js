import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import BankersController from "../controllers/bankers/BankersController"
import BankersValidator from "../controllers/bankers/BankersValidator"

const router = express.Router()

router.get("/", BankersController.list)
router.post("/host", ValidatorHandling(BankersValidator.createHostBanker), BankersController.save)
router.put("/host/:id", ValidatorHandling(BankersValidator.updateHostBanker),BankersController.update)
router.delete("/host/:id", ValidatorHandling(BankersValidator.deleteHostBanker),BankersController.delete)


export default router