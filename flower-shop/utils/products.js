function getAllProducts() {
  try {
    return [
      {
        id: 'rose-velvet',
        title: 'Velvet Rose',
        short: 'Глубокие бордовые розы, бархатная упаковка и лёгкий аромат.',
        price: 5490,
        category: 'Розы',
        occasions: ['День рождения', 'Свидание', '8 марта'],
        tags: ['бордовый', 'классика', 'роза'],
        image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
        flowers: ['Розы бордовые', 'Эвкалипт', 'Лента'],
        prepMinutes: 35,
        popularity: 95,
        isNew: true,
        createdAt: 20260301
      },
      {
        id: 'tulip-sunrise',
        title: 'Tulip Sunrise',
        short: 'Тюльпаны в оттенках рассвета — нежно и очень весенне.',
        price: 3290,
        category: 'Тюльпаны',
        occasions: ['8 марта', 'Спасибо', 'Свидание'],
        tags: ['пастель', 'весна', 'тюльпаны'],
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
        flowers: ['Тюльпаны', 'Сухоцветы', 'Крафт'],
        prepMinutes: 25,
        popularity: 90,
        isNew: false,
        createdAt: 20260212
      },
      {
        id: 'peony-cloud',
        title: 'Peony Cloud',
        short: 'Пионы, как облако: объем, романтика и текстуры.',
        price: 6890,
        category: 'Пионы',
        occasions: ['Свадьба', 'Свидание', 'День рождения'],
        tags: ['пион', 'объем', 'нежный'],
        image: 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80',
        flowers: ['Пионы', 'Ранункулюсы', 'Фисташка'],
        prepMinutes: 45,
        popularity: 88,
        isNew: true,
        createdAt: 20260315
      },
      {
        id: 'white-minimal',
        title: 'White Minimal',
        short: 'Минимализм в белом: чистые линии и спокойная эстетика.',
        price: 4190,
        category: 'Авторские',
        occasions: ['Спасибо', 'Новоселье', 'Без повода'],
        tags: ['минимализм', 'белый', 'стильно'],
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
        flowers: ['Хризантема', 'Альстромерия', 'Эвкалипт'],
        prepMinutes: 30,
        popularity: 82,
        isNew: false,
        createdAt: 20260110
      },
      {
        id: 'spring-meadow',
        title: 'Spring Meadow',
        short: 'Сезонные цветы, будто собраны на лугу — ярко и живо.',
        price: 4590,
        category: 'Сезонные',
        occasions: ['День рождения', 'Спасибо', 'Без повода'],
        tags: ['яркий', 'сезон', 'луговой'],
        image: 'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=1200&q=80',
        flowers: ['Ирисы', 'Герберы', 'Зелень'],
        prepMinutes: 35,
        popularity: 79,
        isNew: false,
        createdAt: 20251222
      },
      {
        id: 'pink-dream',
        title: 'Pink Dream',
        short: 'Розово-пудровая гамма, мягкая упаковка и эффект «вау».',
        price: 5790,
        category: 'Авторские',
        occasions: ['Свидание', 'День рождения', '8 марта'],
        tags: ['розовый', 'пудра', 'романтика'],
        image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
        flowers: ['Розы', 'Гвоздики', 'Эвкалипт'],
        prepMinutes: 40,
        popularity: 92,
        isNew: true,
        createdAt: 20260320
      },
      {
        id: 'sunny-box',
        title: 'Sunny Box',
        short: 'Композиция в шляпной коробке — подарок, который удобно вручить.',
        price: 6390,
        category: 'Композиции',
        occasions: ['День рождения', 'Новоселье', 'Спасибо'],
        tags: ['коробка', 'подарок', 'желтый'],
        image: 'https://images.unsplash.com/photo-1526045431048-1d4a0e0f0b0a?auto=format&fit=crop&w=1200&q=80',
        flowers: ['Розы', 'Кустовые розы', 'Оазис'],
        prepMinutes: 50,
        popularity: 86,
        isNew: false,
        createdAt: 20251120
      },
      {
        id: 'lavender-evening',
        title: 'Lavender Evening',
        short: 'Сиреневые и лавандовые оттенки для спокойного настроения.',
        price: 4990,
        category: 'Авторские',
        occasions: ['Без повода', 'Спасибо', 'Свидание'],
        tags: ['лаванда', 'сиреневый', 'нежный'],
        image: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=1200&q=80',
        flowers: ['Лизиантус', 'Гвоздика', 'Эвкалипт'],
        prepMinutes: 35,
        popularity: 80,
        isNew: false,
        createdAt: 20251015
      }
    ];
  } catch (error) {
    console.error('getAllProducts error:', error);
    return [];
  }
}

function getFeaturedProducts() {
  try {
    const all = getAllProducts();
    return all.filter((p) => p.popularity >= 88).slice(0, 6);
  } catch (error) {
    console.error('getFeaturedProducts error:', error);
    return [];
  }
}

function getProductById(id) {
  try {
    const all = getAllProducts();
    return all.find((p) => p.id === id) || null;
  } catch (error) {
    console.error('getProductById error:', error);
    return null;
  }
}

function getCategories() {
  try {
    const all = getAllProducts();
    const set = new Set(all.map((p) => p.category));
    return ['Все', ...Array.from(set)];
  } catch (error) {
    console.error('getCategories error:', error);
    return ['Все'];
  }
}

function getOccasions() {
  try {
    const all = getAllProducts();
    const set = new Set();
    all.forEach((p) => (p.occasions || []).forEach((o) => set.add(o)));
    return ['Любой повод', ...Array.from(set)];
  } catch (error) {
    console.error('getOccasions error:', error);
    return ['Любой повод'];
  }
}

function getRelatedProducts(product, limit) {
  try {
    const all = getAllProducts().filter((p) => p.id !== product.id);
    const scored = all.map((p) => {
      const tagsOverlap = p.tags.filter((t) => (product.tags || []).includes(t)).length;
      const cat = p.category === product.category ? 2 : 0;
      const occ = p.occasions.filter((o) => (product.occasions || []).includes(o)).length;
      const score = tagsOverlap * 3 + cat * 2 + occ + (p.popularity || 0) / 100;
      return { p, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit || 6).map((x) => x.p);
  } catch (error) {
    console.error('getRelatedProducts error:', error);
    return [];
  }
}