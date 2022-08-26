const express = require("express");
const router = express.Router();
const { bookFilters } = require("../db/server/database");

module.exports = () => {
  router.post("/:filter", (req, res) => {
    const bookGenre = req.params.genre;
    console.log("passed in filter", bookGenre);
    bookFilters(bookGenre)
      .then((bookArray) => {
        console.log(bookArray);
        const tempVars = { books: bookArray };
        res.render("findBooks", tempVars);
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/home");
      });
  });
  return router;
};
