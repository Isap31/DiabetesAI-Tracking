import React from 'react';
import { DivideIcon as LucideIcon, ArrowRight, Sparkles } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  color: 'purple' | 'teal' | 'blue' | 'magenta' | 'violet' | 'cyan' | 'emerald' | 'amber';
  status?: string;
  action?: string;
  interactive?: boolean;
  gradient?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  status, 
  action = 'Explore',
  interactive = true,
  gradient
}) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600 border-purple-200 hover:border-purple-300 bg-purple-50',
    teal: 'from-teal-500 to-teal-600 border-teal-200 hover:border-teal-300 bg-teal-50',
    blue: 'from-blue-500 to-blue-600 border-blue-200 hover:border-blue-300 bg-blue-50',
    magenta: 'from-pink-500 to-pink-600 border-pink-200 hover:border-pink-300 bg-pink-50',
    violet: 'from-violet-500 to-violet-600 border-violet-200 hover:border-violet-300 bg-violet-50',
    cyan: 'from-cyan-500 to-cyan-600 border-cyan-200 hover:border-cyan-300 bg-cyan-50',
    emerald: 'from-emerald-500 to-emerald-600 border-emerald-200 hover:border-emerald-300 bg-emerald-50',
    amber: 'from-amber-500 to-amber-600 border-amber-200 hover:border-amber-300 bg-amber-50'
  };

  const classes = colorClasses[color];
  const [gradientFrom, gradientTo, borderColor, hoverBorderColor, bgColor] = classes.split(' ');

  return (
    <div className={`bg-white rounded-2xl border-2 ${borderColor} ${interactive ? hoverBorderColor : ''} shadow-xl hover:shadow-2xl transition-all duration-500 transform ${interactive ? 'hover:-translate-y-2 hover:scale-105 cursor-pointer' : ''} group relative overflow-hidden`}>
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Sparkle effects */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles className="h-4 w-4 text-gray-400 animate-pulse" />
      </div>
      
      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradientFrom} ${gradientTo} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          {status && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
              {status}
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">{title}</h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">{description}</p>
          
          {interactive && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-200">
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">{action}</span>
              <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center group-hover:from-purple-500 group-hover:to-pink-600 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;