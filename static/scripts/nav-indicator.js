/* 
Moves active class on to the correct nav item when scroll position
enters its corresponding section
*/
$(document).ready(function() {
    navIndicator()
});

$(window).scroll(function (event) {
    navIndicator()
});

$(window).resize(function() {
    setTimeout(function() {navIndicator();}, 100);
});

function navIndicator() {
    var projectsPos = $('#projects').offset().top;
    var aboutPos = $('#about').offset().top;
    var contactPos = $('#contact').offset().top;
    var scroll = $(window).scrollTop() + 1;
    $('.nav-item').removeClass('active');

    if(scroll >= aboutPos && scroll < projectsPos){
        $('.nav-item').removeClass('active');
        $('#nav-about').addClass('active');
    }

    else if (scroll >= projectsPos && scroll < contactPos) {
        $('.nav-item').removeClass('active');
        $('#nav-projects').addClass('active');
    }

    else if (scroll >= contactPos) {
        $('.nav-item').removeClass('active');
        $('#nav-contact').addClass('active');
    }
}