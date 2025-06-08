import React from 'react';
import { Home, Activity, MessageCircle, Trophy, Heart, Brain, Users } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'tracking', label: 'Tracking', icon: Activity },
    { id: 'pet', label: 'Pet Companion', icon: Heart },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Trophy }
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 z-40">
      <div className="p-6">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* AI Assistant Quick Access */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-slate-900 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <Brain className="h-5 w-5" />
            <div>
              <h4 className="font-medium">FlowSense AI</h4>
              <p className="text-xs text-gray-300">Always here to help</p>
            </div>
          </div>
          <button className="w-full bg-white bg-opacity-10 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-opacity-20 transition-all duration-200">
            Ask AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;