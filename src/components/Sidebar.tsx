import React, { useState, useRef } from 'react';
import { Home, Activity, MessageCircle, Trophy, Heart, Brain, Users, TrendingUp, Mic, Book, Bot, X, Send } from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { elevenLabsService } from '../services/elevenLabsService';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, language }) => {
  const t = useTranslation(language);
  const [showFlowSense, setShowFlowSense] = useState(false);
  const [micAllowed, setMicAllowed] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; message: string }[]>([]);
  const [sessionActive, setSessionActive] = useState(false);

  const handleExplainMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
    } catch (err) {
      setMicError('Microphone access denied or unavailable. Please allow microphone access to use FlowSense AI.');
    }
  };

  const handleStartVoice = async () => {
    try {
      // Placeholder for future integration with the Vite SDK
    } catch (err) {
      setMicError('Failed to start voice session.');
    }
  };

  const handleEndVoice = async () => {
    // Placeholder for future integration with the Vite SDK
    setSessionActive(false);
  };

  const handleSend = () => {
    if (chatInput.trim()) {
      // Placeholder for future integration with the Vite SDK
      setChatInput('');
    }
  };

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
    <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 z-40 hidden lg:block">
      <div className="p-6">
        <nav className="space-y-1">
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
      <div className="absolute bottom-20 left-6 right-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white shadow-lg border-2 border-blue-400">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{t.flowSenseAI}</h4>
              <p className="text-xs text-blue-100">Always here to help</p>
            </div>
          </div>
          <button className="w-full bg-white bg-opacity-20 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center space-x-2">
            <Mic className="h-4 w-4" />
            <span>Voice Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;