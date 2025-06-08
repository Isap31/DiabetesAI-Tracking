import React from 'react';
import { Plus, Camera, Utensils, Activity, Droplets, Clock } from 'lucide-react';

const TrackingTab = () => {
  const quickLog = [
    { icon: Utensils, label: 'Log Meal', color: 'bg-teal-500' },
    { icon: Activity, label: 'Exercise', color: 'bg-blue-500' },
    { icon: Droplets, label: 'Glucose', color: 'bg-purple-500' },
    { icon: Camera, label: 'Scan Food', color: 'bg-magenta-500' }
  ];

  const recentLogs = [
    { type: 'meal', item: 'Grilled Chicken Salad', time: '12:30 PM', carbs: '15g', impact: 'low' },
    { type: 'exercise', item: '30min Walk', time: '11:00 AM', calories: '120', impact: 'positive' },
    { type: 'glucose', item: '94 mg/dL', time: '10:30 AM', status: 'normal', impact: 'stable' }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Log Actions */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Quick Log</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickLog.map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-2`}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Summary */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Today's Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-teal-50 p-3 rounded-lg mb-2">
              <Utensils className="h-5 w-5 text-teal-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">3 Meals</p>
            <p className="text-xs text-gray-500">45g carbs</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-50 p-3 rounded-lg mb-2">
              <Activity className="h-5 w-5 text-blue-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">2 Activities</p>
            <p className="text-xs text-gray-500">250 calories</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-50 p-3 rounded-lg mb-2">
              <Droplets className="h-5 w-5 text-purple-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-900">6 Readings</p>
            <p className="text-xs text-gray-500">Avg: 96</p>
          </div>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Recent Logs</h3>
        <div className="space-y-3">
          {recentLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  log.type === 'meal' ? 'bg-teal-100' :
                  log.type === 'exercise' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {log.type === 'meal' && <Utensils className="h-4 w-4 text-teal-600" />}
                  {log.type === 'exercise' && <Activity className="h-4 w-4 text-blue-600" />}
                  {log.type === 'glucose' && <Droplets className="h-4 w-4 text-purple-600" />}
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