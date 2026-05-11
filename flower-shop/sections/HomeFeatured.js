function HomeFeatured({ products, onAdd, lang }) {
  try {
    const l = lang || getInitialLang();

    return (
      <section className="container-shell py-8" id="featured" data-name="home-featured" data-file="sections/HomeFeatured.js">
        <div className="flex items-end justify-between gap-4" data-name="head" data-file="sections/HomeFeatured.js">
          <div data-name="head-left" data-file="sections/HomeFeatured.js">
            <h2 className="text-2xl font-extrabold" data-name="title" data-file="sections/HomeFeatured.js">{t(l, 'homeFeaturedTitle')}</h2>
            <p className="text-sm text-[var(--muted-text-color)] mt-1" data-name="desc" data-file="sections/HomeFeatured.js">{t(l, 'homeFeaturedDesc')}</p>
          </div>
          <button className="btn btn-ghost" onClick={() => (window.location.href = 'catalog.html')} data-name="all" data-file="sections/HomeFeatured.js">
            {t(l, 'homeToCatalog')}
            <div className="icon-arrow-right text-lg" data-name="all-i" data-file="sections/HomeFeatured.js"></div>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-name="grid" data-file="sections/HomeFeatured.js">
          {(products || []).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={() => (window.location.href = `product.html?id=${encodeURIComponent(p.id)}`)}
              onAdd={() => onAdd(p)}
              dataFile="sections/HomeFeatured.js"
              lang={l}
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('HomeFeatured section error:', error);
    return null;
  }
}