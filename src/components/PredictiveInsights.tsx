import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Clock, User, Scale, Activity, Utensils, Calendar, Baby, Moon } from 'lucide-react';

const PredictiveInsights = () => {
  const userProfile = {
    age: 34,
    diabetesType: 'Type 1',
    height: 165,
    weight: 68,
    bmi: 25.0,
    currentStress: 3,
    yearsSinceDiagnosis: 9,
    gender: 'female',
    isPregnant: false,
    menstrualCycleDay: 14,
    menstrualCycleLength: 28
  };

  const getMenstrualPhase = () => {
    const day = userProfile.menstrualCycleDay;
    const length = userProfile.menstrualCycleLength;
    
    if (day <= 5) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day <= 15) return 'Ovulation';
    return 'Luteal';
  };

  const predictions = [
    {
      type: 'warning',
      title: 'Hormonal Glucose Variability Risk',
      message: `Based on ovulation phase (day ${userProfile.menstrualCycleDay}) and 25g carbs from breakfast, 22% chance of glucose exceeding 140 mg/dL due to hormonal insulin resistance`,
      confidence: 89,
      action: 'Consider reducing carbs by 5-8g or light exercise post-meal',
      icon: AlertTriangle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      timeframe: '1-2 hours',
      factors: ['Carb content: 25g', 'Ovulation phase', 'Type 1 diabetes', '9 years experience', 'Hormonal insulin resistance']
    },
    {
      type: 'positive',
      title: 'Optimal Exercise Window',
      message: 'Current glucose (94 mg/dL), moderate stress, and mid-cycle hormonal profile suggest ideal conditions for physical activity',
      confidence: 94,
      action: 'Perfect time for 30-45 minutes moderate exercise - may help counteract hormonal effects',
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      timeframe: 'Next 2 hours',
      factors: ['Current glucose: 94 mg/dL', 'BMI: 25.0', 'Ovulation phase', 'Time since meal: 2 hrs', 'Diabetes experience: 9 years']
    },
    {
      type: 'info',
      title: 'Cycle-Aware Meal Recommendation',
      message: 'Based on ovulation phase insulin sensitivity changes and your diabetes experience, optimal next meal should contain 12-15g carbs (reduced from normal 15-20g)',
      confidence: 82,
      action: 'Focus on protein + vegetables, limit complex carbs during ovulation',
      icon: Target,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      timeframe: 'Lunch (12:00 PM)',
      factors: ['Ovulation phase effects', 'Morning glucose pattern', 'Exercise history', 'Diabetes type', 'Years since diagnosis: 9']
    }
  ];

  const modelMetrics = [
    { label: 'Prediction Accuracy', value: '93.1%', trend: '+5.8%', description: 'Enhanced with hormonal cycle data' },
    { label: 'Data Points Used', value: '3,247', trend: '+189', description: 'Glucose, meals, exercise, hormonal logs' },
    { label: 'Model Confidence', value: '91.2%', trend: '+4.5%', description: 'Hormonal pattern recognition' },
    { label: 'Profile Completeness', value: '100%', trend: 'Complete', description: 'All parameters including cycle data' }
  ];

  const parameterInfluence = [
    { parameter: 'Carbohydrate Content', influence: 85, icon: Utensils, color: 'bg-red-500' },
    { parameter: 'Exercise Intensity', influence: 72, icon: Activity, color: 'bg-blue-500' },
    { parameter: 'Menstrual Cycle Phase', influence: 68, icon: Moon, color: 'bg-pink-500' },
    { parameter: 'Time of Day', influence: 65, icon: Clock, color: 'bg-purple-500' },
    { parameter: 'Years Since Diagnosis', influence: 58, icon: Calendar, color: 'bg-indigo-500' },
    { parameter: 'Stress Level', influence: 45, icon: Brain, color: 'bg-orange-500' },
    { parameter: 'BMI/Weight', influence: 38, icon: Scale, color: 'bg-green-500' },
    { parameter: 'Age/Diabetes Type', influence: 35, icon: User, color: 'bg-gray-500' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">FlowSense AI Analytics</h3>
            <p className="text-sm text-gray-500">Personalized glucose modeling with hormonal insights</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Model: FlowSense v2.3</p>
          <p className="text-xs text-gray-500">Enhanced with hormonal data</p>
        </div>
      </div>

      {/* User Profile Integration */}
      <div className="bg-slate-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Current Profile Parameters</h4>
        <div className="grid grid-cols-5 gap-4 text-sm">
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
            <span className="text-gray-600">Stress:</span>
            <span className="ml-2 font-medium">Level {userProfile.currentStress}/5</span>
          </div>
          {userProfile.gender === 'female' && !userProfile.isPregnant && (
            <div>
              <span className="text-pink-600">Cycle:</span>
              <span className="ml-2 font-medium text-pink-700">Day {userProfile.menstrualCycleDay} ({getMenstrualPhase()})</span>
            </div>
          )}
        </div>
      </div>

      {/* Hormonal Impact Notice */}
      {userProfile.gender === 'female' && (
        <div className="bg-pink-50 p-4 rounded-lg mb-6 border border-pink-200">
          <div className="flex items-center space-x-2 mb-2">
            <Moon className="h-4 w-4 text-pink-600" />
            <h4 className="font-medium text-pink-900">Hormonal Cycle Impact</h4>
          </div>
          <p className="text-sm text-pink-800">
            <strong>{getMenstrualPhase()} Phase:</strong> {
              getMenstrualPhase() === 'Ovulation' ? 'Increased insulin resistance may cause higher glucose levels. Consider reducing carb intake by 20-30%.' :
              getMenstrualPhase() === 'Luteal' ? 'Progesterone may increase insulin resistance. Monitor glucose more closely.' :
              getMenstrualPhase() === 'Menstrual' ? 'Hormonal fluctuations may cause glucose variability. Stay hydrated and maintain regular meals.' :
              'Estrogen levels rising may improve insulin sensitivity. Good time for normal carb intake.'
            }
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

      {/* Parameter Influence Chart */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Parameter Influence on Predictions</h4>
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

      {/* Predictions */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">AI Predictions & Recommendations</h4>
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
          <span>Data sources: CGM, meal logs, exercise tracker, profile data, hormonal cycle</span>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;