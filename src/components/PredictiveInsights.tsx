import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Clock, User, Scale, Activity, Utensils } from 'lucide-react';

const PredictiveInsights = () => {
  const userProfile = {
    age: 34,
    diabetesType: 'Type 1',
    height: 165,
    weight: 68,
    bmi: 25.0,
    currentStress: 3
  };

  const predictions = [
    {
      type: 'warning',
      title: 'Post-Meal Glucose Spike Risk',
      message: 'Based on 25g carbs from breakfast and Type 1 diabetes profile, 18% chance of glucose exceeding 140 mg/dL',
      confidence: 87,
      action: 'Consider 15-minute walk or adjust insulin timing',
      icon: AlertTriangle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      timeframe: '1-2 hours',
      factors: ['Carb content: 25g', 'Meal timing: 8:00 AM', 'Age: 34', 'Type 1 diabetes']
    },
    {
      type: 'positive',
      title: 'Optimal Exercise Window',
      message: 'Current glucose (94 mg/dL) and moderate stress level ideal for physical activity',
      confidence: 92,
      action: 'Perfect time for 30-45 minutes moderate exercise',
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      timeframe: 'Next 2 hours',
      factors: ['Current glucose: 94 mg/dL', 'BMI: 25.0', 'Stress level: Moderate', 'Time since meal: 2 hrs']
    },
    {
      type: 'info',
      title: 'Personalized Meal Recommendation',
      message: 'Based on your profile and current glucose trends, optimal next meal should contain 15-20g carbs',
      confidence: 78,
      action: 'Lean protein + vegetables + small portion complex carbs',
      icon: Target,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      timeframe: 'Lunch (12:00 PM)',
      factors: ['Height/Weight ratio', 'Morning glucose pattern', 'Exercise history', 'Diabetes type']
    }
  ];

  const modelMetrics = [
    { label: 'Prediction Accuracy', value: '89.2%', trend: '+3.1%', description: 'Based on your personal data' },
    { label: 'Data Points Used', value: '3,247', trend: '+189', description: 'Glucose, meals, exercise logs' },
    { label: 'Model Confidence', value: '87.4%', trend: '+2.3%', description: 'Personalization level' },
    { label: 'Profile Completeness', value: '95%', trend: 'Complete', description: 'All key parameters logged' }
  ];

  const parameterInfluence = [
    { parameter: 'Carbohydrate Content', influence: 85, icon: Utensils, color: 'bg-red-500' },
    { parameter: 'Exercise Intensity', influence: 72, icon: Activity, color: 'bg-blue-500' },
    { parameter: 'Time of Day', influence: 68, icon: Clock, color: 'bg-purple-500' },
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
            <p className="text-sm text-gray-500">Personalized glucose modeling & insights</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Model: FlowSense v2.1</p>
          <p className="text-xs text-gray-500">Neural network ensemble</p>
        </div>
      </div>

      {/* User Profile Integration */}
      <div className="bg-slate-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Current Profile Parameters</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Age/Type:</span>
            <span className="ml-2 font-medium">{userProfile.age}y, {userProfile.diabetesType}</span>
          </div>
          <div>
            <span className="text-gray-600">BMI:</span>
            <span className="ml-2 font-medium">{userProfile.bmi}</span>
          </div>
          <div>
            <span className="text-gray-600">Stress:</span>
            <span className="ml-2 font-medium">Level {userProfile.currentStress}/5</span>
          </div>
        </div>
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
          <span>Data sources: CGM, meal logs, exercise tracker, profile data</span>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;