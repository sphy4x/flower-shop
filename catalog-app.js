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
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="error-boundary" data-file="catalog-app.js">
          <div className="text-center" data-name="error-content" data-file="catalog-app.js">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-name="error-title" data-file="catalog-app.js">Что-то пошло не так</h1>
            <p className="text-gray-600 mb-4" data-name="error-desc" data-file="catalog-app.js">Пожалуйста, перезагрузите страницу и попробуйте снова.</p>
            <button onClick={() => window.location.reload()} className="btn btn-secondary" data-name="error-reload" data-file="catalog-app.js">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function CatalogApp() {
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
        console.error('Catalog lang subscribe error:', error);
      }
    }, []);

    const allProducts = React.useMemo(() => getAllProducts(), []);
    const categories = React.useMemo(() => getCategories(), []);
    const occasions = React.useMemo(() => getOccasions(), []);

    const [query, setQuery] = React.useState('');
    const [category, setCategory] = React.useState('Все');
    const [occasion, setOccasion] = React.useState('Любой повод');
    const [maxPrice, setMaxPrice] = React.useState(6500);
    const [sort, setSort] = React.useState('Популярные');

    const categoryLabel = lang === 'en' ? 'All' : lang === 'el' ? 'Όλα' : 'Все';
    const occasionLabel = lang === 'en' ? 'Any occasion' : lang === 'el' ? 'Οποιαδήποτε περίσταση' : 'Любой повод';

    const categoriesUI = React.useMemo(() => {
      try {
        return categories.map((c) => (c === 'Все' ? categoryLabel : c));
      } catch (error) {
        console.error('Categories UI error:', error);
        return categories;
      }
    }, [categories, categoryLabel]);

    const occasionsUI = React.useMemo(() => {
      try {
        return occasions.map((o) => (o === 'Любой повод' ? occasionLabel : o));
      } catch (error) {
        console.error('Occasions UI error:', error);
        return occasions;
      }
    }, [occasions, occasionLabel]);

    const filtered = React.useMemo(() => {
      try {
        const q = query.trim().toLowerCase();
        let items = allProducts.slice();

        if (q) {
          items = items.filter((p) => (p.title + ' ' + p.short + ' ' + p.tags.join(' ')).toLowerCase().includes(q));
        }

        const categoryValue = category === categoryLabel ? 'Все' : category;
        const occasionValue = occasion === occasionLabel ? 'Любой повод' : occasion;

        if (categoryValue !== 'Все') items = items.filter((p) => p.category === categoryValue);
        if (occasionValue !== 'Любой повод') items = items.filter((p) => p.occasions.includes(occasionValue));
        items = items.filter((p) => p.price <= maxPrice);

        const sortValue = sort;
        if (sortValue === t(lang, 'catalogSortPriceAsc')) items.sort((a, b) => a.price - b.price);
        if (sortValue === t(lang, 'catalogSortPriceDesc')) items.sort((a, b) => b.price - a.price);
        if (sortValue === t(lang, 'catalogSortNew')) items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        if (sortValue === t(lang, 'catalogSortPopular')) items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

        return items;
      } catch (error) {
        console.error('Catalog filtering error:', error);
        return [];
      }
    }, [allProducts, query, category, occasion, maxPrice, sort, lang, categoryLabel, occasionLabel]);

    const sortOptions = [
      t(lang, 'catalogSortPopular'),
      t(lang, 'catalogSortNew'),
      t(lang, 'catalogSortPriceAsc'),
      t(lang, 'catalogSortPriceDesc')
    ];

    React.useEffect(() => {
      try {
        if (!sortOptions.includes(sort)) setSort(sortOptions[0]);
      } catch (error) {
        console.error('Sort sync error:', error);
      }
    }, [lang]);

    return (
      <div className="min-h-screen" data-name="page-shell" data-page-shell="true" data-file="catalog-app.js">
        <Header variant="catalog" cartCount={totals.itemsCount} onCartClick={() => setCartOpen(true)} lang={lang} onLangChange={setLang} />

        <main className="container-shell py-8" data-name="main" data-file="catalog-app.js">
          <div className="flex flex-col lg:flex-row gap-6" data-name="layout" data-file="catalog-app.js">
            <aside className="card p-5 lg:w-[360px]" data-name="filters" data-file="catalog-app.js">
              <div className="flex items-center justify-between mb-3" data-name="filters-header" data-file="catalog-app.js">
                <h1 className="text-xl font-extrabold" data-name="title" data-file="catalog-app.js">{t(lang, 'catalogTitle')}</h1>
                <div className="badge bg-slate-100 text-slate-700" data-name="count" data-file="catalog-app.js">
                  <div className="icon-sparkles text-sm" data-name="count-icon" data-file="catalog-app.js"></div>
                  <span data-name="count-text" data-file="catalog-app.js">{filtered.length}</span>
                </div>
              </div>

              <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label-search" data-file="catalog-app.js">{t(lang, 'catalogSearch')}</label>
              <div className="mt-2 relative" data-name="search-wrap" data-file="catalog-app.js">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" data-name="search-icon" data-file="catalog-app.js">
                  <div className="icon-search text-lg" data-name="search-icon-i" data-file="catalog-app.js"></div>
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t(lang, 'commonSearchPlaceholder')}
                  className="input pl-10"
                  data-name="search"
                  data-file="catalog-app.js"
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4" data-name="filter-grid" data-file="catalog-app.js">
                <div data-name="filter-category" data-file="catalog-app.js">
                  <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="catalog-app.js">{t(lang, 'catalogCategory')}</label>
                  <select className="input mt-2" value={category} onChange={(e) => setCategory(e.target.value)} data-name="select" data-file="catalog-app.js">
                    {categoriesUI.map((c, idx) => (
                      <option key={idx} value={c} data-name="option" data-file="catalog-app.js">{c}</option>
                    ))}
                  </select>
                </div>

                <div data-name="filter-occasion" data-file="catalog-app.js">
                  <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="catalog-app.js">{t(lang, 'catalogOccasion')}</label>
                  <select className="input mt-2" value={occasion} onChange={(e) => setOccasion(e.target.value)} data-name="select" data-file="catalog-app.js">
                    {occasionsUI.map((o, idx) => (
                      <option key={idx} value={o} data-name="option" data-file="catalog-app.js">{o}</option>
                    ))}
                  </select>
                </div>

                <div data-name="filter-price" data-file="catalog-app.js">
                  <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="catalog-app.js">
                    {t(lang, 'catalogPriceUpTo')} <span className="font-extrabold text-[var(--text-color)]" data-name="price-val" data-file="catalog-app.js">{formatRUB(maxPrice)}</span>
                  </label>
                  <input
                    type="range"
                    min="1800"
                    max="9500"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="mt-3 w-full"
                    data-name="range"
                    data-file="catalog-app.js"
                  />
                  <div className="flex justify-between text-xs text-[var(--muted-text-color)] mt-2" data-name="range-labels" data-file="catalog-app.js">
                    <span data-name="min" data-file="catalog-app.js">{formatRUB(1800)}</span>
                    <span data-name="max" data-file="catalog-app.js">{formatRUB(9500)}</span>
                  </div>
                </div>

                <div data-name="filter-sort" data-file="catalog-app.js">
                  <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="catalog-app.js">{t(lang, 'catalogSort')}</label>
                  <select className="input mt-2" value={sort} onChange={(e) => setSort(e.target.value)} data-name="select" data-file="catalog-app.js">
                    {sortOptions.map((s) => (
                      <option key={s} value={s} data-name="option" data-file="catalog-app.js">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3" data-name="filter-actions" data-file="catalog-app.js">
                <button
                  className="btn btn-secondary flex-1"
                  onClick={() => {
                    setQuery('');
                    setCategory(categoryLabel);
                    setOccasion(occasionLabel);
                    setMaxPrice(6500);
                    setSort(sortOptions[0]);
                  }}
                  data-name="reset"
                  data-file="catalog-app.js"
                >
                  <div className="icon-rotate-ccw text-lg" data-name="reset-icon" data-file="catalog-app.js"></div>
                  {t(lang, 'commonReset')}
                </button>
                <button className="btn btn-ghost" onClick={() => setCartOpen(true)} data-name="open-cart" data-file="catalog-app.js">
                  <div className="icon-shopping-bag text-lg" data-name="cart-icon" data-file="catalog-app.js"></div>
                </button>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white" data-name="promo" data-file="catalog-app.js">
                <div className="flex items-start gap-3" data-name="promo-row" data-file="catalog-app.js">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center" data-name="promo-icon" data-file="catalog-app.js">
                    <div className="icon-truck text-xl text-white" data-name="promo-icon-i" data-file="catalog-app.js"></div>
                  </div>
                  <div data-name="promo-text" data-file="catalog-app.js">
                    <p className="font-extrabold" data-name="promo-title" data-file="catalog-app.js">{t(lang, 'catalogPromoTitle')}</p>
                    <p className="text-sm text-white/80 mt-1" data-name="promo-desc" data-file="catalog-app.js">{t(lang, 'catalogPromoDesc')}</p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="flex-1" data-name="grid-section" data-file="catalog-app.js">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" data-name="grid" data-file="catalog-app.js">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onOpen={() => (window.location.href = `product.html?id=${encodeURIComponent(p.id)}`)}
                    onAdd={() => addToCart(p, 1, {})}
                    dataFile="catalog-app.js"
                    lang={lang}
                  />
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="card p-8 mt-6 text-center" data-name="empty" data-file="catalog-app.js">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto" data-name="empty-icon" data-file="catalog-app.js">
                    <div className="icon-flower-2 text-2xl text-[var(--primary-color)]" data-name="empty-icon-i" data-file="catalog-app.js"></div>
                  </div>
                  <h2 className="text-lg font-extrabold mt-4" data-name="empty-title" data-file="catalog-app.js">{t(lang, 'catalogEmptyTitle')}</h2>
                  <p className="text-[var(--muted-text-color)] mt-1" data-name="empty-desc" data-file="catalog-app.js">{t(lang, 'catalogEmptyDesc')}</p>
                </div>
              ) : null}
            </section>
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
    console.error('CatalogApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <CatalogApp />
  </ErrorBoundary>
);