import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Award, Clock, MapPin, Phone, Mail } from 'lucide-react';

interface AboutPageProps {
  language: 'zh' | 'en' | 'ru' | 'ar';
}

const content = {
  zh: {
    title: '关于我们',
    subtitle: 'GO EAST - 您值得信赖的中国旅行专家',
    founded: '成立于2013年',
    description: 'GO EAST旅行社成立于2013年，是一家专注于入境旅游的专业旅行社。多年来，我们致力于为来自世界各地的游客提供优质的中国旅游服务，积累了丰富的出入境旅游经验。',
    experience: '我们的团队拥有多年的旅游行业经验，熟悉中国各地的旅游资源和文化特色。无论是历史文化之旅、自然风光探索，还是美食体验，我们都能为您量身定制完美的行程。',
    guides: {
      title: '专业小语种导游团队',
      description: '我们拥有一支专业的小语种导游团队，包括俄语、阿拉伯语、英语、日语、韩语、法语、德语、西班牙语等多种语言导游。所有导游均经过严格培训，具备丰富的带团经验和专业的文化知识。',
      price: '小语种导游服务：1500元/天'
    },
    services: [
      { icon: Globe, title: '入境旅游', desc: '专注外国游客中国游' },
      { icon: Users, title: '小团定制', desc: '2人起即可定制专属行程' },
      { icon: Award, title: '品质保证', desc: '精选五星酒店和特色体验' },
      { icon: Clock, title: '24小时服务', desc: '全程专属客服支持' }
    ],
    contact: {
      title: '联系我们',
      address: '广州市天河区中山大道中433号',
      phone: '+86 15815862428',
      email: 'inboundchina@vk.com'
    }
  },
  en: {
    title: 'About Us',
    subtitle: 'GO EAST - Your Trusted China Travel Expert',
    founded: 'Founded in 2013',
    description: 'GO EAST Travel Agency was founded in 2013, specializing in inbound tourism. Over the years, we have been committed to providing high-quality China travel services for visitors from around the world, accumulating rich experience in inbound and outbound tourism.',
    experience: 'Our team has many years of experience in the tourism industry, familiar with tourism resources and cultural characteristics across China. Whether it is a historical and cultural tour, natural scenery exploration, or food experience, we can tailor a perfect itinerary for you.',
    guides: {
      title: 'Professional Multilingual Guide Team',
      description: 'We have a professional multilingual guide team, including Russian, Arabic, English, Japanese, Korean, French, German, Spanish and other language guides. All guides have undergone rigorous training and possess rich tour experience and professional cultural knowledge.',
      price: 'Multilingual guide service: ¥1,500/day'
    },
    services: [
      { icon: Globe, title: 'Inbound Tourism', desc: 'Focus on foreign visitors to China' },
      { icon: Users, title: 'Small Group Custom', desc: 'Private tours from 2 people' },
      { icon: Award, title: 'Quality Assurance', desc: 'Selected 5-star hotels' },
      { icon: Clock, title: '24/7 Service', desc: 'Dedicated customer support' }
    ],
    contact: {
      title: 'Contact Us',
      address: '433 Zhongshan Avenue Middle, Tianhe District, Guangzhou',
      phone: '+86 15815862428',
      email: 'inboundchina@vk.com'
    }
  },
  ru: {
    title: 'О нас',
    subtitle: 'GO EAST - Ваш надежный эксперт по путешествиям в Китай',
    founded: 'Основана в 2013 году',
    description: 'Туристическое агентство GO EAST было основано в 2013 году и специализируется на въездном туризме. На протяжении многих лет мы стремимся предоставлять высококачественные туристические услуги в Китае для посетителей со всего мира, накапливая богатый опыт во въездном и выездном туризме.',
    experience: 'Наша команда имеет многолетний опыт работы в туристической индустрии, знакома с туристическими ресурсами и культурными особенностями по всему Китаю. Будь то историко-культурный тур, исследование природных пейзажей или гастрономический опыт, мы можем разработать для вас идеальный маршрут.',
    guides: {
      title: 'Профессиональная команда гидов',
      description: 'У нас есть профессиональная команда гидов, владеющих различными языками, включая русский, арабский, английский, японский, корейский, французский, немецкий, испанский и другие языки. Все гиды прошли строгую подготовку и обладают богатым опытом работы.',
      price: 'Услуги гида: ¥1,500/день'
    },
    services: [
      { icon: Globe, title: 'Въездной туризм', desc: 'Фокус на иностранных гостях' },
      { icon: Users, title: 'Малые группы', desc: 'Индивидуальные туры от 2 человек' },
      { icon: Award, title: 'Гарантия качества', desc: 'Отобранные отели 5 звезд' },
      { icon: Clock, title: 'Круглосуточно', desc: 'Поддержка клиентов' }
    ],
    contact: {
      title: 'Контакты',
      address: 'Средний проспект Чжуншань 433, район Тяньхэ, Гуанчжоу',
      phone: '+86 15815862428',
      email: 'inboundchina@vk.com'
    }
  },
  ar: {
    title: 'من نحن',
    subtitle: 'GO EAST - خبير السفر الصيني الموثوق به',
    founded: 'تأسست في 2013',
    description: 'تأسست وكالة سفر GO EAST في عام 2013، وهي متخصصة في السياحة الوافدة. على مر السنين، كنا ملتزمين بتقديم خدمات سفر عالية الجودة في الصين للزوار من جميع أنحاء العالم، مما أكسبنا خبرة غنية في السياحة الوافدة والصادرة.',
    experience: 'فريقنا لديه سنوات من الخبرة في صناعة السياحة، على دراية بالموارد السياحية والخصائص الثقافية في جميع أنحاء الصين. سواء كان جولة ثقافية وتاريخية، أو استكشاف المناظر الطبيعية، أو تجربة الطعام، يمكننا تصميم رحلة مثالية لك.',
    guides: {
      title: 'فريق مرشدين متعددي اللغات',
      description: 'لدينا فريق محترف من المرشدين متعددي اللغات، بما في ذلك مرشدين يتحدثون الروسية والعربية والإنجليزية واليابانية والكورية والفرنسية والألمانية والإسبانية وغيرها من اللغات. جميع المرشدين خضعوا لتدريب صارم ويتمتعون بخبرة غنية.',
      price: 'خدمات المرشد: ¥1,500/يوم'
    },
    services: [
      { icon: Globe, title: 'السياحة الوافدة', desc: 'التركيز على الزوار الأجانب' },
      { icon: Users, title: 'مجموعات صغيرة', desc: 'جولات خاصة من شخصين' },
      { icon: Award, title: 'ضمان الجودة', desc: 'فنادق 5 نجوم منتقاة' },
      { icon: Clock, title: 'على مدار الساعة', desc: 'دعم العملاء' }
    ],
    contact: {
      title: 'اتصل بنا',
      address: '433 شارع تشونغشان الأوسط، منطقة تيانهي، قوانغتشو',
      phone: '+86 15815862428',
      email: 'inboundchina@vk.com'
    }
  }
};

export default function AboutPage({ language }: AboutPageProps) {
  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-amber-600 font-medium">{t.subtitle}</p>
          <span className="inline-block mt-4 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
            {t.founded}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'zh' ? '公司简介' : language === 'en' ? 'Company Profile' : language === 'ru' ? 'О компании' : 'نبذة عن الشركة'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t.description}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.experience}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.guides.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t.guides.description}
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
              <p className="text-amber-700 dark:text-amber-300 font-semibold">
                {t.guides.price}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {language === 'zh' ? '我们的服务' : language === 'en' ? 'Our Services' : language === 'ru' ? 'Наши услуги' : 'خدماتنا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          id="contact"
          className="bg-slate-900 rounded-2xl shadow-xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold text-center mb-8">{t.contact.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {language === 'zh' ? '地址' : language === 'en' ? 'Address' : language === 'ru' ? 'Адрес' : 'العنوان'}
                </p>
                <p className="font-medium">{t.contact.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {language === 'zh' ? '电话' : language === 'en' ? 'Phone' : language === 'ru' ? 'Телефон' : 'الهاتف'}
                </p>
                <p className="font-medium">{t.contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {language === 'zh' ? '邮箱' : language === 'en' ? 'Email' : language === 'ru' ? 'Email' : 'البريد'}
                </p>
                <p className="font-medium">{t.contact.email}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
