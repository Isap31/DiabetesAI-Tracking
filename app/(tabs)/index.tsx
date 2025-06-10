import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
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
} from 'lucide-react-native';
import VoiceChat from '../../components/VoiceChat';

export default function HomeTab() {
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  const stats = [
    {
      title: 'Current Glucose',
      value: '94',
      unit: 'mg/dL',
      trend: 'stable',
      icon: Droplets,
      color: '#3b82f6',
    },
    {
      title: 'Time in Range',
      value: '87',
      unit: '%',
      trend: 'up',
      icon: Target,
      color: '#10b981',
    },
    {
      title: 'Logging Streak',
      value: '12',
      unit: 'days',
      trend: 'up',
      icon: Clock,
      color: '#f59e0b',
    },
    {
      title: 'Health Score',
      value: '8.4',
      unit: '/10',
      trend: 'up',
      icon: Heart,
      color: '#ef4444',
    },
  ];

  const recentLogs = [
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

  const formatLogDisplay = (log: any) => {
    switch (log.type) {
      case 'meal':
        return `${log.data.mealName} (${log.data.carbs}g carbs)`;
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
          <View style={styles.glucoseStatus}>
            <Text style={styles.glucoseValue}>94</Text>
            <Text style={styles.glucoseUnit}>mg/dL</Text>
          </View>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back, Sarah</Text>
          <Text style={styles.welcomeSubtitle}>Here's your health overview for today.</Text>
        </View>

        {/* Daily Affirmation */}
        <View style={styles.affirmationCard}>
          <View style={styles.affirmationHeader}>
            <View style={styles.affirmationIcon}>
              <Heart size={20} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.affirmationTitle}>Daily Inspiration</Text>
              <Text style={styles.affirmationSubtitle}>Your moment of positivity</Text>
            </View>
          </View>
          <Text style={styles.affirmationText}>
            "You are stronger than your challenges and more resilient than you know. Every healthy choice you make today is an investment in your future self."
          </Text>
        </View>

        {/* AI Voice Chat Quick Access */}
        <TouchableOpacity 
          style={styles.voiceChatCard}
          onPress={() => setShowVoiceChat(true)}
        >
          <View style={styles.voiceChatHeader}>
            <View style={styles.voiceChatIcon}>
              <Mic size={20} color="#ffffff" />
            </View>
            <View style={styles.voiceChatInfo}>
              <Text style={styles.voiceChatTitle}>FlowSense AI Voice</Text>
              <Text style={styles.voiceChatSubtitle}>Talk to your health assistant</Text>
            </View>
          </View>
          <Text style={styles.voiceChatDescription}>
            Ask questions about your glucose patterns, get meal suggestions, or receive personalized health advice using voice commands.
          </Text>
        </TouchableOpacity>

        {/* Key Metrics Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                {stat.trend && (
                  <View style={[styles.trendIndicator, 
                    stat.trend === 'up' ? styles.trendUp : 
                    stat.trend === 'down' ? styles.trendDown : styles.trendStable
                  ]} />
                )}
              </View>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>{stat.value}</Text>
                {stat.unit && <Text style={styles.statUnit}>{stat.unit}</Text>}
              </View>
            </View>
          ))}
        </View>

        {/* Health Profile Summary */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileTitle}>Health Profile</Text>
            <TouchableOpacity>
              <Text style={styles.updateButton}>Update Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileGrid}>
            <View style={styles.profileItem}>
              <View style={styles.profileIcon}>
                <User size={16} color="#6b7280" />
              </View>
              <Text style={styles.profileValue}>{userProfile.age} years</Text>
              <Text style={styles.profileLabel}>{userProfile.diabetesType} • {userProfile.gender}</Text>
            </View>
            <View style={styles.profileItem}>
              <View style={styles.profileIcon}>
                <Scale size={16} color="#6b7280" />
              </View>
              <Text style={styles.profileValue}>BMI {userProfile.bmi}</Text>
              <Text style={styles.profileLabel}>{userProfile.height}cm, {userProfile.weight}kg</Text>
            </View>
            <View style={styles.profileItem}>
              <View style={styles.profileIcon}>
                <Calendar size={16} color="#6b7280" />
              </View>
              <Text style={styles.profileValue}>9 years</Text>
              <Text style={styles.profileLabel}>Since diagnosis</Text>
            </View>
            <View style={styles.profileItem}>
              <View style={styles.profileIcon}>
                <Brain size={16} color="#6b7280" />
              </View>
              <Text style={styles.profileValue}>{getSleepQualityText(userProfile.sleepQuality)}</Text>
              <Text style={styles.profileLabel}>{userProfile.sleepDuration}h sleep</Text>
            </View>
          </View>
        </View>

        {/* Today's Glucose Overview */}
        <View style={styles.glucoseOverviewCard}>
          <Text style={styles.cardTitle}>Today's Glucose Overview</Text>
          <View style={styles.glucoseGrid}>
            <View style={styles.glucoseItem}>
              <Text style={styles.glucoseItemValue}>94</Text>
              <Text style={styles.glucoseItemLabel}>Current</Text>
            </View>
            <View style={styles.glucoseItem}>
              <Text style={styles.glucoseItemValue}>87%</Text>
              <Text style={styles.glucoseItemLabel}>Time in Range</Text>
            </View>
            <View style={styles.glucoseItem}>
              <Text style={styles.glucoseItemValue}>6</Text>
              <Text style={styles.glucoseItemLabel}>Readings Today</Text>
            </View>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              <Text style={styles.insightBold}>Quick Insight:</Text> Your glucose levels are stable today. Great job maintaining consistency with your routine!
            </Text>
          </View>
        </View>

        {/* Recent Logs */}
        <View style={styles.recentLogsCard}>
          <View style={styles.recentLogsHeader}>
            <Text style={styles.cardTitle}>Recent Logs</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Utensils size={16} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Activity size={16} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Droplets size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.aiInsightBanner}>
            <Text style={styles.aiInsightText}>
              <Text style={styles.aiInsightBold}>AI-Powered Insights:</Text> Log meals (carbs), exercise (type/duration/intensity), and glucose readings for accurate predictions.
            </Text>
          </View>
          
          <View style={styles.logsList}>
            {recentLogs.map((log) => (
              <View key={log.id} style={styles.logItem}>
                <View style={styles.logIcon}>
                  {log.type === 'meal' && <Utensils size={16} color="#3b82f6" />}
                  {log.type === 'exercise' && <Activity size={16} color="#10b981" />}
                  {log.type === 'glucose' && <Droplets size={16} color="#ef4444" />}
                </View>
                <View style={styles.logContent}>
                  <Text style={styles.logTitle}>{formatLogDisplay(log)}</Text>
                  <Text style={styles.logTime}>{log.date} at {log.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Goals Quick Access */}
        <TouchableOpacity style={styles.goalsCard}>
          <View style={styles.goalsHeader}>
            <View style={styles.goalsIcon}>
              <Target size={20} color="#ffffff" />
            </View>
            <View style={styles.goalsInfo}>
              <Text style={styles.goalsTitle}>Health Goals</Text>
              <Text style={styles.goalsSubtitle}>Set and track your objectives</Text>
            </View>
          </View>
          <Goal size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </ScrollView>

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
  glucoseStatus: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    alignItems: 'center',
  },
  glucoseValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
  },
  glucoseUnit: {
    fontSize: 12,
    color: '#166534',
  },
  welcomeSection: {
    padding: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  affirmationCard: {
    backgroundColor: '#7c3aed',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  affirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  affirmationIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  affirmationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  affirmationSubtitle: {
    fontSize: 12,
    color: '#e9d5ff',
  },
  affirmationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#ffffff',
    fontWeight: '500',
  },
  voiceChatCard: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  voiceChatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  voiceChatIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  voiceChatInfo: {
    flex: 1,
  },
  voiceChatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  voiceChatSubtitle: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  voiceChatDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 8,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    padding: 8,
    borderRadius: 8,
  },
  trendIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  trendUp: {
    backgroundColor: '#10b981',
  },
  trendDown: {
    backgroundColor: '#ef4444',
  },
  trendStable: {
    backgroundColor: '#6b7280',
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  statUnit: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 4,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  updateButton: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '500',
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  profileItem: {
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  profileIcon: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  profileValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  profileLabel: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  glucoseOverviewCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  glucoseGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  glucoseItem: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  glucoseItemValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  glucoseItemLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  insightCard: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
  },
  insightText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
  },
  insightBold: {
    fontWeight: '600',
  },
  recentLogsCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  recentLogsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickActionButton: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 8,
  },
  aiInsightBanner: {
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  aiInsightText: {
    fontSize: 10,
    color: '#1e40af',
    lineHeight: 14,
  },
  aiInsightBold: {
    fontWeight: '600',
  },
  logsList: {
    gap: 12,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  logIcon: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  logContent: {
    flex: 1,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  logTime: {
    fontSize: 10,
    color: '#6b7280',
  },
  goalsCard: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalsIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  goalsInfo: {
    flex: 1,
  },
  goalsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  goalsSubtitle: {
    fontSize: 12,
    color: '#cbd5e1',
  },
});