import React from 'react';
import ProgressChart from './ProgressChart';
import PredictiveInsights from './PredictiveInsights';
import { Brain, TrendingUp, Target, Activity } from 'lucide-react';

const PredictionsTab = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Predictions & Analytics</h2>
        <p className="text-gray-600">Advanced glucose modeling with comprehensive parameter analysis and forecasting.</p>
      </div>

      {/* AI Status Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">FlowSense AI Analytics Engine</h3>
            <p className="text-slate-200 mb-4">
              Advanced neural network ensemble analyzing your glucose patterns with comprehensive parameter integration including hormonal cycles, sleep quality, exercise impact, and meal timing.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">Prediction Accuracy</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">93.1%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Target className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">Model Confidence</span>
                </div>
                <p className="text-2xl font-bold text-green-400">91.2%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Activity className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium">Data Points</span>
                </div>
                <p className="text-2xl font-bold text-purple-400">3,247</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Content */}
      <div className="space-y-8">
        {/* FlowSense AI Insights */}
        <PredictiveInsights />
        
        {/* Glucose Trends & Predictions Chart */}
        <ProgressChart />
      </div>

      {/* Additional Analytics Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Prediction Horizon</h4>
            <p className="text-sm text-blue-800">
              AI can accurately predict glucose trends up to 4 hours in advance with 93% accuracy, considering all logged parameters including hormonal cycles, sleep patterns, and meal composition.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Parameter Integration</h4>
            <p className="text-sm text-green-800">
              The model analyzes 15+ parameters including carbohydrate content, exercise intensity, sleep quality, stress levels, and for females, menstrual cycle phases for enhanced accuracy.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Continuous Learning</h4>
            <p className="text-sm text-purple-800">
              The AI model continuously learns from your data patterns, improving predictions over time. With 9 years of diabetes experience logged, predictions are highly personalized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsTab;