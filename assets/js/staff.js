/* Staff screen: sign-in, Kitchen tab (live order board New → Preparing → Done, sound alert)
   and Sales tab (daily 売上集計). Orders arrive by polling the server every 2–3 seconds. */
(function () {
  'use strict';
  const { t, baht } = THL;
  const DICT = {
  "th": {
    "title": "หน้าจอครัวและพนักงาน",
    "colNew": "ออเดอร์ใหม่",
    "colPrep": "กำลังทำ",
    "colDone": "เสร็จแล้ววันนี้",
    "table": "โต๊ะ",
    "total": "รวม",
    "start": "เริ่มทำ",
    "served": "เสิร์ฟแล้ว",
    "cancel": "ยกเลิก",
    "undo": "ย้อนกลับ",
    "stServed": "เสิร์ฟแล้ว",
    "stCancelled": "ยกเลิกแล้ว",
    "confirmCancel": "ยกเลิกออเดอร์ #{n} ของโต๊ะ {t}?",
    "emptyNew": "ยังไม่มีออเดอร์ใหม่",
    "emptyPrep": "ไม่มีรายการที่กำลังทำ",
    "emptyDone": "ยังไม่มีรายการที่เสร็จวันนี้",
    "doneSum": "เสิร์ฟแล้ว {n} ออเดอร์ · {sum}",
    "byTime": "ตามเวลา",
    "byTable": "ตามโต๊ะ",
    "sortBy": "เรียงลำดับ",
    "mins": "{n} นาที",
    "justNow": "เมื่อสักครู่",
    "guest": "ลูกค้า",
    "newOrder": "ออเดอร์ใหม่ · โต๊ะ {t}",
    "saveErr": "บันทึกไม่สำเร็จ ลองอีกครั้ง",
    "live": "เชื่อมต่อแล้ว",
    "demo": "โหมดทดลอง (เบราว์เซอร์นี้)",
    "offline": "ขาดการเชื่อมต่อ",
    "auth": "ต้องเข้าสู่ระบบ",
    "soundOn": "🔔 เสียงเปิดอยู่",
    "soundOff": "🔕 เสียงปิดอยู่",
    "soundTap": "🔈 แตะเพื่อเปิดเสียง",
    "logout": "ออกจากระบบ",
    "loginTitle": "เข้าสู่ระบบพนักงาน",
    "loginHint": "ใส่รหัสผ่านพนักงานเพื่อดูออเดอร์",
    "password": "รหัสผ่าน",
    "signIn": "เข้าสู่ระบบ",
    "wrongPw": "รหัสผ่านไม่ถูกต้อง",
    "tooMany": "ลองผิดหลายครั้งเกินไป กรุณารอ 5 นาที",
    "noServer": "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้",
    "expired": "กรุณาเข้าสู่ระบบอีกครั้ง",
    "note": "อุปกรณ์นี้จะอยู่ในระบบ 1 วัน · เปลี่ยนรหัสผ่านได้ที่ไฟล์ data/settings.json"
  },
  "en": {
    "title": "Kitchen & staff screen",
    "colNew": "New orders",
    "colPrep": "Preparing",
    "colDone": "Done today",
    "table": "Table",
    "total": "Total",
    "start": "Start preparing",
    "served": "Served",
    "cancel": "Cancel",
    "undo": "Undo",
    "stServed": "Served",
    "stCancelled": "Cancelled",
    "confirmCancel": "Cancel order #{n} for table {t}?",
    "emptyNew": "No new orders",
    "emptyPrep": "Nothing in the kitchen",
    "emptyDone": "Nothing finished yet today",
    "doneSum": "{n} orders served · {sum}",
    "byTime": "By time",
    "byTable": "By table",
    "sortBy": "Sort by",
    "mins": "{n} min",
    "justNow": "just now",
    "guest": "Guest",
    "newOrder": "New order · Table {t}",
    "saveErr": "Could not save — try again",
    "live": "Live",
    "demo": "Demo mode (this browser)",
    "offline": "Offline",
    "auth": "Sign-in needed",
    "soundOn": "🔔 Sound on",
    "soundOff": "🔕 Sound off",
    "soundTap": "🔈 Tap to enable sound",
    "logout": "Sign out",
    "loginTitle": "Staff sign-in",
    "loginHint": "Enter the staff password to see orders.",
    "password": "Password",
    "signIn": "Sign in",
    "wrongPw": "Wrong password",
    "tooMany": "Too many tries — please wait 5 minutes",
    "noServer": "Can’t reach the server",
    "expired": "Please sign in again",
    "note": "This device stays signed in for 1 day · The password is set in data/settings.json"
  }
};
  // Sign-in wording and the Sales tab (売上集計)
  const MORE = {
  "th": {
    "title": "หน้าจอพนักงาน",
    "tabKitchen": "ครัว / ออเดอร์",
    "tabSales": "ยอดขาย",
    "username": "ชื่อผู้ใช้",
    "loginHint": "ใส่ชื่อผู้ใช้และรหัสผ่านพนักงาน",
    "wrongPw": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
    "prevDay": "วันก่อนหน้า",
    "nextDay": "วันถัดไป",
    "pickDate": "เลือกวันที่",
    "today": "วันนี้",
    "recent": "วันที่มีออเดอร์:",
    "totalSales": "ยอดขายรวม",
    "approxYen": "≈ ¥{n}",
    "ordersLine": "{n} ออเดอร์",
    "openLine": "ยังไม่เสิร์ฟ {n}",
    "food": "อาหาร",
    "drinks": "เครื่องดื่ม",
    "qtyLine": "{n} รายการ · {p}% ของยอดขาย",
    "byCat": "ยอดขายตามหมวด",
    "colCat": "หมวด",
    "colQty": "จำนวน",
    "colSales": "ยอดขาย",
    "sum": "รวม",
    "topFood": "อาหารขายดี 3 อันดับ",
    "topDrinks": "เครื่องดื่มขายดี 3 อันดับ",
    "sold": "{n} ที่ · {sum}",
    "noneYet": "ยังไม่มี",
    "noSales": "ไม่มียอดขายในวันที่ {d}",
    "cancelledLine": "ยกเลิก {n} ออเดอร์ ({sum}) ไม่นับในยอดขาย",
    "salesNote": "หนึ่งวันขายนับตั้งแต่ 18:00 ของเมื่อวานถึง 17:59 · นับทุกออเดอร์ของวันนั้นที่ไม่ถูกยกเลิก รวมออเดอร์ที่ยังไม่เสิร์ฟ · เงินเยนเป็นค่าประมาณ",
    "salesDemo": "ดูยอดขายได้เมื่อเปิดผ่านเซิร์ฟเวอร์ (node server.js)",
    "salesErr": "โหลดยอดขายไม่สำเร็จ"
  },
  "en": {
    "title": "Staff screen",
    "tabKitchen": "Kitchen / orders",
    "tabSales": "Sales",
    "username": "Username",
    "loginHint": "Enter the staff username and password.",
    "wrongPw": "Wrong username or password",
    "prevDay": "Previous day",
    "nextDay": "Next day",
    "pickDate": "Choose date",
    "today": "Today",
    "recent": "Days with orders:",
    "totalSales": "Total sales",
    "approxYen": "≈ ¥{n}",
    "ordersLine": "{n} orders",
    "openLine": "{n} not served yet",
    "food": "Food",
    "drinks": "Drinks",
    "qtyLine": "{n} items · {p}% of sales",
    "byCat": "Sales by category",
    "colCat": "Category",
    "colQty": "Qty",
    "colSales": "Sales",
    "sum": "Total",
    "topFood": "Top 3 foods",
    "topDrinks": "Top 3 drinks",
    "sold": "{n} sold · {sum}",
    "noneYet": "None yet",
    "noSales": "No sales on {d}",
    "cancelledLine": "{n} cancelled order(s) ({sum}) not counted",
    "salesNote": "A sales day runs from 18:00 the evening before to 17:59 · Counts every order placed that day that was not cancelled, including ones not served yet · Yen is approximate",
    "salesDemo": "Sales are available when the site is opened through the server (node server.js).",
    "salesErr": "Could not load sales"
  }
};
  // Lost-connection banner
  const CONN = {
  "th": {
    "offTitle": "ขาดการเชื่อมต่อกับเซิร์ฟเวอร์ ออเดอร์ใหม่จะไม่แสดง",
    "offHelp": "ตรวจ Wi-Fi ของเครื่องนี้ และดูว่าคอมพิวเตอร์ที่รันเซิร์ฟเวอร์ยังเปิดอยู่ ระบบจะเชื่อมต่อใหม่เองเมื่อกลับมา",
    "lastOk": "อัปเดตล่าสุด {t}",
    "reconnected": "เชื่อมต่อกลับมาแล้ว",
    "noServerPub": "หน้าจอพนักงานออนไลน์ยังเชื่อมต่อไม่ได้ — ตรวจว่าคอมพิวเตอร์ที่ร้านเปิดเซิร์ฟเวอร์และ tunnel อยู่"
  },
  "en": {
    "offTitle": "Connection to the server lost — new orders will not appear",
    "offHelp": "Check this device’s Wi-Fi and that the server computer is on. It reconnects by itself.",
    "lastOk": "Last update {t}",
    "reconnected": "Reconnected",
    "noServerPub": "Online staff screen isn’t connected yet — check that the shop computer’s server and tunnel are running"
  }
};
  // Tables tab: running total per customer name
  const TABLES = {
  "th": {
    "tabTables": "โต๊ะ / ตามชื่อ",
    "noName": "(ไม่ระบุชื่อ)",
    "tablesEmpty": "วันนี้ยังไม่มีออเดอร์",
    "tableTotal": "รวมทั้งโต๊ะ",
    "tablesNote": "ยอดสะสมของแต่ละชื่อในวันขายนี้ (ตั้งแต่ 18:00 เมื่อวาน) ออเดอร์ชื่อเดียวกันที่โต๊ะเดียวกันรวมเป็นบรรทัดเดียว · ไม่นับออเดอร์ที่ยกเลิก"
  },
  "en": {
    "tabTables": "Tables / by name",
    "noName": "(no name)",
    "tablesEmpty": "No orders yet today",
    "tableTotal": "Table total",
    "tablesNote": "Running total per name for this sales day (since 18:00 yesterday). Every order under the same name at the same table adds up to one line · Cancelled orders are not counted"
  }
};
  Object.keys(MORE).forEach((k) => Object.assign(DICT[k], MORE[k], CONN[k], TABLES[k]));

  const WORKFLOW = {"th":{"colNew":"รับออเดอร์แล้ว","colPrep":"เสิร์ฟครบแล้ว","colDone":"ชำระเงินแล้ววันนี้","served":"เสิร์ฟครบแล้ว","stServed":"เสิร์ฟครบแล้ว","paid":"ชำระเงินแล้ว","emptyNew":"ไม่มีออเดอร์รอเสิร์ฟ","emptyPrep":"ไม่มีออเดอร์รอชำระเงิน","emptyDone":"ยังไม่มีรายการชำระเงินหรือยกเลิกวันนี้","doneSum":"ชำระเงินแล้ว {n} ออเดอร์ · {sum}","confirmPaid":"ยืนยันว่าได้รับเงิน {sum} สำหรับออเดอร์ #{n} โต๊ะ {t} แล้ว?","confirmReopen":"ย้อนสถานะออเดอร์ #{n} ที่ชำระเงินแล้ว?","note":"กรุณาออกจากระบบเมื่อใช้เสร็จ ต้องเข้าสู่ระบบใหม่เมื่อเปิดหน้านี้","totalSales":"ยอดสั่งรวม","collected":"ชำระแล้ว","outstanding":"ค้างชำระ","tablesEmpty":"ไม่มีออเดอร์ค้างชำระ","tableTotal":"ยอดค้างชำระ","tablesNote":"รวมออเดอร์ที่ยังไม่ชำระเงินของแต่ละชื่อและโต๊ะ รวมวันก่อนหน้า ไม่รวมออเดอร์ที่ยกเลิก","salesNote":"วันขายนับตั้งแต่ 18:00 เมื่อวานถึง 17:59 วันนี้ ยอดสั่งรวมไม่รวมรายการยกเลิก ยอดชำระแล้วและค้างชำระเป็นสถานะล่าสุดของออเดอร์ที่สั่งในวันนั้น"},"en":{"colNew":"Ordered","colPrep":"All served","colDone":"Bill completed today","served":"All served","stServed":"All served","paid":"Bill completed","emptyNew":"No orders waiting to be served","emptyPrep":"No served orders awaiting payment","emptyDone":"No completed bills or cancellations today","doneSum":"{n} bills completed · {sum}","confirmPaid":"Confirm payment of {sum} received for order #{n}, table {t}?","confirmReopen":"Reopen paid order #{n}?","note":"Sign out when finished. Opening this page requires a new sign-in.","totalSales":"Order value","collected":"Paid","outstanding":"Outstanding","tablesEmpty":"No unpaid orders","tableTotal":"Outstanding","tablesNote":"Unpaid orders grouped by name and table, including earlier days. Cancelled orders are excluded.","salesNote":"Business day: 18:00 the previous evening to 17:59. Order value excludes cancellations. Paid and outstanding show the current status of orders placed on the selected day."}};
  Object.keys(WORKFLOW).forEach(k => Object.assign(DICT[k], WORKFLOW[k]));
  // One bill per guest: served orders of the same table and name are added up (see "Bills" below).
  Object.assign(DICT.th, { billOrders: '{n} ออเดอร์', billTotal: 'รวมทั้งบิล', payOne: 'ชำระเฉพาะออเดอร์นี้',
    billWait: 'ยังไม่เสิร์ฟ: {list} · ยังไม่รวมในยอดนี้', moreOrder: 'สั่งเพิ่ม · เสิร์ฟไปแล้ว: {list}',
    confirmPaidBill: 'ยืนยันว่าได้รับเงิน {sum} สำหรับบิลโต๊ะ {t} · {who} แล้ว?\n{list}', confirmPaidWait: 'ยังมีออเดอร์ที่ยังไม่เสิร์ฟ (ไม่รวมในยอดนี้): {list}' });
  Object.assign(DICT.en, { billOrders: '{n} orders', billTotal: 'Bill total', payOne: 'Paid this one only',
    billWait: 'Not served yet: {list} · not in this total', moreOrder: 'Additional order · already served: {list}',
    confirmPaidBill: 'Confirm payment of {sum} received for the bill of table {t} · {who}?\n{list}', confirmPaidWait: 'Still not served (not in this total): {list}' });
  // Orders sent from the public website without a table QR code (the guest picked the table).
  Object.assign(DICT.th, { noQr: 'ไม่ได้สแกน QR · ยืนยันที่โต๊ะก่อน' });
  Object.assign(DICT.en, { noQr: 'No QR · confirm at table' });

  const LANG_NAMES = { th: 'Thai / ไทย', en: 'English', 'zh-Hans': 'Chinese', ja: 'Japanese', my: 'Burmese', id: 'Indonesian', ko: 'Korean', fr: 'French' };
  const LATE_MIN = 15; // waiting this long turns the ticket's timer red

  const $ = (s) => document.querySelector(s);
  const fmt = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k]);
  const clock = (ms) => new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const pref = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  let authenticated = false, authEpoch = 0, loginBusy = false;
  let last = null, seen = new Set(), firstRender = true, conn = 'demo', stopFeed = null;
  let groupByTable = pref.get('thl-staff-group', 'time') === 'table';

  // ---------- Sound ----------
  // Browsers only allow sound after someone has tapped the page, so the first tap anywhere unlocks it.
  let soundOn = pref.get('thl-staff-sound', 'on') === 'on';
  let audio = null;
  function unlockAudio() {
    if (!audio) { try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; } }
    if (audio.state === 'suspended') audio.resume();
    soundLabel();
  }
  const audioReady = () => audio && audio.state === 'running';
  function beep() {
    if (!soundOn || !audioReady()) return;
    [0, 0.18, 0.36].forEach((d, i) => {
      const o = audio.createOscillator(), g = audio.createGain();
      o.frequency.value = [880, 1175, 1568][i]; o.connect(g); g.connect(audio.destination);
      g.gain.setValueAtTime(0.0001, audio.currentTime + d);
      g.gain.exponentialRampToValueAtTime(0.35, audio.currentTime + d + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + d + 0.28);
      o.start(audio.currentTime + d); o.stop(audio.currentTime + d + 0.3);
    });
  }
  function soundLabel() {
    const btn = $('#soundBtn');
    const needsTap = soundOn && !audioReady();
    btn.textContent = needsTap ? t('soundTap') : soundOn ? t('soundOn') : t('soundOff');
    btn.classList.toggle('attention', needsTap);
  }
  document.addEventListener('pointerdown', unlockAudio, { capture: true });
  document.addEventListener('keydown', unlockAudio, { capture: true });
  $('#soundBtn').addEventListener('click', () => {
    if (soundOn && !audioReady()) { unlockAudio(); beep(); return; } // this tap only enables sound
    soundOn = !soundOn;
    pref.set('thl-staff-sound', soundOn ? 'on' : 'off');
    soundLabel();
    if (soundOn) beep();
  });

  // ---------- Status changes ----------
  async function setStatus(order, status) {
    if (!authenticated) return;
    const epoch = authEpoch;
    if (status === 'cancelled' && !confirm(fmt(t('confirmCancel'), { n: order.id, t: order.table }))) return;
    if (status === 'paid' && !confirm(fmt(t('confirmPaid'), { n: order.id, t: order.table, sum: baht(order.total) }))) return;
    if (order.status === 'paid' && !confirm(fmt(t('confirmReopen'), { n: order.id }))) return;
    const prev = { status: order.status, statusTime: order.statusTime };
    order.status = status; order.statusTime = Date.now(); // show it straight away
    render(last);
    try {
      await THL.post(`/api/orders/${order.id}/status`, { status, expectedStatus: prev.status });
    } catch (e) {
      if (!authenticated || epoch !== authEpoch) return;
      Object.assign(order, prev);
      render(last);
      if (e.status === 401) showLogin(t('expired')); else THL.toast(t('saveErr'));
    }
  }
  function action(label, cls, order, status) {
    const b = el('button', 'btn ' + cls, label);
    b.type = 'button';
    b.addEventListener('click', async () => { b.disabled = true; try { await setStatus(order, status); } finally { b.disabled = false; } });
    return b;
  }

  // ---------- Rendering ----------
  function age(ms) {
    const m = Math.floor((Date.now() - ms) / 60000);
    return m < 1 ? t('justNow') : fmt(t('mins'), { n: m });
  }

  // Menu number exactly as the guest sees it on menu.html (staff.html loads menu-data.js for this lookup only).
  const MENU_BY_ID = new Map(((window.THL_MENU || {}).items || []).map((m) => [m.id, m]));
  const menuNo = (id) => 'No. ' + (MENU_BY_ID.has(id) ? window.THL_MENU.numberOf(MENU_BY_ID.get(id)) : id);

  function ticket(o, isFresh) {
    const card = el('article', 'ticket s-' + o.status + (isFresh ? ' fresh' : ''));
    const head = el('div', 't-head');
    const meta = el('span', 't-meta', `#${o.id} · ${clock(o.time)}`);
    if (o.status === 'new' || o.status === 'served') {
      const a = el('span', Date.now() - o.time > LATE_MIN * 60000 ? 'late' : null, ` · ${age(o.time)}`);
      meta.append(a);
    } else {
      meta.append(` · ${o.status === 'paid' ? t('paid') : t('stCancelled')} ${clock(o.statusTime)}`);
    }
    const who = el('span', 't-who');
    who.append(el('span', 't-table', `${t('table')} ${o.table}`));
    if (o.customerName) who.append(el('span', 't-name', '👤 ' + o.customerName));
    if (o.qr === false) who.append(el('span', 't-noqr', t('noQr'))); // the guest picked the table on the page: check with them first
    head.append(who, meta);

    card.append(head, itemList(o));
    if (o.note) card.append(el('div', 't-note', '📝 ' + o.note));
    const bill = bills.get(billKey(o));
    if (o.status === 'new' && bill && bill.served.length) card.append(el('div', 't-more', '➕ ' + fmt(t('moreOrder'), { list: orderList(bill.served) })));
    if (o.status === 'served') waitNote(card, bill);

    const acts = el('div', 't-actions');
    if (o.status === 'new') {
      const foot = el('div', 't-foot');
      foot.append(el('span', 't-total', `${t('total')} ${baht(o.total)}`));
      if (o.lang && LANG_NAMES[o.lang]) foot.append(el('span', null, `${t('guest')}: ${LANG_NAMES[o.lang]}`));
      card.append(foot);
      acts.append(action('✓ ' + t('served'), 'act-served', o, 'served'), action('✕ ' + t('cancel'), 'act-cancel', o, 'cancelled'));
    } else if (o.status === 'served') {
      const foot = el('div', 't-foot');
      foot.append(el('span', 't-total', `${t('total')} ${baht(o.total)}`));
      if (o.lang && LANG_NAMES[o.lang]) foot.append(el('span', null, `${t('guest')}: ${LANG_NAMES[o.lang]}`));
      card.append(foot);
      acts.append(action('✓ ' + t('paid'), 'act-served', o, 'paid'), action('↩ ' + t('undo'), 'act-undo', o, 'new'));
    } else {
      acts.append(action('↩ ' + t('undo'), 'act-undo', o, o.status === 'paid' ? 'served' : 'new'));
    }
    card.append(acts);
    return card;
  }

  function itemList(o) {
    const ul = el('ul', 't-items');
    o.items.forEach((it) => {
      const li = el('li');
      const name = el('div');
      const th = el('span', 'th', it.nameTh || it.name);
      name.append(th);
      if (it.id) name.append(el('span', 'no', menuNo(it.id)));
      if (it.opt) name.append(el('span', 'opt', it.opt));
      const subs = [it.nameEn].filter(Boolean);
      if (!subs.length && it.name && it.name !== it.nameTh) subs.push(it.name); // orders saved before names were stored
      if (subs.length) name.append(el('span', 'sub', subs.join(' · ')));
      li.append(el('span', 'q', `${it.qty}×`), name);
      ul.append(li);
    });
    return ul;
  }

  // ---------- Bills: one card per guest once the food is out ----------
  // Orders are cooked and served one at a time (another table may order in between), but a guest who
  // orders again later pays once. Open orders of the same sales day, table and guest name therefore
  // share one bill. With no name they share one only when they came from the same phone visit
  // (o.visit, set by menu.js), so two unnamed parties at a table are never added together.
  const nameGroup = (o) => String(o.customerName || '').trim().replace(/\s+/g, ' ').toLowerCase();
  const billKey = (o) => `${THL.businessDay(o.time)}|${o.table}|${nameGroup(o) ? 'n:' + nameGroup(o) : o.visit ? 'v:' + o.visit : 'o:' + o.id}`;
  const orderList = (list) => list.map((o) => `#${o.id} ${baht(o.total)}`).join(' + ');
  let bills = new Map(); // billKey → { served: [orders], waiting: [orders] }, oldest first
  function groupBills(orders) {
    const map = new Map();
    orders.filter((o) => o.status === 'new' || o.status === 'served').sort((a, b) => a.time - b.time).forEach((o) => {
      const k = billKey(o);
      if (!map.has(k)) map.set(k, { served: [], waiting: [] });
      map.get(k)[o.status === 'served' ? 'served' : 'waiting'].push(o);
    });
    return map;
  }
  // Shown on a bill while the same guest still has food coming, so it is not closed short.
  function waitNote(card, bill) {
    if (bill && bill.waiting.length) card.append(el('div', 't-wait', '⏳ ' + fmt(t('billWait'), { list: orderList(bill.waiting) })));
  }

  // "Bill completed" for a whole bill: every served order on it is marked paid, after one question.
  async function payBill(bill) {
    if (!authenticated) return;
    const epoch = authEpoch, list = bill.served.filter((o) => o.status === 'served');
    if (!list.length) return;
    let ask = fmt(t('confirmPaidBill'), { sum: baht(list.reduce((s, o) => s + o.total, 0)), t: list[0].table, who: list[0].customerName || t('noName'), list: orderList(list) });
    if (bill.waiting.length) ask += '\n\n' + fmt(t('confirmPaidWait'), { list: orderList(bill.waiting) });
    if (!confirm(ask)) return;
    const before = list.map((o) => ({ o, status: o.status, statusTime: o.statusTime }));
    before.forEach(({ o }) => { o.status = 'paid'; o.statusTime = Date.now(); }); // show it straight away
    render(last);
    for (const b of before) {
      try {
        await THL.post(`/api/orders/${b.o.id}/status`, { status: 'paid', expectedStatus: b.status });
      } catch (e) {
        if (!authenticated || epoch !== authEpoch) return;
        b.o.status = b.status; b.o.statusTime = b.statusTime;
        render(last);
        if (e.status === 401) { showLogin(t('expired')); return; }
        THL.toast(t('saveErr'));
      }
    }
  }

  // A guest's served orders as one bill: each order keeps its own lines and sub-total, then the sum.
  // One order on its own looks like any other ticket.
  function billCard(bill, fresh) {
    const orders = bill.served, first = orders[0];
    if (orders.length === 1) return ticket(first, fresh.has(first.id));
    const total = orders.reduce((s, o) => s + o.total, 0);
    const card = el('article', 'ticket s-served bill');
    const head = el('div', 't-head');
    const who = el('span', 't-who');
    who.append(el('span', 't-table', `${t('table')} ${first.table}`));
    if (first.customerName) who.append(el('span', 't-name', '👤 ' + first.customerName));
    if (orders.some((o) => o.qr === false)) who.append(el('span', 't-noqr', t('noQr')));
    const from = clock(first.time), to = clock(orders[orders.length - 1].time);
    head.append(who, el('span', 't-meta', `${fmt(t('billOrders'), { n: orders.length })} · ${from === to ? from : `${from}–${to}`}`));
    card.append(head);
    orders.forEach((o) => {
      const part = el('div', 'b-order');
      const line = el('div', 'b-head');
      line.append(el('span', null, `#${o.id} · ${clock(o.time)}`), el('b', null, baht(o.total)));
      part.append(line, itemList(o));
      if (o.note) part.append(el('div', 't-note', '📝 ' + o.note));
      const acts = el('div', 't-actions');
      acts.append(action('✓ ' + t('payOne'), 'act-undo', o, 'paid'), action('↩ ' + t('undo'), 'act-undo', o, 'new'));
      part.append(acts);
      card.append(part);
    });
    waitNote(card, bill);
    const foot = el('div', 't-foot');
    foot.append(el('span', 't-total', `${t('billTotal')} ${baht(total)}`));
    if (first.lang && LANG_NAMES[first.lang]) foot.append(el('span', null, `${t('guest')}: ${LANG_NAMES[first.lang]}`));
    const pay = el('button', 'btn act-served', `✓ ${t('paid')} · ${fmt(t('billOrders'), { n: orders.length })} ${baht(total)}`);
    pay.type = 'button';
    pay.addEventListener('click', async () => { pay.disabled = true; try { await payBill(bill); } finally { pay.disabled = false; } });
    const acts = el('div', 't-actions t-pay');
    acts.append(pay);
    card.append(foot, acts);
    return card;
  }

  function fillBills(listEl, list, fresh) {
    listEl.textContent = '';
    if (!list.length) { listEl.append(el('div', 'empty', t('emptyPrep'))); return; }
    let lastTable = null;
    list.forEach((bill) => {
      const tableNo = bill.served[0].table;
      if (groupByTable && tableNo !== lastTable) { listEl.append(el('div', 'group', `${t('table')} ${tableNo}`)); lastTable = tableNo; }
      listEl.append(billCard(bill, fresh));
    });
  }

  function fill(listEl, orders, emptyKey, fresh) {
    listEl.textContent = '';
    if (!orders.length) { listEl.append(el('div', 'empty', t(emptyKey))); return; }
    let lastTable = null;
    orders.forEach((o) => {
      if (groupByTable && o.table !== lastTable) { listEl.append(el('div', 'group', `${t('table')} ${o.table}`)); lastTable = o.table; }
      listEl.append(ticket(o, fresh.has(o.id)));
    });
  }

  function render(state) {
    if (!authenticated || !state) return;
    last = state;
    const orders = state.orders || [];
    const fresh = new Set();
    orders.forEach((o) => {
      if (seen.has(o.id)) return;
      seen.add(o.id);
      if (!firstRender && o.status === 'new') fresh.add(o.id);
    });

    // "Today" = the current business day (18:00 → 17:59 Bangkok time), the same day the Sales tab uses:
    // an order belongs to the day it was placed in, so this column and the Sales figures always agree.
    const today = THL.businessDay(Date.now());
    const byTableThen = (key) => (a, b) => (groupByTable ? a.table - b.table : 0) || key(a, b);
    const oldestFirst = byTableThen((a, b) => a.time - b.time);
    const newestFirst = byTableThen((a, b) => b.statusTime - a.statusTime);
    const newOnes = orders.filter((o) => o.status === 'new').sort(oldestFirst);
    bills = groupBills(orders);
    const prep = [...bills.values()].filter((bill) => bill.served.length).sort((a, b) => oldestFirst(a.served[0], b.served[0]));
    const done = orders.filter((o) => (o.status === 'paid' || o.status === 'cancelled') && THL.businessDay(o.statusTime) === today).sort(newestFirst);

    fill($('#newList'), newOnes, 'emptyNew', fresh);
    fillBills($('#prepList'), prep, fresh);
    fill($('#doneList'), done, 'emptyDone', fresh);
    $('#newCount').textContent = newOnes.length;
    $('#prepCount').textContent = prep.length;
    $('#doneCount').textContent = done.length;
    const served = done.filter((o) => o.status === 'paid');
    $('#doneSum').textContent = served.length ? fmt(t('doneSum'), { n: served.length, sum: baht(served.reduce((s, o) => s + o.total, 0)) }) : '';
    $('#tabBadge').textContent = newOnes.length || '';
    document.title = (newOnes.length ? `(${newOnes.length}) ` : '') + 'Thong Heng Lee Staff';
    if (tab === 'sales' && salesDate === THL.businessDay(Date.now())) loadSales(); // today's figures stay live
    if (tab === 'tables') renderTables();

    if (fresh.size) {
      beep();
      fresh.forEach((id) => { const o = orders.find((x) => x.id === id); THL.toast(fmt(t('newOrder'), { t: o.table })); });
    }
    firstRender = false;
  }

  // A dropped connection must be impossible to miss: after OFFLINE_BANNER_MS without contact
  // a red banner stays on screen until the server answers again.
  const OFFLINE_BANNER_MS = 10000;
  let offlineSince = null, lastOk = null, bannerShown = false;
  function setConn(s) {
    const was = conn;
    conn = s;
    $('#status').className = 'status ' + s;
    $('#statusText').textContent = t(s);
    if (s === 'offline') { if (offlineSince === null) offlineSince = Date.now(); }
    else {
      offlineSince = null;
      if (s === 'live' || s === 'demo') lastOk = Date.now();
      if (bannerShown && s === 'live' && was !== 'live') THL.toast('✓ ' + t('reconnected'));
    }
    if (s === 'auth') showLogin(t('expired'));
    renderBanner();
  }
  function renderBanner() {
    const show = offlineSince !== null && Date.now() - offlineSince >= OFFLINE_BANNER_MS;
    const box = $('#connBanner');
    box.hidden = !show;
    document.body.classList.toggle('conn-lost', show);
    if (show) {
      box.textContent = '';
      box.append(el('strong', null, '⚠ ' + t('offTitle')), el('span', null, t('offHelp')));
      if (lastOk) box.append(el('span', 'last', fmt(t('lastOk'), { t: new Date(lastOk).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) })));
    }
    bannerShown = show;
  }
  setInterval(renderBanner, 1000);

  function setGrouping(byTable) {
    groupByTable = byTable;
    pref.set('thl-staff-group', byTable ? 'table' : 'time');
    $('#byTime').setAttribute('aria-pressed', String(!byTable));
    $('#byTable').setAttribute('aria-pressed', String(byTable));
    render(last);
  }
  $('#byTime').addEventListener('click', () => setGrouping(false));
  $('#byTable').addEventListener('click', () => setGrouping(true));

  // ---------- Tabs ----------
  const TABS = { kitchen: ['#tabKitchen', '#panelKitchen'], tables: ['#tabTables', '#panelTables'], sales: ['#tabSales', '#panelSales'] };
  let tab = TABS[pref.get('thl-staff-tab', 'kitchen')] ? pref.get('thl-staff-tab', 'kitchen') : 'kitchen';
  function showTab(name) {
    tab = name;
    pref.set('thl-staff-tab', name);
    Object.entries(TABS).forEach(([key, [btn, panel]]) => {
      $(btn).setAttribute('aria-selected', String(key === name));
      $(panel).hidden = key !== name;
    });
    if (name === 'sales') loadSales();
    if (name === 'tables') renderTables();
  }
  Object.entries(TABS).forEach(([key, [btn]]) => $(btn).addEventListener('click', () => showTab(key)));

  // ---------- Tables tab: running total per customer name ----------
  // For each table, this business day's orders grouped by the name the guests typed, so staff can
  // answer "how much does Somchai owe?" at a glance — several orders under one name add up to one line.
  // Names match ignoring case and extra spaces. Cancelled orders don't count. Staff-only view.
  function renderTables() {
    if (!authenticated) return;
    const body = $('#tablesBody');
    body.textContent = '';
    const today = THL.businessDay(Date.now());
    const orders = ((last && last.orders) || []).filter((o) => o.status === 'new' || o.status === 'served');
    if (!orders.length) { body.append(el('p', 'empty', t('tablesEmpty'))); return; }
    const byTable = new Map(); // table → Map(name key → { name, orders, total, open, first, lastTime })
    orders.slice().sort((a, b) => a.time - b.time).forEach((o) => {
      if (!byTable.has(o.table)) byTable.set(o.table, new Map());
      const groups = byTable.get(o.table), k = nameGroup(o);
      if (!groups.has(k)) groups.set(k, { name: String(o.customerName || '').trim(), orders: [], total: 0, open: 0, first: o.time, lastTime: o.time });
      const g = groups.get(k);
      g.orders.push(o); g.total += o.total; g.lastTime = o.time;
      if (o.status === 'new') g.open++;
    });
    const grid = el('div', 'tables-grid');
    [...byTable.entries()].sort((a, b) => a[0] - b[0]).forEach(([tableNo, groups]) => {
      const list = [...groups.values()].sort((a, b) => b.lastTime - a.lastTime); // most recent party first
      const card = el('section', 'table-card');
      const head = el('div', 'tc-head');
      head.append(el('h3', null, `${t('table')} ${tableNo}`), el('span', 'tc-total', `${t('tableTotal')} ${baht(list.reduce((s, g) => s + g.total, 0))}`));
      card.append(head);
      list.forEach((g) => {
        const row = el('div', 'tc-row' + (g.name ? '' : ' no-name'));
        const info = el('div', 'tc-who');
        info.append(el('strong', null, g.name || t('noName')));
        const from = clock(g.first), to = clock(g.lastTime);
        const times = from === to ? from : `${from}–${to}`;
        info.append(el('span', 'tc-meta', `${g.orders.map((o) => `#${o.id} ${baht(o.total)}`).join(' + ')} · ${times}`));
        if (g.open) info.append(el('span', 'tc-open', fmt(t('openLine'), { n: g.open })));
        row.append(info, el('span', 'tc-amt', baht(g.total)));
        card.append(row);
      });
      grid.append(card);
    });
    body.append(grid);
  }

  // ---------- Sales (売上集計) ----------
  // Dates are business days ('YYYY-MM-DD', see THL.businessDay); plain calendar maths in UTC.
  const todayKey = () => THL.businessDay(Date.now());
  const shiftDay = (key, n) => { const [y, m, d] = key.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };
  const niceDate = (key) => { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(THL.lang, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }); };
  const yen = (thb) => (Math.round(thb * THL.SITE.jpyPerThb / 10) * 10).toLocaleString('ja-JP');
  let salesDate = todayKey();
  let sales = null, salesSeq = 0;

  async function loadSales() {
    if (!authenticated) return;
    const epoch = authEpoch;
    if (!THL.LIVE) { $('#salesBody').textContent = ''; $('#salesBody').append(el('p', 'empty', t('salesDemo'))); return; }
    if (!THL.hasToken()) return; // not signed in yet
    const seq = ++salesSeq;
    try {
      const data = await THL.getSales(salesDate);
      if (!authenticated || epoch !== authEpoch || seq !== salesSeq) return; // a newer date was picked meanwhile
      sales = data;
      renderSales();
    } catch (e) {
      if (!authenticated || epoch !== authEpoch || seq !== salesSeq) return;
      if (e.status === 401) return showLogin(t('expired'));
      $('#salesBody').textContent = '';
      $('#salesBody').append(el('p', 'empty', t('salesErr')));
    }
  }
  function setSalesDate(key) {
    const today = todayKey();
    salesDate = key > today ? today : key;
    renderDateBar();
    loadSales();
  }
  function renderDateBar() {
    const today = todayKey();
    $('#salesDate').value = salesDate;
    $('#salesDate').max = today;
    $('#nextDay').disabled = salesDate >= today;
    $('#todayBtn').disabled = salesDate === today;
  }
  $('#prevDay').addEventListener('click', () => setSalesDate(shiftDay(salesDate, -1)));
  $('#nextDay').addEventListener('click', () => setSalesDate(shiftDay(salesDate, 1)));
  $('#todayBtn').addEventListener('click', () => setSalesDate(todayKey()));
  $('#salesDate').addEventListener('change', (e) => { if (e.target.value) setSalesDate(e.target.value); });

  function kpi(label, value, subs, keyColor, small) {
    const box = el('div', 'kpi');
    const lab = el('div', 'label');
    if (keyColor) { const k = el('span', 'key'); k.style.background = keyColor; lab.append(k); }
    lab.append(label);
    box.append(lab, el('div', 'value' + (small ? ' small' : ''), value));
    subs.filter(Boolean).forEach((line) => box.append(el('div', 'sub', line)));
    return box;
  }
  function leaderboard(title, list, cls) {
    const card = el('div', 'card-s ' + cls);
    card.append(el('h3', null, title));
    if (!list.length) { card.append(el('p', 'muted', t('noneYet'))); return card; }
    const ol = el('ol', 'board-top');
    const max = list[0].qty;
    list.forEach((d, i) => {
      const li = el('li');
      const img = el('img'); img.src = `assets/images/menu/${d.id}.jpg`; img.alt = ''; img.loading = 'lazy';
      THL.imgFallback(img);
      const info = el('div');
      info.append(el('div', 'nm', d.nameTh));
      const sub = d.nameEn;
      if (sub) info.append(el('div', 'en', sub));
      const bar = el('div', 'bar');
      const fill = el('i'); fill.style.width = Math.max(4, Math.round((d.qty / max) * 70)) + '%';
      const label = fmt(t('sold'), { n: d.qty, sum: baht(d.revenue) });
      bar.title = `${d.nameTh}: ${label}`;
      bar.append(fill, el('b', null, label));
      info.append(bar);
      li.append(el('span', 'medal', ['🥇', '🥈', '🥉'][i]), img, info);
      ol.append(li);
    });
    card.append(ol);
    return card;
  }

  function renderSales() {
    if (!authenticated) return;
    const body = $('#salesBody');
    body.textContent = '';
    renderRecent();
    if (!sales) return;
    if (!sales.orders && !sales.cancelled.count) { body.append(el('p', 'empty', fmt(t('noSales'), { d: niceDate(sales.date) }))); return; }
    const grid = el('div', 'sales-grid');
    const pct = (n) => (sales.total ? Math.round((n / sales.total) * 100) : 0);

    // Headline: total, then food vs drinks
    const hero = el('div', 'card-s wide');
    const row = el('div', 'hero');
    row.append(
      kpi(`${t('totalSales')} · ${niceDate(sales.date)}`, baht(sales.total),
        [fmt(t('ordersLine'), { n: sales.orders }) + (sales.open ? ' · ' + fmt(t('openLine'), { n: sales.open }) : '')]),
      kpi(t('food'), baht(sales.food.total), [fmt(t('qtyLine'), { n: sales.food.qty, p: pct(sales.food.total) })], 'var(--food)', true),
      kpi(t('drinks'), baht(sales.drinks.total), [fmt(t('qtyLine'), { n: sales.drinks.qty, p: pct(sales.drinks.total) })], 'var(--drink)', true));
    row.append(kpi(t('collected'), baht(sales.collected || 0), []), kpi(t('outstanding'), baht(sales.outstanding || 0), []));
    hero.append(row);
    if (sales.total) {
      const split = el('div', 'split');
      split.setAttribute('role', 'img');
      split.setAttribute('aria-label', `${t('food')} ${pct(sales.food.total)}%, ${t('drinks')} ${pct(sales.drinks.total)}%`);
      [['f', sales.food.total, t('food')], ['d', sales.drinks.total, t('drinks')]].forEach(([c, v, name]) => {
        if (!v) return;
        const seg = el('span', c); seg.style.flex = String(v); seg.title = `${name}: ${baht(v)} (${pct(v)}%)`;
        split.append(seg);
      });
      hero.append(split);
    }
    grid.append(hero);

    grid.append(leaderboard(t('topFood'), sales.topFood, 'top-food'), leaderboard(t('topDrinks'), sales.topDrinks, 'top-drink'));

    // Category table
    const cat = el('div', 'card-s wide');
    cat.append(el('h3', null, t('byCat')));
    const table = el('table', 'cat-table');
    const thead = el('thead'); const hr = el('tr');
    hr.append(el('th', null, t('colCat')), el('th', 'num', t('colQty')), el('th', 'num', t('colSales')), el('th', 'num', '%'));
    thead.append(hr);
    const tbody = el('tbody');
    sales.categories.forEach((c) => {
      const tr = el('tr');
      const name = el('td');
      const k = el('span', 'key'); k.style.cssText = `display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:8px;background:var(${c.drink ? '--drink' : '--food'})`;
      name.append(k, THL.pick(c.name));
      tr.append(name, el('td', 'num', String(c.qty)), el('td', 'num', baht(c.total)), el('td', 'num', pct(c.total) + '%'));
      tbody.append(tr);
    });
    const tfoot = el('tfoot'); const fr = el('tr');
    fr.append(el('td', null, t('sum')), el('td', 'num', String(sales.food.qty + sales.drinks.qty)), el('td', 'num', baht(sales.total)), el('td', 'num', sales.total ? '100%' : '–'));
    tfoot.append(fr);
    table.append(thead, tbody, tfoot);
    cat.append(table);
    if (sales.cancelled.count) cat.append(el('p', 'sales-note', fmt(t('cancelledLine'), { n: sales.cancelled.count, sum: baht(sales.cancelled.total) })));
    cat.append(el('p', 'sales-note', t('salesNote')));
    grid.append(cat);
    body.append(grid);
  }
  function renderRecent() {
    const box = $('#recentDays');
    box.textContent = '';
    const days = (sales && sales.days) || [];
    if (!days.length) return;
    box.append(t('recent'));
    days.slice(0, 7).forEach((d) => {
      const b = el('button', null, niceDate(d));
      b.type = 'button';
      b.setAttribute('aria-pressed', String(d === salesDate));
      b.addEventListener('click', () => setSalesDate(d));
      box.append(b);
    });
  }

  // ---------- Sign-in: no private content before server verification ----------
  const loginSheet = $('#loginSheet');
  const staffContent = $('#staffContent');
  function openLoginDialog() {
    loginSheet.hidden = false;
    // HTML already has a visible non-modal fallback, even if scripts fail to load.
    // Upgrade it to a modal where supported, without depending on that API for privacy.
    try {
      if (loginSheet.open && loginSheet.dataset.authFallback === 'true') return;
      if (loginSheet.open && loginSheet.matches(':modal')) return;
      if (loginSheet.open) loginSheet.close();
      loginSheet.showModal();
    } catch (e) { loginSheet.dataset.authFallback = 'true'; loginSheet.setAttribute('open', ''); }
  }
  loginSheet.addEventListener('cancel', (e) => e.preventDefault());
  loginSheet.addEventListener('close', () => { if (!authenticated) openLoginDialog(); });

  function lockContent() {
    authenticated = false; authEpoch++; loginBusy = false;
    staffContent.hidden = true;
    staffContent.setAttribute('inert', '');
    document.body.classList.add('locked');
    if (stopFeed) { stopFeed(); stopFeed = null; }
    last = null; sales = null; salesSeq++;
    seen.clear(); firstRender = true;
    ['#newList', '#prepList', '#doneList', '#tablesBody', '#salesBody', '#recentDays', '#doneSum', '#tabBadge'].forEach((s) => { $(s).textContent = ''; });
    ['#newCount', '#prepCount', '#doneCount'].forEach((s) => { $(s).textContent = '0'; });
    document.title = 'Thong Heng Lee Staff';
    conn = 'auth'; offlineSince = null; lastOk = null; bannerShown = false;
    $('#connBanner').hidden = true;
    document.body.classList.remove('conn-lost');
    $('#pw').value = '';
    $('#loginBtn').disabled = !THL.LIVE;
  }
  function showLogin(message) {
    lockContent();
    THL.forgetStaffToken();
    $('#loginErr').textContent = message || (THL.LIVE ? '' : t('noServer'));
    openLoginDialog();
    ($('#user').value ? $('#pw') : $('#user')).focus();
  }
  function startFeed(state, epoch) {
    if (epoch !== authEpoch) return;
    // Called only after password validation AND a successful protected state request.
    if (!state || !Array.isArray(state.orders)) throw new Error('invalid staff state');
    authenticated = true;
    firstRender = true;
    render(state);
    setConn('live');
    staffContent.hidden = false;
    staffContent.removeAttribute('inert');
    document.body.classList.remove('locked');
    if (loginSheet.open && typeof loginSheet.close === 'function') loginSheet.close();
    loginSheet.removeAttribute('open');
    loginSheet.hidden = true;
    if (stopFeed) stopFeed();
    stopFeed = THL.subscribe(
      (next) => { if (authenticated && epoch === authEpoch) render(next); },
      (status) => { if (authenticated && epoch === authEpoch) setConn(status); }
    );
  }
  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (loginBusy || !THL.LIVE) return;
    loginBusy = true;
    const epoch = authEpoch;
    const btn = $('#loginBtn');
    btn.disabled = true;
    $('#loginErr').textContent = '';
    try {
      await THL.login($('#user').value.trim(), $('#pw').value);
      if (epoch !== authEpoch) return;
      const state = await THL.getStaffState();
      if (epoch !== authEpoch) return;
      startFeed(state, epoch);
      $('#pw').value = '';
    } catch (err) {
      if (epoch !== authEpoch) return;
      showLogin(err.status === 401 ? t('wrongPw') : err.status === 429 ? t('tooMany') : t(THL.PUBLIC ? 'noServerPub' : 'noServer'));
    } finally {
      if (epoch === authEpoch) { loginBusy = false; btn.disabled = !THL.LIVE; }
    }
  });
  $('#logoutBtn').addEventListener('click', () => {
    // Capture/revoke the token, but never wait for a network reply before hiding orders.
    const request = THL.logout();
    showLogin();
    void request;
  });
  window.addEventListener('pagehide', () => {
    lockContent(); THL.forgetStaffToken();
    loginSheet.hidden = false;
    loginSheet.setAttribute('open', '');
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted) showLogin(); });

  // ---------- Start ----------
  THL.init(DICT, { languages: ['th', 'en'], storageKey: 'thl-staff-lang' });
  renderDateBar();
  showTab(tab);
  THL.onLang(() => { $('#statusText').textContent = t(conn); soundLabel(); render(last); renderSales(); if (tab === 'tables') renderTables(); });
  setGrouping(groupByTable);
  soundLabel();
  setInterval(() => render(last), 30000); // keep "x min" timers current
  $('#logoutBtn').hidden = !THL.LIVE;
  showLogin(); // Require explicit sign-in on every visit, reload and restored page.
})();
