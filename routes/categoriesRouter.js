const { Router } = require("express");
const categoriesRouter = Router();

const {
  getCategory,
  getCategories,
  getCreateCategory,
  createCategory,
  validateCreateCategory,
  getUpdateCategory,
} = require("../controllers/categoriesController");

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/create", getCreateCategory);
categoriesRouter.post("/create", validateCreateCategory, createCategory);
categoriesRouter.get("/:id", getCategory);
categoriesRouter.get("/:id/edit", getUpdateCategory);

module.exports = categoriesRouter;
