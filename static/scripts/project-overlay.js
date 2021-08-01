$( document ).ready(function() {
    setTimeout(function() {overlayResize();}, 100);
});

$(window).resize(function() {
    setTimeout(function() {overlayResize();}, 100);
});

function overlayResize() {
    overlayHeight = $('.card-img').height()
    console.log(overlayHeight)
    overlayHeight = `${overlayHeight}px`
    $('.projects__img-overlay').height(overlayHeight)
    console.log('i ran')
}

$( ".projects__image a" ).hover(
    function() {
      $(this).children('.projects__img-overlay').removeClass('d-none');
    }, function() {
        $(this).children('.projects__img-overlay').addClass('d-none');
    }
  );