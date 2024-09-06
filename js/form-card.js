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
