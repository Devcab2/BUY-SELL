const express = require("express");
const router = express.Router();
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
          if (email === user.rows.email) {
            res.cookie("userId", user.rows.email);
            res.redirect("/books");
          } else {
            res.status(403).send("user not exists");
          }
        })
        .catch((err) => console.log(err));
    };
    getUserEmail(email);
  });
  return router;
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      error: null,
    };
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const user_email = req.body.email;
    const user_password = req.body.password;

    //Function to check email and password
    const checkEmail = function (user_email, user_password) {
      const sqlQuery = `SELECT * FROM users WHERE email = $1;`;
      const sqlValues = [user_email];
      db.query(sqlQuery, sqlValues).then((data) => {
        //Compares the passwords and if the query returned the proper data
        if (
          data.rows.length &&
          bcrypt.compareSync(user_password, data.rows[0].password)
        ) {
          req.session["user_id"] = data.rows[0].email;
          const templateVars = {
            currentUser: undefined,
          };
          if (req.session["user_id"]) {
            templateVars.currentUser = req.session["user_id"];
          }
          res.redirect("/");
        } else {
          const templateVars = {
            error: "login-exists",
          };
          res.render("login", templateVars);
        }
      });
    };

    //Calls the checkEmail function
    checkEmail(user_email, user_password);
  });

  return router;
};
