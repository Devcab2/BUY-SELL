const express = require("express");
const { singleBook } = require("../db/server/database");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    const userId = req.cookies.userId;
    res.render("singleBook", { userId });
  });

  router.post("/:id", (req, res) => {
    const userId = req.cookies.userId;
    const bookId = req.params.id;
    singleBook(bookId)
      .then((book) => {
        const temVars = {
          userId,
          book,
        };
        res.render("singleBook", temVars);
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/");
      });
  });
  return router;
};
