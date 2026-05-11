function ProductCard({ product, onOpen, onAdd, dataFile, lang }) {
  try {
    if (!product) return null;

    const l = lang || getInitialLang();

    const categoryLabel = product.categoryLabel || product.category;
    const occasionLabel = (product.occasionsLabel && product.occasionsLabel[0]) ? product.occasionsLabel[0] : (product.occasions && product.occasions[0]);

    const isFamilyTeddy = Boolean(product && product.flags && product.flags.hasLargeSize && typeof product.priceLarge === 'number');
    const minPrice = isFamilyTeddy ? Math.min(product.price, product.priceLarge) : product.price;

    return (
      <article className="card overflow-hidden hover:shadow-soft transition h-full flex flex-col" data-name="product-card" data-file="components/ProductCard.js">
        <button className="block w-full text-left" onClick={onOpen} data-name="media" data-file="components/ProductCard.js">
          <div className="relative" data-name="img-wrap" data-file="components/ProductCard.js">
            <div className="w-full aspect-[4/5] bg-slate-100" data-name="img-aspect" data-file="components/ProductCard.js">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  try {
                    const target = e && e.currentTarget ? e.currentTarget : null;
                    if (!target) return;

                    const fallbacks = [
                      (product && product.imageFallback) ? product.imageFallback : null,
                      // Return to the product's original image first (in case a previous fallback got “stuck”).
                      (product && product.image) ? product.image : null,
                      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
                      'https://images.unsplash.com/photo-1526045431048-1d4a0e0f0b0a?auto=format&fit=crop&w=1200&q=80'
                    ].filter(Boolean);

                    const lastIndex = Number(target.dataset && target.dataset.fallbackIndex ? target.dataset.fallbackIndex : 0);
                    const nextIndex = Number.isFinite(lastIndex) ? lastIndex + 1 : 1;

                    if (!target.dataset) return;

                    if (nextIndex > fallbacks.length) return;

                    target.dataset.fallbackIndex = String(nextIndex);

                    const nextSrc = fallbacks[nextIndex - 1];
                    if (nextSrc && target.src !== nextSrc) {
                      target.src = nextSrc;
                    }
                  } catch (error) {
                    console.error('ProductCard image fallback error:', error);
                  }
                }}
                data-name="img"
                data-file="components/ProductCard.js"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/35 via-slate-900/0 to-transparent" data-name="img-gradient" data-file="components/ProductCard.js"></div>

            <div className="absolute top-3 left-3 flex gap-2" data-name="img-badges" data-file="components/ProductCard.js">
              {product.isNew ? (
                <span className="badge bg-white/90 text-slate-900" data-name="badge-new" data-file="components/ProductCard.js">
                  <div className="icon-sparkles text-sm" data-name="bn-i" data-file="components/ProductCard.js"></div>
                  {l === 'en' ? 'New' : l === 'el' ? 'Νέο' : 'Новинка'}
                </span>
              ) : null}
              {product.popularity >= 90 ? (
                <span className="badge bg-[var(--primary-color)] text-white" data-name="badge-top" data-file="components/ProductCard.js">
                  <div className="icon-flame text-sm" data-name="bt-i" data-file="components/ProductCard.js"></div>
                  {l === 'en' ? 'Top' : l === 'el' ? 'Best' : 'Хит'}
                </span>
              ) : null}
            </div>
          </div>
        </button>

        <div className="p-5 flex-1 flex flex-col" data-name="body" data-file="components/ProductCard.js">
          <div className="flex items-start justify-between gap-4" data-name="top" data-file="components/ProductCard.js">
            <div className="min-w-0 flex-1" data-name="t-left" data-file="components/ProductCard.js">
              <h3 className="font-extrabold text-base leading-snug break-words" data-name="title" data-file="components/ProductCard.js">{product.title}</h3>
              <div className="text-sm text-[var(--muted-text-color)] mt-2 leading-relaxed break-words" data-name="short" data-file="components/ProductCard.js">
                {product.short}
              </div>
            </div>
            <div className="text-right flex-shrink-0" data-name="t-right" data-file="components/ProductCard.js">
              <div className="text-xs text-[var(--muted-text-color)]" data-name="cap" data-file="components/ProductCard.js">{l === 'en' ? 'from' : l === 'el' ? 'από' : 'от'}</div>
              <div className="font-extrabold text-[var(--primary-color)] text-lg leading-none mt-1" data-name="price" data-file="components/ProductCard.js">
                {product.specialPriceLabel ? product.specialPriceLabel : formatMoney(minPrice)}
              </div>
              {isFamilyTeddy ? (
                <div className="text-[11px] text-[var(--muted-text-color)] mt-1" data-name="price-note" data-file="components/ProductCard.js">
                  {l === 'en' ? 'Small / Large' : l === 'el' ? 'Μικρό / Μεγάλο' : 'Маленький / Большой'}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2" data-name="tags" data-file="components/ProductCard.js">
            <span className="badge bg-slate-100 text-slate-700 whitespace-normal" data-name="tag1" data-file="components/ProductCard.js">
              <div className="icon-tag text-sm" data-name="tag1-i" data-file="components/ProductCard.js"></div>
              <span className="break-words" data-name="tag1-t" data-file="components/ProductCard.js">{categoryLabel}</span>
            </span>
            {occasionLabel ? (
              <span className="badge bg-rose-50 text-rose-700 whitespace-normal" data-name="tag2" data-file="components/ProductCard.js">
                <div className="icon-heart text-sm" data-name="tag2-i" data-file="components/ProductCard.js"></div>
                <span className="break-words" data-name="tag2-t" data-file="components/ProductCard.js">{occasionLabel}</span>
              </span>
            ) : null}
          </div>

          <div className="mt-auto pt-5 flex items-center gap-2" data-name="actions" data-file="components/ProductCard.js">
            <button className="btn btn-ghost flex-1 min-w-0" onClick={onOpen} data-name="open" data-file="components/ProductCard.js">
              <span className="truncate" data-name="open-t" data-file="components/ProductCard.js">{t(l, 'commonMore')}</span>
              <div className="icon-arrow-right text-lg flex-shrink-0" data-name="open-i" data-file="components/ProductCard.js"></div>
            </button>
            <button className="btn btn-primary px-4 py-3" onClick={onAdd} data-name="add" data-file="components/ProductCard.js">
              <div className="icon-shopping-bag text-lg" data-name="add-i" data-file="components/ProductCard.js"></div>
              <span data-name="add-t" data-file="components/ProductCard.js">{t(l, 'commonAddToCart')}</span>
            </button>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error('ProductCard component error:', error);
    return null;
  }
}