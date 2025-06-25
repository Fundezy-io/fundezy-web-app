import { useAnalytics } from '../hooks/useAnalytics';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getChallenges } from '../services/matchTraderService';
import { PricingSection } from '../components/PricingSection';
import { 
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  PlayIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const tiersMap = {
  "26135048-f2ce-48ad-a633-df3646eb48ad": (initialBalance: number, fee: number) => ({
    name: 'Special Challenge',
    id: 'tier-special',
    priceMonthly: fee,
    description: 'Perfect for traders starting with a smaller account.',
    features: [
      `$${initialBalance} funded account`,
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: false,
  }),
  "7cc659d9-04a0-42c0-a946-9eed8ee9ae13": (initialBalance: number, fee: number) => ({
    name: 'Standard Challenge',
    id: 'tier-standard',
    priceMonthly: fee,
    description: 'Ideal for new traders beginning their journey.',
    features: [
      `$${initialBalance} funded account`,
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: false,
  }),
  "fea61522-6f51-4b24-8f79-9836518d59b3": (initialBalance: number, fee: number) => ({
    name: 'Professional Challenge',
    id: 'tier-professional',
    priceMonthly: fee,
    description: 'For skilled traders looking to grow further.',
    features: [
      `$${initialBalance} funded account`,
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: true,
  }),
 "2a965ca0-7612-4fcf-af2a-cc3717858799": (initialBalance: number, fee: number) => ({
    name: 'Enterprise Challenge',
    id: 'tier-enterprise',
    priceMonthly: fee,
    description: 'For advanced traders pursuing greater potential.',
    features: [
      `$${initialBalance} funded account`,
      '10% profit target',
      'Maximum 5% daily drawdown',
      'Maximum 10% total drawdown',
      '30-day trading period',
      'Real-time tracking',
    ],
    featured: false,
  }),
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Data constants
const stats = [
  { number: '$400,000', label: 'Max Funding', icon: BanknotesIcon },
  { number: 'Up to 80%', label: 'Profit Split', icon: ChartBarIcon },
  { number: '24/7', label: 'Platform Uptime', icon: UserGroupIcon },
  { number: '2024', label: 'Platform Launch', icon: CurrencyDollarIcon },
];

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Risk Management',
    description: 'Advanced risk management tools and real-time monitoring to protect your account.',
    color: 'text-blue-500'
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Scale Your Success',
    description: 'Scale your account up to $400,000 as you prove your trading consistency.',
    color: 'text-green-500'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Transparent Pricing',
    description: 'Clear and straightforward pricing with no hidden fees or surprise charges.',
    color: 'text-fundezy-red'
  },
  {
    icon: ChartBarIcon,
    title: 'Performance Tracking',
    description: 'Real-time analytics and detailed reporting to monitor your trading progress.',
    color: 'text-purple-500'
  },
];

const tradingBenefits = [
  'Trade with up to $400,000 funded account',
  'Keep up to 80% of your profits',
  'Advanced trading platform access',
  'Real-time performance tracking',
  'Scale your account as you prove consistency',
  'Multiple asset classes available',
  'Clear drawdown and profit targets',
  'Transparent challenge requirements'
];

const platformFeatures = [
  {
    title: 'Advanced Technology',
    description: 'Built with modern web technologies for optimal performance and security.',
    icon: ArrowTrendingUpIcon,
    details: 'React, TypeScript, and real-time data processing'
  },
  {
    title: 'Transparent Rules',
    description: 'Clear, straightforward trading rules with no hidden conditions or surprises.',
    icon: CheckCircleIcon,
    details: 'All terms clearly defined and easily accessible'
  },
  {
    title: 'Secure Platform',
    description: 'Enterprise-grade security measures to protect your data and trading activity.',
    icon: ShieldCheckIcon,
    details: 'SSL encryption and secure authentication'
  }
];

// Hero Section Component
const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-gray-950 dark:via-gray-900 dark:to-black">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-gradient-to-r from-fundezy-red/10 to-purple-600/10 dark:from-fundezy-red/5 dark:to-purple-600/5"></div>
    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
    
    {/* Floating Elements */}
    <motion.div 
      className="absolute top-20 left-10 w-20 h-20 bg-fundezy-red/20 rounded-full blur-xl"
      animate={{ 
        y: [-20, 20, -20],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    ></motion.div>
    <motion.div 
      className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
      animate={{ 
        y: [20, -20, 20],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{ 
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    ></motion.div>

    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <motion.div 
        className="mx-auto max-w-4xl text-center"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Trust Badge */}
        <motion.div
          variants={fadeInUp}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-full border border-fundezy-red/20">
            <ShieldCheckIcon className="w-4 h-4 text-fundezy-red mr-2" />
            <span className="text-sm font-medium text-fundezy-red">Secure & Transparent Trading Platform</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl font-bold tracking-tight text-white sm:text-7xl"
        >
          Trade with Our Capital,
          <span className="block bg-gradient-to-r from-fundezy-red to-red-400 bg-clip-text text-transparent">
            Keep Your Profits
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={fadeInUp}
          className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
        >
          Join the elite community of funded traders. Prove your skills, get funded up to $400,000, 
          and keep up to 80% of your profits. Start your journey to financial freedom today.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={fadeInUp}
          className="mt-10 flex items-center justify-center gap-x-6 flex-wrap"
        >
          <motion.a 
            href="/pricing" 
            className="bg-fundezy-red px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-red-600 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Challenge
          </motion.a>
          <motion.a 
            href="/how-it-works"
            className="text-lg font-semibold leading-6 text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-2"
            whileHover={{ x: 5 }}
          >
            <PlayIcon className="w-5 h-5" />
            Watch Demo
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Stats Section Component
const StatsSection = () => (
  <section className="py-24 bg-white dark:bg-gray-900">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
          Trusted by Traders Worldwide
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Join thousands of successful traders who have achieved their financial goals
        </p>
      </motion.div>
      
      <motion.div 
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-lg mb-4">
              <stat.icon className="w-6 h-6 text-fundezy-red" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-google-gray dark:text-white">
              {stat.number}
            </div>
            <div className="text-sm leading-6 text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Features Section Component
const FeaturesSection = () => (
  <section className="py-24 bg-gray-50 dark:bg-gray-800">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
          Why Choose Fundezy?
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Everything you need to maximize your trading potential
        </p>
      </motion.div>
      
      <motion.div 
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={fadeInUp}
            className="flex flex-col justify-between bg-white dark:bg-gray-700 p-8 shadow-lg rounded-2xl"
          >
            <div>
              <div className="flex items-center justify-center w-12 h-12 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-lg mb-6">
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-google-gray dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-lg leading-8 text-google-gray dark:text-gray-200">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Trading Benefits Section Component
const TradingBenefitsSection = () => (
  <section className="py-24 bg-white dark:bg-gray-900">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
          Trading Benefits
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Everything you need to maximize your trading potential
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {tradingBenefits.map((benefit) => (
          <motion.div 
            key={benefit}
            variants={fadeInUp}
            className="flex items-start gap-x-3 p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <CheckCircleIcon className="h-6 w-6 flex-none text-fundezy-red mt-0.5" />
            <span className="text-base leading-7 text-google-gray dark:text-gray-200">{benefit}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Pricing Section Component
const PricingSectionComponent = ({ tiers }: { tiers: any[] }) => (
  <PricingSection 
    tiers={tiers}
    title="Choose Your Challenge"
    description="Select the funding level that matches your trading goals"
    showPopularBadge={true}
  />
);

// Platform Features Section Component
const PlatformFeaturesSection = () => (
  <section className="py-24 bg-gray-50 dark:bg-gray-800">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
          Built for Modern Trading
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Our platform combines cutting-edge technology with transparent operations
        </p>
      </motion.div>
      
      <motion.div 
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {platformFeatures.map((feature) => (
          <motion.div
            key={feature.title}
            variants={fadeInUp}
            className="flex flex-col justify-between bg-white dark:bg-gray-700 p-8 shadow-lg rounded-2xl"
          >
            <div>
              <div className="flex items-center justify-center w-12 h-12 bg-fundezy-red/10 dark:bg-fundezy-red/20 rounded-lg mb-6">
                <feature.icon className="w-6 h-6 text-fundezy-red" />
              </div>
              <h3 className="text-xl font-semibold text-google-gray dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-lg leading-8 text-google-gray dark:text-gray-200 mb-4">
                {feature.description}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.details}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// CTA Section Component
const CTASection = () => (
  <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-br from-fundezy-red to-red-600">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative mx-auto max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Start Your Funded Trading Journey?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
          Start your journey with our transparent trading platform designed for serious traders seeking capital.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <motion.a
            href="/pricing"
            className="bg-white px-8 py-4 text-lg font-semibold text-fundezy-red shadow-sm hover:bg-gray-100 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Challenge Now
          </motion.a>
          <motion.a
            href="/how-it-works"
            className="text-lg font-semibold leading-6 text-white hover:text-red-100 transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            Learn more <span aria-hidden="true">→</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  </section>
);

// Main Home Component
export const Home = () => {
  useAnalytics('Home');
  const [tiers, setTiers] = useState<any[]>([]);

  const fetchChallenges = async () => {
    const challenges = await getChallenges();
    const activeChallenges = challenges.filter((c) => c.isHidden === false);
    console.log(activeChallenges);
    setTiers(activeChallenges.sort((a, b) => a.fee - b.fee).map((c) => {
      const tierFunction = tiersMap[c.challengeId as keyof typeof tiersMap];
      return tierFunction ? tierFunction(c.phases[0].initialBalance, c.fee) : null;
    }).filter((t) => t != null));
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="relative isolate overflow-hidden">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TradingBenefitsSection />
      <PricingSectionComponent tiers={tiers} />
      <PlatformFeaturesSection />
      <CTASection />
    </div>
  );
};