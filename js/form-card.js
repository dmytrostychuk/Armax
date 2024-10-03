document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('modalForm');
  const closeButton = document.querySelector('.close-button');

  closeButton.addEventListener('click', closeModal);

  let formSubmitted = false;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (formSubmitted) return;

    formSubmitted = true;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const formData = new FormData(form);

    fetch('/send_email_modal.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        document.body.classList.remove('lock');

        const modal = document.querySelector('.modal');
        if (modal.classList.contains('show-modal')) {
          modal.classList.remove('show-modal');
        }

        alert('Ваш запит відправлено!');
        closeModal(); // Закриваємо модальне вікно після відправки форми

        formSubmitted = false;
        submitButton.disabled = false;
      })
      .catch((error) => {
        console.error('Помилка:', error);
        alert('Сталася помилка при відправці форми.');
        formSubmitted = false;
        submitButton.disabled = false;
      });
  });
});

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('show-modal'); // Приховуємо модальне вікно, знімаючи клас
}

// Функція для перевірки видимості блоку calculation
function checkCalculationVisibility() {
  const scrollButton = document.getElementById('scrollButton');
  const calculationSection = document.querySelector('.calculation');
  const rect = calculationSection.getBoundingClientRect();

  // Перевірка, чи блок calculation повністю видимий на екрані
  if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    scrollButton.classList.remove('visible'); // Сховати кнопку
  } else {
    scrollButton.classList.add('visible'); // Показати кнопку
  }
}

// Додати обробник події скролу
window.onscroll = function () {
  checkCalculationVisibility();
};

// Функція для скролу догори
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Плавний скролінг
  });
}

// Отримати кнопку прокрутки
var scrollButton = document.getElementById('scrollButton');

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

// Викликати функцію при завантаженні сторінки
checkCalculationVisibility();
