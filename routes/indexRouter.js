const { Router } = require("express");
const indexRouter = Router();

const { getBooks, getCreateBook } = require("../controllers/indexController");

indexRouter.get("/", getBooks);
indexRouter.get("/create-book", getCreateBook);

module.exports = indexRouter;
