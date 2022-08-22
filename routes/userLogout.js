const express = require("express");
const router = express.Router();
app.use(cookieParser());

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });
  router.post("/", (req, res) => {
    res.clearCookie("userId");
    res.redirect("/home");
  });
  return router;
};
