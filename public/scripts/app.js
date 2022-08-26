// Client facing scripts here

// signIn function

$(document).ready(function() {


  const errorMessage = (msg) => {
    $("#error-message").html(msg);
    $("#error-message").slideDown();
  };

  const signIn = function() {
    $("form").on("submit", function(event) {
      event.preventDefault();
      const text = $("form input").val();
      console.log(text);
      if (text.length === 0) {
        errorMessage("\u2A02 Please enter your email in order to sign in. \u2A02");
      } else {
        $.post("/api/login", $(this).serialize())
          .then(() => {
            $("#error-message").hide();
            window.location.href = window.location.origin + "/api/books";
          })
          .catch(err => {
            console.log(err.responseText);
          });
      }
    });
  };
 signIn();
});
=======
>>>>>>> Stashed changes
