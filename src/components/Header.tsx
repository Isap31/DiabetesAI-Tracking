import React, { useState } from 'react';
import { Bell, Settings, User, Activity, Wifi, ChevronDown, LogOut, Shield, Monitor, Bluetooth, Globe, X, Save, Eye, EyeOff, Lock, Mail, Phone, Calendar, MapPin, Camera, Download, Trash2, Key, CreditCard, Smartphone } from 'lucide-react';

interface HeaderProps {
  userName: string;
  currentGlucose: number;
  isConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName, currentGlucose, isConnected }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showConnectionMenu, setShowConnectionMenu] = useState(false);
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
      language: 'English',
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
                        <span>Profile Settings</span>
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
                  <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                  <p className="text-sm text-gray-500">Manage your personal information</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diabetes Type</label>
                  <select
                    value={profileData.diabetesType}
                    onChange={(e) => setProfileData({...profileData, diabetesType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="Gestational">Gestational</option>
                    <option value="MODY">MODY</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Glucose Min (mg/dL)</label>
                  <input
                    type="number"
                    value={profileData.targetGlucoseMin}
                    onChange={(e) => setProfileData({...profileData, targetGlucoseMin: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Glucose Max (mg/dL)</label>
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
                Cancel
              </button>
              <button
                onClick={handleProfileSave}
                className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Security Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-900 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
                  <p className="text-sm text-gray-500">Manage your privacy and security settings</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Password Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Password</span>
                  </div>
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="text-sm text-slate-600 hover:text-slate-700 font-medium"
                  >
                    Change Password
                  </button>
                </div>
                
                {showPasswordForm && (
                  <div className="space-y-3 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="Minimum 8 characters"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                )}
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.twoFactorAuth}
                    onChange={(e) => setPrivacySettings({...privacySettings, twoFactorAuth: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                </label>
              </div>

              {/* Privacy Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                
                {[
                  { key: 'dataSharing', label: 'Share anonymized data for research', description: 'Help improve diabetes care' },
                  { key: 'analyticsOptIn', label: 'Analytics and performance', description: 'Help us improve the app' },
                  { key: 'marketingEmails', label: 'Marketing emails', description: 'Receive product updates and tips' },
                  { key: 'researchParticipation', label: 'Research participation', description: 'Participate in diabetes research studies' },
                  { key: 'locationTracking', label: 'Location tracking', description: 'For exercise and activity tracking' },
                  { key: 'biometricAuth', label: 'Biometric authentication', description: 'Use fingerprint or face ID' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{setting.label}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings[setting.key as keyof typeof privacySettings] as boolean}
                        onChange={(e) => setPrivacySettings({...privacySettings, [setting.key]: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              {/* Data Management */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Data Management</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                    <select
                      value={privacySettings.sessionTimeout}
                      onChange={(e) => setPrivacySettings({...privacySettings, sessionTimeout: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention (years)</label>
                    <select
                      value={privacySettings.dataRetention}
                      onChange={(e) => setPrivacySettings({...privacySettings, dataRetention: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="1">1 year</option>
                      <option value="2">2 years</option>
                      <option value="5">5 years</option>
                      <option value="forever">Forever</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePrivacySave}
                className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Settings Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-900 p-2 rounded-lg">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                  <p className="text-sm text-gray-500">Manage your account preferences</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAccountModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Notifications</h4>
                
                {[
                  { key: 'glucoseAlerts', label: 'Glucose Alerts', description: 'High/low glucose warnings' },
                  { key: 'mealReminders', label: 'Meal Reminders', description: 'Reminders to log meals' },
                  { key: 'exerciseReminders', label: 'Exercise Reminders', description: 'Daily activity reminders' },
                  { key: 'medicationReminders', label: 'Medication Reminders', description: 'Insulin and medication alerts' },
                  { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary of your progress' },
                  { key: 'communityUpdates', label: 'Community Updates', description: 'New posts and messages' }
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{notification.label}</p>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={accountSettings.notifications[notification.key as keyof typeof accountSettings.notifications]}
                        onChange={(e) => setAccountSettings({
                          ...accountSettings,
                          notifications: {
                            ...accountSettings.notifications,
                            [notification.key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              {/* App Preferences */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">App Preferences</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Glucose Units</label>
                    <select
                      value={accountSettings.preferences.units}
                      onChange={(e) => setAccountSettings({
                        ...accountSettings,
                        preferences: { ...accountSettings.preferences, units: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="mg/dL">mg/dL</option>
                      <option value="mmol/L">mmol/L</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                    <select
                      value={accountSettings.preferences.timeFormat}
                      onChange={(e) => setAccountSettings({
                        ...accountSettings,
                        preferences: { ...accountSettings.preferences, timeFormat: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="12">12-hour</option>
                      <option value="24">24-hour</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={accountSettings.preferences.language}
                      onChange={(e) => setAccountSettings({
                        ...accountSettings,
                        preferences: { ...accountSettings.preferences, language: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                      value={accountSettings.preferences.theme}
                      onChange={(e) => setAccountSettings({
                        ...accountSettings,
                        preferences: { ...accountSettings.preferences, theme: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="Light">Light</option>
                      <option value="Dark">Dark</option>
                      <option value="Auto">Auto</option>
                    </select>
                  </div>
                </div>

                {/* Sync Settings */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Auto Sync</p>
                      <p className="text-sm text-gray-500">Automatically sync data across devices</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={accountSettings.preferences.autoSync}
                        onChange={(e) => setAccountSettings({
                          ...accountSettings,
                          preferences: { ...accountSettings.preferences, autoSync: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Offline Mode</p>
                      <p className="text-sm text-gray-500">Continue using app without internet</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={accountSettings.preferences.offlineMode}
                        onChange={(e) => setAccountSettings({
                          ...accountSettings,
                          preferences: { ...accountSettings.preferences, offlineMode: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 w-5 after:transition-all peer-checked:bg-slate-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Subscription & Billing */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <h4 className="font-medium text-gray-900">Subscription & Billing</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Plan:</span>
                    <span className="text-sm font-medium text-gray-900">Premium Monthly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next billing:</span>
                    <span className="text-sm font-medium text-gray-900">March 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-sm font-medium text-gray-900">$9.99/month</span>
                  </div>
                </div>
                <button className="mt-3 text-sm text-slate-600 hover:text-slate-700 font-medium">
                  Manage Subscription
                </button>
              </div>
            </div>

            <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => setShowAccountModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountSave}
                className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
              >
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

export default Header;