import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
  theme: 'light' | 'dark';
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  onAuthClick?: () => void;
}

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const navItems = [
  { key: 'home', label: { zh: '首页', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }, href: '#/' },
  { key: 'destinations', label: { zh: '目的地', en: 'Destinations', ru: 'Направления', ar: 'الوجهات' }, href: '#/destinations' },
  { key: 'customize', label: { zh: '定制行程', en: 'Customize Trip', ru: 'Индивидуальный тур', ar: 'تخصيص الرحلة' }, href: '#/customize' },
  { key: 'about', label: { zh: '关于我们', en: 'About Us', ru: 'О нас', ar: 'من نحن' }, href: '#/about' },
  { key: 'contact', label: { zh: '联系我们', en: 'Contact', ru: 'Контакты', ar: 'اتصل بنا' }, href: '#contact' },
];

export default function Header({ currentLang, onLangChange, theme, isAuthenticated, isAdmin, onAuthClick }: HeaderProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const currentLangData = languages.find(l => l.code === currentLang) || languages[0];
  const isDark = theme === 'dark';

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden relative ${
              isDark ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-gradient-to-br from-amber-500 to-amber-700'
            }`}>
              <img
                src="https://conversation.cdn.meoo.host/conversations/303499105571864576/image/2026-04-19/1776587152332-high_res_logo_high_res_panda.png?auth_key=d1ce0aadf6a2b10b4e1d5e553a81425e938f1becb9c8ceb9bd16aa33e980b27a"
                alt="Panda Logo"
                className="w-16 h-16 object-cover"
              />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              GO EAST
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                whileHover={{ y: -2 }}
                className={`text-sm font-medium transition-colors ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label[currentLang as keyof typeof item.label] || item.label.en}
              </motion.a>
            ))}
          </nav>

          {/* Language Switcher & Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                    isDark
                      ? 'border-white/20 text-white hover:bg-white/10'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User size={16} />
                  <span className="text-sm font-medium">
                    {isAdmin
                      ? (currentLang === 'zh' ? '管理员' : currentLang === 'ru' ? 'Админ' : currentLang === 'ar' ? 'المشرف' : 'Admin')
                      : (currentLang === 'zh' ? '我的账户' : currentLang === 'ru' ? 'Мой аккаунт' : currentLang === 'ar' ? 'حسابي' : 'My Account')
                    }
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden ${
                        isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-100'
                      }`}
                    >
                      <a
                        href="#/dashboard"
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <LayoutDashboard size={16} />
                        <span className="text-sm font-medium">
                          {currentLang === 'zh' ? '控制面板' : currentLang === 'ru' ? 'Панель' : currentLang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                        </span>
                      </a>
                      <button
                        onClick={() => {
                          localStorage.removeItem('go_east_auth');
                          window.location.reload();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          isDark ? 'text-red-400 hover:bg-white/5' : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <LogOut size={16} />
                        <span className="text-sm font-medium">
                          {currentLang === 'zh' ? '退出' : currentLang === 'ru' ? 'Выход' : currentLang === 'ar' ? 'خروج' : 'Logout'}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAuthClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isDark
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User size={16} />
                <span className="text-sm font-medium">
                  {currentLang === 'zh' ? '登录' : currentLang === 'ru' ? 'Вход' : currentLang === 'ar' ? 'دخول' : 'Login'}
                </span>
              </motion.button>
            )}

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isDark 
                    ? 'border-white/20 text-white hover:bg-white/10' 
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Globe size={16} />
                <span className="text-sm font-medium">{currentLangData.flag}</span>
                <span className="text-sm">{currentLangData.name}</span>
                <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-40 rounded-xl shadow-xl border overflow-hidden ${
                      isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-100'
                    }`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLangChange(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          currentLang === lang.code
                            ? isDark ? 'bg-white/10 text-amber-400' : 'bg-amber-50 text-amber-600'
                            : isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${isDark ? 'border-white/10 bg-black/95' : 'border-gray-100 bg-white'}`}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={`block text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {item.label[currentLang as keyof typeof item.label] || item.label.en}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200/20">
                <p className={`text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>选择语言</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => onLangChange(lang.code)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentLang === lang.code
                          ? isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                          : isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {lang.flag} {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
