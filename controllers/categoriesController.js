const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

// CREATE
const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("create-book", {
      errors: errors.array(),
    });
  }
  const { categoryName, categoryDescription } = matchedData(req);
  await db.createCategory(categoryName, categoryDescription);
  res.redirect("/categories");
};
// READ
const getCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = await db.getCategory(id);
  res.render("category", { id, name, description });
};
const getCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
};
const getCreateCategory = async (req, res) => {
  res.render("create-category");
};

module.exports = {
  getCategory,
  getCategories,
  createCategory,
  getCreateCategory,
};
