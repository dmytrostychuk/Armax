let burgerBtn = document.querySelector('.burger-btn');
let menuNav = document.querySelector('.nav');

if (burgerBtn) {
  burgerBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (menuNav.classList.contains('nav__active')) {
      menuNav.classList.remove('nav__active');
      menuNav.classList.add('nav__close');
    } else {
      menuNav.classList.remove('nav__close');
      menuNav.classList.add('nav__active');
    }
    burgerBtn.classList.toggle('burger-btn-active');
  });

  document.addEventListener('click', function (e) {
    if (!menuNav.contains(e.target) && !burgerBtn.contains(e.target)) {
      menuNav.classList.remove('nav__active');
      menuNav.classList.add('nav__close');
      burgerBtn.classList.remove('burger-btn-active');
    }
  });
}

document.querySelectorAll('.header__btn').forEach((button) => {
  button.addEventListener('click', () => {
    location.reload();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var scrollToFormButton = document.querySelector('.scroll-to-form');

  scrollToFormButton.addEventListener('click', function (event) {
    event.preventDefault();
    var formElement = document.querySelector('.calculation');
    formElement.scrollIntoView({ behavior: 'smooth' });
  });
});

// Функція, що перевіряє, чи видима елемент
function isElementPartiallyInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

// Отримати кнопку прокрутки
var scrollButton = document.getElementById('scrollButton');
// Отримати форму
var calculationSection = document.querySelector('.calculation');

document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    disable: function () {
      var isMobile = window.innerWidth < 768;
      console.log('AOS disabled:', isMobile);
      return isMobile;
    },
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 100,
    delay: 0,
    duration: 400,
    easing: 'ease',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });
});

var modal = document.querySelector('.modal');
var triggers = document.querySelectorAll('.modal-active');
var closeButton = document.querySelector('.close-button');

function toggleModal() {
  modal.classList.toggle('show-modal');

  if (window.innerWidth > 991) {
    document.body.classList.toggle('lock');
  } else if (!modal.classList.contains('show-modal')) {
    document.body.classList.remove('lock');
  }
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

// Додаємо обробники подій для відкриття та закриття модального вікна
triggers.forEach(function (trigger) {
  trigger.addEventListener('click', toggleModal);
});

closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

document
  .querySelector('.card__gallery-button-1')
  .addEventListener('click', function () {
    document.querySelector('.card__gallery-1').classList.add('active');
    document.querySelector('.card__gallery-2').classList.remove('active');
    document.querySelector('.card__gallery-3').classList.remove('active');
    this.classList.add('active');
    document
      .querySelector('.card__gallery-button-2')
      .classList.remove('active');
    document
      .querySelector('.card__gallery-button-3')
      .classList.remove('active');
  });

document
  .querySelector('.card__gallery-button-2')
  .addEventListener('click', function () {
    document.querySelector('.card__gallery-1').classList.remove('active');
    document.querySelector('.card__gallery-2').classList.add('active');
    document.querySelector('.card__gallery-3').classList.remove('active');
    this.classList.add('active');
    document
      .querySelector('.card__gallery-button-1')
      .classList.remove('active');
    document
      .querySelector('.card__gallery-button-3')
      .classList.remove('active');
  });

document
  .querySelector('.card__gallery-button-3')
  .addEventListener('click', function () {
    document.querySelector('.card__gallery-1').classList.remove('active');
    document.querySelector('.card__gallery-2').classList.remove('active');
    document.querySelector('.card__gallery-3').classList.add('active');
    this.classList.add('active');
    document
      .querySelector('.card__gallery-button-1')
      .classList.remove('active');
    document
      .querySelector('.card__gallery-button-2')
      .classList.remove('active');
  });
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    disable: function () {
      var isMobile = window.innerWidth < 768;
      console.log('AOS disabled:', isMobile);
      return isMobile;
    },
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 100,
    delay: 0,
    duration: 400,
    easing: 'ease',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });
});
