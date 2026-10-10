/* Menu & table ordering page: cards, cart, kitchen note, send to kitchen. */
(function () {
  'use strict';
  const { t, pick, money, toast, imgFallback } = THL;
  const MENU = window.THL_MENU;
  const byId = Object.fromEntries(MENU.items.map((it) => [it.id, it]));
  const $ = (s) => document.querySelector(s);
  const fmt = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);

  const DICT = {
    th: {
      title: 'เมนูอาหาร', sample: 'ราคาในหน้านี้เป็นราคาตัวอย่างสำหรับทดสอบ',
      myOrder: 'รายการของฉัน', keepBrowsing: 'เลือกเพิ่ม', send: 'ส่งออเดอร์เข้าครัว',
      placeOrder: 'สั่งอาหาร', note: 'หมายเหตุถึงครัว', notePh: 'เช่น ไม่เผ็ด ไม่ใส่ผัก',
      viewPhoto: 'ดูรูป', addShort: '+ สั่ง', add: '+ เพิ่มในรายการ',
      table: 'โต๊ะ', noTable: 'เลือกโต๊ะ', pickTable: 'คุณนั่งโต๊ะหมายเลขอะไร?', pickTableHint: 'ดูหมายเลขได้ที่ป้ายบนโต๊ะ',
      added: 'เพิ่มแล้ว: {name}', emptyCart: 'ยังไม่ได้เลือกอาหาร กด “+ สั่ง” ที่เมนูที่ต้องการ', total: 'รวม',
      eggFried: 'ไข่ดาว', eggOmelette: 'ไข่เจียว',
      sentTitle: 'ส่งเข้าครัวแล้ว', sentTotal: 'ยอดที่สั่งไปแล้ว',
      orderOkTitle: 'ส่งออเดอร์แล้ว!', orderOkText: 'ครัวได้รับออเดอร์ของโต๊ะ {t} แล้ว กรุณารอสักครู่', orderNo: 'ออเดอร์ #{n}', ok: 'ตกลง',
      sending: 'กำลังส่ง…', retrySend: 'ลองส่งอีกครั้ง',
      errNetTitle: 'ไม่ได้เชื่อมต่อ Wi-Fi ของร้าน', errNet: 'โทรศัพท์ของคุณไม่ได้ต่อ Wi-Fi ของร้าน หรือสัญญาณหลุด ออเดอร์จึงยังไม่ถูกส่ง รายการที่เลือกยังอยู่ครบ ตรวจ Wi-Fi แล้วกด “ลองส่งอีกครั้ง”',
      errTimeoutTitle: 'ระบบร้านตอบช้า', errTimeout: 'ส่งออเดอร์ไปแล้วแต่ยังไม่ได้รับคำตอบ ออเดอร์อาจถึงครัวแล้วหรือยังก็ได้ กด “ลองส่งอีกครั้ง” ได้เลย ระบบจะไม่ส่งซ้ำ',
      errServerTitle: 'ระบบร้านรับออเดอร์ไม่ได้', errServer: 'ระบบร้านแจ้งข้อผิดพลาด (รหัส {code}) ออเดอร์ยังไม่ถูกส่ง ลองอีกครั้ง หรือแสดงหน้าจอนี้ให้พนักงานดู',
      backOnline: 'เชื่อมต่อได้แล้ว กด “ลองส่งอีกครั้ง” เพื่อส่งออเดอร์',
      stNew: 'ได้รับแล้ว', stPreparing: 'กำลังทำ', stServed: 'เสิร์ฟแล้ว', stCancelled: 'ยกเลิกแล้ว',
      cancelledHint: 'ออเดอร์นี้ถูกยกเลิก ไม่รวมในยอด',
      demo: 'โหมดทดลอง: ข้อมูลบันทึกในเบราว์เซอร์นี้เท่านั้น',
      nameLabel: 'ชื่อของคุณ (ไม่บังคับ)', namePh: 'เช่น สมชาย', nameHint: 'ถ้านั่งโต๊ะเดียวกับอีกกลุ่ม ให้แต่ละกลุ่มใส่ชื่อของตัวเอง พนักงานจะแยกรายการได้ถูก',
      cancel: 'ยกเลิก', needTable: 'เลือกโต๊ะก่อน จึงจะส่งออเดอร์ได้', tableExpired: 'ผ่านไปเกิน 1 ชั่วโมงแล้ว กรุณาเลือกโต๊ะอีกครั้ง',
    },
    en: {
      title: 'Menu', sample: 'Sample prices — for preview only.',
      myOrder: 'My order', keepBrowsing: 'Keep browsing', send: 'Send order to kitchen',
      placeOrder: 'Place order', note: 'Note for the kitchen', notePh: 'e.g. not spicy, no vegetables',
      viewPhoto: 'Photo', addShort: '+ Add', add: '+ Add to order',
      table: 'Table', noTable: 'Choose table', pickTable: 'Which table are you at?', pickTableHint: 'The number is on the sign on your table.',
      added: 'Added: {name}', emptyCart: 'Nothing added yet — tap “+ Add” on a dish.', total: 'Total',
      eggFried: 'Fried egg', eggOmelette: 'Omelette',
      sentTitle: 'Already sent to the kitchen', sentTotal: 'Ordered so far',
      orderOkTitle: 'Order sent!', orderOkText: 'The kitchen has received the order for table {t}. Please wait a moment.', orderNo: 'Order #{n}', ok: 'OK',
      sending: 'Sending…', retrySend: 'Try sending again',
      errNetTitle: 'Not connected to the restaurant Wi-Fi', errNet: 'Your phone isn’t connected to the restaurant Wi-Fi (or the signal dropped), so the order was not sent. Your items are still here — check the Wi-Fi, then tap “Try sending again”.',
      errTimeoutTitle: 'The restaurant system is slow to respond', errTimeout: 'We sent your order but got no reply, so it may or may not have reached the kitchen. Tap “Try sending again” — it won’t be sent twice.',
      errServerTitle: 'The restaurant system couldn’t accept the order', errServer: 'The system returned an error (code {code}) and the order was not sent. Try again, or show this screen to a staff member.',
      backOnline: 'You’re connected again — tap “Try sending again” to send your order.',
      stNew: 'Received', stPreparing: 'Preparing', stServed: 'Served', stCancelled: 'Cancelled',
      cancelledHint: 'This order was cancelled and isn’t counted in the total.',
      demo: 'Demo mode: saved in this browser only. Run server.js to reach the staff screen over Wi-Fi.',
      nameLabel: 'Your name (optional)', namePh: 'e.g. Somchai', nameHint: 'Sharing the table with another group? Each group uses its own name so the staff can keep the orders apart.',
      cancel: 'Cancel', needTable: 'Choose your table to send an order', tableExpired: 'It’s been over an hour — please choose your table again.',
    },
    'zh-Hans': {
      title: '菜单', sample: '本页价格为预览用示范价格。',
      myOrder: '我的点单', keepBrowsing: '继续点餐', send: '发送订单到厨房',
      placeOrder: '下单', note: '给厨房的备注', notePh: '例如：不要辣、不要蔬菜',
      viewPhoto: '看照片', addShort: '+ 加点', add: '+ 加入点单',
      table: '桌号', noTable: '选择桌号', pickTable: '请问您坐几号桌？', pickTableHint: '桌号标示在桌上的牌子。',
      added: '已加入：{name}', emptyCart: '尚未加入餐点，请点选餐点上的“+ 加点”。', total: '合计',
      eggFried: '荷包蛋', eggOmelette: '泰式煎蛋',
      sentTitle: '已送到厨房', sentTotal: '目前已点金额',
      orderOkTitle: '订单已送出！', orderOkText: '厨房已收到 {t} 号桌的订单，请稍候。', orderNo: '单号 #{n}', ok: '好',
      sending: '正在发送…', retrySend: '重新发送',
      errNetTitle: '未连接餐厅 Wi-Fi', errNet: '您的手机未连接餐厅 Wi-Fi（或信号中断），订单尚未发送。已选的餐点都还在，请检查 Wi-Fi 后点“重新发送”。',
      errTimeoutTitle: '餐厅系统响应较慢', errTimeout: '订单已发出但没有收到回复，可能已到达厨房，也可能没有。请点“重新发送”——不会重复下单。',
      errServerTitle: '餐厅系统无法接收订单', errServer: '系统返回错误（代码 {code}），订单尚未发送。请重试，或把此画面给服务员看。',
      backOnline: '已重新连接，请点“重新发送”提交订单。',
      stNew: '已接收', stPreparing: '制作中', stServed: '已上菜', stCancelled: '已取消',
      cancelledHint: '此订单已取消，不计入金额。',
      demo: '演示模式：数据仅保存在此浏览器。',
      nameLabel: '您的姓名（选填）', namePh: '例如：小王', nameHint: '如果和其他客人同桌，请每组填写各自的姓名，方便店员区分订单。',
      cancel: '取消', needTable: '请先选择桌号才能下单', tableExpired: '已超过 1 小时，请重新选择桌号。',
    },
    ja: {
      title: 'メニュー', sample: '表示価格はプレビュー用のサンプルです。',
      myOrder: 'ご注文', keepBrowsing: 'メニューに戻る', send: 'キッチンに注文を送る',
      placeOrder: '注文する', note: 'キッチンへのメモ', notePh: '例：辛さ控えめ、野菜抜き',
      viewPhoto: '写真', addShort: '+ 追加', add: '+ 注文に追加',
      table: 'テーブル', noTable: 'テーブルを選択', pickTable: 'テーブル番号を選んでください', pickTableHint: 'テーブルの札に番号があります。',
      added: '追加しました：{name}', emptyCart: 'まだ何も選ばれていません。料理の「+ 追加」をタップしてください。', total: '合計',
      eggFried: '目玉焼き', eggOmelette: 'オムレツ',
      sentTitle: 'キッチンに送信済み', sentTotal: 'これまでの合計',
      orderOkTitle: '注文を送りました！', orderOkText: 'テーブル{t}のご注文をキッチンが受け付けました。少々お待ちください。', orderNo: '注文番号 #{n}', ok: 'OK',
      sending: '送信中…', retrySend: 'もう一度送信',
      errNetTitle: 'お店のWi-Fiにつながっていません', errNet: 'スマートフォンがお店のWi-Fiにつながっていない（または電波が途切れた）ため、注文は送信されていません。選んだ料理はそのまま残っています。Wi-Fiを確認して「もう一度送信」を押してください。',
      errTimeoutTitle: 'お店のシステムの応答が遅れています', errTimeout: '注文を送りましたが応答がありません。キッチンに届いているかどうか分かりません。「もう一度送信」を押してください。二重に注文されることはありません。',
      errServerTitle: 'お店のシステムが注文を受け付けられませんでした', errServer: 'エラーが返されました（コード {code}）。注文は送信されていません。もう一度お試しいただくか、この画面をスタッフにお見せください。',
      backOnline: '接続が戻りました。「もう一度送信」を押して注文してください。',
      stNew: '受付済み', stPreparing: '調理中', stServed: '提供済み', stCancelled: '取消済み',
      cancelledHint: 'この注文は取り消されました。合計には含まれません。',
      demo: 'デモモード：このブラウザにのみ保存されます。',
      nameLabel: 'お名前（任意）', namePh: '例：ソムチャイ', nameHint: '他のグループと相席の場合は、グループごとにお名前を入れてください。スタッフが注文を区別できます。',
      cancel: 'キャンセル', needTable: '注文するにはテーブルを選んでください', tableExpired: '1時間以上たったため、もう一度テーブルを選んでください。',
    },
    my: {
      title: 'မီနူး', sample: 'နမူနာဈေးနှုန်း ဖြစ်ပါသည်။',
      myOrder: 'ကျွန်ုပ်၏အော်ဒါ', keepBrowsing: 'ဆက်ရွေးမည်', send: 'မီးဖိုချောင်သို့ အော်ဒါပို့မည်',
      placeOrder: 'အော်ဒါမှာမည်', note: 'မီးဖိုချောင်အတွက် မှတ်ချက်', notePh: 'ဥပမာ - အစပ်လျှော့ပါ၊ ဟင်းသီးဟင်းရွက် မထည့်ပါနဲ့',
      viewPhoto: 'ဓာတ်ပုံ', addShort: '+ မှာမည်', add: '+ အော်ဒါထဲ ထည့်မည်',
      table: 'စားပွဲ', noTable: 'စားပွဲရွေးပါ', pickTable: 'စားပွဲနံပါတ် ဘယ်လောက်ပါသလဲ?', pickTableHint: 'စားပွဲပေါ်ရှိ ဆိုင်းဘုတ်တွင် နံပါတ်ကို ကြည့်နိုင်ပါသည်။',
      added: 'ထည့်ပြီးပါပြီ: {name}', emptyCart: 'ဘာမှ မရွေးရသေးပါ — ဟင်းပွဲပေါ်ရှိ “+ မှာမည်” ကို နှိပ်ပါ။', total: 'စုစုပေါင်း',
      eggFried: 'ကြက်ဥကြော်', eggOmelette: 'ကြက်ဥမွှေကြော်',
      sentTitle: 'မီးဖိုချောင်သို့ ပို့ပြီးပါပြီ', sentTotal: 'ယခုထိ မှာထားသည့်ပမာဏ',
      orderOkTitle: 'အော်ဒါ ပို့ပြီးပါပြီ!', orderOkText: 'စားပွဲ {t} ၏ အော်ဒါကို မီးဖိုချောင်မှ လက်ခံရရှိပါပြီ။ ခဏစောင့်ပေးပါ။', orderNo: 'အော်ဒါ #{n}', ok: 'အိုကေ',
      sending: 'ပို့နေသည်…', retrySend: 'ထပ်ပို့မည်',
      errNetTitle: 'ဆိုင်၏ Wi-Fi နှင့် မချိတ်ဆက်ရသေးပါ', errNet: 'သင့်ဖုန်းသည် ဆိုင်၏ Wi-Fi နှင့် မချိတ်ဆက်ထားပါ (သို့မဟုတ် လိုင်းပြတ်သွားသည်)၊ ထို့ကြောင့် အော်ဒါ မပို့ရသေးပါ။ ရွေးထားသော ဟင်းပွဲများ ရှိနေဆဲဖြစ်သည် — Wi-Fi ကို စစ်ပြီး “ထပ်ပို့မည်” ကို နှိပ်ပါ။',
      errTimeoutTitle: 'ဆိုင်စနစ် တုံ့ပြန်မှု နှေးနေသည်', errTimeout: 'အော်ဒါ ပို့ပြီးသော်လည်း အဖြေ မရသေးပါ၊ မီးဖိုချောင်သို့ ရောက်ချင်မှ ရောက်ပါမည်။ “ထပ်ပို့မည်” ကို နှိပ်ပါ — နှစ်ခါ မှာမိမည် မဟုတ်ပါ။',
      errServerTitle: 'ဆိုင်စနစ်က အော်ဒါကို လက်မခံနိုင်ပါ', errServer: 'စနစ်မှ အမှား ပြန်ပေးသည် (ကုဒ် {code})၊ အော်ဒါ မပို့ရသေးပါ။ ထပ်ကြိုးစားပါ သို့မဟုတ် ဤမျက်နှာပြင်ကို ဝန်ထမ်းအား ပြပါ။',
      backOnline: 'ပြန်လည် ချိတ်ဆက်မိပါပြီ — အော်ဒါပို့ရန် “ထပ်ပို့မည်” ကို နှိပ်ပါ။',
      stNew: 'လက်ခံပြီး', stPreparing: 'ချက်နေသည်', stServed: 'ချပေးပြီး', stCancelled: 'ပယ်ဖျက်ပြီး',
      cancelledHint: 'ဤအော်ဒါကို ပယ်ဖျက်ထားပြီး စုစုပေါင်းတွင် အကျုံးမဝင်ပါ။',
      demo: 'စမ်းသပ်မုဒ်: ဤဘရောက်ဇာတွင်သာ သိမ်းဆည်းထားပါသည်။',
      nameLabel: 'သင့်အမည် (မထည့်လည်းရသည်)', namePh: 'ဥပမာ - ဆွမ်ချိုင်', nameHint: 'အခြားအဖွဲ့နှင့် စားပွဲတူထိုင်ပါက အဖွဲ့တစ်ဖွဲ့စီ ကိုယ့်အမည်ကိုထည့်ပါ — ဝန်ထမ်းများ အော်ဒါများကို ခွဲခြားနိုင်ပါမည်။',
      cancel: 'မလုပ်တော့ပါ', needTable: 'အော်ဒါပို့ရန် စားပွဲကို အရင်ရွေးပါ', tableExpired: 'တစ်နာရီကျော်သွားပြီ — စားပွဲကို ထပ်မံရွေးပေးပါ။',
    },
    ko: {
      title: '메뉴', sample: '표시된 가격은 미리보기용 예시 가격입니다.',
      myOrder: '내 주문', keepBrowsing: '더 고르기', send: '주방으로 주문 보내기',
      placeOrder: '주문하기', note: '주방에 남길 메모', notePh: '예: 맵지 않게, 채소 빼 주세요',
      viewPhoto: '사진', addShort: '+ 담기', add: '+ 주문에 담기',
      table: '테이블', noTable: '테이블 선택', pickTable: '몇 번 테이블에 앉으셨나요?', pickTableHint: '번호는 테이블 위 안내판에 있습니다.',
      added: '담았습니다: {name}', emptyCart: '아직 담은 메뉴가 없습니다. 메뉴의 “+ 담기”를 눌러 주세요.', total: '합계',
      eggFried: '계란 프라이', eggOmelette: '오믈렛',
      sentTitle: '주방으로 보낸 주문', sentTotal: '지금까지 주문한 금액',
      orderOkTitle: '주문을 보냈습니다!', orderOkText: '주방에서 {t}번 테이블의 주문을 받았습니다. 잠시만 기다려 주세요.', orderNo: '주문 #{n}', ok: '확인',
      sending: '보내는 중…', retrySend: '다시 보내기',
      errNetTitle: '가게 Wi-Fi에 연결되어 있지 않습니다', errNet: '휴대폰이 가게 Wi-Fi에 연결되어 있지 않거나 신호가 끊겨 주문이 전송되지 않았습니다. 고른 메뉴는 그대로 있습니다. Wi-Fi를 확인한 뒤 “다시 보내기”를 눌러 주세요.',
      errTimeoutTitle: '가게 시스템의 응답이 늦습니다', errTimeout: '주문을 보냈지만 응답이 없어 주방에 도착했는지 알 수 없습니다. “다시 보내기”를 눌러 주세요. 주문이 두 번 들어가지는 않습니다.',
      errServerTitle: '가게 시스템이 주문을 받지 못했습니다', errServer: '시스템 오류(코드 {code})로 주문이 전송되지 않았습니다. 다시 시도하시거나 이 화면을 직원에게 보여 주세요.',
      backOnline: '다시 연결되었습니다. “다시 보내기”를 눌러 주문을 보내 주세요.',
      stNew: '접수됨', stPreparing: '조리 중', stServed: '서빙 완료', stCancelled: '취소됨',
      cancelledHint: '이 주문은 취소되어 합계에 포함되지 않습니다.',
      demo: '데모 모드: 이 브라우저에만 저장됩니다.',
      nameLabel: '이름 (선택)', namePh: '예: 솜차이', nameHint: '다른 일행과 합석했다면 일행마다 각자 이름을 입력해 주세요. 직원이 주문을 구분할 수 있습니다.',
      cancel: '취소', needTable: '주문하려면 테이블을 먼저 선택하세요', tableExpired: '1시간이 지났습니다. 테이블을 다시 선택해 주세요.',
    },
    es: {
      title: 'Carta', sample: 'Precios de ejemplo, solo para la vista previa.',
      myOrder: 'Mi pedido', keepBrowsing: 'Seguir mirando', send: 'Enviar pedido a cocina',
      placeOrder: 'Pedir', note: 'Nota para la cocina', notePh: 'p. ej.: sin picante, sin verduras',
      viewPhoto: 'Foto', addShort: '+ Añadir', add: '+ Añadir al pedido',
      table: 'Mesa', noTable: 'Elegir mesa', pickTable: '¿En qué mesa estás?', pickTableHint: 'El número está en el cartel de tu mesa.',
      added: 'Añadido: {name}', emptyCart: 'Aún no has añadido nada: toca “+ Añadir” en un plato.', total: 'Total',
      eggFried: 'Huevo frito', eggOmelette: 'Tortilla',
      sentTitle: 'Ya enviado a cocina', sentTotal: 'Pedido hasta ahora',
      orderOkTitle: '¡Pedido enviado!', orderOkText: 'La cocina ha recibido el pedido de la mesa {t}. Espera un momento, por favor.', orderNo: 'Pedido n.º {n}', ok: 'Vale',
      sending: 'Enviando…', retrySend: 'Volver a enviar',
      errNetTitle: 'No estás conectado al Wi-Fi del restaurante', errNet: 'Tu teléfono no está conectado al Wi-Fi del restaurante (o se cortó la señal), así que el pedido no se ha enviado. Tus platos siguen aquí: revisa el Wi-Fi y toca “Volver a enviar”.',
      errTimeoutTitle: 'El sistema del restaurante tarda en responder', errTimeout: 'Enviamos tu pedido pero no hubo respuesta, así que puede que haya llegado a cocina o no. Toca “Volver a enviar”: no se enviará dos veces.',
      errServerTitle: 'El sistema del restaurante no pudo aceptar el pedido', errServer: 'El sistema devolvió un error (código {code}) y el pedido no se envió. Inténtalo de nuevo o enseña esta pantalla a alguien del personal.',
      backOnline: 'Ya estás conectado: toca “Volver a enviar” para enviar tu pedido.',
      stNew: 'Recibido', stPreparing: 'Preparando', stServed: 'Servido', stCancelled: 'Cancelado',
      cancelledHint: 'Este pedido se canceló y no cuenta en el total.',
      demo: 'Modo demo: se guarda solo en este navegador.',
      nameLabel: 'Tu nombre (opcional)', namePh: 'p. ej.: Somchai', nameHint: '¿Compartes mesa con otro grupo? Que cada grupo use su propio nombre para que el personal separe los pedidos.',
      cancel: 'Cancelar', needTable: 'Elige tu mesa para poder enviar el pedido', tableExpired: 'Ha pasado más de una hora: vuelve a elegir tu mesa, por favor.',
    },
    fr: {
      title: 'Carte', sample: 'Prix d’exemple, pour l’aperçu uniquement.',
      myOrder: 'Ma commande', keepBrowsing: 'Continuer', send: 'Envoyer en cuisine',
      placeOrder: 'Commander', note: 'Note pour la cuisine', notePh: 'ex. : pas épicé, sans légumes',
      viewPhoto: 'Photo', addShort: '+ Ajouter', add: '+ Ajouter à la commande',
      table: 'Table', noTable: 'Choisir la table', pickTable: 'À quelle table êtes-vous ?', pickTableHint: 'Le numéro est sur le panneau de votre table.',
      added: 'Ajouté : {name}', emptyCart: 'Rien pour l’instant : touchez « + Ajouter » sur un plat.', total: 'Total',
      eggFried: 'Œuf au plat', eggOmelette: 'Omelette',
      sentTitle: 'Déjà envoyé en cuisine', sentTotal: 'Commandé jusqu’ici',
      orderOkTitle: 'Commande envoyée !', orderOkText: 'La cuisine a bien reçu la commande de la table {t}. Merci de patienter un instant.', orderNo: 'Commande n° {n}', ok: 'OK',
      sending: 'Envoi…', retrySend: 'Renvoyer',
      errNetTitle: 'Pas connecté au Wi-Fi du restaurant', errNet: 'Votre téléphone n’est pas connecté au Wi-Fi du restaurant (ou le signal a été perdu) : la commande n’a pas été envoyée. Vos plats sont toujours là. Vérifiez le Wi-Fi puis touchez « Renvoyer ».',
      errTimeoutTitle: 'Le système du restaurant tarde à répondre', errTimeout: 'Votre commande est partie mais sans réponse : elle est peut-être arrivée en cuisine, peut-être pas. Touchez « Renvoyer » : elle ne sera pas envoyée deux fois.',
      errServerTitle: 'Le système du restaurant n’a pas pu accepter la commande', errServer: 'Le système a renvoyé une erreur (code {code}) et la commande n’a pas été envoyée. Réessayez ou montrez cet écran à un membre du personnel.',
      backOnline: 'Vous êtes reconnecté : touchez « Renvoyer » pour envoyer votre commande.',
      stNew: 'Reçue', stPreparing: 'En préparation', stServed: 'Servie', stCancelled: 'Annulée',
      cancelledHint: 'Cette commande a été annulée et n’est pas comptée dans le total.',
      demo: 'Mode démo : enregistré dans ce navigateur uniquement.',
      nameLabel: 'Votre nom (facultatif)', namePh: 'ex. : Somchai', nameHint: 'Vous partagez la table avec un autre groupe ? Chaque groupe indique son propre nom pour que le personnel distingue les commandes.',
      cancel: 'Annuler', needTable: 'Choisissez votre table pour envoyer la commande', tableExpired: 'Plus d’une heure s’est écoulée : merci de choisir à nouveau votre table.',
    },
    id: {
      title: 'Menu',
      sample: 'Harga contoh — hanya untuk pratinjau.',
      myOrder: 'Pesanan saya',
      keepBrowsing: 'Lanjut melihat menu',
      send: 'Kirim pesanan ke dapur',
      placeOrder: 'Pesan sekarang',
      note: 'Catatan untuk dapur',
      notePh: 'mis. tidak pedas, tanpa sayur',
      viewPhoto: 'Foto',
      addShort: '+ Tambah',
      add: '+ Tambah ke pesanan',
      table: 'Meja',
      noTable: 'Pilih meja',
      pickTable: 'Anda duduk di meja nomor berapa?',
      pickTableHint: 'Nomor tertera pada papan di meja Anda.',
      added: 'Ditambahkan: {name}',
      emptyCart: 'Belum ada yang ditambahkan — ketuk “+ Tambah” pada sebuah hidangan.',
      total: 'Total',
      eggFried: 'Telur mata sapi',
      eggOmelette: 'Telur dadar',
      sentTitle: 'Sudah dikirim ke dapur',
      sentTotal: 'Total pesanan sejauh ini',
      orderOkTitle: 'Pesanan terkirim!',
      orderOkText: 'Dapur telah menerima pesanan untuk meja {t}. Mohon tunggu sebentar.',
      orderNo: 'Pesanan #{n}',
      ok: 'OK',
      sending: 'Mengirim…',
      retrySend: 'Coba kirim lagi',
      errNetTitle: 'Tidak terhubung ke Wi-Fi restoran',
      errNet: 'Ponsel Anda tidak terhubung ke Wi-Fi restoran (atau sinyal terputus), sehingga pesanan belum terkirim. Pesanan Anda masih tersimpan di sini — periksa Wi-Fi, lalu ketuk “Coba kirim lagi”.',
      errTimeoutTitle: 'Sistem restoran lambat merespons',
      errTimeout: 'Pesanan sudah kami kirim tetapi tidak ada balasan, jadi mungkin sudah atau belum sampai ke dapur. Ketuk “Coba kirim lagi” — pesanan tidak akan terkirim dua kali.',
      errServerTitle: 'Sistem restoran tidak dapat menerima pesanan',
      errServer: 'Sistem mengembalikan kesalahan (kode {code}) dan pesanan tidak terkirim. Coba lagi, atau tunjukkan layar ini kepada staf.',
      backOnline: 'Anda sudah terhubung kembali — ketuk “Coba kirim lagi” untuk mengirim pesanan.',
      stNew: 'Diterima',
      stPreparing: 'Sedang disiapkan',
      stServed: 'Sudah disajikan',
      stCancelled: 'Dibatalkan',
      cancelledHint: 'Pesanan ini dibatalkan dan tidak dihitung dalam total.',
      demo: 'Mode demo: hanya tersimpan di peramban ini. Jalankan server.js untuk terhubung ke layar staf lewat Wi-Fi.',
      nameLabel: 'Nama Anda (opsional)',
      namePh: 'mis. Somchai',
      nameHint: 'Berbagi meja dengan rombongan lain? Setiap rombongan memakai nama sendiri agar staf dapat memisahkan pesanan.',
      cancel: 'Batal',
      needTable: 'Pilih meja Anda untuk mengirim pesanan',
      tableExpired: 'Sudah lebih dari satu jam — silakan pilih meja Anda lagi.',
    },
  };


  // Text for the options sheet in every supported language.
  Object.assign(DICT["th"], {"optionHint": "เลือกเพิ่มเติมได้ หรือกดเพิ่มโดยไม่เลือก", "editOptions": "แก้ไขตัวเลือก", "saveOptions": "บันทึกตัวเลือก"});
  Object.assign(DICT["en"], {"optionHint": "Choose extras, or add without extras", "editOptions": "Edit options", "saveOptions": "Save options"});
  Object.assign(DICT["zh-Hans"], {"optionHint": "可选加料，也可直接加入", "editOptions": "修改选项", "saveOptions": "保存选项"});
  Object.assign(DICT["ja"], {"optionHint": "追加を選択、またはそのまま追加", "editOptions": "オプション変更", "saveOptions": "変更を保存"});
  Object.assign(DICT["my"], {"optionHint": "ထပ်ထည့်လိုသည်များ ရွေးပါ သို့မဟုတ် မရွေးဘဲ ထည့်ပါ", "editOptions": "ရွေးချယ်မှု ပြင်ရန်", "saveOptions": "ရွေးချယ်မှု သိမ်းရန်"});
  Object.assign(DICT["ko"], {"optionHint": "추가 옵션을 선택하거나 그대로 담으세요", "editOptions": "옵션 수정", "saveOptions": "옵션 저장"});
  Object.assign(DICT["es"], {"optionHint": "Elige extras o añade sin extras", "editOptions": "Editar opciones", "saveOptions": "Guardar opciones"});
  Object.assign(DICT["fr"], {"optionHint": "Choisissez des options ou ajoutez sans supplément", "editOptions": "Modifier les options", "saveOptions": "Enregistrer les options"});
  Object.assign(DICT["id"], {"optionHint":"Pilih tambahan, atau pesan tanpa tambahan","editOptions":"Ubah pilihan","saveOptions":"Simpan pilihan"});

  Object.assign(DICT["th"], {"rateTitle": "ส่งออเดอร์ถี่เกินไป", "rateWait": "กรุณารอ {s} วินาทีแล้วลองส่งอีกครั้ง รายการในตะกร้ายังอยู่"});
  Object.assign(DICT["en"], {"rateTitle": "Too many order requests", "rateWait": "Wait {s} seconds, then try again. Your basket is saved."});
  Object.assign(DICT["zh-Hans"], {"rateTitle": "下单过于频繁", "rateWait": "请等待 {s} 秒后重试，购物篮已保留。"});
  Object.assign(DICT["ja"], {"rateTitle": "注文リクエストが多すぎます", "rateWait": "{s}秒待ってから再送してください。カートは保存されています。"});
  Object.assign(DICT["my"], {"rateTitle": "အော်ဒါတင်ခြင်း များလွန်းနေသည်", "rateWait": "{s} စက္ကန့်စောင့်ပြီး ပြန်ပို့ပါ။ အမှာစာကို သိမ်းဆည်းထားသည်။"});
  Object.assign(DICT["ko"], {"rateTitle": "주문 요청이 너무 많습니다", "rateWait": "{s}초 후 다시 시도하세요. 장바구니는 저장되어 있습니다."});
  Object.assign(DICT["es"], {"rateTitle": "Demasiadas solicitudes", "rateWait": "Espera {s} segundos y vuelve a intentarlo. Tu cesta está guardada."});
  Object.assign(DICT["fr"], {"rateTitle": "Trop de demandes", "rateWait": "Attendez {s} secondes avant de réessayer. Votre panier est conservé."});
  Object.assign(DICT["id"], {"rateTitle":"Terlalu banyak permintaan pesanan","rateWait":"Tunggu {s} detik, lalu coba lagi. Keranjang Anda tersimpan."});

  // Public website (ordering through a table QR code): notices and the no-connection message.
  Object.assign(DICT["th"], {"qrNeeded": "สั่งอาหารได้โดยสแกน QR code ที่โต๊ะในร้าน", "qrInvalid": "QR code ของโต๊ะนี้ใช้ไม่ได้แล้ว กรุณาแจ้งพนักงาน", "orderOffline": "ขณะนี้ยังสั่งอาหารออนไลน์ไม่ได้ กรุณาสั่งกับพนักงาน", "qrExpired": "ผ่านไปเกิน 1 ชั่วโมงแล้ว กรุณาสแกน QR code ที่โต๊ะอีกครั้ง", "errNetTitlePub": "เชื่อมต่อกับร้านไม่ได้", "errNetPub": "ออเดอร์ยังไม่ถูกส่ง เพราะอินเทอร์เน็ตของโทรศัพท์หรือระบบของร้านไม่ตอบสนอง รายการที่เลือกยังอยู่ครบ ลองส่งอีกครั้ง หรือสั่งกับพนักงาน"});
  Object.assign(DICT["en"], {"qrNeeded": "To order, scan the QR code on your table at the restaurant.", "qrInvalid": "This table’s QR code is no longer valid. Please ask our staff.", "orderOffline": "Online ordering isn’t available right now. Please order with our staff.", "qrExpired": "It’s been over an hour — please scan your table’s QR code again.", "errNetTitlePub": "Can’t reach the restaurant", "errNetPub": "The order was not sent: your phone’s internet or the restaurant’s system is not responding. Your items are still here. Try again, or order with our staff."});
  Object.assign(DICT["zh-Hans"], {"qrNeeded": "请在店内扫描桌上的二维码点餐。", "qrInvalid": "此桌的二维码已失效，请联系店员。", "orderOffline": "目前无法在线点餐，请向店员点餐。", "qrExpired": "已超过 1 小时，请重新扫描桌上的二维码。", "errNetTitlePub": "无法连接餐厅", "errNetPub": "订单尚未送出：手机网络或餐厅系统没有响应。已选餐点仍然保留。请再试一次，或直接向店员点餐。"});
  Object.assign(DICT["ja"], {"qrNeeded": "ご注文は、店内のテーブルにあるQRコードを読み取ってください。", "qrInvalid": "このテーブルのQRコードは無効になっています。スタッフにお声がけください。", "orderOffline": "ただいまオンライン注文をご利用いただけません。スタッフにご注文ください。", "qrExpired": "1時間以上たったため、テーブルのQRコードをもう一度読み取ってください。", "errNetTitlePub": "お店のシステムに接続できません", "errNetPub": "注文はまだ送信されていません。スマートフォンの通信、またはお店のシステムが応答していません。選んだ料理はそのまま残っています。もう一度お試しいただくか、スタッフにご注文ください。"});
  Object.assign(DICT["my"], {"qrNeeded": "အော်ဒါမှာရန် ဆိုင်ရှိ သင့်စားပွဲပေါ်က QR ကုဒ်ကို စကင်ဖတ်ပါ။", "qrInvalid": "ဤစားပွဲ၏ QR ကုဒ်သည် အသုံးမပြုနိုင်တော့ပါ။ ဝန်ထမ်းကို ပြောပါ။", "orderOffline": "ယခုအချိန်တွင် အွန်လိုင်းမှ အော်ဒါမမှာနိုင်ပါ။ ဝန်ထမ်းထံ မှာယူပါ။", "qrExpired": "တစ်နာရီကျော်သွားပါပြီ။ စားပွဲပေါ်က QR ကုဒ်ကို ထပ်မံစကင်ဖတ်ပါ။", "errNetTitlePub": "ဆိုင်စနစ်နှင့် ချိတ်ဆက်၍မရပါ", "errNetPub": "အော်ဒါ မပို့ရသေးပါ။ သင့်ဖုန်းအင်တာနက် သို့မဟုတ် ဆိုင်စနစ်က တုံ့ပြန်မှုမရှိပါ။ ရွေးထားသောဟင်းပွဲများ ကျန်ရှိနေပါသည်။ ထပ်မံကြိုးစားပါ သို့မဟုတ် ဝန်ထမ်းထံ မှာယူပါ။"});
  Object.assign(DICT["ko"], {"qrNeeded": "주문하시려면 매장 테이블의 QR 코드를 스캔해 주세요.", "qrInvalid": "이 테이블의 QR 코드는 더 이상 사용할 수 없습니다. 직원에게 문의해 주세요.", "orderOffline": "지금은 온라인 주문을 이용할 수 없습니다. 직원에게 주문해 주세요.", "qrExpired": "1시간이 지났습니다. 테이블의 QR 코드를 다시 스캔해 주세요.", "errNetTitlePub": "매장 시스템에 연결할 수 없습니다", "errNetPub": "주문이 아직 전송되지 않았습니다. 휴대폰 인터넷 또는 매장 시스템이 응답하지 않습니다. 담은 메뉴는 그대로 있습니다. 다시 시도하거나 직원에게 주문해 주세요."});
  Object.assign(DICT["es"], {"qrNeeded": "Para pedir, escanea el código QR de tu mesa en el restaurante.", "qrInvalid": "El código QR de esta mesa ya no es válido. Avisa al personal, por favor.", "orderOffline": "Ahora mismo no se puede pedir en línea. Pide al personal, por favor.", "qrExpired": "Ha pasado más de una hora: vuelve a escanear el código QR de tu mesa.", "errNetTitlePub": "No se puede conectar con el restaurante", "errNetPub": "El pedido no se ha enviado: no responde la conexión de tu teléfono o el sistema del restaurante. Tus platos siguen aquí. Inténtalo de nuevo o pide al personal."});
  Object.assign(DICT["fr"], {"qrNeeded": "Pour commander, scannez le code QR de votre table au restaurant.", "qrInvalid": "Le code QR de cette table n’est plus valable. Merci de prévenir le personnel.", "orderOffline": "La commande en ligne n’est pas disponible pour le moment. Merci de commander auprès du personnel.", "qrExpired": "Plus d’une heure s’est écoulée : merci de scanner à nouveau le code QR de votre table.", "errNetTitlePub": "Impossible de joindre le restaurant", "errNetPub": "La commande n’a pas été envoyée : la connexion de votre téléphone ou le système du restaurant ne répond pas. Vos plats sont toujours là. Réessayez ou commandez auprès du personnel."});
  Object.assign(DICT["id"], {"qrNeeded":"Untuk memesan, pindai kode QR di meja Anda di restoran.","qrInvalid":"Kode QR meja ini sudah tidak berlaku. Silakan tanyakan kepada staf kami.","orderOffline":"Pemesanan online sedang tidak tersedia. Silakan pesan melalui staf kami.","qrExpired":"Sudah lebih dari satu jam — silakan pindai kembali kode QR meja Anda.","errNetTitlePub":"Tidak dapat terhubung ke restoran","errNetPub":"Pesanan tidak terkirim: internet ponsel Anda atau sistem restoran tidak merespons. Pesanan Anda masih tersimpan di sini. Coba lagi, atau pesan melalui staf kami."});

  // ---------- Persistent state ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  let table = null;
  let cart = store.get('thl-cart', []); // [{ id, qty, options }]
  // Keep existing unsent carts, with their egg choice visible as an explicit add-on.
  cart = (Array.isArray(cart) ? cart : []).filter((l) => l && byId[l.id]).map((l) => ({
    optionsVersion: 2, id: l.id, qty: Math.max(1, Math.min(50, Number(l.qty) || 1)),
    options: MENU.normalizeOptions(byId[l.id], l.optionsVersion !== 2 && MENU.optionKind(byId[l.id]) !== 'extras' ? MENU.defaultOptions(byId[l.id]) : Array.isArray(l.options) ? l.options : l.egg ? [l.egg] : []),
  }));
  const sentKey = () => 'thl-sent-' + table;
  const SENT_HOURS = 4; // "already sent" list covers this visit only
  // Sent orders on this phone: [{ id, key, status, time, lines: [{ id, qty, egg, price }] }]
  const getSent = () => (table ? store.get(sentKey(), []).filter((o) => o && o.lines && o.time > Date.now() - SENT_HOURS * 3600e3) : []);

  // ---------- Public website ----------
  // On the public website (THL.PUBLIC) the table comes only from the QR code on the table, which
  // also carries that table's key. Until the shop computer has confirmed the key the page is a
  // menu to look at: no table picker, no "+ Add", no order bar (site.css: html.view-only).
  const PUBLIC = Boolean(THL.PUBLIC);
  let ordering = !PUBLIC;
  let tableKey = '';
  const KEY_RE = /^[a-z0-9]{8,40}$/;

  // ---------- Table (this browser tab only) ----------
  // The chosen table expires an hour after it was set — e.g. a phone left open after the guests
  // have gone — and the guest has to pick it again. Scanning the table's QR code counts as picking it.
  const TABLE_TTL_MS = 3600e3;
  let expiredOnLoad = false; // page reopened after the hour ran out → say why we ask again
  const validTable = (n) => Number.isInteger(n) && n >= 1 && n <= THL.SITE.tables;
  function initTable() {
    const params = new URLSearchParams(location.search);
    const rawTable = params.get('table');
    const rawKey = params.get('k');
    const fromUrl = /^[1-9]\d*$/.test(rawTable || '') ? Number(rawTable) : NaN;
    if (params.has('table') || params.has('k')) {
      // Drop ?table= (and the QR key) from the address so a reload hours later doesn't quietly pick the table again
      params.delete('table'); params.delete('k');
      try { history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : '') + location.hash); } catch (e) {}
    }
    const saved = parseInt(session.get('thl-table'), 10);
    const savedKey = String(session.get('thl-table-key') || '');
    if (validTable(fromUrl)) {
      setTable(fromUrl, false);
      setTableKey(KEY_RE.test(rawKey || '') ? rawKey : saved === fromUrl ? savedKey : '');
      return;
    }
    const setAt = Number(session.get('thl-table-at'));
    if (validTable(saved) && setAt && Date.now() - setAt < TABLE_TTL_MS) { setTable(saved, false, setAt); setTableKey(savedKey); }
    else { expiredOnLoad = validTable(saved); clearTable(); }
  }
  function clearTable() {
    if (table) session.set(nameKey(table), null);
    table = null; guestName = '';
    session.set('thl-table', null); session.set('thl-table-at', null);
    setTableKey('');
  }
  // The key from the table's QR code. Only the public website uses it.
  function setTableKey(key) {
    tableKey = PUBLIC && KEY_RE.test(key || '') ? key : '';
    if (PUBLIC) session.set('thl-table-key', tableKey);
  }
  // Called on a timer, when the page comes back into view, and before adding or sending.
  // Returns true if the table had just expired (and the picker is now open).
  function expireTable() {
    const setAt = Number(session.get('thl-table-at'));
    if (!table || sending || (setAt && Date.now() - setAt < TABLE_TTL_MS)) return false;
    clearTable();
    clearTimeout(statusTimer); statusTimer = null; // no more status polling for the old table
    renderTableChip();
    if ($('#orderSheet').open) renderCart();
    if (PUBLIC) setOrdering(false, 'qrExpired'); // the guest scans the table's code again
    else openTablePicker(true);
    return true;
  }
  // Optional guest name, sent with each order so staff can total up per name when two groups share
  // a table. Remembered per table for this browser tab, so a second order later in the visit reuses it.
  const session = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { v == null || v === '' ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, v); } catch (e) {} },
  };
  const nameKey = (n) => 'thl-name-' + n;
  const cleanName = (s) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, 40);
  let guestName = '';
  function setGuestName(name) {
    guestName = cleanName(name);
    if (table) session.set(nameKey(table), guestName);
    renderTableChip();
  }

  function setTable(n, notify = true, setAt = Date.now()) {
    if (n !== table) guestName = cleanName(session.get(nameKey(n)));
    table = n;
    session.set('thl-table', String(n));
    session.set('thl-table-at', String(setAt)); // picking (or re-picking) a table starts a new hour
    renderTableChip();
    if (notify) toast(`${t('table')} ${n}`);
    if (notify) checkStatus();
  }

  // ---------- Cart helpers ----------
  const unitPrice = (l) => MENU.unitPrice(byId[l.id], l.options);
  const lineTotal = (l) => unitPrice(l) * l.qty;
  const optionText = (l) => MENU.optionText(l.options, THL.lang === 'zh-Hans' ? 'zs' : THL.lang, l.optionsVersion === 2 ? byId[l.id] : null);
  const cartCount = () => cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = () => cart.reduce((s, l) => s + lineTotal(l), 0);
  const qtyOf = (id) => cart.filter((l) => l.id === id).reduce((s, l) => s + l.qty, 0);
  // Send state (see sendOrder). Any change to the cart makes it a new order: fresh clientId, old error cleared.
  let clientId = null, sendError = null, sending = false;
  const newAttempt = () => { clientId = null; sendError = null; };
  const save = () => { store.set('thl-cart', cart); newAttempt(); };

  let optionDraft = null;
  function addToCart(id) {
    if (!ordering) return;
    if (MENU.optionsFor(byId[id]).length) return openOptions(id);
    commitLine(id, []);
  }
  function commitLine(id, options, editIndex = null) {
    const qty = editIndex === null ? 1 : cart[editIndex].qty;
    if (editIndex !== null) cart.splice(editIndex, 1);
    const key = JSON.stringify(options);
    const line = cart.find((l) => l.id === id && JSON.stringify(l.options) === key);
    // Keep each submitted line within the API quantity limit without dropping servings.
    let remaining = qty;
    if (line) { const n = Math.min(50 - line.qty, remaining); line.qty += n; remaining -= n; }
    if (remaining) cart.push({ id, qty: remaining, options: [...options], optionsVersion: 2 });
    save(); updateCounts();
    if ($('#orderSheet').open) renderCart();
    toast(fmt(t('added'), { name: pick(byId[id].name) }));
    if (!expireTable() && !table) openTablePicker();
  }
  function openOptions(id, editIndex = null) {
    optionDraft = { id, editIndex, options: editIndex === null ? MENU.defaultOptions(byId[id]) : [...cart[editIndex].options] };
    renderOptions(); open('optionsSheet');
  }
  function renderOptions() {
    if (!optionDraft) return;
    const item = byId[optionDraft.id];
    $('#optionsTitle').textContent = pick(item.name);
    const kind = MENU.optionKind(item);
    $('#optionsHint').textContent = kind === 'extras' ? t('optionHint') : pick(MENU.optionLabels[kind === 'toppings' ? 'toppingsHint' : 'sweetnessHint']);
    const box = $('#optionChoices'); box.textContent = '';
    MENU.optionsFor(item).forEach((o) => {
      if (kind !== 'extras') {
        const input = h('input', {
          type: kind === 'sweetness' ? 'radio' : 'checkbox', name: 'dish-' + kind,
          value: o.id, 'data-option': o.id, checked: optionDraft.options.includes(o.id),
          onchange: () => {
            const ids = kind === 'sweetness' ? [o.id] : input.checked
              ? [...optionDraft.options, o.id] : optionDraft.options.filter(id => id !== o.id);
            optionDraft.options = MENU.normalizeOptions(item, ids);
            box.querySelectorAll('input').forEach(control => control.closest('label').classList.toggle('selected', control.checked));
            $('#optionsTotal').textContent = money(MENU.unitPrice(item, optionDraft.options));
          },
        });
        box.append(h('label', { class: 'btn btn-secondary option-choice option-input' + (input.checked ? ' selected' : '') }, input, h('span', {}, pick(o.name))));
      } else {
        box.append(h('button', {
          class: 'btn btn-secondary option-choice', type: 'button', 'data-option': o.id,
          'aria-pressed': String(optionDraft.options.includes(o.id)),
          onclick: () => {
            const ids = optionDraft.options.includes(o.id) ? optionDraft.options.filter(id => id !== o.id) : [...optionDraft.options, o.id];
            optionDraft.options = MENU.normalizeOptions(item, ids); renderOptions();
            document.querySelector(`[data-option="${o.id}"]`).focus();
          },
        }, h('span', {}, pick(o.name)), o.price ? h('strong', {}, '+' + money(o.price)) : null));
      }
    });
    $('#optionsTotal').textContent = money(MENU.unitPrice(item, optionDraft.options));
    $('#confirmOptions').textContent = t(optionDraft.editIndex === null ? 'add' : 'saveOptions');
    $('#cancelOptions').textContent = t('cancel');
  }
  function changeQty(i, delta) {
    cart[i].qty = Math.min(50, cart[i].qty + delta);
    if (cart[i].qty <= 0) cart.splice(i, 1);
    save(); renderCart(); updateCounts();
  }

  // ---------- Rendering ----------
  const h = (tag, attrs = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) e.setAttribute(k, v);
    }
    kids.flat().forEach((c) => c != null && e.append(c));
    return e;
  };

  function renderMenu() {
    const catsRow = $('#cats');
    const menu = $('#menu');
    catsRow.textContent = ''; menu.textContent = '';
    MENU.categories.forEach((cat, i) => {
      catsRow.append(h('button', {
        class: 'cat-btn', type: 'button', 'data-cat': cat.id, 'aria-current': i === 0 ? 'true' : 'false',
        onclick: () => document.getElementById('cat-' + cat.id).scrollIntoView({ behavior: 'smooth' }),
      }, (() => { const ic = document.createElement('span'); ic.className = 'cat-ico'; ic.innerHTML = THL.catIcon(cat.id, 18); return ic; })(), pick(cat.name)));

      const grid = h('div', { class: 'grid' });
      MENU.items.filter((it) => it.cat === cat.id).forEach((it) => {
        const name = pick(it.name);
        grid.append(h('article', { class: 'card', 'data-id': it.id },
          h('div', { class: 'thumb' },
            imgFallback(h('img', { src: `assets/images/menu/${it.id}.jpg`, alt: name, loading: 'lazy', decoding: 'async' })),
            h('span', { class: 'qty', 'aria-hidden': 'true' })),
          h('div', { class: 'body' },
            h('h3', { class: 'name' }, name),
            h('p', { class: 'price' }, money(it.price)),
            h('div', { class: 'actions' },
              h('button', { class: 'btn btn-secondary', type: 'button', onclick: () => openPhoto(it.id) }, t('viewPhoto')),
              h('button', { class: 'btn btn-primary', type: 'button', 'aria-label': `${t('add')}: ${name}`, onclick: () => addToCart(it.id) }, t('addShort'))))));
      });
      menu.append(h('section', { class: 'cat-section', id: 'cat-' + cat.id, 'aria-labelledby': 'h-' + cat.id },
        h('h2', { id: 'h-' + cat.id }, pick(cat.name)), grid));
    });
    updateCounts();
    watchSections();
  }

  function updateCounts() {
    document.querySelectorAll('.card').forEach((card) => {
      const q = qtyOf(card.dataset.id);
      card.classList.toggle('in-cart', q > 0);
      card.querySelector('.qty').textContent = q ? '×' + q : '';
    });
    $('#barCount').textContent = cartCount();
    $('#barTotal').textContent = money(cartTotal());
    $('#placeOrder').disabled = !cartCount();
  }

  function renderTableChip() {
    $('#tableLabel').textContent = table ? `${t('table')} ${table}${guestName ? ' · ' + guestName : ''}` : t('noTable');
  }

  function renderCart() {
    const box = $('#cartLines');
    box.textContent = '';
    if (!cart.length) box.append(h('p', { class: 'empty' }, t('emptyCart')));
    cart.forEach((l, i) => {
      const it = byId[l.id];
      const info = h('div', {},
        h('div', { class: 'ln' }, pick(it.name)),
        h('div', { class: 'lp' }, `${money(unitPrice(l))} × ${l.qty} = ${money(lineTotal(l))}`));
      if (optionText(l)) info.append(h('div', { class: 'lp option-summary' }, optionText(l)));
      if (MENU.optionsFor(it).length) info.append(h('button', {
        class: 'btn btn-ghost edit-options', type: 'button', onclick: () => openOptions(l.id, i),
      }, t('editOptions')));
      box.append(h('div', { class: 'line' },
        imgFallback(h('img', { src: `assets/images/menu/${it.id}.jpg`, alt: '' })),
        info,
        h('div', { class: 'stepper' },
          h('button', { type: 'button', 'aria-label': '−', onclick: () => changeQty(i, -1) }, '−'),
          h('span', {}, String(l.qty)),
          h('button', { type: 'button', 'aria-label': '+', onclick: () => changeQty(i, 1) }, '+'))));
    });
    $('#cartSum').textContent = '';
    if (cart.length) $('#cartSum').append(h('span', {}, t('total')), h('span', {}, money(cartTotal())));
    renderSendState();

    renderSent();
  }

  const PAID_LABELS = {"th":"ชำระเงินแล้ว","en":"Bill completed","zh-Hans":"已结账","ja":"会計済み","my":"ငွေရှင်းပြီး","ko":"결제 완료","es":"Cuenta pagada","fr":"Addition réglée","id":"Tagihan lunas"};
  Object.keys(PAID_LABELS).forEach(k => DICT[k].stPaid = PAID_LABELS[k]);
  const STATUS_LABEL = { new: 'stNew', preparing: 'stPreparing', served: 'stServed', paid: 'stPaid', cancelled: 'stCancelled' };
  const orderTotal = (o) => o.lines.reduce((s, l) => s + l.price * l.qty, 0);
  function renderSent() {
    const sentBox = $('#sentBox');
    sentBox.textContent = '';
    const sent = getSent();
    if (!sent.length) return;
    const total = sent.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + orderTotal(o), 0);
    sentBox.append(h('h3', {}, `✓ ${t('sentTitle')}`));
    sent.slice().reverse().forEach((o) => {
      const status = STATUS_LABEL[o.status] ? o.status : 'new';
      sentBox.append(h('div', { class: 'sent-order s-' + status },
        h('div', { class: 'sent-head' },
          h('span', {}, `${fmt(t('orderNo'), { n: o.id })} · ${new Date(o.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${o.name ? ' · ' + o.name : ''}`),
          h('span', { class: 'badge' }, t(STATUS_LABEL[status]))),
        h('ul', {}, o.lines.map((l) => h('li', {},
          h('span', {}, `${byId[l.id] ? pick(byId[l.id].name) : l.id}${l.options && optionText(l) ? ' · ' + optionText(l) : l.egg ? ' · ' + t(l.egg === 'fried' ? 'eggFried' : 'eggOmelette') : ''} × ${l.qty}`),
          h('span', {}, money(l.price * l.qty))))),
        status === 'cancelled' ? h('p', { class: 'cancel-hint' }, t('cancelledHint')) : null));
    });
    sentBox.append(h('div', { class: 'sum' }, h('span', {}, t('sentTotal')), h('span', {}, money(total))));
  }

  // ---------- Dialogs ----------
  const open = (id) => { const d = document.getElementById(id); if (!d.open) d.showModal(); };
  const close = (id) => document.getElementById(id).close();
  document.querySelectorAll('dialog').forEach((d) => {
    d.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) d.close();
      else if (e.target === d && d.id !== 'tableSheet') d.close(); // backdrop tap
    });
  });

  let photoId = null;
  function openPhoto(id) {
    photoId = id;
    const it = byId[id];
    $('#photoName').textContent = pick(it.name);
    const img = $('#photoImg');
    img.dataset.thumb = `assets/images/menu/${id}.jpg`;
    img.dataset.tried = '';
    img.src = `assets/images/menu/full/${id}.jpg`;
    img.alt = pick(it.name);
    $('#photoPrice').textContent = money(it.price);
    renderPhotoAnnotations(it);
    const add = $('#photoAdd');
    add.textContent = t('add');
    add.onclick = () => { close('photoSheet'); addToCart(id); };
    open('photoSheet');
  }

  function renderPhotoAnnotations(item) {
    const panel = $('#photoIngredients'), markers = $('#photoMarkers'), note = $('#ingredientNote');
    panel.textContent = ''; markers.textContent = ''; markers.hidden = true;
    const data = window.THL_INGREDIENTS;
    const entry = data && data.items[item.id];
    panel.hidden = !entry; note.hidden = !entry;
    $('#photoStage').classList.toggle('annotated', Boolean(entry));
    if (!entry) return;
    const locale = THL.lang === 'zh-Hans' ? 'zs' : THL.lang;
    const names = entry.lists[locale] || entry.lists.en;
    panel.setAttribute('aria-label', pick(MENU.optionLabels.ingredients));
    panel.append(h('h3', { class: 'ingredient-heading' }, pick(MENU.optionLabels.ingredients)));
    if (names.length) {
      const list = h('ul', { class: 'ingredient-callouts' });
      names.forEach((name, i) => list.append(h('li', {}, h('span', {}, name), locale !== 'en' && entry.lists.en[i] ? h('small', { lang: 'en' }, entry.lists.en[i]) : null)));
      panel.append(list);
    } else panel.append(h('p', { class: 'ingredient-pending' }, pick(data.pending)));
    note.textContent = entry.review === 'Draft' ? pick(MENU.optionLabels.ingredientNote) : pick(data.scope);
  }

  function openTablePicker(expired = false) {
    if (PUBLIC) return; // the table comes from the QR code
    $('#tableExpired').hidden = !expired;
    const grid = $('#tables');
    grid.textContent = '';
    for (let n = 1; n <= THL.SITE.tables; n++) {
      grid.append(h('button', {
        type: 'button', 'aria-pressed': String(n === table),
        autofocus: n === (table || 1) ? '' : false, // focus a table, not the name box, so the keyboard doesn't pop up
        onclick: () => { const name = $('#tableName').value; setTable(n); setGuestName(name); close('tableSheet'); },
      }, String(n)));
    }
    // Cancel: close without choosing. A table picked earlier stays as it was; with no table yet,
    // ordering stays blocked (+ Add and Send open this picker again) and a toast says why.
    grid.append(h('button', { type: 'button', class: 'cancel', onclick: () => close('tableSheet') }, t('cancel')));
    $('#tableName').value = guestName;
    open('tableSheet');
  }

  const demoNote = () => (THL.LIVE ? null : h('p', { style: 'font-size:.8rem;opacity:.65;margin-top:12px' }, t('demo')));

  function showResult(kind, title, lines, buttons) {
    const body = $('#resultBody');
    body.textContent = '';
    body.append(h('div', { class: 'result' },
      h('div', { class: 'icon ' + kind, 'aria-hidden': 'true' }, kind === 'ok' ? '✓' : '!'),
      h('h2', {}, title), lines, demoNote()),
      h('div', { class: 'sheet-foot' }, buttons));
    open('resultSheet');
  }

  // ---------- Sending ----------
  // One id per attempt at sending this exact cart. Retries reuse it, so if an earlier try did reach
  // the kitchen (reply lost on the Wi-Fi) the server returns that order instead of making a second one.
  // Any change to the cart or note makes it a different order, so the id is dropped.

  function renderSendState() {
    const btn = $('#sendOrder');
    btn.disabled = sending || !cart.length;
    btn.textContent = sending ? t('sending') : sendError ? t('retrySend') : t('send');
    $('#orderSheet').classList.toggle('busy', sending); // no cart edits while the kitchen is receiving it
    const box = $('#sendError');
    box.textContent = '';
    box.hidden = !sendError;
    if (!sendError) return;
    const { kind, code } = sendError;
    if (code === 429) { box.append(h('strong', {}, t('rateTitle')), h('p', {}, fmt(t('rateWait'), { s: sendError.retryAfter || 60 }))); return; }
    if (!PUBLIC && kind === 'network' && navigator.onLine) { box.append(h('p', {}, t('backOnline'))); return; }
    const [title, text] = kind === 'network' ? (PUBLIC ? [t('errNetTitlePub'), t('errNetPub')] : [t('errNetTitle'), t('errNet')])
      : kind === 'timeout' ? [t('errTimeoutTitle'), t('errTimeout')]
      : [t('errServerTitle'), fmt(t('errServer'), { code })];
    box.append(h('strong', {}, title), h('p', {}, text));
  }
  // Wi-Fi back: tell the guest they can retry now (no automatic resend — they may have walked away)
  window.addEventListener('online', () => { if (sendError && sendError.kind === 'network') renderSendState(); });
  window.addEventListener('offline', () => { if (sendError && sendError.kind === 'network') renderSendState(); });

  async function sendOrder() {
    if (!ordering || !cart.length || sending) return;
    if (expireTable()) return;
    if (!table) return openTablePicker();
    const items = cart.map((l) => {
      const it = byId[l.id];
      return {
        id: it.id, name: pick(it.name), nameTh: it.name.th, qty: l.qty, price: unitPrice(l),
        options: l.options, optionsVersion: 2, opt: MENU.optionText(l.options, 'th', byId[l.id]),
      };
    });
    if (!clientId) clientId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    sending = true; sendError = null;
    renderSendState();
    try {
      const payload = { table, customerName: guestName, items, note: $('#orderNote').value.trim(), lang: THL.lang, clientId };
      if (PUBLIC) payload.tableKey = tableKey;
      const order = await THL.post('/api/orders', payload);
      // The cart is only cleared here, after the kitchen has confirmed the order
      const sent = getSent();
      sent.push({ id: order.id, key: order.key, status: order.status || 'new', time: Date.now(), name: guestName,
        lines: cart.map((l) => ({ id: l.id, qty: l.qty, options: [...l.options], optionsVersion: 2, price: unitPrice(l) })) });
      store.set(sentKey(), sent);
      cart = []; save(); updateCounts();
      $('#orderNote').value = '';
      newAttempt();
      sending = false;
      renderSendState();
      close('orderSheet');
      showResult('ok', t('orderOkTitle'),
        [h('p', {}, fmt(t('orderOkText'), { t: table })), h('p', { class: 'big' }, fmt(t('orderNo'), { n: order.id }))],
        [h('button', { class: 'btn btn-primary', type: 'button', 'data-close': '' }, t('ok'))]);
      watchStatus();
    } catch (e) {
      // Cart, note and clientId are all kept, so "Try sending again" resends the very same order
      sending = false;
      // The table's QR code was replaced while this phone was ordering: back to the look-only menu.
      if (PUBLIC && e.status === 403) { sendError = null; renderSendState(); clearTable(); setOrdering(false, 'qrInvalid'); return; }
      sendError = { kind: e.kind || 'network', code: e.status || '', retryAfter: e.retryAfter || 60 };
      renderSendState();
      $('#sendError').scrollIntoView({ block: 'nearest' });
    }
  }

  // ---------- Ordering on / off (public website) ----------
  // noticeKey: why ordering is off, shown above the menu (and re-translated on a language change).
  function setOrdering(on, noticeKey) {
    ordering = on;
    document.documentElement.classList.toggle('view-only', !on);
    const note = $('#orderNotice');
    if (noticeKey) note.dataset.i18n = noticeKey; else delete note.dataset.i18n;
    note.textContent = noticeKey ? t(noticeKey) : '';
    note.hidden = !noticeKey;
    if (!on) ['orderSheet', 'optionsSheet'].forEach((id) => { const d = document.getElementById(id); if (d.open) d.close(); });
    renderTableChip();
  }
  // Ask the shop computer whether the scanned table key is good. No key → look-only menu;
  // no answer (shop closed, computer off) → look-only menu, asking again every 30 seconds.
  let verifyTimer = null, verifying = false;
  async function verifyTable() {
    clearTimeout(verifyTimer);
    if (!PUBLIC || verifying) return;
    if (!table || !tableKey) return setOrdering(false, expiredOnLoad ? 'qrExpired' : 'qrNeeded');
    if (!THL.API_READY) return setOrdering(false, 'orderOffline');
    verifying = true;
    try {
      await THL.checkTable(table, tableKey);
      setOrdering(true);
      checkStatus();
    } catch (e) {
      if (e.status === 403) { clearTable(); setOrdering(false, 'qrInvalid'); }
      else { if (!ordering) setOrdering(false, 'orderOffline'); verifyTimer = setTimeout(verifyTable, 30000); }
    } finally { verifying = false; }
  }
  document.addEventListener('visibilitychange', () => { if (PUBLIC && !document.hidden && !ordering && tableKey) verifyTable(); });

  // ---------- Live status of sent orders ----------
  // Asks the server about this phone's own unfinished orders (id + key) and stops as soon as
  // every one is served or cancelled. Paused while the page is hidden (phone locked, other app).
  // Slower on the public website: the cloud order server has a free daily request limit.
  const STATUS_POLL_MS = THL.PUBLIC ? 15000 : 6000;
  let statusTimer = null;
  const unresolved = () => getSent().filter((o) => o.key && (o.status === 'new' || o.status === 'preparing' || o.status === 'served'));
  function watchStatus() {
    clearTimeout(statusTimer);
    statusTimer = null;
    if (document.hidden || !unresolved().length) return;
    statusTimer = setTimeout(checkStatus, STATUS_POLL_MS);
  }
  async function checkStatus() {
    clearTimeout(statusTimer);
    statusTimer = null;
    if (expireTable()) return; // table expired: stop polling for the old one
    const pending = unresolved();
    if (!pending.length) return;
    try {
      const res = await THL.orderStatus(pending.map((o) => ({ id: o.id, key: o.key })));
      const sent = getSent();
      let changed = false;
      res.orders.forEach((u) => {
        const o = sent.find((x) => x.id === u.id);
        if (!o || o.status === u.status || !STATUS_LABEL[u.status]) return;
        o.status = u.status;
        changed = true;
        toast(`${fmt(t('orderNo'), { n: o.id })}: ${t(STATUS_LABEL[u.status])}`);
      });
      if (changed) { store.set(sentKey(), sent); if ($('#orderSheet').open) renderSent(); }
    } catch (e) { /* quiet — the next round tries again */ }
    watchStatus();
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) watchStatus(); else checkStatus(); });

  // ---------- Category highlight while scrolling ----------
  let observer;
  function watchSections() {
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.id.replace('cat-', '');
        document.querySelectorAll('.cat-btn').forEach((b) => {
          const on = b.dataset.cat === id;
          b.setAttribute('aria-current', String(on));
          if (on) b.scrollIntoView({ block: 'nearest', inline: 'center' });
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.cat-section').forEach((s) => observer.observe(s));
  }

  // Keep the category tabs just under the (variable-height) sticky header
  function stickTabs() { $('.cats').style.top = document.querySelector('.site-header').offsetHeight + 'px'; }

  // ---------- Wire up ----------
  THL.init(DICT);
  $('#sampleNotice').hidden = !THL.SITE.samplePrices;
  initTable();
  renderMenu();
  renderTableChip();
  stickTabs();
  window.addEventListener('resize', stickTabs);
  THL.onLang(() => { renderMenu(); renderTableChip(); if ($('#orderSheet').open) renderCart(); if ($('#optionsSheet').open) renderOptions(); if ($('#photoSheet').open && photoId) openPhoto(photoId); stickTabs(); });

  // Full photo → thumbnail → placeholder if a file is missing
  $('#photoImg').addEventListener('error', (e) => {
    const img = e.currentTarget;
    if (!img.dataset.tried && img.dataset.thumb) { img.dataset.tried = '1'; img.src = img.dataset.thumb; }
    else if (!img.src.endsWith('placeholder.svg')) { img.src = 'assets/images/menu/placeholder.svg'; }
  });

  // ?dish=ID (from the home page favourites): scroll to it, highlight it, show its photo
  let pendingDish = new URLSearchParams(location.search).get('dish');
  function spotlightDish() {
    if (!pendingDish || !byId[pendingDish]) return;
    const id = pendingDish;
    pendingDish = null;
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (card) {
      card.scrollIntoView({ block: 'center' });
      card.classList.add('spotlight');
      setTimeout(() => card.classList.remove('spotlight'), 4000);
    }
    openPhoto(id);
  }
  // Closed by picking a table, the Cancel button, Esc or the phone's back button
  $('#tableSheet').addEventListener('close', () => { if (table) spotlightDish(); else toast(t('needTable')); });

  $('#confirmOptions').addEventListener('click', () => {
    if (!optionDraft) return;
    const draft = optionDraft; optionDraft = null;
    close('optionsSheet');
    commitLine(draft.id, draft.options, draft.editIndex);
  });
  $('#optionsSheet').addEventListener('close', () => { optionDraft = null; });
  $('#tableChip').addEventListener('click', openTablePicker);
  const openOrder = () => { renderCart(); $('#orderName').value = guestName; open('orderSheet'); };
  $('#viewOrder').addEventListener('click', openOrder);
  $('#placeOrder').addEventListener('click', openOrder);
  $('#sendOrder').addEventListener('click', sendOrder);
  $('#orderNote').addEventListener('input', () => { if (clientId || sendError) { newAttempt(); renderSendState(); } });
  // The name is part of the order too: changing it after a failed send makes it a new order (fresh clientId)
  $('#orderName').addEventListener('input', (e) => { setGuestName(e.target.value); if (clientId || sendError) { newAttempt(); renderSendState(); } });

  if (PUBLIC) { spotlightDish(); verifyTable(); }
  else if (!table) openTablePicker(expiredOnLoad); else spotlightDish();
  checkStatus(); // pick up anything that changed while the page was closed
  setInterval(() => { if (!document.hidden) expireTable(); }, 30000);
})();
