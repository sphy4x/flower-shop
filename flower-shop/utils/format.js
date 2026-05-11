function formatRUB(value) {
  try {
    const n = Number(value || 0);
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);
  } catch (error) {
    console.error('formatRUB error:', error);
    return `${value} ₽`;
  }
}

function formatDateByLang(isoDate, lang) {
  try {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return isoDate;

    const locale = getLocaleForLang(lang || getInitialLang());
    return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
  } catch (error) {
    console.error('formatDateByLang error:', error);
    return isoDate || '';
  }
}

function formatDateRU(isoDate) {
  try {
    return formatDateByLang(isoDate, 'ru');
  } catch (error) {
    console.error('formatDateRU error:', error);
    return isoDate || '';
  }
}

function clamp(num, min, max) {
  try {
    return Math.max(min, Math.min(max, num));
  } catch (error) {
    console.error('clamp error:', error);
    return num;
  }
}

function getQueryParam(name) {
  try {
    const usp = new URLSearchParams(window.location.search);
    return usp.get(name);
  } catch (error) {
    console.error('getQueryParam error:', error);
    return null;
  }
}

function formatPhoneRU(input) {
  try {
    const digits = String(input || '').replace(/[^\d]/g, '');
    if (!digits) return '';
    let d = digits;
    if (d[0] === '8') d = '7' + d.slice(1);
    if (d[0] !== '7') d = '7' + d;

    const p1 = d.slice(1, 4);
    const p2 = d.slice(4, 7);
    const p3 = d.slice(7, 9);
    const p4 = d.slice(9, 11);

    let out = '+7';
    if (p1) out += ` (${p1}`;
    if (p1 && p1.length === 3) out += ')';
    if (p2) out += ` ${p2}`;
    if (p3) out += `-${p3}`;
    if (p4) out += `-${p4}`;
    return out;
  } catch (error) {
    console.error('formatPhoneRU error:', error);
    return input || '';
  }
}

function isValidPhoneRU(phone) {
  try {
    const digits = String(phone || '').replace(/[^\d]/g, '');
    return digits.length === 11 && digits[0] === '7';
  } catch (error) {
    console.error('isValidPhoneRU error:', error);
    return false;
  }
}

function getTodayISO() {
  try {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  } catch (error) {
    console.error('getTodayISO error:', error);
    return '';
  }
}

function generateOrderId() {
  try {
    const n = Math.floor(100000 + Math.random() * 900000);
    return `AP-${n}`;
  } catch (error) {
    console.error('generateOrderId error:', error);
    return 'AP-000000';
  }
}

function getDeliverySlots() {
  try {
    return ['10:00–12:00', '12:00–14:00', '14:00–16:00', '16:00–18:00', '18:00–20:00', '20:00–22:00'];
  } catch (error) {
    console.error('getDeliverySlots error:', error);
    return [];
  }
}

function renderAddonsShort(addons) {
  try {
    if (!addons) return '';
    const parts = [];
    if (addons.card) parts.push('card');
    if (addons.choco) parts.push('choco');
    if (addons.vase) parts.push('vase');
    if (parts.length === 0) return '';
    return ` • ${parts.join(', ')}`;
  } catch (error) {
    console.error('renderAddonsShort error:', error);
    return '';
  }
}

function getSizedPrice(base, size) {
  try {
    if (size === 'S') return Math.round(base * 0.82);
    if (size === 'L') return Math.round(base * 1.25);
    return base;
  } catch (error) {
    console.error('getSizedPrice error:', error);
    return base;
  }
}

function getAddonsPrice(addons) {
  try {
    if (!addons) return 0;
    let n = 0;
    if (addons.card) n += 190;
    if (addons.choco) n += 290;
    if (addons.vase) n += 890;
    return n;
  } catch (error) {
    console.error('getAddonsPrice error:', error);
    return 0;
  }
}