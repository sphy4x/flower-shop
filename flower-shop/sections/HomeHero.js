function HomeHero({ onPrimary, onSecondary, lang }) {
  try {
    const l = lang || getInitialLang();

    return (
      <section className="container-shell pt-10 pb-8" id="home" data-name="home-hero" data-file="sections/HomeHero.js">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" data-name="grid" data-file="sections/HomeHero.js">
          <div className="card p-7 relative overflow-hidden" data-name="left" data-file="sections/HomeHero.js">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-rose-200/40 blur-2xl" data-name="blob1" data-file="sections/HomeHero.js"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-slate-200/70 blur-2xl" data-name="blob2" data-file="sections/HomeHero.js"></div>

            <div className="relative" data-name="content" data-file="sections/HomeHero.js">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-extrabold" data-name="pill" data-file="sections/HomeHero.js">
                <div className="icon-sparkles text-sm" data-name="pill-i" data-file="sections/HomeHero.js"></div>
                {t(l, 'homePill')}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight" data-name="title" data-file="sections/HomeHero.js">
                {t(l, 'homeTitleBefore')} <span className="text-[var(--primary-color)]" data-name="accent" data-file="sections/HomeHero.js">{t(l, 'homeTitleAccent')}</span>
              </h1>
              <p className="text-[var(--muted-text-color)] mt-3 text-base leading-relaxed" data-name="subtitle" data-file="sections/HomeHero.js">
                {t(l, 'homeSubtitle')}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3" data-name="actions" data-file="sections/HomeHero.js">
                <button className="btn btn-primary" onClick={onPrimary} data-name="primary" data-file="sections/HomeHero.js">
                  {t(l, 'homePrimary')}
                  <div className="icon-arrow-right text-lg" data-name="primary-i" data-file="sections/HomeHero.js"></div>
                </button>
                <button className="btn btn-ghost" onClick={onSecondary} data-name="secondary" data-file="sections/HomeHero.js">
                  {t(l, 'homeSecondary')}
                  <div className="icon-shopping-bag text-lg" data-name="secondary-i" data-file="sections/HomeHero.js"></div>
                </button>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3" data-name="stats" data-file="sections/HomeHero.js">
                <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="s1" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="s1-row" data-file="sections/HomeHero.js">
                    <div className="icon-circle-check text-lg text-emerald-700" data-name="s1-i" data-file="sections/HomeHero.js"></div>
                    {t(l, 'homeStatFreshTitle')}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="s1-desc" data-file="sections/HomeHero.js">
                    {t(l, 'homeStatFreshDesc')}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="s2" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="s2-row" data-file="sections/HomeHero.js">
                    <div className="icon-truck text-lg text-slate-700" data-name="s2-i" data-file="sections/HomeHero.js"></div>
                    {t(l, 'homeStatSpeedTitle')}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="s2-desc" data-file="sections/HomeHero.js">
                    {t(l, 'homeStatSpeedDesc')}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="s3" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="s3-row" data-file="sections/HomeHero.js">
                    <div className="icon-heart text-lg text-rose-700" data-name="s3-i" data-file="sections/HomeHero.js"></div>
                    {t(l, 'homeStatAssistTitle')}
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="s3-desc" data-file="sections/HomeHero.js">
                    {t(l, 'homeStatAssistDesc')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden relative" data-name="right" data-file="sections/HomeHero.js">
            <div className="w-full aspect-[16/13] bg-slate-200" data-name="hero-aspect" data-file="sections/HomeHero.js">
              <img
                src="https://images.unsplash.com/photo-1526045431048-1d4a0e0f0b0a?auto=format&fit=crop&w=1400&q=80"
                alt="Art Passaion flowers"
                className="w-full h-full object-cover"
                data-name="hero-image"
                data-file="sections/HomeHero.js"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" data-name="overlay" data-file="sections/HomeHero.js"></div>

            <div className="absolute left-5 right-5 bottom-5" data-name="floating" data-file="sections/HomeHero.js">
              <div className="p-4 rounded-2xl bg-white/95 border border-white/40 shadow-soft" data-name="float-card" data-file="sections/HomeHero.js">
                <div className="flex items-start gap-3" data-name="float-row" data-file="sections/HomeHero.js">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary-color)] flex items-center justify-center" data-name="float-icon" data-file="sections/HomeHero.js">
                    <div className="icon-gift text-2xl text-white" data-name="float-icon-i" data-file="sections/HomeHero.js"></div>
                  </div>
                  <div className="min-w-0" data-name="float-text" data-file="sections/HomeHero.js">
                    <div className="font-extrabold" data-name="float-title" data-file="sections/HomeHero.js">{t(l, 'homeFloatTitle')}</div>
                    <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="float-desc" data-file="sections/HomeHero.js">
                      {t(l, 'homeFloatDesc')}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2" data-name="float-tags" data-file="sections/HomeHero.js">
                      <span className="badge bg-slate-900 text-white" data-name="t1" data-file="sections/HomeHero.js">
                        <div className="icon-sparkles text-sm" data-name="t1-i" data-file="sections/HomeHero.js"></div>
                        {t(l, 'homeFloatTagStyle')}
                      </span>
                      <span className="badge bg-rose-50 text-rose-700" data-name="t2" data-file="sections/HomeHero.js">
                        <div className="icon-truck text-sm" data-name="t2-i" data-file="sections/HomeHero.js"></div>
                        {t(l, 'homeFloatTagToday')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3" data-name="float-grid" data-file="sections/HomeHero.js">
                <div className="p-4 rounded-2xl bg-slate-900 text-white" data-name="float2" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="f2-row" data-file="sections/HomeHero.js">
                    <div className="icon-star text-lg text-white" data-name="f2-i" data-file="sections/HomeHero.js"></div>
                    4.9/5
                  </div>
                  <div className="text-xs text-white/75 mt-1" data-name="f2-desc" data-file="sections/HomeHero.js">{l === 'en' ? 'based on customer reviews' : l === 'el' ? 'βάσει κριτικών πελατών' : 'по отзывам клиентов'}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/95 border border-white/40" data-name="float3" data-file="sections/HomeHero.js">
                  <div className="flex items-center gap-2 text-sm font-extrabold" data-name="f3-row" data-file="sections/HomeHero.js">
                    <div className="icon-clock text-lg text-slate-800" data-name="f3-i" data-file="sections/HomeHero.js"></div>
                    25–60 {l === 'en' ? 'min' : l === 'el' ? 'λεπ' : 'мин'}
                  </div>
                  <div className="text-xs text-slate-600 mt-1" data-name="f3-desc" data-file="sections/HomeHero.js">{l === 'en' ? 'bouquet assembly' : l === 'el' ? 'ετοιμασία' : 'сборка букета'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HomeHero section error:', error);
    return null;
  }
}