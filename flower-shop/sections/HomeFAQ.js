function HomeFAQ({ lang }) {
  try {
    const l = lang || getInitialLang();

    const items = [
      {
        q: l === 'en' ? 'Can you deliver anonymously?' : l === 'el' ? 'Γίνεται ανώνυμη παράδοση;' : 'Можно ли доставить анонимно?',
        a: l === 'en'
          ? 'Yes. In checkout notes you can request “no signature”. We never reveal sender details.'
          : l === 'el'
            ? 'Ναι. Στις σημειώσεις μπορείς να γράψεις “χωρίς υπογραφή”. Δεν αποκαλύπτουμε στοιχεία αποστολέα.'
            : 'Да. В оформлении заказа можно указать пожелание «без подписи». Мы не раскрываем данные отправителя.'
      },
      {
        q: l === 'en' ? 'What if some flowers are out of stock?' : l === 'el' ? 'Τι γίνεται αν λείπουν λουλούδια;' : 'Что если нужных цветов нет в наличии?',
        a: l === 'en'
          ? 'We will notify you in advance and suggest a similar replacement by season and tone.'
          : l === 'el'
            ? 'Θα σε ενημερώσουμε και θα προτείνουμε ισάξια αντικατάσταση ανά εποχή και απόχρωση.'
            : 'Мы заранее предупредим и предложим замену того же уровня по сезонности и оттенку, согласуем с вами.'
      },
      {
        q: l === 'en' ? 'Can I add a message on the card?' : l === 'el' ? 'Μπορώ να γράψω μήνυμα στην κάρτα;' : 'Можно ли добавить текст на открытку?',
        a: l === 'en'
          ? 'Yes. Enable “Greeting card with text” on the product page and add the message in checkout notes.'
          : l === 'el'
            ? 'Ναι. Ενεργοποίησε “Κάρτα με κείμενο” στη σελίδα προϊόντος και γράψε το κείμενο στις σημειώσεις.'
            : 'Да. На странице букета включите «Открытка с текстом», а текст укажите в «Пожеланиях» при оформлении.'
      },
      {
        q: l === 'en' ? 'How fast do you confirm orders?' : l === 'el' ? 'Πόσο γρήγορα επιβεβαιώνετε;' : 'Как быстро вы подтверждаете заказ?',
        a: l === 'en'
          ? 'Usually within 10 minutes during working hours. If ordered at night — we confirm in the morning.'
          : l === 'el'
            ? 'Συνήθως εντός 10 λεπτών σε ώρες λειτουργίας. Αν είναι νύχτα — το πρωί.'
            : 'Обычно в течение 10 минут в рабочее время. Если заказ ночью — подтвердим утром.'
      }
    ];

    const [openIdx, setOpenIdx] = React.useState(0);

    return (
      <section className="container-shell py-10" id="faq" data-name="home-faq" data-file="sections/HomeFAQ.js">
        <div className="card p-7" data-name="wrap" data-file="sections/HomeFAQ.js">
          <div className="flex items-start justify-between gap-4" data-name="head" data-file="sections/HomeFAQ.js">
            <div data-name="head-left" data-file="sections/HomeFAQ.js">
              <h2 className="text-2xl font-extrabold" data-name="title" data-file="sections/HomeFAQ.js">{t(l, 'homeFaqTitle')}</h2>
              <p className="text-sm text-[var(--muted-text-color)] mt-1" data-name="desc" data-file="sections/HomeFAQ.js">
                {t(l, 'homeFaqDesc')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center" data-name="head-icon" data-file="sections/HomeFAQ.js">
              <div className="icon-circle-help text-2xl text-white" data-name="head-icon-i" data-file="sections/HomeFAQ.js"></div>
            </div>
          </div>

          <div className="mt-6 space-y-2" data-name="list" data-file="sections/HomeFAQ.js">
            {items.map((it, idx) => {
              const open = idx === openIdx;
              return (
                <button
                  key={it.q}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                  onClick={() => setOpenIdx(open ? -1 : idx)}
                  data-name="item"
                  data-file="sections/HomeFAQ.js"
                >
                  <div className="flex items-start justify-between gap-3" data-name="qrow" data-file="sections/HomeFAQ.js">
                    <div className="font-extrabold" data-name="q" data-file="sections/HomeFAQ.js">{it.q}</div>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0" data-name="chev-wrap" data-file="sections/HomeFAQ.js">
                      <div className={`icon-chevron-down text-xl text-[var(--primary-color)] ${open ? 'rotate-180' : ''} transition`} data-name="chev" data-file="sections/HomeFAQ.js"></div>
                    </div>
                  </div>
                  {open ? (
                    <div className="text-sm text-[var(--muted-text-color)] mt-2 leading-relaxed" data-name="a" data-file="sections/HomeFAQ.js">{it.a}</div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HomeFAQ section error:', error);
    return null;
  }
}