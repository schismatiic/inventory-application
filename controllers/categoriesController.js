const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const getCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = await db.getCategory(id);
  res.render("category", { id, name, description });
};
const getCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
};

module.exports = { getCategory, getCategories };
