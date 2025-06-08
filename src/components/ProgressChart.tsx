import React, { useState } from 'react';
import { TrendingUp, Target, Clock, Activity, Calendar, ChevronDown } from 'lucide-react';

const ProgressChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('days');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const periods = [
    { id: 'days', label: 'Days', range: '7 days' },
    { id: 'weeks', label: 'Weeks', range: '4 weeks' },
    { id: 'months', label: 'Months', range: '6 months' }
  ];

  // Generate different data sets based on selected period
  const getGlucoseData = () => {
    if (selectedPeriod === 'days') {
      return [
        // Monday
        { time: 6, glucose: 95, predicted: 98, day: 'Mon', label: '6:00 AM' },
        { time: 8, glucose: 110, predicted: 105, day: 'Mon', label: '8:00 AM' },
        { time: 12, glucose: 88, predicted: 92, day: 'Mon', label: '12:00 PM' },
        { time: 18, glucose: 102, predicted: 99, day: 'Mon', label: '6:00 PM' },
        { time: 22, glucose: 94, predicted: 96, day: 'Mon', label: '10:00 PM' },
        
        // Tuesday
        { time: 30, glucose: 87, predicted: 89, day: 'Tue', label: '6:00 AM' },
        { time: 32, glucose: 115, predicted: 108, day: 'Tue', label: '8:00 AM' },
        { time: 36, glucose: 91, predicted: 93, day: 'Tue', label: '12:00 PM' },
        { time: 42, glucose: 98, predicted: 101, day: 'Tue', label: '6:00 PM' },
        { time: 46, glucose: 89, predicted: 91, day: 'Tue', label: '10:00 PM' },
        
        // Wednesday
        { time: 54, glucose: 92, predicted: 95, day: 'Wed', label: '6:00 AM' },
        { time: 56, glucose: 108, predicted: 103, day: 'Wed', label: '8:00 AM' },
        { time: 60, glucose: 85, predicted: 88, day: 'Wed', label: '12:00 PM' },
        { time: 66, glucose: 96, predicted: 98, day: 'Wed', label: '6:00 PM' },
        { time: 70, glucose: 91, predicted: 93, day: 'Wed', label: '10:00 PM' },
        
        // Thursday
        { time: 78, glucose: 99, predicted: 102, day: 'Thu', label: '6:00 AM' },
        { time: 80, glucose: 112, predicted: 107, day: 'Thu', label: '8:00 AM' },
        { time: 84, glucose: 88, predicted: 91, day: 'Thu', label: '12:00 PM' },
        { time: 90, glucose: 94, predicted: 97, day: 'Thu', label: '6:00 PM' },
        { time: 94, glucose: 87, predicted: 89, day: 'Thu', label: '10:00 PM' },
        
        // Friday (current day with predictions)
        { time: 102, glucose: 93, predicted: 95, day: 'Fri', label: '6:00 AM' },
        { time: 104, glucose: 109, predicted: 104, day: 'Fri', label: '8:00 AM' },
        { time: 108, glucose: null, predicted: 89, day: 'Fri', label: '12:00 PM' },
        { time: 114, glucose: null, predicted: 95, day: 'Fri', label: '6:00 PM' },
        { time: 118, glucose: null, predicted: 91, day: 'Fri', label: '10:00 PM' },
      ];
    } else if (selectedPeriod === 'weeks') {
      return [
        { time: 20, glucose: 92, predicted: 94, day: 'W1', label: 'Week 1' },
        { time: 40, glucose: 89, predicted: 91, day: 'W2', label: 'Week 2' },
        { time: 60, glucose: 95, predicted: 97, day: 'W3', label: 'Week 3' },
        { time: 80, glucose: 88, predicted: 90, day: 'W4', label: 'Week 4' },
        { time: 100, glucose: null, predicted: 93, day: 'W5', label: 'Week 5' },
      ];
    } else {
      return [
        { time: 30, glucose: 98, predicted: 100, day: 'Jan', label: 'January' },
        { time: 50, glucose: 94, predicted: 96, day: 'Feb', label: 'February' },
        { time: 70, glucose: 91, predicted: 93, day: 'Mar', label: 'March' },
        { time: 90, glucose: 87, predicted: 89, day: 'Apr', label: 'April' },
        { time: 110, glucose: 89, predicted: 91, day: 'May', label: 'May' },
        { time: 130, glucose: null, predicted: 85, day: 'Jun', label: 'June' },
      ];
    }
  };

  const glucoseData = getGlucoseData();
  const targetRange = { min: 70, max: 140 };
  const optimalRange = { min: 80, max: 120 };

  const getXAxisLabels = () => {
    if (selectedPeriod === 'days') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    } else if (selectedPeriod === 'weeks') {
      return ['W1', 'W2', 'W3', 'W4'];
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Glucose Trends & Predictions</h3>
          <p className="text-sm text-gray-500">Analysis with AI forecasting</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Period Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {periods.find(p => p.id === selectedPeriod)?.label}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
            
            {showPeriodDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => {
                      setSelectedPeriod(period.id);
                      setShowPeriodDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedPeriod === period.id ? 'bg-slate-50 text-slate-900 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <div>{period.label}</div>
                    <div className="text-xs text-gray-500">{period.range}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Legend */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
              <span className="text-gray-600">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Predicted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 border border-gray-400 rounded-full"></div>
              <span className="text-gray-600">Target Range</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scatterplot Chart */}
      <div className="relative h-80 bg-gray-50 rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 800 300">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Target range background */}
          <rect 
            x="60" 
            y={300 - ((targetRange.max - 50) * 2)} 
            width="720" 
            height={(targetRange.max - targetRange.min) * 2} 
            fill="#f3f4f6" 
            opacity="0.5"
          />
          
          {/* Optimal range background */}
          <rect 
            x="60" 
            y={300 - ((optimalRange.max - 50) * 2)} 
            width="720" 
            height={(optimalRange.max - optimalRange.min) * 2} 
            fill="#e5e7eb" 
            opacity="0.7"
          />

          {/* Y-axis labels */}
          {[60, 80, 100, 120, 140, 160].map((value, index) => (
            <g key={index}>
              <text 
                x="45" 
                y={300 - ((value - 50) * 2) + 5} 
                fontSize="12" 
                fill="#6b7280" 
                textAnchor="end"
              >
                {value}
              </text>
              <line 
                x1="55" 
                y1={300 - ((value - 50) * 2)} 
                x2="780" 
                y2={300 - ((value - 50) * 2)} 
                stroke="#d1d5db" 
                strokeWidth="1"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {getXAxisLabels().map((label, index) => (
            <text 
              key={index}
              x={60 + (index * (720 / (getXAxisLabels().length - 1)))} 
              y="290" 
              fontSize="12" 
              fill="#6b7280" 
              textAnchor="middle"
            >
              {label}
            </text>
          ))}

          {/* Actual glucose points */}
          {glucoseData.filter(d => d.glucose !== null).map((point, index) => (
            <circle
              key={`actual-${index}`}
              cx={60 + (point.time * 6)}
              cy={300 - ((point.glucose - 50) * 2)}
              r="4"
              fill="#475569"
              stroke="#1e293b"
              strokeWidth="2"
            />
          ))}

          {/* Predicted glucose points */}
          {glucoseData.map((point, index) => (
            <circle
              key={`predicted-${index}`}
              cx={60 + (point.time * 6)}
              cy={300 - ((point.predicted - 50) * 2)}
              r="3"
              fill={point.glucose === null ? "#3b82f6" : "#60a5fa"}
              opacity={point.glucose === null ? "1" : "0.7"}
            />
          ))}

          {/* Trend line for actual data */}
          <path
            d={`M ${glucoseData.filter(d => d.glucose !== null).map((point, index) => 
              `${index === 0 ? 'M' : 'L'} ${60 + (point.time * 6)} ${300 - ((point.glucose - 50) * 2)}`
            ).join(' ')}`}
            fill="none"
            stroke="#475569"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Trend line for predictions */}
          <path
            d={`M ${glucoseData.map((point, index) => 
              `${index === 0 ? 'M' : 'L'} ${60 + (point.time * 6)} ${300 - ((point.predicted - 50) * 2)}`
            ).join(' ')}`}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Chart Statistics */}
      <div className="mt-6 grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg mx-auto mb-2">
            <TrendingUp className="h-5 w-5 text-slate-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">Stable Trend</p>
          <p className="text-xs text-gray-500">{periods.find(p => p.id === selectedPeriod)?.range} analysis</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">87% Accuracy</p>
          <p className="text-xs text-gray-500">AI predictions</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mx-auto mb-2">
            <Clock className="h-5 w-5 text-gray-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">4.2 hrs</p>
          <p className="text-xs text-gray-500">Avg time in range</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
            <Activity className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">82% TIR</p>
          <p className="text-xs text-gray-500">This {selectedPeriod.slice(0, -1)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;