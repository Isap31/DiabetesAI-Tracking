import React, { useState } from 'react';
import { Plus, Camera, Utensils, Activity, Droplets, Clock, X, Save, User, Scale, Brain, Thermometer, Bed } from 'lucide-react';

interface TrackingTabProps {
  onDataLogged?: (data: any) => void;
}

const TrackingTab: React.FC<TrackingTabProps> = ({ onDataLogged }) => {
  const [showMealForm, setShowMealForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showGlucoseForm, setShowGlucoseForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
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
    gender: 'female',
    sleepQuality: '7',
    sleepDuration: '7.5'
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
      icon: User, 
      label: 'Profile', 
      sublabel: 'Age, BMI, Sleep',
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowProfileForm(true)
    }
  ];

  const recentLogs = [
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
      item: 'Sleep Quality Updated', 
      time: '9:00 AM', 
      details: 'Quality: 7/10, Duration: 7.5h', 
      impact: 'neutral',
      aiNote: 'Good sleep supports glucose control'
    }
  ];

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMealLog = {
      id: Date.now(),
      type: 'meal',
      data: {
        mealName: mealData.name,
        carbs: mealData.carbs,
        calories: mealData.calories,
        time: mealData.time
      },
      time: mealData.time,
      date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Meal logged:', newMealLog);
    
    // Notify parent component about new data
    if (onDataLogged) {
      onDataLogged(newMealLog);
    }
    
    setMealData({ name: '', carbs: '', calories: '', time: new Date().toTimeString().slice(0, 5) });
    setShowMealForm(false);
  };

  const handleExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExerciseLog = {
      id: Date.now(),
      type: 'exercise',
      data: {
        exerciseType: exerciseData.type,
        duration: exerciseData.duration,
        intensity: exerciseData.intensity,
        time: exerciseData.time
      },
      time: exerciseData.time,
      date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Exercise logged:', newExerciseLog);
    
    // Notify parent component about new data
    if (onDataLogged) {
      onDataLogged(newExerciseLog);
    }
    
    setExerciseData({ type: '', duration: '', intensity: 'moderate', time: new Date().toTimeString().slice(0, 5) });
    setShowExerciseForm(false);
  };

  const handleGlucoseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGlucoseLog = {
      id: Date.now(),
      type: 'glucose',
      data: {
        glucose: glucoseData.reading,
        context: glucoseData.context,
        notes: glucoseData.notes,
        time: glucoseData.time
      },
      time: glucoseData.time,
      date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Glucose logged:', newGlucoseLog);
    
    // Notify parent component about new data
    if (onDataLogged) {
      onDataLogged(newGlucoseLog);
    }
    
    setGlucoseData({ reading: '', context: 'fasting', notes: '', time: new Date().toTimeString().slice(0, 5) });
    setShowGlucoseForm(false);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profileUpdate = {
      id: Date.now(),
      type: 'profile',
      data: profileData,
      time: new Date().toTimeString().slice(0, 5),
      date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Profile updated:', profileUpdate);
    
    // Notify parent component about profile update
    if (onDataLogged) {
      onDataLogged(profileUpdate);
    }
    
    setShowProfileForm(false);
  };

  const calculateBMI = (height: string, weight: string) => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h && w) {
      return (w / (h * h)).toFixed(1);
    }
    return '0.0';
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

  const getSleepQualityText = (quality: string) => {
    const q = parseInt(quality);
    if (q >= 8) return 'Excellent';
    if (q >= 6) return 'Good';
    if (q >= 4) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="space-y-6">
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

      {/* Profile Update Modal */}
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

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Sleep & Stress</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sleep Quality (1-10)
                    </label>
                    <select
                      value={profileData.sleepQuality}
                      onChange={(e) => setProfileData({...profileData, sleepQuality: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num.toString()}>{num} - {getSleepQualityText(num.toString())}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sleep Duration (hours)
                    </label>
                    <input
                      type="number"
                      value={profileData.sleepDuration}
                      onChange={(e) => setProfileData({...profileData, sleepDuration: e.target.value})}
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
                  <strong>AI Integration:</strong> These parameters are essential for accurate glucose predictions and personalized recommendations.
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
            <strong>AI-Powered Insights:</strong> Log all parameters for comprehensive glucose predictions and personalized recommendations.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Bed className="h-5 w-5 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">Sleep Quality</p>
            <p className="text-xs text-gray-500">{getSleepQualityText(profileData.sleepQuality)} ({profileData.sleepDuration}h)</p>
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
                  log.type === 'glucose' ? 'bg-red-100' : 'bg-purple-100'
                }`}>
                  {log.type === 'meal' && <Utensils className="h-4 w-4 text-blue-600" />}
                  {log.type === 'exercise' && <Activity className="h-4 w-4 text-green-600" />}
                  {log.type === 'glucose' && <Droplets className="h-4 w-4 text-red-600" />}
                  {log.type === 'profile' && <Bed className="h-4 w-4 text-purple-600" />}
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