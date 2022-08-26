const express = require("express");
const router = express.Router();
const { bookPriceFilters } = require("../db/server/database");

module.exports = () => {
  router.post("/:price", (req, res) => {
    const maxBookPrice = req.params.price;
    console.log("passed in filter", maxBookPrice);
    bookPriceFilters(maxBookPrice)
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
