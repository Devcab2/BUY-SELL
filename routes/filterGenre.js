const express = require("express");
const router = express.Router();
const { bookFilters, getUserWithId } = require("../db/server/database");

module.exports = () => {
  router.post("/:genre", (req, res) => {
    const bookGenre = req.params.genre;
    console.log("passed in genre", bookGenre);
    const userId = req.cookies.userId;
    getUserWithId(userId)
      .then(user => {
        bookFilters(bookGenre)
          .then((bookArray) => {
            console.log(bookArray);
            const tempVars = {
              books: bookArray,
              userId: req.cookies.userId,
              user: user
            };
            res.render("findBooks", tempVars);
          })
          .catch((e) => {
            console.log(e);
            res.redirect("/home");
          });
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/home");
      });
  });
  return router;
};
