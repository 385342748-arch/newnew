import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, DollarSign, FileText, CheckCircle, X, Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { useAuth, ItineraryRequest, User } from '../hooks/useAuth';

interface AdminDashboardProps {
  language: 'zh' | 'en' | 'ru' | 'ar';
}

const translations = {
  zh: {
    adminPanel: '管理后台',
    itineraries: '行程管理',
    users: '用户管理',
    routes: '线路管理',
    allItineraries: '所有行程',
    pending: '待报价',
    quoted: '已报价',
    confirmed: '已确认',
    search: '搜索',
    customer: '客户',
    cities: '城市',
    days: '天',
    groupSize: '人数',
    basePrice: '基础价格',
    finalPrice: '最终价格',
    setPrice: '设置价格',
    notes: '备注',
    save: '保存',
    cancel: '取消',
    noData: '暂无数据',
    email: '邮箱',
    name: '姓名',
    role: '角色',
    createdAt: '创建时间',
    actions: '操作',
    addRoute: '新增线路',
    routeName: '线路名称',
    routeCities: '途经城市',
    routeDays: '天数',
    routePrice: '价格',
    delete: '删除',
    edit: '编辑'
  },
  en: {
    adminPanel: 'Admin Panel',
    itineraries: 'Itineraries',
    users: 'Users',
    routes: 'Routes',
    allItineraries: 'All Itineraries',
    pending: 'Pending',
    quoted: 'Quoted',
    confirmed: 'Confirmed',
    search: 'Search',
    customer: 'Customer',
    cities: 'Cities',
    days: 'Days',
    groupSize: 'Group Size',
    basePrice: 'Base Price',
    finalPrice: 'Final Price',
    setPrice: 'Set Price',
    notes: 'Notes',
    save: 'Save',
    cancel: 'Cancel',
    noData: 'No data',
    email: 'Email',
    name: 'Name',
    role: 'Role',
    createdAt: 'Created',
    actions: 'Actions',
    addRoute: 'Add Route',
    routeName: 'Route Name',
    routeCities: 'Cities',
    routeDays: 'Days',
    routePrice: 'Price',
    delete: 'Delete',
    edit: 'Edit'
  },
  ru: {
    adminPanel: 'Панель администратора',
    itineraries: 'Маршруты',
    users: 'Пользователи',
    routes: 'Маршруты',
    allItineraries: 'Все маршруты',
    pending: 'Ожидают',
    quoted: 'Расчет отправлен',
    confirmed: 'Подтверждены',
    search: 'Поиск',
    customer: 'Клиент',
    cities: 'Города',
    days: 'Дней',
    groupSize: 'Группа',
    basePrice: 'Базовая цена',
    finalPrice: 'Итоговая цена',
    setPrice: 'Установить цену',
    notes: 'Примечания',
    save: 'Сохранить',
    cancel: 'Отмена',
    noData: 'Нет данных',
    email: 'Email',
    name: 'Имя',
    role: 'Роль',
    createdAt: 'Создан',
    actions: 'Действия',
    addRoute: 'Добавить маршрут',
    routeName: 'Название',
    routeCities: 'Города',
    routeDays: 'Дней',
    routePrice: 'Цена',
    delete: 'Удалить',
    edit: 'Изменить'
  },
  ar: {
    adminPanel: 'لوحة الإدارة',
    itineraries: 'خطوط السير',
    users: 'المستخدمون',
    routes: 'الطرق',
    allItineraries: 'جميع خطوط السير',
    pending: 'معلق',
    quoted: 'تم العرض',
    confirmed: 'مؤكد',
    search: 'بحث',
    customer: 'العميل',
    cities: 'المدن',
    days: 'أيام',
    groupSize: 'حجم المجموعة',
    basePrice: 'السعر الأساسي',
    finalPrice: 'السعر النهائي',
    setPrice: 'تحديد السعر',
    notes: 'ملاحظات',
    save: 'حفظ',
    cancel: 'إلغاء',
    noData: 'لا توجد بيانات',
    email: 'البريد الإلكتروني',
    name: 'الاسم',
    role: 'الدور',
    createdAt: 'تاريخ الإنشاء',
    actions: 'الإجراءات',
    addRoute: 'إضافة طريق',
    routeName: 'اسم الطريق',
    routeCities: 'المدن',
    routeDays: 'الأيام',
    routePrice: 'السعر',
    delete: 'حذف',
    edit: 'تعديل'
  }
};

const AVAILABLE_CITIES: Record<string, Record<string, string>> = {
  beijing: { zh: '北京', en: 'Beijing', ru: 'Пекин', ar: 'بكين' },
  shanghai: { zh: '上海', en: 'Shanghai', ru: 'Шанхай', ar: 'شنغهاي' },
  xian: { zh: '西安', en: 'Xi\'an', ru: 'Сиань', ar: 'شيآن' },
  chengdu: { zh: '成都', en: 'Chengdu', ru: 'Чэнду', ar: 'تشنغدو' },
  luoyang: { zh: '洛阳', en: 'Luoyang', ru: 'Лоян', ar: 'لويانغ' },
  guilin: { zh: '桂林', en: 'Guilin', ru: 'Гуйлинь', ar: 'جويلين' }
};

interface Route {
  id: string;
  name: Record<string, string>;
  cities: string[];
  days: number;
  price: number;
  image: string;
  highlights: Record<string, string[]>;
}

export default function AdminDashboard({ language }: AdminDashboardProps) {
  const { getAllItineraries, updateItineraryPrice, getUsers } = useAuth();
  const [activeTab, setActiveTab] = useState<'itineraries' | 'users' | 'routes'>('itineraries');
  const [itineraries, setItineraries] = useState<ItineraryRequest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingItinerary, setEditingItinerary] = useState<ItineraryRequest | null>(null);
  const [finalPrice, setFinalPrice] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  
  const t = translations[language];

  useEffect(() => {
    loadData();
    loadRoutes();
  }, []);

  const loadData = () => {
    setItineraries(getAllItineraries());
    setUsers(getUsers());
  };

  const loadRoutes = () => {
    const stored = localStorage.getItem('go_east_routes');
    if (stored) {
      setRoutes(JSON.parse(stored));
    }
  };

  const saveRoutes = (newRoutes: Route[]) => {
    localStorage.setItem('go_east_routes', JSON.stringify(newRoutes));
    setRoutes(newRoutes);
  };

  const getCityName = (cityId: string) => {
    return AVAILABLE_CITIES[cityId]?.[language] || cityId;
  };

  const handleSetPrice = () => {
    if (editingItinerary && finalPrice) {
      updateItineraryPrice(editingItinerary.id, parseInt(finalPrice), adminNotes);
      loadData();
      setEditingItinerary(null);
      setFinalPrice('');
      setAdminNotes('');
    }
  };

  const filteredItineraries = itineraries.filter(i => {
    const matchesSearch = i.cities.some(c => getCityName(c).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    quoted: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-gray-100 text-gray-700'
  };

  const statusLabels: Record<string, string> = {
    pending: t.pending,
    quoted: t.quoted,
    confirmed: t.confirmed
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.adminPanel}</h1>
        </motion.div>

        <div className="flex gap-4 mb-8">
          {(['itineraries', 'users', 'routes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-amber-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              {t[tab]}
            </button>
          ))}
        </div>

        {activeTab === 'itineraries' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-4 py-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="all">{t.allItineraries}</option>
                <option value="pending">{t.pending}</option>
                <option value="quoted">{t.quoted}</option>
                <option value="confirmed">{t.confirmed}</option>
              </select>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.customer}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.cities}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.days}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.groupSize}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.basePrice}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.finalPrice}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItineraries.map((itinerary) => (
                    <tr key={itinerary.id} className="border-t dark:border-slate-700">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {users.find(u => u.id === itinerary.userId)?.name || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {users.find(u => u.id === itinerary.userId)?.email || ''}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {itinerary.cities.map(c => getCityName(c)).join(' → ')}
                      </td>
                      <td className="px-6 py-4">
                        {Object.values(itinerary.days).reduce((a, b) => a + b, 0)}
                      </td>
                      <td className="px-6 py-4">{itinerary.groupSize}</td>
                      <td className="px-6 py-4">¥{itinerary.basePrice.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        {itinerary.finalPrice ? (
                          <span className="font-bold text-green-600">¥{itinerary.finalPrice.toLocaleString()}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${statusColors[itinerary.status]}`}>
                            {statusLabels[itinerary.status] || itinerary.status}
                          </span>
                          {itinerary.status === 'pending' && (
                            <button
                              onClick={() => {
                                setEditingItinerary(itinerary);
                                setFinalPrice(itinerary.basePrice.toString());
                              }}
                              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"
                            >
                              <DollarSign className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.name}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.email}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.role}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{t.createdAt}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t dark:border-slate-700">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'routes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <p className="text-gray-500">{t.noData}</p>
            </div>
          </motion.div>
        )}

        {editingItinerary && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.setPrice}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.finalPrice}
                  </label>
                  <input
                    type="number"
                    value={finalPrice}
                    onChange={e => setFinalPrice(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.notes}
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={e => setAdminNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditingItinerary(null)}
                  className="flex-1 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSetPrice}
                  className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {t.save}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
