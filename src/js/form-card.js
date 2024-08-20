document
  .getElementById('modalForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Запобігає стандартному надсиланню форми

    const contactInput = document.querySelector('input[name="contact"]');

    // Перевірка довжини інпуту
    if (contactInput.value.length < 6) {
      alert('Контакт має містити не менше 6 символів');
      return;
    }

    const formData = new FormData(this); // Отримання даних форми

    fetch(this.action, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json()) // Розбір JSON відповіді
      .then((data) => {
        // Використання alert для відображення повідомлення
        alert(data.message);
        // Закриття модального вікна після надсилання повідомлення
        closeModal();
        // Очищення форми після успішного надсилання
        document.getElementById('modalForm').reset();
      })
      .catch((error) => {
        console.error('Error:', error); // Обробка помилок
        alert('Щось пішло не так. Спробуйте ще раз.');
      });
  });

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('show-modal'); // Знімає клас show-modal з модального вікна
  document.body.classList.remove('lock'); // Знімає клас lock з body
}

console.log('JavaScript завантажений та працює');
