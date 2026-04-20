import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Globe } from 'lucide-react';

interface HeroProps {
  language: 'zh' | 'en' | 'ru' | 'ar';
}

const translations = {
  zh: {
    title: '探索中国',
    subtitle: '高端定制之旅',
    description: '为您量身打造的奢华中国体验，从古老文明到现代都市',
    cta: '开始定制行程',
    langLabel: '中文'
  },
  en: {
    title: 'Discover China',
    subtitle: 'Luxury Customized Tours',
    description: 'Bespoke luxury experiences from ancient civilizations to modern metropolises',
    cta: 'Start Planning',
    langLabel: 'English'
  },
  ru: {
    title: 'Откройте Китай',
    subtitle: 'Эксклюзивные Туры',
    description: 'Индивидуальные роскошные путешествия от древних цивилизаций до современных мегаполисов',
    cta: 'Начать Планирование',
    langLabel: 'Русский'
  },
  ar: {
    title: 'اكتشف الصين',
    subtitle: 'جولات فاخرة مخصصة',
    description: 'تجارب فاخرة مصممة خصيصًا لك من الحضارات القديمة إلى المدن الحديثة',
    cta: 'ابدأ التخطيط',
    langLabel: 'العربية'
  }
};

const landmarkImages = [
  { url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400', delay: 0 },
  { url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400', delay: 0.1 },
  { url: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400', delay: 0.2 },
  { url: 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=400', delay: 0.3 },
  { url: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=400', delay: 0.4 },
  { url: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=400', delay: 0.5 },
  { url: 'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=400', delay: 0.6 },
  { url: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400', delay: 0.7 },
  { url: 'https://images.unsplash.com/photo-1542079668-197625d11054?w=400', delay: 0.8 },
  { url: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400', delay: 0.9 },
  { url: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=400', delay: 1.0 },
  { url: 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=400', delay: 1.1 },
];

export default function Hero({ language }: HeroProps) {
  const t = translations[language];
  const isRTL = language === 'ar';

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3">
          {landmarkImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: img.delay * 0.1, duration: 0.8 }}
              className="relative overflow-hidden"
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-amber-900/40" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-amber-800/70 to-amber-600/80" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto ${isRTL ? 'rtl' : ''}`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
        >
          <Globe className="w-4 h-4 text-amber-200" />
          <span className="text-amber-100 text-sm">{t.langLabel}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          {t.title}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl md:text-3xl font-light text-amber-200 mb-6"
        >
          {t.subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-amber-100/80 mb-10 max-w-2xl mx-auto"
        >
          {t.description}
        </motion.p>

        <motion.a
          href="#/customize"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-900 rounded-full font-semibold text-lg hover:bg-amber-50 transition-colors cursor-pointer"
        >
          {t.cta}
          <ChevronRight className="w-5 h-5" />
        </motion.a>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
