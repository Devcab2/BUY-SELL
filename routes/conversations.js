const express = require('express');
const router  = express.Router();
const { getUserConversations, getConversationMessages } = require("../db/server/database");

module.exports = () => {
  router.get("/:id", (req, res) => {
    const userId = req.cookies.userId;
    console.log("userID:", userId);
    getUserConversations(userId)
      .then((conversations) => {
        console.log("conversations:", conversations);

        getConversationMessages(conversations)
          .then((messages) => {
            const tempVars = {messages, userId};
            console.log("messages:", messages);
            res.render("conversations", tempVars);
          })
          .catch((err) => {
            console.log(err);
            res.redirect("/findBooks");
          });





      });
  });
  // router.get("/", (req, res) => {
  //   res.render("conversations");
  // });

  return router;
};
