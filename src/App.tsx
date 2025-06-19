import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TabNavigation from './components/TabNavigation';
import HomeTab from './components/HomeTab';
import TrackingTab from './components/TrackingTab';
import CommunityTab from './components/CommunityTab';
import PetTab from './components/PetTab';
import AchievementsTab from './components/AchievementsTab';
import PredictionsTab from './components/PredictionsTab';
import SubscriptionPlans from './components/SubscriptionPlans';
import FlowSenseAI from './components/FlowSenseAI';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
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
  const [useDemoData, setUseDemoData] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const handleDataLogged = (newLog: any) => {
    setAllLogs(prev => [newLog, ...prev]);
  };

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    setIsPremium(true);
    setShowSubscriptionPlans(false);
    // In a real app, this would handle payment processing
    console.log(`Subscribed to ${plan} plan`);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab allLogs={allLogs} onDataLogged={handleDataLogged} language={language} useDemoData={useDemoData} />;
      case 'tracking':
        return <TrackingTab onDataLogged={handleDataLogged} useDemoData={useDemoData} />;
      case 'predictions':
        return <PredictionsTab language={language} useDemoData={useDemoData} />;
      case 'flowsense':
        return <FlowSenseAI />;
      case 'community':
        return <CommunityTab />;
      case 'pet':
        return <PetTab />;
      case 'achievements':
        return <AchievementsTab />;
      default:
        return <HomeTab allLogs={allLogs} onDataLogged={handleDataLogged} language={language} useDemoData={useDemoData} />;
    }
  };

  useEffect(() => {
    const root = document.getElementById('elevenlabs-widget-root');
    if (!root) return;
    if (isAuthenticated || isGuest) {
      // Inject widget if not already present
      if (!document.getElementById('elevenlabs-convai-widget')) {
        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'agent_01jx7qvt4zez38683ke9ad4eke');
        widget.id = 'elevenlabs-convai-widget';
        root.appendChild(widget);
        // Inject script if not present
        if (!document.getElementById('elevenlabs-convai-script')) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
          script.async = true;
          script.type = 'text/javascript';
          script.id = 'elevenlabs-convai-script';
          document.body.appendChild(script);
        }
      }
    } else {
      // Remove widget if present
      const widget = document.getElementById('elevenlabs-convai-widget');
      if (widget) widget.remove();
    }
  }, [isAuthenticated, isGuest]);

  // Show auth modal if not authenticated or guest
  if (!isAuthenticated && !isGuest) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome to AuroraFlow</h2>
          <p className="text-gray-600 mb-6 text-center">Sign up, log in, or continue as a guest to access AI-powered diabetes insights.</p>
          <div className="space-y-4">
            <button
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => {/* TODO: Implement sign up logic */ alert('Sign up not implemented. Use guest for now.')}}
            >
              Sign Up
            </button>
            <button
              className="w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              onClick={() => {/* TODO: Implement login logic */ alert('Login not implemented. Use guest for now.')}}
            >
              Log In
            </button>
            <button
              className="w-full py-3 px-4 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              onClick={() => setIsGuest(true)}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        userName="Sarah"
        currentGlucose={94}
        isConnected={true}
        language={language}
        onLanguageChange={setLanguage}
        isPremium={isPremium}
        onUpgradeClick={() => setShowSubscriptionPlans(true)}
        onProfileClick={() => setShowProfileModal(true)}
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

      {/* Subscription Plans Modal */}
      {showSubscriptionPlans && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowSubscriptionPlans(false)}></div>
            <div className="relative bg-white w-full max-w-4xl mx-4 rounded-2xl shadow-xl">
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowSubscriptionPlans(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <SubscriptionPlans />
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal with Demo Data Toggle */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="mt-6 border-t pt-6">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={useDemoData}
                  onChange={e => setUseDemoData(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">Use Demo/Placeholder Data (for testing/demo only)</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">When enabled, the app will use demo values for predictions. Disable for real, user-only data.</p>
            </div>
            <div className="flex space-x-3 pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;