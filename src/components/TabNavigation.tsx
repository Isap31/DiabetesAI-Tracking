import React from 'react';
import { Home, Activity, MessageCircle, Trophy, Heart } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tracking', label: 'Track', icon: Activity },
    { id: 'pet', label: 'Pet', icon: Heart },
    { id: 'community', label: 'Chat', icon: MessageCircle },
    { id: 'achievements', label: 'Quest', icon: Trophy }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-purple-600'
            }`}
          >
            <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'scale-110' : ''} transition-transform duration-200`} />
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;