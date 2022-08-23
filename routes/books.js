const express = require('express');
const router  = express.Router();
const {getAllBooks} = require("../db/server/database");

module.exports = () => {
  router.get("/findBooks", (req, res) => {
    getAllBooks()
      .then(books => {
        console.log(books);
        res.render("findBooks", {books});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
