import React, { useState } from 'react';
import {
  Shield,
  Zap,
  Crown,
  Check,
  X,
  Star,
  Award,
  Gift,
  Sparkles,
  Heart,
  Palette,
  Music,
  Bot,
  Mic,
  Users,
  Book,
  Target,
  Droplets,
  Activity,
  Calendar,
  Clock,
  Lock,
  Unlock
} from 'lucide-react';

interface PlanFeature {
  id: string;
  title: string;
  description: string;
  included: 'free' | 'premium' | 'both';
  icon: any;
  highlight?: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: any;
  color: string;
  popular?: boolean;
}

const SubscriptionPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showFeatureDetails, setShowFeatureDetails] = useState<string | null>(null);

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Aurora Basic',
      price: 'Free',
      description: 'Essential diabetes management with gentle guidance',
      icon: Heart,
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: 'premium',
      name: 'Aurora Premium',
      price: billingCycle === 'monthly' ? '$7.99' : '$79.99',
      description: 'Advanced features for comprehensive wellness support',
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      popular: true
    }
  ];

  const features: PlanFeature[] = [
    {
      id: 'glucose-tracking',
      title: 'Glucose Tracking',
      description: 'Log and monitor your glucose levels with visual trends',
      included: 'both',
      icon: Droplets
    },
    {
      id: 'meal-tracking',
      title: 'Meal Tracking',
      description: 'Record meals with carb counting and nutritional insights',
      included: 'both',
      icon: Activity
    },
    {
      id: 'basic-insights',
      title: 'Basic AI Insights',
      description: 'Simple pattern recognition and gentle reminders',
      included: 'both',
      icon: Bot
    },
    {
      id: 'virtual-pet',
      title: 'Virtual Companion',
      description: 'Basic pet companion that responds to your care',
      included: 'both',
      icon: Heart
    },
    {
      id: 'basic-achievements',
      title: 'Basic Achievements',
      description: 'Earn badges for consistent logging and health milestones',
      included: 'both',
      icon: Award
    },
    {
      id: 'advanced-ai',
      title: 'Advanced AI Predictions',
      description: 'Comprehensive glucose forecasting with nutrition, sleep, and hormonal analysis',
      included: 'premium',
      icon: Zap,
      highlight: true
    },
    {
      id: 'voice-assistant',
      title: 'Voice Assistant',
      description: 'Full voice interaction with FlowSense AI for hands-free management',
      included: 'premium',
      icon: Mic,
      highlight: true
    },
    {
      id: 'care-circle',
      title: 'Care Circle',
      description: 'Connect with family and caregivers for shared support and challenges',
      included: 'premium',
      icon: Users
    },
    {
      id: 'aurora-journal',
      title: 'Aurora Journal',
      description: 'Reflective journaling with mood tracking and guided prompts',
      included: 'premium',
      icon: Book
    },
    {
      id: 'premium-themes',
      title: 'Premium Themes & Sounds',
      description: 'Unlock calming soundscapes and beautiful visual themes',
      included: 'premium',
      icon: Palette
    },
    {
      id: 'advanced-pet',
      title: 'Advanced Companion',
      description: 'Unlock additional pet types, accessories, and deeper emotional responses',
      included: 'premium',
      icon: Sparkles
    },
    {
      id: 'data-export',
      title: 'Advanced Data Export',
      description: 'Export comprehensive reports for healthcare providers',
      included: 'premium',
      icon: Calendar
    },
    {
      id: 'ad-free',
      title: 'Ad-Free Experience',
      description: 'Enjoy AuroraFlow without any advertisements',
      included: 'premium',
      icon: Shield
    }
  ];

  const getFeaturesByPlan = (planId: string) => {
    if (planId === 'free') {
      return features.filter(feature => feature.included === 'both' || feature.included === 'free');
    } else {
      return features;
    }
  };

  const isFeatureIncluded = (feature: PlanFeature, planId: string) => {
    if (feature.included === 'both') return true;
    return feature.included === planId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Wellness Journey</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the plan that best supports your unique health needs and personal growth
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-full shadow-sm inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual <span className="text-xs opacity-75">(Save 17%)</span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                selectedPlan === plan.id ? 'ring-4 ring-purple-400' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${plan.color} mb-6`}>
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.id === 'premium' && (
                    <span className="text-gray-500 ml-2">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
              
              <div className="border-t border-gray-100 p-8">
                <h4 className="font-medium text-gray-900 mb-4">Included Features:</h4>
                <ul className="space-y-4">
                  {getFeaturesByPlan(plan.id).map((feature) => (
                    <li
                      key={feature.id}
                      className={`flex items-start space-x-3 ${feature.highlight ? 'text-purple-600 font-medium' : ''}`}
                      onMouseEnter={() => setShowFeatureDetails(feature.id)}
                      onMouseLeave={() => setShowFeatureDetails(null)}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {isFeatureIncluded(feature, plan.id) ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <feature.icon className={`h-4 w-4 ${feature.highlight ? 'text-purple-500' : 'text-gray-500'}`} />
                          <span>{feature.title}</span>
                        </div>
                        {showFeatureDetails === feature.id && (
                          <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center text-gray-600 text-sm">
          <p>All plans include our commitment to your privacy and data security.</p>
          <p className="mt-2">
            Questions? <button className="text-purple-600 hover:text-purple-700">Contact our support team</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans; 