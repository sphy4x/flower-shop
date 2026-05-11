function Footer({ lang }) {
  try {
    const year = 2026;
    const l = lang || getInitialLang();

    return (
      <footer className="mt-auto border-t border-[var(--border-color)] bg-white" data-name="footer" data-file="components/Footer.js">
        <div className="container-shell py-10" data-name="inner" data-file="components/Footer.js">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-name="grid" data-file="components/Footer.js">
            <div data-name="col1" data-file="components/Footer.js">
              <div className="flex items-center gap-3" data-name="brand" data-file="components/Footer.js">
                <div className="w-10 h-10 rounded-2xl bg-[var(--primary-color)] flex items-center justify-center" data-name="logo" data-file="components/Footer.js">
                  <div className="icon-flower-2 text-xl text-white" data-name="logo-i" data-file="components/Footer.js"></div>
                </div>
                <div data-name="brand-text" data-file="components/Footer.js">
                  <div className="font-extrabold" data-name="name" data-file="components/Footer.js">Art Passaion</div>
                  <div className="text-xs text-[var(--muted-text-color)]" data-name="tagline" data-file="components/Footer.js">{t(l, 'brandTagline')}</div>
                </div>
              </div>

              <p className="text-sm text-[var(--muted-text-color)] mt-3" data-name="desc" data-file="components/Footer.js">
                {l === 'en'
                  ? 'Bouquets with character: balanced colors, seasonality and careful delivery.'
                  : l === 'el'
                    ? 'Ανθοδέσμες με χαρακτήρα: ισορροπία χρωμάτων, εποχικότητα και προσεγμένη παράδοση.'
                    : 'Собираем букеты с характером: баланс оттенков, сезонность и аккуратная доставка.'}
              </p>

              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200" data-name="gr" data-file="components/Footer.js">
                <div className="flex items-start gap-3" data-name="gr-row" data-file="components/Footer.js">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center" data-name="gr-iwrap" data-file="components/Footer.js">
                    <div className="icon-map-pin text-xl text-white" data-name="gr-i" data-file="components/Footer.js"></div>
                  </div>
                  <div data-name="gr-text" data-file="components/Footer.js">
                    <div className="text-sm font-extrabold" data-name="gr-title" data-file="components/Footer.js">
                      {l === 'en' ? 'Store in Greece' : l === 'el' ? 'Κατάστημα στην Ελλάδα' : 'Магазин в Греции'}
                    </div>
                    <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="gr-addr" data-file="components/Footer.js">
                      Leof. Andrea Papandreou 10, Neapoli 567 27
                    </div>
                    <a className="text-xs font-extrabold text-[var(--primary-color)] mt-2 inline-flex items-center gap-2" href="tel:+302316026404" data-name="gr-phone" data-file="components/Footer.js">
                      <div className="icon-phone text-sm" data-name="gr-phone-i" data-file="components/Footer.js"></div>
                      231 602 6404
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div data-name="col2" data-file="components/Footer.js">
              <div className="font-extrabold" data-name="title" data-file="components/Footer.js">{t(l, 'footerCustomers')}</div>
              <div className="mt-3 space-y-2" data-name="links" data-file="components/Footer.js">
                <button className="link-muted text-left" onClick={() => navigateToPage('catalog.html')} data-name="l1" data-file="components/Footer.js">{t(l, 'footerCatalog')}</button>
                <div className="h-px bg-slate-100" data-name="sep" data-file="components/Footer.js"></div>
                <button className="link-muted text-left" onClick={() => navigateToSection('delivery')} data-name="l2" data-file="components/Footer.js">{t(l, 'footerDelivery')}</button>
                <div className="h-px bg-slate-100" data-name="sep2" data-file="components/Footer.js"></div>
                <button className="link-muted text-left" onClick={() => navigateToSection('faq')} data-name="l3" data-file="components/Footer.js">{t(l, 'footerFaq')}</button>
                <div className="h-px bg-slate-100" data-name="sep3" data-file="components/Footer.js"></div>
                <button className="link-muted text-left" onClick={() => navigateToPage('contacts.html')} data-name="l4" data-file="components/Footer.js">{t(l, 'footerContacts')}</button>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-rose-50 border border-rose-200" data-name="demo" data-file="components/Footer.js">
                <div className="flex items-start gap-3" data-name="demo-row" data-file="components/Footer.js">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-rose-200" data-name="demo-iwrap" data-file="components/Footer.js">
                    <div className="icon-info text-xl text-rose-700" data-name="demo-i" data-file="components/Footer.js"></div>
                  </div>
                  <div data-name="demo-text" data-file="components/Footer.js">
                    <div className="text-sm font-extrabold" data-name="demo-title" data-file="components/Footer.js">{t(l, 'footerDemo')}</div>
                    <div className="text-xs text-rose-800/80 mt-1" data-name="demo-desc" data-file="components/Footer.js">
                      {l === 'en'
                        ? 'Orders are not processed in this demo.'
                        : l === 'el'
                          ? 'Σε αυτό το demo δεν γίνεται επεξεργασία παραγγελιών.'
                          : 'В этом демо заказы не обрабатываются.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-name="col3" data-file="components/Footer.js">
              <div className="font-extrabold" data-name="title" data-file="components/Footer.js">{t(l, 'footerQuickOrder')}</div>
              <p className="text-sm text-[var(--muted-text-color)] mt-3" data-name="desc" data-file="components/Footer.js">
                {t(l, 'footerQuickOrderDesc')}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-2" data-name="actions" data-file="components/Footer.js">
                <a className="btn btn-secondary w-full" href="tel:+302316026404" data-name="call" data-file="components/Footer.js">
                  <div className="icon-phone text-lg" data-name="call-i" data-file="components/Footer.js"></div>
                  231 602 6404
                </a>
                <button className="btn btn-ghost w-full" onClick={() => navigateToPage('contacts.html')} data-name="contacts" data-file="components/Footer.js">
                  {t(l, 'navContacts')}
                  <div className="icon-arrow-right text-lg" data-name="contacts-i" data-file="components/Footer.js"></div>
                </button>
              </div>

              <div className="mt-5 text-xs text-[var(--muted-text-color)]" data-name="meta" data-file="components/Footer.js">
                © {year} Art Passaion • {t(l, 'footerDeliverySameDay')}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}