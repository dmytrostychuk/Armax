const swiper = new Swiper('.swiper', {
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
