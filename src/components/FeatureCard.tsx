import React from 'react';
import { DivideIcon as LucideIcon, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'purple' | 'teal' | 'blue' | 'magenta';
  status?: string;
  action?: string;
  interactive?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  status, 
  action = 'Explore',
  interactive = true 
}) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600 border-purple-200 hover:border-purple-300',
    teal: 'from-teal-500 to-teal-600 border-teal-200 hover:border-teal-300',
    blue: 'from-blue-500 to-blue-600 border-blue-200 hover:border-blue-300',
    magenta: 'from-pink-500 to-pink-600 border-pink-200 hover:border-pink-300'
  };

  return (
    <div className={`bg-white rounded-xl border-2 ${colorClasses[color].split(' ')[2]} ${interactive ? colorClasses[color].split(' ')[3] : ''} shadow-lg hover:shadow-xl transition-all duration-300 transform ${interactive ? 'hover:-translate-y-1 cursor-pointer' : ''} group`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {status && (
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
              {status}
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          
          {interactive && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-500">{action}</span>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;