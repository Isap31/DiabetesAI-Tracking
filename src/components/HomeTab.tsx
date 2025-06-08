import React, { useState } from 'react';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import ProgressChart from './ProgressChart';
import PredictiveInsights from './PredictiveInsights';
import { Droplets, Target, Clock, Heart, TrendingUp, Plus, X, Save, Utensils, Activity } from 'lucide-react';

const HomeTab = () => {
  const [showLogForm, setShowLogForm] = useState(false);
  const [logType, setLogType] = useState<'meal' | 'exercise' | 'glucose'>('meal');
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
    // Common fields
    time: new Date().toTimeString().slice(0, 5),
    date: new Date().toISOString().split('T')[0]
  });

  const [allLogs, setAllLogs] = useState([
    { id: 1, type: 'meal', data: { mealName: 'Grilled Chicken Salad', carbs: '15', calories: '350' }, time: '12:30 PM', date: '2024-01-15' },
    { id: 2, type: 'exercise', data: { exerciseType: 'Walking', duration: '30', intensity: 'moderate' }, time: '11:00 AM', date: '2024-01-15' },
    { id: 3, type: 'glucose', data: { glucose: '94', context: 'before-meal', notes: 'Feeling good' }, time: '10:30 AM', date: '2024-01-15' },
    { id: 4, type: 'meal', data: { mealName: 'Oatmeal with Berries', carbs: '25', calories: '280' }, time: '8:00 AM', date: '2024-01-15' },
    { id: 5, type: 'glucose', data: { glucose: '89', context: 'fasting', notes: '' }, time: '7:00 AM', date: '2024-01-15' }
  ]);

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLog = {
      id: allLogs.length + 1,
      type: logType,
      data: logType === 'meal' 
        ? { mealName: logData.mealName, carbs: logData.carbs, calories: logData.calories }
        : logType === 'exercise'
        ? { exerciseType: logData.exerciseType, duration: logData.duration, intensity: logData.intensity }
        : { glucose: logData.glucose, context: logData.context, notes: logData.notes },
      time: logData.time,
      date: logData.date
    };

    setAllLogs([newLog, ...allLogs]);
    console.log('New log entry:', newLog);
    
    // Reset form
    setLogData({
      mealName: '', carbs: '', calories: '',
      exerciseType: '', duration: '', intensity: 'moderate',
      glucose: '', context: 'fasting', notes: '',
      time: new Date().toTimeString().slice(0, 5),
      date: new Date().toISOString().split('T')[0]
    });
    setShowLogForm(false);
  };

  const openLogForm = (type: 'meal' | 'exercise' | 'glucose') => {
    setLogType(type);
    setShowLogForm(true);
  };

  const formatLogDisplay = (log: any) => {
    switch (log.type) {
      case 'meal':
        return `${log.data.mealName} (${log.data.carbs}g carbs)`;
      case 'exercise':
        return `${log.data.exerciseType} (${log.data.duration} min)`;
      case 'glucose':
        return `${log.data.glucose} mg/dL (${log.data.context})`;
      default:
        return 'Unknown entry';
    }
  };

  return (
    <div className="space-y-8">
      {/* Universal Log Form Modal */}
      {showLogForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Log {logType.charAt(0).toUpperCase() + logType.slice(1)}
              </h3>
              <button 
                onClick={() => setShowLogForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleLogSubmit} className="space-y-4">
              {/* Common fields */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={logData.time}
                    onChange={(e) => setLogData({...logData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Meal-specific fields */}
              {logType === 'meal' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                      <input
                        type="number"
                        value={logData.carbs}
                        onChange={(e) => setLogData({...logData, carbs: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="15"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                      <input
                        type="number"
                        value={logData.calories}
                        onChange={(e) => setLogData({...logData, calories: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="350"
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
                    <input
                      type="text"
                      value={logData.exerciseType}
                      onChange={(e) => setLogData({...logData, exerciseType: e.target.value})}
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
                        value={logData.duration}
                        onChange={(e) => setLogData({...logData, duration: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="30"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Intensity</label>
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
                </>
              )}

              {/* Glucose-specific fields */}
              {logType === 'glucose' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Glucose Reading (mg/dL)</label>
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
                      <option value="after-meal">After Meal</option>
                      <option value="bedtime">Bedtime</option>
                      <option value="random">Random</option>
                      <option value="exercise">During Exercise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                    <textarea
                      value={logData.notes}
                      onChange={(e) => setLogData({...logData, notes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="Any additional notes..."
                      rows={2}
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLogForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome back, Sarah. Here's your health overview for today.</p>
      </div>

      {/* Current Status Alert */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900">System Status: Optimal</h3>
            <p className="text-sm text-green-700">All monitoring systems active. Glucose levels stable.</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Recent Glucose Reading"
          value="94"
          unit="mg/dL"
          trend="stable"
          icon={Droplets}
          color="blue"
        />
        <StatsCard
          title="Time in Range"
          value="87"
          unit="%"
          trend="up"
          icon={Target}
          color="green"
        />
        <StatsCard
          title="Logging Streak"
          value="12"
          unit="days"
          trend="up"
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Health Score"
          value="8.4"
          unit="/10"
          trend="up"
          icon={Heart}
          color="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <ProgressChart />
          <PredictiveInsights />
        </div>

        {/* Right Column - Actions & Activity */}
        <div className="space-y-6">
          <QuickActions />
          
          {/* All Logged Data */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">All Logged Data</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => openLogForm('meal')}
                  className="p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  title="Log Meal"
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
                  title="Log Glucose"
                >
                  <Droplets className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {allLogs.map((log) => (
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