import React, { useState } from 'react';
import { Bell, Settings, User, Globe, Search, Menu, X } from 'lucide-react';

interface ImprovedHeaderProps {
  user?: any;
  language?: string;
  onLanguageChange?: (language: string) => void;
  onSignOut?: () => void;
  onUpgradeClick?: () => void;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const ImprovedHeader: React.FC<ImprovedHeaderProps> = ({ 
  user,
  language = 'en',
  onLanguageChange,
  onSignOut,
  onUpgradeClick,
  onMenuToggle,
  isMenuOpen
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const glucoseLevel = 120;
  const glucoseStatus = glucoseLevel < 100 ? 'normal' : glucoseLevel < 140 ? 'warning' : 'danger';

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Menu Button and Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300 hover:scale-105"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">DiabetesAI</h1>
              <p className="text-xs text-white/60">Smart Tracking</p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search features, data, insights..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Glucose Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-sm font-medium text-white">120 mg/dL</span>
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/30 text-emerald-300">Normal</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 hover:scale-105">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full border-2 border-gray-900"></span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              <Globe className="w-5 h-5 text-white" />
            </button>
            
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 glass rounded-lg border border-white/10 shadow-xl animate-fade-in-up">
                <div className="py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (onLanguageChange) onLanguageChange(lang.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 rounded-lg bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 hover:scale-105">
            <Settings className="w-5 h-5 text-white" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-105"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 glass rounded-lg border border-white/10 shadow-xl animate-fade-in-up">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user?.firstName || 'John'} {user?.lastName || 'Doe'}</p>
                      <p className="text-xs text-white/60">{user?.isPremium ? 'Premium Member' : 'Free Member'}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors">
                    Profile Settings
                  </button>
                  {!user?.isPremium && (
                    <button 
                      onClick={onUpgradeClick}
                      className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      Upgrade to Premium
                    </button>
                  )}
                  <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors">
                    Help & Support
                  </button>
                  <div className="border-t border-white/10 my-2"></div>
                  <button 
                    onClick={onSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ImprovedHeader; 