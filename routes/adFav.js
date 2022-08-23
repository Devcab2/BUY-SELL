const express = require("express");
const router = express.Router();

module.exports = (db) => {
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
