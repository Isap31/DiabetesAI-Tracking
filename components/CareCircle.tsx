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
  Users,
  Heart,
  Shield,
  Plus,
  Settings,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  MessageCircle,
  Trophy,
  Target,
  Activity,
  Calendar,
  Bell,
  BellOff,
  UserPlus,
  Mail,
  Phone,
  X,
  Crown,
} from 'lucide-react-native';

interface CareCircleMember {
  id: string;
  name: string;
  relationship: 'spouse' | 'child' | 'parent' | 'sibling' | 'friend' | 'caregiver' | 'healthcare';
  avatar: string;
  permissions: {
    viewGlucose: boolean;
    viewMeals: boolean;
    viewExercise: boolean;
    viewMood: boolean;
    receiveAlerts: boolean;
    sendEncouragement: boolean;
  };
  joinedDate: string;
  lastActive: string;
  supportGiven: number;
  challengesCompleted: number;
}

interface TeamChallenge {
  id: string;
  title: string;
  description: string;
  type: 'steps' | 'hydration' | 'meals' | 'support';
  icon: any;
  duration: string;
  participants: string[];
  progress: { [memberId: string]: number };
  target: number;
  reward: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

interface CareCircleProps {
  isVisible: boolean;
  onClose: () => void;
  members?: CareCircleMember[];
  challenges?: TeamChallenge[];
  userPrivacySettings?: {
    shareGlucose: boolean;
    shareMeals: boolean;
    shareExercise: boolean;
    shareMood: boolean;
    allowEncouragement: boolean;
    emergencyContacts: string[];
  };
  onUpdatePrivacy?: (settings: any) => void;
  onInviteMember?: (email: string, relationship: string) => void;
  onJoinChallenge?: (challengeId: string) => void;
}

export default function CareCircle({ 
  isVisible, 
  onClose,
  members = [],
  challenges = [],
  userPrivacySettings = {
    shareGlucose: true,
    shareMeals: true,
    shareExercise: true,
    shareMood: false,
    allowEncouragement: true,
    emergencyContacts: []
  },
  onUpdatePrivacy,
  onInviteMember,
  onJoinChallenge
}: CareCircleProps) {
  const [activeTab, setActiveTab] = useState<'circle' | 'challenges' | 'privacy'>('circle');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', relationship: 'friend' });
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const relationshipLabels = {
    spouse: 'Life Partner',
    child: 'Child',
    parent: 'Parent',
    sibling: 'Sibling',
    friend: 'Friend',
    caregiver: 'Caregiver',
    healthcare: 'Healthcare Provider'
  };

  const relationshipEmojis = {
    spouse: '💕',
    child: '👶',
    parent: '👨‍👩‍👧‍👦',
    sibling: '👫',
    friend: '🤝',
    caregiver: '🤗',
    healthcare: '👩‍⚕️'
  };

  const handleInvite = () => {
    if (onInviteMember && inviteData.email && inviteData.relationship) {
      onInviteMember(inviteData.email, inviteData.relationship);
      setInviteData({ email: '', relationship: 'friend' });
      setShowInviteForm(false);
    }
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return '#10b981';
    if (percentage >= 75) return '#3b82f6';
    if (percentage >= 50) return '#f59e0b';
    return '#6b7280';
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Users size={24} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Care Circle</Text>
              <Text style={styles.headerSubtitle}>Your community of support and love</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'circle' && styles.activeTab]}
            onPress={() => setActiveTab('circle')}
          >
            <Users size={20} color={activeTab === 'circle' ? "#3b82f6" : "#6b7280"} />
            <Text style={[styles.tabText, activeTab === 'circle' && styles.activeTabText]}>My Circle</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'challenges' && styles.activeTab]}
            onPress={() => setActiveTab('challenges')}
          >
            <Trophy size={20} color={activeTab === 'challenges' ? "#3b82f6" : "#6b7280"} />
            <Text style={[styles.tabText, activeTab === 'challenges' && styles.activeTabText]}>Team Challenges</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'privacy' && styles.activeTab]}
            onPress={() => setActiveTab('privacy')}
          >
            <Shield size={20} color={activeTab === 'privacy' ? "#3b82f6" : "#6b7280"} />
            <Text style={[styles.tabText, activeTab === 'privacy' && styles.activeTabText]}>Privacy</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Care Circle Tab */}
          {activeTab === 'circle' && (
            <View style={styles.tabContent}>
              {/* Add Member Button */}
              <TouchableOpacity
                style={styles.addMemberButton}
                onPress={() => setShowInviteForm(true)}
              >
                <UserPlus size={20} color="#ffffff" />
                <Text style={styles.addMemberText}>Invite Someone Special</Text>
              </TouchableOpacity>

              {/* Members Grid */}
              <View style={styles.membersGrid}>
                {members.map((member) => (
                  <View key={member.id} style={styles.memberCard}>
                    <View style={styles.memberHeader}>
                      <View style={styles.memberAvatar}>
                        <Text style={styles.memberAvatarText}>
                          {relationshipEmojis[member.relationship]}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.memberName}>{member.name}</Text>
                        <Text style={styles.memberRelationship}>
                          {relationshipLabels[member.relationship]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.memberStats}>
                      <View style={styles.memberStat}>
                        <Text style={styles.statLabel}>Support Given</Text>
                        <View style={styles.statValue}>
                          <Heart size={14} color="#ef4444" />
                          <Text style={styles.statValueText}>{member.supportGiven}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.memberStat}>
                        <Text style={styles.statLabel}>Challenges</Text>
                        <View style={styles.statValue}>
                          <Trophy size={14} color="#f59e0b" />
                          <Text style={styles.statValueText}>{member.challengesCompleted}</Text>
                        </View>
                      </View>
                    </View>

                    <Text style={styles.lastActive}>Last active: {member.lastActive}</Text>

                    <View style={styles.memberActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <MessageCircle size={16} color="#3b82f6" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Phone size={16} color="#10b981" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                      >
                        <Settings size={16} color="#6b7280" />
                      </TouchableOpacity>
                    </View>

                    {/* Member Permissions */}
                    {selectedMember === member.id && (
                      <View style={styles.permissionsContainer}>
                        <Text style={styles.permissionsTitle}>Sharing Permissions</Text>
                        {Object.entries(member.permissions).map(([permission, enabled]) => (
                          <View key={permission} style={styles.permissionItem}>
                            <Text style={styles.permissionLabel}>
                              {permission.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </Text>
                            <TouchableOpacity 
                              style={[
                                styles.toggleButton,
                                enabled ? styles.toggleActive : styles.toggleInactive
                              ]}
                            >
                              <View style={[
                                styles.toggleHandle,
                                enabled ? styles.toggleHandleActive : styles.toggleHandleInactive
                              ]} />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Team Challenges Tab */}
          {activeTab === 'challenges' && (
            <View style={styles.tabContent}>
              <Text style={styles.tabTitle}>Team Challenges</Text>
              <Text style={styles.tabDescription}>Grow stronger together through shared goals</Text>

              <View style={styles.challengesList}>
                {challenges.map((challenge) => (
                  <View 
                    key={challenge.id} 
                    style={[
                      styles.challengeCard,
                      challenge.completed && styles.completedChallenge
                    ]}
                  >
                    <View style={styles.challengeHeader}>
                      <View style={styles.challengeHeaderLeft}>
                        <View style={[
                          styles.challengeIcon,
                          { backgroundColor: challenge.completed ? '#10b981' : '#3b82f6' }
                        ]}>
                          <challenge.icon size={20} color="#ffffff" />
                        </View>
                        <View>
                          <Text style={styles.challengeTitle}>{challenge.title}</Text>
                          <Text style={styles.challengeDescription}>{challenge.description}</Text>
                        </View>
                      </View>
                      
                      {challenge.completed && (
                        <View style={styles.completedBadge}>
                          <Crown size={16} color="#10b981" />
                          <Text style={styles.completedText}>Completed!</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.progressSection}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Team Progress</Text>
                        <Text style={styles.progressValue}>
                          {Object.values(challenge.progress).reduce((a, b) => a + b, 0)} / {challenge.target * challenge.participants.length}
                        </Text>
                      </View>
                      
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill,
                            { 
                              width: `${Math.min(100, (Object.values(challenge.progress).reduce((a, b) => a + b, 0) / (challenge.target * challenge.participants.length)) * 100)}%`,
                              backgroundColor: challenge.completed ? '#10b981' : '#3b82f6'
                            }
                          ]}
                        />
                      </View>
                    </View>

                    <View style={styles.participantsGrid}>
                      {challenge.participants.map((participantId) => {
                        const member = members.find(m => m.id === participantId);
                        const progress = challenge.progress[participantId] || 0;
                        const percentage = (progress / challenge.target) * 100;
                        
                        return (
                          <View key={participantId} style={styles.participantItem}>
                            <View style={styles.participantAvatar}>
                              <Text style={styles.participantAvatarText}>
                                {member?.name.charAt(0) || 'U'}
                              </Text>
                            </View>
                            <Text style={styles.participantName}>{member?.name || 'You'}</Text>
                            <View style={[
                              styles.progressBadge,
                              { backgroundColor: `${getProgressColor(progress, challenge.target)}20` }
                            ]}>
                              <Text style={[
                                styles.progressBadgeText,
                                { color: getProgressColor(progress, challenge.target) }
                              ]}>
                                {progress}/{challenge.target}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>

                    <View style={styles.challengeFooter}>
                      <View style={styles.challengeDuration}>
                        <Calendar size={14} color="#6b7280" />
                        <Text style={styles.durationText}>{challenge.duration}</Text>
                      </View>
                      
                      <View style={styles.challengeReward}>
                        <Trophy size={14} color="#8b5cf6" />
                        <Text style={styles.rewardText}>{challenge.reward}</Text>
                      </View>
                    </View>

                    {!challenge.participants.includes('user') && !challenge.completed && (
                      <TouchableOpacity
                        style={styles.joinButton}
                        onPress={() => onJoinChallenge && onJoinChallenge(challenge.id)}
                      >
                        <Text style={styles.joinButtonText}>Join Challenge</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Privacy & Sharing Tab */}
          {activeTab === 'privacy' && (
            <View style={styles.tabContent}>
              <Text style={styles.tabTitle}>Privacy & Sharing</Text>
              <Text style={styles.tabDescription}>Control what you share and with whom</Text>

              <View style={styles.privacyCard}>
                <View style={styles.privacyHeader}>
                  <Shield size={20} color="#3b82f6" />
                  <Text style={styles.privacyTitle}>Data Sharing Preferences</Text>
                </View>
                
                <View style={styles.privacySettings}>
                  {Object.entries(userPrivacySettings).map(([setting, enabled]) => {
                    if (setting === 'emergencyContacts') return null;
                    
                    return (
                      <View key={setting} style={styles.privacySetting}>
                        <View style={styles.settingInfo}>
                          <Text style={styles.settingTitle}>
                            {setting.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())}
                          </Text>
                          <Text style={styles.settingDescription}>
                            {setting === 'shareGlucose' && 'Allow care circle to see your glucose readings'}
                            {setting === 'shareMeals' && 'Share your meal logs and nutrition data'}
                            {setting === 'shareExercise' && 'Let others see your activity and exercise'}
                            {setting === 'shareMood' && 'Share mood check-ins and journal entries'}
                            {setting === 'allowEncouragement' && 'Receive supportive messages from your circle'}
                          </Text>
                        </View>
                        
                        <TouchableOpacity 
                          style={[
                            styles.toggleButton,
                            enabled ? styles.toggleActive : styles.toggleInactive
                          ]}
                          onPress={() => onUpdatePrivacy && onUpdatePrivacy({ 
                            ...userPrivacySettings, 
                            [setting]: !enabled 
                          })}
                        >
                          <View style={[
                            styles.toggleHandle,
                            enabled ? styles.toggleHandleActive : styles.toggleHandleInactive
                          ]} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={styles.emergencyCard}>
                <View style={styles.emergencyHeader}>
                  <Bell size={20} color="#ef4444" />
                  <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
                </View>
                
                <Text style={styles.emergencyDescription}>
                  These trusted contacts will be notified in case of emergency glucose events.
                </Text>
                
                <View style={styles.emergencyContacts}>
                  {userPrivacySettings.emergencyContacts.map((contactId, index) => {
                    const contact = members.find(m => m.id === contactId);
                    return contact ? (
                      <View key={contactId} style={styles.emergencyContact}>
                        <View style={styles.contactAvatar}>
                          <Text style={styles.contactAvatarText}>{contact.name.charAt(0)}</Text>
                        </View>
                        <View style={styles.contactInfo}>
                          <Text style={styles.contactName}>{contact.name}</Text>
                          <Text style={styles.contactRelationship}>
                            {relationshipLabels[contact.relationship]}
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.alertButton}>
                          <Bell size={16} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                    ) : null;
                  })}
                </View>
              </View>

              <View style={styles.privacyMessage}>
                <Text style={styles.privacyMessageTitle}>Your Privacy Matters</Text>
                <Text style={styles.privacyMessageText}>
                  You have complete control over your data. Share only what feels comfortable, 
                  and remember that you can change these settings anytime.
                </Text>
                <View style={styles.securityNote}>
                  <Lock size={14} color="#ffffff" />
                  <Text style={styles.securityNoteText}>All data is encrypted and secure</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Invite Form Modal */}
        <Modal
          visible={showInviteForm}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowInviteForm(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.inviteFormContainer}>
              <Text style={styles.inviteFormTitle}>Invite to Your Care Circle</Text>
              
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Email Address</Text>
                <TextInput
                  style={styles.formInput}
                  value={inviteData.email}
                  onChangeText={(text) => setInviteData({ ...inviteData, email: text })}
                  placeholder="their.email@example.com"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                />
              </View>
              
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Relationship</Text>
                <View style={styles.relationshipSelector}>
                  {Object.entries(relationshipLabels).map(([key, label]) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.relationshipOption,
                        inviteData.relationship === key && styles.relationshipSelected
                      ]}
                      onPress={() => setInviteData({ ...inviteData, relationship: key })}
                    >
                      <Text style={styles.relationshipEmoji}>{relationshipEmojis[key as keyof typeof relationshipEmojis]}</Text>
                      <Text style={styles.relationshipLabel}>{label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.inviteButton}
                  onPress={handleInvite}
                >
                  <Text style={styles.inviteButtonText}>Send Invitation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowInviteForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff', // Light blue background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3b82f6', // Blue header
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 4,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#dbeafe',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#3b82f6',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  tabDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  addMemberButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 30,
    marginBottom: 24,
    gap: 8,
  },
  addMemberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  membersGrid: {
    gap: 16,
  },
  memberCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  memberAvatarText: {
    fontSize: 24,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  memberRelationship: {
    fontSize: 12,
    color: '#6b7280',
  },
  memberStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  memberStat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  lastActive: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 12,
  },
  memberActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
  },
  permissionsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  permissionsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 8,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  toggleButton: {
    width: 36,
    height: 20,
    borderRadius: 10,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#10b981',
  },
  toggleInactive: {
    backgroundColor: '#d1d5db',
  },
  toggleHandle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  toggleHandleActive: {
    transform: [{ translateX: 16 }],
  },
  toggleHandleInactive: {
    transform: [{ translateX: 0 }],
  },
  challengesList: {
    gap: 16,
  },
  challengeCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedChallenge: {
    borderWidth: 2,
    borderColor: '#10b981',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  challengeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  challengeIcon: {
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  challengeDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#10b981',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  participantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  participantItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 12,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  participantAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  participantName: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 4,
  },
  progressBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  progressBadgeText: {
    fontSize: 10,
    fontWeight: '500',
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#6b7280',
  },
  challengeReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8b5cf6',
  },
  joinButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  privacyCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  privacySettings: {
    gap: 12,
  },
  privacySetting: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  emergencyCard: {
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#b91c1c',
  },
  emergencyDescription: {
    fontSize: 12,
    color: '#b91c1c',
    marginBottom: 16,
  },
  emergencyContacts: {
    gap: 8,
  },
  emergencyContact: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  contactRelationship: {
    fontSize: 12,
    color: '#6b7280',
  },
  alertButton: {
    padding: 8,
  },
  privacyMessage: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
  },
  privacyMessageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  privacyMessageText: {
    fontSize: 14,
    color: '#dbeafe',
    marginBottom: 12,
    lineHeight: 20,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  securityNoteText: {
    fontSize: 12,
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteFormContainer: {
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 20,
    borderRadius: 12,
  },
  inviteFormTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  relationshipSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relationshipOption: {
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  relationshipSelected: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  relationshipEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  relationshipLabel: {
    fontSize: 10,
    color: '#4b5563',
    textAlign: 'center',
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
  },
  inviteButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
  },
});