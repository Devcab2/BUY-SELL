const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/conversations", (req, res) => {
    res.render("conversations");
  });
  return router;
};
