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
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => console.log(err));
};

// Get user from database given their id
const getUserWithId = function (id) {
  let dbQuery = ` SELECT * FROM users WHERE id = $1;`;
  let value = [id];
  return pool
    .query(dbQuery, value)
    .then((result) => {
      if (result.rows) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get all books
const getAllBooks = () => {
  let dbQuery = `SELECT * FROM books;`;
  return pool
    .query(dbQuery)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
getAllBooks();
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
const bookPriceFilters = (maxPrice) => {
  let dbQuery = `SELECT * FROM books WHERE price <= $1;`;
  const value = [maxPrice];
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
    const value = [
      userid,
      books.book_title,
      books.book_author,
      books.description,
      books.year_of_publication,
      books.genre,
      books.rating,
      books.quantity,
      books.price,
      books.image_url_s,
      books.image_url_m,
      books.image_url_l,
    ];
    let dbQuery = `INSERT INTO books (user_id,book_title, book_author,description,year_of_publication,genre,rating,quantity,price,image_url_s,image_url_m,image_url_l
    ) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9,$10,$11,$12) RETURNING *;`;
    return pool
      .query(dbQuery, value)
      .then((res) => {
        console.log("it worked", res.rows);
        return res.rows[0];
      })
      .catch((err) => {
        console.log("error inserting new book", err.message);
      });
  } else {
    console.log(`you can only add books as seller`);
    return new Promise();
  }
};

//Add favorite will return object with the book user clicked
const addNewFav = (userId, bookId) => {
  let dbQuery = `INSERT INTO favourites (user_id, book_id) VALUES ($1, $2) RETURNING *;`;
  const value = [userId, bookId];
  return pool
    .query(dbQuery, value)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

//Delete books from the books table, use with getAllBooks function after to get the refresh list
const bookDelete = (bookid) => {
  let dbQuery = `DELETE FROM books WHERE id = $1;`;
  const value = [bookid];
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

//Single book page info
const singleBook = (bookid) => {
  let dbQuery = ` SELECT * FROM books WHERE id = $1;`;
  const value = [bookid];
  return pool
    .query(dbQuery, value)
    .then((res) => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => console.log(err.message));
};

//Access page for a specific conversation.

const getUserConversations = (id) => {
  return pool
    .query(`SELECT conversations.id AS conversation_ID
    FROM conversations
    JOIN messages ON conversations.id = messages.convers_id
    WHERE messages.user_id = $1;`, [id])
    .then((res) => {
      if (res.rows) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch((err) => console.log(err.message));
}

const getConversationMessages = (id) => {
  return pool
    .query(`
    SELECT books.user_id AS seller, books.book_title AS book, message
    FROM messages
    JOIN conversations ON messages.convers_id = conversations.id
    JOIN books on conversations.book_id = books.id
    WHERE messages.user_id = $1;`, [id])
    .then((res) => {
      if (res.rows) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch((err) => console.log(err.message));
};

const favBookPerUser = (userId) => {
  return pool
    .query(
      `SELECT f.user_id as userId, b.book_title,b.price,b.year_of_publication,b.genre,b.rating, b.image_url_s FROM favourites f JOIN books b ON b.id = f.book_id WHERE f.user_id = $1;`,
      [userId]
    )
    .then((res) => {
      if (res.rows) {
        console.log(res.rows);
        return res.rows;
      } else {
        return null;
      }
    })
    .catch((err) => console.log(err.message));
};

module.exports = {
  getUserEmail,
  bookFilters,
  bookPriceFilters,
  addNewBooks,
  getAllBooks,
  bookDelete,
  singleBook,
  addNewFav,
  getUserConversations,
  getUserWithId,
  favBookPerUser,
  getConversationMessages
};
