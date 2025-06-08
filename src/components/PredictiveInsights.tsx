import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Clock } from 'lucide-react';

const PredictiveInsights = () => {
  const predictions = [
    {
      type: 'warning',
      title: 'Glucose Spike Risk',
      message: 'Model predicts 15% chance of glucose exceeding 140 mg/dL within 2 hours',
      confidence: 87,
      action: 'Consider light exercise or adjust meal timing',
      icon: AlertTriangle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      timeframe: '2 hours'
    },
    {
      type: 'positive',
      title: 'Stable Period Forecast',
      message: 'High probability of glucose remaining in target range (70-140 mg/dL)',
      confidence: 92,
      action: 'Optimal window for focused work or activities',
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      timeframe: '4 hours'
    },
    {
      type: 'info',
      title: 'Exercise Optimization',
      message: 'Glucose trajectory suggests ideal exercise window approaching',
      confidence: 78,
      action: 'Plan moderate activity between 3:00-4:00 PM for best results',
      icon: Target,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      timeframe: '3 hours'
    }
  ];

  const modelMetrics = [
    { label: 'Prediction Accuracy', value: '87.3%', trend: '+2.1%' },
    { label: 'Data Points Analyzed', value: '2,847', trend: '+156' },
    { label: 'Model Confidence', value: '85.7%', trend: '+1.8%' },
    { label: 'Last Training', value: '2h ago', trend: 'Updated' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">PreSense AI Analytics</h3>
            <p className="text-sm text-gray-500">Predictive glucose modeling & insights</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Model: FlowSense v2.1</p>
          <p className="text-xs text-gray-500">Neural network ensemble</p>
        </div>
      </div>

      {/* Model Performance Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {modelMetrics.map((metric, index) => (
          <div key={index} className="text-center">
            <p className="text-lg font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-gray-600">{metric.label}</p>
            <p className="text-xs text-green-600 font-medium">{metric.trend}</p>
          </div>
        ))}
      </div>

      {/* Predictions */}
      <div className="space-y-4">
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
                <p className="text-sm font-medium text-gray-600 mb-2">{prediction.action}</p>
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
          <span>Data sources: CGM, meal logs, activity tracker</span>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;