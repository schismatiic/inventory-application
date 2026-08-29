const { Router } = require("express");
const categoriesRouter = Router();

const { getCategories } = require("../controllers/categoriesController");

categoriesRouter.get("/", getCategories);

module.exports = categoriesRouter;
