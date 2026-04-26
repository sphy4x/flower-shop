function Header({ variant, cartCount, onCartClick, lang: controlledLang, onLangChange }) {
  try {
    const page = getCurrentPageName();
    const isHome = page === 'index.html' || page === '' || page === '/';

    const [langLocal, setLangLocal] = React.useState(() => getInitialLang());
    const lang = controlledLang || langLocal;

    React.useEffect(() => {
      try {
        if (controlledLang) return;
        const unsub = onLangChangeSubscribe((l) => setLangLocal(l));
        return () => unsub();
      } catch (error) {
        console.error('Header storage subscription error:', error);
      }
    }, [controlledLang]);

    const setLang = (next) => {
      try {
        if (!next) return;
        saveLang(next);
        if (onLangChange) onLangChange(next);
        if (!controlledLang) setLangLocal(next);
      } catch (error) {
        console.error('Header setLang error:', error);
      }
    };

    const nav = [
      { labelKey: 'navHome', type: 'page', href: 'index.html', icon: 'icon-house' },
      { labelKey: 'navCatalog', type: 'page', href: 'catalog.html', icon: 'icon-shopping-bag' },
      { labelKey: 'navDelivery', type: 'section', section: 'delivery', icon: 'icon-truck' },
      { labelKey: 'navReviews', type: 'section', section: 'reviews', icon: 'icon-message-square-text' },
      { labelKey: 'navContacts', type: 'page', href: 'contacts.html', icon: 'icon-phone' }
    ];

    const onNavClick = (item) => {
      try {
        if (item.type === 'page') {
          navigateToPage(item.href);
          return;
        }
        if (item.type === 'section') {
          navigateToSection(item.section);
        }
      } catch (error) {
        console.error('Header nav click error:', error);
      }
    };

    const LanguagePill = () => {
      try {
        const langs = [
          { code: 'ru', label: 'RU' },
          { code: 'en', label: 'EN' },
          { code: 'el', label: 'EL' }
        ];

        return (
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-2xl border border-slate-200 bg-white" data-name="lang" data-file="components/Header.js">
            {langs.map((l) => {
              const active = lang === l.code;
              return (
                <button
                  key={l.code}
                  className={
                    'btn px-2 py-1 text-xs ' +
                    (active ? 'bg-rose-50 text-[var(--primary-color)]' : 'bg-transparent hover:bg-slate-50 text-slate-700')
                  }
                  onClick={() => setLang(l.code)}
                  data-name="lang-btn"
                  data-file="components/Header.js"
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        );
      } catch (error) {
        console.error('LanguagePill error:', error);
        return null;
      }
    };

    return (
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="container-shell" data-name="header-inner" data-file="components/Header.js">
          <div className="h-16 flex items-center justify-between gap-2" data-name="row" data-file="components/Header.js">
            <button className="flex items-center gap-3 min-w-0" onClick={() => navigateToPage('index.html')} data-name="brand" data-file="components/Header.js">
              <div className="w-10 h-10 rounded-2xl bg-[var(--primary-color)] flex items-center justify-center flex-shrink-0" data-name="logo" data-file="components/Header.js">
                <div className="icon-flower-2 text-xl text-white" data-name="logo-i" data-file="components/Header.js"></div>
              </div>
              <div className="leading-tight text-left min-w-0" data-name="brand-text" data-file="components/Header.js">
                <div className="font-extrabold truncate" data-name="name" data-file="components/Header.js">Art Passaion</div>
                <div className="text-xs text-[var(--muted-text-color)] truncate" data-name="tagline" data-file="components/Header.js">{t(lang, 'brandTagline')}</div>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1" data-name="nav" data-file="components/Header.js">
              {nav.map((item) => {
                const active = item.type === 'page' && page === item.href;
                return (
                  <button
                    key={item.labelKey}
                    onClick={() => onNavClick(item)}
                    className={
                      'btn px-2 py-1.5 text-sm ' +
                      (active ? 'bg-rose-50 text-[var(--primary-color)]' : 'bg-transparent hover:bg-slate-50')
                    }
                    data-name="nav-item"
                    data-file="components/Header.js"
                  >
                    <div className={item.icon + ' text-base'} data-name="nav-i" data-file="components/Header.js"></div>
                    {t(lang, item.labelKey)}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2" data-name="actions" data-file="components/Header.js">
              <LanguagePill />

              <button
                className="btn btn-ghost hidden sm:inline-flex px-3 py-2 text-sm"
                onClick={() => (window.location.href = 'catalog.html')}
                data-name="to-catalog"
                data-file="components/Header.js"
              >
                {t(lang, 'ctaChoose')}
                <div className="icon-arrow-right text-base" data-name="to-catalog-i" data-file="components/Header.js"></div>
              </button>

              <button className="btn btn-secondary relative px-3 py-2 text-sm" onClick={onCartClick} data-name="cart" data-file="components/Header.js">
                <div className="icon-shopping-bag text-base" data-name="cart-i" data-file="components/Header.js"></div>
                {t(lang, 'cart')}
                <span className="ml-1 inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-white text-slate-900 text-[11px] font-extrabold" data-name="cart-count" data-file="components/Header.js">
                  {cartCount || 0}
                </span>
              </button>
            </div>
          </div>

          <div className="md:hidden pb-3" data-name="mobile-nav" data-file="components/Header.js">
            <div className="flex items-center justify-between gap-2 mb-2" data-name="mobile-top" data-file="components/Header.js">
              <div className="p-1 rounded-2xl border border-slate-200 bg-white flex items-center gap-1" data-name="mobile-lang" data-file="components/Header.js">
                {[
                  { code: 'ru', label: 'RU' },
                  { code: 'en', label: 'EN' },
                  { code: 'el', label: 'EL' }
                ].map((l) => {
                  const active = lang === l.code;
                  return (
                    <button
                      key={l.code}
                      className={'btn px-2 py-1 text-xs ' + (active ? 'bg-rose-50 text-[var(--primary-color)]' : 'bg-transparent hover:bg-slate-50 text-slate-700')}
                      onClick={() => setLang(l.code)}
                      data-name="mobile-lang-btn"
                      data-file="components/Header.js"
                    >
                      {l.label}
                    </button>
                  );
                })}
              </div>

              <button className="btn btn-ghost px-3 py-2 text-sm" onClick={() => (window.location.href = 'catalog.html')} data-name="mobile-cta" data-file="components/Header.js">
                {t(lang, 'ctaChoose')}
                <div className="icon-arrow-right text-base" data-name="mobile-cta-i" data-file="components/Header.js"></div>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2" data-name="mobile-grid" data-file="components/Header.js">
              {nav.filter((x) => x.type !== 'section' || isHome).map((item) => (
                <button
                  key={item.labelKey}
                  className="btn btn-ghost justify-start px-3 py-2 text-sm"
                  onClick={() => onNavClick(item)}
                  data-name="mobile-item"
                  data-file="components/Header.js"
                >
                  <div className={item.icon + ' text-base'} data-name="mobile-i" data-file="components/Header.js"></div>
                  {t(lang, item.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}