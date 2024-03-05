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

// calc

// function showDiv(divID) {
//   var divs = document.getElementsByTagName("div");

//   for (var i = 0; i < divs.length; i++) {
//     if (divs[i].id === divID) {
//       divs[i].style.display = "block";
//     } else {
//       divs[i].style.display = "none";
//     }
//   }
// }

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
