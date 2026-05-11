function HomeReviews({ lang }) {
  try {
    const l = lang || getInitialLang();

    const reviews = [
      {
        name: 'Мария',
        date: '2026-03-18',
        text: 'Букет один в один как на фото. Упаковка очень аккуратная, курьер приехал ровно в слот. Спасибо!',
        rating: 5
      },
      {
        name: 'Илья',
        date: '2026-02-28',
        text: 'Помогли собрать букет под бюджет и предложили замену по сезонности. В итоге получилось даже лучше.',
        rating: 5
      },
      {
        name: 'Алина',
        date: '2026-01-22',
        text: 'Заказывала на 8 марта заранее. Всё подтвердили, привезли вовремя, цветы свежие — стояли почти 8 дней.',
        rating: 5
      }
    ];

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

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5" data-name="grid" data-file="sections/HomeReviews.js">
          {reviews.map((r) => (
            <div key={r.name} className="card p-5" data-name="review" data-file="sections/HomeReviews.js">
              <div className="flex items-start justify-between gap-3" data-name="top" data-file="sections/HomeReviews.js">
                <div data-name="left" data-file="sections/HomeReviews.js">
                  <div className="font-extrabold" data-name="name" data-file="sections/HomeReviews.js">{r.name}</div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="date" data-file="sections/HomeReviews.js">{formatDateRU(r.date)}</div>
                </div>
                <Stars count={r.rating} />
              </div>
              <p className="text-sm text-[var(--muted-text-color)] mt-3 leading-relaxed" data-name="text" data-file="sections/HomeReviews.js">{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('HomeReviews section error:', error);
    return null;
  }
}