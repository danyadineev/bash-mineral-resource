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
  phone: '+7 (912) 286-71-11',
  office: '+7 (347) 246-39-13',
  email: 'info@bashmineral.ru',
  address:
    'Республика Башкортостан, Иглинский район, с.п. Красновосходский сельсовет, территория Башминералресурс, здание 5',
  map: 'https://yandex.ru/maps/org/bashmineralresurs/40841570634/?ll=57.116105%2C55.006176&z=12.56',
}

const products = {
  manganese: {
    id: 'manganese',
    eyebrow: 'Продукт 01',
    title: 'Марганцовистый известняк',
    subtitle: 'Базовое сырьё для металлургической переработки',
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
      <img src={asset('logo-bashmineral-transparent.png')} alt="" />
      {!compact && (
        <span>
          <strong>БашМинералРесурс</strong>
          <small>Горнодобывающее предприятие</small>
        </span>
      )}
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
        <a href="#top" onClick={close}>О компании</a>
        <a href="#/gypsum" onClick={close}>Гипсовый камень и гипсоангидрит</a>
        <a href="#/manganese" onClick={close}>Марганцовистый известняк</a>
        <a href="#contacts" onClick={close}>Контакты</a>
      </nav>
      <div className="headerContacts">
        <a href="tel:+79122867111"><Phone size={17} />{company.phone}</a>
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
            <h1>БашМинералРесурс</h1>
            <div className="heroLower">
              <p className="heroStatement">Предприятие по добыче камня гипсового и марганцовистого известняка</p>
              <div className="heroActions">
                <a className="button button--gold" href="#company">О предприятии <ArrowRight size={18} /></a>
                <a className="button button--glass" href="#products">Продукция</a>
              </div>
            </div>
          </div>
          <div className="heroFacts" aria-label="Ключевые сведения о предприятии">
            <article><span>Запасы</span><strong>35 млн т</strong><small>балансовые</small></article>
            <article><span>Перспектива</span><strong>&gt; 140 млн т</strong><small>перспективные запасы</small></article>
            <article><span>Качество</span><strong>Лаборатория</strong><small>испытания каждой партии</small></article>
            <article><span>Логистика</span><strong>Авто + ЖД</strong><small>отгрузка с площадки</small></article>
          </div>
          <a className="heroScroll" href="#company"><span>Листайте ниже</span><ChevronDown size={18} /></a>
        </section>

        <section className="section companySection" id="company">
          <div className="companyIntro">
            <SectionHeading
              eyebrow="О компании"
              title={<>Полный производственный цикл на одной площадке</>}
              text="Добыча, подготовка минерального сырья, лабораторный контроль и отгрузка объединены в единый производственный контур."
            />
            <div className="companyMeta">
              <div><strong>до 2045 года</strong><span>действует право пользования недрами</span></div>
              <div><strong>7,7 км</strong><span>железнодорожная ветка до станции Аша</span></div>
              <div><strong>17 единиц</strong><span>карьерной и вспомогательной техники</span></div>
            </div>
          </div>
          <figure className="companyImage companyImage--main">
            <img src={asset('content/home-loaders.webp')} alt="Карьерная техника БашМинералРесурс" />
            <figcaption>Карьерная и погрузочная техника предприятия</figcaption>
          </figure>
          <figure className="companyImage companyImage--secondary">
            <img src={asset('content/home-laboratory.webp')} alt="Лабораторные испытания сырья" />
            <figcaption>Химико-аналитическая лаборатория</figcaption>
          </figure>
        </section>

        <section className="section historySection" id="history">
          <SectionHeading eyebrow="История" title={<>Почти век изучения<br />и освоения недр</>} />
          <ol className="timeline">
            <li><span>1931</span><div><h3>Начало геологических работ</h3><p>На территории Республики Башкортостан открыты залежи марганцевых руд.</p></div></li>
            <li><span>1940–1987</span><div><h3>Разведка месторождений</h3><p>Исследованы Ржановский, Центральный, Северный и Ново-Северный участки.</p></div></li>
            <li><span>2000</span><div><h3>Промышленная разработка</h3><p>Получена лицензия на Тюлько-Тюбинский и Северный участки, начались опытные поставки.</p></div></li>
            <li><span>2012–2019</span><div><h3>Современное предприятие</h3><p>Создано ООО «БашМинералРесурс», модернизирован производственный комплекс и запущена железнодорожная ветка.</p></div></li>
            <li><span>Сегодня</span><div><h3>Два сырьевых направления</h3><p>Предприятие добывает и подготавливает сырьё для металлургической, цементной и строительной промышленности.</p></div></li>
          </ol>
        </section>

        <section className="productsSection" id="products">
          <div className="section productsHeading">
            <SectionHeading
              eyebrow="Продукция"
              title="Выберите сырьё под вашу задачу"
              text="Откройте нужную страницу: там собраны свойства продукта, варианты применения, подготовка партии, контроль качества и условия отгрузки."
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
                <strong>Марганцовистый известняк</strong>
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
            <p className="productBrand">БашМинералРесурс</p>
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
          <a href="tel:+79122867111"><span><Phone size={20} /></span><small>Основной телефон</small><strong>{company.phone}</strong></a>
          <a href={`mailto:${company.email}`}><span><Mail size={20} /></span><small>Электронная почта</small><strong>{company.email}</strong></a>
          <a href={company.map} target="_blank" rel="noreferrer"><span><MapPin size={20} /></span><small>Производственная площадка</small><strong>{company.address}</strong></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="siteFooter">
      <Logo />
      <div><small>Продукция</small><a href="#/manganese">Марганцовистый известняк</a><a href="#/gypsum">Гипсовый и гипсоангидритовый камень</a></div>
      <div><small>Предприятие</small><a href="#company">О компании</a><a href="#history">История</a><a href="#contacts">Контакты</a></div>
      <div><small>Связь</small><a href="tel:+79122867111">{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><span>ООО «БашМинералРесурс»</span></div>
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
