const pool = require("./pool");

// CREATE
const createBook = async (name, author, description, pages, category_fk) => {
  await pool.query(
    "INSERT INTO books (name, author, description, pages, category_fk) VALUES ($1, $2, $3, $4, $5)",
    [name, author, description, pages, category_fk],
  );
};
const createCategory = async (name, description) => {
  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2)",
    [name, description],
  );
};
// READ
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
const getBooksFromCategory = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM books WHERE category_fk = $1",
    [id],
  );
  return rows;
};
// UPDATE
const updateBook = async (
  id,
  name,
  author,
  description,
  pages,
  category_fk,
) => {
  await pool.query(
    "UPDATE books SET name = $2, author = $3, description = $4, pages = $5, category_fk = $6 WHERE id = $1",
    [id, name, author, description, pages, category_fk],
  );
};
const updateCategory = async (id, name, description) => {
  await pool.query(
    "UPDATE categories SET name = $2, description = $3 WHERE id = $1",
    [id, name, description],
  );
};
// DELETE
const removeBook = async (id) => {
  await pool.query("DELETE FROM books WHERE id = $1", [id]);
};
const removeCategory = async (id) => {
  await pool.query("DELETE FROM books WHERE category_fk = $1", [id]);
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
};
module.exports = {
  getAllBooks,
  getAllCategories,
  getBook,
  getCategory,
  createBook,
  removeBook,
  updateBook,
  createCategory,
  updateCategory,
  removeCategory,
  getBooksFromCategory,
};
