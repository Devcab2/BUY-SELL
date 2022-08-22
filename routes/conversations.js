const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/conversations", (req, res) => {
    db.query(`SELECT * FROM conversations;`)
      .then(data => {
        const conversations = data.rows;
        res.json({ conversations });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
