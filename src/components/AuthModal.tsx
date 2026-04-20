import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'zh' | 'en' | 'ru' | 'ar';
}

const translations = {
  zh: {
    login: '登录',
    register: '注册',
    email: '邮箱',
    password: '密码',
    name: '姓名',
    loginBtn: '登录',
    registerBtn: '注册',
    switchToRegister: '还没有账号？立即注册',
    switchToLogin: '已有账号？立即登录',
    close: '关闭',
    loginSuccess: '登录成功',
    registerSuccess: '注册成功',
    error: '出错了',
    required: '请填写所有必填项'
  },
  en: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    loginBtn: 'Login',
    registerBtn: 'Register',
    switchToRegister: 'No account? Register now',
    switchToLogin: 'Have an account? Login now',
    close: 'Close',
    loginSuccess: 'Login successful',
    registerSuccess: 'Registration successful',
    error: 'Error',
    required: 'Please fill in all required fields'
  },
  ru: {
    login: 'Вход',
    register: 'Регистрация',
    email: 'Email',
    password: 'Пароль',
    name: 'Имя',
    loginBtn: 'Войти',
    registerBtn: 'Зарегистрироваться',
    switchToRegister: 'Нет аккаунта? Зарегистрируйтесь',
    switchToLogin: 'Есть аккаунт? Войдите',
    close: 'Закрыть',
    loginSuccess: 'Вход выполнен',
    registerSuccess: 'Регистрация успешна',
    error: 'Ошибка',
    required: 'Заполните все обязательные поля'
  },
  ar: {
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم',
    loginBtn: 'دخول',
    registerBtn: 'تسجيل',
    switchToRegister: 'ليس لديك حساب؟ سجل الآن',
    switchToLogin: 'لديك حساب؟ ادخل الآن',
    close: 'إغلاق',
    loginSuccess: 'تم تسجيل الدخول',
    registerSuccess: 'تم التسجيل بنجاح',
    error: 'خطأ',
    required: 'يرجى ملء جميع الحقول المطلوبة'
  }
};

export default function AuthModal({ isOpen, onClose, language }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || (!isLogin && !name)) {
      setError(t.required);
      return;
    }

    setIsLoading(true);
    
    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          onClose();
        } else {
          setError(result.error || t.error);
        }
      } else {
        const result = await register(email, password, name);
        if (result.success) {
          onClose();
        } else {
          setError(result.error || t.error);
        }
      }
    } catch {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isLogin ? t.login : t.register}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.name}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      placeholder={t.name}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder={t.email}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.password}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder={t.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? '...' : (isLogin ? t.loginBtn : t.registerBtn)}
              </motion.button>
            </form>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full mt-4 text-center text-amber-600 hover:text-amber-700 text-sm"
            >
              {isLogin ? t.switchToRegister : t.switchToLogin}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
