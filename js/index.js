let length = document.querySelector('#input1');
let width = document.querySelector('#input2');
let weight = document.querySelector('#input3');
let button = document.querySelector('#button');

function resault() {
  alert(Number(length.value) + Number(width.value));
}

button.addEventListener('click', resault);
