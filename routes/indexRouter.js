const { Router } = require("express");
const indexRouter = Router();

const {
  getBook,
  getBooks,
  getCreateBook,
  createBook,
  validateMessage,
} = require("../controllers/indexController");

indexRouter.get("/", getBooks);
indexRouter.get("/book/create", getCreateBook);
indexRouter.post("/book/create", validateMessage, createBook);
indexRouter.get("/book/:id", getBook);

module.exports = indexRouter;
