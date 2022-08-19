const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

// Get single user from database by search the email from param <PASS>
const getUserEmail = (email) => {
  let dbQuery = `SELECT * FROM users WHERE email =$1;`;
  const emails = email.toLowerCase();
  const value = [emails];
  return pool
    .query(dbQuery, value)
    .then((res) => {
      if (res.rows) {
        console.log(res.rows[0]);
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => console.log(err.message));
};

module.exports = getUserEmail;
