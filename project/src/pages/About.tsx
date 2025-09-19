import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Globe, Award, Lightbulb, Heart } from 'lucide-react';
import ScrollReveal from '../components/Animation/ScrollReveal';

const About: React.FC = () => {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Executive Officer',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '15+ years in biotechnology leadership'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head of Research',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'PhD in Agricultural Sciences, 50+ publications'
    },
    {
      name: 'Emma Rodriguez',
      role: 'VP of Operations',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Global operations expert, MBA from Stanford'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '20+ years in agricultural technology innovation'
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously pushing the boundaries of agricultural biotechnology to create groundbreaking solutions.'
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Committed to developing environmentally responsible products that protect our planet for future generations.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Building strong relationships with farmers, researchers, and communities worldwide.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Maintaining the highest standards in research, development, and customer service.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-600 via-green-500 to-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <ScrollReveal>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About MAGNUM-LIMA FISH </h1>
              <p className="text-xl max-w-3xl opacity-90">
                Pioneering sustainable farming solutions through innovative biotechnology since 2009.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Section */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Mission</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  To revolutionize agriculture through innovative biotechnology solutions that increase crop yields, 
                  reduce environmental impact, and ensure food security for a growing global population.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe that science and nature can work together to create sustainable farming practices 
                  that benefit both farmers and the environment.
                </p>
              </div>
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Mission"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Making a Global Impact
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our innovative solutions have transformed agriculture worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Globe, label: 'Countries Served', value: '120+' },
                { icon: Users, label: 'Happy Customers', value: '50,000+' },
                { icon: Target, label: 'Success Rate', value: '95%' },
                { icon: Award, label: 'Awards Won', value: '25+' }
              ].map((stat, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="text-center bg-white rounded-2xl p-8 shadow-lg"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2">
                      {stat.value}
                    </div>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Values Section */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Team Section */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the experts driving innovation in agricultural biotechnology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="aspect-w-1 aspect-h-1">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Global Reach */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Presence</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Serving farmers and agricultural businesses across six continents
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Americas</h3>
                  <p className="opacity-90">North & South America operations spanning 25 countries</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">Europe & Africa</h3>
                  <p className="opacity-90">Established presence in 45 European and African nations</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">Asia Pacific</h3>
                  <p className="opacity-90">Growing market reach across 50 Asia Pacific countries</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default About;