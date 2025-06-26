import React, { useState, useEffect } from 'react';
import { X, Crown, Check, Loader2, Star, Zap, Shield, Heart, Sparkles, Users, Bot, Mic } from 'lucide-react';
import { revenueCatService } from '../services/revenueCatService';

interface SubscriptionPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  savings?: string;
  color: string;
}

interface PremiumSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscriptionSuccess: () => void;
  currentPlan?: string;
}

const PremiumSubscriptionModal: React.FC<PremiumSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscriptionSuccess,
  currentPlan
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium_monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offerings, setOfferings] = useState<any[]>([]);

  const plans: SubscriptionPlan[] = [
    {
      id: 'premium_monthly',
      title: 'Premium Monthly',
      description: 'Full access to all premium features',
      price: '$9.99',
      period: 'month',
      features: [
        'Advanced AI Predictions',
        'Voice Assistant',
        'Care Circle (Family Sharing)',
        'Aurora Journal',
        'Premium Themes & Sounds',
        'Advanced Pet Companions',
        'Priority Support',
        'Data Export',
        'Ad-Free Experience'
      ],
      color: 'from-blue-500 to-purple-600',
      isPopular: false
    },
    {
      id: 'premium_annual',
      title: 'Premium Annual',
      description: 'Best value - Save 33%',
      price: '$79.99',
      originalPrice: '$119.88',
      period: 'year',
      features: [
        'Everything in Monthly',
        'Save $40 per year',
        'Exclusive Annual Features',
        'Priority Feature Access',
        'Extended Data History',
        'Advanced Analytics',
        'Personalized Health Reports',
        'Dedicated Account Manager',
        'Beta Feature Access'
      ],
      color: 'from-purple-500 to-pink-600',
      isPopular: true,
      savings: 'Save 33%'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      loadOfferings();
    }
  }, [isOpen]);

  const loadOfferings = async () => {
    try {
      const offerings = await revenueCatService.getOfferings();
      setOfferings(offerings);
    } catch (error) {
      console.warn('Could not load RevenueCat offerings:', error);
    }
  };

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Try RevenueCat first
      if (offerings.length > 0) {
        const offering = offerings[0];
        const packageToPurchase = offering.availablePackages.find((pkg: any) => 
          pkg.identifier === planId
        );

        if (packageToPurchase) {
          const customerInfo = await revenueCatService.purchasePackage(packageToPurchase);
          
          if (revenueCatService.isUserPremium(customerInfo)) {
            onSubscriptionSuccess();
            onClose();
            return;
          }
        }
      }

      // Fallback to web payment (mock for now)
      const success = await revenueCatService.mockPurchase(planId);
      
      if (success) {
        onSubscriptionSuccess();
        onClose();
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    setError(null);

    try {
      const customerInfo = await revenueCatService.restorePurchases();
      
      if (revenueCatService.isUserPremium(customerInfo)) {
        onSubscriptionSuccess();
        onClose();
      } else {
        setError('No active subscriptions found.');
      }
    } catch (err) {
      console.error('Restore error:', err);
      setError('Could not restore purchases. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
            <p className="text-purple-100 text-lg">
              Unlock the full potential of your health journey
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === plan.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                } ${plan.isPopular ? 'ring-2 ring-purple-400' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute -top-3 right-4">
                    <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {plan.savings}
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`bg-gradient-to-r ${plan.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                      )}
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    </div>
                    <span className="text-gray-600">per {plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {selectedPlan === plan.id && (
                  <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl pointer-events-none">
                    <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Premium Features Showcase */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              What You'll Get with Premium
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">AI Predictions</h4>
                <p className="text-xs text-gray-600">Advanced glucose forecasting</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Voice Assistant</h4>
                <p className="text-xs text-gray-600">Hands-free interaction</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Care Circle</h4>
                <p className="text-xs text-gray-600">Family sharing & support</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Premium Themes</h4>
                <p className="text-xs text-gray-600">Beautiful customization</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleSubscribe(selectedPlan)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              <Crown className="h-5 w-5" />
              <span>
                {loading ? 'Processing...' : `Subscribe to ${plans.find(p => p.id === selectedPlan)?.title}`}
              </span>
            </button>

            <button
              onClick={handleRestore}
              disabled={loading}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Restore Previous Purchase
            </button>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Subscription automatically renews unless cancelled. You can cancel anytime in your account settings.
            </p>
            <div className="mt-2 space-x-4">
              <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a>
              <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscriptionModal;