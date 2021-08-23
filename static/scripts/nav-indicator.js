/* 
Moves active class on to the correct nav item when scroll position
enters its corresponding section 
*/
$(document).ready(function() {
    navIndicator();
});

$(window).scroll(function (event) {
    navIndicator();
});

// The position of elements change when the site is adpats to a new screen size
$(window).resize(function() {
    setTimeout(function() {navIndicator();}, 100);
});

/*
Works out if the scroll position of the site falls with in a
relevent section and then applies the "active" class to the
corresponding nav item
*/
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