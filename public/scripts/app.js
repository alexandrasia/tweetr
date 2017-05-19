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
          <img src="/images/favorite.png" class="icon">
          <img src="/images/retweet.png" class="icon">
          <img src="/images/flag.png" class="icon">
          <p>${moment(tweet.created_at).startOf('hour').fromNow()}</p>
        </footer>
      </article>
    `;
    return $(html);
  }

  // loops through tweets and calls createTweetElement on them
  // use prepend so latest tweet is on top
  function renderTweets(tweets) {
    var $tweetContainer = $('.tweets');
    $tweetContainer.empty();
    for (var i = 0; i < tweets.length; i++) {
      var tweet = tweets[i];
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
      success: function(data) {
        loadTweets();
        $('.counter').text('140');
        $('.new-tweet textarea').val('');
      }
    });
  }

  // errors if textarea empty or tweet too long, calls on createNewTweet
  $('form').on('submit', function(event) {
    event.preventDefault();
    var content = $('textarea').val();
    if (content.length === 0) {
      $('#no-tweet').slideDown('fast');
    } else if (content.length > 140) {
      $('#too-long').slideDown('fast');
    } else {
      var formData = $(this).serialize();
      createNewTweet(formData);
    }
  });

  loadTweets();

  // hides new tweet box and error messages
  $('.new-tweet').hide();
  $('#no-tweet').hide();
  $('#too-long').hide();

  // displays and hides (toggles) new tweet box when nav compose button is clicked
  // auto-focuses textarea
  // scrolls to top of page when compose button is clicked
  $('#compose').on('click', function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
    $('body').scrollTop(0);
  });
});
