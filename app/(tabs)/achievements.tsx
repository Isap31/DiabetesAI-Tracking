import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Trophy,
  Star,
  Target,
  Flame,
  Award,
  Zap,
  Crown,
  Shield,
} from 'lucide-react-native';

export default function AchievementsTab() {
  const achievements = [
    { icon: Flame, title: 'Streak Master', description: '30-day logging streak', progress: 40, total: 30, earned: false, color: '#f97316' },
    { icon: Target, title: 'Glucose Guardian', description: '90% time in range for a week', progress: 85, total: 90, earned: false, color: '#8b5cf6' },
    { icon: Star, title: 'Pet Parent', description: 'Keep pet happy for 14 days', progress: 100, total: 14, earned: true, color: '#f59e0b' },
    { icon: Crown, title: 'Health Champion', description: 'Reach level 15', progress: 80, total: 15, earned: false, color: '#eab308' },
    { icon: Shield, title: 'Consistency King', description: 'Log meals for 21 days straight', progress: 57, total: 21, earned: false, color: '#3b82f6' },
    { icon: Zap, title: 'Power User', description: 'Use all features in one day', progress: 100, total: 6, earned: true, color: '#06b6d4' }
  ];

  const weeklyQuests = [
    { title: 'Log 21 meals', progress: 18, total: 21, reward: 500, icon: Target },
    { title: 'Exercise 5 times', progress: 3, total: 5, reward: 300, icon: Zap },
    { title: 'Help 3 community members', progress: 1, total: 3, reward: 200, icon: Star }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Goals & Achievements</Text>
          <Text style={styles.headerSubtitle}>Track your progress and earn rewards</Text>
        </View>

        {/* Game Progress */}
        <View style={styles.gameProgressSection}>
          <View style={styles.gameProgressHeader}>
            <View>
              <Text style={styles.gameProgressTitle}>HealthQuest Progress</Text>
              <Text style={styles.gameProgressSubtitle}>Level 12 • 2,450 XP</Text>
            </View>
            <View style={styles.xpBadge}>
              <Text style={styles.xpBadgeText}>1,550 XP to next level</Text>
            </View>
          </View>

          <View style={styles.progressList}>
            {[
              { icon: Flame, title: '7-Day Streak', progress: 85, color: '#f97316' },
              { icon: Target, title: 'Glucose Goals', progress: 72, color: '#8b5cf6' },
              { icon: Star, title: 'Weekly Challenges', progress: 90, color: '#f59e0b' }
            ].map((item, index) => (
              <View key={index} style={styles.progressItem}>
                <View style={styles.progressHeader}>
                  <item.icon size={16} color="#6b7280" />
                  <Text style={styles.progressLabel}>{item.title}</Text>
                  <Text style={styles.progressValue}>{item.progress}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: item.color }]}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.badgesSection}>
            <Text style={styles.badgesTitle}>Recent Badges</Text>
            <View style={styles.badgesList}>
              {[
                { icon: Trophy, label: 'Champion', earned: true, color: '#f59e0b' },
                { icon: Award, label: 'Consistent', earned: true, color: '#8b5cf6' },
                { icon: Zap, label: 'Power User', earned: false, color: '#9ca3af' }
              ].map((badge, index) => (
                <View key={index} style={[styles.badge, badge.earned ? styles.badgeEarned : styles.badgeUnearned]}>
                  <badge.icon size={20} color={badge.color} />
                  <Text style={[styles.badgeLabel, badge.earned ? styles.badgeLabelEarned : styles.badgeLabelUnearned]}>
                    {badge.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Weekly Quests */}
        <View style={styles.questsSection}>
          <Text style={styles.sectionTitle}>Weekly Quests</Text>
          <View style={styles.questsList}>
            {weeklyQuests.map((quest, index) => (
              <View key={index} style={styles.questItem}>
                <View style={styles.questHeader}>
                  <View style={styles.questInfo}>
                    <quest.icon size={16} color="#8b5cf6" />
                    <Text style={styles.questTitle}>{quest.title}</Text>
                  </View>
                  <View style={styles.questReward}>
                    <Star size={12} color="#f59e0b" />
                    <Text style={styles.questRewardText}>{quest.reward}</Text>
                  </View>
                </View>
                <View style={styles.questProgress}>
                  <Text style={styles.questProgressText}>{quest.progress}/{quest.total}</Text>
                  <Text style={styles.questProgressPercent}>{Math.round((quest.progress / quest.total) * 100)}%</Text>
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

        {/* Achievements Grid */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <View key={index} style={[
                styles.achievementCard,
                achievement.earned ? styles.achievementEarned : styles.achievementUnearned
              ]}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                  <achievement.icon size={20} color="#ffffff" />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                {!achievement.earned && (
                  <View style={styles.achievementProgress}>
                    <View style={styles.achievementProgressHeader}>
                      <Text style={styles.achievementProgressText}>{achievement.progress}/{achievement.total}</Text>
                      <Text style={styles.achievementProgressPercent}>{Math.round((achievement.progress / achievement.total) * 100)}%</Text>
                    </View>
                    <View style={styles.achievementProgressBar}>
                      <View 
                        style={[
                          styles.achievementProgressFill, 
                          { width: `${(achievement.progress / achievement.total) * 100}%`, backgroundColor: achievement.color }
                        ]}
                      />
                    </View>
                  </View>
                )}
                {achievement.earned && (
                  <View style={styles.achievementEarnedBadge}>
                    <Trophy size={12} color="#f59e0b" />
                    <Text style={styles.achievementEarnedText}>Earned!</Text>
                  </View>
                )}
              </View>
            ))}
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
  gameProgressSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  gameProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  gameProgressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  gameProgressSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  xpBadge: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  xpBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressList: {
    gap: 16,
    marginBottom: 20,
  },
  progressItem: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
    marginLeft: 8,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  badgesSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  badgesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  badgesList: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
  badgeEarned: {
    backgroundColor: '#f3f4f6',
  },
  badgeUnearned: {
    backgroundColor: '#f9fafb',
    opacity: 0.5,
  },
  badgeLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  badgeLabelEarned: {
    color: '#1f2937',
  },
  badgeLabelUnearned: {
    color: '#9ca3af',
  },
  questsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  questsList: {
    gap: 12,
  },
  questItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
  },
  questReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questRewardText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6b7280',
  },
  questProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questProgressText: {
    fontSize: 10,
    color: '#6b7280',
  },
  questProgressPercent: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6b7280',
  },
  questProgressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  questProgressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },
  achievementsSection: {
    padding: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '47%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  achievementEarned: {
    borderColor: '#f59e0b',
    backgroundColor: '#fef3c7',
  },
  achievementUnearned: {
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  achievementIcon: {
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 14,
  },
  achievementProgress: {
    gap: 4,
  },
  achievementProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementProgressText: {
    fontSize: 10,
    color: '#6b7280',
  },
  achievementProgressPercent: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6b7280',
  },
  achievementProgressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  achievementEarnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  achievementEarnedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#f59e0b',
  },
});