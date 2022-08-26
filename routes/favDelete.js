const express = require("express");
const { favDelete } = require("../db/server/database");
const router = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res) => {
    const userId = req.cookies.userId;
    const bookId = req.params.id;
    favDelete(userId, bookId)
      .then((fav) => {
        console.log(fav);
        res.redirect("../../api/favourites");
      })
      .catch((e) => {
        console.error(e);
        res.redirect("/home");
      });
  });
  return router;
};
