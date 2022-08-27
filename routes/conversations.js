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

  // router.get("/newConversation/:bookId/:conversation", (req, res) => {
  //   const userId = req.cookies.userId;
  //   const bookId = req.params.bookId;
  //   const conversationId = req.params.conversation;
  //   console.log("purchasingUserId:", userId);
  //   console.log("bookId:", bookId);
  //   console.log("conversationId:", conversationId);
  //   getBookSellerName(bookId)
  //     .then((seller) => {
  //       console.log("seller:", seller);
  //       getAllUserConversations(userId)
  //         .then((conversationsArray) => {
  //           for (const conversation of conversationsArray) {
  //             console.log("conversation:", conversation);
  //             getDetailsForSpecificConversation(conversation.conversation_id)
  //               .then((details) => {
  //                 console.log("conversations:", conversationsArray);
  //                 console.log("details:", details);
  //                 const tempVars = { userId, seller: seller.seller, bookId, conversations: conversationsArray, details };
  //                 console.log("seller:",seller.seller);
  //                 res.render("conversations", tempVars);
  //               })
  //               .catch((err) => {
  //                 console.log(err);
  //                 res.redirect("/api/books");
  //               });
  //           }

  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           res.redirect("/api/books");
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.redirect("/api/books");
  //     });
  // });

  router.post("/", (req, res) => {
    const userId = req.cookies.userId;
    const message = req.body;
    console.log("message:", message);
    const tempVars = {message, userId};
    res.render("conversations", tempVars);
  });


  // router.get("/:userId", (req, res) => {
  //   const userId = req.cookies.userId;
  //   console.log("userID:", userId);
  //   getAllUserConversations(userId)
  //     .then((conversations) => {
  //       console.log("conversations:", conversations);

  //       getMessagesForSpecificConversation(conversations)
  //         .then((messages) => {
  //           const tempVars = {messages, userId};
  //           console.log("messages:", messages);
  //           res.redirect("conversations", tempVars);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           res.redirect("findBooks");
  //         });
  //     });
  // });
  // router.get("/", (req, res) => {
  //   res.render("conversations");
  // });

  return router;
};
