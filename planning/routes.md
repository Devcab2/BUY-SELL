Tables: users, books, favourites, conversations, cart

  GET /home

B GET /login (login page)
A POST /login (user login)
A POST /logout (if user logged in)

B GET /books (logged in homepage)
R GET /books/:id_book  (individual book with info about book)
R GET /books/add (admin add book page)
A POST /books/add  (submit form with all book data)
D POST /books/:id_book/delete (admin(seller) only remove book from database)

B GET /users/:id_user/favourites (view all user favourites page)
A POST /users/:id_user/favourites  (add a book to your favourites)

R GET /conversations/:conversation_id  (access conversations page/ display all messages)
A POST /conversations (submit a message to the conversation)
