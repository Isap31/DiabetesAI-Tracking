import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Clock, User, Scale, Activity, Utensils, Calendar, Baby, Moon, Bed } from 'lucide-react';

const PredictiveInsights = () => {
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

  // Enhanced model metrics with menopause consideration
  const getModelMetrics = () => {
    if (userProfile.gender === 'female') {
      if (menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause') {
        return [
          { label: 'Prediction Accuracy', value: '94.2%', trend: '+6.1%', description: 'Enhanced with post-menopause stability' },
          { label: 'Data Points Used', value: '3,247', trend: '+189', description: 'Glucose, meals, exercise, hormone status' },
          { label: 'Model Confidence', value: '92.8%', trend: '+5.2%', description: 'Post-menopause predictability' },
          { label: 'Profile Completeness', value: '100%', trend: 'Complete', description: 'All parameters including menopause status' }
        ];
      } else if (menopauseStatus === 'perimenopause') {
        return [
          { label: 'Prediction Accuracy', value: '89.5%', trend: '+2.8%', description: 'Adjusted for perimenopause variability' },
          { label: 'Data Points Used', value: '3,247', trend: '+189', description: 'Glucose, meals, exercise, transition data' },
          { label: 'Model Confidence', value: '87.1%', trend: '+1.9%', description: 'Perimenopause adaptation' },
          { label: 'Profile Completeness', value: '100%', trend: 'Complete', description: 'All parameters including transition status' }
        ];
      } else {
        return [
          { label: 'Prediction Accuracy', value: '93.1%', trend: '+5.8%', description: 'Enhanced with hormonal cycle data' },
          { label: 'Data Points Used', value: '3,247', trend: '+189', description: 'Glucose, meals, exercise, hormonal logs' },
          { label: 'Model Confidence', value: '91.2%', trend: '+4.5%', description: 'Hormonal pattern recognition' },
          { label: 'Profile Completeness', value: '100%', trend: 'Complete', description: 'All parameters including cycle data' }
        ];
      }
    } else {
      return [
        { label: 'Prediction Accuracy', value: '89.2%', trend: '+3.1%', description: 'Based on comprehensive data' },
        { label: 'Data Points Used', value: '3,247', trend: '+189', description: 'Glucose, meals, exercise, sleep logs' },
        { label: 'Model Confidence', value: '87.4%', trend: '+2.3%', description: 'Personalization level' },
        { label: 'Profile Completeness', value: '95%', trend: 'Complete', description: 'All key parameters logged' }
      ];
    }
  };

  const modelMetrics = getModelMetrics();

  // Enhanced parameter influence with menopause consideration
  const getParameterInfluence = () => {
    if (userProfile.gender === 'female') {
      if (menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause') {
        return [
          { parameter: 'Carbohydrate Content', influence: 85, icon: Utensils, color: 'bg-gray-600' },
          { parameter: 'Exercise Intensity', influence: 75, icon: Activity, color: 'bg-gray-500' },
          { parameter: 'Sleep Quality & Duration', influence: 70, icon: Bed, color: 'bg-gray-600' },
          { parameter: 'Post-Menopause Stability', influence: 65, icon: Moon, color: 'bg-gray-500' },
          { parameter: 'Time of Day', influence: 58, icon: Clock, color: 'bg-gray-600' },
          { parameter: 'Years Since Diagnosis', influence: 55, icon: Calendar, color: 'bg-gray-500' },
          { parameter: 'Stress Level', influence: 45, icon: Brain, color: 'bg-gray-600' },
          { parameter: 'BMI/Weight', influence: 38, icon: Scale, color: 'bg-gray-500' }
        ];
      } else if (menopauseStatus === 'perimenopause') {
        return [
          { parameter: 'Carbohydrate Content', influence: 85, icon: Utensils, color: 'bg-gray-600' },
          { parameter: 'Perimenopause Fluctuations', influence: 78, icon: Moon, color: 'bg-gray-500' },
          { parameter: 'Exercise Intensity', influence: 68, icon: Activity, color: 'bg-gray-600' },
          { parameter: 'Sleep Quality & Duration', influence: 65, icon: Bed, color: 'bg-gray-500' },
          { parameter: 'Time of Day', influence: 58, icon: Clock, color: 'bg-gray-600' },
          { parameter: 'Years Since Diagnosis', influence: 55, icon: Calendar, color: 'bg-gray-500' },
          { parameter: 'Stress Level', influence: 50, icon: Brain, color: 'bg-gray-600' },
          { parameter: 'BMI/Weight', influence: 42, icon: Scale, color: 'bg-gray-500' }
        ];
      } else {
        return [
          { parameter: 'Carbohydrate Content', influence: 85, icon: Utensils, color: 'bg-gray-600' },
          { parameter: 'Menstrual Cycle Phase', influence: 72, icon: Moon, color: 'bg-gray-500' },
          { parameter: 'Exercise Intensity', influence: 68, icon: Activity, color: 'bg-gray-600' },
          { parameter: 'Sleep Quality & Duration', influence: 65, icon: Bed, color: 'bg-gray-500' },
          { parameter: 'Time of Day', influence: 58, icon: Clock, color: 'bg-gray-600' },
          { parameter: 'Years Since Diagnosis', influence: 55, icon: Calendar, color: 'bg-gray-500' },
          { parameter: 'Stress Level', influence: 45, icon: Brain, color: 'bg-gray-600' },
          { parameter: 'BMI/Weight', influence: 38, icon: Scale, color: 'bg-gray-500' }
        ];
      }
    } else {
      return [
        { parameter: 'Carbohydrate Content', influence: 85, icon: Utensils, color: 'bg-gray-600' },
        { parameter: 'Exercise Intensity', influence: 75, icon: Activity, color: 'bg-gray-500' },
        { parameter: 'Sleep Quality & Duration', influence: 68, icon: Bed, color: 'bg-gray-600' },
        { parameter: 'Time of Day', influence: 65, icon: Clock, color: 'bg-gray-500' },
        { parameter: 'Years Since Diagnosis', influence: 58, icon: Calendar, color: 'bg-gray-600' },
        { parameter: 'Stress Level', influence: 48, icon: Brain, color: 'bg-gray-500' },
        { parameter: 'BMI/Weight', influence: 42, icon: Scale, color: 'bg-gray-600' },
        { parameter: 'Age', influence: 35, icon: User, color: 'bg-gray-500' }
      ];
    }
  };

  const parameterInfluence = getParameterInfluence();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">FlowSense AI Analytics</h3>
            <p className="text-sm text-gray-500">
              {userProfile.gender === 'female' 
                ? `Personalized glucose modeling with ${menopauseStatus} insights` 
                : 'Personalized glucose modeling & insights'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            Model: FlowSense v{userProfile.gender === 'female' ? '2.4' : '2.1'}
          </p>
          <p className="text-xs text-gray-500">
            {userProfile.gender === 'female' 
              ? `Enhanced with ${menopauseStatus} data` 
              : 'Neural network ensemble'}
          </p>
        </div>
      </div>

      {/* Enhanced Profile Integration with Menopause */}
      <div className="bg-slate-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Current Profile Parameters</h4>
        <div className={`grid ${userProfile.gender === 'female' ? 'grid-cols-6' : 'grid-cols-4'} gap-4 text-sm`}>
          <div>
            <span className="text-gray-600">Age/Type:</span>
            <span className="ml-2 font-medium">{userProfile.age}y, {userProfile.diabetesType}</span>
          </div>
          <div>
            <span className="text-gray-600">BMI:</span>
            <span className="ml-2 font-medium">{userProfile.bmi}</span>
          </div>
          <div>
            <span className="text-gray-600">Experience:</span>
            <span className="ml-2 font-medium">{userProfile.yearsSinceDiagnosis} years</span>
          </div>
          <div>
            <span className="text-gray-600">Sleep:</span>
            <span className="ml-2 font-medium">{userProfile.sleepDuration}h (Q:{userProfile.sleepQuality}/10)</span>
          </div>
          {userProfile.gender === 'female' && (
            <>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-medium text-gray-700 capitalize">{menopauseStatus}</span>
              </div>
              <div>
                <span className="text-gray-600">Phase:</span>
                <span className="ml-2 font-medium text-gray-700">
                  {getMenstrualPhase() || 'N/A'}
                </span>
              </div>
            </>
          )}
          {userProfile.gender === 'male' && (
            <div>
              <span className="text-gray-600">Stress:</span>
              <span className="ml-2 font-medium">Level {userProfile.currentStress}/5</span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Gender-Specific Impact Notice */}
      {userProfile.gender === 'female' && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Moon className="h-4 w-4 text-gray-600" />
            <h4 className="font-medium text-gray-900">
              {menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause' 
                ? 'Post-Menopause Impact' 
                : menopauseStatus === 'perimenopause' 
                ? 'Perimenopause Impact' 
                : 'Hormonal Cycle Impact'}
            </h4>
          </div>
          <p className="text-sm text-gray-700">
            <strong>{menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause' 
              ? 'Post-Menopause:' 
              : menopauseStatus === 'perimenopause' 
              ? 'Perimenopause:' 
              : getMenstrualPhase() + ' Phase:'}</strong> {
              menopauseStatus === 'menopause' || menopauseStatus === 'postmenopause' 
                ? 'Hormonal stability may improve glucose predictability. Focus on consistent nutrition and exercise routines.' :
              menopauseStatus === 'perimenopause' 
                ? 'Hormonal fluctuations may increase glucose variability. Monitor more frequently and consider smaller, frequent meals.' :
              getMenstrualPhase() === 'Ovulation' ? 'Increased insulin resistance may cause higher glucose levels. Consider reducing carb intake by 20-30%.' :
              getMenstrualPhase() === 'Luteal' ? 'Progesterone may increase insulin resistance. Monitor glucose more closely.' :
              getMenstrualPhase() === 'Menstrual' ? 'Hormonal fluctuations may cause glucose variability. Stay hydrated and maintain regular meals.' :
              'Estrogen levels rising may improve insulin sensitivity. Good time for normal carb intake.'
            }
          </p>
        </div>
      )}

      {/* Budget-Friendly Nutrition Focus */}
      <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
        <div className="flex items-center space-x-2 mb-2">
          <Utensils className="h-4 w-4 text-green-600" />
          <h4 className="font-medium text-green-900">Budget-Friendly Nutrition Focus</h4>
        </div>
        <p className="text-sm text-green-800">
          <strong>Affordable Diabetes-Friendly Foods:</strong> Dried beans ($1.50/lb), oats ($3/container), eggs ($2/dozen), 
          seasonal vegetables ($0.50-1/lb), and generic whole grains provide excellent nutrition without breaking the budget. 
          Shop sales, buy in bulk, and use frozen vegetables for consistent, affordable nutrition.
        </p>
      </div>

      {/* Model Performance Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {modelMetrics.map((metric, index) => (
          <div key={index} className="text-center">
            <p className="text-lg font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-gray-600">{metric.label}</p>
            <p className="text-xs text-green-600 font-medium">{metric.trend}</p>
            <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Enhanced Parameter Influence Chart */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">
          Parameter Influence on Predictions 
          {userProfile.gender === 'female' && (
            <span className="text-sm text-gray-600 ml-2">({menopauseStatus}-Enhanced)</span>
          )}
        </h4>
        <div className="space-y-3">
          {parameterInfluence.map((param, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`${param.color} p-2 rounded-lg`}>
                <param.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{param.parameter}</span>
                  <span className="text-sm text-gray-600">{param.influence}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${param.color} transition-all duration-500`}
                    style={{ width: `${param.influence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Predictions */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">
          AI Predictions & Recommendations
          {userProfile.gender === 'female' && (
            <span className="text-sm text-gray-600 ml-2">({menopauseStatus}-Aware & Budget-Focused)</span>
          )}
        </h4>
        {predictions.map((prediction, index) => (
          <div key={index} className={`${prediction.bgColor} ${prediction.borderColor} border rounded-lg p-4`}>
            <div className="flex items-start space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <prediction.icon className={`h-4 w-4 ${prediction.textColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-semibold ${prediction.textColor}`}>
                    {prediction.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{prediction.timeframe}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{prediction.message}</p>
                <p className="text-sm font-medium text-gray-600 mb-3">{prediction.action}</p>
                
                {/* Factors considered */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-600 mb-1">Factors considered:</p>
                  <div className="flex flex-wrap gap-1">
                    {prediction.factors.map((factor, idx) => (
                      <span key={idx} className="text-xs bg-white bg-opacity-60 px-2 py-1 rounded">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Confidence: {prediction.confidence}%
                  </span>
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-600 transition-all duration-500"
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Next prediction update in 8 minutes</span>
          <span>
            Data sources: CGM, meal logs, exercise tracker, sleep data, profile data
            {userProfile.gender === 'female' && `, ${menopauseStatus} status`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;