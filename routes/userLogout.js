const express = require("express");
const router = express.Router();
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.clearCookie("userId");
    res.redirect("/");
  });
  return router;
};
