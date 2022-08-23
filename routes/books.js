const express = require("express");
const router = express.Router();
const { getAllBooks, getUserWithId } = require("../db/server/database");

module.exports = () => {
  router.get("/findBooks", (req, res) => {
    userId = req.cookies.userId;
    getUserWithId(userId)
      .then((user) => {
        getAllBooks()
          .then((books) => {
            console.log(books, user);
            const tempVars = {
              user,
              books,
            };
            res.render("findBooks", tempVars);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return router;
};
