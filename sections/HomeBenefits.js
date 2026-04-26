function HomeBenefits({ lang }) {
  try {
    const l = lang || getInitialLang();

    const perks = [
      {
        title: l === 'en' ? 'Assembled before dispatch' : l === 'el' ? 'Ετοιμάζεται πριν την παράδοση' : 'Собираем перед выездом',
        desc: l === 'en' ? 'Bouquets are not kept “ready-made” — we assemble them for your order.' : l === 'el' ? 'Δεν μένει “έτοιμο” — ετοιμάζεται για την παραγγελία σου.' : 'Цветы не стоят «готовыми» — букет собирается под ваш заказ.',
        icon: 'icon-circle-check',
        toneBg: 'bg-emerald-50',
        toneIcon: 'text-emerald-700'
      },
      {
        title: l === 'en' ? 'Time-slot delivery' : l === 'el' ? 'Παράδοση σε χρονικά παράθυρα' : 'Доставка по слотам',
        desc: l === 'en' ? 'You choose the time — we align the logistics.' : l === 'el' ? 'Διαλέγεις ώρα — εμείς οργανώνουμε τη διαδρομή.' : 'Вы выбираете время, а мы подстраиваем логистику.',
        icon: 'icon-clock',
        toneBg: 'bg-slate-900',
        toneIcon: 'text-white'
      },
      {
        title: l === 'en' ? 'Card & wrapping included' : l === 'el' ? 'Κάρτα & συσκευασία' : 'Открытка и упаковка',
        desc: l === 'en' ? 'Gift presentation is included for most bouquets.' : l === 'el' ? 'Η παρουσίαση δώρου περιλαμβάνεται στα περισσότερα μπουκέτα.' : 'Подарочная подача входит в стоимость большинства букетов.',
        icon: 'icon-gift',
        toneBg: 'bg-rose-50',
        toneIcon: 'text-[var(--primary-color)]'
      },
      {
        title: l === 'en' ? 'Florist help' : l === 'el' ? 'Βοήθεια ανθοπώλη' : 'Помощь флориста',
        desc: l === 'en' ? 'We suggest options for your budget and seasonality.' : l === 'el' ? 'Προτείνουμε επιλογές ανάλογα με προϋπολογισμό και εποχή.' : 'Подберём по бюджету и сезонности, предложим альтернативы.',
        icon: 'icon-message-square-text',
        toneBg: 'bg-slate-100',
        toneIcon: 'text-slate-800'
      }
    ];

    return (
      <section className="container-shell py-8" id="delivery" data-name="home-benefits" data-file="sections/HomeBenefits.js">
        <div className="card p-7" data-name="wrap" data-file="sections/HomeBenefits.js">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4" data-name="head" data-file="sections/HomeBenefits.js">
            <div data-name="head-left" data-file="sections/HomeBenefits.js">
              <h2 className="text-2xl font-extrabold" data-name="title" data-file="sections/HomeBenefits.js">{t(l, 'homeBenefitsTitle')}</h2>
              <p className="text-sm text-[var(--muted-text-color)] mt-1" data-name="desc" data-file="sections/HomeBenefits.js">
                {t(l, 'homeBenefitsDesc')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2" data-name="chips" data-file="sections/HomeBenefits.js">
              <span className="badge bg-slate-900 text-white" data-name="chip1" data-file="sections/HomeBenefits.js">
                <div className="icon-truck text-sm" data-name="c1-i" data-file="sections/HomeBenefits.js"></div>
                {t(l, 'homeChipFrom')}
              </span>
              <span className="badge bg-emerald-50 text-emerald-700" data-name="chip2" data-file="sections/HomeBenefits.js">
                <div className="icon-circle-check text-sm" data-name="c2-i" data-file="sections/HomeBenefits.js"></div>
                {t(l, 'homeChipFree')}
              </span>
              <span className="badge bg-rose-50 text-rose-700" data-name="chip3" data-file="sections/HomeBenefits.js">
                <div className="icon-tag text-sm" data-name="c3-i" data-file="sections/HomeBenefits.js"></div>
                {t(l, 'homeChipDiscount')}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-name="perks" data-file="sections/HomeBenefits.js">
            {perks.map((p) => (
              <div key={p.title} className="p-4 rounded-2xl border border-slate-200 bg-white" data-name="perk" data-file="sections/HomeBenefits.js">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${p.toneBg}`} data-name="perk-icon" data-file="sections/HomeBenefits.js">
                  <div className={`${p.icon} text-2xl ${p.toneIcon}`} data-name="perk-icon-i" data-file="sections/HomeBenefits.js"></div>
                </div>
                <div className="font-extrabold mt-3" data-name="perk-title" data-file="sections/HomeBenefits.js">{p.title}</div>
                <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="perk-desc" data-file="sections/HomeBenefits.js">{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4" data-name="rules" data-file="sections/HomeBenefits.js">
            <div className="p-5 rounded-2xl bg-slate-900 text-white" data-name="rule1" data-file="sections/HomeBenefits.js">
              <div className="flex items-start gap-3" data-name="r-row" data-file="sections/HomeBenefits.js">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center" data-name="r-iwrap" data-file="sections/HomeBenefits.js">
                  <div className="icon-truck text-2xl text-white" data-name="r-i" data-file="sections/HomeBenefits.js"></div>
                </div>
                <div data-name="r-text" data-file="sections/HomeBenefits.js">
                  <div className="font-extrabold" data-name="r-title" data-file="sections/HomeBenefits.js">{t(l, 'homeRule1Title')}</div>
                  <div className="text-sm text-white/80 mt-1" data-name="r-desc" data-file="sections/HomeBenefits.js">
                    {t(l, 'homeRule1Desc')}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200" data-name="rule2" data-file="sections/HomeBenefits.js">
              <div className="flex items-start gap-3" data-name="r2-row" data-file="sections/HomeBenefits.js">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center" data-name="r2-iwrap" data-file="sections/HomeBenefits.js">
                  <div className="icon-clock text-2xl text-[var(--primary-color)]" data-name="r2-i" data-file="sections/HomeBenefits.js"></div>
                </div>
                <div data-name="r2-text" data-file="sections/HomeBenefits.js">
                  <div className="font-extrabold" data-name="r2-title" data-file="sections/HomeBenefits.js">{t(l, 'homeRule2Title')}</div>
                  <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="r2-desc" data-file="sections/HomeBenefits.js">
                    {t(l, 'homeRule2Desc')}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200" data-name="rule3" data-file="sections/HomeBenefits.js">
              <div className="flex items-start gap-3" data-name="r3-row" data-file="sections/HomeBenefits.js">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center" data-name="r3-iwrap" data-file="sections/HomeBenefits.js">
                  <div className="icon-circle-check text-2xl text-emerald-700" data-name="r3-i" data-file="sections/HomeBenefits.js"></div>
                </div>
                <div data-name="r3-text" data-file="sections/HomeBenefits.js">
                  <div className="font-extrabold" data-name="r3-title" data-file="sections/HomeBenefits.js">{t(l, 'homeRule3Title')}</div>
                  <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="r3-desc" data-file="sections/HomeBenefits.js">
                    {t(l, 'homeRule3Desc')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HomeBenefits section error:', error);
    return null;
  }
}