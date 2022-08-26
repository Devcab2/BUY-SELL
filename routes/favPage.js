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
        favBookPerUser(userId)
          .then((booksArray) => {
            console.log("userFav", booksArray);
            const tempVars = { userId: user.id, user, favBooks: booksArray };
            console.log(tempVars);
            res.render("favPage", tempVars);
          })
          .catch((e) => {
            console.log(e);
            res.redirect("/home");
          });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/home");
      });
  });


  router.post("/:id", (req, res) => {
    const userId = req.cookies.userId;
    const bookId = req.params.id;
    addNewFav(userId, bookId)
      .then((fav) => {
        console.log(fav);
        res.redirect("../../api/books");
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/home");
      });
  });
  return router;
};
