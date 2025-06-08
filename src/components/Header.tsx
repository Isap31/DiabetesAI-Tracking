import React from 'react';
import { Bell, Settings, User, Activity, Wifi } from 'lucide-react';

interface HeaderProps {
  userName: string;
  currentGlucose: number;
  isConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName, currentGlucose, isConnected }) => {
  const getGlucoseStatus = () => {
    if (currentGlucose >= 70 && currentGlucose <= 140) return 'normal';
    if (currentGlucose < 70) return 'low';
    return 'high';
  };

  const getStatusColor = () => {
    const status = getGlucoseStatus();
    switch (status) {
      case 'normal': return 'text-green-700 bg-green-50 border-green-200';
      case 'low': return 'text-red-700 bg-red-50 border-red-200';
      case 'high': return 'text-orange-700 bg-orange-50 border-orange-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-slate-900 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AuroraFlow</h1>
              <p className="text-sm text-gray-500">AI-Powered Diabetes Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Glucose Status */}
            <div className={`px-4 py-2 rounded-lg border ${getStatusColor()}`}>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Current Glucose</span>
                <span className="text-lg font-bold">{currentGlucose} mg/dL</span>
              </div>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-lg">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{userName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;