const { Pool } = require("pg");
const { max } = require("pg/lib/defaults");
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

// Get book data from database by passing in the genre(passing in hardcode genre for each filter tags)

const bookFilters = (genre) => {
  let dbQuery = `SELECT * FROM books WHERE genre = $1;`;
  const value = [genre];
  return pool
    .query(dbQuery, value)
    .then((res) => {
      if (res.rows) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch((err) => console.log(err.message));
};

// Get books with the price range(we will passing in the hardcode price for each price tags)

const bookPriceFilters = (minPrice, maxPrice) => {
  let dbQuery = `SELECT * FROM books WHERE price >= $1 AND price <= $2;`;
  const value = [minPrice, maxPrice];
  return pool
    .query(dbQuery, value)
    .then((res) => {
      if (res.rows) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Add new book into database by admin users(userid will take from the user cookie we stored and passing in)(we dont need book.id or images links so only 9 values in the objects)

const addNewBooks = (userid, books) => {
  if (userid === 2 || userid === 3) {
    const keys = Object.keys(books);
    const value = Object.values(books);
    let dbQuery = `INSERT INTO books (${keys.join(
      ","
    )}) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9) RETURNING *;`;
    return pool
      .query(dbQuery, value)
      .then((res) => res.rows)
      .catch((err) => {
        console.log(err.message);
      });
  } else console.log(`you can only add books as seller`);
};

//Delete books
//Single book page info

module.exports = { getUserEmail, bookFilters, bookPriceFilters, addNewBooks };
