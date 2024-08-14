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

// // Функція, яка перевіряє, чи видима секція "calculation" і встановлює відповідний стиль кнопці
// function toggleScrollButton() {
//   if (isElementPartiallyInViewport(calculationSection)) {
//     scrollButton.style.opacity = '0'; // Змінюємо прозорість кнопки на 0
//   } else {
//     scrollButton.style.opacity = '1'; // Змінюємо прозорість кнопки на 1
//   }
// }

// // Викликати toggleScrollButton() після завантаження сторінки та при зміні розміру вікна
// window.addEventListener('load', toggleScrollButton);
// window.addEventListener('resize', toggleScrollButton);
// // Прослуховування прокрутки сторінки
// window.addEventListener('scroll', toggleScrollButton);

// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.getElementById('form');
//   form.addEventListener('submit', formSend);

//   async function formSend(e) {
//     e.preventDefault();

//     let error = formValidate(form);

//     let formData = new FormData(form);
//     let files = formImage.files;
//     for (let i = 0; i < files.length; i++) {
//       formData.append('image[]', files[i]);
//     }

//     if (error === 0) {
//       form.classList.add('_sending');
//       try {
//         let response = await fetch('sendmail.php', {
//           method: 'POST',
//           body: formData,
//         });
//         if (response.status >= 200 && response.status < 300) {
//           let result = await response.json();
//           alert(result.message);
//           formPreview.innerHTML = '';
//           form.reset();
//         } else {
//           throw new Error('Помилка: ' + response.status);
//         }
//       } catch (err) {
//         console.error('Помилка відправлення форми:', err);
//         alert(
//           'Помилка відправлення форми. Будь ласка, спробуйте ще раз пізніше.'
//         );
//       } finally {
//         form.classList.remove('_sending');
//       }
//     } else {
//       alert("Заповніть обов'язкові поля");
//     }
//   }

//   function formValidate(form) {
//     let error = 0;
//     let formReq = document.querySelectorAll('._req');

//     formReq.forEach((input) => {
//       formRemoveError(input);

//       if (input.classList.contains('_email')) {
//         if (emailTest(input)) {
//           formAddError(input);
//           error++;
//         }
//       } else if (input.type === 'checkbox' && !input.checked) {
//         formAddError(input);
//         error++;
//       } else {
//         if (!input.value.trim()) {
//           formAddError(input);
//           error++;
//         }
//         if (input.classList.contains('input-number') && !input.validity.valid) {
//           formAddError(input);
//           error++;
//         }
//       }
//     });

//     return error;
//   }

//   function formAddError(input) {
//     input.parentElement.classList.add('_error');
//     input.classList.add('_error');
//   }

//   function formRemoveError(input) {
//     input.parentElement.classList.remove('_error');
//     input.classList.remove('_error');
//   }

//   function emailTest(input) {
//     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
//   }

//   const formImage = document.getElementById('formImage');
//   const formPreview = document.getElementById('formPreview');

//   formImage.addEventListener('change', () => {
//     uploadFiles(formImage.files);
//   });

//   function uploadFiles(files) {
//     formPreview.innerHTML = '';
//     for (let i = 0; i < files.length; i++) {
//       let file = files[i];
//       let reader = new FileReader();
//       reader.onload = function (e) {
//         let fileType = file.type.split('/')[0];
//         if (fileType === 'image') {
//           formPreview.innerHTML += `<img src="${e.target.result}" alt="Фото">`;
//         } else if (fileType === 'application') {
//           formPreview.innerHTML += `<div id="embedContainer${i}" class="embed-container"></div>`;
//           let embedContainer = document.getElementById(`embedContainer${i}`);
//           embedContainer.innerHTML = `<embed src="${e.target.result}" type="${file.type}" width="100%" style="height: 70px;" />`;
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// });

// - modal
var modal = document.querySelector('.modal');
var triggers = document.querySelectorAll('.modal-active');
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

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

triggers.forEach(function (trigger) {
  trigger.addEventListener('click', toggleModal);
});

closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
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
