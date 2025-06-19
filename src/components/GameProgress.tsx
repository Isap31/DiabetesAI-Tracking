import React from 'react';
import { Trophy, Star, Flame, Award, Target, Zap } from 'lucide-react';

const GameProgress = () => {
  const achievements = [
    { icon: Flame, title: '7-Day Streak', progress: 85, color: 'from-orange-500 to-red-500' },
    { icon: Target, title: 'Glucose Goals', progress: 72, color: 'from-purple-500 to-purple-600' },
    { icon: Star, title: 'Weekly Challenges', progress: 90, color: 'from-yellow-500 to-yellow-600' }
  ];

  const badges = [
    { icon: Trophy, label: 'Champion', earned: true, color: 'text-yellow-500 bg-yellow-100' },
    { icon: Award, label: 'Consistent', earned: true, color: 'text-purple-500 bg-purple-100' },
    { icon: Zap, label: 'Power User', earned: false, color: 'text-gray-400 bg-gray-100' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">HealthQuest Progress</h3>
          <p className="text-sm text-gray-500">Level 12 • 2,450 XP</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-teal-500 text-white px-4 py-2 rounded-full">
          <span className="text-sm font-bold">1,550 XP to next level</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <achievement.icon className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{achievement.title}</span>
              </div>
              <span className="text-sm font-bold text-gray-600">{achievement.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${achievement.color} transition-all duration-500`}
                style={{ width: `${achievement.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Recent Badges</h4>
        <div className="flex space-x-3">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center space-y-1 p-3 rounded-lg ${badge.color} ${badge.earned ? 'opacity-100' : 'opacity-50'} transition-all duration-200`}
            >
              <badge.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameProgress; 