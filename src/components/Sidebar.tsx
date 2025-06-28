import React from 'react';
import { Home, Activity, TrendingUp, Bot, Users, Heart, Trophy } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, language }) => {
  const t = useTranslation(language);

  const tabs = [
    { id: 'home', label: t.dashboard, icon: Home },
    { id: 'tracking', label: t.tracking, icon: Activity },
    { id: 'predictions', label: t.predictions, icon: TrendingUp },
    { id: 'flowsense', label: 'FlowSense AI', icon: Bot },
    { id: 'community', label: 'Care Circle', icon: Users },
    { id: 'pet', label: t.petCompanion, icon: Heart },
    { id: 'achievements', label: 'HealthQuest', icon: Trophy }
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 z-40 hidden lg:block">
      <div className="p-6">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-slate-900 dark:bg-slate-700 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;