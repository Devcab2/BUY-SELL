const hideButtons = require("../lib/hideButtons");
<body onload="hideButtons()"></body>;

module.exports = function (router, database) {
  //check if user exists with the given email
  const login = function (email) {
    return database.getUserEmail(email).then((res) => {
      if (email === res.email) {
        return res;
      }
      return null;
    });
  };

  //Get to the login page
  router.get("/login", (req, res) => {
    res.render("/login");
  });

  //Create cookie with user.id <---need code review
  router.post("/login", (req, res) => {
    const { email } = req.body;
    login(email)
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
        }
        res.cookies("userId", user.id);
        res.redirect("/books");
      })
      .catch((e) => res.send(e));
  });

  //clear all the cookies when logged out
  router.post("/logout", (req, res) => {
    res.clearCookie("userId");
    res.clearCookie("userId.sig");
    res.redirect("/home");
  });

  // check if user logging in or not when they trying to get to books page
  router.get("/books", (req, res) => {
    const dbUser = database
      .getUserWithId(req.cookies.userId)
      .then((user) => user)
      .catch((e) => res.send(e));
    const dbbooks = database
      .getAllBooks()
      .then((books) => books)
      .catch((e) => res.send(e));
    if (!dbUser) {
      res.send({ message: "not logged in" });
      return;
    }
    const templateVars = {
      user: dbUser,
      books: dbbooks,
    };
    res.render("/books", templateVars);
  });
};
