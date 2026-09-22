import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react'
import './App.css'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const company = {
  phone: '+7 (903) 310-01-25',
  office: '+7 (347) 298-01-25',
  email: 'dispetcherbmr@yandex.ru',
  officeAddress: '450081, Республика Башкортостан, город Уфа, ул. Уфимское шоссе, д. 43',
  productionAddress:
    'Республика Башкортостан, Иглинский район, с.п. Красновосходский сельсовет, территория Башминералресурс, здание 5',
  map: 'https://yandex.ru/maps/org/bashmineralresurs/40841570634/?ll=57.116105%2C55.006176&z=12.56',
}

const products = {
  manganese: {
    id: 'manganese',
    eyebrow: 'Продукт 01',
    title: 'Марганцовистый флюсующий известняк',
    subtitle: 'Комплексная марганцовистая флюсующая добавка для металлургического производства',
    intro:
      'Осадочная горная порода с природным содержанием марганца и кальция. После дробления и рассева материал подготавливается под согласованную технологическую задачу.',
    hero: 'content/flux-material.webp',
    accent: 'Три стадии дробления и рассева на ДСК',
    specs: [
      ['Базовый продукт', 'Марганцовистый известняк фракции 0–6 мм'],
      ['Применение', 'Агломерация и дальнейшие металлургические переделы'],
      ['Состав', 'Подтверждается лабораторным протоколом партии'],
      ['Отгрузка', 'Автомобильным или железнодорожным транспортом'],
    ],
    uses: [
      ['Агломерация', 'Ввод марганцевого и кальциевого компонентов в состав шихты.'],
      ['Окатыши', 'Использование как компонента при производстве железорудных окатышей.'],
      ['Второй передел', 'Обжиг, агломерация и другие варианты находятся в проработке и лабораторных испытаниях.'],
    ],
    value:
      'По материалам исследований продукт рассматривается как комплексное сырьё: марганцевый компонент участвует в формировании свойств шихты, а карбонат кальция выполняет функцию флюсующей основы.',
    usesEyebrow: 'Варианты внедрения',
    usesTitle: 'Сценарии применения продукта',
    testingHistory: [
      ['Лабораторные исследования', 'Хронология исследований состава и свойств сырья будет дополнена протоколами и письмами научных организаций.'],
      ['Промышленные испытания', 'В разделе будут собраны этапы испытаний на металлургических предприятиях и выводы технологических служб.'],
      ['Текущий этап', 'Материалы по действующим поставкам и дальнейшим вариантам внедрения готовятся к публикации.'],
    ],
    process: [
      ['01', 'Добыча', 'Открытая разработка карьеров Северный и Ново-Северный.', 'content/flux-material.webp'],
      ['02', 'Дробление', 'Три стадии дробления и рассева на дробильно-сортировочном комплексе.', 'content/flux-processing.webp'],
      ['03', 'Контроль качества', 'Лабораторные испытания состава, фракции и влажности конкретной партии.', 'content/flux-laboratory.webp'],
      ['04', 'Отгрузка', 'Паспорт партии и отправка автомобильным или железнодорожным транспортом.', 'content/flux-shipping.webp'],
    ],
    gallery: [
      ['Исходный материал', 'content/flux-material.webp'],
      ['Подготовленный материал', 'content/flux-stockpile.webp'],
      ['Дробильно-сортировочный комплекс', 'content/flux-processing.webp'],
      ['Производственная площадка', 'content/flux-complex.webp'],
    ],
    consumers: [
      ['Действующий потребитель', 'ЕВРАЗ-ВГОК — поставки марганцовистого известняка для металлургического направления.'],
      ['Развитие направления', 'Продукт прорабатывается для применения на других металлургических предприятиях и в дополнительных технологических переделах.'],
    ],
    evidence: [
      ['Письма научных организаций', 'Исследования свойств сырья и рекомендации по промышленному применению.'],
      ['Акты и заключения предприятий', 'Материалы Липецкого комбината, ЕВРАЗа и других организаций.'],
      ['Результаты испытаний', 'Лабораторные и промышленные протоколы будут размещены после подготовки к публикации.'],
    ],
  },
  gypsum: {
    id: 'gypsum',
    eyebrow: 'Продукт 02',
    title: 'Камень гипсовый и гипсоангидритовый',
    subtitle: 'Сырьё для цементных и строительных производств',
    intro:
      'Камень Тюлько-Тюбинского месторождения для цементных заводов, производителей сухих смесей, гипсовых вяжущих и изделий.',
    hero: 'content/gypsum-stone.webp',
    accent: 'Высокое природное качество и белизна камня',
    specs: [
      ['Месторождение', 'Тюлько-Тюбинское'],
      ['Основные потребители', 'Цементные заводы и производители сухих строительных смесей'],
      ['Качество', 'Оценивается по ГОСТ 4013-2019 и паспорту партии'],
      ['Отгрузка', 'Автомобильным или железнодорожным транспортом'],
    ],
    uses: [
      ['Цемент', 'Компонент цементного производства.'],
      ['Сухие смеси', 'Сырьё для гипсовых вяжущих и сухих строительных смесей.'],
      ['Гипсовые изделия', 'Применение в гипсокартоне и других строительных материалах.'],
    ],
    value:
      'Природное качество и белизна камня позволяют подбирать сырьё под технологические требования заказчика. Итоговые характеристики фиксируются в документах конкретной партии.',
    usesEyebrow: 'Применение',
    usesTitle: 'Направления применения продукта',
    testingHistory: [],
    process: [
      ['01', 'Добыча', 'Открытая разработка Тюлько-Тюбинского месторождения.', 'content/gypsum-quarry.webp'],
      ['02', 'Подготовка', 'Дробление и подготовка материала под согласованную фракцию.', 'content/gypsum-processing.webp'],
      ['03', 'Контроль качества', 'Лабораторная проверка показателей и оформление протокола.', 'content/gypsum-laboratory.webp'],
      ['04', 'Отгрузка', 'Погрузка подготовленной партии на автомобильный или железнодорожный транспорт.', 'content/gypsum-shipping.webp'],
    ],
    gallery: [
      ['Тюлько-Тюбинское месторождение', 'content/gypsum-quarry.webp'],
      ['Гипсовый и ангидритовый камень', 'content/gypsum-stone.webp'],
      ['Дробильно-сортировочная линия', 'content/gypsum-processing.webp'],
      ['Погрузка партии', 'content/gypsum-loading.webp'],
    ],
    consumers: [
      ['Цементные предприятия', 'Регулярные поставки предприятиям Урала и Сибири, включая ЦЕМРОС, Сибирский цемент, Аккерманн Цемент, МЦОЗ и СЛК Цемент.'],
      ['Строительные материалы', 'Сырьё предназначено для производителей сухих смесей, гипсовых вяжущих, гипсокартона и других строительных материалов.'],
    ],
    evidence: [],
  },
} as const

type Product = (typeof products)[keyof typeof products]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo${compact ? ' logo--compact' : ''}`}>
      <img src={asset('brand/bashmineralresurs-original.png')} alt="Башминералресурс" />
    </span>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="siteHeader">
      <a className="headerBrand" href="#top" onClick={close} aria-label="БашМинералРесурс — на главную">
        <Logo />
      </a>
      <button className="menuButton" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Открыть меню">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? 'isOpen' : ''} aria-label="Основная навигация">
        <a href="#history" onClick={close}><span>О компании</span></a>
        <a href="#/gypsum" onClick={close}><span>Камень гипсовый и</span><span>гипсоангидритовый</span></a>
        <a href="#/manganese" onClick={close}><span>Марганцовистый</span><span>флюсующий известняк</span></a>
        <a href="#contacts" onClick={close}>Контакты</a>
      </nav>
      <div className="headerContacts">
        <a href="tel:+79033100125"><Phone size={17} />{company.phone}</a>
        <a href={`mailto:${company.email}`}><Mail size={17} /><span>{company.email}</span></a>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, text, inverse = false }: { eyebrow: string; title: ReactNode; text?: string; inverse?: boolean }) {
  return (
    <div className={`sectionHeading${inverse ? ' sectionHeading--inverse' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="sectionLead">{text}</p>}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top">
          <video className="heroMedia" autoPlay muted loop playsInline preload="metadata" poster={asset('hero-drone-poster.webp')} aria-hidden="true">
            <source src={asset('hero-drone.mp4')} type="video/mp4" media="(min-width: 720px)" />
            <source src={asset('hero-drone-mobile.mp4')} type="video/mp4" />
          </video>
          <div className="heroShade" />
          <div className="heroBody">
            <p className="heroKicker">Республика Башкортостан · Иглинский район</p>
            <h1>Башминералресурс</h1>
            <div className="heroLower">
              <p className="heroStatement">Предприятие по добыче камня гипсового и марганцовистого известняка</p>
              <div className="heroActions">
                <a className="button button--gold" href="#history">О предприятии <ArrowRight size={18} /></a>
                <a className="button button--glass" href="#products">Продукция</a>
              </div>
            </div>
          </div>
          <div className="heroFacts" aria-label="Ключевые сведения о предприятии">
            <article><span>Балансовые запасы</span><strong>40 млн т</strong><small>подтверждённые запасы</small></article>
            <article><span>Разведанные запасы</span><strong>150 млн т</strong><small>по данным геологоразведки</small></article>
            <article><span>Перспективные запасы</span><strong>300 млн т</strong><small>потенциал месторождений</small></article>
            <article><span>Логистика</span><strong>Авто + ЖД</strong><small>отгрузка с площадки</small></article>
          </div>
          <a className="heroScroll" href="#history"><span>Листайте ниже</span><ChevronDown size={18} /></a>
        </section>

        <section className="section historySection" id="history">
          <SectionHeading
            eyebrow="История компании"
            title={<>От геологической разведки<br />к современному производству</>}
            text="История предприятия начинается с изучения месторождений в середине прошлого века и продолжается промышленной разработкой двух сырьевых направлений."
          />
          <ol className="timeline">
            <li><span>1931</span><div><h3>Первые сведения о марганцевых рудах</h3><p>Появились первые упоминания о нахождении марганцевых руд на территории Республики Башкортостан.</p></div></li>
            <li><span>1940–1944</span><div><h3>Разведка ключевых участков</h3><p>Исследованы Ржановский и Центральный участки, затем более крупные Северный и Ново-Северный.</p></div></li>
            <li><span>1952–1953</span><div><h3>Расширение поисковых работ</h3><p>Работы охватили Тюлько-Тюбинский, Михайловский, Трехгранный и Сарвинский участки общей площадью более 170 км².</p></div></li>
            <li><span>1967–1987</span><div><h3>Исследования для металлургии</h3><p>Изучалась возможность замены обычного известняка оксидными марганцевыми рудами для внесения марганца в сталеплавильную ванну.</p></div></li>
            <li><span>1993–1997</span><div><h3>Возобновление изучения месторождений</h3><p>После паузы исследования продолжились в составе подразделения крупной нефтедобывающей компании.</p></div></li>
            <li><span>2000</span><div><h3>Получение лицензии</h3><p>Началась разработка Тюлько-Тюбинского участка по добыче гипсового камня и Северного участка по добыче марганцевых руд.</p></div></li>
            <li><span>2000–2011</span><div><h3>Первые промышленные поставки</h3><p>Проводились экспериментальные отгрузки марганцевой руды на металлургические заводы и гипсового камня на цементные предприятия.</p></div></li>
            <li><span>2012</span><div><h3>Создание Башминералресурс</h3><p>Зарегистрировано ООО «Башминералресурс». Началась промышленная разработка карьера и совершенствование технологий переработки.</p></div></li>
            <li><span>2015</span><div><h3>Подтверждение промышленного эффекта</h3><p>Совместно с одним из крупнейших металлургических комбинатов России проведены испытания марганецсодержащей продукции и получены положительные выводы.</p></div></li>
            <li><span>Сегодня</span><div><h3>Два продуктовых направления</h3><p>Предприятие поставляет гипсовый и гипсоангидритовый камень для цементных и строительных производств, а также марганцовистый флюсующий известняк для металлургии.</p></div></li>
          </ol>
        </section>

        <section className="companyTodaySection" id="company">
          <div className="section companyTodayHeading">
            <SectionHeading
              eyebrow="Предприятие сегодня"
              title="Производственный комплекс полного цикла"
              text="Добыча, дробление, промывка, лабораторный контроль и отгрузка сосредоточены на одной промышленной площадке."
            />
          </div>
          <div className="section companyCapabilityGrid">
            <article><img src={asset('content/gypsum-quarry.webp')} alt="Карьер предприятия" /><div><strong>72 км²</strong><span>земельный отвод · лицензия на добычу до 2045 года</span></div></article>
            <article><img src={asset('content/home-loaders.webp')} alt="Тяжёлая карьерная техника" /><div><strong>Более 30 единиц</strong><span>тяжёлой карьерной и вспомогательной техники</span></div></article>
            <article><img src={asset('content/gypsum-processing.webp')} alt="Дробильно-сортировочный комплекс" /><div><strong>ДСК 200 и ДСУ</strong><span>дробление гипсового камня — более 120 т/ч, известняка — более 100 т/ч</span></div></article>
            <article><img src={asset('content/flux-sorting.webp')} alt="Моечный комплекс" /><div><strong>Более 40 т/ч</strong><span>мощность комплекса для промывки марганцовистого известняка</span></div></article>
            <article><img src={asset('content/home-laboratory.webp')} alt="Химико-аналитическая лаборатория" /><div><strong>Собственная лаборатория</strong><span>контроль качества продукции на каждом этапе производства</span></div></article>
            <article><img src={asset('content/home-rail.webp')} alt="Железнодорожный участок" /><div><strong>Более 3000 т/сутки</strong><span>отгрузка готовой продукции автомобильным и железнодорожным транспортом</span></div></article>
          </div>
        </section>

        <section className="productsSection" id="products">
          <div className="section productsHeading">
            <SectionHeading
              eyebrow="Продукция"
              title="Наша продукция"
              text="Два направления минерального сырья для металлургических, цементных и строительных предприятий."
              inverse
            />
          </div>
          <div className="productChoiceGrid">
            <a className="productChoice" href="#/manganese">
              <img src={asset('content/flux-material.webp')} alt="Марганцовистый известняк" />
              <span className="productChoiceShade" />
              <span className="productChoiceIndex">01</span>
              <span className="productChoiceText">
                <small>Для металлургических производств</small>
                <strong>Марганцовистый флюсующий известняк</strong>
                <p>Состав, применение в агломерации и окатышах, подготовка партии и лабораторный контроль.</p>
                <span>Характеристики и применение <ArrowRight size={18} /></span>
              </span>
            </a>
            <a className="productChoice" href="#/gypsum">
              <img src={asset('content/gypsum-stone.webp')} alt="Камень гипсовый и гипсоангидритовый" />
              <span className="productChoiceShade" />
              <span className="productChoiceIndex">02</span>
              <span className="productChoiceText">
                <small>Для цементных и строительных производств</small>
                <strong>Камень гипсовый и гипсоангидритовый</strong>
                <p>Требования по ГОСТ, направления применения, подготовка фракции, контроль и отгрузка.</p>
                <span>Характеристики и применение <ArrowRight size={18} /></span>
              </span>
            </a>
          </div>
        </section>

        <section className="greetingSection" id="greeting">
          <div className="greetingPortrait">
            <img src={asset('content/director-alexander-banaev.webp')} alt="Александр Банаев, директор ООО «БашМинералРесурс»" />
          </div>
          <div className="greetingCopy">
            <p className="eyebrow">Обращение руководителя</p>
            <h2>Приветственное слово</h2>
            <p className="greetingPlaceholder">Материал готовится к публикации</p>
            <p>Здесь будет короткое обращение о предприятии, продукции и принципах работы с промышленными партнёрами. После согласования текст можно дополнить видеозаписью.</p>
            <div className="greetingSignature"><strong>Александр Банаев</strong><span>директор ООО «БашМинералРесурс»</span></div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

function ProductPage({ product }: { product: Product }) {
  return (
    <>
      <Header />
      <main className="productPage">
        <section className={`productHero productHero--${product.id}`} id="top">
          <video className="productHeroMedia" autoPlay muted loop playsInline preload="metadata" poster={asset(product.hero)} aria-hidden="true">
            <source src={asset('hero-drone.mp4')} type="video/mp4" media="(min-width: 720px)" />
            <source src={asset('hero-drone-mobile.mp4')} type="video/mp4" />
          </video>
          <div className="productHeroShade" />
          <div className="productHeroCopy">
            <a className="backLink" href="#top"><ArrowLeft size={17} /> Главная страница</a>
            <p className="productBrand">Башминералресурс</p>
            <p className="eyebrow">{product.eyebrow}</p>
            <h1>{product.title}</h1>
            <p>{product.subtitle}</p>
          </div>
          <div className="productHeroAccent">{product.accent}</div>
        </section>

        <section className="section productOverview" id="product">
          <div className="productOverviewIntro">
            <p className="eyebrow">Описание продукта</p>
            <h2>Базовый продукт<br />и назначение</h2>
            <p>{product.intro}</p>
          </div>
          <dl className="specList">
            {product.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </section>

        {product.id === 'gypsum' && (
          <section className="section gypsumOriginSection" id="geology">
            <SectionHeading
              eyebrow="Месторождение"
              title="Геология и природное сырьё"
              text="Тюлько-Тюбинское месторождение разрабатывается открытым способом. Камень из забоя направляется на дробление и подготовку под требования конкретного производства."
            />
            <div className="gypsumOriginGrid">
              <figure><img src={asset('content/gypsum-quarry.webp')} alt="Тюлько-Тюбинское месторождение" /><figcaption><strong>Геология месторождения</strong><span>Открытая разработка участка</span></figcaption></figure>
              <figure><img src={asset('content/gypsum-stone.webp')} alt="Гипсовый и гипсоангидритовый камень в забое" /><figcaption><strong>Камень в забое</strong><span>Гипсовое и гипсоангидритовое сырьё</span></figcaption></figure>
            </div>
          </section>
        )}

        {product.testingHistory.length > 0 && (
          <section className="testingHistorySection" id="testing-history">
            <div className="section testingHistoryInner">
              <SectionHeading
                eyebrow="История внедрения и испытаний"
                title="От исследований к промышленному применению"
                text="Раздел подготовлен для последовательной публикации исследований, испытаний и результатов внедрения марганцовистого известняка."
                inverse
              />
              <ol className="testingTimeline">
                {product.testingHistory.map(([title, text], index) => (
                  <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className="productUseSection" id="application">
          <div className="section productUseInner">
            <SectionHeading eyebrow={product.usesEyebrow} title={product.usesTitle} text={product.value} inverse />
            <div className="useGrid">
              {product.uses.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section productProcess" id="process">
          <SectionHeading eyebrow="Производственный процесс" title="Добыча, переработка и отгрузка" text="Проследите путь конкретного продукта от месторождения до подготовленной партии с лабораторным контролем и выбранной схемой доставки." />
          <div className="productProcessList">
            {product.process.map(([number, title, text, image]) => (
              <article key={number}>
                <img src={asset(image)} alt="" />
                <div><span>{number}</span><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="passportSection" id="passport">
          <div className="section passportInner">
            <SectionHeading eyebrow="Контроль качества" title="Показатели — по паспорту партии" text="Паспорт качества и лабораторный протокол фиксируют фактические характеристики подготовленной партии для технолога и закупщика." inverse />
            <div className="passportSheet">
              <div className="passportTop"><Logo compact /><span>Предварительная структура документа</span></div>
              <dl>
                <div><dt>Химический состав</dt><dd>по лабораторному протоколу партии</dd></div>
                <div><dt>Фракция</dt><dd>по согласованным условиям поставки</dd></div>
                <div><dt>Влажность</dt><dd>по паспорту качества</dd></div>
                <div><dt>Номер и дата партии</dt><dd>заполняются при отгрузке</dd></div>
              </dl>
              <p>Финальные значения и сканы документов размещаются после согласования специалистами предприятия.</p>
              {product.id === 'gypsum' && <p className="passportCapability"><strong>Подготовка под требования заказчика.</strong> Предприятие может выполнять шихтовку и усреднение качества сырья под согласованные показатели клиента.</p>}
            </div>
          </div>
        </section>

        <section className="productConsumersSection" id="consumers">
          <div className="section productConsumersInner">
            <SectionHeading eyebrow="Потребители" title="Кому поставляется продукт" text="Показываем текущие отрасли применения и направления развития поставок именно для этого вида сырья." inverse />
            <div className="productConsumerGrid">
              {product.consumers.map(([title, text], index) => (
                <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        {product.evidence.length > 0 && (
          <section className="section evidenceSection" id="evidence">
            <SectionHeading eyebrow="Подтверждающие материалы" title="Исследования, акты и заключения" text="Документы будут размещаться по мере подготовки согласованных версий для публикации." />
            <div className="evidenceGrid">
              {product.evidence.map(([title, text], index) => (
                <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><small>Материалы готовятся к публикации</small></article>
              ))}
            </div>
          </section>
        )}

        <section className="section productGallery" id="gallery">
          <SectionHeading eyebrow="Фотографии продукта" title="Сырьё, подготовка и отгрузка" />
          <div className="productGalleryGrid">
            {product.gallery.map(([title, image]) => <figure key={title}><img src={asset(image)} alt={title} /><figcaption>{title}</figcaption></figure>)}
          </div>
        </section>

        {product.id === 'gypsum' && (
          <section className="sampleSection">
            <div className="section sampleInner">
              <div><p className="eyebrow">Лабораторные испытания</p><h2>Запросите пробу камня</h2><p>Подготовим образцы гипсового и гипсоангидритового камня для проверки в лаборатории вашего предприятия.</p></div>
              <div className="sampleActions"><a className="button button--gold" href="tel:+79033100125">Позвонить <ArrowRight size={18} /></a><a className="button button--glass" href={`mailto:${company.email}`}>Написать на почту</a></div>
            </div>
          </section>
        )}

        <ContactSection compact />
      </main>
      <Footer />
    </>
  )
}

function ContactSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`contactSection${compact ? ' contactSection--compact' : ''}`} id="contacts">
      <div className="contactBackdrop" style={{ '--contact-image': `url(${asset('content/home-rail.webp')})` } as CSSProperties} />
      <div className="section contactInner">
        <SectionHeading eyebrow="Контакты" title={<>Обсудить продукт<br />и условия поставки</>} text="Свяжитесь напрямую: уточним задачу, состав документов, необходимую фракцию и схему отгрузки." inverse />
        <div className="contactList">
          <a href="tel:+79033100125"><span><Phone size={20} /></span><small>Мобильный телефон</small><strong>{company.phone}</strong></a>
          <a href="tel:+73472980125"><span><Phone size={20} /></span><small>Офисный телефон</small><strong>{company.office}</strong></a>
          <a href={`mailto:${company.email}`}><span><Mail size={20} /></span><small>Электронная почта</small><strong>{company.email}</strong></a>
          <a href="https://yandex.ru/maps/?text=Уфа%2C%20Уфимское%20шоссе%2C%2043" target="_blank" rel="noreferrer"><span><MapPin size={20} /></span><small>Офис</small><strong>{company.officeAddress}</strong></a>
          <a href={company.map} target="_blank" rel="noreferrer"><span><MapPin size={20} /></span><small>Производственная площадка</small><strong>{company.productionAddress}</strong></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="siteFooter">
      <Logo />
      <div><small>Продукция</small><a href="#/manganese">Марганцовистый флюсующий известняк</a><a href="#/gypsum">Гипсовый и гипсоангидритовый камень</a></div>
      <div><small>Предприятие</small><a href="#company">О компании</a><a href="#history">История</a><a href="#contacts">Контакты</a></div>
      <div><small>Связь</small><a href="tel:+79033100125">{company.phone}</a><a href="tel:+73472980125">{company.office}</a><a href={`mailto:${company.email}`}>{company.email}</a><span>ООО «Башминералресурс»</span></div>
    </footer>
  )
}

function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#/', ''))

  useEffect(() => {
    const sync = () => {
      const next = window.location.hash.replace('#/', '')
      setRoute(next)
      window.requestAnimationFrame(() => {
        if (next === 'manganese' || next === 'gypsum') window.scrollTo({ top: 0, behavior: 'instant' })
      })
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  if (route === 'manganese') return <ProductPage product={products.manganese} />
  if (route === 'gypsum') return <ProductPage product={products.gypsum} />
  return <HomePage />
}

export default App
