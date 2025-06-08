import React, { useState } from 'react';
import { TrendingUp, Target, Clock, Activity, Calendar, ChevronDown, Moon, Baby, Brain, Scale, User, Utensils } from 'lucide-react';

const ProgressChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('days');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  // Comprehensive user profile for predictions
  const userProfile = {
    age: 34,
    diabetesType: 'Type 1',
    height: 165,
    weight: 68,
    bmi: 25.0,
    yearsSinceDiagnosis: 9,
    currentStress: 3,
    gender: 'female',
    isPregnant: false,
    menstrualCycleDay: 14,
    menstrualCycleLength: 28
  };

  // Recent logged data affecting predictions
  const recentLogs = {
    lastMeal: { carbs: 25, time: '8:00 AM', type: 'Oatmeal with Berries' },
    lastExercise: { type: 'Walking', duration: 30, intensity: 'moderate', time: '11:00 AM' },
    currentGlucose: 94,
    timeOfDay: new Date().getHours()
  };

  const periods = [
    { id: 'days', label: 'Days', range: '7 days' },
    { id: 'weeks', label: 'Weeks', range: '4 weeks' },
    { id: 'months', label: 'Months', range: '6 months' }
  ];

  // Calculate hormonal influence on glucose
  const getHormonalInfluence = (cycleDay: number) => {
    if (userProfile.gender !== 'female' || userProfile.isPregnant) return 0;
    
    // Ovulation phase (days 12-16): +15% glucose variability
    if (cycleDay >= 12 && cycleDay <= 16) return 15;
    // Luteal phase (days 17-28): +10% glucose variability  
    if (cycleDay >= 17) return 10;
    // Menstrual phase (days 1-5): +8% glucose variability
    if (cycleDay <= 5) return 8;
    // Follicular phase (days 6-11): -5% glucose variability (improved sensitivity)
    return -5;
  };

  // Calculate stress influence on glucose
  const getStressInfluence = (stressLevel: number) => {
    return (stressLevel - 1) * 3; // 0-12% increase based on stress level 1-5
  };

  // Calculate experience influence (years since diagnosis)
  const getExperienceInfluence = (years: number) => {
    return Math.max(0, 10 - years); // Better control with more experience
  };

  // Calculate meal timing influence
  const getMealTimingInfluence = (hoursSinceMeal: number) => {
    if (hoursSinceMeal < 1) return 20; // Peak post-meal
    if (hoursSinceMeal < 2) return 15;
    if (hoursSinceMeal < 3) return 8;
    return 0;
  };

  // Calculate exercise influence
  const getExerciseInfluence = (hoursSinceExercise: number, intensity: string) => {
    if (hoursSinceExercise > 4) return 0;
    
    const intensityMultiplier = {
      'light': -3,
      'moderate': -8,
      'vigorous': -12
    };
    
    const timeDecay = Math.max(0, 1 - (hoursSinceExercise / 4));
    return (intensityMultiplier[intensity as keyof typeof intensityMultiplier] || 0) * timeDecay;
  };

  // Generate dynamic glucose data based on all parameters
  const getGlucoseData = () => {
    const baseGlucose = 90;
    const hormonalInfluence = getHormonalInfluence(userProfile.menstrualCycleDay);
    const stressInfluence = getStressInfluence(userProfile.currentStress);
    const experienceInfluence = getExperienceInfluence(userProfile.yearsSinceDiagnosis);
    
    if (selectedPeriod === 'days') {
      return [
        // Monday
        { time: 6, glucose: 95, predicted: 98 + hormonalInfluence * 0.3, day: 'Mon', label: '6:00 AM', factors: ['Fasting', 'Hormonal: +' + hormonalInfluence + '%'] },
        { time: 8, glucose: 110, predicted: 105 + hormonalInfluence * 0.5 + 15, day: 'Mon', label: '8:00 AM', factors: ['Post-meal', 'Carbs: 25g', 'Hormonal impact'] },
        { time: 12, glucose: 88, predicted: 92 - 5, day: 'Mon', label: '12:00 PM', factors: ['Pre-meal', 'Exercise effect'] },
        { time: 18, glucose: 102, predicted: 99 + hormonalInfluence * 0.4, day: 'Mon', label: '6:00 PM', factors: ['Post-dinner', 'Stress: Level ' + userProfile.currentStress] },
        { time: 22, glucose: 94, predicted: 96 + stressInfluence * 0.2, day: 'Mon', label: '10:00 PM', factors: ['Bedtime', 'Daily stress impact'] },
        
        // Tuesday
        { time: 30, glucose: 87, predicted: 89 + hormonalInfluence * 0.2, day: 'Tue', label: '6:00 AM', factors: ['Fasting', 'Cycle day: ' + userProfile.menstrualCycleDay] },
        { time: 32, glucose: 115, predicted: 108 + hormonalInfluence * 0.6, day: 'Tue', label: '8:00 AM', factors: ['Post-meal', 'Hormonal resistance'] },
        { time: 36, glucose: 91, predicted: 93 - experienceInfluence, day: 'Tue', label: '12:00 PM', factors: ['Pre-meal', 'Experience: ' + userProfile.yearsSinceDiagnosis + ' years'] },
        { time: 42, glucose: 98, predicted: 101 + hormonalInfluence * 0.3, day: 'Tue', label: '6:00 PM', factors: ['Post-dinner', 'BMI: ' + userProfile.bmi] },
        { time: 46, glucose: 89, predicted: 91 + stressInfluence * 0.3, day: 'Tue', label: '10:00 PM', factors: ['Bedtime', 'Stress level impact'] },
        
        // Wednesday
        { time: 54, glucose: 92, predicted: 95 + hormonalInfluence * 0.4, day: 'Wed', label: '6:00 AM', factors: ['Fasting', 'Mid-cycle effects'] },
        { time: 56, glucose: 108, predicted: 103 + hormonalInfluence * 0.7, day: 'Wed', label: '8:00 AM', factors: ['Post-meal', 'Peak hormonal impact'] },
        { time: 60, glucose: 85, predicted: 88 - 8, day: 'Wed', label: '12:00 PM', factors: ['Pre-meal', 'Exercise: 30min moderate'] },
        { time: 66, glucose: 96, predicted: 98 + hormonalInfluence * 0.2, day: 'Wed', label: '6:00 PM', factors: ['Post-dinner', 'Age: ' + userProfile.age] },
        { time: 70, glucose: 91, predicted: 93 + stressInfluence * 0.1, day: 'Wed', label: '10:00 PM', factors: ['Bedtime', 'Low stress day'] },
        
        // Thursday
        { time: 78, glucose: 99, predicted: 102 + hormonalInfluence * 0.5, day: 'Thu', label: '6:00 AM', factors: ['Fasting', 'Ovulation phase'] },
        { time: 80, glucose: 112, predicted: 107 + hormonalInfluence * 0.8, day: 'Thu', label: '8:00 AM', factors: ['Post-meal', 'High insulin resistance'] },
        { time: 84, glucose: 88, predicted: 91 - 6, day: 'Thu', label: '12:00 PM', factors: ['Pre-meal', 'Walking effect'] },
        { time: 90, glucose: 94, predicted: 97 + hormonalInfluence * 0.3, day: 'Thu', label: '6:00 PM', factors: ['Post-dinner', 'Type 1 diabetes'] },
        { time: 94, glucose: 87, predicted: 89 + stressInfluence * 0.2, day: 'Thu', label: '10:00 PM', factors: ['Bedtime', 'Moderate stress'] },
        
        // Friday (current day with enhanced predictions)
        { time: 102, glucose: 93, predicted: 95 + hormonalInfluence * 0.3, day: 'Fri', label: '6:00 AM', factors: ['Fasting', 'Current cycle day'] },
        { time: 104, glucose: 109, predicted: 104 + hormonalInfluence * 0.6 + 12, day: 'Fri', label: '8:00 AM', factors: ['Post-meal', 'Oatmeal 25g carbs', 'Hormonal peak'] },
        { time: 108, glucose: null, predicted: 89 - 8, day: 'Fri', label: '12:00 PM', factors: ['Predicted', 'Exercise benefit', 'Experience factor'] },
        { time: 114, glucose: null, predicted: 95 + hormonalInfluence * 0.4, day: 'Fri', label: '6:00 PM', factors: ['Predicted', 'Dinner impact', 'Cycle phase'] },
        { time: 118, glucose: null, predicted: 91 + stressInfluence * 0.2, day: 'Fri', label: '10:00 PM', factors: ['Predicted', 'End of day', 'Stress level'] },
      ];
    } else if (selectedPeriod === 'weeks') {
      return [
        { time: 20, glucose: 92, predicted: 94 + hormonalInfluence * 0.2, day: 'W1', label: 'Week 1', factors: ['Weekly avg', 'Follicular phase'] },
        { time: 40, glucose: 89, predicted: 91 + hormonalInfluence * 0.4, day: 'W2', label: 'Week 2', factors: ['Weekly avg', 'Ovulation week'] },
        { time: 60, glucose: 95, predicted: 97 + hormonalInfluence * 0.3, day: 'W3', label: 'Week 3', factors: ['Weekly avg', 'Luteal phase'] },
        { time: 80, glucose: 88, predicted: 90 + hormonalInfluence * 0.1, day: 'W4', label: 'Week 4', factors: ['Weekly avg', 'Pre-menstrual'] },
        { time: 100, glucose: null, predicted: 93 + hormonalInfluence * 0.3, day: 'W5', label: 'Week 5', factors: ['Predicted', 'New cycle start'] },
      ];
    } else {
      return [
        { time: 30, glucose: 98, predicted: 100 + hormonalInfluence * 0.1, day: 'Jan', label: 'January', factors: ['Monthly avg', 'Winter patterns'] },
        { time: 50, glucose: 94, predicted: 96 + hormonalInfluence * 0.2, day: 'Feb', label: 'February', factors: ['Monthly avg', 'Cycle variations'] },
        { time: 70, glucose: 91, predicted: 93 + hormonalInfluence * 0.3, day: 'Mar', label: 'March', factors: ['Monthly avg', 'Spring activity'] },
        { time: 90, glucose: 87, predicted: 89 + hormonalInfluence * 0.2, day: 'Apr', label: 'April', factors: ['Monthly avg', 'Improved control'] },
        { time: 110, glucose: 89, predicted: 91 + hormonalInfluence * 0.1, day: 'May', label: 'May', factors: ['Monthly avg', 'Stable patterns'] },
        { time: 130, glucose: null, predicted: 85 + hormonalInfluence * 0.2, day: 'Jun', label: 'June', factors: ['Predicted', 'Summer trends'] },
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

  // Calculate dynamic statistics based on parameters
  const getParameterInfluencedStats = () => {
    const hormonalInfluence = getHormonalInfluence(userProfile.menstrualCycleDay);
    const stressInfluence = getStressInfluence(userProfile.currentStress);
    const experienceBonus = Math.max(0, userProfile.yearsSinceDiagnosis - 5) * 2;
    
    return {
      accuracy: Math.min(95, 87 + experienceBonus + (hormonalInfluence > 0 ? 3 : 0)),
      timeInRange: Math.max(75, 82 - Math.abs(hormonalInfluence) * 0.5 - stressInfluence * 0.3 + experienceBonus),
      avgTime: 4.2 + (experienceBonus * 0.1),
      tir: Math.max(70, 82 - Math.abs(hormonalInfluence) * 0.4 - stressInfluence * 0.2)
    };
  };

  const stats = getParameterInfluencedStats();

  // Get current menstrual phase
  const getMenstrualPhase = () => {
    if (userProfile.gender !== 'female' || userProfile.isPregnant) return null;
    const day = userProfile.menstrualCycleDay;
    if (day <= 5) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day <= 15) return 'Ovulation';
    return 'Luteal';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Glucose Trends & Predictions</h3>
          <p className="text-sm text-gray-500">AI analysis with comprehensive parameter integration</p>
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
          
          {/* Enhanced Legend */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
              <span className="text-gray-600">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">AI Predicted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 border border-gray-400 rounded-full"></div>
              <span className="text-gray-600">Target Range</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parameter Influence Summary */}
      <div className="bg-slate-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Current Parameter Influences on Predictions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Utensils className="h-4 w-4 text-red-500" />
            <span className="text-gray-600">Last Meal:</span>
            <span className="font-medium text-red-600">+15% (25g carbs)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600">Exercise:</span>
            <span className="font-medium text-blue-600">-8% (30min walk)</span>
          </div>
          {userProfile.gender === 'female' && (
            <div className="flex items-center space-x-2">
              <Moon className="h-4 w-4 text-pink-500" />
              <span className="text-gray-600">Cycle:</span>
              <span className="font-medium text-pink-600">
                {getHormonalInfluence(userProfile.menstrualCycleDay) > 0 ? '+' : ''}
                {getHormonalInfluence(userProfile.menstrualCycleDay)}% ({getMenstrualPhase()})
              </span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-orange-500" />
            <span className="text-gray-600">Stress:</span>
            <span className="font-medium text-orange-600">+{getStressInfluence(userProfile.currentStress)}% (Level {userProfile.currentStress})</span>
          </div>
        </div>
      </div>

      {/* Enhanced Chart */}
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
            <g key={`actual-${index}`}>
              <circle
                cx={60 + (point.time * 6)}
                cy={300 - ((point.glucose - 50) * 2)}
                r="4"
                fill="#475569"
                stroke="#1e293b"
                strokeWidth="2"
              />
              {/* Tooltip on hover */}
              <title>{`${point.label}: ${point.glucose} mg/dL\nFactors: ${point.factors.join(', ')}`}</title>
            </g>
          ))}

          {/* Predicted glucose points with enhanced styling */}
          {glucoseData.map((point, index) => (
            <g key={`predicted-${index}`}>
              <circle
                cx={60 + (point.time * 6)}
                cy={300 - ((point.predicted - 50) * 2)}
                r="3"
                fill={point.glucose === null ? "#3b82f6" : "#60a5fa"}
                opacity={point.glucose === null ? "1" : "0.7"}
                stroke={point.glucose === null ? "#1d4ed8" : "#3b82f6"}
                strokeWidth="1"
              />
              {/* Enhanced tooltip */}
              <title>{`${point.label}: ${Math.round(point.predicted)} mg/dL (predicted)\nInfluencing factors: ${point.factors.join(', ')}`}</title>
            </g>
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

          {/* Enhanced trend line for predictions */}
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

          {/* Confidence bands for predictions */}
          {glucoseData.filter(d => d.glucose === null).map((point, index) => (
            <g key={`confidence-${index}`}>
              <ellipse
                cx={60 + (point.time * 6)}
                cy={300 - ((point.predicted - 50) * 2)}
                rx="8"
                ry="6"
                fill="#3b82f6"
                opacity="0.1"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Enhanced Statistics with Parameter Integration */}
      <div className="mt-6 grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg mx-auto mb-2">
            <TrendingUp className="h-5 w-5 text-slate-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">
            {getHormonalInfluence(userProfile.menstrualCycleDay) > 10 ? 'Variable' : 'Stable'} Trend
          </p>
          <p className="text-xs text-gray-500">{periods.find(p => p.id === selectedPeriod)?.range} analysis</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">{Math.round(stats.accuracy)}% Accuracy</p>
          <p className="text-xs text-gray-500">AI predictions with all parameters</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mx-auto mb-2">
            <Clock className="h-5 w-5 text-gray-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">{stats.avgTime.toFixed(1)} hrs</p>
          <p className="text-xs text-gray-500">Avg time in range</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
            <Activity className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">{Math.round(stats.tir)}% TIR</p>
          <p className="text-xs text-gray-500">This {selectedPeriod.slice(0, -1)}</p>
        </div>
      </div>

      {/* Parameter Impact Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Key influences:</span>
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3 text-gray-500" />
              <span className="text-gray-500">{userProfile.yearsSinceDiagnosis}y experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <Scale className="h-3 w-3 text-gray-500" />
              <span className="text-gray-500">BMI {userProfile.bmi}</span>
            </div>
            {userProfile.gender === 'female' && (
              <div className="flex items-center space-x-2">
                <Moon className="h-3 w-3 text-pink-500" />
                <span className="text-pink-600">Day {userProfile.menstrualCycleDay} ({getMenstrualPhase()})</span>
              </div>
            )}
          </div>
          <span className="text-gray-500">Next update: 5 min</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;