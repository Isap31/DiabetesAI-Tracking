import React, { useState, useEffect, Suspense, lazy } from 'react';
import { X } from 'lucide-react';
import ImprovedHeader from './components/ImprovedHeader';
import Sidebar from './components/Sidebar';
import TabNavigation from './components/TabNavigation';
import AuthModal from './components/AuthModal';
import PremiumSubscriptionModal from './components/PremiumSubscriptionModal';
import OnboardingSurvey from './components/OnboardingSurvey';
import AccessibilitySettingsModal from './components/AccessibilitySettings';
import { authService, AuthUser } from './services/authService';
import { revenueCatService } from './services/revenueCatService';
import { fetchUserLogs } from './services/logService';
import { isSupabaseConfigured } from './lib/supabase';

// Lazy load main tab components
const HomeTab = lazy(() => import('./components/HomeTab'));
const TrackingTab = lazy(() => import('./components/TrackingTab'));
const CommunityTab = lazy(() => import('./components/CommunityTab'));
const PetTab = lazy(() => import('./components/PetTab'));
const AchievementsTab = lazy(() => import('./components/AchievementsTab'));
const PredictionsTab = lazy(() => import('./components/PredictionsTab'));
const FlowSenseAI = lazy(() => import('./components/FlowSenseAI'));

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showOnboardingSurvey, setShowOnboardingSurvey] = useState(false);
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [allLogs, setAllLogs] = useState([
    { 
      id: 1, 
      type: 'meal', 
      data: { 
        mealName: 'Grilled Chicken Salad', 
        carbs: '15', 
        calories: '350',
        time: '12:30 PM'
      }, 
      time: '12:30 PM', 
      date: '2024-01-15' 
    },
    { 
      id: 2, 
      type: 'exercise', 
      data: { 
        exerciseType: 'Walking', 
        duration: '30', 
        intensity: 'moderate',
        time: '11:00 AM'
      }, 
      time: '11:00 AM', 
      date: '2024-01-15' 
    },
    { 
      id: 3, 
      type: 'glucose', 
      data: { 
        glucose: '94', 
        context: 'before-meal', 
        notes: 'Feeling good',
        time: '10:30 AM'
      }, 
      time: '10:30 AM', 
      date: '2024-01-15' 
    },
    { 
      id: 4, 
      type: 'meal', 
      data: { 
        mealName: 'Oatmeal with Berries', 
        carbs: '25', 
        calories: '280',
        time: '8:00 AM'
      }, 
      time: '8:00 AM', 
      date: '2024-01-15' 
    },
    { 
      id: 5, 
      type: 'glucose', 
      data: { 
        glucose: '89', 
        context: 'fasting', 
        notes: '',
        time: '7:00 AM'
      }, 
      time: '7:00 AM', 
      date: '2024-01-15' 
    }
  ]);
  const [useDemoData, setUseDemoData] = useState(!isSupabaseConfigured);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError, setLogsError] = useState<string | null>(null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium' as const,
    contrast: 'normal' as const,
    theme: 'light' as const,
    colorBlindFriendly: false,
    voiceNavigation: false,
    screenReader: false,
    soundEffects: true,
    backgroundSounds: false,
    reducedMotion: false,
    simplifiedInterface: false,
    largeButtons: false,
    voiceInstructions: false,
    language: 'en',
    readingLevel: 'standard' as const
  });

  // Initialize app
  useEffect(() => {
    initializeApp();
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
      if (!user) {
        setShowAuthModal(true);
      }
    });

    return unsubscribe;
  }, []);

  // Fetch logs from Supabase when not using demo data and user is real
  useEffect(() => {
    const shouldFetch = user && user.id !== 'guest' && !useDemoData;
    if (!shouldFetch) return;
    setLogsLoading(true);
    setLogsError(null);
    fetchUserLogs(user.id)
      .then(setAllLogs)
      .catch(err => {
        setLogsError('Failed to load logs. Please try again.');
        setAllLogs([]);
      })
      .finally(() => setLogsLoading(false));
  }, [user, useDemoData]);

  const initializeApp = async () => {
    try {
      // Initialize RevenueCat
      const revenueCatApiKey = import.meta.env.VITE_REVENUECAT_API_KEY;
      if (revenueCatApiKey) {
        await revenueCatService.initialize(revenueCatApiKey);
      } else {
        // Use web fallback
        await revenueCatService.initializeWeb();
      }

      // Check for existing user session
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      
      if (!currentUser) {
        setShowAuthModal(true);
      }
    } catch (error) {
      console.error('App initialization error:', error);
      setShowAuthModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDataLogged = (newLog: any) => {
    setAllLogs(prev => [newLog, ...prev]);
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setUser(user);
    setShowAuthModal(false);
    
    // Show onboarding survey for new users (not guests)
    if (user.id !== 'guest' && !surveyCompleted) {
      setShowOnboardingSurvey(true);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setShowAuthModal(true);
    setSurveyCompleted(false);
  };

  const handleSubscriptionSuccess = () => {
    // Refresh user data to get updated premium status
    authService.getCurrentUser().then(setUser);
  };

  const handleUpgradeClick = () => {
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
    } else {
      setShowSubscriptionModal(true);
    }
  };

  const handleGuestAccess = () => {
    // Create a temporary guest user
    const guestUser: AuthUser = {
      id: 'guest',
      email: 'guest@auroraflow.com',
      firstName: 'Guest',
      lastName: 'User',
      isPremium: false,
      createdAt: new Date().toISOString()
    };
    setUser(guestUser);
    setShowAuthModal(false);
  };

  const handleSurveyComplete = (surveyData: any) => {
    console.log('Survey completed:', surveyData);
    setSurveyCompleted(true);
    setShowOnboardingSurvey(false);
    
    // Here you would typically save the survey data to your backend
    // For now, we'll just store it locally
    localStorage.setItem('auroraflow_survey_data', JSON.stringify(surveyData));
  };

  const handleAccessibilityUpdate = (newSettings: Partial<typeof accessibilitySettings>) => {
    setAccessibilitySettings(prev => ({ ...prev, ...newSettings }));
    
    // Apply settings immediately
    if (newSettings.language) {
      setLanguage(newSettings.language);
    }
    
    // Save to localStorage
    localStorage.setItem('auroraflow_accessibility', JSON.stringify({ ...accessibilitySettings, ...newSettings }));
  };

  // Load accessibility settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('auroraflow_accessibility');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        setAccessibilitySettings(settings);
        if (settings.language) {
          setLanguage(settings.language);
        }
      } catch (error) {
        console.error('Failed to load accessibility settings:', error);
      }
    }
  }, []);

  const renderActiveTab = () => {
      return (
      <Suspense fallback={<div className="flex justify-center items-center h-full"><span className="text-gray-500">Loading...</span></div>}>
        {activeTab === 'home' && (
          <HomeTab allLogs={allLogs} onDataLogged={handleDataLogged} language={language} useDemoData={useDemoData} />
        )}
        {activeTab === 'tracking' && (
          <TrackingTab onDataLogged={handleDataLogged} useDemoData={useDemoData} />
        )}
        {activeTab === 'community' && <CommunityTab />}
        {activeTab === 'pet' && <PetTab />}
        {activeTab === 'achievements' && <AchievementsTab />}
        {activeTab === 'predictions' && (
          <PredictionsTab language={language} useDemoData={useDemoData} />
        )}
        {activeTab === 'flowsense' && <FlowSenseAI />}
      </Suspense>
    );
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AuroraFlow</h2>
          <p className="text-gray-600">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 dark:text-slate-100 ${accessibilitySettings.fontSize === 'large' ? 'text-lg' : accessibilitySettings.fontSize === 'extra-large' ? 'text-xl' : ''} ${accessibilitySettings.reducedMotion ? 'motion-reduce' : ''}`} data-theme="dark">
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      {/* Premium Subscription Modal */}
      <PremiumSubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscriptionSuccess={handleSubscriptionSuccess}
        currentPlan={user?.isPremium ? 'premium' : 'free'}
      />

      {/* Onboarding Survey */}
      <OnboardingSurvey
        isOpen={showOnboardingSurvey}
        onClose={() => setShowOnboardingSurvey(false)}
        onComplete={handleSurveyComplete}
      />

      {/* Accessibility Settings */}
      <AccessibilitySettingsModal
        isOpen={showAccessibilitySettings}
        onClose={() => setShowAccessibilitySettings(false)}
        settings={accessibilitySettings}
        onUpdateSettings={handleAccessibilityUpdate}
      />

      {/* Guest Access Prompt */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">Welcome to AuroraFlow</h2>
              <p className="text-gray-600 mb-6 text-center">
                Your AI-powered diabetes management companion. Sign up for the full experience or continue as a guest.
              </p>
              <div className="space-y-3">
                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  onClick={() => {
                    setAuthMode('signup');
                    // Keep modal open to show auth form
                  }}
                >
                  Create Account
                </button>
                <button
                  className="w-full py-3 px-4 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setAuthMode('signin');
                    // Keep modal open to show auth form
                  }}
                >
                  Sign In
                </button>
                <button
                  className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  onClick={handleGuestAccess}
                >
                  Continue as Guest
                </button>
              </div>
              
              {/* Accessibility Settings Access */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAccessibilitySettings(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Accessibility Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main App */}
      {user && (
        <>
          {/* Header */}
          <ImprovedHeader 
            user={user}
            currentGlucose={94}
            isConnected={true}
            language={language}
            onLanguageChange={setLanguage}
            onSignOut={handleSignOut}
            onUpgradeClick={handleUpgradeClick}
          />
          
          <div className="flex">
            {/* Desktop Sidebar Navigation */}
            <Sidebar 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              language={language}
            />
            
            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
              <div className="max-w-6xl mx-auto">
                {renderActiveTab()}
              </div>
            </main>
          </div>

          {/* Mobile Bottom Navigation */}
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Demo Data Toggle (for development) */}
          {user.id === 'guest' && (
            <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 lg:bottom-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useDemoData}
                  onChange={e => setUseDemoData(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">Demo Mode</span>
              </label>
            </div>
          )}

          {/* Floating Accessibility Button */}
          <button
            onClick={() => setShowAccessibilitySettings(true)}
            className="fixed bottom-4 left-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-40"
            title="Accessibility Settings"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default App;