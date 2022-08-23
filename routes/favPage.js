const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const dbQuery = `SELECT f.id, f.book_id,b.book_title,b.price,b.image_url_s
    FROM favourites f
    JOIN books b ON book_id = b.id
    WHERE f.user_id = $1;`;
    const values = [req.cookies.userId];
    db.query(dbQuery, values)
      .then((data) => {
        const value = res.json(...data.rows);
        res.render("favourite", { value });
      })
      .catch((e) => console.log(e));
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    const dbQuery = `
    INSERT INTO favourites ('user_id','book_id') VALUES ($1, $2) RETURNING *;
    `;
    //req.body.id comes from books table
    const values = [req.cookies.userId, req.body.id];

    console.log("Add fav");
    db.query(dbQuery, values)
      .then((data) => res.json(data.rows))
      .catch((e) => console.log(e));
  });
  return router;
};
