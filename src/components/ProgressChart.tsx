import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TrendingUp, Target, Clock, Activity, Calendar, ChevronDown, Moon, Baby, Brain, Scale, User, Utensils, Bed } from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { predictGlucose } from '../services/predictiveModelService';
import { useProgressChartCalculations } from '../hooks/useProgressChartCalculations';

interface ProgressChartProps {
  language: string;
  useDemoData: boolean;
}

type GlucoseDataPoint = {
  time: number;
  glucose: number | null;
  predicted: number;
  day: string;
  label: string;
  factors: string[];
  realPrediction?: boolean;
};

const ProgressChart: React.FC<ProgressChartProps> = ({ language, useDemoData }) => {
  const t = useTranslation(language);
  const [selectedPeriod, setSelectedPeriod] = useState('days');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [realPrediction, setRealPrediction] = useState<number | null>(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [predictionParams, setPredictionParams] = useState({
    glucose: '',
    hr_mean_30min: '',
    activity_30min: '',
    carbs_30min: '',
    protein_30min: '',
    fat_30min: '',
  });

  // Memoize the allParamsFilled check to prevent unnecessary re-renders
  const allParamsFilled = useMemo(() => 
    Object.values(predictionParams).every(v => v !== ''), 
    [predictionParams]
  );

  // Use custom hook for calculations
  const {
    userProfile,
    getHormonalInfluence,
    getSleepInfluence,
    getStressInfluence,
    getExperienceInfluence,
    getMealTimingInfluence,
    getExerciseInfluence,
    getXAxisLabels,
    getParameterInfluencedStats,
    getMenstrualPhase,
    originalGetGlucoseData,
    getGlucoseData
  } = useProgressChartCalculations({
    selectedPeriod,
    realPrediction,
    allParamsFilled,
    predictionParams,
    useDemoData
  });

  // Memoize derived/calculated data
  const glucoseData = useMemo(() => getGlucoseData(), [getGlucoseData]);
  const stats = useMemo(() => getParameterInfluencedStats(), [getParameterInfluencedStats]);
  const xAxisLabels = useMemo(() => getXAxisLabels(), [getXAxisLabels]);

  // Optimized useEffect with proper error handling
  useEffect(() => {
    if (!useDemoData && !allParamsFilled) {
      setRealPrediction(null);
      return;
    }

    const fetchPrediction = async () => {
      setPredictionLoading(true);
      setPredictionError(null);
      
      try {
        let input;
        if (useDemoData) {
          const now = new Date();
          const hours = now.getHours() + now.getMinutes() / 60;
          input = {
            glucose: 100,
            hr_mean_30min: 72,
            activity_30min: 3.2,
            carbs_30min: 40,
            protein_30min: 15,
            fat_30min: 10,
            time_sin: Math.sin((2 * Math.PI * hours) / 24),
            time_cos: Math.cos((2 * Math.PI * hours) / 24),
          };
        } else {
          const now = new Date();
          const hours = now.getHours() + now.getMinutes() / 60;
          input = {
            glucose: parseFloat(predictionParams.glucose),
            hr_mean_30min: parseFloat(predictionParams.hr_mean_30min),
            activity_30min: parseFloat(predictionParams.activity_30min),
            carbs_30min: parseFloat(predictionParams.carbs_30min),
            protein_30min: parseFloat(predictionParams.protein_30min),
            fat_30min: parseFloat(predictionParams.fat_30min),
            time_sin: Math.sin((2 * Math.PI * hours) / 24),
            time_cos: Math.cos((2 * Math.PI * hours) / 24),
          };
        }
        
        const res = await predictGlucose(input);
        setRealPrediction(res.predicted_glucose_30min);
      } catch (err) {
        console.error('Prediction error:', err);
        setPredictionError('Prediction unavailable. Please try again later.');
        setRealPrediction(null);
      } finally {
        setPredictionLoading(false);
      }
    };

    fetchPrediction();
  }, [useDemoData, allParamsFilled, predictionParams]);

  // Memoized callback for parameter updates
  const handleParamChange = useCallback((key: string, value: string) => {
    setPredictionParams(prev => ({ ...prev, [key]: value }));
  }, []);

  const periods = [
    { id: 'days', label: 'Days', range: '7 days' },
    { id: 'weeks', label: 'Weeks', range: '4 weeks' },
    { id: 'months', label: 'Months', range: '6 months' }
  ];

  // Helper for sleep quality description
  const getSleepQualityDescription = useCallback((quality: number) => {
    if (quality >= 8) return t.excellent;
    if (quality >= 6) return t.good;
    if (quality >= 4) return t.fair;
    return t.poor;
  }, [t]);

  const targetRange = { min: 70, max: 140 };
  const optimalRange = { min: 80, max: 120 };

  // Early return for missing data
  if (!useDemoData && !allParamsFilled) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 md:p-6">
        <div className="mb-4 md:mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 md:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {Object.entries(predictionParams).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="text-xs text-yellow-700 dark:text-yellow-300 font-medium mb-1">
                  {key.replace(/_/g, ' ')}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={e => handleParamChange(key, e.target.value)}
                  placeholder="0"
                  className="w-full px-2 py-2 md:py-1 border border-yellow-200 dark:border-yellow-700 rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>
            ))}
          </div>
          <div className="text-xs text-yellow-700 dark:text-yellow-300 mt-2 text-center">
            Enter all values to see predictions
          </div>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 mt-6 md:mt-8">{t.enterDataToSeePredictions}</div>
      </div>
    );
  }

  if (glucoseData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 md:p-6">
        <div className="text-center text-gray-500 dark:text-gray-400 mt-6 md:mt-8">{t.enterDataToSeePredictions}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 md:p-6">
      {!useDemoData && !allParamsFilled && (
        <div className="mb-4 md:mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 md:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {Object.entries(predictionParams).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="text-xs text-yellow-700 dark:text-yellow-300 font-medium mb-1">
                  {key.replace(/_/g, ' ')}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={e => handleParamChange(key, e.target.value)}
                  placeholder="0"
                  className="w-full px-2 py-2 md:py-1 border border-yellow-200 dark:border-yellow-700 rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>
            ))}
          </div>
          <div className="text-xs text-yellow-700 dark:text-yellow-300 mt-2 text-center">
            Enter all values to see predictions
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{t.aiPredictionsAnalytics}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.advancedGlucoseModeling}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Period Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
            >
              <Calendar className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {periods.find(p => p.id === selectedPeriod)?.label}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            </button>
            
            {showPeriodDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => {
                      setSelectedPeriod(period.id);
                      setShowPeriodDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg ${
                      selectedPeriod === period.id ? 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div>{period.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{period.range}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Enhanced Legend */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-700 dark:bg-slate-300 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">{t.aiPoweredInsights}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 border border-gray-400 dark:border-gray-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">Target Range</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Parameter Influence Summary */}
      <div className="bg-slate-900 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-white">
        <h4 className="font-medium text-white mb-3 text-sm md:text-base">Current Parameter Influences on Predictions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">
          <div className="flex items-center space-x-2">
            <Utensils className="h-4 w-4 text-red-400 flex-shrink-0" />
            <span className="text-gray-300">Last Meal:</span>
            <span className="font-medium text-red-400">+15% (25{t.grams} carbs)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className="text-gray-300">Exercise:</span>
            <span className="font-medium text-blue-400">-8% (30{t.minutes} walk)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bed className="h-4 w-4 text-purple-400 flex-shrink-0" />
            <span className="text-gray-300">Sleep:</span>
            <span className="font-medium text-purple-400">
              {getSleepInfluence(userProfile.sleepQuality, userProfile.sleepDuration) < 5 ? '-' : '+'}
              {Math.abs(getSleepInfluence(userProfile.sleepQuality, userProfile.sleepDuration)).toFixed(0)}% 
              ({getSleepQualityDescription(userProfile.sleepQuality)})
            </span>
          </div>
          {userProfile.gender === 'female' ? (
            <div className="flex items-center space-x-2">
              <Moon className="h-4 w-4 text-pink-400 flex-shrink-0" />
              <span className="text-gray-300">Cycle:</span>
              <span className="font-medium text-pink-400">
                {getHormonalInfluence(userProfile.menstrualCycleDay) > 0 ? '+' : ''}
                {getHormonalInfluence(userProfile.menstrualCycleDay)}% ({getMenstrualPhase()})
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-orange-400 flex-shrink-0" />
              <span className="text-gray-300">Stress:</span>
              <span className="font-medium text-orange-400">+{getStressInfluence(userProfile.currentStress)}% (Level {userProfile.currentStress})</span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Chart with darker theme */}
      <div className="relative h-64 md:h-80 bg-slate-900 rounded-lg p-3 md:p-4 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#374151" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Target range background */}
          <rect 
            x="60" 
            y={300 - ((targetRange.max - 50) * 2)} 
            width="720" 
            height={(targetRange.max - targetRange.min) * 2} 
            fill="#1f2937" 
            opacity="0.6"
          />
          
          {/* Optimal range background */}
          <rect 
            x="60" 
            y={300 - ((optimalRange.max - 50) * 2)} 
            width="720" 
            height={(optimalRange.max - optimalRange.min) * 2} 
            fill="#374151" 
            opacity="0.8"
          />

          {/* Y-axis labels */}
          {[60, 80, 100, 120, 140, 160].map((value, index) => (
            <g key={index}>
              <text 
                x="45" 
                y={300 - ((value - 50) * 2) + 5} 
                fontSize="12" 
                fill="#d1d5db" 
                textAnchor="end"
              >
                {value} {t.mgdl}
              </text>
              <line 
                x1="55" 
                y1={300 - ((value - 50) * 2)} 
                x2="780" 
                y2={300 - ((value - 50) * 2)} 
                stroke="#4b5563" 
                strokeWidth="1"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {xAxisLabels.map((label: string, index: number) => (
            <text 
              key={index}
              x={60 + (index * (720 / (xAxisLabels.length - 1)))} 
              y="290" 
              fontSize="12" 
              fill="#d1d5db" 
              textAnchor="middle"
            >
              {label}
            </text>
          ))}

          {/* Actual glucose points */}
          {glucoseData.filter((d: GlucoseDataPoint) => d.glucose !== null).map((point: GlucoseDataPoint, index: number) => (
            <g key={`actual-${index}`}>
              <circle
                cx={60 + (point.time * 6)}
                cy={300 - (((point.glucose ?? 0) - 50) * 2)}
                r="4"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="2"
              />
              {/* Tooltip on hover */}
              <title>{`${point.label}: ${point.glucose} ${t.mgdl}\nFactors: ${point.factors.join(', ')}`}</title>
            </g>
          ))}

          {/* Predicted glucose points with enhanced styling */}
          {glucoseData.map((point: GlucoseDataPoint, index: number) => (
            <g key={`predicted-${index}`}>
              <circle
                cx={60 + (point.time * 6)}
                cy={300 - (((point.predicted - 50) * 2))}
                r={point.realPrediction ? 6 : 3}
                fill={point.realPrediction ? "#f59e42" : (point.glucose === null ? "#2563eb" : "#3b82f6")}
                opacity={point.glucose === null ? "1" : "0.8"}
                stroke={point.realPrediction ? "#f59e42" : (point.glucose === null ? "#1d4ed8" : "#2563eb")}
                strokeWidth={point.realPrediction ? 3 : 1}
              />
              {/* Enhanced tooltip */}
              <title>{`${point.label}: ${Math.round(point.predicted)} ${t.mgdl} (${point.realPrediction ? 'Real Prediction' : t.aiPoweredInsights})\nFactors: ${point.factors.join(', ')}`}</title>
            </g>
          ))}

          {/* Trend line for actual data */}
          <path
            d={`M ${glucoseData.filter(d => d.glucose !== null).map((point, index) => 
              `${index === 0 ? 'M' : 'L'} ${60 + (point.time * 6)} ${300 - (((point.glucose ?? 0) - 50) * 2)}`
            ).join(' ')}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            opacity="0.8"
          />

          {/* Enhanced trend line for predictions */}
          <path
            d={`M ${glucoseData.map((point, index) => 
              `${index === 0 ? 'M' : 'L'} ${60 + (point.time * 6)} ${300 - (((point.predicted - 50) * 2))}`
            ).join(' ')}`}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeDasharray="6,6"
            opacity="0.9"
          />

          {/* Confidence bands for predictions */}
          {glucoseData.filter(d => d.glucose === null).map((point, index) => (
            <g key={`confidence-${index}`}>
              <ellipse
                cx={60 + (point.time * 6)}
                cy={300 - (((point.predicted - 50) * 2))}
                rx="10"
                ry="8"
                fill="#2563eb"
                opacity="0.15"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
        <div className="bg-slate-50 dark:bg-slate-700 p-3 md:p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
            <h4 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{t.predictionAccuracy}</h4>
          </div>
          <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{stats.accuracy.toFixed(1)}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on historical data</p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-700 p-3 md:p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
            <h4 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{t.timeInRange}</h4>
          </div>
          <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{stats.timeInRange.toFixed(1)}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last {selectedPeriod === 'days' ? '24h' : '7 days'}</p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-700 p-3 md:p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
            <h4 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">Avg. Response Time</h4>
          </div>
          <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{stats.avgTime.toFixed(1)}h</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">To return to range</p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-700 p-3 md:p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
            <h4 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">TIR Improvement</h4>
          </div>
          <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">+{(stats.tir - 70).toFixed(1)}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs. baseline</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart; 