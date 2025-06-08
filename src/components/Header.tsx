import React, { useState } from 'react';
import { Bell, Settings, User, Activity, Wifi, ChevronDown, LogOut, Shield, Monitor, Bluetooth, Globe } from 'lucide-react';

interface HeaderProps {
  userName: string;
  currentGlucose: number;
  isConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName, currentGlucose, isConnected }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showConnectionMenu, setShowConnectionMenu] = useState(false);

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

  const connectionStatus = {
    cgm: { connected: true, label: 'CGM' },
    bluetooth: { connected: true, label: 'Bluetooth' },
    internet: { connected: true, label: 'Internet' }
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
            {/* Recent Glucose Reading */}
            <div className={`px-4 py-2 rounded-lg border ${getStatusColor()}`}>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Recent Glucose Reading</span>
                <span className="text-lg font-bold">{currentGlucose} mg/dL</span>
              </div>
            </div>
            
            {/* Connection Status with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowConnectionMenu(!showConnectionMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showConnectionMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Connection Status</h4>
                    <div className="space-y-2">
                      {Object.entries(connectionStatus).map(([key, status]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {key === 'cgm' && <Monitor className="h-4 w-4 text-gray-600" />}
                            {key === 'bluetooth' && <Bluetooth className="h-4 w-4 text-gray-600" />}
                            {key === 'internet' && <Globe className="h-4 w-4 text-gray-600" />}
                            <span className="text-sm text-gray-700">{status.label}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${status.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{userName}</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">sarah.johnson@email.com</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <User className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <Shield className="h-4 w-4" />
                        <span>Privacy & Security</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <Settings className="h-4 w-4" />
                        <span>Account Settings</span>
                      </button>
                      <hr className="my-2 border-gray-200" />
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                    <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                      <p className="text-xs text-gray-500">
                        Your data is encrypted and secure. 
                        <button className="text-blue-600 hover:underline ml-1">
                          Privacy Policy
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;