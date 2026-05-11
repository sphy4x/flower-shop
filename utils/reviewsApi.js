function getFallbackReviews(lang) {
  try {
    const l = lang || getInitialLang();
    const ru = [
      { name: 'Мария', date: '2026-03-18', text: 'Букет один в один как на фото. Упаковка очень аккуратная, курьер приехал ровно в слот. Спасибо!', rating: 5 },
      { name: 'Илья', date: '2026-02-28', text: 'Помогли собрать букет под бюджет и предложили замену по сезонности. В итоге получилось даже лучше.', rating: 5 },
      { name: 'Алина', date: '2026-01-22', text: 'Заказывала заранее. Всё подтвердили, привезли вовремя, цветы свежие — стояли почти 8 дней.', rating: 5 }
    ];
    const en = [
      { name: 'Maria', date: '2026-03-18', text: 'The bouquet matched the photos. Neat wrapping and the courier arrived right on time.', rating: 5 },
      { name: 'Ilya', date: '2026-02-28', text: 'They suggested seasonal alternatives within my budget — the result was even better.', rating: 5 },
      { name: 'Alina', date: '2026-01-22', text: 'Ordered in advance. Confirmed quickly, delivered on time, flowers stayed fresh for a week.', rating: 5 }
    ];
    const el = [
      { name: 'Μαρία', date: '2026-03-18', text: 'Η ανθοδέσμη ήταν όπως στη φωτογραφία. Πολύ προσεγμένη συσκευασία και άψογη ώρα παράδοσης.', rating: 5 },
      { name: 'Ίλια', date: '2026-02-28', text: 'Πρότειναν εποχικές εναλλακτικές στο ίδιο ύφος και στον προϋπολογισμό μου. Τέλειο αποτέλεσμα.', rating: 5 },
      { name: 'Αλίνα', date: '2026-01-22', text: 'Παρήγγειλα νωρίς. Επιβεβαίωση γρήγορα, παράδοση στην ώρα της, τα λουλούδια κράτησαν πολλές μέρες.', rating: 5 }
    ];
    if (l === 'en') return en;
    if (l === 'el') return el;
    return ru;
  } catch (error) {
    console.error('getFallbackReviews error:', error);
    return [];
  }
}

async function fetchReviews(lang) {
  try {
    const l = lang || getInitialLang();

    const endpoint = window.__AP_REVIEWS_URL;

    if (!endpoint) {
      return { ok: true, items: getFallbackReviews(l), warning: l === 'en' ? 'Using built-in reviews.' : l === 'el' ? 'Χρησιμοποιούνται ενσωματωμένες κριτικές.' : 'Показаны встроенные отзывы.' };
    }

    try {
      const resp = await fetch(endpoint, { method: 'GET' });
      if (!resp.ok) {
        return { ok: false, items: getFallbackReviews(l), warning: l === 'en' ? 'Could not load reviews. Using built-in list.' : l === 'el' ? 'Δεν φορτώθηκαν οι κριτικές. Χρησιμοποιείται λίστα.' : 'Не удалось загрузить отзывы. Показан встроенный список.' };
      }

      const data = await resp.json();
      const items = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [];

      const normalized = items
        .filter(Boolean)
        .map((r) => ({
          name: String(r.name || ''),
          date: String(r.date || ''),
          text: String(r.text || ''),
          rating: clamp(Number(r.rating || 0), 0, 5)
        }))
        .filter((r) => r.name && r.text);

      if (normalized.length <= 0) {
        return { ok: false, items: getFallbackReviews(l), warning: l === 'en' ? 'No reviews returned. Showing built-in list.' : l === 'el' ? 'Δεν βρέθηκαν κριτικές. Εμφανίζεται λίστα.' : 'Отзывы не найдены. Показан встроенный список.' };
      }

      return { ok: true, items: normalized, warning: null };
    } catch (error) {
      const msg = l === 'en'
        ? 'Failed to load reviews. Please check your connection.'
        : l === 'el'
          ? 'Αποτυχία φόρτωσης κριτικών. Έλεγξε τη σύνδεση.'
          : 'Не удалось загрузить отзывы. Проверьте соединение.';
      return { ok: false, items: getFallbackReviews(l), warning: msg };
    }
  } catch (error) {
    console.error('fetchReviews wrapper error:', error);
    const l = lang || getInitialLang();
    return {
      ok: false,
      items: getFallbackReviews(l),
      warning: l === 'en' ? 'Could not load reviews.' : l === 'el' ? 'Δεν φορτώθηκαν οι κριτικές.' : 'Не удалось загрузить отзывы.'
    };
  }
}