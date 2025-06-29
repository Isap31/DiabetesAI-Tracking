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
import './index.css';

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
  const [allLogs, setAllLogs] = useState<any[]>([
    { 
      id: '1', 
      type: 'meal', 
      data: { 
        mealName: 'Breakfast', 
        carbs: '45', 
        calories: '320',
        time: '8:00 AM'
      }, 
      time: '8:00 AM', 
      date: '2024-01-15' 
    },
    { 
      id: '2', 
      type: 'exercise', 
      data: { 
        exerciseType: 'walking', 
        duration: '30', 
        intensity: 'moderate',
        time: '6:00 PM'
      }, 
      time: '6:00 PM', 
      date: '2024-01-15' 
    },
    { 
      id: '3', 
      type: 'glucose', 
      data: { 
        glucose: '120', 
        context: 'post-meal', 
        notes: 'After breakfast',
        time: '9:30 AM'
      }, 
      time: '9:30 AM', 
      date: '2024-01-15' 
    },
    { 
      id: '4', 
      type: 'meal', 
      data: { 
        mealName: 'Lunch', 
        carbs: '60', 
        calories: '450',
        time: '12:30 PM'
      }, 
      time: '12:30 PM', 
      date: '2024-01-15' 
    },
    { 
      id: '5', 
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
    fontSize: 'medium' as 'small' | 'medium' | 'large' | 'extra-large',
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setShowSubscriptionModal(true);
  };

  const handleGuestAccess = () => {
    const guestUser: AuthUser = {
      id: 'guest',
      email: 'guest@example.com',
      firstName: 'Guest',
      lastName: 'User',
      isPremium: false,
      createdAt: new Date().toISOString()
    };
    setUser(guestUser);
    setShowAuthModal(false);
    setUseDemoData(true);
  };

  const handleSurveyComplete = (surveyData: any) => {
    setSurveyCompleted(true);
    setShowOnboardingSurvey(false);
    console.log('Survey completed:', surveyData);
  };

  const handleAccessibilityUpdate = (newSettings: Partial<typeof accessibilitySettings>) => {
    setAccessibilitySettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const renderActiveTab = () => {
    const commonProps = {
      user,
      allLogs,
      onDataLogged: handleDataLogged,
      language,
      useDemoData,
      logsLoading,
      logsError
    };

    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'tracking':
        return <TrackingTab {...commonProps} />;
      case 'community':
        return <CommunityTab {...commonProps} />;
      case 'pet':
        return <PetTab {...commonProps} />;
      case 'achievements':
        return <AchievementsTab {...commonProps} />;
      case 'predictions':
        return <PredictionsTab {...commonProps} />;
      case 'flowsense':
        return <FlowSenseAI {...commonProps} />;
      default:
        return <HomeTab />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white mb-2">Loading DiabetesAI</h2>
          <p className="text-white/60">Initializing your health dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <ImprovedHeader 
        user={user}
        language={language}
        onLanguageChange={handleLanguageChange}
        onSignOut={handleSignOut}
        onUpgradeClick={handleUpgradeClick}
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isMenuOpen}
      />
      
      <div className="flex pt-16">
        <Sidebar 
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
        />
        
        <main className="flex-1 lg:ml-64">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            {renderActiveTab()}
          </Suspense>
        </main>
      </div>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onModeChange={setAuthMode}
          onSuccess={handleAuthSuccess}
          onGuestAccess={handleGuestAccess}
          language={language}
        />
      )}

      {showSubscriptionModal && (
        <PremiumSubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSuccess={handleSubscriptionSuccess}
          language={language}
        />
      )}

      {showOnboardingSurvey && (
        <OnboardingSurvey
          onComplete={handleSurveyComplete}
          language={language}
        />
      )}

      {showAccessibilitySettings && (
        <AccessibilitySettingsModal
          settings={accessibilitySettings}
          onUpdate={handleAccessibilityUpdate}
          onClose={() => setShowAccessibilitySettings(false)}
          language={language}
        />
      )}
    </div>
  );
}

export default App;