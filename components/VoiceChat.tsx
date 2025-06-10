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
} from 'lucide-react-native';
import { elevenLabsService } from '../services/elevenLabsService';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
  isPlaying?: boolean;
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
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setupAudio();
    }
  }, []);

  const setupAudio = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      console.error('Audio setup error:', error);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
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
        "Consider the plate method: half non-starchy vegetables, quarter lean protein, quarter complex carbohydrates."
      ],
      exercise: [
        "Light to moderate exercise like a 20-30 minute walk would be perfect right now. Your current glucose level is ideal for physical activity.",
        "Based on your glucose patterns, post-meal walks have been very effective for you. I'd recommend continuing this routine.",
        "Your glucose is stable, making this a great time for exercise. Consider resistance training or yoga for variety.",
        "Exercise timing is important. Your data shows best results with activity 1-2 hours after meals."
      ],
      general: [
        "Your overall diabetes management has been excellent. Keep up the consistent logging and monitoring.",
        "I'm analyzing your data patterns. Your time in range has improved by 5% this week - great progress!",
        "Remember to stay hydrated and maintain regular meal times. Your current routine is showing positive results.",
        "Your consistency with logging is impressive. This data helps me provide better personalized recommendations."
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('glucose') || lowerMessage.includes('blood sugar') || lowerMessage.includes('reading') || lowerMessage.includes('level')) {
      return responses.glucose[Math.floor(Math.random() * responses.glucose.length)];
    } else if (lowerMessage.includes('meal') || lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('lunch') || lowerMessage.includes('dinner') || lowerMessage.includes('breakfast') || lowerMessage.includes('carb')) {
      return responses.meal[Math.floor(Math.random() * responses.meal.length)];
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('walk') || lowerMessage.includes('activity') || lowerMessage.includes('gym')) {
      return responses.exercise[Math.floor(Math.random() * responses.exercise.length)];
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
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
      const aiResponseText = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);

      // Speak the AI response if speech is enabled
      if (isSpeechEnabled && elevenLabsService.isConfigured()) {
        await elevenLabsService.speakText(aiResponseText);
      }
    }, 1500);
  };

  const startRecording = async () => {
    try {
      if (Platform.OS === 'web') {
        Alert.alert('Voice Recording', 'Voice recording is not available on web. Please use the text input.');
        return;
      }

      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant microphone permission to use voice recording.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Recording Error', 'Failed to start voice recording.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        // For demo purposes, we'll simulate speech-to-text
        // In a real implementation, you would send the audio to a speech-to-text service
        const simulatedText = "I'd like to know about my glucose levels";
        await handleSendMessage(simulatedText);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Recording Error', 'Failed to process voice recording.');
    }
  };

  const playMessage = async (message: Message) => {
    if (!elevenLabsService.isConfigured()) {
      Alert.alert('Voice Not Available', 'ElevenLabs voice service is not configured.');
      return;
    }

    setMessages(prev =>
      prev.map(msg =>
        msg.id === message.id ? { ...msg, isPlaying: true } : msg
      )
    );

    try {
      await elevenLabsService.speakText(message.text);
    } catch (error) {
      console.error('Playback error:', error);
    } finally {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, isPlaying: false } : msg
        )
      );
    }
  };

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
              {message.type === 'ai' && elevenLabsService.isConfigured() && (
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => playMessage(message)}
                  disabled={message.isPlaying}
                >
                  {message.isPlaying ? (
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
              <Text style={styles.typingText}>AI is thinking...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message or use voice..."
          multiline
          maxLength={500}
        />
        <View style={styles.inputActions}>
          <TouchableOpacity
            style={[styles.voiceButton, isRecording && styles.voiceButtonActive]}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={Platform.OS === 'web'}
          >
            {isRecording ? (
              <MicOff size={20} color="#ffffff" />
            ) : (
              <Mic size={20} color={Platform.OS === 'web' ? "#9ca3af" : "#ffffff"} />
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

      {!elevenLabsService.isConfigured() && (
        <View style={styles.configWarning}>
          <Text style={styles.configWarningText}>
            Configure ElevenLabs API key for voice features
          </Text>
        </View>
      )}
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
  configWarning: {
    backgroundColor: '#fef3c7',
    padding: 8,
    alignItems: 'center',
  },
  configWarningText: {
    fontSize: 12,
    color: '#92400e',
  },
});