const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const lengthErr = "must be between 1 and 25 characters.";
const lengthErr2 = "must be between 1 and 100 characters.";
const validateCreateCategory = [
  body("categoryName")
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Name ${lengthErr}`),
  body("categoryDescription")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`Description ${lengthErr2}`),
  body("categoryPassword")
    .trim()
    .notEmpty()
    .withMessage("Password are required.")
    .isLength({ min: 1, max: 25 })
    .withMessage(`Password ${lengthErr}`)
    .custom((value, { req }) => {
      return value === ADMIN_PASSWORD;
    })
    .withMessage("Password do not match."),
];
const validateRemoveCategory = [
  body("categoryPassword")
    .trim()
    .notEmpty()
    .withMessage("Password are required.")
    .isLength({ min: 1, max: 25 })
    .withMessage(`Password ${lengthErr}`)
    .custom((value, { req }) => {
      return value === ADMIN_PASSWORD;
    })
    .withMessage("Password do not match."),
];
// CREATE
const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("create-category", {
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
const getUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = await db.getCategory(id);
  res.render("update-category", { id, name, description });
};
// UPDATE
const createUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = await db.getCategory(id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("update-category", {
      errors: errors.array(),
      id,
      name,
      description,
    });
  }
  const { categoryName, categoryDescription } = matchedData(req);
  await db.updateCategory(id, categoryName, categoryDescription);
  res.redirect("/categories");
};
// DELETE
const getRemoveCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = await db.getCategory(id);
  res.render("remove-category", { id, name });
};
const removeCategoryPost = async (req, res) => {
  const { id } = req.params;
  const { name } = await db.getCategory(id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("remove-book", {
      errors: errors.array(),
      id,
      name,
    });
  }
  await db.removeCategory(id);
  res.redirect("/categories");
};
module.exports = {
  getCategory,
  getCategories,
  createCategory,
  getCreateCategory,
  validateCreateCategory,
  getUpdateCategory,
  createUpdateCategory,
  getRemoveCategory,
  removeCategoryPost,
  validateRemoveCategory,
};
