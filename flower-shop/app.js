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
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="error-boundary" data-file="app.js">
          <div className="text-center" data-name="error-content" data-file="app.js">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-name="error-title" data-file="app.js">Что-то пошло не так</h1>
            <p className="text-gray-600 mb-4" data-name="error-desc" data-file="app.js">Пожалуйста, перезагрузите страницу и попробуйте снова.</p>
            <button onClick={() => window.location.reload()} className="btn btn-secondary" data-name="error-reload" data-file="app.js">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [cartOpen, setCartOpen] = React.useState(false);
    const [toast, setToast] = React.useState({ open: false, title: '', message: '', type: 'info' });

    const { cart, addToCart, updateQty, removeFromCart, clearCart, totals } = useCartState({ onToast: setToast });

    const [lang, setLang] = React.useState(() => getInitialLang());

    React.useEffect(() => {
      try {
        saveLang(lang);
      } catch (error) {
        console.error('Home save lang error:', error);
      }
    }, [lang]);

    React.useEffect(() => {
      try {
        const handler = () => setCartOpen(false);
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
      } catch (error) {
        console.error('Home hash handler error:', error);
      }
    }, []);

    React.useEffect(() => {
      try {
        const onStorage = (e) => {
          try {
            if (e && e.key === 'ap_lang_v1') setLang(getInitialLang());
          } catch (error) {
            console.error('Home storage lang sync error:', error);
          }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
      } catch (error) {
        console.error('Home storage listener error:', error);
      }
    }, []);

    const openCart = () => setCartOpen(true);

    return (
      <div className="min-h-screen" data-name="page-shell" data-page-shell="true" data-file="app.js">
        <Header
          variant="home"
          cartCount={totals.itemsCount}
          onCartClick={() => setCartOpen(true)}
          lang={lang}
          onLangChange={setLang}
        />

        <main data-name="main" data-file="app.js">
          <HomeHero lang={lang} onPrimary={() => (window.location.href = 'catalog.html')} onSecondary={openCart} />
          <HomeFeatured lang={lang} products={getFeaturedProducts()} onAdd={(p) => addToCart(p, 1, {})} />
          <HomeBenefits lang={lang} />
          <HomeReviews lang={lang} />
          <HomeFAQ lang={lang} />
        </main>

        <Footer lang={lang} />

        <CartDrawer
          lang={lang}
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          totals={totals}
          onInc={(id) => updateQty(id, 1)}
          onDec={(id) => updateQty(id, -1)}
          onRemove={(id) => removeFromCart(id)}
          onClear={() => clearCart()}
          onCheckout={() => (window.location.href = 'checkout.html')}
        />

        <Toast
          open={toast.open}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ open: false, title: '', message: '', type: 'info' })}
        />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);