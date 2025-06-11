import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
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
  X,
  Save,
} from 'lucide-react-native';

export default function TrackingTab() {
  const [showLogForm, setShowLogForm] = useState(false);
  const [logType, setLogType] = useState<'meal' | 'exercise' | 'glucose' | 'profile'>('meal');
  const [logData, setLogData] = useState({
    // Meal fields
    mealName: '',
    carbs: '',
    protein: '',
    calories: '',
    alcohol: '',
    // Exercise fields
    exerciseType: '',
    duration: '',
    intensity: 'moderate',
    // Glucose fields
    glucose: '',
    context: 'fasting',
    notes: '',
    // Profile fields
    age: '',
    diabetesType: 'Type 1',
    height: '',
    weight: '',
    stressLevel: '3',
    gender: 'female',
    sleepQuality: '7',
    sleepDuration: '7.5',
    // Common fields
    time: new Date().toTimeString().slice(0, 5),
    date: new Date().toISOString().split('T')[0]
  });

  const quickLog = [
    { 
      icon: Utensils, 
      label: 'Log Meal', 
      sublabel: 'Carbs, Protein & Alcohol',
      color: '#1e293b',
      action: () => openLogForm('meal')
    },
    { 
      icon: Activity, 
      label: 'Exercise', 
      sublabel: 'Type & Duration',
      color: '#1e293b',
      action: () => openLogForm('exercise')
    },
    { 
      icon: Droplets, 
      label: 'Glucose', 
      sublabel: 'Current Level',
      color: '#1e293b',
      action: () => openLogForm('glucose')
    },
    { 
      icon: User, 
      label: 'Profile', 
      sublabel: 'Age, BMI, Sleep',
      color: '#1e293b',
      action: () => openLogForm('profile')
    }
  ];

  const recentLogs = [
    { 
      type: 'meal', 
      item: 'Grilled Chicken Salad', 
      time: '12:30 PM', 
      details: '15g carbs, 35g protein, 350 cal', 
      impact: 'low',
      aiNote: 'Good protein balance for stable glucose'
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
      subtitle: '45g carbs, 85g protein',
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

  const openLogForm = (type: 'meal' | 'exercise' | 'glucose' | 'profile') => {
    setLogType(type);
    setShowLogForm(true);
  };

  const handleLogSubmit = () => {
    // Handle form submission
    console.log('Log submitted:', { type: logType, data: logData });
    setShowLogForm(false);
    // Reset form
    setLogData({
      mealName: '', carbs: '', protein: '', calories: '', alcohol: '',
      exerciseType: '', duration: '', intensity: 'moderate',
      glucose: '', context: 'fasting', notes: '',
      age: '', diabetesType: 'Type 1', height: '', weight: '', stressLevel: '3',
      gender: 'female', sleepQuality: '7', sleepDuration: '7.5',
      time: new Date().toTimeString().slice(0, 5),
      date: new Date().toISOString().split('T')[0]
    });
  };

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
              <Text style={styles.aiInsightBold}>AI-Powered Insights:</Text> Log all parameters including protein and alcohol for comprehensive glucose predictions and personalized recommendations.
            </Text>
          </View>
          <View style={styles.quickLogGrid}>
            {quickLog.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickLogButton, { backgroundColor: action.color }]}
                onPress={action.action}
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
              Protein intake tracking is helping optimize meal responses.
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

      {/* Universal Log Form Modal */}
      <Modal visible={showLogForm} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Log {logType.charAt(0).toUpperCase() + logType.slice(1)}
              </Text>
              <TouchableOpacity onPress={() => setShowLogForm(false)}>
                <X size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              {/* Common fields for non-profile logs */}
              {logType !== 'profile' && (
                <View style={styles.inputRow}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Date</Text>
                    <TextInput
                      style={styles.input}
                      value={logData.date}
                      onChangeText={(text) => setLogData({...logData, date: text})}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Time</Text>
                    <TextInput
                      style={styles.input}
                      value={logData.time}
                      onChangeText={(text) => setLogData({...logData, time: text})}
                    />
                  </View>
                </View>
              )}

              {/* Meal-specific fields */}
              {logType === 'meal' && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Meal Name *</Text>
                    <TextInput
                      style={styles.input}
                      value={logData.mealName}
                      onChangeText={(text) => setLogData({...logData, mealName: text})}
                      placeholder="e.g., Grilled Chicken Salad"
                    />
                  </View>
                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Carbs (g) *</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.carbs}
                        onChangeText={(text) => setLogData({...logData, carbs: text})}
                        placeholder="15"
                        keyboardType="numeric"
                      />
                      <Text style={styles.inputNote}>Critical for glucose prediction</Text>
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Protein (g) *</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.protein}
                        onChangeText={(text) => setLogData({...logData, protein: text})}
                        placeholder="35"
                        keyboardType="numeric"
                      />
                      <Text style={styles.inputNote}>Affects satiety & glucose</Text>
                    </View>
                  </View>
                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Calories</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.calories}
                        onChangeText={(text) => setLogData({...logData, calories: text})}
                        placeholder="350"
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Alcohol (g)</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.alcohol}
                        onChangeText={(text) => setLogData({...logData, alcohol: text})}
                        placeholder="0"
                        keyboardType="numeric"
                      />
                      <Text style={styles.inputNote}>Impacts glucose control</Text>
                    </View>
                  </View>
                </>
              )}

              {/* Exercise-specific fields */}
              {logType === 'exercise' && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Exercise Type *</Text>
                    <TextInput
                      style={styles.input}
                      value={logData.exerciseType}
                      onChangeText={(text) => setLogData({...logData, exerciseType: text})}
                      placeholder="Walking, Running, Cycling..."
                    />
                  </View>
                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Duration (min) *</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.duration}
                        onChangeText={(text) => setLogData({...logData, duration: text})}
                        placeholder="30"
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Intensity *</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.intensity}
                        onChangeText={(text) => setLogData({...logData, intensity: text})}
                        placeholder="light, moderate, vigorous"
                      />
                    </View>
                  </View>
                </>
              )}

              {/* Glucose-specific fields */}
              {logType === 'glucose' && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Glucose Level (mg/dL) *</Text>
                    <TextInput
                      style={styles.input}
                      value={logData.glucose}
                      onChangeText={(text) => setLogData({...logData, glucose: text})}
                      placeholder="94"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Context</Text>
                    <TextInput
                      style={styles.input}
                      value={logData.context}
                      onChangeText={(text) => setLogData({...logData, context: text})}
                      placeholder="fasting, before-meal, after-meal..."
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Notes</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      value={logData.notes}
                      onChangeText={(text) => setLogData({...logData, notes: text})}
                      placeholder="How are you feeling? Any symptoms?"
                      multiline
                      numberOfLines={3}
                    />
                  </View>
                </>
              )}

              {/* Profile-specific fields */}
              {logType === 'profile' && (
                <>
                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Age *</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.age}
                        onChangeText={(text) => setLogData({...logData, age: text})}
                        placeholder="34"
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Gender *</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.gender}
                        onChangeText={(text) => setLogData({...logData, gender: text})}
                        placeholder="female, male"
                      />
                    </View>
                  </View>
                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Height (cm) *</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.height}
                        onChangeText={(text) => setLogData({...logData, height: text})}
                        placeholder="165"
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Weight (kg) *</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.weight}
                        onChangeText={(text) => setLogData({...logData, weight: text})}
                        placeholder="68"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Sleep Quality (1-10)</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.sleepQuality}
                        onChangeText={(text) => setLogData({...logData, sleepQuality: text})}
                        placeholder="7"
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Sleep Duration (h)</Text>
                      <TextInput
                        style={styles.input}
                        value={logData.sleepDuration}
                        onChangeText={(text) => setLogData({...logData, sleepDuration: text})}
                        placeholder="7.5"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </>
              )}

              <View style={styles.aiInsightBox}>
                <Text style={styles.aiInsightBoxText}>
                  <Text style={styles.aiInsightBoxBold}>AI Integration:</Text> {
                    logType === 'meal' ? 'Carbs, protein, and alcohol content are key factors for glucose predictions.' :
                    logType === 'exercise' ? 'Type, duration, and intensity all affect glucose response patterns.' :
                    logType === 'glucose' ? 'Regular readings help AI learn your patterns and improve predictions.' :
                    'These parameters are essential for accurate glucose predictions and personalized recommendations.'
                  }
                </Text>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowLogForm(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleLogSubmit}
              >
                <Save size={16} color="#ffffff" />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputNote: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  aiInsightBox: {
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  aiInsightBoxText: {
    fontSize: 12,
    color: '#1e40af',
    lineHeight: 16,
  },
  aiInsightBoxBold: {
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
});