const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    const userId = req.cookies.userId;
    res.render("singleBook", { userId });
  });
  return router;
};
