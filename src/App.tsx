import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomeTab from './components/HomeTab';
import TrackingTab from './components/TrackingTab';
import PetTab from './components/PetTab';
import CommunityTab from './components/CommunityTab';
import AchievementsTab from './components/AchievementsTab';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'tracking':
        return <TrackingTab />;
      case 'pet':
        return <PetTab />;
      case 'community':
        return <CommunityTab />;
      case 'achievements':
        return <AchievementsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        userName="Sarah"
        currentGlucose={94}
        isConnected={true}
      />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        {/* Main Content */}
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-6xl mx-auto">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;