document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);

    if (error === 0) {
      form.classList.add('_sending');
      try {
        let response = await fetch('sendmail.php', {
          method: 'POST',
          body: formData,
        });
        if (response.status >= 200 && response.status < 300) {
          let result = await response.json();
          alert(result.message);
          formPreview.innerHTML = '';
          form.reset();
        } else {
          throw new Error('Помилка: ' + response.status);
        }
      } catch (err) {
        console.error('Помилка відправлення форми:', err);
        alert(
          'Помилка відправлення форми. Будь ласка, спробуйте ще раз пізніше.'
        );
      } finally {
        form.classList.remove('_sending');
      }
    } else {
      alert("Заповніть обов'язкові поля");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    formReq.forEach((input) => {
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.type === 'checkbox' && !input.checked) {
        formAddError(input);
        error++;
      } else {
        if (!input.value.trim()) {
          formAddError(input);
          error++;
        }
      }
    });

    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  const formImage = document.getElementById('formImage');
  const formPreview = document.getElementById('formPreview');

  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Дозволяються лише зображення.');
      formImage.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Файл повинен бути меншим за 2 МБ.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
    };
    reader.onerror = function (e) {
      console.error('Помилка завантаження файлу:', e);
      alert('Помилка завантаження файлу.');
    };
    reader.readAsDataURL(file);
  }
});

// ========================================================================

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
    scrollButton.style.opacity = '0'; // Змінюємо прозорість кнопки на 0
  } else {
    scrollButton.style.opacity = '1'; // Змінюємо прозорість кнопки на 1
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
