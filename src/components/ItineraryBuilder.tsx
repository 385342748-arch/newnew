import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Hotel, Car, Plane, Train, Trash2, GripVertical, Plus, Users, Wine, Music, Building2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface City {
  id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  nameAr: string;
  days: number;
  minDays: number;
  maxDays: number;
  basePrice: number;
  highlights: string[];
  highlightsEn: string[];
  highlightsRu: string[];
  highlightsAr: string[];
  image: string;
  halalFriendly?: boolean;
  mosqueNearby?: string;
  mosqueNearbyEn?: string;
  mosqueNearbyRu?: string;
  mosqueNearbyAr?: string;
}

const AVAILABLE_CITIES: City[] = [
  {
    id: 'beijing',
    name: '北京',
    nameEn: 'Beijing',
    nameRu: 'Пекин',
    nameAr: 'بكين',
    days: 3,
    minDays: 2,
    maxDays: 5,
    basePrice: 2880,
    highlights: ['故宫', '长城', '天坛', '颐和园'],
    highlightsEn: ['Forbidden City', 'Great Wall', 'Temple of Heaven', 'Summer Palace'],
    highlightsRu: ['Запретный город', 'Великая стена', 'Храм Неба', 'Летний дворец'],
    highlightsAr: ['المدينة المحرمة', 'سور الصين العظيم', 'معبد السماء', 'القصر الصيفي'],
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400',
    halalFriendly: true,
    mosqueNearby: '牛街清真寺',
    mosqueNearbyEn: 'Niujie Mosque',
    mosqueNearbyRu: 'Мечеть Нюцзе',
    mosqueNearbyAr: 'مسجد نيوجي'
  },
  {
    id: 'shanghai',
    name: '上海',
    nameEn: 'Shanghai',
    nameRu: 'Шанхай',
    nameAr: 'شنغهاي',
    days: 3,
    minDays: 2,
    maxDays: 4,
    basePrice: 3280,
    highlights: ['外滩', '东方明珠', '豫园', '南京路'],
    highlightsEn: ['The Bund', 'Oriental Pearl', 'Yu Garden', 'Nanjing Road'],
    highlightsRu: ['Набережная', 'Восточная жемчужина', 'Сад Юй', 'Нанкинская дорога'],
    highlightsAr: ['الواجهة البحرية', 'اللؤلؤة الشرقية', 'حديقة يو', 'طريق نانجينغ'],
    image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=400',
    halalFriendly: true,
    mosqueNearby: '小桃园清真寺',
    mosqueNearbyEn: 'Xiaotaoyuan Mosque',
    mosqueNearbyRu: 'Мечеть Сяотаоюань',
    mosqueNearbyAr: 'مسجد شياوتاويوان'
  },
  {
    id: 'xian',
    name: '西安',
    nameEn: 'Xi\'an',
    nameRu: 'Сиань',
    nameAr: 'شيآن',
    days: 2,
    minDays: 2,
    maxDays: 4,
    basePrice: 2180,
    highlights: ['兵马俑', '大雁塔', '古城墙', '回民街'],
    highlightsEn: ['Terracotta Warriors', 'Big Wild Goose Pagoda', 'City Wall', 'Muslim Quarter'],
    highlightsRu: ['Терракотовая армия', 'Пагода Большого гуся', 'Городская стена', 'Мусульманский квартал'],
    highlightsAr: ['محاربو الطين', 'باجودا الإوزة الكبيرة', 'سور المدينة', 'الحي الإسلامي'],
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400',
    halalFriendly: true,
    mosqueNearby: '化觉巷清真大寺',
    mosqueNearbyEn: 'Huajue Lane Mosque',
    mosqueNearbyRu: 'Мечеть Хуацзюэ',
    mosqueNearbyAr: 'مسجد هواجويه'
  },
  {
    id: 'chengdu',
    name: '成都',
    nameEn: 'Chengdu',
    nameRu: 'Чэнду',
    nameAr: 'تشنغدو',
    days: 3,
    minDays: 2,
    maxDays: 5,
    basePrice: 2580,
    highlights: ['大熊猫基地', '宽窄巷子', '锦里', '都江堰'],
    highlightsEn: ['Panda Base', 'Wide & Narrow Alleys', 'Jinli Street', 'Dujiangyan'],
    highlightsRu: ['База панд', 'Узкие и широкие переулки', 'Улица Цзиньли', 'Дуцзянъянь'],
    highlightsAr: ['محمية الباندا', 'الأزقة العريضة والضيقة', 'شارع جينلي', 'دوجيانغيان'],
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400'
  },
  {
    id: 'luoyang',
    name: '洛阳',
    nameEn: 'Luoyang',
    nameRu: 'Лоян',
    nameAr: 'لويانغ',
    days: 2,
    minDays: 1,
    maxDays: 3,
    basePrice: 1880,
    highlights: ['龙门石窟', '白马寺', '老君山', '牡丹园'],
    highlightsEn: ['Longmen Grottoes', 'White Horse Temple', 'Laojun Mountain', 'Peony Garden'],
    highlightsRu: ['Пещеры Лунмэнь', 'Храм Белой лошади', 'Гора Лаоцзюнь', 'Сад пионов'],
    highlightsAr: ['كهوف لونغمن', 'معبد الحصان الأبيض', 'جبل لاوجون', 'حديقة الفاوانيا'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400'
  },
  {
    id: 'guilin',
    name: '桂林',
    nameEn: 'Guilin',
    nameRu: 'Гуйлинь',
    nameAr: 'جويلين',
    days: 3,
    minDays: 2,
    maxDays: 4,
    basePrice: 2380,
    highlights: ['漓江', '阳朔', '象鼻山', '龙脊梯田'],
    highlightsEn: ['Li River', 'Yangshuo', 'Elephant Trunk Hill', 'Longji Rice Terraces'],
    highlightsRu: ['Река Ли', 'Яншо', 'Холм Слоновий хобот', 'Террасы Лунцзи'],
    highlightsAr: ['نهر لي', 'يانغشو', 'جبل خرطوم الفيل', 'مزارع لونغجي'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400'
  }
];

const russianPreferences = [
  { icon: Building2, label: 'История', labelEn: 'History', labelZh: '历史文化' },
  { icon: Wine, label: 'Водка', labelEn: 'Vodka', labelZh: '伏特加体验' },
  { icon: Music, label: 'Балет', labelEn: 'Ballet', labelZh: '芭蕾舞' }
];

export default function ItineraryBuilder() {
  const { t, language } = useTranslation();
  const [selectedCities, setSelectedCities] = useState<string[]>(['beijing', 'xian']);
  const [cityDays, setCityDays] = useState<Record<string, number>>({ beijing: 3, xian: 2 });
  const [groupSize, setGroupSize] = useState(2);
  const [showInquiry, setShowInquiry] = useState(false);

  const getCityName = (city: City) => {
    switch (language) {
      case 'ru': return city.nameRu;
      case 'ar': return city.nameAr;
      case 'en': return city.nameEn;
      default: return city.name;
    }
  };

  const getHighlights = (city: City) => {
    switch (language) {
      case 'ru': return city.highlightsRu || city.highlights;
      case 'ar': return city.highlightsAr || city.highlights;
      case 'en': return city.highlightsEn || city.highlights;
      default: return city.highlights;
    }
  };

  const getMosqueName = (city: City) => {
    switch (language) {
      case 'ru': return city.mosqueNearbyRu || city.mosqueNearby;
      case 'ar': return city.mosqueNearbyAr || city.mosqueNearby;
      case 'en': return city.mosqueNearbyEn || city.mosqueNearby;
      default: return city.mosqueNearby;
    }
  };

  const toggleCity = (cityId: string) => {
    if (selectedCities.includes(cityId)) {
      setSelectedCities(selectedCities.filter(id => id !== cityId));
      const newDays = { ...cityDays };
      delete newDays[cityId];
      setCityDays(newDays);
    } else {
      setSelectedCities([...selectedCities, cityId]);
      const city = AVAILABLE_CITIES.find(c => c.id === cityId);
      if (city) setCityDays({ ...cityDays, [cityId]: city.days });
    }
  };

  const updateDays = (cityId: string, days: number) => {
    const city = AVAILABLE_CITIES.find(c => c.id === cityId);
    if (city) {
      const newDays = Math.max(city.minDays, Math.min(city.maxDays, days));
      setCityDays({ ...cityDays, [cityId]: newDays });
    }
  };

  const moveCity = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newCities = [...selectedCities];
      [newCities[index], newCities[index - 1]] = [newCities[index - 1], newCities[index]];
      setSelectedCities(newCities);
    } else if (direction === 'down' && index < selectedCities.length - 1) {
      const newCities = [...selectedCities];
      [newCities[index], newCities[index + 1]] = [newCities[index + 1], newCities[index]];
      setSelectedCities(newCities);
    }
  };

  const totalDays = useMemo(() => {
    return selectedCities.reduce((sum, cityId) => sum + (cityDays[cityId] || 0), 0);
  }, [selectedCities, cityDays]);

  const baseTotalPrice = useMemo(() => {
    return selectedCities.reduce((sum, cityId) => {
      const city = AVAILABLE_CITIES.find(c => c.id === cityId);
      return sum + (city ? city.basePrice * (cityDays[cityId] || city.days) : 0);
    }, 0);
  }, [selectedCities, cityDays]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">{t('customizeYourTrip')}</h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">{t('selectCitiesAndDays')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                {language === 'zh' ? '团队规模' : language === 'ru' ? 'Размер группы' : 'Group Size'}
              </h2>
              <div className="flex items-center gap-4">
                <button onClick={() => setGroupSize(Math.max(2, groupSize - 1))} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">-</button>
                <span className="text-2xl font-bold text-slate-800 dark:text-white">{groupSize}</span>
                <button onClick={() => setGroupSize(groupSize + 1)} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">+</button>
                <span className="text-slate-500">{language === 'zh' ? '人起' : language === 'ru' ? 'чел.' : 'people'}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                {t('selectCities')}
              </h2>
              <div className="space-y-3">
                {AVAILABLE_CITIES.map((city) => (
                  <motion.div
                    key={city.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleCity(city.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedCities.includes(city.id)
                        ? 'bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-500'
                        : 'bg-slate-50 dark:bg-slate-700 border-2 border-transparent hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img src={city.image} alt={getCityName(city)} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 dark:text-white">{getCityName(city)}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{getHighlights(city).slice(0, 2).join(' · ')}</p>
                        {city.halalFriendly && (
                          <span className="text-xs text-green-600 dark:text-green-400">{language === 'zh' ? '清真友好' : language === 'ru' ? 'Халяль' : 'Halal'}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                {t('tripSummary')}
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">{t('totalDays')}</span>
                  <span className="text-2xl font-bold text-amber-500">{totalDays} {t('days')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">{t('cities')}</span>
                  <span className="text-xl font-semibold text-slate-800 dark:text-white">{selectedCities.length}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-300">{language === 'zh' ? '基础价格' : language === 'ru' ? 'Базовая цена' : 'Base Price'}</span>
                  <span className="text-2xl font-bold text-emerald-500">¥{baseTotalPrice.toLocaleString()}{language === 'zh' ? '起' : language === 'ru' ? 'от' : 'from'}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowInquiry(true)}
                  className="w-full py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
                >
                  {language === 'zh' ? '获取报价' : language === 'ru' ? 'Получить расчет' : 'Get Quote'}
                </motion.button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {language === 'ru' && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Для наших гостей из России</h3>
                <div className="flex flex-wrap gap-3">
                  {russianPreferences.map((pref, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                      <pref.icon className="w-4 h-4" />
                      <span>{pref.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCities.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">{t('adjustDaysAndOrder')}</h2>
                <div className="space-y-3">
                  {selectedCities.map((cityId, index) => {
                    const city = AVAILABLE_CITIES.find(c => c.id === cityId);
                    if (!city) return null;
                    return (
                      <motion.div key={cityId} layout className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <div className="flex flex-col gap-1">
                          <button onClick={() => moveCity(index, 'up')} disabled={index === 0} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded disabled:opacity-30">
                            <GripVertical className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                        <img src={city.image} alt={getCityName(city)} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 dark:text-white">{getCityName(city)}</h3>
                        {city.mosqueNearby && (
                          <p className="text-xs text-green-600 dark:text-green-400">{language === 'zh' ? '附近清真寺' : language === 'ru' ? 'Мечеть' : language === 'ar' ? 'مسجد' : 'Mosque'}: {getMosqueName(city)}</p>
                        )}
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateDays(cityId, (cityDays[cityId] || city.days) - 1)} className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center hover:bg-slate-300">-</button>
                          <span className="w-8 text-center font-semibold">{cityDays[cityId] || city.days}</span>
                          <button onClick={() => updateDays(cityId, (cityDays[cityId] || city.days) + 1)} className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center hover:bg-slate-300">+</button>
                          <span className="text-sm text-slate-500">{t('days')}</span>
                        </div>
                        <button onClick={() => toggleCity(cityId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showInquiry && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{language === 'zh' ? '获取专属报价' : language === 'ru' ? 'Получить персональный расчет' : 'Get Custom Quote'}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{language === 'zh' ? '我们的旅行顾问将在24小时内与您联系' : language === 'ru' ? 'Наш консультант свяжется с вами в течение 24 часов' : 'Our travel consultant will contact you within 24 hours'}</p>
              <div className="space-y-4">
                <input type="text" placeholder={language === 'zh' ? '您的姓名' : language === 'ru' ? 'Ваше имя' : 'Your Name'} className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
                <input type="email" placeholder={language === 'zh' ? '您的邮箱' : language === 'ru' ? 'Email' : 'Email'} className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
                <input type="tel" placeholder={language === 'zh' ? '您的电话' : language === 'ru' ? 'Телефон' : 'Phone'} className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowInquiry(false)} className="flex-1 py-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">{language === 'zh' ? '取消' : language === 'ru' ? 'Отмена' : 'Cancel'}</button>
                <button onClick={() => setShowInquiry(false)} className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700">{language === 'zh' ? '提交' : language === 'ru' ? 'Отправить' : 'Submit'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
