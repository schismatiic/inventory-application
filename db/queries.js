const pool = require("./pool");

const getAllBooks = async () => {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
};
const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};
const getBook = async (id) => {
  const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return rows[0];
};
const getCategory = async (id) => {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
};
module.exports = {
  getAllBooks,
  getAllCategories,
  getBook,
  getCategory,
};
