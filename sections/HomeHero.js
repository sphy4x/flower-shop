function HomeHero({ onPrimary, onSecondary, lang }) {
  try {
    const l = lang || getInitialLang();

    const categoryChips = [
      {
        key: 'roses',
        icon: 'icon-flower-2',
        label: l === 'en' ? 'Roses' : l === 'el' ? 'Τριαντάφυλλα' : 'Розы',
        hint: l === 'en' ? 'Classic gifts' : l === 'el' ? 'Κλασικό δώρο' : 'Классика подарка',
        action: () => (window.location.href = 'catalog.html')
      },
      {
        key: 'plants',
        icon: 'icon-leaf',
        label: l === 'en' ? 'Plants' : l === 'el' ? 'Φυτά' : 'Растения',
        hint: l === 'en' ? 'For home' : l === 'el' ? 'Για το σπίτι' : 'Для дома',
        action: () => (window.location.href = 'catalog.html')
      },
      {
        key: 'gift',
        icon: 'icon-gift',
        label: l === 'en' ? 'Gift sets' : l === 'el' ? 'Σετ δώρου' : 'Наборы',
        hint: l === 'en' ? 'Ready-to-give' : l === 'el' ? 'Έτοιμο δώρο' : 'Готовый подарок',
        action: () => (window.location.href = 'catalog.html')
      },
      {
        key: 'orchids',
        icon: 'icon-sparkles',
        label: l === 'en' ? 'Orchids' : l === 'el' ? 'Ορχιδέες' : 'Орхидеи',
        hint: l === 'en' ? 'Elegant' : l === 'el' ? 'Κομψό' : 'Элегантно',
        action: () => (window.location.href = 'catalog.html')
      }
    ];

    const Guarantees = () => {
      try {
        const rows = [
          {
            icon: 'icon-circle-check',
            title: l === 'en' ? 'Freshness control' : l === 'el' ? 'Έλεγχος φρεσκάδας' : 'Контроль свежести',
            desc: l === 'en' ? 'We assemble right before delivery.' : l === 'el' ? 'Ετοιμάζουμε πριν την παράδοση.' : 'Собираем перед доставкой.'
          },
          {
            icon: 'icon-clock',
            title: l === 'en' ? 'Time slots' : l === 'el' ? 'Χρονικά παράθυρα' : 'Временные слоты',
            desc: l === 'en' ? 'Choose a convenient time.' : l === 'el' ? 'Διάλεξε μια βολική ώρα.' : 'Выберите удобное время.'
          },
          {
            icon: 'icon-message-square-text',
            title: l === 'en' ? 'Florist help' : l === 'el' ? 'Βοήθεια ανθοπώλη' : 'Помощь флориста',
            desc: l === 'en' ? 'We suggest options for budget & season.' : l === 'el' ? 'Προτείνουμε με βάση προϋπολογισμό & εποχή.' : 'Подскажем по бюджету и сезонности.'
          }
        ];

        return (
          <div className="mt-5" data-name="guarantees" data-file="sections/HomeHero.js">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200" data-name="guarantees-wrap" data-file="sections/HomeHero.js">
              <div className="flex items-start justify-between gap-3" data-name="guarantees-head" data-file="sections/HomeHero.js">
                <div data-name="guarantees-left" data-file="sections/HomeHero.js">
                  <div className="text-sm font-extrabold" data-name="guarantees-title" data-file="sections/HomeHero.js">
                    {l === 'en' ? 'Why customers choose us' : l === 'el' ? 'Γιατί μας επιλέγουν' : 'Почему выбирают нас'}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="guarantees-sub" data-file="sections/HomeHero.js">
                    {l === 'en'
                      ? 'A few small promises that matter.'
                      : l === 'el'
                        ? 'Μικρές υποσχέσεις που κάνουν τη διαφορά.'
                        : 'Небольшие обещания, которые решают.'}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center flex-shrink-0" data-name="guarantees-icon" data-file="sections/HomeHero.js">
                  <div className="icon-shield-check text-xl text-white" data-name="guarantees-icon-i" data-file="sections/HomeHero.js"></div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2" data-name="guarantees-grid" data-file="sections/HomeHero.js">
                {rows.map((r) => (
                  <div key={r.title} className="p-3 rounded-2xl bg-white border border-slate-200" data-name="g-item" data-file="sections/HomeHero.js">
                    <div className="flex items-start gap-2" data-name="g-row" data-file="sections/HomeHero.js">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0" data-name="g-iwrap" data-file="sections/HomeHero.js">
                        <div className={r.icon + ' text-lg text-emerald-700'} data-name="g-i" data-file="sections/HomeHero.js"></div>
                      </div>
                      <div className="min-w-0" data-name="g-text" data-file="sections/HomeHero.js">
                        <div className="text-xs font-extrabold leading-tight" data-name="g-title" data-file="sections/HomeHero.js">{r.title}</div>
                        <div className="text-[11px] text-[var(--muted-text-color)] mt-0.5 leading-snug" data-name="g-desc" data-file="sections/HomeHero.js">{r.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2" data-name="guarantees-actions" data-file="sections/HomeHero.js">
                <button className="btn btn-secondary flex-1" onClick={() => navigateToSection('reviews')} data-name="to-reviews" data-file="sections/HomeHero.js">
                  {l === 'en' ? 'See reviews' : l === 'el' ? 'Δες κριτικές' : 'Смотреть отзывы'}
                  <div className="icon-arrow-right text-lg" data-name="to-reviews-i" data-file="sections/HomeHero.js"></div>
                </button>
                <button className="btn btn-ghost flex-1" onClick={() => (window.location.href = 'contacts.html')} data-name="to-contacts" data-file="sections/HomeHero.js">
                  {t(l, 'navContacts')}
                  <div className="icon-phone text-lg" data-name="to-contacts-i" data-file="sections/HomeHero.js"></div>
                </button>
              </div>
            </div>
          </div>
        );
      } catch (error) {
        console.error('Guarantees error:', error);
        return null;
      }
    };

    const CategoryGallery = () => {
      try {
        return (
          <div className="mt-auto pt-6" data-name="category-gallery" data-file="sections/HomeHero.js">
            <div className="p-5 rounded-2xl bg-white border border-slate-200" data-name="cg-wrap" data-file="sections/HomeHero.js">
              <div className="flex items-start justify-between gap-3" data-name="cg-head" data-file="sections/HomeHero.js">
                <div data-name="cg-left" data-file="sections/HomeHero.js">
                  <div className="text-sm font-extrabold" data-name="cg-title" data-file="sections/HomeHero.js">
                    {l === 'en' ? 'Quick picks' : l === 'el' ? 'Γρήγορες επιλογές' : 'Быстрый выбор'}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="cg-sub" data-file="sections/HomeHero.js">
                    {l === 'en'
                      ? 'Start with a category and browse in one click.'
                      : l === 'el'
                        ? 'Ξεκίνα με κατηγορία και δες επιλογές με ένα κλικ.'
                        : 'Начните с категории — и откройте варианты в один клик.'}
                  </div>
                </div>
                
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2" data-name="cg-grid" data-file="sections/HomeHero.js">
                {categoryChips.map((c) => (
                  <button
                    key={c.key}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition text-left"
                    onClick={c.action}
                    data-name="cg-item"
                    data-file="sections/HomeHero.js"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center" data-name="cg-iwrap" data-file="sections/HomeHero.js">
                      <div className={c.icon + ' text-xl text-slate-800'} data-name="cg-i" data-file="sections/HomeHero.js"></div>
                    </div>
                    <div className="mt-2 text-xs font-extrabold leading-tight" data-name="cg-label" data-file="sections/HomeHero.js">{c.label}</div>
                    <div className="text-[11px] text-[var(--muted-text-color)] mt-0.5 leading-snug" data-name="cg-hint" data-file="sections/HomeHero.js">{c.hint}</div>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2" data-name="cg-actions" data-file="sections/HomeHero.js"></div>


            </div>
          </div>
        );
      } catch (error) {
        console.error('CategoryGallery error:', error);
        return null;
      }
    };

    return (
      <section className="container-shell pt-10 pb-8" id="home" data-name="home-hero" data-file="sections/HomeHero.js">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" data-name="grid" data-file="sections/HomeHero.js">
          <div className="card p-7 relative overflow-hidden h-full flex flex-col" data-name="left" data-file="sections/HomeHero.js">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-rose-200/40 blur-2xl" data-name="blob1" data-file="sections/HomeHero.js"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-slate-200/70 blur-2xl" data-name="blob2" data-file="sections/HomeHero.js"></div>

            <div className="relative" data-name="content" data-file="sections/HomeHero.js">
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight" data-name="title" data-file="sections/HomeHero.js">
                {t(l, 'homeTitleBefore')} <span className="text-[var(--primary-color)]" data-name="accent" data-file="sections/HomeHero.js">{t(l, 'homeTitleAccent')}</span>
              </h1>
              <p className="text-[var(--muted-text-color)] mt-3 text-base leading-relaxed" data-name="subtitle" data-file="sections/HomeHero.js">
                {t(l, 'homeSubtitle')}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3" data-name="actions" data-file="sections/HomeHero.js">
                <button className="btn btn-primary" onClick={onPrimary} data-name="primary" data-file="sections/HomeHero.js">
                  {t(l, 'homePrimary')}
                  <div className="icon-arrow-right text-lg" data-name="primary-i" data-file="sections/HomeHero.js"></div>
                </button>
                <button className="btn btn-ghost" onClick={onSecondary} data-name="secondary" data-file="sections/HomeHero.js">
                  {t(l, 'homeSecondary')}
                  <div className="icon-shopping-bag text-lg" data-name="secondary-i" data-file="sections/HomeHero.js"></div>
                </button>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3" data-name="stats" data-file="sections/HomeHero.js">
                <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="s1" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="s1-row" data-file="sections/HomeHero.js">
                    <div className="icon-circle-check text-lg text-emerald-700" data-name="s1-i" data-file="sections/HomeHero.js"></div>
                    {t(l, 'homeStatFreshTitle')}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="s1-desc" data-file="sections/HomeHero.js">
                    {t(l, 'homeStatFreshDesc')}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="s2" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="s2-row" data-file="sections/HomeHero.js">
                    <div className="icon-truck text-lg text-slate-700" data-name="s2-i" data-file="sections/HomeHero.js"></div>
                    {t(l, 'homeStatSpeedTitle')}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="s2-desc" data-file="sections/HomeHero.js">
                    {t(l, 'homeStatSpeedDesc')}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="s3" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="s3-row" data-file="sections/HomeHero.js">
                    <div className="icon-heart text-lg text-rose-700" data-name="s3-i" data-file="sections/HomeHero.js"></div>
                    {t(l, 'homeStatAssistTitle')}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="s3-desc" data-file="sections/HomeHero.js">
                    {t(l, 'homeStatAssistDesc')}
                  </div>
                </div>
              </div>
            </div>

            <CategoryGallery />
          </div>

          <div className="card overflow-hidden relative" data-name="right" data-file="sections/HomeHero.js">
            <div className="w-full aspect-[3/4] bg-slate-200" data-name="hero-aspect" data-file="sections/HomeHero.js">
              <img
                src="https://app.trickle.so/storage/public/images/usr_1b48c29310000001/c16bb6ec-e6f1-4eeb-90a5-bf06d210e15a.png"
                alt="Art Passaion flowers"
                className="w-full h-full object-cover object-top"
                data-name="hero-image"
                data-file="sections/HomeHero.js"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" data-name="overlay" data-file="sections/HomeHero.js"></div>

            <div className="absolute left-5 right-5 bottom-5" data-name="floating" data-file="sections/HomeHero.js">
              <div className="mt-3 grid grid-cols-2 gap-3" data-name="float-grid" data-file="sections/HomeHero.js">
                <div className="p-4 rounded-2xl bg-slate-900 text-white" data-name="float2" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="f2-row" data-file="sections/HomeHero.js">
                    <div className="icon-star text-lg text-white" data-name="f2-i" data-file="sections/HomeHero.js"></div>
                    4.9/5
                  </div>
                  <div className="text-xs text-white/75 mt-1" data-name="f2-desc" data-file="sections/HomeHero.js">{l === 'en' ? 'based on customer reviews' : l === 'el' ? 'βάσει κριτικών πελατών' : 'по отзывам клиентов'}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/95 border border-white/40" data-name="float3" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="f3-row" data-file="sections/HomeHero.js">
                    <div className="icon-clock text-lg text-slate-800" data-name="f3-i" data-file="sections/HomeHero.js"></div>
                    25–60 {l === 'en' ? 'min' : l === 'el' ? 'λεπ' : 'мин'}
                  </div>
                  <div className="text-xs text-slate-600 mt-1" data-name="f3-desc" data-file="sections/HomeHero.js">{l === 'en' ? 'bouquet assembly' : l === 'el' ? 'ετοιμασία' : 'сборка букета'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HomeHero section error:', error);
    return null;
  }
}