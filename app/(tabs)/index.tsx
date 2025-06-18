import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {
  Droplets,
  Target,
  Clock,
  Heart,
  TrendingUp,
  Activity,
  Utensils,
  User,
  Scale,
  Calendar,
  Brain,
  Goal,
  Mic,
  MessageCircle,
  Plus,
  Camera,
  Volume2,
  Bot,
  X,
  Trophy,
  Award,
  Crown,
  Shield,
  Zap,
  Book,
  Flower,
  Leaf,
  Sun,
  Moon,
} from 'lucide-react-native';
import VoiceChat from '../../components/VoiceChat';
import GoalsModal from '../../components/GoalsModal';

export default function HomeTab() {
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [userLevel, setUserLevel] = useState(12);
  const [currentXP, setCurrentXP] = useState(2450);
  const [nextLevelXP, setNextLevelXP] = useState(4000);
  const [userMood, setUserMood] = useState<'joyful' | 'content' | 'neutral' | 'challenging' | 'difficult'>('content');
  const [showCompassionMode, setShowCompassionMode] = useState(false);

  // Virtual companion data
  const companion = {
    type: 'pet',
    name: 'Aurora',
    mood: 'happy',
    level: 8,
    accessories: ['Blue Collar', 'Star Tag']
  };

  // Streaks data
  const streaks = {
    glucose: 12,
    hydration: 8,
    mood: 5,
    meals: 14,
    exercise: 7
  };

  // Daily quests
  const dailyQuests = [
    {
      id: 'morning-ritual',
      title: 'Morning Ritual',
      description: 'Begin your day with a gentle glucose check',
      icon: Sun,
      progress: 1,
      total: 1,
      completed: true,
      xp: 50
    },
    {
      id: 'hydration-hero',
      title: 'Hydration Hero',
      description: 'Nourish your body with 6 glasses of water',
      icon: Droplets,
      progress: 4,
      total: 6,
      completed: false,
      xp: 75
    },
    {
      id: 'balanced-plate',
      title: 'Balanced Plate Builder',
      description: 'Create harmony in your next meal',
      icon: Utensils,
      progress: 0,
      total: 1,
      completed: false,
      xp: 100
    }
  ];

  // Achievement badges
  const achievements = [
    {
      id: 'first-week',
      title: 'First Week Warrior',
      description: 'Seven days of gentle consistency',
      icon: Shield,
      earned: true,
      rarity: 'bronze'
    },
    {
      id: 'water-warrior',
      title: '7-Day Water Warrior',
      description: 'A week of mindful hydration',
      icon: Droplets,
      earned: true,
      rarity: 'silver'
    },
    {
      id: 'spike-free',
      title: 'Steady Stream',
      description: 'First week without a glucose spike',
      icon: Target,
      earned: false,
      rarity: 'gold'
    }
  ];

  const stats = [
    {
      title: 'Current Glucose',
      value: '94',
      unit: 'mg/dL',
      trend: 'stable',
      icon: Droplets,
      color: '#3b82f6',
      details: 'Target: 70-140',
      status: 'In Range',
      lastReading: '2 min ago'
    },
    {
      title: 'Time in Range',
      value: '87',
      unit: '%',
      trend: 'up',
      icon: Target,
      color: '#10b981',
      details: 'Goal: >70%',
      status: 'Excellent',
      lastReading: 'Today'
    },
    {
      title: 'Logging Streak',
      value: '12',
      unit: 'days',
      trend: 'up',
      icon: Clock,
      color: '#f59e0b',
      details: 'Best: 28 days',
      status: 'Active',
      lastReading: 'Current'
    },
    {
      title: 'Health Score',
      value: '8.4',
      unit: '/10',
      trend: 'up',
      icon: Heart,
      color: '#ef4444',
      details: 'Avg: 7.8/10',
      status: 'Great',
      lastReading: 'This week'
    },
  ];

  const recentLogs = [
    {
      id: 1,
      type: 'meal',
      data: {
        mealName: 'Grilled Chicken Salad',
        carbs: '15',
        protein: '35',
        calories: '350',
        alcohol: '0',
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
  ];

  const userProfile = {
    age: 34,
    diabetesType: 'Type 1',
    height: 165,
    weight: 68,
    bmi: 25.0,
    gender: 'female',
    sleepQuality: 7,
    sleepDuration: 7.5
  };

  const quickActions = [
    { 
      icon: Utensils, 
      label: 'Log Meal', 
      sublabel: 'Carbs, Protein & Alcohol',
      color: '#1e293b',
    },
    { 
      icon: Activity, 
      label: 'Exercise', 
      sublabel: 'Type & Duration',
      color: '#1e293b',
    },
    { 
      icon: Droplets, 
      label: 'Glucose', 
      sublabel: 'Current Level',
      color: '#1e293b',
    },
    { 
      icon: Camera, 
      label: 'Scan Food', 
      sublabel: 'Quick Recognition',
      color: '#1e293b',
    }
  ];

  const formatLogDisplay = (log: any) => {
    switch (log.type) {
      case 'meal':
        return `${log.data.mealName} (${log.data.carbs}g carbs, ${log.data.protein}g protein)`;
      case 'exercise':
        return `${log.data.exerciseType} (${log.data.duration} min, ${log.data.intensity})`;
      case 'glucose':
        return `${log.data.glucose} mg/dL (${log.data.context})`;
      default:
        return 'Unknown entry';
    }
  };

  const getSleepQualityText = (quality: number) => {
    if (quality >= 8) return 'Excellent';
    if (quality >= 6) return 'Good';
    if (quality >= 4) return 'Fair';
    return 'Poor';
  };

  // Get companion message based on mood
  const getCompanionMessage = () => {
    const messages = {
      happy: "Your consistency fills my heart with joy! You're blooming beautifully.",
      content: "I'm here with you, steady and peaceful. You're doing wonderfully.",
      sleepy: "Rest is part of wellness too. I'll be here when you're ready.",
      excited: "Look at you shine! Your progress makes my spirit dance!",
      caring: "On difficult days, remember: you are loved, you are enough, you matter."
    };
    return messages[companion.mood as keyof typeof messages];
  };

  // Progress percentage for level
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.appIcon}>
              <Activity size={24} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.appName}>AuroraFlow</Text>
              <Text style={styles.appSubtitle}>AI-Powered Diabetes Management</Text>
            </View>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.levelSection}>
          <View style={styles.levelHeader}>
            <View style={styles.levelIcon}>
              <Crown size={20} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.levelTitle}>Level {userLevel}</Text>
              <Text style={styles.levelSubtitle}>Your wellness journey</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${progressPercentage}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{currentXP} / {nextLevelXP} XP</Text>
          </View>
        </View>

        {/* Mood Check-in */}
        <View style={styles.moodSection}>
          <Text style={styles.sectionTitle}>How are you feeling today?</Text>
          <View style={styles.moodOptions}>
            <TouchableOpacity 
              style={[styles.moodOption, userMood === 'joyful' && styles.moodSelected]}
              onPress={() => setUserMood('joyful')}
            >
              <Text style={styles.moodEmoji}>😊</Text>
              <Text style={styles.moodLabel}>Joyful</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.moodOption, userMood === 'content' && styles.moodSelected]}
              onPress={() => setUserMood('content')}
            >
              <Text style={styles.moodEmoji}>😌</Text>
              <Text style={styles.moodLabel}>Content</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.moodOption, userMood === 'neutral' && styles.moodSelected]}
              onPress={() => setUserMood('neutral')}
            >
              <Text style={styles.moodEmoji}>😐</Text>
              <Text style={styles.moodLabel}>Neutral</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.moodOption, userMood === 'challenging' && styles.moodSelected]}
              onPress={() => setUserMood('challenging')}
            >
              <Text style={styles.moodEmoji}>😔</Text>
              <Text style={styles.moodLabel}>Challenging</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.moodOption, userMood === 'difficult' && styles.moodSelected]}
              onPress={() => setUserMood('difficult')}
            >
              <Text style={styles.moodEmoji}>😢</Text>
              <Text style={styles.moodLabel}>Difficult</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Companion Section */}
        <View style={styles.companionCard}>
          <View style={styles.companionContent}>
            <View style={styles.companionAvatar}>
              <Text style={styles.companionEmoji}>
                {companion.type === 'pet' ? '🐕' : companion.type === 'plant' ? '🌱' : '👤'}
              </Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{companion.level}</Text>
              </View>
            </View>
            <View style={styles.companionInfo}>
              <View style={styles.companionHeader}>
                <Text style={styles.companionName}>{companion.name}</Text>
                <View style={styles.companionMoodBadge}>
                  <Text style={styles.companionMoodText}>{companion.mood}</Text>
                </View>
              </View>
              <Text style={styles.companionMessage}>"{getCompanionMessage()}"</Text>
              <View style={styles.accessoriesContainer}>
                {companion.accessories.map((accessory, index) => (
                  <View key={index} style={styles.accessoryBadge}>
                    <Text style={styles.accessoryText}>{accessory}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Daily Quests */}
        <View style={styles.questsSection}>
          <Text style={styles.sectionTitle}>Today's Gentle Quests</Text>
          <View style={styles.questsList}>
            {dailyQuests.map((quest) => (
              <View key={quest.id} style={[styles.questCard, quest.completed && styles.questCompleted]}>
                <View style={styles.questHeader}>
                  <View style={[styles.questIcon, quest.completed && styles.questIconCompleted]}>
                    <quest.icon size={16} color={quest.completed ? "#ffffff" : "#6b7280"} />
                  </View>
                  <View style={styles.questInfo}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <Text style={styles.questDescription}>{quest.description}</Text>
                  </View>
                  <View style={styles.questProgress}>
                    <Text style={styles.questProgressText}>{quest.progress}/{quest.total}</Text>
                    <Text style={styles.questXP}>+{quest.xp} XP</Text>
                  </View>
                </View>
                <View style={styles.questProgressBar}>
                  <View 
                    style={[styles.questProgressFill, { width: `${(quest.progress / quest.total) * 100}%` }]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Wellness Garden (Streaks) */}
        <View style={styles.gardenSection}>
          <Text style={styles.sectionTitle}>Your Wellness Garden</Text>
          <View style={styles.gardenGrid}>
            {Object.entries(streaks).map(([type, days]) => {
              const icons = {
                glucose: { icon: Droplets, color: "#3b82f6", bg: "#dbeafe" },
                hydration: { icon: Droplets, color: "#06b6d4", bg: "#cffafe" },
                mood: { icon: Heart, color: "#ec4899", bg: "#fce7f3" },
                meals: { icon: Utensils, color: "#10b981", bg: "#d1fae5" },
                exercise: { icon: Activity, color: "#f59e0b", bg: "#fef3c7" }
              };
              
              const config = icons[type as keyof typeof icons];
              
              return (
                <View key={type} style={styles.gardenItem}>
                  <View style={[styles.gardenIcon, { backgroundColor: config.bg }]}>
                    <config.icon size={20} color={config.color} />
                  </View>
                  <Text style={styles.gardenValue}>{days}</Text>
                  <Text style={styles.gardenLabel}>{type}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Your Story of Strength</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={[styles.achievementCard, achievement.earned && styles.achievementEarned]}>
                <View style={styles.achievementHeader}>
                  <View style={[styles.achievementIcon, achievement.earned ? styles.achievementIconEarned : {}]}>
                    <achievement.icon size={16} color={achievement.earned ? "#ffffff" : "#6b7280"} />
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </View>
                  <View style={[styles.rarityBadge, 
                    achievement.rarity === 'bronze' && styles.bronzeBadge,
                    achievement.rarity === 'silver' && styles.silverBadge,
                    achievement.rarity === 'gold' && styles.goldBadge
                  ]}>
                    <Text style={styles.rarityText}>{achievement.rarity}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Compassion Mode Card */}
        <TouchableOpacity 
          style={styles.compassionCard}
          onPress={() => setShowCompassionMode(true)}
        >
          <Heart size={24} color="#ffffff" />
          <View style={styles.compassionContent}>
            <Text style={styles.compassionTitle}>Compassion Mode</Text>
            <Text style={styles.compassionDescription}>
              When days feel heavy, let gentleness guide you. You are enough, exactly as you are.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Voice Chat Modal */}
        <Modal
          visible={showVoiceChat}
          animationType="slide"
          presentationStyle="fullScreen"
        >
          <VoiceChat
            isVisible={showVoiceChat}
            onClose={() => setShowVoiceChat(false)}
          />
        </Modal>

        {/* Goals Modal */}
        <GoalsModal
          isVisible={showGoalsModal}
          onClose={() => setShowGoalsModal(false)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appIcon: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  levelSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelIcon: {
    backgroundColor: '#8b5cf6',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  levelSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    width: '100%',
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
  },
  moodSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodOption: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  moodSelected: {
    backgroundColor: '#f3e8ff',
    borderWidth: 1,
    borderColor: '#a855f7',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  companionCard: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  companionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companionAvatar: {
    position: 'relative',
    marginRight: 16,
  },
  companionEmoji: {
    fontSize: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 80,
    height: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 40,
    overflow: 'hidden',
  },
  levelBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#8b5cf6',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  companionInfo: {
    flex: 1,
  },
  companionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  companionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  companionMoodBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  companionMoodText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '500',
  },
  companionMessage: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  accessoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  accessoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accessoryText: {
    color: '#ffffff',
    fontSize: 10,
  },
  questsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  questsList: {
    gap: 12,
  },
  questCard: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  questCompleted: {
    borderColor: '#10b981',
    backgroundColor: '#ecfdf5',
  },
  questHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questIcon: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  questIconCompleted: {
    backgroundColor: '#10b981',
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  questDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  questProgress: {
    alignItems: 'flex-end',
  },
  questProgressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  questXP: {
    fontSize: 10,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  questProgressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  questProgressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },
  gardenSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  gardenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gardenItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  gardenIcon: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  gardenValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  gardenLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  achievementsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    opacity: 0.7,
  },
  achievementEarned: {
    borderColor: '#f59e0b',
    backgroundColor: '#fffbeb',
    opacity: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  achievementIconEarned: {
    backgroundColor: '#f59e0b',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  bronzeBadge: {
    backgroundColor: '#fdba74',
  },
  silverBadge: {
    backgroundColor: '#cbd5e1',
  },
  goldBadge: {
    backgroundColor: '#fcd34d',
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#1f2937',
  },
  compassionCard: {
    backgroundColor: '#be185d',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  compassionContent: {
    marginLeft: 16,
    flex: 1,
  },
  compassionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  compassionDescription: {
    fontSize: 12,
    color: '#fce7f3',
    lineHeight: 18,
  },
});