/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



function renderTweets(tweets) {
  var $tweetContainer = $('#tweets');
  $tweetContainer.empty();
  for (var ii = 0; ii < tweets.length; ii++) {
    let tweet = tweets[ii];
    $tweetContainer.append(createTweetElement(tweet));
  }
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


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
  `
  return $(html);
}

// console.log($tweet);
// $( document ).ready(function() {
//   renderTweets(data);
// });



$('form').on('submit', function(event) {
  event.preventDefault();
  let content = $('textarea').val();
  if (content.length === 0) {
    alert("Please include a tweet");
  } else if (content.length > 140) {
    alert("Tweet is too long!");
  } else {
    let formData = $(this).serialize();
    createNewTweet(formData);
  }
});

function createNewTweet(data) {
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: data,
    success: loadTweets
  });
}


function loadTweets () {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    dataType: 'json',
    success: renderTweets
  });
}

loadTweets();



