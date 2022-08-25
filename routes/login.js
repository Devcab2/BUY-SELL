const express = require("express");
const router = express.Router();
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    const { email } = req.body;
    const getUserEmail = (email) => {
      let dbQuery = `SELECT * FROM users WHERE email =$1;`;
      const emails = email.toLowerCase();
      const value = [emails];
      db.query(dbQuery, value)
        .then((user) => {
          if (email === user.rows[0].email) {
            res.cookie("userId", user.rows[0].id);
            res.redirect("/api/books");
          } else {
            res.status(403).send("user not exists");
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/home");
        });
    };
    getUserEmail(email);
  });
  return router;
};
