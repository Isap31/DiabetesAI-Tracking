import React from 'react';
import GameProgress from './GameProgress';
import { Trophy, Star, Target, Flame, Award, Zap, Crown, Shield } from 'lucide-react';

const AchievementsTab = () => {
  const achievements = [
    { icon: Flame, title: 'Streak Master', description: '30-day logging streak', progress: 40, total: 30, earned: false, color: 'from-orange-500 to-red-500' },
    { icon: Target, title: 'Glucose Guardian', description: '90% time in range for a week', progress: 85, total: 90, earned: false, color: 'from-purple-500 to-purple-600' },
    { icon: Star, title: 'Pet Parent', description: 'Keep pet happy for 14 days', progress: 100, total: 14, earned: true, color: 'from-yellow-500 to-yellow-600' },
    { icon: Crown, title: 'Health Champion', description: 'Reach level 15', progress: 80, total: 15, earned: false, color: 'from-yellow-600 to-orange-500' },
    { icon: Shield, title: 'Consistency King', description: 'Log meals for 21 days straight', progress: 57, total: 21, earned: false, color: 'from-blue-500 to-blue-600' },
    { icon: Zap, title: 'Power User', description: 'Use all features in one day', progress: 100, total: 6, earned: true, color: 'from-teal-500 to-teal-600' }
  ];

  const weeklyQuests = [
    { title: 'Log 21 meals', progress: 18, total: 21, reward: 500, icon: Target },
    { title: 'Exercise 5 times', progress: 3, total: 5, reward: 300, icon: Zap },
    { title: 'Help 3 community members', progress: 1, total: 3, reward: 200, icon: Star }
  ];

  return (
    <div className="space-y-6">
      {/* Game Progress */}
      <GameProgress />

      {/* Weekly Quests */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Weekly Quests</h3>
        <div className="space-y-3">
          {weeklyQuests.map((quest, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <quest.icon className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">{quest.title}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="font-bold text-gray-600">{quest.reward}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">{quest.progress}/{quest.total}</span>
                <span className="text-xs font-bold text-gray-600">{Math.round((quest.progress / quest.total) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div key={index} className={`border-2 rounded-lg p-3 ${achievement.earned ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
              <div className={`p-2 rounded-lg w-fit mb-2 bg-gradient-to-r ${achievement.color} ${achievement.earned ? 'opacity-100' : 'opacity-50'}`}>
                <achievement.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
              {!achievement.earned && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">{achievement.progress}/{achievement.total}</span>
                    <span className="font-bold text-gray-600">{Math.round((achievement.progress / achievement.total) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${achievement.color} transition-all duration-500`}
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {achievement.earned && (
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Trophy className="h-3 w-3" />
                  <span className="text-xs font-bold">Earned!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsTab;