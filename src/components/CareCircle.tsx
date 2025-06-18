import React, { useState } from 'react';
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
  Video,
  Gift,
  Star,
  Crown,
  Sparkles,
  Flower,
  TreePine,
  Mountain,
  Waves
} from 'lucide-react';

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
  members: CareCircleMember[];
  challenges: TeamChallenge[];
  userPrivacySettings: {
    shareGlucose: boolean;
    shareMeals: boolean;
    shareExercise: boolean;
    shareMood: boolean;
    allowEncouragement: boolean;
    emergencyContacts: string[];
  };
  onUpdatePrivacy: (settings: any) => void;
  onInviteMember: (email: string, relationship: string) => void;
  onJoinChallenge: (challengeId: string) => void;
}

const CareCircle: React.FC<CareCircleProps> = ({
  members,
  challenges,
  userPrivacySettings,
  onUpdatePrivacy,
  onInviteMember,
  onJoinChallenge
}) => {
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
    if (inviteData.email && inviteData.relationship) {
      onInviteMember(inviteData.email, inviteData.relationship);
      setInviteData({ email: '', relationship: 'friend' });
      setShowInviteForm(false);
    }
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-blue-600 bg-blue-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 bg-white bg-opacity-80 rounded-full px-6 py-3 backdrop-blur-sm">
          <Users className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Care Circle</h1>
            <p className="text-sm text-gray-600">Your community of support and love</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white bg-opacity-80 rounded-full p-1 backdrop-blur-sm">
          {[
            { id: 'circle', label: 'My Circle', icon: Users },
            { id: 'challenges', label: 'Team Challenges', icon: Trophy },
            { id: 'privacy', label: 'Privacy & Sharing', icon: Shield }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Care Circle Tab */}
      {activeTab === 'circle' && (
        <div className="space-y-6">
          {/* Add Member Button */}
          <div className="text-center">
            <button
              onClick={() => setShowInviteForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Invite Someone Special</span>
              </div>
            </button>
          </div>

          {/* Invite Form Modal */}
          {showInviteForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite to Your Care Circle</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={inviteData.email}
                      onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="their.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <select
                      value={inviteData.relationship}
                      onChange={(e) => setInviteData({ ...inviteData, relationship: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(relationshipLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleInvite}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Invitation
                  </button>
                  <button
                    onClick={() => setShowInviteForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white bg-opacity-80 rounded-2xl p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-3">
                    {relationshipEmojis[member.relationship]}
                  </div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{relationshipLabels[member.relationship]}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Support Given</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="font-medium">{member.supportGiven}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Challenges</span>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{member.challengesCompleted}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Last active: {member.lastActive}
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                    <MessageCircle className="h-4 w-4 mx-auto" />
                  </button>
                  <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition-colors">
                    <Phone className="h-4 w-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Settings className="h-4 w-4 mx-auto" />
                  </button>
                </div>

                {/* Member Permissions */}
                {selectedMember === member.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Sharing Permissions</h4>
                    <div className="space-y-2">
                      {Object.entries(member.permissions).map(([permission, enabled]) => (
                        <div key={permission} className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 capitalize">
                            {permission.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                          <div className={`w-8 h-4 rounded-full transition-colors ${
                            enabled ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                              enabled ? 'translate-x-4' : 'translate-x-0.5'
                            } mt-0.5`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Team Challenges</h2>
            <p className="text-gray-600">Grow stronger together through shared goals</p>
          </div>

          <div className="grid gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`bg-white bg-opacity-80 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
                  challenge.completed ? 'ring-2 ring-green-400' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${
                      challenge.completed ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      <challenge.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </div>
                  </div>
                  
                  {challenge.completed && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Crown className="h-5 w-5" />
                      <span className="text-sm font-medium">Completed!</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Team Progress</span>
                    <span className="font-medium">
                      {Object.values(challenge.progress).reduce((a, b) => a + b, 0)} / {challenge.target * challenge.participants.length}
                    </span>
                  </div>
                  
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        challenge.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ 
                        width: `${Math.min(100, (Object.values(challenge.progress).reduce((a, b) => a + b, 0) / (challenge.target * challenge.participants.length)) * 100)}%` 
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {challenge.participants.map((participantId) => {
                    const member = members.find(m => m.id === participantId);
                    const progress = challenge.progress[participantId] || 0;
                    const percentage = (progress / challenge.target) * 100;
                    
                    return (
                      <div key={participantId} className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium mx-auto mb-2">
                          {member?.name.charAt(0) || 'U'}
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{member?.name || 'You'}</p>
                        <div className={`text-xs px-2 py-1 rounded-full ${getProgressColor(progress, challenge.target)}`}>
                          {progress}/{challenge.target}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {challenge.duration}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Gift className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700">{challenge.reward}</span>
                  </div>
                </div>

                {!challenge.participants.includes('user') && !challenge.completed && (
                  <button
                    onClick={() => onJoinChallenge(challenge.id)}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Join Challenge
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy & Sharing Tab */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Privacy & Sharing</h2>
            <p className="text-gray-600">Control what you share and with whom</p>
          </div>

          <div className="bg-white bg-opacity-80 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Data Sharing Preferences
            </h3>
            
            <div className="space-y-4">
              {Object.entries(userPrivacySettings).map(([setting, enabled]) => {
                if (setting === 'emergencyContacts') return null;
                
                return (
                  <div key={setting} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {setting.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {setting === 'shareGlucose' && 'Allow care circle to see your glucose readings'}
                        {setting === 'shareMeals' && 'Share your meal logs and nutrition data'}
                        {setting === 'shareExercise' && 'Let others see your activity and exercise'}
                        {setting === 'shareMood' && 'Share mood check-ins and journal entries'}
                        {setting === 'allowEncouragement' && 'Receive supportive messages from your circle'}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => onUpdatePrivacy({ ...userPrivacySettings, [setting]: !enabled })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-0.5'
                      } mt-0.5`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white bg-opacity-80 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-red-600" />
              Emergency Contacts
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              These trusted contacts will be notified in case of emergency glucose events.
            </p>
            
            <div className="space-y-3">
              {userPrivacySettings.emergencyContacts.map((contactId, index) => {
                const contact = members.find(m => m.id === contactId);
                return (
                  <div key={contactId} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
                        {contact?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{contact?.name}</p>
                        <p className="text-xs text-gray-600">{relationshipLabels[contact?.relationship || 'friend']}</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <Bell className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Your Privacy Matters</h3>
            <p className="text-sm opacity-90 mb-4">
              You have complete control over your data. Share only what feels comfortable, 
              and remember that you can change these settings anytime.
            </p>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span className="text-sm">All data is encrypted and secure</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareCircle;