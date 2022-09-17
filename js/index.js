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
