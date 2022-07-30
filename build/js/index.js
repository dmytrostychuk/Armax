let length = document.querySelector('#input1');
let width = document.querySelector('#input2');
let weight = document.querySelector('#input3');
let button = document.querySelector('#button');

button.addEventListener('click', function () {
  input10.innerHTML =
    (Number(length.value) * Number(width.value) * Number(weight.value) * 7.85) /
    1000000;

  input11.innerHTML = (Number(length.value) * Number(width.value)) / 1000000;
});
