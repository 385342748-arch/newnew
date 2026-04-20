import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, DollarSign, Clock, CheckCircle, XCircle, FileText, ChevronRight } from 'lucide-react';
import { useAuth, ItineraryRequest } from '../hooks/useAuth';

interface UserDashboardProps {
  language: 'zh' | 'en' | 'ru' | 'ar';
}

const translations = {
  zh: {
    myItineraries: '我的行程',
    noItineraries: '暂无行程',
    createNew: '创建新行程',
    status: '状态',
    pending: '待报价',
    quoted: '已报价',
    confirmed: '已确认',
    cancelled: '已取消',
    basePrice: '基础价格',
    finalPrice: '最终价格',
    viewDetails: '查看详情',
    cities: '城市',
    days: '天',
    people: '人',
    createdAt: '创建时间',
    adminNotes: '客服备注'
  },
  en: {
    myItineraries: 'My Itineraries',
    noItineraries: 'No itineraries yet',
    createNew: 'Create New',
    status: 'Status',
    pending: 'Pending Quote',
    quoted: 'Quoted',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    basePrice: 'Base Price',
    finalPrice: 'Final Price',
    viewDetails: 'View Details',
    cities: 'Cities',
    days: 'Days',
    people: 'People',
    createdAt: 'Created',
    adminNotes: 'Notes'
  },
  ru: {
    myItineraries: 'Мои маршруты',
    noItineraries: 'Пока нет маршрутов',
    createNew: 'Создать новый',
    status: 'Статус',
    pending: 'Ожидает расчета',
    quoted: 'Расчет получен',
    confirmed: 'Подтверждено',
    cancelled: 'Отменено',
    basePrice: 'Базовая цена',
    finalPrice: 'Итоговая цена',
    viewDetails: 'Подробнее',
    cities: 'Города',
    days: 'Дней',
    people: 'Чел',
    createdAt: 'Создано',
    adminNotes: 'Примечания'
  },
  ar: {
    myItineraries: 'خطوط سيري',
    noItineraries: 'لا توجد خطوط سير بعد',
    createNew: 'إنشاء جديد',
    status: 'الحالة',
    pending: 'بانتظار العرض',
    quoted: 'تم العرض',
    confirmed: 'مؤكد',
    cancelled: 'ملغى',
    basePrice: 'السعر الأساسي',
    finalPrice: 'السعر النهائي',
    viewDetails: 'عرض التفاصيل',
    cities: 'المدن',
    days: 'أيام',
    people: 'أشخاص',
    createdAt: 'تاريخ الإنشاء',
    adminNotes: 'ملاحظات'
  }
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  quoted: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-700'
};

const AVAILABLE_CITIES: Record<string, Record<string, string>> = {
  beijing: { zh: '北京', en: 'Beijing', ru: 'Пекин', ar: 'بكين' },
  shanghai: { zh: '上海', en: 'Shanghai', ru: 'Шанхай', ar: 'شنغهاي' },
  xian: { zh: '西安', en: 'Xi\'an', ru: 'Сиань', ar: 'شيآن' },
  chengdu: { zh: '成都', en: 'Chengdu', ru: 'Чэнду', ar: 'تشنغدو' },
  luoyang: { zh: '洛阳', en: 'Luoyang', ru: 'Лоян', ar: 'لويانغ' },
  guilin: { zh: '桂林', en: 'Guilin', ru: 'Гуйлинь', ar: 'جويلين' }
};

export default function UserDashboard({ language }: UserDashboardProps) {
  const { user, getUserItineraries, confirmItinerary } = useAuth();
  const [itineraries, setItineraries] = useState<ItineraryRequest[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryRequest | null>(null);
  
  const t = translations[language];

  useEffect(() => {
    if (user) {
      setItineraries(getUserItineraries());
    }
  }, [user, getUserItineraries]);

  const getCityName = (cityId: string) => {
    return AVAILABLE_CITIES[cityId]?.[language] || cityId;
  };

  const getStatusText = (status: string) => {
    return t[status as keyof typeof t] || status;
  };

  const handleConfirm = (id: string) => {
    confirmItinerary(id);
    setItineraries(getUserItineraries());
    setSelectedItinerary(null);
  };

  if (selectedItinerary) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedItinerary(null)}
                className="text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                ← {language === 'zh' ? '返回' : language === 'en' ? 'Back' : language === 'ru' ? 'Назад' : 'رجوع'}
              </button>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedItinerary.status]}`}>
                {getStatusText(selectedItinerary.status)}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'zh' ? '行程详情' : language === 'en' ? 'Itinerary Details' : language === 'ru' ? 'Детали маршрута' : 'تفاصيل خط السير'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{t.cities}</span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedItinerary.cities.length}</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{t.days}</span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {Object.values(selectedItinerary.days).reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{t.people}</span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedItinerary.groupSize}</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{t.createdAt}</span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {new Date(selectedItinerary.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {language === 'zh' ? '行程安排' : language === 'en' ? 'Route' : language === 'ru' ? 'Маршрут' : 'خط السير'}
              </h3>
              {selectedItinerary.cities.map((cityId, index) => (
                <div key={cityId} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{getCityName(cityId)}</p>
                    <p className="text-sm text-gray-500">{selectedItinerary.days[cityId]} {t.days}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t dark:border-slate-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-300">{t.basePrice}</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">¥{selectedItinerary.basePrice.toLocaleString()}</span>
              </div>
              {selectedItinerary.finalPrice && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 dark:text-gray-300">{t.finalPrice}</span>
                  <span className="text-2xl font-bold text-amber-600">¥{selectedItinerary.finalPrice.toLocaleString()}</span>
                </div>
              )}
            </div>

            {selectedItinerary.adminNotes && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">{t.adminNotes}</h4>
                <p className="text-blue-700 dark:text-blue-400">{selectedItinerary.adminNotes}</p>
              </div>
            )}

            {selectedItinerary.status === 'quoted' && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleConfirm(selectedItinerary.id)}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {language === 'zh' ? '确认预订' : language === 'en' ? 'Confirm Booking' : language === 'ru' ? 'Подтвердить' : 'تأكيد الحجز'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.myItineraries}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.name ? `${language === 'zh' ? '欢迎' : language === 'en' ? 'Welcome' : language === 'ru' ? 'Добро пожаловать' : 'مرحباً'}，${user.name}` : ''}
          </p>
        </motion.div>

        {itineraries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">{t.noItineraries}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary, index) => (
              <motion.div
                key={itinerary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedItinerary(itinerary)}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[itinerary.status]}`}>
                    {getStatusText(itinerary.status)}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">{t.cities}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {itinerary.cities.map(c => getCityName(c)).join(' → ')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{t.days}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {Object.values(itinerary.days).reduce((a, b) => a + b, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.people}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{itinerary.groupSize}</p>
                  </div>
                </div>

                <div className="border-t dark:border-slate-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{t.basePrice}</span>
                    <span className="font-bold text-amber-600">¥{itinerary.basePrice.toLocaleString()}</span>
                  </div>
                  {itinerary.finalPrice && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-500">{t.finalPrice}</span>
                      <span className="font-bold text-green-600">¥{itinerary.finalPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
