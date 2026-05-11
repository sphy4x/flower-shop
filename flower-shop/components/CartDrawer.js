function CartDrawer({ open, onClose, cart, totals, onInc, onDec, onRemove, onClear, onCheckout, lang }) {
  try {
    if (!open) return null;

    const l = lang || getInitialLang();
    const items = (cart && cart.items) ? cart.items : [];

    const subLine = t(l, 'cartSub', { count: totals?.itemsCount || 0, sum: formatRUB(totals?.subtotal || 0) });

    return (
      <div className="fixed inset-0 z-50" data-name="cart-wrap" data-file="components/CartDrawer.js">
        <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} data-name="backdrop" data-file="components/CartDrawer.js"></div>

        <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-soft flex flex-col" data-name="drawer" data-file="components/CartDrawer.js">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between" data-name="head" data-file="components/CartDrawer.js">
            <div data-name="head-left" data-file="components/CartDrawer.js">
              <div className="text-lg font-extrabold" data-name="title" data-file="components/CartDrawer.js">{t(l, 'cartTitle')}</div>
              <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="sub" data-file="components/CartDrawer.js">
                {subLine}
              </div>
            </div>
            <button className="btn btn-ghost px-3 py-1" onClick={onClose} data-name="close" data-file="components/CartDrawer.js">
              <div className="icon-x text-lg" data-name="close-i" data-file="components/CartDrawer.js"></div>
            </button>
          </div>

          <div className="flex-1 overflow-auto p-5 space-y-4" data-name="body" data-file="components/CartDrawer.js">
            {items.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center" data-name="empty" data-file="components/CartDrawer.js">
                <div data-name="empty-inner" data-file="components/CartDrawer.js">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto" data-name="empty-iwrap" data-file="components/CartDrawer.js">
                    <div className="icon-shopping-bag text-2xl text-[var(--primary-color)]" data-name="empty-i" data-file="components/CartDrawer.js"></div>
                  </div>
                  <div className="font-extrabold mt-4" data-name="empty-title" data-file="components/CartDrawer.js">{t(l, 'cartEmptyTitle')}</div>
                  <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="empty-desc" data-file="components/CartDrawer.js">
                    {t(l, 'cartEmptyDesc')}
                  </div>
                  <button className="btn btn-secondary mt-4" onClick={() => { onClose(); window.location.href = 'catalog.html'; }} data-name="empty-go" data-file="components/CartDrawer.js">
                    {t(l, 'cartGoCatalog')}
                    <div className="icon-arrow-right text-lg" data-name="empty-go-i" data-file="components/CartDrawer.js"></div>
                  </button>
                </div>
              </div>
            ) : (
              <div data-name="items" data-file="components/CartDrawer.js">
                {items.map((it) => (
                  <div key={it.key} className="flex items-center gap-3" data-name="item" data-file="components/CartDrawer.js">
                    <div className="w-16" data-name="img-wrap" data-file="components/CartDrawer.js">
                      <div className="w-16 aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100" data-name="img-aspect" data-file="components/CartDrawer.js">
                        <img src={it.image} alt={it.title} className="w-full h-full object-cover" data-name="img" data-file="components/CartDrawer.js" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1" data-name="mid" data-file="components/CartDrawer.js">
                      <div className="font-extrabold truncate" data-name="title" data-file="components/CartDrawer.js">{it.title}</div>
                      <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="meta" data-file="components/CartDrawer.js">
                        {it.options?.size ? (l === 'en' ? `Size ${it.options.size}` : l === 'el' ? `Μέγεθος ${it.options.size}` : `Размер ${it.options.size}`) : (l === 'en' ? 'Standard' : l === 'el' ? 'Στάνταρ' : 'Стандарт')}
                        {it.options?.addons ? renderAddonsShort(it.options.addons) : ''}
                      </div>
                      <div className="mt-2 flex items-center gap-2" data-name="qty" data-file="components/CartDrawer.js">
                        <button className="btn btn-ghost px-2 py-1" onClick={() => onDec(it.key)} data-name="dec" data-file="components/CartDrawer.js">
                          <div className="icon-minus text-lg" data-name="dec-i" data-file="components/CartDrawer.js"></div>
                        </button>
                        <div className="text-sm font-extrabold w-8 text-center" data-name="q" data-file="components/CartDrawer.js">{it.qty}</div>
                        <button className="btn btn-ghost px-2 py-1" onClick={() => onInc(it.key)} data-name="inc" data-file="components/CartDrawer.js">
                          <div className="icon-plus text-lg" data-name="inc-i" data-file="components/CartDrawer.js"></div>
                        </button>

                        <button className="btn btn-ghost px-2 py-1 ml-auto" onClick={() => onRemove(it.key)} data-name="remove" data-file="components/CartDrawer.js">
                          <div className="icon-trash text-lg" data-name="rm-i" data-file="components/CartDrawer.js"></div>
                        </button>
                      </div>
                    </div>
                    <div className="text-sm font-extrabold" data-name="price" data-file="components/CartDrawer.js">{formatRUB(it.lineTotal)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 border-t border-slate-200 bg-white space-y-3" data-name="foot" data-file="components/CartDrawer.js">
            <div className="flex items-center justify-between" data-name="totals" data-file="components/CartDrawer.js">
              <div className="text-sm text-[var(--muted-text-color)]" data-name="cap" data-file="components/CartDrawer.js">{t(l, 'cartPayable')}</div>
              <div className="text-xl font-extrabold" data-name="val" data-file="components/CartDrawer.js">{formatRUB(totals?.subtotal || 0)}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" data-name="actions" data-file="components/CartDrawer.js">
              <button className="btn btn-ghost w-full" onClick={onClear} disabled={items.length === 0} data-name="clear" data-file="components/CartDrawer.js">
                <div className="icon-trash text-lg" data-name="clear-i" data-file="components/CartDrawer.js"></div>
                {t(l, 'cartClear')}
              </button>
              <button className="btn btn-primary w-full" onClick={onCheckout} disabled={items.length === 0} data-name="checkout" data-file="components/CartDrawer.js">
                {t(l, 'cartCheckout')}
                <div className="icon-arrow-right text-lg" data-name="checkout-i" data-file="components/CartDrawer.js"></div>
              </button>
            </div>

            <div className="text-xs text-[var(--muted-text-color)]" data-name="hint" data-file="components/CartDrawer.js">
              {t(l, 'cartHint')}
            </div>
          </div>
        </aside>
      </div>
    );
  } catch (error) {
    console.error('CartDrawer component error:', error);
    return null;
  }
}