import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomeTab from './components/HomeTab';
import TrackingTab from './components/TrackingTab';
import CommunityTab from './components/CommunityTab';
import PetTab from './components/PetTab';
import AchievementsTab from './components/AchievementsTab';
import PredictionsTab from './components/PredictionsTab';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('en');
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab allLogs={allLogs} onDataLogged={handleDataLogged} language={language} />;
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
        return <HomeTab allLogs={allLogs} onDataLogged={handleDataLogged} language={language} />;
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
      />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          language={language}
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