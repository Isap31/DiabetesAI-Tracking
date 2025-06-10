import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Brain,
  TrendingUp,
  Target,
  Activity,
  Utensils,
  Moon,
  User,
  Scale,
  Bed,
  Clock,
  Calendar,
} from 'lucide-react-native';

export default function PredictionsTab() {
  const userProfile = {
    age: 34,
    diabetesType: 'Type 1',
    height: 165,
    weight: 68,
    bmi: 25.0,
    currentStress: 3,
    yearsSinceDiagnosis: 9,
    gender: 'female',
    isPregnant: false,
    menstrualCycleDay: 14,
    menstrualCycleLength: 28,
    sleepQuality: 7,
    sleepDuration: 7.5
  };

  const getMenstrualPhase = () => {
    if (userProfile.gender !== 'female' || userProfile.isPregnant) return null;
    const day = userProfile.menstrualCycleDay;
    
    if (day <= 5) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day <= 15) return 'Ovulation';
    return 'Luteal';
  };

  const modelMetrics = [
    { label: 'Prediction Accuracy', value: '93.1%', trend: '+5.8%', description: 'Enhanced with hormonal cycle data' },
    { label: 'Data Points Used', value: '3,247', trend: '+189', description: 'Glucose, meals, exercise, hormonal logs' },
    { label: 'Model Confidence', value: '91.2%', trend: '+4.5%', description: 'Hormonal pattern recognition' },
    { label: 'Profile Completeness', value: '100%', trend: 'Complete', description: 'All parameters including cycle data' }
  ];

  const parameterInfluence = [
    { parameter: 'Carbohydrate Content', influence: 85, icon: Utensils },
    { parameter: 'Menstrual Cycle Phase', influence: 72, icon: Moon },
    { parameter: 'Exercise Intensity', influence: 68, icon: Activity },
    { parameter: 'Sleep Quality & Duration', influence: 65, icon: Bed },
    { parameter: 'Time of Day', influence: 58, icon: Clock },
    { parameter: 'Years Since Diagnosis', influence: 55, icon: Calendar },
    { parameter: 'Stress Level', influence: 45, icon: Brain },
    { parameter: 'BMI/Weight', influence: 38, icon: Scale }
  ];

  const predictions = [
    {
      type: 'warning',
      title: 'Hormonal Glucose Variability Risk',
      message: `Based on ${getMenstrualPhase()?.toLowerCase()} phase (day ${userProfile.menstrualCycleDay}) and 25g carbs from breakfast, ${getMenstrualPhase() === 'Ovulation' ? '22%' : '15%'} chance of glucose exceeding 140 mg/dL due to hormonal insulin resistance`,
      confidence: getMenstrualPhase() === 'Ovulation' ? 89 : 82,
      action: getMenstrualPhase() === 'Ovulation' ? 'Consider reducing carbs by 5-8g or light exercise post-meal' : 'Monitor glucose closely, maintain regular meal timing',
      timeframe: '1-2 hours',
      factors: ['Carb content: 25g', `${getMenstrualPhase()} phase`, 'Type 1 diabetes', '9 years experience', 'Hormonal insulin resistance']
    },
    {
      type: 'positive',
      title: 'Cycle-Optimized Exercise Window',
      message: `Current glucose (94 mg/dL), moderate stress, and ${getMenstrualPhase()?.toLowerCase()} phase hormonal profile suggest ${getMenstrualPhase() === 'Follicular' ? 'excellent' : 'good'} conditions for physical activity`,
      confidence: getMenstrualPhase() === 'Follicular' ? 94 : 88,
      action: getMenstrualPhase() === 'Ovulation' ? 'Perfect time for 30-45 minutes moderate exercise - may help counteract hormonal effects' : 'Good time for regular exercise routine',
      timeframe: 'Next 2 hours',
      factors: ['Current glucose: 94 mg/dL', 'BMI: 25.0', `${getMenstrualPhase()} phase`, 'Sleep quality: 7/10', 'Diabetes experience: 9 years']
    },
    {
      type: 'info',
      title: 'Cycle-Aware Meal Recommendation',
      message: `Based on ${getMenstrualPhase()?.toLowerCase()} phase insulin sensitivity changes and your diabetes experience, optimal next meal should contain ${getMenstrualPhase() === 'Ovulation' ? '12-15g' : '15-18g'} carbs`,
      confidence: 85,
      action: getMenstrualPhase() === 'Ovulation' ? 'Focus on protein + vegetables, limit complex carbs during ovulation' : 'Balanced meal with normal carb content',
      timeframe: 'Lunch (12:00 PM)',
      factors: [`${getMenstrualPhase()} phase effects`, 'Morning glucose pattern', 'Exercise history', 'Sleep quality', 'Years since diagnosis: 9']
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Predictions & Analytics</Text>
          <Text style={styles.headerSubtitle}>Advanced glucose modeling with comprehensive parameter analysis</Text>
        </View>

        {/* AI Status Banner */}
        <View style={styles.aiStatusBanner}>
          <View style={styles.aiStatusHeader}>
            <View style={styles.aiStatusIcon}>
              <Brain size={24} color="#ffffff" />
            </View>
            <View style={styles.aiStatusInfo}>
              <Text style={styles.aiStatusTitle}>FlowSense AI Analytics Engine</Text>
              <Text style={styles.aiStatusSubtitle}>
                Advanced neural network ensemble analyzing your glucose patterns with comprehensive parameter integration including hormonal cycles, sleep quality, exercise impact, and meal timing.
              </Text>
            </View>
          </View>
          <View style={styles.aiStatusMetrics}>
            <View style={styles.aiStatusMetric}>
              <View style={styles.metricHeader}>
                <TrendingUp size={16} color="#3b82f6" />
                <Text style={styles.metricLabel}>Prediction Accuracy</Text>
              </View>
              <Text style={styles.metricValue}>93.1%</Text>
            </View>
            <View style={styles.aiStatusMetric}>
              <View style={styles.metricHeader}>
                <Target size={16} color="#10b981" />
                <Text style={styles.metricLabel}>Model Confidence</Text>
              </View>
              <Text style={styles.metricValue}>91.2%</Text>
            </View>
            <View style={styles.aiStatusMetric}>
              <View style={styles.metricHeader}>
                <Activity size={16} color="#8b5cf6" />
                <Text style={styles.metricLabel}>Data Points</Text>
              </View>
              <Text style={styles.metricValue}>3,247</Text>
            </View>
          </View>
        </View>

        {/* Current Profile Parameters */}
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Current Profile Parameters</Text>
          <View style={styles.profileGrid}>
            <View style={styles.profileParam}>
              <Text style={styles.paramLabel}>Age/Type:</Text>
              <Text style={styles.paramValue}>{userProfile.age}y, {userProfile.diabetesType}</Text>
            </View>
            <View style={styles.profileParam}>
              <Text style={styles.paramLabel}>BMI:</Text>
              <Text style={styles.paramValue}>{userProfile.bmi}</Text>
            </View>
            <View style={styles.profileParam}>
              <Text style={styles.paramLabel}>Experience:</Text>
              <Text style={styles.paramValue}>{userProfile.yearsSinceDiagnosis} years</Text>
            </View>
            <View style={styles.profileParam}>
              <Text style={styles.paramLabel}>Sleep:</Text>
              <Text style={styles.paramValue}>{userProfile.sleepDuration}h (Q:{userProfile.sleepQuality}/10)</Text>
            </View>
            {userProfile.gender === 'female' && !userProfile.isPregnant && (
              <>
                <View style={styles.profileParam}>
                  <Text style={styles.paramLabel}>Cycle:</Text>
                  <Text style={styles.paramValue}>Day {userProfile.menstrualCycleDay}</Text>
                </View>
                <View style={styles.profileParam}>
                  <Text style={styles.paramLabel}>Phase:</Text>
                  <Text style={styles.paramValue}>{getMenstrualPhase()}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Hormonal Cycle Impact */}
        {userProfile.gender === 'female' && !userProfile.isPregnant && (
          <View style={styles.hormonalSection}>
            <View style={styles.hormonalHeader}>
              <Moon size={16} color="#6b7280" />
              <Text style={styles.hormonalTitle}>Hormonal Cycle Impact</Text>
            </View>
            <Text style={styles.hormonalText}>
              <Text style={styles.hormonalBold}>{getMenstrualPhase()} Phase:</Text> {
                getMenstrualPhase() === 'Ovulation' ? 'Increased insulin resistance may cause higher glucose levels. Consider reducing carb intake by 20-30%.' :
                getMenstrualPhase() === 'Luteal' ? 'Progesterone may increase insulin resistance. Monitor glucose more closely.' :
                getMenstrualPhase() === 'Menstrual' ? 'Hormonal fluctuations may cause glucose variability. Stay hydrated and maintain regular meals.' :
                'Estrogen levels rising may improve insulin sensitivity. Good time for normal carb intake.'
              }
            </Text>
          </View>
        )}

        {/* Model Performance Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Model Performance Metrics</Text>
          <View style={styles.metricsGrid}>
            {modelMetrics.map((metric, index) => (
              <View key={index} style={styles.metricCard}>
                <Text style={styles.metricCardValue}>{metric.value}</Text>
                <Text style={styles.metricCardLabel}>{metric.label}</Text>
                <Text style={styles.metricCardTrend}>{metric.trend}</Text>
                <Text style={styles.metricCardDescription}>{metric.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Parameter Influence Chart */}
        <View style={styles.influenceSection}>
          <Text style={styles.sectionTitle}>
            Parameter Influence on Predictions
            {userProfile.gender === 'female' && !userProfile.isPregnant && (
              <Text style={styles.influenceSubtitle}> (Female Cycle-Enhanced)</Text>
            )}
          </Text>
          <View style={styles.influenceList}>
            {parameterInfluence.map((param, index) => (
              <View key={index} style={styles.influenceItem}>
                <View style={styles.influenceIcon}>
                  <param.icon size={16} color="#ffffff" />
                </View>
                <View style={styles.influenceContent}>
                  <View style={styles.influenceHeader}>
                    <Text style={styles.influenceParameter}>{param.parameter}</Text>
                    <Text style={styles.influencePercentage}>{param.influence}%</Text>
                  </View>
                  <View style={styles.influenceBar}>
                    <View 
                      style={[styles.influenceProgress, { width: `${param.influence}%` }]}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Predictions */}
        <View style={styles.predictionsSection}>
          <Text style={styles.sectionTitle}>
            AI Predictions & Recommendations
            {userProfile.gender === 'female' && !userProfile.isPregnant && (
              <Text style={styles.influenceSubtitle}> (Cycle-Aware)</Text>
            )}
          </Text>
          <View style={styles.predictionsList}>
            {predictions.map((prediction, index) => (
              <View key={index} style={[
                styles.predictionCard,
                prediction.type === 'warning' && styles.warningCard,
                prediction.type === 'positive' && styles.positiveCard,
                prediction.type === 'info' && styles.infoCard
              ]}>
                <View style={styles.predictionHeader}>
                  <Text style={[
                    styles.predictionTitle,
                    prediction.type === 'warning' && styles.warningText,
                    prediction.type === 'positive' && styles.positiveText,
                    prediction.type === 'info' && styles.infoText
                  ]}>
                    {prediction.title}
                  </Text>
                  <View style={styles.predictionTimeframe}>
                    <Clock size={12} color="#6b7280" />
                    <Text style={styles.timeframeText}>{prediction.timeframe}</Text>
                  </View>
                </View>
                <Text style={styles.predictionMessage}>{prediction.message}</Text>
                <Text style={styles.predictionAction}>{prediction.action}</Text>
                
                <View style={styles.factorsSection}>
                  <Text style={styles.factorsTitle}>Factors considered:</Text>
                  <View style={styles.factorsList}>
                    {prediction.factors.map((factor, idx) => (
                      <View key={idx} style={styles.factorTag}>
                        <Text style={styles.factorText}>{factor}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.confidenceSection}>
                  <Text style={styles.confidenceLabel}>
                    Confidence: {prediction.confidence}%
                  </Text>
                  <View style={styles.confidenceBar}>
                    <View 
                      style={[styles.confidenceProgress, { width: `${prediction.confidence}%` }]}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Next prediction update in 8 minutes
          </Text>
          <Text style={styles.footerSources}>
            Data sources: CGM, meal logs, exercise tracker, sleep data, profile data
            {userProfile.gender === 'female' && !userProfile.isPregnant && ', hormonal cycle'}
          </Text>
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
  aiStatusBanner: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  aiStatusHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  aiStatusIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  aiStatusInfo: {
    flex: 1,
  },
  aiStatusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  aiStatusSubtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  aiStatusMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  aiStatusMetric: {
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: '#cbd5e1',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileSection: {
    backgroundColor: '#f1f5f9',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  profileParam: {
    width: '45%',
  },
  paramLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  paramValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  hormonalSection: {
    backgroundColor: '#f9fafb',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  hormonalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  hormonalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  hormonalText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 16,
  },
  hormonalBold: {
    fontWeight: '600',
  },
  metricsSection: {
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    width: '47%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  metricCardValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  metricCardLabel: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
    marginVertical: 2,
  },
  metricCardTrend: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '500',
  },
  metricCardDescription: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  influenceSection: {
    padding: 16,
  },
  influenceSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '400',
  },
  influenceList: {
    gap: 12,
  },
  influenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  influenceIcon: {
    backgroundColor: '#6b7280',
    padding: 8,
    borderRadius: 8,
  },
  influenceContent: {
    flex: 1,
  },
  influenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  influenceParameter: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
  },
  influencePercentage: {
    fontSize: 12,
    color: '#6b7280',
  },
  influenceBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  influenceProgress: {
    height: '100%',
    backgroundColor: '#6b7280',
  },
  predictionsSection: {
    padding: 16,
  },
  predictionsList: {
    gap: 16,
  },
  predictionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  warningCard: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  positiveCard: {
    backgroundColor: '#dcfce7',
    borderColor: '#10b981',
  },
  infoCard: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  predictionTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  warningText: {
    color: '#92400e',
  },
  positiveText: {
    color: '#065f46',
  },
  infoText: {
    color: '#1e40af',
  },
  predictionTimeframe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeframeText: {
    fontSize: 10,
    color: '#6b7280',
  },
  predictionMessage: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 16,
    marginBottom: 8,
  },
  predictionAction: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 12,
  },
  factorsSection: {
    marginBottom: 12,
  },
  factorsTitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  factorsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  factorTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  factorText: {
    fontSize: 8,
    color: '#374151',
  },
  confidenceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6b7280',
  },
  confidenceBar: {
    width: 60,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  confidenceProgress: {
    height: '100%',
    backgroundColor: '#6b7280',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  footerSources: {
    fontSize: 10,
    color: '#9ca3af',
  },
});