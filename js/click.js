
$(document).ready(function() {
    $('.header_link').click(function(event) {
        $('.header_burger, .header_menu').removeClass('active');
        $('body').removeClass('lock')
    });
});