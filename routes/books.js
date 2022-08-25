const express = require("express");
const router = express.Router();
const {  addNewBooks, getAllBooks, getUserWithId } = require("../db/server/database");

module.exports = () => {
  router.get("/", (req, res) => {
    const userId = req.cookies.userId;
    getUserWithId(userId)
      .then((user) => {
        getAllBooks()
          .then((books) => {
            const tempVars = {
              user,
              books,
              userId
            };
            return res.render("findBooks", tempVars);
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
