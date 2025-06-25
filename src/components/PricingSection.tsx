import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Tier {
  name: string;
  id: string;
  priceMonthly: number;
  description: string;
  features: string[];
  featured: boolean;
}

interface PricingSectionProps {
  tiers: Tier[];
  title?: string;
  subtitle?: string;
  description?: string;
  onGetStarted?: (tier: Tier) => void;
  showPopularBadge?: boolean;
  className?: string;
}

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

export const PricingSection = ({ 
  tiers, 
  title = "Choose Your Challenge",
  subtitle = "Pricing",
  description = "Select the funding level that matches your trading goals",
  onGetStarted,
  showPopularBadge = true,
  className = ""
}: PricingSectionProps) => {
  console.log('PricingSection received tiers:', tiers);
  console.log('Tiers length:', tiers?.length);
  
  return (
    <section className={`py-24 bg-white dark:bg-gray-900 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          {subtitle && subtitle !== "" && (
            <h2 className="text-base font-semibold leading-7 text-fundezy-red">{subtitle}</h2>
          )}
          {title && title !== "" && (<h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
            {title}
          </h2>)}
          {description && description !== "" && (<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {description}
          </p>)}
        </motion.div>
        
        {tiers && tiers.length > 0 ? (
          <motion.div 
            className="mx-auto mt-16 grid max-w-7xl grid-cols-1 items-center gap-y-6 sm:mt-16 sm:gap-y-0 lg:max-w-none lg:grid-cols-4 lg:gap-x-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                variants={fadeInUp}
                className={`relative rounded-3xl p-8 shadow-2xl ring-1 ${
                  tier.featured 
                    ? 'bg-fundezy-red text-white ring-fundezy-red scale-105 lg:scale-110' 
                    : 'bg-white dark:bg-gray-800 text-google-gray dark:text-white ring-gray-200 dark:ring-gray-700'
                } ${index === 1 ? 'lg:z-10' : ''}`}
              >
                {tier.featured && showPopularBadge && (
                  <p className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-sm font-medium text-white text-center">
                    Most Popular
                  </p>
                )}
                <div className="text-center">
                  <h3 className={`text-lg font-semibold leading-8 ${tier.featured ? 'text-white' : 'text-google-gray dark:text-white'}`}>
                    {tier.name}
                  </h3>
                  <p className={`mt-4 text-sm leading-6 ${tier.featured ? 'text-red-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    {tier.description}
                  </p>
                  <p className={`mt-6 flex items-baseline justify-center gap-x-2`}>
                    <span className={`text-4xl font-bold tracking-tight ${tier.featured ? 'text-white' : 'text-google-gray dark:text-white'}`}>
                      ${tier.priceMonthly}
                    </span>
                  </p>
                  <p className={`mt-2 text-lg font-semibold ${tier.featured ? 'text-red-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    per challenge
                  </p>
                </div>
                <ul className={`mt-8 space-y-3 text-sm leading-6 ${tier.featured ? 'text-red-100' : 'text-gray-600 dark:text-gray-300'}`}>
                  {tier.features.map((feature: string) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon className={`h-6 w-5 flex-none ${tier.featured ? 'text-white' : 'text-fundezy-red'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                {onGetStarted ? (
                  <motion.button
                    onClick={() => onGetStarted(tier)}
                    className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 ${
                      tier.featured
                        ? 'bg-white text-fundezy-red hover:bg-gray-100 focus-visible:outline-white'
                        : 'bg-fundezy-red text-white shadow-sm hover:bg-red-600 focus-visible:outline-fundezy-red'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                ) : (
                  <motion.a
                    href="/pricing"
                    className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 ${
                      tier.featured
                        ? 'bg-white text-fundezy-red hover:bg-gray-100 focus-visible:outline-white'
                        : 'bg-fundezy-red text-white shadow-sm hover:bg-red-600 focus-visible:outline-fundezy-red'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No pricing tiers available
            </p>
          </div>
        )}
      </div>
    </section>
  );
}; 