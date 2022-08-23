const express = require("express");
const { addNewBooks, getUserWithId } = require("../db/server/database");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const userId = req.cookies.userId;
    const books = req.body;
    getUserWithId(userId)
      .then((user) => {
        if (user.user_type === admin) {
          addNewBooks(userId, books)
            .then((newBook) => {
              res.json(newBook);
            })
            .catch((e) => {
              console.log(e);
              res.redirect("/home");
            });
        } else {
          res.status(401).send("Only seller will be able to add books");
          res.redirect("/login");
        }
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/home");
      });
  });
  return router;
};
