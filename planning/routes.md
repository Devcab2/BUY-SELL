Tables: users, books, favourites, conversations, cart

  GET /home

R GET /users/:id  (single user)
A POST /users/:id

B GET /books (all books)
R GET /books/:id  (single book)
A POST /books/
D POST /books/:id/delete

B GET /users/:id/favourites (all orders)
A POST /user/:id/favourites

B GET /conversations/:id/messages ???
R GET /conversations/:id  (single order)
A POST /conversations
A POST /converstaions/:id/messages



//STRETCH MATERIAL

R GET /orders/:id  (single order)
A POST /orders/
D POST /orders/:id/delete
