let burgerBtn = document.querySelector('.burger-btn');
let menuNav = document.querySelector('.nav');

if (burgerBtn) {
  burgerBtn.addEventListener('click', function (e) {
    // document.body.classList.toggle('lock');
    if (menuNav.classList.contains('nav__active')) {
      menuNav.classList.remove('nav__active');
      menuNav.classList.add('nav__close');
    } else {
      menuNav.classList.remove('nav__close');
      menuNav.classList.add('nav__active');
    }
    burgerBtn.classList.toggle('burger-btn-active');
  });
}

const swiper = new Swiper('.swiper', {
  slidesPerView: 2,
  infinity: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 800,
    disableOnInteraction: false,
  },
  speed: 800,
  breakpoints: {
    480: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
  loop: true,
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

//modal

var modal = document.querySelector('.modal');
var trigger = document.querySelector('.modal-active');
var closeButton = document.querySelector('.close-button');

function toggleModal() {
  modal.classList.toggle('show-modal');

  console.log('toggleModal');

  if (window.innerWidth > 991) {
    document.body.classList.toggle('lock');
  } else if (!modal.classList.contains('show-modal')) {
    document.body.classList.remove('lock');
  }
}

trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

// calc
const calcFormButtons = document.querySelectorAll('.calc-form-button-js');
const calcForms = document.querySelectorAll('.calc-form-js');

function resetCalcForms() {
  for (let i = 0; i < calcForms.length; i++) {
    calcForms[i].classList.remove('active');
  }
}

function addFormActiveClass(type) {
  Array.from(calcForms)
    .filter((el) => el.dataset.type === type)[0]
    .classList.add('active');
}

function handleFormButtonClick(e) {
  resetCalcForms();
  addFormActiveClass(e.target.dataset.type);
}

for (let i = 0; i < calcFormButtons.length; i++) {
  calcFormButtons[i].addEventListener('click', handleFormButtonClick);
}

var length = document.querySelector('.length');
var width = document.querySelector('.width');
var weight = document.querySelector('.weight');
let sheetBtn = document.querySelector('.calc__sheet-button');
let pipeBtn = document.querySelector('.calc__pipe-button');

sheetBtn.addEventListener('click', function (e) {
  e.preventDefault();
  mass.innerHTML = (
    (Number(length.value) * Number(width.value) * Number(weight.value) * 7.85) /
    1000000
  ).toFixed(2);
  area.innerHTML = (
    (Number(length.value) * Number(width.value)) /
    1000000
  ).toFixed(2);
});

pipeBtn.addEventListener('click', function (e) {
  e.preventDefault();
});
