const pool = require("./pool");

const getAllBooks = async () => {
  const { rows } = await pool.query(
    "SELECT books.id, books.name, books.author, books.description, books.pages, categories.name AS category FROM books INNER JOIN categories ON books.category_fk = categories.id",
  );
  return rows;
};
const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};
const getBook = async (id) => {
  const { rows } = await pool.query(
    "SELECT books.id, books.name, books.author, books.description, books.pages, categories.name AS category FROM books INNER JOIN categories ON books.category_fk = categories.id WHERE books.id = $1",
    [id],
  );
  return rows[0];
};
const getCategory = async (id) => {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

const createBook = async (name, author, description, pages, category_fk) => {
  await pool.query(
    "INSERT INTO books (name, author, description, pages, category_fk) VALUES ($1, $2, $3, $4, $5)",
    [name, author, description, pages, category_fk],
  );
};

const removeBook = async (id) => {
  await pool.query("DELETE FROM books WHERE id = $1", [id]);
};
module.exports = {
  getAllBooks,
  getAllCategories,
  getBook,
  getCategory,
  createBook,
  removeBook,
};
