function getCurrencyMode() {
  try {
    // Demo: фиксируем EUR для всего сайта по запросу пользователя
    return 'EUR';
  } catch (error) {
    console.error('getCurrencyMode error:', error);
    return 'EUR';
  }
}

function convertRUBtoEUR(rub) {
  try {
    // Demo-rate (static): 1 EUR ≈ 100 RUB
    const rate = 100;
    const n = Number(rub || 0);
    return n / rate;
  } catch (error) {
    console.error('convertRUBtoEUR error:', error);
    return 0;
  }
}

function formatEUR(value) {
  try {
    const n = Number(value || 0);
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  } catch (error) {
    console.error('formatEUR error:', error);
    return `€${value}`;
  }
}

function formatMoney(value) {
  try {
    const mode = getCurrencyMode();

    // Prices in the catalog are already stored as "RUB-like units" where 100 == 1 EUR (see makeEurPriceToRub).
    // Therefore we should NOT divide by 100 again when displaying in EUR.
    if (mode === 'EUR') return formatEUR(Number(value || 0) / 100);

    return formatRUB(value);
  } catch (error) {
    console.error('formatMoney error:', error);
    return formatRUB(value);
  }
}