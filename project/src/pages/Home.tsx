import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Users, Globe, Award, TrendingUp } from 'lucide-react';
import ScrollReveal from '../components/Animation/ScrollReveal';
import { products } from '../data/mockData';
import { formatUSDToXAF } from '../utils/currency';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    countries: 0,
    customers: 0,
    products: 0,
    research: 0
  });

  const heroSlides = [
    {
      title: " FISH FEED",
      subtitle: " Advanced Biotechnology",
      description: "Our Fish Feed is experlybalanced with proteins, vitamins,and essentail minerals to support rapid growth.",
      image: "https://i.pinimg.com/1200x/cb/17/1f/cb171f6d4427f5cf1ca135b6e93dee9f.jpg?auto=compress&cs=tinysrgb&w=1920",
      cta: "Discover Solutions"
    },
    {
      title: "Dog Food ",
      subtitle: "For a Better Tomorrow",
      description: "Our formular is consistute with ingredients to promote a shinny coat, strong teeth, and optimal digestion.",
      image: "https://i.pinimg.com/736x/79/a6/9b/79a69b0e2673793453818076d3ca80b2.jpg?auto=compress&cs=tinysrgb&w=1920",
      cta: "Learn More"
    },
    {
      title: "Groundnut Meal",
      subtitle: " Natural Energy",
      description: "A rich source of healthy fats and proteins to energize and susutain animal growth.",
      image: "https://i.pinimg.com/736x/3f/cc/c6/3fccc6c43f46e4bb579557fdf43ca29b.jpg?auto=compress&cs=tinysrgb&w=1920",
      cta: "View Products"
    },
    {
      title: " Soybean Meal",
      subtitle: "Powerhouse for Animal Nutrtion",
      description: "Rich in essentizl amino acid for stronger,healthier, livestock and fish.",
      image: "https://i.pinimg.com/1200x/e5/d5/42/e5d542c1798d527d7dfce0b9911f6f63.jpg?auto=compress&cs=tinysrgb&w=1920",
      cta: "View Products"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animated counter effect
  useEffect(() => {
    const targetStats = { countries: 120, customers: 50000, products: 250, research: 15 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setStats(current => ({
        countries: Math.min(current.countries + Math.ceil(targetStats.countries / steps), targetStats.countries),
        customers: Math.min(current.customers + Math.ceil(targetStats.customers / steps), targetStats.customers),
        products: Math.min(current.products + Math.ceil(targetStats.products / steps), targetStats.products),
        research: Math.min(current.research + Math.ceil(targetStats.research / steps), targetStats.research)
      }));
    }, interval);

    setTimeout(() => clearInterval(timer), duration);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Over 95% customer satisfaction with measurable improvements in crop yields"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 access to agricultural experts and biotechnology specialists"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving farmers and agricultural businesses in over 120 countries"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for innovation and sustainability in agricultural biotechnology"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
              <span className="block text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mt-2">
                {heroSlides[currentSlide].subtitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full font-semibold flex items-center space-x-2 hover:shadow-xl transition-shadow"
                >
                  <span>{heroSlides[currentSlide].cta}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white rounded-full font-semibold flex items-center space-x-2 hover:bg-white hover:text-gray-900 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Watch Video</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2"
                >
                  {stats.countries}+
                </motion.div>
                <p className="text-gray-600">Countries Served</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2"
                >
                  {stats.customers.toLocaleString()}+
                </motion.div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2"
                >
                  {stats.products}+
                </motion.div>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2"
                >
                  {stats.research}+
                </motion.div>
                <p className="text-gray-600">Years Research</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">MAGNUM-LIMA FISH</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're committed to providing innovative biotechnology solutions that drive sustainable agriculture forward.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Products */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Products</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most popular biotechnology solutions trusted by farmers worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 4).map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                          {formatUSDToXAF(product.price)}
                        </span>
                        <Link to={`/products/${product.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
                          >
                            Learn More
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold flex items-center space-x-2 mx-auto hover:shadow-xl transition-shadow"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-r from-green-600 via-green-500 to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Virsion?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Join thousands of farmers worldwide who trust our biotechnology solutions to achieve sustainable, profitable farming.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-green-600 rounded-full font-semibold hover:shadow-xl transition-shadow"
                  >
                    Get Started Today
                  </motion.button>
                </Link>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
                  >
                    Explore Solutions
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default Home;