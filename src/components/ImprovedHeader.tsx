import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Settings, 
  User, 
  Activity, 
  Wifi, 
  ChevronDown, 
  LogOut, 
  Shield, 
  Monitor, 
  Bluetooth, 
  Globe, 
  X, 
  Save, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Camera, 
  Download, 
  Trash2, 
  Key, 
  CreditCard, 
  Smartphone, 
  Languages, 
  Crown,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Zap
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { authService, AuthUser } from '../services/authService';

interface ImprovedHeaderProps {
  user: AuthUser | null;
  currentGlucose: number;
  isConnected: boolean;
  language: string;
  onLanguageChange: (language: string) => void;
  onSignOut: () => void;
  onUpgradeClick: () => void;
}

const ImprovedHeader: React.FC<ImprovedHeaderProps> = ({ 
  user,
  currentGlucose, 
  isConnected, 
  language, 
  onLanguageChange,
  onSignOut,
  onUpgradeClick
}) => {
  const t = useTranslation(language);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showConnectionMenu, setShowConnectionMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  // Refs for dropdown menus
  const connectionMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'glucose',
      title: 'Glucose Alert',
      message: 'Your glucose level is in optimal range (94 mg/dL)',
      time: '2 min ago',
      read: false,
      icon: Activity,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Meal Reminder',
      message: 'Time to log your lunch',
      time: '15 min ago',
      read: false,
      icon: Bell,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You\'ve maintained a 7-day logging streak',
      time: '1 hour ago',
      read: true,
      icon: Crown,
      color: 'text-amber-600 bg-amber-100'
    }
  ];

  // Auto-hide dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (connectionMenuRef.current && !connectionMenuRef.current.contains(event.target as Node)) {
        setShowConnectionMenu(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const connectionStatus = {
    bgm: { connected: true, label: t.bloodGlucoseMeter },
    bluetooth: { connected: true, label: t.bluetooth },
    internet: { connected: true, label: t.internet }
  };

  const handleProfileSave = async () => {
    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const { error } = await authService.updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName
      });

      if (error) {
        setProfileError(error.message);
      } else {
        setProfileSuccess('Profile updated successfully!');
        setTimeout(() => {
          setShowProfileModal(false);
          setProfileSuccess(null);
        }, 2000);
      }
    } catch (err) {
      setProfileError('Failed to update profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      onSignOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getGlucoseStatus = (glucose: number) => {
    if (glucose < 70) return { status: 'Low', color: 'text-red-600', bg: 'bg-gradient-to-r from-red-100 to-red-200', border: 'border-red-300' };
    if (glucose > 140) return { status: 'High', color: 'text-orange-600', bg: 'bg-gradient-to-r from-orange-100 to-orange-200', border: 'border-orange-300' };
    return { status: 'Normal', color: 'text-emerald-600', bg: 'bg-gradient-to-r from-emerald-100 to-emerald-200', border: 'border-emerald-300' };
  };

  const glucoseStatus = getGlucoseStatus(currentGlucose);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Enhanced Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Activity className="h-7 w-7 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t.appName}</h1>
              <p className="text-sm text-gray-500 font-medium">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Enhanced Center - Glucose Status */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className={`${glucoseStatus.bg} ${glucoseStatus.color} px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-lg border-2 ${glucoseStatus.border}`}>
              <Activity className="h-5 w-5" />
              <div className="text-center">
                <div className="font-bold text-lg">{currentGlucose}</div>
                <div className="text-xs opacity-80">mg/dL</div>
              </div>
              <div className="text-xs font-medium bg-white bg-opacity-30 px-2 py-1 rounded-full">
                {glucoseStatus.status}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-6">
            {/* Enhanced Premium Status */}
            {user?.isPremium ? (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-2xl shadow-lg">
                <Crown className="h-4 w-4" />
                <Sparkles className="h-3 w-3 animate-pulse" />
                <span className="text-sm font-medium hidden md:inline">Premium</span>
              </div>
            ) : (
              <button 
                onClick={onUpgradeClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Crown className="h-4 w-4" />
                <Zap className="h-3 w-3" />
                <span className="text-sm font-medium hidden md:inline">Upgrade</span>
              </button>
            )}
            
            {/* Enhanced Language Selector */}
            <div className="relative hidden md:block" ref={languageMenuRef}>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 px-4 py-2 rounded-2xl hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm"
              >
                <Languages className="h-4 w-4 text-gray-600" />
                <span className="text-lg">
                  {languages.find(l => l.code === language)?.flag}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-10 max-h-64 overflow-y-auto">
                  <div className="p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
                          language === lang.code 
                            ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 font-medium shadow-sm' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Enhanced Connection Status */}
            <div className="relative hidden md:block" ref={connectionMenuRef}>
              <button
                onClick={() => setShowConnectionMenu(!showConnectionMenu)}
                className="flex items-center space-x-2 px-4 py-2 rounded-2xl hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm"
              >
                <Wifi className={`h-4 w-4 ${isConnected ? 'text-emerald-600' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-600 hidden lg:inline font-medium">
                  {isConnected ? t.connected : t.disconnected}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showConnectionMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-10">
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>{t.connectionStatus}</span>
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(connectionStatus).map(([key, status]) => (
                        <div key={key} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            {key === 'bgm' && <Monitor className="h-4 w-4 text-gray-600" />}
                            {key === 'bluetooth' && <Bluetooth className="h-4 w-4 text-gray-600" />}
                            {key === 'internet' && <Globe className="h-4 w-4 text-gray-600" />}
                            <span className="text-sm text-gray-700 font-medium">{status.label}</span>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${status.connected ? 'bg-emerald-500 shadow-emerald-200' : 'bg-red-500 shadow-red-200'} shadow-lg`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-2xl hover:bg-gray-100 border border-gray-200 hover:border-gray-300 shadow-sm"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-10">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                    <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </h4>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-xl ${notification.color} shadow-sm`}>
                            <notification.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Settings */}
            <button className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-2xl hover:bg-gray-100 border border-gray-200 hover:border-gray-300 shadow-sm">
              <Settings className="h-5 w-5" />
            </button>
            
            {/* Enhanced User Menu */}
            {user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-sm border border-gray-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {user.firstName?.[0] || user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center space-x-1">
                      {user.isPremium ? (
                        <>
                          <Crown className="h-3 w-3 text-purple-500" />
                          <span>Premium Member</span>
                        </>
                      ) : (
                        <span>Free Account</span>
                      )}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl z-10">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">
                            {user.firstName?.[0] || user.email[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.firstName ? `${user.firstName} ${user.lastName}` : 'User'}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          {user.isPremium && (
                            <div className="flex items-center space-x-1 mt-1">
                              <Crown className="h-3 w-3 text-purple-500" />
                              <Sparkles className="h-3 w-3 text-purple-500" />
                              <span className="text-xs text-purple-600 font-medium">Premium Member</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          setShowProfileModal(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                        <Shield className="h-4 w-4" />
                        <span>Privacy & Security</span>
                      </button>
                      
                      {!user.isPremium && (
                        <button 
                          onClick={() => {
                            onUpgradeClick();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                        >
                          <Crown className="h-4 w-4" />
                          <Sparkles className="h-4 w-4" />
                          <span>Upgrade to Premium</span>
                        </button>
                      )}
                      
                      <hr className="my-2 border-gray-200" />
                      
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Glucose Status */}
        <div className="lg:hidden mt-4">
          <div className={`${glucoseStatus.bg} ${glucoseStatus.color} px-4 py-3 rounded-2xl flex items-center justify-center space-x-3 shadow-lg border-2 ${glucoseStatus.border}`}>
            <Activity className="h-4 w-4" />
            <span className="font-bold text-lg">{currentGlucose} mg/dL</span>
            <span className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded-full font-medium">({glucoseStatus.status})</span>
          </div>
        </div>
      </div>

      {/* Enhanced Profile Settings Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                  <p className="text-sm text-gray-500">Update your personal information</p>
                </div>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Enhanced Profile Photo */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-white text-2xl font-bold">
                    {user?.firstName?.[0] || user?.email[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200">
                    <Camera className="h-4 w-4" />
                    <span>Change Photo</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>

              {/* Enhanced Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>

              {/* Enhanced Messages */}
              {profileError && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{profileError}</p>
                </div>
              )}

              {profileSuccess && (
                <div className="flex items-center space-x-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <p className="text-sm text-emerald-700">{profileSuccess}</p>
                </div>
              )}
            </div>

            <div className="flex space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileSave}
                disabled={profileLoading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {profileLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default ImprovedHeader;