const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const getCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
};

module.exports = { getCategories };
