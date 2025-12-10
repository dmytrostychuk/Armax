const allLangs = ['ua', 'en', 'de'];
let currentLang =
  localStorage.getItem('language') || checkBrowserLang() || 'ua';
const langButtons = document.querySelectorAll('[data-btn]');
const currentPathName = window.location.pathname;
let currentTextObject = {};

const homeTexts = {
  'send-button': {
    ua: 'Надіслати запит',
    en: 'Send request',
    de: 'Anfrage senden',
    pl: 'Wyślij zapytanie',
  },
  'nav_page-1': {
    ua: 'Металообробка',
    en: 'Metal processing',
    de: 'Metallverarbeitung',
    pl: 'Obróbka metalu',
  },
  'nav_page-2': {
    ua: 'Про нас',
    en: 'About us',
    de: 'Über uns',
    pl: 'O nas',
  },
  'nav_page-3': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakte',
    pl: 'Kontakt',
  },
  'nav_page-4': {
    ua: 'Продукти',
    en: 'Products',
    de: 'Produkte',
    pl: 'Produkty',
  },
  'nav_page-5': {
    ua: 'СГ обладнання',
    en: 'AG equipment',
    de: 'AG Ausrüstung',
    pl: 'Sprzęt rolniczy',
  },
  'nav_page-5-1': {
    ua: 'СГ обладнання',
    en: 'AG equipment',
    de: 'AG Ausrüstung',
    pl: 'Sprzęt rolniczy',
  },
  'nav_page-6': {
    ua: 'Меблеві елементи',
    en: 'Furniture elements',
    de: 'Möbelelemente',
    pl: 'Elementy meblowe',
  },
  'nav_page-6-1': {
    ua: 'Меблеві елементи',
    en: 'Furniture elements',
    de: 'Möbelelemente',
    pl: 'Elementy meblowe',
  },
  'nav_page-7': {
    ua: 'Елементи декору',
    en: 'Decor elements',
    de: 'Dekorelemente',
    pl: 'Elementy dekoracyjne',
  },
  'nav_page-7-1': {
    ua: 'Елементи декору',
    en: 'Decor elements',
    de: 'Dekorelemente',
    pl: 'Elementy dekoracyjne',
  },
  'nav_page-8': {
    ua: 'Індивідуальні замовлення',
    en: 'Custom orders',
    de: 'Individuelle Bestellungen',
    pl: 'Zamówienia indywidualne',
  },
  'nav_page-8-1': {
    ua: 'Індивідуальні замовлення',
    en: 'Custom orders',
    de: 'Individuelle Bestellungen',
    pl: 'Zamówienia indywidualne',
  },
  'nav_page-9': {
    ua: 'Новини',
    en: 'News',
    de: 'Nachrichten',
    pl: 'Aktualności',
  },
  'header__content_page-1': {
    ua: 'Армакс МГ -  ',
    en: 'Metal processing of any complexity on order.',
    de: 'Metallverarbeitung jeder Komplexität auf Bestellung.',
    pl: 'Obróbka metalu o dowolnym stopniu złożoności na zamówienie.',
  },
  'header__content_page-2': {
    ua: 'ваші ідеальні меблі починаються з наших надійних деталей',
    en: 'We use advanced equipment and modern metal processing methods. This allows us to achieve the highest quality, efficiency, and accuracy in production. Your projects will always be one step ahead.',
    de: 'Wir verwenden modernste Ausrüstung und fortschrittliche Metallverarbeitungsmethoden. Dies ermöglicht es uns, die höchste Qualität, Effizienz und Genauigkeit in der Produktion zu erreichen. Ihre Projekte werden immer einen Schritt voraus sein.',
    pl: 'Używamy zaawansowanego sprzętu i nowoczesnych metod obróbki metalu. Dzięki temu osiągamy najwyższą jakość, wydajność i precyzję w produkcji. Twoje projekty zawsze będą o krok do przodu.',
  },
  'preview_page-1': {
    ua: 'Виконуємо комплексну високоточну металообробку на верстатах з ЧПК',
    en: 'We perform comprehensive high-precision metal processing on CNC machines.',
    de: 'Wir führen umfassende hochpräzise Metallbearbeitung auf CNC-Maschinen durch.',
    pl: 'Wykonujemy kompleksową, precyzyjną obróbkę metalu na maszynach CNC.',
  },
  'preview_page-2': {
    ua: ' Забезпечуємо повний спектр послуг з металообробки - від',
    en: 'We provide a full range of metal processing services - from',
    de: 'Wir bieten ein komplettes Spektrum an Metallbearbeitungsdienstleistungen - von',
    pl: 'Oferujemy pełen zakres usług obróbki metalu – od',
  },
  'preview_page-3': {
    ua: 'лазерної порізки,',
    en: 'laser cutting,',
    de: 'Laserschneiden,',
    pl: 'cięcia laserowego,',
  },
  'preview_page-4': {
    ua: 'та гнуття труб і',
    en: 'bending of pipes and',
    de: 'Biegen von Rohren und',
    pl: 'gięcia rur i',
  },
  'preview_page-5': {
    ua: 'листового металу,',
    en: 'sheet metal,',
    de: 'Blechmetall,',
    pl: 'blachy,',
  },
  'preview_page-6': {
    ua: 'до',
    en: 'to',
    de: 'zu',
    pl: 'do',
  },
  'preview_page-7': {
    ua: 'порошкового фарбування',
    en: 'powder coating',
    de: 'Pulverbeschichtung',
    pl: 'malowania proszkowego',
  },
  'preview_page-8': {
    ua: 'та покриття пластизолем.',
    en: 'and finishes of varying complexity.',
    de: 'und Beschichtungen unterschiedlicher Komplexität.',
    pl: 'oraz powłok plastyzolem.',
  },

  'services_page-1': {
    ua: 'Наше виробництво',
en: 'Our manufacturing',
de: 'Unsere Produktion',
pl: 'Nasza produkcja',


  },
  'services_page-2': {
    ua: 'Лазерна порізка',
    en: 'Laser cutting',
    de: 'Laserschneiden',
    pl: 'Cięcie laserowe',
  },
  'services_page-3': {
    ua: 'Лазер дозволяє виконувати як легкі, так і складні деталі, гарантуючи високу точність і відмінну швидкість роботи.',
    en: 'Laser enables the fabrication of both simple and complex parts, ensuring high precision and excellent speed of operation.',
    de: 'Der Laser ermöglicht die Herstellung sowohl einfacher als auch komplexer Teile und garantiert hohe Präzision und ausgezeichnete Arbeitsgeschwindigkeit.',
    pl: 'Laser umożliwia wykonanie zarówno prostych, jak i skomplikowanych elementów, gwarantując wysoką precyzję i doskonałą prędkość pracy.',
  },
  'services_page-4': {
    ua: 'Детальніше',
    en: 'More details',
    de: 'Weitere Details',
    pl: 'Więcej szczegółów',
  },
  'services_page-5': {
    ua: 'Гнуття деталей',
    en: 'Bending of parts',
    de: 'Biegen von Teilen',
    pl: 'Gięcie elementów',
  },
  'services_page-6': {
    ua: 'Гнуття металу - э однією з основних сфер застосування листового металу є виготовлення виробів із зігнутих листових деталей.',
    en: 'Metal bending - one of the main areas of application for sheet metal is the production of products from bent sheet metal parts.',
    de: 'Metal Biegen - einer der Hauptanwendungsbereiche für Blech ist die Herstellung von Produkten aus gebogenen Blechteilen.',
    pl: 'Gięcie metalu - jednym z głównych zastosowań blachy jest produkcja elementów z giętych blach.',
  },
  'services_page-7': {
    ua: 'Детальніше',
    en: 'More details',
    de: 'Weitere Details',
    pl: 'Więcej szczegółów',
  },
  'services_page-8': {
    ua: 'Порошкове фарбування металевих виробів забезпечує високу якість покриття., зберігає відмінні фізико-хімічні та оздоблювальні характеристики.',
    en: 'Powder coating of metal products ensures high-quality coating, preserving excellent physical, chemical, and decorative characteristics.',
    de: 'Das Pulverbeschichten von Metallprodukten gewährleistet eine hochwertige Beschichtung und erhält ausgezeichnete physikalische, chemische und dekorative Eigenschaften.',
    pl: 'Malowanie proszkowe wyrobów metalowych zapewnia wysoką jakość powłoki, zachowując doskonałe właściwości fizykochemiczne i wykończeniowe.',
  },
  'services_page-9': {
    ua: 'Порошкове фарбування',
    en: 'Powder coating',
    de: 'Pulverbeschichtung',
    pl: 'Malowanie proszkowe',
  },
  'services_page-10': {
    ua: 'Детальніше',
    en: 'More details',
    de: 'Weitere Details',
    pl: 'Więcej szczegółów',
  },
  'services_page-11': {
    ua: 'Усі послуги',
    en: 'All services',
    de: 'Alle Dienstleistungen',
    pl: 'Wszystkie usługi',
  },
  'services_page-12': {
    ua: 'Виконуємо нестандартні та ексклюзивні замовлення на прохання клієнтів - великих промислових підприємств, комерційних організацій і виробничих фірм.',
    en: 'We fulfill custom and exclusive orders upon request from clients - large industrial enterprises, commercial organizations, and manufacturing firms.',
    de: 'Wir erfüllen individuelle und exklusive Bestellungen auf Anfrage von Kunden - großen Industrieunternehmen, kommerziellen Organisationen und Produktionsfirmen.',
    pl: 'Realizujemy niestandardowe i ekskluzywne zamówienia na życzenie klientów - dużych przedsiębiorstw przemysłowych, organizacji handlowych i firm produkcyjnych.',
  },
  'services_page-13': {
    ua: 'Детальніше',
    en: 'More details',
    de: 'Weitere Details',
    pl: 'Więcej szczegółów',
  },

  'principles-page-1': {
    ua: 'Наші принципи',
    en: 'More details',
    de: 'Weitere Details',
    pl: 'Nasze zasady',
  },
  'principles-page-2': {
    ua: 'В своїй роботі ми дотримуємось принципів, які дозволяють нам бути впевненими в тому, що наші Клієнти отримують кращий продукт з високим рівнем сервісу. Ми не просто виготовляємо металеві конструкції – ми вирішуємо задачі наших Клієнтів!',
    en: 'In our work, we adhere to principles that allow us to be confident that our clients receive the best product with a high level of service. We don`t just manufacture metal structures - we solve our clients` challenges!',
    de: 'In unserer Arbeit halten wir uns an Grundsätze, die es uns ermöglichen, sicherzustellen, dass unsere Kunden das beste Produkt mit einem hohen Serviceniveau erhalten. Wir stellen nicht nur Metallkonstruktionen her - wir lösen die Herausforderungen unserer Kunden!',
    pl: 'W naszej pracy kierujemy się zasadami, które pozwalają nam mieć pewność, że nasi Klienci otrzymują najlepszy produkt o wysokim poziomie obsługi. Nie tylko produkujemy konstrukcje metalowe - rozwiązujemy problemy naszych Klientów!',
  },
  'principles-page-3': {
    ua: 'Якість',
    en: 'Quality',
    de: 'Qualität',
    pl: 'Jakość',
  },
  'principles-page-4': {
    ua: 'Гарантуємо високу якість.',
    en: 'We guarantee high quality.',
    de: 'Wir garantieren hohe Qualität.',
    pl: 'Gwarantujemy wysoką jakość.',
  },
  'principles-page-5': {
    ua: 'Сервіс',
    en: 'Service',
    de: 'Service',
    pl: 'Obsługa',
  },
  'principles-page-6': {
    ua: 'Надаємо будь-яку допомогу при реалізації Вашого проекту.',
    en: 'We provide any assistance in implementing your project.',
    de: 'Wir bieten jede Unterstützung bei der Umsetzung Ihres Projekts.',
    pl: 'Oferujemy wszelką pomoc w realizacji Twojego projektu.',
  },
  'principles-page-7': {
    ua: 'Ціна',
    en: 'Price',
    de: 'Preis',
    pl: 'Cena',
  },
  'principles-page-8': {
    ua: 'Конкурентні ціни. Знижки при великих об`ємах замовлень.',
    en: 'Competitive prices. Discounts for large order volumes.',
    de: 'Wettbewerbsfähige Preise. Rabatte bei großen Bestellmengen.',
    pl: 'Konkurencyjne ceny. Rabaty przy dużych zamówieniach.',
  },
  'principles-page-9': {
    ua: 'Надійність',
    en: 'Reliability',
    de: 'Zuverlässigkeit',
    pl: 'Niezawodność',
  },
  'principles-page-10': {
    ua: 'Завдяки багаторічному досвіду роботи, ми гарантуємо поставку продукції в будь-якій ситуації.',
    en: 'Thanks to years of experience, we guarantee product delivery in any situation.',
    de: 'Dank jahrelanger Erfahrung garantieren wir die Lieferung unserer Produkte in jeder Situation.',
    pl: 'Dzięki wieloletniemu doświadczeniu gwarantujemy dostawę produktów w każdej sytuacji.',
  },

  'wara_page-1': {
    ua: 'Наші продукти',
    en: 'Our products',
    de: 'Unsere Produkte',
    pl: 'Nasze produkty',
  },
  'wara_page-2': {
    ua: 'Меблеві елементи',
    en: 'Furniture elements',
    de: 'Möbelelemente',
    pl: 'Elementy meblowe',
  },
  'wara_page-2-1': {
    ua: 'Меблеві елементи',
    en: 'Furniture elements',
    de: 'Möbelelemente',
    pl: 'Elementy meblowe',
  },
  'wara_page-3': {
    ua: 'СГ обладнання',
    en: 'Agricultural equipment',
    de: 'Landwirtschaftliche Ausrüstung',
    pl: 'Sprzęt rolniczy',
  },
  'wara_page-3-1': {
    ua: 'СГ обладнання',
    en: 'Agricultural equipment',
    de: 'Landwirtschaftliche Ausrüstung',
    pl: 'Sprzęt rolniczy',
  },
  'wara_page-4': {
    ua: 'Елементи декору',
    en: 'Decorative elements',
    de: 'Dekorative Elemente',
    pl: 'Elementy dekoracyjne',
  },
  'wara_page-4-1': {
    ua: 'Елементи декору',
    en: 'Decorative elements',
    de: 'Dekorative Elemente',
    pl: 'Elementy dekoracyjne',
  },
  'wara_page-5': {
    ua: 'Індивідуальні проекти',
    en: 'Custom projects',
    de: 'Individuelle Projekte',
    pl: 'Projekty na zamówienie',
  },
  'wara_page-5-1': {
    ua: 'Індивідуальні проекти та декоративні елементи',
    en: 'Custom projects',
    de: 'Individuelle Projekte',
    pl: 'Projekty na zamówienie i elementy dekoracyjne',
  },
  'wara_page-6': {
    ua: 'Новини',
    en: 'News',
    de: 'Nachrichten',
    pl: 'Aktualności',
  },

  'partners_page-1': {
    ua: 'Наші партнери',
    en: 'Our partners',
    de: 'Unsere Partner',
    pl: 'Nasi partnerzy',
  },
  'partners_page-2': {
    ua: 'Багаторічний досвід «Армакс», професійний підхід до роботи, сучасне і якісне обладнання – ось за що нас обирають найкращі компанії!',
    en: 'Years of experience, a professional approach to work, modern and high-quality equipment - that`s why the best companies choose us!',
    de: 'Jahrelange Erfahrung, professioneller Arbeitsansatz, modernes und hochwertiges Equipment - das ist der Grund, warum uns die besten Unternehmen wählen!',
    pl: 'Wieloletnie doświadczenie „Armaks”, profesjonalne podejście do pracy, nowoczesny i wysokiej jakości sprzęt – oto dlaczego wybierają nas najlepsze firmy!',
  },
  'calculation_page-1': {
    ua: 'Замовити прорахунок проекту',
    en: 'Request a project estimate',
    de: 'Projektkosten schätzen lassen',
    pl: 'Zamów wycenę projektu',
  },
  'calculation_page-2': {
    ua: 'Завантажити файл',
    en: 'Upload file',
    de: 'Datei hochladen',
    pl: 'Prześlij plik',
  },
  'calculation_page-3': {
    ua: 'Надіслати',
    en: 'Send',
    de: 'Senden',
    pl: 'Wyślij',
  },
  'calculation_page-4': {
    ua: 'Ваше ім`я:',
    en: 'Your name:',
    de: 'Ihr Name:',
    pl: 'Twoje imię:',
  },
  'calculation_page-5': {
    ua: 'Електронна пошта:',
    en: 'E-mail:',
    de: 'E-mail:',
    pl: 'E-mail:',
  },
  'calculation_page-6': {
    ua: 'Коментар до замовлення:',
    en: 'Order comment:',
    de: 'Bestellkommentar:',
    pl: 'Komentarz do zamówienia:',
  },
  'calculation_page-7': {
    ua: 'Телефон:',
    en: 'Phone:',
    de: 'Telefon:',
    pl: 'Telefon:',
  },

  'footer_page-1': {
    ua: 'Меню',
    en: 'Menu',
    de: 'Menu',
    pl: 'Menu',
  },
  'footer_page-2': {
    ua: 'Послуги',
    en: 'Services',
    de: 'Dienstleistungen',
    pl: 'Usługi',
  },
  'footer_page-3': {
    ua: 'Про нас',
    en: 'About us',
    de: 'Über uns',
    pl: 'O nas',
  },
  'footer_page-4': {
    ua: 'Контакти',
    en: 'Contact',
    de: 'Kontakt',
    pl: 'Kontakt',
  },
  'footer_page-5': {
    ua: 'Послуги',
    en: 'Services',
    de: 'Service',
    pl: 'Usługi',
  },
  'footer_page-6': {
    ua: 'Лазерна порізка',
    en: 'Laser cutting',
    de: 'Laser-Schneiden',
    pl: 'Cięcie laserowe',
  },
  'footer_page-6-1': {
    ua: 'Лазерна порізка',
    en: 'Laser cutting',
    de: 'Laser-Schneiden',
    pl: 'Cięcie laserowe',
  },
  'footer_page-7': {
    ua: 'Гнуття деталей',
    en: 'Bending of parts',
    de: 'Biegen von Teilen',
    pl: 'Gięcie części',
  },
  'footer_page-7-1': {
    ua: 'Гнуття деталей',
    en: 'Bending of parts',
    de: 'Biegen von Teilen',
    pl: 'Gięcie części',
  },
  'footer_page-8': {
    ua: 'Порошкове фарбування',
    en: 'Powder coating',
    de: 'Pulverbeschichtung',
    pl: 'Lakierowanie proszkowe',
  },
  'footer_page-8-1': {
    ua: 'Порошкове фарбування',
    en: 'Powder coating',
    de: 'Pulverbeschichtung',
    pl: 'Lakierowanie proszkowe',
  },
  'footer_page-9': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
    pl: 'Prace spawalnicze',
  },
  'footer_page-9-1': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
    pl: 'Prace spawalnicze',
  },
  'footer_page-10': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
    pl: 'Prace ślusarskie',
  },
  'footer_page-10-1': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
    pl: 'Prace ślusarskie',
  },
  'footer_page-11-1': {
    ua: 'Механічна обробка',
    en: 'Mechanical processing',
    de: 'Mechanische Bearbeitung',
    pl: 'Obróbka mechaniczna',
  },
  'footer_page-11': {
    ua: 'Адреса',
    en: 'Address',
    de: 'Adresse',
    pl: 'Adres',
  },
  'footer_page-12': {
    ua: '45200 м. Ківерці, вул.Грушевського 26',
    en: '45200, Kivertsi, Hrushevskoho St. 26',
    de: '45200, Kivertsi, Hrushevskoho Str. 26',
    pl: '45200, Kiwertsi, ul. Hruszewskiego 26',
  },
  'footer_page-13': {
    ua: 'Пн - Пт 8:00 - 17:00',
    en: 'Mon - Fri 8:00 AM - 5:00 PM',
    de: 'Mo - Fr 8:00 - 17:00 Uhr',
    pl: 'Pon - Pt 8:00 - 17:00',
  },
  'footer_page-14': {
    ua: 'Наші контакти',
    en: 'Our contacts',
    de: 'Unsere Kontakte',
    pl: 'Nasze kontakty',
  },
  'footer_page-15': {
    ua: 'Новини',
    en: 'News',
    de: 'Nachrichten',
    pl: 'Aktualności',
  },
  'footer_page-16': {
    ua: 'Продукти',
    en: 'Products',
    de: 'Produkte',
    pl: 'Produkty',
  },
  'footer_page-17': {
    ua: 'Механічна обробка',
    en: 'Mechanical Processing',
    de: 'Mechanische Bearbeitung',
    pl: 'Obróbka mechaniczna',
  },

  //---------about us
  'header-content_page-1': {
    ua: 'Коротко про нас',
    en: 'About us',
    de: 'Über uns',
    pl: 'O nas',
  },
  'header-content_page-2': {
    ua: 'Armax MG – сучасне та технологічно-оснащене українське виробництво, спеціалізуємось на металообробці з 2018 року. Надаємо повний комплекс послуг з обробки металу: лазерного різання, згинання, зварювання металевих виробів та фарбування.',
    en: 'Armax MG is a modern and technologically equipped Ukrainian manufacturing company specializing in metal processing since 2018. We provide a full range of metal processing services including laser cutting, bending, welding of metal products, and painting.',
    de: 'Armax MG ist ein modernes und technologisch ausgestattetes ukrainisches Produktionsunternehmen, das sich seit 2018 auf die Metallverarbeitung spezialisiert hat. Wir bieten eine umfassende Palette von Metallverarbeitungsdienstleistungen an, darunter Laserschneiden, Biegen, Schweißen von Metallprodukten und Lackieren.',
    pl: 'Armax MG to nowoczesna i technologicznie wyposażona ukraińska firma produkcyjna specjalizująca się w obróbce metali od 2018 roku. Oferujemy pełen zakres usług obróbki metali, w tym cięcie laserowe, gięcie, spawanie produktów metalowych i malowanie.',
  },
  'a-privilege_page-1': {
    ua: 'Чому нас обирають?',
    en: 'Why choose us?',
    de: 'Warum uns wählen?',
    pl: 'Dlaczego nas wybrać?',
  },
  'a-privilege_page-2': {
    ua: 'Висока якість',
    en: 'High quality',
    de: 'Hohe Qualität',
    pl: 'Wysoka jakość',
  },
  'a-privilege_page-3': {
    ua: 'Дотримуємось найвищих стандартів якості у всіх аспектах бізнесу та постійно вдосконалюємо процеси.',
    en: 'We adhere to the highest quality standards in all aspects of our business and continuously improve our processes.',
    de: 'Wir halten uns in allen Bereichen unseres Geschäfts an die höchsten Qualitätsstandards und verbessern ständig unsere Prozesse.',
    pl: 'Przestrzegamy najwyższych standardów jakości we wszystkich aspektach naszej działalności i stale doskonalimy nasze procesy.',
  },
  'a-privilege_page-4': {
    ua: 'Дотримуємося термінів',
    en: 'We adhere to deadlines',
    de: 'Wir halten Termine ein',
    pl: 'Trzymamy się terminów',
  },
  'a-privilege_page-5': {
    ua: 'Гарантуємо стабільність та надійність у виконанні своїх зобов`язань.',
    en: 'We guarantee stability and reliability in fulfilling our obligations.',
    de: 'Wir garantieren Stabilität und Zuverlässigkeit bei der Erfüllung unserer Verpflichtungen.',
    pl: 'Gwarantujemy stabilność i niezawodność w realizacji naszych zobowiązań.',
  },
  'a-privilege_page-6': {
    ua: 'Уважні до клієнта',
    en: 'Attentive to the client',
    de: 'Aufmerksam gegenüber dem Kunden',
    pl: 'Uważni na klienta',
  },
  'a-privilege_page-7': {
    ua: 'Враховуємо та задовільняємо потреби та побажання клієнтів.',
    en: 'We take into account and satisfy the needs and wishes of our clients.',
    de: 'Wir berücksichtigen und erfüllen die Bedürfnisse und Wünsche unserer Kunden.',
    pl: 'Uwzględniamy i spełniamy potrzeby oraz życzenia naszych klientów.',
  },
  'a-privilege_page-8': {
    ua: 'Знаходимо рішення',
    en: 'We find solutions',
    de: 'Wir finden Lösungen',
    pl: 'Znajdujemy rozwiązania',
  },
  'a-privilege_page-9': {
    ua: 'Швидко та ефективно знаходиммо оптимальні рішення.',
    en: 'We quickly and efficiently find optimal solutions.',
    de: 'Wir finden schnell und effizient optimale Lösungen.',
    pl: 'Szybko i efektywnie znajdujemy optymalne rozwiązania.',
  },
  'a-privilege_page-10': {
    ua: 'Як ми працюємо?',
    en: 'How do we work?',
    de: 'Wie arbeiten wir?',
    pl: 'Jak pracujemy?',
  },
  'a-privilege_page-11': {
    ua: 'Ви залишаєте заявку на розрахунок чи консультацію фахівця',
    en: 'You submit a request for an estimate or consultation with a specialist',
    de: 'Sie geben eine Anfrage für eine Schätzung oder Beratung durch einen Fachmann ab',
    pl: 'Składają Państwo zapytanie o kosztorys lub konsultację ze specjalistą',
  },
  'a-privilege_page-12': {
    ua: 'Наш менеджер зв’язується з Вами для уточнення технічного завдання',
    en: 'Our manager contacts you to clarify the technical task',
    de: 'Unser Manager setzt sich mit Ihnen in Verbindung, um die technische Aufgabe zu klären',
    pl: 'Nasz menedżer skontaktuje się z Państwem, aby wyjaśnić zadanie techniczne',
  },
  'a-privilege_page-13': {
    ua: 'Ви отримуєте прорахунок по проекту не більше ніж за 3 робочі дні',
    en: 'You will receive the project estimate in no more than 3 business days',
    de: 'Sie erhalten die Projektabschätzung innerhalb von höchstens 3 Arbeitstagen',
    pl: 'Otrzymują Państwo kosztorys projektu nie później niż w ciągu 3 dni roboczych',
  },
  'a-privilege_page-14': {
    ua: 'Виготовлення та затвердження Вашого зразка',
    en: 'Manufacturing and approval of your sample',
    de: 'Herstellung und Genehmigung Ihres Musters',
    pl: 'Produkcja i zatwierdzenie Państwa wzorca',
  },
  'a-privilege_page-15': {
    ua: 'Укладання договору та погодження графіка відвантаження партій',
    en: 'Contract signing and scheduling of batch shipments',
    de: 'Vertragsunterzeichnung und Terminierung der Chargenlieferungen',
    pl: 'Podpisanie umowy i uzgodnienie harmonogramu wysyłki partii',
  },
  'a-privilege_page-16': {
    ua: 'Запуск партії виробів у роботу, згідно з термінами відвантаження',
    en: 'Launching production batches according to shipment deadlines',
    de: 'Starten der Produktionschargen gemäß den Lieferfristen',
    pl: 'Uruchomienie partii produkcyjnych zgodnie z terminami wysyłki',
  },

  //------------contacts
  'c-header_page-1': {
    ua: 'Наші контакти',
    en: 'Our contacts',
    de: 'Unsere Kontakte',
    pl: 'Nasze kontakty',
  },
  'c-header_page-2': {
    ua: 'Ми завжди раді з Вами поспілкуватися.',
    en: 'We are always happy to communicate with you.',
    de: 'Wir freuen uns immer, mit Ihnen zu kommunizieren.',
    pl: 'Zawsze chętnie się z Państwem skontaktujemy.',
  },
  'c-header_page-3': {
    ua: 'Телефон:',
    en: 'Phone:',
    de: 'Telefon:',
    pl: 'Telefon:',
  },
  'c-header_page-4': {
    ua: 'Адреса:',
    en: 'Address:',
    de: 'Adresse:',
    pl: 'Adres:',
  },
  'c-header_page-5': {
    ua: 'Email:',
    en: 'Email:',
    de: 'E-Mail:',
    pl: 'Email:',
  },
  'c-header_page-6': {
    ua: 'Бухгалтерський відділ:',
    en: 'Accounting department:',
    de: 'Buchhaltungsabteilung:',
    pl: 'Dział księgowości:',
  },
  'c-header_page-7': {
    ua: 'Відділ постачання:',
    en: 'Supply department:',
    de: 'Beschaffungsabteilung:',
    pl: 'Dział zaopatrzenia:',
  },
  'c-header_page-8': {
    ua: 'Графік роботи:',
    en: 'Working hours:',
    de: 'Öffnungszeiten:',
    pl: 'Godziny pracy:',
  },
  'c-header_page-9': {
    ua: 'Пн - Пт 8:00 - 17:00',
    en: 'Mon - Fri 8:00 - 17:00',
    de: 'Mo - Fr 8:00 - 17:00',
    pl: 'Pon - Pt 8:00 - 17:00',
  },
  'c-calc_page-1': {
    ua: 'Ваше ім`я *',
    en: 'Your name *',
    de: 'Ihr Name *',
    pl: 'Twoje imię *',
  },
  'c-calc_page-2': {
    ua: 'Сергій',
    en: 'Sergiy',
    de: 'Sergiy',
    pl: 'Sergiy',
  },
  'c-calc_page-3': {
    ua: 'Ваш телефон *',
    en: 'Your phone number *',
    de: 'Ihre Telefonnummer *',
    pl: 'Twój numer telefonu *',
  },
  'c-calc_page-4': {
    ua: 'Ваш email *',
    en: 'Your email *',
    de: 'Ihre E-Mail *',
    pl: 'Twój email *',
  },

  //----------dyeing
  'd-header_page-1': {
    ua: 'Порошкове фарбування металу',
    en: 'Powder coating of metal',
    de: 'Pulverbeschichtung von Metall',
    pl: 'Lakierowanie proszkowe metalu',
  },
  'd-header_page-2': {
    ua: 'Наша компанія надає послуги з порошкового фарбування металу на сучасному обладнанні, за вигідними цінами та у погоджені терміни',
    en: 'Our company provides metal powder coating services using modern equipment, at competitive prices, and within agreed deadlines',
    de: 'Unser Unternehmen bietet Pulverbeschichtungsdienste für Metall an, die mit modernen Geräten zu wettbewerbsfähigen Preisen und innerhalb vereinbarter Fristen durchgeführt werden',
    pl: 'Nasza firma oferuje usługi lakierowania proszkowego metalu z wykorzystaniem nowoczesnego sprzętu, w konkurencyjnych cenach i w uzgodnionych terminach',
  },
  'd-header_page-3': {
    ua: 'Основні характеристики порошкового фарбування Armax MG',
    en: 'Key characteristics of Armax MG powder coating',
    de: 'Hauptmerkmale der Pulverbeschichtung Armax MG',
    pl: 'Kluczowe cechy lakierowania proszkowego Armax MG',
  },
  'd-header_page-4': {
    ua: 'Габарит камери обпалу:',
    en: 'Baking chamber dimensions:',
    de: 'Abmessungen der Backkammer:',
    pl: 'Wymiary komory wypalania:',
  },
  'd-header_page-5': {
    ua: 'становить (ДхШхВ):',
    en: 'are (WxHxD):',
    de: 'sind (BxHxT):',
    pl: 'wynosi (SxWxG):',
  },
  'd-header_page-16': {
    ua: '2500х1500х1000 мм.',
    en: '2500x1500x1000 mm.',
    de: '2500x1500x1000 mm.',
    pl: '2500x1500x1000 mm.',
  },
  'd-header_page-7': {
    ua: 'Товщина шару нанесення:',
    en: 'Coating thickness:',
    de: 'Beschichtungsdicke:',
    pl: 'Grubość powłoki:',
  },
  'd-header_page-8': {
    ua: 'становить від',
    en: 'is from',
    de: 'ist von',
    pl: 'wynosi od',
  },
  'd-header_page-9': {
    ua: 'до',
    en: 'to',
    de: 'bis',
    pl: 'do',
  },
  'd-header_page-10': {
    ua: 'Температура запікання фарби:',
    en: 'Paint baking temperature:',
    de: 'Backtemperatur der Farbe:',
    pl: 'Temperatura wypalania farby:',
  },
  'd-header_page-11': {
    ua: 'становить від',
    en: 'is from',
    de: 'ist von',
    pl: 'wynosi od',
  },
  'd-header_page-12': {
    ua: 'до',
    en: 'to',
    de: 'bis',
    pl: 'do',
  },
  'd-header_page-13': {
    ua: 'Максимальна вага деталі:',
    en: 'Maximum part weight:',
    de: 'Maximales Teilegewicht:',
    pl: 'Maksymalna waga części:',
  },
  'd-header_page-14': {
    ua: 'становить',
    en: 'is',
    de: 'ist',
    pl: 'wynosi',
  },
  'd-header_page-15': {
    ua: '100кг',
    en: '100kg',
    de: '100kg',
    pl: '100kg',
  },

  'd-header_page-17': {
    ua: ' 60 ',
    en: ' 60 ',
    de: ' 60 ',
    pl: ' 60 ',
  },
  'd-header_page-18': {
    ua: ' 200 мкм.',
    en: ' 200 microns.',
    de: ' 200 Mikrometer.',
    pl: ' 200 mikronów.',
  },
  'd-header_page-19': {
    ua: '150°',
    en: '150°',
    de: '150°',
    pl: '150°',
  },
  'd-header_page-20': {
    ua: '240°',
    en: '240°',
    de: '240°',
    pl: '240°',
  },

  'd-price_page-1': {
    ua: 'Ціна фарбування металу',
    en: 'Metal painting price',
    de: 'Metalllackierungspreis',
    pl: 'Cena malowania metalu',
  },
  'd-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості послуг фарбування та терміни виконання замовлення, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги із фарбування визначається за такими основними критеріями як:',
    en: 'In order for us to make an accurate calculation of the cost of painting services and the timing of order fulfillment, we need to receive from you full information about the product, detailed technical specifications or drawings. Prices for painting services are determined by such basic criteria as:',
    de: 'Um eine genaue Kalkulation der Kosten für Lackierdienstleistungen und die Termine für die Auftragsabwicklung vornehmen zu können, benötigen wir von Ihnen vollständige Informationen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Die Preise für Lackierdienstleistungen werden anhand solcher grundlegender Kriterien bestimmt wie:',
    pl: 'Abyśmy mogli dokładnie obliczyć koszt usług malowania i czas realizacji zamówienia, musimy otrzymać od Państwa pełne informacje o produkcie, szczegółowe specyfikacje techniczne lub rysunki. Ceny usług malowania określane są na podstawie takich podstawowych kryteriów jak:',
  },
  'd-price_page-4': {
    ua: 'Площа фарбування;',
    en: 'Painting area;',
    de: 'Lackierfläche;',
    pl: 'Powierzchnia malowania;',
  },
  'd-price_page-5': {
    ua: 'Геометрична форма виробу;',
    en: 'Geometric shape of the product;',
    de: 'Geometrische Form des Produkts;',
    pl: 'Geometria produktu;',
  },
  'd-price_page-6': {
    ua: 'Ступінь готовності поверхні до фарбування;',
    en: 'Surface readiness for painting;',
    de: 'Oberflächenbereitschaft für die Lackierung;',
    pl: 'Gotowość powierzchni do malowania;',
  },
  'd-price_page-7': {
    ua: 'Габаритні розміри;',
    en: 'Overall dimensions;',
    de: 'Gesamtabmessungen;',
    pl: 'Wymiary całkowite;',
  },
  'd-price_page-8': {
    ua: 'Матеріал виготовлення;',
    en: 'Material of manufacture;',
    de: 'Herstellungsmaterial;',
    pl: 'Materiał wykonania;',
  },

  //------------lazer

  'l-header_page-1': {
    ua: 'Лазерна різка металу',
    en: 'Metal laser cutting',
    de: 'Metall-Laserschneiden',
    pl: 'Cięcie metalu laserem',
  },
  'l-header_page-2': {
    ua: 'Лазерна різка металу – один з найбільш сучасних, ефективних, високоточних і економічно вигідних способів розкрою та порізки різних металів.',
    en: 'Metal laser cutting is one of the most modern, efficient, precise, and economically advantageous methods of cutting various metals.',
    de: 'Das Laserschneiden von Metall ist eine der modernsten, effizientesten, präzisesten und wirtschaftlich vorteilhaftesten Methoden zum Schneiden verschiedener Metalle.',
    pl: 'Cięcie metalu laserem jest jedną z najnowocześniejszych, najwydajniejszych, precyzyjnych i ekonomicznie korzystnych metod cięcia różnych metali.',
  },
  'l-char_page-1': {
    ua: 'Основні характеристики лазерного різання металу Armax MG',
    en: 'Main characteristics of Armax MG metal laser cutting',
    de: 'Hauptmerkmale des Metall-Laserschneidens Armax MG',
    pl: 'Główne cechy cięcia metalu laserem Armax MG',
  },
  'l-char_page-2': {
    ua: 'Ermaxan FIBERMAK (Турція)',
    en: 'Ermaxan FIBERMAK (Turkey)',
    de: 'Ermaxan FIBERMAK (Türkei)',
    pl: 'Ermaxan FIBERMAK (Turcja)',
  },
  'l-char_page-3': {
    ua: 'Максимальні розміри листа:',
    en: 'Maximum sheet dimensions:',
    de: 'Maximale Blechabmessungen:',
    pl: 'Maksymalne wymiary arkusza:',
  },
  'l-char_page-4': {
    ua: 'Розмір робочої поверхні –',
    en: 'Work surface size -',
    de: 'Arbeitsflächengröße -',
    pl: 'Rozmiar powierzchni roboczej -',
  },
  'l-char_page-5': {
    ua: '6000 × 2000мм',
    en: '6000 × 2000mm',
    de: '6000 × 2000mm',
    pl: '6000 × 2000mm',
  },
  'l-char_page-6': {
    ua: 'Максимальна товщина різу:',
    en: 'Maximum cutting thickness:',
    de: 'Maximale Schnittstärke:',
    pl: 'Maksymalna grubość cięcia:',
  },
  'l-char_page-7': {
    ua: 'Чорний метал:',
    en: 'Black metal:',
    de: 'Schwarzes Metall:',
    pl: 'Metal czarny:',
  },
  'l-char_page-8': {
    ua: ' 20 мм',
    en: ' 20 mm',
    de: ' 20 mm',
    pl: ' 20 mm',
  },
  'l-char_page-9': {
    ua: 'Нержавіюча сталь:',
    en: 'Stainless steel:',
    de: 'Edelstahl:',
    pl: 'Stal nierdzewna:',
  },
  'l-char_page-10': {
    ua: '10 мм',
    en: '10 mm',
    de: '10 mm',
    pl: '10 mm',
  },
  'l-char_page-11': {
    ua: 'Алюміній:',
    en: 'Aluminum:',
    de: 'Aluminium:',
    pl: 'Aluminium:',
  },
  'l-char_page-12': {
    ua: '6 мм',
    en: '6 mm',
    de: '6 mm',
    pl: '6 mm',
  },
  'l-char_page-13': {
    ua: 'Точність позиціонування',
    en: 'Positioning accuracy',
    de: 'Positioniergenauigkeit',
    pl: 'Dokładność pozycjonowania',
  },
  'l-char_page-14': {
    ua: 'Точність позиціонування нашого лазера –',
    en: 'The positioning accuracy of our laser is -',
    de: 'Die Positioniergenauigkeit unseres Lasers beträgt -',
    pl: 'Dokładność pozycjonowania naszego lasera wynosi -',
  },
  'l-char_page-15': {
    ua: '0,01 мм',
    en: '0.01 mm',
    de: '0,01 mm',
    pl: '0,01 mm',
  },
  'l-price_page-1': {
    ua: 'Ціна лазерної різки металу',
    en: 'Metal laser cutting price',
    de: 'Preis für Metall-Laserschneiden',
    pl: 'Cena cięcia metalu laserem',
  },
  'l-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості лазерного різання металу та терміни виконання послуги, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги лазерного різання визначається за такими основними критеріями як:',
    en: 'In order for us to make an accurate calculation of the cost of metal laser cutting and the timing of service execution, we need to receive from you full information about the product, detailed technical specifications or drawings. Prices for laser cutting services are determined by such basic criteria as:',
    de: 'Um eine genaue Kalkulation der Kosten für das Laserschneiden von Metall und die Termine für die Ausführung des Service vornehmen zu können, benötigen wir von Ihnen vollständige Informationen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Die Preise für Laserschneidedienste werden anhand solcher grundlegender Kriterien bestimmt wie:',
    pl: 'Abyśmy mogli dokładnie obliczyć koszt cięcia metalu laserem i czas realizacji usługi, musimy otrzymać od Państwa pełne informacje o produkcie, szczegółowe specyfikacje techniczne lub rysunki. Ceny usług cięcia laserowego są ustalane na podstawie takich podstawowych kryteriów jak:',
  },
  'l-price_page-3': {
    ua: 'Вид та марка металу який Вам потрібно порізати;',
    en: 'Type and brand of metal you need to cut;',
    de: 'Art und Marke des Metalls, das Sie schneiden müssen;',
    pl: 'Rodzaj i marka metalu, który trzeba ciąć;',
  },
  'l-price_page-4': {
    ua: 'Обсяг замовлення;',
    en: 'Order volume;',
    de: 'Auftragsvolumen;',
    pl: 'Wielkość zamówienia;',
  },
  'l-price_page-5': {
    ua: 'Складність робіт, залежно від деталі;',
    en: 'Complexity of work, depending on the detail;',
    de: 'Komplexität der Arbeit, abhängig vom Detail;',
    pl: 'Stopień trudności prac, zależnie od detalu;',
  },
  'l-price_page-6': {
    ua: 'Давальницька чи власна сировина буде використовуватись в замовленні;',
    en: 'Supplier or own raw materials will be used in the order;',
    de: 'Lieferant oder eigene Rohstoffe werden für die Bestellung verwendet;',
    pl: 'Będą używane surowce dostawcy lub własne w zamówieniu;',
  },
  'l-price_page-7': {
    ua: 'Строки виконання замовлення;',
    en: 'Order execution timeframes;',
    de: 'Auftragsausführungsfristen;',
    pl: 'Terminy realizacji zamówienia;',
  },

  //------------locksmith
  'ls-header-page-1': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
    pl: 'Prace ślusarskie',
  },
  'ls-header-page-2': {
    ua: 'Наша компанія надає послуги зі cлюсарних роботи на сучасному обладнанні, за вигідними цінами та у погоджені терміни!',
    en: 'Our company provides locksmith services on modern equipment, at favorable prices and within agreed terms!',
    de: 'Unser Unternehmen bietet Schlosserdienstleistungen an modernen Geräten, zu günstigen Preisen und innerhalb vereinbarter Fristen!',
    pl: 'Nasza firma świadczy usługi ślusarskie na nowoczesnym sprzęcie, w atrakcyjnych cenach i w uzgodnionych terminach!',
  },
  'ls-char-page-1': {
    ua: 'Основні види слюсарних робіт Armax MG',
    en: 'Main types of locksmith works at Armax MG',
    de: 'Haupttypen von Schlosserarbeiten bei Armax MG',
    pl: 'Główne rodzaje prac ślusarskich w Armax MG',
  },
  'ls-char-page-2': {
    ua: 'Зачищення швів після зварювання.',
    en: 'Cleaning weld seams.',
    de: 'Reinigung der Schweißnähte.',
    pl: 'Czyszczenie spoin po spawaniu.',
  },
  'ls-char-page-3': {
    ua: 'Свердління отворів.',
    en: 'Drilling holes.',
    de: 'Bohren von Löchern.',
    pl: 'Wiercenie otworów.',
  },
  'ls-char-page-4': {
    ua: 'Стрічко пиляльні роботи.',
    en: 'Band sawing work.',
    de: 'Bandsägearbeit.',
    pl: 'Prace piłowania taśmowego.',
  },
  'ls-price-page-1': {
    ua: 'Ціна зварювання металу',
    en: 'Metal welding price',
    de: 'Metallschweißpreis',
    pl: 'Cena spawania metalu',
  },
  'ls-price-page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості',
    en: 'In order for us to make an accurate calculation of the cost',
    de: 'Damit wir eine genaue Berechnung des Preises vornehmen können',
    pl: 'Abyśmy mogli dokładnie obliczyć koszt',
  },
  'ls-price-page-3': {
    ua: 'слюсарних робіт',
    en: 'locksmith works',
    de: 'Schlosserarbeiten',
    pl: 'prac ślusarskich',
  },
  'ls-price-page-4': {
    ua: 'та терміни виконання послуги, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги',
    en: 'and the timing of the service, we need to receive full information from you about the product, detailed technical specifications, or drawings. Prices for services',
    de: 'und die Ausführungsfristen des Dienstes benötigen wir von Ihnen vollständige Informationen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Preise für Dienstleistungen',
    pl: 'i terminy realizacji usługi, musimy otrzymać od Państwa pełne informacje o produkcie, szczegółowe specyfikacje techniczne lub rysunki. Ceny za usługi',
  },
  'ls-price-page-5': {
    ua: 'слюсарних робіт',
    en: 'locksmith works',
    de: 'Schlosserarbeiten',
    pl: 'prac ślusarskich',
  },
  'ls-price-page-6': {
    ua: 'Cкладності робіт;',
    en: 'Work complexity;',
    de: 'Arbeitskomplexität;',
    pl: 'Stopień trudności pracy;',
  },
  'ls-price-page-7': {
    ua: 'Виду металу;',
    en: 'Type of metal;',
    de: 'Metallart;',
    pl: 'Rodzaj metalu;',
  },
  'ls-price-page-8': {
    ua: 'Додаткових видів механічної обробки;',
    en: 'Additional types of mechanical processing;',
    de: 'Zusätzliche Arten mechanischer Bearbeitung;',
    pl: 'Dodatkowe rodzaje obróbki mechanicznej;',
  },
  'ls-price-page-9': {
    ua: 'Строки виконання замовлення;',
    en: 'Order execution timeframes;',
    de: 'Auftragsausführungsfristen;',
    pl: 'Terminy realizacji zamówienia;',
  },
  'ls-price-page-10': {
    ua: 'визначається за такими основними критеріями як:',
    en: 'is determined by such basic criteria as:',
    de: 'wird anhand solcher grundlegender Kriterien bestimmt wie:',
    pl: 'określa się na podstawie takich podstawowych kryteriów jak:',
  },

  's-header_pag-1': {
    ua: 'Наші послуги',
    en: 'Our services',
    de: 'Unsere Dienstleistungen',
    pl: 'Nasze usługi',
  },
  's-services_page-1': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
    pl: 'Prace spawalnicze',
  },
  's-services_page-2': {
    ua: 'Зварювання металу — це процес сплавлення двох металевих частин разом, із застосуванням тепла та тиску для утворення міцного зв`язку металу. Тепло генерується електричною дугою або полум`ям, а тиск прикладається за допомогою зварювального інструменту.',
    en: 'Metal welding is the process of melting two metal parts together, using heat and pressure to form a strong metal bond. Heat is generated by an electric arc or flame, and pressure is applied using a welding tool.',
    de: 'Metallschweißen ist der Prozess des Schmelzens zweier Metallteile zusammen unter Verwendung von Hitze und Druck zur Bildung einer starken Metallverbindung. Die Hitze wird durch einen Lichtbogen oder eine Flamme erzeugt, und der Druck wird mit einem Schweißwerkzeug ausgeübt.',
    pl: 'Spawanie metalu to proces łączenia dwóch części metalowych za pomocą ciepła i ciśnienia, aby stworzyć mocne połączenie metalowe. Ciepło generowane jest przez łuk elektryczny lub płomień, a ciśnienie jest stosowane przy użyciu narzędzia spawalniczego.',
  },
  's-services_page-3': {
    ua: 'Детальніше',
    en: 'Learn more',
    de: 'Erfahren Sie mehr',
    pl: 'Dowiedz się więcej',
  },
  's-services_page-4': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
    pl: 'Prace ślusarskie',
  },
  's-services_page-5': {
    ua: 'Слюсарні роботи — це процес обробки металів, який зазвичай доповнює інші види металообробки і доводить виріб до готового стану.',
    en: 'Locksmith works are the process of metal processing, which typically complements other types of metalworking and brings the product to a finished state.',
    de: 'Schlosserarbeiten sind der Prozess der Metallverarbeitung, der in der Regel andere Arten der Metallbearbeitung ergänzt und das Produkt in einen fertigen Zustand bringt.',
    pl: 'Prace ślusarskie to proces obróbki metali, który zazwyczaj uzupełnia inne rodzaje obróbki metali i doprowadza produkt do stanu gotowego.',
  },
  's-services_page-6': {
    ua: 'Детальніше',
    en: 'Learn more',
    de: 'Erfahren Sie mehr',
    pl: 'Dowiedz się więcej',
  },
  's-services_page-7': {
    ua: 'Розробка КД',
    en: 'Development of design documentation',
    de: 'Entwicklung von Konstruktionsdokumentation',
    pl: 'Opracowanie dokumentacji projektowej',
  },
  's-services_page-8': {
    ua: 'Розробка КД документації',
    en: 'Development of design documentation',
    de: 'Entwicklung von Konstruktionsdokumentation',
    pl: 'Opracowanie dokumentacji projektowej',
  },
  's-services_page-9': {
    ua: 'Детальніше',
    en: 'Learn more',
    de: 'Erfahren Sie mehr',
    pl: 'Dowiedz się więcej',
  },

  //-----------sheet bending
  'sd-header_page-1': {
    ua: 'Гнуття металу',
    en: 'Metal bending',
    de: 'Metallbiegung',
    pl: 'Gięcie metalu',
  },
  'sd-header_page-2': {
    ua: 'Наша компанія пропонує послуги зі згинання листового металу на сучасному обладнанні, за вигідними цінами та у узгоджені терміни!',
    en: 'Our company offers services for bending sheet metal on modern equipment, at favorable prices and within agreed terms!',
    de: 'Unser Unternehmen bietet Dienstleistungen für das Biegen von Blech auf modernen Anlagen zu günstigen Preisen und innerhalb vereinbarter Fristen an!',
    pl: 'Nasza firma oferuje usługi gięcia blachy na nowoczesnym sprzęcie, w atrakcyjnych cenach i w uzgodnionych terminach!',
  },
  'sd-char_page-1': {
    ua: 'Основні характеристики листозгину Armax MG',
    en: 'Main characteristics of the Armax MG sheet bender',
    de: 'Hauptmerkmale des Armax MG-Blechbiegers',
    pl: 'Główne cechy giętarki Armax MG',
  },
  'sd-char_page-2': {
    ua: 'Ermaxan power-bend pro (Турція)',
    en: 'Ermaxan power-bend pro (Turkey)',
    de: 'Ermaxan Power-Bend Pro (Türkei)',
    pl: 'Ermaxan Power-Bend Pro (Turcja)',
  },
  'sd-char_page-3': {
    ua: 'Максимальна довжина гнуття:',
    en: 'Maximum bending length:',
    de: 'Maximale Biegelänge:',
    pl: 'Maksymalna długość gięcia:',
  },
  'sd-char_page-4': {
    ua: 'становить',
    en: 'to become',
    de: 'werden',
    pl: 'wynosi',
  },
  'sd-char_page-5': {
    ua: '3000 мм.',
    en: '3000 mm.',
    de: '3000 mm.',
    pl: '3000 mm.',
  },
  'sd-char_page-6': {
    ua: 'Максимальна товщина заготовки:',
    en: 'Maximum blank thickness:',
    de: 'Maximale Blechdicke:',
    pl: 'Maksymalna grubość blachy:',
  },
  'sd-char_page-7': {
    ua: 'становить',
    en: 'to become',
    de: 'werden',
    pl: 'wynosi',
  },
  'sd-char_page-8': {
    ua: '6 мм.',
    en: '6 mm.',
    de: '6 mm.',
    pl: '6 mm.',
  },
  'sd-char_page-9': {
    ua: 'Точність згинання металу:',
    en: 'Metal bending accuracy:',
    de: 'Metallbiegen Genauigkeit:',
    pl: 'Dokładność gięcia metalu:',
  },
  'sd-char_page-10': {
    ua: 'становить до',
    en: 'up to',
    de: 'bis zu',
    pl: 'do',
  },
  'sd-char_page-11': {
    ua: '0.5 мм',
    en: '0.5 mm',
    de: '0,5 mm',
    pl: '0,5 mm',
  },
  'sd-char_page-12': {
    ua: 'Максимальне робоче зусилля',
    en: 'Maximum working force',
    de: 'Maximale Arbeitskraft',
    pl: 'Maksymalna siła robocza',
  },
  'sd-char_page-13': {
    ua: 'становить',
    en: 'to become',
    de: 'werden',
    pl: 'wynosi',
  },
  'sd-char_page-14': {
    ua: '90 тонн',
    en: '90 tons',
    de: '90 Tonnen',
    pl: '90 ton',
  },

  'sd-price_page-1': {
    ua: 'Ціна гнуття металу',
    en: 'Metal bending price',
    de: 'Preis für Metallbiegen',
    pl: 'Cena gięcia metalu',
  },
  'sd-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості послуг із',
    en: 'In order for us to make an accurate calculation of the cost of services for',
    de: 'Damit wir eine genaue Berechnung der Kosten für Dienstleistungen ausführen können, benötigen wir',
    pl: 'Abyśmy mogli dokładnie obliczyć koszt usług gięcia metalu, potrzebujemy',
  },
  'sd-price_page-3': {
    ua: 'гнуття металу',
    en: 'metal bending,',
    de: 'Metallbiegen,',
    pl: 'gięcie metalu,',
  },
  'sd-price_page-4': {
    ua: 'та терміни виконання замовлення, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги із гнуття металу визначається за такими основними критеріями як:',
    en: 'and the terms of order execution, we need to receive complete information from you about the product, detailed technical specifications, or drawings. Prices for metal bending services are determined by such main criteria as:',
    de: 'und die Bedingungen der Auftragsausführung benötigen wir vollständige Informationen von Ihnen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Die Preise für Metallbiegedienstleistungen werden anhand folgender Hauptkriterien bestimmt:',
    pl: 'i warunki realizacji zamówienia, potrzebujemy pełnych informacji na temat produktu, szczegółowych specyfikacji technicznych lub rysunków. Ceny usług gięcia metalu zależą od następujących głównych kryteriów:',
  },
  'sd-price_page-5': {
    ua: 'Довжину згину та товщину металу;',
    en: 'Length of bend and metal thickness;',
    de: 'Bieglänge und Metallstärke;',
    pl: 'Długość gięcia i grubość metalu;',
  },
  'sd-price_page-6': {
    ua: 'Обсяг замовлення;',
    en: 'Order volume;',
    de: 'Bestellvolumen;',
    pl: 'Objętość zamówienia;',
  },
  'sd-price_page-7': {
    ua: 'Складність робіт, залежно від деталі;',
    en: 'Complexity of work, depending on the detail;',
    de: 'Komplexität der Arbeit, abhängig von der Detailgenauigkeit;',
    pl: 'Złożoność pracy, w zależności od detali;',
  },
  'sd-price_page-8': {
    ua: 'Давальницька чи власна сировина буде використовуватись в замовленні;',
    en: 'Whether supplied or own raw material will be used in the order;',
    de: 'Ob geliefertes oder eigenes Rohmaterial für die Bestellung verwendet wird;',
    pl: 'Czy w zamówieniu zostanie wykorzystany dostarczony materiał, czy własny;',
  },
  'sd-price_page-9': {
    ua: 'Строки виконання замовлення;',
    en: 'Order execution terms;',
    de: 'Ausführungsfristen für Bestellungen;',
    pl: 'Terminy realizacji zamówienia;',
  },

  //------mechanical-processing
  'mp-header_page-1': {
    ua: 'Механічна обробка',
    en: 'Mechanical processing',
    de: 'Mechanische Bearbeitung',
    pl: 'Obróbka mechaniczna',
  },
  'mp-header_page-2': {
    ua: 'Механічна обробка – це послуги токарної, фрезерної та шліфувальної обробки металів з використанням сучасного обладнання ЧПК. Компанія забезпечує високу точність і продуктивність для серійного та індивідуального виробництва деталей.',
    en: 'Mechanical processing is the service of turning, milling, and grinding metal with the use of modern CNC equipment. The company ensures high precision and productivity for both serial and custom part production.',
    de: 'Mechanische Bearbeitung umfasst Dreh-, Fräs- und Schleifdienste für Metalle unter Verwendung moderner CNC-Ausrüstung. Das Unternehmen gewährleistet hohe Präzision und Produktivität für die Serien- und Einzelteilproduktion.',
    pl: 'Obróbka mechaniczna to usługi toczenia, frezowania i szlifowania metali przy użyciu nowoczesnego sprzętu CNC. Firma zapewnia wysoką precyzję i wydajność zarówno dla produkcji seryjnej, jak i na zamówienie.',
  },
  'mp-char_page-1': {
    ua: 'Послуги по механічній обробці металу',
    en: 'Metal machining services',
    de: 'Dienstleistungen zur mechanischen Metallbearbeitung',
    pl: 'Usługi obróbki metali',
  },
  'mp-char_page-4': {
    ua: 'Компанія «АрмаксМГ» надає послуги з механічної обробки металів, зокрема виробництва деталей за індивідуальними проектами. Ми виконуємо замовлення будь-якої складності та обсягу, використовуючи різноманітні метали.',
    en: 'The company "ArmaxMG" provides metal machining services, including the production of parts based on custom projects. We handle orders of any complexity and volume, using various metals.',
    de: 'Die Firma „ArmaxMG“ bietet Dienstleistungen zur mechanischen Bearbeitung von Metallen an, einschließlich der Herstellung von Teilen nach individuellen Projekten. Wir bearbeiten Aufträge jeder Komplexität und jedes Umfangs unter Verwendung verschiedener Metalle.',
    pl: 'Firma „ArmaxMG” oferuje usługi obróbki metali, w tym produkcję części na podstawie projektów indywidualnych. Realizujemy zamówienia o dowolnej złożoności i wielkości, wykorzystując różne metale.',
  },
  'mp-char_page-13': {
    ua: 'Переваги обробки металу в «АрмаксМГ»:',
    en: 'Advantages of metal machining at "ArmaxMG":',
    de: 'Vorteile der Metallbearbeitung bei „ArmaxMG“:',
    pl: 'Zalety obróbki metali w „ArmaxMG”:',
  },
  'mp-char_page-14': {
    ua: 'Сучасне обладнання ЧПК:',
    en: 'Modern CNC equipment:',
    de: 'Moderne CNC-Ausrüstung:',
    pl: 'Nowoczesny sprzęt CNC:',
  },
  'mp-char_page-14-1': {
    ua: 'Наше високоточне обладнання дозволяє виготовляти деталі відповідно до затверджених креслень, забезпечуючи відмінну якість завдяки використанню інноваційних технологій.',
    en: 'Our high-precision equipment allows the production of parts according to approved drawings, ensuring excellent quality through the use of innovative technologies.',
    de: 'Unsere hochpräzisen Maschinen ermöglichen die Herstellung von Teilen nach genehmigten Zeichnungen und gewährleisten dank innovativer Technologien eine hervorragende Qualität.',
    pl: 'Nasz precyzyjny sprzęt umożliwia produkcję części zgodnie z zatwierdzonymi rysunkami, zapewniając doskonałą jakość dzięki wykorzystaniu innowacyjnych technologii.',
  },
  'mp-char_page-15': {
    ua: 'Автоматизація процесів:',
    en: 'Process automation:',
    de: 'Prozessautomatisierung:',
    pl: 'Automatyzacja procesów:',
  },
  'mp-char_page-15-1': {
    ua: 'Щоб уникнути неточностей і браку, більшість операцій виконується автоматизовано під наглядом досвідчених фахівців.',
    en: 'To avoid inaccuracies and defects, most operations are automated under the supervision of experienced specialists.',
    de: 'Um Ungenauigkeiten und Mängel zu vermeiden, werden die meisten Prozesse automatisiert unter der Aufsicht erfahrener Fachleute durchgeführt.',
    pl: 'Aby uniknąć niedokładności i wad, większość operacji jest automatyzowana pod nadzorem doświadczonych specjalistów.',
  },
  'mp-char_page-16': {
    ua: 'Професійні майстри:',
    en: 'Professional craftsmen:',
    de: 'Professionelle Fachkräfte:',
    pl: 'Profesjonalni rzemieślnicy:',
  },
  'mp-char_page-16-1': {
    ua: 'Наші експерти мають багаторічний досвід у сфері металообробки, що гарантує високу якість виконаних робіт.',
    en: 'Our experts have many years of experience in metalworking, which guarantees the high quality of the work performed.',
    de: 'Unsere Experten haben langjährige Erfahrung in der Metallbearbeitung, was die hohe Qualität der ausgeführten Arbeiten gewährleistet.',
    pl: 'Nasi eksperci mają wieloletnie doświadczenie w obróbce metali, co gwarantuje wysoką jakość wykonanej pracy.',
  },
  'mp-char_page-17': {
    ua: 'Доступні ціни:',
    en: 'Affordable prices:',
    de: 'Erschwingliche Preise:',
    pl: 'Przystępne ceny:',
  },
  'mp-char_page-17-1': {
    ua: 'Ми пропонуємо конкурентну вартість послуг, що дозволяє нашим клієнтам не переплачувати.',
    en: 'We offer competitive service prices, allowing our clients to avoid overpaying.',
    de: 'Wir bieten wettbewerbsfähige Preise für unsere Dienstleistungen, sodass unsere Kunden nicht zu viel bezahlen müssen.',
    pl: 'Oferujemy konkurencyjne ceny usług, dzięki czemu nasi klienci nie muszą przepłacać.',
  },
  'mp-price_page-1': {
    ua: 'Механічна обробка металу',
    en: 'Metal machining',
    de: 'Mechanische Metallbearbeitung',
    pl: 'Obróbka metali',
  },
  'mp-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості механічної обробки металу та терміни виконання послуги, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на механічну обробку визначаються за такими основними критеріями як:',
    en: 'To provide an accurate cost estimate for metal machining and service completion time, we need complete information about the product, a detailed technical specification, or a drawing from you. The price of machining is determined by the following key criteria:',
    de: 'Um eine genaue Kostenschätzung für die mechanische Metallbearbeitung und die Ausführungszeiten zu erstellen, benötigen wir von Ihnen vollständige Informationen über das Produkt, eine detaillierte technische Spezifikation oder eine Zeichnung. Die Preise für die mechanische Bearbeitung werden nach folgenden Hauptkriterien bestimmt:',
    pl: 'Abyśmy mogli dokładnie oszacować koszt obróbki metali oraz czas realizacji usługi, potrzebujemy pełnych informacji o produkcie, szczegółowej specyfikacji technicznej lub rysunków. Cena obróbki metali zależy od następujących kryteriów:',
  },
  'mp-price_page-3': {
    ua: 'Механічна обробка металу',
    en: 'Metal machining',
    de: 'Mechanische Metallbearbeitung',
    pl: 'Obróbka metali',
  },
  'mp-price_page-4': {
    ua: 'Вид та марка металу, який Вам потрібно обробити;',
    en: 'The type and grade of metal that needs to be machined;',
    de: 'Die Art und Sorte des Metalls, das bearbeitet werden muss;',
    pl: 'Rodzaj i gatunek metalu, który należy obrabiać;',
  },
  'mp-services_page-1': {
    ua: 'Детальніше',
    en: 'Learn more',
    de: 'Erfahren Sie mehr',
    pl: 'Dowiedz się więcej',
  },

  'mp-services_page-6': {},

  //--------welding
  'w-header_page-1': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
    pl: 'Prace spawalnicze',
  },
  'w-header_page-2': {
    ua: 'Наша компанія надає послуги зі зварювання металу на сучасному обладнанні, за вигідними цінами та у погоджені терміни!',
    en: 'Our company provides metal welding services on modern equipment, at favorable prices, and within agreed terms!',
    de: 'Unser Unternehmen bietet Metallschweißdienstleistungen auf modernen Geräten zu günstigen Preisen und innerhalb vereinbarter Fristen!',
    pl: 'Nasza firma świadczy usługi spawania metali na nowoczesnym sprzęcie, w korzystnych cenach i w uzgodnionych terminach!',
  },
  'w-char_page-1': {
    ua: 'Основні характеристики зварювання металу Armax MG',
    en: 'Main characteristics of metal welding Armax MG',
    de: 'Hauptmerkmale des Metallschweißens Armax MG',
    pl: 'Główne cechy spawania metali Armax MG',
  },
  'w-char_page-2': {
    ua: 'Види зварювання металу:',
    en: 'Types of metal welding:',
    de: 'Arten des Metallschweißens:',
    pl: 'Rodzaje spawania metali:',
  },
  'w-char_page-3': {
    ua: 'Зварювання напівавтоматом;',
    en: 'Semi-automatic welding;',
    de: 'Halbautomatisches Schweißen;',
    pl: 'Spawanie półautomatyczne;',
  },
  'w-char_page-4': {
    ua: 'Аргонове зварювання;',
    en: 'Argon welding;',
    de: 'Argon-Schweißen;',
    pl: 'Spawanie argonowe;',
  },
  'w-char_page-5': {
    ua: 'Ручне дугове зварювання;',
    en: 'Manual arc welding;',
    de: 'Manuelles Lichtbogenschweißen;',
    pl: 'Ręczne spawanie łukowe;',
  },
  'w-char_page-6': {
    ua: 'Максимальна товщина зварювання:',
    en: 'Maximum welding thickness:',
    de: 'Maximale Schweißdicke:',
    pl: 'Maksymalna grubość spawania:',
  },
  'w-char_page-7': {
    ua: 'становить ',
    en: 'is ',
    de: 'ist ',
    pl: 'wynosi ',
  },
  'w-char_page-8': {
    ua: 'від 1 до 40 мм',
    en: 'from 1 to 40 mm',
    de: 'von 1 bis 40 mm',
    pl: 'od 1 do 40 mm',
  },
  'w-price_page-1': {
    ua: 'Ціна зварювання металу',
    en: 'Metal welding price',
    de: 'Preis für Metallschweißen',
    pl: 'Cena spawania metali',
  },
  'w-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості',
    en: 'In order for us to make an accurate calculation of the cost',
    de: 'Damit wir eine genaue Berechnung der Kosten durchführen können',
    pl: 'Abyśmy mogli dokładnie obliczyć koszt',
  },
  'w-price_page-3': {
    ua: 'зварювання металу',
    en: 'of metal welding',
    de: 'des Metallschweißens',
    pl: 'spawania metali',
  },
  'w-price_page-4': {
    ua: 'та терміни виконання послуги, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги лазерного різання визначається за такими основними критеріями як:',
    en: 'and the terms of service execution, we need to receive full information from you about the product, detailed technical specifications, or drawings. Prices for laser cutting services are determined by such main criteria as:',
    de: 'und die Bedingungen für die Ausführung der Dienstleistung benötigen wir von Ihnen vollständige Informationen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Die Preise für Laserbearbeitungsdienstleistungen werden anhand folgender Hauptkriterien bestimmt:',
    pl: 'i warunki wykonania usługi, musimy otrzymać pełne informacje od Państwa o produkcie, szczegółową specyfikację techniczną lub rysunki. Ceny usług cięcia laserowego są określane na podstawie następujących głównych kryteriów:',
  },
  'w-price_page-5': {
    ua: 'Cкладності робіт;',
    en: 'Complexity of work;',
    de: 'Arbeitskomplexität;',
    pl: 'Złożoność prac;',
  },
  'w-price_page-6': {
    ua: 'Товщини матеріалу;',
    en: 'Material thickness;',
    de: 'Materialstärke;',
    pl: 'Grubość materiału;',
  },
  'w-price_page-7': {
    ua: 'Виду зварювання;',
    en: 'Type of welding;',
    de: 'Art des Schweißens;',
    pl: 'Rodzaj spawania;',
  },
  'w-price_page-8': {
    ua: 'Додаткових видів механічної обробки;',
    en: 'Additional types of mechanical processing;',
    de: 'Zusätzliche Arten der mechanischen Bearbeitung;',
    pl: 'Dodatkowe rodzaje obróbki mechanicznej;',
  },
  'w-price_page-9': {
    ua: 'Строки виконання замовлення;',
    en: 'Order execution terms;',
    de: 'Ausführungsfristen für Bestellungen;',
    pl: 'Terminy realizacji zamówienia;',
  },

  'news-1': {
    ua: 'Останні новини',
    en: 'Latest news',
    de: 'Neueste Nachrichten',
    pl: 'Najnowsze wiadomości',
  },
  'news-2': {
    ua: 'Відкриття механічного цеху «АРМАКС МГ»!',
    en: 'Opening of the mechanical workshop "ARMAX MG"!',
    de: 'Eröffnung der mechanischen Werkstatt "ARMAX MG"!',
    pl: 'Otwarcie warsztatu mechanicznego "ARMAX MG"!',
  },
  'news-3': {
    ua: 'Ми раді оголосити про урочисте відкриття нового механічного цеху в м. Луцьк, що стане важливою віхою в розвитку нашого підприємства. Цей сучасний цех обладнано передовими верстатами для токарних, фрезерувальних, шліфувальних та гартувальних робіт, що забезпечить високий рівень точності та якості обробки деталей. Токарні верстати дозволять виготовляти деталі з неперевершеною точністю, фрезерні забезпечать складне оброблення з урахуванням найвищих стандартів, шліфувальні верстати нададуть ідеальну обробку поверхонь, а гартувальні установки підвищать міцність і довговічність матеріалів. Відкриття цього цеху дозволить нам значно розширити наші можливості, покращити ефективність виконання замовлень та задовольнити потреби наших клієнтів на новому рівні.',
    en: 'We are pleased to announce the grand opening of a new mechanical workshop in Lutsk, which will mark an important milestone in the development of our company. This modern workshop is equipped with advanced machines for turning, milling, grinding, and hardening operations, ensuring a high level of precision and quality in part processing. Turning machines will allow for the production of parts with unparalleled accuracy, milling machines will provide complex processing according to the highest standards, grinding machines will deliver perfect surface finishes, and hardening installations will enhance the strength and durability of materials. The opening of this workshop will significantly expand our capabilities, improve the efficiency of order fulfillment, and meet our customers` needs at a new level.',
    de: 'Wir freuen uns, die feierliche Eröffnung einer neuen mechanischen Werkstatt in Lutsk bekannt zu geben, die einen wichtigen Meilenstein in der Entwicklung unseres Unternehmens darstellt. Diese moderne Werkstatt ist mit fortschrittlichen Maschinen für Dreh-, Fräs-, Schleif- und Härtearbeiten ausgestattet, die ein hohes Maß an Präzision und Qualität bei der Bearbeitung von Teilen gewährleisten. Drehmaschinen ermöglichen die Herstellung von Teilen mit unvergleichlicher Genauigkeit, Fräsmaschinen bieten komplexe Bearbeitung nach höchsten Standards, Schleifmaschinen sorgen für perfekte Oberflächenbearbeitung, und Härteeinrichtungen verbessern die Festigkeit und Haltbarkeit der Materialien. Die Eröffnung dieser Werkstatt wird unsere Möglichkeiten erheblich erweitern, die Effizienz bei der Auftragsabwicklung verbessern und die Bedürfnisse unserer Kunden auf einem neuen Niveau erfüllen.',
    pl: 'Z radością ogłaszamy uroczyste otwarcie nowego warsztatu mechanicznego w Łucku, który będzie ważnym kamieniem milowym w rozwoju naszej firmy. Ten nowoczesny warsztat jest wyposażony w zaawansowane maszyny do obróbki skrawaniem, frezowania, szlifowania i hartowania, zapewniając wysoki poziom precyzji i jakości obróbki części. Tokarki pozwolą na produkcję części o niezrównanej dokładności, frezarki zapewnią kompleksową obróbkę zgodnie z najwyższymi standardami, szlifierki zapewnią idealne wykończenie powierzchni, a urządzenia hartujące poprawią wytrzymałość i trwałość materiałów. Otwarcie tego warsztatu znacznie rozszerzy nasze możliwości, poprawi efektywność realizacji zamówień i spełni potrzeby naszych klientów na nowym poziomie.',
  },
  'news-4': {
    ua: 'Запрошуємо до співпраці зварювальника!',
    en: 'We invite a welder to cooperation!',
    de: 'Wir laden einen Schweißer zur Zusammenarbeit ein!',
    pl: 'Zapraszamy do współpracy spawacza!',
  },
  'news-5': {
    ua: 'Шукаємо кваліфікованого зварювальника-напівавтоматника. Основні обов’язки включатимуть зварювання металевих виробів.',
    en: 'We are looking for a qualified semi-automatic welder. The main responsibilities will include welding metal products.',
    de: 'Wir suchen einen qualifizierten halbautomatischen Schweißer. Zu den Hauptaufgaben gehören das Schweißen von Metallprodukten.',
    pl: 'Szukamy wykwalifikowanego spawacza półautomatycznego. Główne obowiązki będą obejmować spawanie wyrobów metalowych.',
  },
  'breadcrumbs-1': {
    ua: 'Продукти',
    en: 'Products',
    de: 'Produkte',
    pl: 'Produkty',
  },
  'breadcrumbs-2': {
    ua: 'СГ обладнання',
    en: 'AG equipment',
    de: 'Landwirtschaftliche Ausrüstung',
    pl: 'Sprzęt rolniczy',
  },
  'breadcrumbs-3': {
    ua: 'Фронтальні навантажувачі',
    en: 'Front loaders',
    de: 'Frontlader',
    pl: 'Ładowacze czołowe',
  },
  'breadcrumbs-3-1': {
    ua: 'Фронтальні навантажувачі',
    en: 'Front loaders',
    de: 'Frontlader',
    pl: 'Ładowacze czołowe',
  },
  'breadcrumbs-3-2': {
    ua: 'Для фронтальних навантажувачів',
    en: 'For front loaders',
    de: 'Für Frontlader',
    pl: 'Do ładowaczy czołowych',
  },
  'breadcrumbs-3-3': {
    ua: 'Для екскаваторів',
    en: 'For excavators',
    de: 'Für Bagger',
    pl: 'Do koparek',
  },
  'breadcrumbs-3-4': {
    ua: 'Для екскаваторів',
    en: 'For excavators',
    de: 'Für Bagger',
    pl: 'Do koparek',
  },
  'breadcrumbs-4': {
    ua: 'Гак для біг бегів',
    en: 'Big bag hook',
    de: 'Big Bag Haken',
    pl: 'Hak do worków Big Bag',
  },
  'breadcrumbs-4-1': {
    ua: 'Гак для біг бегів',
    en: 'Big bag hook',
    de: 'Big Bag Haken',
    pl: 'Hak do worków Big Bag',
  },
  'breadcrumbs-4-2': {
    ua: 'Вила для тюків',
    en: 'Bale forks',
    de: 'Ballengabel',
    pl: 'Widełki do beli',
  },
  'breadcrumbs-4-21': {
    ua: 'Вила для тюків',
    en: 'Bale forks',
    de: 'Ballengabel',
    pl: 'Widełki do beli',
  },
  'breadcrumbs-4-3': {
    ua: 'Ківш наповнювач Біг Бегів',
    en: 'Big Bag filler bucket',
    de: 'Big Bag Füllschaufel',
    pl: 'Łyżka napełniająca Big Bag',
  },
  'breadcrumbs-4-31': {
    ua: 'Ківш наповнювач Біг Бегів',
    en: 'Big Bag filler bucket',
    de: 'Big Bag Füllschaufel',
    pl: 'Łyżka napełniająca Big Bag',
  },
  'breadcrumbs-4-4': {
    ua: 'Ківш 2400',
    en: 'Bucket 2400',
    de: 'Schaufel 2400',
    pl: 'Łyżka 2400',
  },
  'breadcrumbs-4-41': {
    ua: 'Ківш 2400',
    en: 'Bucket 2400',
    de: 'Schaufel 2400',
    pl: 'Łyżka 2400',
  },
  'breadcrumbs-4-5': {
    ua: 'Ківш змішувач',
    en: 'Mixer bucket',
    de: 'Mischschaufel',
    pl: 'Łyżka mieszająca',
  },
  'breadcrumbs-4-51': {
    ua: 'Ківш змішувач',
    en: 'Mixer bucket',
    de: 'Mischschaufel',
    pl: 'Łyżka mieszająca',
  },
  'breadcrumbs-4-6': {
    ua: 'Відвал JCB',
    en: 'JCB blade',
    de: 'JCB-Schaufel',
    pl: 'Łyżka JCB',
  },
  'breadcrumbs-4-61': {
    ua: 'Відвал JCB',
    en: 'JCB blade',
    de: 'JCB-Schaufel',
    pl: 'Łyżka JCB',
  },
  'breadcrumbs-4-7': {
    ua: 'Вила для силосу',
    en: 'Silage forks',
    de: 'Silagegabeln',
    pl: 'Widełki do siana',
  },
  'breadcrumbs-4-71': {
    ua: 'Вила для силосу',
    en: 'Silage forks',
    de: 'Silagegabeln',
    pl: 'Widełki do siana',
  },
  'breadcrumbs-4-8': {
    ua: 'Ківш 1м³',
    en: 'Bucket 1m³',
    de: 'Schaufel 1m³',
    pl: 'Łyżka 1m³',
  },
  'breadcrumbs-4-81': {
    ua: 'Ківш 1м³',
    en: 'Bucket 1m³',
    de: 'Schaufel 1m³',
    pl: 'Łyżka 1m³',
  },
  'breadcrumbs-4-9': {
    ua: 'Ківш 2м³',
    en: 'Bucket 2m³',
    de: 'Schaufel 2m³',
    pl: 'Łyżka 2m³',
  },
  'breadcrumbs-4-91': {
    ua: 'Ківш 2м³',
    en: 'Bucket 2m³',
    de: 'Schaufel 2m³',
    pl: 'Łyżka 2m³',
  },

  'breadcrumbs-4-10': {
    ua: 'Ківш навантажувач 4м³',
    en: 'Bucket for loader 4m³',
    de: 'Schaufel für-Lader 4m³',
    pl: 'Łyżka do ładowarki 4m³',
  },
  'breadcrumbs-4-11': {
    ua: 'Ківш навантажувач 4м³',
    en: 'Bucket for loader 4m³',
    de: 'Schaufel für-Lader 4m³',
    pl: 'Łyżka do ładowarki 4m³',
  },
  'breadcrumbs-exc-5-1': {
    ua: 'Ківш ескаваторний Kubata CX',
    en: 'Kubata CX excavator bucket',
    de: 'Kubata CX Baggerlöffel',
    pl: 'Łyżka koparki Kubata CX',
  },
  'breadcrumbs-exc-5-11': {
    ua: 'Ківш ескаваторний Kubata CX',
    en: 'Kubata CX excavator bucket',
    de: 'Kubata CX Baggerlöffel',
    pl: 'Łyżka koparki Kubata CX',
  },
  'breadcrumbs-exc-5-2': {
    ua: 'Ківш екскаваторний 400 мм',
    en: '400 mm excavator bucket',
    de: '400 mm Baggerlöffel',
    pl: 'Łyżka koparki 400 mm',
  },
  'breadcrumbs-exc-5-21': {
    ua: 'Ківш екскаваторний 400 мм',
    en: '400 mm excavator bucket',
    de: '400 mm Baggerlöffel',
    pl: 'Łyżka koparki 400 mm',
  },
  'breadcrumbs-exc-5-3': {
    ua: 'Ківш планувальний екскаваторний',
    en: 'Grading excavator bucket',
    de: 'Planierlöffel für Bagger',
    pl: 'Łyżka do planowania koparki',
  },
  'breadcrumbs-exc-5-31': {
    ua: 'Ківш планувальний екскаваторний',
    en: 'Grading excavator bucket',
    de: 'Planierlöffel für Bagger',
    pl: 'Łyżka do planowania koparki',
  },
  article: {
    ua: 'Артикул:',
    en: 'Article:',
    de: 'Artikel:',
    pl: 'Artykuł:',
  },
  'article-1': {
    ua: '1',
    en: '1',
    de: '1',
    pl: '1',
  },
  'article-2': {
    ua: '2',
    en: '2',
    de: '2',
    pl: '2',
  },
  'article-3': {
    ua: '3',
    en: '3',
    de: '3',
    pl: '3',
  },
  'article-4': {
    ua: '4',
    en: '4',
    de: '4',
    pl: '4',
  },
  'article-5': {
    ua: '5',
    en: '5',
    de: '5',
    pl: '5',
  },
  'article-6': {
    ua: '6',
    en: '6',
    de: '6',
    pl: '6',
  },
  'article-7': {
    ua: '7',
    en: '7',
    de: '7',
    pl: '7',
  },
  'article-8': {
    ua: '8',
    en: '8',
    de: '8',
    pl: '8',
  },
  'article-9': {
    ua: '9',
    en: '9',
    de: '9',
    pl: '9',
  },
  'article-10': {
    ua: '10',
    en: '10',
    de: '10',
    pl: '10',
  },
  'article-exc-2-1': {
    ua: 'exc',
    en: 'exc',
    de: 'exc',
    pl: 'exc',
  },
  'article-exc-2-2': {
    ua: 'exc2',
    en: 'exc2',
    de: 'exc2',
    pl: 'exc2',
  },
  'article-exc-2-3': {
    ua: 'exc3',
    en: 'exc3',
    de: 'exc3',
    pl: 'exc3',
  },
  'card-text-1': {
    ua: 'Є в наявності',
    en: 'In stock',
    de: 'Auf Lager',
    pl: 'Dostępne',
  },
  'card-text-2': {
    ua: 'Основні характеристики:',
    en: 'Key features:',
    de: 'Haupteigenschaften:',
    pl: 'Główne cechy:',
  },
  'card-text-3': {
    ua: 'Ширина:',
    en: 'Width:',
    de: 'Breite:',
    pl: 'Szerokość:',
  },
  'card-text-4': {
    ua: 'Висота:',
    en: 'Height:',
    de: 'Höhe:',
    pl: 'Wysokość:',
  },

  'card-text-5': {
    ua: 'Глибина:',
    en: 'Depth:',
    de: 'Tiefe:',
    pl: 'Głębokość:',
  },
  'card-text-6': {
    ua: 'Вага:',
    en: 'Weight:',
    de: 'Gewicht:',
    pl: 'Waga:',
  },
  'card-text-7': {
    ua: '176 кг',
    en: '176 kg',
    de: '176 kg',
    pl: '176 kg',
  },
  'card-text-7-1': {
    ua: '96 кг',
    en: '96 kg',
    de: '96 kg',
    pl: '96 kg',
  },
  'card-text-7-2': {
    ua: '776 кг',
    en: '776 kg',
    de: '776 kg',
    pl: '776 kg',
  },
  'card-text-7-3': {
    ua: '510 кг',
    en: '510 kg',
    de: '510 kg',
    pl: '510 kg',
  },
  'card-text-7-4': {
    ua: '192 кг',
    en: '192 kg',
    de: '192 kg',
    pl: '192 kg',
  },
  'card-text-7-5': {
    ua: '580 кг',
    en: '580 kg',
    de: '580 kg',
    pl: '580 kg',
  },
  'card-text-7-6': {
    ua: '782 кг',
    en: '782 kg',
    de: '782 kg',
    pl: '782 kg',
  },
  'card-text-7-7': {
    ua: '386 кг',
    en: '386 kg',
    de: '386 kg',
    pl: '386 kg',
  },
  'card-text-7-8': {
    ua: '380 кг',
    en: '380 kg',
    de: '380 kg',
    pl: '380 kg',
  },
  'card-text-7-9': {
    ua: '1150 кг',
    en: '1150 kg',
    de: '1150 kg',
    pl: '1150 kg',
  },
  'card-text-exc-7': {
    ua: '42 кг',
    en: '42 kg',
    de: '42 kg',
    pl: '42 kg',
  },
  'card-text-exc-7-2': {
    ua: '37 кг',
    en: '37 kg',
    de: '37 kg',
    pl: '37 kg',
  },
  'card-text-exc-7-3': {
    ua: '180 кг',
    en: '180 kg',
    de: '180 kg',
    pl: '180 kg',
  },
  'card-text-8': {
    ua: 'Основна сталь:',
    en: 'Main steel:',
    de: 'Grundstahl:',
    pl: 'Główna stal:',
  },
  'card-text-9': {
    ua: 'Кріплення:',
    en: 'Mounting:',
    de: 'Befestigung:',
    pl: 'Montaż:',
  },
  'card-text-10': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-1': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-2': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-3': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-4': {
    ua: 'Ціну уточнюйте ',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-5': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-6': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-7': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-8': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-text-10-9': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-price-exc-1': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-price-exc-2': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'card-price-exc-3': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },

  'card-text-11': {
    ua: 'Замовити',
    en: 'Order',
    de: 'Bestellen',
    pl: 'Zamówić',
  },
  'card-text-13': {
    ua: 'Захват для біг-бегів — це спеціалізоване навісне обладнання, яке призначене для навантажувачів JCB, Manitou та Bobcat. Воно ефективно переміщує, завантажує та розвантажує біг-беги і контейнери, забезпечуючи транспортування добрив, зерна та інших упакованих товарів без втрат і пошкоджень. Це обладнання також дозволяє піднімати і підвішувати мішки над сівалками та змішувачами, що значно полегшує завантаження посівного матеріалу.',
    en: 'The big bag hook is specialized attachment equipment designed for JCB, Manitou, and Bobcat loaders. It efficiently moves, loads, and unloads big bags and containers, ensuring the transport of fertilizers, grain, and other packaged goods without loss or damage. This equipment also allows bags to be lifted and suspended over seeders and mixers, significantly easing the loading of planting material.',
    de: 'Der Big Bag Haken ist ein spezialisiertes Anbaugerät für JCB-, Manitou- und Bobcat-Lader. Er bewegt, lädt und entlädt Big Bags und Container effizient und sorgt für den Transport von Düngemitteln, Getreide und anderen verpackten Gütern ohne Verluste oder Schäden. Dieses Gerät ermöglicht auch das Heben und Aufhängen von Säcken über Sämaschinen und Mischern, was das Laden von Saatgut erheblich erleichtert.',
    pl: 'Hak do dużych worków to specjalistyczny osprzęt przeznaczony do ładowarek JCB, Manitou i Bobcat. Skutecznie przenosi, ładuje i rozładowuje duże worki i kontenery, zapewniając transport nawozów, ziarna i innych zapakowanych towarów bez strat i uszkodzeń. Ten sprzęt umożliwia również podnoszenie i zawieszanie worków nad siewnikami i mieszalnikami, co znacznie ułatwia załadunek materiału siewnego.',
  },
  'card-text-13-1': {
    ua: 'Вила для тюків призначені для роботи з тюками сіна, соломи або іншими сільськогосподарськими матеріалами, які упаковані в компактні форми. Вони використовуються для підйому, переміщення та укладання цих тюків.',
    en: 'Bale forks are designed for handling bales of hay, straw, or other agricultural materials packed into compact forms. They are used for lifting, moving, and stacking these bales.',
    de: 'Ballengabeln sind für den Umgang mit Ballen aus Heu, Stroh oder anderen landwirtschaftlichen Materialien ausgelegt, die in kompakte Formen verpackt sind. Sie werden zum Heben, Bewegen und Stapeln dieser Ballen verwendet.',
    pl: 'Widły do bel są zaprojektowane do obsługi bel siana, słomy lub innych materiałów rolniczych zapakowanych w zwarte formy. Służą do podnoszenia, przemieszczania i układania tych bel.',
  },
  'card-text-13-2': {
    ua: 'Вила для тюків призначені для роботи з тюками сіна, соломи або іншими сільськогосподарськими матеріалами, які упаковані в компактні форми. Вони використовуються для підйому, переміщення та укладання цих тюків.',
    en: 'Bale forks are designed for handling bales of hay, straw, or other agricultural materials packed into compact forms. They are used for lifting, moving, and stacking these bales.',
    de: 'Ballengabeln sind für den Umgang mit Ballen aus Heu, Stroh oder anderen landwirtschaftlichen Materialien ausgelegt, die in kompakte Formen verpackt sind. Sie werden zum Heben, Bewegen und Stapeln dieser Ballen verwendet.',
    pl: 'Widły do bel są zaprojektowane do obsługi bel siana, słomy lub innych materiałów rolniczych zapakowanych w zwarte formy. Służą do podnoszenia, przemieszczania i układania tych bel.',
  },
  'card-text-13-3': {
    ua: 'Ківш 2400 зерновий - це сільськогосподарське обладнання, призначене для роботи з зерновими культурами. Він зазвичай використовується для завантаження, переміщення та розвантаження зерна.',
    en: 'The 2400 grain bucket is agricultural equipment designed for handling grain crops. It is typically used for loading, moving, and unloading grain.',
    de: 'Die 2400 Körnerschaufel ist ein landwirtschaftliches Gerät, das für den Umgang mit Getreidekulturen ausgelegt ist. Es wird normalerweise zum Laden, Bewegen und Entladen von Getreide verwendet.',
    pl: 'Kubeł 2400 do ziarna to sprzęt rolniczy przeznaczony do obsługi upraw zbożowych. Zwykle służy do załadunku, przemieszczania i rozładunku ziarna.',
  },
  'card-text-13-4': {
    ua: 'Ківш змішувач - це спеціалізоване обладнання, призначене для змішування різних компонентів, таких як корми для тварин або будівельні матеріали. Він виготовлений з міцної сталі і оснащений лопатями або шнеками, які забезпечують ефективне і рівномірне змішування вмісту.',
    en: 'The mixer bucket is specialized equipment designed for mixing various components, such as animal feed or construction materials. It is made of durable steel and equipped with paddles or augers to ensure effective and even mixing of the contents.',
    de: 'Die Mischschaufel ist ein spezialisiertes Gerät zum Mischen verschiedener Komponenten wie Tierfutter oder Baumaterialien. Sie besteht aus strapazierfähigem Stahl und ist mit Schaufeln oder Schnecken ausgestattet, die ein effektives und gleichmäßiges Mischen des Inhalts gewährleisten.',
    pl: 'Kubeł mieszalnikowy to specjalistyczny sprzęt przeznaczony do mieszania różnych składników, takich jak pasze dla zwierząt czy materiały budowlane. Wykonany z trwałej stali i wyposażony w łopatki lub ślimaki, zapewnia skuteczne i równomierne mieszanie zawartości.',
  },
  'card-text-13-5': {
    ua: 'Відвал для очистки доріг від снігу - це спеціалізоване обладнання, яке встановлюється на трактори або інші транспортні засоби для ефективного видалення снігу з дорожнього покриття. Він має металеву конструкцію з широким лезом, яке можна регулювати в різних напрямках (вліво, вправо, вверх, вниз) для оптимального очищення дороги. Відвал забезпечує швидке та якісне прибирання снігу, запобігаючи утворенню снігових заметів і забезпечуючи безпеку дорожнього руху в зимовий період.',
    en: 'The snow plow blade is specialized equipment designed to be mounted on tractors or other vehicles for effectively removing snow from road surfaces. It features a metal construction with a wide blade that can be adjusted in various directions (left, right, up, down) for optimal road clearing. The plow ensures fast and efficient snow removal, preventing the formation of snow drifts and maintaining road safety during the winter season.',
    de: 'Der Schneepflug ist ein spezialisiertes Gerät, das an Traktoren oder andere Fahrzeuge montiert wird, um Schnee von Straßenoberflächen effektiv zu entfernen. Er besteht aus einem robusten Metallrahmen mit einer breiten Schneide, die in verschiedene Richtungen (nach links, rechts, oben, unten) verstellbar ist, um eine optimale Straßenreinigung zu gewährleisten. Der Pflug sorgt für eine schnelle und effiziente Schneeräumung, verhindert die Bildung von Schneeverwehungen und trägt zur Sicherheit des Straßenverkehrs im Winter bei.',
    pl: 'Pług śnieżny to specjalistyczne urządzenie, które montuje się na traktorach lub innych pojazdach, aby skutecznie usuwać śnieg z nawierzchni dróg. Posiada metalową konstrukcję z szerokim ostrzem, które można regulować w różnych kierunkach (w lewo, w prawo, w górę, w dół), zapewniając optymalne oczyszczanie drogi. Pług zapewnia szybkie i skuteczne usuwanie śniegu, zapobiegając tworzeniu się zasp śnieżnych i zapewniając bezpieczeństwo ruchu drogowego w okresie zimowym.',
  },
  'card-text-13-6': {
    ua: 'Вила для силосу - це спеціалізоване сільськогосподарське обладнання, призначене для роботи з силосом. Вони використовуються для підйому, переміщення та укладання силосу в сховища або годівниці. Основні характеристики вил для силосу включають міцну металеву конструкцію з довгими зубцями, які легко проникають в силосну масу, забезпечуючи надійне захоплення та утримання матеріалу. Вила можуть бути встановлені на різні види сільськогосподарської техніки, такі як трактори або фронтальні навантажувачі, що дозволяє ефективно виконувати завдання на фермі.',
    en: 'Silage forks are specialized agricultural equipment designed for handling silage. They are used for lifting, moving, and stacking silage in storage or feeding areas. Key features of silage forks include a sturdy metal construction with long tines that easily penetrate the silage mass, ensuring secure gripping and holding of the material. The forks can be mounted on various types of agricultural machinery, such as tractors or front loaders, enabling efficient farm operations.',
    de: 'Siloschaufeln sind spezialisiertes landwirtschaftliches Gerät zum Umgang mit Silage. Sie werden zum Heben, Bewegen und Stapeln von Silage in Lagerräumen oder Fütterungsbereichen verwendet. Zu den Hauptmerkmalen von Siloschaufeln gehören eine robuste Metallkonstruktion mit langen Zinken, die leicht in die Silage eindringen und eine sichere Greifung und Fixierung des Materials gewährleisten. Die Schaufeln können an verschiedene Arten von Landmaschinen, wie Traktoren oder Radlader, montiert werden, um effiziente landwirtschaftliche Arbeiten zu ermöglichen.',
    pl: 'Widły do kiszonki to specjalistyczny sprzęt rolniczy przeznaczony do obsługi kiszonki. Służą do podnoszenia, przemieszczania i układania kiszonki w magazynach lub w miejscach karmienia. Główne cechy widłek do kiszonki to wytrzymała konstrukcja stalowa z długimi zębami, które łatwo wnikają w masę kiszonki, zapewniając pewne chwytanie i utrzymywanie materiału. Widły mogą być montowane na różnych typach maszyn rolniczych, takich jak traktory czy ładowarki czołowe, co umożliwia efektywne wykonywanie prac na farmie.',
  },

  'card-text-13-7': {
    ua: 'Ківш об`ємом 1 м³ - це сільськогосподарське або будівельне обладнання, призначене для завантаження, переміщення та розвантаження різних матеріалів, таких як ґрунт, пісок, гравій, добрива або зерно. Він виготовлений з міцної сталі, що забезпечує його довговічність і здатність витримувати великі навантаження. Такий ківш зазвичай встановлюється на трактори, фронтальні навантажувачі або іншу важку техніку, що дозволяє значно підвищити ефективність і швидкість виконання робіт на будівельних майданчиках, фермах або в інших господарствах.',
    en: 'The 1m³ bucket is agricultural or construction equipment designed for loading, moving, and unloading various materials such as soil, sand, gravel, fertilizers, or grain. It is made of durable steel, ensuring its longevity and ability to withstand heavy loads. This bucket is typically mounted on tractors, front loaders, or other heavy machinery, significantly increasing the efficiency and speed of work on construction sites, farms, or other operations.',
    de: 'Der 1m³ Schaufel ist landwirtschaftliches oder bauliches Gerät, das zum Laden, Bewegen und Entladen verschiedener Materialien wie Erde, Sand, Kies, Dünger oder Getreide verwendet wird. Er besteht aus langlebigem Stahl, was seine Langlebigkeit und Fähigkeit, schweren Lasten standzuhalten, gewährleistet. Diese Schaufel wird typischerweise an Traktoren, Frontladern oder anderen schweren Maschinen montiert, was die Effizienz und Geschwindigkeit der Arbeit auf Baustellen, Farmen oder anderen Betrieben erheblich steigert.',
    pl: 'Łyżka o pojemności 1 m³ to sprzęt rolniczy lub budowlany przeznaczony do załadunku, transportu i rozładunku różnych materiałów, takich jak gleba, piasek, żwir, nawozy lub zboża. Wykonana jest z trwałej stali, co zapewnia jej długowieczność i zdolność do wytrzymywania dużych obciążeń. Tego typu łyżka jest zazwyczaj montowana na ciągnikach, ładowarkach czołowych lub innym ciężkim sprzęcie, znacznie zwiększając efektywność i szybkość pracy na placach budowy, farmach lub innych obiektach.',
  },
  'card-text-13-8': {
    ua: 'Ківш об`ємом 2 м³ - це спеціалізоване обладнання, яке використовується в сільському господарстві, будівництві та інших галузях для завантаження, переміщення та розвантаження великих обсягів матеріалів, таких як ґрунт, пісок, гравій, зерно або добрива. Він виготовлений з високоякісної сталі для забезпечення міцності та довговічності при роботі з важкими вантажами. Завдяки великому об`єму, цей ківш дозволяє швидко виконувати завантажувально-розвантажувальні роботи, підвищуючи продуктивність і ефективність. Ківш об`ємом 2 м³ зазвичай встановлюється на великогабаритну техніку, таку як трактори або фронтальні навантажувачі.',
    en: 'The 2m³ bucket is specialized equipment used in agriculture, construction, and other industries for loading, moving, and unloading large volumes of materials such as soil, sand, gravel, grain, or fertilizers. It is made from high-quality steel to ensure strength and durability when handling heavy loads. With its large capacity, this bucket allows for rapid loading and unloading tasks, increasing productivity and efficiency. The 2m³ bucket is typically mounted on heavy machinery such as tractors or front loaders.',
    de: 'Der 2m³ Schaufel ist ein spezialisiertes Gerät, das in der Landwirtschaft, im Bauwesen und in anderen Branchen zum Laden, Bewegen und Entladen großer Materialmengen wie Erde, Sand, Kies, Getreide oder Dünger verwendet wird. Er besteht aus hochwertigem Stahl, um Festigkeit und Haltbarkeit bei der Handhabung schwerer Lasten zu gewährleisten. Durch sein großes Volumen ermöglicht dieser Schaufel eine schnelle Durchführung von Lade- und Entladeaufgaben, wodurch die Produktivität und Effizienz gesteigert wird. Der 2m³ Schaufel wird typischerweise an großen Maschinen wie Traktoren oder Frontladern montiert.',
    pl: 'Łyżka o pojemności 2 m³ to specjalistyczny sprzęt wykorzystywany w rolnictwie, budownictwie i innych branżach do załadunku, transportu i rozładunku dużych ilości materiałów, takich jak gleba, piasek, żwir, zboża lub nawozy. Wykonana z wysokiej jakości stali, zapewnia wytrzymałość i trwałość przy obsłudze ciężkich ładunków. Dzięki dużej pojemności, ta łyżka umożliwia szybkie wykonywanie prac załadunkowych i rozładunkowych, zwiększając wydajność i efektywność. Łyżka o pojemności 2 m³ jest zazwyczaj montowana na dużych maszynach, takich jak ciągniki lub ładowarki czołowe.',
  },
  'card-text-13-9': {
    ua: 'Ківш 2400 зерновий - це сільськогосподарське обладнання, призначене для роботи з зерновими культурами. Він зазвичай використовується для завантаження, переміщення та розвантаження зерна.',
    en: 'The 2400 grain bucket is agricultural equipment designed for handling grain crops. It is typically used for loading, moving, and unloading grain.',
    de: 'Die 2400 Körnerschaufel ist ein landwirtschaftliches Gerät, das für den Umgang mit Getreidekulturen ausgelegt ist. Es wird normalerweise zum Laden, Bewegen und Entladen von Getreide verwendet.',
    pl: 'Łyżka 2400 do zboża to sprzęt rolniczy przeznaczony do pracy z uprawami zbożowymi. Zwykle stosowana jest do załadunku, transportu i rozładunku zboża.',
  },
  'card-text-exc-13': {
    ua: 'Ківш екскаваторний Kubota CX - це навісне обладнання, розроблене для екскаваторів серії Kubota CX, призначене для виконання земляних робіт, таких як копання, розпушування, завантаження та переміщення ґрунту, піску і гравію. Виготовлений з високоякісної сталі, цей ківш забезпечує міцність і довговічність при важких навантаженнях. Він доступний у різних розмірах для виконання специфічних завдань і оптимізований для максимальної продуктивності. Ківш легко встановлюється на екскаватори Kubota CX, забезпечуючи надійну і ефективну роботу.',
    en: 'The Kubota CX excavator bucket is an attachment designed for Kubota CX series excavators, intended for earthmoving tasks such as digging, loosening, loading, and transporting soil, sand, and gravel. Made from high-quality steel, this bucket ensures strength and durability under heavy loads. It is available in various sizes to perform specific tasks and is optimized for maximum productivity. The bucket is easy to install on Kubota CX excavators, providing reliable and efficient operation.',
    de: 'Der Kubota CX Baggerlöffel ist ein Anbaugerät, das für Kubota CX Bagger entwickelt wurde und für Erdarbeiten wie Graben, Auflockern, Laden und Transportieren von Erde, Sand und Kies vorgesehen ist. Hergestellt aus hochwertigem Stahl, gewährleistet dieser Löffel Stärke und Haltbarkeit bei schweren Lasten. Er ist in verschiedenen Größen erhältlich, um spezifische Aufgaben zu erfüllen, und ist für maximale Produktivität optimiert. Der Löffel lässt sich leicht an Kubota CX Bagger montieren und bietet eine zuverlässige und effiziente Arbeitsweise.',
    pl: 'Łyżka koparkowa Kubota CX to osprzęt zaprojektowany dla koparek serii Kubota CX, przeznaczony do prac ziemnych, takich jak kopanie, spulchnianie, załadunek i transport gleby, piasku i żwiru. Wykonana z wysokiej jakości stali, ta łyżka zapewnia wytrzymałość i długowieczność przy dużych obciążeniach. Jest dostępna w różnych rozmiarach, aby wykonywać specyficzne zadania i jest zoptymalizowana pod kątem maksymalnej wydajności. Łyżka łatwo montuje się na koparkach Kubota CX, zapewniając niezawodną i efektywną pracę.',
  },
  'card-text-exc-13-2': {
    ua: 'Ківш екскаваторний 400 мм - це компактне навісне обладнання, призначене для вузьких і точних земляних робіт, таких як копання траншей для кабелів, труб або дренажних систем. Він має ширину 400 мм і виготовлений з високоякісної сталі, що забезпечує міцність і довговічність при важких навантаженнях. Такий ківш сумісний з різними моделями екскаваторів, забезпечуючи точність і ефективність роботи в обмежених просторах. Його конструкція оптимізована для мінімізації опору і полегшення проникнення в ґрунт, що підвищує продуктивність і зменшує витрати палива.',
    en: 'The 400 mm excavator bucket is a compact attachment designed for narrow and precise earthmoving tasks such as digging trenches for cables, pipes, or drainage systems. It has a width of 400 mm and is made of high-quality steel, ensuring strength and durability under heavy loads. This bucket is compatible with various excavator models, providing precision and efficiency in confined spaces. Its design is optimized to minimize resistance and facilitate soil penetration, enhancing productivity and reducing fuel consumption.',
    de: 'Der 400 mm Baggerlöffel ist ein kompaktes Anbaugerät, das für schmale und präzise Erdarbeiten wie das Graben von Gräben für Kabel, Rohre oder Drainagesysteme entwickelt wurde. Er hat eine Breite von 400 mm und besteht aus hochwertigem Stahl, der Stärke und Haltbarkeit bei schweren Lasten gewährleistet. Dieser Löffel ist mit verschiedenen Baggermodellen kompatibel und bietet Präzision und Effizienz in engen Räumen. Sein Design ist optimiert, um den Widerstand zu minimieren und das Eindringen in den Boden zu erleichtern, was die Produktivität steigert und den Kraftstoffverbrauch senkt.',
    pl: 'Łyżka koparkowa 400 mm to kompaktowy osprzęt zaprojektowany do wąskich i precyzyjnych prac ziemnych, takich jak kopanie rowów na kable, rury lub systemy drenażowe. Ma szerokość 400 mm i jest wykonana z wysokiej jakości stali, co zapewnia jej wytrzymałość i długowieczność przy dużych obciążeniach. Ta łyżka jest kompatybilna z różnymi modelami koparek, zapewniając precyzyjność i efektywność pracy w ograniczonych przestrzeniach. Jej konstrukcja jest zoptymalizowana w celu minimalizacji oporu i ułatwienia wnikania w grunt, co zwiększa wydajność i zmniejsza zużycie paliwa.',
  },
  'card-text-exc-13-3': {
    ua: 'Ківш планувальний екскаваторний - це спеціалізоване навісне обладнання для екскаваторів, призначене для точного планування та вирівнювання поверхонь, таких як підготовка основи під будівництво, створення ландшафтних елементів або укладання доріг. Він має широку та пласку конструкцію з ріжучою кромкою, що забезпечує рівне зрізання ґрунту та інших матеріалів. Ківш виготовлений з високоякісної сталі для забезпечення довговічності та стійкості до зносу. Завдяки своїй конструкції, планувальний ківш дозволяє виконувати точні та рівномірні роботи, що підвищує продуктивність і якість виконаних завдань.',
    en: 'The grading excavator bucket is specialized equipment for excavators, designed for precise leveling and grading of surfaces, such as preparing foundations for construction, creating landscaping features, or laying roads. It has a wide, flat design with a cutting edge, ensuring an even cut of soil and other materials. The bucket is made of high-quality steel to ensure durability and wear resistance. Its design allows for precise and even work, enhancing productivity and the quality of completed tasks.',
    de: 'Der Planier-Baggerlöffel ist ein spezialisiertes Gerät für Bagger, das zum präzisen Nivellieren und Planieren von Oberflächen entwickelt wurde, wie zum Beispiel das Vorbereiten von Fundamenten für den Bau, das Erstellen von Landschaftselementen oder das Verlegen von Straßen. Er hat ein breites, flaches Design mit einer Schneidekante, die einen gleichmäßigen Schnitt von Erde und anderen Materialien gewährleistet. Der Löffel besteht aus hochwertigem Stahl, um Haltbarkeit und Abriebfestigkeit zu gewährleisten. Sein Design ermöglicht präzises und gleichmäßiges Arbeiten, was die Produktivität und Qualität der ausgeführten Aufgaben steigert.',
    pl: 'Łyżka do planowania koparkowa to specjalistyczny osprzęt do koparek, przeznaczony do precyzyjnego wyrównywania i planowania powierzchni, takich jak przygotowanie fundamentów pod budowę, tworzenie elementów krajobrazowych lub układanie dróg. Posiada szeroką, płaską konstrukcję z ostrzem tnącym, co zapewnia równomierne cięcie gleby i innych materiałów. Łyżka wykonana jest z wysokiej jakości stali, co zapewnia jej trwałość i odporność na zużycie. Dzięki swojej konstrukcji pozwala na precyzyjną i równomierną pracę, co zwiększa wydajność i jakość wykonywanych zadań.',
  },

  'card-text-12': {
    ua: 'Опис:',
    en: 'Description:',
    de: 'Beschreibung:',
    pl: 'Opis:',
  },
  'card-text-14': {
    ua: 'Ніж сталь:',
    en: 'Knife steel:',
    de: 'Messerstahl:',
    pl: 'Stal noża:',
  },

  // furniture-element
  'fe-breadcrumbs-1': {
    ua: 'Опора стола з дерев`яною вставкою',
    en: 'Table support with wooden insert',
    de: 'Tischstütze mit Holzeinsatz',
    pl: 'Wspornik stołu z drewnianym wkładem',
  },

  'fe-name-1': {
    ua: 'Опора стола з дерев`яною вставкою',
    en: 'Table support with wooden insert',
    de: 'Tischstütze mit Holzeinsatz',
    pl: 'Wspornik stołu z drewnianym wkładem',
  },
  'fe-name-1-1': {
    ua: 'Опора стола з дерев`яною вставкою',
    en: 'Table support with wooden insert',
    de: 'Tischstütze mit Holzeinsatz',
    pl: 'Wspornik stołu z drewnianym wkładem',
  },

  'fe-article-1': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },

  'fe-material': {
    ua: 'Матеріал:',
    en: 'Material:',
    de: 'Material:',
    pl: 'Materiał:',
  },

  'fe-material-product-1': {
    ua: 'Метал / дерево',
    en: 'Metal / wood',
    de: 'Metall / Holz',
    pl: 'Metal / drewno',
  },

  'fe-weight-1': {
    ua: '8 кг',
    en: '8 kg',
    de: '8 kg',
    pl: '8 kg',
  },

  'fe-price-1': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na życzenie',
  },

  'fe-description-1': {
    ua: 'Опора стола з дерев`яною вставкою має стильний та сучасний дизайн. Конструкція виконана у формі трапеції, з металевим каркасом та дерев`яною вставкою всередині. Металеві елементи пофарбовані за допомогою порошкового фарбування в чорний колір, що забезпечує додаткову міцність і стійкість до зносу. Верхня пластина має товщину 4 мм, що забезпечує стабільність і надійність кріплення стільниці. Натуральна дерев`яна вставка додає елегантності та контрастності до загального вигляду опори, роблячи її ідеальним доповненням до сучасних інтер`єрів.',
    en: 'The table support with a wooden insert features a stylish and modern design. The structure is trapezoidal, with a metal frame and a wooden insert inside. The metal elements are powder-coated in black, providing additional strength and wear resistance. The top plate is 4 mm thick, ensuring the stability and reliability of the tabletop attachment. The natural wooden insert adds elegance and contrast to the overall appearance of the support, making it an ideal addition to modern interiors.',
    de: 'Die Tischstütze mit Holzeinsatz verfügt über ein stilvolles und modernes Design. Die Konstruktion ist trapezförmig, mit einem Metallrahmen und einem Holzeinsatz im Inneren. Die Metallelemente sind schwarz pulverbeschichtet, was zusätzliche Festigkeit und Verschleißfestigkeit bietet. Die obere Platte ist 4 mm dick und sorgt für die Stabilität und Zuverlässigkeit der Tischplattenbefestigung. Der natürliche Holzeinsatz verleiht dem Gesamterscheinungsbild der Stütze Eleganz und Kontrast und macht sie zu einer idealen Ergänzung für moderne Innenräume.',
    pl: 'Wspornik stołu z drewnianym wkładem ma stylowy i nowoczesny design. Konstrukcja jest trapezowa, z metalową ramą i drewnianym wkładem w środku. Metalowe elementy są pokryte proszkową farbą na czarno, co zapewnia dodatkową wytrzymałość i odporność na zużycie. Górna płyta ma grubość 4 mm, co zapewnia stabilność i niezawodność mocowania blatu. Naturalny drewniany wkład dodaje elegancji i kontrastu do ogólnego wyglądu wspornika, czyniąc go idealnym dodatkiem do nowoczesnych wnętrz.',
  },

  'fe-name-2': {
    ua: 'Опора стола "Панель',
    en: 'Table support "Panel"',
    de: 'Tischstütze "Panel"',
    pl: 'Wspornik stołu "Panel"',
  },

  'fe-name-2-1': {
    ua: 'Опора стола "Панель"',
    en: 'Table support "Panel"',
    de: 'Tischstütze "Panel"',
    pl: 'Wspornik stołu "Panel"',
  },

  'fe-article-2': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },

  'fe-weight-2': {
    ua: '18 кг',
    en: '18 kg',
    de: '18 kg',
    pl: '18 kg',
  },

  'fe-material-product-2': {
    ua: 'Метал',
    en: 'Metal',
    de: 'Metall',
    pl: 'Metal',
  },

  'fe-price-2': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na życzenie',
  },

  'fe-description-2': {
    ua: 'Опора стола "Панель" складається з вертикальної панелі та верхньої пластини. Виготовлена з високоякісного металу, ця опора забезпечує стабільність і надійність. Верхня пластина товщиною 4 мм має отвори для кріплення до стільниці. Вертикальна панель має плоску конструкцію, що додає опорі сучасного вигляду і забезпечує достатню міцність. Металеві частини пофарбовані порошковою фарбою чорного кольору, що забезпечує додатковий захист від корозії і зносу, а також додає естетичної привабливості. Така опора ідеально підходить для сучасних інтер`єрів, поєднуючи функціональність з елегантним дизайном.',
    en: 'The table support "Panel" consists of a vertical panel and a top plate. Made from high-quality metal, this support ensures stability and reliability. The top plate is 4 mm thick and has holes for attaching to the tabletop. The vertical panel has a flat design, adding a modern look to the support and providing sufficient strength. The metal parts are powder-coated in black, offering additional protection against corrosion and wear, as well as aesthetic appeal. This support is ideal for modern interiors, combining functionality with elegant design.',
    de: 'Die Tischstütze "Panel" besteht aus einer vertikalen Platte und einer oberen Platte. Hergestellt aus hochwertigem Metall, gewährleistet diese Stütze Stabilität und Zuverlässigkeit. Die obere Platte ist 4 mm dick und hat Löcher zur Befestigung an der Tischplatte. Die vertikale Platte hat ein flaches Design, das der Stütze ein modernes Aussehen verleiht und ausreichende Festigkeit bietet. Die Metallelemente sind schwarz pulverbeschichtet, was zusätzlichen Schutz vor Korrosion und Verschleiß sowie eine ästhetische Anziehungskraft bietet. Diese Stütze ist ideal für moderne Innenräume, da sie Funktionalität mit elegantem Design kombiniert.',
    pl: 'Wspornik stołu "Panel" składa się z pionowej płyty i górnej płyty. Wykonany z wysokiej jakości metalu, ten wspornik zapewnia stabilność i niezawodność. Górna płyta ma grubość 4 mm i posiada otwory do mocowania do blatu stołu. Pionowa płyta ma płaską konstrukcję, co nadaje wspornikowi nowoczesny wygląd i zapewnia odpowiednią wytrzymałość. Metalowe elementy są pokryte proszkową farbą na czarno, co zapewnia dodatkową ochronę przed korozją i zużyciem oraz nadaje estetyczny wygląd. Ten wspornik idealnie nadaje się do nowoczesnych wnętrz, łącząc funkcjonalność z eleganckim designem.',
  },

  'fe-name-3': {
    ua: 'Опора стола "Панель з вирізом"',
    en: 'Table support "Panel with cutout"',
    de: 'Tischstütze "Panel mit Ausschnitt"',
    pl: 'Wspornik stołu "Panel z wycięciem"',
  },

  'fe-name-3-1': {
    ua: 'Опора стола "Панель з вирізом"',
    en: 'Table support "Panel with cutout"',
    de: 'Tischstütze "Panel mit Ausschnitt"',
    pl: 'Wspornik stołu "Panel z wycięciem"',
  },

  'fe-article-3': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },

  'fe-weight-3': {
    ua: '15 кг',
    en: '15 kg',
    de: '15 kg',
    pl: '15 kg',
  },

  'fe-price-3': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na życzenie',
  },

  'fe-description-3': {
    ua: 'Опора стола "Панель з вирізом" має сучасний та функціональний дизайн. Конструкція включає вертикальну панель з центральним вирізом і верхню пластину товщиною 4 мм. Виріз у панелі додає опорі візуальної легкості та унікальності. Верхня пластина оснащена отворами для надійного кріплення до стільниці. Вся конструкція виготовлена з міцного металу і пофарбована порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Така опора ідеально підходить для сучасних інтер`єрів, поєднуючи стильний вигляд з практичністю та надійністю.',
    en: 'The table support "Panel with cutout" features a modern and functional design. The structure includes a vertical panel with a central cutout and a top plate that is 4 mm thick. The cutout in the panel adds visual lightness and uniqueness to the support. The top plate is equipped with holes for secure attachment to the tabletop. The entire structure is made of durable metal and powder-coated in black, providing corrosion protection and longevity. This support is ideal for modern interiors, combining a stylish appearance with practicality and reliability.',
    de: 'Die Tischstütze "Panel mit Ausschnitt" verfügt über ein modernes und funktionales Design. Die Konstruktion umfasst eine vertikale Platte mit einem zentralen Ausschnitt und eine 4 mm dicke obere Platte. Der Ausschnitt in der Platte verleiht der Stütze visuelle Leichtigkeit und Einzigartigkeit. Die obere Platte ist mit Löchern für eine sichere Befestigung an der Tischplatte ausgestattet. Die gesamte Konstruktion besteht aus strapazierfähigem Metall und ist schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Diese Stütze ist ideal für moderne Innenräume und kombiniert ein stilvolles Erscheinungsbild mit Praktikabilität und Zuverlässigkeit.',
    pl: 'Wspornik stołu "Panel z wycięciem" ma nowoczesny i funkcjonalny design. Konstrukcja obejmuje pionową płytę z centralnym wycięciem oraz górną płytę o grubości 4 mm. Wycięcie w płycie nadaje wspornikowi wizualną lekkość i wyjątkowość. Górna płyta jest wyposażona w otwory do pewnego mocowania do blatu. Cała konstrukcja wykonana jest z trwałego metalu i pokryta czarną proszkową farbą, co zapewnia ochronę przed korozją i długowieczność. Ten wspornik idealnie pasuje do nowoczesnych wnętrz, łącząc stylowy wygląd z praktycznością i niezawodnością.',
  },

  'fe-name-4': {
    ua: 'Опора стола Х',
    en: 'Table support X',
    de: 'Tischstütze X',
    pl: 'Wspornik stołu X',
  },

  'fe-name-4-1': {
    ua: 'Опора стола Х',
    en: 'Table support X',
    de: 'Tischstütze X',
    pl: 'Wspornik stołu X',
  },

  'fe-article-4': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-4': {
    ua: '16 кг',
    en: '16 kg',
    de: '16 kg',
    pl: '16 kg',
  },
  'fe-price-4': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-4': {
    ua: 'Опора стола "Х" має сучасний та індустріальний дизайн...',
    en: 'The table support "X" features a modern and industrial design...',
    de: 'Die Tischstütze "X" hat ein modernes und industrielles Design...',
    pl: 'Wspornik stołu "X" charakteryzuje się nowoczesnym i przemysłowym designem...',
  },
  'fe-name-5': {
    ua: 'Опора стола U DELTA',
    en: 'Table support U DELTA',
    de: 'Tischstütze U DELTA',
    pl: 'Wspornik stołu U DELTA',
  },
  'fe-name-5-1': {
    ua: 'Опора стола U DELTA',
    en: 'Table support U DELTA',
    de: 'Tischstütze U DELTA',
    pl: 'Wspornik stołu U DELTA',
  },
  'fe-article-5': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-5': {
    ua: '12 кг',
    en: '12 kg',
    de: '12 kg',
    pl: '12 kg',
  },
  'fe-price-5': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-5': {
    ua: 'Опора стола U DELTA виготовлена з профільної труби...',
    en: 'The table support U DELTA is made of a 40x80 mm profile tube...',
    de: 'Die Tischstütze U DELTA ist aus einem Profilrohr gefertigt...',
    pl: 'Wspornik stołu U DELTA wykonany jest z rury profilowej 40x80 mm...',
  },
  'fe-name-6': {
    ua: 'Опора стола 8х4 4х3',
    en: 'Table support 8x4 4x3',
    de: 'Tischstütze 8x4 4x3',
    pl: 'Wspornik stołu 8x4 4x3',
  },
  'fe-name-6-1': {
    ua: 'Опора стола 8х4 4х3',
    en: 'Table support 8x4 4x3',
    de: 'Tischstütze 8x4 4x3',
    pl: 'Wspornik stołu 8x4 4x3',
  },
  'fe-article-6': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-6': {
    ua: '3 кг',
    en: '3 kg',
    de: '3 kg',
    pl: '3 kg',
  },
  'fe-price-6': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-6': {
    ua: 'Опора стола 8х4 4х3 виготовлена з високоякісного металу...',
    en: 'The table support 8x4 4x3 is made of high-quality metal...',
    de: 'Die Tischstütze 8x4 4x3 ist aus hochwertigem Metall gefertigt...',
    pl: 'Wspornik stołu 8x4 4x3 wykonany jest z wysokiej jakości metalu...',
  },
  'fe-name-7': {
    ua: 'Опора стола T ф550',
    en: 'T table support Ø550',
    de: 'T Tischstütze Ø550',
    pl: 'Wspornik stołu T Ø550',
  },
  'fe-name-7-1': {
    ua: 'Опора стола T ф550',
    en: 'T table support Ø550',
    de: 'T Tischstütze Ø550',
    pl: 'Wspornik stołu T Ø550',
  },
  'fe-article-7': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-7': {
    ua: '19 кг',
    en: '19 kg',
    de: '19 kg',
    pl: '19 kg',
  },

  'fe-price-7': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-7': {
    ua: 'Ця опора стола має круглу базу та верхню пластину, виконані з високоякісного металу. Нижня плита товщиною 6 мм забезпечує стабільність і міцність конструкції, а верхня плита товщиною 4 мм має отвори для кріплення стільниці. Вертикальна стійка з`єднує обидві плити і додає конструкції елегантності та сучасного вигляду. Вся опора пофарбована порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Така опора ідеально підходить для використання в кафе, ресторанах або офісах, поєднуючи в собі естетику та функціональність.',
    en: 'This table support has a round base and top plate made of high-quality metal. The 6 mm thick bottom plate provides stability and strength to the structure, while the 4 mm thick top plate has holes for attaching the tabletop. A vertical stand connects both plates, adding elegance and a modern look to the design. The entire support is powder-coated in black, offering corrosion protection and durability. This support is ideal for use in cafes, restaurants, or offices, combining aesthetics and functionality.',
    de: 'Diese Tischstütze hat eine runde Basis und eine obere Platte aus hochwertigem Metall. Die 6 mm dicke untere Platte sorgt für Stabilität und Festigkeit der Konstruktion, während die 4 mm dicke obere Platte Löcher zur Befestigung der Tischplatte hat. Ein vertikaler Ständer verbindet beide Platten und verleiht dem Design Eleganz und ein modernes Aussehen. Die gesamte Stütze ist schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Diese Stütze ist ideal für den Einsatz in Cafés, Restaurants oder Büros und kombiniert Ästhetik und Funktionalität.',
    pl: 'Ten wspornik stołu ma okrągłą podstawę i górną płytę wykonaną z wysokiej jakości metalu. Dolna płyta o grubości 6 mm zapewnia stabilność i wytrzymałość konstrukcji, podczas gdy górna płyta o grubości 4 mm ma otwory do mocowania blatu. Pionowa podpórka łączy obie płyty, nadając konstrukcji elegancji i nowoczesnego wyglądu. Cały wspornik jest pokryty czarną farbą proszkową, co zapewnia ochronę przed korozją i trwałość. Ten wspornik jest idealny do użycia w kawiarniach, restauracjach lub biurach, łącząc estetykę i funkcjonalność.',
  },
  'fe-name-8': {
    ua: 'Опора стола TT 820x550',
    en: 'Table support TT 820x550',
    de: 'Tischstütze TT 820x550',
    pl: 'Wspornik stołu TT 820x550',
  },
  'fe-name-8-1': {
    ua: 'Опора стола TT 820x550',
    en: 'Table support TT 820x550',
    de: 'Tischstütze TT 820x550',
    pl: 'Wspornik stołu TT 820x550',
  },
  'fe-article-8': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-8': {
    ua: '25 кг',
    en: '25 kg',
    de: '25 kg',
    pl: '25 kg',
  },
  'fe-price-8': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-8': {
    ua: 'Опора стола TT розміром 820x550 мм має сучасний дизайн та міцну конструкцію. Верхня та нижня плити мають овальну форму, що додає естетичної привабливості та забезпечує стійкість. Нижня плита має товщину 6 мм, а верхня - 4 мм, з отворами для кріплення стільниці. Дві вертикальні стійки з`єднують верхню і нижню плити, створюючи надійну опору. Вся конструкція виконана з високоякісного металу та пофарбована порошковою фарбою чорного кольору, що забезпечує довговічність і захист від корозії. Ця опора ідеально підходить для використання в кафе, ресторанах або офісах, поєднуючи стильний вигляд з функціональністю.',
    en: 'The table support TT measuring 820x550 mm has a modern design and a sturdy construction. The top and bottom plates have an oval shape, adding aesthetic appeal and ensuring stability. The bottom plate is 6 mm thick, and the top plate is 4 mm thick, with holes for attaching the tabletop. Two vertical supports connect the top and bottom plates, creating a reliable support. The entire structure is made of high-quality metal and is powder-coated in black, providing durability and corrosion protection. This support is ideal for use in cafes, restaurants, or offices, combining a stylish look with functionality.',
    de: 'Die Tischstütze TT mit den Maßen 820x550 mm hat ein modernes Design und eine robuste Konstruktion. Die obere und untere Platte haben eine ovale Form, die ästhetische Anziehungskraft verleiht und Stabilität gewährleistet. Die untere Platte ist 6 mm dick und die obere Platte 4 mm dick, mit Löchern zur Befestigung der Tischplatte. Zwei vertikale Stützen verbinden die obere und untere Platte und schaffen eine zuverlässige Unterstützung. Die gesamte Struktur besteht aus hochwertigem Metall und ist schwarz pulverbeschichtet, was Langlebigkeit und Korrosionsschutz bietet. Diese Stütze ist ideal für den Einsatz in Cafés, Restaurants oder Büros und kombiniert einen stilvollen Look mit Funktionalität.',
    pl: 'Wspornik stołu TT o wymiarach 820x550 mm ma nowoczesny design i solidną konstrukcję. Górna i dolna płyta mają owalny kształt, co dodaje estetyki i zapewnia stabilność. Dolna płyta ma grubość 6 mm, a górna 4 mm, z otworami do mocowania blatu. Dwa pionowe słupki łączą górną i dolną płytę, tworząc niezawodne wsparcie. Cała konstrukcja wykonana jest z wysokiej jakości metalu i pokryta czarną farbą proszkową, zapewniającą trwałość i ochronę przed korozją. Ten wspornik jest idealny do użytku w kawiarniach, restauracjach lub biurach, łącząc stylowy wygląd z funkcjonalnością.',
  },
  'fe-name-9': {
    ua: 'Опора стола XXR',
    en: 'XXR table support',
    de: 'XXR Tischstütze',
    pl: 'Wspornik stołu XXR',
  },
  'fe-name-9-1': {
    ua: 'Опора стола XXR',
    en: 'XXR table support',
    de: 'XXR Tischstütze',
    pl: 'Wspornik stołu XXR',
  },
  'fe-article-9': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-9': {
    ua: '45 кг',
    en: '45 kg',
    de: '45 kg',
    pl: '45 kg',
  },
  'fe-price-9': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-9': {
    ua: 'Опора столу XXR має верхню пластину товщиною 4 мм і пропонується в двох варіантах: з труби 40x100 мм і з труби 100x100 мм. Варіант з трубою 40x100 мм забезпечує легкість і стильний вигляд, підходить для середнього навантаження, тоді як варіант з трубою 100x100 мм є більш міцним і стабільним, ідеальний для важчих конструкцій та надає більш масивний вигляд.',
    en: 'The XXR table base features a 4 mm thick top plate and is available in two variants: with a 40x100 mm tube and with a 100x100 mm tube. The 40x100 mm tube variant provides a lightweight and stylish appearance, suitable for medium loads, while the 100x100 mm tube variant is sturdier and more stable, ideal for heavier constructions and offering a more substantial look.',
    de: 'Die XXR Tischbasis verfügt über eine 4 mm dicke Oberplatte und ist in zwei Varianten erhältlich: mit einem Rohr von 40x100 mm und mit einem Rohr von 100x100 mm. Die Variante mit dem Rohr 40x100 mm bietet ein leichtes und stilvolles Aussehen, geeignet für mittlere Belastungen, während die Variante mit dem Rohr 100x100 mm stabiler und robuster ist, ideal für schwerere Konstruktionen und bietet ein massiveres Aussehen.',
    pl: 'Podstawa stołu XXR posiada górną płytę o grubości 4 mm i jest dostępna w dwóch wariantach: z rurą 40x100 mm oraz z rurą 100x100 mm. Wariant z rurą 40x100 mm zapewnia lekki i stylowy wygląd, odpowiedni do średnich obciążeń, podczas gdy wariant z rurą 100x100 mm jest bardziej stabilny i wytrzymały, idealny do cięższych konstrukcji i nadaje bardziej masywny wygląd.',
  },
  'fe-name-10': {
    ua: 'Опора стола UR',
    en: 'UR table base',
    de: 'UR Tischbasis',
    pl: 'Podstawa stołu UR',
  },
  'fe-name-10-1': {
    ua: 'Опора стола UR',
    en: 'UR table base',
    de: 'UR Tischbasis',
    pl: 'Podstawa stołu UR',
  },
  'fe-article-10': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-10': {
    ua: '13 кг',
    en: '13 kg',
    de: '13 kg',
    pl: '13 kg',
  },
  'fe-price-10': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-10': {
    ua: 'Ця опора стола має прямокутну форму і виготовлена з профільних труб різних розмірів: 40х100 мм, 100х100 мм і 80х40 мм. Верхня пластина виконана з товщиною 4 мм і оснащена отворами для кріплення стільниці. Конструкція забезпечує високу міцність і стійкість завдяки використанню різних розмірів профільних труб, що надають опорі сучасного і стильного вигляду. Вся опора пофарбована порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Вона ідеально підходить для використання в інтер`єрах, де поєднуються функціональність і естетика.',

    en: 'This table support has a rectangular shape and is made from profile pipes of various sizes: 40x100 mm, 100x100 mm, and 80x40 mm. The top plate is 4 mm thick and equipped with holes for attaching the tabletop. The construction ensures high strength and stability due to the use of different-sized profile pipes, giving the support a modern and stylish appearance. The entire support is powder-coated in black, providing corrosion protection and durability. It is ideal for use in interiors where functionality and aesthetics are combined.',

    de: 'Diese Tischstütze hat eine rechteckige Form und ist aus Profilrohren verschiedener Größen gefertigt: 40x100 mm, 100x100 mm und 80x40 mm. Die obere Platte ist 4 mm dick und mit Löchern zur Befestigung der Tischplatte ausgestattet. Die Konstruktion gewährleistet hohe Festigkeit und Stabilität durch die Verwendung von Profilrohren unterschiedlicher Größe, was der Stütze ein modernes und stilvolles Aussehen verleiht. Die gesamte Stütze ist schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Sie eignet sich ideal für den Einsatz in Innenräumen, wo Funktionalität und Ästhetik kombiniert werden.',

    pl: 'Ta podpora stołu ma prostokątny kształt i jest wykonana z rur profilowych o różnych rozmiarach: 40x100 mm, 100x100 mm i 80x40 mm. Górna płyta ma grubość 4 mm i wyposażona jest w otwory do mocowania blatu. Konstrukcja zapewnia wysoką wytrzymałość i stabilność dzięki zastosowaniu rur profilowych o różnych rozmiarach, co nadaje podporze nowoczesny i stylowy wygląd. Cała podpora jest malowana proszkowo na kolor czarny, co zapewnia ochronę przed korozją i trwałość. Jest idealna do użytku w wnętrzach, gdzie łączą się funkcjonalność i estetyka.',
  },
  'fe-name-11': {
    ua: 'Опора стола XR 8x4',
    en: 'XR 8x4 table base',
    de: 'XR 8x4 Tischbasis',
    pl: 'Podstawa stołu XR 8x4',
  },
  'fe-name-11-1': {
    ua: 'Опора стола XR 8x4',
    en: 'XR 8x4 table base',
    de: 'XR 8x4 Tischbasis',
    pl: 'Podstawa stołu XR 8x4',
  },

  'fe-article-11': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-11': {
    ua: '12 кг',
    en: '12 kg',
    de: '12 kg',
    pl: '12 kg',
  },

  'fe-price-11': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena do uzgodnienia',
  },
  'fe-description-11': {
    ua: 'Ця опора стола має Х-подібну форму і виготовлена з профільних труб різних розмірів: 100х40 мм, 100х100 мм і 40х80 мм. Верхня пластина товщиною 4 мм має отвори для кріплення стільниці. Конструкція пофарбована порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Така опора відзначається високою міцністю і стильним виглядом, підходить для використання в сучасних інтер`єрах, де поєднуються функціональність і естетика.',

    en: 'This table support has an X-shape and is made from profile pipes of various sizes: 100x40 mm, 100x100 mm, and 40x80 mm. The 4 mm thick top plate has holes for attaching the tabletop. The construction is powder-coated in black, providing corrosion protection and durability. This support is noted for its high strength and stylish appearance, making it suitable for use in modern interiors where functionality and aesthetics are combined.',

    de: 'Diese Tischstütze hat eine X-Form und ist aus Profilrohren verschiedener Größen gefertigt: 100x40 mm, 100x100 mm und 40x80 mm. Die obere Platte ist 4 mm dick und mit Löchern zur Befestigung der Tischplatte ausgestattet. Die Konstruktion ist schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Diese Stütze zeichnet sich durch ihre hohe Festigkeit und ihr stilvolles Aussehen aus und eignet sich für den Einsatz in modernen Innenräumen, in denen Funktionalität und Ästhetik kombiniert werden.',

    pl: 'Ta podpora stołu ma kształt X i jest wykonana z rur profilowych o różnych rozmiarach: 100x40 mm, 100x100 mm i 40x80 mm. Górna płyta ma grubość 4 mm i posiada otwory do mocowania blatu. Konstrukcja jest malowana proszkowo na kolor czarny, co zapewnia ochronę przed korozją i trwałość. Ta podpora wyróżnia się wysoką wytrzymałością i stylowym wyglądem, co sprawia, że jest idealna do nowoczesnych wnętrz, gdzie łączą się funkcjonalność i estetyka.',
  },
  'fe-name-12': {
    ua: 'Опора стола для журнального столика',
    en: 'Coffee table base',
    de: 'Kaffeetischbasis',
    pl: 'Podstawa stołu kawowego',
  },
  'fe-name-12-1': {
    ua: 'Опора стола для журнального столика',
    en: 'Coffee table base',
    de: 'Kaffeetischbasis',
    pl: 'Podstawa stołu kawowego',
  },

  'fe-article-12': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-12': {
    ua: '7 кг',
    en: '7 kg',
    de: '7 kg',
    pl: '7 kg',
  },

  'fe-price-12': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena do uzgodnienia',
  },
  'fe-description-12': {
    ua: 'Ця опора стола складається з ніжок товщиною 8 мм і верхньої пластини товщиною 4 мм. Ніжки розташовані у формі літери "Х", що забезпечує стійкість і надійність конструкції. Верхня пластина має отвори для кріплення стільниці. Опора пофарбована порошковою фарбою, що захищає її від корозії та додає естетичний вигляд. Така конструкція підходить для використання в сучасних інтер`єрах, забезпечуючи одночасно міцність і стильний дизайн.',

    en: 'This table base consists of legs with a thickness of 8 mm and a top plate with a thickness of 4 mm. The legs are arranged in an "X" shape, providing stability and reliability to the structure. The top plate has holes for attaching the tabletop. The base is powder-coated, which protects it from corrosion and gives it an aesthetic appearance. This design is suitable for use in modern interiors, offering both strength and a stylish design.',

    de: 'Diese Tischbasis besteht aus Beinen mit einer Dicke von 8 mm und einer oberen Platte mit einer Dicke von 4 mm. Die Beine sind in Form eines "X" angeordnet, was Stabilität und Zuverlässigkeit der Konstruktion gewährleistet. Die obere Platte hat Löcher zur Befestigung der Tischplatte. Die Basis ist pulverbeschichtet, was sie vor Korrosion schützt und ihr ein ästhetisches Aussehen verleiht. Dieses Design eignet sich für moderne Interieurs und bietet gleichzeitig Festigkeit und ein stilvolles Design.',

    pl: 'Ta podstawa stołu składa się z nóg o grubości 8 mm oraz górnej płyty o grubości 4 mm. Nogi są ustawione w kształcie litery "X", co zapewnia stabilność i niezawodność konstrukcji. Górna płyta ma otwory do mocowania blatu. Podstawa jest malowana proszkowo, co zapewnia ochronę przed korozją i nadaje jej estetyczny wygląd. Taki projekt jest idealny do nowoczesnych wnętrz, zapewniając zarówno wytrzymałość, jak i stylowy design.',
  },
  'fe-name-13': {
    ua: 'Опора стола',
    en: 'Table base',
    de: 'Tischbasis',
    pl: 'Podstawa stołu',
  },
  'fe-name-13-1': {
    ua: 'Опора стола',
    en: 'Table base',
    de: 'Tischbasis',
    pl: 'Podstawa stołu',
  },

  'fe-article-13': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-13': {
    ua: '8 кг',
    en: '8 kg',
    de: '8 kg',
    pl: '8 kg',
  },

  'fe-price-13': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena do uzgodnienia',
  },
  'fe-description-13': {
    ua: 'Ця опора стола складається з ніжок товщиною 8 мм і верхньої пластини товщиною 4 мм. Ніжки розташовані у формі літери "Х", що забезпечує стійкість і надійність конструкції. Верхня пластина має отвори для кріплення стільниці. Опора пофарбована порошковою фарбою, що захищає її від корозії та додає естетичний вигляд. Така конструкція підходить для використання в сучасних інтер`єрах, забезпечуючи одночасно міцність і стильний дизайн.',
    en: 'This table base consists of legs with a thickness of 8 mm and a top plate with a thickness of 4 mm. The legs are arranged in an "X" shape, providing stability and reliability to the structure. The top plate has holes for attaching the tabletop. The base is powder-coated, which protects it from corrosion and gives it an aesthetic appearance. This design is suitable for use in modern interiors, offering both strength and a stylish design.',
    de: 'Diese Tischbasis besteht aus Beinen mit einer Dicke von 8 mm und einer oberen Platte mit einer Dicke von 4 mm. Die Beine sind in Form eines "X" angeordnet, was Stabilität und Zuverlässigkeit der Konstruktion gewährleistet. Die obere Platte hat Löcher zur Befestigung der Tischplatte. Die Basis ist pulverbeschichtet, was sie vor Korrosion schützt und ihr ein ästhetisches Aussehen verleiht. Dieses Design eignet sich für moderne Interieurs und bietet gleichzeitig Festigkeit und ein stilvolles Design.',
    pl: 'Ta podstawa stołu składa się z nóg o grubości 8 mm i górnej płyty o grubości 4 mm. Nogi są ustawione w kształcie litery "X", co zapewnia stabilność i niezawodność konstrukcji. Górna płyta ma otwory do mocowania blatu. Podstawa jest malowana proszkowo, co zapewnia ochronę przed korozją i nadaje jej estetyczny wygląd. Taki projekt jest idealny do nowoczesnych wnętrz, zapewniając zarówno wytrzymałość, jak i stylowy design.',
  },
  'fe-name-14': {
    ua: 'Опора стола XXO 7x1',
    en: 'XXO 7x1 table base',
    de: 'XXO 7x1 Tischbasis',
    pl: 'Podstawa stołu XXO 7x1',
  },
  'fe-name-14-1': {
    ua: 'Опора стола XXO 7x1',
    en: 'XXO 7x1 table base',
    de: 'XXO 7x1 Tischbasis',
    pl: 'Podstawa stołu XXO 7x1',
  },

  'fe-article-14': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-14': {
    ua: '19 кг',
    en: '19 kg',
    de: '19 kg',
    pl: '19 kg',
  },

  'fe-price-14': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena do uzgodnienia',
  },
  'fe-description-14': {
    ua: 'Ця опора стола має круглу верхню пластину товщиною 4 мм і чотири лапи товщиною 8 мм, які утворюють стабільну конструкцію. Верхня пластина оснащена отворами для кріплення стільниці. Конструкція виглядає сучасно та надійно завдяки використанню міцних матеріалів і збалансованій формі. Порошкове покриття додає опорі естетичний вигляд і захищає від корозії. Така опора підходить для використання в інтер`єрах з круглими або овальними стільницями.',
    en: 'This table support has a round top plate with a thickness of 4 mm and four legs with a thickness of 8 mm, creating a stable structure. The top plate is equipped with holes for attaching the tabletop. The construction looks modern and reliable due to the use of strong materials and a balanced shape. The powder coating adds an aesthetic appearance and protects against corrosion. This support is suitable for use in interiors with round or oval tabletops.',
    de: 'Diese Tischstütze hat eine runde obere Platte mit einer Dicke von 4 mm und vier Beine mit einer Dicke von 8 mm, die eine stabile Struktur bilden. Die obere Platte ist mit Löchern zur Befestigung der Tischplatte ausgestattet. Die Konstruktion sieht modern und zuverlässig aus, dank der Verwendung starker Materialien und einer ausgewogenen Form. Die Pulverbeschichtung verleiht ein ästhetisches Aussehen und schützt vor Korrosion. Diese Stütze eignet sich für den Einsatz in Innenräumen mit runden oder ovalen Tischplatten.',
    pl: 'Ta podstawa stołu ma okrągłą górną płytę o grubości 4 mm i cztery nogi o grubości 8 mm, tworzące stabilną konstrukcję. Górna płyta wyposażona jest w otwory do mocowania blatu. Konstrukcja wygląda nowocześnie i solidnie dzięki zastosowaniu mocnych materiałów i zrównoważonej formie. Malowanie proszkowe dodaje estetycznego wyglądu i chroni przed korozją. Ta podstawa jest odpowiednia do użytku w wnętrzach z okrągłymi lub owalnymi blatami.',
  },
  'fe-name-15': {
    ua: 'Опора стола XXV 7х1',
    en: 'XXV 7x1 table base',
    de: 'XXV 7x1 Tischbasis',
    pl: 'Podstawa stołu XXV 7x1',
  },
  'fe-name-15-1': {
    ua: 'Опора стола XXV 7х1',
    en: 'XXV 7x1 table base',
    de: 'XXV 7x1 Tischbasis',
    pl: 'Podstawa stołu XXV 7x1',
  },

  'fe-article-15': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },
  'fe-weight-15': {
    ua: '30 кг',
    en: '30 kg',
    de: '30 kg',
    pl: '30 kg',
  },

  'fe-price-15': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena do uzgodnienia',
  },
  'fe-description-15': {
    ua: 'Ця опора стола виготовлена з полоси розміром 10x70 мм. Її геометричний дизайн складається з чотирьох основних ніжок, з`єднаних між собою вгорі та внизу, що забезпечує високу стійкість та міцність. Опора має сучасний вигляд і підходить для використання з різними типами стільниць, додаючи інтер`єру оригінальності та стилю.',
    en: 'This table support is made from a strip measuring 10x70 mm. Its geometric design consists of four main legs connected at the top and bottom, providing high stability and strength. The support has a modern appearance and is suitable for use with various types of tabletops, adding originality and style to the interior.',
    de: 'Diese Tischstütze ist aus einem Streifen mit den Maßen 10x70 mm gefertigt. Ihr geometrisches Design besteht aus vier Hauptbeinen, die oben und unten verbunden sind, was für hohe Stabilität und Festigkeit sorgt. Die Stütze hat ein modernes Erscheinungsbild und ist für die Verwendung mit verschiedenen Tischplatten geeignet, wodurch dem Innenraum Originalität und Stil verliehen wird.',
    pl: 'Ta podstawa stołu wykonana jest z paska o wymiarach 10x70 mm. Jej geometryczny design składa się z czterech głównych nóg, połączonych u góry i na dole, co zapewnia dużą stabilność i wytrzymałość. Podstawa ma nowoczesny wygląd i nadaje się do stosowania z różnymi rodzajami blatów, dodając wnętrzu oryginalności i stylu.',
  },
  'fe-name-16': {
    ua: 'Опора стола T 45x45',
    en: 'T 45x45 table base',
    de: 'T 45x45 Tischbasis',
    pl: 'Podstawa stołu T 45x45',
  },
  'fe-name-16-1': {
    ua: 'Опора стола T 45x45',
    en: 'T 45x45 table base',
    de: 'T 45x45 Tischbasis',
    pl: 'Podstawa stołu T 45x45',
  },

  'fe-article-16': {
    ua: 'Артикул',
    en: '',
    de: '',
    pl: 'Artykuł',
  },

  'fe-weight-16': {
    ua: '14 кг',
    en: '14 kg',
    de: '14 kg',
    pl: '14 kg',
  },

  'fe-price-16': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },

  'fe-description-16': {
    ua: 'Ця опора стола складається з квадратної основи товщиною 6 мм, верхньої пластини товщиною 4 мм та труби розміром 60x60 мм. Дизайн забезпечує стабільність та міцність конструкції, роблячи її ідеальною для різних типів столів. Сучасний і мінімалістичний вигляд опори підходить для використання в різних інтер`єрах.',
    en: 'This table support consists of a square base 6 mm thick, a top plate 4 mm thick, and a tube measuring 60x60 mm. The design ensures stability and strength, making it ideal for various types of tables. The modern and minimalist appearance of the support is suitable for use in different interiors.',
    de: 'Diese Tischstütze besteht aus einer quadratischen Basis mit einer Dicke von 6 mm, einer oberen Platte mit einer Dicke von 4 mm und einem Rohr mit den Maßen 60x60 mm. Das Design gewährleistet Stabilität und Festigkeit und macht es ideal für verschiedene Tischarten. Das moderne und minimalistische Erscheinungsbild der Stütze eignet sich für die Verwendung in verschiedenen Innenräumen.',
    pl: 'Ten wspornik stołu składa się z kwadratowej podstawy o grubości 6 mm, górnej płyty o grubości 4 mm i rury o wymiarach 60x60 mm. Konstrukcja zapewnia stabilność i wytrzymałość, co czyni go idealnym dla różnych rodzajów stołów. Nowoczesny i minimalistyczny wygląd wspornika nadaje się do różnych wnętrz.',
  },

  'fe-name-17': {
    ua: 'Опора стола (труба трикутник)',
    en: 'Table base (triangle tube)',
    de: 'Tischbasis (Dreieckrohr)',
    pl: 'Podstawa stołu (rura trójkątna)',
  },

  'fe-article-17': {
    ua: 'Артикул',
    en: 'Article',
    de: 'Artikel',
    pl: 'Artykuł',
  },

  'fe-weight-17': {
    ua: '9 кг',
    en: '9 kg',
    de: '9 kg',
    pl: '9 kg',
  },

  'fe-price-17': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-17': {
    ua: 'Ця опора стола має верхню пластину товщиною 4 мм і виготовлена у формі трикутника, що забезпечує їй міцність і стійкість. Горизонтальна та вертикальна частини опори утворюють жорстку конструкцію, що робить її надійною для використання з різними типами столів. Дизайн додає сучасного вигляду та підходить для різних інтер`єрів.',
    en: 'This table support has a 4 mm thick top plate and is designed in a triangular shape, providing it with strength and stability. The horizontal and vertical parts of the support form a rigid structure, making it reliable for use with various types of tables. The design adds a modern look and suits different interiors.',
    de: 'Diese Tischstütze hat eine 4 mm dicke obere Platte und ist in Form eines Dreiecks gestaltet, was ihr Festigkeit und Stabilität verleiht. Die horizontalen und vertikalen Teile der Stütze bilden eine starre Struktur, die sie für die Verwendung mit verschiedenen Tischarten zuverlässig macht. Das Design verleiht ihr ein modernes Aussehen und passt zu verschiedenen Innenräumen.',
    pl: 'Ta podpora stołu ma płytę górną o grubości 4 mm i jest zaprojektowana w kształcie trójkąta, co zapewnia jej wytrzymałość i stabilność. Poziome i pionowe elementy podpory tworzą sztywną konstrukcję, co czyni ją niezawodną w użyciu z różnymi rodzajami stołów. Design nadaje nowoczesny wygląd i pasuje do różnych wnętrz.',
  },
  'fe-name-18': {
    ua: 'Опора стола ХХS 73x75/3',
    en: 'XXS 73x75/3 table base',
    de: 'XXS 73x75/3 Tischbasis',
    pl: 'Podstawa stołu XXS 73x75/3',
  },
  'fe-name-18-1': {
    ua: 'Опора стола ХХS 73x75/3',
    en: 'XXS 73x75/3 table base',
    de: 'XXS 73x75/3 Tischbasis',
    pl: 'Podstawa stołu XXS 73x75/3',
  },
  'fe-article-18': {
    ua: 'Артикул',
    en: 'Article',
    de: 'Artikel',
    pl: 'Artykuł',
  },
  'fe-weight-18': {
    ua: '10 кг',
    en: '10 kg',
    de: '10 kg',
    pl: '10 kg',
  },
  'fe-price-18': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
    pl: 'Cena na zapytanie',
  },
  'fe-description-18': {
    ua: 'Ця опора стола має основу товщиною 6 мм. Її конструкція виконана у формі перехрещених елементів, що додає їй оригінальності та сучасного вигляду. Такий дизайн забезпечує високу стійкість і надійність, роблячи опору підходящою для використання з великими та важкими стільницями. Опора пофарбована порошковою фарбою, що додає їй додаткового захисту та довговічності.',

    en: 'This table support has a 6 mm thick base. Its design features intersecting elements, adding originality and a modern look. This design ensures high stability and reliability, making the support suitable for use with large and heavy tabletops. The support is powder-coated, providing additional protection and durability.',

    de: 'Diese Tischstütze hat eine 6 mm dicke Basis. Ihre Konstruktion besteht aus sich kreuzenden Elementen, was ihr Originalität und ein modernes Aussehen verleiht. Dieses Design gewährleistet eine hohe Stabilität und Zuverlässigkeit und macht die Stütze für den Einsatz mit großen und schweren Tischplatten geeignet. Die Stütze ist pulverbeschichtet, was zusätzlichen Schutz und Langlebigkeit bietet.',

    pl: 'Ten wspornik stołu ma podstawę o grubości 6 mm. Jego konstrukcja charakteryzuje się przecinającymi się elementami, co nadaje mu oryginalności i nowoczesnego wyglądu. Taki design zapewnia wysoką stabilność i niezawodność, co czyni wspornik odpowiednim do stosowania z dużymi i ciężkimi blatami. Wspornik jest malowany proszkowo, co zapewnia dodatkową ochronę i trwałość.',
  },

  'news-index-1': {
    ua: 'Тендер на закупівлю обладнання!',
    en: 'Tender for equipment procurement!',
    de: 'Ausschreibung für den Einkauf von Ausrüstung!',
    pl: 'Przetarg na zakup sprzętu!',
  },

  'news-up': {
    ua: 'Вгору',
    en: 'Up',
    de: 'Nach oben',
    pl: 'Do góry',
  },

  'news-index-2': {
    ua: 'Підприємство має на меті закупити обладнання, а саме: Лазер листовий Bodor Laser C3 3000 W Maxphotonics. Вартість має бути вказана з ПДВ. Прохання комерційні пропозиції надсилати на електронну пошту:',
    en: 'The company aims to purchase equipment, specifically: Sheet laser Bodor Laser C3 3000 W Maxphotonics. The price must be indicated with VAT. Please send commercial offers to the email:',
    de: 'Das Unternehmen beabsichtigt, Ausrüstung zu kaufen, und zwar: Blechlaser Bodor Laser C3 3000 W Maxphotonics. Der Preis muss inklusive Mehrwertsteuer angegeben werden. Bitte senden Sie Ihre kommerziellen Angebote per E-Mail an:',
    pl: 'Firma zamierza zakupić sprzęt, a mianowicie: laser do cięcia blach Bodor Laser C3 3000 W Maxphotonics. Cena musi być podana z VAT. Prosimy o przesyłanie ofert handlowych na adres e-mail:',
  },

  'news-index-3': {
    ua: 'Тендер на закупівлю обладнання!',
    en: 'Tender for equipment procurement!',
    de: 'Ausschreibung für den Einkauf von Ausrüstung!',
    pl: 'Przetarg na zakup sprzętu!',
  },

  'news-index-4': {
    ua: 'Підприємство має на меті закупити обладнання, а саме: Гідравлічний трубогинний верстат CNC 3D 50 4Axes-2Radius Maxphotonics. Вартість має бути вказана з ПДВ. Прохання комерційні пропозиції надсилати на електронну пошту:',
    en: 'The company aims to purchase equipment, specifically: Hydraulic pipe bending machine CNC 3D 50 4Axes-2Radius Maxphotonics. The price must be indicated with VAT. Please send commercial offers to the email:',
    de: 'Das Unternehmen beabsichtigt, Ausrüstung zu kaufen, und zwar: Hydraulische Rohrbiegemaschine CNC 3D 50 4Axes-2Radius Maxphotonics. Der Preis muss inklusive Mehrwertsteuer angegeben werden. Bitte senden Sie Ihre kommerziellen Angebote per E-Mail an:',
    pl: 'Firma zamierza zakupić sprzęt, a mianowicie: hydrauliczna giętarka do rur CNC 3D 50 4Axes-2Radius Maxphotonics. Cena musi być podana z VAT. Prosimy o przesyłanie ofert handlowych na adres e-mail:',
  },

  'news-index-5': {
    ua: 'Більше новин',
    en: 'More news',
    de: 'Mehr Nachrichten',
    pl: 'Więcej wiadomości',
  },

  'news-index-6': {
    ua: 'Від ідеї до результату - Інтерв`ю з керівником',
    en: 'From Idea to Result - An Interview with the Director',
    de: 'Von der Idee zum Ergebnis - Ein Interview mit dem Geschäftsführer',
    pl: 'Od pomysłu do rezultatu - Wywiad z dyrektorem',
  },

  'news-index-7': {
    ua: 'У інтерв`ю ви дізнаєтесь про унікальні можливості компанії АрмаксМГ, такі як лазерна порізка, гнуття, механічна обробка, порошкове фарбування та зварювання металу. АрмаксМГ продовжує працювати і розвиватись, незважаючи на виклики війни, отримуючи нові замовлення та підтримку у вигляді грантів від USAID.',
    en: 'In the interview, you will learn about the unique capabilities of ArmaxMG, such as laser cutting, bending, machining, powder coating, and metal welding. ArmaxMG continues to operate and grow despite the challenges of the war, receiving new orders and support in the form of grants from USAID.',
    de: 'Im Interview erfahren Sie mehr über die einzigartigen Möglichkeiten von ArmaxMG, wie Laserschneiden, Biegen, mechanische Bearbeitung, Pulverbeschichtung und Metallschweißen. ArmaxMG arbeitet und wächst trotz der Herausforderungen des Krieges weiter, erhält neue Aufträge und Unterstützung in Form von Zuschüssen von USAID.',
    pl: 'W wywiadzie dowiesz się o unikalnych możliwościach ArmaxMG, takich jak cięcie laserowe, gięcie, obróbka mechaniczna, malowanie proszkowe i spawanie metali. ArmaxMG nadal działa i rozwija się pomimo wyzwań wojennych, otrzymując nowe zamówienia i wsparcie w postaci grantów od USAID.',
  },

  'news-index-8': {
    ua: 'ArmaxMG: Технології за хвилину',
    en: 'ArmaxMG: Technology in a Minute',
    de: 'ArmaxMG: Technologie in einer Minute',
    pl: 'ArmaxMG: Technologia w minutę',
  },

  'news-index-9': {
    ua: 'Погляньте на роботу нашої команди у виробничому процесі! Коротке відео з дрона і землі показує моменти, де працівники демонструють професіоналізм і взаємодію з сучасним обладнанням. Відчуйте атмосферу, де людські вміння та інновації об`єднуються для створення якісних продуктів!',
    en: 'Take a look at our team in action during the production process! A short video captured by drone and from the ground showcases moments where employees demonstrate professionalism and interact with modern equipment. Feel the atmosphere where human skills and innovation come together to create quality products!',
    de: 'Werfen Sie einen Blick auf die Arbeit unseres Teams im Produktionsprozess! Ein kurzes Video, aufgenommen mit einer Drohne und vom Boden aus, zeigt Momente, in denen Mitarbeiter Professionalität zeigen und mit moderner Ausrüstung interagieren. Spüren Sie die Atmosphäre, in der menschliche Fähigkeiten und Innovationen zur Herstellung hochwertiger Produkte zusammenkommen!',
    pl: 'Zobacz nasz zespół w akcji podczas procesu produkcyjnego! Krótkie wideo nagrane dronem i z ziemi pokazuje momenty, w których pracownicy wykazują profesjonalizm i współpracują z nowoczesnym sprzętem. Poczuj atmosferę, gdzie ludzkie umiejętności i innowacje łączą się, aby tworzyć wysokiej jakości produkty!',
  },

  'news-index-10': {
    ua: 'Незабаром відкриття нового цеху АрмаксМГ!',
    en: 'The grand opening of a new ArmaxMG workshop is coming soon!',
    de: 'Die Eröffnung einer neuen Werkstatt von ArmaxMG steht bevor!',
    pl: 'Wkrótce wielkie otwarcie nowego warsztatu ArmaxMG!',
  },

  'news-index-11': {
    ua: 'Ми раді поділитися чудовою новиною — незабаром відбудеться відкриття п`ятого цеху Армакс МГ! Новий цех оснащено сучасним лазерним труборізом, який значно розширить наші виробничі можливості та дозволить виконувати ще більш складні завдання з високою точністю. На нашому сайті ви зможете побачити весь процес створення цього цеху: від початкового будівництва до запуску інноваційного обладнання. Долучайтеся до історії розвитку Армакс МГ разом із нами!',
    en: 'We are excited to share great news — the fifth Armax MG workshop is opening soon! The new workshop is equipped with a state-of-the-art laser tube cutter, which will significantly expand our production capabilities and enable us to perform even more complex tasks with exceptional precision. On our website, you will be able to see the entire process of creating this workshop: from the initial construction to the launch of innovative equipment. Join us in the journey of Armax MG`s growth!',
    de: 'Wir freuen uns, großartige Neuigkeiten zu teilen – bald wird die fünfte Werkstatt von Armax MG eröffnet! Die neue Werkstatt ist mit einem hochmodernen Laserschneider für Rohre ausgestattet, der unsere Produktionsmöglichkeiten erheblich erweitert und es uns ermöglicht, noch komplexere Aufgaben mit höchster Präzision zu erledigen. Auf unserer Website können Sie den gesamten Prozess der Entstehung dieser Werkstatt verfolgen: von der anfänglichen Konstruktion bis hin zur Inbetriebnahme innovativer Geräte. Seien Sie Teil der Erfolgsgeschichte von Armax MG!',
    pl: 'Cieszymy się, że możemy podzielić się wspaniałą wiadomością — już wkrótce otwarcie piątego warsztatu Armax MG! Nowy warsztat wyposażony jest w nowoczesny laser do cięcia rur, który znacząco rozszerzy nasze możliwości produkcyjne i pozwoli realizować jeszcze bardziej skomplikowane zadania z wyjątkową precyzją. Na naszej stronie internetowej będziecie mogli zobaczyć cały proces tworzenia tego warsztatu: od początkowej budowy po uruchomienie innowacyjnego sprzętu. Dołączcie do historii rozwoju Armax MG razem z nami!',
  },

  'calc-1': {
    ua: 'Залишилися запитання? Залиште свої дані, ми з Вами зв`яжемося!',
    en: 'Have any questions? Leave your details, and we will contact you!',
    de: 'Haben Sie Fragen? Hinterlassen Sie Ihre Daten, und wir werden uns mit Ihnen in Verbindung setzen!',
    pl: 'Masz pytania? Zostaw swoje dane, a my się z Tobą skontaktujemy!',
  },

  'calc-2': {
    ua: 'Напишіть',
    en: 'Write',
    de: 'Schreiben',
    pl: 'Napisz',
  },
  'calc-3': {
    ua: 'нам',
    en: 'to us',
    de: 'uns',
    pl: 'do nas',
  },
  'modal-1': {
    ua: "Зворотній зв'язок",
    en: 'Feedback',
    de: 'Rückmeldung',
    pl: 'Opinie',
  },
  'modal-2': {
    ua: 'Залиште Ваш номер телефону, або електрону адресу, і наш менеджер якнайшвидше звʼяжеться з Вами!',
    en: 'Leave your phone number or email address, and our manager will contact you as soon as possible!',
    de: 'Hinterlassen Sie Ihre Telefonnummer oder E-Mail-Adresse, und unser Manager wird sich so schnell wie möglich mit Ihnen in Verbindung setzen!',
    pl: 'Zostaw swój numer telefonu lub adres e-mail, a nasz menedżer skontaktuje się z Tobą jak najszybciej!',
  },
  'modal-3': {
    ua: 'Відправити запит',
    en: 'Send Request',
    de: 'Anfrage senden',
    pl: 'Wyślij zapytanie',
  },
  'modal-4': {
    ua: 'телефон або e-mail',
    en: 'phone or email',
    de: 'Telefon oder E-Mail',
    pl: 'telefon lub e-mail',
  },

  // -------news

  'article-news-1': {
    ua: 'Як обрати металеві елементи для комерційного простору: від меблів до декору',
    en: 'How to choose metal elements for a commercial space: from furniture to decor',
    de: 'Wie man Metallelemente für gewerbliche Räume auswählt: von Möbeln bis hin zur Dekoration',
    pl: 'Jak wybrać metalowe elementy do przestrzeni komercyjnej: od mebli po dekoracje',
  },
  'article-news-2': {
    ua: 'Сучасний дизайн комерційних приміщень усе більше звертається до металу як до ключового матеріалу. Його використовують для створення меблів, декору та функціональних елементів, що відповідають стилю лофт, який набув великої популярності завдяки своїй індустріальній естетиці. Як компанія, що спеціалізується на обробці металів та виготовленні металевих деталей, ми хочемо поділитися порадами щодо вибору оптимальних металевих елементів для вашого простору.',
    en: 'Modern commercial space design increasingly turns to metal as a key material. It is used to create furniture, decor, and functional elements that fit the loft style, which has gained great popularity thanks to its industrial aesthetic. As a company specializing in metalworking and manufacturing metal parts, we would like to share tips on choosing the best metal elements for your space.',
    de: 'Das moderne Design von Geschäftsräumen greift immer mehr auf Metall als Schlüsselmaterial zurück. Es wird zur Herstellung von Möbeln, Dekorationen und funktionalen Elementen verwendet, die dem Loft-Stil entsprechen, der dank seiner industriellen Ästhetik große Popularität erlangt hat. Als Unternehmen, das auf die Metallbearbeitung und die Herstellung von Metallelementen spezialisiert ist, möchten wir Ihnen einige Tipps zur Auswahl der besten Metallelemente für Ihren Raum geben.',
    pl: 'Nowoczesny projekt przestrzeni komercyjnych coraz częściej sięga po metal jako kluczowy materiał. Wykorzystuje się go do tworzenia mebli, dekoracji i elementów funkcjonalnych, które wpisują się w styl loftowy, cieszący się dużą popularnością dzięki swojej industrialnej estetyce. Jako firma specjalizująca się w obróbce metalu i produkcji metalowych elementów, chcemy podzielić się wskazówkami dotyczącymi wyboru najlepszych metalowych elementów do Twojej przestrzeni.',
  },
  'article-news-3': {
    ua: 'Переваги металевих елементів',
    en: 'Advantages of metal elements',
    de: 'Vorteile von Metallelementen',
    pl: 'Zalety metalowych elementów',
  },
  'article-news-4': {
    ua: 'Метал є ідеальним матеріалом для комерційних приміщень завдяки своїм ключовим перевагам:',
    en: 'Metal is the ideal material for commercial spaces due to its key advantages:',
    de: 'Metall ist das ideale Material für gewerbliche Räume aufgrund seiner wesentlichen Vorteile:',
    pl: 'Metal jest idealnym materiałem do przestrzeni komercyjnych ze względu na swoje kluczowe zalety:',
  },
  'article-news-5': {
    ua: 'Міцність і надійність:',
    en: 'Strength and reliability:',
    de: 'Festigkeit und Zuverlässigkeit:',
    pl: 'Wytrzymałość i niezawodność:',
  },
  'article-news-6': {
    ua: 'Металеві елементи можуть витримувати значні навантаження, що є важливим для меблів і конструкцій у комерційних просторах.',
    en: 'Metal elements can withstand significant loads, which is important for furniture and structures in commercial spaces.',
    de: 'Metallelemente können erhebliche Belastungen aushalten, was für Möbel und Konstruktionen in gewerblichen Räumen von Bedeutung ist.',
    pl: 'Metalowe elementy mogą wytrzymać znaczne obciążenia, co jest istotne dla mebli i konstrukcji w przestrzeniach komercyjnych.',
  },
  'article-news-7': {
    ua: 'Стійкість до зносу:',
    en: 'Durability:',
    de: 'Langlebigkeit:',
    pl: 'Trwałość:',
  },
  'article-news-8': {
    ua: 'Метал не боїться фізичних ушкоджень та впливу вологи, що робить його ідеальним для використання в різних умовах.',
    en: 'Metal is resistant to physical damage and moisture, making it ideal for use in various conditions.',
    de: 'Metall ist unempfindlich gegenüber physischen Beschädigungen und Feuchtigkeit, was es ideal für den Einsatz unter verschiedenen Bedingungen macht.',
    pl: 'Metal jest odporny na uszkodzenia fizyczne i wilgoć, co czyni go idealnym do wykorzystania w różnych warunkach.',
  },
  'article-news-10': {
    ua: 'Металеві деталі надають простору сучасного, індустріального вигляду, який підходить для різних інтер’єрів, особливо у стилі лофт.',
    en: 'Metal details give the space a modern, industrial look that fits various interiors, especially in the loft style.',
    de: 'Metallelemente verleihen dem Raum ein modernes, industrielles Aussehen, das zu verschiedenen Innenräumen passt, insbesondere im Loft-Stil.',
    pl: 'Metalowe detale nadają przestrzeni nowoczesny, industrialny wygląd, który pasuje do różnych wnętrz, szczególnie w stylu loftowym.',
  },
};

// Перевіряємо шлях сторінки і задаємо текстові змінні
function checkPagePathName() {
  switch (currentPathName) {
    case '/index.html':
      currentText = homeTexts;
      break;
    default:
      currentText = homeTexts;
      break;
  }
}
checkPagePathName();

// Функція для зміни мови
function changeLang() {
  checkPagePathName(); // Оновлення поточного тексту залежно від шляху сторінки
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
changeLang();

// Додаємо обробники подій на кнопки мов
langButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    currentLang = event.target.dataset.btn;
    localStorage.setItem('language', event.target.dataset.btn);
    resetActiveClass(langButtons, 'header__btn_active');
    btn.classList.add('header__btn_active');
    changeLang();
  });
});

// Функція для скидання активного класу
function resetActiveClass(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}

// Функція для перевірки та активації кнопки мови
function checkActiveLangButton() {
  const savedLang = localStorage.getItem('language') || 'ua'; // За замовчуванням 'ua'
  currentLang = savedLang;
  document
    .querySelector(`[data-btn="${savedLang}"]`)
    .classList.add('header__btn_active');
  changeLang(); // Оновлюємо текст відповідно до збереженої мови
}
checkActiveLangButton();

// Перевірка мови браузера
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
// Функція для перевірки та активації кнопки мови
function checkActiveLangButton() {
  const savedLang = localStorage.getItem('language') || 'ua'; // За замовчуванням 'ua'
  currentLang = savedLang;

  // Знаходимо всі кнопки для вибору мови
  const langButtons = document.querySelectorAll('[data-btn]');

  // Скидаємо активний клас для всіх кнопок
  langButtons.forEach((btn) => {
    btn.classList.remove('header__btn_active');
  });

  // Додаємо активний клас до відповідних кнопок
  document.querySelectorAll(`[data-btn="${savedLang}"]`).forEach((btn) => {
    btn.classList.add('header__btn_active');
  });

  changeLang(); // Оновлюємо текст відповідно до збереженої мови
}

// Перевірка мови при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
  checkActiveLangButton();
});

// Додаємо обробники подій на всі кнопки мов
document.querySelectorAll('[data-btn]').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    currentLang = event.target.dataset.btn;
    localStorage.setItem('language', event.target.dataset.btn);
    checkActiveLangButton(); // Перевіряємо та оновлюємо активну кнопку
  });
});
