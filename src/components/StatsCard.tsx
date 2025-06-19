import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red' | 'gray';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  unit, 
  trend, 
  icon: Icon, 
  color
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    orange: 'text-orange-600 bg-orange-50',
    red: 'text-red-600 bg-red-50',
    gray: 'text-gray-600 bg-gray-50'
  };

  const trendColors = {
    up: 'bg-green-500',
    down: 'bg-red-500',
    stable: 'bg-gray-500'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`w-2 h-2 rounded-full ${trendColors[trend]}`}></div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-sm font-medium text-gray-500">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 