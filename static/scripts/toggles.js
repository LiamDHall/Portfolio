$('.project-tab-btn').on('click', function(){
    $(this).parent().siblings('li').children('.project-tab-btn').removeClass('active')
    $(this).addClass('active')
    $(this).parent().parent().siblings('.project-tab').addClass('d-none')
    var tab = `.${$(this).val()}`
    $(this).parent().parent().siblings(tab).removeClass('d-none')
});

$('.sidebar-toggler').on('click', function () {
    $('#navbar').toggleClass('active');
    $('#overlay').toggleClass('overlay-active');
});

$('#form-toggle').on('click', function () {
    $('#contact-form').removeClass('d-none');
    $('.contact-header').removeClass('d-none');
    $('.form__success-feedback').addClass('d-none');
});