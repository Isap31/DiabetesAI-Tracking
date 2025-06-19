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
        caring: '🐕💖'
      },
      plant: {
        happy: '🌱✨',
        content: '🌱😊',
        sleepy: '🌱😴',
        excited: '🌱🎉',
        caring: '🌱💖'
      },
      character: {
        happy: '🧑‍⚕️✨',
        content: '🧑‍⚕️😌',
        sleepy: '🧑‍⚕️😴',
        excited: '🧑‍⚕️🎉',
        caring: '🧑‍⚕️💖'
      }
    };
    return emojis[companion.type][companion.mood];
  };

  const getCompanionMessage = () => {
    switch (companion.mood) {
      case 'happy':
        return `${companion.name} is beaming with joy!`;
      case 'content':
        return `${companion.name} feels calm and cared for.`;
      case 'sleepy':
        return `${companion.name} is resting peacefully.`;
      case 'excited':
        return `${companion.name} is excited for your next healthy step!`;
      case 'caring':
        return `${companion.name} is sending you positive vibes!`;
      default:
        return `${companion.name} is here for you.`;
    }
  };

  const getThemeClasses = () => {
    switch (userPreferences.theme) {
      case 'nature':
        return 'bg-green-50 text-green-900';
      case 'bold':
        return 'bg-purple-50 text-purple-900';
      case 'large-text':
        return 'text-lg';
      case 'high-contrast':
        return 'bg-black text-white';
      default:
        return '';
    }
  };

  return (
    <div className={`rounded-xl p-6 shadow-lg ${getThemeClasses()}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Award className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">HealthQuest</h2>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setShowRewards(!showRewards)}
        >
          {showRewards ? 'Hide Rewards' : 'Show Rewards'}
        </button>
      </div>
      {/* ...rest of the component... */}
    </div>
  );
};

export default HealthQuest; 