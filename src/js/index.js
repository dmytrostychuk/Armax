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

// Функція, яка перевіряє, чи видима секція "calculation" і встановлює відповідний стиль кнопці
function toggleScrollButton() {
  if (isElementPartiallyInViewport(calculationSection)) {
    scrollButton.style.display = 'none'; // Секція частково видима, приховуємо кнопку
  } else {
    scrollButton.style.display = 'block'; // Секція не видима, показуємо кнопку
  }
}

// Викликати toggleScrollButton() після завантаження сторінки та при зміні розміру вікна
window.addEventListener('load', toggleScrollButton);
window.addEventListener('resize', toggleScrollButton);
// Прослуховування прокрутки сторінки
window.addEventListener('scroll', toggleScrollButton);

// var length = document.querySelector('.length');
// var width = document.querySelector('.width');
// var weight = document.querySelector('.weight');
// let sheetBtn = document.querySelector('.calc__sheet-button');
// let pipeBtn = document.querySelector('.calc__pipe-button');

// sheetBtn.addEventListener('click', function (e) {
//   e.preventDefault();
//   mass.innerHTML = (
//     (Number(length.value) * Number(width.value) * Number(weight.value) * 7.85) /
//     1000000
//   ).toFixed(2);
//   area.innerHTML = (
//     (Number(length.value) * Number(width.value)) /
//     1000000
//   ).toFixed(2);
// });

// pipeBtn.addEventListener('click', function (e) {
//   e.preventDefault();
// });
