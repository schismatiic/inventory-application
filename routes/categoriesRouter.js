const { Router } = require("express");
const categoriesRouter = Router();

const {
  getCategory,
  getCategories,
  getCreateCategory,
  createCategory,
  validateCreateCategory,
  getUpdateCategory,
  createUpdateCategory,
  getRemoveCategory,
  removeCategoryPost,
  validateRemoveCategory,
} = require("../controllers/categoriesController");

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/create", getCreateCategory);
categoriesRouter.post("/create", validateCreateCategory, createCategory);
categoriesRouter.get("/:id", getCategory);
categoriesRouter.get("/:id/edit", getUpdateCategory);
categoriesRouter.post(
  "/:id/edit",
  validateCreateCategory,
  createUpdateCategory,
);
categoriesRouter.get("/:id/remove", getRemoveCategory);
categoriesRouter.post(
  "/:id/remove",
  validateRemoveCategory,
  removeCategoryPost,
);

module.exports = categoriesRouter;
