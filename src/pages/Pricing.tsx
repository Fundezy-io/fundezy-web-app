import { useEffect, useState } from 'react';
import { WaitingListModal } from '../components/WaitingListModal';
import { useAnalytics } from '../hooks/useAnalytics';
import { getAccountByEmail, getChallenges } from '../services/matchTraderService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isUniversityEmail } from '../utils/domainCheck';
import { UniversityDomainPopup } from '../components/UniversityDomainPopup';
import { PricingSection } from '../components/PricingSection';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

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

export default function Pricing() {
  const { user } = useAuth();
  const [tiers, setTiers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWaitingListOpen, setIsWaitingListOpen] = useState(false);
  const [showUniversityPopup, setShowUniversityPopup] = useState(false);
  useAnalytics('Pricing');
  const navigate = useNavigate();

  const fetchChallenges = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const challenges = await getChallenges();
      console.log('Raw challenges:', challenges);
      
      const activeChallenges = challenges.filter((c) => c.isHidden === false);
      console.log('Active challenges:', activeChallenges);
      
      const processedTiers = activeChallenges.sort((a, b) => a.fee - b.fee).map((c) => {
        console.log('Processing challenge:', c);
        const tierFunction = tiersMap[c.challengeId as keyof typeof tiersMap];
        if (!tierFunction) {
          console.warn(`No tier function found for challengeId: ${c.challengeId}`);
          return null;
        }
        const tier = tierFunction(c.phases[0].initialBalance, c.fee);
        console.log('Generated tier:', tier);
        return tier;
      }).filter((t) => t != null);
      
      console.log('Final processed tiers:', processedTiers);
      setTiers(processedTiers);
    } catch (err) {
      console.error('Error fetching challenges:', err);
      setError('Failed to load pricing data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };


  const handleGetStarted = async () => {
    if (user?.email && isUniversityEmail(user.email)) {
      setShowUniversityPopup(true);
      return;
    }

    if (!user) {
      navigate('/signin');
      return;
    }

    if (!user.email) {
      console.error('User email is missing');
      navigate('/signin');
      return;
    }

    try {
      // Check if user has a matchTrader account
      const mttAccount = await getAccountByEmail(user.email);

      if (mttAccount) {
        // User has matchTrader account, redirect to platform
        window.open("https://platform.fundezy.io", "_blank");
      } else {
        // User doesn't have matchTrader account, redirect to dashboard
        navigate('/dashboard', { state: { showCreateAccount: true } });
      }
    } catch (error) {
      console.error('Error checking matchTrader account:', error);
      // If there's an error, assume user doesn't have an account and redirect to dashboard
      navigate('/dashboard', { state: { showCreateAccount: true } });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pricing
          </h1>
          <div className="w-20 h-1 bg-fundezy-red mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Select the funding level that matches your trading goals.
          </p>
        </motion.div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fundezy-red"></div>
        </div>
      ) : error ? (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
              Error Loading Pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {error}
            </p>
            <button 
              onClick={fetchChallenges}
              className="mt-4 bg-fundezy-red text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : tiers.length === 0 ? (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-google-gray dark:text-white sm:text-4xl">
              No Pricing Available
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              No pricing plans are currently available. Please check back later.
            </p>
            <button 
              onClick={fetchChallenges}
              className="mt-4 bg-fundezy-red text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Refresh
            </button>
          </div>
        </div>
      ) : (
        <PricingSection 
          tiers={tiers}
          title=""
          subtitle=""
          description=""
          onGetStarted={handleGetStarted}
          showPopularBadge={true}
        />
      )}
      
      {/* Modals */}
      <WaitingListModal 
        isOpen={isWaitingListOpen} 
        onClose={() => setIsWaitingListOpen(false)} 
      />
      <UniversityDomainPopup 
        isOpen={showUniversityPopup} 
        onClose={() => setShowUniversityPopup(false)}    
        onRegister={() => {
          signOut(auth);
          setShowUniversityPopup(false);
          navigate('/signin?mode=signup');
        }}
      />
    </div>
  );
}