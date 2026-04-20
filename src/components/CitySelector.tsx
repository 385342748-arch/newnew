import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Check } from 'lucide-react';

interface City {
  id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  nameAr: string;
  image: string;
  days: number[];
  attractions: string[];
}

const cities: City[] = [
  {
    id: 'beijing',
    name: '北京',
    nameEn: 'Beijing',
    nameRu: 'Пекин',
    nameAr: 'بكين',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400',
    days: [3, 4, 5],
    attractions: ['故宫', '长城', '天坛', '颐和园']
  },
  {
    id: 'shanghai',
    name: '上海',
    nameEn: 'Shanghai',
    nameRu: 'Шанхай',
    nameAr: 'شنغهاي',
    image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=400',
    days: [2, 3, 4],
    attractions: ['外滩', '东方明珠', '豫园', '南京路']
  },
  {
    id: 'xian',
    name: '西安',
    nameEn: 'Xi\'an',
    nameRu: 'Сиань',
    nameAr: 'شيآن',
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400',
    days: [2, 3, 4],
    attractions: ['兵马俑', '大雁塔', '古城墙', '回民街']
  },
  {
    id: 'chengdu',
    name: '成都',
    nameEn: 'Chengdu',
    nameRu: 'Чэнду',
    nameAr: 'تشنغدو',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7e?w=400',
    days: [2, 3, 4],
    attractions: ['大熊猫基地', '宽窄巷子', '锦里', '武侯祠']
  },
  {
    id: 'luoyang',
    name: '洛阳',
    nameEn: 'Luoyang',
    nameRu: 'Лоян',
    nameAr: 'لويانغ',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400',
    days: [2, 3],
    attractions: ['龙门石窟', '白马寺', '老君山', '牡丹园']
  },
  {
    id: 'hangzhou',
    name: '杭州',
    nameEn: 'Hangzhou',
    nameRu: 'Ханчжоу',
    nameAr: 'هانغتشو',
    image: 'https://images.unsplash.com/photo-1565378435245-2528d587e524?w=400',
    days: [2, 3],
    attractions: ['西湖', '灵隐寺', '千岛湖', '宋城']
  },
  {
    id: 'guilin',
    name: '桂林',
    nameEn: 'Guilin',
    nameRu: 'Гуйлинь',
    nameAr: 'جويلين',
    image: 'https://images.unsplash.com/photo-1537531382996-a7e8eb2f46af?w=400',
    days: [2, 3, 4],
    attractions: ['漓江', '阳朔', '象鼻山', '龙脊梯田']
  }
];

type Language = 'zh' | 'en' | 'ru' | 'ar';

interface CitySelectorProps {
  language?: Language;
  onSelect?: (cities: SelectedCity[]) => void;
}

interface SelectedCity {
  cityId: string;
  days: number;
}

const translations = {
  zh: { title: '选择您的旅程', subtitle: '点击城市添加到行程', days: '天', selected: '已选择', confirm: '确认行程' },
  en: { title: 'Choose Your Journey', subtitle: 'Click cities to add to itinerary', days: 'Days', selected: 'Selected', confirm: 'Confirm Itinerary' },
  ru: { title: 'Выберите свое путешествие', subtitle: 'Нажмите на город, чтобы добавить', days: 'дней', selected: 'Выбрано', confirm: 'Подтвердить' },
  ar: { title: 'اختر رحلتك', subtitle: 'انقر على المدينة للإضافة', days: 'أيام', selected: 'محدد', confirm: 'تأكيد' }
};

export default function CitySelector({ language = 'en', onSelect }: CitySelectorProps) {
  const [selectedCities, setSelectedCities] = useState<SelectedCity[]>([]);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const t = translations[language];

  const getCityName = (city: City) => {
    switch (language) {
      case 'zh': return city.name;
      case 'ru': return city.nameRu;
      case 'ar': return city.nameAr;
      default: return city.nameEn;
    }
  };

  const toggleCity = (cityId: string) => {
    const exists = selectedCities.find(c => c.cityId === cityId);
    if (exists) {
      setSelectedCities(selectedCities.filter(c => c.cityId !== cityId));
    } else {
      setSelectedCities([...selectedCities, { cityId, days: cities.find(c => c.id === cityId)?.days[1] || 3 }]);
    }
  };

  const updateDays = (cityId: string, days: number) => {
    setSelectedCities(selectedCities.map(c => c.cityId === cityId ? { ...c, days } : c));
  };

  const isSelected = (cityId: string) => selectedCities.some(c => c.cityId === cityId);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => toggleCity(city.id)}
            onMouseEnter={() => setHoveredCity(city.id)}
            onMouseLeave={() => setHoveredCity(null)}
            className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all ${
              isSelected(city.id) ? 'ring-4 ring-blue-500' : 'hover:shadow-xl'
            }`}
          >
            <div className="aspect-[4/3] relative">
              <img src={city.image} alt={getCityName(city)} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {isSelected(city.id) && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white mb-1">{getCityName(city)}</h3>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {city.days.join('-')}{t.days}
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {hoveredCity === city.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-white dark:bg-gray-800 p-4">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{city.attractions.slice(0, 3).join(' · ')}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {selectedCities.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.selected} ({selectedCities.length})</h3>
          <div className="flex flex-wrap gap-3">
            {selectedCities.map(({ cityId, days }) => {
              const city = cities.find(c => c.id === cityId)!;
              return (
                <motion.div key={cityId} layout className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-full px-4 py-2 shadow">
                  <span className="font-medium text-gray-900 dark:text-white">{getCityName(city)}</span>
                  <select
                    value={days}
                    onChange={(e) => updateDays(cityId, parseInt(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gray-100 dark:bg-gray-600 rounded px-2 py-1 text-sm"
                  >
                    {city.days.map(d => <option key={d} value={d}>{d}{t.days}</option>)}
                  </select>
                </motion.div>
              );
            })}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect?.(selectedCities)}
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            {t.confirm}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
