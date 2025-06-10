import React from 'react';
import { Home, Activity, MessageCircle, Trophy, Heart, TrendingUp } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tracking', label: 'Track', icon: Activity },
    { id: 'predictions', label: 'AI', icon: TrendingUp },
    { id: 'community', label: 'Chat', icon: MessageCircle },
    { id: 'pet', label: 'Pet', icon: Heart },
    { id: 'achievements', label: 'Goals', icon: Trophy }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 lg:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-0 ${
              activeTab === tab.id
                ? 'text-slate-900 bg-slate-50'
                : 'text-gray-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'scale-110' : ''} transition-transform duration-200`} />
            <span className="text-xs font-medium truncate">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;