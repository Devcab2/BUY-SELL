const express = require("express");
const {
  getUserWithId,
  addNewFav,
  favBookPerUser,
} = require("../db/server/database");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.cookies.userId;
    getUserWithId(userId)
      .then((user) => {
        if (user.user_type === "admin") {
          favBookPerUser(userId)
            .then((booksArray) => {
              console.log("userFav", booksArray);
              const tempVars = { user: user, favBook: booksArray };
              res.render("favpage", tempVars); //<---!!!!!!change the EJS file name to yours
            })
            .catch((e) => {
              console.log(e);
              res.redirect("/home");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/home");
      });
  });

  // userId is not from cookie yet, still hardcode
  router.post("/:id", (req, res) => {
    const userId = req.cookies.userId;
    const bookId = req.params.id;
    console.log("User id and chosenbook", userId, bookId);
    addNewFav(userId, bookId)
      .then((fav) => {
        console.log(fav);
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/home");
      });
  });
  return router;
};
