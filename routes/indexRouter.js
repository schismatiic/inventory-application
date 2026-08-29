const { Router } = require("express");
const indexRouter = Router();

const {
  getBook,
  getBooks,
  getCreateBook,
  createBookPost,
  validateCreateBook,
  getRemoveBook,
  removeBookPost,
  validateRemoveBook,
  getUpdateBook,
  postUpdateBook,
} = require("../controllers/indexController");

indexRouter.get("/", getBooks);
indexRouter.get("/book/create", getCreateBook);
indexRouter.post("/book/create", validateCreateBook, createBookPost);
indexRouter.get("/book/:id", getBook);
indexRouter.get("/book/:id/remove", getRemoveBook);
indexRouter.post("/book/:id/remove", validateRemoveBook, removeBookPost);
indexRouter.get("/book/:id/edit", getUpdateBook);
indexRouter.post("/book/:id/edit", validateCreateBook, postUpdateBook);

module.exports = indexRouter;
