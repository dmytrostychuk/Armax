const allLangs = ['ua', 'en', 'de'];
let currentLang =
  localStorage.getItem('language') || checkBrowserLang() || 'ua';
const langButtons = document.querySelectorAll('[data-btn]');
const currentPathName = window.location.pathname;
let currentTextObject = {};

const homeTexts = {
  'nav_page-1': {
    ua: 'Металообробка',
    en: 'Metal processing',
    de: 'Metallverarbeitung',
  },
  'nav_page-2': {
    ua: 'Про нас',
    en: 'About us',
    de: 'Über uns',
  },
  'nav_page-3': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakte',
  },
  'header__content_page-1': {
    ua: 'Металообробка будь-якої складності на замовлення.',
    en: 'Metal processing of any complexity on order.',
    de: 'Metallverarbeitung jeder Komplexität auf Bestellung.',
  },
  'header__content_page-2': {
    ua: 'Ми використовуємо передове обладнання та сучасні методи обробки металу. Це дозволяє нам досягати найвищої якості, ефективності та точності у виробництві. Ваші проекти завжди будуть на крок попереду.',
    en: 'We use advanced equipment and modern metal processing methods. This allows us to achieve the highest quality, efficiency, and accuracy in production. Your projects will always be one step ahead.',
    de: 'Wir verwenden modernste Ausrüstung und fortschrittliche Metallverarbeitungsmethoden. Dies ermöglicht es uns, die höchste Qualität, Effizienz und Genauigkeit in der Produktion zu erreichen. Ihre Projekte werden immer einen Schritt voraus sein.',
  },
  'preview_page-1': {
    ua: 'Виконуємо комплексну високоточну металообробку на верстатах з ЧПК',
    en: 'We perform comprehensive high-precision metal processing on CNC machines.',
    de: 'Wir führen umfassende hochpräzise Metallbearbeitung auf CNC-Maschinen durch.',
  },
  'preview_page-2': {
    ua: ' Забезпечуємо повний спектр послуг з металообробки - від',
    en: 'We provide a full range of metal processing services - from',
    de: 'Wir bieten ein komplettes Spektrum an Metallbearbeitungsdienstleistungen - von ',
  },
  'preview_page-3': {
    ua: 'лазерної порізки,',
    en: 'laser cutting,',
    de: 'Laserschneiden,',
  },

  'preview_page-4': {
    ua: 'та гнуття труб і',
    en: 'bending of pipes and',
    de: 'Biegen von Rohren und',
  },
  'preview_page-5': {
    ua: 'листового металу,',
    en: 'sheet metal,',
    de: 'Blechmetall,',
  },
  'preview_page-6': {
    ua: 'до',
    en: 'to',
    de: 'zu',
  },
  'preview_page-7': {
    ua: 'порошкового фарбування',
    en: 'powder coating',
    de: 'Pulverbeschichtung',
  },
  'preview_page-8': {
    ua: 'та покриття пластизолем.',
    en: 'and coating with plastisol.',
    de: 'und Beschichtung mit Plastisol.',
  },
  'services_page-1': {
    ua: 'Наші послуги',
    en: 'Our services',
    de: 'Unsere Dienstleistungen',
  },
  'services_page-2': {
    ua: 'Лазерна порізка',
    en: 'Laser cutting',
    de: 'Laserschneiden',
  },
  'services_page-3': {
    ua: 'Лазер дозволяє виконувати як легкі, так і складні деталі, гарантуючи високу точність і відмінну швидкість роботи.',
    en: 'Laser enables the fabrication of both simple and complex parts, ensuring high precision and excellent speed of operation.',
    de: 'Der Laser ermöglicht die Herstellung sowohl einfacher als auch komplexer Teile und garantiert hohe Präzision und ausgezeichnete Arbeitsgeschwindigkeit.',
  },
  'services_page-4': {
    ua: 'Детальніше',
    en: 'More details',
    de: 'Weitere Details',
  },
  'services_page-5': {
    ua: 'Гнуття деталей',
    en: 'Bending of parts',
    de: 'Biegen von Teilen',
  },
  'services_page-6': {
    ua: 'Гнуття металу - э однією з основних сфер застосування листового металу є виготовлення виробів із зігнутих листових деталей.',
    en: 'Metal bending - one of the main areas of application for sheet metal is the production of products from bent sheet metal parts.',
    de: 'Metal Biegen - einer der Hauptanwendungsbereiche für Blech ist die Herstellung von Produkten aus gebogenen Blechteilen.',
  },
  'services_page-7': {
    ua: 'Детальніше',
    en: 'More details',
    de: 'Weitere Details',
  },
  'services_page-8': {
    ua: 'Порошкове фарбування металевих виробів забезпечує високу якість покриття., зберігає відмінні фізико-хімічні та оздоблювальні характеристики.',
    en: 'Powder coating of metal products ensures high-quality coating, preserving excellent physical, chemical, and decorative characteristics.',
    de: 'Das Pulverbeschichten von Metallprodukten gewährleistet eine hochwertige Beschichtung und erhält ausgezeichnete physikalische, chemische und dekorative Eigenschaften.',
  },
  'services_page-9': {
    ua: 'Порошкове фарбування',
    en: 'Powder coating',
    de: 'Pulverbeschichtung',
  },
  'services_page-10': {
    ua: 'Детальніше',
    en: 'More details',
    de: 'Weitere Details',
  },
  'services_page-11': {
    ua: 'Усі послуги',
    en: 'All services',
    de: 'Alle Dienstleistungen',
  },
  'services_page-12': {
    ua: 'Виконуємо нестандартні та ексклюзивні замовлення на прохання клієнтів - великих промислових підприємств, комерційних організацій і виробничих фірм.',
    en: 'We fulfill custom and exclusive orders upon request from clients - large industrial enterprises, commercial organizations, and manufacturing firms.',
    de: 'Wir erfüllen individuelle und exklusive Bestellungen auf Anfrage von Kunden - großen Industrieunternehmen, kommerziellen Organisationen und Produktionsfirmen.',
  },
  'services_page-13': {
    ua: 'Детальніше',
    en: 'More details',
    de: 'Weitere Details',
  },

  'principles-page-1': {
    ua: 'Наші принципи',
    en: 'More details',
    de: 'Weitere Details',
  },
  'principles-page-2': {
    ua: 'В своїй роботі ми дотримуємось принципів, які дозволяють нам бути впевненими в тому, що наші Клієнти отримують кращий продукт з високим рівнем сервісу. Ми не просто виготовляємо металеві конструкції – ми вирішуємо задачі наших Клієнтів!',
    en: 'In our work, we adhere to principles that allow us to be confident that our clients receive the best product with a high level of service. We don`t just manufacture metal structures - we solve our clients` challenges!',
    de: 'In unserer Arbeit halten wir uns an Grundsätze, die es uns ermöglichen, sicherzustellen, dass unsere Kunden das beste Produkt mit einem hohen Serviceniveau erhalten. Wir stellen nicht nur Metallkonstruktionen her - wir lösen die Herausforderungen unserer Kunden!',
  },
  'principles-page-3': {
    ua: 'Якість',
    en: 'Quality',
    de: 'Qualität',
  },
  'principles-page-4': {
    ua: 'Гарантуємо високу якість.',
    en: 'We guarantee high quality.',
    de: 'Wir garantieren hohe Qualität.',
  },
  'principles-page-5': {
    ua: 'Сервіс',
    en: 'Service',
    de: 'Service',
  },
  'principles-page-6': {
    ua: 'Надаємо будь-яку допомогу при реалізації Вашого проекту.',
    en: 'We provide any assistance in implementing your project.',
    de: 'Wir bieten jede Unterstützung bei der Umsetzung Ihres Projekts.',
  },
  'principles-page-7': {
    ua: 'Ціна',
    en: 'Price',
    de: 'Preis',
  },
  'principles-page-8': {
    ua: 'Конкурентні ціни. Знижки при великих об`ємах замовлень.',
    en: 'Competitive prices. Discounts for large order volumes.',
    de: 'Wettbewerbsfähige Preise. Rabatte bei großen Bestellmengen.',
  },
  'principles-page-9': {
    ua: 'Надійність',
    en: 'Reliability',
    de: 'Zuverlässigkeit',
  },
  'principles-page-10': {
    ua: 'Завдяки багаторічному досвіду роботи, ми гарантуємо поставку продукції в будь-якій ситуації.',
    en: 'Thanks to years of experience, we guarantee product delivery in any situation.',
    de: 'Dank jahrelanger Erfahrung garantieren wir die Lieferung unserer Produkte in jeder Situation.',
  },
  'wara_page-1': {
    ua: 'Каталог продукції',
    en: 'Product catalog',
    de: 'Produktkatalog',
  },
  'wara_page-2': {
    ua: 'Елементи меблів',
    en: 'Furniture items',
    de: 'Möbelstücke',
  },
  'wara_page-3': {
    ua: 'СГ обладнання',
    en: 'Agricultural equipment',
    de: 'Landwirtschaftliche Ausrüstung',
  },
  'wara_page-4': {
    ua: 'Декоративні елементи',
    en: 'Decorative elements',
    de: 'Dekorative Elemente',
  },
  'wara_page-5': {
    ua: 'Індивідуальні проекти',
    en: 'Custom projects',
    de: 'Individuelle Projekte',
  },
  'partners_page-1': {
    ua: 'Наші партнери',
    en: 'Our partners',
    de: 'Unsere Partner',
  },
  'partners_page-2': {
    ua: 'Багаторічний досвід «Армакс», професійний підхід до роботи, сучасне і якісне обладнання – ось за що нас обирають найкращі компанії!',
    en: 'Years of experience, a professional approach to work, modern and high-quality equipment - that`s why the best companies choose us!',
    de: 'Jahrelange Erfahrung, professioneller Arbeitsansatz, modernes und hochwertiges Equipment - das ist der Grund, warum uns die besten Unternehmen wählen!',
  },
  'calculation_page-1': {
    ua: 'Замовити прорахунок проекту',
    en: 'Request a project estimate',
    de: 'Projektkosten schätzen lassen',
  },
  'calculation_page-2': {
    ua: 'Завантажити файл',
    en: 'Upload file',
    de: 'Datei hochladen',
  },
  'calculation_page-3': {
    ua: 'Надіслати',
    en: 'Send',
    de: 'Senden',
  },
  'calculation_page-4': {
    ua: 'Ваше ім`я',
    en: 'Your name',
    de: 'Ihr Name',
  },
  'calculation_page-5': {
    ua: 'Електронна пошта',
    en: 'E-mail',
    de: 'E-mail',
  },
  'calculation_page-6': {
    ua: 'Коментар до замовлення',
    en: 'Order comment',
    de: 'Bestellkommentar',
  },

  'footer_page-1': {
    ua: 'Меню',
    en: 'Menu',
    de: 'Menu',
  },
  'footer_page-2': {
    ua: 'Послуги',
    en: 'Services',
    de: 'Dienstleistungen',
  },
  'footer_page-3': {
    ua: 'Про нас',
    en: 'About us',
    de: 'Über uns',
  },
  'footer_page-4': {
    ua: 'Контакти',
    en: 'Contact',
    de: 'Kontakt',
  },
  'footer_page-5': {
    ua: 'Послуги',
    en: 'Services',
    de: 'Service',
  },
  'footer_page-6': {
    ua: 'Лазерна порізка',
    en: 'Laser cutting',
    de: 'Laser-Schneiden',
  },
  'footer_page-7': {
    ua: 'Гнуття деталей',
    en: 'Bending of parts',
    de: 'Biegen von Teilen',
  },
  'footer_page-8': {
    ua: 'Порошкове фарбування',
    en: 'Powder coating',
    de: 'Pulverbeschichtung',
  },
  'footer_page-9': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
  },
  'footer_page-10': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
  },
  'footer_page-11': {
    ua: 'Адреса',
    en: 'Address',
    de: 'Adresse',
  },
  'footer_page-12': {
    ua: '45200 м. Ківерці, вул.Грушевського 26',
    en: '45200, Kivertsi, Hrushevskoho St. 26',
    de: '45200, Kivertsi, Hrushevskoho Str. 26',
  },
  'footer_page-13': {
    ua: 'Пн - Пт 8:00 - 17:00',
    en: 'Mon - Fri 8:00 AM - 5:00 PM',
    de: 'Mo - Fr 8:00 - 17:00 Uhr',
  },
  'footer_page-14': {
    ua: 'Наші контакти',
    en: 'Our contacts',
    de: 'Unsere Kontakte',
  },
};

function checkPagePathName() {
  switch (currentPathName) {
    case '/index.html':
      currentText = homeTexts;
      break;
    case '/another_page.html':
      currentText = anotherTexts;
      break;
    default:
      currentText = homeTexts;
      break;
  }
}
checkPagePathName();
function changeLang() {
  for (const key in currentText) {
    const elem = document.querySelector(`[data-lang=${key}]`);
    if (elem) {
      if (elem.tagName === 'INPUT') {
        elem.placeholder = currentText[key][currentLang];
        elem.value = currentText[key][currentLang]; // Додано для зміни значення інпута
      } else {
        elem.textContent = currentText[key][currentLang];
      }
    }
  }
}
// function changeLang() {
//   for (const key in currentText) {
//     const elem = document.querySelector(`[data-lang=${key}]`);
//     if (elem) {
//       elem.textContent = currentText[key][currentLang];
//     }
//   }
// }
changeLang();

langButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    currentLang = event.target.dataset.btn;
    localStorage.setItem('language', event.target.dataset.btn);
    resetActiveClass(langButtons, 'header__btn_active');
    btn.classList.add('header__btn_active');
    changeLang();
  });
});

function resetActiveClass(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}

function checkActiveLengButton() {
  switch (currentLang) {
    case 'ua':
      document
        .querySelector('[data-btn="ua"]')
        .classList.add('header__btn_active');
      break;
    case 'en':
      document
        .querySelector('[data-btn="en"]')
        .classList.add('header__btn_active');
      break;
    case 'de':
      document
        .querySelector('[data-btn="de"]')
        .classList.add('header__btn_active');
      break;

    default:
      document
        .querySelector('[data-btn="ua"]')
        .classList.add('header__btn_active');
      break;
  }
}
checkActiveLengButton();

function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 2).toLowerCase();
  const result = allLangs.some((elem) => {
    return elem === navLang;
  });
  if (result) {
    return navLang;
  }
}

document
  .getElementById('disabledLink')
  .addEventListener('click', function (event) {
    event.preventDefault(); // Забороняємо дійсне переходити по посиланню
  });
