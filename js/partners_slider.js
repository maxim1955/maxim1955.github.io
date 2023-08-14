
// const swipersecond = new Swiper(".partners_swiper_box", {
//     // Optional parameters
//     direction: 'horizontal',
//     loop: true,

//     navigation: {
//         nextEl: '.prev',
//         prevEl: '.next',
//     },

//     slidesPerView: 3,
//     spaceBetween: 50,
//     breakpoints: {

//         320: {
//             slidesPerView: 1,
//         },

//         690: {
//             slidesPerView: 2,
//         },

//         1000: {
//             slidesPerView: 3,
//         },

//     }

// });

// const swiperfirst = new Swiper(".mySwiper", {
//     pagination: {
//         el: ".swiper-pagination",
//     },
// });


let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
      },
      on: {
        resize: function () {
          swiper.changeDirection(getDirection());
        },
      },
    });

    // function getDirection() {
    //   var windowWidth = window.innerWidth;
    //   var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    //   return direction;
    // }
  
