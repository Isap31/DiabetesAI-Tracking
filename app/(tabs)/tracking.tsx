import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Plus,
  Camera,
  Utensils,
  Activity,
  Droplets,
  Clock,
  User,
  Scale,
  Brain,
  Bed,
} from 'lucide-react-native';

export default function TrackingTab() {
  const quickLog = [
    { 
      icon: Utensils, 
      label: 'Log Meal', 
      sublabel: 'Carbs & Calories',
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
      icon: User, 
      label: 'Profile', 
      sublabel: 'Age, BMI, Sleep',
      color: '#1e293b',
    }
  ];

  const recentLogs = [
    { 
      type: 'meal', 
      item: 'Grilled Chicken Salad', 
      time: '12:30 PM', 
      details: '15g carbs, 350 cal', 
      impact: 'low',
      aiNote: 'Good carb choice for stable glucose'
    },
    { 
      type: 'exercise', 
      item: '30min Walk', 
      time: '11:00 AM', 
      details: 'Moderate intensity', 
      impact: 'positive',
      aiNote: 'Optimal timing post-breakfast'
    },
    { 
      type: 'glucose', 
      item: '94 mg/dL', 
      time: '10:30 AM', 
      details: 'Before meal', 
      impact: 'stable',
      aiNote: 'Perfect target range'
    },
    { 
      type: 'profile', 
      item: 'Sleep Quality Updated', 
      time: '9:00 AM', 
      details: 'Quality: 7/10, Duration: 7.5h', 
      impact: 'neutral',
      aiNote: 'Good sleep supports glucose control'
    }
  ];

  const todaysSummary = [
    {
      icon: Utensils,
      title: '3 Meals',
      subtitle: '45g total carbs',
      color: '#3b82f6',
    },
    {
      icon: Activity,
      title: '2 Activities',
      subtitle: '60 min total',
      color: '#10b981',
    },
    {
      icon: Droplets,
      title: '6 Readings',
      subtitle: 'Avg: 96 mg/dL',
      color: '#ef4444',
    },
    {
      icon: Bed,
      title: 'Sleep Quality',
      subtitle: 'Good (7.5h)',
      color: '#8b5cf6',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Data Tracking</Text>
          <Text style={styles.headerSubtitle}>Log your health data for AI insights</Text>
        </View>

        {/* Quick Log Actions */}
        <View style={styles.quickLogSection}>
          <Text style={styles.sectionTitle}>Quick Data Logging</Text>
          <View style={styles.aiInsightBanner}>
            <Text style={styles.aiInsightText}>
              <Text style={styles.aiInsightBold}>AI-Powered Insights:</Text> Log all parameters for comprehensive glucose predictions and personalized recommendations.
            </Text>
          </View>
          <View style={styles.quickLogGrid}>
            {quickLog.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickLogButton, { backgroundColor: action.color }]}
              >
                <action.icon size={24} color="#ffffff" />
                <Text style={styles.quickLogLabel}>{action.label}</Text>
                <Text style={styles.quickLogSublabel}>{action.sublabel}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.summaryGrid}>
            {todaysSummary.map((item, index) => (
              <View key={index} style={styles.summaryItem}>
                <View style={[styles.summaryIcon, { backgroundColor: `${item.color}20` }]}>
                  <item.icon size={20} color={item.color} />
                </View>
                <Text style={styles.summaryTitle}>{item.title}</Text>
                <Text style={styles.summarySubtitle}>{item.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Logs with AI Insights */}
        <View style={styles.recentLogsSection}>
          <Text style={styles.sectionTitle}>Recent Logs & AI Insights</Text>
          <View style={styles.logsList}>
            {recentLogs.map((log, index) => (
              <View key={index} style={styles.logItem}>
                <View style={styles.logLeft}>
                  <View style={[styles.logIcon, 
                    log.type === 'meal' && styles.mealIcon,
                    log.type === 'exercise' && styles.exerciseIcon,
                    log.type === 'glucose' && styles.glucoseIcon,
                    log.type === 'profile' && styles.profileIcon
                  ]}>
                    {log.type === 'meal' && <Utensils size={16} color="#3b82f6" />}
                    {log.type === 'exercise' && <Activity size={16} color="#10b981" />}
                    {log.type === 'glucose' && <Droplets size={16} color="#ef4444" />}
                    {log.type === 'profile' && <Bed size={16} color="#8b5cf6" />}
                  </View>
                  <View style={styles.logContent}>
                    <Text style={styles.logTitle}>{log.item}</Text>
                    <Text style={styles.logDetails}>{log.time} • {log.details}</Text>
                    <Text style={styles.logAiNote}>{log.aiNote}</Text>
                  </View>
                </View>
                <View style={[styles.impactIndicator,
                  log.impact === 'positive' && styles.positiveImpact,
                  log.impact === 'stable' && styles.stableImpact,
                  log.impact === 'low' && styles.lowImpact,
                  log.impact === 'neutral' && styles.neutralImpact
                ]} />
              </View>
            ))}
          </View>
        </View>

        {/* Data Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Weekly Data Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Excellent Progress This Week!</Text>
            <Text style={styles.insightText}>
              Your consistent logging has improved AI prediction accuracy by 12%. 
              Your glucose control shows a 5% improvement in time-in-range compared to last week.
            </Text>
            <View style={styles.insightStats}>
              <View style={styles.insightStat}>
                <Text style={styles.insightStatValue}>21/21</Text>
                <Text style={styles.insightStatLabel}>Meals logged</Text>
              </View>
              <View style={styles.insightStat}>
                <Text style={styles.insightStatValue}>5</Text>
                <Text style={styles.insightStatLabel}>Exercise sessions</Text>
              </View>
              <View style={styles.insightStat}>
                <Text style={styles.insightStatValue}>42</Text>
                <Text style={styles.insightStatLabel}>Glucose readings</Text>
              </View>
            </View>
          </View>
        </View>
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
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  quickLogSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  aiInsightBanner: {
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  aiInsightText: {
    fontSize: 12,
    color: '#1e40af',
    lineHeight: 16,
  },
  aiInsightBold: {
    fontWeight: '600',
  },
  quickLogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLogButton: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  quickLogLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  quickLogSublabel: {
    fontSize: 10,
    color: '#cbd5e1',
  },
  summarySection: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginTop: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    alignItems: 'center',
    width: '45%',
  },
  summaryIcon: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  summarySubtitle: {
    fontSize: 10,
    color: '#6b7280',
  },
  recentLogsSection: {
    padding: 16,
    marginTop: 8,
  },
  logsList: {
    gap: 12,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  logLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  logIcon: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  mealIcon: {
    backgroundColor: '#dbeafe',
  },
  exerciseIcon: {
    backgroundColor: '#dcfce7',
  },
  glucoseIcon: {
    backgroundColor: '#fee2e2',
  },
  profileIcon: {
    backgroundColor: '#f3e8ff',
  },
  logContent: {
    flex: 1,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  logDetails: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
  },
  logAiNote: {
    fontSize: 10,
    color: '#3b82f6',
    fontStyle: 'italic',
  },
  impactIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  positiveImpact: {
    backgroundColor: '#10b981',
  },
  stableImpact: {
    backgroundColor: '#10b981',
  },
  lowImpact: {
    backgroundColor: '#f59e0b',
  },
  neutralImpact: {
    backgroundColor: '#6b7280',
  },
  insightsSection: {
    padding: 16,
  },
  insightCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  insightStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  insightStat: {
    alignItems: 'center',
  },
  insightStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  insightStatLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
});