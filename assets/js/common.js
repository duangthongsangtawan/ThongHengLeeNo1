/* Thong Heng Lee — shared script for every page:
   language switching, restaurant info + footer, toast, and the order API
   (real server over Wi-Fi, or a same-browser demo when opened as a file). */
(function () {
  'use strict';

  // Public website build: browse the menu only (see assets/js/site-config.js).
  const VIEW_ONLY = !!(window.THL_CONFIG && window.THL_CONFIG.viewOnly);
  if (VIEW_ONLY) document.documentElement.classList.add('view-only');

  // ===========================================================================
  //  RESTAURANT INFO — fill in here. The footer on every page updates from it.
  //  Anything left as null / [] shows "(to be added)" on the site.
  //  Text shown to guests has one entry per language:
  //    th = Thai, en = English, zs = Chinese (Simplified), ja = Japanese, my = Burmese (Myanmar),
  //    ko = Korean, es = Spanish, fr = French
  //  (If a language is missing, English is shown instead.)
  //
  //  The STAFF PASSWORD is NOT here (this file is sent to every guest's phone).
  //  It is in data/settings.json.
  // ===========================================================================
  const SITE = {
    // ---- Name ----
    nameTh: 'ท่งเฮงหลี',
    nameEn: 'Thong Heng Lee',
    nameZhT: '同興利', // logo reads 利興同 right-to-left; brief once said 通興利 — confirm
    nameZhS: '同兴利',

    // ---- Address (from the earlier homepage draft — please confirm) ----
    address: {
      th: '192–194 ถนนมหาราช แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพฯ 10200 (ชุมชนท่าช้าง)',
      en: '192–194 Maha Rat Road, Phra Borommaharatchawang, Phra Nakhon, Bangkok 10200 (Tha Chang)',
      zs: '曼谷帕那空区 Maha Rat 路 192–194 号（塔昌）10200',
      ja: 'バンコク・プラナコーン区 マハラート通り 192–194（ターチャン）10200',
      my: 'အမှတ် 192–194 မဟာရတ်လမ်း၊ ဖရာနခွန်ခရိုင်၊ ဘန်ကောက် 10200 (ထာချန်)',
      ko: '방콕 프라나콘구 마하랏 로드 192–194 (타창) 10200',
      es: 'Maha Rat Road 192–194, Phra Borommaharatchawang, Phra Nakhon, Bangkok 10200 (Tha Chang)',
      fr: '192–194 Maha Rat Road, Phra Borommaharatchawang, Phra Nakhon, Bangkok 10200 (Tha Chang)',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Thong+Heng+Lee+Maha+Rat+Road+Bangkok',

    // ---- Opening hours: one row per line shown in the footer ----
    hours: [
      { days: { th: 'อังคาร–อาทิตย์', en: 'Tue–Sun', zs: '周二至周日', ja: '火〜日', my: 'အင်္ဂါ–တနင်္ဂနွေ', ko: '화–일', es: 'mar.–dom.', fr: 'mar.–dim.' }, time: '08:30–16:30' },
    ],
    closedNote: { th: 'หยุดทุกวันจันทร์', en: 'Closed Mondays', zs: '每周一休息', ja: '月曜定休', my: 'တနင်္လာနေ့ ပိတ်သည်', ko: '매주 월요일 휴무', es: 'Cerrado los lunes', fr: 'Fermé le lundi' },

    // ---- Contact (leave null to hide a line) ----
    phone: '+66 81-649-4890', // International format omits the domestic leading zero.
    phones: ['+66 81-649-4890', '+66 99-148-1731'],
    line: null,      // e.g. '@your-line-id'
    email: null,     // e.g. 'hello@example.com'
    facebook: null,  // full URL, e.g. 'https://www.facebook.com/...'
    instagram: null, // full URL

    // ---- Team shown in the footer (photos go in assets/images/team/) ----
    team: [
  {
    "name": "Sriprapha Duangthong",
    "role": {
      "th": "ผู้จัดการร้าน",
      "en": "Restaurant manager",
      "zs": "餐厅经理",
      "ja": "レストランマネージャー",
      "my": "စားသောက်ဆိုင်မန်နေဂျာ",
      "ko": "매니저",
      "es": "Gerente del restaurante",
      "fr": "Responsable du restaurant"
    },
    "group": "management",
    "photo": "assets/images/team/Sriprapha_profile.jpg"
  },
  {
    "name": "Sriprapai Sonjaipanich",
    "role": {
      "th": "ผู้จัดการร้าน",
      "en": "Restaurant manager",
      "zs": "餐厅经理",
      "ja": "レストランマネージャー",
      "my": "စားသောက်ဆိုင်မန်နေဂျာ",
      "ko": "매니저",
      "es": "Gerente del restaurante",
      "fr": "Responsable du restaurant"
    },
    "group": "management",
    "photo": "assets/images/team/Sriprapai_profile.jpg"
  },
  {
    "name": "Sayan Duangthong",
    "role": {
      "th": "เชฟพิเศษ",
      "en": "Special Chef",
      "zs": "特聘主厨",
      "ja": "特任シェフ",
      "my": "အထူးစားဖိုမှူး",
      "ko": "스페셜 셰프",
      "es": "Chef especial",
      "fr": "Chef spécial"
    },
    "group": "kitchen",
    "photo": "assets/images/team/Sayan_profile.png"
  },
  {
    "name": "Sangtawan Duangthong",
    "role": {
      "th": "ผู้พัฒนาเว็บไซต์",
      "en": "Web developer",
      "zs": "网站开发者",
      "ja": "ウェブ開発者",
      "my": "ဝဘ်ဆိုက်ရေးဆွဲသူ",
      "ko": "웹 개발자",
      "es": "Desarrollador web",
      "fr": "Développeur web"
    },
    "group": "development",
    "photo": "assets/images/team/Sangtawan_profile.jpg"
  },
  {
    "name": "Teerapat Phinitkit",
    "role": {
      "th": "ผู้พัฒนาเว็บไซต์",
      "en": "Web developer",
      "zs": "网站开发者",
      "ja": "ウェブ開発者",
      "my": "ဝဘ်ဆိုက်ရေးဆွဲသူ",
      "ko": "웹 개발자",
      "es": "Desarrollador web",
      "fr": "Développeur web"
    },
    "group": "development",
    "photo": "assets/images/team/Theeraphat_profile.jpg"
  }
],
    teamGroups: [
  {
    "id": "management",
    "name": {
      "th": "ผู้จัดการร้าน",
      "en": "Restaurant manager",
      "zs": "餐厅经理",
      "ja": "レストランマネージャー",
      "my": "စားသောက်ဆိုင်မန်နေဂျာ",
      "ko": "매니저",
      "es": "Gerente del restaurante",
      "fr": "Responsable du restaurant"
    }
  },
  {
    "id": "kitchen",
    "name": {
      "th": "เชฟพิเศษ",
      "en": "Special Chef",
      "zs": "特聘主厨",
      "ja": "特任シェフ",
      "my": "အထူးစားဖိုမှူး",
      "ko": "스페셜 셰프",
      "es": "Chef especial",
      "fr": "Chef spécial"
    }
  },
  {
    "id": "development",
    "name": {
      "th": "ผู้พัฒนาเว็บไซต์",
      "en": "Web developer",
      "zs": "网站开发者",
      "ja": "ウェブ開発者",
      "my": "ဝဘ်ဆိုက်ရေးဆွဲသူ",
      "ko": "웹 개발자",
      "es": "Desarrollador web",
      "fr": "Développeur web"
    }
  }
],

    // ---- Ordering ----
    tables: window.THL_CONFIG.tables,          // number of tables in the table picker (a Cancel button fills the 12th slot of the 4-column grid)
    jpyPerThb: 4.4,      // approximate rate for the "約¥" hint shown in Japanese — update occasionally
    samplePrices: true,  // set to false once real prices are in menu-data.js (hides the "sample prices" notice)
  };

  const LANGS = ['th', 'en', 'zh-Hans', 'ja', 'my', 'ko', 'es', 'fr'];
  const KEY = { th: 'th', en: 'en', 'zh-Hans': 'zs', ja: 'ja', my: 'my', ko: 'ko', es: 'es', fr: 'fr' };

  const COMMON = {
    th: {
      staffLink: 'พนักงาน', staffAria: 'หน้าจอพนักงาน',
      fAbout: 'ร้านอาหารไทยในชุมชนท่าช้างโดยครอบครัวเชื้อสายไทยจีน',
      fAddress: 'ที่อยู่', fHours: 'เวลาเปิด–ปิด', fContact: 'ติดต่อ', fTeam: 'ทีมของเรา',
      fMap: 'ดูแผนที่', fTodo: '(รอเพิ่มข้อมูล)', fMember: 'สมาชิกทีม', fReplay: 'ดูแอนิเมชันเปิดร้านอีกครั้ง',
      phone: 'โทร', line: 'LINE', email: 'อีเมล', facebook: 'Facebook', instagram: 'Instagram',
    },
    en: {
      staffLink: 'Staff', staffAria: 'Staff screen',
      fAbout: 'A Thai restaurant in the Tha Chang community, run by a Thai-Chinese family.',
      fAddress: 'Address', fHours: 'Opening hours', fContact: 'Contact', fTeam: 'Our team',
      fMap: 'Open map', fTodo: '(to be added)', fMember: 'Team member', fReplay: 'Replay opening animation',
      phone: 'Phone', line: 'LINE', email: 'Email', facebook: 'Facebook', instagram: 'Instagram',
    },
    'zh-Hans': {
      staffLink: '员工', staffAria: '员工画面',
      fAbout: '位于塔昌社区、由泰华家族经营的泰式餐馆。',
      fAddress: '地址', fHours: '营业时间', fContact: '联系方式', fTeam: '我们的团队',
      fMap: '查看地图', fTodo: '（待补充）', fMember: '团队成员', fReplay: '重播开场动画',
      phone: '电话', line: 'LINE', email: '电子邮件', facebook: 'Facebook', instagram: 'Instagram',
    },
    ja: {
      staffLink: 'スタッフ', staffAria: 'スタッフ画面',
      fAbout: 'ターチャン地区で、タイ華人の一家が営むタイ料理店。',
      fAddress: '住所', fHours: '営業時間', fContact: 'お問い合わせ', fTeam: 'スタッフ紹介',
      fMap: '地図を見る', fTodo: '（追加予定）', fMember: 'スタッフ', fReplay: 'オープニングをもう一度見る',
      phone: '電話', line: 'LINE', email: 'メール', facebook: 'Facebook', instagram: 'Instagram',
    },
    my: {
      staffLink: 'ဝန်ထမ်း', staffAria: 'ဝန်ထမ်းမျက်နှာပြင်',
      fAbout: 'ထာချန်ရပ်ကွက်ရှိ ထိုင်း-တရုတ်မိသားစုက ဖွင့်လှစ်ထားသော ထိုင်းစားသောက်ဆိုင်။',
      fAddress: 'လိပ်စာ', fHours: 'ဆိုင်ဖွင့်ချိန်', fContact: 'ဆက်သွယ်ရန်', fTeam: 'ကျွန်ုပ်တို့အဖွဲ့',
      fMap: 'မြေပုံကြည့်ရန်', fTodo: '(နောက်မှ ထည့်ပါမည်)', fMember: 'အဖွဲ့ဝင်', fReplay: 'အဖွင့်ကာတွန်းကို ပြန်ကြည့်ရန်',
      phone: 'ဖုန်း', line: 'LINE', email: 'အီးမေးလ်', facebook: 'Facebook', instagram: 'Instagram',
    },
    ko: {
      staffLink: '직원', staffAria: '직원 화면',
      fAbout: '타창 지역에서 태국계 화교 가족이 운영하는 태국 음식점입니다.',
      fAddress: '주소', fHours: '영업시간', fContact: '연락처', fTeam: '우리 팀',
      fMap: '지도 보기', fTodo: '(추가 예정)', fMember: '팀원', fReplay: '오프닝 애니메이션 다시 보기',
      phone: '전화', line: 'LINE', email: '이메일', facebook: 'Facebook', instagram: 'Instagram',
    },
    es: {
      staffLink: 'Personal', staffAria: 'Pantalla del personal',
      fAbout: 'Restaurante tailandés en el barrio de Tha Chang, llevado por una familia tailandesa de origen chino.',
      fAddress: 'Dirección', fHours: 'Horario', fContact: 'Contacto', fTeam: 'Nuestro equipo',
      fMap: 'Ver mapa', fTodo: '(por añadir)', fMember: 'Miembro del equipo', fReplay: 'Ver otra vez la animación de entrada',
      phone: 'Teléfono', line: 'LINE', email: 'Correo', facebook: 'Facebook', instagram: 'Instagram',
    },
    fr: {
      staffLink: 'Personnel', staffAria: 'Écran du personnel',
      fAbout: 'Restaurant thaïlandais du quartier de Tha Chang, tenu par une famille sino-thaïe.',
      fAddress: 'Adresse', fHours: 'Horaires', fContact: 'Contact', fTeam: 'Notre équipe',
      fMap: 'Voir la carte', fTodo: '(à compléter)', fMember: 'Membre de l’équipe', fReplay: 'Revoir l’animation d’ouverture',
      phone: 'Téléphone', line: 'LINE', email: 'E-mail', facebook: 'Facebook', instagram: 'Instagram',
    },
  };

  let pageDict = {};
  let lang = 'th';
  const listeners = [];

  const t = (k) => (pageDict[lang] && pageDict[lang][k] !== undefined ? pageDict[lang][k]
    : COMMON[lang][k] !== undefined ? COMMON[lang][k] : k);
  // Pick from a localized object like { th, en, zs, ja, my }
  const pick = (obj) => (obj ? (obj[KEY[lang]] ?? obj.en ?? obj.th) : '');
  const zhName = () => (lang === 'zh-Hans' ? SITE.nameZhS : SITE.nameZhT);
  const baht = (n) => '฿' + Number(n).toLocaleString('en-US');
  // Guest-facing price: baht, plus an approximate yen figure for Japanese visitors
  const money = (n) => (lang === 'ja' && n > 0
    ? `${baht(n)}（約¥${(Math.round(n * SITE.jpyPerThb / 10) * 10).toLocaleString('ja-JP')}）`
    : baht(n));

  // ---------- Business day (for sales and the kitchen's "Done today") ----------
  // A sales day runs 18:00 → 17:59:59 Bangkok time, so it never splits the opening hours (08:30–16:30).
  // It is named after the date it ends on — the date whose opening hours it contains:
  //   Mon 18:00 … Tue 17:59:59  →  Tuesday's date.
  // Uses a fixed UTC+7 offset (Thailand has no daylight saving), never the device's own timezone.
  // server.js has the same rule (businessDay) — keep the two in step.
  const ICT_OFFSET_H = 7, DAY_CUTOFF_H = 18;
  const businessDay = (ms) => new Date(Number(ms) + (ICT_OFFSET_H + 24 - DAY_CUTOFF_H) * 3600e3).toISOString().slice(0, 10);

  // Swap a broken photo for a neutral placeholder (once) instead of a broken-image icon
  const PLACEHOLDER = 'assets/images/menu/placeholder.svg';
  function imgFallback(img, alt) {
    img.addEventListener('error', function onErr() {
      if (alt && img.dataset.fallback !== 'alt') { img.dataset.fallback = 'alt'; img.src = alt; return; }
      img.removeEventListener('error', onErr);
      img.src = PLACEHOLDER;
    });
    return img;
  }

  let allowedLangs = LANGS, languageStorageKey = 'thl-lang';
  function detectLang() {
    const param = new URLSearchParams(location.search).get('lang');
    if (allowedLangs.includes(param)) return param;
    try { const saved = localStorage.getItem(languageStorageKey); if (allowedLangs.includes(saved)) return saved; } catch (e) {}
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('zh')) return 'zh-Hans';
    if (nav.startsWith('ja')) return 'ja';
    if (nav.startsWith('my')) return 'my';
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('fr')) return 'fr';
    if (nav.startsWith('en')) return 'en';
    return 'th';
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => el.setAttribute('alt', t(el.dataset.i18nAlt)));
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => el.setAttribute('placeholder', t(el.dataset.i18nPh)));
    document.querySelectorAll('[data-name-zh]').forEach((el) => { el.textContent = zhName(); });
    document.querySelectorAll('.langs button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    renderFooter();
  }

  function setLang(next) {
    if (!allowedLangs.includes(next)) return;
    lang = next;
    try { localStorage.setItem(languageStorageKey, lang); } catch (e) {}
    apply();
    listeners.forEach((cb) => cb(lang));
  }

  // ---------- Footer ----------
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const todo = () => el('span', 'todo', t('fTodo'));
  const personIcon = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';

  function renderFooter() {
    const root = document.getElementById('site-footer');
    if (!root) return;
    root.textContent = '';
    const grid = el('div', 'wrap foot-grid');

    const brand = el('div', 'foot-brand');
    const logo = el('img'); logo.src = 'assets/images/logo.jpg'; logo.alt = '';
    const bt = el('div');
    bt.append(el('p', 'name', SITE.nameEn), el('p', 'name-alt', `${SITE.nameTh} · ${zhName()}`), el('p', null, t('fAbout')));
    brand.append(logo, bt);

    const addr = el('div');
    addr.append(el('h3', null, t('fAddress')));
    const ap = el('p', 'info', pick(SITE.address));
    ap.append(el('br'));
    const map = el('a', null, t('fMap') + ' ↗'); map.href = SITE.mapUrl; map.target = '_blank'; map.rel = 'noopener';
    ap.append(map);
    addr.append(ap);

    const hours = el('div');
    hours.append(el('h3', null, t('fHours')));
    const hp = el('p', 'info');
    const hourRows = Array.isArray(SITE.hours) ? SITE.hours : [];
    hourRows.forEach((row, i) => { if (i) hp.append(el('br')); hp.append(`${pick(row.days)}: ${row.time}`); });
    if (SITE.closedNote) { if (hourRows.length) hp.append(el('br')); hp.append(el('em', null, pick(SITE.closedNote))); }
    if (!hourRows.length && !SITE.closedNote) hp.append(todo());
    hours.append(hp);

    const contact = el('div');
    contact.append(el('h3', null, t('fContact')));
    const cp = el('p', 'info');
    const rows = [];
    const link = (text, href, external) => { const a = el('a', null, text); a.href = href; if (external) { a.target = '_blank'; a.rel = 'noopener'; } return a; };
    (SITE.phones || (SITE.phone ? [SITE.phone] : [])).forEach(phone => rows.push([t('phone'), link(phone, 'tel:' + phone.replace(/[^\d+]/g, ''))]));
    if (SITE.line) rows.push([t('line'), el('span', null, SITE.line)]);
    if (SITE.email) rows.push([t('email'), link(SITE.email, 'mailto:' + SITE.email)]);
    if (SITE.facebook) rows.push([t('facebook'), link('Facebook ↗', SITE.facebook, true)]);
    if (SITE.instagram) rows.push([t('instagram'), link('Instagram ↗', SITE.instagram, true)]);
    if (rows.length) rows.forEach(([label, node], i) => { if (i) cp.append(el('br')); cp.append(label + ': ', node); });
    else cp.append(todo());
    contact.append(cp);

    grid.append(brand, addr, hours, contact);

    const team = el('div', 'wrap team');
    team.append(el('h3', null, t('fTeam')));
    const teamLayout = el('div', 'team-layout');
    (SITE.teamGroups || []).forEach(group => {
      const section = el('section', 'team-group team-group-' + group.id);
      section.append(el('h4', null, pick(group.name)));
      const tg = el('div', 'team-grid');
      SITE.team.filter(m => m.group === group.id).forEach(m => {
        const name = typeof m.name === 'string' ? m.name : pick(m.name);
        const card = el('div', 'member' + (m.placeholder ? ' placeholder' : ''));
        const av = el('div', 'avatar');
        if (m.photo) {
          const im = el('img'); im.src = m.photo; im.alt = name;
          im.loading = 'lazy'; im.decoding = 'async'; im.width = 112; im.height = 112;
          im.addEventListener('error', () => { av.innerHTML = personIcon; }, { once: true });
          av.append(im);
        }
        else av.innerHTML = personIcon;
        card.append(av, el('strong', null, name), el('span', null, pick(m.role)));
        tg.append(card);
      });
      section.append(tg); teamLayout.append(section);
    });

    team.append(teamLayout);

    const bottom = el('div', 'wrap foot-bottom');
    bottom.append(el('span', null, `© ${new Date().getFullYear()} ${SITE.nameEn} · ${SITE.nameTh}`));
    if (window.THL_REPLAY_INTRO) {
      const rb = el('button', null, t('fReplay')); rb.type = 'button'; rb.addEventListener('click', window.THL_REPLAY_INTRO);
      bottom.append(rb);
    }
    root.append(grid, team, bottom);
  }

  // ---------- Toast ----------
  let toastTimer;
  function toast(msg) {
    let box = document.getElementById('toast');
    if (!box) { box = el('div', 'toast'); box.id = 'toast'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite'); document.body.append(box); }
    box.textContent = msg;
    box.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => box.classList.remove('show'), 2400);
  }

  // ---------- Orders ----------
  // Served over http(s) → talk to server.js (works across phones on the Wi-Fi).
  // Opened as a local file → same-browser demo stored in localStorage.
  const LIVE = location.protocol.startsWith('http');
  const DEMO_KEY = 'thl-demo-state';
  const STATUSES = ['new', 'preparing', 'served', 'cancelled'];

  const demo = {
    read() {
      try { const s = JSON.parse(localStorage.getItem(DEMO_KEY)); if (s && Array.isArray(s.orders)) return s; } catch (e) {}
      return { orders: [], nextId: 1, version: 1 };
    },
    write(s) { s.version = (s.version || 0) + 1; try { localStorage.setItem(DEMO_KEY, JSON.stringify(s)); } catch (e) {} },
    post(path, body) {
      const s = demo.read();
      const now = Date.now();
      if (path === '/api/orders/lookup') {
        return { orders: (body.orders || []).map((q) => s.orders.find((o) => o.id === Number(q.id) && o.key === q.key))
          .filter(Boolean).map((o) => ({ id: o.id, status: o.status, statusTime: o.statusTime })) };
      }
      if (path === '/api/orders') {
        const dup = body.clientId && s.orders.find((o) => o.clientId === body.clientId);
        if (dup) return dup; // a retry of an order that already arrived
        const menu = (window.THL_MENU && window.THL_MENU.items) || [];
        const items = body.items.map((it) => {
          const m = menu.find((x) => x.id === it.id);
          return Object.assign({}, it, m ? { nameTh: m.name.th, nameEn: m.name.en, nameJa: m.name.ja, price: window.THL_MENU.unitPrice(m, it.options), opt: window.THL_MENU.optionText(it.options, 'th', m) } : {});
        });
        const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
        const order = {
          id: s.nextId++, table: body.table, customerName: body.customerName || '', items, total, note: body.note || '', lang: body.lang, status: 'new', time: now, statusTime: now,
          clientId: body.clientId || '', key: Math.random().toString(36).slice(2),
        };
        s.orders.push(order); demo.write(s); return order;
      }
      const m = path.match(/^\/api\/orders\/(\d+)\/status$/);
      if (m && STATUSES.includes(body.status)) {
        const order = s.orders.find((x) => x.id === Number(m[1]));
        if (order) { order.status = body.status; order.statusTime = now; }
        demo.write(s); return order;
      }
      throw new Error('unknown');
    },
  };

  // ---------- Staff sign-in (valid only in this loaded page) ----------
  // Never reuse credentials from a previous visit, refresh or another browser tab.
  const TOKEN_KEY = 'thl-staff-token';
  try { localStorage.removeItem(TOKEN_KEY); } catch (e) {}
  let staffToken = '', authGeneration = 0;
  const getToken = () => staffToken;
  const setToken = (tok) => { staffToken = typeof tok === 'string' ? tok : ''; };
  const forgetStaffToken = () => { authGeneration++; setToken(''); };
  const authHeaders = () => (getToken() ? { Authorization: 'Bearer ' + getToken() } : {});
  // Every failed request carries a `kind` so pages can say what actually went wrong:
  //   'network' — no connection (phone off the Wi-Fi, server computer off)
  //   'timeout' — connected, but no answer in time (the request may still have arrived)
  //   'server'  — the server answered with an error (see `status`)
  const httpError = (res) => Object.assign(new Error('HTTP ' + res.status), { status: res.status, kind: 'server', retryAfter: Math.max(1, Number(res.headers.get('Retry-After')) || 60) });
  const POST_TIMEOUT_MS = 10000;
  const POLL_TIMEOUT_MS = 8000;
  async function request(path, opts, timeoutMs) {
    if (navigator.onLine === false) throw Object.assign(new Error('offline'), { kind: 'network' });
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(path, Object.assign({ cache: 'no-store', signal: ctrl.signal }, opts));
      if (!res.ok) throw httpError(res);
      return await res.json();
    } catch (e) {
      if (e.kind) throw e;
      throw Object.assign(new Error(e.message), { kind: e.name === 'AbortError' ? 'timeout' : 'network' });
    } finally {
      clearTimeout(timer);
    }
  }

  async function login(username, password) {
    if (!LIVE) throw Object.assign(new Error('server required'), { kind: 'network' });
    const generation = ++authGeneration;
    setToken('');
    const data = await request('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }, POST_TIMEOUT_MS);
    if (generation !== authGeneration) throw Object.assign(new Error('sign-in cancelled'), { kind: 'cancelled' });
    if (!data || typeof data.token !== 'string' || !data.token) throw new Error('missing staff token');
    setToken(data.token);
    return true;
  }
  async function getStaffState() {
    if (!LIVE || !getToken()) throw Object.assign(new Error('staff sign-in required'), { status: 401 });
    return request('/api/state', { headers: authHeaders() }, POLL_TIMEOUT_MS);
  }
  // Sales requests are bounded and authenticated like the staff feed.
  async function getSales(date) {
    return request('/api/sales?date=' + encodeURIComponent(date || ''), { headers: authHeaders() }, POLL_TIMEOUT_MS);
  }
  async function logout() {
    const headers = authHeaders();
    const hadToken = Boolean(getToken());
    forgetStaffToken(); // hide/forget locally even if the server is offline
    if (LIVE && hadToken) {
      try { await request('/api/logout', { method: 'POST', headers }, POST_TIMEOUT_MS); } catch (e) {}
    }
  }

  async function post(path, body) {
    if (!LIVE) return demo.post(path, body || {});
    return request(path, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(body || {}) }, POST_TIMEOUT_MS);
  }

  // Guest side: current status of the guest's own orders only. `orders` = [{ id, key }] —
  // the key was handed back when the order was sent, so nobody can look up another table.
  async function orderStatus(orders) {
    if (!LIVE) return demo.post('/api/orders/lookup', { orders });
    return request('/api/orders/lookup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orders }) }, POLL_TIMEOUT_MS);
  }

  // Staff screen feed: polls every 2 seconds. Calls onChange(state) whenever the
  // orders change and onStatus('live' | 'demo' | 'offline' | 'auth'). Returns a function that stops it.
  const POLL_MS = 2000;
  function subscribe(onChange, onStatus) {
    let version = null, timer, stopped = false, busy = false;
    const stop = () => { stopped = true; clearTimeout(timer); };
    async function tick() {
      if (stopped) return;
      if (!busy) {
        busy = true;
        try {
          let s;
          if (LIVE) {
            // The timeout matters: a hung request would otherwise freeze the feed without ever reporting 'offline'.
            s = await request('/api/state' + (version ? '?v=' + version : ''), { headers: authHeaders() }, POLL_TIMEOUT_MS);
          } else {
            s = demo.read();
          }
          if (stopped) return;
          onStatus && onStatus(LIVE ? 'live' : 'demo');
          if (!stopped && !s.unchanged && s.version !== version) { version = s.version; onChange(s); }
        } catch (e) {
          if (stopped) return;
          if (e.status === 401) { stop(); onStatus && onStatus('auth'); return; }
          onStatus && onStatus('offline');
        } finally { busy = false; }
      }
      if (!stopped) timer = setTimeout(tick, POLL_MS);
    }
    tick();
    return stop;
  }

  // ---------- Init ----------
  function init(dict, options = {}) {
    pageDict = dict || {};
    allowedLangs = options.languages || LANGS;
    languageStorageKey = options.storageKey || 'thl-lang';
    lang = detectLang();
    if (!allowedLangs.includes(lang)) lang = allowedLangs.includes('en') ? 'en' : allowedLangs[0];
    document.querySelectorAll('.langs button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
    apply();
  }

  window.THL = {
    SITE, LANGS, init, t, pick, baht, money, imgFallback, toast, post, subscribe, LIVE, VIEW_ONLY, businessDay,
    login, logout, getStaffState, forgetStaffToken, getSales, orderStatus, hasToken: () => Boolean(getToken()),
    get lang() { return lang; },
    setLang,
    onLang: (cb) => listeners.push(cb),
    zhName,
  };
})();
