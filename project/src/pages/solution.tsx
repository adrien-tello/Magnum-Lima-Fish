import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, Sprout, Fish, Dog, Droplets, ShieldCheck, ArrowRight, Phone, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/Animation/ScrollReveal';
import { products } from '../data/mockData';

const problemAreas = [
  {
    id: 'fish-farming',
    title: 'Fish Farming Performance',
    icon: Fish,
    description:
      'Slow growth, poor feed conversion, or disease outbreaks in ponds and tanks.',
    tags: ['Growth', 'FCR', 'Health'],
    recommend: ['Fish Feed']
  },
  {
    id: 'dog-nutrition',
    title: 'Dog Nutrition & Health',
    icon: Dog,
    description:
      'Coat dullness, digestive issues, or low energy in working and companion dogs.',
    tags: ['Digestive health', 'Energy', 'Coat'],
    recommend: ['Dog Food']
  },
  {
    id: 'protein-meals',
    title: 'Protein Meal Supply',
    icon: Sprout,
    description:
      'Need reliable, nutrient-dense protein meals to fortify feed formulations.',
    tags: ['Protein', 'Energy'],
    recommend: ['Groundnut Meal', 'Soybean Meal']
  },
  {
    id: 'water-quality',
    title: 'Water Quality & Biosecurity',
    icon: Droplets,
    description:
      'Managing ammonia, oxygen, and pathogens in aquaculture systems.',
    tags: ['Water', 'Biosecurity'],
    recommend: ['Fish Feed']
  }
];

const faq = [
  {
    q: 'How do you recommend products for my specific challenge?',
    a: 'We start with a quick assessment of your current setup and goals. Based on performance gaps and constraints (water, feed, budget), we recommend a tailored combination of products and best-practice protocols.'
  },
  {
    q: 'Can you support large farms and wholesalers?',
    a: 'Yes. We supply at scale and provide logistics coordination, training, and ongoing technical support to ensure sustainable performance.'
  },
  {
    q: 'Do you offer trials or pilots?',
    a: 'We can arrange pilot programs with clear KPIs (growth rate, FCR, health markers). Contact us to scope a trial in your facility.'
  }
];

const Solutions: React.FC = () => {
  const [active, setActive] = useState<string>(problemAreas[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeArea = useMemo(
    () => problemAreas.find((p) => p.id === active)!,
    [active]
  );

  const recommendations = useMemo(() => {
    return products.filter((p) => activeArea.recommend.includes(p.category));
  }, [activeArea]);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 via-green-500 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Tailored Solutions</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Practical, high‑impact recommendations for your toughest nutrition and
                performance challenges.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem areas navigator */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemAreas.map(({ id, title, description, icon: Icon, tags }) => (
              <motion.button
                key={id}
                onClick={() => setActive(id)}
                whileHover={{ y: -4 }}
                className={`text-left p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${
                  active === id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    active === id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{description}</p>
                <div className="flex flex-wrap gap-1">
                  {tags.map((t) => (
                    <span key={t} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended plan */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended Plan</h2>
                <p className="text-gray-600 mb-8">
                  Based on your selection (<span className="font-medium">{activeArea.title}</span>),
                  here’s a practical plan you can start this week.
                </p>
              </ScrollReveal>

              <div className="space-y-4">
                {[
                  {
                    title: 'Assess & Stabilize',
                    points: [
                      'Collect baseline metrics (weight gain, FCR, visible symptoms).',
                      'Stabilize environment (clean water, hygiene, steady feeding schedule).',
                      'Introduce recommended nutrition program gradually over 3–5 days.'
                    ]
                  },
                  {
                    title: 'Optimize Nutrition',
                    points: [
                      'Use category-appropriate feed and protein meals at the advised inclusion rates.',
                      'Monitor daily intake and adjust ration according to growth and weather.',
                      'Record results weekly to spot trends early.'
                    ]
                  },
                  {
                    title: 'Prevent & Protect',
                    points: [
                      'Implement biosecurity routines (quarantine new stock, sanitize tools).',
                      'Keep water parameters within target ranges; test at set intervals.',
                      'Schedule monthly review to fine-tune feed and management.'
                    ]
                  }
                ].map((step, idx) => (
                  <motion.div
                    key={step.title}
                    whileHover={{ y: -3 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
                        {idx + 1}
                      </div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <ul className="space-y-2 ml-11">
                      {step.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 mt-1 text-green-600" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar recommendations */}
            <div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Products</h3>
                <div className="space-y-4">
                  {recommendations.map((prod) => (
                    <div key={prod.id} className="flex gap-3 items-center">
                      <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{prod.name}</div>
                        <div className="text-sm text-gray-600">{prod.category}</div>
                        <div className="text-sm font-semibold text-green-600">${prod.price}</div>
                      </div>
                      <Link to={`/payment?product=${prod.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-sm"
                        >
                          Buy
                        </motion.button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="mt-6 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-2xl p-6">
                <div className="font-semibold mb-2">Talk to a Specialist</div>
                <p className="text-white/90 text-sm mb-4">
                  Get a free 15‑minute consultation to tailor this plan to your farm.
                </p>
                <div className="flex gap-2">
                  <Link to="/contact" className="flex-1">
                    <motion.button whileHover={{ scale: 1.03 }} className="w-full px-4 py-2 bg-white text-green-700 rounded-lg font-semibold">
                      <Phone className="inline w-4 h-4 mr-1" /> Contact Us
                    </motion.button>
                  </Link>
                  <Link to="/contact" className="flex-1">
                    <motion.button whileHover={{ scale: 1.03 }} className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg">
                      <MessageSquare className="inline w-4 h-4 mr-1" /> Chat
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">FAQs</h2>
          <div className="space-y-3">
            {faq.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-gray-900">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-gray-700">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to solve it for good?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Book a free assessment. We’ll deliver a clear plan with expected outcomes and a timeline.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-xl transition-shadow"
              >
                Get My Plan
              </motion.button>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default Solutions;
