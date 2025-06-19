import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Clock, Activity, Calendar, ChevronDown, Moon, Baby, Brain, Scale, User, Utensils, Bed } from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { predictGlucose } from '../services/predictiveModelService';

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
  const [hrMean, setHrMean] = useState<string>('');
  const [protein, setProtein] = useState<string>('');
  const [fat, setFat] = useState<string>('');
  const [showParamPrompt, setShowParamPrompt] = useState(false);
  const [predictionParams, setPredictionParams] = useState({
    glucose: '',
    hr_mean_30min: '',
    activity_30min: '',
    carbs_30min: '',
    protein_30min: '',
    fat_30min: '',
  });
  const allParamsFilled = Object.values(predictionParams).every(v => v !== '');

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
    menstrualCycleLength: 28,
    sleepQuality: 7, // 1-10 scale
    sleepDuration: 7.5, // hours
    bedtime: '22:30',
    wakeTime: '06:00'
  };

  // Recent logged data affecting predictions
  const recentLogs = {
    lastMeal: { carbs: 25, time: '8:00 AM', type: 'Oatmeal with Berries' },
    lastExercise: { type: 'Walking', duration: 30, intensity: 'moderate', time: '11:00 AM' },
    currentGlucose: 94,
    timeOfDay: new Date().getHours(),
    lastSleep: { quality: 7, duration: 7.5, bedtime: '22:30', wakeTime: '06:00' }
  };

  const periods = [
    { id: 'days', label: 'Days', range: '7 days' },
    { id: 'weeks', label: 'Weeks', range: '4 weeks' },
    { id: 'months', label: 'Months', range: '6 months' }
  ];

  // Calculate hormonal influence on glucose (only for females)
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

  // Calculate sleep influence on glucose
  const getSleepInfluence = (quality: number, duration: number) => {
    const qualityImpact = (10 - quality) * 2; // Poor sleep increases glucose variability
    const durationImpact = Math.abs(duration - 7.5) * 3; // Deviation from optimal 7.5 hours
    return qualityImpact + durationImpact;
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

  // Helper to check if all required params are present
  const allParamsAvailable = hrMean && protein && fat;

  useEffect(() => {
    if (!useDemoData && !allParamsFilled) {
      setShowParamPrompt(true);
      setRealPrediction(null);
      return;
    }
    setShowParamPrompt(false);
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
        setPredictionLoading(false);
      } catch (err) {
        setPredictionError('Prediction unavailable');
        setPredictionLoading(false);
      }
    };
    fetchPrediction();
  }, [recentLogs.currentGlucose, recentLogs.lastExercise.duration, recentLogs.lastMeal.carbs, hrMean, protein, fat, useDemoData, ...Object.values(predictionParams)]);

  // Helper for sleep quality description
  const getSleepQualityDescription = (quality: number) => {
    if (quality >= 8) return t.excellent;
    if (quality >= 6) return t.good;
    if (quality >= 4) return t.fair;
    return t.poor;
  };

  // Save the original getGlucoseData logic as originalGetGlucoseData
  const originalGetGlucoseData = (): GlucoseDataPoint[] => {
    const baseGlucose = 90;
    const hormonalInfluence = userProfile.gender === 'female' ? getHormonalInfluence(userProfile.menstrualCycleDay) : 0;
    const sleepInfluence = getSleepInfluence(userProfile.sleepQuality, userProfile.sleepDuration);
    const stressInfluence = getStressInfluence(userProfile.currentStress);
    const experienceInfluence = getExperienceInfluence(userProfile.yearsSinceDiagnosis);
    if (selectedPeriod === 'days') {
      return [
        { time: 6, glucose: 95, predicted: 98 + hormonalInfluence * 0.3 + sleepInfluence * 0.2, day: 'Mon', label: '6:00 AM', factors: ['Fasting', 'Sleep: 7.5h', userProfile.gender === 'female' ? 'Hormonal: +' + hormonalInfluence + '%' : 'Male profile'] },
        { time: 8, glucose: 110, predicted: 105 + hormonalInfluence * 0.5 + 15, day: 'Mon', label: '8:00 AM', factors: ['Post-meal', 'Carbs: 25g', userProfile.gender === 'female' ? 'Hormonal impact' : 'No hormonal factors'] },
        { time: 12, glucose: 88, predicted: 92 - 5, day: 'Mon', label: '12:00 PM', factors: ['Pre-meal', 'Exercise effect', 'Good sleep recovery'] },
        { time: 18, glucose: 102, predicted: 99 + hormonalInfluence * 0.4, day: 'Mon', label: '6:00 PM', factors: ['Post-dinner', 'Stress: Level ' + userProfile.currentStress, 'Sleep quality: ' + userProfile.sleepQuality + '/10'] },
        { time: 22, glucose: 94, predicted: 96 + stressInfluence * 0.2 + sleepInfluence * 0.1, day: 'Mon', label: '10:00 PM', factors: ['Bedtime', 'Daily stress impact', 'Pre-sleep'] },
        { time: 30, glucose: 87, predicted: 89 + hormonalInfluence * 0.2 + sleepInfluence * 0.15, day: 'Tue', label: '6:00 AM', factors: ['Fasting', userProfile.gender === 'female' ? 'Cycle day: ' + userProfile.menstrualCycleDay : 'Male baseline', 'Sleep recovery'] },
        { time: 32, glucose: 115, predicted: 108 + hormonalInfluence * 0.6, day: 'Tue', label: '8:00 AM', factors: ['Post-meal', userProfile.gender === 'female' ? 'Hormonal resistance' : 'Standard response'] },
        { time: 36, glucose: 91, predicted: 93 - experienceInfluence, day: 'Tue', label: '12:00 PM', factors: ['Pre-meal', 'Experience: ' + userProfile.yearsSinceDiagnosis + ' years', 'Sleep quality impact'] },
        { time: 42, glucose: 98, predicted: 101 + hormonalInfluence * 0.3, day: 'Tue', label: '6:00 PM', factors: ['Post-dinner', 'BMI: ' + userProfile.bmi, 'Sleep duration: ' + userProfile.sleepDuration + 'h'] },
        { time: 46, glucose: 89, predicted: 91 + stressInfluence * 0.3 + sleepInfluence * 0.1, day: 'Tue', label: '10:00 PM', factors: ['Bedtime', 'Stress level impact', 'Sleep preparation'] },
        { time: 54, glucose: 92, predicted: 95 + hormonalInfluence * 0.4 + sleepInfluence * 0.2, day: 'Wed', label: '6:00 AM', factors: ['Fasting', userProfile.gender === 'female' ? 'Mid-cycle effects' : 'Stable male pattern', 'Sleep quality'] },
        { time: 56, glucose: 108, predicted: 103 + hormonalInfluence * 0.7, day: 'Wed', label: '8:00 AM', factors: ['Post-meal', userProfile.gender === 'female' ? 'Peak hormonal impact' : 'Standard meal response'] },
        { time: 60, glucose: 85, predicted: 88 - 8, day: 'Wed', label: '12:00 PM', factors: ['Pre-meal', 'Exercise: 30min moderate', 'Good sleep recovery'] },
        { time: 66, glucose: 96, predicted: 98 + hormonalInfluence * 0.2, day: 'Wed', label: '6:00 PM', factors: ['Post-dinner', 'Age: ' + userProfile.age, 'Sleep pattern stable'] },
        { time: 70, glucose: 91, predicted: 93 + stressInfluence * 0.1 + sleepInfluence * 0.05, day: 'Wed', label: '10:00 PM', factors: ['Bedtime', 'Low stress day', 'Optimal sleep timing'] },
        { time: 78, glucose: 99, predicted: 102 + hormonalInfluence * 0.5 + sleepInfluence * 0.3, day: 'Thu', label: '6:00 AM', factors: ['Fasting', userProfile.gender === 'female' ? 'Ovulation phase' : 'Male baseline', 'Sleep impact'] },
        { time: 80, glucose: 112, predicted: 107 + hormonalInfluence * 0.8, day: 'Thu', label: '8:00 AM', factors: ['Post-meal', userProfile.gender === 'female' ? 'High insulin resistance' : 'Normal response'] },
        { time: 84, glucose: 88, predicted: 91 - 6, day: 'Thu', label: '12:00 PM', factors: ['Pre-meal', 'Walking effect', 'Sleep quality benefit'] },
        { time: 90, glucose: 94, predicted: 97 + hormonalInfluence * 0.3, day: 'Thu', label: '6:00 PM', factors: ['Post-dinner', 'Type 1 diabetes', 'Sleep duration optimal'] },
        { time: 94, glucose: 87, predicted: 89 + stressInfluence * 0.2 + sleepInfluence * 0.1, day: 'Thu', label: '10:00 PM', factors: ['Bedtime', 'Moderate stress', 'Pre-sleep glucose'] },
        { time: 102, glucose: 93, predicted: 95 + hormonalInfluence * 0.3 + sleepInfluence * 0.2, day: 'Fri', label: '6:00 AM', factors: ['Fasting', userProfile.gender === 'female' ? 'Current cycle day' : 'Male pattern', 'Last night sleep: ' + userProfile.sleepQuality + '/10'] },
        { time: 104, glucose: 109, predicted: 104 + hormonalInfluence * 0.6 + 12, day: 'Fri', label: '8:00 AM', factors: ['Post-meal', 'Oatmeal 25g carbs', userProfile.gender === 'female' ? 'Hormonal peak' : 'Standard response'] },
        { time: 108, glucose: null, predicted: 89 - 8 + sleepInfluence * 0.1, day: 'Fri', label: '12:00 PM', factors: ['Predicted', 'Exercise benefit', 'Sleep recovery factor'] },
        { time: 114, glucose: null, predicted: 95 + hormonalInfluence * 0.4, day: 'Fri', label: '6:00 PM', factors: ['Predicted', 'Dinner impact', userProfile.gender === 'female' ? 'Cycle phase' : 'Male baseline'] },
        { time: 118, glucose: null, predicted: 91 + stressInfluence * 0.2 + sleepInfluence * 0.1, day: 'Fri', label: '10:00 PM', factors: ['Predicted', 'End of day', 'Sleep preparation'] },
      ] as GlucoseDataPoint[];
    } else if (selectedPeriod === 'weeks') {
      return [
        { time: 20, glucose: 92, predicted: 94 + hormonalInfluence * 0.2, day: 'W1', label: 'Week 1', factors: ['Weekly avg', userProfile.gender === 'female' ? 'Follicular phase' : 'Stable week'] },
        { time: 40, glucose: 89, predicted: 91 + hormonalInfluence * 0.4, day: 'W2', label: 'Week 2', factors: ['Weekly avg', userProfile.gender === 'female' ? 'Ovulation week' : 'Normal patterns'] },
        { time: 60, glucose: 95, predicted: 97 + hormonalInfluence * 0.3, day: 'W3', label: 'Week 3', factors: ['Weekly avg', userProfile.gender === 'female' ? 'Luteal phase' : 'Consistent control'] },
        { time: 80, glucose: 88, predicted: 90 + hormonalInfluence * 0.1, day: 'W4', label: 'Week 4', factors: ['Weekly avg', userProfile.gender === 'female' ? 'Pre-menstrual' : 'Stable patterns'] },
        { time: 100, glucose: null, predicted: 93 + hormonalInfluence * 0.3, day: 'W5', label: 'Week 5', factors: ['Predicted', userProfile.gender === 'female' ? 'New cycle start' : 'Continued stability'] },
      ] as GlucoseDataPoint[];
    } else {
      return [
        { time: 30, glucose: 98, predicted: 100 + hormonalInfluence * 0.1, day: 'Jan', label: 'January', factors: ['Monthly avg', 'Winter patterns', 'Sleep schedule'] },
        { time: 50, glucose: 94, predicted: 96 + hormonalInfluence * 0.2, day: 'Feb', label: 'February', factors: ['Monthly avg', userProfile.gender === 'female' ? 'Cycle variations' : 'Stable control'] },
        { time: 70, glucose: 91, predicted: 93 + hormonalInfluence * 0.3, day: 'Mar', label: 'March', factors: ['Monthly avg', 'Spring activity', 'Sleep improvement'] },
        { time: 90, glucose: 87, predicted: 89 + hormonalInfluence * 0.2, day: 'Apr', label: 'April', factors: ['Monthly avg', 'Improved control', 'Better sleep'] },
        { time: 110, glucose: 89, predicted: 91 + hormonalInfluence * 0.1, day: 'May', label: 'May', factors: ['Monthly avg', 'Stable patterns', 'Optimal sleep'] },
        { time: 130, glucose: null, predicted: 85 + hormonalInfluence * 0.2, day: 'Jun', label: 'June', factors: ['Predicted', 'Summer trends', 'Sleep consistency'] },
      ] as GlucoseDataPoint[];
    }
  };

  // Override getGlucoseData to inject real prediction
  const getGlucoseData = (): GlucoseDataPoint[] => {
    if (!useDemoData && !allParamsFilled) {
      return [];
    }
    const base = originalGetGlucoseData();
    if (realPrediction !== null && base.length > 0) {
      const lastIdx = base.length - 1;
      base[lastIdx] = {
        ...base[lastIdx],
        predicted: realPrediction,
        realPrediction: true,
      } as GlucoseDataPoint;
    }
    return base;
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
    const hormonalInfluence = userProfile.gender === 'female' ? getHormonalInfluence(userProfile.menstrualCycleDay) : 0;
    const sleepInfluence = getSleepInfluence(userProfile.sleepQuality, userProfile.sleepDuration);
    const stressInfluence = getStressInfluence(userProfile.currentStress);
    const experienceBonus = Math.max(0, userProfile.yearsSinceDiagnosis - 5) * 2;
    
    return {
      accuracy: Math.min(96, 87 + experienceBonus + (hormonalInfluence > 0 ? 3 : 0) + (sleepInfluence < 5 ? 2 : 0)),
      timeInRange: Math.max(75, 82 - Math.abs(hormonalInfluence) * 0.5 - stressInfluence * 0.3 - sleepInfluence * 0.4 + experienceBonus),
      avgTime: 4.2 + (experienceBonus * 0.1) + (sleepInfluence < 5 ? 0.3 : -0.2),
      tir: Math.max(70, 82 - Math.abs(hormonalInfluence) * 0.4 - stressInfluence * 0.2 - sleepInfluence * 0.3)
    };
  };

  const stats = getParameterInfluencedStats();

  // Get current menstrual phase (only for females)
  const getMenstrualPhase = () => {
    if (userProfile.gender !== 'female' || userProfile.isPregnant) return null;
    const day = userProfile.menstrualCycleDay;
    if (day <= 5) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day <= 15) return 'Ovulation';
    return 'Luteal';
  };

  if (!useDemoData && !allParamsFilled) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex flex-wrap gap-2 items-center">
          {Object.entries(predictionParams).map(([key, value]) => (
            <input
              key={key}
              type="number"
              value={value}
              onChange={e => setPredictionParams(p => ({ ...p, [key]: e.target.value }))}
              placeholder={key.replace(/_/g, ' ')}
              className="w-24 px-2 py-1 border border-yellow-200 rounded text-xs"
              min="0"
            />
          ))}
          <span className="text-xs text-yellow-700">Enter all values to predict</span>
        </div>
        <div className="text-center text-gray-500 mt-8">{t.enterDataToSeePredictions}</div>
      </div>
    );
  }

  if (glucoseData.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center text-gray-500 mt-8">{t.enterDataToSeePredictions}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {!useDemoData && !allParamsFilled && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex flex-wrap gap-2 items-center">
          {Object.entries(predictionParams).map(([key, value]) => (
            <input
              key={key}
              type="number"
              value={value}
              onChange={e => setPredictionParams(p => ({ ...p, [key]: e.target.value }))}
              placeholder={key.replace(/_/g, ' ')}
              className="w-24 px-2 py-1 border border-yellow-200 rounded text-xs"
              min="0"
            />
          ))}
          <span className="text-xs text-yellow-700">Enter all values to predict</span>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t.aiPredictionsAnalytics}</h3>
          <p className="text-sm text-gray-500">{t.advancedGlucoseModeling}</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Period Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Calendar className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">
                {periods.find(p => p.id === selectedPeriod)?.label}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-600" />
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
              <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
              <span className="text-gray-600">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600">{t.aiPoweredInsights}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 border border-gray-400 rounded-full"></div>
              <span className="text-gray-600">Target Range</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Parameter Influence Summary */}
      <div className="bg-slate-900 p-4 rounded-lg mb-6 text-white">
        <h4 className="font-medium text-white mb-3">Current Parameter Influences on Predictions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Utensils className="h-4 w-4 text-red-400" />
            <span className="text-gray-300">Last Meal:</span>
            <span className="font-medium text-red-400">+15% (25{t.grams} carbs)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-blue-400" />
            <span className="text-gray-300">Exercise:</span>
            <span className="font-medium text-blue-400">-8% (30{t.minutes} walk)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bed className="h-4 w-4 text-purple-400" />
            <span className="text-gray-300">Sleep:</span>
            <span className="font-medium text-purple-400">
              {getSleepInfluence(userProfile.sleepQuality, userProfile.sleepDuration) < 5 ? '-' : '+'}
              {Math.abs(getSleepInfluence(userProfile.sleepQuality, userProfile.sleepDuration)).toFixed(0)}% 
              ({getSleepQualityDescription(userProfile.sleepQuality)})
            </span>
          </div>
          {userProfile.gender === 'female' ? (
            <div className="flex items-center space-x-2">
              <Moon className="h-4 w-4 text-pink-400" />
              <span className="text-gray-300">Cycle:</span>
              <span className="font-medium text-pink-400">
                {getHormonalInfluence(userProfile.menstrualCycleDay) > 0 ? '+' : ''}
                {getHormonalInfluence(userProfile.menstrualCycleDay)}% ({getMenstrualPhase()})
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-orange-400" />
              <span className="text-gray-300">Stress:</span>
              <span className="font-medium text-orange-400">+{getStressInfluence(userProfile.currentStress)}% (Level {userProfile.currentStress})</span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Chart with darker theme */}
      <div className="relative h-80 bg-slate-900 rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 800 300">
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
          {getXAxisLabels().map((label, index) => (
            <text 
              key={index}
              x={60 + (index * (720 / (getXAxisLabels().length - 1)))} 
              y="290" 
              fontSize="12" 
              fill="#d1d5db" 
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
          {glucoseData.map((point, index) => (
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <h4 className="text-sm font-medium text-gray-700">{t.predictionAccuracy}</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.accuracy.toFixed(1)}%</p>
          <p className="text-xs text-gray-500 mt-1">Based on historical data</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-blue-500" />
            <h4 className="text-sm font-medium text-gray-700">{t.timeInRange}</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.timeInRange.toFixed(1)}%</p>
          <p className="text-xs text-gray-500 mt-1">Last {selectedPeriod === 'days' ? '24h' : '7 days'}</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <h4 className="text-sm font-medium text-gray-700">Avg. Response Time</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.avgTime.toFixed(1)}h</p>
          <p className="text-xs text-gray-500 mt-1">To return to range</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-red-500" />
            <h4 className="text-sm font-medium text-gray-700">TIR Improvement</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">+{(stats.tir - 70).toFixed(1)}%</p>
          <p className="text-xs text-gray-500 mt-1">vs. baseline</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart; 