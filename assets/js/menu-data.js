/* Thong Heng Lee menu.

   Photos: assets/images/menu/<id>.jpg (card) and assets/images/menu/full/<id>.jpg (View photo).
   Rice-dish names follow the printed menu (Newmenu_A4). `egg: true` lets guests
   add optional eggs before adding the dish to their basket.

   Menu number: guests and staff see `no` when a dish has one, otherwise its `id` (numberOf, at the
   end of this file). The eight oldest rice dishes keep their R.. id for photos and saved orders,
   so they carry the number from the restaurant's own list in `no`.

   Names: th, en, zs (Chinese Simplified), ja, my (Burmese), ko (Korean), id (Indonesian), es (Spanish), fr (French).
   ⚠ The my / ko / es / fr dish names are machine-translated drafts — have a native speaker
   check them (see PROGRESS.md §5).

   The server reads prices from this file too, so what guests see is exactly
   what the staff screen charges. Save the file and reload — no restart needed. */

// =============================================================================
//  PRICE CONTROLS (baht). The `price` on each dish below is a PLACEHOLDER.
//  Final price = PRICE_OVERRIDES[id]  if the dish is listed there,
//              = CATEGORY_MULTIPLIER[cat] × PRICE_MULTIPLIER × price  otherwise,
//                rounded to the nearest PRICE_ROUND_TO baht.
//  Once all real prices are in, set SITE.samplePrices = false in common.js.
// =============================================================================
const PRICE_MULTIPLIER = 1;      // e.g. 1.1 raises every placeholder price by 10%
const CATEGORY_MULTIPLIER = {    // per-category adjustment on top of PRICE_MULTIPLIER
  rice: 1, noodles: 1, sides: 1, dessert: 1, drinks: 1,
};
const PRICE_ROUND_TO = 5;        // round results to 5 baht (use 1 for exact)
const PRICE_OVERRIDES = {        // exact real prices by dish id — these always win
  // 'R02': 65,     // ข้าวกะเพราไก่
  // '10001': 55,   // ผัดไทยธรรมดา
  // '30200': 35,   // ชาไทยเย็น
};

window.THL_MENU = {
  categories: [
    { id: 'rice',    name: { th: 'ข้าวราดกับข้าว', en: 'Rice dishes', zs: '盖饭', ja: 'ごはんもの', my: 'ထမင်းဟင်းများ', ko: '덮밥', es: 'Platos con arroz', fr: 'Plats sur riz', id: 'Nasi dengan lauk' } },
    { id: 'noodles', name: { th: 'ผัดไทย', en: 'Pad Thai', zs: '泰式炒河粉', ja: 'パッタイ', my: 'ပဒ်ထိုင်း', ko: '팟타이', es: 'Pad thai', fr: 'Pad thaï', id: 'Pad Thai' } },
    { id: 'sides',   name: { th: 'ต้ม แกง และกับข้าว', en: 'Soups & sides', zs: '汤品与小菜', ja: 'スープ・サイド', my: 'ဟင်းချို၊ ဟင်းနှင့် အရံဟင်း', ko: '수프 & 사이드', es: 'Sopas y guarniciones', fr: 'Soupes et accompagnements', id: 'Sup & lauk' } },
    { id: 'dessert', name: { th: 'ของหวาน', en: 'Desserts', zs: '甜点', ja: 'デザート', my: 'အချိုပွဲ', ko: '디저트', es: 'Postres', fr: 'Desserts', id: 'Hidangan penutup' } },
    { id: 'drinks',  name: { th: 'เครื่องดื่ม', en: 'Drinks', zs: '饮料', ja: 'ドリンク', my: 'သောက်စရာ', ko: '음료', es: 'Bebidas', fr: 'Boissons', id: 'Minuman' } },
  ],
  items: [
    // ---- Rice dishes (optional egg add-ons) ----
    { id: 'R02', no: '19110', cat: 'rice', price: 60, egg: true, fav: true, name: { th: 'ข้าวกะเพราไก่', en: 'Stir-fried chicken with holy basil on rice', zs: '九层塔炒鸡肉盖饭', ja: '鶏肉のガパオライス', my: 'ကြက်သားပင်စိမ်းကြော် ထမင်း', ko: '닭고기 바질 볶음 덮밥', es: 'Pollo salteado con albahaca sagrada y arroz', fr: 'Poulet sauté au basilic sacré sur riz', id: 'Nasi ayam tumis kemangi suci' } },
    { id: 'R01', no: '18210', cat: 'rice', price: 60, egg: true, name: { th: 'ข้าวกะเพราหมูสับ', en: 'Stir-fried minced pork with holy basil on rice', zs: '香料肉末盖饭', ja: '豚ひき肉のガパオライス', my: 'ဝက်သားစင်းကောပင်စိမ်းကြော် ထမင်း', ko: '다진 돼지고기 바질 볶음 덮밥', es: 'Cerdo picado salteado con albahaca sagrada y arroz', fr: 'Porc haché sauté au basilic sacré sur riz', id: 'Nasi babi cincang tumis kemangi suci' } },
    { id: 'R03', no: '13110', cat: 'rice', price: 70, egg: true, name: { th: 'ข้าวกะเพราเนื้อสับ', en: 'Stir-fried minced beef with holy basil on rice', zs: '罗勒叶炒牛肉末盖饭', ja: '牛ひき肉のガパオライス', my: 'အမဲသားစင်းကောပင်စိမ်းကြော် ထမင်း', ko: '다진 소고기 바질 볶음 덮밥', es: 'Ternera picada salteada con albahaca sagrada y arroz', fr: 'Bœuf haché sauté au basilic sacré sur riz', id: 'Nasi daging sapi cincang tumis kemangi suci' } },
    { id: 'R05', no: '18120', cat: 'rice', price: 70, egg: true, name: { th: 'ข้าวกะเพรากระดูกอ่อนหมูตุ๋น', en: 'Holy basil stir-fry with stewed pork cartilage on rice', zs: '打抛炖猪软骨盖饭', ja: '豚軟骨煮込みのガパオライス', my: 'ဝက်နံရိုးနူးပြုတ်ပင်စိမ်းကြော် ထမင်း', ko: '돼지 연골찜 바질 볶음 덮밥', es: 'Cartílago de cerdo guisado con albahaca sagrada y arroz', fr: 'Cartilage de porc mijoté au basilic sacré sur riz', id: 'Nasi tumis kemangi suci dengan tulang rawan babi rebus' } },
    { id: 'R04', no: '18410', cat: 'rice', price: 60, egg: true, name: { th: 'ข้าวหมูกระเทียม', en: 'Fried pork with garlic & pepper on rice', zs: '泰式蒜香炒猪肉饭', ja: 'タイ風豚肉のガーリック炒めごはん', my: 'ဝက်သားကြက်သွန်ဖြူငရုတ်ကောင်းကြော် ထမင်း', ko: '마늘 후추 돼지고기 볶음 덮밥', es: 'Cerdo frito con ajo y pimienta con arroz', fr: 'Porc frit à l’ail et au poivre sur riz', id: 'Nasi babi goreng bawang putih & lada' } },
    { id: 'R06', no: '14020', cat: 'rice', price: 80, egg: true, name: { th: 'ข้าวกะเพราทะเล (ปลา กุ้ง ปลาหมึก)', en: 'Seafood (fish, shrimp, squid) with holy basil on rice', zs: '罗勒叶炒海鲜盖饭（鱼、虾、鱿鱼）', ja: 'シーフードガパオライス（魚・エビ・イカ）', my: 'ပင်လယ်စာ(ငါး၊ ပုစွန်၊ ပြည်ကြီးငါး)ပင်စိမ်းကြော် ထမင်း', ko: '해산물(생선·새우·오징어) 바질 볶음 덮밥', es: 'Marisco (pescado, gambas, calamar) con albahaca sagrada y arroz', fr: 'Fruits de mer (poisson, crevettes, calamar) au basilic sacré sur riz', id: 'Nasi seafood (ikan, udang, cumi) tumis kemangi suci' } },
    { id: 'R07', no: '14310', cat: 'rice', price: 80, egg: true, name: { th: 'ข้าวทะเลผัดพริกเผา', en: 'Seafood stir-fried with chilli paste on rice', zs: '泰式甜辣酱炒海鲜饭', ja: '海鮮の甘辛チリペースト炒めごはん', my: 'ပင်လယ်စာငရုတ်ဆီအနှစ်ကြော် ထမင်း', ko: '해산물 칠리 페이스트 볶음 덮밥', es: 'Marisco salteado con pasta de chile y arroz', fr: 'Fruits de mer sautés à la pâte de piment sur riz', id: 'Nasi seafood tumis pasta cabai' } },
    { id: 'R08', no: '14410', cat: 'rice', price: 80, egg: true, name: { th: 'ข้าวทะเลผัดพริกแกง', en: 'Seafood stir-fried with red curry paste on rice', zs: '红咖喱炒海鲜饭', ja: '海鮮のレッドカレー炒めごはん', my: 'ပင်လယ်စာဟင်းအနီကြော် ထမင်း', ko: '해산물 레드 커리 페이스트 볶음 덮밥', es: 'Marisco salteado con pasta de curry rojo y arroz', fr: 'Fruits de mer sautés à la pâte de curry rouge sur riz', id: 'Nasi seafood tumis pasta kari merah' } },
    // Added from the Food Drink photo folder (placeholder prices).
    { id: '14210', cat: 'rice', price: 80, egg: true, name: { th: 'ข้าวทะเลผัดผงกะหรี่', en: 'Seafood stir-fried with curry powder on rice', zs: '咖喱粉炒海鲜盖饭', ja: '海鮮のカレー粉炒めごはん', my: 'ပင်လယ်စာကာရီမှုန့်ကြော် ထမင်း', ko: '해산물 카레 가루 볶음 덮밥', es: 'Marisco salteado con curry en polvo y arroz', fr: 'Fruits de mer sautés au curry en poudre sur riz', id: 'Nasi seafood tumis bubuk kari' } },
    { id: '16100', cat: 'rice', price: 70, egg: true, name: { th: 'ข้าวผัดกุ้ง', en: 'Shrimp fried rice', zs: '鲜虾炒饭', ja: 'エビチャーハン', my: 'ပုစွန်ထမင်းကြော်', ko: '새우 볶음밥', es: 'Arroz frito con gambas', fr: 'Riz sauté aux crevettes', id: 'Nasi goreng udang' } },
    { id: '18110', cat: 'rice', price: 65, egg: true, name: { th: 'ข้าวกระดูกอ่อนหมูตุ๋น', en: 'Stewed pork cartilage on rice', zs: '炖猪软骨饭', ja: '豚軟骨の煮込みごはん', my: 'ဝက်နံရိုးနူးပြုတ် ထမင်း', ko: '돼지 연골찜 덮밥', es: 'Cartílago de cerdo guisado con arroz', fr: 'Cartilage de porc mijoté sur riz', id: 'Nasi tulang rawan babi rebus' } },
    { id: '19210', cat: 'rice', price: 60, egg: true, name: { th: 'ข้าวลาบไก่', en: 'Spicy chicken larb on rice', zs: '泰式辣拌鸡肉末饭', ja: '鶏肉のラープごはん', my: 'ကြက်သားလာ့ပ် ထမင်း', ko: '닭고기 랍 덮밥', es: 'Larb de pollo picante con arroz', fr: 'Larb de poulet épicé sur riz', id: 'Nasi larb ayam pedas' } },
    { id: '19310', cat: 'rice', price: 65, egg: true, name: { th: 'ข้าวอกไก่ผัดผงกะหรี่', en: 'Chicken breast stir-fried with curry powder on rice', zs: '咖喱粉炒鸡胸肉盖饭', ja: '鶏むね肉のカレー粉炒めごはん', my: 'ကြက်ရင်အုံသားကာရီမှုန့်ကြော် ထမင်း', ko: '닭가슴살 카레 가루 볶음 덮밥', es: 'Pechuga de pollo salteada con curry en polvo y arroz', fr: 'Blanc de poulet sauté au curry en poudre sur riz', id: 'Nasi dada ayam tumis bubuk kari' } },
    { id: '19410', cat: 'rice', price: 65, egg: true, name: { th: 'ข้าวอกไก่ผัดพริกแกง', en: 'Chicken breast stir-fried with red curry paste on rice', zs: '红咖喱炒鸡胸肉盖饭', ja: '鶏むね肉のレッドカレー炒めごはん', my: 'ကြက်ရင်အုံသားဟင်းအနီကြော် ထမင်း', ko: '닭가슴살 레드 커리 페이스트 볶음 덮밥', es: 'Pechuga de pollo salteada con pasta de curry rojo y arroz', fr: 'Blanc de poulet sauté à la pâte de curry rouge sur riz', id: 'Nasi dada ayam tumis pasta kari merah' } },
    { id: '19510', cat: 'rice', price: 65, egg: true, name: { th: 'ข้าวอกไก่เขียวหวานแห้ง', en: 'Dry green curry chicken breast on rice', zs: '干炒青咖喱鸡胸肉盖饭', ja: '鶏むね肉のグリーンカレー炒めごはん', my: 'ကြက်ရင်အုံသားဟင်းစိမ်းခြောက်ကြော် ထမင်း', ko: '닭가슴살 그린 커리 볶음 덮밥', es: 'Pechuga de pollo al curry verde seco con arroz', fr: 'Blanc de poulet au curry vert sec sur riz', id: 'Nasi dada ayam kari hijau kering' } },
    { id: '19610', cat: 'rice', price: 60, egg: true, name: { th: 'ข้าวไก่กระเทียม', en: 'Fried chicken with garlic & pepper on rice', zs: '泰式蒜香炒鸡肉饭', ja: 'タイ風鶏肉のガーリック炒めごはん', my: 'ကြက်သားကြက်သွန်ဖြူငရုတ်ကောင်းကြော် ထမင်း', ko: '마늘 후추 닭고기 볶음 덮밥', es: 'Pollo frito con ajo y pimienta con arroz', fr: 'Poulet frit à l’ail et au poivre sur riz', id: 'Nasi ayam goreng bawang putih & lada' } },
    { id: '19710', cat: 'rice', price: 65, egg: true, name: { th: 'ข้าวอกไก่พริกไทยดำ', en: 'Chicken breast stir-fried with black pepper on rice', zs: '黑胡椒炒鸡胸肉盖饭', ja: '鶏むね肉の黒こしょう炒めごはん', my: 'ကြက်ရင်အုံသားငရုတ်ကောင်းနက်ကြော် ထမင်း', ko: '닭가슴살 흑후추 볶음 덮밥', es: 'Pechuga de pollo salteada con pimienta negra y arroz', fr: 'Blanc de poulet sauté au poivre noir sur riz', id: 'Nasi dada ayam tumis lada hitam' } },

    // ---- Pad Thai ----
    { id: '10001', cat: 'noodles', price: 50, fav: true, name: { th: 'ผัดไทยธรรมดา', en: 'Pad Thai (classic)', zs: '泰式炒河粉（原味）', ja: 'パッタイ（プレーン）', my: 'ပဒ်ထိုင်း (ရိုးရိုး)', ko: '팟타이 (기본)', es: 'Pad thai (clásico)', fr: 'Pad thaï (classique)', id: 'Pad Thai (klasik)' } },
    { id: '10002', cat: 'noodles', price: 60, name: { th: 'ผัดไทยไก่', en: 'Pad Thai with chicken', zs: '鸡肉泰式炒河粉', ja: '鶏肉のパッタイ', my: 'ကြက်သားပဒ်ထိုင်း', ko: '닭고기 팟타이', es: 'Pad thai con pollo', fr: 'Pad thaï au poulet', id: 'Pad Thai ayam' } },
    { id: '10003', cat: 'noodles', price: 70, name: { th: 'ผัดไทยกุ้ง', en: 'Pad Thai with shrimp', zs: '鲜虾泰式炒河粉', ja: 'エビのパッタイ', my: 'ပုစွန်ပဒ်ထိုင်း', ko: '새우 팟타이', es: 'Pad thai con gambas', fr: 'Pad thaï aux crevettes', id: 'Pad Thai udang' } },
    { id: '10004', cat: 'noodles', price: 80, name: { th: 'ผัดไทยทะเล', en: 'Seafood Pad Thai', zs: '海鲜泰式炒河粉', ja: 'シーフードパッタイ', my: 'ပင်လယ်စာပဒ်ထိုင်း', ko: '해산물 팟타이', es: 'Pad thai de marisco', fr: 'Pad thaï aux fruits de mer', id: 'Pad Thai seafood' } },

    // ---- Soups & sides ----
    { id: '40010', cat: 'sides', price: 120, name: { th: 'ต้มยำทะเล', en: 'Tom yum seafood soup', zs: '冬阴功海鲜汤', ja: 'トムヤム（シーフード）', my: 'ပင်လယ်စာတုံယမ်းဟင်းချို', ko: '해산물 똠얌 수프', es: 'Sopa tom yum de marisco', fr: 'Soupe tom yum aux fruits de mer', id: 'Sup tom yum seafood' } },
    { id: '40020', cat: 'sides', price: 100, name: { th: 'ต้มยำไก่', en: 'Tom yum chicken soup', zs: '冬阴鸡汤', ja: 'トムヤム（チキン）', my: 'ကြက်သားတုံယမ်းဟင်းချို', ko: '닭고기 똠얌 수프', es: 'Sopa tom yum de pollo', fr: 'Soupe tom yum au poulet', id: 'Sup tom yum ayam' } },
    { id: '40030', cat: 'sides', price: 80, name: { th: 'เกาเหลากระดูกอ่อนหมูตุ๋น', en: 'Stewed pork cartilage soup', zs: '炖猪软骨清汤', ja: '豚軟骨煮込みスープ', my: 'ဝက်နံရိုးနူးပြုတ်ဟင်းချို', ko: '돼지 연골찜 수프', es: 'Sopa de cartílago de cerdo guisado', fr: 'Soupe de cartilage de porc mijoté', id: 'Sup tulang rawan babi rebus' } },
    { id: '40040', cat: 'sides', price: 70, name: { th: 'แกงจืดเต้าหู้หมูสับ', en: 'Clear soup with tofu & minced pork', zs: '豆腐肉末清汤', ja: '豆腐と豚ひき肉のスープ', my: 'တိုဟူးနှင့်ဝက်သားစင်းကောဟင်းရည်ကြည်', ko: '두부 다진 돼지고기 맑은 국', es: 'Sopa clara con tofu y cerdo picado', fr: 'Bouillon clair au tofu et porc haché', id: 'Sup bening tahu & babi cincang' } },
    { id: '80001', cat: 'sides', price: 50, name: { th: 'เกี๊ยวทอดไส้หมู', en: 'Fried pork wontons', zs: '炸猪肉馄饨', ja: '揚げワンタン（豚肉）', my: 'ဝက်သားဖက်ထုပ်ကြော်', ko: '돼지고기 튀김 완탕', es: 'Wontons fritos de cerdo', fr: 'Wontons frits au porc', id: 'Pangsit babi goreng' } },
    { id: '40050', cat: 'sides', price: 10, name: { th: 'ไข่ดาว', en: 'Fried egg', zs: '煎鸡蛋', ja: '目玉焼き', my: 'ကြက်ဥကြော်', ko: '계란 프라이', es: 'Huevo frito', fr: 'Œuf au plat', id: 'Telur mata sapi' } },
    { id: '40060', cat: 'sides', price: 15, name: { th: 'ไข่เจียว', en: 'Thai omelette', zs: '泰式煎蛋', ja: 'タイ風オムレツ', my: 'ထိုင်းစတိုင် ကြက်ဥမွှေကြော်', ko: '태국식 오믈렛', es: 'Tortilla tailandesa', fr: 'Omelette thaïe', id: 'Telur dadar Thailand' } },
    { id: '10000', cat: 'sides', price: 10, name: { th: 'ข้าวเปล่า', en: 'Steamed rice', zs: '白饭', ja: 'ごはん', my: 'ထမင်းဖြူ', ko: '공깃밥', es: 'Arroz blanco', fr: 'Riz blanc', id: 'Nasi putih' } },

    // ---- Desserts ----
    { id: '70040', cat: 'dessert', price: 45, fav: true, name: { th: 'ไอศกรีมกะทิทรงเครื่อง ชาวเกาะ', en: 'Chaokoh coconut ice cream with toppings', zs: 'Chaokoh 椰子冰淇淋（配料）', ja: 'チャオコー ココナッツアイス（トッピング付き）', my: 'Chaokoh အုန်းနို့ရေခဲမုန့်', ko: '차오코 코코넛 아이스크림 (토핑 포함)', es: 'Helado de coco Chaokoh con toppings', fr: 'Glace coco Chaokoh avec garnitures', id: 'Es krim kelapa Chaokoh dengan topping' } },
    { id: '70060', cat: 'dessert', price: 80, name: { th: 'ข้าวเหนียวมะม่วง', en: 'Mango sticky rice', zs: '芒果糯米饭', ja: 'マンゴーもち米', my: 'သရက်သီး ကောက်ညှင်းထမင်း', ko: '망고 찹쌀밥', es: 'Arroz glutinoso con mango', fr: 'Riz gluant à la mangue', id: 'Ketan mangga' } },
    { id: '70010', cat: 'dessert', price: 30, name: { th: 'เฉาก๊วยนมสด', en: 'Grass jelly with fresh milk', zs: '仙草鲜奶', ja: '仙草ゼリー ミルクがけ', my: 'ကျောက်ကျောနွားနို့ဆမ်း', ko: '선초 젤리 우유', es: 'Gelatina de hierba con leche fresca', fr: 'Gelée d’herbe au lait frais', id: 'Cincau susu segar' } },
    { id: '70020', cat: 'dessert', price: 25, name: { th: 'เฉาก๊วยน้ำเชื่อม', en: 'Grass jelly in syrup', zs: '仙草糖水', ja: '仙草ゼリー シロップがけ', my: 'ကျောက်ကျောသကြားရည်ဆမ်း', ko: '선초 젤리 시럽', es: 'Gelatina de hierba en almíbar', fr: 'Gelée d’herbe au sirop', id: 'Cincau sirop' } },
    { id: '70050', cat: 'dessert', price: 25, name: { th: 'ไอศกรีมโคน ชาวเกาะ', en: 'Chaokoh coconut ice cream cone', zs: 'Chaokoh 椰子冰淇淋甜筒', ja: 'チャオコー ココナッツアイス（コーン）', my: 'Chaokoh အုန်းနို့ရေခဲမုန့် (ဝေဖာခွက်)', ko: '차오코 코코넛 아이스크림 콘', es: 'Cucurucho de helado de coco Chaokoh', fr: 'Cornet de glace coco Chaokoh', id: 'Es krim kelapa Chaokoh dalam cone' } },
    { id: '70051', cat: 'dessert', price: 25, name: { th: 'ไอศกรีม ชาวเกาะ ช็อกโกแลต', en: 'Chaokoh chocolate ice cream', zs: 'Chaokoh 巧克力冰淇淋', ja: 'チャオコー チョコレートアイス', my: 'Chaokoh ချောကလက်ရေခဲမုန့်', ko: '차오코 초콜릿 아이스크림', es: 'Helado de chocolate Chaokoh', fr: 'Glace au chocolat Chaokoh', id: 'Es krim cokelat Chaokoh' } },
    { id: '70030', cat: 'dessert', price: 35, name: { th: 'ไอศกรีมหัวหิน มะพร้าว', en: 'Hua Hin ice cream cup – coconut', zs: '华欣冰淇淋杯－椰子', ja: 'ホアヒン アイスカップ（ココナッツ）', my: 'ဟွာဟင်းရေခဲမုန့်ဘူး – အုန်းသီး', ko: '후아힌 아이스크림 컵 – 코코넛', es: 'Vasito de helado Hua Hin – coco', fr: 'Coupe glacée Hua Hin – coco', id: 'Es krim cup Hua Hin – kelapa' } },
    { id: '70031', cat: 'dessert', price: 35, name: { th: 'ไอศกรีมหัวหิน ขนุน', en: 'Hua Hin ice cream cup – jackfruit', zs: '华欣冰淇淋杯－菠萝蜜', ja: 'ホアヒン アイスカップ（ジャックフルーツ）', my: 'ဟွာဟင်းရေခဲမုန့်ဘူး – ပိန္နဲသီး', ko: '후아힌 아이스크림 컵 – 잭프루트', es: 'Vasito de helado Hua Hin – yaca', fr: 'Coupe glacée Hua Hin – jacque', id: 'Es krim cup Hua Hin – nangka' } },
    { id: '70032', cat: 'dessert', price: 35, name: { th: 'ไอศกรีมหัวหิน ทุเรียน', en: 'Hua Hin ice cream cup – durian', zs: '华欣冰淇淋杯－榴莲', ja: 'ホアヒン アイスカップ（ドリアン）', my: 'ဟွာဟင်းရေခဲမုန့်ဘူး – ဒူးရင်းသီး', ko: '후아힌 아이스크림 컵 – 두리안', es: 'Vasito de helado Hua Hin – durián', fr: 'Coupe glacée Hua Hin – durian', id: 'Es krim cup Hua Hin – durian' } },
    { id: '70033', cat: 'dessert', price: 35, name: { th: 'ไอศกรีมหัวหิน ข้าวโพด', en: 'Hua Hin ice cream cup – corn', zs: '华欣冰淇淋杯－玉米', ja: 'ホアヒン アイスカップ（コーン）', my: 'ဟွာဟင်းရေခဲမုန့်ဘူး – ပြောင်းဖူး', ko: '후아힌 아이스크림 컵 – 옥수수', es: 'Vasito de helado Hua Hin – maíz', fr: 'Coupe glacée Hua Hin – maïs', id: 'Es krim cup Hua Hin – jagung' } },
    { id: '70034', cat: 'dessert', price: 35, name: { th: 'ไอศกรีมหัวหิน ถั่วดำ', en: 'Hua Hin ice cream cup – black bean', zs: '华欣冰淇淋杯－黑豆', ja: 'ホアヒン アイスカップ（黒豆）', my: 'ဟွာဟင်းရေခဲမုန့်ဘူး – ပဲနက်', ko: '후아힌 아이스크림 컵 – 검은콩', es: 'Vasito de helado Hua Hin – frijol negro', fr: 'Coupe glacée Hua Hin – haricot noir', id: 'Es krim cup Hua Hin – kacang hitam' } },
    { id: '70035', cat: 'dessert', price: 35, name: { th: 'ไอศกรีมหัวหิน เผือก', en: 'Hua Hin ice cream cup – taro', zs: '华欣冰淇淋杯－芋头', ja: 'ホアヒン アイスカップ（タロイモ）', my: 'ဟွာဟင်းရေခဲမုန့်ဘူး – ပိန်းဥ', ko: '후아힌 아이스크림 컵 – 타로', es: 'Vasito de helado Hua Hin – taro', fr: 'Coupe glacée Hua Hin – taro', id: 'Es krim cup Hua Hin – talas' } },
    { id: '70036', cat: 'dessert', price: 35, name: { th: 'ไอศกรีมหัวหิน ชาไทย', en: 'Hua Hin ice cream cup – Thai tea', zs: '华欣冰淇淋杯－泰式奶茶', ja: 'ホアヒン アイスカップ（タイティー）', my: 'ဟွာဟင်းရေခဲမုန့်ဘူး – ထိုင်းလက်ဖက်ရည်', ko: '후아힌 아이스크림 컵 – 타이 티', es: 'Vasito de helado Hua Hin – té tailandés', fr: 'Coupe glacée Hua Hin – thé thaï', id: 'Es krim cup Hua Hin – teh Thai' } },
    { id: '70037', cat: 'dessert', price: 35, name: { th: 'ไอศกรีมหัวหิน ชาเขียว', en: 'Hua Hin ice cream cup – green tea', zs: '华欣冰淇淋杯－绿茶', ja: 'ホアヒン アイスカップ（抹茶）', my: 'ဟွာဟင်းရေခဲမုန့်ဘူး – လက်ဖက်စိမ်း', ko: '후아힌 아이스크림 컵 – 녹차', es: 'Vasito de helado Hua Hin – té verde', fr: 'Coupe glacée Hua Hin – thé vert', id: 'Es krim cup Hua Hin – teh hijau' } },

    // ---- Drinks ----
    { id: '30200', cat: 'drinks', price: 30, name: { th: 'ชาไทยเย็น', en: 'Thai iced milk tea', zs: '泰式冰奶茶', ja: 'タイアイスミルクティー', my: 'ထိုင်းလက်ဖက်ရည်အေး', ko: '타이 아이스 밀크티', es: 'Té tailandés helado con leche', fr: 'Thé thaï glacé au lait', id: 'Es teh susu Thai' } },
    { id: '31104', cat: 'drinks', price: 25, name: { th: 'โอเลี้ยง', en: 'Oliang (Thai iced black coffee)', zs: '泰式冰黑咖啡', ja: 'オーリアン（タイ式アイスコーヒー）', my: 'အိုလျန် (ထိုင်းကော်ဖီအေး)', ko: '오리양 (태국식 아이스 블랙커피)', es: 'Oliang (café negro helado tailandés)', fr: 'Oliang (café noir glacé thaï)', id: 'Oliang (es kopi hitam Thai)' } },
    { id: '31105', cat: 'drinks', price: 30, name: { th: 'โอเลี้ยงยกล้อ', en: 'Oliang Yok Lor', zs: '泰式冰黑咖啡（Yok Lor）', ja: 'オーリアン（ヨックロー）', my: 'အိုလျန် ယော့လော်', ko: '오리양 욕러', es: 'Oliang Yok Lor', fr: 'Oliang Yok Lor', id: 'Oliang Yok Lor' } },
    { id: '30100', cat: 'drinks', price: 25, name: { th: 'น้ำกระเจี๊ยบพุทราจีน', en: 'Roselle & jujube drink', zs: '洛神花红枣茶', ja: 'ローゼル＆ナツメドリンク', my: 'ချဉ်ပေါင်နီနှင့်ဆီးသီးဖျော်ရည်', ko: '로젤 대추 음료', es: 'Bebida de rosella y azufaifa', fr: 'Boisson roselle et jujube', id: 'Minuman rosela & bidara Cina' } },
    { id: '30300', cat: 'drinks', price: 25, name: { th: 'น้ำเก๊กฮวย', en: 'Chrysanthemum tea', zs: '菊花茶', ja: '菊花茶', my: 'ဂန္ဓမာလက်ဖက်ရည်', ko: '국화차', es: 'Té de crisantemo', fr: 'Thé au chrysanthème', id: 'Teh krisan' } },
    { id: '31100', cat: 'drinks', price: 25, name: { th: 'น้ำบ๊วย', en: 'Salted plum drink', zs: '酸梅汤', ja: '梅ジュース', my: 'ဆီးသီးဆားဖျော်ရည်', ko: '매실 음료', es: 'Bebida de ciruela salada', fr: 'Boisson à la prune salée', id: 'Minuman buah plum asin' } },
    { id: '31101', cat: 'drinks', price: 25, name: { th: 'น้ำมะตูม', en: 'Bael fruit drink', zs: '木橘茶', ja: 'ベールフルーツティー', my: 'ဥသျှစ်သီးဖျော်ရည်', ko: '벨 열매 음료', es: 'Bebida de bael', fr: 'Boisson au bael', id: 'Minuman buah maja' } },
    { id: '31103', cat: 'drinks', price: 25, name: { th: 'น้ำอัญชันมะนาว', en: 'Butterfly pea & lime', zs: '蝶豆花柠檬水', ja: 'バタフライピー＆ライム', my: 'အောင်မဲညိုနှင့် သံပုရာဖျော်ရည်', ko: '버터플라이 피 라임 음료', es: 'Flor de guisante azul con lima', fr: 'Pois papillon et citron vert', id: 'Bunga telang & jeruk nipis' } },
    { id: '31102', cat: 'drinks', price: 20, name: { th: 'น้ำส้มซันควิก', en: 'Sunquick orange drink', zs: 'Sunquick 橙汁', ja: 'サンクイック オレンジ', my: 'Sunquick လိမ္မော်ဖျော်ရည်', ko: '선퀵 오렌지 음료', es: 'Bebida de naranja Sunquick', fr: 'Boisson à l’orange Sunquick', id: 'Minuman jeruk Sunquick' } },
    { id: '37100', cat: 'drinks', price: 40, name: { th: 'น้ำแตงโมปั่น', en: 'Watermelon smoothie', zs: '西瓜冰沙', ja: 'スイカスムージー', my: 'ဖရဲသီးစမူသီ', ko: '수박 스무디', es: 'Batido de sandía', fr: 'Smoothie pastèque', id: 'Smoothie semangka' } },
    { id: '37200', cat: 'drinks', price: 40, name: { th: 'น้ำมะม่วงปั่น', en: 'Mango smoothie', zs: '芒果冰沙', ja: 'マンゴースムージー', my: 'သရက်သီးစမူသီ', ko: '망고 스무디', es: 'Batido de mango', fr: 'Smoothie mangue', id: 'Smoothie mangga' } },
    { id: '37300', cat: 'drinks', price: 40, name: { th: 'น้ำมะพร้าวปั่น', en: 'Coconut smoothie', zs: '椰子冰沙', ja: 'ココナッツスムージー', my: 'အုန်းသီးစမူသီ', ko: '코코넛 스무디', es: 'Batido de coco', fr: 'Smoothie coco', id: 'Smoothie kelapa' } },
    { id: '38010', cat: 'drinks', price: 25, name: { th: 'น้ำมะพร้าว มาลี โคโค่', en: 'Malee Coco coconut water', zs: 'Malee 椰子水', ja: 'マリー ココナッツウォーター', my: 'Malee Coco အုန်းရည်', ko: '말리 코코 코코넛 워터', es: 'Agua de coco Malee Coco', fr: 'Eau de coco Malee Coco', id: 'Air kelapa Malee Coco' } },
    { id: '33010', cat: 'drinks', price: 20, name: { th: 'ลิปตัน ไอซ์ที เลมอน', en: 'Lipton lemon iced tea', zs: '立顿柠檬冰茶', ja: 'リプトン レモンアイスティー', my: 'Lipton သံပုရာလက်ဖက်ရည်အေး', ko: '립톤 레몬 아이스티', es: 'Té helado de limón Lipton', fr: 'Thé glacé citron Lipton', id: 'Es teh lemon Lipton' } },
    { id: '33020', cat: 'drinks', price: 20, name: { th: 'โออิชิ กรีนที กลิ่นองุ่นเคียวโฮ', en: 'Oishi green tea – Kyoho grape', zs: 'Oishi 绿茶（巨峰葡萄）', ja: 'オイシ 緑茶（巨峰）', my: 'Oishi လက်ဖက်စိမ်း – ကျိုဟိုစပျစ်', ko: '오이시 녹차 – 거봉 포도', es: 'Té verde Oishi – uva Kyoho', fr: 'Thé vert Oishi – raisin Kyoho', id: 'Teh hijau Oishi – anggur Kyoho' } },
    { id: '33021', cat: 'drinks', price: 20, name: { th: 'โออิชิ กรีนที รสน้ำผึ้งมะนาว', en: 'Oishi green tea – honey lemon', zs: 'Oishi 绿茶（蜂蜜柠檬）', ja: 'オイシ 緑茶（はちみつレモン）', my: 'Oishi လက်ဖက်စိမ်း – ပျားရည်သံပုရာ', ko: '오이시 녹차 – 꿀 레몬', es: 'Té verde Oishi – miel y limón', fr: 'Thé vert Oishi – miel citron', id: 'Teh hijau Oishi – madu lemon' } },
    { id: '34300', cat: 'drinks', price: 20, name: { th: 'โค้ก คลาสสิก', en: 'Coca-Cola', zs: '可口可乐', ja: 'コカ・コーラ', my: 'ကိုကာကိုလာ', ko: '코카콜라', es: 'Coca-Cola', fr: 'Coca-Cola', id: 'Coca-Cola' } },
    { id: '34301', cat: 'drinks', price: 20, name: { th: 'โค้ก ซีโร่', en: 'Coke Zero', zs: '无糖可乐', ja: 'コカ・コーラ ゼロ', my: 'ကုတ် ဇီးရိုး', ko: '코카콜라 제로', es: 'Coca-Cola Zero', fr: 'Coca-Cola Zero', id: 'Coke Zero' } },
    { id: '34401', cat: 'drinks', price: 20, name: { th: 'เป๊ปซี่', en: 'Pepsi', zs: '百事可乐', ja: 'ペプシ', my: 'ပက်ပ်စီ', ko: '펩시', es: 'Pepsi', fr: 'Pepsi', id: 'Pepsi' } },
    { id: '34400', cat: 'drinks', price: 20, name: { th: 'เป๊ปซี่ แม็กซ์', en: 'Pepsi Max', zs: '百事可乐极度', ja: 'ペプシ マックス', my: 'ပက်ပ်စီ မက်စ်', ko: '펩시 맥스', es: 'Pepsi Max', fr: 'Pepsi Max', id: 'Pepsi Max' } },
    { id: '34200', cat: 'drinks', price: 20, name: { th: 'สไปรท์', en: 'Sprite', zs: '雪碧', ja: 'スプライト', my: 'စပရိုက်', ko: '스프라이트', es: 'Sprite', fr: 'Sprite', id: 'Sprite' } },
    { id: '34100', cat: 'drinks', price: 20, name: { th: 'แฟนต้า ส้ม', en: 'Fanta orange', zs: '芬达 橙味', ja: 'ファンタ オレンジ', my: 'ဖန်တာ လိမ္မော်', ko: '환타 오렌지', es: 'Fanta naranja', fr: 'Fanta orange', id: 'Fanta jeruk' } },
    { id: '34101', cat: 'drinks', price: 20, name: { th: 'แฟนต้า เขียว', en: 'Fanta green (cream soda)', zs: '芬达 绿（奶油苏打）', ja: 'ファンタ グリーン（クリームソーダ）', my: 'ဖန်တာ အစိမ်း (ခရင်မ်ဆိုဒါ)', ko: '환타 그린 (크림소다)', es: 'Fanta verde (soda de crema)', fr: 'Fanta verte (soda à la crème)', id: 'Fanta hijau (cream soda)' } },
    { id: '34102', cat: 'drinks', price: 20, name: { th: 'แฟนต้า แดง', en: 'Fanta red (strawberry)', zs: '芬达 红（草莓）', ja: 'ファンタ レッド（ストロベリー）', my: 'ဖန်တာ အနီ (စတော်ဘယ်ရီ)', ko: '환타 레드 (딸기)', es: 'Fanta roja (fresa)', fr: 'Fanta rouge (fraise)', id: 'Fanta merah (stroberi)' } },
    { id: '34000', cat: 'drinks', price: 15, name: { th: 'โซดา สิงห์', en: 'Singha soda water', zs: '胜狮苏打水', ja: 'シンハー ソーダ', my: 'Singha ဆိုဒါ', ko: '싱하 탄산수', es: 'Agua con gas Singha', fr: 'Eau gazeuse Singha', id: 'Air soda Singha' } },
    { id: '34010', cat: 'drinks', price: 20, name: { th: 'สิงห์ พิงก์เลมอนโซดา', en: 'Singha pink lemon soda', zs: '胜狮 粉红柠檬苏打', ja: 'シンハー ピンクレモンソーダ', my: 'Singha ပန်းရောင် သံပုရာဆိုဒါ', ko: '싱하 핑크 레몬 소다', es: 'Soda de limón rosa Singha', fr: 'Soda citron rose Singha', id: 'Soda lemon merah muda Singha' } },
    { id: '34020', cat: 'drinks', price: 20, name: { th: 'สิงห์ เลมอนครีมโซดา', en: 'Singha lemon cream soda', zs: '胜狮 柠檬奶油苏打', ja: 'シンハー レモンクリームソーダ', my: 'Singha သံပုရာ ခရင်မ်ဆိုဒါ', ko: '싱하 레몬 크림 소다', es: 'Soda de limón y crema Singha', fr: 'Soda citron-crème Singha', id: 'Soda lemon krim Singha' } },
    { id: '32010', cat: 'drinks', price: 15, name: { th: 'กระทิงแดง', en: 'Krating Daeng energy drink', zs: '红牛 Krating Daeng', ja: 'クラティンデーン（レッドブル）', my: 'Red Bullအားဖြည့်အချိုရည်', ko: '끄라팅댕 에너지 드링크', es: 'Bebida energética Krating Daeng', fr: 'Boisson énergisante Krating Daeng', id: 'Minuman energi Krating Daeng' } },
    { id: '32020', cat: 'drinks', price: 15, name: { th: 'คาราบาวแดง', en: 'Carabao Dang energy drink', zs: 'Carabao 能量饮料', ja: 'カラバオ・デーン', my: 'Carabao Dang အားဖြည့်အချိုရည်', ko: '카라바오 댕 에너지 드링크', es: 'Bebida energética Carabao Dang', fr: 'Boisson énergisante Carabao Dang', id: 'Minuman energi Carabao Dang' } },
    { id: '32060', cat: 'drinks', price: 15, name: { th: 'เอ็ม 150', en: 'M-150 energy drink', zs: 'M-150 能量饮料', ja: 'M-150', my: 'M-150 အားဖြည့်အချိုရည်', ko: 'M-150 에너지 드링크', es: 'Bebida energética M-150', fr: 'Boisson énergisante M-150', id: 'Minuman energi M-150' } },
    { id: '32040', cat: 'drinks', price: 15, name: { th: 'สปอนเซอร์', en: 'Sponsor electrolyte drink', zs: 'Sponsor 运动饮料', ja: 'スポンサー（スポーツドリンク）', my: 'Sponsor ဓာတ်ဆားအချိုရည်', ko: '스폰서 이온 음료', es: 'Bebida isotónica Sponsor', fr: 'Boisson isotonique Sponsor', id: 'Minuman elektrolit Sponsor' } },
    { id: '32050', cat: 'drinks', price: 20, name: { th: 'เบอร์ดี้ กาแฟโรบัสต้า', en: 'Birdy Robusta canned coffee', zs: 'Birdy 罗布斯塔罐装咖啡', ja: 'バーディー ロブスタ缶コーヒー', my: 'Birdy ရိုဘတ်စတာကော်ဖီဘူး', ko: '버디 로부스타 캔커피', es: 'Café en lata Birdy Robusta', fr: 'Café en canette Birdy Robusta', id: 'Kopi kaleng Birdy Robusta' } },
    { id: '39010', cat: 'drinks', price: 10, name: { th: 'น้ำดื่ม คริสตัล', en: 'Crystal drinking water', zs: 'Crystal 饮用水', ja: 'クリスタル 飲料水', my: 'Crystal သောက်ရေသန့်', ko: '크리스탈 생수', es: 'Agua Crystal', fr: 'Eau Crystal', id: 'Air minum Crystal' } },
    { id: '39011', cat: 'drinks', price: 10, name: { th: 'น้ำดื่ม สิงห์', en: 'Singha drinking water', zs: '胜狮饮用水', ja: 'シンハー 飲料水', my: 'Singha သောက်ရေသန့်', ko: '싱하 생수', es: 'Agua Singha', fr: 'Eau Singha', id: 'Air minum Singha' } },
    { id: '30000', cat: 'drinks', price: 5, name: { th: 'น้ำแข็ง (แก้ว)', en: 'Cup of ice', zs: '冰块（杯）', ja: '氷（カップ）', my: 'ရေခဲ (ခွက်)', ko: '얼음 (컵)', es: 'Vaso de hielo', fr: 'Verre de glaçons', id: 'Segelas es batu' } },
  ],
};

// Apply the price controls above.
window.THL_MENU.items.forEach((it) => {
  if (Object.prototype.hasOwnProperty.call(PRICE_OVERRIDES, it.id)) {
    it.price = PRICE_OVERRIDES[it.id];
  } else {
    const raw = it.price * PRICE_MULTIPLIER * (CATEGORY_MULTIPLIER[it.cat] ?? 1);
    it.price = Math.max(0, Math.round(raw / PRICE_ROUND_TO) * PRICE_ROUND_TO);
  }
});

// OPTIONAL ADD-ONS: extra THB per serving, independent of the base dish price.
// Edit price here for fried egg, omelette and special size. Exclusions are free.
window.THL_MENU.options = [
  {
    "id": "fried",
    "categories": [
      "rice"
    ],
    "price": 10,
    "name": {
      "th": "เพิ่มไข่ดาว",
      "en": "Add fried egg",
      "zs": "加煎蛋",
      "ja": "目玉焼きを追加",
      "my": "ကြက်ဥကြော် ထပ်ထည့်ရန်",
      "ko": "계란 프라이 추가",
      "es": "Añadir huevo frito",
      "fr": "Ajouter un œuf au plat",
      "id":"Tambah telur mata sapi"
    }
  },
  {
    "id": "omelette",
    "categories": [
      "rice"
    ],
    "price": 10,
    "name": {
      "th": "เพิ่มไข่เจียว",
      "en": "Add omelette",
      "zs": "加泰式煎蛋",
      "ja": "オムレツを追加",
      "my": "ကြက်ဥမွှေကြော် ထပ်ထည့်ရန်",
      "ko": "오믈렛 추가",
      "es": "Añadir tortilla",
      "fr": "Ajouter une omelette",
      "id":"Tambah telur dadar"
    }
  },
  {
    "id": "special",
    "categories": [
      "rice",
      "noodles"
    ],
    "price": 10,
    "name": {
      "th": "พิเศษ",
      "en": "Large portion",
      "zs": "加大份",
      "ja": "大盛り",
      "my": "ပွဲကြီး",
      "ko": "곱빼기",
      "es": "Ración grande",
      "fr": "Grande portion",
      "id":"Porsi besar"
    }
  },
  {
    "id": "noSprouts",
    "categories": [
      "noodles"
    ],
    "price": 0,
    "name": {
      "th": "ไม่งอก",
      "en": "No bean sprouts",
      "zs": "不要豆芽",
      "ja": "もやし抜き",
      "my": "ပဲပင်ပေါက် မထည့်ပါနှင့်",
      "ko": "숙주 제외",
      "es": "Sin brotes de soja",
      "fr": "Sans pousses de soja",
      "id":"Tanpa tauge"
    }
  },
  {
    "id": "noPeanuts",
    "categories": [
      "noodles"
    ],
    "price": 0,
    "name": {
      "th": "ไม่ถั่ว",
      "en": "No peanuts",
      "zs": "不要花生",
      "ja": "ピーナッツ抜き",
      "my": "မြေပဲ မထည့်ပါနှင့်",
      "ko": "땅콩 제외",
      "es": "Sin cacahuetes",
      "fr": "Sans cacahuètes",
      "id":"Tanpa kacang tanah"
    }
  },
  {
    "id": "noChives",
    "categories": [
      "noodles"
    ],
    "price": 0,
    "name": {
      "th": "ไม่กุยช่าย",
      "en": "No garlic chives",
      "zs": "不要韭菜",
      "ja": "ニラ抜き",
      "my": "ကြက်သွန်မြိတ် မထည့်ပါနှင့်",
      "ko": "부추 제외",
      "es": "Sin cebollino chino",
      "fr": "Sans ciboulette chinoise",
      "id":"Tanpa kucai"
    }
  }
];

// v0.8: included toppings and sweetness options, limited to exact dish IDs.
window.THL_MENU.optionLabels = {
  "ingredients": {
    "th": "ส่วนประกอบหลัก",
    "en": "Main ingredients",
    "zs": "主要食材",
    "ja": "主な材料",
    "my": "အဓိကပါဝင်ပစ္စည်းများ",
    "ko": "주요 재료",
    "es": "Ingredientes principales",
    "fr": "Ingrédients principaux",
    "id":"Bahan utama"
  },
  "ingredientNote": {
    "th": "ส่วนประกอบโดยสังเขป — รอยืนยันสูตรจากครัว",
    "en": "Ingredient overview — awaiting kitchen recipe confirmation",
    "zs": "食材概览——待厨房确认配方",
    "ja": "材料の概要（厨房でレシピ確認予定）",
    "my": "ပါဝင်ပစ္စည်း အကျဉ်း — မီးဖိုချောင်မှ အတည်ပြုရန်",
    "ko": "재료 요약 — 주방 레시피 확인 예정",
    "es": "Resumen de ingredientes pendiente de confirmar con cocina",
    "fr": "Aperçu des ingrédients à confirmer par la cuisine",
    "id":"Ringkasan bahan — menunggu konfirmasi resep dari dapur"
  },
  "ingredientScope": {
    "th": "แสดงเพียงบางส่วน ไม่ใช่รายการส่วนผสมทั้งหมด",
    "en": "Highlights only; not a complete ingredient list",
    "zs": "仅列部分食材，并非完整配料表",
    "ja": "一部の材料のみを表示しています",
    "my": "ပါဝင်ပစ္စည်း အားလုံး မဟုတ်ပါ",
    "ko": "일부 재료만 표시합니다",
    "es": "Solo algunos ingredientes; no es la lista completa",
    "fr": "Sélection d’ingrédients, liste non exhaustive",
    "id":"Hanya bahan utama; bukan daftar bahan lengkap"
  },
  "toppingsHint": {
    "th": "เลือกท็อปปิ้งที่ต้องการ ทุกอย่างเลือกไว้แล้ว — เอาเครื่องหมายถูกออกเพื่อไม่ใส่ (ราคาเดิม)",
    "en": "All toppings are selected. Uncheck any you do not want (same price).",
    "zs": "默认全选配料，不需要的可取消（价格不变）。",
    "ja": "全トッピングを選択済み。不要なものを外してください（同じ価格）。",
    "my": "အဆာအားလုံး ရွေးထားသည်။ မလိုသည်ကို ဖြုတ်ပါ (ဈေးတူသည်)။",
    "ko": "모든 토핑이 선택되어 있습니다. 원치 않는 토핑을 해제하세요 (가격 동일).",
    "es": "Todos los toppings están seleccionados. Desmarca los que no quieras (mismo precio).",
    "fr": "Toutes les garnitures sont cochées. Décochez celles à retirer (même prix).",
    "id":"Semua topping sudah dipilih. Hapus centang yang tidak diinginkan (harga sama)."
  },
  "sweetnessHint": {
    "th": "เลือกระดับความหวาน: ปกติ หรือ หวานน้อย (ราคาเดิม)",
    "en": "Choose sweetness: normal or less sweet (same price).",
    "zs": "选择甜度：正常或少糖（价格不变）。",
    "ja": "甘さを選択：普通・甘さ控えめ（同じ価格）。",
    "my": "ပုံမှန်ချို သို့မဟုတ် အချိုလျှော့ ရွေးပါ (ဈေးတူသည်)။",
    "ko": "당도를 선택하세요: 보통 / 덜 달게 (가격 동일).",
    "es": "Elige: normal o menos dulce (mismo precio).",
    "fr": "Choisissez : normal ou moins sucré (même prix).",
    "id":"Pilih tingkat manis: normal atau kurang manis (harga sama)."
  },
  "toppings": {
    "th": "ท็อปปิ้ง",
    "en": "Toppings",
    "zs": "配料",
    "ja": "トッピング",
    "my": "အဆာများ",
    "ko": "토핑",
    "es": "Toppings",
    "fr": "Garnitures",
    "id":"Topping"
  },
  "without": {
    "th": "ไม่ใส่",
    "en": "Without",
    "zs": "不加",
    "ja": "抜き",
    "my": "မထည့်ပါ",
    "ko": "제외",
    "es": "Sin",
    "fr": "Sans",
    "id":"Tanpa"
  },
  "noToppings": {
    "th": "ไม่ใส่ท็อปปิ้งทั้งหมด",
    "en": "No toppings",
    "zs": "不加任何配料",
    "ja": "トッピングなし",
    "my": "အဆာမထည့်ပါ",
    "ko": "토핑 없음",
    "es": "Sin toppings",
    "fr": "Sans garniture",
    "id":"Tanpa topping"
  },
  "normal": {
    "th": "ปกติ",
    "en": "Normal",
    "zs": "正常",
    "ja": "普通",
    "my": "ပုံမှန်ချို",
    "ko": "보통",
    "es": "Normal",
    "fr": "Normal",
    "id":"Normal"
  },
  "lessSweet": {
    "th": "หวานน้อย",
    "en": "Less sweet",
    "zs": "少糖",
    "ja": "甘さ控えめ",
    "my": "အချိုလျှော့",
    "ko": "덜 달게",
    "es": "Menos dulce",
    "fr": "Moins sucré",
    "id":"Kurang manis"
  }
};
window.THL_MENU.options.push(...[
  {
    "id": "topping_peanuts",
    "itemIds": [
      "70040"
    ],
    "group": "toppings",
    "default": true,
    "price": 0,
    "name": {
      "th": "ถั่ว",
      "en": "Peanuts",
      "zs": "花生",
      "ja": "ピーナッツ",
      "my": "မြေပဲ",
      "ko": "땅콩",
      "es": "Cacahuetes",
      "fr": "Cacahuètes",
      "id":"Kacang tanah"
    }
  },
  {
    "id": "topping_stickyRice",
    "itemIds": [
      "70040"
    ],
    "group": "toppings",
    "default": true,
    "price": 0,
    "name": {
      "th": "ข้าวเหนียว",
      "en": "Sticky rice",
      "zs": "糯米",
      "ja": "もち米",
      "my": "ကောက်ညှင်း",
      "ko": "찹쌀밥",
      "es": "Arroz glutinoso",
      "fr": "Riz gluant",
      "id":"Ketan"
    }
  },
  {
    "id": "topping_palmSeed",
    "itemIds": [
      "70040"
    ],
    "group": "toppings",
    "default": true,
    "price": 0,
    "name": {
      "th": "ลูกชิด",
      "en": "Palm seeds",
      "zs": "糖棕籽",
      "ja": "パームシード",
      "my": "ထန်းသီးစေ့",
      "ko": "야자 씨앗",
      "es": "Semillas de palma",
      "fr": "Graines de palmier",
      "id":"Kolang-kaling"
    }
  },
  {
    "id": "topping_jackfruit",
    "itemIds": [
      "70040"
    ],
    "group": "toppings",
    "default": true,
    "price": 0,
    "name": {
      "th": "ขนุน",
      "en": "Jackfruit",
      "zs": "菠萝蜜",
      "ja": "ジャックフルーツ",
      "my": "ပိန္နဲသီး",
      "ko": "잭프루트",
      "es": "Yaca",
      "fr": "Jacque",
      "id":"Nangka"
    }
  },
  {
    "id": "topping_cone",
    "itemIds": [
      "70040"
    ],
    "group": "toppings",
    "default": true,
    "price": 0,
    "name": {
      "th": "โคนไอติม",
      "en": "Ice cream cone",
      "zs": "冰淇淋甜筒",
      "ja": "アイスクリームコーン",
      "my": "ရေခဲမုန့်ခွက်ကြွပ်",
      "ko": "아이스크림 콘",
      "es": "Cucurucho de helado",
      "fr": "Cornet de glace",
      "id":"Cone es krim"
    }
  },
  {
    "id": "topping_coconut",
    "itemIds": [
      "70040"
    ],
    "group": "toppings",
    "default": true,
    "price": 0,
    "name": {
      "th": "มะพร้าว",
      "en": "Coconut",
      "zs": "椰子",
      "ja": "ココナッツ",
      "my": "အုန်းသီး",
      "ko": "코코넛",
      "es": "Coco",
      "fr": "Noix de coco",
      "id":"Kelapa"
    }
  },
  {
    "id": "sweet_normal",
    "itemIds": [
      "30200",
      "31105",
      "30100",
      "30300",
      "31100"
    ],
    "group": "sweetness",
    "default": true,
    "price": 0,
    "name": {
      "th": "ปกติ",
      "en": "Normal",
      "zs": "正常",
      "ja": "普通",
      "my": "ပုံမှန်ချို",
      "ko": "보통",
      "es": "Normal",
      "fr": "Normal",
      "id":"Normal"
    }
  },
  {
    "id": "sweet_lessSweet",
    "itemIds": [
      "30200",
      "31105",
      "30100",
      "30300",
      "31100"
    ],
    "group": "sweetness",
    "default": false,
    "price": 0,
    "name": {
      "th": "หวานน้อย",
      "en": "Less sweet",
      "zs": "少糖",
      "ja": "甘さ控えめ",
      "my": "အချိုလျှော့",
      "ko": "덜 달게",
      "es": "Menos dulce",
      "fr": "Moins sucré",
      "id":"Kurang manis"
    }
  }
]);
window.THL_MENU.ingredientNames = {
  "rice": {
    "th": "ข้าว",
    "en": "Rice",
    "zs": "米饭",
    "ja": "ごはん",
    "my": "ထမင်း",
    "ko": "쌀밥",
    "es": "Arroz",
    "fr": "Riz",
    "id":"Nasi"
  },
  "chicken": {
    "th": "ไก่",
    "en": "Chicken",
    "zs": "鸡肉",
    "ja": "鶏肉",
    "my": "ကြက်သား",
    "ko": "닭고기",
    "es": "Pollo",
    "fr": "Poulet",
    "id":"Ayam"
  },
  "pork": {
    "th": "หมู",
    "en": "Pork",
    "zs": "猪肉",
    "ja": "豚肉",
    "my": "ဝက်သား",
    "ko": "돼지고기",
    "es": "Cerdo",
    "fr": "Porc",
    "id":"Babi"
  },
  "beef": {
    "th": "เนื้อวัว",
    "en": "Beef",
    "zs": "牛肉",
    "ja": "牛肉",
    "my": "အမဲသား",
    "ko": "소고기",
    "es": "Ternera",
    "fr": "Bœuf",
    "id":"Daging sapi"
  },
  "cartilage": {
    "th": "กระดูกอ่อนหมู",
    "en": "Pork cartilage",
    "zs": "猪软骨",
    "ja": "豚軟骨",
    "my": "ဝက်နုရိုး",
    "ko": "돼지 연골",
    "es": "Cartílago de cerdo",
    "fr": "Cartilage de porc",
    "id":"Tulang rawan babi"
  },
  "seafood": {
    "th": "ปลา กุ้ง ปลาหมึก",
    "en": "Fish, shrimp & squid",
    "zs": "鱼、虾、鱿鱼",
    "ja": "魚・エビ・イカ",
    "my": "ငါး၊ ပုစွန်၊ ပြည်ကြီးငါး",
    "ko": "생선·새우·오징어",
    "es": "Pescado, gambas y calamar",
    "fr": "Poisson, crevettes et calamar",
    "id":"Ikan, udang & cumi"
  },
  "basil": {
    "th": "ใบกะเพรา",
    "en": "Holy basil",
    "zs": "打抛叶",
    "ja": "ホーリーバジル",
    "my": "ပင်စိမ်း",
    "ko": "홀리 바질",
    "es": "Albahaca sagrada",
    "fr": "Basilic sacré",
    "id":"Kemangi suci"
  },
  "chilli": {
    "th": "พริก",
    "en": "Chilli",
    "zs": "辣椒",
    "ja": "唐辛子",
    "my": "ငရုတ်သီး",
    "ko": "고추",
    "es": "Chile",
    "fr": "Piment",
    "id":"Cabai"
  },
  "garlic": {
    "th": "กระเทียม",
    "en": "Garlic",
    "zs": "大蒜",
    "ja": "にんにく",
    "my": "ကြက်သွန်ဖြူ",
    "ko": "마늘",
    "es": "Ajo",
    "fr": "Ail",
    "id":"Bawang putih"
  },
  "pepper": {
    "th": "พริกไทย",
    "en": "Pepper",
    "zs": "胡椒",
    "ja": "こしょう",
    "my": "ငရုတ်ကောင်း",
    "ko": "후추",
    "es": "Pimienta",
    "fr": "Poivre",
    "id":"Lada"
  },
  "chilliPaste": {
    "th": "น้ำพริกเผา",
    "en": "Roasted chilli paste",
    "zs": "烤辣椒酱",
    "ja": "ローストチリペースト",
    "my": "ငရုတ်ဆီ",
    "ko": "볶은 고추 페이스트",
    "es": "Pasta de chile tostado",
    "fr": "Pâte de piment grillé",
    "id":"Pasta cabai sangrai"
  },
  "curryPaste": {
    "th": "พริกแกงแดง",
    "en": "Red curry paste",
    "zs": "红咖喱酱",
    "ja": "レッドカレーペースト",
    "my": "ဟင်းအနီအနှစ်",
    "ko": "레드 커리 페이스트",
    "es": "Pasta de curry rojo",
    "fr": "Pâte de curry rouge",
    "id":"Pasta kari merah"
  },
  "noodles": {
    "th": "เส้นจันท์",
    "en": "Rice noodles",
    "zs": "米粉",
    "ja": "米麺",
    "my": "ဆန်ခေါက်ဆွဲ",
    "ko": "쌀국수",
    "es": "Fideos de arroz",
    "fr": "Nouilles de riz",
    "id":"Mi beras"
  },
  "egg": {
    "th": "ไข่",
    "en": "Egg",
    "zs": "鸡蛋",
    "ja": "卵",
    "my": "ကြက်ဥ",
    "ko": "달걀",
    "es": "Huevo",
    "fr": "Œuf",
    "id":"Telur"
  },
  "sprouts": {
    "th": "ถั่วงอก",
    "en": "Bean sprouts",
    "zs": "豆芽",
    "ja": "もやし",
    "my": "ပဲပင်ပေါက်",
    "ko": "숙주",
    "es": "Brotes de soja",
    "fr": "Pousses de soja",
    "id":"Tauge"
  },
  "shrimp": {
    "th": "กุ้ง",
    "en": "Shrimp",
    "zs": "虾",
    "ja": "エビ",
    "my": "ပုစွန်",
    "ko": "새우",
    "es": "Gambas",
    "fr": "Crevettes",
    "id":"Udang"
  },
  "lemongrass": {
    "th": "ตะไคร้",
    "en": "Lemongrass",
    "zs": "香茅",
    "ja": "レモングラス",
    "my": "စပါးလင်",
    "ko": "레몬그라스",
    "es": "Hierba limón",
    "fr": "Citronnelle",
    "id":"Serai"
  },
  "lime": {
    "th": "มะนาว",
    "en": "Lime",
    "zs": "青柠",
    "ja": "ライム",
    "my": "သံပုရာ",
    "ko": "라임",
    "es": "Lima",
    "fr": "Citron vert",
    "id":"Jeruk nipis"
  },
  "broth": {
    "th": "น้ำซุป",
    "en": "Broth",
    "zs": "高汤",
    "ja": "スープ",
    "my": "ဟင်းရည်",
    "ko": "육수",
    "es": "Caldo",
    "fr": "Bouillon",
    "id":"Kaldu"
  },
  "tofu": {
    "th": "เต้าหู้",
    "en": "Tofu",
    "zs": "豆腐",
    "ja": "豆腐",
    "my": "တိုဟူး",
    "ko": "두부",
    "es": "Tofu",
    "fr": "Tofu",
    "id":"Tahu"
  },
  "wonton": {
    "th": "แผ่นเกี๊ยว",
    "en": "Wonton wrapper",
    "zs": "馄饨皮",
    "ja": "ワンタンの皮",
    "my": "ဖက်ထုပ်အခွံ",
    "ko": "완탕 피",
    "es": "Masa de wonton",
    "fr": "Pâte à wonton",
    "id":"Kulit pangsit"
  },
  "oil": {
    "th": "น้ำมัน",
    "en": "Oil",
    "zs": "油",
    "ja": "油",
    "my": "ဆီ",
    "ko": "기름",
    "es": "Aceite",
    "fr": "Huile",
    "id":"Minyak"
  },
  "water": {
    "th": "น้ำ",
    "en": "Water",
    "zs": "水",
    "ja": "水",
    "my": "ရေ",
    "ko": "물",
    "es": "Agua",
    "fr": "Eau",
    "id":"Air"
  },
  "coconutMilk": {
    "th": "กะทิ",
    "en": "Coconut milk",
    "zs": "椰奶",
    "ja": "ココナッツミルク",
    "my": "အုန်းနို့",
    "ko": "코코넛 밀크",
    "es": "Leche de coco",
    "fr": "Lait de coco",
    "id":"Santan"
  },
  "peanuts": {
    "th": "ถั่ว",
    "en": "Peanuts",
    "zs": "花生",
    "ja": "ピーナッツ",
    "my": "မြေပဲ",
    "ko": "땅콩",
    "es": "Cacahuetes",
    "fr": "Cacahuètes",
    "id":"Kacang tanah"
  },
  "stickyRice": {
    "th": "ข้าวเหนียว",
    "en": "Sticky rice",
    "zs": "糯米",
    "ja": "もち米",
    "my": "ကောက်ညှင်း",
    "ko": "찹쌀밥",
    "es": "Arroz glutinoso",
    "fr": "Riz gluant",
    "id":"Ketan"
  },
  "palmSeed": {
    "th": "ลูกชิด",
    "en": "Palm seeds",
    "zs": "糖棕籽",
    "ja": "パームシード",
    "my": "ထန်းသီးစေ့",
    "ko": "야자 씨앗",
    "es": "Semillas de palma",
    "fr": "Graines de palmier",
    "id":"Kolang-kaling"
  },
  "jackfruit": {
    "th": "ขนุน",
    "en": "Jackfruit",
    "zs": "菠萝蜜",
    "ja": "ジャックフルーツ",
    "my": "ပိန္နဲသီး",
    "ko": "잭프루트",
    "es": "Yaca",
    "fr": "Jacque",
    "id":"Nangka"
  },
  "cone": {
    "th": "โคนไอติม",
    "en": "Ice cream cone",
    "zs": "冰淇淋甜筒",
    "ja": "アイスクリームコーン",
    "my": "ရေခဲမုန့်ခွက်ကြွပ်",
    "ko": "아이스크림 콘",
    "es": "Cucurucho de helado",
    "fr": "Cornet de glace",
    "id":"Cone es krim"
  },
  "coconut": {
    "th": "มะพร้าว",
    "en": "Coconut",
    "zs": "椰子",
    "ja": "ココナッツ",
    "my": "အုန်းသီး",
    "ko": "코코넛",
    "es": "Coco",
    "fr": "Noix de coco",
    "id":"Kelapa"
  },
  "mango": {
    "th": "มะม่วง",
    "en": "Mango",
    "zs": "芒果",
    "ja": "マンゴー",
    "my": "သရက်သီး",
    "ko": "망고",
    "es": "Mango",
    "fr": "Mangue",
    "id":"Mangga"
  },
  "jelly": {
    "th": "เฉาก๊วย",
    "en": "Grass jelly",
    "zs": "仙草冻",
    "ja": "仙草ゼリー",
    "my": "ကျောက်ကျော",
    "ko": "선초 젤리",
    "es": "Gelatina de hierba",
    "fr": "Gelée d’herbe",
    "id":"Cincau"
  },
  "milk": {
    "th": "นม",
    "en": "Milk",
    "zs": "牛奶",
    "ja": "ミルク",
    "my": "နို့",
    "ko": "우유",
    "es": "Leche",
    "fr": "Lait",
    "id":"Susu"
  },
  "syrup": {
    "th": "น้ำเชื่อม",
    "en": "Syrup",
    "zs": "糖浆",
    "ja": "シロップ",
    "my": "သကြားရည်",
    "ko": "시럽",
    "es": "Almíbar",
    "fr": "Sirop",
    "id":"Sirop"
  },
  "sugar": {
    "th": "น้ำตาล",
    "en": "Sugar",
    "zs": "糖",
    "ja": "砂糖",
    "my": "သကြား",
    "ko": "설탕",
    "es": "Azúcar",
    "fr": "Sucre",
    "id":"Gula"
  },
  "iceCream": {
    "th": "ไอศกรีม",
    "en": "Ice cream",
    "zs": "冰淇淋",
    "ja": "アイスクリーム",
    "my": "ရေခဲမုန့်",
    "ko": "아이스크림",
    "es": "Helado",
    "fr": "Glace",
    "id":"Es krim"
  },
  "cocoa": {
    "th": "โกโก้",
    "en": "Cocoa",
    "zs": "可可",
    "ja": "ココア",
    "my": "ကိုကိုး",
    "ko": "코코아",
    "es": "Cacao",
    "fr": "Cacao",
    "id":"Kakao"
  },
  "durian": {
    "th": "ทุเรียน",
    "en": "Durian",
    "zs": "榴莲",
    "ja": "ドリアン",
    "my": "ဒူးရင်းသီး",
    "ko": "두리안",
    "es": "Durián",
    "fr": "Durian",
    "id":"Durian"
  },
  "corn": {
    "th": "ข้าวโพด",
    "en": "Corn",
    "zs": "玉米",
    "ja": "とうもろこし",
    "my": "ပြောင်းဖူး",
    "ko": "옥수수",
    "es": "Maíz",
    "fr": "Maïs",
    "id":"Jagung"
  },
  "blackBeans": {
    "th": "ถั่วดำ",
    "en": "Black beans",
    "zs": "黑豆",
    "ja": "黒豆",
    "my": "ပဲနက်",
    "ko": "검은콩",
    "es": "Frijoles negros",
    "fr": "Haricots noirs",
    "id":"Kacang hitam"
  },
  "taro": {
    "th": "เผือก",
    "en": "Taro",
    "zs": "芋头",
    "ja": "タロイモ",
    "my": "ပိန်းဥ",
    "ko": "타로",
    "es": "Taro",
    "fr": "Taro",
    "id":"Talas"
  },
  "thaiTea": {
    "th": "ชาไทย",
    "en": "Thai tea",
    "zs": "泰式茶",
    "ja": "タイティー",
    "my": "ထိုင်းလက်ဖက်ရည်",
    "ko": "타이 티",
    "es": "Té tailandés",
    "fr": "Thé thaï",
    "id":"Teh Thai"
  },
  "greenTea": {
    "th": "ชาเขียว",
    "en": "Green tea",
    "zs": "绿茶",
    "ja": "緑茶",
    "my": "လက်ဖက်စိမ်း",
    "ko": "녹차",
    "es": "Té verde",
    "fr": "Thé vert",
    "id":"Teh hijau"
  },
  "coffee": {
    "th": "กาแฟ",
    "en": "Coffee",
    "zs": "咖啡",
    "ja": "コーヒー",
    "my": "ကော်ဖီ",
    "ko": "커피",
    "es": "Café",
    "fr": "Café",
    "id":"Kopi"
  },
  "roselle": {
    "th": "กระเจี๊ยบ",
    "en": "Roselle",
    "zs": "洛神花",
    "ja": "ローゼル",
    "my": "ချဉ်ပေါင်နီ",
    "ko": "로젤",
    "es": "Rosella",
    "fr": "Roselle",
    "id":"Rosela"
  },
  "jujube": {
    "th": "พุทราจีน",
    "en": "Jujube",
    "zs": "红枣",
    "ja": "ナツメ",
    "my": "တရုတ်ဆီးသီး",
    "ko": "대추",
    "es": "Azufaifa",
    "fr": "Jujube",
    "id":"Bidara Cina"
  },
  "chrysanthemum": {
    "th": "เก๊กฮวย",
    "en": "Chrysanthemum",
    "zs": "菊花",
    "ja": "菊花",
    "my": "ဂန္ဓမာ",
    "ko": "국화",
    "es": "Crisantemo",
    "fr": "Chrysanthème",
    "id":"Krisan"
  },
  "plum": {
    "th": "บ๊วย",
    "en": "Salted plum",
    "zs": "咸梅",
    "ja": "塩漬け梅",
    "my": "ဆီးဆား",
    "ko": "절인 매실",
    "es": "Ciruela salada",
    "fr": "Prune salée",
    "id":"Plum asin"
  }
};
// After the kitchen verifies every summary, change this to true to hide the draft notice.
window.THL_MENU.ingredientsConfirmed = false;
// EDIT INGREDIENTS HERE: 2–4 keys per dish; confirm the recipe with the kitchen.
window.THL_MENU.ingredients = {
  "R02": [
    "chicken",
    "basil"
  ],
  "R01": [
    "rice",
    "pork",
    "basil"
  ],
  "R03": [
    "beef",
    "basil",
    "chilli"
  ],
  "R05": [
    "cartilage",
    "basil"
  ],
  "R04": [
    "rice",
    "pork"
  ],
  "R06": [
    "rice",
    "seafood",
    "basil"
  ],
  "R07": [
    "rice",
    "seafood",
    "chilliPaste"
  ],
  "R08": [
    "rice",
    "seafood",
    "curryPaste"
  ],
  "10001": [
    "noodles",
    "sprouts",
    "peanuts"
  ],
  "10002": [
    "noodles",
    "chicken",
    "sprouts",
    "peanuts"
  ],
  "10003": [
    "noodles",
    "shrimp",
    "sprouts",
    "peanuts"
  ],
  "10004": [
    "noodles",
    "seafood",
    "sprouts",
    "peanuts"
  ],
  "40010": [
    "seafood",
    "broth"
  ],
  "40020": [
    "chicken",
    "broth"
  ],
  "40030": [
    "cartilage",
    "broth"
  ],
  "40040": [
    "tofu",
    "pork",
    "broth"
  ],
  "80001": [
    "wonton",
    "pork"
  ]
};

// Callout targets: x/y are percentages of the full photo; corner positions the label.
window.THL_MENU.ingredientAnnotations = {
  "R02": [
    {
      "key": "chicken",
      "x": 74,
      "y": 64,
      "corner": "nw"
    },
    {
      "key": "basil",
      "x": 84,
      "y": 43,
      "corner": "se"
    }
  ],
  "R01": [
    {
      "key": "rice",
      "x": 67,
      "y": 68,
      "corner": "nw"
    },
    {
      "key": "pork",
      "x": 40,
      "y": 54,
      "corner": "ne"
    },
    {
      "key": "basil",
      "x": 27,
      "y": 36,
      "corner": "se"
    }
  ],
  "R03": [
    {
      "key": "beef",
      "x": 58,
      "y": 68,
      "corner": "nw"
    },
    {
      "key": "basil",
      "x": 72,
      "y": 77,
      "corner": "ne"
    },
    {
      "key": "chilli",
      "x": 60,
      "y": 57,
      "corner": "se"
    }
  ],
  "R05": [
    {
      "key": "cartilage",
      "x": 39,
      "y": 71,
      "corner": "nw"
    },
    {
      "key": "basil",
      "x": 21,
      "y": 53,
      "corner": "se"
    }
  ],
  "R04": [
    {
      "key": "rice",
      "x": 33,
      "y": 30,
      "corner": "nw"
    },
    {
      "key": "pork",
      "x": 77,
      "y": 56,
      "corner": "se"
    }
  ],
  "R06": [
    {
      "key": "rice",
      "x": 30,
      "y": 36,
      "corner": "nw"
    },
    {
      "key": "seafood",
      "x": 43,
      "y": 68,
      "corner": "ne"
    },
    {
      "key": "basil",
      "x": 60,
      "y": 65,
      "corner": "se"
    }
  ],
  "R07": [
    {
      "key": "rice",
      "x": 55,
      "y": 33,
      "corner": "nw"
    },
    {
      "key": "seafood",
      "x": 48,
      "y": 65,
      "corner": "ne"
    },
    {
      "key": "chilliPaste",
      "x": 52,
      "y": 75,
      "corner": "se"
    }
  ],
  "R08": [
    {
      "key": "rice",
      "x": 60,
      "y": 29,
      "corner": "nw"
    },
    {
      "key": "seafood",
      "x": 50,
      "y": 68,
      "corner": "ne"
    },
    {
      "key": "curryPaste",
      "x": 36,
      "y": 71,
      "corner": "se"
    }
  ],
  "10001": [
    {
      "key": "noodles",
      "x": 58,
      "y": 57,
      "corner": "nw"
    },
    {
      "key": "sprouts",
      "x": 10,
      "y": 43,
      "corner": "ne"
    },
    {
      "key": "peanuts",
      "x": 25,
      "y": 16,
      "corner": "se"
    }
  ],
  "10002": [
    {
      "key": "noodles",
      "x": 41,
      "y": 47,
      "corner": "nw"
    },
    {
      "key": "chicken",
      "x": 55,
      "y": 53,
      "corner": "ne"
    },
    {
      "key": "sprouts",
      "x": 73,
      "y": 16,
      "corner": "sw"
    },
    {
      "key": "peanuts",
      "x": 91,
      "y": 53,
      "corner": "se"
    }
  ],
  "10003": [
    {
      "key": "noodles",
      "x": 58,
      "y": 62,
      "corner": "nw"
    },
    {
      "key": "shrimp",
      "x": 44,
      "y": 43,
      "corner": "ne"
    },
    {
      "key": "sprouts",
      "x": 20,
      "y": 40,
      "corner": "sw"
    },
    {
      "key": "peanuts",
      "x": 20,
      "y": 24,
      "corner": "se"
    }
  ],
  "10004": [
    {
      "key": "noodles",
      "x": 53,
      "y": 73,
      "corner": "nw"
    },
    {
      "key": "seafood",
      "x": 62,
      "y": 36,
      "corner": "ne"
    },
    {
      "key": "sprouts",
      "x": 80,
      "y": 68,
      "corner": "sw"
    },
    {
      "key": "peanuts",
      "x": 89,
      "y": 86,
      "corner": "se"
    }
  ],
  "40010": [
    {
      "key": "seafood",
      "x": 52,
      "y": 60,
      "corner": "nw"
    },
    {
      "key": "broth",
      "x": 77,
      "y": 36,
      "corner": "se"
    }
  ],
  "40020": [
    {
      "key": "chicken",
      "x": 59,
      "y": 56,
      "corner": "nw"
    },
    {
      "key": "broth",
      "x": 32,
      "y": 48,
      "corner": "se"
    }
  ],
  "40030": [
    {
      "key": "cartilage",
      "x": 53,
      "y": 70,
      "corner": "nw"
    },
    {
      "key": "broth",
      "x": 17,
      "y": 52,
      "corner": "se"
    }
  ],
  "40040": [
    {
      "key": "tofu",
      "x": 53,
      "y": 56,
      "corner": "nw"
    },
    {
      "key": "pork",
      "x": 68,
      "y": 65,
      "corner": "ne"
    },
    {
      "key": "broth",
      "x": 33,
      "y": 62,
      "corner": "se"
    }
  ],
  "80001": [
    {
      "key": "wonton",
      "x": 38,
      "y": 38,
      "corner": "nw"
    },
    {
      "key": "pork",
      "x": 37,
      "y": 61,
      "corner": "se"
    }
  ]
};
// Shared by customer and server. Prices and kitchen labels always come from here.
window.THL_MENU.optionsFor = function (item) {
  return item ? this.options.filter(o => (o.itemIds || []).includes(item.id) || (o.categories || []).includes(item.cat)) : [];
};
window.THL_MENU.optionKind = function (item) {
  return this.optionsFor(item).find(o => o.group)?.group || 'extras';
};
window.THL_MENU.defaultOptions = function (item) {
  return this.optionsFor(item).filter(o => o.default).map(o => o.id);
};
window.THL_MENU.normalizeOptions = function (item, ids) {
  const selected = Array.isArray(ids) ? ids : [];
  const result = this.optionsFor(item).filter(o => selected.includes(o.id));
  // Deterministic single selection. The server separately rejects ambiguous input.
  let sweet = false;
  return result.filter(o => o.group !== 'sweetness' || (!sweet && (sweet = true))).map(o => o.id);
};
window.THL_MENU.validOptions = function (item, ids) {
  if (!Array.isArray(ids)) return !this.optionsFor(item).length;
  const allowed = this.optionsFor(item);
  if (ids.some(id => typeof id !== 'string' || !allowed.some(o => o.id === id))) return false;
  if (new Set(ids).size !== ids.length) return false;
  return this.optionKind(item) !== 'sweetness' || ids.length === 1;
};
window.THL_MENU.optionText = function (ids, lang = 'th', item = null) {
  const name = value => value[lang] || value.en;
  const chosen = this.options.filter(o => (ids || []).includes(o.id));
  if (item && this.optionKind(item) === 'toppings') {
    const omitted = this.optionsFor(item).filter(o => !(ids || []).includes(o.id));
    if (!chosen.length) return name(this.optionLabels.noToppings);
    return name(this.optionLabels.toppings) + ': ' + chosen.map(o => name(o.name)).join(', ')
      + (omitted.length ? ' · ' + name(this.optionLabels.without) + ': ' + omitted.map(o => name(o.name)).join(', ') : '');
  }
  return chosen.map(o => name(o.name)).join(' · ');
};
// The number guests and staff say or point at. `no` wins where a dish's id is not its menu number.
window.THL_MENU.numberOf = function (item) {
  return item ? item.no || item.id : '';
};
window.THL_MENU.unitPrice = function (item, ids) {
  const selected = this.normalizeOptions(item, ids);
  return item.price + this.optionsFor(item).filter(o => selected.includes(o.id)).reduce((sum, o) => sum + o.price, 0);
};
