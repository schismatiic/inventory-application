const { Router } = require("express");
const categoriesRouter = Router();

const {
  getCategory,
  getCategories,
} = require("../controllers/categoriesController");

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:id", getCategory);

module.exports = categoriesRouter;
