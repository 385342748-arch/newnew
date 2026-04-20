import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Users, Globe, Heart, Car, Ticket, Utensils, Bed, User, ChevronRight, ChevronLeft, Sparkles, Check, Building2, Home, Plus, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';

interface TripPlannerProps {
  language: 'zh' | 'en' | 'ru' | 'ar';
}

const AVAILABLE_CITIES = [
  { id: 'beijing', name: { zh: '北京', en: 'Beijing', ru: 'Пекин', ar: 'بكين' }, image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400', minDays: 2, maxDays: 5, basePrice: 2880 },
  { id: 'shanghai', name: { zh: '上海', en: 'Shanghai', ru: 'Шанхай', ar: 'شنغهاي' }, image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=400', minDays: 2, maxDays: 4, basePrice: 3280 },
  { id: 'xian', name: { zh: '西安', en: 'Xi\'an', ru: 'Сиань', ar: 'شيآن' }, image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400', minDays: 2, maxDays: 4, basePrice: 2180 },
  { id: 'chengdu', name: { zh: '成都', en: 'Chengdu', ru: 'Чэнду', ar: 'تشنغدو' }, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400', minDays: 2, maxDays: 5, basePrice: 2580 },
  { id: 'luoyang', name: { zh: '洛阳', en: 'Luoyang', ru: 'Лоян', ar: 'لويانغ' }, image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400', minDays: 1, maxDays: 3, basePrice: 1880 },
  { id: 'guilin', name: { zh: '桂林', en: 'Guilin', ru: 'Гуйлинь', ar: 'جويلين' }, image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=400', minDays: 2, maxDays: 4, basePrice: 2380 },
  { id: 'hangzhou', name: { zh: '杭州', en: 'Hangzhou', ru: 'Ханчжоу', ar: 'هانغتشو' }, image: 'https://images.unsplash.com/photo-1565378435245-2528d587e524?w=400', minDays: 2, maxDays: 4, basePrice: 2680 },
  { id: 'suzhou', name: { zh: '苏州', en: 'Suzhou', ru: 'Сучжоу', ar: 'سوتشو' }, image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400', minDays: 1, maxDays: 3, basePrice: 1980 },
  { id: 'zhangjiajie', name: { zh: '张家界', en: 'Zhangjiajie', ru: 'Чжанцзяцзе', ar: 'تشانغجياجي' }, image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400', minDays: 2, maxDays: 4, basePrice: 2280 },
  { id: 'lijiang', name: { zh: '丽江', en: 'Lijiang', ru: 'Лицзян', ar: 'ليجيانغ' }, image: 'https://images.unsplash.com/photo-1527684651001-731c474bbb5a?w=400', minDays: 2, maxDays: 4, basePrice: 2480 },
  { id: 'huangshan', name: { zh: '黄山', en: 'Huangshan', ru: 'Хуаншань', ar: 'هوانغشان' }, image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=400', minDays: 2, maxDays: 3, basePrice: 2080 },
  { id: 'dali', name: { zh: '大理', en: 'Dali', ru: 'Дали', ar: 'دالي' }, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', minDays: 2, maxDays: 4, basePrice: 2380 },
];

const NATIONALITIES = [
  { code: 'ru', name: { zh: '俄罗斯', en: 'Russia', ru: 'Россия', ar: 'روسيا' } },
  { code: 'sa', name: { zh: '沙特阿拉伯', en: 'Saudi Arabia', ru: 'Саудовская Аравия', ar: 'السعودية' } },
  { code: 'ae', name: { zh: '阿联酋', en: 'UAE', ru: 'ОАЭ', ar: 'الإمارات' } },
  { code: 'us', name: { zh: '美国', en: 'USA', ru: 'США', ar: 'أمريكا' } },
  { code: 'uk', name: { zh: '英国', en: 'UK', ru: 'Великобритания', ar: 'بريطانيا' } },
  { code: 'de', name: { zh: '德国', en: 'Germany', ru: 'Германия', ar: 'ألمانيا' } },
  { code: 'fr', name: { zh: '法国', en: 'France', ru: 'Франция', ar: 'فرنسا' } },
  { code: 'jp', name: { zh: '日本', en: 'Japan', ru: 'Япония', ar: 'اليابان' } },
  { code: 'kr', name: { zh: '韩国', en: 'Korea', ru: 'Корея', ar: 'كوريا' } },
  { code: 'other', name: { zh: '其他', en: 'Other', ru: 'Другое', ar: 'أخرى' } },
];

const PREFERENCES = [
  { id: 'culture', icon: Building2, name: { zh: '历史文化', en: 'Culture & History', ru: 'Культура и история', ar: 'الثقافة والتاريخ' } },
  { id: 'food', icon: Utensils, name: { zh: '美食体验', en: 'Food & Dining', ru: 'Еда и рестораны', ar: 'الطعام والمطاعم' } },
  { id: 'nature', icon: Heart, name: { zh: '自然风光', en: 'Nature & Scenery', ru: 'Природа и пейзажи', ar: 'الطبيعة والمناظر' } },
  { id: 'shopping', icon: Car, name: { zh: '购物休闲', en: 'Shopping', ru: 'Шоппинг', ar: 'التسوق' } },
  { id: 'adventure', icon: MapPin, name: { zh: '探险体验', en: 'Adventure', ru: 'Приключения', ar: 'المغامرة' } },
  { id: 'relax', icon: Bed, name: { zh: '休闲度假', en: 'Relaxation', ru: 'Отдых', ar: 'الاسترخاء' } },
];

export default function TripPlanner({ language }: TripPlannerProps) {
  const [step, setStep] = useState(1);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [cityDays, setCityDays] = useState<Record<string, number>>({});
  const [travelDate, setTravelDate] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [nationality, setNationality] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [showAIQuote, setShowAIQuote] = useState(false);
  const [aiQuote, setAiQuote] = useState<any>(null);
  const [customCityName, setCustomCityName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCities, setCustomCities] = useState<Array<{id: string, name: string, days: number}>>([]);

  const { t } = useTranslation();
  const { user, createItinerary } = useAuth();

  const totalDays = useMemo(() => {
    const presetDays = selectedCities
      .filter(id => !id.startsWith('custom-'))
      .reduce((sum, cityId) => sum + (cityDays[cityId] || 3), 0);
    const customDays = customCities
      .filter(c => selectedCities.includes(c.id))
      .reduce((sum, c) => sum + (cityDays[c.id] || c.days), 0);
    return presetDays + customDays;
  }, [selectedCities, cityDays, customCities]);

  const basePrice = useMemo(() => {
    const cityPrice = selectedCities.reduce((sum, cityId) => {
      if (cityId.startsWith('custom-')) {
        return sum + 2000 * (cityDays[cityId] || 3);
      }
      const city = AVAILABLE_CITIES.find(c => c.id === cityId);
      return sum + (city ? city.basePrice * (cityDays[cityId] || 3) : 0);
    }, 0);
    const guidePrice = totalDays * 1500;
    return cityPrice + guidePrice;
  }, [selectedCities, cityDays, totalDays]);

  const toggleCity = (cityId: string) => {
    if (selectedCities.includes(cityId)) {
      setSelectedCities(selectedCities.filter(id => id !== cityId));
      const newDays = { ...cityDays };
      delete newDays[cityId];
      setCityDays(newDays);
    } else {
      setSelectedCities([...selectedCities, cityId]);
      const city = AVAILABLE_CITIES.find(c => c.id === cityId);
      if (city) {
        setCityDays({ ...cityDays, [cityId]: city.minDays + 1 });
      }
    }
  };

  const addCustomCity = () => {
    if (customCityName.trim()) {
      const customId = `custom-${Date.now()}`;
      const newCustomCity = { id: customId, name: customCityName.trim(), days: 3 };
      setCustomCities([...customCities, newCustomCity]);
      setSelectedCities([...selectedCities, customId]);
      setCityDays({ ...cityDays, [customId]: 3 });
      setCustomCityName('');
      setShowCustomInput(false);
    }
  };

  const removeCustomCity = (cityId: string) => {
    setCustomCities(customCities.filter(c => c.id !== cityId));
    setSelectedCities(selectedCities.filter(id => id !== cityId));
    const newDays = { ...cityDays };
    delete newDays[cityId];
    setCityDays(newDays);
  };

  const updateDays = (cityId: string, days: number) => {
    const city = AVAILABLE_CITIES.find(c => c.id === cityId);
    if (city) {
      const newDays = Math.max(city.minDays, Math.min(city.maxDays, days));
      setCityDays({ ...cityDays, [cityId]: newDays });
    } else {
      setCityDays({ ...cityDays, [cityId]: Math.max(1, Math.min(10, days)) });
    }
  };

  const togglePreference = (prefId: string) => {
    if (preferences.includes(prefId)) {
      setPreferences(preferences.filter(id => id !== prefId));
    } else {
      setPreferences([...preferences, prefId]);
    }
  };

  const generateAIQuote = () => {
    const hotelPrice = Math.round(basePrice * 0.45);
    const guidePrice = totalDays * 1500;
    const transportPrice = Math.round(basePrice * 0.25);
    const ticketsPrice = Math.round(basePrice * 0.15);

    const quote = {
      basePrice: basePrice,
      aiAdjustedPrice: Math.round(basePrice * (0.9 + Math.random() * 0.3)),
      breakdown: {
        hotel: { price: hotelPrice, label: language === 'zh' ? '五星级酒店住宿' : language === 'en' ? '5-Star Hotel' : language === 'ru' ? 'Отель 5 звезд' : 'فندق 5 نجوم' },
        transport: { price: transportPrice, label: language === 'zh' ? '全程用车服务' : language === 'en' ? 'Transportation' : language === 'ru' ? 'Транспорт' : 'مواصلات' },
        guide: { price: guidePrice, label: language === 'zh' ? `专业小语种导游（${totalDays}天）` : language === 'en' ? `Multilingual Guide (${totalDays} days)` : language === 'ru' ? `Гид (${totalDays} дней)` : `مرشد (${totalDays} يوم)` },
        tickets: { price: ticketsPrice, label: language === 'zh' ? '景点门票' : language === 'en' ? 'Attraction Tickets' : language === 'ru' ? 'Билеты' : 'تذاكر المعالم' },
      },
      notes: language === 'zh'
        ? `根据您选择的${selectedCities.length}个城市，${totalDays}天的行程，我们为您推荐了最优路线。${nationality === 'ru' ? '特别为俄罗斯客人安排了伏特加品鉴体验。' : nationality === 'sa' || nationality === 'ae' ? '全程安排清真餐饮和附近清真寺信息。' : ''}`
        : language === 'en'
        ? `Based on your selection of ${selectedCities.length} cities for ${totalDays} days, we recommend the optimal route.`
        : language === 'ru'
        ? `На основе вашего выбора ${selectedCities.length} городов на ${totalDays} дней, мы рекомендуем оптимальный маршрут.`
        : `بناءً على اختيارك لـ ${selectedCities.length} مدن لمدة ${totalDays} يومًا، نوصي بالمسار الأمثل.`
    };
    setAiQuote(quote);
    setShowAIQuote(true);
  };

  const saveItinerary = () => {
    if (user) {
      createItinerary({
        cities: selectedCities,
        days: cityDays,
        groupSize,
        travelDate,
        basePrice,
        specialRequests: `Nationality: ${nationality}, Preferences: ${preferences.join(', ')}`
      });
      alert(language === 'zh' ? '行程已保存到您的账户' : language === 'en' ? 'Itinerary saved to your account' : language === 'ru' ? 'Маршрут сохранен в вашем аккаунте' : 'تم حفظ خط السير في حسابك');
    }
  };

  const getCityName = (city: any) => city.name[language] || city.name.en;
  const getPrefName = (pref: any) => pref.name[language] || pref.name.en;
  const getNatName = (nat: any) => nat.name[language] || nat.name.en;

  const steps = [
    { id: 1, title: { zh: '选择城市', en: 'Select Cities', ru: 'Выбор городов', ar: 'اختيار المدن' } },
    { id: 2, title: { zh: '行程详情', en: 'Trip Details', ru: 'Детали поездки', ar: 'تفاصيل الرحلة' } },
    { id: 3, title: { zh: '个人信息', en: 'Your Info', ru: 'Ваша информация', ar: 'معلوماتك' } },
    { id: 4, title: { zh: 'AI报价', en: 'AI Quote', ru: 'AI расчет', ar: 'عرض AI' } },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s.id ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${step > s.id ? 'bg-amber-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Cities */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {language === 'zh' ? '选择您想游览的城市' : language === 'en' ? 'Select cities you want to visit' : language === 'ru' ? 'Выберите города для посещения' : 'اختر المدن التي تريد زيارتها'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {AVAILABLE_CITIES.map((city) => (
                <motion.div
                  key={city.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleCity(city.id)}
                  className={`cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all ${
                    selectedCities.includes(city.id) ? 'ring-4 ring-amber-500' : ''
                  }`}
                >
                  <div className="relative h-40">
                    <img src={city.image} alt={getCityName(city)} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{getCityName(city)}</h3>
                      <p className="text-sm opacity-80">{city.minDays}-{city.maxDays} {language === 'zh' ? '天' : language === 'en' ? 'days' : language === 'ru' ? 'дней' : 'أيام'}</p>
                    </div>
                    {selectedCities.includes(city.id) && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Custom City Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCustomInput(true)}
                className="cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all border-2 border-dashed border-amber-400 bg-amber-50 dark:bg-amber-900/20"
              >
                <div className="relative h-40 flex flex-col items-center justify-center">
                  <Plus className="w-12 h-12 text-amber-500 mb-2" />
                  <h3 className="text-xl font-bold text-amber-700 dark:text-amber-300">
                    {language === 'zh' ? '添加自定义目的地' : language === 'en' ? 'Add Custom Destination' : language === 'ru' ? 'Добавить свой маршрут' : 'إضافة وجهة مخصصة'}
                  </h3>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                    {language === 'zh' ? '填写您想去的地方' : language === 'en' ? 'Enter your desired destination' : language === 'ru' ? 'Введите желаемое место' : 'أدخل وجهتك المطلوبة'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Custom City Input Modal */}
            <AnimatePresence>
              {showCustomInput && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  onClick={() => setShowCustomInput(false)}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {language === 'zh' ? '添加自定义目的地' : language === 'en' ? 'Add Custom Destination' : language === 'ru' ? 'Добавить свой маршрут' : 'إضافة وجهة مخصصة'}
                    </h3>
                    <input
                      type="text"
                      value={customCityName}
                      onChange={(e) => setCustomCityName(e.target.value)}
                      placeholder={language === 'zh' ? '请输入城市名称' : language === 'en' ? 'Enter city name' : language === 'ru' ? 'Введите название города' : 'أدخل اسم المدينة'}
                      className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 mb-4"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowCustomInput(false)}
                        className="flex-1 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                      >
                        {language === 'zh' ? '取消' : language === 'en' ? 'Cancel' : language === 'ru' ? 'Отмена' : 'إلغاء'}
                      </button>
                      <button
                        onClick={addCustomCity}
                        disabled={!customCityName.trim()}
                        className="flex-1 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {language === 'zh' ? '添加' : language === 'en' ? 'Add' : language === 'ru' ? 'Добавить' : 'إضافة'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selected Custom Cities */}
            {customCities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {language === 'zh' ? '自定义目的地' : language === 'en' ? 'Custom Destinations' : language === 'ru' ? 'Свои маршруты' : 'وجهات مخصصة'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {customCities.map((city) => (
                    <div
                      key={city.id}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${
                        selectedCities.includes(city.id)
                          ? 'bg-amber-100 border-amber-500 text-amber-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{city.name}</span>
                      <button
                        onClick={() => removeCustomCity(city.id)}
                        className="w-5 h-5 rounded-full bg-gray-300 hover:bg-red-400 flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCities.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors flex items-center gap-2"
                >
                  {language === 'zh' ? '下一步' : language === 'en' ? 'Next' : language === 'ru' ? 'Далее' : 'التالي'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Trip Details */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {language === 'zh' ? '调整行程天数' : language === 'en' ? 'Adjust trip duration' : language === 'ru' ? 'Настройка продолжительности' : 'تعديل مدة الرحلة'}
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">
              {selectedCities.map((cityId) => {
                const city = AVAILABLE_CITIES.find(c => c.id === cityId);
                const customCity = customCities.find(c => c.id === cityId);
                const cityName = city ? getCityName(city) : (customCity?.name || cityId);
                const cityImage = city?.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400';
                const minDays = city?.minDays || 1;
                const maxDays = city?.maxDays || 10;

                return (
                  <div key={cityId} className="flex items-center gap-4 p-4 border-b dark:border-slate-700 last:border-0">
                    <img src={cityImage} alt={cityName} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{cityName}</h3>
                      <p className="text-sm text-gray-500">{minDays}-{maxDays} {language === 'zh' ? '天建议' : language === 'en' ? 'days recommended' : language === 'ru' ? 'дней рекомендуется' : 'أيام موصى بها'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateDays(cityId, (cityDays[cityId] || minDays) - 1)}
                        className="w-8 h-8 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{cityDays[cityId] || minDays}</span>
                      <button
                        onClick={() => updateDays(cityId, (cityDays[cityId] || minDays) + 1)}
                        className="w-8 h-8 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {language === 'zh' ? '出发日期' : language === 'en' ? 'Travel Date' : language === 'ru' ? 'Дата поездки' : 'تاريخ السفر'}
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={e => setTravelDate(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    {language === 'zh' ? '出行人数' : language === 'en' ? 'Group Size' : language === 'ru' ? 'Размер группы' : 'حجم المجموعة'}
                  </label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGroupSize(Math.max(1, groupSize - 1))} className="w-10 h-10 bg-gray-200 dark:bg-slate-600 rounded-full">-</button>
                    <span className="text-xl font-bold w-8 text-center">{groupSize}</span>
                    <button onClick={() => setGroupSize(groupSize + 1)} className="w-10 h-10 bg-gray-200 dark:bg-slate-600 rounded-full">+</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-8 py-3 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                {language === 'zh' ? '上一步' : language === 'en' ? 'Back' : language === 'ru' ? 'Назад' : 'رجوع'}
              </button>
              <button onClick={() => setStep(3)} className="px-8 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 flex items-center gap-2">
                {language === 'zh' ? '下一步' : language === 'en' ? 'Next' : language === 'ru' ? 'Далее' : 'التالي'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Personal Info */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {language === 'zh' ? '告诉我们更多关于您的信息' : language === 'en' ? 'Tell us more about you' : language === 'ru' ? 'Расскажите о себе' : 'أخبرنا المزيد عنك'}
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Globe className="w-4 h-4 inline mr-2" />
                  {language === 'zh' ? '国籍' : language === 'en' ? 'Nationality' : language === 'ru' ? 'Гражданство' : 'الجنسية'}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {NATIONALITIES.map((nat) => (
                    <button
                      key={nat.code}
                      onClick={() => setNationality(nat.code)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        nationality === nat.code
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {getNatName(nat)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Heart className="w-4 h-4 inline mr-2" />
                  {language === 'zh' ? '旅行偏好（可多选）' : language === 'en' ? 'Travel Preferences' : language === 'ru' ? 'Предпочтения' : 'تفضيلات السفر'}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {PREFERENCES.map((pref) => (
                    <button
                      key={pref.id}
                      onClick={() => togglePreference(pref.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        preferences.includes(pref.id)
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-2 border-amber-500'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-gray-200'
                      }`}
                    >
                      <pref.icon className="w-5 h-5" />
                      <span className="text-sm">{getPrefName(pref)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="px-8 py-3 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                {language === 'zh' ? '上一步' : language === 'en' ? 'Back' : language === 'ru' ? 'Назад' : 'رجوع'}
              </button>
              <button onClick={() => { setStep(4); generateAIQuote(); }} className="px-8 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                {language === 'zh' ? '获取AI报价' : language === 'en' ? 'Get AI Quote' : language === 'ru' ? 'Получить AI расчет' : 'احصل على عرض AI'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: AI Quote */}
        {step === 4 && aiQuote && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {language === 'zh' ? '您的专属AI报价' : language === 'en' ? 'Your AI-Powered Quote' : language === 'ru' ? 'Ваш AI расчет' : 'عرض AI المخصص لك'}
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <p className="text-gray-500 mb-2">{language === 'zh' ? '预估价格' : language === 'en' ? 'Estimated Price' : language === 'ru' ? 'Ориентировочная цена' : 'السعر التقديري'}</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl text-gray-400 line-through">¥{aiQuote.basePrice.toLocaleString()}</span>
                  <span className="text-5xl font-bold text-amber-600">¥{aiQuote.aiAdjustedPrice.toLocaleString()}</span>
                </div>
                <p className="text-lg text-gray-600 mt-2">
                  ≈ ${Math.round(aiQuote.aiAdjustedPrice / 7.2).toLocaleString()} USD
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {language === 'zh' ? 'AI优化节省 ' : language === 'en' ? 'AI optimized savings ' : language === 'ru' ? 'Экономия с AI ' : 'توفير مع AI '}
                  ¥{(aiQuote.basePrice - aiQuote.aiAdjustedPrice).toLocaleString()}
                </p>
              </div>
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {language === 'zh' ? '价格明细' : language === 'en' ? 'Price Breakdown' : language === 'ru' ? 'Детализация цены' : 'تفاصيل السعر'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bed className="w-5 h-5 text-amber-600" />
                      <span className="text-gray-700 dark:text-gray-300">{aiQuote.breakdown.hotel.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">¥{aiQuote.breakdown.hotel.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-amber-600" />
                      <span className="text-gray-700 dark:text-gray-300">{aiQuote.breakdown.transport.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">¥{aiQuote.breakdown.transport.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-amber-600" />
                      <span className="text-gray-700 dark:text-gray-300">{aiQuote.breakdown.guide.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">¥{aiQuote.breakdown.guide.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Ticket className="w-5 h-5 text-amber-600" />
                      <span className="text-gray-700 dark:text-gray-300">{aiQuote.breakdown.tickets.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">¥{aiQuote.breakdown.tickets.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-slate-600 pt-4 mt-4">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {language === 'zh' ? '总计' : language === 'en' ? 'Total' : language === 'ru' ? 'Итого' : 'المجموع'}
                    </span>
                    <span className="font-bold text-amber-600">¥{aiQuote.aiAdjustedPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-8">
                <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  {language === 'zh' ? 'AI智能推荐' : language === 'en' ? 'AI Recommendation' : language === 'ru' ? 'AI рекомендация' : 'توصية AI'}
                </h3>
                <p className="text-amber-700 dark:text-amber-400">{aiQuote.notes}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(3)} className="flex-1 py-3 border rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700">
                  {language === 'zh' ? '修改' : language === 'en' ? 'Modify' : language === 'ru' ? 'Изменить' : 'تعديل'}
                </button>
                <button
                  onClick={saveItinerary}
                  className="flex-1 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700"
                >
                  {user
                    ? (language === 'zh' ? '保存行程' : language === 'en' ? 'Save Itinerary' : language === 'ru' ? 'Сохранить' : 'حفظ خط السير')
                    : (language === 'zh' ? '登录保存' : language === 'en' ? 'Login to Save' : language === 'ru' ? 'Войти для сохранения' : 'تسجيل الدخول للحفظ')
                  }
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
