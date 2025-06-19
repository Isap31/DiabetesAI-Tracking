import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import GoalsModal from './GoalsModal';
import GroceryListModal from './GroceryListModal';
import { Droplets, Target, Clock, Heart, TrendingUp, Plus, X, Save, Utensils, Activity, User, Scale, Calendar, Thermometer, Brain, Goal, ShoppingCart, Mic, Volume2, Bot } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface HomeTabProps {
  allLogs: any[];
  onDataLogged: (data: any) => void;
  language: string;
  useDemoData: boolean;
}

const HomeTab: React.FC<HomeTabProps> = ({ allLogs, onDataLogged, language, useDemoData }) => {
  const t = useTranslation(language);
  const [showLogForm, setShowLogForm] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showGroceryModal, setShowGroceryModal] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
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
    isMenopause: false,
    lastMenstrualPeriod: '',
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
    sleepDuration: 7.5,
    isMenopause: false,
    lastMenstrualPeriod: '2024-01-01'
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
        sleepDuration: parseFloat(logData.sleepDuration) || userProfile.sleepDuration,
        isMenopause: logData.isMenopause,
        lastMenstrualPeriod: logData.lastMenstrualPeriod || userProfile.lastMenstrualPeriod
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
      isMenopause: false, lastMenstrualPeriod: '',
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
        sleepDuration: userProfile.sleepDuration.toString(),
        isMenopause: userProfile.isMenopause,
        lastMenstrualPeriod: userProfile.lastMenstrualPeriod
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

  // Fixed menopause detection - age 34 cannot be post-menopause
  const getMenopauseStatus = () => {
    if (userProfile.gender !== 'female') return null;
    
    // Check if explicitly marked as menopause
    if (userProfile.isMenopause) return 'menopause';
    
    // Age-based detection - menopause typically starts 45-55
    // At age 34, cannot be post-menopause naturally
    if (userProfile.age >= 55) return 'postmenopause';
    if (userProfile.age >= 45) return 'perimenopause';
    
    // For younger women, check last menstrual period only if they marked menopause
    if (userProfile.age < 45) {
      const lastPeriod = new Date(userProfile.lastMenstrualPeriod);
      const monthsSinceLastPeriod = (Date.now() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24 * 30);
      
      // Only consider early menopause if explicitly marked or 12+ months without period
      if (monthsSinceLastPeriod >= 12 && userProfile.isMenopause) return 'early_menopause';
    }
    
    return 'premenopause';
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Goals Modal */}
      <GoalsModal 
        isOpen={showGoalsModal}
        onClose={() => setShowGoalsModal(false)}
        language={language}
      />

      {/* Grocery List Modal */}
      <GroceryListModal 
        isVisible={showGroceryModal}
        onClose={() => setShowGroceryModal(false)}
      />

      {/* Voice Chat Modal */}
      {showVoiceChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Mic className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">🎤 FlowSense AI Voice</h3>
                  <p className="text-sm text-blue-100">Complete Speech-to-Speech Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setShowVoiceChat(false)}
                className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 p-6 bg-gray-50">
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Volume2 className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Voice Assistant Ready</h4>
                <p className="text-gray-600 mb-6">
                  Click the microphone to start talking. Ask about glucose patterns, meal suggestions, or get personalized health advice.
                </p>
                <div className="space-y-4">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-3 mx-auto">
                    <Mic className="h-6 w-6" />
                    <span>Start Voice Conversation</span>
                  </button>
                  <p className="text-sm text-gray-500">
                    Complete speech-to-speech functionality - just talk naturally!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Universal Log Form Modal */}
      {showLogForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
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
            </div>
            
            <form onSubmit={handleLogSubmit} className="p-4 space-y-4">
              {/* Common fields for non-profile logs */}
              {logType !== 'profile' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={logData.date}
                      onChange={(e) => setLogData({...logData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.time}</label>
                    <input
                      type="time"
                      value={logData.time}
                      onChange={(e) => setLogData({...logData, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="How are you feeling? Any symptoms?"
                      rows={2}
                    />
                  </div>
                </>
              )}

              {/* Enhanced Profile-specific fields with menopause support */}
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Type 1">{t.type1}</option>
                        <option value="Type 2">{t.type2}</option>
                        <option value="Gestational">{t.gestational}</option>
                        <option value="MODY">MODY</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Enhanced Female Health Section with Fixed Logic */}
                  {logData.gender === 'female' && (
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Female Health Information</h4>
                      <div className="space-y-4">
                        {/* Only show menopause option for appropriate ages */}
                        {parseInt(logData.age) >= 40 && (
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="isMenopause"
                              checked={logData.isMenopause}
                              onChange={(e) => setLogData({...logData, isMenopause: e.target.checked})}
                              className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                            />
                            <label htmlFor="isMenopause" className="text-sm font-medium text-gray-700">
                              I am in menopause or experiencing early menopause
                            </label>
                          </div>
                        )}
                        
                        {/* Show age-appropriate messaging */}
                        {parseInt(logData.age) < 40 && (
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-xs text-blue-800">
                              <strong>Note:</strong> Menopause typically occurs between ages 45-55. At your age, 
                              we'll focus on menstrual cycle tracking for optimal glucose predictions.
                            </p>
                          </div>
                        )}
                        
                        {!logData.isMenopause && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Menstrual Period (for cycle tracking)
                            </label>
                            <input
                              type="date"
                              value={logData.lastMenstrualPeriod}
                              onChange={(e) => setLogData({...logData, lastMenstrualPeriod: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Helps AI provide more accurate glucose predictions based on hormonal cycles
                            </p>
                          </div>
                        )}
                        
                        {logData.isMenopause && (
                          <div className="bg-purple-100 p-3 rounded-lg">
                            <p className="text-xs text-purple-800">
                              <strong>Menopause Mode:</strong> AI will focus on post-menopausal glucose patterns 
                              and provide recommendations for hormonal stability benefits.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{logType === 'profile' ? 'Update' : t.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Daily Affirmation */}
      {/* <div className="px-4">
        <DailyAffirmation language={language} />
      </div> */}

      {/* Dashboard Title - Moved here, right above Welcome section */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.dashboard}</h2>
        <p className="text-gray-600">{t.welcomeBack}, Sarah. {t.healthOverview}</p>
      </div>

      {/* SUPER PROMINENT Voice Chat - First Thing Users See */}
      <div className="px-4">
        <div 
          onClick={() => setShowVoiceChat(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl border-4 border-blue-400"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                <Mic className="h-12 w-12 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">🎤 Voice Assistant</h3>
                <p className="text-xl text-blue-100 mb-2">Complete Speech-to-Speech</p>
                <p className="text-blue-200">
                  Talk to FlowSense AI about glucose patterns, meals, and health advice
                </p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
              <Volume2 className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Status Alert */}
      <div className="px-4">
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
      </div>

      {/* Enhanced User Profile Summary with Menopause Status */}
      <div className="px-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{t.healthProfile}</h3>
            <button
              onClick={() => openLogForm('profile')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {t.updateProfile}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          
          {/* Enhanced Female Health Status */}
          {userProfile.gender === 'female' && (
            <div className="mt-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
              <div className="flex items-center space-x-2 mb-1">
                <Heart className="h-4 w-4 text-pink-600" />
                <span className="text-sm font-medium text-pink-900">Female Health Status</span>
              </div>
              <p className="text-xs text-pink-800">
                {getMenopauseStatus() === 'menopause' || getMenopauseStatus() === 'postmenopause' 
                  ? '🌸 Post-menopause: Stable hormonal patterns for better glucose predictability'
                  : getMenopauseStatus() === 'early_menopause'
                  ? '🌺 Early menopause: Monitoring hormonal transitions for glucose management'
                  : getMenopauseStatus() === 'perimenopause'
                  ? '🌺 Perimenopause: Monitoring hormonal transitions for glucose management'
                  : '🌷 Premenopause: Tracking menstrual cycle for optimal glucose predictions'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions - Moved up right after Health Profile */}
      <div className="px-4">
        <QuickActions onDataLogged={onDataLogged} language={language} />
      </div>

      {/* Enhanced Quick Access Buttons */}
      <div className="px-4 grid grid-cols-2 gap-4">
        {/* Goals Quick Access */}
        <button
          onClick={() => setShowGoalsModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg flex items-center justify-between hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Target className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">Health Goals</h3>
              <p className="text-xs text-blue-100">Track objectives</p>
            </div>
          </div>
          <Goal className="h-4 w-4 text-blue-200" />
        </button>

        {/* Grocery List Quick Access */}
        <button
          onClick={() => setShowGroceryModal(true)}
          className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 rounded-lg flex items-center justify-between hover:from-green-700 hover:to-teal-700 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">Smart Grocery</h3>
              <p className="text-xs text-green-100">Budget-friendly list</p>
            </div>
          </div>
          <Plus className="h-4 w-4 text-green-200" />
        </button>
      </div>

      {/* Today's Glucose Overview */}
      <div className="px-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Glucose Overview</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">94</p>
              <p className="text-sm text-blue-600">Current</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">87%</p>
              <p className="text-sm text-green-600">{t.timeInRange}</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-xl font-bold text-orange-600">6</p>
              <p className="text-sm text-orange-600">Readings Today</p>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700">
              <strong>💡 Quick Insight:</strong> Your glucose levels are stable today. Great job maintaining consistency with your routine!
            </p>
          </div>
        </div>
      </div>

      {/* Recent Logs - Mobile Optimized */}
      <div className="px-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Logs</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => openLogForm('meal')}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Log Meal & Carbs"
              >
                <Utensils className="h-4 w-4" />
              </button>
              <button
                onClick={() => openLogForm('exercise')}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Log Exercise"
              >
                <Activity className="h-4 w-4" />
              </button>
              <button
                onClick={() => openLogForm('glucose')}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Log Glucose Reading"
              >
                <Droplets className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Enhanced Parameter Importance Notice */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-xs text-blue-800">
              <strong>🤖 {t.aiPoweredInsights}:</strong> Log meals (carbs), exercise (type/duration/intensity), and glucose readings for accurate predictions. 
              💰 <strong>Budget Focus:</strong> Get recommendations for affordable, diabetes-friendly foods!
            </p>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {allLogs.slice(0, 8).map((log) => (
              <div key={log.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 rounded-lg bg-gray-200 flex-shrink-0">
                  {log.type === 'meal' && <Utensils className="h-4 w-4 text-gray-600" />}
                  {log.type === 'exercise' && <Activity className="h-4 w-4 text-gray-600" />}
                  {log.type === 'glucose' && <Droplets className="h-4 w-4 text-gray-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{formatLogDisplay(log)}</p>
                  <p className="text-xs text-gray-500">{log.date} at {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;