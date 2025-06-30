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
  Leaf,
  Trophy,
  Clock,
  Bell,
  X
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
  userLevel = 12,
  currentXP = 2450,
  nextLevelXP = 4000,
  streaks = {
    glucose: 7,
    hydration: 5,
    mood: 3,
    meals: 7,
    exercise: 4,
    journal: 2
  },
  companion = {
    type: 'pet',
    name: 'Aurora',
    mood: 'happy',
    level: 8,
    accessories: ['collar', 'bandana']
  },
  userPreferences = {
    engagementMode: 'guided',
    theme: 'nature',
    soundscape: false,
    voiceNavigation: false
  },
  onModeChange = () => {}
}) => {
  const [showRewards, setShowRewards] = useState(false);
  const [showCompanion, setShowCompanion] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [showQuestDetails, setShowQuestDetails] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');

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
      poetry: 'Like the sun greeting the dawn, you greet your day with awareness.',
      reward: 'Companion happiness +5%'
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
      poetry: 'Each drop is a gift to your cells, a whisper of care to your being.',
      reward: 'Health score +2 points'
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
      poetry: 'Colors on your plate, like notes in a song, creating wellness.',
      reward: 'Unlock "Nutrition Master" badge'
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
      poetry: 'Step by step, you walk toward wellness under the gentle evening sky.',
      reward: 'Glucose stability +10%'
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
      poetry: 'In the mirror of your heart, see yourself with compassion.',
      reward: 'Stress reduction bonus'
    }
  ];

  // Weekly Challenges
  const weeklyChallenges = [
    {
      id: 'consistent-logger',
      title: 'Consistent Logger',
      description: 'Log all meals for 5 days this week',
      icon: Calendar,
      progress: 3,
      total: 5,
      completed: false,
      xp: 200,
      difficulty: 'medium',
      reward: 'Premium theme unlock'
    },
    {
      id: 'glucose-guardian',
      title: 'Glucose Guardian',
      description: 'Maintain 80% time in range for 3 days',
      icon: Target,
      progress: 2,
      total: 3,
      completed: false,
      xp: 250,
      difficulty: 'hard',
      reward: 'Special companion accessory'
    },
    {
      id: 'movement-master',
      title: 'Movement Master',
      description: 'Complete 4 exercise sessions this week',
      icon: Activity,
      progress: 1,
      total: 4,
      completed: false,
      xp: 180,
      difficulty: 'medium',
      reward: 'Health score boost +5'
    },
    {
      id: 'hydration-streak',
      title: 'Hydration Streak',
      description: 'Log 6+ water glasses for 4 days',
      icon: Droplets,
      progress: 2,
      total: 4,
      completed: false,
      xp: 150,
      difficulty: 'easy',
      reward: '150 companion coins'
    }
  ];

  // Monthly Challenges
  const monthlyChallenges = [
    {
      id: 'glucose-master',
      title: 'Glucose Master',
      description: 'Achieve 85%+ time in range for 2 weeks',
      icon: Award,
      progress: 8,
      total: 14,
      completed: false,
      xp: 500,
      difficulty: 'expert',
      reward: 'Exclusive "Glucose Master" badge'
    },
    {
      id: 'consistent-champion',
      title: 'Consistency Champion',
      description: 'Log all health metrics for 21 days',
      icon: Trophy,
      progress: 15,
      total: 21,
      completed: false,
      xp: 450,
      difficulty: 'hard',
      reward: 'Special companion evolution'
    },
    {
      id: 'wellness-warrior',
      title: 'Wellness Warrior',
      description: 'Complete 12 exercise sessions this month',
      icon: Shield,
      progress: 7,
      total: 12,
      completed: false,
      xp: 400,
      difficulty: 'medium',
      reward: 'Premium theme pack'
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
      story: 'You planted the first seeds in your wellness garden.',
      date: '2024-01-07'
    },
    {
      id: 'water-warrior',
      title: '7-Day Water Warrior',
      description: 'A week of mindful hydration',
      icon: Waves,
      earned: true,
      rarity: 'silver',
      story: 'Like a river flowing steadily, you nourished your body.',
      date: '2024-01-14'
    },
    {
      id: 'spike-free',
      title: 'Steady Stream',
      description: 'First week without a glucose spike',
      icon: Target,
      earned: false,
      rarity: 'gold',
      story: 'Your glucose flows like a peaceful stream, steady and calm.',
      progress: 65
    },
    {
      id: 'caregiver-connect',
      title: 'Circle of Care',
      description: 'First shared log with your care circle',
      icon: Users,
      earned: false,
      rarity: 'platinum',
      story: 'You opened your heart to let others walk beside you.',
      progress: 0
    },
    {
      id: 'comeback-champion',
      title: 'Phoenix Rising',
      description: 'Restarted your journey after a difficult day',
      icon: Sparkles,
      earned: true,
      rarity: 'special',
      story: 'From the ashes of yesterday, you rise with renewed hope.',
      date: '2024-01-10'
    }
  ];

  // Team challenges
  const teamChallenges = [
    {
      id: 'community-support',
      title: 'Community Support',
      description: 'Team goal: Provide support to 20 community members',
      icon: Users,
      progress: 12,
      total: 20,
      members: ['Sarah J.', 'Michael T.', 'Emma L.', 'You'],
      yourContribution: 3,
      reward: 'Group badge + 300 XP',
      endDate: '2024-02-15'
    },
    {
      id: 'step-challenge',
      title: 'Step Challenge',
      description: 'Team goal: Reach 100,000 combined steps',
      icon: Activity,
      progress: 67500,
      total: 100000,
      members: ['David K.', 'Lisa M.', 'You', 'John S.'],
      yourContribution: 15000,
      reward: 'Special team theme + 400 XP',
      endDate: '2024-02-20'
    }
  ];

  // Rewards
  const availableRewards = [
    {
      id: 'theme-forest',
      title: 'Forest Theme',
      description: 'Calming forest visuals and sounds',
      icon: TreePine,
      cost: 500,
      type: 'theme'
    },
    {
      id: 'pet-outfit',
      title: 'Winter Outfit',
      description: 'Cozy winter outfit for your companion',
      icon: Gift,
      cost: 750,
      type: 'companion'
    },
    {
      id: 'meditation',
      title: 'Guided Meditation',
      description: 'Unlock a special stress-relief meditation',
      icon: Moon,
      cost: 1000,
      type: 'wellness'
    }
  ];

  // Get active challenges based on tab
  const getActiveChallenges = () => {
    switch (activeTab) {
      case 'daily':
        return dailyQuests;
      case 'weekly':
        return weeklyChallenges;
      case 'monthly':
        return monthlyChallenges;
      case 'team':
        return teamChallenges;
      default:
        return dailyQuests;
    }
  };

  // Calculate XP percentage
  const xpPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <div className="space-y-8 pb-20">
      {/* Explanation Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-start space-x-4">
          <div className="bg-purple-600 p-3 rounded-xl">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">HealthQuest: Your Wellness Journey</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to HealthQuest, where managing your diabetes becomes an engaging journey! Complete daily quests, 
              weekly challenges, and monthly goals to earn XP, level up, and unlock special rewards. Your consistent 
              health tracking transforms into achievements, making your wellness routine more enjoyable and motivating.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <strong className="text-purple-700">Daily Quests:</strong> Simple, achievable health tasks that build consistent habits.
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <strong className="text-purple-700">Challenges:</strong> Weekly and monthly goals that improve your overall health metrics.
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <strong className="text-purple-700">Rewards:</strong> Earn XP, badges, and special features as you progress on your health journey.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Level {userLevel}</h3>
            <p className="text-sm text-gray-500">{currentXP} / {nextLevelXP} XP to next level</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full">
            <span className="text-sm font-bold">{Math.round(nextLevelXP - currentXP)} XP to go</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-bold text-gray-900">{Math.round(xpPercentage)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-lg mb-2">
              <Calendar className="h-5 w-5 text-purple-600 mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-900">{Object.values(streaks).reduce((a, b) => a + b, 0)} days</p>
            <p className="text-xs text-gray-500">Total Streaks</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-lg mb-2">
              <Award className="h-5 w-5 text-blue-600 mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-900">{achievements.filter(a => a.earned).length}</p>
            <p className="text-xs text-gray-500">Achievements</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-lg mb-2">
              <Zap className="h-5 w-5 text-green-600 mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-900">{currentXP}</p>
            <p className="text-xs text-gray-500">Total XP</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(streaks).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              {key === 'glucose' && <Droplets className="h-3 w-3 text-blue-500" />}
              {key === 'hydration' && <Droplets className="h-3 w-3 text-cyan-500" />}
              {key === 'mood' && <Smile className="h-3 w-3 text-yellow-500" />}
              {key === 'meals' && <Utensils className="h-3 w-3 text-orange-500" />}
              {key === 'exercise' && <Activity className="h-3 w-3 text-green-500" />}
              {key === 'journal' && <Book className="h-3 w-3 text-purple-500" />}
              <span className="text-xs font-medium text-gray-700 capitalize">{key}: {value} days</span>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('daily')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'daily' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Daily Quests
          </button>
          <button 
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'weekly' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'monthly' ? 'bg-green-50 text-green-700 border-b-2 border-green-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'team' ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Team
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {getActiveChallenges().map((quest) => (
              <div 
                key={quest.id} 
                className={`border rounded-lg p-3 transition-all duration-200 ${
                  quest.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => {
                  setSelectedQuest(quest.id);
                  setShowQuestDetails(true);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      quest.completed ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      <quest.icon className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{quest.title}</h4>
                      <p className="text-xs text-gray-600">{quest.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{quest.progress}/{quest.total}</div>
                      <div className="text-xs font-medium text-purple-600">+{quest.xp} XP</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${quest.completed ? 'bg-green-500' : 'bg-purple-500'} transition-all duration-500`}
                    style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {activeTab === 'daily' && (
            <button 
              onClick={() => setShowChallengeModal(true)}
              className="mt-4 w-full flex items-center justify-center space-x-2 py-2 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Custom Quest</span>
            </button>
          )}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
          <button 
            onClick={() => setShowRewards(true)}
            className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {achievements.slice(0, 3).map((achievement) => (
            <div 
              key={achievement.id} 
              className={`border rounded-lg p-3 ${
                achievement.earned ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg w-fit mb-2 ${
                achievement.earned 
                  ? achievement.rarity === 'bronze' ? 'bg-amber-500' 
                  : achievement.rarity === 'silver' ? 'bg-gray-400' 
                  : achievement.rarity === 'gold' ? 'bg-yellow-500'
                  : achievement.rarity === 'platinum' ? 'bg-blue-500'
                  : 'bg-purple-500'
                  : 'bg-gray-300'
              }`}>
                <achievement.icon className={`h-5 w-5 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
              {achievement.earned ? (
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Trophy className="h-3 w-3" />
                  <span className="text-xs font-bold">Earned {achievement.date}</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-bold text-gray-600">{achievement.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-400 transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Shop */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Rewards Shop</h3>
          <div className="bg-purple-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-purple-700">{currentXP} XP Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {availableRewards.map((reward) => (
            <div key={reward.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-all">
              <div className={`p-2 rounded-lg w-fit mb-2 ${
                reward.type === 'theme' ? 'bg-blue-100' 
                : reward.type === 'companion' ? 'bg-green-100'
                : 'bg-purple-100'
              }`}>
                <reward.icon className={`h-5 w-5 ${
                  reward.type === 'theme' ? 'text-blue-600' 
                  : reward.type === 'companion' ? 'text-green-600'
                  : 'text-purple-600'
                }`} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{reward.title}</h4>
              <p className="text-xs text-gray-600 mb-3">{reward.description}</p>
              <button 
                onClick={() => setShowRewardModal(true)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                  currentXP >= reward.cost 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={currentXP < reward.cost}
              >
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{reward.cost} XP</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quest Details Modal */}
      {showQuestDetails && selectedQuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              {(() => {
                const quest = [...dailyQuests, ...weeklyChallenges, ...monthlyChallenges, ...teamChallenges]
                  .find(q => q.id === selectedQuest);
                
                if (!quest) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-lg bg-purple-100">
                          <quest.icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{quest.title}</h3>
                          <p className="text-sm text-gray-600">{quest.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowQuestDetails(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-bold text-gray-900">{quest.progress}/{quest.total}</span>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 transition-all duration-500"
                            style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {'poetry' in quest && (
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <p className="text-sm text-purple-800 italic">"{quest.poetry}"</p>
                        </div>
                      )}
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">Reward</h4>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-blue-800">+{quest.xp} XP</span>
                        </div>
                        {'reward' in quest && (
                          <div className="flex items-center space-x-2 mt-1">
                            <Gift className="h-4 w-4 text-purple-500" />
                            <span className="text-sm text-blue-800">{quest.reward}</span>
                          </div>
                        )}
                      </div>
                      
                      {'difficulty' in quest && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Difficulty:</span>
                          <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                            quest.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            quest.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            quest.difficulty === 'hard' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                          </span>
                        </div>
                      )}
                      
                      {'endDate' in quest && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Ends on {quest.endDate}</span>
                        </div>
                      )}
                      
                      {'members' in quest && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Team Members</h4>
                          <div className="space-y-2">
                            {quest.members.map((member, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">{member}</span>
                                {member === 'You' && (
                                  <span className="text-xs font-medium text-purple-600">
                                    Your contribution: {quest.yourContribution}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowQuestDetails(false)}
                          className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Close
                        </button>
                        {!quest.completed && (
                          <button
                            className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Start Quest
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Challenge Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create Custom Quest</h3>
                <button 
                  onClick={() => setShowChallengeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quest Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Morning Meditation"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your quest..."
                    rows={2}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Glucose</option>
                      <option>Meals</option>
                      <option>Exercise</option>
                      <option>Hydration</option>
                      <option>Sleep</option>
                      <option>Mindfulness</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., 5"
                      min="1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowChallengeModal(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowChallengeModal(false);
                      // Here you would normally save the new challenge
                    }}
                    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Create Quest
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reward Claim Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Claim Reward</h3>
                <button 
                  onClick={() => setShowRewardModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Gift className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Forest Theme</h4>
                <p className="text-sm text-gray-600">Calming forest visuals and sounds for your app experience</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <h5 className="text-sm font-medium text-yellow-800">Cost: 500 XP</h5>
                </div>
                <p className="text-xs text-yellow-700">You have {currentXP} XP available</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowRewardModal(false);
                    // Here you would normally process the reward claim
                  }}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  Claim Reward
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthQuest;