
(function($) {

    $.fn.iComputerSlide = function(options) {

        options = $.extend({
            height: 200,
            btnClose: "Close",
            btnOpen: "Open"
        }, options);

        makeWrap = function($element, options) {
            return '<div class="io_item">' +
                '<div class="io_item_wrap" style="max-height:' + options.height + 'px">' + $element[0].outerHTML +
                '<div class="io_trans"></div>' +
                '</div>' +
                '<div class="io_button_wrap">' +
                '<a class="io_button btn_close">' + options.btnClose + '</a>' +
                '<a class="io_button btn_open">' + options.btnOpen + '</a>' +
                '</div>' +
                '</div>';
        };

        $(document).on("click", ".io_button", function() {
            $(this).parents(".io_item").toggleClass("open");
        });

        return this.each(function() {
            var $element = $(this);
            $element.replaceWith(makeWrap($element, options));
        });
    };
})(jQuery);

$(function() {

    $(".reviews_item_wrap").iComputerSlide({
        height: 220,
        btnClose: "Скрыть",
        btnOpen: "Читать полностью"
    });
});




window.addEventListener('load', () => {
   // Получаем все карточки на странице
const cards = document.querySelectorAll('.io_item_wrap');
const texts = document.querySelectorAll('.reviews_text');
const readMoreBtn = document.querySelectorAll('.io_button_wrap');


// Проходимся по каждой карточке и проверяем текст
for (let i = 0; i < cards.length; i++) {
  // Если высота текста меньше высоты карточки, то скрываем кнопку "читать далее"
 
    if (texts[i].offsetHeight <= cards[i].offsetHeight) {
    readMoreBtn[i].style.display = 'none';
  }
} 
})

