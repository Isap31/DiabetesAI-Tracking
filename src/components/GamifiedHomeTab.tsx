import React, { useState } from 'react';
import {
  Heart,
  Star,
  Target,
  Activity,
  Droplets,
  Utensils,
  User,
  Calendar,
  Trophy,
  Book,
  Smile,
  Frown,
  Meh,
  Sun,
  Moon,
  Cloud,
  Flower,
  Leaf,
  Settings,
  Eye,
  Volume2,
  Users,
  MessageCircle,
  Plus,
  ChevronRight,
  Zap,
  Gift,
  Award,
  Crown,
  Shield,
  Mic
} from 'lucide-react';
import HealthQuest from './HealthQuest';
import AuroraJournal from './AuroraJournal';
import CareCircle from './CareCircle';
import CompassionMode from './CompassionMode';
import AccessibilityHub from './AccessibilityHub';

const GamifiedHomeTab = () => {
  // User state
  const [userLevel, setUserLevel] = useState(12);
  const [currentXP, setCurrentXP] = useState(2450);
  const [nextLevelXP, setNextLevelXP] = useState(4000);
  const [userMood, setUserMood] = useState<'joyful' | 'content' | 'neutral' | 'challenging' | 'difficult'>('content');
  
  // Feature visibility states
  const [showCompassionMode, setShowCompassionMode] = useState(false);
  const [showAccessibilityHub, setShowAccessibilityHub] = useState(false);
  const [activeTab, setActiveTab] = useState<'quest' | 'journal' | 'circle'>('quest');
  
  // User preferences
  const [userPreferences, setUserPreferences] = useState({
    engagementMode: 'guided' as 'simple' | 'guided' | 'insight',
    theme: 'nature' as 'nature' | 'bold' | 'large-text' | 'high-contrast',
    soundscape: false,
    voiceNavigation: false
  });
  
  // Accessibility settings
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium' as 'small' | 'medium' | 'large' | 'extra-large',
    contrast: 'normal' as 'normal' | 'high' | 'extra-high',
    theme: 'light' as 'light' | 'dark' | 'auto',
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
    readingLevel: 'standard' as 'simple' | 'standard' | 'detailed'
  });

  // Streaks data
  const streaks = {
    glucose: 12,
    hydration: 8,
    mood: 5,
    meals: 14,
    exercise: 7,
    journal: 3
  };

  // Virtual companion data
  const companion = {
    type: 'pet' as 'pet' | 'plant' | 'character',
    name: 'Aurora',
    mood: 'happy' as 'happy' | 'content' | 'sleepy' | 'excited' | 'caring',
    level: 8,
    accessories: ['Blue Collar', 'Star Tag']
  };

  // Journal entries
  const [journalEntries, setJournalEntries] = useState([
    {
      id: '1',
      date: '2024-01-15',
      time: '8:30 PM',
      mood: 'content' as 'joyful' | 'content' | 'neutral' | 'challenging' | 'difficult',
      energy: 4,
      gratitude: ['My morning walk', 'A delicious low-carb breakfast', 'My supportive family'],
      reflection: 'Today was a balanced day. I managed to keep my glucose levels steady and enjoyed a nice walk in the morning sunshine. I felt proud when I chose a healthier lunch option.',
      glucoseNote: 'Stayed in range most of the day (80-130 mg/dL). The morning walk really helped!',
      weatherIcon: 'sun' as 'sun' | 'cloud' | 'moon' | 'star',
      tags: ['exercise', 'good-day', 'in-range']
    }
  ]);

  // Care circle members
  const careMembers = [
    {
      id: 'member1',
      name: 'Michael',
      relationship: 'spouse' as 'spouse' | 'child' | 'parent' | 'sibling' | 'friend' | 'caregiver' | 'healthcare',
      avatar: 'MS',
      permissions: {
        viewGlucose: true,
        viewMeals: true,
        viewExercise: true,
        viewMood: false,
        receiveAlerts: true,
        sendEncouragement: true
      },
      joinedDate: '2023-12-01',
      lastActive: 'Today',
      supportGiven: 24,
      challengesCompleted: 3
    },
    {
      id: 'member2',
      name: 'Dr. Lisa',
      relationship: 'healthcare' as 'spouse' | 'child' | 'parent' | 'sibling' | 'friend' | 'caregiver' | 'healthcare',
      avatar: 'DL',
      permissions: {
        viewGlucose: true,
        viewMeals: true,
        viewExercise: true,
        viewMood: true,
        receiveAlerts: true,
        sendEncouragement: true
      },
      joinedDate: '2023-11-15',
      lastActive: 'Yesterday',
      supportGiven: 18,
      challengesCompleted: 0
    }
  ];

  // Team challenges
  const teamChallenges = [
    {
      id: 'challenge1',
      title: 'Family Steps Challenge',
      description: 'Reach 30,000 combined steps this week',
      type: 'steps' as 'steps' | 'hydration' | 'meals' | 'support',
      icon: Activity,
      duration: '7 days',
      participants: ['user', 'member1'],
      progress: { user: 12000, member1: 10000 },
      target: 15000,
      reward: 'Family Movie Night',
      startDate: '2024-01-10',
      endDate: '2024-01-17',
      completed: false
    },
    {
      id: 'challenge2',
      title: 'Hydration Heroes',
      description: 'Drink 48 glasses of water together',
      type: 'hydration' as 'steps' | 'hydration' | 'meals' | 'support',
      icon: Droplets,
      duration: '3 days',
      participants: ['user', 'member1'],
      progress: { user: 8, member1: 6 },
      target: 8,
      reward: '200 Health Points',
      startDate: '2024-01-14',
      endDate: '2024-01-17',
      completed: false
    }
  ];

  // Privacy settings
  const privacySettings = {
    shareGlucose: true,
    shareMeals: true,
    shareExercise: true,
    shareMood: false,
    allowEncouragement: true,
    emergencyContacts: ['member1', 'member2']
  };

  // Handler functions
  const handleAddJournalEntry = (entry: any) => {
    const newEntry = {
      id: Date.now().toString(),
      ...entry
    };
    setJournalEntries([newEntry, ...journalEntries]);
    
    // Award XP for journaling
    awardXP(60, 'Reflection completed');
  };

  const handleUpdateAccessibility = (newSettings: any) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      ...newSettings
    });
  };

  const handleUpdatePrivacy = (newSettings: any) => {
    // Update privacy settings
    console.log('Privacy settings updated:', newSettings);
  };

  const handleInviteMember = (email: string, relationship: string) => {
    // Invite new care circle member
    console.log('Inviting new member:', email, relationship);
  };

  const handleJoinChallenge = (challengeId: string) => {
    // Join a team challenge
    console.log('Joining challenge:', challengeId);
  };

  const handleModeChange = (mode: 'simple' | 'guided' | 'insight') => {
    setUserPreferences({
      ...userPreferences,
      engagementMode: mode
    });
  };

  const awardXP = (amount: number, reason: string) => {
    const newXP = currentXP + amount;
    
    // Check for level up
    if (newXP >= nextLevelXP) {
      setUserLevel(userLevel + 1);
      setCurrentXP(newXP - nextLevelXP);
      setNextLevelXP(nextLevelXP + 1000); // Increase XP needed for next level
      
      // Show level up celebration (could be implemented)
      console.log(`Level up! Now level ${userLevel + 1}`);
    } else {
      setCurrentXP(newXP);
    }
    
    // Show XP gain notification (could be implemented)
    console.log(`+${amount} XP: ${reason}`);
  };

  // Determine which tab content to show
  const renderTabContent = () => {
    switch (activeTab) {
      case 'quest':
        return (
          <HealthQuest
            userLevel={userLevel}
            currentXP={currentXP}
            nextLevelXP={nextLevelXP}
            streaks={streaks}
            companion={companion}
            userPreferences={userPreferences}
            onModeChange={handleModeChange}
          />
        );
      case 'journal':
        return (
          <AuroraJournal
            entries={journalEntries}
            onAddEntry={handleAddJournalEntry}
            soundscapeEnabled={userPreferences.soundscape}
            onToggleSoundscape={() => setUserPreferences({
              ...userPreferences,
              soundscape: !userPreferences.soundscape
            })}
          />
        );
      case 'circle':
        return (
          <CareCircle
            members={careMembers}
            challenges={teamChallenges}
            userPrivacySettings={privacySettings}
            onUpdatePrivacy={handleUpdatePrivacy}
            onInviteMember={handleInviteMember}
            onJoinChallenge={handleJoinChallenge}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Accessibility Button */}
      <button
        onClick={() => setShowAccessibilityHub(true)}
        className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Accessibility Options"
      >
        <Eye className="h-5 w-5 text-blue-600" />
      </button>
      
      {/* Accessibility Hub Modal */}
      {showAccessibilityHub && (
        <AccessibilityHub
          settings={accessibilitySettings}
          onUpdateSettings={handleUpdateAccessibility}
          onClose={() => setShowAccessibilityHub(false)}
        />
      )}
      
      {/* Compassion Mode */}
      {showCompassionMode && (
        <CompassionMode
          isActive={showCompassionMode}
          onToggle={() => setShowCompassionMode(false)}
          userMood="struggling"
          recentChallenge="Balanced Plate Builder"
        />
      )}
      
      {/* Compassion Mode Toggle Button (only shown when not active) */}
      {!showCompassionMode && (
        <button
          onClick={() => setShowCompassionMode(true)}
          className="fixed bottom-20 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-50"
          aria-label="Activate Compassion Mode"
        >
          <Heart className="h-6 w-6" />
        </button>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        {/* Header with Level */}
        <div className="pt-8 pb-4 text-center">
          <div className="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-md">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Level {userLevel} • {currentXP}/{nextLevelXP} XP</h1>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mood Check-in */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling today?</h2>
          <div className="flex justify-between">
            {[
              { mood: 'joyful', emoji: '😊', label: 'Joyful' },
              { mood: 'content', emoji: '😌', label: 'Content' },
              { mood: 'neutral', emoji: '😐', label: 'Neutral' },
              { mood: 'challenging', emoji: '😔', label: 'Challenging' },
              { mood: 'difficult', emoji: '😢', label: 'Difficult' }
            ].map((item) => (
              <button
                key={item.mood}
                onClick={() => setUserMood(item.mood as any)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  userMood === item.mood
                    ? 'bg-purple-100 ring-2 ring-purple-400'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl mb-1">{item.emoji}</span>
                <span className="text-xs text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Companion Quick View */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-md mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">
              {companion.type === 'pet' ? '🐕' : companion.type === 'plant' ? '🌱' : '👤'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{companion.name}</h2>
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">
                  Level {companion.level}
                </div>
              </div>
              <p className="text-blue-100 text-sm mb-2">
                {companion.mood === 'happy' && "I'm so proud of your progress today!"}
                {companion.mood === 'content' && "You're doing well. Keep it up!"}
                {companion.mood === 'sleepy' && "Let's take it easy today. Rest is important too."}
                {companion.mood === 'excited' && "Wow! You're making amazing progress!"}
                {companion.mood === 'caring' && "I'm here for you, no matter what kind of day you're having."}
              </p>
              <div className="flex space-x-2">
                {companion.accessories.map((accessory, index) => (
                  <span key={index} className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                    {accessory}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-1">
          <div className="flex">
            <button
              onClick={() => setActiveTab('quest')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all ${
                activeTab === 'quest'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span className="font-medium">HealthQuest</span>
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all ${
                activeTab === 'journal'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Book className="h-5 w-5" />
              <span className="font-medium">Journal</span>
            </button>
            <button
              onClick={() => setActiveTab('circle')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all ${
                activeTab === 'circle'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="font-medium">Care Circle</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Quick Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <div className="flex justify-around max-w-md mx-auto">
            <button className="flex flex-col items-center space-y-1">
              <div className="bg-blue-100 p-2 rounded-full">
                <Droplets className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-700">Log Glucose</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <div className="bg-green-100 p-2 rounded-full">
                <Utensils className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-700">Log Meal</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <div className="bg-orange-100 p-2 rounded-full">
                <Activity className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-xs text-gray-700">Log Activity</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <div className="bg-purple-100 p-2 rounded-full">
                <Mic className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs text-gray-700">Voice Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedHomeTab;