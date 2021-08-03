/* 
When scroll position is 0 hide the site header
*/
$(document).ready(function() {
    siteHeaderVis()
});

$(window).scroll(function (event) {
    siteHeaderVis()
});

function siteHeaderVis() {
    var scroll = $(window).scrollTop();

    if (scroll <= 0) {
        $('.site-header').addClass('d-none');
    }

    else {
        $('.site-header').removeClass('d-none');
    }
}