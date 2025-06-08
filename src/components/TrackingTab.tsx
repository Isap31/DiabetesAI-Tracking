import React, { useState } from 'react';
import { Plus, Camera, Utensils, Activity, Droplets, Clock, X, Save } from 'lucide-react';

const TrackingTab = () => {
  const [showMealForm, setShowMealForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
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

  const quickLog = [
    { 
      icon: Utensils, 
      label: 'Log Meal', 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowMealForm(true)
    },
    { 
      icon: Activity, 
      label: 'Exercise', 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowExerciseForm(true)
    },
    { 
      icon: Droplets, 
      label: 'Glucose', 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => console.log('Glucose logging')
    },
    { 
      icon: Camera, 
      label: 'Scan Food', 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => console.log('Food scanning')
    }
  ];

  const recentLogs = [
    { type: 'meal', item: 'Grilled Chicken Salad', time: '12:30 PM', carbs: '15g', impact: 'low' },
    { type: 'exercise', item: '30min Walk', time: '11:00 AM', calories: '120', impact: 'positive' },
    { type: 'glucose', item: '94 mg/dL', time: '10:30 AM', status: 'normal', impact: 'stable' }
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={mealData.carbs}
                    onChange={(e) => setMealData({...mealData, carbs: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="15"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                  <input
                    type="number"
                    value={mealData.calories}
                    onChange={(e) => setMealData({...mealData, calories: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="350"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={mealData.time}
                  onChange={(e) => setMealData({...mealData, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Type</label>
                <input
                  type="text"
                  value={exerciseData.type}
                  onChange={(e) => setExerciseData({...exerciseData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="e.g., Walking, Running, Cycling"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={exerciseData.duration}
                    onChange={(e) => setExerciseData({...exerciseData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intensity</label>
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

      {/* Quick Log Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Log</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickLog.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-2`}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Utensils className="h-5 w-5 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">3 Meals</p>
            <p className="text-xs text-gray-500">45g carbs</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Activity className="h-5 w-5 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">2 Activities</p>
            <p className="text-xs text-gray-500">250 calories</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Droplets className="h-5 w-5 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">6 Readings</p>
            <p className="text-xs text-gray-500">Avg: 96</p>
          </div>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Logs</h3>
        <div className="space-y-3">
          {recentLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  log.type === 'meal' ? 'bg-gray-200' :
                  log.type === 'exercise' ? 'bg-gray-200' : 'bg-gray-200'
                }`}>
                  {log.type === 'meal' && <Utensils className="h-4 w-4 text-gray-600" />}
                  {log.type === 'exercise' && <Activity className="h-4 w-4 text-gray-600" />}
                  {log.type === 'glucose' && <Droplets className="h-4 w-4 text-gray-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.item}</p>
                  <p className="text-xs text-gray-500">{log.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-600">
                  {log.carbs || log.calories || log.status}
                </p>
                <div className={`w-2 h-2 rounded-full ${
                  log.impact === 'positive' || log.impact === 'stable' ? 'bg-green-500' :
                  log.impact === 'low' ? 'bg-yellow-500' : 'bg-red-500'
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