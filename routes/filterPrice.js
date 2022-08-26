const express = require("express");
const router = express.Router();
const { bookPriceFilters, getUserWithId } = require("../db/server/database");

module.exports = () => {
  router.post("/:price", (req, res) => {
    const maxBookPrice = req.params.price;
    console.log("passed in price", maxBookPrice);
    const userId = req.cookies.userId;
    getUserWithId(userId)
      .then(user => {
        bookPriceFilters(maxBookPrice)
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
