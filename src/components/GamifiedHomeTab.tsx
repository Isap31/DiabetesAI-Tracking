import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
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
import CompassionMode from '../../components/CompassionMode';
import AuroraJournal from '../../components/AuroraJournal';
import CareCircle from '../../components/CareCircle';
import AccessibilityHub from '../../components/AccessibilityHub';

const GamifiedHomeTab = () => {
  // User state
  const [userLevel, setUserLevel] = useState(12);
  const [currentXP, setCurrentXP] = useState(2450);
  const [nextLevelXP, setNextLevelXP] = useState(4000);
  const [userMood, setUserMood] = useState<'joyful' | 'content' | 'neutral' | 'challenging' | 'difficult'>('content');
  
  // Feature visibility states
  const [showCompassionMode, setShowCompassionMode] = useState(false);
  const [showAccessibilityHub, setShowAccessibilityHub] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showCareCircle, setShowCareCircle] = useState(false);
  
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
      rarity: 'bronze',
      story: 'You planted the first seeds in your wellness garden.'
    },
    {
      id: 'water-warrior',
      title: '7-Day Water Warrior',
      description: 'A week of mindful hydration',
      icon: Droplets,
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
    }
  ];

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

  // Get companion message based on mood
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Level */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.levelIcon}>
              <Crown size={20} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.levelTitle}>Level {userLevel}</Text>
              <Text style={styles.levelSubtitle}>Your wellness journey</Text>
            </View>
          </View>
          <View style={styles.levelProgress}>
            <Text style={styles.xpText}>{currentXP}/{nextLevelXP} XP</Text>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${(currentXP / nextLevelXP) * 100}%` }]}
              />
            </View>
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

        {/* Feature Navigation */}
        <View style={styles.featureNavigation}>
          <TouchableOpacity 
            style={styles.featureButton}
            onPress={() => setShowJournal(true)}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#8b5cf6' }]}>
              <Book size={24} color="#ffffff" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Aurora Journal</Text>
              <Text style={styles.featureDescription}>Reflect on your journey</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureButton}
            onPress={() => setShowCareCircle(true)}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#3b82f6' }]}>
              <Users size={24} color="#ffffff" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Care Circle</Text>
              <Text style={styles.featureDescription}>Your support community</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureButton}
            onPress={() => setShowCompassionMode(true)}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#ec4899' }]}>
              <Heart size={24} color="#ffffff" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Compassion Mode</Text>
              <Text style={styles.featureDescription}>Gentle support for difficult days</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureButton}
            onPress={() => setShowAccessibilityHub(true)}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#10b981' }]}>
              <Eye size={24} color="#ffffff" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Accessibility & Comfort</Text>
              <Text style={styles.featureDescription}>Customize your experience</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
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
                <Text style={styles.questPoetry}>"{quest.poetry}"</Text>
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
                exercise: { icon: Activity, color: "#f59e0b", bg: "#fef3c7" },
                journal: { icon: Book, color: "#8b5cf6", bg: "#f3e8ff" }
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
                <Text style={styles.achievementStory}>"{achievement.story}"</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Engagement Mode Selector */}
        <View style={styles.engagementSection}>
          <Text style={styles.sectionTitle}>Your Experience Mode</Text>
          <View style={styles.engagementOptions}>
            <TouchableOpacity 
              style={[
                styles.engagementOption,
                userPreferences.engagementMode === 'simple' && styles.engagementSelected
              ]}
              onPress={() => setUserPreferences({...userPreferences, engagementMode: 'simple'})}
            >
              <View style={styles.engagementIcon}>
                <Heart size={20} color="#ef4444" />
              </View>
              <Text style={styles.engagementTitle}>Simple</Text>
              <Text style={styles.engagementDescription}>Just the essentials</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.engagementOption,
                userPreferences.engagementMode === 'guided' && styles.engagementSelected
              ]}
              onPress={() => setUserPreferences({...userPreferences, engagementMode: 'guided'})}
            >
              <View style={styles.engagementIcon}>
                <Star size={20} color="#f59e0b" />
              </View>
              <Text style={styles.engagementTitle}>Guided</Text>
              <Text style={styles.engagementDescription}>With helpful tips</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.engagementOption,
                userPreferences.engagementMode === 'insight' && styles.engagementSelected
              ]}
              onPress={() => setUserPreferences({...userPreferences, engagementMode: 'insight'})}
            >
              <View style={styles.engagementIcon}>
                <Target size={20} color="#3b82f6" />
              </View>
              <Text style={styles.engagementTitle}>Insight</Text>
              <Text style={styles.engagementDescription}>Detailed analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Droplets size={20} color="#3b82f6" />
          <Text style={styles.quickActionText}>Log Glucose</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Utensils size={20} color="#10b981" />
          <Text style={styles.quickActionText}>Log Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Activity size={20} color="#f59e0b" />
          <Text style={styles.quickActionText}>Log Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Mic size={20} color="#8b5cf6" />
          <Text style={styles.quickActionText}>Voice</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <CompassionMode 
        isVisible={showCompassionMode}
        onClose={() => setShowCompassionMode(false)}
        userMood="struggling"
        recentChallenge="Balanced Plate Builder"
      />

      <AuroraJournal
        isVisible={showJournal}
        onClose={() => setShowJournal(false)}
        entries={journalEntries}
        onAddEntry={handleAddJournalEntry}
      />

      <CareCircle
        isVisible={showCareCircle}
        onClose={() => setShowCareCircle(false)}
        members={careMembers}
        challenges={teamChallenges}
        userPrivacySettings={privacySettings}
        onUpdatePrivacy={handleUpdatePrivacy}
        onInviteMember={handleInviteMember}
        onJoinChallenge={handleJoinChallenge}
      />

      <AccessibilityHub
        isVisible={showAccessibilityHub}
        onClose={() => setShowAccessibilityHub(false)}
        settings={accessibilitySettings}
        onUpdateSettings={handleUpdateAccessibility}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80, // Space for quick actions
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  levelProgress: {
    alignItems: 'flex-end',
  },
  xpText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  progressBar: {
    width: 100,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
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
  featureNavigation: {
    margin: 16,
    gap: 12,
  },
  featureButton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6b7280',
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
    marginBottom: 8,
  },
  questProgressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },
  questPoetry: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
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
    marginBottom: 8,
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
  achievementStory: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  engagementSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  engagementOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementOption: {
    width: '31%',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  engagementSelected: {
    backgroundColor: '#f3e8ff',
    borderColor: '#8b5cf6',
  },
  engagementIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
  },
  engagementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  engagementDescription: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  quickActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default GamifiedHomeTab;