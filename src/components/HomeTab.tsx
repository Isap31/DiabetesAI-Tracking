import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import DailyAffirmation from './DailyAffirmation';
import { Droplets, Target, Clock, Heart, TrendingUp, Plus, X, Save, Utensils, Activity, User, Scale, Calendar, Thermometer, Brain } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface HomeTabProps {
  allLogs: any[];
  onDataLogged: (data: any) => void;
  language: string;
}

const HomeTab: React.FC<HomeTabProps> = ({ allLogs, onDataLogged, language }) => {
  const t = useTranslation(language);
  const [showLogForm, setShowLogForm] = useState(false);
  const [logType, setLogType] = useState<'meal' | 'exercise' | 'glucose' | 'profile'>('meal');
  const [logData, setLogData] = useState({
    // Meal fields
    mealName: '',
    carbs: '',
    calories: '',
    // Exercise fields
    exerciseType: '',
    duration: '',
    intensity: 'moderate',
    // Glucose fields
    glucose: '',
    context: 'fasting',
    notes: '',
    // Profile fields
    age: '',
    diabetesType: 'Type 1',
    height: '',
    weight: '',
    stressLevel: '3',
    gender: 'female',
    sleepQuality: '7',
    sleepDuration: '7.5',
    // Common fields
    time: new Date().toTimeString().slice(0, 5),
    date: new Date().toISOString().split('T')[0]
  });

  const [userProfile, setUserProfile] = useState({
    age: 34,
    diabetesType: 'Type 1',
    height: 165, // cm
    weight: 68, // kg
    bmi: 25.0,
    diagnosisDate: '2015-03-20',
    gender: 'female',
    sleepQuality: 7,
    sleepDuration: 7.5
  });

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let newLog;
    
    if (logType === 'profile') {
      // Update user profile instead of creating a log
      const updatedProfile = {
        age: parseInt(logData.age) || userProfile.age,
        diabetesType: logData.diabetesType,
        height: parseInt(logData.height) || userProfile.height,
        weight: parseInt(logData.weight) || userProfile.weight,
        bmi: calculateBMI(parseInt(logData.height) || userProfile.height, parseInt(logData.weight) || userProfile.weight),
        diagnosisDate: userProfile.diagnosisDate,
        gender: logData.gender,
        sleepQuality: parseInt(logData.sleepQuality) || userProfile.sleepQuality,
        sleepDuration: parseFloat(logData.sleepDuration) || userProfile.sleepDuration
      };
      setUserProfile(updatedProfile);
      console.log('Profile updated:', updatedProfile);
    } else {
      newLog = {
        id: Date.now(),
        type: logType,
        data: logType === 'meal' 
          ? { 
              mealName: logData.mealName, 
              carbs: logData.carbs, 
              calories: logData.calories,
              time: logData.time
            }
          : logType === 'exercise'
          ? { 
              exerciseType: logData.exerciseType, 
              duration: logData.duration, 
              intensity: logData.intensity,
              time: logData.time
            }
          : { 
              glucose: logData.glucose, 
              context: logData.context, 
              notes: logData.notes,
              time: logData.time
            },
        time: logData.time,
        date: logData.date
      };

      onDataLogged(newLog);
      console.log('New log entry:', newLog);
    }
    
    // Reset form
    setLogData({
      mealName: '', carbs: '', calories: '',
      exerciseType: '', duration: '', intensity: 'moderate',
      glucose: '', context: 'fasting', notes: '',
      age: '', diabetesType: 'Type 1', height: '', weight: '', stressLevel: '3',
      gender: 'female', sleepQuality: '7', sleepDuration: '7.5',
      time: new Date().toTimeString().slice(0, 5),
      date: new Date().toISOString().split('T')[0]
    });
    setShowLogForm(false);
  };

  const calculateBMI = (height: number, weight: number) => {
    if (height && weight) {
      const heightInMeters = height / 100;
      return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return 0;
  };

  const openLogForm = (type: 'meal' | 'exercise' | 'glucose' | 'profile') => {
    setLogType(type);
    if (type === 'profile') {
      setLogData({
        ...logData,
        age: userProfile.age.toString(),
        diabetesType: userProfile.diabetesType,
        height: userProfile.height.toString(),
        weight: userProfile.weight.toString(),
        gender: userProfile.gender,
        sleepQuality: userProfile.sleepQuality.toString(),
        sleepDuration: userProfile.sleepDuration.toString()
      });
    }
    setShowLogForm(true);
  };

  const formatLogDisplay = (log: any) => {
    switch (log.type) {
      case 'meal':
        return `${log.data.mealName} (${log.data.carbs}g carbs)`;
      case 'exercise':
        return `${log.data.exerciseType} (${log.data.duration} min, ${log.data.intensity})`;
      case 'glucose':
        return `${log.data.glucose} mg/dL (${log.data.context})`;
      default:
        return 'Unknown entry';
    }
  };

  const getStressLevelText = (level: string) => {
    const levels = {
      '1': 'Very Low',
      '2': 'Low', 
      '3': 'Moderate',
      '4': 'High',
      '5': 'Very High'
    };
    return levels[level as keyof typeof levels] || 'Moderate';
  };

  const getSleepQualityText = (quality: number) => {
    if (quality >= 8) return t.excellent;
    if (quality >= 6) return t.good;
    if (quality >= 4) return t.fair;
    return t.poor;
  };

  return (
    <div className="space-y-8">
      {/* Universal Log Form Modal */}
      {showLogForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {logType === 'profile' ? t.updateProfile : `Log ${logType.charAt(0).toUpperCase() + logType.slice(1)}`}
              </h3>
              <button 
                onClick={() => setShowLogForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleLogSubmit} className="space-y-4">
              {/* Common fields for non-profile logs */}
              {logType !== 'profile' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={logData.date}
                      onChange={(e) => setLogData({...logData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.time}</label>
                    <input
                      type="time"
                      value={logData.time}
                      onChange={(e) => setLogData({...logData, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Meal-specific fields */}
              {logType === 'meal' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.mealName}</label>
                    <input
                      type="text"
                      value={logData.mealName}
                      onChange={(e) => setLogData({...logData, mealName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="e.g., Grilled Chicken Salad"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center space-x-1">
                          <span>{t.carbohydrates} ({t.grams})</span>
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        value={logData.carbs}
                        onChange={(e) => setLogData({...logData, carbs: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="15"
                        min="0"
                        step="0.1"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Critical for glucose prediction</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.calories}</label>
                      <input
                        type="number"
                        value={logData.calories}
                        onChange={(e) => setLogData({...logData, calories: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="350"
                        min="0"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Exercise-specific fields */}
              {logType === 'exercise' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Type</label>
                    <select
                      value={logData.exerciseType}
                      onChange={(e) => setLogData({...logData, exerciseType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      required
                    >
                      <option value="">Select exercise type</option>
                      <option value="Walking">Walking</option>
                      <option value="Running">Running</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Weight Training">Weight Training</option>
                      <option value="Yoga">Yoga</option>
                      <option value="Dancing">Dancing</option>
                      <option value="Sports">Sports</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center space-x-1">
                          <span>Duration ({t.minutes})</span>
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        value={logData.duration}
                        onChange={(e) => setLogData({...logData, duration: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="30"
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center space-x-1">
                          <span>Intensity</span>
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <select
                        value={logData.intensity}
                        onChange={(e) => setLogData({...logData, intensity: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      >
                        <option value="light">Light</option>
                        <option value="moderate">Moderate</option>
                        <option value="vigorous">Vigorous</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Exercise Impact:</strong> Duration and intensity affect glucose response and are used for AI predictions.
                    </p>
                  </div>
                </>
              )}

              {/* Glucose-specific fields */}
              {logType === 'glucose' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center space-x-1">
                        <span>Current Glucose Level ({t.mgdl})</span>
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      value={logData.glucose}
                      onChange={(e) => setLogData({...logData, glucose: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="94"
                      min="40"
                      max="400"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">From CGM or manual testing</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Context</label>
                    <select
                      value={logData.context}
                      onChange={(e) => setLogData({...logData, context: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="fasting">Fasting</option>
                      <option value="before-meal">Before Meal</option>
                      <option value="after-meal">After Meal (1-2 hrs)</option>
                      <option value="bedtime">Bedtime</option>
                      <option value="random">Random</option>
                      <option value="exercise">During/After Exercise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                    <textarea
                      value={logData.notes}
                      onChange={(e) => setLogData({...logData, notes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="How are you feeling? Any symptoms?"
                      rows={2}
                    />
                  </div>
                </>
              )}

              {/* Profile-specific fields */}
              {logType === 'profile' && (
                <>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center space-x-1">
                            <span>Age</span>
                            <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          value={logData.age}
                          onChange={(e) => setLogData({...logData, age: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                          placeholder="34"
                          min="1"
                          max="120"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center space-x-1">
                            <span>Gender</span>
                            <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <select
                          value={logData.gender}
                          onChange={(e) => setLogData({...logData, gender: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                          <option value="female">{t.female}</option>
                          <option value="male">{t.male}</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center space-x-1">
                          <span>{t.diabetesType}</span>
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <select
                        value={logData.diabetesType}
                        onChange={(e) => setLogData({...logData, diabetesType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      >
                        <option value="Type 1">{t.type1}</option>
                        <option value="Type 2">{t.type2}</option>
                        <option value="Gestational">{t.gestational}</option>
                        <option value="MODY">MODY</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Physical Measurements</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center space-x-1">
                            <span>Height (cm)</span>
                            <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          value={logData.height}
                          onChange={(e) => setLogData({...logData, height: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                          placeholder="165"
                          min="100"
                          max="250"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center space-x-1">
                            <span>Weight (kg)</span>
                            <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          value={logData.weight}
                          onChange={(e) => setLogData({...logData, weight: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                          placeholder="68"
                          min="30"
                          max="300"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                    {logData.height && logData.weight && (
                      <div className="mt-3 p-2 bg-white rounded border">
                        <p className="text-sm text-gray-600">
                          BMI: <span className="font-medium">{calculateBMI(parseInt(logData.height), parseFloat(logData.weight))}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Sleep & Stress</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sleep Quality (1-10)
                        </label>
                        <select
                          value={logData.sleepQuality}
                          onChange={(e) => setLogData({...logData, sleepQuality: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num.toString()}>{num} - {getSleepQualityText(num)}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sleep Duration ({t.hours})
                        </label>
                        <input
                          type="number"
                          value={logData.sleepDuration}
                          onChange={(e) => setLogData({...logData, sleepDuration: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                          placeholder="7.5"
                          min="3"
                          max="12"
                          step="0.5"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stress Level (1-5 scale)
                      </label>
                      <select
                        value={logData.stressLevel}
                        onChange={(e) => setLogData({...logData, stressLevel: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      >
                        <option value="1">1 - Very Low</option>
                        <option value="2">2 - Low</option>
                        <option value="3">3 - Moderate</option>
                        <option value="4">4 - High</option>
                        <option value="5">5 - Very High</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Stress affects glucose levels and is used for AI predictions
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>AI Integration:</strong> These parameters are essential for accurate glucose predictions and personalized recommendations.
                    </p>
                  </div>
                </>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLogForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{logType === 'profile' ? 'Update' : t.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.dashboard}</h2>
        <p className="text-gray-600">{t.welcomeBack}, Sarah. {t.healthOverview}</p>
      </div>

      {/* Daily Affirmation */}
      <DailyAffirmation language={language} />

      {/* Current Status Alert */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900">{t.systemStatus}</h3>
            <p className="text-sm text-green-700">{t.systemStatusOptimal}</p>
          </div>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">{t.healthProfile}</h3>
          <button
            onClick={() => openLogForm('profile')}
            className="text-sm text-slate-600 hover:text-slate-700 font-medium"
          >
            {t.updateProfile}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">{userProfile.age} {t.years}</p>
            <p className="text-xs text-gray-500">{userProfile.diabetesType} • {userProfile.gender}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Scale className="h-5 w-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">BMI {userProfile.bmi}</p>
            <p className="text-xs text-gray-500">{userProfile.height}cm, {userProfile.weight}kg</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">9 {t.years}</p>
            <p className="text-xs text-gray-500">{t.sinceDiagnosis}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Brain className="h-5 w-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">{getSleepQualityText(userProfile.sleepQuality)}</p>
            <p className="text-xs text-gray-500">{userProfile.sleepDuration}h sleep</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t.currentGlucose}
          value="94"
          unit={t.mgdl}
          trend="stable"
          icon={Droplets}
          color="blue"
        />
        <StatsCard
          title={t.timeInRange}
          value="87"
          unit="%"
          trend="up"
          icon={Target}
          color="green"
        />
        <StatsCard
          title={t.loggingStreak}
          value="12"
          unit={t.days}
          trend="up"
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title={t.healthScore}
          value="8.4"
          unit="/10"
          trend="up"
          icon={Heart}
          color="red"
        />
      </div>

      {/* Main Content Grid - Simplified without predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Simple glucose trend overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Glucose Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">94</p>
                <p className="text-sm text-blue-600">Current</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">87%</p>
                <p className="text-sm text-green-600">{t.timeInRange}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">6</p>
                <p className="text-sm text-orange-600">Readings Today</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Quick Insight:</strong> Your glucose levels are stable today. Great job maintaining consistency with your routine!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Activity */}
        <div className="space-y-6">
          <QuickActions onDataLogged={onDataLogged} language={language} />
          
          {/* Enhanced Logging Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Logs</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => openLogForm('meal')}
                  className="p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  title="Log Meal & Carbs"
                >
                  <Utensils className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openLogForm('exercise')}
                  className="p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  title="Log Exercise"
                >
                  <Activity className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openLogForm('glucose')}
                  className="p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  title="Log Glucose Reading"
                >
                  <Droplets className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Parameter Importance Notice */}
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-xs text-blue-800">
                <strong>{t.aiPoweredInsights}:</strong> Log meals (carbs), exercise (type/duration/intensity), and glucose readings for accurate predictions.
              </p>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {allLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-lg bg-gray-200">
                    {log.type === 'meal' && <Utensils className="h-4 w-4 text-gray-600" />}
                    {log.type === 'exercise' && <Activity className="h-4 w-4 text-gray-600" />}
                    {log.type === 'glucose' && <Droplets className="h-4 w-4 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{formatLogDisplay(log)}</p>
                    <p className="text-xs text-gray-500">{log.date} at {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;