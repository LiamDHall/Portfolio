// Keeps scroll position in place on page reload 
document.addEventListener('DOMContentLoaded', function () {
    var currentPage = sessionStorage.getItem('currentpage');
    var scrollPos = sessionStorage.getItem('scrollpos');
    if (currentPage == window.location.href) {
        if (scrollPos) {
            window.scrollTo(0, scrollPos);
            sessionStorage.removeItem('scrollpos');
        }
    }
});

window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('scrollpos', window.scrollY);
    sessionStorage.setItem('currentpage', window.location.href);
});
