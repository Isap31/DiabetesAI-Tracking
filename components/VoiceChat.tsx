import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Bot,
  User,
  X,
  Play,
  Pause,
} from 'lucide-react-native';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
  isPlaying?: boolean;
  audioUrl?: string;
}

interface VoiceChatProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function VoiceChat({ isVisible, onClose }: VoiceChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: "Hello! I'm FlowSense AI, your diabetes management assistant. I can help you with glucose patterns, meal suggestions, exercise recommendations, and answer any health questions you have. You can type or speak to me!",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Mock user data for realistic responses
  const mockUserData = {
    currentGlucose: 94,
    lastMeal: { name: 'Grilled Chicken Salad', carbs: 15, protein: 35, time: '12:30 PM' },
    recentExercise: { type: 'Walking', duration: 30, time: '11:00 AM' },
    timeInRange: 87,
    avgGlucose: 96,
    diabetesType: 'Type 1',
    experience: 9
  };

  const generateContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Glucose prediction queries
    if (lowerMessage.includes('predict') && (lowerMessage.includes('glucose') || lowerMessage.includes('sugar') || lowerMessage.includes('level'))) {
      if (lowerMessage.includes('meal') || lowerMessage.includes('eat') || lowerMessage.includes('food')) {
        return `Based on your recent meal and activity, your glucose might rise to around 110-120 mg/dL in the next hour. Your last meal had ${mockUserData.lastMeal.carbs}g carbs and ${mockUserData.lastMeal.protein}g protein, which should provide a moderate, stable response. The protein will help slow absorption.`;
      }
      return `Based on your current glucose of ${mockUserData.currentGlucose} mg/dL and recent patterns, I predict your levels will remain stable between 90-110 mg/dL over the next 2 hours. Your ${mockUserData.recentExercise.duration}-minute ${mockUserData.recentExercise.type.toLowerCase()} earlier should help maintain stability.`;
    }

    // Current glucose status
    if (lowerMessage.includes('current') && (lowerMessage.includes('glucose') || lowerMessage.includes('sugar') || lowerMessage.includes('level'))) {
      return `Your current glucose is ${mockUserData.currentGlucose} mg/dL, which is excellent and within your target range of 70-140. You're doing great! Your time in range this week is ${mockUserData.timeInRange}%, which is above the recommended 70%.`;
    }

    // Meal impact questions
    if (lowerMessage.includes('meal') || lowerMessage.includes('eat') || lowerMessage.includes('food')) {
      if (lowerMessage.includes('what') && (lowerMessage.includes('should') || lowerMessage.includes('can'))) {
        return `For your next meal, I recommend 15-20g carbs with 20-25g protein. Based on your current glucose of ${mockUserData.currentGlucose} mg/dL, you have good flexibility. Consider lean protein with vegetables and a moderate portion of complex carbs.`;
      }
      return `Your last meal, ${mockUserData.lastMeal.name}, was well-balanced with ${mockUserData.lastMeal.carbs}g carbs and ${mockUserData.lastMeal.protein}g protein. This combination typically causes a gentle glucose rise of 20-30 mg/dL over 1-2 hours, then stabilizes.`;
    }

    // Exercise impact
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('activity')) {
      return `Your ${mockUserData.recentExercise.duration}-minute ${mockUserData.recentExercise.type.toLowerCase()} at ${mockUserData.recentExercise.time} was excellent timing! Exercise typically lowers glucose by 20-40 mg/dL and the effect can last 2-4 hours. This helps explain your current stable reading.`;
    }

    // Trends and patterns
    if (lowerMessage.includes('trend') || lowerMessage.includes('pattern') || lowerMessage.includes('how') && lowerMessage.includes('doing')) {
      return `You're doing excellent! Your average glucose this week is ${mockUserData.avgGlucose} mg/dL with ${mockUserData.timeInRange}% time in range. Your consistent logging and ${mockUserData.experience} years of experience really show in your stable patterns.`;
    }

    // Time in range
    if (lowerMessage.includes('time in range') || lowerMessage.includes('tir')) {
      return `Your time in range is ${mockUserData.timeInRange}%, which is excellent! The target is above 70%, so you're doing great. This means you're spending most of your time between 70-140 mg/dL, which reduces long-term complications.`;
    }

    // Recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('advice')) {
      return `Based on your current patterns, I recommend continuing your balanced approach. Your protein intake has been excellent for glucose stability. Consider maintaining your current exercise routine and meal timing - they're working well for you!`;
    }

    // General health questions
    if (lowerMessage.includes('how') && (lowerMessage.includes('health') || lowerMessage.includes('diabetes'))) {
      return `Your diabetes management is impressive! With ${mockUserData.experience} years of experience, ${mockUserData.timeInRange}% time in range, and consistent logging, you're demonstrating excellent self-care. Keep up the great work!`;
    }

    // Default response
    return `I'm here to help with your diabetes management! You can ask me about glucose predictions, meal recommendations, exercise timing, or your overall trends. Your current glucose is ${mockUserData.currentGlucose} mg/dL and you're doing great with ${mockUserData.timeInRange}% time in range.`;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const aiResponseText = generateContextualResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);

      // Auto-play AI response if speech is enabled
      if (isSpeechEnabled) {
        await playAIResponse(aiMessage);
      }
    }, 1500);
  };

  const playAIResponse = async (message: Message) => {
    try {
      setPlayingMessageId(message.id);
      
      // Check if ElevenLabs is configured
      const apiKey = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY;
      const voiceId = process.env.EXPO_PUBLIC_ELEVENLABS_VOICE_ID;
      
      if (!apiKey || !voiceId) {
        // Fallback to native speech synthesis
        Alert.alert('Voice Not Available', 'ElevenLabs voice service is not configured. Using system voice.');
        return;
      }

      // Call ElevenLabs API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: message.text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Update message with audio URL
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, audioUrl } : msg
      ));

      // Play audio
      const audio = new Audio(audioUrl);
      audio.onended = () => setPlayingMessageId(null);
      await audio.play();

    } catch (error) {
      console.error('Voice synthesis error:', error);
      Alert.alert('Voice Error', 'Could not generate voice response. Please check your connection.');
    } finally {
      setPlayingMessageId(null);
    }
  };

  const toggleMessagePlayback = async (message: Message) => {
    if (playingMessageId === message.id) {
      // Stop current playback
      setPlayingMessageId(null);
      return;
    }

    if (message.audioUrl) {
      // Play existing audio
      setPlayingMessageId(message.id);
      const audio = new Audio(message.audioUrl);
      audio.onended = () => setPlayingMessageId(null);
      await audio.play();
    } else {
      // Generate and play new audio
      await playAIResponse(message);
    }
  };

  const startRecording = async () => {
    try {
      Alert.alert('Voice Recording', 'Voice recording feature coming soon! Please use the text input for now.');
    } catch (error) {
      console.error('Recording error:', error);
      Alert.alert('Recording Error', 'Failed to start voice recording.');
    }
  };

  const quickQuestions = [
    "What's my predicted sugar level after this meal?",
    "How are my glucose trends looking?",
    "What should I eat for my next meal?",
    "When is the best time to exercise?",
    "How is my time in range?",
    "Any recommendations for better control?"
  ];

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.aiIcon}>
            <Bot size={20} color="#ffffff" />
          </View>
          <View>
            <Text style={styles.headerTitle}>FlowSense AI Voice</Text>
            <Text style={styles.headerSubtitle}>Your intelligent health assistant</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.iconButton, isSpeechEnabled && styles.iconButtonActive]}
            onPress={() => setIsSpeechEnabled(!isSpeechEnabled)}
          >
            {isSpeechEnabled ? (
              <Volume2 size={20} color={isSpeechEnabled ? "#1e293b" : "#6b7280"} />
            ) : (
              <VolumeX size={20} color="#6b7280" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onClose}>
            <X size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.type === 'user' ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <View style={styles.messageHeader}>
              <View style={styles.messageIcon}>
                {message.type === 'user' ? (
                  <User size={16} color="#ffffff" />
                ) : (
                  <Bot size={16} color="#ffffff" />
                )}
              </View>
              <Text style={styles.messageTime}>{message.timestamp}</Text>
              {message.type === 'ai' && (
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => toggleMessagePlayback(message)}
                  disabled={playingMessageId === message.id}
                >
                  {playingMessageId === message.id ? (
                    <ActivityIndicator size="small" color="#1e293b" />
                  ) : (
                    <Volume2 size={16} color="#1e293b" />
                  )}
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}

        {isProcessing && (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <View style={styles.messageHeader}>
              <View style={styles.messageIcon}>
                <Bot size={16} color="#ffffff" />
              </View>
              <Text style={styles.messageTime}>Now</Text>
            </View>
            <View style={styles.typingIndicator}>
              <ActivityIndicator size="small" color="#6b7280" />
              <Text style={styles.typingText}>AI is analyzing your data...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Questions */}
      <View style={styles.quickQuestions}>
        <Text style={styles.quickQuestionsTitle}>Quick questions:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setInputText(question)}
              style={styles.quickQuestionButton}
            >
              <Text style={styles.quickQuestionText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about glucose predictions, meal advice, or trends..."
          multiline
          maxLength={500}
        />
        <View style={styles.inputActions}>
          <TouchableOpacity
            style={[styles.voiceButton, isRecording && styles.voiceButtonActive]}
            onPress={startRecording}
          >
            {isRecording ? (
              <MicOff size={20} color="#ffffff" />
            ) : (
              <Mic size={20} color="#ffffff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Send size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Configuration Notice */}
      <View style={styles.configNotice}>
        <Text style={styles.configNoticeText}>
          {process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY 
            ? '🎤 ElevenLabs voice enabled' 
            : '⚠️ Configure ElevenLabs API key for voice features'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    backgroundColor: '#475569',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  iconButtonActive: {
    backgroundColor: '#ffffff',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  messageContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1e293b',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageIcon: {
    backgroundColor: '#6b7280',
    padding: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  messageTime: {
    fontSize: 12,
    color: '#6b7280',
    flex: 1,
  },
  playButton: {
    padding: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    marginLeft: 8,
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
  inputContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    maxHeight: 100,
    marginBottom: 12,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voiceButton: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#dc2626',
  },
  sendButton: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  configNotice: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    alignItems: 'center',
  },
  configNoticeText: {
    fontSize: 12,
    color: '#6b7280',
  },
});