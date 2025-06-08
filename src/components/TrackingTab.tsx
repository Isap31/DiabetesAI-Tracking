import React, { useState } from 'react';
import { Plus, Camera, Utensils, Activity, Droplets, Clock, X, Save, User, Scale, Brain, Thermometer, Calendar, Baby, Moon, Bed } from 'lucide-react';

const TrackingTab = () => {
  const [showMealForm, setShowMealForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showGlucoseForm, setShowGlucoseForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showSleepForm, setShowSleepForm] = useState(false);
  const [mealData, setMealData] = useState({
    name: '',
    carbs: '',
    calories: '',
    time: new Date().toTimeString().slice(0, 5)
  });
  const [exerciseData, setExerciseData] = useState({
    type: '',
    duration: '',
    intensity: 'moderate',
    time: new Date().toTimeString().slice(0, 5)
  });
  const [glucoseData, setGlucoseData] = useState({
    reading: '',
    context: 'fasting',
    notes: '',
    time: new Date().toTimeString().slice(0, 5)
  });
  const [profileData, setProfileData] = useState({
    age: '34',
    diabetesType: 'Type 1',
    height: '165',
    weight: '68',
    stressLevel: '3',
    diagnosisDate: '2015-03-20',
    gender: 'female',
    isPregnant: false,
    pregnancyWeeks: '',
    menstrualCycleDay: '14',
    menstrualCycleLength: '28',
    sleepQuality: '7',
    sleepDuration: '7.5',
    bedtime: '22:30',
    wakeTime: '06:00'
  });
  const [sleepData, setSleepData] = useState({
    duration: '',
    quality: '7',
    bedtime: '',
    wakeTime: '',
    notes: '',
    time: new Date().toTimeString().slice(0, 5)
  });

  const quickLog = [
    { 
      icon: Utensils, 
      label: 'Log Meal', 
      sublabel: 'Carbs & Calories',
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowMealForm(true)
    },
    { 
      icon: Activity, 
      label: 'Exercise', 
      sublabel: 'Type & Duration',
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowExerciseForm(true)
    },
    { 
      icon: Droplets, 
      label: 'Glucose', 
      sublabel: 'Current Level',
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowGlucoseForm(true)
    },
    { 
      icon: Bed, 
      label: 'Sleep', 
      sublabel: 'Quality & Duration',
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowSleepForm(true)
    },
    { 
      icon: User, 
      label: 'Profile', 
      sublabel: 'Health & Hormones',
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowProfileForm(true)
    }
  ];

  const recentLogs = [
    { 
      type: 'sleep', 
      item: '7.5h Sleep (Quality: 8/10)', 
      time: '6:00 AM', 
      details: 'Excellent rest, 22:30-06:00', 
      impact: 'positive',
      aiNote: 'Great sleep quality supports glucose stability'
    },
    { 
      type: 'meal', 
      item: 'Grilled Chicken Salad', 
      time: '12:30 PM', 
      details: '15g carbs, 350 cal', 
      impact: 'low',
      aiNote: 'Good carb choice for stable glucose'
    },
    { 
      type: 'exercise', 
      item: '30min Walk', 
      time: '11:00 AM', 
      details: 'Moderate intensity', 
      impact: 'positive',
      aiNote: 'Optimal timing post-breakfast'
    },
    { 
      type: 'glucose', 
      item: '94 mg/dL', 
      time: '10:30 AM', 
      details: 'Before meal', 
      impact: 'stable',
      aiNote: 'Perfect target range'
    },
    { 
      type: 'profile', 
      item: 'Cycle Day Updated', 
      time: '9:00 AM', 
      details: 'Day 14 - Ovulation phase', 
      impact: 'neutral',
      aiNote: 'Hormonal changes may affect glucose'
    }
  ];

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Meal logged:', mealData);
    setMealData({ name: '', carbs: '', calories: '', time: new Date().toTimeString().slice(0, 5) });
    setShowMealForm(false);
  };

  const handleExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Exercise logged:', exerciseData);
    setExerciseData({ type: '', duration: '', intensity: 'moderate', time: new Date().toTimeString().slice(0, 5) });
    setShowExerciseForm(false);
  };

  const handleGlucoseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Glucose logged:', glucoseData);
    setGlucoseData({ reading: '', context: 'fasting', notes: '', time: new Date().toTimeString().slice(0, 5) });
    setShowGlucoseForm(false);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    setShowProfileForm(false);
  };

  const handleSleepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sleep logged:', sleepData);
    setSleepData({ duration: '', quality: '7', bedtime: '', wakeTime: '', notes: '', time: new Date().toTimeString().slice(0, 5) });
    setShowSleepForm(false);
  };

  const calculateBMI = (height: string, weight: string) => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h && w) {
      return (w / (h * h)).toFixed(1);
    }
    return '0.0';
  };

  const calculateYearsSinceDiagnosis = (diagnosisDate: string) => {
    if (!diagnosisDate) return 0;
    const diagnosis = new Date(diagnosisDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - diagnosis.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    return diffYears;
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

  const getMenstrualPhase = (cycleDay: string, cycleLength: string) => {
    const day = parseInt(cycleDay);
    const length = parseInt(cycleLength);
    if (!day || !length) return 'Unknown';
    
    if (day <= 5) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day <= 15) return 'Ovulation';
    return 'Luteal';
  };

  const getPregnancyTrimester = (weeks: string) => {
    const w = parseInt(weeks);
    if (!w) return '';
    if (w <= 12) return 'First Trimester';
    if (w <= 27) return 'Second Trimester';
    return 'Third Trimester';
  };

  const getSleepQualityDescription = (quality: string) => {
    const q = parseInt(quality);
    if (q >= 8) return 'Excellent';
    if (q >= 6) return 'Good';
    if (q >= 4) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="space-y-6">
      {/* Sleep Logging Modal */}
      {showSleepForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Log Sleep</h3>
              <button 
                onClick={() => setShowSleepForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSleepSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center space-x-1">
                      <span>Sleep Duration (hours)</span>
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    value={sleepData.duration}
                    onChange={(e) => setSleepData({...sleepData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="7.5"
                    min="1"
                    max="12"
                    step="0.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center space-x-1">
                      <span>Sleep Quality (1-10)</span>
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    value={sleepData.quality}
                    onChange={(e) => setSleepData({...sleepData, quality: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} - {
                        num >= 8 ? 'Excellent' : 
                        num >= 6 ? 'Good' : 
                        num >= 4 ? 'Fair' : 'Poor'
                      }</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedtime</label>
                  <input
                    type="time"
                    value={sleepData.bedtime}
                    onChange={(e) => setSleepData({...sleepData, bedtime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wake Time</label>
                  <input
                    type="time"
                    value={sleepData.wakeTime}
                    onChange={(e) => setSleepData({...sleepData, wakeTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Notes (Optional)</label>
                <textarea
                  value={sleepData.notes}
                  onChange={(e) => setSleepData({...sleepData, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="How did you sleep? Any disturbances?"
                  rows={3}
                />
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-xs text-purple-800">
                  <strong>Sleep Impact:</strong> Sleep quality and duration significantly affect glucose control and insulin sensitivity.
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSleepForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Sleep</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meal Logging Modal */}
      {showMealForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Log Meal</h3>
              <button 
                onClick={() => setShowMealForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleMealSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
                <input
                  type="text"
                  value={mealData.name}
                  onChange={(e) => setMealData({...mealData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="e.g., Grilled Chicken Salad"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center space-x-1">
                      <span>Carbohydrates (g)</span>
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    value={mealData.carbs}
                    onChange={(e) => setMealData({...mealData, carbs: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="15"
                    min="0"
                    step="0.1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Critical for glucose prediction</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                  <input
                    type="number"
                    value={mealData.calories}
                    onChange={(e) => setMealData({...mealData, calories: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="350"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time of Meal</label>
                <input
                  type="time"
                  value={mealData.time}
                  onChange={(e) => setMealData({...mealData, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Meal timing affects glucose response</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>AI Integration:</strong> Carb content and meal timing are key factors for glucose predictions.
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMealForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Meal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exercise Logging Modal */}
      {showExerciseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Log Exercise</h3>
              <button 
                onClick={() => setShowExerciseForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleExerciseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center space-x-1">
                    <span>Exercise Type</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  value={exerciseData.type}
                  onChange={(e) => setExerciseData({...exerciseData, type: e.target.value})}
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
                      <span>Duration (min)</span>
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    value={exerciseData.duration}
                    onChange={(e) => setExerciseData({...exerciseData, duration: e.target.value})}
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
                    value={exerciseData.intensity}
                    onChange={(e) => setExerciseData({...exerciseData, intensity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="vigorous">Vigorous</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={exerciseData.time}
                  onChange={(e) => setExerciseData({...exerciseData, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Exercise Impact:</strong> Type, duration, and intensity all affect glucose response patterns.
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowExerciseForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Exercise</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Glucose Logging Modal */}
      {showGlucoseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Log Glucose Reading</h3>
              <button 
                onClick={() => setShowGlucoseForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleGlucoseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center space-x-1">
                    <span>Current Glucose Level (mg/dL)</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  value={glucoseData.reading}
                  onChange={(e) => setGlucoseData({...glucoseData, reading: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="94"
                  min="40"
                  max="400"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">From CGM or manual testing</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Context</label>
                  <select
                    value={glucoseData.context}
                    onChange={(e) => setGlucoseData({...glucoseData, context: e.target.value})}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={glucoseData.time}
                    onChange={(e) => setGlucoseData({...glucoseData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  value={glucoseData.notes}
                  onChange={(e) => setGlucoseData({...glucoseData, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="How are you feeling? Any symptoms?"
                  rows={3}
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Glucose Tracking:</strong> Regular readings help AI learn your patterns and improve predictions.
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowGlucoseForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Reading</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced Profile Update Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Update Health Profile</h3>
              <button 
                onClick={() => setShowProfileForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Basic Information */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
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
                      value={profileData.age}
                      onChange={(e) => setProfileData({...profileData, age: e.target.value})}
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
                      value={profileData.gender}
                      onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center space-x-1">
                      <span>Diabetes Type</span>
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    value={profileData.diabetesType}
                    onChange={(e) => setProfileData({...profileData, diabetesType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="Gestational">Gestational</option>
                    <option value="MODY">MODY</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Diabetes History */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Diabetes History</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center space-x-1">
                      <span>Diagnosis Date</span>
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    value={profileData.diagnosisDate}
                    onChange={(e) => setProfileData({...profileData, diagnosisDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Years since diagnosis: <span className="font-medium">{calculateYearsSinceDiagnosis(profileData.diagnosisDate)}</span>
                  </p>
                </div>
              </div>

              {/* Physical Measurements */}
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
                      value={profileData.height}
                      onChange={(e) => setProfileData({...profileData, height: e.target.value})}
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
                      value={profileData.weight}
                      onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="68"
                      min="30"
                      max="300"
                      step="0.1"
                      required
                    />
                  </div>
                </div>
                {profileData.height && profileData.weight && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <p className="text-sm text-gray-600">
                      BMI: <span className="font-medium">{calculateBMI(profileData.height, profileData.weight)}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Sleep Parameters */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <Bed className="h-4 w-4 text-purple-600" />
                  <span>Sleep Parameters</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Quality (1-10)</label>
                    <select
                      value={profileData.sleepQuality}
                      onChange={(e) => setProfileData({...profileData, sleepQuality: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} - {getSleepQualityDescription(num.toString())}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Duration (hours)</label>
                    <input
                      type="number"
                      value={profileData.sleepDuration}
                      onChange={(e) => setProfileData({...profileData, sleepDuration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="7.5"
                      min="1"
                      max="12"
                      step="0.5"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Typical Bedtime</label>
                    <input
                      type="time"
                      value={profileData.bedtime}
                      onChange={(e) => setProfileData({...profileData, bedtime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Typical Wake Time</label>
                    <input
                      type="time"
                      value={profileData.wakeTime}
                      onChange={(e) => setProfileData({...profileData, wakeTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Women's Health Parameters */}
              {profileData.gender === 'female' && (
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                    <Baby className="h-4 w-4 text-pink-600" />
                    <span>Women's Health Parameters</span>
                  </h4>
                  
                  {/* Pregnancy Status */}
                  <div className="mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileData.isPregnant}
                        onChange={(e) => setProfileData({...profileData, isPregnant: e.target.checked, pregnancyWeeks: e.target.checked ? profileData.pregnancyWeeks : ''})}
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Currently Pregnant</span>
                    </label>
                  </div>

                  {/* Pregnancy Weeks */}
                  {profileData.isPregnant && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center space-x-1">
                          <span>Pregnancy Weeks</span>
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        value={profileData.pregnancyWeeks}
                        onChange={(e) => setProfileData({...profileData, pregnancyWeeks: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="12"
                        min="1"
                        max="42"
                        required={profileData.isPregnant}
                      />
                      {profileData.pregnancyWeeks && (
                        <p className="text-xs text-pink-600 mt-1">
                          {getPregnancyTrimester(profileData.pregnancyWeeks)}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Menstrual Cycle (only if not pregnant) */}
                  {!profileData.isPregnant && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <span className="flex items-center space-x-1">
                              <Moon className="h-3 w-3" />
                              <span>Cycle Day</span>
                            </span>
                          </label>
                          <input
                            type="number"
                            value={profileData.menstrualCycleDay}
                            onChange={(e) => setProfileData({...profileData, menstrualCycleDay: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="14"
                            min="1"
                            max="50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Length</label>
                          <input
                            type="number"
                            value={profileData.menstrualCycleLength}
                            onChange={(e) => setProfileData({...profileData, menstrualCycleLength: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="28"
                            min="21"
                            max="35"
                          />
                        </div>
                      </div>
                      {profileData.menstrualCycleDay && profileData.menstrualCycleLength && (
                        <div className="p-2 bg-white rounded border">
                          <p className="text-xs text-pink-600">
                            Current phase: <span className="font-medium">
                              {getMenstrualPhase(profileData.menstrualCycleDay, profileData.menstrualCycleLength)}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-3 p-2 bg-pink-100 rounded">
                    <p className="text-xs text-pink-800">
                      <strong>Hormonal Impact:</strong> Pregnancy and menstrual cycle phases significantly affect glucose levels and insulin sensitivity.
                    </p>
                  </div>
                </div>
              )}

              {/* Stress Level */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Current Stress Level</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stress Level (1-5 scale)
                  </label>
                  <select
                    value={profileData.stressLevel}
                    onChange={(e) => setProfileData({...profileData, stressLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option value="1">1 - Very Low</option>
                    <option value="2">2 - Low</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4 - High</option>
                    <option value="5">5 - Very High</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {getStressLevelText(profileData.stressLevel)}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>AI Integration:</strong> These parameters including hormonal factors and sleep are essential for accurate glucose predictions and personalized recommendations.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProfileForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Update Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Log Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Data Logging</h3>
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            <strong>AI-Powered Insights:</strong> Log all parameters including sleep and hormonal factors for comprehensive glucose predictions and personalized recommendations.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLog.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-2`}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{action.label}</span>
              <span className="text-xs text-slate-200">{action.sublabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div className="text-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Utensils className="h-5 w-5 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">3 Meals</p>
            <p className="text-xs text-gray-500">45g total carbs</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Activity className="h-5 w-5 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">2 Activities</p>
            <p className="text-xs text-gray-500">60 min total</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Droplets className="h-5 w-5 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">6 Readings</p>
            <p className="text-xs text-gray-500">Avg: 96 mg/dL</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-lg mb-2">
              <Bed className="h-5 w-5 text-purple-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">7.5h Sleep</p>
            <p className="text-xs text-purple-600">Quality: 8/10</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Calendar className="h-5 w-5 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">9 Years</p>
            <p className="text-xs text-gray-500">Diabetes experience</p>
          </div>
          <div className="text-center">
            <div className="bg-pink-100 p-3 rounded-lg mb-2">
              <Moon className="h-5 w-5 text-pink-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">Day 14</p>
            <p className="text-xs text-pink-600">Ovulation phase</p>
          </div>
        </div>
      </div>

      {/* Recent Logs with AI Insights */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Logs & AI Insights</h3>
        <div className="space-y-3">
          {recentLogs.map((log, index) => (
            <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  log.type === 'meal' ? 'bg-blue-100' :
                  log.type === 'exercise' ? 'bg-green-100' : 
                  log.type === 'glucose' ? 'bg-red-100' : 
                  log.type === 'sleep' ? 'bg-purple-100' : 'bg-pink-100'
                }`}>
                  {log.type === 'meal' && <Utensils className="h-4 w-4 text-blue-600" />}
                  {log.type === 'exercise' && <Activity className="h-4 w-4 text-green-600" />}
                  {log.type === 'glucose' && <Droplets className="h-4 w-4 text-red-600" />}
                  {log.type === 'sleep' && <Bed className="h-4 w-4 text-purple-600" />}
                  {log.type === 'profile' && <Moon className="h-4 w-4 text-pink-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{log.item}</p>
                  <p className="text-xs text-gray-500">{log.time} • {log.details}</p>
                  <p className="text-xs text-blue-600 mt-1 italic">{log.aiNote}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`w-2 h-2 rounded-full ${
                  log.impact === 'positive' || log.impact === 'stable' ? 'bg-green-500' :
                  log.impact === 'low' || log.impact === 'neutral' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingTab;