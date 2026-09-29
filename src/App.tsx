import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FlaskConical,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import './App.css'
import { directorGreeting, history, historyPreview } from './septemberContent'
import { CompanyCapabilityGallery } from './components/CompanyCapabilityGallery'
import { VisualGallery } from './components/VisualGallery'
import { productGalleries } from './productGalleries'
import { HeroVideo } from './components/HeroVideo'
import { usePageMotion } from './components/usePageMotion'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const company = {
  phone: '+7 (903) 310-01-25',
  office: '+7 (347) 298-01-25',
  email: 'dispetcherbmr@yandex.ru',
  productionAddress:
    'Республика Башкортостан, Иглинский район, вблизи д. Орловка и д. Тюлько-Тамак',
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
    hero: 'content/sep27-manganese.webp',
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
      ['01', 'Добыча', 'Открытая разработка карьеров Северный и Ново-Северный.', 'content/sep27-manganese-mining.webp'],
      ['02', 'Дробление', 'Три стадии дробления и рассева на дробильно-сортировочном комплексе.', 'content/sep27-manganese-crushing.webp'],
      ['03', 'Контроль качества', 'Лабораторные испытания состава, фракции и влажности конкретной партии.', 'content/sep27-manganese-quality.webp'],
      ['04', 'Отгрузка', 'Паспорт партии и отправка автомобильным или железнодорожным транспортом.', 'content/sep27-manganese-shipping.webp'],
    ],
    gallery: [
      ['Подготовленный материал', 'content/sep27-manganese.webp'],
      ['Добыча сырья', 'content/sep27-manganese-mining.webp'],
      ['Дробильно-сортировочный комплекс', 'content/sep27-manganese-crushing.webp'],
      ['Отгрузка партии', 'content/sep27-manganese-shipping.webp'],
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
    eyebrow: '',
    title: 'Камень гипсовый и гипсоангидритовый',
    subtitle: 'Сырьё для цементных заводов и производителей сухих строительных смесей',
    intro:
      'Камень Тюлько-Тюбинского месторождения для цементных заводов, производителей сухих смесей, гипсовых вяжущих и изделий.',
    hero: 'content/sep27-gypsum.webp',
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
      ['01', 'Добыча', 'Открытая разработка Тюлько-Тюбинского месторождения.', 'content/sep27-gypsum-mining.webp'],
      ['02', 'Дробление', 'Дробление и подготовка материала под согласованную фракцию.', 'content/sep27-gypsum-crushing.webp'],
      ['03', 'Контроль качества', 'Лабораторная проверка показателей и оформление протокола.', 'content/sep27-gypsum-quality.webp'],
      ['04', 'Отгрузка', 'Погрузка подготовленной партии на автомобильный или железнодорожный транспорт.', 'content/sep27-gypsum-shipping.webp'],
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
const processGalleryKeys = ['mining', 'crushing', 'quality', 'shipping'] as const

function Logo({ compact = false, original = false }: { compact?: boolean; original?: boolean }) {
  return (
    <span className={`logo${compact ? ' logo--compact' : ''}${original ? ' logo--original' : ''}`}>
      <img src={asset(original ? 'brand/bashmineralresurs-original.png' : 'brand/bashmineralresurs-mark-transparent.png')} alt="" aria-hidden="true" />
      <span className="logoWordmark"><span>БАШМИНЕРАЛ</span><span className="logoAccent">РЕСУРС</span></span>
    </span>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="siteHeader">
      <a className="headerBrand" href="#top" onClick={close} aria-label="БАШМИНЕРАЛРЕСУРС — на главную">
        <Logo original />
      </a>
      <button className="menuButton" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Закрыть меню' : 'Открыть меню'}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav id="main-navigation" className={open ? 'isOpen' : ''} aria-label="Основная навигация">
        <a className="headerNavLink" href="#history" onClick={close}><span>О компании</span></a>
        <a className="headerNavLink" href="#/gypsum" onClick={close}><span>Камень гипсовый и</span><span>гипсоангидритовый</span></a>
        <a className="headerNavLink" href="#/manganese" onClick={close}><span>Марганцовистый</span><span>флюсующий известняк</span></a>
        <a className="headerNavLink" href="#contacts" onClick={close}><span>Контакты</span><span>компании</span></a>
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
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const toggleHistory = () => {
    setHistoryExpanded(!historyExpanded)
    if (historyExpanded) window.requestAnimationFrame(() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' }))
  }
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top">
          <HeroVideo className="heroMedia" desktop={asset('hero-september28.mp4')}
            mobile={asset('hero-september28-mobile.mp4')} poster={asset('hero-september28-poster.webp')} />
          <div className="heroShade" />
          <div className="heroBody">
            <p className="heroKicker">Республика Башкортостан · Иглинский район</p>
            <h1>БАШМИНЕРАЛРЕСУРС</h1>
            <div className="heroLower">
              <p className="heroStatement">Предприятие по добыче камня гипсового и марганцовистого известняка</p>
              <div className="heroActions">
                <a className="button button--gold" href="#products">Наша продукция <ArrowRight size={18} /></a>
                <a className="button button--glass" href="#history">О предприятии</a>
              </div>
            </div>
          </div>
          <a className="heroScroll" href="#products"><span>Листайте ниже</span><ChevronDown size={18} /></a>
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
              <img src={asset('content/sep27-manganese.webp')} alt="Марганцовистый известняк" loading="lazy" />
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
              <img src={asset('content/sep27-gypsum.webp')} alt="Камень гипсовый и гипсоангидритовый" loading="lazy" />
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

        <section className={`section historySection${historyExpanded ? ' historySection--expanded' : ''}`} id="history">
          <SectionHeading
            eyebrow="История компании"
            title={<>От геологической разведки<br />к современному производству</>}
            text="От первых геологических исследований — к добыче, переработке и поставкам двух видов минерального сырья."
          />
          <div className="historyContent">
            <ol className="timeline" id="history-timeline">
              {(historyExpanded ? history : historyPreview).map(([year, text]) => <li key={year}><span>{year}</span><p>{text}</p></li>)}
            </ol>
            <button className="historyToggle" type="button" aria-expanded={historyExpanded} aria-controls="history-timeline" onClick={toggleHistory}>
              <span>{historyExpanded ? 'Свернуть историю' : 'Смотреть историю полностью'}<small>{historyExpanded ? 'К краткому обзору' : 'Все 14 этапов'}</small></span><ChevronDown size={20} />
            </button>
          </div>
        </section>

        <section className="companyTodaySection" id="company">
          <div className="section companyTodayHeading">
            <SectionHeading
              eyebrow="Предприятие сегодня"
              title="Производственный комплекс полного цикла"
              text="Добыча, дробление, промывка, лабораторный контроль и отгрузка сосредоточены на одной промышленной площадке."
            />
          </div>
          <CompanyCapabilityGallery />
        </section>

        <section className="greetingSection" id="greeting">
          <div className="greetingPortrait">
            <img src={asset('content/director-alexander-banaev.webp')} alt="Александр Банаев, директор ООО «БАШМИНЕРАЛРЕСУРС»" />
          </div>
          <div className="greetingCopy">
            <p className="eyebrow">Обращение руководителя</p>
            <h2>Приветственное слово</h2>
            <div className="greetingMessage">
              <p className="greetingSalutation">Уважаемые клиенты, партнеры и коллеги!</p>
              {directorGreeting.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="greetingSignature"><strong>Александр Банаев</strong><span>директор ООО «БАШМИНЕРАЛРЕСУРС»</span></div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

function GypsumContent() {
  const applications = [
    {
      id: 'cement', title: 'Для цементного производства', image: 'gypsum',
      intro: 'Гипсовый и гипсоангидритовый камень для цементных заводов.',
      benefits: [
        { icon: ShieldCheck, title: 'Качество по ГОСТ', text: 'Гипсовый камень — 1–2 сорт. Гипсоангидритовый — выше требований к 1 сорту ГОСТ 4013-2019.' },
        { icon: FlaskConical, title: 'Лабораторный контроль', text: 'Проверяем состав сырья перед отгрузкой.' },
        { icon: Ruler, title: 'Нужная фракция', text: '0–60 или 60–300 мм. Другие фракции — по согласованию.' },
      ],
      qualitySteps: [
        ['Согласование', 'Требуемое соотношение SO₃ и CaSO₄·2H₂O.'],
        ['Шихтовка', 'Подбираем пропорции гипсового и гипсоангидритового камня.'],
        ['Проверка', 'Подтверждаем состав протоколом партии.'],
      ],
      focus: 'SO₃ — серный ангидрит', secondary: 'CaSO₄·2H₂O — двуводный гипс',
      caption: 'Сырьё для цементных производств',
    },
    {
      id: 'dry-mixes', title: 'Для сухих строительных смесей', image: 'gypsum-mining',
      intro: 'Природное сырьё высокой белизны для гипсовых вяжущих и сухих строительных смесей.',
      benefits: [
        { icon: Sparkles, title: 'Природная белизна', text: 'Гипсовый и гипсоангидритовый камень Тюлько-Тюбинского месторождения.' },
        { icon: FlaskConical, title: 'Контроль сырья', text: 'Оперативные и выходные лабораторные испытания.' },
        { icon: Ruler, title: 'Фракция под технологию', text: 'Подбираем размер камня под требования вашего производства.' },
      ],
      qualitySteps: [
        ['Согласование', 'Требования к составу и фракции для ваших вяжущих и смесей.'],
        ['Шихтовка', 'Подбираем соотношение двуводного гипса и серного ангидрида.'],
        ['Проверка', 'Контролируем состав и фракцию перед поставкой.'],
      ],
      focus: 'CaSO₄·2H₂O — двуводный гипс', secondary: 'SO₃ — серный ангидрит',
      caption: 'Тюлько-Тюбинское месторождение',
    },
  ]
  return <>
    {applications.map((application, index) => (
      <section className={`gypsumApplication gypsumApplication--${application.id}`} id={application.id} key={application.id}>
        <div className="section">
          <div className="applicationHeader sectionHeading sectionHeading--inverse"><p className="eyebrow applicationLabel"><span className="applicationNumber">0{index + 1}</span>Направление применения</p><h2>{application.title}</h2><p className="sectionLead">{application.intro}</p></div>
          <div className="applicationBenefits"><h3>Преимущества нашего продукта</h3><ul>{application.benefits.map(({ icon: Icon, title, text }) => <li key={title}><div className="applicationBenefitTitle"><Icon size={22} aria-hidden="true" /><h4>{title}</h4></div><p>{text}</p></li>)}</ul></div>
          <div className="applicationQuality"><h3><SlidersHorizontal size={23} aria-hidden="true" />Подбор качества под ваше производство</h3><p>Согласуем состав и фракцию с вашим технологом.</p><ol className="applicationQualitySteps">{application.qualitySteps.map(([title, text], step) => <li key={title}><span>0{step + 1}</span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ol></div>
          <div className="applicationDetail">
            <figure className="applicationPhoto"><VisualGallery className="applicationVisual" title={application.caption} photos={application.id === 'dry-mixes' ? productGalleries.gypsum.mining : ['content/sep27-gypsum.webp']} /><figcaption>{application.caption}</figcaption></figure>
            <div className="applicationPassport">
              <p className="eyebrow">Показатели по паспорту качества</p><h3>Паспорт партии для {application.id === 'cement' ? 'цементного производства' : 'сухих строительных смесей'}</h3>
              <dl><div><dt>{application.focus}</dt><dd>По лабораторному протоколу</dd></div><div><dt>{application.secondary}</dt><dd>По лабораторному протоколу</dd></div><div><dt>Фракция</dt><dd>0–60 / 60–300 мм или по согласованию</dd></div><div><dt>Сорт и соответствие</dt><dd>ГОСТ 4013-2019, по паспорту партии</dd></div><div><dt>Идентификация</dt><dd>Номер и дата отгружаемой партии</dd></div></dl>
              <p>Фактические значения указываются в документах на конкретную партию. Целевой состав и фракцию согласуем с вашим технологом до поставки.</p>
              <a href={`mailto:${company.email}?subject=${encodeURIComponent(application.title + ' — запрос характеристик')}`}>Запросить характеристики <ArrowRight size={18} /></a>
            </div>
          </div>
        </div>
      </section>
    ))}
    <section className="section productProcess gypsumProcess" id="process">
      <SectionHeading eyebrow="Производственный процесс" title="Добыча, дробление и отгрузка" text="Для обоих направлений — собственная добыча, дробление, лабораторный контроль и отгрузка выбранным видом транспорта." />
      <div className="productProcessList">{products.gypsum.process.map(([number, title, text], index) => <article key={number}><VisualGallery className="productProcessVisual" title={`Гипс · ${title}`} photos={productGalleries.gypsum[processGalleryKeys[index]]} /><div className="productProcessCopy"><span>{number}</span><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </section>
    <section className="sampleSection"><div className="section sampleInner"><div><p className="eyebrow">Лабораторные испытания</p><h2>Запросите пробу камня</h2><p>Подготовим образцы гипсового и гипсоангидритового камня для проверки в лаборатории вашего предприятия. Сообщите назначение сырья, нужную фракцию и показатели качества.</p></div><div className="sampleActions"><a className="button button--gold" href={`mailto:${company.email}?subject=${encodeURIComponent('Запрос пробы гипсового камня')}`}>Запросить образцы <ArrowRight size={18} /></a><a className="button button--glass" href="tel:+79033100125">Позвонить</a></div></div></section>
  </>
}

function ProductPage({ product }: { product: Product }) {
  const heroVideo = product.id === 'gypsum'
    ? { desktop: 'hero-gypsum-september29.mp4', mobile: 'hero-gypsum-september29-mobile.mp4', poster: 'hero-gypsum-september29-poster.webp' }
    : { desktop: 'hero-drone.mp4', mobile: 'hero-drone-mobile.mp4', poster: product.hero }

  return (
    <>
      <Header />
      <main className="productPage">
        <section className={`productHero productHero--${product.id}`} id="top">
          <HeroVideo className="productHeroMedia" desktop={asset(heroVideo.desktop)}
            mobile={asset(heroVideo.mobile)} poster={asset(heroVideo.poster)} />
          <div className="productHeroShade" />
          <div className="productHeroCopy">
            <a className="backLink" href="#top"><ArrowLeft size={17} /> Главная страница</a>
            <p className="productBrand">БАШМИНЕРАЛРЕСУРС</p>
            {product.eyebrow && <p className="eyebrow">{product.eyebrow}</p>}
            <h1>{product.title}</h1>
            <p>{product.subtitle}</p>
          </div>
          <div className="productHeroAccent">{product.accent}</div>
        </section>

        {product.id === 'gypsum' ? <GypsumContent /> : <>
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
            {product.process.map(([number, title, text], index) => (
              <article key={number}>
                <VisualGallery className="productProcessVisual" title={`Марганцовистый известняк · ${title}`} photos={productGalleries.manganese[processGalleryKeys[index]]} />
                <div className="productProcessCopy"><span>{number}</span><h3>{title}</h3><p>{text}</p></div>
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
            {product.gallery.map(([title, image], index) => <figure key={title}><VisualGallery className="productGalleryVisual" title={`Марганцовистый известняк · ${title}`} photos={index === 0 ? [image] : productGalleries.manganese[index === 1 ? 'mining' : index === 2 ? 'crushing' : 'shipping']} /><figcaption>{title}</figcaption></figure>)}
          </div>
        </section>


        </>}
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
          <div className="contactPhones">
            <span><Phone size={20} /></span><small>Телефоны компании</small>
            <div className="contactPhoneNumbers">
              <a href="tel:+79033100125"><strong>{company.phone}</strong><span>Мобильный</span></a>
              <a href="tel:+73472980125"><strong>{company.office}</strong><span>Офисный</span></a>
            </div>
          </div>
          <a href={`mailto:${company.email}`}><span><Mail size={20} /></span><small>Электронная почта</small><strong>{company.email}</strong></a>
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
      <div><small>Связь</small><a href="tel:+79033100125">{company.phone}</a><a href="tel:+73472980125">{company.office}</a><a href={`mailto:${company.email}`}>{company.email}</a><span>ООО «БАШМИНЕРАЛРЕСУРС»</span></div>
    </footer>
  )
}

function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#/', ''))
  usePageMotion(route === 'gypsum' || route === 'manganese' ? route : 'home')

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
