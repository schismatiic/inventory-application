const db = require("../db/queries");

const getBooks = async (req, res) => {
  const books = await db.getAllBooks();
  res.render("index", { books });
};
