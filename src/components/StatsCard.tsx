import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'emerald' | 'amber' | 'rose' | 'violet' | 'cyan';
  bgGradient?: string;
  iconBg?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  unit, 
  trend, 
  icon: Icon, 
  color,
  bgGradient,
  iconBg
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    red: 'text-red-600 bg-red-50 border-red-200',
    gray: 'text-gray-600 bg-gray-50 border-gray-200',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    amber: 'text-amber-600 bg-amber-50 border-amber-200',
    rose: 'text-rose-600 bg-rose-50 border-rose-200',
    violet: 'text-violet-600 bg-violet-50 border-violet-200',
    cyan: 'text-cyan-600 bg-cyan-50 border-cyan-200'
  };

  const iconGradients = {
    blue: 'from-blue-500 to-indigo-600',
    green: 'from-green-500 to-emerald-600',
    orange: 'from-orange-500 to-red-600',
    red: 'from-red-500 to-pink-600',
    gray: 'from-gray-500 to-slate-600',
    emerald: 'from-emerald-500 to-teal-600',
    amber: 'from-amber-500 to-yellow-600',
    rose: 'from-rose-500 to-pink-600',
    violet: 'from-violet-500 to-purple-600',
    cyan: 'from-cyan-500 to-blue-600'
  };

  const trendColors = {
    up: 'bg-emerald-500 shadow-emerald-200',
    down: 'bg-red-500 shadow-red-200',
    stable: 'bg-amber-500 shadow-amber-200'
  };

  return (
    <div className={`${bgGradient ? `bg-gradient-to-br ${bgGradient}` : `bg-white ${colorClasses[color].split(' ')[1]}`} rounded-2xl p-6 border ${bgGradient ? 'border-white border-opacity-50' : colorClasses[color].split(' ')[2]} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${iconBg || iconGradients[color]} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className={`w-3 h-3 rounded-full ${trendColors[trend]} shadow-lg animate-pulse`}></div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{title}</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">{value}</span>
          {unit && <span className="text-sm font-medium text-gray-600">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;