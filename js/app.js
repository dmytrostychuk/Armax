const form = document.forms['form'];
const formArr = form ? Array.from(form) : [];
const validFormArr = [];

const file = document.querySelector('#file');
const fileName = document.querySelector('#file_name');
const fileBtnClose = document.querySelector('#file_btn_close');
const maxSize = 20 * 1024 * 1024;

if (formArr.length > 0) {
  formArr.forEach((el) => {
    if (el.hasAttribute('data-reg')) {
      el.setAttribute('is-valid', '0');
      validFormArr.push(el);
    }
  });
}

if (form) {
  form.addEventListener('input', inputHandler);
  form.addEventListener('submit', formCheck);
}

if (file) {
  file.addEventListener('change', (e) => {
    checkFile(file.files[0]);
  });
}

if (fileBtnClose) {
  fileBtnClose.addEventListener('click', (e) => {
    e.preventDefault();
    fileReset();
  });
}

function inputHandler({ target }) {
  if (target.hasAttribute('data-reg')) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute('data-reg');
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute('is-valid', '1');
    el.style.outline = '2px solid 		#96C67E';
  } else {
    el.setAttribute('is-valid', '0');
    el.style.outline = '2px solid #FF7F50';
  }
}

function formCheck(e) {
  e.preventDefault();
  const allValid = [];
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute('is-valid'));
  });
  const isAllValid = allValid.reduce((acc, current) => {
    return acc && current;
  });
  if (!Boolean(Number(isAllValid))) {
    alert('Заповніть поля правильно!');
    return;
  }
  formSubmit();
}

function checkFile(file) {
  // проверяем тип файла
  if (
    ![
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/svg+xml',
    ].includes(file.type)
  ) {
    alert('Дозволені лише вказані формати');
    fileReset();
    return;
  }

  // проверяем размер файла (<20 Мб)
  if (file.size > maxSize) {
    alert('Файл повинен бути не більше 20Мб');
    fileReset();
    return;
  }
  showFileName(file);
}

function fileReset() {
  file.value = '';
  fileName.textContent = '';
  fileBtnClose.textContent = '';
}

function showFileName(file) {
  fileName.textContent = file.name;
  fileBtnClose.textContent = '×';
}

async function formSubmit() {
  const data = serializeForm(form);
  data.append('image', file.files[0]);
  const response = await sendData(data);
  if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formReset();
  } else {
    alert('Код помилки: ' + response.status);
  }
}

function serializeForm(formNode) {
  return new FormData(form);
}

async function sendData(data) {
  return await fetch('send_mail.php', {
    method: 'POST',
    body: data,
  });
}

function formReset() {
  form.reset();
  validFormArr.forEach((el) => {
    el.setAttribute('is-valid', 0);
    el.style.border = 'none';
  });
}
