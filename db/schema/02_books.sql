DROP TABLE IF EXISTS books CASCADE;

CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  book_title VARCHAR(255) NOT NULL,
  book_author VARCHAR(255),
  year_of_publication INTEGER NOT NULL,
  genre VARCHAR(255) NOT NULL,
  rating FLOAT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  image_url_s VARCHAR(255) NOT NULL,
  image_url_m VARCHAR(255) NOT NULL,
  image_url_l VARCHAR(255) NOT NULL
);
