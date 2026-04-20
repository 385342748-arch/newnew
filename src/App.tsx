import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import CitySelector from './components/CitySelector';
import ItineraryBuilder from './components/ItineraryBuilder';
import { DestinationShowcase } from './components/DestinationShowcase';
import { Footer } from './components/Footer';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import TripPlanner from './components/TripPlanner';
import RouteDetailModal from './components/RouteDetailModal';
import AboutPage from './components/AboutPage';
import { useTranslation } from './hooks/useTranslation';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import { Globe, MapPin, Calendar, Star, ChevronRight, Check, Users, Moon, Music, MessageCircle } from 'lucide-react';

type Language = 'zh' | 'en' | 'ru' | 'ar';

const popularRoutes = [
  {
    id: 'classic',
    title: { zh: '经典中国之旅', en: 'Classic China Tour', ru: 'Классический тур по Китаю', ar: 'جولة الصين الكلاسيكية' },
    cities: { zh: ['北京', '西安', '上海'], en: ['Beijing', 'Xi\'an', 'Shanghai'], ru: ['Пекин', 'Сиань', 'Шанхай'], ar: ['بكين', 'شيآن', 'شنغهاي'] },
    days: 8,
    price: 2580,
    priceBreakdown: {
      zh: [
        { item: '五星酒店住宿（7晚）', price: 1400 },
        { item: '每日早餐+部分正餐', price: 320 },
        { item: '专业中文导游服务（8天）', price: 2400 },
        { item: '全程豪华商务车', price: 200 },
        { item: '所有景点门票', price: 180 },
        { item: '高铁二等座（北京-西安-上海）', price: 180 },
        { item: '机场接送服务', price: 60 }
      ],
      en: [
        { item: '5-Star Hotel (7 nights)', price: 1400 },
        { item: 'Daily breakfast + some meals', price: 320 },
        { item: 'English Guide (8 days)', price: 4800 },
        { item: 'Luxury vehicle', price: 200 },
        { item: 'All attraction tickets', price: 180 },
        { item: 'High-speed train tickets', price: 180 },
        { item: 'Airport transfers', price: 60 }
      ],
      ru: [
        { item: 'Отель 5 звезд (7 ночей)', price: 1400 },
        { item: 'Завтрак + некоторые приемы', price: 320 },
        { item: 'Russian Guide (8 days)', price: 12000 },
        { item: 'Люксовый автомобиль', price: 200 },
        { item: 'Все билеты', price: 180 },
        { item: 'Билеты на скоростной поезд', price: 180 },
        { item: 'Трансферы', price: 60 }
      ],
      ar: [
        { item: 'فندق 5 نجوم (7 ليال)', price: 1400 },
        { item: 'الإفطار + بعض الوجبات', price: 320 },
        { item: 'Arabic Guide (8 days)', price: 12000 },
        { item: 'سيارة فاخرة', price: 200 },
        { item: 'جميع التذاكر', price: 180 },
        { item: 'تذاكر القطار', price: 180 },
        { item: 'نقل المطار', price: 60 }
      ]
    },
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600',
    highlights: { zh: ['故宫', '长城', '兵马俑', '外滩'], en: ['Forbidden City', 'Great Wall', 'Terracotta Warriors', 'The Bund'], ru: ['Запретный город', 'Великая стена', 'Терракотовая армия', 'Набережная'], ar: ['المدينة المحرمة', 'سور الصين العظيم', 'محاربو الطين', 'الواجهة البحرية'] }
  },
  {
    id: 'silkroad',
    title: { zh: '丝绸之路探索', en: 'Silk Road Discovery', ru: 'Шелковый путь', ar: 'اكتشاف طريق الحرير' },
    cities: { zh: ['西安', '兰州', '敦煌'], en: ['Xi\'an', 'Lanzhou', 'Dunhuang'], ru: ['Сиань', 'Ланьчжоу', 'Дуньхуан'], ar: ['شيآن', 'لانتشو', 'دونهوانغ'] },
    days: 6,
    price: 1980,
    priceBreakdown: {
      zh: [
        { item: '精品酒店住宿（5晚）', price: 1000 },
        { item: '每日早餐+部分正餐', price: 280 },
        { item: '专业丝路文化导游（6天）', price: 1800 },
        { item: '全程舒适用车', price: 180 },
        { item: '所有景点门票（含莫高窟特窟）', price: 160 },
        { item: '高铁及境内航班', price: 120 },
        { item: '机场接送服务', price: 40 }
      ],
      en: [
        { item: 'Boutique Hotel (5 nights)', price: 1000 },
        { item: 'Daily breakfast + some meals', price: 280 },
        { item: 'English Guide (6 days)', price: 3600 },
        { item: 'Comfortable vehicle', price: 180 },
        { item: 'All tickets (special caves)', price: 160 },
        { item: 'Train & domestic flights', price: 120 },
        { item: 'Airport transfers', price: 40 }
      ],
      ru: [
        { item: 'Бутик-отель (5 ночей)', price: 1000 },
        { item: 'Завтрак + некоторые приемы', price: 280 },
        { item: 'Russian Guide (6 days)', price: 9000 },
        { item: 'Комфортабельный автомобиль', price: 180 },
        { item: 'Все билеты (спец. пещеры)', price: 160 },
        { item: 'Поезд и внутренние рейсы', price: 120 },
        { item: 'Трансферы', price: 40 }
      ],
      ar: [
        { item: 'فندق بوتيك (5 ليال)', price: 1000 },
        { item: 'الإفطار + بعض الوجبات', price: 280 },
        { item: 'Arabic Guide (6 days)', price: 9000 },
        { item: 'سيارة مريحة', price: 180 },
        { item: 'جميع التذاكر (الكهوف الخاصة)', price: 160 },
        { item: 'قطار ورحلات داخلية', price: 120 },
        { item: 'نقل المطار', price: 40 }
      ]
    },
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=600',
    highlights: { zh: ['兵马俑', '莫高窟', '鸣沙山'], en: ['Terracotta Warriors', 'Mogao Caves', 'Singing Sand Mountain'], ru: ['Терракотовая армия', 'Пещеры Могао', 'Поющие дюны'], ar: ['محاربو الطين', 'كهوف موغاو', 'جبل الرمال المغنية'] }
  },
  {
    id: 'panda',
    title: { zh: '熊猫发现之旅', en: 'Panda Discovery', ru: 'Открытие панд', ar: 'اكتشاف الباندا' },
    cities: { zh: ['成都', '九寨沟'], en: ['Chengdu', 'Jiuzhaigou'], ru: ['Чэнду', 'Цзючжайгоу'], ar: ['تشنغدو', 'جيوزهايغو'] },
    days: 5,
    price: 1680,
    priceBreakdown: {
      zh: [
        { item: '精品酒店住宿（4晚）', price: 800 },
        { item: '每日早餐+部分正餐', price: 240 },
        { item: '专业自然生态导游（5天）', price: 1500 },
        { item: '全程舒适用车', price: 200 },
        { item: '所有景点门票（含熊猫基地VIP）', price: 180 },
        { item: '成都-九寨沟往返交通', price: 80 },
        { item: '机场接送服务', price: 20 }
      ],
      en: [
        { item: 'Boutique Hotel (4 nights)', price: 800 },
        { item: 'Daily breakfast + some meals', price: 240 },
        { item: 'English Guide (5 days)', price: 3000 },
        { item: 'Comfortable vehicle', price: 200 },
        { item: 'All tickets (Panda VIP)', price: 180 },
        { item: 'Chengdu-Jiuzhaigou transport', price: 80 },
        { item: 'Airport transfers', price: 20 }
      ],
      ru: [
        { item: 'Бутик-отель (4 ночи)', price: 800 },
        { item: 'Завтрак + некоторые приемы', price: 240 },
        { item: 'Russian Guide (5 days)', price: 7500 },
        { item: 'Комфортабельный автомобиль', price: 200 },
        { item: 'Все билеты (VIP база панд)', price: 180 },
        { item: 'Транспорт Чэнду-Цзючжайгоу', price: 80 },
        { item: 'Трансферы', price: 20 }
      ],
      ar: [
        { item: 'فندق بوتيك (4 ليال)', price: 800 },
        { item: 'الإفطار + بعض الوجبات', price: 240 },
        { item: 'Arabic Guide (5 days)', price: 7500 },
        { item: 'سيارة مريحة', price: 200 },
        { item: 'جميع التذاكر (VIP قاعدة الباندا)', price: 180 },
        { item: 'مواصلات تشنغدو-جيوزهايغو', price: 80 },
        { item: 'نقل المطار', price: 20 }
      ]
    },
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600',
    highlights: { zh: ['大熊猫基地', '九寨沟', '黄龙'], en: ['Panda Base', 'Jiuzhaigou', 'Huanglong'], ru: ['База панд', 'Цзючжайгоу', 'Хуанлун'], ar: ['محمية الباندا', 'جيوزهايغو', 'هوانغلونغ'] }
  },
  {
    id: 'ancient',
    title: { zh: '古都文化之旅', en: 'Ancient Capitals Tour', ru: 'Тур по древним столицам', ar: 'جولة العواصم القديمة' },
    cities: { zh: ['北京', '西安', '洛阳'], en: ['Beijing', 'Xi\'an', 'Luoyang'], ru: ['Пекин', 'Сиань', 'Лоян'], ar: ['بكين', 'شيآن', 'لويانغ'] },
    days: 7,
    price: 2280,
    priceBreakdown: {
      zh: [
        { item: '五星酒店住宿（6晚）', price: 1200 },
        { item: '每日早餐+部分正餐', price: 300 },
        { item: '资深文化导游（7天）', price: 2100 },
        { item: '全程豪华商务车', price: 200 },
        { item: '所有景点门票', price: 200 },
        { item: '高铁二等座', price: 160 },
        { item: '机场接送服务', price: 0 }
      ],
      en: [
        { item: '5-Star Hotel (6 nights)', price: 1200 },
        { item: 'Daily breakfast + some meals', price: 300 },
        { item: 'English Guide (7 days)', price: 4200 },
        { item: 'Luxury vehicle', price: 200 },
        { item: 'All attraction tickets', price: 200 },
        { item: 'High-speed train tickets', price: 160 },
        { item: 'Airport transfers', price: 0 }
      ],
      ru: [
        { item: 'Отель 5 звезд (6 ночей)', price: 1200 },
        { item: 'Завтрак + некоторые приемы', price: 300 },
        { item: 'Russian Guide (7 days)', price: 10500 },
        { item: 'Люксовый автомобиль', price: 200 },
        { item: 'Все билеты', price: 200 },
        { item: 'Билеты на скоростной поезд', price: 160 },
        { item: 'Трансферы', price: 0 }
      ],
      ar: [
        { item: 'فندق 5 نجوم (6 ليال)', price: 1200 },
        { item: 'الإفطار + بعض الوجبات', price: 300 },
        { item: 'Arabic Guide (7 days)', price: 10500 },
        { item: 'سيارة فاخرة', price: 200 },
        { item: 'جميع تذاكر المعالم', price: 200 },
        { item: 'تذاكر القطار', price: 160 },
        { item: 'نقل المطار', price: 0 }
      ]
    },
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600',
    highlights: { zh: ['故宫', '兵马俑', '龙门石窟'], en: ['Forbidden City', 'Terracotta Warriors', 'Longmen Grottoes'], ru: ['Запретный город', 'Терракотовая армия', 'Пещеры Лунмэнь'], ar: ['المدينة المحرمة', 'محاربو الطين', 'كهوف لونغمن'] }
  }
];

const features = [
  {
    icon: Star,
    title: { zh: '奢华体验', en: 'Luxury Experience', ru: 'Роскошный опыт', ar: 'تجربة فاخرة' },
    desc: { zh: '精选五星酒店和特色住宿', en: 'Selected 5-star hotels', ru: 'Отобранные отели 5 звезд', ar: 'فنادق 5 نجوم منتقاة' }
  },
  {
    icon: Globe,
    title: { zh: '专业导游', en: 'Expert Guides', ru: 'Экспертные гиды', ar: 'مرشدون خبراء' },
    desc: { zh: '资深导游全程陪同', en: 'Experienced guides', ru: 'Опытные гиды', ar: 'مرشدون ذوو خبرة' }
  },
  {
    icon: MapPin,
    title: { zh: '量身定制', en: 'Tailor-Made', ru: 'Индивидуально', ar: 'مصمم خصيصاً' },
    desc: { zh: '根据您的喜好定制', en: 'Customize for you', ru: 'Настройка для вас', ar: 'تخصيص لك' }
  },
  {
    icon: Calendar,
    title: { zh: 'VIP服务', en: 'VIP Service', ru: 'VIP-обслуживание', ar: 'خدمة كبار الشخصيات' },
    desc: { zh: '24小时专属客服', en: '24-hour service', ru: 'Круглосуточно', ar: 'على مدار 24 ساعة' }
  }
];

const smallGroupFeatures = [
  {
    icon: Users,
    title: { zh: '小团定制', en: 'Small Group', ru: 'Малые группы', ar: 'مجموعات صغيرة' },
    desc: { zh: '2人起即可定制专属行程', en: 'Private tours from 2 people', ru: 'Индивидуальные туры от 2 человек', ar: 'جولات خاصة من شخصين' }
  },
  {
    icon: Moon,
    title: { zh: '清真友好', en: 'Halal Friendly', ru: 'Халяль', ar: 'حلال' },
    desc: { zh: '清真餐饮+礼拜场所信息', en: 'Halal dining & prayer locations', ru: 'Халяль питание и молитвенные места', ar: 'طعام حلال وأماكن الصلاة' }
  },
  {
    icon: Music,
    title: { zh: '俄式体验', en: 'Russian Culture', ru: 'Русская культура', ar: 'الثقافة الروسية' },
    desc: { zh: '芭蕾舞+古典音乐+伏特加品鉴', en: 'Ballet & classical music tours', ru: 'Балет и классическая музыка', ar: 'جولات الباليه والموسيقى الكلاسيكية' }
  },
  {
    icon: MessageCircle,
    title: { zh: '多语服务', en: 'Multilingual', ru: 'Мультиязычный', ar: 'متعدد اللغات' },
    desc: { zh: '中英俄阿四语全程支持', en: 'EN/ZH/RU/AR support', ru: 'Поддержка на 4 языках', ar: 'دعم بأربع لغات' }
  }
];


function HomePage({ language, onSelectCities }: { language: Language; onSelectCities: (cities: any[]) => void }) {
  const { t } = useTranslation();
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [showRouteModal, setShowRouteModal] = useState(false);

  const getText = (obj: Record<Language, string>) => obj[language] || obj.en;

  const toggleCity = (cityId: string) => {
    if (selectedCities.includes(cityId)) {
      setSelectedCities(selectedCities.filter(id => id !== cityId));
    } else {
      setSelectedCities([...selectedCities, cityId]);
    }
  };

  const openRouteDetail = (route: any) => {
    setSelectedRoute(route);
    setShowRouteModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero language={language} />

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('whyChooseUs')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'zh' && '我们致力于为您提供最优质的中国旅游体验'}
            {language === 'en' && 'We are committed to providing you with the best China travel experience'}
            {language === 'ru' && 'Мы стремимся предоставить вам лучший опыт путешествия по Китаю'}
            {language === 'ar' && 'نحن ملتزمون بتزويدك بأفضل تجربة سفر في الصين'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{getText(feature.title)}</h3>
              <p className="text-gray-600 text-sm">{getText(feature.desc)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('popularRoutes')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'zh' && '精选最受欢迎的中国旅游线路'}
              {language === 'en' && 'Selected most popular China travel routes'}
              {language === 'ru' && 'Подборка самых популярных маршрутов по Китаю'}
              {language === 'ar' && 'اختيار طرق السفر الأكثر شيوعاً في الصين'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image}
                    alt={getText(route.title)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{getText(route.title)}</h3>
                    <p className="text-sm opacity-90">{route.days} {t('days')}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{(route.cities[language] || route.cities.zh).join(' → ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span>{(route.highlights[language] || route.highlights.zh).slice(0, 2).join(' · ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">{t('from')}</span>
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-amber-600"> ¥{route.price}</span>
                        <span className="text-sm text-gray-500">${Math.round(route.price / 7.2)} USD</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openRouteDetail(route)}
                      className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm font-medium hover:bg-amber-700 transition-colors"
                    >
                      {t('viewDetails')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'zh' && '专属服务'}
              {language === 'en' && 'Exclusive Services'}
              {language === 'ru' && 'Эксклюзивные услуги'}
              {language === 'ar' && 'خدمات حصرية'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'zh' && '为中东和俄罗斯客户量身定制的贴心服务'}
              {language === 'en' && 'Tailored services for Middle Eastern and Russian guests'}
              {language === 'ru' && 'Услуги, адаптированные для гостей из России и Ближнего Востока'}
              {language === 'ar' && 'خدمات مخصصة للضيوف من الشرق الأوسط وروسيا'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {smallGroupFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{getText(feature.title)}</h3>
                <p className="text-gray-600 text-sm">{getText(feature.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DestinationShowcase
        selectedCities={selectedCities}
        onToggleCity={toggleCity}
        language={language}
      />

      {selectedCities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold shadow-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
          >
            <span>{t('buildItinerary')} ({selectedCities.length})</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}

      <RouteDetailModal
        isOpen={showRouteModal}
        onClose={() => setShowRouteModal(false)}
        route={selectedRoute}
        language={language}
      />
    </motion.div>
  );
}

function CustomizePage({ language }: { language: Language }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TripPlanner language={language} />
    </motion.div>
  );
}

function App() {
  const { language, setLanguage } = useTranslation();
  const theme = useTheme();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [selectedCities, setSelectedCities] = useState<any[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <HashRouter>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
        <Header
          currentLang={language}
          onLangChange={(lang) => setLanguage(lang as Language)}
          theme={theme as 'light' | 'dark'}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onAuthClick={() => setShowAuthModal(true)}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage language={language} onSelectCities={setSelectedCities} />}
          />
          <Route path="/customize" element={<CustomizePage language={language} />} />
          <Route path="/destinations" element={<HomePage language={language} onSelectCities={setSelectedCities} />} />
          <Route path="/about" element={<AboutPage language={language} />} />
          <Route path="/dashboard" element={isAuthenticated ? (isAdmin ? <AdminDashboard language={language} /> : <UserDashboard language={language} />) : <HomePage language={language} onSelectCities={setSelectedCities} />} />
        </Routes>
        <Footer />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} language={language} />
      </div>
    </HashRouter>
  );
}

export default App;
