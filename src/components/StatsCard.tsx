import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  unit: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  status: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType,
  icon: Icon,
  gradient,
  status,
  delay = 0
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'excellent':
        return 'text-emerald-400';
      case 'warning':
        return 'text-orange-400';
      case 'danger':
        return 'text-red-400';
      case 'on-track':
        return 'text-blue-400';
      case 'maintained':
        return 'text-purple-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div 
      className="glass rounded-2xl p-6 relative overflow-hidden group hover-lift"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Animated border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex items-center space-x-1">
            {changeType === 'increase' ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${
              changeType === 'increase' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {change}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white/60">{title}</h3>
          
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold text-white">{value}</span>
            <span className="text-lg text-white/60">{unit}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} animate-pulse`} />
            <span className={`text-sm font-medium ${getStatusColor(status)} capitalize`}>
              {status}
            </span>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </div>
    </div>
  );
};

export default StatsCard;