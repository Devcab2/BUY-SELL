const express = require('express');
const router  = express.Router();
const { createConversation, getAllUserConversations, getDetailsForSpecificConversation, getBookSellerName } = require("../db/server/database");

module.exports = () => {
  router.post("/:bookId", (req, res) => {
    const userId = req.cookies.userId;
    const bookId = req.params.bookId;
    createConversation(bookId)
      .then((conversation) => {
        const tempVars = { userId, bookId, conversation};
        res.render("newConversation", tempVars);
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/findBooks");
      });
  });

  router.post("/", (req, res) => {
    const userId = req.cookies.userId;
    const message = req.body;
    console.log("message:", message);
    const tempVars = {message, userId};
    res.render("conversations", tempVars);
  });

  return router;
};
