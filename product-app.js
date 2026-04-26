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
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="error-boundary" data-file="product-app.js">
          <div className="text-center" data-name="error-content" data-file="product-app.js">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-name="error-title" data-file="product-app.js">Что-то пошло не так</h1>
            <p className="text-gray-600 mb-4" data-name="error-desc" data-file="product-app.js">Пожалуйста, перезагрузите страницу и попробуйте снова.</p>
            <button onClick={() => window.location.reload()} className="btn btn-secondary" data-name="error-reload" data-file="product-app.js">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ProductApp() {
  try {
    const [cartOpen, setCartOpen] = React.useState(false);
    const [toast, setToast] = React.useState({ open: false, title: '', message: '', type: 'info' });
    const [lang, setLang] = React.useState(() => getInitialLang());

    const { cart, addToCart, updateQty, removeFromCart, clearCart, totals } = useCartState({ onToast: setToast, lang });

    React.useEffect(() => {
      try {
        const unsub = onLangChangeSubscribe((l) => setLang(l));
        return () => unsub();
      } catch (error) {
        console.error('Product lang subscribe error:', error);
      }
    }, []);

    const productId = getQueryParam('id');
    const product = productId ? getProductById(productId) : null;

    const [size, setSize] = React.useState('M');
    const [qty, setQty] = React.useState(1);
    const [addons, setAddons] = React.useState({ card: false, choco: false, vase: false });

    React.useEffect(() => {
      try {
        if (!product) return;
        setSize('M');
        setQty(1);
        setAddons({ card: false, choco: false, vase: false });
      } catch (error) {
        console.error('Product state init error:', error);
      }
    }, [productId]);

    if (!product) {
      return (
        <div className="min-h-screen" data-name="page-shell" data-page-shell="true" data-file="product-app.js">
          <Header variant="product" cartCount={totals.itemsCount} onCartClick={() => setCartOpen(true)} lang={lang} onLangChange={setLang} />
          <main className="container-shell py-10" data-name="main" data-file="product-app.js">
            <div className="card p-10 text-center" data-name="not-found" data-file="product-app.js">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto" data-name="nf-icon" data-file="product-app.js">
                <div className="icon-circle-help text-2xl text-[var(--primary-color)]" data-name="nf-icon-i" data-file="product-app.js"></div>
              </div>
              <h1 className="text-xl font-extrabold mt-4" data-name="nf-title" data-file="product-app.js">{t(lang, 'productNotFound')}</h1>
              <p className="text-[var(--muted-text-color)] mt-1" data-name="nf-desc" data-file="product-app.js">{t(lang, 'productNotFoundDesc')}</p>
              <div className="mt-5" data-name="nf-actions" data-file="product-app.js">
                <button className="btn btn-primary" onClick={() => (window.location.href = 'catalog.html')} data-name="nf-to-catalog" data-file="product-app.js">
                  {t(lang, 'productToCatalog')}
                </button>
              </div>
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
    }

    const currentPrice = getSizedPrice(product.price, size);
    const addonsPrice = getAddonsPrice(addons);
    const unitPrice = currentPrice + addonsPrice;
    const totalPrice = unitPrice * qty;

    const related = getRelatedProducts(product, 6);

    return (
      <div className="min-h-screen" data-name="page-shell" data-page-shell="true" data-file="product-app.js">
        <Header variant="product" cartCount={totals.itemsCount} onCartClick={() => setCartOpen(true)} lang={lang} onLangChange={setLang} />

        <main className="container-shell py-8" data-name="main" data-file="product-app.js">
          <nav className="text-sm text-[var(--muted-text-color)]" data-name="breadcrumbs" data-file="product-app.js">
            <button className="link-muted" onClick={() => (window.location.href = 'index.html')} data-name="bc-home" data-file="product-app.js">{t(lang, 'navHome')}</button>
            <span className="mx-2" data-name="bc-sep" data-file="product-app.js">/</span>
            <button className="link-muted" onClick={() => (window.location.href = 'catalog.html')} data-name="bc-catalog" data-file="product-app.js">{t(lang, 'navCatalog')}</button>
            <span className="mx-2" data-name="bc-sep2" data-file="product-app.js">/</span>
            <span className="text-[var(--text-color)] font-semibold" data-name="bc-title" data-file="product-app.js">{product.title}</span>
          </nav>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6" data-name="top" data-file="product-app.js">
            <section className="card overflow-hidden" data-name="gallery" data-file="product-app.js">
              <div className="relative" data-name="img-wrap" data-file="product-app.js">
                <div className="w-full aspect-[16/11] bg-slate-100" data-name="img-aspect" data-file="product-app.js">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" data-name="img" data-file="product-app.js" />
                </div>
                <div className="absolute top-4 left-4 flex gap-2" data-name="badges" data-file="product-app.js">
                  {product.isNew ? (
                    <span className="badge bg-white/90 text-slate-900" data-name="badge-new" data-file="product-app.js">
                      <div className="icon-sparkles text-sm" data-name="b-i" data-file="product-app.js"></div>
                      {lang === 'en' ? 'New' : lang === 'el' ? 'Νέο' : 'Новинка'}
                    </span>
                  ) : null}
                  {product.popularity >= 90 ? (
                    <span className="badge bg-[var(--primary-color)] text-white" data-name="badge-hit" data-file="product-app.js">
                      <div className="icon-flame text-sm" data-name="b2-i" data-file="product-app.js"></div>
                      {lang === 'en' ? 'Top' : lang === 'el' ? 'Best' : 'Хит'}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="p-5" data-name="gallery-foot" data-file="product-app.js">
                <h1 className="text-2xl font-extrabold leading-tight" data-name="title" data-file="product-app.js">{product.title}</h1>
                <p className="text-[var(--muted-text-color)] mt-2" data-name="desc" data-file="product-app.js">{product.short}</p>

                <div className="mt-4 grid grid-cols-2 gap-3" data-name="meta" data-file="product-app.js">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200" data-name="meta-1" data-file="product-app.js">
                    <div className="flex items-center gap-2 text-sm font-semibold" data-name="m1-row" data-file="product-app.js">
                      <div className="icon-clock text-lg text-slate-700" data-name="m1-i" data-file="product-app.js"></div>
                      {t(lang, 'productAssemble')}
                    </div>
                    <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="m1-val" data-file="product-app.js">{product.prepMinutes} {lang === 'en' ? 'min' : lang === 'el' ? 'λεπ' : 'мин'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200" data-name="meta-2" data-file="product-app.js">
                    <div className="flex items-center gap-2 text-sm font-semibold" data-name="m2-row" data-file="product-app.js">
                      <div className="icon-droplets text-lg text-slate-700" data-name="m2-i" data-file="product-app.js"></div>
                      {t(lang, 'productCare')}
                    </div>
                    <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="m2-val" data-file="product-app.js">{t(lang, 'productCareValue')}</div>
                  </div>
                </div>
              </div>
            </section>

            <aside className="card p-5" data-name="buy" data-file="product-app.js">
              <div className="flex items-start justify-between gap-4" data-name="price-row" data-file="product-app.js">
                <div data-name="price-left" data-file="product-app.js">
                  <div className="text-sm text-[var(--muted-text-color)]" data-name="price-cap" data-file="product-app.js">{t(lang, 'productPricePer')}</div>
                  <div className="text-3xl font-extrabold mt-1" data-name="price" data-file="product-app.js">{formatRUB(unitPrice)}</div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="price-note" data-file="product-app.js">{t(lang, 'productPriceNote')}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-white" data-name="deliver-badge" data-file="product-app.js">
                  <div className="flex items-center gap-2 text-sm font-bold" data-name="db-row" data-file="product-app.js">
                    <div className="icon-truck text-lg text-white" data-name="db-i" data-file="product-app.js"></div>
                    {t(lang, 'productDelivery')}
                  </div>
                  <div className="text-xs text-white/80 mt-1" data-name="db-val" data-file="product-app.js">{t(lang, 'productDeliveryFrom')}</div>
                </div>
              </div>

              <div className="mt-5" data-name="size" data-file="product-app.js">
                <div className="text-sm font-semibold" data-name="size-label" data-file="product-app.js">{t(lang, 'productSize')}</div>
                <div className="mt-2 grid grid-cols-3 gap-2" data-name="size-grid" data-file="product-app.js">
                  {['S', 'M', 'L'].map((s) => (
                    <button
                      key={s}
                      className={'btn ' + (size === s ? 'btn-primary' : 'btn-ghost')}
                      onClick={() => setSize(s)}
                      data-name="size-btn"
                      data-file="product-app.js"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-[var(--muted-text-color)]" data-name="size-hint" data-file="product-app.js">
                  {t(lang, 'productSizeHint')}
                </div>
              </div>

              <div className="mt-5" data-name="addons" data-file="product-app.js">
                <div className="text-sm font-semibold" data-name="addons-label" data-file="product-app.js">{t(lang, 'productAddons')}</div>
                <div className="mt-2 grid grid-cols-1 gap-2" data-name="addons-grid" data-file="product-app.js">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white cursor-pointer" data-name="addon" data-file="product-app.js">
                    <span className="flex items-center gap-2 text-sm font-semibold" data-name="addon-left" data-file="product-app.js">
                      <div className="icon-message-square-text text-lg text-slate-700" data-name="a-i" data-file="product-app.js"></div>
                      {t(lang, 'productAddonCard')}
                    </span>
                    <span className="flex items-center gap-3" data-name="addon-right" data-file="product-app.js">
                      <span className="text-sm font-bold" data-name="addon-price" data-file="product-app.js">+ {formatRUB(190)}</span>
                      <input type="checkbox" checked={addons.card} onChange={(e) => setAddons({ ...addons, card: e.target.checked })} data-name="addon-check" data-file="product-app.js" />
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white cursor-pointer" data-name="addon2" data-file="product-app.js">
                    <span className="flex items-center gap-2 text-sm font-semibold" data-name="addon-left" data-file="product-app.js">
                      <div className="icon-candy text-lg text-slate-700" data-name="a2-i" data-file="product-app.js"></div>
                      {t(lang, 'productAddonChoco')}
                    </span>
                    <span className="flex items-center gap-3" data-name="addon-right" data-file="product-app.js">
                      <span className="text-sm font-bold" data-name="addon-price" data-file="product-app.js">+ {formatRUB(290)}</span>
                      <input type="checkbox" checked={addons.choco} onChange={(e) => setAddons({ ...addons, choco: e.target.checked })} data-name="addon-check" data-file="product-app.js" />
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white cursor-pointer" data-name="addon3" data-file="product-app.js">
                    <span className="flex items-center gap-2 text-sm font-semibold" data-name="addon-left" data-file="product-app.js">
                      <div className="icon-glass-water text-lg text-slate-700" data-name="a3-i" data-file="product-app.js"></div>
                      {t(lang, 'productAddonVase')}
                    </span>
                    <span className="flex items-center gap-3" data-name="addon-right" data-file="product-app.js">
                      <span className="text-sm font-bold" data-name="addon-price" data-file="product-app.js">+ {formatRUB(890)}</span>
                      <input type="checkbox" checked={addons.vase} onChange={(e) => setAddons({ ...addons, vase: e.target.checked })} data-name="addon-check" data-file="product-app.js" />
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-5" data-name="qty" data-file="product-app.js">
                <div className="text-sm font-semibold" data-name="qty-label" data-file="product-app.js">{t(lang, 'productQty')}</div>
                <div className="mt-2 flex items-center gap-2" data-name="qty-row" data-file="product-app.js">
                  <button className="btn btn-ghost" onClick={() => setQty((v) => Math.max(1, v - 1))} data-name="qty-dec" data-file="product-app.js">
                    <div className="icon-minus text-lg" data-name="qty-dec-i" data-file="product-app.js"></div>
                  </button>
                  <div className="flex-1 text-center font-extrabold" data-name="qty-val" data-file="product-app.js">{qty}</div>
                  <button className="btn btn-ghost" onClick={() => setQty((v) => Math.min(20, v + 1))} data-name="qty-inc" data-file="product-app.js">
                    <div className="icon-plus text-lg" data-name="qty-inc-i" data-file="product-app.js"></div>
                  </button>
                </div>
                <div className="mt-2 text-xs text-[var(--muted-text-color)]" data-name="qty-hint" data-file="product-app.js">
                  {t(lang, 'productQtyHint')}
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200" data-name="total-box" data-file="product-app.js">
                <div className="flex items-center justify-between" data-name="tb-row" data-file="product-app.js">
                  <span className="text-sm text-[var(--muted-text-color)]" data-name="tb-cap" data-file="product-app.js">{t(lang, 'productTotal')}</span>
                  <span className="text-lg font-extrabold" data-name="tb-total" data-file="product-app.js">{formatRUB(totalPrice)}</span>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2" data-name="tb-actions" data-file="product-app.js">
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => {
                      addToCart(product, qty, { size, addons });
                      setToast({ open: true, title: t(lang, 'toastAddedToCartTitle'), message: `${product.title} — ${qty}`, type: 'success' });
                      setCartOpen(true);
                    }}
                    data-name="add"
                    data-file="product-app.js"
                  >
                    <div className="icon-shopping-bag text-lg" data-name="add-i" data-file="product-app.js"></div>
                    {t(lang, 'productAdd')}
                  </button>
                  <button
                    className="btn btn-ghost w-full"
                    onClick={() => {
                      addToCart(product, qty, { size, addons });
                      window.location.href = 'checkout.html';
                    }}
                    data-name="buy-now"
                    data-file="product-app.js"
                  >
                    <div className="icon-arrow-right text-lg" data-name="buy-i" data-file="product-app.js"></div>
                    {t(lang, 'productBuyNow')}
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3" data-name="trust" data-file="product-app.js">
                <div className="p-3 rounded-xl border border-slate-200 bg-white" data-name="trust-1" data-file="product-app.js">
                  <div className="flex items-center gap-2 text-sm font-bold" data-name="t1-row" data-file="product-app.js">
                    <div className="icon-shield-check text-lg text-slate-700" data-name="t1-i" data-file="product-app.js"></div>
                    {t(lang, 'productQuality')}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="t1-desc" data-file="product-app.js">{t(lang, 'productQualityDesc')}</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white" data-name="trust-2" data-file="product-app.js">
                  <div className="flex items-center gap-2 text-sm font-bold" data-name="t2-row" data-file="product-app.js">
                    <div className="icon-phone text-lg text-slate-700" data-name="t2-i" data-file="product-app.js"></div>
                    {t(lang, 'productSupport')}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="t2-desc" data-file="product-app.js">{t(lang, 'productSupportDesc')}</div>
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-8 card p-5" data-name="composition" data-file="product-app.js">
            <div className="flex items-center justify-between" data-name="comp-head" data-file="product-app.js">
              <h2 className="text-lg font-extrabold" data-name="comp-title" data-file="product-app.js">{t(lang, 'productCompositionTitle')}</h2>
              <div className="badge bg-slate-100 text-slate-700" data-name="comp-badge" data-file="product-app.js">
                <div className="icon-list text-sm" data-name="cb-i" data-file="product-app.js"></div>
                <span data-name="cb-t" data-file="product-app.js">{product.flowers.length}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3" data-name="comp-grid" data-file="product-app.js">
              <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="comp-left" data-file="product-app.js">
                <div className="text-sm font-bold" data-name="comp-sub" data-file="product-app.js">{t(lang, 'productFlowers')}</div>
                <ul className="mt-2 space-y-2" data-name="comp-list" data-file="product-app.js">
                  {product.flowers.map((f) => (
                    <li key={f} className="flex items-center justify-between text-sm" data-name="comp-item" data-file="product-app.js">
                      <span className="text-slate-900" data-name="comp-item-t" data-file="product-app.js">{f}</span>
                      <span className="text-slate-500" data-name="comp-item-s" data-file="product-app.js">{t(lang, 'productInComposition')}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="comp-right" data-file="product-app.js">
                <div className="text-sm font-bold" data-name="care-sub" data-file="product-app.js">{t(lang, 'productCareTitle')}</div>
                <ol className="mt-2 space-y-2 text-sm text-[var(--muted-text-color)]" data-name="care-list" data-file="product-app.js">
                  <li data-name="care-item" data-file="product-app.js">{t(lang, 'productCare1')}</li>
                  <li data-name="care-item2" data-file="product-app.js">{t(lang, 'productCare2')}</li>
                  <li data-name="care-item3" data-file="product-app.js">{t(lang, 'productCare3')}</li>
                </ol>
              </div>
            </div>
          </section>

          <section className="mt-8" data-name="related" data-file="product-app.js">
            <div className="flex items-end justify-between gap-4" data-name="rel-head" data-file="product-app.js">
              <div data-name="rel-left" data-file="product-app.js">
                <h2 className="text-lg font-extrabold" data-name="rel-title" data-file="product-app.js">{t(lang, 'productRelated')}</h2>
                <p className="text-sm text-[var(--muted-text-color)] mt-1" data-name="rel-desc" data-file="product-app.js">{t(lang, 'productRelatedDesc')}</p>
              </div>
              <button className="btn btn-ghost" onClick={() => (window.location.href = 'catalog.html')} data-name="rel-all" data-file="product-app.js">
                {t(lang, 'productAllBouquets')}
                <div className="icon-arrow-right text-lg" data-name="rel-all-i" data-file="product-app.js"></div>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-4" data-name="rel-grid" data-file="product-app.js">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpen={() => (window.location.href = `product.html?id=${encodeURIComponent(p.id)}`)}
                  onAdd={() => addToCart(p, 1, {})}
                  dataFile="product-app.js"
                  lang={lang}
                />
              ))}
            </div>
          </section>
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
    console.error('ProductApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ProductApp />
  </ErrorBoundary>
);