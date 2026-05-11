// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="error-boundary" data-file="contacts-app.js">
          <div className="text-center" data-name="error-content" data-file="contacts-app.js">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-name="error-title" data-file="contacts-app.js">Что-то пошло не так</h1>
            <p className="text-gray-600 mb-4" data-name="error-desc" data-file="contacts-app.js">Пожалуйста, перезагрузите страницу и попробуйте снова.</p>
            <button onClick={() => window.location.reload()} className="btn btn-secondary" data-name="error-reload" data-file="contacts-app.js">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ContactsApp() {
  try {
    const [cartOpen, setCartOpen] = React.useState(false);
    const [toast, setToast] = React.useState({ open: false, title: '', message: '', type: 'info' });
    const [lang, setLang] = React.useState(() => getInitialLang());

    const { cart, updateQty, removeFromCart, clearCart, totals } = useCartState({ onToast: setToast, lang });

    React.useEffect(() => {
      try {
        const unsub = onLangChangeSubscribe((l) => setLang(l));
        return () => unsub();
      } catch (error) {
        console.error('Contacts lang subscribe error:', error);
      }
    }, []);

    const phoneHref = 'tel:+302316026404';

    const quick = [
      { label: t(lang, 'contactsPhone'), icon: 'icon-phone', action: () => (window.location.href = phoneHref) },
      { label: 'WhatsApp', icon: 'icon-message-circle', action: () => (window.location.href = 'https://wa.me/') },
      { label: 'Telegram', icon: 'icon-send', action: () => (window.location.href = 'https://t.me/') }
    ];

    return (
      <div className="min-h-screen" data-name="page-shell" data-page-shell="true" data-file="contacts-app.js">
        <Header variant="contacts" cartCount={totals.itemsCount} onCartClick={() => setCartOpen(true)} lang={lang} onLangChange={setLang} />

        <main className="container-shell py-8" data-name="main" data-file="contacts-app.js">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-name="layout" data-file="contacts-app.js">
            <section className="lg:col-span-2 space-y-6" data-name="left" data-file="contacts-app.js">
              <div className="card p-5" data-name="top" data-file="contacts-app.js">
                <div className="flex items-start justify-between gap-4" data-name="head" data-file="contacts-app.js">
                  <div data-name="head-left" data-file="contacts-app.js">
                    <h1 className="text-xl font-extrabold" data-name="title" data-file="contacts-app.js">{t(lang, 'contactsTitle')}</h1>
                    <p className="text-sm text-[var(--muted-text-color)] mt-1" data-name="subtitle" data-file="contacts-app.js">
                      {t(lang, 'contactsSubtitle')}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-50" data-name="head-icon" data-file="contacts-app.js">
                    <div className="icon-message-square-text text-2xl text-[var(--primary-color)]" data-name="head-icon-i" data-file="contacts-app.js"></div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4" data-name="cards" data-file="contacts-app.js">
                  <div className="p-4 rounded-2xl border border-slate-200 bg-white" data-name="card1" data-file="contacts-app.js">
                    <div className="flex items-center gap-2 text-sm font-extrabold" data-name="row" data-file="contacts-app.js">
                      <div className="icon-phone text-lg text-slate-700" data-name="i" data-file="contacts-app.js"></div>
                      {t(lang, 'contactsPhone')}
                    </div>
                    <a className="text-[var(--primary-color)] font-extrabold mt-2 inline-block" href={phoneHref} data-name="link" data-file="contacts-app.js">231 602 6404</a>
                    <div className="text-xs text-[var(--muted-text-color)] mt-2" data-name="note" data-file="contacts-app.js">10:00–21:00</div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-white" data-name="card2" data-file="contacts-app.js">
                    <div className="flex items-center gap-2 text-sm font-extrabold" data-name="row" data-file="contacts-app.js">
                      <div className="icon-mail text-lg text-slate-700" data-name="i" data-file="contacts-app.js"></div>
                      {t(lang, 'contactsEmail')}
                    </div>
                    <a className="text-[var(--primary-color)] font-extrabold mt-2 inline-block" href="mailto:hello@artpassaion.example" data-name="link" data-file="contacts-app.js">hello@artpassaion.example</a>
                    <div className="text-xs text-[var(--muted-text-color)] mt-2" data-name="note" data-file="contacts-app.js">{lang === 'en' ? 'We reply within a day.' : lang === 'el' ? 'Απαντάμε μέσα στη μέρα.' : 'Ответим в течение дня.'}</div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-white" data-name="card3" data-file="contacts-app.js">
                    <div className="flex items-center gap-2 text-sm font-extrabold" data-name="row" data-file="contacts-app.js">
                      <div className="icon-map-pin text-lg text-slate-700" data-name="i" data-file="contacts-app.js"></div>
                      {t(lang, 'contactsAddress')}
                    </div>
                    <div className="font-bold mt-2" data-name="addr" data-file="contacts-app.js">Leof. Andrea Papandreou 10, Neapoli 567 27</div>
                    <div className="text-xs text-[var(--muted-text-color)] mt-2" data-name="note" data-file="contacts-app.js">{lang === 'en' ? 'Pickup is free.' : lang === 'el' ? 'Δωρεάν παραλαβή.' : 'Самовывоз без доплат.'}</div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-white" data-name="card4" data-file="contacts-app.js">
                    <div className="flex items-center gap-2 text-sm font-extrabold" data-name="row" data-file="contacts-app.js">
                      <div className="icon-truck text-lg text-slate-700" data-name="i" data-file="contacts-app.js"></div>
                      {t(lang, 'contactsDelivery')}
                    </div>
                    <div className="font-bold mt-2" data-name="d1" data-file="contacts-app.js">{t(lang, 'contactsDeliveryLine1')}</div>
                    <div className="text-xs text-[var(--muted-text-color)] mt-2" data-name="note" data-file="contacts-app.js">{t(lang, 'contactsDeliveryLine2')}</div>
                  </div>
                </div>
              </div>

              <div className="card p-5" data-name="map" data-file="contacts-app.js">
                <div className="flex items-center justify-between" data-name="map-head" data-file="contacts-app.js">
                  <div data-name="map-left" data-file="contacts-app.js">
                    <div className="text-sm font-extrabold" data-name="map-title" data-file="contacts-app.js">{t(lang, 'contactsWhere')}</div>
                    <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="map-sub" data-file="contacts-app.js">{t(lang, 'contactsWhereSub')}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center" data-name="map-iwrap" data-file="contacts-app.js">
                    <div className="icon-map text-xl text-white" data-name="map-i" data-file="contacts-app.js"></div>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50" data-name="map-box" data-file="contacts-app.js">
                  <div className="h-[240px] flex items-center justify-center text-[var(--muted-text-color)]" data-name="map-ph" data-file="contacts-app.js">
                    {t(lang, 'contactsMapPlaceholder')}
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-6" data-name="right" data-file="contacts-app.js">
              <div className="card p-5" data-name="quick" data-file="contacts-app.js">
                <div className="flex items-start justify-between" data-name="qh" data-file="contacts-app.js">
                  <div data-name="qh-left" data-file="contacts-app.js">
                    <div className="text-sm font-extrabold" data-name="qh-title" data-file="contacts-app.js">{t(lang, 'contactsQuick')}</div>
                    <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="qh-sub" data-file="contacts-app.js">{t(lang, 'contactsQuickSub')}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center" data-name="qh-iwrap" data-file="contacts-app.js">
                    <div className="icon-zap text-xl text-[var(--primary-color)]" data-name="qh-i" data-file="contacts-app.js"></div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2" data-name="quick-grid" data-file="contacts-app.js">
                  {quick.map((q) => (
                    <button key={q.label} className="btn btn-ghost w-full justify-start" onClick={q.action} data-name="quick-btn" data-file="contacts-app.js">
                      <div className={q.icon + ' text-lg'} data-name="q-i" data-file="contacts-app.js"></div>
                      {q.label}
                      <div className="icon-external-link text-lg ml-auto" data-name="q-ext" data-file="contacts-app.js"></div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card p-5" data-name="hint" data-file="contacts-app.js">
                <div className="flex items-start gap-3" data-name="hint-row" data-file="contacts-app.js">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center" data-name="h-iwrap" data-file="contacts-app.js">
                    <div className="icon-flower-2 text-2xl text-white" data-name="h-i" data-file="contacts-app.js"></div>
                  </div>
                  <div data-name="h-text" data-file="contacts-app.js">
                    <div className="font-extrabold" data-name="h-title" data-file="contacts-app.js">{t(lang, 'contactsHintTitle')}</div>
                    <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="h-desc" data-file="contacts-app.js">
                      {t(lang, 'contactsHintDesc')}
                    </div>
                    <button className="btn btn-primary mt-3" onClick={() => (window.location.href = 'catalog.html')} data-name="h-btn" data-file="contacts-app.js">
                      {t(lang, 'contactsHintBtn')}
                      <div className="icon-arrow-right text-lg" data-name="h-btn-i" data-file="contacts-app.js"></div>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>

        <Footer lang={lang} />

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          totals={totals}
          onInc={(id) => updateQty(id, 1)}
          onDec={(id) => updateQty(id, -1)}
          onRemove={(id) => removeFromCart(id)}
          onClear={() => clearCart()}
          onCheckout={() => (window.location.href = 'checkout.html')}
          lang={lang}
        />

        <Toast open={toast.open} title={toast.title} message={toast.message} type={toast.type} onClose={() => setToast({ open: false, title: '', message: '', type: 'info' })} lang={lang} />
      </div>
    );
  } catch (error) {
    console.error('ContactsApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ContactsApp />
  </ErrorBoundary>
);