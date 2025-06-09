import React, { useState } from 'react';
import { Bell, Settings, User, Activity, Wifi, ChevronDown, LogOut, Shield, Monitor, Bluetooth, Globe, X, Save, Eye, EyeOff, Lock, Mail, Phone, Calendar, MapPin, Camera, Download, Trash2, Key, CreditCard, Smartphone, Languages } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface HeaderProps {
  userName: string;
  currentGlucose: number;
  isConnected: boolean;
  language: string;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userName, currentGlucose, isConnected, language, onLanguageChange }) => {
  const t = useTranslation(language);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showConnectionMenu, setShowConnectionMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Profile form state - now properly managed
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    address: '123 Main St, Anytown, USA',
    emergencyContact: 'John Johnson - +1 (555) 987-6543',
    diabetesType: 'Type 1',
    diagnosisDate: '2015-03-20',
    targetGlucoseMin: '70',
    targetGlucoseMax: '140'
  });

  // Current user display data - this will be updated when profile is saved
  const [currentUserData, setCurrentUserData] = useState({
    displayName: 'Sarah',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com'
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    analyticsOptIn: true,
    marketingEmails: false,
    researchParticipation: false,
    locationTracking: false,
    biometricAuth: true,
    twoFactorAuth: true,
    sessionTimeout: '30',
    dataRetention: '2'
  });

  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    notifications: {
      glucoseAlerts: true,
      mealReminders: true,
      exerciseReminders: false,
      medicationReminders: true,
      weeklyReports: true,
      communityUpdates: false
    },
    preferences: {
      units: 'mg/dL',
      timeFormat: '12',
      language: language,
      theme: 'Light',
      autoSync: true,
      offlineMode: false
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

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

  const handleProfileSave = () => {
    // Update the current user display data with the new profile information
    setCurrentUserData({
      displayName: profileData.firstName,
      fullName: `${profileData.firstName} ${profileData.lastName}`,
      email: profileData.email
    });

    console.log('Profile saved and updated:', {
      profileData,
      updatedUserData: {
        displayName: profileData.firstName,
        fullName: `${profileData.firstName} ${profileData.lastName}`,
        email: profileData.email
      }
    });

    // Show success feedback
    alert('Profile updated successfully!');
    
    setShowProfileModal(false);
  };

  const handlePrivacySave = () => {
    console.log('Privacy settings saved:', privacySettings);
    alert('Privacy settings updated successfully!');
    setShowPrivacyModal(false);
  };

  const handleAccountSave = () => {
    console.log('Account settings saved:', accountSettings);
    alert('Account settings updated successfully!');
    setShowAccountModal(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    console.log('Password changed successfully');
    alert('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  const openModal = (modalType: 'profile' | 'privacy' | 'account') => {
    setShowUserMenu(false);
    switch (modalType) {
      case 'profile':
        setShowProfileModal(true);
        break;
      case 'privacy':
        setShowPrivacyModal(true);
        break;
      case 'account':
        setShowAccountModal(true);
        break;
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    setAccountSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, language: newLanguage }
    }));
    setShowLanguageMenu(false);
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
              <h1 className="text-2xl font-bold text-gray-900">{t.appName}</h1>
              <p className="text-sm text-gray-500">{t.appSubtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Recent Glucose Reading */}
            <div className={`px-4 py-2 rounded-lg border ${getStatusColor()}`}>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{t.recentGlucoseReading}</span>
                <span className="text-lg font-bold">{currentGlucose} {t.mgdl}</span>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Languages className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {languages.find(l => l.code === language)?.flag}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                          language === lang.code 
                            ? 'bg-slate-100 text-slate-900 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Connection Status with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowConnectionMenu(!showConnectionMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-600">
                  {isConnected ? t.connected : t.disconnected}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showConnectionMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">{t.connectionStatus}</h4>
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
              
              {/* User Menu - Now uses dynamic user data */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{currentUserData.displayName}</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{currentUserData.fullName}</p>
                      <p className="text-xs text-gray-500">{currentUserData.email}</p>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={() => openModal('profile')}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>{t.profileSettings}</span>
                      </button>
                      <button 
                        onClick={() => openModal('privacy')}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Shield className="h-4 w-4" />
                        <span>Privacy & Security</span>
                      </button>
                      <button 
                        onClick={() => openModal('account')}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Account Settings</span>
                      </button>
                      <hr className="my-2 border-gray-200" />
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-900 p-2 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t.profileSettings}</h3>
                  <p className="text-sm text-gray-500">{t.managePersonalInfo}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-slate-600 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                    <Camera className="h-4 w-4" />
                    <span>Change Photo</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.firstName}</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.lastName}</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.dateOfBirth}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.diabetesType}</label>
                  <select
                    value={profileData.diabetesType}
                    onChange={(e) => setProfileData({...profileData, diabetesType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option value="Type 1">{t.type1}</option>
                    <option value="Type 2">{t.type2}</option>
                    <option value="Gestational">{t.gestational}</option>
                    <option value="MODY">MODY</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.address}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <input
                  type="text"
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="Name - Phone Number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Glucose Min ({t.mgdl})</label>
                  <input
                    type="number"
                    value={profileData.targetGlucoseMin}
                    onChange={(e) => setProfileData({...profileData, targetGlucoseMin: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Glucose Max ({t.mgdl})</label>
                  <input
                    type="number"
                    value={profileData.targetGlucoseMax}
                    onChange={(e) => setProfileData({...profileData, targetGlucoseMax: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>

              {/* Preview of changes */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Preview Changes</h4>
                <div className="text-sm text-blue-800">
                  <p><strong>Display Name:</strong> {profileData.firstName}</p>
                  <p><strong>Full Name:</strong> {profileData.firstName} {profileData.lastName}</p>
                  <p><strong>Email:</strong> {profileData.email}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleProfileSave}
                className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{t.save} Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;