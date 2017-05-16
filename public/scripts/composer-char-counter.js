$(document).ready(function () {
  $('textarea').on('input', function() {
    const maxLength = 140;
    const errorClass = 'redMax';
    var length = maxLength - ($(this).val().length);
    let $counter = $(this).parent().find('.counter');
    $counter.text(length);

    if (length <= 0) {
      $counter.addClass(errorClass);
    } else {
      $counter.removeClass(errorClass);
    };
  });
});

