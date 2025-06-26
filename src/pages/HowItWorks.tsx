import { useAnalytics } from '../hooks/useAnalytics';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CheckCircleIcon, 
  CurrencyDollarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export const HowItWorks = () => {
  useAnalytics('How It Works');

  const steps = [
    {
      name: 'Step 1: Fundezy Challenge',
      description: 'Reach a 10% profit target while following our risk rules.',
      details: [
        'Trade for 30 days',
        'Reach 10% profit target',
        'Maximum 5% daily loss',
        'Maximum 10% total loss',
      ],
      icon: ChartBarIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      stepNumber: '01'
    },
    {
      name: 'Step 2: Verification',
      description: 'Prove your consistency by completing a second phase with a lower profit target.',
      details: [
        'Trade for 60 days',
        'Reach 5% profit target',
        'Same risk management rules',
        'Demonstrate consistent trading',
      ],
      icon: CheckCircleIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      stepNumber: '02'
    },
    {
      name: 'Step 3: Funded Account',
      description: 'Start trading with our capital and keep up to 80% of your profits.',
      details: [
        'Receive funded account',
        'Up to 80% profit split',
        'Scale up to $400,000',
        'Regular payouts',
      ],
      icon: CurrencyDollarIcon,
      color: 'text-fundezy-red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      stepNumber: '03'
    },
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
        staggerChildren: 0.2
      }
    }
  };

  const cardHover = {
    hover: {
      y: -8,
      transition: { duration: 0.3 }
    }
  };




  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Background decoration */}
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center"
        >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h1>
            <div className="w-20 h-1 bg-fundezy-red mx-auto mb-8"></div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {steps.map((step) => (
                <motion.div 
                  key={step.name} 
                  className="relative flex flex-col"
                  variants={fadeInUp}
                  whileHover="hover"
                >
                  {/* Step Number Badge */}
                  {/* <motion.div
                    className={`absolute -top-4 -left-4 w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg`}
                    variants={iconHover}
                  >
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {step.stepNumber}
                    </span>
                  </motion.div> */}


                  <motion.div
                    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 relative z-10"
                    variants={cardHover}
                  >

                    <dt className="text-2xl font-bold leading-7 text-gray-900 dark:text-white mb-4">
                      {step.name}
                    </dt>
                    
                    <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                      <p className="flex-auto mb-6">{step.description}</p>
                      
                      <div className="mt-6">
                        <ul role="list" className="space-y-4">
                          {step.details.map((detail, detailIndex) => (
                            <motion.li 
                              key={detail} 
                              className="flex gap-x-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.1 * detailIndex }}
                            >
                              <motion.svg
                                className="mt-1 h-5 w-5 flex-none text-fundezy-red"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </motion.svg>
                              <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </dd>
                  </motion.div>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of successful traders who have achieved their financial goals with Fundezy.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-fundezy-red text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Challenge
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </motion.a>
              
              <motion.a
                href="/faq"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};