import React from 'react';
import { ArrowRight } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  action: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Quick Actions</h2>
        <p className="text-sm text-white/60">Common tasks to help you stay on track</p>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={action.title}
            onClick={action.action}
            className="w-full group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 hover-lift border border-transparent hover:border-white/10"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Animated border */}
            <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`} />
            
            <div className="relative z-10 flex items-center space-x-4">
              {/* Icon */}
              <div className={`p-3 rounded-lg bg-gradient-to-r ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-white transition-colors duration-300">
                  {action.title}
                </h3>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {action.description}
                </p>
              </div>
              
              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;