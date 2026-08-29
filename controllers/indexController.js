const db = require("../db/queries");

const getBooks = async (req, res) => {
  const books = await db.getAllBooks();
  res.render("index", { books });
};
const getCreateBook = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("create-book", { categories });
};

module.exports = { getBooks, getCreateBook };
