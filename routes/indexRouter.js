const { Router } = require("express");
const indexRouter = Router();

const { getBooks } = require("../controllers/indexController");

indexRouter.get("/", getBooks);

module.exports = indexRouter;
