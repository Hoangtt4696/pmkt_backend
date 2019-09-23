import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"
import FormulaGroupsController from "../controllers/formula-groups/FormulaGroupsController"
import FormulaGroupsValidator from "../controllers/formula-groups/FormulaGroupsValidator"

const router = express.Router()

router.get("/", FormulaGroupsController.list)
router.get("/check-exists-name/",ValidatorHandling(FormulaGroupsValidator.checkExistName), FormulaGroupsController.checkExistName)
router.get("/:id", FormulaGroupsController.detail)
router.post("/",ValidatorHandling(FormulaGroupsValidator.postCreate),FormulaGroupsController.save)
router.post("/by-banker/:id",ValidatorHandling(FormulaGroupsValidator.postAddByBanker),FormulaGroupsController.addByBanker)
router.put("/:id",  FormulaGroupsController.update)
router.delete("/:id",  FormulaGroupsController.delete)
router.delete("/by-banker/:id", ValidatorHandling(FormulaGroupsValidator.postDeleteByBanker) ,FormulaGroupsController.deleteByBanker)

export default router