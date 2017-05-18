$(document).ready(function() {

  // to escape some text to prevent xss
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // creates html for each tweet
  function createTweetElement(tweet) {
    const html = `
      <article>
        <header>
          <img src="${tweet.user.avatars.small}" class="userPic">
          <h2>${escape(tweet.user.name)}</h2>
          <p>${escape(tweet.user.handle)}</p>
        </header>
          <p>${escape(tweet.content.text)}</p>
        <footer>
          <p>${new Date(tweet.created_at)}</p>

        </footer>
      </article>
    `;
    return $(html);
  }

  // loops through tweets and calls createTweetElement on them
  function renderTweets(tweets) {
    var $tweetContainer = $('.tweets');
    // removes the previous tweets
    $tweetContainer.empty();
    for (var ii = 0; ii < tweets.length; ii++) {
      let tweet = tweets[ii];
      // use prepend so latest tweet is on top
      $tweetContainer.prepend(createTweetElement(tweet));
    }
  }

  // gets tweets and calls renderTweets function
  function loadTweets () {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: renderTweets
    });
  }

  // sends tweet data to server and calls on loadTweets
  function createNewTweet(data) {
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: data,
      success: loadTweets
    });
  }

  // errors if textarea empty or tweet too long, calls on createNewTweet
  $('form').on('submit', function(event) {
    event.preventDefault();
    var content = $('textarea').val();
    if (content.length === 0) {
      alert("Please include a tweet");
    } else if (content.length > 140) {
      alert("Tweet is too long!");
    } else {
      let formData = $(this).serialize();
      createNewTweet(formData);
      $('textarea').val('');
    }
  });

  loadTweets();

  $('.new-tweet').hide();

  // displays and hides (toggles) new tweet box when nav compose button is clicked
  $('#compose').on('click', function() {
    $('.new-tweet').slideToggle();
    // auto-focuses textarea
    $('textarea').focus();
    // scrolls to top of page when compose button is clicked
    $('body').scrollTop(0);
  });

  $('input').on('click', function() {
    $('.counter').text(140);
  });
});





