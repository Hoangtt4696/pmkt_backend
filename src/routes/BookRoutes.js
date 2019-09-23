import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import BooksController from "../controllers/books/BooksController"
import BooksValidator from "../controllers/books/BooksValidator"

const router = express.Router()

router.get("/", ValidatorHandling(BooksValidator.getBooks), BooksController.list)

export default router