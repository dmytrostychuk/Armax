document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('modalForm');

  let formSubmitted = false; // Додаємо прапорець для перевірки

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    if (formSubmitted) return; // Якщо форма вже була відправлена, припиняємо виконання

    formSubmitted = true; // Встановлюємо прапорець

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Вимикаємо кнопку, щоб уникнути повторного натискання

    const formData = new FormData(form);

    fetch('/send_email_modal.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        // Видаляємо клас 'lock' з body
        document.body.classList.remove('lock');

        // Знаходимо модальне вікно та видаляємо клас 'show-modal'
        const modal = document.querySelector('.modal');
        if (modal.classList.contains('show-modal')) {
          modal.classList.remove('show-modal');
        }

        // Можете показати повідомлення про успішну відправку
        alert('Ваш запит відправлено!');
        closeModal(); // Закриваємо модальне вікно після відправки форми

        formSubmitted = false; // Скидаємо прапорець після завершення запиту
        submitButton.disabled = false; // Повторно вмикаємо кнопку після завершення запиту
      })
      .catch((error) => {
        console.error('Помилка:', error);
        alert('Сталася помилка при відправці форми.');
        formSubmitted = false; // Скидаємо прапорець у випадку помилки
        submitButton.disabled = false; // Повторно вмикаємо кнопку у випадку помилки
      });
  });
});

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('show-modal'); // Приховуємо модальне вікно, знімаючи клас
}
