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
  MessageCircle,
  Users,
  Heart,
  ThumbsUp,
  Send,
  Bot,
  Mic,
  Volume2,
} from 'lucide-react-native';
import VoiceChat from '../../components/VoiceChat';

export default function CommunityTab() {
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hello! I'm FlowSense AI, your diabetes management assistant. I can help you with glucose patterns, meal suggestions, exercise recommendations, and answer any health questions you have.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const communityPosts = [
    {
      user: 'Sarah M.',
      avatar: 'SM',
      time: '2h ago',
      content: 'Just hit my 30-day streak! My pet is so happy and I feel amazing. This app has changed my life! 🎉',
      likes: 12,
      comments: 3,
      category: 'milestone'
    },
    {
      user: 'Mike R.',
      avatar: 'MR',
      time: '4h ago',
      content: 'Anyone have tips for managing glucose during exercise? My readings spike after workouts.',
      likes: 8,
      comments: 7,
      category: 'question'
    },
    {
      user: 'Dr. Lisa',
      avatar: 'DL',
      time: '6h ago',
      content: 'Remember: small consistent changes lead to big results. Your pet companion is there to remind you that every healthy choice matters! 💚',
      likes: 24,
      comments: 5,
      category: 'tip',
      verified: true
    }
  ];

  const generateAIResponse = (userMessage: string) => {
    const responses = {
      glucose: [
        "Based on your recent patterns, your glucose levels have been stable. The reading of 94 mg/dL is excellent and within your target range.",
        "Your glucose trends show good control. Consider maintaining your current meal timing and portion sizes.",
        "I notice your glucose has been consistently in range. This suggests your current management strategy is working well.",
        "Your glucose variability has decreased this week, which is a great sign of improved control."
      ],
      meal: [
        "For stable glucose levels, I recommend focusing on lean proteins, non-starchy vegetables, and complex carbohydrates. A grilled chicken salad with quinoa would be ideal.",
        "Based on your current glucose reading, a balanced meal with 15-20g of carbs would be appropriate. Consider adding fiber-rich vegetables.",
        "Your meal timing looks good. For your next meal, try pairing carbohydrates with protein to help maintain stable glucose levels.",
        "Consider the plate method: 1/2 non-starchy vegetables, 1/4 lean protein, 1/4 complex carbohydrates."
      ],
      exercise: [
        "Light to moderate exercise like a 20-30 minute walk would be perfect right now. Your current glucose level is ideal for physical activity.",
        "Based on your glucose patterns, post-meal walks have been very effective for you. I'd recommend continuing this routine.",
        "Your glucose is stable, making this a great time for exercise. Consider resistance training or yoga for variety.",
        "Exercise timing is important. Your data shows best results with activity 1-2 hours after meals."
      ],
      community: [
        "The community here is incredibly supportive! Sharing your experiences helps others on their diabetes journey.",
        "I see you're engaging with the community - that's fantastic for motivation and learning from others' experiences.",
        "Community support is proven to improve diabetes outcomes. Keep sharing and learning from others!",
        "Your participation in the community helps create a supportive environment for everyone managing diabetes."
      ],
      general: [
        "Your overall diabetes management has been excellent. Keep up the consistent logging and monitoring.",
        "I'm analyzing your data patterns. Your time in range has improved by 5% this week - great progress!",
        "Remember to stay hydrated and maintain regular meal times. Your current routine is showing positive results.",
        "Your consistency with logging is impressive. This data helps me provide better personalized recommendations.",
        "Based on your patterns, you're doing an excellent job managing your diabetes. Keep up the great work!"
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('glucose') || lowerMessage.includes('blood sugar') || lowerMessage.includes('reading') || lowerMessage.includes('level')) {
      return responses.glucose[Math.floor(Math.random() * responses.glucose.length)];
    } else if (lowerMessage.includes('meal') || lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('lunch') || lowerMessage.includes('dinner') || lowerMessage.includes('breakfast') || lowerMessage.includes('carb')) {
      return responses.meal[Math.floor(Math.random() * responses.meal.length)];
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('walk') || lowerMessage.includes('activity') || lowerMessage.includes('gym')) {
      return responses.exercise[Math.floor(Math.random() * responses.exercise.length)];
    } else if (lowerMessage.includes('community') || lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('share')) {
      return responses.community[Math.floor(Math.random() * responses.community.length)];
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
  };

  const handleChatSubmit = () => {
    if (!chatMessage.trim()) return;

    const userMsg = {
      type: 'user',
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        message: generateAIResponse(chatMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatHistory(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "How can I connect with others?",
    "What should I share with the community?",
    "Tips for staying motivated?",
    "How to help other members?",
    "Best practices for glucose control?",
    "Meal ideas for stable levels?"
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* PROMINENT AI Chat Quick Access - First Thing Users See */}
        <View style={styles.prominentAiChatSection}>
          <View style={styles.prominentAiHeader}>
            <View style={styles.prominentAiIcon}>
              <Bot size={28} color="#ffffff" />
            </View>
            <View style={styles.prominentAiInfo}>
              <Text style={styles.prominentAiTitle}>🤖 FlowSense AI Assistant</Text>
              <Text style={styles.prominentAiSubtitle}>Your 24/7 health companion with voice support</Text>
            </View>
          </View>
          <View style={styles.prominentAiButtons}>
            <TouchableOpacity 
              style={[styles.prominentAiButton, styles.prominentVoiceButton]}
              onPress={() => setShowVoiceChat(true)}
            >
              <Mic size={20} color="#ffffff" />
              <Text style={styles.prominentAiButtonText}>🎤 Voice Chat</Text>
              <Text style={styles.prominentAiButtonSubtext}>Speech-to-Speech</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.prominentAiButton, styles.prominentTextButton]}
              onPress={() => setShowAIChat(true)}
            >
              <MessageCircle size={20} color="#ffffff" />
              <Text style={styles.prominentAiButtonText}>💬 Text Chat</Text>
              <Text style={styles.prominentAiButtonSubtext}>Type & Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Community Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Community</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Users size={20} color="#1e293b" />
              </View>
              <Text style={styles.statValue}>12.5K</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <MessageCircle size={20} color="#1e293b" />
              </View>
              <Text style={styles.statValue}>1.2K</Text>
              <Text style={styles.statLabel}>Online</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Heart size={20} color="#1e293b" />
              </View>
              <Text style={styles.statValue}>8.9K</Text>
              <Text style={styles.statLabel}>Support given</Text>
            </View>
          </View>
        </View>

        {/* Community Feed */}
        <View style={styles.feedContainer}>
          {communityPosts.map((post, index) => (
            <View key={index} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{post.avatar}</Text>
                </View>
                <View style={styles.postInfo}>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{post.user}</Text>
                    {post.verified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>✓</Text>
                      </View>
                    )}
                    <Text style={styles.postTime}>{post.time}</Text>
                  </View>
                  <View style={[styles.categoryBadge, 
                    post.category === 'milestone' && styles.milestoneBadge,
                    post.category === 'question' && styles.questionBadge,
                    post.category === 'tip' && styles.tipBadge
                  ]}>
                    <Text style={styles.categoryText}>{post.category}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Heart size={16} color="#6b7280" />
                  <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MessageCircle size={16} color="#6b7280" />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Post */}
        <View style={styles.quickPostContainer}>
          <View style={styles.quickPostHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>S</Text>
            </View>
            <TextInput 
              style={styles.quickPostInput}
              placeholder="Share your progress or ask a question..."
              multiline
            />
          </View>
          <TouchableOpacity style={styles.postButton}>
            <Send size={16} color="#ffffff" />
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
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

      {/* Text AI Chat Modal */}
      <Modal
        visible={showAIChat}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.chatModal}>
            <View style={styles.chatHeader}>
              <View style={styles.chatHeaderLeft}>
                <View style={styles.chatAiIcon}>
                  <Bot size={20} color="#ffffff" />
                </View>
                <View>
                  <Text style={styles.chatTitle}>FlowSense AI</Text>
                  <Text style={styles.chatSubtitle}>Your intelligent health assistant</Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => setShowAIChat(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.chatHistory}>
              {chatHistory.map((msg, index) => (
                <View key={index} style={[
                  styles.chatMessage,
                  msg.type === 'user' ? styles.userChatMessage : styles.aiChatMessage
                ]}>
                  <Text style={[
                    styles.chatMessageText,
                    msg.type === 'user' ? styles.userChatText : styles.aiChatText
                  ]}>
                    {msg.message}
                  </Text>
                  <Text style={[
                    styles.chatTimestamp,
                    msg.type === 'user' ? styles.userTimestamp : styles.aiTimestamp
                  ]}>
                    {msg.timestamp}
                  </Text>
                </View>
              ))}
              
              {isTyping && (
                <View style={[styles.chatMessage, styles.aiChatMessage]}>
                  <Text style={styles.typingText}>AI is thinking...</Text>
                </View>
              )}
            </ScrollView>
            
            <View style={styles.quickQuestions}>
              <Text style={styles.quickQuestionsTitle}>Quick questions:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {quickQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setChatMessage(question)}
                    style={styles.quickQuestionButton}
                  >
                    <Text style={styles.quickQuestionText}>{question}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.chatInput}>
              <TextInput
                value={chatMessage}
                onChangeText={setChatMessage}
                style={styles.chatTextInput}
                placeholder="Ask me anything about your health..."
                multiline
              />
              <TouchableOpacity
                onPress={handleChatSubmit}
                disabled={!chatMessage.trim()}
                style={[styles.sendButton, !chatMessage.trim() && styles.sendButtonDisabled]}
              >
                <Send size={16} color="#ffffff" />
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
    padding: 16,
  },
  prominentAiChatSection: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  prominentAiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  prominentAiIcon: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  prominentAiInfo: {
    flex: 1,
  },
  prominentAiTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  prominentAiSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  prominentAiButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  prominentAiButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  prominentVoiceButton: {
    backgroundColor: '#3b82f6',
  },
  prominentTextButton: {
    backgroundColor: '#059669',
  },
  prominentAiButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  prominentAiButtonSubtext: {
    color: '#e2e8f0',
    fontSize: 12,
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  feedContainer: {
    marginBottom: 24,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  postInfo: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontWeight: '500',
    color: '#1f2937',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  milestoneBadge: {
    backgroundColor: '#dcfce7',
  },
  questionBadge: {
    backgroundColor: '#dbeafe',
  },
  tipBadge: {
    backgroundColor: '#f3f4f6',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374151',
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#6b7280',
  },
  quickPostContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickPostHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  quickPostInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 40,
  },
  postButton: {
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  postButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatModal: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e293b',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatAiIcon: {
    backgroundColor: '#475569',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  chatSubtitle: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  chatHistory: {
    maxHeight: 300,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  chatMessage: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    maxWidth: '85%',
  },
  userChatMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1e293b',
  },
  aiChatMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chatMessageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userChatText: {
    color: '#ffffff',
  },
  aiChatText: {
    color: '#374151',
  },
  chatTimestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: '#cbd5e1',
  },
  aiTimestamp: {
    color: '#6b7280',
  },
  typingText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  quickQuestions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  quickQuestionsTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  quickQuestionButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  quickQuestionText: {
    fontSize: 12,
    color: '#374151',
  },
  chatInput: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'flex-end',
  },
  chatTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
});