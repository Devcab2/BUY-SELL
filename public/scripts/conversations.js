const conversations = () => {

  $(document).ready(function() {

    $loadConversation();

    $newMessage();

    $("#error-message").hide();
  });

  // Two functions that work together to dynamically render new messages.
  const $createMessageElement = (messageData) => {
    const $message = `
      <article class="message">
        <header>
          <p>${messageData.user.handle}</p>
        </header>
        <div class="messageContent">${(messageData.content.text)}</div>
        <footer>
          <time>${timeago.format(messageData.created_at)}</time>
        </footer>
      </article>
    `;
    return $message;
  };

  const $renderConversation = (messages) => {
    for (const message of messages) {
      const newMessage = $createMessageElement(message);
      $('#messageContainer').append(newMessage);
    }
  };

  // Fetch conversation from /conversations/:conversation_id page.
  const $loadConversation = () => {
    $.get("/conversations/:conversation_id")
      .then(data => {
        $renderConversation(data);
      });
  };

  // Animate and display validation error messages.
  const errorMessage = (msg) => {
    $("#error-message").html(msg);
    $("#error-message").slideDown();
  };

  // Submit new message without refreshing page. Change form data into a query string. Implement message validation.
  const $newMessage = () => {
    $("form").on("submit", function(event) {
      event.preventDefault();
      if ($("form textarea").val().length === 0) {
        errorMessage("\u2A02 Please enter some text before submitting message. \u2A02");
      } else {
        $.post("/conversation", $(this).serialize())
          .then(() => {
            $loadConversation();
          });
        $(this).trigger('reset');
      }
    });
  };

};

module.exports = conversations;
