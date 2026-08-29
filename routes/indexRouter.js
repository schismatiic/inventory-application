const { Router } = require("express");
const indexRouter = Router();

const {
  getBooks,
  getCreateBook,
  createBook,
  validateMessage,
} = require("../controllers/indexController");

indexRouter.get("/", getBooks);
indexRouter.get("/create-book", getCreateBook);
indexRouter.post("/create-book", validateMessage, createBook);

module.exports = indexRouter;
