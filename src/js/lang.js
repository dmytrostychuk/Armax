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
  },
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
  'nav_page-4': {
    ua: 'Продукти',
    en: 'Products',
    de: 'Produkte',
  },
  'nav_page-5': {
    ua: 'СГ обладнання',
    en: 'AG equipment',
    de: 'AG Ausrüstung',
  },
  'nav_page-5-1': {
    ua: 'СГ обладнання',
    en: 'AG equipment',
    de: 'AG Ausrüstung',
  },
  'nav_page-6': {
    ua: 'Меблеві елементи',
    en: 'Furniture elements',
    de: 'Möbelelemente',
  },
  'nav_page-6-1': {
    ua: 'Меблеві елементи',
    en: 'Furniture elements',
    de: 'Möbelelemente',
  },
  'nav_page-7': {
    ua: 'Елементи декору',
    en: 'Decor elements',
    de: 'Dekorelemente',
  },
  'nav_page-7-1': {
    ua: 'Елементи декору',
    en: 'Decor elements',
    de: 'Dekorelemente',
  },
  'nav_page-8': {
    ua: 'Індивідуальні замовлення',
    en: 'Custom orders ',
    de: 'Individuelle Bestellungen',
  },
  'nav_page-8-1': {
    ua: 'Індивідуальні замовлення',
    en: 'Custom orders ',
    de: 'Individuelle Bestellungen',
  },
  'nav_page-9': {
    ua: 'Новини',
    en: 'News',
    de: 'Nachrichten',
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
    en: 'and finishes of varying complexity.',
    de: 'und beschichtungen unterschiedlicher Komplexität.',
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
    ua: 'Наші продукти',
    en: 'Our products',
    de: 'Unsere Produkte',
  },
  'wara_page-2': {
    ua: 'Меблеві елементи',
    en: 'Furniture elements',
    de: 'Möbelelemente',
  },

  'wara_page-2-1': {
    ua: 'Меблеві елементи',
    en: 'Furniture elements',
    de: 'Möbelelemente',
  },
  'wara_page-3': {
    ua: 'СГ обладнання',
    en: 'Agricultural equipment',
    de: 'Landwirtschaftliche Ausrüstung',
  },

  'wara_page-3-1': {
    ua: 'СГ обладнання',
    en: 'Agricultural equipment',
    de: 'Landwirtschaftliche Ausrüstung',
  },
  'wara_page-4': {
    ua: 'Елементи декору',
    en: 'Decorative elements',
    de: 'Dekorative Elemente',
  },
  'wara_page-4-1': {
    ua: 'Елементи декору',
    en: 'Decorative elements',
    de: 'Dekorative Elemente',
  },
  'wara_page-5': {
    ua: 'Індивідуальні проекти',
    en: 'Custom projects',
    de: 'Individuelle Projekte',
  },
  'wara_page-5-1': {
    ua: 'Індивідуальні проекти та декоративні елементи',
    en: 'Custom projects',
    de: 'Individuelle Projekte',
  },
  'wara_page-6': {
    ua: 'Новини',
    en: 'News',
    de: 'Nachrichten',
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
    ua: 'Ваше ім`я:',
    en: 'Your name:',
    de: 'Ihr Name:',
  },
  'calculation_page-5': {
    ua: 'Електронна пошта:',
    en: 'E-mail:',
    de: 'E-mail:',
  },
  'calculation_page-6': {
    ua: 'Коментар до замовлення:',
    en: 'Order comment:',
    de: 'Bestellkommentar:',
  },

  'calculation_page-7': {
    ua: 'Телефон:',
    en: 'Phone:',
    de: 'Telefon:',
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

  'footer_page-6-1': {
    ua: 'Лазерна порізка',
    en: 'Laser cutting',
    de: 'Laser-Schneiden',
  },
  'footer_page-7': {
    ua: 'Гнуття деталей',
    en: 'Bending of parts',
    de: 'Biegen von Teilen',
  },
  'footer_page-7-1': {
    ua: 'Гнуття деталей',
    en: 'Bending of parts',
    de: 'Biegen von Teilen',
  },
  'footer_page-8': {
    ua: 'Порошкове фарбування',
    en: 'Powder coating',
    de: 'Pulverbeschichtung',
  },
  'footer_page-8-1': {
    ua: 'Порошкове фарбування',
    en: 'Powder coating',
    de: 'Pulverbeschichtung',
  },
  'footer_page-9': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
  },
  'footer_page-9-1': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
  },
  'footer_page-10': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
  },
  'footer_page-10-1': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
  },
  'footer_page-11-1': {
    ua: 'Механічна обробка',
    en: 'Mechanical processing',
    de: 'Mechanische Bearbeitung',
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
  'footer_page-15': {
    ua: 'Новини',
    en: 'News',
    de: 'Nachrichten',
  },
  'footer_page-16': {
    ua: 'Продукти',
    en: 'Products',
    de: 'Produkte',
  },
  'footer_page-17': {
    ua: 'Механічна обробка',
    en: 'Mechanical Processing',
    de: 'Mechanische Bearbeitung',
  },
  //---------about us
  'header-content_page-1': {
    ua: 'Коротко про нас',
    en: 'About us',
    de: 'Über uns',
  },
  'header-content_page-2': {
    ua: 'Armax MG – сучасне та технологічно-оснащене українське виробництво, спеціалізуємось на металообробці з 2018 року. Надаємо повний комплекс послуг з обробки металу: лазерного різання, згинання, зварювання металевих виробів та фарбування.',
    en: 'Armax MG is a modern and technologically equipped Ukrainian manufacturing company specializing in metal processing since 2018. We provide a full range of metal processing services including laser cutting, bending, welding of metal products, and painting.',
    de: 'Armax MG ist ein modernes und technologisch ausgestattetes ukrainisches Produktionsunternehmen, das sich seit 2018 auf die Metallverarbeitung spezialisiert hat. Wir bieten eine umfassende Palette von Metallverarbeitungsdienstleistungen an, darunter Laserschneiden, Biegen, Schweißen von Metallprodukten und Lackieren.',
  },
  'a-privilege_page-1': {
    ua: 'Чому нас обирають?',
    en: 'Why choose us?',
    de: 'Warum uns wählen?',
  },
  'a-privilege_page-2': {
    ua: 'Висока якість',
    en: 'High quality',
    de: 'Hohe Qualität',
  },
  'a-privilege_page-3': {
    ua: 'Дотримуємось найвищих стандартів якості у всіх аспектах бізнесу та постійно вдосконалюємо процеси.',
    en: 'We adhere to the highest quality standards in all aspects of our business and continuously improve our processes.',
    de: 'Wir halten uns in allen Bereichen unseres Geschäfts an die höchsten Qualitätsstandards und verbessern ständig unsere Prozesse.',
  },
  'a-privilege_page-4': {
    ua: 'Дотримуємося термінів',
    en: 'We adhere to deadlines',
    de: 'Wir halten Termine ein',
  },
  'a-privilege_page-5': {
    ua: 'Гарантуємо стабільність та надійність у виконанні своїх зобов`язань.',
    en: 'We guarantee stability and reliability in fulfilling our obligations.',
    de: 'Wir garantieren Stabilität und Zuverlässigkeit bei der Erfüllung unserer Verpflichtungen.',
  },
  'a-privilege_page-6': {
    ua: 'Уважні до клієнта',
    en: 'Attentive to the client',
    de: 'Aufmerksam gegenüber dem Kunden',
  },
  'a-privilege_page-7': {
    ua: 'Враховуємо та задовільняємо потреби та побажання клієнтів.',
    en: 'We take into account and satisfy the needs and wishes of our clients.',
    de: 'Wir berücksichtigen und erfüllen die Bedürfnisse und Wünsche unserer Kunden.',
  },
  'a-privilege_page-8': {
    ua: 'Знаходимо рішення',
    en: 'We find solutions',
    de: 'Wir finden Lösungen',
  },
  'a-privilege_page-9': {
    ua: 'Швидко та ефективно знаходитмо оптимальні рішення.',
    en: 'We quickly and efficiently find optimal solutions.',
    de: 'Wir finden schnell und effizient optimale Lösungen.',
  },
  'a-privilege_page-10': {
    ua: 'Як ми працюємо?',
    en: 'How do we work?',
    de: 'Wie arbeiten wir?',
  },
  'a-privilege_page-11': {
    ua: 'Ви залишаєте заявку на розрахунок чи консультацію фахівця',
    en: 'You submit a request for an estimate or consultation with a specialist',
    de: 'Sie geben eine Anfrage für eine Schätzung oder Beratung durch einen Fachmann ab',
  },
  'a-privilege_page-12': {
    ua: 'Наш менеджер зв’язується з Вами для уточнення технічного завдання',
    en: 'Our manager contacts you to clarify the technical task',
    de: 'Unser Manager setzt sich mit Ihnen in Verbindung, um die technische Aufgabe zu klären',
  },
  'a-privilege_page-13': {
    ua: 'Ви отримуєте прорахунок по проекту не більше ніж за 3 робочі дні',
    en: 'You will receive the project estimate in no more than 3 business days',
    de: 'Sie erhalten die Projektabschätzung innerhalb von höchstens 3 Arbeitstagen',
  },
  'a-privilege_page-14': {
    ua: 'Виготовлення та затвердження Вашого зразка',
    en: 'Manufacturing and approval of your sample',
    de: 'Herstellung und Genehmigung Ihres Musters',
  },
  'a-privilege_page-15': {
    ua: 'Укладання договору та погодження графіка відвантаження партій',
    en: 'Contract signing and scheduling of batch shipments',
    de: 'Vertragsunterzeichnung und Terminierung der Chargenlieferungen',
  },
  'a-privilege_page-16': {
    ua: 'Запуск партії виробів у роботу, згідно з термінами відвантаження',
    en: 'Launching production batches according to shipment deadlines',
    de: 'Starten der Produktionschargen gemäß den Lieferfristen',
  },
  //------------contacts
  'c-header_page-1': {
    ua: 'Наші контакти',
    en: 'Our contacts',
    de: 'Unsere Kontakte',
  },
  'c-header_page-2': {
    ua: 'Ми завжди раді з Вами поспілкуватися.',
    en: 'We are always happy to communicate with you.',
    de: 'Wir freuen uns immer, mit Ihnen zu kommunizieren.',
  },
  'c-header_page-3': {
    ua: 'Телефон:',
    en: 'Phone:',
    de: 'Telefon:',
  },
  'c-header_page-4': {
    ua: 'Адреса:',
    en: 'Address:',
    de: 'Adresse:',
  },
  'c-header_page-5': {
    ua: 'Email:',
    en: 'Email:',
    de: 'E-Mail:',
  },
  'c-header_page-6': {
    ua: 'Бухгалтерський відділ:',
    en: 'Accounting department:',
    de: 'Buchhaltungsabteilung:',
  },
  'c-header_page-7': {
    ua: 'Відділ постачання:',
    en: 'Supply department:',
    de: 'Beschaffungsabteilung:',
  },
  'c-header_page-8': {
    ua: 'Графік роботи:',
    en: 'Working hours:',
    de: 'Öffnungszeiten:',
  },
  'c-header_page-9': {
    ua: 'Пн - Пт 8:00 - 17:00',
    en: 'Mon - Fri 8:00 - 17:00',
    de: 'Mo - Fr 8:00 - 17:00',
  },
  'c-calc_page-1': {
    ua: 'Ваше ім`я *',
    en: 'Your name *',
    de: 'Ihr Name *',
  },
  'c-calc_page-2': {
    ua: 'Сергій',
    en: 'Sergiy',
    de: 'Sergiy',
  },
  'c-calc_page-3': {
    ua: 'Ваш телефон *',
    en: 'Your phone number *',
    de: 'Ihre Telefonnummer *',
  },
  'c-calc_page-4': {
    ua: 'Ваш email *',
    en: 'Your email *',
    de: 'Ihre E-Mail *',
  },
  //----------dyeing
  'd-header_page-1': {
    ua: 'Порошкове фарбування металу',
    en: 'Powder coating of metal',
    de: 'Pulverbeschichtung von Metall',
  },
  'd-header_page-2': {
    ua: 'Наша компанія надає послуги з порошкового фарбування металу на сучасному обладнанні, за вигідними цінами та у погоджені терміни',
    en: 'Our company provides metal powder coating services using modern equipment, at competitive prices, and within agreed deadlines',
    de: 'Unser Unternehmen bietet Pulverbeschichtungsdienste für Metall an, die mit modernen Geräten zu wettbewerbsfähigen Preisen und innerhalb vereinbarter Fristen durchgeführt werden',
  },
  'd-header_page-3': {
    ua: 'Основні характеристики порошкового фарбування Armax MG',
    en: 'Key characteristics of Armax MG powder coating',
    de: 'Hauptmerkmale der Pulverbeschichtung Armax MG',
  },
  'd-header_page-4': {
    ua: 'Габарит камери обпалу:',
    en: 'Baking chamber dimensions:',
    de: 'Abmessungen der Backkammer:',
  },
  'd-header_page-5': {
    ua: 'становить (ДхШхВ):',
    en: 'are (WxHxD):',
    de: 'sind (BxHxT):',
  },
  'd-header_page-16': {
    ua: '2500х1500х1000 мм.',
    en: '2500x1500x1000 mm.',
    de: '2500x1500x1000 mm.',
  },
  'd-header_page-7': {
    ua: 'Товщина шару нанесення:',
    en: 'Coating thickness:',
    de: 'Beschichtungsdicke:',
  },
  'd-header_page-8': {
    ua: 'становить від',
    en: 'is from',
    de: 'ist von',
  },
  'd-header_page-9': {
    ua: 'до',
    en: 'to',
    de: 'bis',
  },
  'd-header_page-10': {
    ua: 'Температура запікання фарби:',
    en: 'Paint baking temperature:',
    de: 'Backtemperatur der Farbe:',
  },
  'd-header_page-11': {
    ua: 'становить від',
    en: 'is from',
    de: 'ist von',
  },
  'd-header_page-12': {
    ua: 'до',
    en: 'to',
    de: 'bis',
  },
  'd-header_page-13': {
    ua: 'Максимальна вага деталі:',
    en: 'Maximum part weight:',
    de: 'Maximales Teilegewicht:',
  },
  'd-header_page-14': {
    ua: 'становить',
    en: 'is',
    de: 'ist',
  },
  'd-header_page-15': {
    ua: '100кг',
    en: '100kg',
    de: '100kg',
  },

  'd-header_page-17': {
    ua: ' 60 ',
    en: ' 60 ',
    de: ' 60 ',
  },
  'd-header_page-18': {
    ua: ' 200 мкм.',
    en: ' 200 microns.',
    de: ' 200 Mikrometer.',
  },
  'd-header_page-19': {
    ua: '150°',
    en: '150°',
    de: '150°',
  },
  'd-header_page-20': {
    ua: '240°',
    en: '240°',
    de: '240°',
  },

  'd-price_page-1': {
    ua: 'Ціна фарбування металу',
    en: 'Metal painting price',
    de: 'Metalllackierungspreis',
  },
  'd-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості послуг фарбування та терміни виконання замовлення, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги із фарбування визначається за такими основними критеріями як:',
    en: 'In order for us to make an accurate calculation of the cost of painting services and the timing of order fulfillment, we need to receive from you full information about the product, detailed technical specifications or drawings. Prices for painting services are determined by such basic criteria as:',
    de: 'Um eine genaue Kalkulation der Kosten für Lackierdienstleistungen und die Termine für die Auftragsabwicklung vornehmen zu können, benötigen wir von Ihnen vollständige Informationen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Die Preise für Lackierdienstleistungen werden anhand solcher grundlegender Kriterien bestimmt wie:',
  },
  'd-price_page-4': {
    ua: 'Площа фарбування;',
    en: 'Painting area;',
    de: 'Lackierfläche;',
  },
  'd-price_page-5': {
    ua: 'Геометрична форма виробу;',
    en: 'Geometric shape of the product;',
    de: 'Geometrische Form des Produkts;',
  },
  'd-price_page-6': {
    ua: 'Ступінь готовності поверхні до фарбування;',
    en: 'Surface readiness for painting;',
    de: 'Oberflächenbereitschaft für die Lackierung;',
  },
  'd-price_page-7': {
    ua: 'Габаритні розміри;',
    en: 'Overall dimensions;',
    de: 'Gesamtabmessungen;',
  },
  'd-price_page-8': {
    ua: 'Матеріал виготовлення;',
    en: 'Material of manufacture;',
    de: 'Herstellungsmaterial;',
  },
  //------------lazer
  'l-header_page-1': {
    ua: 'Лазерна різка металу',
    en: '',
    de: '',
  },
  'l-header_page-2': {
    ua: 'Лазерна різка металу – один з найбільш сучасних, ефективних, високоточних і економічно вигідних способів розкрою та порізки різних металів.',
    en: '',
    de: '',
  },
  'l-header_page-1': {
    ua: 'Лазерна різка металу',
    en: 'Metal laser cutting',
    de: 'Metall-Laserschneiden',
  },
  'l-header_page-2': {
    ua: 'Лазерна різка металу – один з найбільш сучасних, ефективних, високоточних і економічно вигідних способів розкрою та порізки різних металів.',
    en: 'Metal laser cutting is one of the most modern, efficient, precise, and economically advantageous methods of cutting various metals.',
    de: 'Das Laserschneiden von Metall ist eine der modernsten, effizientesten, präzisesten und wirtschaftlich vorteilhaftesten Methoden zum Schneiden verschiedener Metalle.',
  },
  'l-char_page-1': {
    ua: 'Основні характеристики лазерного різання металу Armax MG',
    en: 'Main characteristics of Armax MG metal laser cutting',
    de: 'Hauptmerkmale des Metall-Laserschneidens Armax MG',
  },
  'l-char_page-2': {
    ua: 'Ermaxan FIBERMAK (Турція)',
    en: 'Ermaxan FIBERMAK (Turkey)',
    de: 'Ermaxan FIBERMAK (Türkei)',
  },
  'l-char_page-3': {
    ua: 'Максимальні розміри листа:',
    en: 'Maximum sheet dimensions:',
    de: 'Maximale Blechabmessungen:',
  },
  'l-char_page-4': {
    ua: 'Розмір робочої поверхні –',
    en: 'Work surface size -',
    de: 'Arbeitsflächengröße -',
  },
  'l-char_page-5': {
    ua: '6000 × 2000мм',
    en: '6000 × 2000mm',
    de: '6000 × 2000mm',
  },
  'l-char_page-6': {
    ua: 'Максимальна товщина різу:',
    en: 'Maximum cutting thickness:',
    de: 'Maximale Schnittstärke:',
  },
  'l-char_page-7': {
    ua: 'Чорний метал:',
    en: 'Black metal:',
    de: 'Schwarzes Metall:',
  },
  'l-char_page-8': {
    ua: ' 20 мм',
    en: ' 20 mm',
    de: ' 20 mm',
  },
  'l-char_page-9': {
    ua: 'Нержавіюча сталь:',
    en: 'Stainless steel:',
    de: 'Edelstahl:',
  },
  'l-char_page-10': {
    ua: '10 мм',
    en: '10 mm',
    de: '10 mm',
  },
  'l-char_page-11': {
    ua: 'Алюміній:',
    en: 'Aluminum:',
    de: 'Aluminium:',
  },
  'l-char_page-12': {
    ua: '6 мм',
    en: '6 mm',
    de: '6 mm',
  },
  'l-char_page-13': {
    ua: 'Точність позиціонування',
    en: 'Positioning accuracy',
    de: 'Positioniergenauigkeit',
  },
  'l-char_page-14': {
    ua: 'Точність позиціонування нашого лазера –',
    en: 'The positioning accuracy of our laser is -',
    de: 'Die Positioniergenauigkeit unseres Lasers beträgt -',
  },
  'l-char_page-15': {
    ua: '0,01 мм',
    en: '0.01 mm',
    de: '0,01 mm',
  },
  'l-price_page-1': {
    ua: 'Ціна лазерної різки металу',
    en: 'Metal laser cutting price',
    de: 'Preis für Metall-Laserschneiden',
  },
  'l-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості лазерного різання металу та терміни виконання послуги, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги лазерного різання визначається за такими основними критеріями як:',
    en: 'In order for us to make an accurate calculation of the cost of metal laser cutting and the timing of service execution, we need to receive from you full information about the product, detailed technical specifications or drawings. Prices for laser cutting services are determined by such basic criteria as:',
    de: 'Um eine genaue Kalkulation der Kosten für das Laserschneiden von Metall und die Termine für die Ausführung des Service vornehmen zu können, benötigen wir von Ihnen vollständige Informationen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Die Preise für Laserschneidedienste werden anhand solcher grundlegender Kriterien bestimmt wie:',
  },
  'l-price_page-3': {
    ua: 'Вид та марка металу який Вам потрібно порізати;',
    en: 'Type and brand of metal you need to cut;',
    de: 'Art und Marke des Metalls, das Sie schneiden müssen;',
  },
  'l-price_page-4': {
    ua: 'Обсяг замовлення;',
    en: 'Order volume;',
    de: 'Auftragsvolumen;',
  },
  'l-price_page-5': {
    ua: 'Складність робіт, залежно від деталі;',
    en: 'Complexity of work, depending on the detail;',
    de: 'Komplexität der Arbeit, abhängig vom Detail;',
  },
  'l-price_page-6': {
    ua: 'Давальницька чи власна сировина буде використовуватись в замовленні;',
    en: 'Supplier or own raw materials will be used in the order;',
    de: 'Lieferant oder eigene Rohstoffe werden für die Bestellung verwendet;',
  },
  'l-price_page-7': {
    ua: 'Строки виконання замовлення;',
    en: 'Order execution timeframes;',
    de: 'Auftragsausführungsfristen;',
  },
  //------------locksmith
  'ls-header-page-1': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
  },
  'ls-header-page-2': {
    ua: 'Наша компанія надає послуги зі cлюсарних роботи на сучасному обладнанні, за вигідними цінами та у погоджені терміни!',
    en: 'Our company provides locksmith services on modern equipment, at favorable prices and within agreed terms!',
    de: 'Unser Unternehmen bietet Schlosserdienstleistungen an modernen Geräten, zu günstigen Preisen und innerhalb vereinbarter Fristen!',
  },
  'ls-char-page-1': {
    ua: 'Основні види слюсарних робіт Armax MG',
    en: 'Main types of locksmith works at Armax MG',
    de: 'Haupttypen von Schlosserarbeiten bei Armax MG',
  },
  'ls-char-page-2': {
    ua: 'Зачищення швів після зварювання.',
    en: 'Cleaning weld seams.',
    de: 'Reinigung der Schweißnähte.',
  },
  'ls-char-page-3': {
    ua: 'Свердління отворів.',
    en: 'Drilling holes.',
    de: 'Bohren von Löchern.',
  },
  'ls-char-page-4': {
    ua: 'Стрічко пиляльні роботи.',
    en: 'Band sawing work.',
    de: 'Bandsägearbeit.',
  },
  'ls-price-page-1': {
    ua: 'Ціна зварювання металу',
    en: 'Metal welding price',
    de: 'Metallschweißpreis',
  },
  'ls-price-page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості',
    en: 'In order for us to make an accurate calculation of the cost',
    de: 'Damit wir eine genaue Berechnung des Preises vornehmen können',
  },
  'ls-price-page-3': {
    ua: 'слюсарних робіт',
    en: 'locksmith works',
    de: 'Schlosserarbeiten',
  },
  'ls-price-page-4': {
    ua: 'та терміни виконання послуги, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги',
    en: 'and the timing of the service, we need to receive full information from you about the product, detailed technical specifications, or drawings. Prices for services',
    de: 'und die Ausführungsfristen des Dienstes benötigen wir von Ihnen vollständige Informationen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Preise für Dienstleistungen',
  },
  'ls-price-page-5': {
    ua: 'слюсарних робіт',
    en: 'locksmith works',
    de: 'Schlosserarbeiten',
  },
  'ls-price-page-6': {
    ua: 'Cкладності робіт;',
    en: 'Work complexity;',
    de: 'Arbeitskomplexität;',
  },
  'ls-price-page-7': {
    ua: 'Виду металу;',
    en: 'Type of metal;',
    de: 'Metallart;',
  },
  'ls-price-page-8': {
    ua: 'Додаткових видів механічної обробки;',
    en: 'Additional types of mechanical processing;',
    de: 'Zusätzliche Arten mechanischer Bearbeitung;',
  },
  'ls-price-page-9': {
    ua: 'Строки виконання замовлення;',
    en: 'Order execution timeframes;',
    de: 'Auftragsausführungsfristen;',
  },
  'ls-price-page-10': {
    ua: 'визначається за такими основними критеріями як:',
    en: 'is determined by such basic criteria as:',
    de: 'wird anhand solcher grundlegender Kriterien bestimmt wie:',
  },
  's-header_pag-1': {
    ua: 'Наші послуги',
    en: 'Our services',
    de: 'Unsere Dienstleistungen',
  },
  's-services_page-1': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
  },
  's-services_page-2': {
    ua: 'Зварювання металу — це процес сплавлення двох металевих частин разом, із застосуванням тепла та тиску для утворення міцного зв`язку металу. Тепло генерується електричною дугою або полум`ям, а тиск прикладається за допомогою зварювального інструменту.',
    en: 'Metal welding is the process of melting two metal parts together, using heat and pressure to form a strong metal bond. Heat is generated by an electric arc or flame, and pressure is applied using a welding tool.',
    de: 'Metallschweißen ist der Prozess des Schmelzens zweier Metallteile zusammen unter Verwendung von Hitze und Druck zur Bildung einer starken Metallverbindung. Die Hitze wird durch einen Lichtbogen oder eine Flamme erzeugt, und der Druck wird mit einem Schweißwerkzeug ausgeübt.',
  },
  's-services_page-3': {
    ua: 'Детальніше',
    en: 'Learn more',
    de: 'Erfahren Sie mehr',
  },
  's-services_page-4': {
    ua: 'Слюсарні роботи',
    en: 'Locksmith works',
    de: 'Schlosserarbeiten',
  },
  's-services_page-5': {
    ua: 'Слюсарні роботи — це процес обробки металів, який зазвичай доповнює інші види металообробки і доводить виріб до готового стану.',
    en: 'Locksmith works are the process of metal processing, which typically complements other types of metalworking and brings the product to a finished state.',
    de: 'Schlosserarbeiten sind der Prozess der Metallverarbeitung, der in der Regel andere Arten der Metallbearbeitung ergänzt und das Produkt in einen fertigen Zustand bringt.',
  },
  's-services_page-6': {
    ua: 'Детальніше',
    en: 'Learn more',
    de: 'Erfahren Sie mehr',
  },
  's-services_page-7': {
    ua: 'Розробка КД',
    en: 'Development of design documentation',
    de: 'Entwicklung von Konstruktionsdokumentation',
  },
  's-services_page-8': {
    ua: 'Розробка КД документації',
    en: 'Development of design documentation',
    de: 'Entwicklung von Konstruktionsdokumentation',
  },
  's-services_page-9': {
    ua: 'Детальніше',
    en: 'Learn more',
    de: 'Erfahren Sie mehr',
  },
  //-----------sheet bending
  'sd-header_page-1': {
    ua: 'Гнуття металу',
    en: 'Metal bending',
    de: 'Metallbiegung',
  },
  'sd-header_page-2': {
    ua: 'Наша компанія пропонує послуги зі згинання листового металу на сучасному обладнанні, за вигідними цінами та у узгоджені терміни!',
    en: 'Our company offers services for bending sheet metal on modern equipment, at favorable prices and within agreed terms!',
    de: 'Unser Unternehmen bietet Dienstleistungen für das Biegen von Blech auf modernen Anlagen zu günstigen Preisen und innerhalb vereinbarter Fristen an!',
  },
  'sd-char_page-1': {
    ua: 'Основні характеристики листозгину Armax MG',
    en: 'Main characteristics of the Armax MG sheet bender',
    de: 'Hauptmerkmale des Armax MG-Blechbiegers',
  },
  'sd-char_page-2': {
    ua: 'Ermaxan power-bend pro (Турція)',
    en: 'Ermaxan power-bend pro (Turkey)',
    de: 'Ermaxan Power-Bend Pro (Türkei)',
  },
  'sd-char_page-3': {
    ua: 'Максимальна довжина гнуття:',
    en: 'Maximum bending length:',
    de: 'Maximale Biegelänge:',
  },
  'sd-char_page-4': {
    ua: 'становить',
    en: 'to become',
    de: 'werden',
  },
  'sd-char_page-5': {
    ua: '3000 мм.',
    en: '3000 mm.',
    de: '3000 mm.',
  },
  'sd-char_page-6': {
    ua: 'Максимальна товщина заготовки:',
    en: 'Maximum blank thickness:',
    de: 'Maximale Blechdicke:',
  },
  'sd-char_page-7': {
    ua: 'становить',
    en: 'to become',
    de: 'werden',
  },
  'sd-char_page-8': {
    ua: '6 мм.',
    en: '6 mm.',
    de: '6 mm.',
  },
  'sd-char_page-9': {
    ua: 'Точність згинання металу:',
    en: 'Metal bending accuracy:',
    de: 'Metallbiegen Genauigkeit:',
  },
  'sd-char_page-10': {
    ua: 'становить до',
    en: 'up to',
    de: 'bis zu',
  },
  'sd-char_page-11': {
    ua: '0.5 мм',
    en: '0.5 mm',
    de: '0,5 mm',
  },
  'sd-char_page-12': {
    ua: 'Максимальне робоче зусилля',
    en: 'Maximum working force',
    de: 'Maximale Arbeitskraft',
  },
  'sd-char_page-13': {
    ua: 'становить',
    en: 'to become',
    de: 'werden',
  },
  'sd-char_page-14': {
    ua: '90 тонн',
    en: '90 tons',
    de: '90 Tonnen',
  },
  'sd-price_page-1': {
    ua: 'Ціна гнуття металу',
    en: 'Metal bending price',
    de: 'Preis für Metallbiegen',
  },
  'sd-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості послуг із',
    en: 'In order for us to make an accurate calculation of the cost of services for',
    de: 'Damit wir eine genaue Berechnung der Kosten für Dienstleistungen ausführen können, benötigen wir',
  },
  'sd-price_page-3': {
    ua: 'гнуття металу',
    en: 'metal bending,',
    de: 'Metallbiegen,',
  },
  'sd-price_page-4': {
    ua: 'та терміни виконання замовлення, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги із гнуття металу визначається за такими основними критеріями як:',
    en: 'and the terms of order execution, we need to receive complete information from you about the product, detailed technical specifications, or drawings. Prices for metal bending services are determined by such main criteria as:',
    de: 'und die Bedingungen der Auftragsausführung benötigen wir vollständige Informationen von Ihnen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Die Preise für Metallbiegedienstleistungen werden anhand folgender Hauptkriterien bestimmt:',
  },
  'sd-price_page-5': {
    ua: 'Довжину згину та товщину металу;',
    en: 'Length of bend and metal thickness;',
    de: 'Bieglänge und Metallstärke;',
  },
  'sd-price_page-6': {
    ua: 'Обсяг замовлення;',
    en: 'Order volume;',
    de: 'Bestellvolumen;',
  },
  'sd-price_page-7': {
    ua: 'Складність робіт, залежно від деталі;',
    en: 'Complexity of work, depending on the detail;',
    de: 'Komplexität der Arbeit, abhängig von der Detailgenauigkeit;',
  },
  'sd-price_page-8': {
    ua: 'Давальницька чи власна сировина буде використовуватись в замовленні;',
    en: 'Whether supplied or own raw material will be used in the order;',
    de: 'Ob geliefertes oder eigenes Rohmaterial für die Bestellung verwendet wird;',
  },
  'sd-price_page-9': {
    ua: 'Строки виконання замовлення;',
    en: 'Order execution terms;',
    de: 'Ausführungsfristen für Bestellungen;',
  },

  //------mechanical-processing
  'mp-header_page-1': {
    ua: 'Механічна обробка',
    en: 'Mechanical processing',
    de: 'Mechanische Bearbeitung',
  },
  'mp-header_page-2': {
    ua: 'Механічна обробка – це послуги токарної, фрезерної та шліфувальної обробки металів з використанням сучасного обладнання ЧПК. Компанія забезпечує високу точність і продуктивність для серійного та індивідуального виробництва деталей.',
    en: 'Mechanical processing is the service of turning, milling, and grinding metal with the use of modern CNC equipment. The company ensures high precision and productivity for both serial and custom part production.',
    de: 'Mechanische Bearbeitung umfasst Dreh-, Fräs- und Schleifdienste für Metalle unter Verwendung moderner CNC-Ausrüstung. Das Unternehmen gewährleistet hohe Präzision und Produktivität für die Serien- und Einzelteilproduktion.',
  },
  'mp-char_page-1': {
    ua: 'Послуги по механічній обробці металу',
    en: 'Metal machining services',
    de: 'Dienstleistungen zur mechanischen Metallbearbeitung',
  },
  'mp-char_page-4': {
    ua: 'Компанія «АрмаксМГ» надає послуги з механічної обробки металів, зокрема виробництва деталей за індивідуальними проектами. Ми виконуємо замовлення будь-якої складності та обсягу, використовуючи різноманітні метали.',
    en: 'The company "ArmaxMG" provides metal machining services, including the production of parts based on custom projects. We handle orders of any complexity and volume, using various metals.',
    de: 'Die Firma „ArmaxMG“ bietet Dienstleistungen zur mechanischen Bearbeitung von Metallen an, einschließlich der Herstellung von Teilen nach individuellen Projekten. Wir bearbeiten Aufträge jeder Komplexität und jedes Umfangs unter Verwendung verschiedener Metalle.',
  },
  'mp-char_page-13': {
    ua: 'Переваги обробки металу в «АрмаксМГ»:',
    en: 'Advantages of metal machining at "ArmaxMG":',
    de: 'Vorteile der Metallbearbeitung bei „ArmaxMG“:',
  },
  'mp-char_page-14': {
    ua: 'Сучасне обладнання ЧПК:',
    en: 'Modern CNC equipment:',
    de: 'Moderne CNC-Ausrüstung:',
  },

  'mp-char_page-14-1': {
    ua: 'Наше високоточне обладнання дозволяє виготовляти деталі відповідно до затверджених креслень, забезпечуючи відмінну якість завдяки використанню інноваційних технологій.',
    en: 'Our high-precision equipment allows the production of parts according to approved drawings, ensuring excellent quality through the use of innovative technologies.',
    de: 'Unsere hochpräzisen Maschinen ermöglichen die Herstellung von Teilen nach genehmigten Zeichnungen und gewährleisten dank innovativer Technologien eine hervorragende Qualität.',
  },

  'mp-char_page-15': {
    ua: 'Автоматизація процесів:',
    en: 'Process automation:',
    de: 'Prozessautomatisierung:',
  },

  'mp-char_page-15-1': {
    ua: 'Щоб уникнути неточностей і браку, більшість операцій виконується автоматизовано під наглядом досвідчених фахівців.',
    en: 'To avoid inaccuracies and defects, most operations are automated under the supervision of experienced specialists.',
    de: 'Um Ungenauigkeiten und Mängel zu vermeiden, werden die meisten Prozesse automatisiert unter der Aufsicht erfahrener Fachleute durchgeführt.',
  },
  'mp-char_page-16': {
    ua: 'Професійні майстри:',
    en: 'Professional craftsmen:',
    de: 'Professionelle Fachkräfte:',
  },
  'mp-char_page-16-1': {
    ua: 'Наші експерти мають багаторічний досвід у сфері металообробки, що гарантує високу якість виконаних робіт.',
    en: 'Our experts have many years of experience in metalworking, which guarantees the high quality of the work performed.',
    de: 'Unsere Experten haben langjährige Erfahrung in der Metallbearbeitung, was die hohe Qualität der ausgeführten Arbeiten gewährleistet.',
  },
  'mp-char_page-17': {
    ua: 'Доступні ціни:',
    en: 'Affordable prices:',
    de: 'Erschwingliche Preise:',
  },
  'mp-char_page-17-1': {
    ua: 'Ми пропонуємо конкурентну вартість послуг, що дозволяє нашим клієнтам не переплачувати.',
    en: 'We offer competitive service prices, allowing our clients to avoid overpaying.',
    de: 'Wir bieten wettbewerbsfähige Preise für unsere Dienstleistungen, sodass unsere Kunden nicht zu viel bezahlen müssen.',
  },
  'mp-price_page-1': {
    ua: 'Механічна обробка металу',
    en: 'Metal machining',
    de: 'Mechanische Metallbearbeitung',
  },
  'mp-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості механічної обробки металу та терміни виконання послуги, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на механічну обробку визначаються за такими основними критеріями як:',
    en: 'To provide an accurate cost estimate for metal machining and service completion time, we need complete information about the product, a detailed technical specification, or a drawing from you. The price of machining is determined by the following key criteria:',
    de: 'Um eine genaue Kostenschätzung für die mechanische Metallbearbeitung und die Ausführungszeiten zu erstellen, benötigen wir von Ihnen vollständige Informationen über das Produkt, eine detaillierte technische Spezifikation oder eine Zeichnung. Die Preise für die mechanische Bearbeitung werden nach folgenden Hauptkriterien bestimmt:',
  },
  'mp-price_page-3': {
    ua: 'Механічна обробка металу',
    en: 'Metal machining',
    de: 'Mechanische Metallbearbeitung',
  },

  'mp-price_page-4': {
    ua: 'Вид та марка металу, який Вам потрібно обробити;',
    en: 'The type and grade of metal that needs to be machined;',
    de: 'Die Art und Sorte des Metalls, das bearbeitet werden muss;',
  },

  'mp-services_page-1': {
    ua: 'Детальніше',
    en: 'Learn more',
    de: 'Erfahren Sie mehr',
  },

  'mp-services_page-6': {},

  //--------welding
  'w-header_page-1': {
    ua: 'Зварювальні роботи',
    en: 'Welding works',
    de: 'Schweißarbeiten',
  },
  'w-header_page-2': {
    ua: 'Наша компанія надає послуги зі зварювання металу на сучасному обладнанні, за вигідними цінами та у погоджені терміни!',
    en: 'Our company provides metal welding services on modern equipment, at favorable prices, and within agreed terms!',
    de: 'Unser Unternehmen bietet Metallschweißdienstleistungen auf modernen Geräten zu günstigen Preisen und innerhalb vereinbarter Fristen!',
  },
  'w-char_page-1': {
    ua: 'Основні характеристики зварювання металу Armax MG',
    en: 'Main characteristics of metal welding Armax MG',
    de: 'Hauptmerkmale des Metallschweißens Armax MG',
  },
  'w-char_page-2': {
    ua: 'Види зварювання металу:',
    en: 'Types of metal welding:',
    de: 'Arten des Metallschweißens:',
  },
  'w-char_page-3': {
    ua: 'Зварювання напівавтоматом;',
    en: 'Semi-automatic welding;',
    de: 'Halbautomatisches Schweißen;',
  },
  'w-char_page-4': {
    ua: 'Аргонове зварювання;',
    en: 'Argon welding;',
    de: 'Argon-Schweißen;',
  },
  'w-char_page-5': {
    ua: 'Ручне дугове зварювання;',
    en: 'Manual arc welding;',
    de: 'Manuelles Lichtbogenschweißen;',
  },
  'w-char_page-6': {
    ua: 'Максимальна товщина зварювання:',
    en: 'Maximum welding thickness:',
    de: 'Maximale Schweißdicke:',
  },
  'w-char_page-7': {
    ua: 'становить ',
    en: 'is ',
    de: 'ist ',
  },
  'w-char_page-8': {
    ua: 'від 1 до 40 мм',
    en: 'from 1 to 40 mm',
    de: 'von 1 bis 40 mm',
  },
  'w-price_page-1': {
    ua: 'Ціна зварювання металу',
    en: 'Metal welding price',
    de: 'Preis für Metallschweißen',
  },
  'w-price_page-2': {
    ua: 'Щоб ми могли зробити точний розрахунок вартості',
    en: 'In order for us to make an accurate calculation of the cost',
    de: 'Damit wir eine genaue Berechnung der Kosten durchführen können',
  },
  'w-price_page-3': {
    ua: 'зварювання металу',
    en: 'of metal welding',
    de: 'des Metallschweißens',
  },
  'w-price_page-4': {
    ua: 'та терміни виконання послуги, нам необхідно отримати від Вас повну інформацію про виріб, детальне технічне завдання або креслення. Ціни на послуги лазерного різання визначається за такими основними критеріями як:',
    en: 'and the terms of service execution, we need to receive full information from you about the product, detailed technical specifications, or drawings. Prices for laser cutting services are determined by such main criteria as:',
    de: 'und die Bedingungen für die Ausführung der Dienstleistung benötigen wir von Ihnen vollständige Informationen über das Produkt, detaillierte technische Spezifikationen oder Zeichnungen. Die Preise für Laserbearbeitungsdienstleistungen werden anhand folgender Hauptkriterien bestimmt:',
  },
  'w-price_page-5': {
    ua: 'Cкладності робіт;',
    en: 'Complexity of work;',
    de: 'Arbeitskomplexität;',
  },
  'w-price_page-6': {
    ua: 'Товщини матеріалу;',
    en: 'Material thickness;',
    de: 'Materialstärke;',
  },
  'w-price_page-7': {
    ua: 'Виду зварювання;',
    en: 'Type of welding;',
    de: 'Art des Schweißens;',
  },
  'w-price_page-8': {
    ua: 'Додаткових видів механічної обробки;',
    en: 'Additional types of mechanical processing;',
    de: 'Zusätzliche Arten der mechanischen Bearbeitung;',
  },
  'w-price_page-9': {
    ua: 'Строки виконання замовлення;',
    en: 'Order execution terms;',
    de: 'Ausführungsfristen für Bestellungen;',
  },
  'news-1': {
    ua: 'Останні новини',
    en: 'Latest news',
    de: 'Neueste Nachrichten',
  },
  'news-2': {
    ua: 'Відкриття механічного цеху «АРМАКС МГ»!',
    en: 'Opening of the mechanical workshop "ARMAX MG"!',
    de: 'Eröffnung der mechanischen Werkstatt "ARMAX MG"!',
  },

  'news-3': {
    ua: 'Ми раді оголосити про урочисте відкриття нового механічного цеху в м. Луцьк, що стане важливою віхою в розвитку нашого підприємства. Цей сучасний цех обладнано передовими верстатами для токарних, фрезерувальних, шліфувальних та гартувальних робіт, що забезпечить високий рівень точності та якості обробки деталей. Токарні верстати дозволять виготовляти деталі з неперевершеною точністю, фрезерні забезпечать складне оброблення з урахуванням найвищих стандартів, шліфувальні верстати нададуть ідеальну обробку поверхонь, а гартувальні установки підвищать міцність і довговічність матеріалів. Відкриття цього цеху дозволить нам значно розширити наші можливості, покращити ефективність виконання замовлень та задовольнити потреби наших клієнтів на новому рівні.',
    en: 'We are pleased to announce the grand opening of a new mechanical workshop in Lutsk, which will mark an important milestone in the development of our company. This modern workshop is equipped with advanced machines for turning, milling, grinding, and hardening operations, ensuring a high level of precision and quality in part processing. Turning machines will allow for the production of parts with unparalleled accuracy, milling machines will provide complex processing according to the highest standards, grinding machines will deliver perfect surface finishes, and hardening installations will enhance the strength and durability of materials. The opening of this workshop will significantly expand our capabilities, improve the efficiency of order fulfillment, and meet our customers` needs at a new level.',
    de: 'Wir freuen uns, die feierliche Eröffnung einer neuen mechanischen Werkstatt in Lutsk bekannt zu geben, die einen wichtigen Meilenstein in der Entwicklung unseres Unternehmens darstellt. Diese moderne Werkstatt ist mit fortschrittlichen Maschinen für Dreh-, Fräs-, Schleif- und Härtearbeiten ausgestattet, die ein hohes Maß an Präzision und Qualität bei der Bearbeitung von Teilen gewährleisten. Drehmaschinen ermöglichen die Herstellung von Teilen mit unvergleichlicher Genauigkeit, Fräsmaschinen bieten komplexe Bearbeitung nach höchsten Standards, Schleifmaschinen sorgen für perfekte Oberflächenbearbeitung, und Härteeinrichtungen verbessern die Festigkeit und Haltbarkeit der Materialien. Die Eröffnung dieser Werkstatt wird unsere Möglichkeiten erheblich erweitern, die Effizienz bei der Auftragsabwicklung verbessern und die Bedürfnisse unserer Kunden auf einem neuen Niveau erfüllen.',
  },

  'news-4': {
    ua: 'Запрошуємо до співпраці зварювальника!',
    en: 'We invite a welder to cooperation!',
    de: 'Wir laden einen Schweißer zur Zusammenarbeit ein!',
  },

  'news-5': {
    ua: 'Шукаємо кваліфікованого зварювальника-напівавтоматника. Основні обов’язки включатимуть зварювання металевих виробів.',
    en: 'We are looking for a qualified semi-automatic welder. The main responsibilities will include welding metal products.',
    de: 'Wir suchen einen qualifizierten halbautomatischen Schweißer. Zu den Hauptaufgaben gehören das Schweißen von Metallprodukten.',
  },

  'breadcrumbs-1': {
    ua: 'Продукти',
    en: 'Products',
    de: 'Produkte',
  },
  'breadcrumbs-2': {
    ua: 'СГ обладнання',
    en: 'AG equipment',
    de: 'Landwirtschaftliche Ausrüstung',
  },
  'breadcrumbs-3': {
    ua: 'Фронтальні навантажувачі',
    en: 'Front loaders',
    de: 'Frontlader',
  },
  'breadcrumbs-3-1': {
    ua: 'Фронтальні навантажувачі',
    en: 'Front loaders',
    de: 'Frontlader',
  },
  'breadcrumbs-3-2': {
    ua: 'Для фронтальних навантажувачів',
    en: 'For front loaders',
    de: 'Für Frontlader',
  },
  'breadcrumbs-3-3': {
    ua: 'Для екскаваторів',
    en: 'For excavators',
    de: 'Für Bagger',
  },
  'breadcrumbs-3-4': {
    ua: 'Для екскаваторів',
    en: 'For excavators',
    de: 'Für Bagger',
  },
  'breadcrumbs-4': {
    ua: 'Гак для біг бегів',
    en: 'Big bag hook',
    de: 'Big Bag Haken',
  },
  'breadcrumbs-4-1': {
    ua: 'Гак для біг бегів',
    en: 'Big bag hook',
    de: 'Big Bag Haken',
  },

  'breadcrumbs-4-2': {
    ua: 'Вила для тюків',
    en: 'Bale forks',
    de: 'Ballengabel',
  },
  'breadcrumbs-4-21': {
    ua: 'Вила для тюків',
    en: 'Bale forks',
    de: 'Ballengabel',
  },
  'breadcrumbs-4-3': {
    ua: 'Ківш наповнювач Біг Бегів',
    en: 'Big Bag filler bucket',
    de: 'Big Bag Füllschaufel',
  },
  'breadcrumbs-4-31': {
    ua: 'Ківш наповнювач Біг Бегів',
    en: 'Big Bag filler bucket',
    de: 'Big Bag Füllschaufel',
  },
  'breadcrumbs-4-4': {
    ua: 'Ківш 2400',
    en: 'Bucket 2400',
    de: 'Schaufel 2400',
  },
  'breadcrumbs-4-41': {
    ua: 'Ківш 2400',
    en: 'Bucket 2400',
    de: 'Schaufel 2400',
  },
  'breadcrumbs-4-5': {
    ua: 'Ківш змішувач',
    en: 'Mixer bucket',
    de: 'Mischschaufel',
  },
  'breadcrumbs-4-51': {
    ua: 'Ківш змішувач',
    en: 'Mixer bucket',
    de: 'Mischschaufel',
  },
  'breadcrumbs-4-6': {
    ua: 'Відвал JCB',
    en: 'JCB blade',
    de: 'JCB-Schaufel',
  },
  'breadcrumbs-4-61': {
    ua: 'Відвал JCB',
    en: 'JCB blade',
    de: 'JCB-Schaufel',
  },
  'breadcrumbs-4-7': {
    ua: 'Вила для силосу',
    en: 'Silage forks',
    de: 'Silagegabeln',
  },
  'breadcrumbs-4-71': {
    ua: 'Вила для силосу',
    en: 'Silage forks',
    de: 'Silagegabeln',
  },
  'breadcrumbs-4-8': {
    ua: 'Ківш 1м³',
    en: 'Bucket 1m³',
    de: 'Schaufel 1m³',
  },
  'breadcrumbs-4-81': {
    ua: 'Ківш 1м³',
    en: 'Bucket 1m³',
    de: 'Schaufel 1m³',
  },
  'breadcrumbs-4-9': {
    ua: 'Ківш 2м³',
    en: 'Bucket 2m³',
    de: 'Schaufel 2m³',
  },
  'breadcrumbs-4-91': {
    ua: 'Ківш 2м³',
    en: 'Bucket 2m³',
    de: 'Schaufel 2m³',
  },

  'breadcrumbs-4-10': {
    ua: 'Ківш навантажувач 4м³',
    en: 'Bucket for loader 4m³',
    de: 'Schaufel für-Lader 4m³',
  },
  'breadcrumbs-4-11': {
    ua: 'Ківш навантажувач 4м³',
    en: 'Bucket for loader 4m³',
    de: 'Schaufel für-Lader 4m³',
  },
  'breadcrumbs-exc-5-1': {
    ua: 'Ківш ескаваторний Kubata CX',
    en: 'Kubata CX excavator bucket',
    de: 'Kubata CX Baggerlöffel',
  },
  'breadcrumbs-exc-5-11': {
    ua: 'Ківш ескаваторний Kubata CX',
    en: 'Kubata CX excavator bucket',
    de: 'Kubata CX Baggerlöffel',
  },
  'breadcrumbs-exc-5-2': {
    ua: 'Ківш екскаваторний 400 мм',
    en: '400 mm excavator bucket',
    de: '400 mm Baggerlöffel',
  },
  'breadcrumbs-exc-5-21': {
    ua: 'Ківш екскаваторний 400 мм',
    en: '400 mm excavator bucket',
    de: '400 mm Baggerlöffel',
  },
  'breadcrumbs-exc-5-3': {
    ua: 'Ківш планувальний екскаваторний',
    en: 'Grading excavator bucket',
    de: 'Planierlöffel für Bagger',
  },
  'breadcrumbs-exc-5-31': {
    ua: 'Ківш планувальний екскаваторний',
    en: 'Grading excavator bucket',
    de: 'Planierlöffel für Bagger',
  },
  article: {
    ua: 'Артикул:',
    en: 'Article:',
    de: 'Artikel:',
  },
  'article-1': {
    ua: '1',
    en: '1',
    de: '1',
  },
  'article-2': {
    ua: '2',
    en: '2',
    de: '2',
  },
  'article-3': {
    ua: '3',
    en: '3',
    de: '3',
  },
  'article-4': {
    ua: '4',
    en: '4',
    de: '4',
  },
  'article-5': {
    ua: '5',
    en: '5',
    de: '5',
  },
  'article-6': {
    ua: '6',
    en: '6',
    de: '6',
  },
  'article-7': {
    ua: '7',
    en: '7',
    de: '7',
  },
  'article-8': {
    ua: '8',
    en: '8',
    de: '8',
  },
  'article-9': {
    ua: '9',
    en: '9',
    de: '9',
  },
  'article-10': {
    ua: '10',
    en: '10',
    de: '10',
  },

  'article-exc-2-1': {
    ua: 'exc',
    en: 'exc',
    de: 'exc',
  },
  'article-exc-2-2': {
    ua: 'exc2',
    en: 'exc2',
    de: 'exc2',
  },

  'article-exc-2-3': {
    ua: 'exc3',
    en: 'exc3',
    de: 'exc3',
  },

  'card-text-1': {
    ua: 'Є в наявності',
    en: 'In stock',
    de: 'Auf Lager',
  },
  'card-text-2': {
    ua: 'Основні характеристики:',
    en: 'Key features:',
    de: 'Haupteigenschaften:',
  },

  'card-text-3': {
    ua: 'Ширина:',
    en: 'Width:',
    de: 'Breite:',
  },
  'card-text-4': {
    ua: 'Висота:',
    en: 'Height:',
    de: 'Höhe:',
  },
  'card-text-5': { ua: 'Глибина:', en: 'Depth:', de: 'Tiefe:' },
  'card-text-6': { ua: 'Вага:', en: 'Weight:', de: 'Gewicht:' },
  'card-text-7': { ua: '176 кг', en: '176 kg', de: '176 kg' },
  'card-text-7-1': { ua: '96 кг', en: '96 kg', de: '96 kg' },
  'card-text-7-2': { ua: '776 кг', en: '776 kg', de: '776 kg' },
  'card-text-7-3': { ua: '510 кг', en: '510 kg', de: '510 kg' },
  'card-text-7-4': { ua: '192 кг', en: '192 kg', de: '192 kg' },
  'card-text-7-5': { ua: '580 кг', en: '580 kg', de: '580 kg' },
  'card-text-7-6': { ua: '782 кг', en: '782 kg', de: '782 kg' },
  'card-text-7-7': { ua: '386 кг', en: '386 kg', de: '386 kg' },
  'card-text-7-8': { ua: '380 кг', en: '380 kg', de: '380 kg' },
  'card-text-7-9': { ua: '1150 кг', en: '1150 kg', de: '1150 kg' },
  'card-text-exc-7': { ua: '42 кг', en: '42 kg', de: '42 kg' },
  'card-text-exc-7-2': { ua: '37 кг', en: '37 kg', de: '37 kg' },
  'card-text-exc-7-3': { ua: '180 кг', en: '180 kg', de: '180 kg' },
  'card-text-8': { ua: 'Основна сталь:', en: 'Main steel:', de: 'Grundstahl:' },
  'card-text-9': { ua: 'Кріплення:', en: 'Mounting:', de: 'Befestigung:' },
  'card-text-10': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-1': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-2': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-3': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-4': {
    ua: 'Ціну уточнюйте ',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-5': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-6': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-7': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-8': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-text-10-9': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-price-exc-1': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-price-exc-2': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'card-price-exc-3': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },

  'card-text-11': { ua: 'Замовити', en: 'Order', de: 'Bestellen' },
  'card-text-13': {
    ua: 'Захват для біг-бегів — це спеціалізоване навісне обладнання, яке призначене для навантажувачів JCB, Manitou та Bobcat. Воно ефективно переміщує, завантажує та розвантажує біг-беги і контейнери, забезпечуючи транспортування добрив, зерна та інших упакованих товарів без втрат і пошкоджень. Це обладнання також дозволяє піднімати і підвішувати мішки над сівалками та змішувачами, що значно полегшує завантаження посівного матеріалу.',
    en: 'The big bag hook is specialized attachment equipment designed for JCB, Manitou, and Bobcat loaders. It efficiently moves, loads, and unloads big bags and containers, ensuring the transport of fertilizers, grain, and other packaged goods without loss or damage. This equipment also allows bags to be lifted and suspended over seeders and mixers, significantly easing the loading of planting material.',
    de: 'Der Big Bag Haken ist ein spezialisiertes Anbaugerät für JCB-, Manitou- und Bobcat-Lader. Er bewegt, lädt und entlädt Big Bags und Container effizient und sorgt für den Transport von Düngemitteln, Getreide und anderen verpackten Gütern ohne Verluste oder Schäden. Dieses Gerät ermöglicht auch das Heben und Aufhängen von Säcken über Sämaschinen und Mischern, was das Laden von Saatgut erheblich erleichtert.',
  },
  'card-text-13-1': {
    ua: 'Вила для тюків призначені для роботи з тюками сіна, соломи або іншими сільськогосподарськими матеріалами, які упаковані в компактні форми. Вони використовуються для підйому, переміщення та укладання цих тюків.',
    en: 'Bale forks are designed for handling bales of hay, straw, or other agricultural materials packed into compact forms. They are used for lifting, moving, and stacking these bales.',
    de: 'Ballengabeln sind für den Umgang mit Ballen aus Heu, Stroh oder anderen landwirtschaftlichen Materialien ausgelegt, die in kompakte Formen verpackt sind. Sie werden zum Heben, Bewegen und Stapeln dieser Ballen verwendet.',
  },
  'card-text-13-2': {
    ua: 'Вила для тюків призначені для роботи з тюками сіна, соломи або іншими сільськогосподарськими матеріалами, які упаковані в компактні форми. Вони використовуються для підйому, переміщення та укладання цих тюків.',
    en: 'Bale forks are designed for handling bales of hay, straw, or other agricultural materials packed into compact forms. They are used for lifting, moving, and stacking these bales.',
    de: 'Ballengabeln sind für den Umgang mit Ballen aus Heu, Stroh oder anderen landwirtschaftlichen Materialien ausgelegt, die in kompakte Formen verpackt sind. Sie werden zum Heben, Bewegen und Stapeln dieser Ballen verwendet.',
  },
  'card-text-13-3': {
    ua: 'Ківш 2400 зерновий - це сільськогосподарське обладнання, призначене для роботи з зерновими культурами. Він зазвичай використовується для завантаження, переміщення та розвантаження зерна.',
    en: 'The 2400 grain bucket is agricultural equipment designed for handling grain crops. It is typically used for loading, moving, and unloading grain.',
    de: 'Die 2400 Körnerschaufel ist ein landwirtschaftliches Gerät, das für den Umgang mit Getreidekulturen ausgelegt ist. Es wird normalerweise zum Laden, Bewegen und Entladen von Getreide verwendet.',
  },

  'card-text-13-4': {
    ua: 'Ківш змішувач - це спеціалізоване обладнання, призначене для змішування різних компонентів, таких як корми для тварин або будівельні матеріали. Він виготовлений з міцної сталі і оснащений лопатями або шнеками, які забезпечують ефективне і рівномірне змішування вмісту.',
    en: 'The mixer bucket is specialized equipment designed for mixing various components, such as animal feed or construction materials. It is made of durable steel and equipped with paddles or augers to ensure effective and even mixing of the contents.',
    de: 'Die Mischschaufel ist ein spezialisiertes Gerät zum Mischen verschiedener Komponenten wie Tierfutter oder Baumaterialien. Sie besteht aus strapazierfähigem Stahl und ist mit Schaufeln oder Schnecken ausgestattet, die ein effektives und gleichmäßiges Mischen des Inhalts gewährleisten.',
  },
  'card-text-13-5': {
    ua: 'Відвал для очистки доріг від снігу - це спеціалізоване обладнання, яке встановлюється на трактори або інші транспортні засоби для ефективного видалення снігу з дорожнього покриття. Він має металеву конструкцію з широким лезом, яке можна регулювати в різних напрямках (вліво, вправо, вверх, вниз) для оптимального очищення дороги. Відвал забезпечує швидке та якісне прибирання снігу, запобігаючи утворенню снігових заметів і забезпечуючи безпеку дорожнього руху в зимовий період.',
    en: 'The snow plow blade is specialized equipment designed to be mounted on tractors or other vehicles for effectively removing snow from road surfaces. It features a metal construction with a wide blade that can be adjusted in various directions (left, right, up, down) for optimal road clearing. The plow ensures fast and efficient snow removal, preventing the formation of snow drifts and maintaining road safety during the winter season.',
    de: 'Der Schneepflug ist ein spezialisiertes Gerät, das an Traktoren oder andere Fahrzeuge montiert wird, um Schnee von Straßenoberflächen effektiv zu entfernen. Er besteht aus einem robusten Metallrahmen mit einer breiten Schneide, die in verschiedene Richtungen (nach links, rechts, oben, unten) verstellbar ist, um eine optimale Straßenreinigung zu gewährleisten. Der Pflug sorgt für eine schnelle und effiziente Schneeräumung, verhindert die Bildung von Schneeverwehungen und trägt zur Sicherheit des Straßenverkehrs im Winter bei.',
  },
  'card-text-13-6': {
    ua: 'Вила для силосу - це спеціалізоване сільськогосподарське обладнання, призначене для роботи з силосом. Вони використовуються для підйому, переміщення та укладання силосу в сховища або годівниці. Основні характеристики вил для силосу включають міцну металеву конструкцію з довгими зубцями, які легко проникають в силосну масу, забезпечуючи надійне захоплення та утримання матеріалу. Вила можуть бути встановлені на різні види сільськогосподарської техніки, такі як трактори або фронтальні навантажувачі, що дозволяє ефективно виконувати завдання на фермі.',
    en: 'Silage forks are specialized agricultural equipment designed for handling silage. They are used for lifting, moving, and stacking silage in storage or feeding areas. Key features of silage forks include a sturdy metal construction with long tines that easily penetrate the silage mass, ensuring secure gripping and holding of the material. The forks can be mounted on various types of agricultural machinery, such as tractors or front loaders, enabling efficient farm operations.',
    de: 'Silagegabeln sind spezialisiertes landwirtschaftliches Gerät, das für den Umgang mit Silage ausgelegt ist. Sie werden zum Heben, Bewegen und Stapeln von Silage in Lager- oder Futterbereichen verwendet. Zu den Hauptmerkmalen von Silagegabeln gehört eine robuste Metallkonstruktion mit langen Zinken, die leicht in die Silagemasse eindringen und für sicheres Greifen und Halten des Materials sorgen. Die Gabeln können an verschiedenen Arten von landwirtschaftlichen Maschinen, wie Traktoren oder Frontladern, montiert werden, was eine effiziente Durchführung von Aufgaben auf dem Bauernhof ermöglicht.',
  },
  'card-text-13-7': {
    ua: 'Ківш об`ємом 1 м³ - це сільськогосподарське або будівельне обладнання, призначене для завантаження, переміщення та розвантаження різних матеріалів, таких як ґрунт, пісок, гравій, добрива або зерно. Він виготовлений з міцної сталі, що забезпечує його довговічність і здатність витримувати великі навантаження. Такий ківш зазвичай встановлюється на трактори, фронтальні навантажувачі або іншу важку техніку, що дозволяє значно підвищити ефективність і швидкість виконання робіт на будівельних майданчиках, фермах або в інших господарствах.',
    en: 'The 1m³ bucket is agricultural or construction equipment designed for loading, moving, and unloading various materials such as soil, sand, gravel, fertilizers, or grain. It is made of durable steel, ensuring its longevity and ability to withstand heavy loads. This bucket is typically mounted on tractors, front loaders, or other heavy machinery, significantly increasing the efficiency and speed of work on construction sites, farms, or other operations.',
    de: 'Der 1m³ Schaufel ist landwirtschaftliches oder bauliches Gerät, das zum Laden, Bewegen und Entladen verschiedener Materialien wie Erde, Sand, Kies, Dünger oder Getreide verwendet wird. Er besteht aus langlebigem Stahl, was seine Langlebigkeit und Fähigkeit, schweren Lasten standzuhalten, gewährleistet. Diese Schaufel wird typischerweise an Traktoren, Frontladern oder anderen schweren Maschinen montiert, was die Effizienz und Geschwindigkeit der Arbeit auf Baustellen, Farmen oder anderen Betrieben erheblich steigert.',
  },
  'card-text-13-8': {
    ua: 'Ківш об`ємом 2 м³ - це спеціалізоване обладнання, яке використовується в сільському господарстві, будівництві та інших галузях для завантаження, переміщення та розвантаження великих обсягів матеріалів, таких як ґрунт, пісок, гравій, зерно або добрива. Він виготовлений з високоякісної сталі для забезпечення міцності та довговічності при роботі з важкими вантажами. Завдяки великому об`єму, цей ківш дозволяє швидко виконувати завантажувально-розвантажувальні роботи, підвищуючи продуктивність і ефективність. Ківш об`ємом 2 м³ зазвичай встановлюється на великогабаритну техніку, таку як трактори або фронтальні навантажувачі.',
    en: 'The 2m³ bucket is specialized equipment used in agriculture, construction, and other industries for loading, moving, and unloading large volumes of materials such as soil, sand, gravel, grain, or fertilizers. It is made from high-quality steel to ensure strength and durability when handling heavy loads. With its large capacity, this bucket allows for rapid loading and unloading tasks, increasing productivity and efficiency. The 2m³ bucket is typically mounted on heavy machinery such as tractors or front loaders.',
    de: 'Der 2m³ Schaufel ist ein spezialisiertes Gerät, das in der Landwirtschaft, im Bauwesen und in anderen Branchen zum Laden, Bewegen und Entladen großer Materialmengen wie Erde, Sand, Kies, Getreide oder Dünger verwendet wird. Er besteht aus hochwertigem Stahl, um Festigkeit und Haltbarkeit bei der Handhabung schwerer Lasten zu gewährleisten. Durch sein großes Volumen ermöglicht dieser Schaufel eine schnelle Durchführung von Lade- und Entladeaufgaben, wodurch die Produktivität und Effizienz gesteigert wird. Der 2m³ Schaufel wird typischerweise an großen Maschinen wie Traktoren oder Frontladern montiert.',
  },
  'card-text-13-9': {
    ua: 'Ківш 2400 зерновий - це сільськогосподарське обладнання, призначене для роботи з зерновими культурами. Він зазвичай використовується для завантаження, переміщення та розвантаження зерна.',
    en: 'The 2400 grain bucket is agricultural equipment designed for handling grain crops. It is typically used for loading, moving, and unloading grain.',
    de: 'Die 2400 Körnerschaufel ist ein landwirtschaftliches Gerät, das für den Umgang mit Getreidekulturen ausgelegt ist. Es wird normalerweise zum Laden, Bewegen und Entladen von Getreide verwendet.',
  },
  'card-text-exc-13': {
    ua: 'Ківш екскаваторний Kubota CX - це навісне обладнання, розроблене для екскаваторів серії Kubota CX, призначене для виконання земляних робіт, таких як копання, розпушування, завантаження та переміщення ґрунту, піску і гравію. Виготовлений з високоякісної сталі, цей ківш забезпечує міцність і довговічність при важких навантаженнях. Він доступний у різних розмірах для виконання специфічних завдань і оптимізований для максимальної продуктивності. Ківш легко встановлюється на екскаватори Kubota CX, забезпечуючи надійну і ефективну роботу.',
    en: 'The Kubota CX excavator bucket is an attachment designed for Kubota CX series excavators, intended for earthmoving tasks such as digging, loosening, loading, and transporting soil, sand, and gravel. Made from high-quality steel, this bucket ensures strength and durability under heavy loads. It is available in various sizes to perform specific tasks and is optimized for maximum productivity. The bucket is easy to install on Kubota CX excavators, providing reliable and efficient operation.',
    de: 'Der Kubota CX Baggerlöffel ist ein Anbaugerät, das für Kubota CX Bagger entwickelt wurde und für Erdarbeiten wie Graben, Auflockern, Laden und Transportieren von Erde, Sand und Kies vorgesehen ist. Hergestellt aus hochwertigem Stahl, gewährleistet dieser Löffel Stärke und Haltbarkeit bei schweren Lasten. Er ist in verschiedenen Größen erhältlich, um spezifische Aufgaben zu erfüllen, und ist für maximale Produktivität optimiert. Der Löffel lässt sich leicht an Kubota CX Bagger montieren und bietet eine zuverlässige und effiziente Arbeitsweise.',
  },
  'card-text-exc-13-2': {
    ua: 'Ківш екскаваторний 400 мм - це компактне навісне обладнання, призначене для вузьких і точних земляних робіт, таких як копання траншей для кабелів, труб або дренажних систем. Він має ширину 400 мм і виготовлений з високоякісної сталі, що забезпечує міцність і довговічність при важких навантаженнях. Такий ківш сумісний з різними моделями екскаваторів, забезпечуючи точність і ефективність роботи в обмежених просторах. Його конструкція оптимізована для мінімізації опору і полегшення проникнення в ґрунт, що підвищує продуктивність і зменшує витрати палива.',
    en: 'The 400 mm excavator bucket is a compact attachment designed for narrow and precise earthmoving tasks such as digging trenches for cables, pipes, or drainage systems. It has a width of 400 mm and is made of high-quality steel, ensuring strength and durability under heavy loads. This bucket is compatible with various excavator models, providing precision and efficiency in confined spaces. Its design is optimized to minimize resistance and facilitate soil penetration, enhancing productivity and reducing fuel consumption.',
    de: 'Der 400 mm Baggerlöffel ist ein kompaktes Anbaugerät, das für schmale und präzise Erdarbeiten wie das Graben von Gräben für Kabel, Rohre oder Drainagesysteme entwickelt wurde. Er hat eine Breite von 400 mm und besteht aus hochwertigem Stahl, der Stärke und Haltbarkeit bei schweren Lasten gewährleistet. Dieser Löffel ist mit verschiedenen Baggermodellen kompatibel und bietet Präzision und Effizienz in engen Räumen. Sein Design ist optimiert, um den Widerstand zu minimieren und das Eindringen in den Boden zu erleichtern, was die Produktivität steigert und den Kraftstoffverbrauch senkt.',
  },
  'card-text-exc-13-3': {
    ua: 'Ківш планувальний екскаваторний - це спеціалізоване навісне обладнання для екскаваторів, призначене для точного планування та вирівнювання поверхонь, таких як підготовка основи під будівництво, створення ландшафтних елементів або укладання доріг. Він має широку та пласку конструкцію з ріжучою кромкою, що забезпечує рівне зрізання ґрунту та інших матеріалів. Ківш виготовлений з високоякісної сталі для забезпечення довговічності та стійкості до зносу. Завдяки своїй конструкції, планувальний ківш дозволяє виконувати точні та рівномірні роботи, що підвищує продуктивність і якість виконаних завдань.',
    en: 'The grading excavator bucket is specialized equipment for excavators, designed for precise leveling and grading of surfaces, such as preparing foundations for construction, creating landscape features, or paving roads. It features a wide and flat design with a cutting edge that ensures even cutting of soil and other materials. The bucket is made from high-quality steel to provide durability and wear resistance. Its design allows for accurate and uniform work, enhancing productivity and the quality of completed tasks.',
    de: 'Der Planierlöffel für Bagger ist ein spezialisiertes Anbaugerät für Bagger, das für präzises Planieren und Nivellieren von Oberflächen entwickelt wurde, wie z.B. das Vorbereiten von Fundamenten für den Bau, das Erstellen von Landschaftselementen oder das Verlegen von Straßen. Er verfügt über ein breites und flaches Design mit einer Schneidekante, die ein gleichmäßiges Schneiden von Erde und anderen Materialien gewährleistet. Der Löffel besteht aus hochwertigem Stahl, um Haltbarkeit und Verschleißfestigkeit zu bieten. Sein Design ermöglicht präzise und gleichmäßige Arbeiten, was die Produktivität und Qualität der ausgeführten Aufgaben erhöht.',
  },
  'card-text-12': { ua: 'Опис:', en: 'Description:', de: 'Beschreibung:' },
  'card-text-14': {
    ua: 'Ніж сталь:',
    en: 'Knife steel:',
    de: 'Messerstahl:',
  },

  //furniture-element
  'fe-breadcrumbs-1': {
    ua: 'Опора стола з дерев`яною вставкою',
    en: 'Table support with wooden insert',
    de: 'Tischstütze mit Holzeinsatz',
  },

  'fe-name-1': {
    ua: 'Опора стола з дерев`яною вставкою',
    en: 'Table support with wooden insert',
    de: 'Tischstütze mit Holzeinsatz',
  },
  'fe-name-1-1': {
    ua: 'Опора стола з дерев`яною вставкою',
    en: 'Table support with wooden insert',
    de: 'Tischstütze mit Holzeinsatz',
  },

  'fe-article-1': {
    ua: 'Артикул',
    en: '',
    de: '',
  },

  'fe-material': {
    ua: 'Матеріал:',
    en: 'Material:',
    de: 'Material:',
  },

  'fe-material-product-1': {
    ua: 'Метал / дерево',
    en: 'Metal / wood',
    de: 'Metall / Holz',
  },

  'fe-weight-1': {
    ua: '8 кг',
    en: '8 kg',
    de: '8 kg',
  },

  'fe-price-1': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },

  'fe-description-1': {
    ua: 'Опора стола з дерев`яною вставкою має стильний та сучасний дизайн. Конструкція виконана у формі трапеції, з металевим каркасом та дерев`яною вставкою всередині. Металеві елементи пофарбовані за допомогою порошкового фарбування в чорний колір, що забезпечує додаткову міцність і стійкість до зносу. Верхня пластина має товщину 4 мм, що забезпечує стабільність і надійність кріплення стільниці. Натуральна дерев`яна вставка додає елегантності та контрастності до загального вигляду опори, роблячи її ідеальним доповненням до сучасних інтер`єрів.',
    en: 'The table support with a wooden insert features a stylish and modern design. The structure is trapezoidal, with a metal frame and a wooden insert inside. The metal elements are powder-coated in black, providing additional strength and wear resistance. The top plate is 4 mm thick, ensuring the stability and reliability of the tabletop attachment. The natural wooden insert adds elegance and contrast to the overall appearance of the support, making it an ideal addition to modern interiors.',
    de: 'Die Tischstütze mit Holzeinsatz verfügt über ein stilvolles und modernes Design. Die Konstruktion ist trapezförmig, mit einem Metallrahmen und einem Holzeinsatz im Inneren. Die Metallelemente sind schwarz pulverbeschichtet, was zusätzliche Festigkeit und Verschleißfestigkeit bietet. Die obere Platte ist 4 mm dick und sorgt für die Stabilität und Zuverlässigkeit der Tischplattenbefestigung. Der natürliche Holzeinsatz verleiht dem Gesamterscheinungsbild der Stütze Eleganz und Kontrast und macht sie zu einer idealen Ergänzung für moderne Innenräume.',
  },

  'fe-name-2': {
    ua: 'Опора стола "Панель"',
    en: 'Table support "Panel"',
    de: 'Tischstütze "Panel"',
  },

  'fe-name-2-1': {
    ua: 'Опора стола "Панель"',
    en: 'Table support "Panel"',
    de: 'Tischstütze "Panel"',
  },
  'fe-article-2': {
    ua: 'Артикул',
    en: '',
    de: '',
  },

  'fe-weight-2': {
    ua: '18 кг',
    en: '18 kg',
    de: '18 kg',
  },
  'fe-material-product-2': {
    ua: 'Метал',
    en: 'Metal',
    de: 'Metall',
  },

  'fe-price-2': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },

  'fe-description-2': {
    ua: 'Опора стола "Панель" складається з вертикальної панелі та верхньої пластини. Виготовлена з високоякісного металу, ця опора забезпечує стабільність і надійність. Верхня пластина товщиною 4 мм має отвори для кріплення до стільниці. Вертикальна панель має плоску конструкцію, що додає опорі сучасного вигляду і забезпечує достатню міцність. Металеві частини пофарбовані порошковою фарбою чорного кольору, що забезпечує додатковий захист від корозії і зносу, а також додає естетичної привабливості. Така опора ідеально підходить для сучасних інтер`єрів, поєднуючи функціональність з елегантним дизайном.',
    en: 'The table support "Panel" consists of a vertical panel and a top plate. Made from high-quality metal, this support ensures stability and reliability. The top plate is 4 mm thick and has holes for attaching to the tabletop. The vertical panel has a flat design, adding a modern look to the support and providing sufficient strength. The metal parts are powder-coated in black, offering additional protection against corrosion and wear, as well as aesthetic appeal. This support is ideal for modern interiors, combining functionality with elegant design.',
    de: 'Die Tischstütze "Panel" besteht aus einer vertikalen Platte und einer oberen Platte. Hergestellt aus hochwertigem Metall, gewährleistet diese Stütze Stabilität und Zuverlässigkeit. Die obere Platte ist 4 mm dick und hat Löcher zur Befestigung an der Tischplatte. Die vertikale Platte hat ein flaches Design, das der Stütze ein modernes Aussehen verleiht und ausreichende Festigkeit bietet. Die Metallelemente sind schwarz pulverbeschichtet, was zusätzlichen Schutz vor Korrosion und Verschleiß sowie eine ästhetische Anziehungskraft bietet. Diese Stütze ist ideal für moderne Innenräume, da sie Funktionalität mit elegantem Design kombiniert.',
  },
  'fe-name-3': {
    ua: 'Опора стола "Панель з вирізом"',
    en: 'Table support "Panel with cutout"',
    de: 'Tischstütze "Panel mit Ausschnitt"',
  },
  'fe-name-3-1': {
    ua: 'Опора стола "Панель з вирізом"',
    en: 'Table support "Panel with cutout"',
    de: 'Tischstütze "Panel mit Ausschnitt"',
  },

  'fe-article-3': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-3': {
    ua: '15 кг',
    en: '15 kg',
    de: '15 kg',
  },

  'fe-price-3': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-3': {
    ua: 'Опора стола "Панель з вирізом" має сучасний та функціональний дизайн. Конструкція включає вертикальну панель з центральним вирізом і верхню пластину товщиною 4 мм. Виріз у панелі додає опорі візуальної легкості та унікальності. Верхня пластина оснащена отворами для надійного кріплення до стільниці. Вся конструкція виготовлена з міцного металу і пофарбована порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Така опора ідеально підходить для сучасних інтер`єрів, поєднуючи стильний вигляд з практичністю та надійністю.',
    en: 'The table support "Panel with cutout" features a modern and functional design. The structure includes a vertical panel with a central cutout and a top plate that is 4 mm thick. The cutout in the panel adds visual lightness and uniqueness to the support. The top plate is equipped with holes for secure attachment to the tabletop. The entire structure is made of durable metal and powder-coated in black, providing corrosion protection and longevity. This support is ideal for modern interiors, combining a stylish appearance with practicality and reliability.',
    de: 'Die Tischstütze "Panel mit Ausschnitt" verfügt über ein modernes und funktionales Design. Die Konstruktion umfasst eine vertikale Platte mit einem zentralen Ausschnitt und eine 4 mm dicke obere Platte. Der Ausschnitt in der Platte verleiht der Stütze visuelle Leichtigkeit und Einzigartigkeit. Die obere Platte ist mit Löchern für eine sichere Befestigung an der Tischplatte ausgestattet. Die gesamte Konstruktion besteht aus strapazierfähigem Metall und ist schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Diese Stütze ist ideal für moderne Innenräume und kombiniert ein stilvolles Erscheinungsbild mit Praktikabilität und Zuverlässigkeit.',
  },
  'fe-name-4': {
    ua: 'Опора стола Х',
    en: 'Table support X',
    de: 'Tischstütze X',
  },
  'fe-name-4-1': {
    ua: 'Опора стола Х',
    en: 'Table support X',
    de: 'Tischstütze X',
  },

  'fe-article-4': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-4': {
    ua: '16 кг',
    en: '16 kg',
    de: '16 kg',
  },

  'fe-price-4': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-4': {
    ua: 'Опора стола "Х" має сучасний та індустріальний дизайн, який включає верхню пластину товщиною 4 мм і нижню основу та ребра з товщиною 8 мм. Вона виконана у формі літери "Х", що забезпечує максимальну стійкість і надійність конструкції. Верхня пластина має отвори для кріплення до стільниці, а нижня частина і ребра додають міцності і стійкості. Металеві частини пофарбовані порошковою фарбою чорного кольору, що забезпечує захист від корозії та надає естетичний вигляд. Ця опора ідеально підходить для сучасних інтер`єрів, поєднуючи функціональність та стильний вигляд.',
    en: 'The table support "X" features a modern and industrial design, including a 4 mm thick top plate and an 8 mm thick bottom base and ribs. It is shaped like the letter "X," ensuring maximum stability and reliability of the structure. The top plate has holes for attaching to the tabletop, while the bottom part and ribs add strength and stability. The metal parts are powder-coated in black, providing corrosion protection and an aesthetic appearance. This support is ideal for modern interiors, combining functionality and stylish looks.',
    de: 'Die Tischstütze "X" hat ein modernes und industrielles Design, das eine 4 mm dicke obere Platte und eine 8 mm dicke untere Basis und Rippen umfasst. Sie ist in Form des Buchstabens "X" gestaltet, was maximale Stabilität und Zuverlässigkeit der Konstruktion gewährleistet. Die obere Platte hat Löcher zur Befestigung an der Tischplatte, während der untere Teil und die Rippen für zusätzliche Festigkeit und Stabilität sorgen. Die Metallelemente sind schwarz pulverbeschichtet, was Korrosionsschutz und ein ästhetisches Erscheinungsbild bietet. Diese Stütze ist ideal für moderne Innenräume und kombiniert Funktionalität und stilvolles Aussehen.',
  },
  'fe-name-5': {
    ua: 'Опора стола U DELTA',
    en: 'Table support U DELTA',
    de: 'Tischstütze U DELTA',
  },
  'fe-name-5-1': {
    ua: 'Опора стола U DELTA',
    en: 'Table support U DELTA',
    de: 'Tischstütze U DELTA',
  },

  'fe-article-5': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-5': {
    ua: '12 кг',
    en: '12 kg',
    de: '12 kg',
  },

  'fe-price-5': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-5': {
    ua: 'Опора стола U DELTA виготовлена з профільної труби розміром 40х80 мм. Вона має сучасний і мінімалістичний дизайн, що поєднує естетику та функціональність. Верхня пластина має товщину 4 мм і оснащена отворами для кріплення до стільниці. Конструкція у формі перевернутої літери "U" з косими елементами надає опорі додаткову жорсткість та стиль. Металеві частини пофарбовані порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Така опора ідеально підходить для сучасних інтер`єрів, поєднуючи міцність та елегантний вигляд.',
    en: 'The table support U DELTA is made of a 40x80 mm profile tube. It features a modern and minimalist design that combines aesthetics and functionality. The top plate is 4 mm thick and equipped with holes for attaching to the tabletop. The structure, in the shape of an inverted "U" with angled elements, provides additional rigidity and style to the support. The metal parts are powder-coated in black, ensuring corrosion protection and durability. This support is ideal for modern interiors, combining strength and elegant appearance.',
    de: 'Die Tischstütze U DELTA ist aus einem Profilrohr mit den Maßen 40x80 mm gefertigt. Sie hat ein modernes und minimalistisches Design, das Ästhetik und Funktionalität vereint. Die obere Platte ist 4 mm dick und mit Löchern zur Befestigung an der Tischplatte ausgestattet. Die Konstruktion in Form eines umgedrehten "U" mit schrägen Elementen verleiht der Stütze zusätzliche Steifigkeit und Stil. Die Metallelemente sind schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Diese Stütze ist ideal für moderne Innenräume und kombiniert Stärke mit einem eleganten Erscheinungsbild.',
  },
  'fe-name-6': {
    ua: 'Опора стола 8х4 4х3',
    en: 'Table support 8x4 4x3',
    de: 'Tischstütze 8x4 4x3',
  },
  'fe-name-6-1': {
    ua: 'Опора стола 8х4 4х3',
    en: 'Table support 8x4 4x3',
    de: 'Tischstütze 8x4 4x3',
  },

  'fe-article-6': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-6': {
    ua: '3 кг',
    en: '3 kg',
    de: '3 kg',
  },

  'fe-price-6': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-6': {
    ua: 'Опора стола 8х4 4х3 виготовлена з високоякісного металу і має сучасний мінімалістичний дизайн. Вона складається з верхньої пластини товщиною 4 мм з отворами для кріплення до стільниці і основної вертикальної частини, що забезпечує стійкість та надійність конструкції. Металеві частини пофарбовані порошковою фарбою чорного кольору, що надає опорі додаткову міцність і захист від корозії. Ця опора ідеально підходить для сучасних інтер`єрів, поєднуючи функціональність і естетику.',
    en: 'The table support 8x4 4x3 is made of high-quality metal and features a modern minimalist design. It consists of a 4 mm thick top plate with holes for attaching to the tabletop and a main vertical part that provides stability and reliability. The metal parts are powder-coated in black, adding extra strength and corrosion protection to the support. This support is ideal for modern interiors, combining functionality and aesthetics.',
    de: 'Die Tischstütze 8x4 4x3 ist aus hochwertigem Metall gefertigt und verfügt über ein modernes, minimalistisches Design. Sie besteht aus einer 4 mm dicken oberen Platte mit Löchern zur Befestigung an der Tischplatte und einem vertikalen Hauptteil, der Stabilität und Zuverlässigkeit bietet. Die Metallelemente sind schwarz pulverbeschichtet, was der Stütze zusätzliche Festigkeit und Korrosionsschutz verleiht. Diese Stütze ist ideal für moderne Innenräume und kombiniert Funktionalität und Ästhetik.',
  },
  'fe-name-7': {
    ua: 'Опора стола T ф550',
    en: 'T table support Ø550',
    de: 'T Tischstütze Ø550',
  },
  'fe-name-7-1': {
    ua: 'Опора стола T ф550',
    en: 'T table support Ø550',
    de: 'T Tischstütze Ø550',
  },

  'fe-article-7': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-7': {
    ua: '19 кг',
    en: '19 kg',
    de: '19 kg',
  },

  'fe-price-7': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-7': {
    ua: 'Ця опора стола має круглу базу та верхню пластину, виконані з високоякісного металу. Нижня плита товщиною 6 мм забезпечує стабільність і міцність конструкції, а верхня плита товщиною 4 мм має отвори для кріплення стільниці. Вертикальна стійка з`єднує обидві плити і додає конструкції елегантності та сучасного вигляду. Вся опора пофарбована порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Така опора ідеально підходить для використання в кафе, ресторанах або офісах, поєднуючи в собі естетику та функціональність.',
    en: 'This table support has a round base and top plate made of high-quality metal. The 6 mm thick bottom plate provides stability and strength to the structure, while the 4 mm thick top plate has holes for attaching the tabletop. A vertical stand connects both plates, adding elegance and a modern look to the design. The entire support is powder-coated in black, offering corrosion protection and durability. This support is ideal for use in cafes, restaurants, or offices, combining aesthetics and functionality.',
    de: 'Diese Tischstütze hat eine runde Basis und eine obere Platte aus hochwertigem Metall. Die 6 mm dicke untere Platte sorgt für Stabilität und Festigkeit der Konstruktion, während die 4 mm dicke obere Platte Löcher zur Befestigung der Tischplatte hat. Ein vertikaler Ständer verbindet beide Platten und verleiht dem Design Eleganz und ein modernes Aussehen. Die gesamte Stütze ist schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Diese Stütze ist ideal für den Einsatz in Cafés, Restaurants oder Büros und kombiniert Ästhetik und Funktionalität.',
  },
  'fe-name-8': {
    ua: 'Опора стола TT 820x550',
    en: 'Table support TT 820x550',
    de: 'Tischstütze TT 820x550',
  },
  'fe-name-8-1': {
    ua: 'Опора стола TT 820x550',
    en: 'Table support TT 820x550',
    de: 'Tischstütze TT 820x550',
  },

  'fe-article-8': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-8': {
    ua: '25 кг',
    en: '25 kg',
    de: '25 kg',
  },

  'fe-price-8': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-8': {
    ua: 'Опора стола TT розміром 820x550 мм має сучасний дизайн та міцну конструкцію. Верхня та нижня плити мають овальну форму, що додає естетичної привабливості та забезпечує стійкість. Нижня плита має товщину 6 мм, а верхня - 4 мм, з отворами для кріплення стільниці. Дві вертикальні стійки з`єднують верхню і нижню плити, створюючи надійну опору. Вся конструкція виконана з високоякісного металу та пофарбована порошковою фарбою чорного кольору, що забезпечує довговічність і захист від корозії. Ця опора ідеально підходить для використання в кафе, ресторанах або офісах, поєднуючи стильний вигляд з функціональністю.',

    en: 'The table support TT measuring 820x550 mm has a modern design and a sturdy construction. The top and bottom plates have an oval shape, adding aesthetic appeal and ensuring stability. The bottom plate is 6 mm thick, and the top plate is 4 mm thick, with holes for attaching the tabletop. Two vertical supports connect the top and bottom plates, creating a reliable support. The entire structure is made of high-quality metal and is powder-coated in black, providing durability and corrosion protection. This support is ideal for use in cafes, restaurants, or offices, combining a stylish look with functionality.',

    de: 'Die Tischstütze TT mit den Maßen 820x550 mm hat ein modernes Design und eine robuste Konstruktion. Die obere und untere Platte haben eine ovale Form, die ästhetische Anziehungskraft verleiht und Stabilität gewährleistet. Die untere Platte ist 6 mm dick und die obere Platte 4 mm dick, mit Löchern zur Befestigung der Tischplatte. Zwei vertikale Stützen verbinden die obere und untere Platte und schaffen eine zuverlässige Unterstützung. Die gesamte Struktur besteht aus hochwertigem Metall und ist schwarz pulverbeschichtet, was Langlebigkeit und Korrosionsschutz bietet. Diese Stütze ist ideal für den Einsatz in Cafés, Restaurants oder Büros und kombiniert einen stilvollen Look mit Funktionalität.',
  },
  'fe-name-9': {
    ua: 'Опора стола XXR',
    en: 'XXR table support',
    de: 'XXR Tischstütze',
  },
  'fe-name-9-1': {
    ua: 'Опора стола XXR',
    en: 'XXR table support',
    de: 'XXR Tischstütze',
  },

  'fe-article-9': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-9': {
    ua: '45 кг',
    en: '45 kg',
    de: '45 kg',
  },

  'fe-price-9': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-9': {
    ua: 'Опора столу XXR має верхню пластину товщиною 4 мм і пропонується в двох варіантах: з труби 40x100 мм і з труби 100x100 мм. Варіант з трубою 40x100 мм забезпечує легкість і стильний вигляд, підходить для середнього навантаження, тоді як варіант з трубою 100x100 мм є більш міцним і стабільним, ідеальний для важчих конструкцій та надає більш масивний вигляд.',
    en: 'The XXR table base features a 4 mm thick top plate and is available in two variants: with a 40x100 mm tube and with a 100x100 mm tube. The 40x100 mm tube variant provides a lightweight and stylish appearance, suitable for medium loads, while the 100x100 mm tube variant is sturdier and more stable, ideal for heavier constructions and offering a more substantial look.',
    de: 'Die XXR Tischbasis verfügt über eine 4 mm dicke Oberplatte und ist in zwei Varianten erhältlich: mit einem Rohr von 40x100 mm und mit einem Rohr von 100x100 mm. Die Variante mit dem Rohr 40x100 mm bietet ein leichtes und stilvolles Aussehen, geeignet für mittlere Belastungen, während die Variante mit dem Rohr 100x100 mm stabiler und robuster ist, ideal für schwerere Konstruktionen und bietet ein massiveres Aussehen.',
  },
  'fe-name-10': {
    ua: 'Опора стола UR',
    en: 'UR table base',
    de: 'UR Tischbasis',
  },
  'fe-name-10-1': {
    ua: 'Опора стола UR',
    en: 'UR table base',
    de: 'UR Tischbasis',
  },

  'fe-article-10': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-10': {
    ua: '13 кг',
    en: '13 kg',
    de: '13 kg',
  },

  'fe-price-10': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-10': {
    ua: 'Ця опора стола має прямокутну форму і виготовлена з профільних труб різних розмірів: 40х100 мм, 100х100 мм і 80х40 мм. Верхня пластина виконана з товщиною 4 мм і оснащена отворами для кріплення стільниці. Конструкція забезпечує високу міцність і стійкість завдяки використанню різних розмірів профільних труб, що надають опорі сучасного і стильного вигляду. Вся опора пофарбована порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Вона ідеально підходить для використання в інтер`єрах, де поєднуються функціональність і естетика.',

    en: 'This table support has a rectangular shape and is made from profile pipes of various sizes: 40x100 mm, 100x100 mm, and 80x40 mm. The top plate is 4 mm thick and equipped with holes for attaching the tabletop. The construction ensures high strength and stability due to the use of different-sized profile pipes, giving the support a modern and stylish appearance. The entire support is powder-coated in black, providing corrosion protection and durability. It is ideal for use in interiors where functionality and aesthetics are combined.',

    de: 'Diese Tischstütze hat eine rechteckige Form und ist aus Profilrohren verschiedener Größen gefertigt: 40x100 mm, 100x100 mm und 80x40 mm. Die obere Platte ist 4 mm dick und mit Löchern zur Befestigung der Tischplatte ausgestattet. Die Konstruktion gewährleistet hohe Festigkeit und Stabilität durch die Verwendung von Profilrohren unterschiedlicher Größe, was der Stütze ein modernes und stilvolles Aussehen verleiht. Die gesamte Stütze ist schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Sie eignet sich ideal für den Einsatz in Innenräumen, wo Funktionalität und Ästhetik kombiniert werden.',
  },
  'fe-name-11': {
    ua: 'Опора стола XR 8x4',
    en: 'XR 8x4 table base',
    de: 'XR 8x4 Tischbasis',
  },
  'fe-name-11-1': {
    ua: 'Опора стола XR 8x4',
    en: 'XR 8x4 table base',
    de: 'XR 8x4 Tischbasis',
  },

  'fe-article-11': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-11': {
    ua: '12 кг',
    en: '12 kg',
    de: '12 kg',
  },

  'fe-price-11': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-11': {
    ua: 'Ця опора стола має Х-подібну форму і виготовлена з профільних труб різних розмірів: 100х40 мм, 100х100 мм і 40х80 мм. Верхня пластина товщиною 4 мм має отвори для кріплення стільниці. Конструкція пофарбована порошковою фарбою чорного кольору, що забезпечує захист від корозії та довговічність. Така опора відзначається високою міцністю і стильним виглядом, підходить для використання в сучасних інтер`єрах, де поєднуються функціональність і естетика.',

    en: 'This table support has an X-shape and is made from profile pipes of various sizes: 100x40 mm, 100x100 mm, and 40x80 mm. The 4 mm thick top plate has holes for attaching the tabletop. The construction is powder-coated in black, providing corrosion protection and durability. This support is noted for its high strength and stylish appearance, making it suitable for use in modern interiors where functionality and aesthetics are combined.',

    de: 'Diese Tischstütze hat eine X-Form und ist aus Profilrohren verschiedener Größen gefertigt: 100x40 mm, 100x100 mm und 40x80 mm. Die obere Platte ist 4 mm dick und mit Löchern zur Befestigung der Tischplatte ausgestattet. Die Konstruktion ist schwarz pulverbeschichtet, was Korrosionsschutz und Langlebigkeit bietet. Diese Stütze zeichnet sich durch ihre hohe Festigkeit und ihr stilvolles Aussehen aus und eignet sich für den Einsatz in modernen Innenräumen, in denen Funktionalität und Ästhetik kombiniert werden.',
  },
  'fe-name-12': {
    ua: 'Опора стола для журнального столика',
    en: 'Coffee table base',
    de: 'Kaffeetischbasis',
  },
  'fe-name-12-1': {
    ua: 'Опора стола для журнального столика',
    en: 'Coffee table base',
    de: 'Kaffeetischbasis',
  },

  'fe-article-12': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-12': {
    ua: '7 кг',
    en: '7 kg',
    de: '7 kg',
  },

  'fe-price-12': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-12': {
    ua: 'Ця опора стола складається з ніжок товщиною 8 мм і верхньої пластини товщиною 4 мм. Ніжки розташовані у формі літери "Х", що забезпечує стійкість і надійність конструкції. Верхня пластина має отвори для кріплення стільниці. Опора пофарбована порошковою фарбою, що захищає її від корозії та додає естетичний вигляд. Така конструкція підходить для використання в сучасних інтер`єрах, забезпечуючи одночасно міцність і стильний дизайн.',
    en: 'This table base consists of legs with a thickness of 8 mm and a top plate with a thickness of 4 mm. The legs are arranged in an "X" shape, providing stability and reliability to the structure. The top plate has holes for attaching the tabletop. The base is powder-coated, which protects it from corrosion and gives it an aesthetic appearance. This design is suitable for use in modern interiors, offering both strength and a stylish design.',
    de: 'Diese Tischbasis besteht aus Beinen mit einer Dicke von 8 mm und einer oberen Platte mit einer Dicke von 4 mm. Die Beine sind in Form eines "X" angeordnet, was Stabilität und Zuverlässigkeit der Konstruktion gewährleistet. Die obere Platte hat Löcher zur Befestigung der Tischplatte. Die Basis ist pulverbeschichtet, was sie vor Korrosion schützt und ihr ein ästhetisches Aussehen verleiht. Dieses Design eignet sich für moderne Interieurs und bietet gleichzeitig Festigkeit und ein stilvolles Design.',
  },
  'fe-name-13': {
    ua: 'Опора стола',
    en: 'Table base',
    de: 'Tischbasis',
  },
  'fe-name-13-1': {
    ua: 'Опора стола',
    en: 'Table base',
    de: 'Tischbasis',
  },

  'fe-article-13': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-13': {
    ua: '8 кг',
    en: '8 kg',
    de: '8 kg',
  },

  'fe-price-13': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-13': {
    ua: 'Ця опора стола складається з ніжок товщиною 8 мм і верхньої пластини товщиною 4 мм. Ніжки розташовані у формі літери "Х", що забезпечує стійкість і надійність конструкції. Верхня пластина має отвори для кріплення стільниці. Опора пофарбована порошковою фарбою, що захищає її від корозії та додає естетичний вигляд. Така конструкція підходить для використання в сучасних інтер`єрах, забезпечуючи одночасно міцність і стильний дизайн.',
    en: 'This table base consists of legs with a thickness of 8 mm and a top plate with a thickness of 4 mm. The legs are arranged in an "X" shape, providing stability and reliability to the structure. The top plate has holes for attaching the tabletop. The base is powder-coated, which protects it from corrosion and gives it an aesthetic appearance. This design is suitable for use in modern interiors, offering both strength and a stylish design.',
    de: 'Diese Tischbasis besteht aus Beinen mit einer Dicke von 8 mm und einer oberen Platte mit einer Dicke von 4 mm. Die Beine sind in Form eines "X" angeordnet, was Stabilität und Zuverlässigkeit der Konstruktion gewährleistet. Die obere Platte hat Löcher zur Befestigung der Tischplatte. Die Basis ist pulverbeschichtet, was sie vor Korrosion schützt und ihr ein ästhetisches Aussehen verleiht. Dieses Design eignet sich für moderne Interieurs und bietet gleichzeitig Festigkeit und ein stilvolles Design.',
  },
  'fe-name-14': {
    ua: 'Опора стола XXO 7x1',
    en: 'XXO 7x1 table base',
    de: 'XXO 7x1 Tischbasis',
  },
  'fe-name-14-1': {
    ua: 'Опора стола XXO 7x1',
    en: 'XXO 7x1 table base',
    de: 'XXO 7x1 Tischbasis',
  },

  'fe-article-14': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-14': {
    ua: '19 кг',
    en: '19 kg',
    de: '19 kg',
  },

  'fe-price-14': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-14': {
    ua: 'Ця опора стола має круглу верхню пластину товщиною 4 мм і чотири лапи товщиною 8 мм, які утворюють стабільну конструкцію. Верхня пластина оснащена отворами для кріплення стільниці. Конструкція виглядає сучасно та надійно завдяки використанню міцних матеріалів і збалансованій формі. Порошкове покриття додає опорі естетичний вигляд і захищає від корозії. Така опора підходить для використання в інтер`єрах з круглими або овальними стільницями.',

    en: 'This table support has a round top plate with a thickness of 4 mm and four legs with a thickness of 8 mm, creating a stable structure. The top plate is equipped with holes for attaching the tabletop. The construction looks modern and reliable due to the use of strong materials and a balanced shape. The powder coating adds an aesthetic appearance and protects against corrosion. This support is suitable for use in interiors with round or oval tabletops.',

    de: 'Diese Tischstütze hat eine runde obere Platte mit einer Dicke von 4 mm und vier Beine mit einer Dicke von 8 mm, die eine stabile Struktur bilden. Die obere Platte ist mit Löchern zur Befestigung der Tischplatte ausgestattet. Die Konstruktion sieht modern und zuverlässig aus, dank der Verwendung starker Materialien und einer ausgewogenen Form. Die Pulverbeschichtung verleiht ein ästhetisches Aussehen und schützt vor Korrosion. Diese Stütze eignet sich für den Einsatz in Innenräumen mit runden oder ovalen Tischplatten.',
  },
  'fe-name-15': {
    ua: 'Опора стола XXV 7х1',
    en: 'XXV 7x1 table base',
    de: 'XXV 7x1 Tischbasis',
  },
  'fe-name-15-1': {
    ua: 'Опора стола XXV 7х1',
    en: 'XXV 7x1 table base',
    de: 'XXV 7x1 Tischbasis',
  },

  'fe-article-15': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-15': {
    ua: '30 кг',
    en: '30 kg',
    de: '30 kg',
  },

  'fe-price-15': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-15': {
    ua: 'Ця опора стола виготовлена з полоси розміром 10x70 мм. Її геометричний дизайн складається з чотирьох основних ніжок, з`єднаних між собою вгорі та внизу, що забезпечує високу стійкість та міцність. Опора має сучасний вигляд і підходить для використання з різними типами стільниць, додаючи інтер`єру оригінальності та стилю.',

    en: 'This table support is made from a strip measuring 10x70 mm. Its geometric design consists of four main legs connected at the top and bottom, providing high stability and strength. The support has a modern appearance and is suitable for use with various types of tabletops, adding originality and style to the interior.',

    de: 'Diese Tischstütze ist aus einem Streifen mit den Maßen 10x70 mm gefertigt. Ihr geometrisches Design besteht aus vier Hauptbeinen, die oben und unten verbunden sind, was für hohe Stabilität und Festigkeit sorgt. Die Stütze hat ein modernes Erscheinungsbild und ist für die Verwendung mit verschiedenen Tischplatten geeignet, wodurch dem Innenraum Originalität und Stil verliehen wird.',
  },
  'fe-name-16': {
    ua: 'Опора стола T 45x45',
    en: 'T 45x45 table base',
    de: 'T 45x45 Tischbasis',
  },
  'fe-name-16-1': {
    ua: 'Опора стола T 45x45',
    en: 'T 45x45 table base',
    de: 'T 45x45 Tischbasis',
  },

  'fe-article-16': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-16': {
    ua: '14 кг',
    en: '14 kg',
    de: '14 kg',
  },

  'fe-price-16': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-16': {
    ua: 'Ця опора стола складається з квадратної основи товщиною 6 мм, верхньої пластини товщиною 4 мм та труби розміром 60x60 мм. Дизайн забезпечує стабільність та міцність конструкції, роблячи її ідеальною для різних типів столів. Сучасний і мінімалістичний вигляд опори підходить для використання в різних інтер`єрах.',

    en: 'This table support consists of a square base 6 mm thick, a top plate 4 mm thick, and a tube measuring 60x60 mm. The design ensures stability and strength, making it ideal for various types of tables. The modern and minimalist appearance of the support is suitable for use in different interiors.',

    de: 'Diese Tischstütze besteht aus einer quadratischen Basis mit einer Dicke von 6 mm, einer oberen Platte mit einer Dicke von 4 mm und einem Rohr mit den Maßen 60x60 mm. Das Design gewährleistet Stabilität und Festigkeit und macht es ideal für verschiedene Tischarten. Das moderne und minimalistische Erscheinungsbild der Stütze eignet sich für die Verwendung in verschiedenen Innenräumen.',
  },
  'fe-name-17': {
    ua: 'Опора стола (труба трикутник)',
    en: 'Table base (triangle tube)',
    de: 'Tischbasis (Dreieckrohr)',
  },
  'fe-name-17-1': {
    ua: 'Опора стола (труба трикутник)',
    en: 'Table base (triangle tube)',
    de: 'Tischbasis (Dreieckrohr)',
  },

  'fe-article-17': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-17': {
    ua: '9 кг',
    en: '9 kg',
    de: '9 kg',
  },

  'fe-price-17': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-17': {
    ua: 'Ця опора стола має верхню пластину товщиною 4 мм і виготовлена у формі трикутника, що забезпечує їй міцність і стійкість. Горизонтальна та вертикальна частини опори утворюють жорстку конструкцію, що робить її надійною для використання з різними типами столів. Дизайн додає сучасного вигляду та підходить для різних інтер`єрів.',

    en: 'This table support has a 4 mm thick top plate and is designed in a triangular shape, providing it with strength and stability. The horizontal and vertical parts of the support form a rigid structure, making it reliable for use with various types of tables. The design adds a modern look and suits different interiors.',

    de: 'Diese Tischstütze hat eine 4 mm dicke obere Platte und ist in Form eines Dreiecks gestaltet, was ihr Festigkeit und Stabilität verleiht. Die horizontalen und vertikalen Teile der Stütze bilden eine starre Struktur, die sie für die Verwendung mit verschiedenen Tischarten zuverlässig macht. Das Design verleiht ihr ein modernes Aussehen und passt zu verschiedenen Innenräumen.',
  },
  'fe-name-18': {
    ua: 'Опора стола ХХS 73x75/3',
    en: 'XXS 73x75/3 table base',
    de: 'XXS 73x75/3 Tischbasis',
  },
  'fe-name-18-1': {
    ua: 'Опора стола ХХS 73x75/3',
    en: 'XXS 73x75/3 table base',
    de: 'XXS 73x75/3 Tischbasis',
  },

  'fe-article-18': {
    ua: 'Артикул',
    en: '',
    de: '',
  },
  'fe-weight-18': {
    ua: '10 кг',
    en: '10 kg',
    de: '10 kg',
  },

  'fe-price-18': {
    ua: 'Ціну уточнюйте',
    en: 'Price on request',
    de: 'Preis auf Anfrage',
  },
  'fe-description-18': {
    ua: 'Ця опора стола має основу товщиною 6 мм. Її конструкція виконана у формі перехрещених елементів, що додає їй оригінальності та сучасного вигляду. Такий дизайн забезпечує високу стійкість і надійність, роблячи опору підходящою для використання з великими та важкими стільницями. Опора пофарбована порошковою фарбою, що додає їй додаткового захисту та довговічності.',

    en: 'This table support has a 6 mm thick base. Its design features intersecting elements, adding originality and a modern look. This design ensures high stability and reliability, making the support suitable for use with large and heavy tabletops. The support is powder-coated, providing additional protection and durability.',

    de: 'Diese Tischstütze hat eine 6 mm dicke Basis. Ihre Konstruktion besteht aus sich kreuzenden Elementen, was ihr Originalität und ein modernes Aussehen verleiht. Dieses Design gewährleistet eine hohe Stabilität und Zuverlässigkeit und macht die Stütze für den Einsatz mit großen und schweren Tischplatten geeignet. Die Stütze ist pulverbeschichtet, was zusätzlichen Schutz und Langlebigkeit bietet.',
  },

  'news-index-1': {
    ua: 'Тендер на закупівлю обладнання!',
    en: 'Tender for equipment procurement!',
    de: 'Ausschreibung für den Einkauf von Ausrüstung!',
  },

  'news-up': {
    ua: 'Вгору',
    en: 'Up',
    de: 'Nach oben',
  },

  'news-index-2': {
    ua: 'Підприємство має на меті закупити обладнання, а саме: Лазер листовий Bodor Laser C3 3000 W Maxphotonics. Вартість має бути вказана з ПДВ. Прохання комерційні пропозиції надсилати на електронну пошту:',
    en: 'The company aims to purchase equipment, specifically: Sheet laser Bodor Laser C3 3000 W Maxphotonics. The price must be indicated with VAT. Please send commercial offers to the email:',
    de: 'Das Unternehmen beabsichtigt, Ausrüstung zu kaufen, und zwar: Blechlaser Bodor Laser C3 3000 W Maxphotonics. Der Preis muss inklusive Mehrwertsteuer angegeben werden. Bitte senden Sie Ihre kommerziellen Angebote per E-Mail an:',
  },

  'news-index-3': {
    ua: 'Тендер на закупівлю обладнання!',
    en: 'Tender for equipment procurement!',
    de: 'Ausschreibung für den Einkauf von Ausrüstung!',
  },

  'news-index-4': {
    ua: 'Підприємство має на меті закупити обладнання, а саме: Гідравлічний трубогинний верстат CNC 3D 50 4Axes-2Radius Maxphotonics. Вартість має бути вказана з ПДВ. Прохання комерційні пропозиції надсилати на електронну пошту:',
    en: 'The company aims to purchase equipment, specifically: Hydraulic pipe bending machine CNC 3D 50 4Axes-2Radius Maxphotonics. The price must be indicated with VAT. Please send commercial offers to the email:',
    de: 'Das Unternehmen beabsichtigt, Ausrüstung zu kaufen, und zwar: Hydraulische Rohrbiegemaschine CNC 3D 50 4Axes-2Radius Maxphotonics. Der Preis muss inklusive Mehrwertsteuer angegeben werden. Bitte senden Sie Ihre kommerziellen Angebote per E-Mail an:',
  },

  'news-index-5': {
    ua: 'Більше новин',
    en: 'More news',
    de: 'Mehr Nachrichten',
  },

  'news-index-6': {
    ua: 'Від ідеї до результату - Інтерв`ю з керівником',
    en: 'From Idea to Result - An Interview with the Director',
    de: 'Von der Idee zum Ergebnis - Ein Interview mit dem Geschäftsführer',
  },

  'news-index-7': {
    ua: 'У інтерв`ю ви дізнаєтесь про унікальні можливості компанії АрмаксМГ, такі як лазерна порізка, гнуття, механічна обробка, порошкове фарбування та зварювання металу. АрмаксМГ продовжує працювати і розвиватись, незважаючи на виклики війни, отримуючи нові замовлення та підтримку у вигляді грантів від USAID.',
    en: 'In the interview, you will learn about the unique capabilities of ArmaxMG, such as laser cutting, bending, machining, powder coating, and metal welding. ArmaxMG continues to operate and grow despite the challenges of the war, receiving new orders and support in the form of grants from USAID.',
    de: 'Im Interview erfahren Sie mehr über die einzigartigen Möglichkeiten von ArmaxMG, wie Laserschneiden, Biegen, mechanische Bearbeitung, Pulverbeschichtung und Metallschweißen. ArmaxMG arbeitet und wächst trotz der Herausforderungen des Krieges weiter, erhält neue Aufträge und Unterstützung in Form von Zuschüssen von USAID.',
  },
  'news-index-8': {
    ua: 'ArmaxMG: Технології за хвилину',
    en: 'ArmaxMG: Technology in a Minute',
    de: 'ArmaxMG: Technologie in einer Minute',
  },
  'news-index-9': {
    ua: 'Погляньте на роботу нашої команди у виробничому процесі! Коротке відео з дрона і землі показує моменти, де працівники демонструють професіоналізм і взаємодію з сучасним обладнанням. Відчуйте атмосферу, де людські вміння та інновації об`єднуються для створення якісних продуктів!',
    en: 'Take a look at our team in action during the production process! A short video captured by drone and from the ground showcases moments where employees demonstrate professionalism and interact with modern equipment. Feel the atmosphere where human skills and innovation come together to create quality products!',
    de: 'Werfen Sie einen Blick auf die Arbeit unseres Teams im Produktionsprozess! Ein kurzes Video, aufgenommen mit einer Drohne und vom Boden aus, zeigt Momente, in denen Mitarbeiter Professionalität zeigen und mit moderner Ausrüstung interagieren. Spüren Sie die Atmosphäre, in der menschliche Fähigkeiten und Innovationen zur Herstellung hochwertiger Produkte zusammenkommen!',
  },
  'news-index-10': {
    ua: 'Незабаром відкриття нового цеху АрмаксМГ!',
    en: 'The grand opening of a new ArmaxMG workshop is coming soon!',
    de: 'Die Eröffnung einer neuen Werkstatt von ArmaxMG steht bevor!',
  },

  'news-index-11': {
    ua: 'Ми раді поділитися чудовою новиною — незабаром відбудеться відкриття п`ятого цеху Армакс МГ! Новий цех оснащено сучасним лазерним труборізом, який значно розширить наші виробничі можливості та дозволить виконувати ще більш складні завдання з високою точністю. На нашому сайті ви зможете побачити весь процес створення цього цеху: від початкового будівництва до запуску інноваційного обладнання. Долучайтеся до історії розвитку Армакс МГ разом із нами!',
    en: 'We are excited to share great news — the fifth Armax MG workshop is opening soon! The new workshop is equipped with a state-of-the-art laser tube cutter, which will significantly expand our production capabilities and enable us to perform even more complex tasks with exceptional precision. On our website, you will be able to see the entire process of creating this workshop: from the initial construction to the launch of innovative equipment. Join us in the journey of Armax MG`s growth!',
    de: 'Wir freuen uns, großartige Neuigkeiten zu teilen – bald wird die fünfte Werkstatt von Armax MG eröffnet! Die neue Werkstatt ist mit einem hochmodernen Laserschneider für Rohre ausgestattet, der unsere Produktionsmöglichkeiten erheblich erweitert und es uns ermöglicht, noch komplexere Aufgaben mit höchster Präzision zu erledigen. Auf unserer Website können Sie den gesamten Prozess der Entstehung dieser Werkstatt verfolgen: von der anfänglichen Konstruktion bis hin zur Inbetriebnahme innovativer Geräte. Seien Sie Teil der Erfolgsgeschichte von Armax MG!',
  },

  'calc-1': {
    ua: 'Залишилися запитання? Залиште свої дані, ми з Вами зв`яжемося!',
    en: 'Have any questions? Leave your details, and we will contact you!',
    de: 'Haben Sie Fragen? Hinterlassen Sie Ihre Daten, und wir werden uns mit Ihnen in Verbindung setzen!',
  },

  'calc-2': {
    ua: 'Напишіть',
    en: 'Write',
    de: 'Schreiben',
  },
  'calc-3': {
    ua: 'нам',
    en: 'to us',
    de: 'uns',
  },
  'modal-1': {
    ua: "Зворотній зв'язок",
    en: 'Feedback',
    de: 'Rückmeldung',
  },
  'modal-2': {
    ua: 'Залиште Ваш номер телефону, або електрону адресу, і наш менеджер якнайшвидше звʼяжеться з Вами!',
    en: 'Leave your phone number or email address, and our manager will contact you as soon as possible!',
    de: 'Hinterlassen Sie Ihre Telefonnummer oder E-Mail-Adresse, und unser Manager wird sich so schnell wie möglich mit Ihnen in Verbindung setzen!',
  },
  'modal-3': {
    ua: 'Відправити запит',
    en: 'Send Request',
    de: 'Anfrage senden',
  },
  'modal-4': {
    ua: 'телефон або e-mail',
    en: 'phone or email',
    de: 'Telefon oder E-Mail',
  },

  // -------news

  'article-news-1': {
    ua: 'Як обрати металеві елементи для комерційного простору: від меблів до декору',
    en: 'How to choose metal elements for a commercial space: from furniture to decor',
    de: 'Wie man Metallelemente für gewerbliche Räume auswählt: von Möbeln bis hin zur Dekoration',
  },
  'article-news-2': {
    ua: 'Сучасний дизайн комерційних приміщень усе більше звертається до металу як до ключового матеріалу. Його використовують для створення меблів, декору та функціональних елементів, що відповідають стилю лофт, який набув великої популярності завдяки своїй індустріальній естетиці. Як компанія, що спеціалізується на обробці металів та виготовленні металевих деталей, ми хочемо поділитися порадами щодо вибору оптимальних металевих елементів для вашого простору.',
    en: 'Modern commercial space design increasingly turns to metal as a key material. It is used to create furniture, decor, and functional elements that fit the loft style, which has gained great popularity thanks to its industrial aesthetic. As a company specializing in metalworking and manufacturing metal parts, we would like to share tips on choosing the best metal elements for your space.',
    de: 'Das moderne Design von Geschäftsräumen greift immer mehr auf Metall als Schlüsselmaterial zurück. Es wird zur Herstellung von Möbeln, Dekorationen und funktionalen Elementen verwendet, die dem Loft-Stil entsprechen, der dank seiner industriellen Ästhetik große Popularität erlangt hat. Als Unternehmen, das auf die Metallbearbeitung und die Herstellung von Metallelementen spezialisiert ist, möchten wir Ihnen einige Tipps zur Auswahl der besten Metallelemente für Ihren Raum geben.',
  },

  'article-news-3': {
    ua: 'Переваги металевих елементів',
    en: 'Advantages of metal elements',
    de: 'Vorteile von Metallelementen',
  },

  'article-news-4': {
    ua: 'Метал є ідеальним матеріалом для комерційних приміщень завдяки своїм ключовим перевагам:',
    en: 'Metal is the ideal material for commercial spaces due to its key advantages:',
    de: 'Metall ist das ideale Material für gewerbliche Räume aufgrund seiner wesentlichen Vorteile:',
  },
  'article-news-5': {
    ua: 'Міцність і надійність:',
    en: 'Strength and reliability:',
    de: 'Festigkeit und Zuverlässigkeit:',
  },
  'article-news-6': {
    ua: 'Металеві елементи можуть витримувати значні навантаження, що є важливим для меблів і конструкцій у комерційних просторах.',
    en: 'Metal elements can withstand significant loads, which is important for furniture and structures in commercial spaces.',
    de: 'Metallelemente können erhebliche Belastungen aushalten, was für Möbel und Konstruktionen in gewerblichen Räumen von Bedeutung ist.',
  },
  'article-news-7': {
    ua: 'Стійкість до зносу:',
    en: 'Durability:',
    de: 'Langlebigkeit:',
  },
  'article-news-8': {
    ua: 'Метал не боїться фізичних ушкоджень та впливу вологи, що робить його ідеальним для використання в різних умовах.',
    en: 'Metal is resistant to physical damage and moisture, making it ideal for use in various conditions.',
    de: 'Metall ist unempfindlich gegenüber physischen Beschädigungen und Feuchtigkeit, was es ideal für den Einsatz unter verschiedenen Bedingungen macht.',
  },
  'article-news-9': {
    ua: 'Стійкість до зносу:',
    en: 'Durability:',
    de: 'Langlebigkeit:',
  },
  'article-news-10': {
    ua: 'Металеві деталі надають простору сучасного, індустріального вигляду, який підходить для різних інтер’єрів, особливо у стилі лофт.',
    en: 'Metal details give the space a modern, industrial look that fits various interiors, especially in the loft style.',
    de: 'Metallelemente verleihen dem Raum ein modernes, industrielles Aussehen, das zu verschiedenen Innenräumen passt, insbesondere im Loft-Stil.',
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
