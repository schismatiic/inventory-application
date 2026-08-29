const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 25 characters.";
const lengthErr2 = "must be between 1 and 100 characters.";

const validateMessage = [
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
    .isLength({ min: 1, max: 100 })
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
];

const getBooks = async (req, res) => {
  const books = await db.getAllBooks();
  res.render("index", { books });
};
const getCreateBook = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("create-book", { categories });
};
const createBook = async (req, res) => {
  const errors = validationResult(req);
  const categories = await db.getAllCategories();
  if (!errors.isEmpty()) {
    return res.status(400).render("create-book", {
      title: "Create book",
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

module.exports = { getBooks, getCreateBook, createBook, validateMessage };
