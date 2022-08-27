let calcSheetBtn = document.querySelector('.calc__sheet-btn');
let calcProfilePipeBtn = document.querySelector('.calc__profile-pipe-btn');
let calcPipeBtn = document.querySelector('.calc__pipe-btn');

let calcSheet = document.querySelector('.calc__sheet');
let calcProfilePipe = document.querySelector('.calc__profile-pipe');
let calcPipe = document.querySelector('.calc__pipe');

calcSheetBtn.addEventListener('click', function () {
  if (calcSheetBtn) {
    calcSheet.classList.toggle('active');
    calcProfilePipe.classList.toggle('disabled');
  } else {
  }
});

calcProfilePipeBtn.addEventListener('click', function () {
  if (calcProfilePipeBtn) {
    calcProfilePipe.classList.toggle('active');
    calcProfilePipe.classList.remove('disabled');
    calcSheet.classList.remove('acive');
  } else {
  }
});

calcPipeBtn.addEventListener('click', function () {
  if (calcPipeBtn) {
    calcPipe.classList.toggle('active');
  }
});

let length = document.querySelector('#length');
let width = document.querySelector('#width');
let weight = document.querySelector('#weight');
let sheetBtn = document.querySelector('#calc__sheet-button');

sheetBtn.addEventListener('click', function () {
  mass.innerHTML =
    (Number(length.value) * Number(width.value) * Number(weight.value) * 7.85) /
    1000000;

  area.innerHTML = (Number(length.value) * Number(width.value)) / 1000000;
});
