import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    id: 1,
    category: 'General Questions',
    question: 'What is Fundezy.io?',
    answer: 'Fundezy.io is a platform designed to help individuals and teams access funding opportunities quickly and efficiently.'
  },
  {
    id: 2,
    category: 'General Questions',
    question: 'Who can use Fundezy.io?',
    answer: 'Anyone looking for funding opportunities, including students, researchers, and entrepreneurs, can use Fundezy.io.'
  },

  // Account and Verification
  {
    id: 4,
    category: 'Account and Verification',
    question: 'How do I create an account?',
    answer: 'Simply sign up using your email address and follow the instructions to verify your account.'
  },
  {
    id: 5,
    category: 'Account and Verification',
    question: 'Do I need to verify my identity?',
    answer: 'Yes, identity verification is required to ensure a secure and trustworthy platform.'
  },

  // Challenge Overview
  {
    id: 10,
    category: 'Challenge Overview',
    question: 'What is the Fundezy Challenge?',
    answer: 'The Fundezy Challenge is a three-step evaluation process designed to assess and fund traders. Participants must meet profit targets and adhere to strict risk management rules to qualify for a funded account.'
  },
  {
    id: 11,
    category: 'Challenge Overview',
    question: 'What are the steps in the Fundezy Challenge?',
    answer: (
      <>
        <p>The Fundezy Challenge consists of three steps:</p>
        <ol className="list-decimal ml-6 mt-2">
          <li>Evaluation – Trade for 30 days, reach a 10% profit target, and follow risk management rules (maximum 5% daily loss and 10% total loss).</li>
          <li>Verification – Trade for 60 days, reach a 5% profit target, and demonstrate consistent trading while following the same risk management rules.</li>
          <li>Funded Account – Start trading with Fundezy's capital, keep up to 80% of profits, and scale up to $200,000.</li>
        </ol>
      </>
    )
  },

  // Rules and Requirements
  {
    id: 12,
    category: 'Rules and Requirements',
    question: 'What happens if I fail to meet the profit target in Step 1 or Step 2?',
    answer: 'If you fail to meet the profit target within the specified time, you will not pass the challenge. You can restart the challenge by reapplying.'
  },
  {
    id: 13,
    category: 'Rules and Requirements',
    question: 'What happens if I exceed the 5% daily loss or 10% total loss limits?',
    answer: 'Exceeding either the daily or total loss limits will result in immediate disqualification from the challenge.'
  },
  {
    id: 14,
    category: 'Rules and Requirements',
    question: 'Can I use any trading strategy?',
    answer: 'Yes, you are free to use any trading strategy as long as it adheres to the risk management rules.'
  },

  // Trading and Profit Details
  {
    id: 15,
    category: 'Trading and Profit Details',
    question: 'How is the profit target calculated?',
    answer: 'The profit target is calculated based on the initial account balance provided at the start of the challenge.'
  },
  {
    id: 16,
    category: 'Trading and Profit Details',
    question: 'How is the profit split calculated in the funded account phase?',
    answer: 'In the funded account phase, you will keep up to 80% of the profits you generate. The exact percentage will depend on the agreement with Fundezy.'
  },
  {
    id: 17,
    category: 'Trading and Profit Details',
    question: 'Can I scale up to $200,000 immediately after Step 3?',
    answer: 'Scaling up to $200,000 is a gradual process based on your performance and consistency. You will need to meet specific milestones to increase your account size.'
  },

  // Support and Assistance
  {
    id: 18,
    category: 'Support and Assistance',
    question: 'Who can I contact for support?',
    answer: 'You can reach out to our support team via email for assistance.'
  },
  {
    id: 19,
    category: 'Support and Assistance',
    question: 'Where can I find more information?',
    answer: 'Visit our Help Center or FAQ section for detailed guides and answers.'
  },

  // Other Questions
  {
    id: 20,
    category: 'Other Questions',
    question: 'Is Fundezy.io available globally?',
    answer: 'Yes, Fundezy.io is accessible to users worldwide.'
  },
  {
    id: 21,
    category: 'Other Questions',
    question: 'Can I withdraw funds directly?',
    answer: 'Yes, once your funding is approved, you will receive instructions on how to access the funds.'
  },
  {
    id: 22,
    category: 'Other Questions',
    question: 'Are there any restrictions on how I use the funds?',
    answer: 'Some funding options may have specific terms and conditions. Please review them carefully before applying.'
  }
];

const categoryIcons = {
  'General Questions': QuestionMarkCircleIcon,
  'Account and Verification': UserGroupIcon,
  'Challenge Overview': DocumentTextIcon,
  'Rules and Requirements': CogIcon,
  'Trading and Profit Details': ChatBubbleLeftRightIcon,
  'Support and Assistance': ChatBubbleLeftRightIcon,
  'Other Questions': QuestionMarkCircleIcon,
};

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? 
      <span key={i} className="bg-yellow-500 text-black">{part}</span> : 
      part
  );
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

const searchContainer = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const categoryButton = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.05, y: -2 },
  tap: { scale: 0.95 }
};

const faqItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  hover: { y: -2 }
};

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const categories = ['All', ...new Set(faqData.map(faq => faq.category))];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderAnswer = (answer: string | React.ReactNode) => {
    if (typeof answer === 'string') {
      return highlightText(answer, searchQuery);
    }
    return answer;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white py-20">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:60px_60px]"></div>
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              How can we help you?
            </motion.h1>


            <div className="w-20 h-1 bg-fundezy-red mx-auto mb-8"></div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Find answers to frequently asked questions about Fundezy's investment platform.
            </motion.p>
            
            <motion.div 
              variants={searchContainer}
              className="max-w-2xl mx-auto relative"
            >
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-12 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-fundezy-red border border-gray-200 dark:border-gray-700 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <motion.div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  animate={{ 
                    scale: searchQuery ? 1.1 : 1,
                    color: searchQuery ? '#ef4444' : '#9ca3af'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Buttons */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {categories.map((category) => {
            const IconComponent = category === 'All' ? QuestionMarkCircleIcon : categoryIcons[category as keyof typeof categoryIcons];
            return (
              <motion.button
                key={category}
                variants={categoryButton}
                whileHover="hover"
                whileTap="tap"
                className={`px-6 py-3 rounded-full transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === category
                    ? 'bg-fundezy-red text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                <IconComponent className="w-4 h-4" />
                {category}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredFAQs.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      variants={faqItem}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      whileHover="hover"
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="mb-4"
                    >
                      <motion.div
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300"
                        onClick={() => toggleFAQ(faq.id)}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-6 flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                            {highlightText(faq.question, searchQuery)}
                          </h3>
                          <motion.svg
                            className="w-6 h-6 text-gray-400 flex-shrink-0"
                            animate={{ 
                              rotate: expandedItems.includes(faq.id) ? 180 : 0,
                              color: expandedItems.includes(faq.id) ? '#ef4444' : '#9ca3af'
                            }}
                            transition={{ duration: 0.3 }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </div>
                        <AnimatePresence>
                          {expandedItems.includes(faq.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                                {renderAnswer(faq.answer)}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <QuestionMarkCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search terms or browse all categories.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <motion.a
              href="mailto:support@fundezy.io"
              className="inline-flex items-center px-8 py-4 bg-fundezy-red text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ; 