function HomeReviews({ lang }) {
  try {
    const l = lang || getInitialLang();

    const [state, setState] = React.useState({ loading: true, warning: null, items: [] });

    React.useEffect(() => {
      let alive = true;

      const load = async () => {
        try {
          setState({ loading: true, warning: null, items: [] });
          const res = await fetchReviews(l);
          if (!alive) return;

          setState({
            loading: false,
            warning: res && res.warning ? res.warning : null,
            items: (res && Array.isArray(res.items) ? res.items : [])
          });
        } catch (error) {
          console.error('HomeReviews load error:', error);
          if (!alive) return;

          setState({
            loading: false,
            warning: l === 'en' ? 'Could not load reviews.' : l === 'el' ? 'Δεν φορτώθηκαν οι κριτικές.' : 'Не удалось загрузить отзывы.',
            items: getFallbackReviews(l)
          });
        }
      };

      load();
      return () => {
        alive = false;
      };
    }, [l]);

    const Stars = ({ count }) => {
      try {
        const n = clamp(Number(count || 0), 0, 5);
        return (
          <div className="flex items-center gap-1" data-name="stars" data-file="sections/HomeReviews.js">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className={`icon-star text-lg ${idx < n ? 'text-amber-500' : 'text-slate-300'}`}
                data-name="star"
                data-file="sections/HomeReviews.js"
              ></div>
            ))}
          </div>
        );
      } catch (error) {
        console.error('Stars error:', error);
        return null;
      }
    };

    const reviews = state.items || [];

    return (
      <section className="container-shell py-8" id="reviews" data-name="home-reviews" data-file="sections/HomeReviews.js">
        <div className="flex items-end justify-between gap-4" data-name="head" data-file="sections/HomeReviews.js">
          <div data-name="head-left" data-file="sections/HomeReviews.js">
            <h2 className="text-2xl font-extrabold" data-name="title" data-file="sections/HomeReviews.js">{t(l, 'homeReviewsTitle')}</h2>
            <p className="text-sm text-[var(--muted-text-color)] mt-1" data-name="desc" data-file="sections/HomeReviews.js">
              {t(l, 'homeReviewsDesc')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="rating" data-file="sections/HomeReviews.js">
            <div className="flex items-center gap-3" data-name="rating-row" data-file="sections/HomeReviews.js">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center" data-name="rating-iwrap" data-file="sections/HomeReviews.js">
                <div className="icon-star text-xl text-amber-500" data-name="rating-i" data-file="sections/HomeReviews.js"></div>
              </div>
              <div data-name="rating-text" data-file="sections/HomeReviews.js">
                <div className="font-extrabold" data-name="rating-val" data-file="sections/HomeReviews.js">4.9</div>
                <div className="text-xs text-[var(--muted-text-color)]" data-name="rating-sub" data-file="sections/HomeReviews.js">{t(l, 'homeRatingSub')}</div>
              </div>
            </div>
          </div>
        </div>

        {state.warning ? (
          <div className="mt-4" data-name="warning" data-file="sections/HomeReviews.js">
            <InlineNotice
              tone="warning"
              title={l === 'en' ? 'Reviews' : l === 'el' ? 'Κριτικές' : 'Отзывы'}
              message={state.warning}
              dataFile="sections/HomeReviews.js"
            />
          </div>
        ) : null}

        {state.loading ? (
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5" data-name="skeleton-grid" data-file="sections/HomeReviews.js">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="card p-5" data-name="skeleton" data-file="sections/HomeReviews.js">
                <div className="h-4 w-24 bg-slate-100 rounded" data-name="sk1" data-file="sections/HomeReviews.js"></div>
                <div className="h-3 w-16 bg-slate-100 rounded mt-3" data-name="sk2" data-file="sections/HomeReviews.js"></div>
                <div className="h-3 w-full bg-slate-100 rounded mt-4" data-name="sk3" data-file="sections/HomeReviews.js"></div>
                <div className="h-3 w-5/6 bg-slate-100 rounded mt-2" data-name="sk4" data-file="sections/HomeReviews.js"></div>
                <div className="h-3 w-2/3 bg-slate-100 rounded mt-2" data-name="sk5" data-file="sections/HomeReviews.js"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5" data-name="grid" data-file="sections/HomeReviews.js">
            {reviews.map((r) => (
              <div key={r.name + r.date} className="card p-5" data-name="review" data-file="sections/HomeReviews.js">
                <div className="flex items-start justify-between gap-3" data-name="top" data-file="sections/HomeReviews.js">
                  <div data-name="left" data-file="sections/HomeReviews.js">
                    <div className="font-extrabold" data-name="name" data-file="sections/HomeReviews.js">{r.name}</div>
                    <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="date" data-file="sections/HomeReviews.js">
                      {formatDateRU(r.date)}
                    </div>
                  </div>
                  <Stars count={r.rating} />
                </div>
                <p className="text-sm text-[var(--muted-text-color)] mt-3 leading-relaxed" data-name="text" data-file="sections/HomeReviews.js">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error('HomeReviews section error:', error);
    return null;
  }
}