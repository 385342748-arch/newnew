import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Utensils, Calendar, Info, Moon, Leaf, Wallet } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface PriceItem {
  item: string;
  price: number;
}

interface PriceBreakdown {
  zh: PriceItem[];
  en: PriceItem[];
  ru: PriceItem[];
  ar: PriceItem[];
}

interface Destination {
  id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  nameAr: string;
  image: string;
  description: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionAr: string;
  highlights: string[];
  highlightsEn: string[];
  highlightsRu: string[];
  highlightsAr: string[];
  cuisine: string[];
  cuisineEn: string[];
  cuisineRu: string[];
  cuisineAr: string[];
  bestSeason: string;
  bestSeasonEn: string;
  bestSeasonRu: string;
  bestSeasonAr: string;
  duration: string;
  durationEn: string;
  durationRu: string;
  durationAr: string;
  halalFood: string[];
  halalFoodEn: string[];
  halalFoodRu: string[];
  halalFoodAr: string[];
  mosques: string[];
  mosquesEn: string[];
  mosquesRu: string[];
  mosquesAr: string[];
  pricePerDay: number;
  priceBreakdown: PriceBreakdown;
}

const destinations: Destination[] = [
  {
    id: 'beijing',
    name: '北京',
    nameEn: 'Beijing',
    nameRu: 'Пекин',
    nameAr: 'بكين',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
    description: '中国首都，千年古都，拥有故宫、长城等世界文化遗产',
    descriptionEn: 'China\'s capital, ancient capital for millennia, home to UNESCO World Heritage sites like the Forbidden City and Great Wall',
    descriptionRu: 'Столица Китая, древняя столица тысячелетий, здесь находятся объекты Всемирного наследия ЮНЕСКО, такие как Запретный город и Великая стена',
    descriptionAr: 'عاصمة الصين، العاصمة القديمة لآلاف السنين، موطن لمواقع التراث العالمي مثل المدينة المحرمة وسور الصين العظيم',
    highlights: ['故宫博物院', '八达岭长城', '天坛公园', '颐和园', '天安门广场'],
    highlightsEn: ['Forbidden City', 'Great Wall', 'Temple of Heaven', 'Summer Palace', 'Tiananmen Square'],
    highlightsRu: ['Запретный город', 'Великая стена', 'Храм Неба', 'Летний дворец', 'Площадь Тяньаньмэнь'],
    highlightsAr: ['المدينة المحرمة', 'سور الصين العظيم', 'معبد السماء', 'القصر الصيفي', 'ساحة تيانانمن'],
    cuisine: ['北京烤鸭', '炸酱面', '豆汁焦圈', '驴打滚'],
    cuisineEn: ['Peking Duck', 'Zha Jiang Mian', 'Douzhi', 'Donkey Roll'],
    cuisineRu: ['Утка по-пекински', 'Чжадзян мянь', 'Доучжи', 'Рулет с ослиным мясом'],
    cuisineAr: ['بطة بكين', 'زا جيانغ ميان', 'دوزهي', 'رول الحمار'],
    bestSeason: '春季(4-5月)和秋季(9-10月)',
    bestSeasonEn: 'Spring (Apr-May) and Autumn (Sep-Oct)',
    bestSeasonRu: 'Весна (апр-май) и осень (сен-окт)',
    bestSeasonAr: 'الربيع (أبريل-مايو) والخريف (سبتمبر-أكتوبر)',
    duration: '建议3-4天',
    durationEn: 'Recommended 3-4 days',
    durationRu: 'Рекомендуется 3-4 дня',
    durationAr: 'موصى به 3-4 أيام',
    halalFood: ['牛街清真美食街', '东来顺涮羊肉', '烤肉宛'],
    halalFoodEn: ['Niujie Halal Food Street', 'Donglaishun Lamb Hotpot', 'Kaorouwan'],
    halalFoodRu: ['Улица халяльной еды Нюцзе', 'Дунлайшунь', 'Каожоувань'],
    halalFoodAr: ['شارع الطعام الحلال نيوجي', 'دونغلايشون', 'كاوروان'],
    mosques: ['牛街清真寺', '东四清真寺', '南下坡清真寺'],
    mosquesEn: ['Niujie Mosque', 'Dongsi Mosque', 'Nanxiapo Mosque'],
    mosquesRu: ['Мечеть Нюцзе', 'Мечеть Дунсы', 'Мечеть Наньсяпо'],
    mosquesAr: ['مسجد نيوجي', 'مسجد دونغسي', 'مسجد نانشيابو'],
    pricePerDay: 850,
    priceBreakdown: {
      zh: [
        { item: '五星酒店住宿（每晚）', price: 350 },
        { item: '早餐+正餐', price: 120 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '豪华商务车', price: 50 },
        { item: '景点门票', price: 30 }
      ],
      en: [
        { item: '5-Star Hotel (per night)', price: 350 },
        { item: 'Breakfast & Meals', price: 120 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Luxury Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 30 }
      ],
      ru: [
        { item: 'Отель 5 звезд (за ночь)', price: 350 },
        { item: 'Завтрак и обед', price: 120 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Люксовый автомобиль', price: 50 },
        { item: 'Билеты', price: 30 }
      ],
      ar: [
        { item: 'فندق 5 نجوم (لليلة)', price: 350 },
        { item: 'الإفطار والوجبات', price: 120 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة فاخرة', price: 50 },
        { item: 'التذاكر', price: 30 }
      ]
    }
  },
  {
    id: 'shanghai',
    name: '上海',
    nameEn: 'Shanghai',
    nameRu: 'Шанхай',
    nameAr: 'شنغهاي',
    image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800',
    description: '国际大都市，融合东西方文化的现代都市',
    descriptionEn: 'International metropolis blending Eastern and Western cultures',
    descriptionRu: 'Международный мегаполис, сочетающий восточную и западную культуру',
    descriptionAr: 'مدينة عالمية تجمع بين الثقافات الشرقية والغربية',
    highlights: ['外滩', '东方明珠', '豫园', '南京路', '田子坊'],
    highlightsEn: ['The Bund', 'Oriental Pearl', 'Yu Garden', 'Nanjing Road', 'Tianzifang'],
    highlightsRu: ['Набережная', 'Восточная жемчужина', 'Сад Юй', 'Нанкинская дорога', 'Тяньцзыфан'],
    highlightsAr: ['الواجهة البحرية', 'اللؤلؤة الشرقية', 'حديقة يو', 'طريق نانجينغ', 'تيانزيفانغ'],
    cuisine: ['小笼包', '生煎包', '红烧肉', '蟹壳黄'],
    cuisineEn: ['Xiaolongbao', 'Shengjian Bao', 'Braised Pork', 'Crab Shell Pastry'],
    cuisineRu: ['Сяолунбао', 'Шэнцзянь бао', 'Тушеная свинина', 'Пирожок с крабом'],
    cuisineAr: ['شياولونغباو', 'شينغجيان باو', 'لحم الخنزير المطهو', 'فطيرة قشرة السلطعون'],
    bestSeason: '春季(3-5月)和秋季(9-11月)',
    bestSeasonEn: 'Spring (Mar-May) and Autumn (Sep-Nov)',
    bestSeasonRu: 'Весна (мар-май) и осень (сен-ноя)',
    bestSeasonAr: 'الربيع (مارس-مايو) والخريف (سبتمبر-نوفمبر)',
    duration: '建议2-3天',
    durationEn: 'Recommended 2-3 days',
    durationRu: 'Рекомендуется 2-3 дня',
    durationAr: 'موصى به 2-3 أيام',
    halalFood: ['云南南路清真美食街', '洪长兴羊肉馆', '小桃园清真餐厅'],
    halalFoodEn: ['Yunnan Road Halal Food Street', 'Hongchangxing Lamb Restaurant', 'Xiaotaoyuan Halal Restaurant'],
    halalFoodRu: ['Улица халяльной еды Юньнань', 'Ресторан Хунчансин', 'Ресторан Сяотаоюань'],
    halalFoodAr: ['شارع الطعام الحلال يوننان', 'مطعم هونغتشانغشينغ', 'مطعم شياوتاويوان الحلال'],
    mosques: ['小桃园清真寺', '福佑路清真寺', '沪西清真寺'],
    mosquesEn: ['Xiaotaoyuan Mosque', 'Fuyou Road Mosque', 'Huxi Mosque'],
    mosquesRu: ['Мечеть Сяотаоюань', 'Мечеть Фую', 'Мечеть Хуси'],
    mosquesAr: ['مسجد شياوتاويوان', 'مسجد فويو', 'مسجد هوشي'],
    pricePerDay: 810,
    priceBreakdown: {
      zh: [
        { item: '五星酒店住宿（每晚）', price: 320 },
        { item: '早餐+正餐', price: 110 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '豪华商务车', price: 50 },
        { item: '景点门票', price: 30 }
      ],
      en: [
        { item: '5-Star Hotel (per night)', price: 320 },
        { item: 'Breakfast & Meals', price: 110 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Luxury Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 30 }
      ],
      ru: [
        { item: 'Отель 5 звезд (за ночь)', price: 320 },
        { item: 'Завтрак и обед', price: 110 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Люксовый автомобиль', price: 50 },
        { item: 'Билеты', price: 30 }
      ],
      ar: [
        { item: 'فندق 5 نجوم (لليلة)', price: 320 },
        { item: 'الإفطار والوجبات', price: 110 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة فاخرة', price: 50 },
        { item: 'التذاكر', price: 30 }
      ]
    }
  },
  {
    id: 'xian',
    name: '西安',
    nameEn: "Xi'an",
    nameRu: 'Сиань',
    nameAr: 'شيآن',
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800',
    description: '十三朝古都，丝绸之路起点，兵马俑闻名世界',
    descriptionEn: 'Ancient capital of 13 dynasties, starting point of Silk Road, famous for Terracotta Warriors',
    descriptionRu: 'Древняя столица 13 династий, начало Шелкового пути, знаменитая Терракотовой армией',
    descriptionAr: 'عاصمة قديمة لـ 13 سلالة، نقطة بداية طريق الحرير، مشهورة بمحاربي الطين',
    highlights: ['兵马俑', '大雁塔', '古城墙', '回民街', '华清宫'],
    highlightsEn: ['Terracotta Warriors', 'Big Wild Goose Pagoda', 'City Wall', 'Muslim Quarter', 'Huaqing Palace'],
    highlightsRu: ['Терракотовая армия', 'Пагода Большого гуся', 'Городская стена', 'Мусульманский квартал', 'Дворец Хуацин'],
    highlightsAr: ['محاربو الطين', 'باجودا الإوزة الكبيرة', 'سور المدينة', 'الحي الإسلامي', 'قصر هواتشينغ'],
    cuisine: ['肉夹馍', '凉皮', '羊肉泡馍', 'biangbiang面'],
    cuisineEn: ['Roujiamo', 'Liangpi', 'Yangrou Paomo', 'Biangbiang Noodles'],
    cuisineRu: ['Роудзямо', 'Лянпи', 'Янжоу паомо', 'Лапша Бянбян'],
    cuisineAr: ['روجيامو', 'ليانغبي', 'يانغرو باومو', 'نودلز بيانغبيانغ'],
    bestSeason: '春季(3-5月)和秋季(9-11月)',
    bestSeasonEn: 'Spring (Mar-May) and Autumn (Sep-Nov)',
    bestSeasonRu: 'Весна (мар-май) и осень (сен-ноя)',
    bestSeasonAr: 'الربيع (مارس-مايو) والخريف (سبتمبر-نوفمبر)',
    duration: '建议2-3天',
    durationEn: 'Recommended 2-3 days',
    durationRu: 'Рекомендуется 2-3 дня',
    durationAr: 'موصى به 2-3 أيام',
    halalFood: ['回民街', '老孙家羊肉泡馍', '贾三灌汤包'],
    halalFoodEn: ['Muslim Quarter', 'Laosunjia Lamb Paomo', 'Jiasan Soup Dumplings'],
    halalFoodRu: ['Мусульманский квартал', 'Лаосунцзя', 'Цзясань'],
    halalFoodAr: ['الحي الإسلامي', 'لاوصونجيا', 'جياسان'],
    mosques: ['化觉巷清真大寺', '大学习巷清真寺', '洒金桥清真寺'],
    mosquesEn: ['Huajue Lane Mosque', 'Daxuexi Lane Mosque', 'Sajinqiao Mosque'],
    mosquesRu: ['Мечеть Хуацзюэ', 'Мечеть Дасюэси', 'Мечеть Сацзиньцяо'],
    mosquesAr: ['مسجد هواجويه', 'مسجد داشيوشي', 'مسجد ساجينتشياو'],
    pricePerDay: 770,
    priceBreakdown: {
      zh: [
        { item: '精品酒店住宿（每晚）', price: 280 },
        { item: '早餐+正餐', price: 100 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '舒适用车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: 'Boutique Hotel (per night)', price: 280 },
        { item: 'Breakfast & Meals', price: 100 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Comfortable Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Бутик-отель (за ночь)', price: 280 },
        { item: 'Завтрак и обед', price: 100 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Комфортабельный автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'فندق بوتيك (لليلة)', price: 280 },
        { item: 'الإفطار والوجبات', price: 100 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة مريحة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  },
  {
    id: 'chengdu',
    name: '成都',
    nameEn: 'Chengdu',
    nameRu: 'Чэнду',
    nameAr: 'تشنغدو',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800',
    description: '天府之国，大熊猫故乡，美食之都',
    descriptionEn: 'Land of Abundance, hometown of giant pandas, capital of gastronomy',
    descriptionRu: 'Страна изобилия, родина гигантских панд, столица гастрономии',
    descriptionAr: 'أرض الوفرة، موطن الباندا العملاقة، عاصمة الطهي',
    highlights: ['大熊猫基地', '宽窄巷子', '锦里', '武侯祠', '都江堰'],
    highlightsEn: ['Panda Base', 'Wide & Narrow Alleys', 'Jinli Street', 'Wuhou Shrine', 'Dujiangyan'],
    highlightsRu: ['База панд', 'Узкие и широкие переулки', 'Улица Цзиньли', 'Храм Ухоу', 'Дуцзянъянь'],
    highlightsAr: ['محمية الباندا', 'الأزقة العريضة والضيقة', 'شارع جينلي', 'ضريح ووهو', 'دوجيانغيان'],
    cuisine: ['火锅', '麻婆豆腐', '回锅肉', '龙抄手'],
    cuisineEn: ['Hotpot', 'Mapo Tofu', 'Twice-cooked Pork', 'Long Chao Shou'],
    cuisineRu: ['Хого', 'Мапо тофу', 'Двойная свинина', 'Лун чао шоу'],
    cuisineAr: ['الحساء الساخن', 'توفو مابو', 'لحم الخنزير المطهو مرتين', 'لونغ تشاو شو'],
    bestSeason: '春季(3-6月)和秋季(9-11月)',
    bestSeasonEn: 'Spring (Mar-Jun) and Autumn (Sep-Nov)',
    bestSeasonRu: 'Весна (мар-июн) и осень (сен-ноя)',
    bestSeasonAr: 'الربيع (مارس-يونيو) والخريف (سبتمبر-نوفمبر)',
    duration: '建议3-4天',
    durationEn: 'Recommended 3-4 days',
    durationRu: 'Рекомендуется 3-4 дня',
    durationAr: 'موصى به 3-4 أيام',
    halalFood: ['皇城坝牛肉馆', '清真皇城坝牛肉馆', '马记清真牛肉饼'],
    halalFoodEn: ['Huangchengba Beef Restaurant', 'Halal Huangchengba', 'Maji Halal Beef Pie'],
    halalFoodRu: ['Ресторан Хуанчэнба', 'Халяль Хуанчэнба', 'Мацзи'],
    halalFoodAr: ['مطعم هوانغتشنغبا', 'حلال هوانغتشنغبا', 'ماجي'],
    mosques: ['皇城清真寺', '鼓楼清真寺', '土桥清真寺'],
    mosquesEn: ['Huangcheng Mosque', 'Drum Tower Mosque', 'Tuqiao Mosque'],
    mosquesRu: ['Мечеть Хуанчэн', 'Мечеть Барабанной башни', 'Мечеть Туцяо'],
    mosquesAr: ['مسجد هوانغتشنغ', 'مسجد برج الطبول', 'مسجد توتشياو'],
    pricePerDay: 730,
    priceBreakdown: {
      zh: [
        { item: '精品酒店住宿（每晚）', price: 250 },
        { item: '早餐+正餐', price: 90 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '舒适用车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: 'Boutique Hotel (per night)', price: 250 },
        { item: 'Breakfast & Meals', price: 90 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Comfortable Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Бутик-отель (за ночь)', price: 250 },
        { item: 'Завтрак и обед', price: 90 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Комфортабельный автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'فندق بوتيك (لليلة)', price: 250 },
        { item: 'الإفطار والوجبات', price: 90 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة مريحة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  },
  {
    id: 'luoyang',
    name: '洛阳',
    nameEn: 'Luoyang',
    nameRu: 'Лоян',
    nameAr: 'لويانغ',
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
    description: '千年帝都，牡丹花城，佛教文化圣地',
    descriptionEn: 'Millennium imperial capital, city of peonies, Buddhist cultural holy land',
    descriptionRu: 'Тысячелетняя имперская столица, город пионов, священная земля буддийской культуры',
    descriptionAr: 'عاصمة إمبراطورية لألف عام، مدينة الفاوانيا، أرض مقدسة للثقافة البوذية',
    highlights: ['龙门石窟', '白马寺', '洛阳牡丹', '老君山', '关林'],
    highlightsEn: ['Longmen Grottoes', 'White Horse Temple', 'Luoyang Peonies', 'Laojun Mountain', 'Guanlin'],
    highlightsRu: ['Пещеры Лунмэнь', 'Храм Белой лошади', 'Пионы Лояна', 'Гора Лаоцзюнь', 'Гуаньлинь'],
    highlightsAr: ['كهوف لونغمن', 'معبد الحصان الأبيض', 'فاوانيا لويانغ', 'جبل لاوجون', 'غوانلين'],
    cuisine: ['洛阳水席', '牛肉汤', '不翻汤', '牡丹饼'],
    cuisineEn: ['Luoyang Water Banquet', 'Beef Soup', 'Bufan Soup', 'Peony Cake'],
    cuisineRu: ['Водный пир Лояна', 'Говяжий суп', 'Суп Буфань', 'Пирог с пионом'],
    cuisineAr: ['وليمة الماء لويانغ', 'شوربة اللحم', 'شوربة بوفان', 'كعكة الفاوانيا'],
    bestSeason: '4-5月牡丹花期最佳',
    bestSeasonEn: 'Apr-May for peony season',
    bestSeasonRu: 'Апр-май для сезона пионов',
    bestSeasonAr: 'أبريل-مايو لموسم الفاوانيا',
    duration: '建议2-3天',
    durationEn: 'Recommended 2-3 days',
    durationRu: 'Рекомендуется 2-3 дня',
    durationAr: 'موصى به 2-3 أيام',
    halalFood: ['东关大街清真美食', '马杰山牛肉汤', '清真水席'],
    halalFoodEn: ['Dongguan Street Halal Food', 'Majieshan Beef Soup', 'Halal Water Banquet'],
    halalFoodRu: ['Улица Дунгуань', 'Мацзешань', 'Халяль пир'],
    halalFoodAr: ['شارع دونغوان', 'ماجيشان', 'وليمة الماء الحلال'],
    mosques: ['东关清真寺', '北窑清真寺', '塔湾清真寺'],
    mosquesEn: ['Dongguan Mosque', 'Beiyao Mosque', 'Tawan Mosque'],
    mosquesRu: ['Мечеть Дунгуань', 'Мечеть Бэйяо', 'Мечеть Тавань'],
    mosquesAr: ['مسجد دونغوان', 'مسجد بيياو', 'مسجد تاوان'],
    pricePerDay: 710,
    priceBreakdown: {
      zh: [
        { item: '精品酒店住宿（每晚）', price: 240 },
        { item: '早餐+正餐', price: 80 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '舒适用车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: 'Boutique Hotel (per night)', price: 240 },
        { item: 'Breakfast & Meals', price: 80 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Comfortable Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Бутик-отель (за ночь)', price: 240 },
        { item: 'Завтрак и обед', price: 80 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Комфортабельный автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'فندق بوتيك (لليلة)', price: 240 },
        { item: 'الإفطار والوجبات', price: 80 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة مريحة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  },
  {
    id: 'guilin',
    name: '桂林',
    nameEn: 'Guilin',
    nameRu: 'Гуйлинь',
    nameAr: 'جويلين',
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800',
    description: '山水甲天下，喀斯特地貌奇观',
    descriptionEn: 'Finest scenery under heaven, karst landscape wonder',
    descriptionRu: 'Лучшие пейзажи под небом, чудо карстового ландшафта',
    descriptionAr: 'أجمل المناظر تحت السماء، عجائب المناظر الكارستية',
    highlights: ['漓江', '阳朔西街', '象鼻山', '龙脊梯田', '银子岩'],
    highlightsEn: ['Li River', 'Yangshuo West Street', 'Elephant Trunk Hill', 'Longji Rice Terraces', 'Silver Cave'],
    highlightsRu: ['Река Ли', 'Улица Яншо', 'Холм Слоновий хобот', 'Террасы Лунцзи', 'Серебряная пещера'],
    highlightsAr: ['نهر لي', 'شارع يانغشو الغربي', 'جبل خرطوم الفيل', 'مزارع لونغجي', 'كهف الفضة'],
    cuisine: ['桂林米粉', '啤酒鱼', '荔浦芋扣肉', '油茶'],
    cuisineEn: ['Guilin Rice Noodles', 'Beer Fish', 'Lipu Taro Pork', 'Oil Tea'],
    cuisineRu: ['Рисовая лапша Гуйлинь', 'Рыба в пиве', 'Свинина с таро', 'Чай с маслом'],
    cuisineAr: ['نودلز الأرز جويلين', 'سمك البيرة', 'لحم الخنزير مع التارو', 'شاي الزيت'],
    bestSeason: '4-10月',
    bestSeasonEn: 'Apr to Oct',
    bestSeasonRu: 'Апр-окт',
    bestSeasonAr: 'أبريل-أكتوبر',
    duration: '建议3-4天',
    durationEn: 'Recommended 3-4 days',
    durationRu: 'Рекомендуется 3-4 дня',
    durationAr: 'موصى به 3-4 أيام',
    halalFood: ['正阳步行街清真餐厅', '桂林清真饭店', '阳朔清真美食'],
    halalFoodEn: ['Zhengyang Pedestrian Street Halal', 'Guilin Halal Restaurant', 'Yangshuo Halal Food'],
    halalFoodRu: ['Улица Чжэнъян', 'Ресторан Гуйлинь', 'Яншо халяль'],
    halalFoodAr: ['شارع تشنغيانغ', 'مطعم جويلين', 'يانغشو حلال'],
    mosques: ['桂林清真古寺', '阳朔清真寺', '临桂清真寺'],
    mosquesEn: ['Guilin Ancient Mosque', 'Yangshuo Mosque', 'Lingui Mosque'],
    mosquesRu: ['Древняя мечеть Гуйлинь', 'Мечеть Яншо', 'Мечеть Линьгуй'],
    mosquesAr: ['مسجد جويلين القديم', 'مسجد يانغشو', 'مسجد لينغوي'],
    pricePerDay: 740,
    priceBreakdown: {
      zh: [
        { item: '精品酒店住宿（每晚）', price: 260 },
        { item: '早餐+正餐', price: 90 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '舒适用车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: 'Boutique Hotel (per night)', price: 260 },
        { item: 'Breakfast & Meals', price: 90 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Comfortable Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Бутик-отель (за ночь)', price: 260 },
        { item: 'Завтрак и обед', price: 90 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Комфортабельный автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'فندق بوتيك (لليلة)', price: 260 },
        { item: 'الإفطار والوجبات', price: 90 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة مريحة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  },
  {
    id: 'hangzhou',
    name: '杭州',
    nameEn: 'Hangzhou',
    nameRu: 'Ханчжоу',
    nameAr: 'هانغتشو',
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800',
    description: '人间天堂，西湖美景，丝绸之府',
    descriptionEn: 'Heaven on Earth, West Lake beauty, home of silk',
    descriptionRu: 'Рай на земле, красота озера Сиху, родина шелка',
    descriptionAr: 'الجنة على الأرض، جمال بحيرة الغرب، موطن الحرير',
    highlights: ['西湖', '灵隐寺', '千岛湖', '宋城', '龙井茶园'],
    highlightsEn: ['West Lake', 'Lingyin Temple', 'Qiandao Lake', 'Songcheng', 'Longjing Tea'],
    highlightsRu: ['Озеро Сиху', 'Храм Линьин', 'Озеро Цяньдао', 'Сунчэн', 'Чай Лунцзин'],
    highlightsAr: ['بحيرة الغرب', 'معبد لينغين', 'بحيرة تشيانداو', 'سونغتشنغ', 'شاي لونغجينغ'],
    cuisine: ['西湖醋鱼', '东坡肉', '龙井虾仁', '叫花鸡'],
    cuisineEn: ['West Lake Fish', 'Dongpo Pork', 'Longjing Shrimp', 'Beggar Chicken'],
    cuisineRu: ['Рыба Сиху', 'Свинина Дунпо', 'Креветки Лунцзин', 'Курица нищего'],
    cuisineAr: ['سمك بحيرة الغرب', 'لحم دونغبو', 'جمبري لونغجينغ', 'دجاج المتسول'],
    bestSeason: '春季(3-5月)和秋季(9-11月)',
    bestSeasonEn: 'Spring (Mar-May) and Autumn (Sep-Nov)',
    bestSeasonRu: 'Весна (мар-май) и осень (сен-ноя)',
    bestSeasonAr: 'الربيع (مارس-مايو) والخريف (سبتمبر-نوفمبر)',
    duration: '建议2-3天',
    durationEn: 'Recommended 2-3 days',
    durationRu: 'Рекомендуется 2-3 дня',
    durationAr: 'موصى به 2-3 أيام',
    halalFood: ['河坊街清真美食', '杭州清真饭店', '西湖边清真餐厅'],
    halalFoodEn: ['Hefang Street Halal', 'Hangzhou Halal Restaurant', 'West Lake Halal'],
    halalFoodRu: ['Улица Хэфан', 'Ресторан Ханчжоу', 'Сиху халяль'],
    halalFoodAr: ['شارع هيفانغ', 'مطعم هانغتشو', 'بحيرة الغرب حلال'],
    mosques: ['凤凰寺', '杭州清真寺', '清波门清真寺'],
    mosquesEn: ['Phoenix Mosque', 'Hangzhou Mosque', 'Qingbo Mosque'],
    mosquesRu: ['Мечеть Феникс', 'Мечеть Ханчжоу', 'Мечеть Цинбо'],
    mosquesAr: ['مسجد الفينيق', 'مسجد هانغتشو', 'مسجد تشينغبو'],
    pricePerDay: 790,
    priceBreakdown: {
      zh: [
        { item: '五星酒店住宿（每晚）', price: 300 },
        { item: '早餐+正餐', price: 100 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '豪华商务车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: '5-Star Hotel (per night)', price: 300 },
        { item: 'Breakfast & Meals', price: 100 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Luxury Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Отель 5 звезд (за ночь)', price: 300 },
        { item: 'Завтрак и обед', price: 100 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Люксовый автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'فندق 5 نجوم (لليلة)', price: 300 },
        { item: 'الإفطار والوجبات', price: 100 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة فاخرة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  },
  {
    id: 'suzhou',
    name: '苏州',
    nameEn: 'Suzhou',
    nameRu: 'Сучжоу',
    nameAr: 'سوتشو',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=800',
    description: '东方威尼斯，园林之城，丝绸之乡',
    descriptionEn: 'Venice of the East, city of gardens, home of silk',
    descriptionRu: 'Венеция Востока, город садов, родина шелка',
    descriptionAr: 'البندقية الشرقية، مدينة الحدائق، موطن الحرير',
    highlights: ['拙政园', '虎丘', '平江路', '周庄古镇', '苏州博物馆'],
    highlightsEn: ['Humble Administrator Garden', 'Tiger Hill', 'Pingjiang Road', 'Zhouzhuang', 'Suzhou Museum'],
    highlightsRu: ['Сад Скромного чиновника', 'Холм Тигра', 'Дорога Пинцзян', 'Чжоучжуан', 'Музей Сучжоу'],
    highlightsAr: ['حديقة المسؤول المتواضع', 'تل النمر', 'طريق بينغجيانغ', 'مدينة تشووتشوانغ', 'متحف سوتشو'],
    cuisine: ['松鼠桂鱼', '响油鳝糊', '苏式汤面', '蟹壳黄'],
    cuisineEn: ['Squirrel Mandarin Fish', 'Eel Paste', 'Suzhou Noodles', 'Crab Shell'],
    cuisineRu: ['Рыба Белка', 'Угорь', 'Лапша Сучжоу', 'Ракушка краба'],
    cuisineAr: ['سمك السنجاب', 'عجينة الثعبان', 'نودلز سوتشو', 'قشرة السلطعون'],
    bestSeason: '春季(4-5月)和秋季(9-10月)',
    bestSeasonEn: 'Spring (Apr-May) and Autumn (Sep-Oct)',
    bestSeasonRu: 'Весна (апр-май) и осень (сен-окт)',
    bestSeasonAr: 'الربيع (أبريل-مايو) والخريف (سبتمبر-أكتوبر)',
    duration: '建议1-2天',
    durationEn: 'Recommended 1-2 days',
    durationRu: 'Рекомендуется 1-2 дня',
    durationAr: 'موصى به 1-2 أيام',
    halalFood: ['观前街清真餐厅', '苏州清真牛肉馆', '平江路清真小吃'],
    halalFoodEn: ['Guanqian Street Halal', 'Suzhou Halal Beef', 'Pingjiang Halal Snacks'],
    halalFoodRu: ['Улица Гуаньцянь', 'Сучжоу говядина', 'Пинцзян закуски'],
    halalFoodAr: ['شارع غوانتشيان', 'لحم سوتشو', 'وجبات خفيفة بينغجيانغ'],
    mosques: ['苏州清真寺', '石路清真寺', '观前清真寺'],
    mosquesEn: ['Suzhou Mosque', 'Shilu Mosque', 'Guanqian Mosque'],
    mosquesRu: ['Мечеть Сучжоу', 'Мечеть Шилу', 'Мечеть Гуаньцянь'],
    mosquesAr: ['مسجد سوتشو', 'مسجد شيلو', 'مسجد غوانتشيان'],
    pricePerDay: 730,
    priceBreakdown: {
      zh: [
        { item: '精品酒店住宿（每晚）', price: 250 },
        { item: '早餐+正餐', price: 90 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '舒适用车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: 'Boutique Hotel (per night)', price: 250 },
        { item: 'Breakfast & Meals', price: 90 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Comfortable Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Бутик-отель (за ночь)', price: 250 },
        { item: 'Завтрак и обед', price: 90 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Комфортабельный автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'فندق بوتيك (لليلة)', price: 250 },
        { item: 'الإفطار والوجبات', price: 90 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة مريحة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  },
  {
    id: 'zhangjiajie',
    name: '张家界',
    nameEn: 'Zhangjiajie',
    nameRu: 'Чжанцзяцзе',
    nameAr: 'تشانغجياجي',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
    description: '阿凡达取景地，奇峰异石，人间仙境',
    descriptionEn: 'Avatar filming location, unique peaks, fairyland on Earth',
    descriptionRu: 'Место съемок Аватара, уникальные пики, сказочная земля',
    descriptionAr: 'موقع تصوير أفاتار، قمم فريدة، أرض العجائب',
    highlights: ['天门山', '武陵源', '玻璃桥', '黄龙洞', '宝峰湖'],
    highlightsEn: ['Tianmen Mountain', 'Wulingyuan', 'Glass Bridge', 'Yellow Dragon Cave', 'Baofeng Lake'],
    highlightsRu: ['Гора Тяньмэнь', 'Улинъюань', 'Стеклянный мост', 'Пещера Хуанлун', 'Озеро Баофэн'],
    highlightsAr: ['جبل تيانمن', 'وولينغيوان', 'الجسر الزجاجي', 'كهف التنين الأصفر', 'بحيرة باوفنغ'],
    cuisine: ['土家三下锅', '葛根粉', '岩耳炖鸡', '猕猴桃汁'],
    cuisineEn: ['Tujia Hotpot', 'Kudzu Powder', 'Rock Ear Chicken', 'Kiwi Juice'],
    cuisineRu: ['Хого Туцзя', 'Порошок кудзу', 'Курица с каменным ухом', 'Сок киви'],
    cuisineAr: ['حساء توجيا', 'مسحوق الكودزو', 'دجاج الأذن الصخرية', 'عصير الكيوي'],
    bestSeason: '春季(4-5月)和秋季(9-11月)',
    bestSeasonEn: 'Spring (Apr-May) and Autumn (Sep-Nov)',
    bestSeasonRu: 'Весна (апр-май) и осень (сен-ноя)',
    bestSeasonAr: 'الربيع (أبريل-مايو) والخريف (سبتمبر-نوفمبر)',
    duration: '建议2-3天',
    durationEn: 'Recommended 2-3 days',
    durationRu: 'Рекомендуется 2-3 дня',
    durationAr: 'موصى به 2-3 أيام',
    halalFood: ['张家界清真餐厅', '武陵源清真饭店', '市区清真牛肉馆'],
    halalFoodEn: ['Zhangjiajie Halal', 'Wulingyuan Halal', 'City Halal Beef'],
    halalFoodRu: ['Чжанцзяцзе халяль', 'Улинъюань халяль', 'Город говядина'],
    halalFoodAr: ['تشانغجياجي حلال', 'وولينغيوان حلال', 'لحم المدينة'],
    mosques: ['张家界清真寺', '永定区清真寺', '武陵源清真寺'],
    mosquesEn: ['Zhangjiajie Mosque', 'Yongding Mosque', 'Wulingyuan Mosque'],
    mosquesRu: ['Мечеть Чжанцзяцзе', 'Мечеть Юндин', 'Мечеть Улинъюань'],
    mosquesAr: ['مسجد تشانغجياجي', 'مسجد يونغدينغ', 'مسجد وولينغيوان'],
    pricePerDay: 710,
    priceBreakdown: {
      zh: [
        { item: '精品酒店住宿（每晚）', price: 240 },
        { item: '早餐+正餐', price: 80 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '舒适用车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: 'Boutique Hotel (per night)', price: 240 },
        { item: 'Breakfast & Meals', price: 80 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Comfortable Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Бутик-отель (за ночь)', price: 240 },
        { item: 'Завтрак и обед', price: 80 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Комфортабельный автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'فندق بوتيك (لليلة)', price: 240 },
        { item: 'الإفطار والوجبات', price: 80 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة مريحة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  },
  {
    id: 'lijiang',
    name: '丽江',
    nameEn: 'Lijiang',
    nameRu: 'Лицзян',
    nameAr: 'ليجيانغ',
    image: 'https://images.unsplash.com/photo-1527684651001-731c474bbb5a?w=800',
    description: '纳西古城，玉龙雪山，浪漫之都',
    descriptionEn: 'Naxi ancient town, Jade Dragon Snow Mountain, city of romance',
    descriptionRu: 'Древний город Наси, Снежная гора, город романтики',
    descriptionAr: 'المدينة القديمة الناشي، جبل التنين الجade، مدينة الرومانسية',
    highlights: ['丽江古城', '玉龙雪山', '束河古镇', '拉市海', '虎跳峡'],
    highlightsEn: ['Lijiang Old Town', 'Jade Dragon Mountain', 'Shuhe Town', 'Lashi Lake', 'Tiger Leaping Gorge'],
    highlightsRu: ['Старый город', 'Снежная гора', 'Шухэ', 'Озеро Лаши', 'Ущелье Тигра'],
    highlightsAr: ['المدينة القديمة', 'جبل التنين الجade', 'شوهي', 'بحيرة لاشي', 'وادي القفز النمر'],
    cuisine: ['丽江粑粑', '鸡豆凉粉', '纳西烤鱼', '酥油茶'],
    cuisineEn: ['Lijiang Baba', 'Chicken Bean Jelly', 'Naxi Grilled Fish', 'Butter Tea'],
    cuisineRu: ['Баба Лицзян', 'Желе из бобов', 'Рыба Наси', 'Масляный чай'],
    cuisineAr: ['بابا ليجيانغ', 'هلام الفاصوليا', 'سمك ناشي', 'شاي الزبدة'],
    bestSeason: '春季(3-5月)和秋季(9-11月)',
    bestSeasonEn: 'Spring (Mar-May) and Autumn (Sep-Nov)',
    bestSeasonRu: 'Весна (мар-май) и осень (сен-ноя)',
    bestSeasonAr: 'الربيع (مارس-مايو) والخريف (سبتمبر-نوفمبر)',
    duration: '建议2-3天',
    durationEn: 'Recommended 2-3 days',
    durationRu: 'Рекомендуется 2-3 дня',
    durationAr: 'موصى به 2-3 أيام',
    halalFood: ['丽江古城清真餐厅', '束河清真美食', '市区清真牛肉'],
    halalFoodEn: ['Old Town Halal', 'Shuhe Halal', 'City Halal Beef'],
    halalFoodRu: ['Старый город халяль', 'Шухэ халяль', 'Город говядина'],
    halalFoodAr: ['المدينة القديمة حلال', 'شوهي حلال', 'لحم المدينة'],
    mosques: ['丽江古城清真寺', '束河清真寺', '市区清真寺'],
    mosquesEn: ['Old Town Mosque', 'Shuhe Mosque', 'City Mosque'],
    mosquesRu: ['Мечеть Старого города', 'Мечеть Шухэ', 'Городская мечеть'],
    mosquesAr: ['مسجد المدينة القديمة', 'مسجد شوهي', 'مسجد المدينة'],
    pricePerDay: 690,
    priceBreakdown: {
      zh: [
        { item: '精品客栈住宿（每晚）', price: 220 },
        { item: '早餐+正餐', price: 80 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '舒适用车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: 'Boutique Inn (per night)', price: 220 },
        { item: 'Breakfast & Meals', price: 80 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Comfortable Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Бутик-гостиница (за ночь)', price: 220 },
        { item: 'Завтрак и обед', price: 80 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Комфортабельный автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'نزل بوتيك (لليلة)', price: 220 },
        { item: 'الإفطار والوجبات', price: 80 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة مريحة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  },
  {
    id: 'huangshan',
    name: '黄山',
    nameEn: 'Huangshan',
    nameRu: 'Хуаншань',
    nameAr: 'هوانغشان',
    image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800',
    description: '天下第一奇山，云海日出，松石奇观',
    descriptionEn: 'Most spectacular mountain, sea of clouds, unique pines and rocks',
    descriptionRu: 'Самая живописная гора, море облаков, уникальные сосны',
    descriptionAr: 'أجمل جبل، بحر الغيوم، الصنوبر والصخور الفريدة',
    highlights: ['迎客松', '光明顶', '西海大峡谷', '飞来石', '温泉'],
    highlightsEn: ['Guest-Greeting Pine', 'Bright Summit', 'West Sea Canyon', 'Flying Stone', 'Hot Springs'],
    highlightsRu: ['Сосна Гостеприимства', 'Яркая вершина', 'Каньон Западного моря', 'Летающий камень', 'Горячие источники'],
    highlightsAr: ['صنوبر الترحيب', 'القمة المشرقة', 'وادي البحر الغربي', 'الحجارة الطائرة', 'الينابيع الساخنة'],
    cuisine: ['黄山烧饼', '毛豆腐', '石耳炖鸡', '黄山毛峰茶'],
    cuisineEn: ['Huangshan Cake', 'Hairy Tofu', 'Rock Ear Chicken', 'Maofeng Tea'],
    cuisineRu: ['Пирог Хуаншань', 'Волосатый тофу', 'Курица с каменным ухом', 'Чай Маофэн'],
    cuisineAr: ['كعكة هوانغشان', 'توفو الشعر', 'دجاج الأذن الصخرية', 'شاي ماوفنغ'],
    bestSeason: '春季(3-5月)和秋季(9-11月)',
    bestSeasonEn: 'Spring (Mar-May) and Autumn (Sep-Nov)',
    bestSeasonRu: 'Весна (мар-май) и осень (сен-ноя)',
    bestSeasonAr: 'الربيع (مارس-مايو) والخريف (سبتمبر-نوفمبر)',
    duration: '建议2-3天',
    durationEn: 'Recommended 2-3 days',
    durationRu: 'Рекомендуется 2-3 дня',
    durationAr: 'موصى به 2-3 أيام',
    halalFood: ['黄山脚下清真餐厅', '汤口镇清真饭店', '市区清真牛肉'],
    halalFoodEn: ['Foot Halal', 'Tangkou Halal', 'City Halal Beef'],
    halalFoodRu: ['Подножие халяль', 'Танкоу халяль', 'Город говядина'],
    halalFoodAr: ['تلة حلال', 'تانغكو حلال', 'لحم المدينة'],
    mosques: ['黄山清真寺', '汤口清真寺', '市区清真寺'],
    mosquesEn: ['Huangshan Mosque', 'Tangkou Mosque', 'City Mosque'],
    mosquesRu: ['Мечеть Хуаншань', 'Мечеть Танкоу', 'Городская мечеть'],
    mosquesAr: ['مسجد هوانغشان', 'مسجد تانغكو', 'مسجد المدينة'],
    pricePerDay: 730,
    priceBreakdown: {
      zh: [
        { item: '山上酒店住宿（每晚）', price: 280 },
        { item: '早餐+正餐', price: 80 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '景区交通', price: 50 },
        { item: '景点门票', price: 20 }
      ],
      en: [
        { item: 'Mountain Hotel (per night)', price: 280 },
        { item: 'Breakfast & Meals', price: 80 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Scenic Transport', price: 50 },
        { item: 'Attraction Tickets', price: 20 }
      ],
      ru: [
        { item: 'Горный отель (за ночь)', price: 280 },
        { item: 'Завтрак и обед', price: 80 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Транспорт', price: 50 },
        { item: 'Билеты', price: 20 }
      ],
      ar: [
        { item: 'فندق جبلي (لليلة)', price: 280 },
        { item: 'الإفطار والوجبات', price: 80 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'مواصلات المناظر', price: 50 },
        { item: 'التذاكر', price: 20 }
      ]
    }
  },
  {
    id: 'dali',
    name: '大理',
    nameEn: 'Dali',
    nameRu: 'Дали',
    nameAr: 'دالي',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    description: '风花雪月，苍山洱海，白族风情',
    descriptionEn: 'Wind, flowers, snow, moon, Cangshan Erhai, Bai culture',
    descriptionRu: 'Ветер, цветы, снег, луна, Цаншань Эрхай, культура Бай',
    descriptionAr: 'الرياح، الزهور، الثلج، القمر، كسانغشان إرهي، ثقافة باي',
    highlights: ['洱海', '大理古城', '苍山', '崇圣寺三塔', '喜洲古镇'],
    highlightsEn: ['Erhai Lake', 'Dali Old Town', 'Cangshan', 'Three Pagodas', 'Xizhou Town'],
    highlightsRu: ['Озеро Эрхай', 'Старый город', 'Цаншань', 'Три пагоды', 'Сичжоу'],
    highlightsAr: ['بحيرة إرهي', 'المدينة القديمة', 'كسانغشان', 'الثلاث باغودات', 'مدينة شيشو'],
    cuisine: ['大理砂锅鱼', '乳扇', '喜洲粑粑', '雕梅酒'],
    cuisineEn: ['Dali Fish Pot', 'Milk Fan', 'Xizhou Baba', 'Carved Plum Wine'],
    cuisineRu: ['Рыбный горшок', 'Молочный веер', 'Баба Сичжоу', 'Вино сливы'],
    cuisineAr: ['قدر سمك دالي', 'مروحة الحليب', 'بابا شيشو', 'نبيذ الخوخ المنحوت'],
    bestSeason: '春季(3-5月)和秋季(9-11月)',
    bestSeasonEn: 'Spring (Mar-May) and Autumn (Sep-Nov)',
    bestSeasonRu: 'Весна (мар-май) и осень (сен-ноя)',
    bestSeasonAr: 'الربيع (مارس-مايو) والخريف (سبتمبر-نوفمبر)',
    duration: '建议2-3天',
    durationEn: 'Recommended 2-3 days',
    durationRu: 'Рекомендуется 2-3 дня',
    durationAr: 'موصى به 2-3 أيام',
    halalFood: ['大理古城清真餐厅', '喜洲清真美食', '市区清真牛肉'],
    halalFoodEn: ['Old Town Halal', 'Xizhou Halal', 'City Halal Beef'],
    halalFoodRu: ['Старый город халяль', 'Сичжоу халяль', 'Город говядина'],
    halalFoodAr: ['المدينة القديمة حلال', 'شيشو حلال', 'لحم المدينة'],
    mosques: ['大理清真寺', '喜洲清真寺', '市区清真寺'],
    mosquesEn: ['Dali Mosque', 'Xizhou Mosque', 'City Mosque'],
    mosquesRu: ['Мечеть Дали', 'Мечеть Сичжоу', 'Городская мечеть'],
    mosquesAr: ['مسجد دالي', 'مسجد شيشو', 'مسجد المدينة'],
    pricePerDay: 660,
    priceBreakdown: {
      zh: [
        { item: '精品客栈住宿（每晚）', price: 200 },
        { item: '早餐+正餐', price: 70 },
        { item: '中文导游服务（每天）', price: 300 },
        { item: '舒适用车', price: 50 },
        { item: '景点门票', price: 40 }
      ],
      en: [
        { item: 'Boutique Inn (per night)', price: 200 },
        { item: 'Breakfast & Meals', price: 70 },
        { item: 'English Guide (per day)', price: 600 },
        { item: 'Comfortable Vehicle', price: 50 },
        { item: 'Attraction Tickets', price: 40 }
      ],
      ru: [
        { item: 'Бутик-гостиница (за ночь)', price: 200 },
        { item: 'Завтрак и обед', price: 70 },
        { item: 'Russian Guide (per day)', price: 1500 },
        { item: 'Комфортабельный автомобиль', price: 50 },
        { item: 'Билеты', price: 40 }
      ],
      ar: [
        { item: 'نزل بوتيك (لليلة)', price: 200 },
        { item: 'الإفطار والوجبات', price: 70 },
        { item: 'Arabic Guide (per day)', price: 1500 },
        { item: 'سيارة مريحة', price: 50 },
        { item: 'التذاكر', price: 40 }
      ]
    }
  }
];

interface DestinationShowcaseProps {
  selectedCities: string[];
  onToggleCity: (cityId: string) => void;
  language?: 'zh' | 'en' | 'ru' | 'ar';
}

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({
  selectedCities,
  onToggleCity,
  language = 'zh'
}) => {
  const { t } = useTranslation();

  const getText = (dest: Destination, field: keyof Destination) => {
    const langSuffix = language === 'zh' ? '' : language.charAt(0).toUpperCase() + language.slice(1);
    const key = `${field}${langSuffix}` as keyof Destination;
    return (dest[key] as string) || (dest[field] as string);
  };

  const getArray = (dest: Destination, field: keyof Destination) => {
    const langSuffix = language === 'zh' ? '' : language.charAt(0).toUpperCase() + language.slice(1);
    const key = `${field}${langSuffix}` as keyof Destination;
    return (dest[key] as string[]) || (dest[field] as string[]);
  };

  const getPriceBreakdown = (dest: Destination) => {
    return dest.priceBreakdown[language] || dest.priceBreakdown.zh;
  };

  const labels = {
    zh: { highlights: '必游景点', cuisine: '当地美食', bestSeason: '最佳季节', duration: '建议游玩', halal: '清真餐饮', mosque: '附近清真寺', price: '每日报价', priceDetail: '价格明细' },
    en: { highlights: 'Highlights', cuisine: 'Cuisine', bestSeason: 'Best Season', duration: 'Duration', halal: 'Halal Food', mosque: 'Nearby Mosque', price: 'Daily Price', priceDetail: 'Price Breakdown' },
    ru: { highlights: 'Достопримечательности', cuisine: 'Кухня', bestSeason: 'Лучший сезон', duration: 'Продолжительность', halal: 'Халяль', mosque: 'Мечеть', price: 'Цена за день', priceDetail: 'Детализация' },
    ar: { highlights: 'أبرز المعالم', cuisine: 'المأكولات', bestSeason: 'أفضل موسم', duration: 'المدة', halal: 'حلال', mosque: 'مسجد', price: 'السعر اليومي', priceDetail: 'تفاصيل السعر' }
  };

  const label = labels[language];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'zh' ? '热门目的地' : language === 'en' ? 'Popular Destinations' : language === 'ru' ? 'Популярные направления' : 'وجهات شائعة'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {language === 'zh' ? '精选中国最受欢迎的旅游城市，点击选择您想游览的城市，我们将为您定制专属行程' :
           language === 'en' ? 'Selected most popular cities in China, click to choose your destinations' :
           language === 'ru' ? 'Отобраны самые популярные города Китая, выберите направления' :
           'اختر وجهاتك من أشهر مدن الصين'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onToggleCity(dest.id)}
            className={`cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
              selectedCities.includes(dest.id)
                ? 'ring-4 ring-blue-500 scale-[1.02]'
                : 'hover:shadow-xl hover:scale-[1.01]'
            }`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={dest.image}
                alt={getText(dest, 'name')}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">{getText(dest, 'name')}</h3>
                <p className="text-sm opacity-90">{dest.nameEn}</p>
              </div>
              {selectedCities.includes(dest.id) && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="p-5 bg-white">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{getText(dest, 'description')}</p>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{label.highlights}</p>
                    <p className="text-sm text-gray-700">{getArray(dest, 'highlights').slice(0, 3).join('、')}...</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Utensils className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{label.cuisine}</p>
                    <p className="text-sm text-gray-700">{getArray(dest, 'cuisine').slice(0, 3).join('、')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Moon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{label.halal}</p>
                    <p className="text-sm text-gray-700">{getArray(dest, 'halalFood').slice(0, 2).join('、')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{label.mosque}</p>
                    <p className="text-sm text-gray-700">{getArray(dest, 'mosques').slice(0, 2).join('、')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{label.bestSeason}</p>
                    <p className="text-sm text-gray-700">{getText(dest, 'bestSeason')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{label.duration}</p>
                    <p className="text-sm text-gray-700">{getText(dest, 'duration')}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-amber-500" />
                    <span className="text-xs text-gray-500">{label.price}</span>
                    <span className="text-lg font-bold text-amber-600">¥{dest.pricePerDay}</span>
                    <span className="text-xs text-gray-400">/人/天</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">{label.priceDetail}:</p>
                    <div className="space-y-1">
                      {getPriceBreakdown(dest).slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-gray-600">{item.item}</span>
                          <span className="text-amber-600">¥{item.price}</span>
                        </div>
                      ))}
                      <p className="text-xs text-gray-400 text-center">...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
