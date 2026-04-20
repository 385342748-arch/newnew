import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function Footer() {
  const { t, language } = useTranslation();

  const quickLinks = [
    { key: 'home', href: '#/' },
    { key: 'destinations', href: '#/destinations' },
    { key: 'customize', href: '#/customize' },
    { key: 'about', href: '#/about' },
    { key: 'contact', href: '#/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('brandName')}
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t('footerDescription')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              {t('contactUs')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5" />
                <span className="text-slate-400">
                  {language === 'zh' ? '广州市天河区中山大道中433号' :
                   language === 'en' ? '433 Zhongshan Avenue Middle, Tianhe District, Guangzhou' :
                   language === 'ru' ? 'Средний проспект Чжуншань 433, район Тяньхэ, Гуанчжоу' :
                   '433 شارع تشونغشان الأوسط، منطقة تيانهي، قوانغتشو'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500" />
                <span className="text-slate-400">+86 15815862428</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500" />
                <span className="text-slate-400">inboundchina@vk.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              {t('newsletter')}
            </h4>
            <p className="text-slate-400 mb-4">{t('newsletterDesc')}</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                {t('subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-amber-500 transition-colors">
              {t('privacyPolicy')}
            </a>
            <a href="#" className="text-slate-500 hover:text-amber-500 transition-colors">
              {t('termsOfService')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
