function safeJsonParse(text, fallback) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return fallback;
  }
}

function getCartFromStorage() {
  try {
    const raw = localStorage.getItem('ap_cart_v1');
    if (!raw) return { items: [] };
    return safeJsonParse(raw, { items: [] }) || { items: [] };
  } catch (error) {
    console.error('getCartFromStorage error:', error);
    return { items: [] };
  }
}

function saveCartToStorage(cart) {
  try {
    localStorage.setItem('ap_cart_v1', JSON.stringify(cart || { items: [] }));
  } catch (error) {
    console.error('saveCartToStorage error:', error);
  }
}

function computeCartTotals(items) {
  try {
    const subtotal = items.reduce((sum, it) => sum + (it.lineTotal || 0), 0);
    const itemsCount = items.reduce((sum, it) => sum + (it.qty || 0), 0);
    return { subtotal, itemsCount };
  } catch (error) {
    console.error('computeCartTotals error:', error);
    return { subtotal: 0, itemsCount: 0 };
  }
}

function makeCartKey(productId, options) {
  try {
    const o = options || {};
    const size = o.size || 'M';
    return `${productId}::${size}`;
  } catch (error) {
    console.error('makeCartKey error:', error);
    return `${productId}::M`;
  }
}

function useCartState({ onToast, lang }) {
  try {
    const [cart, setCart] = React.useState(() => getCartFromStorage());
    const [totals, setTotals] = React.useState(() => computeCartTotals(cart.items || []));

    React.useEffect(() => {
      try {
        saveCartToStorage(cart);
        setTotals(computeCartTotals(cart.items || []));
      } catch (error) {
        console.error('Cart persistence effect error:', error);
      }
    }, [cart]);

    const addToCart = (product, qty, options) => {
      try {
        if (!product) return;
        const q = clamp(Number(qty || 1), 1, 20);
        const key = makeCartKey(product.id, options);

        const unit = getSizedPrice(product.price, options?.size || 'M', product);

        setCart((prev) => {
          const items = (prev.items || []).slice();
          const idx = items.findIndex((i) => i.key === key);
          if (idx >= 0) {
            items[idx] = { ...items[idx], qty: clamp(items[idx].qty + q, 1, 20) };
          } else {
            items.push({
              key,
              productId: product.id,
              title: product.title,
              image: product.image,
              qty: q,
              unitPrice: unit,
              options: options || {}
            });
          }
          const updated = items.map((it) => ({ ...it, lineTotal: it.qty * it.unitPrice }));
          return { items: updated };
        });

        if (onToast) onToast({ open: true, title: t(lang || getInitialLang(), 'toastDone'), message: t(lang || getInitialLang(), 'toastAdded'), type: 'success' });
      } catch (error) {
        console.error('addToCart error:', error);
      }
    };

    const updateQty = (key, delta) => {
      try {
        setCart((prev) => {
          const items = (prev.items || []).map((it) => {
            if (it.key !== key) return it;
            const nextQty = clamp((it.qty || 1) + delta, 1, 20);
            return { ...it, qty: nextQty, lineTotal: nextQty * (it.unitPrice || 0) };
          });
          return { items };
        });
      } catch (error) {
        console.error('updateQty error:', error);
      }
    };

    const removeFromCart = (key) => {
      try {
        setCart((prev) => {
          const items = (prev.items || []).filter((it) => it.key !== key);
          return { items };
        });
        if (onToast) onToast({ open: true, title: t(lang || getInitialLang(), 'toastRemoved'), message: t(lang || getInitialLang(), 'toastRemovedMsg'), type: 'info' });
      } catch (error) {
        console.error('removeFromCart error:', error);
      }
    };

    const clearCart = () => {
      try {
        setCart({ items: [] });
        if (onToast) onToast({ open: true, title: t(lang || getInitialLang(), 'toastCleared'), message: t(lang || getInitialLang(), 'toastClearedMsg'), type: 'info' });
      } catch (error) {
        console.error('clearCart error:', error);
      }
    };

    return { cart, addToCart, updateQty, removeFromCart, clearCart, totals };
  } catch (error) {
    console.error('useCartState error:', error);
    return {
      cart: { items: [] },
      addToCart: () => {},
      updateQty: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      totals: { subtotal: 0, itemsCount: 0 }
    };
  }
}