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
    <div className="space-y-14 pb-24">
      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 rounded-3xl shadow-2xl p-10 md:p-16 text-white overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-radial from-blue-500/30 to-transparent rounded-full blur-2xl animate-pulse-slow" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-2xl animate-pulse-slow" />
              </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-5 rounded-2xl shadow-glow flex items-center justify-center">
              <timeGreeting.icon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">{timeGreeting.greeting}, {userData.name}!</h1>
          </div>
          <p className="text-lg md:text-xl text-slate-200 font-medium">Empowering your health journey with AI</p>
          <div className="flex items-center gap-6 mt-4">
            <div className="bg-slate-800/80 rounded-2xl px-8 py-4 flex flex-col items-center shadow-lg border-2 border-blue-700">
              <span className="text-3xl font-bold text-blue-400">{userData.currentGlucose}</span>
              <span className="text-xs text-slate-300">mg/dL • In Range</span>
            </div>
            <div className="bg-slate-800/80 rounded-2xl px-8 py-4 flex flex-col items-center shadow-lg border-2 border-purple-700">
              <span className="text-3xl font-bold text-purple-400">{userData.timeInRange}%</span>
              <span className="text-xs text-slate-300">Time in Range</span>
            </div>
          </div>
        </div>
      </section>

      {/* Glassmorphic Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="relative bg-white/20 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-purple-400/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.iconBg} shadow-glow animate-pulse-slow`}>
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <div className={`w-3 h-3 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-500' : 
                stat.trend === 'down' ? 'bg-red-500' : 'bg-amber-500'
              } shadow-glow`}></div>
            </div>
            <div className="space-y-2">
              <p className="text-base font-medium text-slate-100 dark:text-slate-300 tracking-wide">{stat.title}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-white dark:text-white drop-shadow">{stat.value}</span>
                <span className="text-lg font-medium text-slate-200">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Feature Cards */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Your Health Ecosystem</h3>
          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-300">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white/20 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-5 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-glow group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-9 w-9 text-white" />
                </div>
                <div className="text-right">
                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold dark:bg-emerald-900 dark:text-emerald-200">
                    {feature.status}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-400 transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-slate-200 dark:text-slate-300 leading-relaxed text-base">{feature.description}</p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">Explore</span>
                    <div className="w-10 h-10 bg-slate-200/30 dark:bg-slate-700/50 rounded-full flex items-center justify-center group-hover:bg-blue-600/80 transition-all">
                      <TrendingUp className="h-5 w-5 text-slate-600 dark:text-slate-200 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Activity Feed */}
      <section className="bg-white/80 dark:bg-slate-900/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl mt-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="flex flex-col gap-6">
          {allLogs.slice(0, 6).map((log, idx) => (
            <div key={log.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  log.type === 'meal' ? 'bg-gradient-to-br from-orange-400 to-red-500' :
                  log.type === 'exercise' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                  log.type === 'glucose' ? 'bg-gradient-to-br from-blue-400 to-indigo-500' :
                  'bg-gradient-to-br from-purple-400 to-pink-500'
                }`}>
                {log.type === 'meal' && <Utensils className="h-5 w-5 text-white" />}
                {log.type === 'exercise' && <Activity className="h-5 w-5 text-white" />}
                {log.type === 'glucose' && <Droplets className="h-5 w-5 text-white" />}
                {log.type === 'profile' && <Heart className="h-5 w-5 text-white" />}
              </div>
                {idx < allLogs.slice(0, 6).length - 1 && (
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 mx-auto" />
                )}
              </div>
              <div className="flex-1 bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 shadow border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {log.type === 'meal' && log.data.mealName}
                    {log.type === 'exercise' && `${log.data.exerciseType} - ${log.data.duration} min`}
                    {log.type === 'glucose' && `${log.data.glucose} mg/dL`}
                    {log.type === 'profile' && 'Profile Updated'}
                  </h4>
                  <span className="text-xs font-medium text-slate-400">{log.time}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {log.type === 'meal' && `${log.data.carbs}g carbs • ${log.data.calories} cal`}
                  {log.type === 'exercise' && `${log.data.intensity} intensity`}
                  {log.type === 'glucose' && log.data.context}
                  {log.type === 'profile' && 'Health profile information updated'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeTab;