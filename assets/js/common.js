/* Thong Heng Lee — shared script for every page:
   language switching, restaurant info + footer, toast, and the order API
   (real server over Wi-Fi, or a same-browser demo when opened as a file). */
(function () {
  'use strict';

  // ---------- Public website ----------
  // On the public website's host names (assets/js/site-config.js → publicSite) the pages talk to
  // the shop computer over the internet at publicSite.api, and stay a look-only menu until
  // menu.js has confirmed a table QR code. Everywhere else (the shop Wi-Fi) nothing changes.
  const PUB = (window.THL_CONFIG && window.THL_CONFIG.publicSite) || {};
  const PUBLIC = Array.isArray(PUB.hosts) && PUB.hosts.includes(String(location.hostname || '').toLowerCase());
  const API_BASE = PUBLIC ? String(PUB.api || '').replace(/\/+$/, '') : '';
  const API_READY = !PUBLIC || Boolean(API_BASE);
  if (PUBLIC) document.documentElement.classList.add('public-site', 'view-only');

  // ===========================================================================
  //  RESTAURANT INFO — fill in here. The footer on every page updates from it.
  //  Anything left as null / [] shows "(to be added)" on the site.
  //  Text shown to guests has one entry per language:
  //    th = Thai, en = English, zs = Chinese (Simplified), ja = Japanese, my = Burmese (Myanmar),
  //    ko = Korean, id = Indonesian, es = Spanish, fr = French
  //  (If a language is missing, English is shown instead.)
  //
  //  The STAFF PASSWORD is NOT here (this file is sent to every guest's phone).
  //  It is in data/settings.json.
  // ===========================================================================
  // Placeholder name for team members not yet chosen ("under development"), one per language
  const TBD_NAME = { th: 'อยู่ระหว่างพัฒนา', en: 'In development', zs: '开发中', ja: '開発中', my: 'ဖန်တီးဆဲ', ko: '개발 중', es: 'En desarrollo', fr: 'En développement', id: 'Dalam pengembangan' };

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
      id: 'Jl. Maha Rat 192–194, Phra Borommaharatchawang, Phra Nakhon, Bangkok 10200 (Tha Chang)',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Thong+Heng+Lee+Maha+Rat+Road+Bangkok',

    // ---- Opening hours: one row per line shown in the footer ----
    hours: [
      { days: { th: 'อังคาร–อาทิตย์', en: 'Tue–Sun', zs: '周二至周日', ja: '火〜日', my: 'အင်္ဂါ–တနင်္ဂနွေ', ko: '화–일', es: 'mar.–dom.', fr: 'mar.–dim.', id: 'Sel–Min' }, time: '08:30–16:30' },
    ],
    closedNote: { th: 'หยุดทุกวันจันทร์', en: 'Closed Mondays', zs: '每周一休息', ja: '月曜定休', my: 'တနင်္လာနေ့ ပိတ်သည်', ko: '매주 월요일 휴무', es: 'Cerrado los lunes', fr: 'Fermé le lundi', id: 'Tutup setiap Senin' },

    // ---- Contact (leave null to hide a line) ----
    phone: '+66 81-649-4890', // International format omits the domestic leading zero.
    phones: ['+66 81-649-4890', '+66 94 354 2462'],
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
      "fr": "Responsable du restaurant",
      "id":"Manajer restoran"
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
      "fr": "Responsable du restaurant",
      "id":"Manajer restoran"
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
      "fr": "Chef spécial",
      "id":"Chef spesial"
    },
    "group": "kitchen",
    "photo": "assets/images/team/Sayan_profile.png"
  },
  {
    "name": "Sangtawan Duangthong",
    "role": {
      "th": "ผู้พัฒนาเว็บไซต์（OSK143・ศิษย์เก่า KOSEN-KMITL）",
      "en": "Web developer",
      "zs": "网站开发者",
      "ja": "ウェブ開発者（沼津高専卒）",
      "my": "ဝဘ်ဆိုက်ရေးဆွဲသူ",
      "ko": "웹 개발자",
      "es": "Desarrollador web",
      "fr": "Développeur web",
      "id":"Pengembang web"
    },
    "group": "development",
    "photo": "assets/images/team/Sangtawan_profile.jpg",
    // LINE / Facebook icons that pop out of the card. line = path of a LINE QR picture,
    // facebook = profile URL. Leave null to show "coming soon".
    "social": { "line": "assets/images/team/Sangtawan_line.jpg", "facebook": "https://www.facebook.com/sangtawan.duangthong" }
  },
  {
    "name": "Teerapat Phinitkit",
    "role": {
      "th": "ผู้พัฒนาเว็บไซต์（ศิษย์เก่า KOSEN-KMITL）",
      "en": "Web developer（Thai KOSEN Grad.）",
      "zs": "网站开发者",
      "ja": "ウェブ開発者（タイ高専卒）",
      "my": "ဝဘ်ဆိုက်ရေးဆွဲသူ",
      "ko": "웹 개발자",
      "es": "Desarrollador web",
      "fr": "Développeur web",
      "id":"Pengembang web（Lulusan KOSEN Thailand）"
    },
    "group": "development",
    "photo": "assets/images/team/Theeraphat_profile.jpg",
    "social": { "line": null, "facebook": "https://www.facebook.com/thir.phathr.phinic.kic" }
  },  {
    "name": "Ye Yint Tun",
    "role": {
      "th": "ผู้ตรวจทานภาษาพม่า",
      "en": "Burmese proofreader",
      "zs": "缅甸语校对",
      "ja": "ミャンマー語校正",
      "my": "မြန်မာစာစစ်သူ",
      "ko": "미얀마어 교정",
      "es": "Revisor de birmano",
      "fr": "Relecteur birman",
      "id":"Korektor bahasa Burma"
    },
    "group": "proofreader"
  },
  {
    "name": "Lee Jun Lin",
    "role": {
      "th": "ผู้ตรวจทานภาษาจีน",
      "en": "Chinese proofreader",
      "zs": "中文校对",
      "ja": "中国語校正",
      "my": "တရုတ်စာစစ်သူ",
      "ko": "중국어 교정",
      "es": "Revisor de chino",
      "fr": "Relecteur chinois",
      "id":"Korektor bahasa Mandarin"
    },
    "group": "proofreader"
  },
  {
    "name": TBD_NAME,
    "role": {
      "th": "ผู้ตรวจทานภาษาญี่ปุ่น",
      "en": "Japanese proofreader",
      "zs": "日语校对",
      "ja": "日本語校正",
      "my": "ဂျပန်စာစစ်သူ",
      "ko": "일본어 교정",
      "es": "Revisor de japonés",
      "fr": "Relecteur japonais",
      "id":"Korektor bahasa Jepang"
    },
    "group": "proofreader"
  },
  {
    "name": TBD_NAME,
    "role": {
      "th": "ผู้ตรวจทานภาษาเกาหลี",
      "en": "Korean proofreader",
      "zs": "韩语校对",
      "ja": "韓国語校正",
      "my": "ကိုးရီးယားစာစစ်သူ",
      "ko": "한국어 교정",
      "es": "Revisor de coreano",
      "fr": "Relecteur coréen",
      "id":"Korektor bahasa Korea"
    },
    "group": "proofreader"
  },
  {
    "name": TBD_NAME,
    "role": {
      "th": "ผู้ตรวจทานภาษาฝรั่งเศส",
      "en": "French proofreader",
      "zs": "法语校对",
      "ja": "フランス語校正",
      "my": "ပြင်သစ်စာစစ်သူ",
      "ko": "프랑스어 교정",
      "es": "Revisor de francés",
      "fr": "Relecteur français",
      "id":"Korektor bahasa Prancis"
    },
    "group": "proofreader"
  },
  {
    "name": TBD_NAME,
    "role": {
      "th": "ผู้ตรวจทานภาษาอินโดนีเซีย",
      "en": "Indonesian proofreader",
      "zs": "印尼语校对",
      "ja": "インドネシア語校正",
      "my": "အင်ဒိုနီးရှားစာစစ်သူ",
      "ko": "인도네시아어 교정",
      "es": "Revisor de indonesio",
      "fr": "Relecteur indonésien",
      "id":"Korektor bahasa Indonesia"
    },
    "group": "proofreader"
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
      "fr": "Responsable du restaurant",
      "id":"Manajer restoran"
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
      "fr": "Chef spécial",
      "id":"Chef spesial"
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
      "fr": "Développeur web",
      "id":"Pengembang web"
    }
  },  {
    "id": "proofreader",
    "name": {
      "th": "ผู้ตรวจทาน",
      "en": "Proofreader",
      "zs": "校对",
      "ja": "校正",
      "my": "စာစစ်သူ",
      "ko": "교정",
      "es": "Revisor",
      "fr": "Relecteur",
      "id":"Korektor"
    }
  }
],

    // ---- Ordering ----
    tables: window.THL_CONFIG.tables,          // number of tables in the table picker (a Cancel button fills the 12th slot of the 4-column grid)
    jpyPerThb: 4.4,      // approximate rate for the "約¥" hint shown in Japanese — update occasionally
    samplePrices: true,  // set to false once real prices are in menu-data.js (hides the "sample prices" notice)
  };

  const LANGS = ['th', 'en', 'zh-Hans', 'ja', 'ko', 'my', 'id', 'fr', 'es'];
  const KEY = { th: 'th', en: 'en', 'zh-Hans': 'zs', ja: 'ja', my: 'my', ko: 'ko', es: 'es', fr: 'fr', id: 'id' };

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
    id: {
      staffLink: 'Staf',
      staffAria: 'Layar staf',
      fAbout: 'Restoran Thailand di kawasan Tha Chang, dikelola oleh keluarga Thai-Tionghoa.',
      fAddress: 'Alamat',
      fHours: 'Jam buka',
      fContact: 'Kontak',
      fTeam: 'Tim kami',
      fMap: 'Buka peta',
      fTodo: '(akan ditambahkan)',
      fMember: 'Anggota tim',
      fReplay: 'Putar ulang animasi pembuka',
      phone: 'Telepon',
      line: 'LINE',
      email: 'Email',
      facebook: 'Facebook',
      instagram: 'Instagram',
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
    if (nav.startsWith('id') || nav.startsWith('in')) return 'id';
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

  // ---------- Developer social icons (LINE / Facebook) ----------
  // Hovering (PC), focusing or tapping (phone) a card with "social" makes the two icons fan out
  // above it, like picking an item in a game. LINE opens a QR window; Facebook opens the profile.
  const SOCIAL_TEXT = {
    soon: { th: 'เร็ว ๆ นี้', en: 'Coming soon', zs: '即将推出', ja: '近日公開', my: 'မကြာမီ', ko: '곧 공개', es: 'Próximamente', fr: 'Bientôt disponible', id: 'Segera hadir' },
    scan: { th: 'สแกน QR เพื่อเพิ่มเพื่อนใน LINE', en: 'Scan the QR code to add on LINE', zs: '扫描二维码添加 LINE 好友', ja: 'QRコードを読み取ってLINEで友だち追加', my: 'LINE တွင် မိတ်ဆွေထည့်ရန် QR ကို စကင်ဖတ်ပါ', ko: 'QR 코드를 스캔해 LINE 친구 추가', es: 'Escanea el código QR para añadir en LINE', fr: 'Scannez le QR code pour ajouter sur LINE', id: 'Pindai kode QR untuk menambahkan di LINE' },
    close: { th: 'ปิด', en: 'Close', zs: '关闭', ja: '閉じる', my: 'ပိတ်ရန်', ko: '닫기', es: 'Cerrar', fr: 'Fermer', id: 'Tutup' },
  };
  const LINE_ICON = '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#06C755"/><path fill="#fff" d="M20 8.5c-7.7 0-14 5-14 11.1 0 5.5 5 10.1 11.7 11 .5.1 1.1.3 1.2.7.1.4.1.9 0 1.3l-.2 1.2c-.1.4-.3 1.4 1.2.8 1.5-.6 8.1-4.8 11-8.2 2-2.2 3.1-4.4 3.1-6.8 0-6.1-6.3-11.1-14-11.1z"/><text x="20" y="22.6" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="7.6" fill="#06C755">LINE</text></svg>';
  const FB_ICON = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#1877F2"/><path fill="#fff" d="M22.2 32V21.8h3.4l.5-4h-3.9v-2.5c0-1.1.3-1.9 2-1.9h2.1V9.8c-.4 0-1.6-.2-3-.2-3 0-5 1.8-5 5.2v3h-3.4v4h3.4V32z"/></svg>';

  let qrDialog;
  function showLineQr(m, name) {
    if (!qrDialog) {
      qrDialog = el('dialog', 'sheet social-qr');
      qrDialog.addEventListener('click', (e) => { if (e.target === qrDialog) qrDialog.close(); });
      document.body.append(qrDialog);
    }
    qrDialog.textContent = '';
    const body = el('div', 'sheet-body');
    body.append(el('h3', null, 'LINE · ' + name));
    if (m.social.line) {
      const im = el('img'); im.src = m.social.line; im.alt = 'LINE QR · ' + name; im.width = 240; im.height = 240;
      body.append(im, el('p', null, pick(SOCIAL_TEXT.scan)));
    } else body.append(el('p', 'social-soon', pick(SOCIAL_TEXT.soon)));
    const close = el('button', 'social-close', pick(SOCIAL_TEXT.close)); close.type = 'button';
    close.addEventListener('click', () => qrDialog.close());
    body.append(close); qrDialog.append(body);
    try { qrDialog.showModal(); } catch (_) { qrDialog.setAttribute('open', ''); }
    close.focus();
  }
  function socialPop(card, m, name) {
    card.classList.add('has-social');
    const pop = el('div', 'social-pop');
    const line = el('button', 'social-ico social-line'); line.type = 'button';
    line.innerHTML = LINE_ICON; line.setAttribute('aria-label', 'LINE · ' + name);
    line.addEventListener('click', (e) => { e.stopPropagation(); showLineQr(m, name); });
    let fb;
    if (m.social.facebook) {
      fb = el('a', 'social-ico social-fb'); fb.href = m.social.facebook; fb.target = '_blank'; fb.rel = 'noopener';
      fb.addEventListener('click', (e) => e.stopPropagation());
    } else {
      fb = el('button', 'social-ico social-fb'); fb.type = 'button';
      fb.addEventListener('click', (e) => { e.stopPropagation(); toast(pick(SOCIAL_TEXT.soon)); });
    }
    fb.innerHTML = FB_ICON; fb.setAttribute('aria-label', 'Facebook · ' + name);
    pop.append(line, fb);
    // Phones have no hover: a tap on the card opens / closes the icons.
    card.addEventListener('click', () => card.classList.toggle('social-open'));
    return pop;
  }
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.member.social-open').forEach((c) => { if (!c.contains(e.target)) c.classList.remove('social-open'); });
  });

  let teamRevealed = false;
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
    (SITE.teamGroups || []).forEach((group, gi) => {
      const section = el('section', 'team-group team-group-' + group.id);
      section.style.setProperty('--g', (gi * 0.45) + 's');
      section.append(el('h4', null, pick(group.name)));
      const tg = el('div', 'team-grid');
      SITE.team.filter(m => m.group === group.id).forEach((m, mi) => {
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
        card.style.setProperty('--d', (gi * 0.45 + 0.55 + mi * 0.15) + 's');
        card.append(av, el('strong', null, name), el('span', null, pick(m.role)));
        if (m.social) card.append(socialPop(card, m, name));
        tg.append(card);
      });
      section.append(tg); teamLayout.append(section);
    });

    team.append(teamLayout);

    // Scroll reveal: when the team section comes into view, each group's blue bar draws downward,
    // then its cards slide in from the left, group after group. Plays once per page load
    // (language switches re-render the footer without replaying it) and is skipped for reduced motion.
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!teamRevealed && !reduce && 'IntersectionObserver' in window) {
      teamLayout.setAttribute('data-reveal', '');
      const io = new IntersectionObserver((entries) => {
        if (!entries.some(e => e.isIntersecting)) return;
        io.disconnect(); teamRevealed = true;
        requestAnimationFrame(() => teamLayout.classList.add('in'));
      }, { threshold: 0.2 });
      io.observe(teamLayout);
    } else teamRevealed = true;

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
    if (!API_READY) throw Object.assign(new Error('ordering is not connected'), { kind: 'network' });
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(API_BASE + path, Object.assign({ cache: 'no-store', signal: ctrl.signal }, opts));
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

  // Public website: is this table's QR key (still) good? Fails with status 403 when it is not.
  async function checkTable(table, key) {
    return request('/api/table/check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ table, key }) }, POLL_TIMEOUT_MS);
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

  // Small line icons for the five menu categories (rice, Pad Thai, soups & sides, desserts, drinks).
  const CAT_ICONS = {
    rice: '<path d="M3 13h18a9 9 0 0 1-18 0z"/><path d="M6.5 13a5.5 5 0 0 1 11 0"/><path d="M9.5 9.5l.01 0M12.5 8.5l.01 0M14.5 10l.01 0"/>',
    noodles: '<path d="M3 14h18a9 7 0 0 1-18 0z"/><path d="M6 11c1.4-2.2 2.8 2.2 4.2 0s2.8 2.2 4.2 0 2.2 1.2 3.6 0"/><path d="M15 2.5l-3.5 7M18.5 3.5L14 9.5"/>',
    sides: '<path d="M3 12h18a9 9 0 0 1-18 0z"/><path d="M8 8.5c-1-1.5 1-2.5 0-4.5M12 8.5c-1-1.5 1-2.5 0-4.5M16 8.5c-1-1.5 1-2.5 0-4.5"/>',
    dessert: '<circle cx="12" cy="8" r="4.5"/><path d="M7.7 12.2L12 22l4.3-9.8"/><path d="M9.8 6.5l.01 0"/>',
    drinks: '<path d="M6 8h12l-1.4 13H7.4z"/><path d="M6.7 13.5h10.6"/><path d="M13 8l2.5-5.5H19"/>',
  };
  const catIcon = (id, size = 24) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CAT_ICONS[id] || CAT_ICONS.rice}</svg>`;

  window.THL = {
    catIcon,
    SITE, LANGS, init, t, pick, baht, money, imgFallback, toast, post, subscribe, LIVE, businessDay,
    PUBLIC, API_READY, checkTable,
    login, logout, getStaffState, forgetStaffToken, getSales, orderStatus, hasToken: () => Boolean(getToken()),
    get lang() { return lang; },
    setLang,
    onLang: (cb) => listeners.push(cb),
    zhName,
  };
})();
