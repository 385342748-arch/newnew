import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Bed, Utensils, User, Car, Ticket, Star, Check } from 'lucide-react';

interface RouteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: any;
  language: 'zh' | 'en' | 'ru' | 'ar';
}

const routeDetails: Record<string, any> = {
  classic: {
    zh: {
      title: '经典中国之旅',
      description: '探索中国三大古都，体验五千年文明精髓',
      itinerary: [
        { day: 1, city: '北京', activities: ['抵达北京，入住五星级酒店', '欢迎晚宴'], meals: ['晚餐'], hotel: '北京王府半岛酒店' },
        { day: 2, city: '北京', activities: ['天安门广场', '故宫博物院（含专业讲解）', '景山公园俯瞰紫禁城'], meals: ['早餐', '午餐', '晚餐'], hotel: '北京王府半岛酒店' },
        { day: 3, city: '北京', activities: ['八达岭长城（含缆车）', '明十三陵', '王府井步行街'], meals: ['早餐', '午餐'], hotel: '北京王府半岛酒店' },
        { day: 4, city: '西安', activities: ['高铁前往西安', '回民街美食探索', '钟鼓楼夜景'], meals: ['早餐', '晚餐'], hotel: '西安索菲特传奇酒店' },
        { day: 5, city: '西安', activities: ['秦始皇兵马俑博物馆（含专业讲解）', '华清池', '大唐不夜城'], meals: ['早餐', '午餐', '晚餐'], hotel: '西安索菲特传奇酒店' },
        { day: 6, city: '西安', activities: ['古城墙骑行', '大雁塔', '陕西历史博物馆'], meals: ['早餐', '午餐'], hotel: '西安索菲特传奇酒店' },
        { day: 7, city: '上海', activities: ['高铁前往上海', '外滩万国建筑群', '南京路步行街'], meals: ['早餐', '晚餐'], hotel: '上海和平饭店' },
        { day: 8, city: '上海', activities: ['豫园', '城隍庙', '送机'], meals: ['早餐'], hotel: '-' }
      ],
      includes: ['全程五星级酒店住宿', '每日早餐+部分正餐', '专业中文导游服务', '全程豪华商务车', '所有景点门票', '高铁二等座', '机场接送']
    },
    en: {
      title: 'Classic China Tour',
      description: 'Explore China\'s three ancient capitals, experience five thousand years of civilization',
      itinerary: [
        { day: 1, city: 'Beijing', activities: ['Arrive in Beijing, check into 5-star hotel', 'Welcome dinner'], meals: ['Dinner'], hotel: 'The Peninsula Beijing' },
        { day: 2, city: 'Beijing', activities: ['Tiananmen Square', 'Forbidden City (with guide)', 'Jingshan Park panoramic view'], meals: ['Breakfast', 'Lunch', 'Dinner'], hotel: 'The Peninsula Beijing' },
        { day: 3, city: 'Beijing', activities: ['Great Wall at Badaling (with cable car)', 'Ming Tombs', 'Wangfujing Street'], meals: ['Breakfast', 'Lunch'], hotel: 'The Peninsula Beijing' },
        { day: 4, city: 'Xi\'an', activities: ['High-speed train to Xi\'an', 'Muslim Quarter food tour', 'Bell & Drum Tower night view'], meals: ['Breakfast', 'Dinner'], hotel: 'Sofitel Legend Xian' },
        { day: 5, city: 'Xi\'an', activities: ['Terracotta Warriors (with guide)', 'Huaqing Palace', 'Grand Tang Mall'], meals: ['Breakfast', 'Lunch', 'Dinner'], hotel: 'Sofitel Legend Xian' },
        { day: 6, city: 'Xi\'an', activities: ['City Wall cycling', 'Big Wild Goose Pagoda', 'Shaanxi History Museum'], meals: ['Breakfast', 'Lunch'], hotel: 'Sofitel Legend Xian' },
        { day: 7, city: 'Shanghai', activities: ['High-speed train to Shanghai', 'The Bund architecture', 'Nanjing Road'], meals: ['Breakfast', 'Dinner'], hotel: 'Fairmont Peace Hotel' },
        { day: 8, city: 'Shanghai', activities: ['Yu Garden', 'City God Temple', 'Airport transfer'], meals: ['Breakfast'], hotel: '-' }
      ],
      includes: ['5-star hotel accommodation', 'Daily breakfast + some meals', 'Professional Chinese guide', 'Luxury vehicle throughout', 'All attraction tickets', 'High-speed train 2nd class', 'Airport transfers']
    },
    ru: {
      title: 'Классический тур по Китаю',
      description: 'Исследуйте три древние столицы Китая, познакомьтесь с пятитысячелетней цивилизацией',
      itinerary: [
        { day: 1, city: 'Пекин', activities: ['Прибытие в Пекин, заселение в отель 5 звезд', 'Ужин приветствия'], meals: ['Ужин'], hotel: 'The Peninsula Beijing' },
        { day: 2, city: 'Пекин', activities: ['Площадь Тяньаньмэнь', 'Запретный город (с гидом)', 'Парк Цзиншань'], meals: ['Завтрак', 'Обед', 'Ужин'], hotel: 'The Peninsula Beijing' },
        { day: 3, city: 'Пекин', activities: ['Великая стена Бадалин (канатная дорога)', 'Гробницы Мин', 'Улица Ванфуцзин'], meals: ['Завтрак', 'Обед'], hotel: 'The Peninsula Beijing' },
        { day: 4, city: 'Сиань', activities: ['Скоростной поезд в Сиань', 'Кулинарный тур по мусульманскому кварталу', 'Башни колокола и барабана'], meals: ['Завтрак', 'Ужин'], hotel: 'Sofitel Legend Xian' },
        { day: 5, city: 'Сиань', activities: ['Терракотовая армия (с гидом)', 'Дворец Хуацин', 'Торговый центр Тан'], meals: ['Завтрак', 'Обед', 'Ужин'], hotel: 'Sofitel Legend Xian' },
        { day: 6, city: 'Сиань', activities: ['Велосипедная прогулка по стене', 'Пагода Большой Дикий Гусь', 'Музей истории Шэньси'], meals: ['Завтрак', 'Обед'], hotel: 'Sofitel Legend Xian' },
        { day: 7, city: 'Шанхай', activities: ['Скоростной поезд в Шанхай', 'Набережная', 'Улица Нанкин'], meals: ['Завтрак', 'Ужин'], hotel: 'Fairmont Peace Hotel' },
        { day: 8, city: 'Шанхай', activities: ['Сад Юй', 'Храм городского бога', 'Трансфер в аэропорт'], meals: ['Завтрак'], hotel: '-' }
      ],
      includes: ['Проживание в отелях 5 звезд', 'Завтрак + некоторые приемы пищи', 'Профессиональный гид', 'Люксовый автомобиль', 'Все билеты', 'Скоростной поезд 2 класс', 'Трансферы']
    },
    ar: {
      title: 'جولة الصين الكلاسيكية',
      description: 'استكشف عواصم الصين الثلاثة القديمة، واختبر حضارة خمسة آلاف عام',
      itinerary: [
        { day: 1, city: 'بكين', activities: ['الوصول إلى بكين، تسجيل الدخول في فندق 5 نجوم', 'عشاء ترحيبي'], meals: ['العشاء'], hotel: 'The Peninsula Beijing' },
        { day: 2, city: 'بكين', activities: ['ساحة تيانانمن', 'المدينة المحرمة (مع مرشد)', 'حديقة جينغشان'], meals: ['الإفطار', 'الغداء', 'العشاء'], hotel: 'The Peninsula Beijing' },
        { day: 3, city: 'بكين', activities: ['سور الصين العظيم بادالينغ (تلفريك)', 'مقابر مين', 'شارع وانغفوجينغ'], meals: ['الإفطار', 'الغداء'], hotel: 'The Peninsula Beijing' },
        { day: 4, city: 'شيآن', activities: ['قطار فائق السرعة إلى شيآن', 'جولة طعام في الحي المسلم', 'برجي الجرس والطبول'], meals: ['الإفطار', 'العشاء'], hotel: 'Sofitel Legend Xian' },
        { day: 5, city: 'شيآن', activities: ['محاربو الطين (مع مرشد)', 'قصر هوانغتشينغ', 'مول تانغ الكبير'], meals: ['الإفطار', 'الغداء', 'العشاء'], hotel: 'Sofitel Legend Xian' },
        { day: 6, city: 'شيآن', activities: ['ركوب الدراجات على السور', 'باغودا الأوزة البرية الكبيرة', 'متحف شانسي للتاريخ'], meals: ['الإفطار', 'الغداء'], hotel: 'Sofitel Legend Xian' },
        { day: 7, city: 'شنغهاي', activities: ['قطار فائق السرعة إلى شنغهاي', 'الواجهة البحرية', 'شارع نانجينغ'], meals: ['الإفطار', 'العشاء'], hotel: 'Fairmont Peace Hotel' },
        { day: 8, city: 'شنغهاي', activities: ['حديقة يو', 'معبد إله المدينة', 'نقل المطار'], meals: ['الإفطار'], hotel: '-' }
      ],
      includes: ['إقامة في فنادق 5 نجوم', 'الإفطار اليومي + بعض الوجبات', 'مرشد صيني محترف', 'سيارة فاخرة طوال الرحلة', 'جميع تذاكر المعالم', 'قطار فائق السرعة درجة ثانية', 'نقل المطار']
    }
  },
  silkroad: {
    zh: {
      title: '丝绸之路探索',
      description: '重走千年丝路，感受东西方文明交汇',
      itinerary: [
        { day: 1, city: '西安', activities: ['抵达西安，入住精品酒店', '回民街美食之旅'], meals: ['晚餐'], hotel: '西安索菲特传奇酒店' },
        { day: 2, city: '西安', activities: ['秦始皇兵马俑博物馆', '华清池', '《长恨歌》演出'], meals: ['早餐', '午餐', '晚餐'], hotel: '西安索菲特传奇酒店' },
        { day: 3, city: '兰州', activities: ['高铁前往兰州', '黄河母亲雕塑', '中山桥', '正宁路夜市'], meals: ['早餐', '晚餐'], hotel: '兰州皇冠假日酒店' },
        { day: 4, city: '兰州', activities: ['甘肃省博物馆（马踏飞燕）', '黄河风情线', '品尝正宗兰州拉面'], meals: ['早餐', '午餐'], hotel: '兰州皇冠假日酒店' },
        { day: 5, city: '敦煌', activities: ['飞机前往敦煌', '鸣沙山月牙泉（骑骆驼）', '沙洲夜市'], meals: ['早餐', '晚餐'], hotel: '敦煌山庄' },
        { day: 6, city: '敦煌', activities: ['莫高窟（含专业讲解+特窟）', '敦煌博物馆', '送机'], meals: ['早餐', '午餐'], hotel: '-' }
      ],
      includes: ['全程精品酒店住宿', '每日早餐+部分正餐', '专业丝路文化导游', '全程舒适用车', '所有景点门票（含莫高窟特窟）', '高铁及境内航班', '机场接送']
    },
    en: {
      title: 'Silk Road Discovery',
      description: 'Retrace the ancient Silk Road, experience the convergence of Eastern and Western civilizations',
      itinerary: [
        { day: 1, city: 'Xi\'an', activities: ['Arrive in Xi\'an, boutique hotel check-in', 'Muslim Quarter food tour'], meals: ['Dinner'], hotel: 'Sofitel Legend Xian' },
        { day: 2, city: 'Xi\'an', activities: ['Terracotta Warriors Museum', 'Huaqing Palace', 'Song of Everlasting Sorrow show'], meals: ['Breakfast', 'Lunch', 'Dinner'], hotel: 'Sofitel Legend Xian' },
        { day: 3, city: 'Lanzhou', activities: ['High-speed train to Lanzhou', 'Yellow River Mother Sculpture', 'Zhongshan Bridge', 'Zhengning Road Night Market'], meals: ['Breakfast', 'Dinner'], hotel: 'Crowne Plaza Lanzhou' },
        { day: 4, city: 'Lanzhou', activities: ['Gansu Provincial Museum (Flying Horse)', 'Yellow River scenic line', 'Authentic Lanzhou beef noodles'], meals: ['Breakfast', 'Lunch'], hotel: 'Crowne Plaza Lanzhou' },
        { day: 5, city: 'Dunhuang', activities: ['Flight to Dunhuang', 'Singing Sand Mountain & Crescent Lake (camel ride)', 'Shazhou Night Market'], meals: ['Breakfast', 'Dinner'], hotel: 'The Silk Road Dunhuang Hotel' },
        { day: 6, city: 'Dunhuang', activities: ['Mogao Caves (special caves included)', 'Dunhuang Museum', 'Airport transfer'], meals: ['Breakfast', 'Lunch'], hotel: '-' }
      ],
      includes: ['Boutique hotel accommodation', 'Daily breakfast + some meals', 'Silk Road cultural guide', 'Comfortable vehicle', 'All attraction tickets (special caves included)', 'High-speed train & domestic flights', 'Airport transfers']
    },
    ru: {
      title: 'Шелковый путь',
      description: 'Пройдите по древнему Шелковому пути, почувствуйте встречу восточной и западной цивилизаций',
      itinerary: [
        { day: 1, city: 'Сиань', activities: ['Прибытие в Сиань, бутик-отель', 'Кулинарный тур по мусульманскому кварталу'], meals: ['Ужин'], hotel: 'Sofitel Legend Xian' },
        { day: 2, city: 'Сиань', activities: ['Музей терракотовой армии', 'Дворец Хуацин', 'Шоу Песнь вечной скорби'], meals: ['Завтрак', 'Обед', 'Ужин'], hotel: 'Sofitel Legend Xian' },
        { day: 3, city: 'Ланьчжоу', activities: ['Скоростной поезд в Ланьчжоу', 'Скульптура Матери Желтой реки', 'Мост Чжуншань', 'Ночной рынок'], meals: ['Завтрак', 'Ужин'], hotel: 'Crowne Plaza Lanzhou' },
        { day: 4, city: 'Ланьчжоу', activities: ['Провинциальный музей Ганьсу', 'Желтая река', 'Лапша Ланьчжоу'], meals: ['Завтрак', 'Обед'], hotel: 'Crowne Plaza Lanzhou' },
        { day: 5, city: 'Дуньхуан', activities: ['Перелет в Дуньхуан', 'Поющие дюны и Полумесяц (верблюды)', 'Ночной рынок'], meals: ['Завтрак', 'Ужин'], hotel: 'The Silk Road Dunhuang Hotel' },
        { day: 6, city: 'Дуньхуан', activities: ['Пещеры Могао (специальные пещеры)', 'Музей Дуньхуана', 'Трансфер в аэропорт'], meals: ['Завтрак', 'Обед'], hotel: '-' }
      ],
      includes: ['Бутик-отели', 'Завтрак + некоторые приемы пищи', 'Гид по Шелковому пути', 'Комфортабельный автомобиль', 'Все билеты (специальные пещеры)', 'Поезд и внутренние рейсы', 'Трансферы']
    },
    ar: {
      title: 'اكتشاف طريق الحرير',
      description: 'سلك طريق الحرير القديم، واختبر التقاء الحضارات الشرقية والغربية',
      itinerary: [
        { day: 1, city: 'شيآن', activities: ['الوصول إلى شيآن، تسجيل الدخول في فندق بوتيك', 'جولة طعام في الحي المسلم'], meals: ['العشاء'], hotel: 'Sofitel Legend Xian' },
        { day: 2, city: 'شيآن', activities: ['متحف محاربي الطين', 'قصر هوانغتشينغ', 'عرض أغنية الحزن الأبدي'], meals: ['الإفطار', 'الغداء', 'العشاء'], hotel: 'Sofitel Legend Xian' },
        { day: 3, city: 'لانتشو', activities: ['قطار فائق السرعة إلى لانتشو', 'تمثال أم النهر الأصفر', 'جسر تشونغشان', 'سوق الليل'], meals: ['الإفطار', 'العشاء'], hotel: 'Crowne Plaza Lanzhou' },
        { day: 4, city: 'لانتشو', activities: ['متحف قانسو الإقليمي', 'نهر الأصفر', 'نودلز لانتشو الأصلية'], meals: ['الإفطار', 'الغداء'], hotel: 'Crowne Plaza Lanzhou' },
        { day: 5, city: 'دونهوانغ', activities: ['رحلة جوية إلى دونهوانغ', 'الكثبان الرملية والهلال (ركوب الجمال)', 'سوق الليل'], meals: ['الإفطار', 'العشاء'], hotel: 'The Silk Road Dunhuang Hotel' },
        { day: 6, city: 'دونهوانغ', activities: ['كهوف موغاو (الكهوف الخاصة)', 'متحف دونهوانغ', 'نقل المطار'], meals: ['الإفطار', 'الغداء'], hotel: '-' }
      ],
      includes: ['إقامة في فنادق بوتيك', 'الإفطار اليومي + بعض الوجبات', 'مرشد ثقافي لطريق الحرير', 'سيارة مريحة', 'جميع التذاكر (الكهوف الخاصة)', 'قطار ورحلات داخلية', 'نقل المطار']
    }
  },
  panda: {
    zh: {
      title: '熊猫发现之旅',
      description: '近距离接触国宝大熊猫，探索四川自然奇观',
      itinerary: [
        { day: 1, city: '成都', activities: ['抵达成都，入住精品酒店', '宽窄巷子漫步', '川剧变脸表演'], meals: ['晚餐'], hotel: '成都博舍' },
        { day: 2, city: '成都', activities: ['大熊猫繁育研究基地（VIP通道）', '武侯祠', '锦里古街'], meals: ['早餐', '午餐', '晚餐'], hotel: '成都博舍' },
        { day: 3, city: '成都', activities: ['都江堰水利工程', '青城山', '品尝正宗川菜'], meals: ['早餐', '午餐'], hotel: '成都博舍' },
        { day: 4, city: '九寨沟', activities: ['乘车前往九寨沟', '沿途欣赏岷江峡谷风光', '入住沟口酒店'], meals: ['早餐', '晚餐'], hotel: '九寨沟喜来登国际大酒店' },
        { day: 5, city: '九寨沟', activities: ['全天游览九寨沟（五花海、长海、诺日朗瀑布）', '藏族家访体验'], meals: ['早餐', '午餐', '晚餐'], hotel: '九寨沟喜来登国际大酒店' }
      ],
      includes: ['全程精品酒店住宿', '每日早餐+部分正餐', '专业自然生态导游', '全程舒适用车', '所有景点门票（含熊猫基地VIP）', '机场接送']
    },
    en: {
      title: 'Panda Discovery',
      description: 'Get up close with giant pandas, explore Sichuan\'s natural wonders',
      itinerary: [
        { day: 1, city: 'Chengdu', activities: ['Arrive in Chengdu, boutique hotel', 'Kuanzhai Alley stroll', 'Sichuan Opera face-changing show'], meals: ['Dinner'], hotel: 'The Temple House Chengdu' },
        { day: 2, city: 'Chengdu', activities: ['Panda Base (VIP access)', 'Wuhou Shrine', 'Jinli Ancient Street'], meals: ['Breakfast', 'Lunch', 'Dinner'], hotel: 'The Temple House Chengdu' },
        { day: 3, city: 'Chengdu', activities: ['Dujiangyan Irrigation System', 'Qingcheng Mountain', 'Authentic Sichuan cuisine'], meals: ['Breakfast', 'Lunch'], hotel: 'The Temple House Chengdu' },
        { day: 4, city: 'Jiuzhaigou', activities: ['Drive to Jiuzhaigou', 'Minjiang Canyon scenery', 'Hotel near park entrance'], meals: ['Breakfast', 'Dinner'], hotel: 'Sheraton Jiuzhaigou Resort' },
        { day: 5, city: 'Jiuzhaigou', activities: ['Full day Jiuzhaigou tour (Five Flower Lake, Long Lake, Nuorilang Falls)', 'Tibetan family visit'], meals: ['Breakfast', 'Lunch', 'Dinner'], hotel: 'Sheraton Jiuzhaigou Resort' }
      ],
      includes: ['Boutique hotel accommodation', 'Daily breakfast + some meals', 'Nature & ecology guide', 'Comfortable vehicle', 'All tickets (Panda Base VIP included)', 'Airport transfers']
    },
    ru: {
      title: 'Открытие панд',
      description: 'Поблизости познакомьтесь с пандами, исследуйте природные чудеса Сычуани',
      itinerary: [
        { day: 1, city: 'Чэнду', activities: ['Прибытие в Чэнду, бутик-отель', 'Прогулка по переулку Куаньчжай', 'Опера Сычуань'], meals: ['Ужин'], hotel: 'The Temple House Chengdu' },
        { day: 2, city: 'Чэнду', activities: ['База панд (VIP доступ)', 'Храм Ухоу', 'Улица Цзиньли'], meals: ['Завтрак', 'Обед', 'Ужин'], hotel: 'The Temple House Chengdu' },
        { day: 3, city: 'Чэнду', activities: ['Ирригационная система Дуцзянъянь', 'Гора Цинчэн', 'Кухня Сычуань'], meals: ['Завтрак', 'Обед'], hotel: 'The Temple House Chengdu' },
        { day: 4, city: 'Цзючжайгоу', activities: ['Поездка в Цзючжайгоу', 'Ущелье Миньцзян', 'Отель у входа'], meals: ['Завтрак', 'Ужин'], hotel: 'Sheraton Jiuzhaigou Resort' },
        { day: 5, city: 'Цзючжайгоу', activities: ['Целый день в Цзючжайгоу', 'Визит к тибетской семье'], meals: ['Завтрак', 'Обед', 'Ужин'], hotel: 'Sheraton Jiuzhaigou Resort' }
      ],
      includes: ['Бутик-отели', 'Завтрак + некоторые приемы пищи', 'Гид по природе', 'Комфортабельный автомобиль', 'Все билеты (VIP база панд)', 'Трансферы']
    },
    ar: {
      title: 'اكتشاف الباندا',
      description: 'تعرف عن قرب على الباندا العملاقة، واستكشف عجائب سيتشوان الطبيعية',
      itinerary: [
        { day: 1, city: 'تشنغدو', activities: ['الوصول إلى تشنغدو، فندق بوتيك', 'تجول في كوانزهاي ألي', 'أوبرا سيتشوان'], meals: ['العشاء'], hotel: 'The Temple House Chengdu' },
        { day: 2, city: 'تشنغدو', activities: ['قاعدة الباندا (وصول VIP)', 'ضريح ووهو', 'شارع جينلي القديم'], meals: ['الإفطار', 'الغداء', 'العشاء'], hotel: 'The Temple House Chengdu' },
        { day: 3, city: 'تشنغدو', activities: ['نظام دوجيانغيان للري', 'جبل تشينغتشنغ', 'مطبخ سيتشوان الأصلي'], meals: ['الإفطار', 'الغداء'], hotel: 'The Temple House Chengdu' },
        { day: 4, city: 'جيوزهايغو', activities: ['القيادة إلى جيوزهايغو', 'منظر وادي مينجيانغ', 'فندق عند المدخل'], meals: ['الإفطار', 'العشاء'], hotel: 'Sheraton Jiuzhaigou Resort' },
        { day: 5, city: 'جيوزهايغو', activities: ['يوم كامل في جيوزهايغو', 'زيارة عائلة تبتية'], meals: ['الإفطار', 'الغداء', 'العشاء'], hotel: 'Sheraton Jiuzhaigou Resort' }
      ],
      includes: ['إقامة في فنادق بوتيك', 'الإفطار اليومي + بعض الوجبات', 'مرشد طبيعة وبيئة', 'سيارة مريحة', 'جميع التذاكر (VIP قاعدة الباندا)', 'نقل المطار']
    }
  },
  ancient: {
    zh: {
      title: '古都文化之旅',
      description: '探访四大古都，领略中华文明的博大精深',
      itinerary: [
        { day: 1, city: '北京', activities: ['抵达北京，入住五星级酒店', '簋街夜市美食探索'], meals: ['晚餐'], hotel: '北京王府半岛酒店' },
        { day: 2, city: '北京', activities: ['故宫博物院深度游', '景山公园', '南锣鼓巷胡同游'], meals: ['早餐', '午餐', '晚餐'], hotel: '北京王府半岛酒店' },
        { day: 3, city: '北京', activities: ['天坛公园', '颐和园', '圆明园遗址'], meals: ['早餐', '午餐'], hotel: '北京王府半岛酒店' },
        { day: 4, city: '西安', activities: ['高铁前往西安', '古城墙', '永兴坊美食街'], meals: ['早餐', '晚餐'], hotel: '西安索菲特传奇酒店' },
        { day: 5, city: '西安', activities: ['秦始皇兵马俑', '华清池', '《长恨歌》演出'], meals: ['早餐', '午餐', '晚餐'], hotel: '西安索菲特传奇酒店' },
        { day: 6, city: '洛阳', activities: ['高铁前往洛阳', '龙门石窟', '白马寺'], meals: ['早餐', '晚餐'], hotel: '洛阳钼都利豪国际饭店' },
        { day: 7, city: '洛阳', activities: ['老君山', '洛阳博物馆', '丽景门古街'], meals: ['早餐', '午餐', '晚餐'], hotel: '洛阳钼都利豪国际饭店' }
      ],
      includes: ['全程五星级酒店住宿', '每日早餐+部分正餐', '资深文化导游', '全程豪华商务车', '所有景点门票', '高铁二等座', '机场接送']
    },
    en: {
      title: 'Ancient Capitals Tour',
      description: 'Visit four ancient capitals, experience the profound Chinese civilization',
      itinerary: [
        { day: 1, city: 'Beijing', activities: ['Arrive in Beijing, 5-star hotel', 'Guijie night market food tour'], meals: ['Dinner'], hotel: 'The Peninsula Beijing' },
        { day: 2, city: 'Beijing', activities: ['Forbidden City in-depth tour', 'Jingshan Park', 'Nanluoguxiang hutong tour'], meals: ['Breakfast', 'Lunch', 'Dinner'], hotel: 'The Peninsula Beijing' },
        { day: 3, city: 'Beijing', activities: ['Temple of Heaven', 'Summer Palace', 'Old Summer Palace ruins'], meals: ['Breakfast', 'Lunch'], hotel: 'The Peninsula Beijing' },
        { day: 4, city: 'Xi\'an', activities: ['High-speed train to Xi\'an', 'City Wall', 'Yongxingfang food street'], meals: ['Breakfast', 'Dinner'], hotel: 'Sofitel Legend Xian' },
        { day: 5, city: 'Xi\'an', activities: ['Terracotta Warriors', 'Huaqing Palace', 'Song of Everlasting Sorrow show'], meals: ['Breakfast', 'Lunch', 'Dinner'], hotel: 'Sofitel Legend Xian' },
        { day: 6, city: 'Luoyang', activities: ['High-speed train to Luoyang', 'Longmen Grottoes', 'White Horse Temple'], meals: ['Breakfast', 'Dinner'], hotel: 'Lee Royal Hotel Mudu' },
        { day: 7, city: 'Luoyang', activities: ['Laojun Mountain', 'Luoyang Museum', 'Lijingmen ancient street'], meals: ['Breakfast', 'Lunch', 'Dinner'], hotel: 'Lee Royal Hotel Mudu' }
      ],
      includes: ['5-star hotel accommodation', 'Daily breakfast + some meals', 'Senior cultural guide', 'Luxury vehicle', 'All attraction tickets', 'High-speed train 2nd class', 'Airport transfers']
    },
    ru: {
      title: 'Тур по древним столицам',
      description: 'Посетите четыре древние столицы, познакомьтесь с глубокой китайской цивилизацией',
      itinerary: [
        { day: 1, city: 'Пекин', activities: ['Прибытие в Пекин, отель 5 звезд', 'Ночной рынок Гуйцзе'], meals: ['Ужин'], hotel: 'The Peninsula Beijing' },
        { day: 2, city: 'Пекин', activities: ['Углубленный тур по Запретному городу', 'Парк Цзиншань', 'Хутуны Наньлуогусян'], meals: ['Завтрак', 'Обед', 'Ужин'], hotel: 'The Peninsula Beijing' },
        { day: 3, city: 'Пекин', activities: ['Храм Неба', 'Летний дворец', 'Руины старого летнего дворца'], meals: ['Завтрак', 'Обед'], hotel: 'The Peninsula Beijing' },
        { day: 4, city: 'Сиань', activities: ['Скоростной поезд в Сиань', 'Городская стена', 'Улица Юнсинфан'], meals: ['Завтрак', 'Ужин'], hotel: 'Sofitel Legend Xian' },
        { day: 5, city: 'Сиань', activities: ['Терракотовая армия', 'Дворец Хуацин', 'Шоу Песнь вечной скорби'], meals: ['Завтрак', 'Обед', 'Ужин'], hotel: 'Sofitel Legend Xian' },
        { day: 6, city: 'Лоян', activities: ['Скоростной поезд в Лоян', 'Пещеры Лунмэнь', 'Храм Белой Лошади'], meals: ['Завтрак', 'Ужин'], hotel: 'Lee Royal Hotel Mudu' },
        { day: 7, city: 'Лоян', activities: ['Гора Лаоцзюнь', 'Музей Лояна', 'Древняя улица Лицзинмэнь'], meals: ['Завтрак', 'Обед', 'Ужин'], hotel: 'Lee Royal Hotel Mudu' }
      ],
      includes: ['Проживание в отелях 5 звезд', 'Завтрак + некоторые приемы пищи', 'Старший культурный гид', 'Люксовый автомобиль', 'Все билеты', 'Скоростной поезд 2 класс', 'Трансферы']
    },
    ar: {
      title: 'جولة العواصم القديمة',
      description: 'زيارة أربع عواصم قديمة، وتجربة الحضارة الصينية العميقة',
      itinerary: [
        { day: 1, city: 'بكين', activities: ['الوصول إلى بكين، فندق 5 نجوم', 'جولة طعام في سوق الليل'], meals: ['العشاء'], hotel: 'The Peninsula Beijing' },
        { day: 2, city: 'بكين', activities: ['جولة عميقة في المدينة المحرمة', 'حديقة جينغشان', 'جولة في حارات نانلوغوشيانغ'], meals: ['الإفطار', 'الغداء', 'العشاء'], hotel: 'The Peninsula Beijing' },
        { day: 3, city: 'بكين', activities: ['معبد السماء', 'القصر الصيفي', 'آثار القصر الصيفي القديم'], meals: ['الإفطار', 'الغداء'], hotel: 'The Peninsula Beijing' },
        { day: 4, city: 'شيآن', activities: ['قطار فائق السرعة إلى شيآن', 'سور المدينة', 'شارع يونغشينغفانغ للطعام'], meals: ['الإفطار', 'العشاء'], hotel: 'Sofitel Legend Xian' },
        { day: 5, city: 'شيآن', activities: ['محاربو الطين', 'قصر هوانغتشينغ', 'عرض أغنية الحزن الأبدي'], meals: ['الإفطار', 'الغداء', 'العشاء'], hotel: 'Sofitel Legend Xian' },
        { day: 6, city: 'لويانغ', activities: ['قطار فائق السرعة إلى لويانغ', 'كهوف لونغمن', 'معبد الحصان الأبيض'], meals: ['الإفطار', 'العشاء'], hotel: 'Lee Royal Hotel Mudu' },
        { day: 7, city: 'لويانغ', activities: ['جبل لاوجون', 'متحف لويانغ', 'الشارع القديم ليجينغمن'], meals: ['الإفطار', 'الغداء', 'العشاء'], hotel: 'Lee Royal Hotel Mudu' }
      ],
      includes: ['إقامة في فنادق 5 نجوم', 'الإفطار اليومي + بعض الوجبات', 'مرشد ثقافي أول', 'سيارة فاخرة', 'جميع تذاكر المعالم', 'قطار فائق السرعة درجة ثانية', 'نقل المطار']
    }
  }
};

export default function RouteDetailModal({ isOpen, onClose, route, language }: RouteDetailModalProps) {
  if (!isOpen || !route) return null;

  const detail = routeDetails[route.id]?.[language] || routeDetails[route.id]?.en;
  if (!detail) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={route.image}
              alt={detail.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white mb-2">{detail.title}</h2>
              <p className="text-white/80">{detail.description}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Price Breakdown */}
            {route.priceBreakdown && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  {language === 'zh' ? '价格明细' : language === 'en' ? 'Price Breakdown' : language === 'ru' ? 'Детализация цены' : 'تفاصيل السعر'}
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
                  <div className="space-y-2">
                    {(route.priceBreakdown[language] || route.priceBreakdown.zh).map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-slate-700 last:border-0">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.item}</span>
                        <span className="text-sm font-medium text-amber-600">¥{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-amber-500 flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {language === 'zh' ? '总价' : language === 'en' ? 'Total' : language === 'ru' ? 'Итого' : 'الإجمالي'}
                    </span>
                    <span className="text-xl font-bold text-amber-600">¥{route.price}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Includes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                {language === 'zh' ? '费用包含' : language === 'en' ? 'Price Includes' : language === 'ru' ? 'Включено' : 'السعر يشمل'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detail.includes.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                {language === 'zh' ? '详细行程' : language === 'en' ? 'Detailed Itinerary' : language === 'ru' ? 'Подробный маршрут' : 'خط السير التفصيلي'}
              </h3>
              <div className="space-y-4">
                {detail.itinerary.map((day: any, idx: number) => (
                  <div
                    key={idx}
                    className="border-l-4 border-amber-500 pl-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-r-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium">
                        {language === 'zh' ? '第' : ''}{day.day}{language === 'zh' ? '天' : language === 'en' ? 'Day' : language === 'ru' ? 'День' : 'يوم'}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        {day.city}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {day.activities.map((activity: string, actIdx: number) => (
                        <div key={actIdx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Utensils className="w-3 h-3" />
                        {day.meals.join(', ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3" />
                        {day.hotel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Icons */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <Bed className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'zh' ? '五星酒店' : language === 'en' ? '5-Star Hotel' : language === 'ru' ? '5 звезд' : 'فندق 5 نجوم'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'zh' ? '早餐包含' : language === 'en' ? 'Breakfast' : language === 'ru' ? 'Завтрак' : 'الإفطار'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'zh' ? '专业导游' : language === 'en' ? 'Guide' : language === 'ru' ? 'Гид' : 'مرشد'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <Car className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'zh' ? '用车服务' : language === 'en' ? 'Transport' : language === 'ru' ? 'Транспорт' : 'مواصلات'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">
                {language === 'zh' ? '起价' : language === 'en' ? 'From' : language === 'ru' ? 'От' : 'من'}
              </span>
              <span className="text-2xl font-bold text-amber-600 ml-2">¥{route.price}</span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors"
            >
              {language === 'zh' ? '关闭' : language === 'en' ? 'Close' : language === 'ru' ? 'Закрыть' : 'إغلاق'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
