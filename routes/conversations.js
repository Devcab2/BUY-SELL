const express = require('express');
const router  = express.Router();
const { createConversation, getAllUserConversations, getMessagesForSpecificConversation, getBookSellerName } = require("../db/server/database");

module.exports = () => {
  router.post("/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    createConversation(bookId)
      .then((conversation) => {
        console.log("createConversation:", conversation);
        res.redirect(`/api/conversations/newConversation/${bookId}/${conversation.id}`);
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/findBooks");
      });
  });

  router.get("/newConversation/:bookId/:conversation", (req, res) => {
    const userId = req.cookies.userId;
    const bookId = req.params.bookId;
    const conversation = req.params.conversation;
    console.log("bookId:", bookId);
    console.log("newConversation:", conversation);
    getBookSellerName(bookId)
      .then((seller) => {
        const tempVars = { userId, seller: seller.seller, bookId, conversation};
        console.log("seller:",seller.seller);
        res.render("newConversation", tempVars);
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/findBooks");
      });
  });

  router.post("/", (req, res) => {
    const userId = req.cookies.userId;
    console.log("body:", req.body);
    const tempVars = { userId };
    res.render("conversations", tempVars);
  });


  router.get("/", (req, res) => {
    const userId = req.cookies.userId;
    console.log("userID:", userId);
    getAllUserConversations(userId)
      .then((conversations) => {
        console.log("conversations:", conversations);

        getMessagesForSpecificConversation(conversations)
          .then((messages) => {
            const tempVars = {messages, userId};
            console.log("messages:", messages);
            res.redirect("conversations", tempVars);
          })
          .catch((err) => {
            console.log(err);
            res.redirect("findBooks");
          });
      });
  });
  // router.get("/", (req, res) => {
  //   res.render("conversations");
  // });

  return router;
};
