function slugifyId(name) {
  try {
    return String(name || '')
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[^\p{L}\p{N}-]+/gu, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  } catch (error) {
    console.error('slugifyId error:', error);
    return 'item';
  }
}

function makeUniqueId(baseId, used, idx) {
  try {
    const base = baseId || 'item';
    if (!used.has(base)) {
      used.add(base);
      return base;
    }
    const next = `${base}-${String(idx + 1).padStart(2, '0')}`;
    if (!used.has(next)) {
      used.add(next);
      return next;
    }
    let n = 2;
    while (used.has(`${next}-${n}`)) n += 1;
    const finalId = `${next}-${n}`;
    used.add(finalId);
    return finalId;
  } catch (error) {
    console.error('makeUniqueId error:', error);
    const fallback = `item-${idx + 1}`;
    if (used && used.add) used.add(fallback);
    return fallback;
  }
}

function makeEurPriceToRub(eur) {
  try {
    const n = Number(eur || 0);
    return Math.round(n * 100);
  } catch (error) {
    console.error('makeEurPriceToRub error:', error);
    return 3900;
  }
}

function pickCategoryFromName(name) {
  try {
    const n = String(name || '').toLowerCase();
    if (n.includes('orchid') || n.includes('орхиде')) return 'Орхидеи';
    if (n.includes('bonsai') || n.includes('бонс')) return 'Бонсай';
    if (n.includes('teddy') || n.includes('bear') || n.includes('миш')) return 'Подарки';
    if (n.includes('rose') || n.includes('роза')) return 'Розы';
    if (n.includes('lily') || n.includes('лили')) return 'Растения';
    if (n.includes('anthurium') || n.includes('антури')) return 'Растения';
    if (n.includes('dracaena') || n.includes('драц')) return 'Растения';
    if (n.includes('plant') || n.includes('растен')) return 'Растения';
    if (n.includes('gift') || n.includes('box') || n.includes('набор') || n.includes('basket') || n.includes('корзин')) return 'Подарочные наборы';
    if (n.includes('vitrine') || n.includes('витрин') || n.includes('showcase')) return 'Витрина';
    if (n.includes('свадьб')) return 'Свадьба';
    return 'Композиции';
  } catch (error) {
    console.error('pickCategoryFromName error:', error);
    return 'Композиции';
  }
}

function makeShortDescRU(name, category) {
  try {
    const n = String(name || '');
    if (category === 'Растения') return `Комнатное растение «${n}» — аккуратный зелёный акцент для дома или офиса.`;
    if (category === 'Орхидеи') return `Орхидея «${n}» — изящный и очень эффектный подарок.`;
    if (category === 'Бонсай') return `Бонсай «${n}» — спокойный, стильный подарок с характером.`;
    if (category === 'Подарочные наборы') return `Подарочный набор «${n}» — готовое решение для важного повода.`;
    if (category === 'Розы') return `Букет «${n}» — классика, которая всегда вызывает эмоции.`;
    if (category === 'Свадьба') return `Свадебные букеты и оформление под ваш стиль и бюджет. Цена — по договорённости.`;
    return `Композиция «${n}» — современная подача и красивый акцент для события.`;
  } catch (error) {
    console.error('makeShortDescRU error:', error);
    return String(name || '');
  }
}

function makeShortDescEN(name, category) {
  try {
    const n = String(name || '');
    if (category === 'Растения') return `House plant “${n}” — a calm green accent for home or office.`;
    if (category === 'Орхидеи') return `Orchid “${n}” — an elegant and impressive gift.`;
    if (category === 'Бонсай') return `Bonsai “${n}” — a mindful, stylish gift with character.`;
    if (category === 'Подарочные наборы') return `Gift set “${n}” — an easy ready-to-give choice.`;
    if (category === 'Розы') return `Bouquet “${n}” — a classic that always feels special.`;
    if (category === 'Свадьба') return `Wedding bouquets and floral decor tailored to your style and budget. Price on request.`;
    return `Arrangement “${n}” — modern styling for a memorable moment.`;
  } catch (error) {
    console.error('makeShortDescEN error:', error);
    return String(name || '');
  }
}

function makeShortDescEL(name, category) {
  try {
    const n = String(name || '');
    if (category === 'Растения') return `Φυτό εσωτερικού χώρου “${n}” — μια ήρεμη πράσινη πινελιά για σπίτι ή γραφείο.`;
    if (category === 'Орхидеи') return `Ορχιδέα “${n}” — κομψό και εντυπωσιακό δώρο.`;
    if (category === 'Бонсай') return `Μπονσάι “${n}” — ήρεμο, στιλάτο δώρο με χαρακτήρα.`;
    if (category === 'Подарочные наборы') return `Σετ δώρου “${n}” — έτοιμη επιλογή για κάθε περίσταση.`;
    if (category === 'Розы') return `Ανθοδέσμη “${n}” — κλασική επιλογή που πάντα συγκινεί.`;
    if (category === 'Свадьба') return `Γαμήλιες ανθοδέσμες και στολισμός στα μέτρα σας. Τιμή κατόπιν συνεννόησης.`;
    return `Σύνθεση “${n}” — μοντέρνα αισθητική για ξεχωριστές στιγμές.`;
  } catch (error) {
    console.error('makeShortDescEL error:', error);
    return String(name || '');
  }
}

function pickCategoryLabel(categoryRU, lang) {
  try {
    if (lang === 'en') {
      const map = {
        'Орхидеи': 'Orchids',
        'Бонсай': 'Bonsai',
        'Подарки': 'Gifts',
        'Розы': 'Roses',
        'Растения': 'Plants',
        'Подарочные наборы': 'Gift sets',
        'Композиции': 'Arrangements',
        'Витрина': 'Showcase',
        'Свадьба': 'Wedding'
      };
      return map[categoryRU] || categoryRU;
    }
    if (lang === 'el') {
      const map = {
        'Орхидеи': 'Ορχιδέες',
        'Бонсай': 'Μπονσάι',
        'Подарки': 'Δώρα',
        'Розы': 'Τριαντάφυλλα',
        'Растения': 'Φυτά',
        'Подарочные наборы': 'Σετ δώρου',
        'Композиции': 'Συνθέσεις',
        'Витрина': 'Βιτρίνα',
        'Свадьба': 'Γάμος'
      };
      return map[categoryRU] || categoryRU;
    }
    return categoryRU;
  } catch (error) {
    console.error('pickCategoryLabel error:', error);
    return categoryRU;
  }
}

function getTextByLang(texts, lang) {
  try {
    if (!texts) return '';
    if (lang === 'en') return texts.en || texts.ru || '';
    if (lang === 'el') return texts.el || texts.ru || '';
    return texts.ru || '';
  } catch (error) {
    console.error('getTextByLang error:', error);
    return '';
  }
}

function makeProductTexts(title, categoryRU) {
  try {
    const name = String(title || '');
    return {
      title: { ru: name, en: name, el: name },
      short: {
        ru: makeShortDescRU(name, categoryRU),
        en: makeShortDescEN(name, categoryRU),
        el: makeShortDescEL(name, categoryRU)
      }
    };
  } catch (error) {
    console.error('makeProductTexts error:', error);
    return { title: { ru: String(title || '') }, short: { ru: String(title || '') } };
  }
}

function normalizeOccasionsByLang(list, lang) {
  try {
    const base = Array.isArray(list) ? list : [];
    if (lang === 'en') {
      const map = {
        'Спасибо': 'Thank you',
        'Без повода': 'Just because',
        'Поздравление': 'Congratulations',
        'Свадьба': 'Wedding'
      };
      return base.map((x) => map[x] || x);
    }
    if (lang === 'el') {
      const map = {
        'Спасибо': 'Ευχαριστώ',
        'Без повода': 'Χωρίς αφορμή',
        'Поздравление': 'Συγχαρητήρια',
        'Свадьба': 'Γάμος'
      };
      return base.map((x) => map[x] || x);
    }
    return base;
  } catch (error) {
    console.error('normalizeOccasionsByLang error:', error);
    return Array.isArray(list) ? list : [];
  }
}

function getAllProductsBase() {
  try {
    // Витрины удалены по запросу пользователя: «Витрина», «Витрина 2», «Витрина 3».
    // Peace Lily Plant удалён по запросу пользователя.
    const assets = [
      { title: 'White Orchid Elegance', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/1283a56e-cf30-4c78-aff2-1ce25e09771d.png', eur: 30 },
      { title: 'Peace Lily Green', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/3e83913f-70a0-4819-b52c-754d0217700c., 16_54_58', eur: 25 },
      { title: 'Dracaena Marginata', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/c01826bd-687d-4dd2-839f-19686bda777f., 16_55_04', eur: 40 },
      { title: 'Sunflower & Red Rose Bouquet', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/c496cf94-db27-43d0-8f1f-ac1dea0490d4., 16_55_07', eur: 35 },
      { title: 'Pink Lily & Red Rose Bouquet', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/57ad43e0-6354-4efc-b60a-a01d938f6c07., 16_55_13', eur: 30 },
      { title: 'Ginseng Bonsai', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/d02527ff-9fbb-4d29-b340-4e804bd465a8., 16_55_16', eur: 50 },
      { title: 'Zen Mini Bonsai', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/a83cd48e-3429-4f9b-832e-72c5eb0bcf90., 16_55_20', eur: 27 },
      { title: 'Red Rose Mini Decor', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/15369722-ca70-4e28-8813-86ce822e4d8f., 16_55_23', eur: 25 },
      { title: 'Classic Rose Under Glass', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/977f0e5d-ea94-474d-99ec-3b0a4649f3a1., 16_55_26', eur: 69 },
      { title: 'Red Rose Bell Jar', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/42745c62-d1fc-44f1-a757-9dc3da3eb500., 16_55_29', eur: 40 },
      { title: 'Romantic Teddy & Rose Gift Set', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/855a5579-7577-44f0-84b9-5e49a0f5a746., 16_55_32', eur: 72 },
      { title: 'Love Letter Gift Box', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/58412897-ac9d-45cd-bd6f-a9b22261fcaa.png', eur: 25 },
      { title: 'Red Vase Rose Arrangement', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/9bb89415-ca9a-4679-8251-5f45beca2e1f.png', eur: 67 },
      { title: 'ZZ Plant in Glass Pot', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/10e4b2a1-600c-41b3-a197-0e094259b296., 16_55_53', eur: 40 },
      { title: 'Red Anthurium', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/b2edd18f-cc81-4425-9366-9449fa113315., 16_55_55', eur: 30 },
      { title: 'Pink Orchid in Glass Pot', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/922527a4-b327-4a6d-812a-46ab07975437., 16_55_58', eur: 40 },
      { title: 'Luxury Rose Dome Set', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/29b9f003-5b37-49a0-8423-8ccf629bc5ca., 16_56_01', eur: 79 },
      { title: 'Teddy Bear Family Set', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/590f859c-7f75-4f01-a04a-72823e45c5a5.png', eur: 10, eurLarge: 45 },
      { title: 'Red Roses Bouquet', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/c95c06af-e7f5-49b5-993d-a3367480ce7b.png', eur: 69 },
      { title: 'Romantic Five Roses', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/5ff33b38-b628-431f-abe3-090e10af7537.png', eur: 25 },
      { title: 'Pastel Roses Bouquet', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/4ac07867-78c7-4253-857f-8d85d2c1615f.png', eur: 30 },
      { title: 'Pink Lily & Gerbera Bouquet', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/ae8da8fe-8cd4-4238-9366-8b2807d564f1.png', eur: 27 },
      { title: 'Sky Rose Dome', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/e7abf36b-53d3-4284-b8aa-ff931ca1e011.png', eur: 71 },
      { title: 'Romantic Rose Dome Collection', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/a2e32d08-8af2-476f-9baf-bf0d5126c645.png', eur: 82 },
      { title: 'Pink Orchid Elegance', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/3e5a20a1-e2bc-43db-b471-0f7e1ed84733.png', eur: 40 },
      { title: 'Anthurium', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/03d2fe24-0f86-4bf0-bc3b-832d2c865046.png', eur: 20 },
      { title: 'Zamioculcas zamiifolia', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/76f5d989-9f8b-4b93-b9ec-656e472a873b.png', eur: 50 },
      { title: 'Dracaena marginata', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/42faf25f-20ff-4735-a347-cff75c61daba.png', eur: 50 },
      { title: 'Baby gift basket', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/92ef7a37-fd0f-4e8d-8b14-c6df2286de47.png', eur: 76 },
      { title: 'Baby girl gift set', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/78e615f4-7d61-40c9-b1c5-851aca50debb.png', eur: 74 },
      { title: 'Rose Teddy Bear', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/76774b8e-d478-4237-8d1b-f931299997f1.png', eur: 88 },
      { title: 'Teddy Bear with Heart', image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/382173f0-99ba-4a24-b77f-dc7184d94b2f.png', eur: 40 },

      {
        title: 'Свадьба',
        image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/45f7cf57-00c7-4c21-bdb8-0f6de74b180a.png',
        eur: 0,
        externalUrl: 'https://www.facebook.com/artpassionneapoliskg/',
        specialPriceLabel: 'Договорная'
      }
    ];

    const baseOccasions = ['Спасибо', 'Без повода', 'Поздравление', 'Свадьба'];
    const usedIds = new Set();

    return assets.map((a, idx) => {
      const baseId = slugifyId(a.title) || `item`;
      const id = makeUniqueId(baseId, usedIds, idx);
      const categoryRU = pickCategoryFromName(a.title);
      const texts = makeProductTexts(a.title, categoryRU);

      const popularity = 70 + ((idx * 7) % 28);
      const isNew = idx % 3 === 0;
      const createdAt = 20260506 - idx;

      const lowerTitle = String(a.title || '').toLowerCase();
      const isTeddy =
        lowerTitle.includes('teddy') ||
        lowerTitle.includes('bear') ||
        lowerTitle.includes('миш') ||
        lowerTitle.includes('family set');

      const hasFamilyLarge = typeof a.eurLarge === 'number' && Number.isFinite(a.eurLarge);
      const priceRub = makeEurPriceToRub(a.eur);

      const isSpecialNegotiated = Boolean(a && a.specialPriceLabel);

      const flags = { isTeddy, hasSizes: Boolean(hasFamilyLarge) };
      if (hasFamilyLarge) flags.hasLargeSize = true;
      if (a.externalUrl) flags.externalUrl = String(a.externalUrl);
      if (isSpecialNegotiated) flags.negotiatedPrice = true;

      return {
        id,
        title: texts.title.ru,
        short: texts.short.ru,
        i18n: { title: texts.title, short: texts.short },

        price: priceRub,
        priceLarge: hasFamilyLarge ? makeEurPriceToRub(a.eurLarge) : undefined,

        category: categoryRU,
        occasions: baseOccasions,

        flags,

        externalUrl: a.externalUrl ? String(a.externalUrl) : undefined,
        specialPriceLabel: isSpecialNegotiated ? String(a.specialPriceLabel) : undefined,

        tags: [categoryRU.toLowerCase()],
        image: a.image,
        flowers: [categoryRU],
        prepMinutes: 20 + (idx % 5) * 5,
        popularity,
        isNew,
        createdAt
      };
    });
  } catch (error) {
    console.error('getAllProductsBase error:', error);
    return [];
  }
}

function applyProductLang(product, lang) {
  try {
    if (!product) return product;
    const l = lang || getInitialLang();
    const title = product.i18n ? getTextByLang(product.i18n.title, l) : product.title;
    const short = product.i18n ? getTextByLang(product.i18n.short, l) : product.short;

    return {
      ...product,
      title,
      short,
      categoryLabel: pickCategoryLabel(product.category, l),
      occasionsLabel: normalizeOccasionsByLang(product.occasions || [], l)
    };
  } catch (error) {
    console.error('applyProductLang error:', error);
    return product;
  }
}

function getAllProducts(lang) {
  try {
    const base = getAllProductsBase();
    const l = lang || getInitialLang();
    return base.map((p) => applyProductLang(p, l));
  } catch (error) {
    console.error('getAllProducts error:', error);
    return [];
  }
}

function getFeaturedProducts(lang) {
  try {
    const all = getAllProducts(lang);
    return all.filter((p) => (p.popularity || 0) >= 88).slice(0, 6);
  } catch (error) {
    console.error('getFeaturedProducts error:', error);
    return [];
  }
}

function getProductById(id, lang) {
  try {
    const all = getAllProductsBase();
    const p = all.find((x) => x.id === id) || null;
    if (!p) return null;
    return applyProductLang(p, lang || getInitialLang());
  } catch (error) {
    console.error('getProductById error:', error);
    return null;
  }
}

function getCategories(lang) {
  try {
    const all = getAllProductsBase();
    const set = new Set(all.map((p) => p.category));
    const ru = ['Все', ...Array.from(set)];
    const l = lang || getInitialLang();

    if (l === 'ru') return ru;

    const mapped = ru.map((c) => (c === 'Все' ? (l === 'en' ? 'All' : 'Όλα') : pickCategoryLabel(c, l)));
    return mapped;
  } catch (error) {
    console.error('getCategories error:', error);
    return [lang === 'en' ? 'All' : lang === 'el' ? 'Όλα' : 'Все'];
  }
}

function getOccasions(lang) {
  try {
    const l = lang || getInitialLang();
    const base = ['Любой повод', 'Спасибо', 'Без повода', 'Поздравление', 'Свадьба'];

    if (l === 'en') return ['Any occasion', 'Thank you', 'Just because', 'Congratulations', 'Wedding'];
    if (l === 'el') return ['Οποιαδήποτε περίσταση', 'Ευχαριστώ', 'Χωρίς αφορμή', 'Συγχαρητήρια', 'Γάμος'];
    return base;
  } catch (error) {
    console.error('getOccasions error:', error);
    return ['Любой повод'];
  }
}

function getRelatedProducts(product, limit, lang) {
  try {
    const base = getAllProductsBase().filter((p) => p.id !== product.id);
    const scored = base.map((p) => {
      const tagsOverlap = p.tags.filter((t) => (product.tags || []).includes(t)).length;
      const cat = p.category === product.category ? 2 : 0;
      const occ = p.occasions.filter((o) => (product.occasions || []).includes(o)).length;
      const score = tagsOverlap * 3 + cat * 2 + occ + (p.popularity || 0) / 100;
      return { p, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit || 6).map((x) => applyProductLang(x.p, lang || getInitialLang()));
  } catch (error) {
    console.error('getRelatedProducts error:', error);
    return [];
  }
}