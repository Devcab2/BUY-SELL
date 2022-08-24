const express = require('express');
const router  = express.Router();
const getConversationWithId = require("../db/server/database");

module.exports = (db) => {
  router.get("/", (req, res) => {
    getConversationWithId()
      .then((data) => {
        const conversations = data.rows;
        res.json({conversations});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.get("/", (req, res) => {
  //   res.render("conversations");
  // });

  return router;
};
