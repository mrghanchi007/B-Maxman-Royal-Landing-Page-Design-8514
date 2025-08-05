import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import './App.css';
import { englishContent, urduContent } from './translations';
import CookieConsent from './components/CookieConsent';

// Lazy-loaded components
const TestimonialSlider = lazy(() => import('./components/TestimonialSlider'));
const BeforeAfterSlider = lazy(() => import('./components/BeforeAfterSlider'));
const VideoSection = lazy(() => import('./components/VideoSection'));

const { FiPhone, FiShoppingCart, FiCheck, FiStar, FiShield, FiTruck, FiClock, FiHeart, FiZap, FiAward, FiGlobe, FiChevronUp } = FiIcons;

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-red-200 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-red-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-red-200 rounded"></div>
          <div className="h-4 bg-red-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    quantity: '1'
  });
  const [language, setLanguage] = useState('en'); // 'en' for English, 'ur' for Urdu
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Get content based on selected language
  const content = language === 'en' ? englishContent : urduContent;

  useEffect(() => {
    // Check if cookies are accepted
    const consent = localStorage.getItem('cookie_consent') === 'true';
    setCookiesAccepted(consent);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide back to top button
      setShowScrollTop(currentScrollY > 500);

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I want to order B-Maxman Royal Special Treatment
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
City: ${formData.city}
Quantity: ${formData.quantity} bottle(s)
Total: Rs ${calculatePrice(formData.quantity)}/-

Please confirm my order. Thank you!`;

    const whatsappUrl = `https://wa.me/923328888935?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const calculatePrice = (quantity) => {
    const qty = parseInt(quantity);
    if (qty === 1) return 2300;
    if (qty === 2) return 4500;
    if (qty === 3) return 6000;
    return qty * 2300; // fallback for other quantities
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Ahmed K.",
      age: 42,
      text: "After 3 weeks of using B-Maxman, my energy levels and confidence have completely transformed. My wife has noticed the difference too!",
      rating: 5,
      location: "Karachi"
    },
    {
      id: 2,
      name: "Fahad M.",
      age: 38,
      text: "I tried many products before, but B-Maxman is the only one that actually delivered results. Highly recommended for any man over 35.",
      rating: 5,
      location: "Lahore"
    },
    {
      id: 3,
      name: "Usman R.",
      age: 45,
      text: "The natural ingredients made me feel comfortable trying it. After 2 months, I feel like I'm in my 20s again. Thank you!",
      rating: 5,
      location: "Islamabad"
    }
  ];

  // This function determines if a section should be displayed in Urdu
  const shouldShowInUrdu = (sectionName) => {
    const urduSections = ['problems', 'ingredients', 'benefits', 'usage'];
    return language === 'ur' && urduSections.includes(sectionName);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 ${shouldShowInUrdu('all') ? 'font-urdu' : ''}`}>
      {/* Header - Updated to white and auto-hide on scroll down */}
      <motion.header 
        className={`bg-white text-red-600 py-3 sticky top-0 z-50 shadow-lg transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://i.ibb.co/N2frfSL/Logo.png" 
              alt="B-Maxman Logo" 
              className="h-10 w-auto rounded" 
              width="40" 
              height="40" 
              loading="eager"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition-colors"
              aria-label={`Switch to ${language === 'en' ? 'Urdu' : 'English'} language`}
            >
              <SafeIcon icon={FiGlobe} className="text-sm" />
              <span className="text-sm">{language === 'en' ? 'اردو' : 'English'}</span>
            </button>
            <a 
              href="tel:923328888935" 
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
              aria-label="Call us"
            >
              <SafeIcon icon={FiPhone} />
              <span className="hidden sm:inline">0332-8888935</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Optimized */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden relative">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <motion.div className="lg:w-1/2" {...fadeInUp}>
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiAward} className="text-yellow-400 text-2xl" />
                <span className="bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                  {content.hero.badge}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-yellow-400">B-Maxman</span> {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-red-100">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-lg">
                {content.hero.features.map((feature, index) => (
                  <span key={index} className="bg-white/20 px-4 py-2 rounded-full">{feature}</span>
                ))}
              </div>
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon key={i} icon={FiStar} className="text-yellow-400 text-2xl fill-current" />
                ))}
                <span className="ml-2 text-lg">{content.hero.trusted}</span>
              </div>
              <motion.div 
                className="bg-white/10 p-6 rounded-lg border border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                  {content.hero.specialPrice}: Rs 2,300/-
                </p>
                <p className="text-red-100">{content.hero.delivery}</p>
                <motion.button
                  onClick={() => document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' })}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-3 text-lg transition-colors w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <SafeIcon icon={FiShoppingCart} className="text-xl" />
                  <span>Order Now</span>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Hero graphic with abstract shapes */}
                <div className="relative mx-auto max-w-md">
                  {/* Decorative elements */}
                  <motion.div 
                    className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-30 blur-xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-400 rounded-full opacity-30 blur-xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Main content card */}
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">Royal Special Formula</h3>
                      <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    </div>
                    
                    {/* Feature highlights */}
                    <div className="space-y-4">
                      {[
                        "100% Natural Herbal Formula",
                        "15+ Premium Ingredients",
                        "Clinically Tested & Safe",
                        "Trusted by 50,000+ Men",
                        "30-Day Satisfaction Guarantee"
                      ].map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.5 }}
                        >
                          <div className="bg-green-500 p-1 rounded-full">
                            <SafeIcon icon={FiCheck} className="text-white" />
                          </div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Animated seal */}
                    <motion.div 
                      className="mt-8 bg-yellow-400 text-red-800 w-32 h-32 rounded-full flex items-center justify-center text-center p-4 font-bold mx-auto border-4 border-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      PREMIUM QUALITY GUARANTEED
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section 
        className={`py-12 md:py-16 bg-gray-50 ${shouldShowInUrdu('problems') ? 'font-urdu' : ''}`}
        dir={shouldShowInUrdu('problems') ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {content.problems.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.problems.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.problems.list.map((problem, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiZap} className="text-red-500 text-xl flex-shrink-0" />
                  <p className="font-semibold text-gray-800">{problem}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-2xl font-bold text-red-600">{content.problems.solution}</p>
          </motion.div>
        </div>
      </section>

      {/* Video Section - Lazy Loaded with Cookie Consent */}
      <Suspense fallback={<LoadingFallback />}>
        <VideoSection videoId="H0YHpL-aDck" />
      </Suspense>

      {/* Before & After Results - Always in English - Lazy Loaded */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {englishContent.beforeAfter.title}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {englishContent.beforeAfter.subtitle}
            </p>
          </motion.div>
          <Suspense fallback={<LoadingFallback />}>
            <BeforeAfterSlider />
          </Suspense>
        </div>
      </section>

      {/* Ingredients Section */}
      <section 
        className={`py-12 md:py-16 bg-white ${shouldShowInUrdu('ingredients') ? 'font-urdu' : ''}`}
        dir={shouldShowInUrdu('ingredients') ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {content.ingredients.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.ingredients.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.ingredients.list.map((ingredient, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-bold text-green-800 mb-2">{ingredient.name}</h3>
                <p className="text-green-700">{ingredient.benefit}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-8 bg-green-100 p-6 rounded-lg"
            {...fadeInUp}
          >
            <p className="text-xl font-bold text-green-800">{content.ingredients.natural}</p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        className={`py-12 md:py-16 bg-gradient-to-r from-blue-50 to-indigo-50 ${shouldShowInUrdu('benefits') ? 'font-urdu' : ''}`}
        dir={shouldShowInUrdu('benefits') ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {content.benefits.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.benefits.list.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`flex items-start ${shouldShowInUrdu('benefits') ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <SafeIcon icon={FiCheck} className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <p className="font-semibold text-gray-800">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Always in English - Lazy Loaded */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {englishContent.testimonials.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {englishContent.testimonials.subtitle}
            </p>
          </motion.div>
          <Suspense fallback={<LoadingFallback />}>
            <TestimonialSlider testimonials={testimonials} />
          </Suspense>
        </div>
      </section>

      {/* Usage Instructions */}
      <section 
        className={`py-12 md:py-16 bg-yellow-50 ${shouldShowInUrdu('usage') ? 'font-urdu' : ''}`}
        dir={shouldShowInUrdu('usage') ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
              {content.usage.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <SafeIcon icon={FiClock} className="text-4xl text-yellow-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{content.usage.dosage.title}</h3>
                <p>{content.usage.dosage.text}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <SafeIcon icon={FiShield} className="text-4xl text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{content.usage.course.title}</h3>
                <p>{content.usage.course.text}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <SafeIcon icon={FiHeart} className="text-4xl text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{content.usage.best.title}</h3>
                <p>{content.usage.best.text}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {content.pricing.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content.pricing.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* 1 Month Pack */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-red-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">{content.pricing.packages[0].title}</h3>
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-gray-800 mb-4">
                  Rs 2,300<span className="text-lg text-gray-500">/-</span>
                </div>
                <ul className="mb-6 text-left space-y-2">
                  {content.pricing.packages[0].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <SafeIcon icon={FiCheck} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 2 Month Pack */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-shadow transform md:-translate-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-red-700 p-4 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-red-800 text-xs font-bold px-2 py-1 transform rotate-0 translate-x-0 -translate-y-0">
                  {content.pricing.popular}
                </div>
                <h3 className="text-xl font-bold">{content.pricing.packages[1].title}</h3>
              </div>
              <div className="p-6 text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="text-4xl font-bold text-gray-800">
                    Rs 4,500<span className="text-lg text-gray-500">/-</span>
                  </div>
                  <div className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {content.pricing.save} 100
                  </div>
                </div>
                <ul className="mb-6 text-left space-y-2">
                  {content.pricing.packages[1].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <SafeIcon icon={FiCheck} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 3 Month Pack */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-red-600 p-4 text-white text-center">
                <h3 className="text-xl font-bold">{content.pricing.packages[2].title}</h3>
              </div>
              <div className="p-6 text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="text-4xl font-bold text-gray-800">
                    Rs 6,000<span className="text-lg text-gray-500">/-</span>
                  </div>
                  <div className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {content.pricing.save} 900
                  </div>
                </div>
                <ul className="mb-6 text-left space-y-2">
                  {content.pricing.packages[2].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <SafeIcon icon={FiCheck} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-2xl mx-auto" {...fadeInUp}>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.orderForm.title}</h2>
              <p className="text-xl text-red-100">{content.orderForm.subtitle}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="grid gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">{content.orderForm.name} *</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder={content.orderForm.namePlaceholder}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">{content.orderForm.phone} *</label>
                  <input 
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="03XX-XXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold mb-2">{content.orderForm.address} *</label>
                  <textarea 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder={content.orderForm.addressPlaceholder}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold mb-2">{content.orderForm.city} *</label>
                  <input 
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder={content.orderForm.cityPlaceholder}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold mb-2">{content.orderForm.quantity}</label>
                  <select 
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                  >
                    <option value="1">{content.orderForm.quantityOptions[0]}</option>
                    <option value="2">{content.orderForm.quantityOptions[1]}</option>
                    <option value="3">{content.orderForm.quantityOptions[2]}</option>
                  </select>
                </div>

                <div className="bg-yellow-400 text-red-800 p-4 rounded-lg text-center">
                  <p className="font-bold text-lg">
                    {content.orderForm.total}: Rs {calculatePrice(formData.quantity)}/-
                  </p>
                  <p className="text-sm">{content.orderForm.freeDelivery}</p>
                </div>

                <motion.button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 text-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <SafeIcon icon={FiShoppingCart} className="text-xl" />
                  <span>{content.orderForm.orderButton}</span>
                </motion.button>

                <div className="text-center text-red-100">
                  <p className="flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiTruck} />
                    <span>{content.orderForm.sameDayDelivery}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Updated to keep company name in English */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <img 
              src="https://i.ibb.co/5hQVVLg/Logo-1.png" 
              alt="The Planner Herbal International"
              className="h-12 mx-auto mb-2"
              width="120"
              height="48"
              loading="lazy"
            />
            <h3 className="text-xl">The Planner Herbal International (TPH Int.)</h3>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <a 
              href="tel:923328888935" 
              className="flex items-center space-x-2 text-lg hover:text-yellow-400 transition-colors"
            >
              <SafeIcon icon={FiPhone} />
              <span>📞 0332-8888935</span>
            </a>
            <a 
              href="https://www.tphint.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg hover:text-yellow-400 transition-colors"
            >
              🌐 www.tphint.com
            </a>
          </div>
          <p className="mt-4 text-gray-400">
            © 2024 B-Maxman Royal Special Treatment. {content.footer.rights}
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
            aria-label="Back to top"
          >
            <SafeIcon icon={FiChevronUp} className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}

export default App;