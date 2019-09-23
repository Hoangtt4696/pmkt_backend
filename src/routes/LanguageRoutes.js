import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"
import LanguagesController from "../controllers/languages/LanguagesController"
import LanguagesValidator from "../controllers/languages/LanguagesValidator"

const router = express.Router()

router.get("/",ValidatorHandling(LanguagesValidator.getList), LanguagesController.list)
router.get("/code", LanguagesController.detail)
router.post("/", ValidatorHandling(LanguagesValidator.postCreate),LanguagesController.save)
router.put("/:id",ValidatorHandling(LanguagesValidator.UpdateLanguage), LanguagesController.update)
router.delete("/:id",LanguagesController.delete)


export default router