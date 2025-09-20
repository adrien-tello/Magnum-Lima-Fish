import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck, Package, MapPin, Phone, Info, CheckCircle } from 'lucide-react';
import ScrollReveal from '../components/Animation/ScrollReveal';
import { formatUSDToXAF } from '../utils/currency';

const Delivery: React.FC = () => {
  const shippingTiers = [
    { name: 'Standard', eta: '2–5 business days', priceUsd: 3.5, features: ['Reliable door delivery', 'SMS updates', 'Signature optional'] },
    { name: 'Express', eta: '24–48 hours', priceUsd: 7.5, features: ['Priority handling', 'Real‑time updates', 'Signature required'] },
  ];

  const zones = [
    {
      title: 'Douala & Surroundings',
      areas: 'Bonamoussadi, Akwa, Bonapriso, Deido, PK areas',
      eta: 'Same/Next day (Express)',
      icon: MapPin,
    },
    {
      title: 'National (Cameroon)',
      areas: 'Yaoundé, Bafoussam, Garoua, Bamenda, Limbe, etc.',
      eta: '2–5 business days',
      icon: Truck,
    },
    {
      title: 'Regional & International',
      areas: 'CEMAC region and international on request',
      eta: '3–10 business days',
      icon: Package,
    },
  ];

  const faqs = [
    { q: 'How are delivery fees calculated?', a: 'Fees depend on method (Standard/Express), destination zone, and parcel weight/volume. See indicative prices above; final fees shown at checkout or confirmed by support for bulk orders.' },
    { q: 'Do you provide tracking?', a: 'Yes. We send SMS/WhatsApp updates and provide a tracking reference for Express and most Standard deliveries.' },
    { q: 'What about fragile or temperature‑sensitive items?', a: 'We use appropriate packaging and handling. For special requirements, contact us to arrange controlled delivery.' },
    { q: 'Can I schedule delivery?', a: 'Express supports schedule windows (subject to availability). Mention your preferred slot at checkout or to our team.' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 via-green-500 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Delivery & Logistics</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Fast, reliable delivery across Cameroon with Express options and real‑time updates.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Shipping methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Delivery Methods</h2>
            <p className="text-gray-600">Choose the speed that matches your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shippingTiers.map((tier, idx) => (
              <ScrollReveal key={tier.name} delay={idx * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-semibold text-gray-900">{tier.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {tier.eta}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
                    {formatUSDToXAF(tier.priceUsd)} <span className="text-base font-medium text-gray-500">starting</span>
                  </div>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Coverage Zones</h2>
            <p className="text-gray-600">We deliver nationwide and beyond</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {zones.map((z, idx) => (
              <ScrollReveal key={z.title} delay={idx * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center mb-4">
                    <z.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{z.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{z.areas}</p>
                  <div className="text-sm text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {z.eta}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How Delivery Works</h2>
            <p className="text-gray-600">Four simple steps from order to doorstep</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{
              icon: Package, title: 'Order Placed', desc: 'Choose your products and confirm your address.'
            },{
              icon: ShieldCheck, title: 'Packing & QA', desc: 'Secure packaging and quality check.'
            },{
              icon: Truck, title: 'In Transit', desc: 'Tracked dispatch with live notifications.'
            },{
              icon: MapPin, title: 'Delivered', desc: 'Signature on delivery (Express) and feedback.'
            }].map((s, idx) => (
              <ScrollReveal key={s.title} delay={idx * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center mb-3">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-gray-900">{s.title}</div>
                  <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Help & CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm mb-4">
            <Info className="w-4 h-4" /> Need a custom delivery plan?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bulk orders or special handling</h2>
          <p className="text-lg text-gray-600 mb-8">We’ll design a delivery plan for your location, timeline, and budget.
          </p>
          <a href="/contact">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-xl transition-shadow">
              <Phone className="inline w-5 h-5 mr-2" /> Contact our logistics team
            </motion.button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Delivery;
