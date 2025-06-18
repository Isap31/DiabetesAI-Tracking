import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TabNavigation from './components/TabNavigation';
import GamifiedHomeTab from './components/GamifiedHomeTab';
import TrackingTab from './components/TrackingTab';
import CommunityTab from './components/CommunityTab';
import PetTab from './components/PetTab';
import AchievementsTab from './components/AchievementsTab';
import PredictionsTab from './components/PredictionsTab';
import SubscriptionPlans from './components/SubscriptionPlans';

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
        return <GamifiedHomeTab />;
      case 'tracking':
        return <TrackingTab onDataLogged={handleDataLogged} language={language} />;
      case 'predictions':
        return <PredictionsTab language={language} />;
      case 'community':
        return <CommunityTab language={language} />;
      case 'pet':
        return <PetTab language={language} />;
      case 'achievements':
        return <AchievementsTab language={language} />;
      default:
        return <GamifiedHomeTab />;
    }
  };

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
    </div>
  );
}

export default App;