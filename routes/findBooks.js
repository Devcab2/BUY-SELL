const express = require("express");
const router = express.Router();
const { getAllBooks, getUserWithId } = require("../db/server/database");

module.exports = () => {
  router.get("/findBooks", (req, res) => {
    const userId = req.cookies.userId;
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
            console.log(err);
            res.redirect("/home");
          });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/home");
      });
  });

  router.post("/api/conversations/:id", (req, res) => {
    console.log("message submit button");
  });

  return router;
};
