"use strict";

$(document).ready(function () {
    $('.header_burger').click(function (event) {
        $('.header_burger,.header_menu').toggleClass('active');
        $('body').toggleClass('lock');
    })
})
if (innerWidth <= 870) {
    $('.atlas_group_btn-second').slick({
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        adaptiveHeight: true,
        centerPadding: "10px"
    });
}
