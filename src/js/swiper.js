var swiper = new Swiper('.mySwiper', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  zoom: true,
});

var swiper2 = new Swiper('.mySwiper2', {
  spaceBetween: 10,
  thumbs: {
    swiper: swiper,
  },
  zoom: true,
  loop: true,
});

const swiper1 = new Swiper('.swiper__partners', {
  slidesPerView: 2,
  infinity: true,
  spaceBetween: 10,
  autoplay: {
    delay: 800,
    disableOnInteraction: false,
  },
  speed: 800,
  breakpoints: {
    480: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    768: {
      spaceBetween: 50,
      slidesPerView: 3,
    },
    1024: {
      spaceBetween: 60,
      slidesPerView: 4,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    init() {
      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    },
  },
});

const swiperProduct = new Swiper('.swiper__product', {
  slidesPerView: 1,

  loop: true,
  infinity: true,
  spaceBetween: 15,
  speed: 800,
  breakpoints: {
    480: {
      spaceBetween: 15,
      slidesPerView: 2,
    },
    768: {
      spaceBetween: 15,
      slidesPerView: 3,
    },
    1024: {
      spaceBetween: 10,
      slidesPerView: 4,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

var swiper3 = new Swiper('.mySwiper3', {
  slidesPerView: 1,

  spaceBetween: 15,
  breakpoints: {
    480: {
      spaceBetween: 15,
      slidesPerView: 2,
    },
    768: {
      spaceBetween: 15,
      slidesPerView: 3,
    },
    1024: {
      spaceBetween: 10,
      slidesPerView: 4,
    },
  },
});
var swiper5 = new Swiper('.mySwiper5', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

var swiper4 = new Swiper('.mySwiper4', {
  spaceBetween: 10,
  thumbs: {
    swiper: swiper5,
  },
  zoom: true,
  loop: false,
});

var swiper7 = new Swiper('.mySwiper7', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

var swiper6 = new Swiper('.mySwiper6', {
  spaceBetween: 10,
  thumbs: {
    swiper: swiper7,
  },
  zoom: true,
  loop: false,
});

var swiper = new Swiper('.mySwiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
