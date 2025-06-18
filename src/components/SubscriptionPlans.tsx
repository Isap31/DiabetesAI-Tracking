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
              Annual <span className="text-xs font-bold text-green-500 ml-1">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                selectedPlan === plan.id
                  ? 'ring-4 ring-purple-400 shadow-xl'
                  : 'shadow-md hover:shadow-lg'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                <div className="flex items-center mb-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                    <plan.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm opacity-90">{plan.description}</p>
                  </div>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.id === 'premium' && (
                    <span className="ml-2 text-sm opacity-80">
                      {billingCycle === 'monthly' ? '/month' : '/year'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-medium text-gray-900 mb-4">Included Features:</h4>
                <ul className="space-y-3">
                  {getFeaturesByPlan(plan.id).slice(0, 5).map((feature) => (
                    <li key={feature.id} className="flex items-start">
                      <div className={`mt-0.5 mr-3 ${
                        isFeatureIncluded(feature, plan.id)
                          ? 'text-green-500'
                          : 'text-gray-400'
                      }`}>
                        {isFeatureIncluded(feature, plan.id) ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <X className="h-5 w-5" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.highlight ? 'font-medium text-purple-700' : 'text-gray-700'
                      }`}>
                        {feature.title}
                      </span>
                    </li>
                  ))}
                  {getFeaturesByPlan(plan.id).length > 5 && (
                    <li className="text-sm text-purple-600 font-medium pl-8">
                      +{getFeaturesByPlan(plan.id).length - 5} more features
                    </li>
                  )}
                </ul>
                
                <button
                  className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
                    plan.id === 'premium'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.id === 'free' ? 'Continue with Free' : 'Upgrade Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Detailed Feature Comparison</h2>
            <p className="text-gray-600">See exactly what's included in each plan</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-500">Aurora Basic</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-500">Aurora Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr 
                    key={feature.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors cursor-pointer`}
                    onClick={() => setShowFeatureDetails(showFeatureDetails === feature.id ? null : feature.id)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <feature.icon className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">{feature.title}</div>
                          {showFeatureDetails === feature.id && (
                            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.included === 'both' || feature.included === 'free' ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.included === 'both' || feature.included === 'premium' ? (
                        <div className="flex justify-center">
                          <Check className={`h-5 w-5 ${feature.highlight ? 'text-purple-500' : 'text-green-500'}`} />
                        </div>
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Can I switch between plans?</h3>
              <p className="text-gray-600">Yes, you can upgrade to Premium at any time. If you downgrade to Basic, you'll maintain Premium access until the end of your billing period.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Absolutely. Your health data is encrypted and securely stored. We never share your personal information with third parties without your explicit consent.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Can I get a refund if I'm not satisfied?</h3>
              <p className="text-gray-600">We offer a 14-day money-back guarantee for Premium subscriptions. If you're not completely satisfied, contact our support team for a full refund.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Do you offer family plans?</h3>
              <p className="text-gray-600">Yes! Our Family Plan allows up to 5 family members to enjoy Premium benefits at a discounted rate. Contact support for details.</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              quote: "The premium features have transformed how I manage my diabetes. The AI predictions are remarkably accurate!",
              name: "Sarah M.",
              role: "Type 1, 9 years",
              avatar: "SM"
            },
            {
              quote: "The Care Circle feature helped me connect my entire family to my journey. We're all healthier now.",
              name: "Michael R.",
              role: "Type 2, 3 years",
              avatar: "MR"
            },
            {
              quote: "As a healthcare provider, I recommend AuroraFlow Premium to all my patients. The detailed reports are invaluable.",
              name: "Dr. Lisa J.",
              role: "Endocrinologist",
              avatar: "LJ"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start mb-4">
                <div className="text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 inline" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Start Your Premium Journey Today</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Unlock the full potential of AuroraFlow and transform your diabetes management into a journey of growth, connection, and empowerment.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Upgrade to Premium
          </button>
          <p className="mt-4 text-sm opacity-80">
            14-day money-back guarantee • Cancel anytime • Secure payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;