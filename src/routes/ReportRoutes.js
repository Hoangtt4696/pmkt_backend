import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import ReportsController from "../controllers/reports/ReportsController"
import ReportsValidator from "../controllers/reports/ReportsValidator"

const router = express.Router()

router.get("/", ReportsController.list)
router.get("/:id", ReportsController.detail)
router.delete("/:id", ReportsController.delete)

export default router