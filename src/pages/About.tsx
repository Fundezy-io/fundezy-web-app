import { useAnalytics } from '../hooks/useAnalytics';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  TrophyIcon,
  UserGroupIcon,
  PlayIcon,
  LightBulbIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function About() {
  useAnalytics('About');

  const features = [
    {
      icon: PlayIcon,
      title: 'Learn by Doing',
      description: 'Experience real market dynamics with our virtual money challenges.'
    },
    {
      icon: AcademicCapIcon,
      title: 'Access Expert Resources',
      description: 'Benefit from curated content that guides you from beginner to confident trader.'
    },
    {
      icon: UserGroupIcon,
      title: 'Join a Community',
      description: 'Connect with fellow traders and share insights.'
    },
    {
      icon: TrophyIcon,
      title: 'Prove Your Skills',
      description: 'Track your progress and showcase your trading prowess.'
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Simple Header */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Fundezy
          </h1>
          <div className="w-20 h-1 bg-fundezy-red mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Welcome to Fundezy, where we're transforming trading education. We believe everyone deserves 
            the chance to learn about financial markets risk-free.
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center mb-4">
                <LightBulbIcon className="w-6 h-6 text-fundezy-red mr-3" />
                <span className="text-fundezy-red font-semibold">Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering Future Traders
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We empower aspiring traders with the knowledge and skills to succeed. Through hands-on demo trading, 
                you can practice strategies without risking real money.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <blockquote className="text-lg italic text-gray-700 dark:text-gray-300">
                "Our platform offers accessible, practical trading education through free demo challenges."
              </blockquote>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Fundezy Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Fundezy?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide everything you need to start your trading journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-fundezy-red/20 dark:group-hover:bg-fundezy-red/30 transition-colors">
                  <feature.icon className="w-8 h-8 text-fundezy-red" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Vision: Education First, 
            <span className="text-fundezy-red"> Funding Next</span>
          </h2>
          
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              We're committed to providing a comprehensive learning experience. Our goal is to equip successful 
              traders with the capital and resources to elevate their skills.
            </p>
            <p>
              By proving your abilities on Fundezy, you can earn the opportunity to trade with real funds.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Simple CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a beginner or an experienced trader, Fundezy is your starting point. 
              Join our community today and begin your journey to financial success.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="/pricing" 
                className="inline-flex items-center px-6 py-3 bg-fundezy-red text-white font-semibold rounded-lg hover:bg-fundezy-red-dark transition-colors"
              >
                Start Your Journey
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </a>
            </div>
            
            <p className="mt-8 text-fundezy-red font-semibold">
              Let's redefine trading education together.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}