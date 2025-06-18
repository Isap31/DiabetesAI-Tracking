import React, { useState, useEffect } from 'react';
import {
  Heart,
  Star,
  Droplets,
  Utensils,
  Activity,
  Moon,
  Sun,
  Flower,
  TreePine,
  Sparkles,
  Award,
  Crown,
  Shield,
  Zap,
  Target,
  Calendar,
  Book,
  Compass,
  MapPin,
  Gift,
  Camera,
  Music,
  Palette,
  Volume2,
  Eye,
  Type,
  Users,
  Lock,
  Unlock,
  ChevronRight,
  Plus,
  Check,
  Smile,
  Frown,
  Meh,
  Coffee,
  Waves,
  Mountain,
  Leaf
} from 'lucide-react';

interface HealthQuestProps {
  userLevel: number;
  currentXP: number;
  nextLevelXP: number;
  streaks: {
    glucose: number;
    hydration: number;
    mood: number;
    meals: number;
    exercise: number;
    journal: number;
  };
  companion: {
    type: 'pet' | 'plant' | 'character';
    name: string;
    mood: 'happy' | 'content' | 'sleepy' | 'excited' | 'caring';
    level: number;
    accessories: string[];
  };
  userPreferences: {
    engagementMode: 'simple' | 'guided' | 'insight';
    theme: 'nature' | 'bold' | 'large-text' | 'high-contrast';
    soundscape: boolean;
    voiceNavigation: boolean;
  };
  onModeChange: (mode: 'simple' | 'guided' | 'insight') => void;
}

const HealthQuest: React.FC<HealthQuestProps> = ({
  userLevel,
  currentXP,
  nextLevelXP,
  streaks,
  companion,
  userPreferences,
  onModeChange
}) => {
  const [showRewards, setShowRewards] = useState(false);
  const [showCompanion, setShowCompanion] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

  // Daily Quests with poetic names and gentle goals
  const dailyQuests = [
    {
      id: 'morning-ritual',
      title: 'Morning Ritual',
      description: 'Begin your day with a gentle glucose check',
      icon: Sun,
      progress: 1,
      total: 1,
      completed: true,
      xp: 50,
      poetry: 'Like the sun greeting the dawn, you greet your day with awareness.'
    },
    {
      id: 'hydration-hero',
      title: 'Hydration Hero',
      description: 'Nourish your body with 6 glasses of water',
      icon: Droplets,
      progress: 4,
      total: 6,
      completed: false,
      xp: 75,
      poetry: 'Each drop is a gift to your cells, a whisper of care to your being.'
    },
    {
      id: 'balanced-plate',
      title: 'Balanced Plate Builder',
      description: 'Create harmony in your next meal',
      icon: Utensils,
      progress: 0,
      total: 1,
      completed: false,
      xp: 100,
      poetry: 'Colors on your plate, like notes in a song, creating wellness.'
    },
    {
      id: 'evening-walker',
      title: 'Evening Walker',
      description: 'Take a peaceful 10-minute stroll after dinner',
      icon: Moon,
      progress: 0,
      total: 1,
      completed: false,
      xp: 80,
      poetry: 'Step by step, you walk toward wellness under the gentle evening sky.'
    },
    {
      id: 'mood-mirror',
      title: 'Mood Mirror',
      description: 'Reflect on your feelings with kindness',
      icon: Heart,
      progress: 0,
      total: 1,
      completed: false,
      xp: 60,
      poetry: 'In the mirror of your heart, see yourself with compassion.'
    }
  ];

  // Achievement Badges with meaningful milestones
  const achievements = [
    {
      id: 'first-week',
      title: 'First Week Warrior',
      description: 'Seven days of gentle consistency',
      icon: Shield,
      earned: true,
      rarity: 'bronze',
      story: 'You planted the first seeds in your wellness garden.'
    },
    {
      id: 'water-warrior',
      title: '7-Day Water Warrior',
      description: 'A week of mindful hydration',
      icon: Waves,
      earned: true,
      rarity: 'silver',
      story: 'Like a river flowing steadily, you nourished your body.'
    },
    {
      id: 'spike-free',
      title: 'Steady Stream',
      description: 'First week without a glucose spike',
      icon: Target,
      earned: false,
      rarity: 'gold',
      story: 'Your glucose flows like a peaceful stream, steady and calm.'
    },
    {
      id: 'caregiver-connect',
      title: 'Circle of Care',
      description: 'First shared log with your care circle',
      icon: Users,
      earned: false,
      rarity: 'platinum',
      story: 'You opened your heart to let others walk beside you.'
    },
    {
      id: 'comeback-champion',
      title: 'Phoenix Rising',
      description: 'Restarted your journey after a difficult day',
      icon: Sparkles,
      earned: true,
      rarity: 'special',
      story: 'From the ashes of yesterday, you rise with renewed hope.'
    }
  ];

  // Companion emotions and responses
  const getCompanionEmoji = () => {
    const emojis = {
      pet: {
        happy: '🐕✨',
        content: '🐕😌',
        sleepy: '🐕😴',
        excited: '🐕🎉',
        caring: '🐕💝'
      },
      plant: {
        happy: '🌱🌟',
        content: '🌿😊',
        sleepy: '🌱💤',
        excited: '🌺🎊',
        caring: '🌸💚'
      },
      character: {
        happy: '👤✨',
        content: '👤😊',
        sleepy: '👤😴',
        excited: '👤🎉',
        caring: '👤💖'
      }
    };
    return emojis[companion.type][companion.mood];
  };

  const getCompanionMessage = () => {
    const messages = {
      happy: "Your consistency fills my heart with joy! You're blooming beautifully.",
      content: "I'm here with you, steady and peaceful. You're doing wonderfully.",
      sleepy: "Rest is part of wellness too. I'll be here when you're ready.",
      excited: "Look at you shine! Your progress makes my spirit dance!",
      caring: "On difficult days, remember: you are loved, you are enough, you matter."
    };
    return messages[companion.mood];
  };

  // Theme configurations
  const getThemeClasses = () => {
    const themes = {
      nature: 'bg-gradient-to-br from-green-50 to-blue-50 text-green-900',
      bold: 'bg-gradient-to-br from-purple-600 to-pink-600 text-white',
      'large-text': 'bg-white text-gray-900 text-xl',
      'high-contrast': 'bg-black text-yellow-400 border-yellow-400'
    };
    return themes[userPreferences.theme] || themes.nature;
  };

  const progressPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <div className={`min-h-screen p-4 transition-all duration-500 ${getThemeClasses()}`}>
      {/* Accessibility Quick Access */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowAccessibility(!showAccessibility)}
          className="bg-white bg-opacity-90 p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Accessibility Options"
        >
          <Eye className="h-5 w-5 text-gray-700" />
        </button>
        
        {showAccessibility && (
          <div className="absolute top-14 right-0 bg-white rounded-lg shadow-xl p-4 w-64 border">
            <h3 className="font-semibold text-gray-900 mb-3">Accessibility & Comfort</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Voice Navigation</span>
                <button className={`w-12 h-6 rounded-full transition-colors ${userPreferences.voiceNavigation ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${userPreferences.voiceNavigation ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Calming Sounds</span>
                <button className={`w-12 h-6 rounded-full transition-colors ${userPreferences.soundscape ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${userPreferences.soundscape ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-gray-700">Engagement Mode</span>
                <div className="grid grid-cols-3 gap-1">
                  {['simple', 'guided', 'insight'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onModeChange(mode as any)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        userPreferences.engagementMode === mode
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Header with Level Progress */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 bg-white bg-opacity-20 rounded-full px-6 py-3 backdrop-blur-sm">
          <Crown className="h-6 w-6 text-yellow-500" />
          <div>
            <h1 className="text-2xl font-bold">Wellness Level {userLevel}</h1>
            <p className="text-sm opacity-80">Your journey of gentle growth</p>
          </div>
        </div>
        
        <div className="mt-4 max-w-md mx-auto">
          <div className="bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm mt-2 opacity-80">
            {currentXP} / {nextLevelXP} XP to your next milestone
          </p>
        </div>
      </div>

      {/* Companion Section */}
      <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Companion: {companion.name}</h2>
          <button
            onClick={() => setShowCompanion(!showCompanion)}
            className="bg-white bg-opacity-30 p-2 rounded-lg hover:bg-opacity-50 transition-all"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-6xl animate-pulse">
            {getCompanionEmoji()}
          </div>
          <div className="flex-1">
            <div className="bg-white bg-opacity-30 rounded-lg p-4">
              <p className="text-sm italic">"{getCompanionMessage()}"</p>
            </div>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-xs opacity-80">Companion Level {companion.level}</span>
              <div className="flex space-x-1">
                {companion.accessories.map((accessory, index) => (
                  <span key={index} className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded">
                    {accessory}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Quests */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Compass className="h-5 w-5 mr-2" />
          Today's Gentle Quests
        </h2>
        
        <div className="grid gap-4">
          {dailyQuests.map((quest) => (
            <div
              key={quest.id}
              className={`bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm transition-all hover:bg-opacity-30 cursor-pointer ${
                quest.completed ? 'ring-2 ring-green-400' : ''
              }`}
              onClick={() => setSelectedQuest(selectedQuest === quest.id ? null : quest.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${quest.completed ? 'bg-green-500' : 'bg-white bg-opacity-30'}`}>
                    <quest.icon className={`h-5 w-5 ${quest.completed ? 'text-white' : ''}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{quest.title}</h3>
                    <p className="text-sm opacity-80">{quest.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{quest.progress}/{quest.total}</span>
                    {quest.completed && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                  <span className="text-xs opacity-80">+{quest.xp} XP</span>
                </div>
              </div>
              
              {selectedQuest === quest.id && (
                <div className="mt-4 pt-4 border-t border-white border-opacity-30">
                  <p className="text-sm italic opacity-90">"{quest.poetry}"</p>
                  <div className="mt-2 bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
                      style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Streak Garden */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Flower className="h-5 w-5 mr-2" />
          Your Wellness Garden
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(streaks).map(([type, days]) => {
            const icons = {
              glucose: { icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100' },
              hydration: { icon: Waves, color: 'text-cyan-500', bg: 'bg-cyan-100' },
              mood: { icon: Heart, color: 'text-pink-500', bg: 'bg-pink-100' },
              meals: { icon: Utensils, color: 'text-green-500', bg: 'bg-green-100' },
              exercise: { icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100' },
              journal: { icon: Book, color: 'text-purple-500', bg: 'bg-purple-100' }
            };
            
            const config = icons[type as keyof typeof icons];
            
            return (
              <div key={type} className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className={`inline-flex p-3 rounded-full ${config.bg} mb-2`}>
                  <config.icon className={`h-6 w-6 ${config.color}`} />
                </div>
                <h3 className="font-medium capitalize">{type}</h3>
                <p className="text-2xl font-bold">{days}</p>
                <p className="text-xs opacity-80">day{days !== 1 ? 's' : ''} blooming</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Gallery */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Your Story of Strength
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm transition-all ${
                achievement.earned ? 'ring-2 ring-yellow-400' : 'opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  achievement.earned ? 'bg-yellow-500' : 'bg-gray-400'
                }`}>
                  <achievement.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium">{achievement.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      achievement.rarity === 'bronze' ? 'bg-orange-200 text-orange-800' :
                      achievement.rarity === 'silver' ? 'bg-gray-200 text-gray-800' :
                      achievement.rarity === 'gold' ? 'bg-yellow-200 text-yellow-800' :
                      achievement.rarity === 'platinum' ? 'bg-purple-200 text-purple-800' :
                      'bg-pink-200 text-pink-800'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm opacity-80 mb-2">{achievement.description}</p>
                  <p className="text-xs italic opacity-90">"{achievement.story}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compassion Mode Toggle */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white text-center">
        <Heart className="h-8 w-8 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Compassion Mode</h3>
        <p className="text-sm opacity-90 mb-4">
          When days feel heavy, let gentleness guide you. You are enough, exactly as you are.
        </p>
        <button className="bg-white bg-opacity-20 px-6 py-2 rounded-full hover:bg-opacity-30 transition-all">
          Activate Gentle Support
        </button>
      </div>
    </div>
  );
};

export default HealthQuest;