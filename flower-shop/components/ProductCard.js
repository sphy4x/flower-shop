function ProductCard({ product, onOpen, onAdd, dataFile, lang }) {
  try {
    if (!product) return null;

    const l = lang || getInitialLang();

    return (
      <article className="card overflow-hidden hover:shadow-soft transition" data-name="product-card" data-file="components/ProductCard.js">
        <button className="block w-full text-left" onClick={onOpen} data-name="media" data-file="components/ProductCard.js">
          <div className="relative" data-name="img-wrap" data-file="components/ProductCard.js">
            <div className="w-full aspect-[16/11] bg-slate-100" data-name="img-aspect" data-file="components/ProductCard.js">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" data-name="img" data-file="components/ProductCard.js" />
            </div>
            <div className="absolute top-3 left-3 flex gap-2" data-name="badges" data-file="components/ProductCard.js">
              {product.isNew ? (
                <span className="badge bg-white/90 text-slate-900" data-name="b-new" data-file="components/ProductCard.js">
                  <div className="icon-sparkles text-sm" data-name="b-new-i" data-file="components/ProductCard.js"></div>
                  {l === 'en' ? 'New' : l === 'el' ? 'Νέο' : 'Новинка'}
                </span>
              ) : null}
              {product.popularity >= 90 ? (
                <span className="badge bg-[var(--primary-color)] text-white" data-name="b-hit" data-file="components/ProductCard.js">
                  <div className="icon-flame text-sm" data-name="b-hit-i" data-file="components/ProductCard.js"></div>
                  {l === 'en' ? 'Top' : l === 'el' ? 'Best' : 'Хит'}
                </span>
              ) : null}
            </div>
          </div>
        </button>

        <div className="p-4" data-name="body" data-file="components/ProductCard.js">
          <div className="flex items-start justify-between gap-3" data-name="top" data-file="components/ProductCard.js">
            <div className="min-w-0" data-name="t-left" data-file="components/ProductCard.js">
              <h3 className="font-extrabold truncate" data-name="title" data-file="components/ProductCard.js">{product.title}</h3>
              <div className="text-xs text-[var(--muted-text-color)] mt-1 truncate" data-name="short" data-file="components/ProductCard.js">{product.short}</div>
            </div>
            <div className="text-right" data-name="t-right" data-file="components/ProductCard.js">
              <div className="text-xs text-[var(--muted-text-color)]" data-name="cap" data-file="components/ProductCard.js">{l === 'en' ? 'from' : l === 'el' ? 'από' : 'от'}</div>
              <div className="font-extrabold text-[var(--primary-color)]" data-name="price" data-file="components/ProductCard.js">{formatRUB(product.price)}</div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2" data-name="tags" data-file="components/ProductCard.js">
            <span className="badge bg-slate-100 text-slate-700" data-name="tag1" data-file="components/ProductCard.js">
              <div className="icon-tag text-sm" data-name="tag1-i" data-file="components/ProductCard.js"></div>
              {product.category}
            </span>
            <span className="badge bg-rose-50 text-rose-700" data-name="tag2" data-file="components/ProductCard.js">
              <div className="icon-heart text-sm" data-name="tag2-i" data-file="components/ProductCard.js"></div>
              {product.occasions[0]}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2" data-name="actions" data-file="components/ProductCard.js">
            <button className="btn btn-ghost flex-1" onClick={onOpen} data-name="open" data-file="components/ProductCard.js">
              {t(l, 'commonMore')}
              <div className="icon-arrow-right text-lg" data-name="open-i" data-file="components/ProductCard.js"></div>
            </button>
            <button className="btn btn-primary" onClick={onAdd} data-name="add" data-file="components/ProductCard.js">
              <div className="icon-shopping-bag text-lg" data-name="add-i" data-file="components/ProductCard.js"></div>
              {t(l, 'commonAddToCart')}
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