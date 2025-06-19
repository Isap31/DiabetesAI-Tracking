import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Clock, User, Scale, Activity, Utensils, Calendar, Baby, Moon, Bed } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface PredictiveInsightsProps {
  language: string;
  useDemoData?: boolean;
}

const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({ language, useDemoData }) => {
  const t = useTranslation(language);

  // Enhanced user profile with menopause consideration
  const userProfile = {
    age: 34,
    diabetesType: 'Type 1',
    height: 165,
    weight: 68,
    bmi: 25.0,
    currentStress: 3,
    yearsSinceDiagnosis: 9,
    gender: 'female', // This would be dynamically set from profile
    isPregnant: false,
    menstrualCycleDay: 14,
    menstrualCycleLength: 28,
    sleepQuality: 7,
    sleepDuration: 7.5,
    isMenopause: false, // New field for menopause status
    lastMenstrualPeriod: '2024-01-01' // Track last period for menopause determination
  };

  // Enhanced menopause detection
  const getMenopauseStatus = () => {
    if (userProfile.gender !== 'female') return null;
    
    // Check if explicitly marked as menopause
    if (userProfile.isMenopause) return 'menopause';
    
    // Auto-detect based on age (typical menopause age 45-55)
    if (userProfile.age >= 55) return 'postmenopause';
    if (userProfile.age >= 45) return 'perimenopause';
    
    // Check last menstrual period (12+ months = menopause)
    const lastPeriod = new Date(userProfile.lastMenstrualPeriod);
    const monthsSinceLastPeriod = (Date.now() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsSinceLastPeriod >= 12) return 'menopause';
    if (monthsSinceLastPeriod >= 6) return 'perimenopause';
    
    return 'premenopause';
  };

  const getMenstrualPhase = () => {
    const menopauseStatus = getMenopauseStatus();
    
    if (userProfile.gender !== 'female' || userProfile.isPregnant || 
        menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause') {
      return null;
    }
    
    const day = userProfile.menstrualCycleDay;
    
    if (day <= 5) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day <= 15) return 'Ovulation';
    return 'Luteal';
  };

  // Gender and menopause-adaptive predictions with budget-friendly food focus
  const getPredictions = () => {
    if (!useDemoData) {
      // Real data mode: block or prompt for real user input if needed
      return [];
    }
    const menopauseStatus = getMenopauseStatus();
    const menstrualPhase = getMenstrualPhase();
    
    if (userProfile.gender === 'female' && !userProfile.isPregnant) {
      if (menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause') {
        return [
          {
            type: 'info',
            title: 'Post-Menopause Glucose Stability',
            message: `Post-menopause hormonal stability may improve glucose predictability. Based on 25g carbs from breakfast and stable hormone levels, 12% chance of glucose exceeding 140 mg/dL`,
            confidence: 91,
            action: 'Take advantage of hormonal stability - maintain consistent meal timing and portions',
            icon: Target,
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700',
            timeframe: '1-2 hours',
            factors: ['Carb content: 25g', 'Post-menopause stability', 'Type 1 diabetes', '9 years experience', 'Stable hormones']
          },
          {
            type: 'positive',
            title: 'Budget-Friendly Meal Recommendation',
            message: `Affordable options for stable glucose: Dried beans (15g carbs, $0.50), brown rice (20g carbs, $0.30), or oatmeal (25g carbs, $0.25) with cinnamon`,
            confidence: 88,
            action: 'Shop sales for frozen vegetables, buy grains in bulk, use seasonal produce for best prices',
            icon: CheckCircle,
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            textColor: 'text-green-700',
            timeframe: 'Next meal planning',
            factors: ['Budget-conscious options', 'Stable glucose impact', 'Post-menopause metabolism', 'Bulk buying savings']
          }
        ];
      } else if (menopauseStatus === 'perimenopause') {
        return [
          {
            type: 'warning',
            title: 'Perimenopause Glucose Variability',
            message: `Perimenopause hormonal fluctuations may increase glucose variability by 15-25%. Current meal (25g carbs) may have unpredictable response`,
            confidence: 85,
            action: 'Monitor glucose more frequently, consider smaller, more frequent meals with affordable protein sources',
            icon: AlertTriangle,
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            textColor: 'text-orange-700',
            timeframe: '1-3 hours',
            factors: ['Perimenopause transition', 'Hormonal fluctuations', 'Carb content: 25g', 'Age: ' + userProfile.age]
          },
          {
            type: 'info',
            title: 'Affordable Hormone-Supporting Foods',
            message: `Budget-friendly foods for perimenopause: Flaxseeds ($2/lb), lentils ($1.50/lb), and sweet potatoes ($1/lb) can help stabilize both hormones and glucose`,
            confidence: 82,
            action: 'Include phytoestrogen-rich foods like soy (tofu $2/lb) and ground flaxseed in daily meals',
            icon: Target,
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700',
            timeframe: 'Daily nutrition',
            factors: ['Perimenopause support', 'Budget-friendly options', 'Hormone balance', 'Glucose stability']
          }
        ];
      } else {
        // Regular menstrual cycle predictions
        return [
          {
            type: 'warning',
            title: 'Hormonal Glucose Variability Risk',
            message: `Based on ${menstrualPhase?.toLowerCase()} phase (day ${userProfile.menstrualCycleDay}) and 25g carbs from breakfast, ${menstrualPhase === 'Ovulation' ? '22%' : '15%'} chance of glucose exceeding 140 mg/dL`,
            confidence: menstrualPhase === 'Ovulation' ? 89 : 82,
            action: menstrualPhase === 'Ovulation' ? 'Consider budget-friendly protein: eggs ($2/dozen), canned tuna ($1/can), or peanut butter ($3/jar)' : 'Monitor glucose closely, maintain regular meal timing with affordable staples',
            icon: AlertTriangle,
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            textColor: 'text-orange-700',
            timeframe: '1-2 hours',
            factors: ['Carb content: 25g', `${menstrualPhase} phase`, 'Type 1 diabetes', '9 years experience', 'Hormonal insulin resistance']
          },
          {
            type: 'positive',
            title: 'Budget-Conscious Meal Planning',
            message: `Affordable glucose-friendly options: Cabbage ($0.50/lb), carrots ($1/lb), onions ($1/lb), and dried beans ($1.50/lb) provide fiber and stable carbs`,
            confidence: 94,
            action: 'Shop discount stores, buy seasonal produce, use frozen vegetables ($1/bag) for consistent nutrition',
            icon: CheckCircle,
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            textColor: 'text-green-700',
            timeframe: 'Weekly meal prep',
            factors: ['Budget optimization', 'Glucose stability', 'Nutritional value', 'Meal planning efficiency']
          }
        ];
      }
    } else {
      // Male or pregnant female predictions with budget focus
      return [
        {
          type: 'warning',
          title: 'Post-Meal Glucose Spike Risk',
          message: 'Based on 25g carbs from breakfast and current sleep quality (7/10), 18% chance of glucose exceeding 140 mg/dL',
          confidence: 87,
          action: 'Consider affordable post-meal activity: walking, or budget-friendly snacks like apple slices ($1/lb)',
          icon: AlertTriangle,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-700',
          timeframe: '1-2 hours',
          factors: ['Carb content: 25g', 'Meal timing: 8:00 AM', 'Sleep quality: 7/10', 'Type 1 diabetes']
        },
        {
          type: 'positive',
          title: 'Budget-Friendly Nutrition Strategy',
          message: 'Affordable staples for glucose control: Oats ($3/container), bananas ($0.60/lb), and peanut butter ($3/jar) provide sustained energy',
          confidence: 92,
          action: 'Buy generic brands, shop sales, use coupons for 20-30% savings on diabetes-friendly foods',
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          timeframe: 'Grocery planning',
          factors: ['Cost efficiency', 'Nutritional value', 'Glucose impact', 'Long-term sustainability']
        }
      ];
    }
  };

  const predictions = getPredictions();
  const menopauseStatus = getMenopauseStatus();

  if (!useDemoData) {
    // Only render a minimal prompt if not in demo mode
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
        {t.enterDataToSeePredictions}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {predictions.map((prediction, index) => (
          <div
            key={index}
            className={`${prediction.bgColor} ${prediction.borderColor} border rounded-xl p-6 transition-transform duration-300 hover:scale-105`}
          >
            <div className="flex items-start space-x-4">
              <div className={`${prediction.textColor} p-2 rounded-lg bg-white bg-opacity-50`}>
                <prediction.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${prediction.textColor} mb-2`}>{prediction.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{prediction.message}</p>
                
                {/* Confidence and Timeframe */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {prediction.confidence}% {t.modelConfidence}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{prediction.timeframe}</span>
                  </div>
                </div>

                {/* Factors */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Contributing Factors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {prediction.factors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-50 text-gray-700"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Action:</h4>
                  <p className="text-sm text-gray-600">{prediction.action}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Parameter Influence */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Parameter Influences</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Sleep Quality */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Bed className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Sleep Quality</span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-2xl font-bold text-gray-900">{userProfile.sleepQuality}/10</span>
              <span className="text-sm text-gray-500 mb-1">({userProfile.sleepDuration}h)</span>
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Stress Level</span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-2xl font-bold text-gray-900">{userProfile.currentStress}/10</span>
              <span className="text-sm text-gray-500 mb-1">
                {userProfile.currentStress <= 3 ? t.good : userProfile.currentStress <= 7 ? t.fair : t.poor}
              </span>
            </div>
          </div>

          {/* Hormonal Status */}
          {userProfile.gender === 'female' && (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Moon className="h-5 w-5 text-pink-500" />
                <span className="text-sm font-medium text-gray-700">Hormonal Status</span>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause'
                    ? 'Post-M'
                    : getMenstrualPhase() || 'N/A'}
                </span>
                <span className="text-sm text-gray-500 mb-1">
                  {menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause'
                    ? t.good
                    : `${t.days} ${userProfile.menstrualCycleDay}`}
                </span>
              </div>
            </div>
          )}

          {/* Experience Level */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Experience</span>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-2xl font-bold text-gray-900">{userProfile.yearsSinceDiagnosis}y</span>
              <span className="text-sm text-gray-500 mb-1">{t.type1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">{t.flowSenseAI}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">{t.predictionAccuracy}</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">93.1%</p>
            <p className="text-xs text-gray-400">Last 7 {t.days}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">{t.dataPoints}</span>
            </div>
            <p className="text-2xl font-bold text-green-400">3,247</p>
            <p className="text-xs text-gray-400">Total analyzed</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium">Parameters</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">15+</p>
            <p className="text-xs text-gray-400">Tracked factors</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-pink-400" />
              <span className="text-sm font-medium">Improvement</span>
            </div>
            <p className="text-2xl font-bold text-pink-400">+12.4%</p>
            <p className="text-xs text-gray-400">vs. last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights; 