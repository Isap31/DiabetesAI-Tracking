import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Clock, User, Scale, Activity, Utensils, Calendar, Baby, Moon, Bed } from 'lucide-react';

const PredictiveInsights = () => {
  // Dynamic user profile that changes based on gender
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
    sleepDuration: 7.5
  };

  const getMenstrualPhase = () => {
    if (userProfile.gender !== 'female' || userProfile.isPregnant) return null;
    const day = userProfile.menstrualCycleDay;
    
    if (day <= 5) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day <= 15) return 'Ovulation';
    return 'Luteal';
  };

  // Gender-adaptive predictions
  const getPredictions = () => {
    if (userProfile.gender === 'female' && !userProfile.isPregnant) {
      return [
        {
          type: 'warning',
          title: 'Hormonal Glucose Variability Risk',
          message: `Based on ${getMenstrualPhase()?.toLowerCase()} phase (day ${userProfile.menstrualCycleDay}) and 25g carbs from breakfast, ${getMenstrualPhase() === 'Ovulation' ? '22%' : '15%'} chance of glucose exceeding 140 mg/dL due to hormonal insulin resistance`,
          confidence: getMenstrualPhase() === 'Ovulation' ? 89 : 82,
          action: getMenstrualPhase() === 'Ovulation' ? 'Consider reducing carbs by 5-8g or light exercise post-meal' : 'Monitor glucose closely, maintain regular meal timing',
          icon: AlertTriangle,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-700',
          timeframe: '1-2 hours',
          factors: ['Carb content: 25g', `${getMenstrualPhase()} phase`, 'Type 1 diabetes', '9 years experience', 'Hormonal insulin resistance']
        },
        {
          type: 'positive',
          title: 'Cycle-Optimized Exercise Window',
          message: `Current glucose (94 mg/dL), moderate stress, and ${getMenstrualPhase()?.toLowerCase()} phase hormonal profile suggest ${getMenstrualPhase() === 'Follicular' ? 'excellent' : 'good'} conditions for physical activity`,
          confidence: getMenstrualPhase() === 'Follicular' ? 94 : 88,
          action: getMenstrualPhase() === 'Ovulation' ? 'Perfect time for 30-45 minutes moderate exercise - may help counteract hormonal effects' : 'Good time for regular exercise routine',
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          timeframe: 'Next 2 hours',
          factors: ['Current glucose: 94 mg/dL', 'BMI: 25.0', `${getMenstrualPhase()} phase`, 'Sleep quality: 7/10', 'Diabetes experience: 9 years']
        },
        {
          type: 'info',
          title: 'Cycle-Aware Meal Recommendation',
          message: `Based on ${getMenstrualPhase()?.toLowerCase()} phase insulin sensitivity changes and your diabetes experience, optimal next meal should contain ${getMenstrualPhase() === 'Ovulation' ? '12-15g' : '15-18g'} carbs`,
          confidence: 85,
          action: getMenstrualPhase() === 'Ovulation' ? 'Focus on protein + vegetables, limit complex carbs during ovulation' : 'Balanced meal with normal carb content',
          icon: Target,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          timeframe: 'Lunch (12:00 PM)',
          factors: [`${getMenstrualPhase()} phase effects`, 'Morning glucose pattern', 'Exercise history', 'Sleep quality', 'Years since diagnosis: 9']
        }
      ];
    } else {
      // Male or pregnant female predictions
      return [
        {
          type: 'warning',
          title: 'Post-Meal Glucose Spike Risk',
          message: 'Based on 25g carbs from breakfast, Type 1 diabetes profile, and current sleep quality (7/10), 18% chance of glucose exceeding 140 mg/dL',
          confidence: 87,
          action: 'Consider 15-minute walk or monitor glucose closely post-meal',
          icon: AlertTriangle,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-700',
          timeframe: '1-2 hours',
          factors: ['Carb content: 25g', 'Meal timing: 8:00 AM', 'Sleep quality: 7/10', 'Type 1 diabetes', '9 years experience']
        },
        {
          type: 'positive',
          title: 'Optimal Exercise Window',
          message: 'Current glucose (94 mg/dL), moderate stress level, and good sleep recovery create ideal conditions for physical activity',
          confidence: 92,
          action: 'Perfect time for 30-45 minutes moderate exercise',
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          timeframe: 'Next 2 hours',
          factors: ['Current glucose: 94 mg/dL', 'BMI: 25.0', 'Stress level: Moderate', 'Sleep: 7.5h (Good)', 'Time since meal: 2 hrs']
        },
        {
          type: 'info',
          title: 'Personalized Meal Recommendation',
          message: 'Based on your profile, current glucose trends, and sleep quality, optimal next meal should contain 15-20g carbs',
          confidence: 83,
          action: 'Lean protein + vegetables + moderate portion complex carbs',
          icon: Target,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          timeframe: 'Lunch (12:00 PM)',
          factors: ['Height/Weight ratio', 'Morning glucose pattern', 'Exercise history', 'Sleep quality', 'Diabetes type']
        }
      ];
    }
  };

  const predictions = getPredictions();

  // Gender-adaptive model metrics
  const getModelMetrics = () => {
    if (userProfile.gender === 'female' && !userProfile.isPregnant) {
      return [
        { label: 'Prediction Accuracy', value: '93.1%', trend: '+5.8%', description: 'Enhanced with hormonal cycle data' },
        { label: 'Data Points Used', value: '3,247', trend: '+189', description: 'Glucose, meals, exercise, hormonal logs' },
        { label: 'Model Confidence', value: '91.2%', trend: '+4.5%', description: 'Hormonal pattern recognition' },
        { label: 'Profile Completeness', value: '100%', trend: 'Complete', description: 'All parameters including cycle data' }
      ];
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

  // Gender-adaptive parameter influence - Less colorful
  const getParameterInfluence = () => {
    if (userProfile.gender === 'female' && !userProfile.isPregnant) {
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
              {userProfile.gender === 'female' && !userProfile.isPregnant 
                ? 'Personalized glucose modeling with hormonal insights' 
                : 'Personalized glucose modeling & insights'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            Model: FlowSense v{userProfile.gender === 'female' && !userProfile.isPregnant ? '2.3' : '2.1'}
          </p>
          <p className="text-xs text-gray-500">
            {userProfile.gender === 'female' && !userProfile.isPregnant 
              ? 'Enhanced with hormonal data' 
              : 'Neural network ensemble'}
          </p>
        </div>
      </div>

      {/* Dynamic Profile Integration */}
      <div className="bg-slate-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Current Profile Parameters</h4>
        <div className={`grid ${userProfile.gender === 'female' && !userProfile.isPregnant ? 'grid-cols-6' : 'grid-cols-4'} gap-4 text-sm`}>
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
          {userProfile.gender === 'female' && !userProfile.isPregnant && (
            <>
              <div>
                <span className="text-gray-600">Cycle:</span>
                <span className="ml-2 font-medium text-gray-700">Day {userProfile.menstrualCycleDay}</span>
              </div>
              <div>
                <span className="text-gray-600">Phase:</span>
                <span className="ml-2 font-medium text-gray-700">{getMenstrualPhase()}</span>
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

      {/* Gender-Specific Impact Notice */}
      {userProfile.gender === 'female' && !userProfile.isPregnant && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Moon className="h-4 w-4 text-gray-600" />
            <h4 className="font-medium text-gray-900">Hormonal Cycle Impact</h4>
          </div>
          <p className="text-sm text-gray-700">
            <strong>{getMenstrualPhase()} Phase:</strong> {
              getMenstrualPhase() === 'Ovulation' ? 'Increased insulin resistance may cause higher glucose levels. Consider reducing carb intake by 20-30%.' :
              getMenstrualPhase() === 'Luteal' ? 'Progesterone may increase insulin resistance. Monitor glucose more closely.' :
              getMenstrualPhase() === 'Menstrual' ? 'Hormonal fluctuations may cause glucose variability. Stay hydrated and maintain regular meals.' :
              'Estrogen levels rising may improve insulin sensitivity. Good time for normal carb intake.'
            }
          </p>
        </div>
      )}

      {userProfile.gender === 'male' && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <User className="h-4 w-4 text-gray-600" />
            <h4 className="font-medium text-gray-900">Male Profile Optimization</h4>
          </div>
          <p className="text-sm text-gray-700">
            <strong>Stable Hormonal Profile:</strong> Your predictions focus on lifestyle factors like sleep quality ({userProfile.sleepQuality}/10), exercise patterns, and stress management. Consistent sleep and regular exercise are your key optimization factors.
          </p>
        </div>
      )}

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

      {/* Enhanced Parameter Influence Chart - Less Colorful */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">
          Parameter Influence on Predictions 
          {userProfile.gender === 'female' && !userProfile.isPregnant && (
            <span className="text-sm text-gray-600 ml-2">(Female Cycle-Enhanced)</span>
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

      {/* Dynamic Predictions */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">
          AI Predictions & Recommendations
          {userProfile.gender === 'female' && !userProfile.isPregnant && (
            <span className="text-sm text-gray-600 ml-2">(Cycle-Aware)</span>
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
            {userProfile.gender === 'female' && !userProfile.isPregnant && ', hormonal cycle'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;