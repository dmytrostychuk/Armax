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
    ua: '2000х1500х1000 мм.',
    en: '2000x1500x1000 mm.',
    de: '2000x1500x1000 mm.',
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
    ua: 'Ми виконуємо різноманітні механічні роботи, включаючи токарні операції, фрезерні, шліфувальні, зубонарізні роботи та гартування металу в печах.',
    en: 'We perform various mechanical works, including turning operations, milling, grinding, gear cutting works, and metal hardening in furnaces.',
    de: 'Wir führen verschiedene mechanische Arbeiten aus, darunter Dreharbeiten, Fräsen, Schleifen, Zahnradschneiden und Metallhärten in Öfen.',
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
};
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
