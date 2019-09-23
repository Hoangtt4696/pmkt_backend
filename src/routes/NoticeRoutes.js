import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"
import NoticesController from "../controllers/notices/NoticesController"
import NoticesValidator from "../controllers/notices/NoticesValidator"

const router = express.Router()

router.get("/",ValidatorHandling(NoticesValidator.getList) ,NoticesController.list)
router.get("/:id", NoticesController.detail)
router.post("/",ValidatorHandling(NoticesValidator.postCreate) ,NoticesController.save)
router.put("/:id",ValidatorHandling(NoticesValidator.putUpdate), NoticesController.update)
router.delete("/:id",NoticesController.delete)


export default router