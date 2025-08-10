import React from 'react';
import { motion } from 'framer-motion';

const HerbalPowerSection = ({ language = 'en' }) => {
  const herbalIngredients = {
    en: [
      {
        name: "Sarffron",
        description: "Natural testosterone booster",
        image: "/images/Sarffron.png",
        alt: "Sarffron herbal supplement for natural testosterone boosting and male vitality",
        seoDescription: "Premium Sarffron extract known for boosting natural testosterone levels and enhancing male performance"
      },
      {
        name: "Maca Root",
        description: "Improves fertility & energy",
        image: "/images/Maca Root.png",
        alt: "Maca Root superfood for fertility enhancement and natural energy boost",
        seoDescription: "Organic Maca Root powder that naturally improves fertility, energy levels and overall vitality"
      },
      {
        name: "Ashwagandha",
        description: "Reduces stress, boosts strength",
        image: "/images/Ashwagandha.png",
        alt: "Ashwagandha adaptogenic herb for stress reduction and strength enhancement",
        seoDescription: "Pure Ashwagandha extract that reduces cortisol stress levels while boosting physical strength"
      },
      {
        name: "Safed Musli",
        description: "Enhances performance",
        image: "/images/Safed Musli.png",
        alt: "Safed Musli ayurvedic herb for performance enhancement and stamina",
        seoDescription: "Traditional Safed Musli root extract for enhanced physical performance and endurance"
      },
      {
        name: "Shilajit",
        description: "Ultimate strength & stamina",
        image: "/images/Shilajit.png",
        alt: "Pure Shilajit mineral supplement for ultimate strength and stamina boost",
        seoDescription: "Himalayan Shilajit resin rich in fulvic acid for maximum strength, stamina and energy"
      },
      {
        name: "Korean Red Ginseng",
        description: "Physical & mental endurance",
        image: "/images/Korean Red Ginseng.png",
        alt: "Korean Red Ginseng root for physical and mental endurance enhancement",
        seoDescription: "Premium Korean Red Ginseng extract for improved physical stamina and mental clarity"
      }
    ],
    ur: [
      {
        name: "سرفرون",
        description: "قدرتی ٹیسٹوسٹیرون بوسٹر",
        image: "/images/Sarffron.png",
        alt: "Sarffron herbal supplement for natural testosterone boosting and male vitality",
        seoDescription: "Premium Sarffron extract known for boosting natural testosterone levels and enhancing male performance"
      },
      {
        name: "ماکا روٹ",
        description: "زرخیزی اور توانائی بہتر بناتا ہے",
        image: "/images/Maca Root.png",
        alt: "Maca Root superfood for fertility enhancement and natural energy boost",
        seoDescription: "Organic Maca Root powder that naturally improves fertility, energy levels and overall vitality"
      },
      {
        name: "اشوگندھا",
        description: "تناؤ کم کرتا ہے، طاقت بڑھاتا ہے",
        image: "/images/Ashwagandha.png",
        alt: "Ashwagandha adaptogenic herb for stress reduction and strength enhancement",
        seoDescription: "Pure Ashwagandha extract that reduces cortisol stress levels while boosting physical strength"
      },
      {
        name: "سفید مصلی",
        description: "کارکردگی بہتر بناتا ہے",
        image: "/images/Safed Musli.png",
        alt: "Safed Musli ayurvedic herb for performance enhancement and stamina",
        seoDescription: "Traditional Safed Musli root extract for enhanced physical performance and endurance"
      },
      {
        name: "شلاجیت",
        description: "حتمی طاقت اور برداشت",
        image: "/images/Shilajit.png",
        alt: "Pure Shilajit mineral supplement for ultimate strength and stamina boost",
        seoDescription: "Himalayan Shilajit resin rich in fulvic acid for maximum strength, stamina and energy"
      },
      {
        name: "کوریائی سرخ جنسنگ",
        description: "جسمانی اور ذہنی برداشت",
        image: "/images/Korean Red Ginseng.png",
        alt: "Korean Red Ginseng root for physical and mental endurance enhancement",
        seoDescription: "Premium Korean Red Ginseng extract for improved physical stamina and mental clarity"
      }
    ]
  };

  const content = {
    en: {
      title: "🌿 Herbal Power. Backed by Science.",
      subtitle: "A potent blend of 30+ world-renowned herbal ingredients, trusted for centuries",
      natural: "🌿 100% Natural • ⚗️ Scientifically Proven • 🛡️ Safe & Effective",
      quality: "Each ingredient is carefully selected and tested for maximum potency"
    },
    ur: {
      title: "🌿 جڑی بوٹیوں کی طاقت۔ سائنس سے ثابت شدہ۔",
      subtitle: "۱۵+ عالمی شہرت یافتہ جڑی بوٹیوں کا طاقتور امتزاج، صدیوں سے قابل اعتماد",
      natural: "🌿 ۱۰۰٪ قدرتی • ⚗️ سائنسی طور پر ثابت شدہ • 🛡️ محفوظ اور مؤثر",
      quality: "ہر جزو کو احتیاط سے منتخب کیا گیا ہے اور زیادہ سے زیادہ طاقت کے لیے ٹیسٹ کیا گیا ہے"
    }
  };

  const currentContent = content[language];
  const currentIngredients = herbalIngredients[language];



  return (
    <section
      className={`py-12 md:py-16 bg-gradient-to-br from-green-50 to-emerald-50 ${language === 'ur' ? 'font-urdu' : ''}`}
      aria-labelledby="herbal-power-heading"
      role="region"
      dir={language === 'ur' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="herbal-power-heading"
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            title="Natural herbal supplements backed by scientific research"
          >
            {language === 'en' ? (
              <>🌿 Herbal Power. <span className="text-green-600">Backed by Science.</span></>
            ) : (
              <>🌿 جڑی بوٹیوں کی طاقت۔ <span className="text-green-600">سائنس سے ثابت شدہ۔</span></>
            )}
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            title="Premium herbal formula combining traditional wisdom with modern science"
          >
            {currentContent.subtitle}
          </p>
        </motion.header>

        {/* Ingredients Grid */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto">
            {currentIngredients.map((ingredient, index) => (
              <motion.article
                key={index}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                role="article"
                aria-labelledby={`ingredient-${index}`}
              >
                {/* Round Image Container with 2px red border */}
                <div className="relative mx-auto mb-4 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                  <div className="w-full h-full rounded-full border-2 border-red-500 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden">
                    <img
                      src={ingredient.image}
                      alt={ingredient.alt}
                      title={ingredient.seoDescription}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="128"
                      height="128"
                    />
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-20 transition-opacity blur-lg"></div>
                </div>

                {/* Text Content - Centered below image */}
                <div className="space-y-2 max-w-[120px] md:max-w-[140px]">
                  <h3
                    id={`ingredient-${index}`}
                    className="font-bold text-sm md:text-base text-gray-800 group-hover:text-green-600 transition-colors leading-tight"
                    title={`${ingredient.name} - ${ingredient.seoDescription}`}
                  >
                    {ingredient.name}
                  </h3>
                  <p
                    className="text-xs md:text-sm text-gray-600 leading-relaxed"
                    title={ingredient.seoDescription}
                  >
                    {ingredient.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.aside
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          role="complementary"
          aria-label="Product quality assurance"
        >
          <div
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-2xl mx-auto border border-green-100"
            title="Quality assurance for herbal supplements"
          >
            <p
              className="text-lg md:text-xl font-semibold text-gray-800 mb-2"
              title="100% natural scientifically proven safe and effective herbal supplements"
            >
              {currentContent.natural}
            </p>
            <p
              className="text-green-600 font-medium"
              title="Premium quality herbal ingredients tested for maximum potency and effectiveness"
            >
              {currentContent.quality}
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default HerbalPowerSection;