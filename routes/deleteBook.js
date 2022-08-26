const express = require("express");
const { bookDelete } = require("../db/server/database");
const router = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    const bookId = req.params.id;
    bookDelete(bookId)
      .then((fav) => {
        console.log(fav);
        res.redirect("../../api/books");
      })
      .catch((e) => {
        console.error(e);
        res.redirect("/home");
      });
  });
  return router;
};
