import { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlusIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  TrophyIcon,
  StarIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  useAnalytics('Onboarding');



  // Key benefits
  const benefits = [
    {
      icon: AcademicCapIcon,
      title: 'Learn by Doing',
      description: 'Practice with $200,000 virtual capital in real market conditions',
      highlight: 'Risk-Free'
    },
    {
      icon: TrophyIcon,
      title: 'Prove Your Skills',
      description: 'Track progress and showcase strategy for future funding opportunities',
      highlight: 'Path to Funding'
    },
    {
      icon: ChartBarIcon,
      title: 'Real Market Data',
      description: 'Experience authentic trading with live charts and real-time data',
      highlight: 'Authentic Experience'
    }
  ];

  // Getting started steps
  const gettingStartedSteps = [
    {
      id: 1,
      title: 'Create Your Account',
      description: 'Quick signup with Google or email verification',
      icon: UserPlusIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      details: [
        'Sign up with Google (recommended) or email',
        'Verify your account instantly',
        'Join thousands of aspiring traders'
      ],
      action: user ? 'Account Created ✓' : 'Sign Up Free',
      actionLink: user ? null : '/signin?mode=signup',
      completed: !!user,
      timeEstimate: '2 min'
    },
    {
      id: 2,
      title: 'Get $200K Virtual Capital',
      description: 'Activate your free demo account with substantial virtual funds',
      icon: ShieldCheckIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      details: [
        'No credit card required',
        'Instant activation',
        'Full trading capabilities'
      ],
      action: 'Create Demo Account',
      actionLink: '/dashboard',
      timeEstimate: '1 min'
    },
    {
      id: 3,
      title: 'Access Trading Platform',
      description: 'Launch professional trading interface with real market data',
      icon: ChartBarIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      details: [
        'Professional trading tools',
        'Real-time market data',
        'Mobile and desktop access'
      ],
      action: 'Open Platform',
      actionLink: 'https://platform.fundezy.io',
      external: true,
      timeEstimate: '30 sec'
    },
    {
      id: 4,
      title: 'Start Trading & Learning',
      description: 'Execute your first trades and begin your journey to mastery',
      icon: CurrencyDollarIcon,
      color: 'text-fundezy-red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      details: [
        'Practice with major currency pairs',
        'Learn risk management',
        'Track your performance'
      ],
      action: 'Begin Trading',
      actionLink: 'https://platform.fundezy.io',
      external: true,
      timeEstimate: 'Ongoing'
    }
  ];

     // What comes after demo success
   const challengePath = [
     {
       title: 'Evaluation Challenge',
       description: '30 days • 10% profit target',
       reward: 'Prove your skills'
     },
     {
       title: 'Verification Phase',
       description: '60 days • 5% profit target',
       reward: 'Show consistency'
     },
     {
       title: 'Funded Account',
       description: 'Ongoing • Up to 80% profit split',
       reward: 'Trade with capital'
     }
   ];

  // FAQ highlights
  const faqHighlights = [
    {
      id: 1,
      question: 'Is the demo account really free?',
      answer: 'Yes! Completely free with no credit card required. Get instant access to $200,000 virtual capital.'
    },
    {
      id: 2,
      question: 'What happens after I prove my skills?',
      answer: 'Successful demo traders can apply for our funded trading challenges with real capital and profit sharing up to 80%.'
    },
    {
      id: 3,
      question: 'Do I need trading experience?',
      answer: 'No experience required! Our platform is designed for beginners and experts alike, with educational resources to help you learn.'
    },
    {
      id: 4,
      question: 'How quickly can I start trading?',
      answer: 'You can be trading within 5 minutes! Sign up, activate your demo account, and start practicing immediately.'
    }
  ];

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



  const handleStepAction = (step: typeof gettingStartedSteps[0]) => {
    if (step.external && step.actionLink) {
      window.open(step.actionLink, '_blank');
    } else if (step.actionLink) {
      navigate(step.actionLink);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin?mode=signup');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Conversion Focused */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-gray-950 dark:via-gray-900 dark:to-black overflow-hidden">
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

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div 
            className="mx-auto max-w-5xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-fundezy-red/20 border border-fundezy-red/30 rounded-full text-fundezy-red text-sm font-medium mb-6">
                <StarIcon className="w-4 h-4 mr-2" />
                Join Thousands of Aspiring Traders
              </div>
              <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl mb-6">
                Start Trading with
                <span className="text-fundezy-red"> $200,000</span>
                <br />
                <span className="text-fundezy-red">Risk-Free</span>
              </h1>
              <div className="w-24 h-1 bg-fundezy-red mx-auto mb-8"></div>
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Master financial markets with our comprehensive demo trading platform. Practice with virtual capital, 
              learn from experts, and unlock the path to funded trading opportunities.
            </motion.p>

            {/* Primary CTA */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.button
                onClick={handleGetStarted}
                className="bg-fundezy-red px-10 py-5 text-xl font-bold text-white shadow-lg hover:bg-red-600 rounded-xl transition-all duration-300 flex items-center gap-3 min-w-[280px]"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 68, 68, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayIcon className="w-6 h-6" />
                {user ? 'Access Your Account' : 'Start Free Demo'}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg font-semibold text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                See How It Works
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Simple trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="text-center text-gray-300 text-sm max-w-2xl mx-auto"
            >
              $200,000 Virtual Capital • 100% Risk-Free • Available 24/7 • Global Community
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Trust Building */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Fundezy?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join the platform that's revolutionizing trading education with real-world experience
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <motion.div
                    className="bg-fundezy-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-8 h-8 text-fundezy-red" />
                    <div className="absolute -top-2 -right-2 bg-fundezy-red text-white text-xs px-2 py-1 rounded-full">
                      {benefit.highlight}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Getting Started Steps - Main Content */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From signup to your first trade in under 5 minutes. No experience required.
            </p>
          </motion.div>

          <motion.div 
            className="grid gap-6 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {gettingStartedSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${step.bgColor} rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${step.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Step {step.id}: {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {step.timeEstimate}
                        </p>
                      </div>
                    </div>
                    {step.completed && (
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {step.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-fundezy-red mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {step.actionLink && (
                    <button
                      onClick={() => handleStepAction(step)}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        step.completed
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'bg-fundezy-red text-white hover:bg-red-600'
                      }`}
                      disabled={step.completed}
                    >
                      {step.action}
                      {!step.completed && (
                        <ArrowRightIcon className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* What's Next - Challenge Path Preview */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready for Real Capital?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              After mastering demo trading, successful traders can progress to our funded challenge program
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {challengePath.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl text-center relative"
                >
                  <div className="text-3xl font-bold text-fundezy-red mb-2">{index + 1}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {phase.description}
                  </p>
                  <div className="bg-fundezy-red/10 text-fundezy-red px-4 py-2 rounded-full text-sm font-medium">
                    {phase.reward}
                  </div>
                  
                  {index < challengePath.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRightIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                View Challenge Details
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Highlights - Address Objections */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Common Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to know to get started
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqHighlights.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: faq.id * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <QuestionMarkCircleIcon className="w-5 h-5 text-fundezy-red" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === faq.id ? 'auto' : 0,
                    opacity: expandedFaq === faq.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="/faq"
              className="text-fundezy-red hover:text-red-600 font-medium"
            >
              View all frequently asked questions →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section - Multiple Conversion Points */}
      <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-br from-fundezy-red to-red-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl leading-8 text-red-100 mb-12 max-w-3xl mx-auto">
              Join thousands of traders who started their journey with Fundezy. 
              Your $200,000 virtual trading account is waiting.
            </p>
            
            {/* Multiple CTA Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <motion.button
                onClick={handleGetStarted}
                className="bg-white px-10 py-5 text-xl font-bold text-fundezy-red shadow-sm hover:bg-gray-100 rounded-xl transition-all duration-300 flex items-center gap-3 min-w-[280px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayIcon className="w-6 h-6" />
                {user ? 'Access Dashboard' : 'Start Free Demo'}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/pricing')}
                className="bg-transparent border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-fundezy-red rounded-xl transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Challenges
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Social Proof */}
            <motion.div 
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5 min</div>
                <div className="text-red-100 text-sm">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$200K</div>
                <div className="text-red-100 text-sm">Virtual Capital</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-red-100 text-sm">Risk-Free</div>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-red-100 font-semibold text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Happy Trading! - The Fundezy Team
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 