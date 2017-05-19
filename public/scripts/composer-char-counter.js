$(document).ready(function () {
  $('textarea').on('input', function() {
    var maxLength = 140;
    var errorClass = 'redMax';
    var length = maxLength - ($(this).val().length);
    var $counter = $(this).closest('.new-tweet').find('.counter');
    $counter.text(length);
    if (length < 0) {
      $counter.addClass(errorClass);
    } else {
      $counter.removeClass(errorClass);
      $('.error-messages p').slideUp('fast');
    }
  });
});
