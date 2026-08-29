const { Router } = require("express");
const categoriesRouter = Router();

const {
  getCategory,
  getCategories,
  getCreateCategory,
} = require("../controllers/categoriesController");

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:create", getCreateCategory);
categoriesRouter.get("/:id", getCategory);

module.exports = categoriesRouter;
