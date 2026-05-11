// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="error-boundary" data-file="checkout-app.js">
          <div className="text-center" data-name="error-content" data-file="checkout-app.js">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-name="error-title" data-file="checkout-app.js">Что-то пошло не так</h1>
            <p className="text-gray-600 mb-4" data-name="error-desc" data-file="checkout-app.js">Пожалуйста, перезагрузите страницу и попробуйте снова.</p>
            <button onClick={() => window.location.reload()} className="btn btn-secondary" data-name="error-reload" data-file="checkout-app.js">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function CheckoutApp() {
  try {
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqvaayk';
    const STORE_PHONE = '+30 231 602 6404';
    const STORE_phone = '+30 697 173 7380';
    const PICKUP_ADDRESS = 'Leof. Andrea Papandreou 10, Neapoli 567 27';
    const CARD_IBANS = [
      'GR5001102240000022401224591',
      'LT563250040999122145'
    ];

    const [cartOpen, setCartOpen] = React.useState(false);
    const [toast, setToast] = React.useState({ open: false, title: '', message: '', type: 'info' });
    const [lang, setLang] = React.useState(() => getInitialLang());
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const { cart, updateQty, removeFromCart, clearCart, totals } = useCartState({ onToast: setToast, lang });

    React.useEffect(() => {
      try {
        const unsub = onLangChangeSubscribe((l) => setLang(l));
        return () => unsub();
      } catch (error) {
        console.error('Checkout lang subscribe error:', error);
      }
    }, []);

    const paymentOptions = [
      { key: 'cash-store', label: t(lang, 'payCashStore'), icon: 'icon-banknote' },
      { key: 'card-transfer', label: t(lang, 'payCardTransfer'), icon: 'icon-credit-card' }
    ];

    const getPickupLabel = (currentLang) => {
      if (currentLang === 'en') return 'Pickup';
      if (currentLang === 'el') return 'Pickup';
      return 'Самовывоз';
    };

    const [form, setForm] = React.useState({
      name: '',
      phone: '',
      city: lang === 'el' ? 'Θεσσαλονίκη' : 'Thessaloniki',
      address: PICKUP_ADDRESS,
      time: '',
      delivery: getPickupLabel(lang),
      paymentKey: 'cash-store',
      comment: ''
    });

    React.useEffect(() => {
      try {
        setForm((prev) => ({
          ...prev,
          city: prev.city || (lang === 'el' ? 'Θεσσαλονίκη' : 'Thessaloniki'),
          delivery: getPickupLabel(lang),
          address: PICKUP_ADDRESS
        }));
      } catch (error) {
        console.error('Checkout form lang sync error:', error);
      }
    }, [lang]);

    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [lastOrder, setLastOrder] = React.useState(null);

    const shipping = React.useMemo(() => {
      try {
        if (totals.subtotal <= 0) return 0;
        return 0;
      } catch (error) {
        console.error('Shipping calc error:', error);
        return 0;
      }
    }, [totals.subtotal]);

    const discount = 0;
    const total = Math.max(0, totals.subtotal + shipping);

    const errors = React.useMemo(() => {
      try {
        const e = {};
        if (totals.itemsCount <= 0) e.cart = t(lang, 'checkoutCartEmptyDesc');

        if (!form.name.trim()) {
          e.name = lang === 'en'
            ? 'Please enter your name.'
            : lang === 'el'
              ? 'Συμπλήρωσε όνομα.'
              : 'Укажите имя.';
        }

        if (!isValidPhoneGR(form.phone)) {
          e.phone = lang === 'en'
            ? 'Enter a Greek phone number in +30 format.'
            : lang === 'el'
              ? 'Βάλε ελληνικό τηλέφωνο σε μορφή +30 .'
              : 'Введите греческий телефон в формате +30 .';
        }

        if (!form.time) {
          e.time = lang === 'en'
            ? 'Select a time slot.'
            : lang === 'el'
              ? 'Διάλεξε ώρα.'
              : 'Выберите время.';
        }

        return e;
      } catch (error) {
        console.error('Checkout validation error:', error);
        return {
          cart: lang === 'en'
            ? 'Could not validate. Please try again.'
            : lang === 'el'
              ? 'Δεν ήταν δυνατός ο έλεγχος. Δοκίμασε ξανά.'
              : 'Не удалось проверить форму. Попробуйте ещё раз.'
        };
      }
    }, [form, totals.itemsCount, lang]);

    const canSubmit = Object.keys(errors).length === 0;

    const buildOrderItemsText = (items) => {
      return items.map((it, index) => {
        const sizeText = it.options?.size ? `Размер: ${it.options.size}` : 'Стандарт';

        return `${index + 1}. ${it.title}
Количество: ${it.qty}
${sizeText}
Фото: ${it.image || '-'}
Сумма позиции: ${formatMoney(it.lineTotal)}`;
      }).join('\n\n');
    };

    const buildOrderMessage = (order) => {
      const ibanBlock = order.form.paymentKey === 'card-transfer'
        ? `

IBAN для оплаты:
1) ${CARD_IBANS[0]}
2) ${CARD_IBANS[1]}`
        : '';

      return `
Новый заказ: ${order.orderId}

Дата: ${order.createdAt}

Данные клиента:
Имя: ${order.form.name}
Телефон: ${order.form.phone}
Город: ${order.form.city}
Способ получения: ${order.form.delivery}
Адрес самовывоза: ${PICKUP_ADDRESS}
Телефон магазина: ${STORE_PHONE}
Время: ${order.form.time}
Способ оплаты: ${order.form.payment}
Комментарий: ${order.form.comment || '-'}

Состав заказа:
${buildOrderItemsText(order.items)}

Итого по заказу:
Товары: ${formatMoney(order.pricing.subtotal)}
Доставка: Бесплатно
К оплате: ${formatMoney(order.pricing.total)}${ibanBlock}
      `.trim();
    };

    const onSubmit = async () => {
      try {
        if (!canSubmit || isSubmitting) {
          if (!canSubmit) {
            setToast({
              open: true,
              title: t(lang, 'toastCheck'),
              message: t(lang, 'toastCheckMsg'),
              type: 'danger'
            });
          }
          return;
        }

        setIsSubmitting(true);

        const orderId = generateOrderId();
        const now = new Date().toISOString();
        const payLabel = (paymentOptions.find((p) => p.key === form.paymentKey) || paymentOptions[0]).label;

        const order = {
          orderId,
          createdAt: now,
          items: cart.items,
          form: { ...form, payment: payLabel, delivery: getPickupLabel(lang), address: PICKUP_ADDRESS },
          pricing: { subtotal: totals.subtotal, shipping, discount, total }
        };

        const message = buildOrderMessage(order);

        console.log('ORDER_TO_SEND', order);
        console.log('MESSAGE_TO_SEND', message);
        console.log('FORMSPREE_ENDPOINT', FORMSPREE_ENDPOINT);

        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            customerName: order.form.name,
            phone: order.form.phone,
            city: order.form.city,
            delivery: order.form.delivery,
            address: PICKUP_ADDRESS,
            time: order.form.time,
            payment: order.form.payment,
            paymentKey: order.form.paymentKey,
            storePhone: STORE_PHONE,
            pickupAddress: PICKUP_ADDRESS,
            iban1: CARD_IBANS[0],
            iban2: CARD_IBANS[1],
            comment: order.form.comment || '-',
            message: message,
            _subject: `Новый заказ ${order.orderId} — Art Passaion`
          })
        });

        console.log('FORMSPREE_STATUS', response.status);

        const responseText = await response.text();
        console.log('FORMSPREE_RESPONSE_TEXT', responseText);

        if (!response.ok) {
          throw new Error(`Formspree error: ${response.status} ${responseText}`);
        }

        setLastOrder(order);
        setConfirmOpen(true);
        clearCart();

        setToast({
          open: true,
          title: lang === 'en' ? 'Order sent' : lang === 'el' ? 'Η παραγγελία στάλθηκε' : 'Заказ отправлен',
          message: lang === 'en'
            ? 'Your order has been successfully sent.'
            : lang === 'el'
              ? 'Η παραγγελία στάλθηκε με επιτυχία.'
              : 'Ваш заказ успешно отправлен.',
          type: 'success'
        });
      } catch (error) {
        console.error('Checkout submit error:', error);
        setToast({
          open: true,
          title: lang === 'en' ? 'Sending error' : lang === 'el' ? 'Σφάλμα αποστολής' : 'Ошибка отправки',
          message: lang === 'en'
            ? 'Could not send the order. Please try again.'
            : lang === 'el'
              ? 'Δεν ήταν δυνατή η αποστολή της παραγγελίας. Δοκίμασε ξανά.'
              : 'Не удалось отправить заказ. Попробуйте ещё раз.',
          type: 'danger'
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen" data-name="page-shell" data-page-shell="true" data-file="checkout-app.js">
        <Header variant="checkout" cartCount={totals.itemsCount} onCartClick={() => setCartOpen(true)} lang={lang} onLangChange={setLang} />

        <main className="container-shell py-8" data-name="main" data-file="checkout-app.js">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-name="layout" data-file="checkout-app.js">
            <section className="lg:col-span-2 space-y-6" data-name="left" data-file="checkout-app.js">
              <div className="card p-5" data-name="form-card" data-file="checkout-app.js">
                <div className="flex items-start justify-between gap-4" data-name="head" data-file="checkout-app.js">
                  <div data-name="head-left" data-file="checkout-app.js">
                    <h1 className="text-xl font-extrabold" data-name="title" data-file="checkout-app.js">{t(lang, 'checkoutTitle')}</h1>
                    <p className="text-sm text-[var(--muted-text-color)] mt-1" data-name="subtitle" data-file="checkout-app.js">{t(lang, 'checkoutSubtitle')}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-50" data-name="head-icon" data-file="checkout-app.js">
                    <div className="icon-receipt text-2xl text-[var(--primary-color)]" data-name="head-icon-i" data-file="checkout-app.js"></div>
                  </div>
                </div>

                {errors.cart ? (
                  <div className="mt-4 p-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-700" data-name="cart-error" data-file="checkout-app.js">
                    <div className="flex items-start gap-3" data-name="ce-row" data-file="checkout-app.js">
                      <div className="icon-triangle-alert text-xl" data-name="ce-i" data-file="checkout-app.js"></div>
                      <div data-name="ce-text" data-file="checkout-app.js">
                        <div className="font-extrabold" data-name="ce-title" data-file="checkout-app.js">{t(lang, 'checkoutCartEmptyTitle')}</div>
                        <div className="text-sm mt-1" data-name="ce-desc" data-file="checkout-app.js">{errors.cart}</div>
                        <button className="btn btn-secondary mt-3" onClick={() => (window.location.href = 'catalog.html')} data-name="ce-go" data-file="checkout-app.js">
                          {t(lang, 'checkoutGoCatalog')}
                          <div className="icon-arrow-right text-lg" data-name="ce-go-i" data-file="checkout-app.js"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4" data-name="grid" data-file="checkout-app.js">
                  <div data-name="name" data-file="checkout-app.js">
                    <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="checkout-app.js">{t(lang, 'checkoutName')}</label>
                    <input
                      className="input mt-2"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={lang === 'en' ? 'Anna' : lang === 'el' ? 'Άννα' : 'Анастасия'}
                      data-name="input"
                      data-file="checkout-app.js"
                    />
                    {errors.name ? <div className="text-xs text-rose-600 mt-2" data-name="err" data-file="checkout-app.js">{errors.name}</div> : null}
                  </div>

                  <div data-name="phone" data-file="checkout-app.js">
                    <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="checkout-app.js">{t(lang, 'checkoutPhone')}</label>
                    <input
                      className="input mt-2"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: formatPhoneGR(e.target.value) })}
                      placeholder="+30 2310 000 000"
                      inputMode="tel"
                      data-name="input"
                      data-file="checkout-app.js"
                    />
                    {errors.phone ? <div className="text-xs text-rose-600 mt-2" data-name="err" data-file="checkout-app.js">{errors.phone}</div> : null}
                  </div>

                  <div data-name="city" data-file="checkout-app.js">
                    <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="checkout-app.js">{t(lang, 'checkoutCity')}</label>
                    <select
                      className="input mt-2"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      data-name="select"
                      data-file="checkout-app.js"
                    >
                      {(lang === 'el'
                        ? ['Θεσσαλονίκη', 'Αθήνα', 'Καβάλα', 'Ιωάννινα']
                        : ['Thessaloniki', 'Athens', 'Kavala', 'Ioannina']
                      ).map((c) => (
                        <option key={c} value={c} data-name="option" data-file="checkout-app.js">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div data-name="delivery-info" data-file="checkout-app.js">
                    <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="checkout-app.js">
                      {lang === 'en'
                        ? 'Information'
                        : lang === 'el'
                          ? 'Πληροφορίες'
                          : 'Информация'}
                    </label>

                    <div
                      className="mt-2 p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
                      data-name="delivery-phone-box"
                      data-file="checkout-app.js"
                    >
                      <div className="font-semibold" data-name="delivery-phone-text" data-file="checkout-app.js">
                        {lang === 'en'
                          ? `For all questions, contact the store by phone: ${STORE_PHONE}`
                          : lang === 'el'
                            ? `Για όλες τις ερωτήσεις επικοινωνήστε με το κατάστημα: ${STORE_PHONE}`
                            : `По всем вопросам обращаться по телефону магазина: ${STORE_phone}`}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2" data-name="address" data-file="checkout-app.js">
                    <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="checkout-app.js">
                      {lang === 'en'
                        ? 'Pickup address'
                        : lang === 'el'
                          ? 'Διεύθυνση παραλαβής'
                          : 'Адрес самовывоза'}
                    </label>
                    <input
                      className="input mt-2"
                      value={PICKUP_ADDRESS}
                      disabled={true}
                      data-name="input"
                      data-file="checkout-app.js"
                    />
                    <div className="text-xs text-[var(--muted-text-color)] mt-2" data-name="pickup-hint" data-file="checkout-app.js">
                      {lang === 'en'
                        ? `Store pickup: ${PICKUP_ADDRESS}`
                        : lang === 'el'
                          ? `Παραλαβή από κατάστημα: ${PICKUP_ADDRESS}`
                          : `Самовывоз: ${PICKUP_ADDRESS}`}
                    </div>
                  </div>

                  <div data-name="time" data-file="checkout-app.js">
                    <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="checkout-app.js">{t(lang, 'checkoutTime')}</label>
                    <select
                      className="input mt-2"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      data-name="select"
                      data-file="checkout-app.js"
                    >
                      <option value="" data-name="option" data-file="checkout-app.js">
                        {lang === 'en' ? 'Select' : lang === 'el' ? 'Επιλογή' : 'Выберите'}
                      </option>
                      {getDeliverySlots().map((tSlot) => (
                        <option key={tSlot} value={tSlot} data-name="option" data-file="checkout-app.js">{tSlot}</option>
                      ))}
                    </select>
                    {errors.time ? <div className="text-xs text-rose-600 mt-2" data-name="err" data-file="checkout-app.js">{errors.time}</div> : null}
                  </div>

                  <div className="md:col-span-2" data-name="payment" data-file="checkout-app.js">
                    <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="checkout-app.js">{t(lang, 'checkoutPayment')}</label>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2" data-name="pay-grid" data-file="checkout-app.js">
                      {paymentOptions.map((p) => {
                        const active = form.paymentKey === p.key;
                        return (
                          <button
                            key={p.key}
                            type="button"
                            className={'btn ' + (active ? 'btn-primary' : 'btn-ghost')}
                            onClick={() => setForm({ ...form, paymentKey: p.key })}
                            data-name="pay"
                            data-file="checkout-app.js"
                          >
                            <div className={(active ? 'icon-circle-check text-lg' : (p.icon + ' text-lg'))} data-name="pay-i" data-file="checkout-app.js"></div>
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="md:col-span-2" data-name="comment" data-file="checkout-app.js">
                    <label className="text-sm font-semibold text-[var(--muted-text-color)]" data-name="label" data-file="checkout-app.js">{t(lang, 'checkoutComment')}</label>
                    <textarea
                      className="input mt-2 h-[110px] resize-none"
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      placeholder={lang === 'en' ? 'For example: leave a note…' : lang === 'el' ? 'Π.χ.: αφήστε σημείωση…' : 'Например: дополнительная информация...'}
                      data-name="textarea"
                      data-file="checkout-app.js"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3" data-name="actions" data-file="checkout-app.js">
                  <button className="btn btn-ghost" onClick={() => setCartOpen(true)} data-name="edit-cart" data-file="checkout-app.js">
                    <div className="icon-shopping-bag text-lg" data-name="edit-cart-i" data-file="checkout-app.js"></div>
                    {t(lang, 'checkoutEditCart')}
                  </button>

                  <button
                    className={'btn ' + (canSubmit && !isSubmitting ? 'btn-primary' : 'btn-ghost') + ' ml-auto'}
                    onClick={onSubmit}
                    disabled={!canSubmit || isSubmitting}
                    data-name="submit"
                    data-file="checkout-app.js"
                  >
                    <div className="icon-circle-check text-lg" data-name="submit-i" data-file="checkout-app.js"></div>
                    {isSubmitting
                      ? (lang === 'en' ? 'Sending...' : lang === 'el' ? 'Αποστολή...' : 'Отправка...')
                      : t(lang, 'checkoutSubmit')}
                  </button>
                </div>
              </div>

              <div className="card p-5" data-name="perk" data-file="checkout-app.js">
                <div className="flex items-start gap-3" data-name="perk-row" data-file="checkout-app.js">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center" data-name="perk-iwrap" data-file="checkout-app.js">
                    <div className="icon-sparkles text-2xl text-white" data-name="perk-i" data-file="checkout-app.js"></div>
                  </div>
                  <div data-name="perk-text" data-file="checkout-app.js">
                    <div className="font-extrabold" data-name="perk-title" data-file="checkout-app.js">
                      {lang === 'en' ? 'Careful assembly' : lang === 'el' ? 'Προσεγμένη ετοιμασία' : 'Аккуратная сборка'}
                    </div>
                    <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="perk-desc" data-file="checkout-app.js">
                      {lang === 'en'
                        ? 'A florist assembles your bouquet right before pickup.'
                        : lang === 'el'
                          ? 'Ο ανθοπώλης ετοιμάζει το μπουκέτο λίγο πριν την παραλαβή.'
                          : 'Флорист собирает букет непосредственно перед выдачей.'}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-6" data-name="right" data-file="checkout-app.js">
              <div className="card p-5" data-name="summary" data-file="checkout-app.js">
                <div className="flex items-start justify-between gap-4" data-name="sum-head" data-file="checkout-app.js">
                  <div data-name="sum-left" data-file="checkout-app.js">
                    <h2 className="text-lg font-extrabold" data-name="sum-title" data-file="checkout-app.js">{t(lang, 'checkoutYourOrder')}</h2>
                    <p className="text-sm text-[var(--muted-text-color)] mt-1" data-name="sum-sub" data-file="checkout-app.js">
                      {totals.itemsCount} {lang === 'en' ? 'items' : lang === 'el' ? 'είδη' : 'позиций'}
                    </p>
                  </div>
                  <button className="btn btn-ghost" onClick={() => (window.location.href = 'catalog.html')} data-name="sum-add" data-file="checkout-app.js">
                    <div className="icon-square-plus text-lg" data-name="sum-add-i" data-file="checkout-app.js"></div>
                    {t(lang, 'checkoutAddMore')}
                  </button>
                </div>

                <div className="mt-4 space-y-3" data-name="items" data-file="checkout-app.js">
                  {cart.items.map((it) => (
                    <div key={it.key} className="flex items-center gap-3" data-name="item" data-file="checkout-app.js">
                      <div className="w-14" data-name="img-wrap" data-file="checkout-app.js">
                        <div className="w-14 aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100" data-name="img-aspect" data-file="checkout-app.js">
                          <img src={it.image} alt={it.title} className="w-full h-full object-cover" data-name="img" data-file="checkout-app.js" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1" data-name="it-mid" data-file="checkout-app.js">
                        <div className="font-bold truncate" data-name="it-title" data-file="checkout-app.js">{it.title}</div>
                        <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="it-meta" data-file="checkout-app.js">
                          {it.options?.size
                            ? (lang === 'en' ? `Size ${it.options.size}` : lang === 'el' ? `Μέγεθος ${it.options.size}` : `Размер ${it.options.size}`)
                            : (lang === 'en' ? 'Standard' : lang === 'el' ? 'Στάνταρ' : 'Стандарт')}
                        </div>
                        <div className="mt-2 flex items-center gap-2" data-name="qty" data-file="checkout-app.js">
                          <button className="btn btn-ghost px-2 py-1" onClick={() => updateQty(it.key, -1)} data-name="dec" data-file="checkout-app.js">
                            <div className="icon-minus text-lg" data-name="dec-i" data-file="checkout-app.js"></div>
                          </button>
                          <div className="text-sm font-extrabold w-8 text-center" data-name="q" data-file="checkout-app.js">{it.qty}</div>
                          <button className="btn btn-ghost px-2 py-1" onClick={() => updateQty(it.key, 1)} data-name="inc" data-file="checkout-app.js">
                            <div className="icon-plus text-lg" data-name="inc-i" data-file="checkout-app.js"></div>
                          </button>
                          <button className="btn btn-ghost px-2 py-1 ml-auto" onClick={() => removeFromCart(it.key)} data-name="rm" data-file="checkout-app.js">
                            <div className="icon-trash text-lg" data-name="rm-i" data-file="checkout-app.js"></div>
                          </button>
                        </div>
                      </div>
                      <div className="text-sm font-extrabold" data-name="it-price" data-file="checkout-app.js">{formatMoney(it.lineTotal)}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 space-y-2" data-name="pricing" data-file="checkout-app.js">
                  <div className="flex items-center justify-between text-sm" data-name="p1" data-file="checkout-app.js">
                    <span className="text-[var(--muted-text-color)]" data-name="cap" data-file="checkout-app.js">{t(lang, 'checkoutSubtotal')}</span>
                    <span className="font-bold" data-name="val" data-file="checkout-app.js">{formatMoney(totals.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm" data-name="p2" data-file="checkout-app.js">
                    <span className="text-[var(--muted-text-color)]" data-name="cap" data-file="checkout-app.js">{t(lang, 'checkoutShipping')}</span>
                    <span className="font-bold" data-name="val" data-file="checkout-app.js">
                      {lang === 'en' ? 'Free' : lang === 'el' ? 'Δωρεάν' : 'Бесплатно'}
                    </span>
                  </div>
                  <div className="hidden" data-name="p3" data-file="checkout-app.js"></div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200" data-name="p4" data-file="checkout-app.js">
                    <span className="font-extrabold" data-name="cap" data-file="checkout-app.js">{t(lang, 'checkoutTotal')}</span>
                    <span className="text-xl font-extrabold" data-name="val" data-file="checkout-app.js">{formatMoney(total)}</span>
                  </div>
                  <div className="text-xs text-[var(--muted-text-color)]" data-name="hint" data-file="checkout-app.js">
                    {lang === 'en'
                      ? 'Pickup only.'
                      : lang === 'el'
                        ? 'Μόνο παραλαβή από κατάστημα.'
                        : 'Только самовывоз.'}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>

        <Footer lang={lang} />

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          totals={totals}
          onInc={(id) => updateQty(id, 1)}
          onDec={(id) => updateQty(id, -1)}
          onRemove={(id) => removeFromCart(id)}
          onClear={() => clearCart()}
          onCheckout={() => {}}
          lang={lang}
        />

        <Modal open={confirmOpen} title={t(lang, 'checkoutModalTitle')} onClose={() => setConfirmOpen(false)} dataFile="checkout-app.js">
          <div className="space-y-3" data-name="modal-body" data-file="checkout-app.js">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200" data-name="ok" data-file="checkout-app.js">
              <div className="flex items-start gap-3" data-name="ok-row" data-file="checkout-app.js">
                <div className="icon-circle-check text-xl text-emerald-700" data-name="ok-i" data-file="checkout-app.js"></div>
                <div data-name="ok-text" data-file="checkout-app.js">
                  <div className="font-extrabold" data-name="ok-title" data-file="checkout-app.js">{t(lang, 'checkoutThanksTitle')}</div>
                  <div className="text-sm text-emerald-800 mt-1" data-name="ok-desc" data-file="checkout-app.js">
                    {t(lang, 'checkoutThanksDesc')}
                  </div>
                </div>
              </div>
            </div>

            {lastOrder ? (
              <div className="p-4 rounded-2xl bg-white border border-slate-200" data-name="order" data-file="checkout-app.js">
                <div className="text-sm text-[var(--muted-text-color)]" data-name="order-cap" data-file="checkout-app.js">
                  {t(lang, 'checkoutOrderId')}
                </div>

                <div className="text-lg font-extrabold mt-1" data-name="order-id" data-file="checkout-app.js">
                  {lastOrder.orderId}
                </div>

                <div className="text-sm text-[var(--muted-text-color)] mt-2" data-name="order-when" data-file="checkout-app.js">
                  {lang === 'en'
                    ? `Pickup time: ${lastOrder.form.time}`
                    : lang === 'el'
                      ? `Ώρα παραλαβής: ${lastOrder.form.time}`
                      : `Время: ${lastOrder.form.time}`}
                </div>

                <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="order-total" data-file="checkout-app.js">
                  {t(lang, 'checkoutFinal', { sum: formatMoney(lastOrder.pricing.total) })}
                </div>

                {lastOrder.form.paymentKey === 'card-transfer' ? (
                  <div
                    className="mt-4 p-4 rounded-xl border border-rose-200 bg-rose-50"
                    data-name="iban-box"
                    data-file="checkout-app.js"
                  >
                    <div
                      className="text-sm font-semibold text-slate-800"
                      data-name="iban-title"
                      data-file="checkout-app.js"
                    >
                      {lang === 'en'
                        ? 'IBANs for payment:'
                        : lang === 'el'
                          ? 'IBAN για πληρωμή:'
                          : 'IBAN для оплаты:'}
                    </div>

                    <div
                      className="mt-2 text-base font-extrabold break-all text-[var(--primary-color)]"
                      data-name="iban-value-1"
                      data-file="checkout-app.js"
                    >
                      {CARD_IBANS[0]}
                    </div>

                    <div
                      className="mt-2 text-base font-extrabold break-all text-[var(--primary-color)]"
                      data-name="iban-value-2"
                      data-file="checkout-app.js"
                    >
                      {CARD_IBANS[1]}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex items-center justify-end gap-2" data-name="modal-actions" data-file="checkout-app.js">
              <button className="btn btn-ghost" onClick={() => { setConfirmOpen(false); window.location.href = 'catalog.html'; }} data-name="to-catalog" data-file="checkout-app.js">
                {t(lang, 'checkoutToCatalog')}
                <div className="icon-arrow-right text-lg" data-name="to-i" data-file="checkout-app.js"></div>
              </button>
              <button className="btn btn-primary" onClick={() => { setConfirmOpen(false); window.location.href = 'index.html'; }} data-name="to-home" data-file="checkout-app.js">
                {t(lang, 'checkoutToHome')}
                <div className="icon-house text-lg" data-name="tohome-i" data-file="checkout-app.js"></div>
              </button>
            </div>
          </div>
        </Modal>

        <Toast
          open={toast.open}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ open: false, title: '', message: '', type: 'info' })}
          lang={lang}
        />
      </div>
    );
  } catch (error) {
    console.error('CheckoutApp component error:', error);
    return null;
  }
}

function usePriceChart({ subtotal, shipping, discount }) {
  try {
    React.useEffect(() => {
      try {
        const canvas = document.getElementById('priceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (window.__priceChart) {
          window.__priceChart.destroy();
          window.__priceChart = null;
        }

        window.__priceChart = new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: ['Subtotal', 'Delivery'],
            datasets: [
              {
                data: [subtotal, shipping],
                backgroundColor: ['#0F172A', '#E11D48'],
                borderRadius: 8
              }
            ]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: 'rgba(15, 23, 42, 0.08)' } }
            }
          }
        });
      } catch (error) {
        console.error('Chart init error:', error);
      }
    }, [subtotal, shipping, discount]);
  } catch (error) {
    console.error('usePriceChart hook error:', error);
  }
}

function CheckoutChartController({ subtotal, shipping, discount }) {
  try {
    usePriceChart({ subtotal, shipping, discount });
    return null;
  } catch (error) {
    console.error('CheckoutChartController error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <CheckoutApp />
  </ErrorBoundary>
);
