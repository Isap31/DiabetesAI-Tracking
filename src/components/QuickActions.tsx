import React from 'react';
import { Plus, Camera, MessageCircle, TrendingUp } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { icon: Plus, label: 'Log Meal', color: 'bg-slate-600 hover:bg-slate-700' },
    { icon: Camera, label: 'Scan Food', color: 'bg-slate-600 hover:bg-slate-700' },
    { icon: MessageCircle, label: 'AI Chat', color: 'bg-slate-600 hover:bg-slate-700' },
    { icon: TrendingUp, label: 'View Trends', color: 'bg-slate-600 hover:bg-slate-700' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-2`}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;