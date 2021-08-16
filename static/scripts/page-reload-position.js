// Keeps scroll position in place on page reload 
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() { scrollToY();}, 100);
});

function scrollToY() {
    var scrollPos = sessionStorage.getItem('scrollpos');
    if (scrollPos) {
        window.scrollTo(0, scrollPos);
        sessionStorage.removeItem('scrollpos');
    }
}

window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('scrollpos', window.scrollY);
});
