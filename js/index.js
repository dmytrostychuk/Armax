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

window.onscroll = function () {
  const scrollButton = document.getElementById('scrollButton');
  if (
    document.documentElement.scrollTop >
    document.documentElement.scrollHeight * 0.05
  ) {
    scrollButton.classList.add('visible'); // Додати клас для показу кнопки
  } else {
    scrollButton.classList.remove('visible'); // Видалити клас для приховування кнопки
  }
};

// Функція для скролу догори
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Плавний скролінг
  });
}

// Функція, що перевіряє, чи видима елемент
function isElementPartiallyInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

document.addEventListener('DOMContentLoaded', function () {
  var blocks = document.querySelectorAll('.news-page__card');

  function toggleReadMore() {
    blocks.forEach(function (block) {
      var fullText = block.querySelector('.full-text');
      var readMoreBtn = block.querySelector('.read-more-btn');

      if (fullText && readMoreBtn) {
        if (window.innerWidth > 1200) {
          fullText.classList.add('expanded1');
        } else {
          fullText.classList.remove('expanded1');
        }
      }
    });
  }

  // Викликаємо функцію при завантаженні сторінки
  toggleReadMore();

  // Додаємо обробник події для зміни розміру вікна
  window.addEventListener('resize', toggleReadMore);

  // Додаємо обробник події для кнопки в кожному блоці
  blocks.forEach(function (block) {
    var readMoreBtn = block.querySelector('.read-more-btn');
    var fullText = block.querySelector('.full-text');

    if (readMoreBtn && fullText) {
      readMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isExpanded = fullText.classList.toggle('expanded');
        readMoreBtn.classList.toggle('expanded', isExpanded);
        var textSpan = readMoreBtn.querySelector('.text');
        if (textSpan) {
          textSpan.textContent = isExpanded ? 'Сховати' : 'Читати більше';
        }
      });
    }
  });
});

var modal = document.querySelector('.modal');
var triggers = document.querySelectorAll('.modal-active');
var closeButton = document.querySelector('.close-button');

function toggleModal() {
  modal.classList.toggle('show-modal');

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

// Додаємо обробники подій для відкриття та закриття модального вікна
triggers.forEach(function (trigger) {
  trigger.addEventListener('click', toggleModal);
});

closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

const cardGalleryButton1 = document.querySelector('.card__gallery-button-1');
if (cardGalleryButton1) {
  cardGalleryButton1.addEventListener('click', function () {
    const gallery1 = document.querySelector('.card__gallery-1');
    const gallery2 = document.querySelector('.card__gallery-2');
    const gallery3 = document.querySelector('.card__gallery-3');
    const button2 = document.querySelector('.card__gallery-button-2');
    const button3 = document.querySelector('.card__gallery-button-3');
    if (gallery1) gallery1.classList.add('active');
    if (gallery2) gallery2.classList.remove('active');
    if (gallery3) gallery3.classList.remove('active');
    this.classList.add('active');
    if (button2) button2.classList.remove('active');
    if (button3) button3.classList.remove('active');
  });
}

const cardGalleryButton2 = document.querySelector('.card__gallery-button-2');
if (cardGalleryButton2) {
  cardGalleryButton2.addEventListener('click', function () {
    const gallery1 = document.querySelector('.card__gallery-1');
    const gallery2 = document.querySelector('.card__gallery-2');
    const gallery3 = document.querySelector('.card__gallery-3');
    const button1 = document.querySelector('.card__gallery-button-1');
    const button3 = document.querySelector('.card__gallery-button-3');
    if (gallery1) gallery1.classList.remove('active');
    if (gallery2) gallery2.classList.add('active');
    if (gallery3) gallery3.classList.remove('active');
    this.classList.add('active');
    if (button1) button1.classList.remove('active');
    if (button3) button3.classList.remove('active');
  });
}

const cardGalleryButton3 = document.querySelector('.card__gallery-button-3');
if (cardGalleryButton3) {
  cardGalleryButton3.addEventListener('click', function () {
    const gallery1 = document.querySelector('.card__gallery-1');
    const gallery2 = document.querySelector('.card__gallery-2');
    const gallery3 = document.querySelector('.card__gallery-3');
    const button1 = document.querySelector('.card__gallery-button-1');
    const button2 = document.querySelector('.card__gallery-button-2');
    if (gallery1) gallery1.classList.remove('active');
    if (gallery2) gallery2.classList.remove('active');
    if (gallery3) gallery3.classList.add('active');
    this.classList.add('active');
    if (button1) button1.classList.remove('active');
    if (button2) button2.classList.remove('active');
  });
}

// Дублікат коду видалено - функціональність вже реалізована вище

// PDF Viewer Modal
document.addEventListener('DOMContentLoaded', function() {
  const pdfModal = document.getElementById('pdfModal');
  const pdfViewer = document.getElementById('pdfViewer');
  const closePdfModal = document.getElementById('closePdfModal');
  const viewButtons = document.querySelectorAll('.testimonials__view');

  // Open PDF modal
  if (viewButtons.length > 0 && pdfModal && pdfViewer) {
    viewButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const pdfPath = this.getAttribute('data-pdf');
        if (pdfPath) {
          pdfViewer.src = pdfPath;
          pdfModal.classList.add('show-modal');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  // Close PDF modal
  if (closePdfModal && pdfModal) {
    closePdfModal.addEventListener('click', function() {
      pdfModal.classList.remove('show-modal');
      if (pdfViewer) {
        pdfViewer.src = '';
      }
      document.body.style.overflow = '';
    });
  }

  // Close modal when clicking outside
  if (pdfModal) {
    pdfModal.addEventListener('click', function(e) {
      if (e.target === pdfModal) {
        pdfModal.classList.remove('show-modal');
        if (pdfViewer) {
          pdfViewer.src = '';
        }
        document.body.style.overflow = '';
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && pdfModal && pdfModal.classList.contains('show-modal')) {
      pdfModal.classList.remove('show-modal');
      if (pdfViewer) {
        pdfViewer.src = '';
      }
      document.body.style.overflow = '';
    }
  });
});
