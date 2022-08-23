const express = require("express");
const router = express.Router();
app.use(cookieParser());

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.cookies.userId) {
      const getAllBooks = () => {
        let dbQuery = `SELECT * FROM books;`;
        db.query(dbQuery)
          .then((res) => {
            const templateVars = {
              user: req.cookies.userId,
              books: res.json(res.rows),
            };
            res.render("findBooks", templateVars);
          })
          .catch((err) => {
            console.log(err.message);
            // res.render("500 page");
          });
      };
      getAllBooks();
    } else {
      res.redirect("/login");
    }
  });
  return router;
};
