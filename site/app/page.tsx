import Image from "next/image";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import { CONTACTS, FAQ, FORMATS, RATE_USD, SITE_URL, usd } from "@/lib/content";
import { nb } from "@/lib/typo";

const REASONS = [
  {
    title: "Синдром самозванца",
    voice: "«Кто я такой, чтобы брать столько денег?» «А вдруг клиент скажет, что это дорого?»",
    fix: "Уверенность продавца — часть продукта. Клиент платит не за часы работы, а за опыт, результат и спокойствие",
  },
  {
    title: "Продаёте процесс, а клиент покупает результат",
    voice: "«Я провожу обучение». «Я делаю проект». «Я оказываю услугу»",
    fix: "Учимся говорить на языке клиента: что изменится в его жизни или бизнесе после покупки",
  },
  {
    title: "Страх потерять клиента",
    voice: "«Если не дам скидку — клиент уйдёт». «Удержать сделку любой ценой»",
    fix: "Заменяем скидку другой выгодой и учимся спокойно слышать «нет» — только после него начинаются переговоры",
  },
];

const COMPARE = [
  ["Говорят о цене сразу", "Строят ценность, цена звучит последней"],
  ["Реагируют на «дорого» скидкой", "Создают желание ещё до того, как назвали цену"],
  ["Продают метры, материалы и характеристики", "Продают образ жизни, статус и спокойствие"],
  ["Один звонок — один шанс", "Выстраивают касания и долгое доверие"],
  ["Клиент на одну сделку", "Клиент на всю жизнь, который приводит других"],
];

const BLOCKS = [
  {
    tag: "Блок 1",
    title: "Стратегия",
    note: "Фундамент продаж",
    items: [
      ["Аудит и анализ воронки продаж", "При необходимости — описание и изменение бизнес-процессов"],
      ["УТП компании", "Ответ на вопрос клиента «Почему я должен купить у вас?»"],
      ["Миссия сотрудников в компании", ""],
    ],
  },
  {
    tag: "Блок 2",
    title: "Психология и коммуникация",
    note: "Кто продаёт — так же важно, как что",
    items: [["Личность продавца и психология высоких продаж", "Внутренний ресурс, ограничивающие убеждения, имидж и экспертность"]],
  },
  {
    tag: "Блок 3",
    title: "Инструменты",
    note: "Тактика на каждый день",
    items: [
      ["Регламенты и скрипты продаж", ""],
      ["Типология покупателя и переговоры", ""],
      ["Продажи в мессенджерах и соцсетях", ""],
      ["Холодные звонки", ""],
      ["Отработка возражений", ""],
    ],
  },
];

const itemOffset = (bi: number) => BLOCKS.slice(0, bi).reduce((sum, b) => sum + b.items.length, 0);

const NICHE = [
  ["Формирование ценности продукта", ""],
  ["Уверенная подача премиальной цены", ""],
  ["Возражения «дорого», «у конкурентов дешевле», «подумаю»", ""],
  ["Техника правильных вопросов", ""],
  ["Техники закрытия сделки", ""],
  ["Сервис и постпродажное сопровождение, рост LTV", ""],
  ["Ошибки в работе продавца", ""],
  ["Приёмы против агрессивных тактик и манипуляций", ""],
  ["Формирование УТП компании", ""],
  ["AI в продажах", ""],
  ["Оценка качества переговоров подчинённых", "для РОПов"],
  ["Стандартизация продаж регламентом и скриптом", "для РОПов"],
  ["Система посттренингового контроля", "для РОПов"],
  ["Дорожная карта внедрения на 30 дней", ""],
];

const STEPS = [
  ["Знакомство", "Встречаюсь с представителями компании: продукт, средний чек, команда, где теряются сделки"],
  ["Анкета участников", "Опрашиваю команду. При необходимости — метод «тайный покупатель»"],
  ["Программа под запрос", "Собираю тренинг на основе анкет, с акцентом на дорогие продажи вашей ниши"],
  ["Тренинг", "Теория и практическая отработка на ваших реальных ситуациях"],
  ["Внедрение", "Дорожная карта на 30 дней и контроль интеграции новых бизнес-процессов"],
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Анастасия Островская",
        jobTitle: "Эксперт и тренер по продажам с высоким чеком",
        description:
          "Тренер по продажам с высоким чеком из Минска, более 17 лет в продажах. Директор по продажам мягкой комфортной мебели Sofa Club, юрист по образованию, коуч APC",
        telephone: "+375296239111",
        image: `${SITE_URL}/images/anastasia-ostrovskaya-portret.webp`,
        url: SITE_URL,
        worksFor: { "@type": "Organization", name: "Sofa Club", url: "https://sofaclub.by/" },
        knowsAbout: ["продажи с высоким чеком", "корпоративное обучение продажам", "переговоры", "продажи в мессенджерах", "управление отделом продаж"],
        sameAs: [CONTACTS.instagramHref, CONTACTS.telegramHref],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Анастасия Островская — тренинги по продажам с высоким чеком",
        url: SITE_URL,
        telephone: "+375296239111",
        image: `${SITE_URL}/og.jpg`,
        founder: { "@id": `${SITE_URL}/#person` },
        address: { "@type": "PostalAddress", addressLocality: "Минск", addressCountry: "BY" },
        areaServed: [{ "@type": "Country", name: "Беларусь" }, { "@type": "Country", name: "Россия" }],
      },
      {
        "@type": "Service",
        name: "Корпоративный тренинг «Искусство дорогих продаж»",
        serviceType: "Корпоративный тренинг по продажам",
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: [{ "@type": "Country", name: "Беларусь" }, { "@type": "Country", name: "Россия" }],
        offers: FORMATS.map((f) => ({
          "@type": "Offer",
          name: `Тренинг: ${f.title}`,
          price: f.hours * RATE_USD,
          priceCurrency: "USD",
        })),
      },
      {
        "@type": "Service",
        name: "Индивидуальное обучение продажам",
        serviceType: "Индивидуальное обучение продавцов и руководителей отделов продаж",
        provider: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Анастасия Островская", inLanguage: "ru" },
    ],
  };

  return (
    <>
      <Header />
      <main>
        {/* 01 — первый экран */}
        <section className="hero" id="top">
          <div className="hero__grid">
            <div className="hero__text">
              <span className="mono" aria-hidden="true">АО</span>
              <p className="hero__eyebrow">Анастасия Островская, Минск</p>
              <h1>{nb("Тренинги по продажам с высоким чеком")}</h1>
              <p className="pill hero__pill">{nb("Для отделов продаж и руководителей")}</p>
              <p className="hero__lead">
                {nb("Учу команды продавать дорогое без скидок и давления: строить ценность, уверенно называть цену и доводить клиента до договора. Офлайн у заказчика — в Минске, по всей Беларуси, в России и других странах")}
              </p>
              <div className="hero__actions">
                <a className="btn" href="#zayavka">Обсудить обучение</a>
                <a className="link" href="#price">Форматы и стоимость</a>
              </div>
              <dl className="hero__facts">
                <div><dt>&gt; 17 лет</dt><dd>в продажах</dd></div>
                <div><dt>Директор по продажам</dt><dd>{nb("мягкой комфортной мебели Sofa Club")}</dd></div>
                <div><dt>Юрист</dt><dd>по образованию</dd></div>
                <div><dt>Коуч</dt><dd>APC</dd></div>
              </dl>
            </div>
            <div className="hero__photo">
              <Image
                src="/images/anastasia-ostrovskaya-portret.webp"
                alt="Анастасия Островская, тренер по продажам с высоким чеком"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
          </div>
          <div className="hero__sign" aria-hidden="true">
            <span>Анастасия Островская&nbsp;&nbsp;{CONTACTS.instagram}</span>
            <span>01</span>
          </div>
        </section>

        {/* 02 — коротко */}
        <section className="section section--mist" id="short" aria-labelledby="short-h">
          <div className="wrap">
            <div className="short__grid">
              <div className="short__intro">
                <h2 className="h2" id="short-h">Коротко обо мне</h2>
                <p className="lead">
                  {nb("Анастасия Островская — эксперт и тренер по продажам с высоким чеком из Минска. Проводит корпоративные тренинги «Искусство дорогих продаж» для отделов продаж и обучает продавцов и руководителей индивидуально")}
                </p>
              </div>
              <dl className="short__list">
                <div className="short__row"><dt>Опыт</dt><dd>{nb("Более 17 лет в продажах")}</dd></div>
                <div className="short__row"><dt>Сейчас</dt><dd>{nb("Директор по продажам мягкой комфортной мебели Sofa Club")}</dd></div>
                <div className="short__row"><dt>Раньше</dt><dd>{nb("Коммерческий директор компании BonGenie. Руководитель отдела продаж по ключевым клиентам «А-100 Девелопмент»")}</dd></div>
                <div className="short__row"><dt>Образование</dt><dd>{nb("Юрист. Коуч APC")}</dd></div>
                <div className="short__row"><dt>Выступления</dt><dd>{nb("Спикер конференции по продажам SalesConf «Перезагрузка», Минск, 2026")}</dd></div>
                <div className="short__row"><dt>Формат</dt><dd>{nb("Офлайн на территории заказчика. До 14 человек — тренинг, от 15 — интерактивная лекция")}</dd></div>
                <div className="short__row"><dt>География</dt><dd>{nb("Минск, выезд в любой город Беларуси, в Россию и другие страны")}</dd></div>
                <div className="short__row"><dt>Стоимость</dt><dd>{nb(`Эквивалент ${RATE_USD} $ в час, раздаточный материал включён`)}</dd></div>
              </dl>
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>02</span></p>
          </div>
        </section>

        {/* 03 — почему продают дёшево */}
        <section className="section why" id="why" aria-labelledby="why-h">
          <div className="mono-row" aria-hidden="true">АОАОАОАОАОАО</div>
          <div className="wrap">
            <div className="why__head">
              <h2 className="h2" id="why-h">{nb("Почему продают дёшево")}</h2>
              <p className="lead">{nb("Три причины, из-за которых команда теряет маржу и сделки. С ними и работаем на тренинге")}</p>
            </div>
            <div className="why__grid">
              {REASONS.map((r, i) => (
                <article className="reason" key={r.title}>
                  <span className="reason__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <p className="reason__label">Причина {i + 1}</p>
                  <h3>{nb(r.title)}</h3>
                  <blockquote>{nb(r.voice)}</blockquote>
                  <p className="reason__fix"><b>Что меняем.</b> {nb(r.fix)}</p>
                </article>
              ))}
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>03</span></p>
          </div>
        </section>

        {/* 04 — обычные и дорогие продажи */}
        <section className="section section--dark compare" id="compare" aria-labelledby="compare-h">
          <div className="mono-row" aria-hidden="true">АОАОАОАОАОАО</div>
          <div className="wrap">
            <h2 className="h2" id="compare-h">{nb("Обычные и дорогие продажи")}</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              {nb("Чем дороже продукт, тем меньше решает цена и тем больше — ценность, доверие и сам продавец")}
            </p>
            <table className="compare__table">
              <thead>
                <tr><th scope="col">Обычные продажи</th><th scope="col">Дорогие продажи</th></tr>
              </thead>
              <tbody>
                {COMPARE.map(([a, b]) => (
                  <tr key={a}><td>{nb(a)}</td><td>{nb(b)}</td></tr>
                ))}
              </tbody>
            </table>
            <blockquote className="quote">
              {nb("Люди обожают покупать и ненавидят, когда им продают")}
              <cite>Принцип, на котором строю обучение</cite>
            </blockquote>
            <p className="signline"><span>Анастасия Островская</span><span>04</span></p>
          </div>
        </section>

        {/* 05 — программа */}
        <section className="section section--mist program" id="program" aria-labelledby="program-h">
          <div className="wrap">
            <div className="program__head">
              <h2 className="h2" id="program-h">Искусство дорогих продаж</h2>
              <p className="lead">
                {nb("Авторская программа из трёх блоков: от стратегии отдела продаж до конкретных фраз на переговорах. Для каждой компании собираю свой набор тем")}
              </p>
            </div>
            <div className="program__blocks">
              {BLOCKS.map((b, bi) => (
                  <div className="block" key={b.title}>
                    <p className="block__tag">{b.tag}</p>
                    <h3>{nb(b.title)}</h3>
                    <p className="block__note">{nb(b.note)}</p>
                    <ol>
                      {b.items.map(([t, s], ii) => (
                        <li key={t}>
                          <b aria-hidden="true">{String(itemOffset(bi) + ii + 1).padStart(2, "0")}</b>
                          <span>{nb(t)}{s && <small>{nb(s)}</small>}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
              ))}
            </div>
            <div className="niche">
              <div>
                <h3>{nb("Под вашу нишу")}</h3>
                <p>{nb("Индивидуальный тренинг для заказчика в зависимости от сегмента и ниши, с акцентом на дорогие продажи. Темы выбираем по анкетам участников")}</p>
              </div>
              <ul>
                {NICHE.map(([t, tag]) => (
                  <li key={t}>{nb(t)}{tag && <> <em>— {tag}</em></>}</li>
                ))}
              </ul>
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>05</span></p>
          </div>
        </section>

        {/* 06 — как проходит */}
        <section className="section" id="process" aria-labelledby="process-h">
          <div className="wrap">
            <h2 className="h2" id="process-h">{nb("Как проходит работа")}</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              {nb("От первой встречи до внедрения — пять шагов. Каждый следующий опирается на то, что мы узнали о вашей команде")}
            </p>
            <ol className="steps">
              {STEPS.map(([t, d], i) => (
                <li className="step" key={t}>
                  <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                  <h3>{nb(t)}</h3>
                  <p>{nb(d)}</p>
                </li>
              ))}
            </ol>
            <p className="signline"><span>Анастасия Островская</span><span>06</span></p>
          </div>
        </section>

        {/* 07 — стоимость */}
        <section className="section section--deep price" id="price" aria-labelledby="price-h">
          <span className="mono" aria-hidden="true">АО</span>
          <div className="wrap">
            <div className="price__head">
              <div>
                <h2 className="h2" id="price-h">Форматы и стоимость</h2>
                <p className="lead" style={{ marginTop: 24 }}>
                  {nb("Длительность выбираем по запросу и глубине погружения. Стоимость считается по часам")}
                </p>
              </div>
              <p className="price__rate"><b>{RATE_USD}&nbsp;$</b><span>эквивалент за час</span></p>
            </div>
            <div className="formats">
              {FORMATS.map((f) => (
                <article className="format" key={f.title}>
                  <h3 className="format__time">{nb(f.title)}</h3>
                  <p className="format__note">{nb(f.note)}</p>
                  <p className="format__sum">
                    <span>{f.hours}&nbsp;ч × {RATE_USD}&nbsp;$<br />эквивалент</span>
                    <b>{usd(f.hours * RATE_USD)}&nbsp;$</b>
                  </p>
                </article>
              ))}
            </div>
            <ul className="terms">
              <li><b>До 14 человек</b>{nb("Тренинг: практика и отработка навыков")}</li>
              <li><b>От 15 человек</b>{nb("Интерактивная лекция")}</li>
              <li><b>Включено</b>{nb("Раздаточный материал для каждого участника")}</li>
              <li><b>Выезд</b>{nb("Обучение на территории заказчика. Дорога и проживание в другом городе оплачиваются отдельно")}</li>
            </ul>
            <div className="price__cta">
              <a className="btn" href="#zayavka-team">Обсудить тренинг для команды</a>
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>07</span></p>
          </div>
        </section>

        {/* 08 — индивидуально */}
        <section className="section section--mist" id="solo" aria-labelledby="solo-h">
          <div className="wrap">
            <div className="solo__grid">
              <div>
                <h2 className="h2" id="solo-h">Индивидуально</h2>
                <p className="lead">
                  {nb("Личное обучение — для тех, кто хочет разобрать свои сделки один на один. Работаем на ваших реальных клиентах и переписках, а не на абстрактных примерах. Формат и число встреч обсуждаем на первом созвоне")}
                </p>
                <div className="solo__cta"><a className="btn btn--em" href="#zayavka-self">Обсудить личное обучение</a></div>
              </div>
              <ul className="solo__who">
                <li><b aria-hidden="true">01</b><div><h3>Продавцу</h3><p>{nb("Который хочет увереннее вести дорогие сделки и называть цену без извинений")}</p></div></li>
                <li><b aria-hidden="true">02</b><div><h3>{nb("Руководителю отдела продаж")}</h3><p>{nb("Которому нужно обучать команду, оценивать переговоры и контролировать внедрение")}</p></div></li>
                <li><b aria-hidden="true">03</b><div><h3>Собственнику</h3><p>{nb("Который сам ведёт ключевых клиентов и хочет выстроить систему продаж")}</p></div></li>
              </ul>
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>08</span></p>
          </div>
        </section>

        {/* 09 — обо мне */}
        <section className="section" id="about" aria-labelledby="about-h">
          <div className="wrap">
            <div className="about__grid">
              <div className="about__photo">
                <Image
                  src="/images/anastasia-ostrovskaya-chb.webp"
                  alt="Анастасия Островская"
                  fill
                  sizes="(max-width: 900px) 90vw, 36vw"
                />
              </div>
              <div className="about__text">
                <h2 className="h2" id="about-h">{nb("Практик, а не теоретик")}</h2>
                <p>{nb("Я не ушла из продаж в тренерство — я продолжаю продавать и руководить продажами. Сейчас я директор по продажам мягкой комфортной мебели Sofa Club. Начинала как коммерческий директор компании BonGenie, руководила отделом продаж по ключевым клиентам в «А-100 Девелопмент»")}</p>
                <p>{nb("Поэтому на тренинге говорю о том, что проверяю каждую неделю: как клиент выбирает дорогую вещь, где сомневается и что помогает ему решиться")}</p>
                <p>{nb("По образованию я юрист — это помогает спокойно говорить с клиентом о договоре, условиях и рисках. А как коуч APC работаю с тем, что мешает продавцу изнутри: страхом цены, синдромом самозванца, усталостью")}</p>
                <ul className="career">
                  <li><span>Сейчас</span><div><b>Sofa Club</b> — {nb("директор по продажам мягкой комфортной мебели")}</div></li>
                  <li><span>Раньше</span><div><b>«А-100 Девелопмент»</b> — {nb("руководитель отдела продаж по ключевым клиентам")}</div></li>
                  <li><span>Начало</span><div><b>BonGenie</b> — {nb("коммерческий директор")}</div></li>
                </ul>
                <blockquote className="about__quote">{nb("Продажа — это начало отношений, а не финал")}</blockquote>
              </div>
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>09</span></p>
          </div>
        </section>

        {/* 10 — выступления */}
        <section className="section section--dark" id="talks" aria-labelledby="talks-h">
          <div className="wrap">
            <div className="talks__grid">
              <div>
                <h2 className="h2" id="talks-h">Выступления</h2>
                <div className="talk-main">
                  <p className="talk-main__meta">SalesConf «Перезагрузка», Минск, 2026</p>
                  <h3>{nb("Как читать клиента?")}</h3>
                  <p>{nb("От первого впечатления до подписания договора: установление контакта, типы клиентов, ошибки продавца, продажи в мессенджерах и касания до сделки")}</p>
                </div>
                <div className="talks__more">
                  <h3>Другие темы выступлений</h3>
                  <ul>
                    <li>{nb("Почему вы продаёте дёшево?")}</li>
                    <li>{nb("Почему дизайнеры продают дёшево — версия для дизайнеров интерьера")}</li>
                    <li>{nb("Цена и ценность: как презентовать цену, чтобы её приняли")}</li>
                  </ul>
                </div>
              </div>
              <div className="talks__photo">
                <Image
                  src="/images/anastasia-ostrovskaya-vystuplenie.webp"
                  alt="Анастасия Островская выступает с микрофоном на конференции"
                  fill
                  sizes="(max-width: 900px) 90vw, 40vw"
                />
              </div>
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>10</span></p>
          </div>
        </section>

        {/* 11 — география */}
        <section className="section" id="geo" aria-labelledby="geo-h">
          <div className="wrap">
            <div className="geo__grid">
              <div>
                <h2 className="h2" id="geo-h">{nb("Приезжаю к вам")}</h2>
                <p className="lead">{nb("Тренинги проходят офлайн, на территории заказчика: так команда учится в своей среде и на своих задачах. Я живу в Минске и выезжаю в любой город")}</p>
              </div>
              <ul className="geo__list">
                <li><b>Минск</b><span>{nb("Здесь я живу и работаю")}</span></li>
                <li><b>{nb("Беларусь, Россия и другие страны")}</b><span>{nb("Приезжаю к заказчику. Дорога и проживание оплачиваются отдельно")}</span></li>
                <li><b>Онлайн</b><span>{nb("В исключительных случаях — когда сотрудники работают в разных городах и собрать их вместе нельзя")}</span></li>
              </ul>
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>11</span></p>
          </div>
        </section>

        {/* 12 — вопросы */}
        <section className="section section--mist" id="faq" aria-labelledby="faq-h">
          <div className="wrap">
            <div className="faq__grid">
              <h2 className="h2" id="faq-h">Вопросы</h2>
              <div className="faq__list">
                {FAQ.map((f, i) => (
                  <details className="faq__item" key={f.q} open={i === 0}>
                    <summary>{nb(f.q)}</summary>
                    <p>{nb(f.a)}</p>
                  </details>
                ))}
              </div>
            </div>
            <p className="signline"><span>Анастасия Островская</span><span>12</span></p>
          </div>
        </section>

        {/* 13 — заявка */}
        <section className="section section--deep contact" id="zayavka" aria-labelledby="contact-h">
          <span id="zayavka-team" aria-hidden="true" />
          <span id="zayavka-self" aria-hidden="true" />
          <span className="mono" aria-hidden="true">АО</span>
          <div className="wrap">
            <div className="contact__grid">
              <div>
                <h2 className="h2" id="contact-h">{nb("Давайте продолжим общение")}</h2>
                <p className="lead">{nb("Расскажите коротко, кого нужно обучить и что сейчас мешает продажам. Я свяжусь с вами, чтобы обсудить задачу, формат и стоимость")}</p>
                <address className="contacts">
                  <a href={CONTACTS.phoneHref}><small>Телефон</small>{CONTACTS.phone}</a>
                  <a href={CONTACTS.telegramHref} target="_blank" rel="noopener"><small>Telegram</small>{CONTACTS.telegram}</a>
                  <a href={CONTACTS.instagramHref} target="_blank" rel="noopener"><small>Instagram</small>{CONTACTS.instagram}</a>
                  <span><small>Где</small>{nb("Минск, выезд по Беларуси, в Россию и другие страны")}</span>
                </address>
                <div className="contact__photo">
                  <Image
                    src="/images/anastasia-ostrovskaya-spiker.webp"
                    alt="Анастасия Островская на сцене конференции с микрофоном и бейджем спикера"
                    fill
                    sizes="420px"
                  />
                </div>
              </div>
              <LeadForm />
            </div>
            <p className="signline contact__sign"><span>Анастасия Островская</span><span>13</span></p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer__grid">
            <div>
              <a className="brand" href="#top">
                <span className="brand__mark" aria-hidden="true">АО</span>
                <span className="brand__name">Анастасия<br />Островская</span>
              </a>
              <p>{nb("Тренинги по продажам с высоким чеком для отделов продаж и руководителей. Минск, выезд по Беларуси, в Россию и другие страны")}</p>
            </div>
            <nav aria-label="Разделы сайта">
              <h3>Разделы</h3>
              <ul>
                <li><a href="#program">Программа</a></li>
                <li><a href="#process">Как проходит</a></li>
                <li><a href="#price">Форматы и стоимость</a></li>
                <li><a href="#about">Обо мне</a></li>
                <li><a href="#faq">Вопросы</a></li>
              </ul>
            </nav>
            <div>
              <h3>Связаться</h3>
              <ul>
                <li><a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a></li>
                <li><a href={CONTACTS.telegramHref} target="_blank" rel="noopener">Telegram {CONTACTS.telegram}</a></li>
                <li><a href={CONTACTS.instagramHref} target="_blank" rel="noopener">Instagram {CONTACTS.instagram}</a></li>
                <li><a href="#zayavka">Оставить заявку</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 Анастасия Островская</span>
            <a href="/privacy">Политика обработки персональных данных</a>
            <a className="footer__top" href="#top">Наверх ↑</a>
          </div>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
