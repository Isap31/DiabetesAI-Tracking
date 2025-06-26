import React, { useState } from 'react';
import { Activity, Heart, TrendingUp, Zap, Target, Calendar, Award, Sparkles, Sun, Moon, Star, Droplets, Utensils, Clock, Brain, Shield, Crown, Users, MessageCircle, Bot } from 'lucide-react';
import StatsCard from './StatsCard';
import FeatureCard from './FeatureCard';
import QuickActions from './QuickActions';
import DailyAffirmation from './DailyAffirmation';
import PetCompanion from './PetCompanion';
import { useTranslation } from '../utils/translations';

interface HomeTabProps {
  allLogs: any[];
  onDataLogged?: (data: any) => void;
  language: string;
  useDemoData: boolean;
}

const HomeTab: React.FC<HomeTabProps> = ({ allLogs, onDataLogged, language, useDemoData }) => {
  const t = useTranslation(language);
  const [showGoals, setShowGoals] = useState(false);

  // Enhanced user data with more dynamic content
  const userData = {
    name: 'Sarah',
    currentGlucose: 94,
    timeInRange: 87,
    streak: 12,
    healthScore: 92,
    yearsSinceDiagnosis: 9,
    petHealth: 85,
    petHappiness: 92,
    petLevel: 12,
    petName: 'Aurora'
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return { greeting: 'Good night', icon: Moon, color: 'from-indigo-600 to-purple-700' };
    if (hour < 12) return { greeting: 'Good morning', icon: Sun, color: 'from-amber-500 to-orange-600' };
    if (hour < 18) return { greeting: 'Good afternoon', icon: Star, color: 'from-blue-500 to-cyan-600' };
    return { greeting: 'Good evening', icon: Sparkles, color: 'from-purple-600 to-pink-600' };
  };

  const timeGreeting = getTimeBasedGreeting();

  const quickStats = [
    {
      title: t.currentGlucose,
      value: userData.currentGlucose.toString(),
      unit: t.mgdl,
      trend: 'stable' as const,
      icon: Droplets,
      color: 'emerald' as const,
      bgGradient: 'from-emerald-50 to-teal-50',
      iconBg: 'from-emerald-500 to-teal-600'
    },
    {
      title: t.timeInRange,
      value: userData.timeInRange.toString(),
      unit: '%',
      trend: 'up' as const,
      icon: Target,
      color: 'blue' as const,
      bgGradient: 'from-blue-50 to-indigo-50',
      iconBg: 'from-blue-500 to-indigo-600'
    },
    {
      title: t.loggingStreak,
      value: userData.streak.toString(),
      unit: t.days,
      trend: 'up' as const,
      icon: Zap,
      color: 'amber' as const,
      bgGradient: 'from-amber-50 to-yellow-50',
      iconBg: 'from-amber-500 to-yellow-600'
    },
    {
      title: t.healthScore,
      value: userData.healthScore.toString(),
      unit: '/100',
      trend: 'up' as const,
      icon: Heart,
      color: 'rose' as const,
      bgGradient: 'from-rose-50 to-pink-50',
      iconBg: 'from-rose-500 to-pink-600'
    }
  ];

  const features = [
    {
      title: 'AI Predictions',
      description: 'Advanced glucose forecasting with 93% accuracy using machine learning',
      icon: Brain,
      color: 'violet' as const,
      status: 'Active',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      title: 'Care Circle',
      description: 'Connect with family and healthcare providers for shared support',
      icon: Users,
      color: 'cyan' as const,
      status: 'Connected',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'FlowSense AI',
      description: 'Your intelligent health assistant available 24/7 for guidance',
      icon: Bot,
      color: 'emerald' as const,
      status: 'Ready',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'HealthQuest',
      description: 'Gamified wellness journey with achievements and rewards',
      icon: Award,
      color: 'amber' as const,
      status: 'Level 12',
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Enhanced Hero Section */}
      <div className={`bg-gradient-to-br ${timeGreeting.color} rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl`}>
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-10 rounded-full translate-y-24 -translate-x-24 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white bg-opacity-5 rounded-full -translate-x-16 -translate-y-16 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
                <timeGreeting.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{timeGreeting.greeting}, {userData.name}! ✨</h1>
                <p className="text-lg text-white text-opacity-90">Your health journey continues to inspire</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold">{userData.currentGlucose}</div>
                <div className="text-sm text-white text-opacity-80">mg/dL • In Range</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-6 w-6 text-white" />
                <span className="font-semibold text-white">System Status</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Optimal</div>
              <div className="text-sm text-white text-opacity-80">All monitoring systems active</div>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="h-6 w-6 text-white" />
                <span className="font-semibold text-white">Today's Progress</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{userData.timeInRange}%</div>
              <div className="text-sm text-white text-opacity-80">Time in target range</div>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Crown className="h-6 w-6 text-white" />
                <span className="font-semibold text-white">Experience</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{userData.yearsSinceDiagnosis}</div>
              <div className="text-sm text-white text-opacity-80">Years of wisdom</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Affirmation */}
      <DailyAffirmation language={language} />

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border border-white border-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.iconBg} shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`w-3 h-3 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-500' : 
                stat.trend === 'down' ? 'bg-red-500' : 'bg-amber-500'
              } shadow-lg`}></div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">{stat.title}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-sm font-medium text-gray-600">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pet Companion Section */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-8 border border-purple-200 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-2xl shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Your Companion</h3>
              <p className="text-purple-600 font-medium">{userData.petName} • Level {userData.petLevel}</p>
            </div>
          </div>
          <div className="text-6xl animate-bounce">🐕</div>
        </div>
        
        <PetCompanion
          petHealth={userData.petHealth}
          petHappiness={userData.petHappiness}
          petLevel={userData.petLevel}
          petName={userData.petName}
          glucoseInRange={userData.currentGlucose >= 70 && userData.currentGlucose <= 140}
          streakDays={userData.streak}
        />
      </div>

      {/* Enhanced Feature Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Your Health Ecosystem</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                    {feature.status}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Explore</span>
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center group-hover:from-purple-500 group-hover:to-pink-600 transition-all duration-300">
                      <TrendingUp className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-8 border border-slate-200 shadow-xl">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-3 rounded-2xl shadow-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
            <p className="text-slate-600">Log your health data instantly</p>
          </div>
        </div>
        
        <QuickActions onDataLogged={onDataLogged} language={language} />
      </div>

      {/* Recent Activity with Enhanced Design */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
              <p className="text-indigo-600">Your latest health entries</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full">
            <span className="text-sm font-bold text-indigo-700">{allLogs.length} entries today</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {allLogs.slice(0, 5).map((log, index) => (
            <div key={log.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className={`p-3 rounded-xl ${
                log.type === 'meal' ? 'bg-gradient-to-r from-orange-500 to-red-600' :
                log.type === 'exercise' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                log.type === 'glucose' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                'bg-gradient-to-r from-purple-500 to-pink-600'
              } shadow-lg`}>
                {log.type === 'meal' && <Utensils className="h-5 w-5 text-white" />}
                {log.type === 'exercise' && <Activity className="h-5 w-5 text-white" />}
                {log.type === 'glucose' && <Droplets className="h-5 w-5 text-white" />}
                {log.type === 'profile' && <Heart className="h-5 w-5 text-white" />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">
                    {log.type === 'meal' && log.data.mealName}
                    {log.type === 'exercise' && `${log.data.exerciseType} - ${log.data.duration} min`}
                    {log.type === 'glucose' && `${log.data.glucose} mg/dL`}
                    {log.type === 'profile' && 'Profile Updated'}
                  </h4>
                  <span className="text-sm font-medium text-gray-500">{log.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {log.type === 'meal' && `${log.data.carbs}g carbs • ${log.data.calories} cal`}
                  {log.type === 'exercise' && `${log.data.intensity} intensity`}
                  {log.type === 'glucose' && log.data.context}
                  {log.type === 'profile' && 'Health profile information updated'}
                </p>
              </div>
              
              <div className={`w-3 h-3 rounded-full ${
                log.type === 'meal' ? 'bg-orange-400' :
                log.type === 'exercise' ? 'bg-green-400' :
                log.type === 'glucose' ? 'bg-blue-400' :
                'bg-purple-400'
              } shadow-lg`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;