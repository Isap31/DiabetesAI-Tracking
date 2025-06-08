import React from 'react';
import { Bell, Settings, Zap, Wifi } from 'lucide-react';

interface MobileHeaderProps {
  userName: string;
  currentGlucose: number;
  isConnected: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ userName, currentGlucose, isConnected }) => {
  const getGlucoseStatus = () => {
    if (currentGlucose >= 70 && currentGlucose <= 140) return 'normal';
    if (currentGlucose < 70) return 'low';
    return 'high';
  };

  const getStatusColor = () => {
    const status = getGlucoseStatus();
    switch (status) {
      case 'normal': return 'text-green-500 bg-green-50';
      case 'low': return 'text-red-500 bg-red-50';
      case 'high': return 'text-orange-500 bg-orange-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-teal-500 p-2 rounded-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              AuroraFlow
            </h1>
            <p className="text-xs text-gray-500">Hi, {userName}! 👋</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Glucose Status */}
          <div className={`px-3 py-1 rounded-full ${getStatusColor()}`}>
            <span className="text-sm font-bold">{currentGlucose}</span>
          </div>
          
          {/* Connection Status */}
          <div className="flex items-center space-x-1">
            <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-gray-400'}`} />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;