const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 25 characters.";
const lengthErr2 = "must be between 1 and 500 characters.";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const validateCreateBook = [
  body("bookName")
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Name ${lengthErr}`),
  body("bookAuthor")
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Author ${lengthErr}`),
  body("bookDescription")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage(`Description ${lengthErr2}`),
  body("bookPages")
    .trim()
    .notEmpty()
    .withMessage("Pages are required.")
    .isInt({ min: 1 })
    .withMessage("Pages must be a positive integer."),
  body("bookCategory")
    .trim()
    .notEmpty()
    .withMessage("Category are required.")
    .isInt({ min: 1 })
    .withMessage("Category must be a positive integer."),
  body("bookPassword")
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
const validateRemoveBook = [
  body("bookPassword")
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
const createBookPost = async (req, res) => {
  const errors = validationResult(req);
  const categories = await db.getAllCategories();
  if (!errors.isEmpty()) {
    return res.status(400).render("create-book", {
      errors: errors.array(),
      categories,
    });
  }
  const { bookName, bookAuthor, bookDescription, bookPages, bookCategory } =
    matchedData(req);
  await db.createBook(
    bookName,
    bookAuthor,
    bookDescription,
    bookPages,
    bookCategory,
  );
  res.redirect("/");
};
// READ
const getBook = async (req, res) => {
  const { id } = req.params;
  const { name, author, description, pages, category } = await db.getBook(id);
  res.render("book", { id, name, author, description, pages, category });
};
const getBooks = async (req, res) => {
  const books = await db.getAllBooks();
  res.render("index", { books });
};
const getCreateBook = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("create-book", { categories });
};
const getUpdateBook = async (req, res) => {
  const { id } = req.params;
  const categories = await db.getAllCategories();
  const { name, author, description, pages, category } = await db.getBook(id);
  res.render("update-book", {
    id,
    categories,
    name,
    author,
    description,
    pages,
    category,
  });
};
// UPDATE
const createUpdateBook = async (req, res) => {
  const { id } = req.params;
  const { name, author, description, pages, category } = await db.getBook(id);
  const errors = validationResult(req);
  const categories = await db.getAllCategories();
  if (!errors.isEmpty()) {
    return res.status(400).render("update-book", {
      errors: errors.array(),
      id,
      categories,
      name,
      author,
      description,
      pages,
      category,
    });
  }
  const { bookName, bookAuthor, bookDescription, bookPages, bookCategory } =
    matchedData(req);
  await db.updateBook(
    id,
    bookName,
    bookAuthor,
    bookDescription,
    bookPages,
    bookCategory,
  );
  res.redirect("/");
};
// DELETE
const getRemoveBook = async (req, res) => {
  const { id } = req.params;
  const { name } = await db.getBook(id);
  res.render("remove-book", { id, name });
};
const removeBookPost = async (req, res) => {
  const { id } = req.params;
  const { name } = await db.getBook(id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("remove-book", {
      errors: errors.array(),
      id,
      name,
    });
  }
  await db.removeBook(id);
  res.redirect("/");
};
module.exports = {
  getBook,
  getBooks,
  getCreateBook,
  createBookPost,
  validateCreateBook,
  getRemoveBook,
  removeBookPost,
  validateRemoveBook,
  getUpdateBook,
  createUpdateBook,
};
