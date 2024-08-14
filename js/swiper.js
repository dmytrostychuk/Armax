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

AOS.init();

AOS.init({
  // Global settings:
  disable: 'false', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 100, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});
