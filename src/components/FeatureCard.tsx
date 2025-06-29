import React from 'react';
import { Sparkles } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  status: 'active' | 'new' | 'coming-soon';
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient,
  status,
  delay = 0
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Active
          </span>
        );
      case 'new':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>New</span>
          </span>
        );
      case 'coming-soon':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30">
            Coming Soon
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="glass rounded-2xl p-6 relative overflow-hidden group hover-lift cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Animated border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {getStatusBadge(status)}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-sm text-white/60 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        {/* Interactive overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full" />
      </div>
    </div>
  );
};

export default FeatureCard;