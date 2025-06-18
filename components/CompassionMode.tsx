import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Heart,
  Moon,
  Star,
  Flower,
  Waves,
  Cloud,
  Sun,
  Sparkles,
  Leaf,
  Mountain,
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react-native';

interface CompassionModeProps {
  isVisible: boolean;
  onClose: () => void;
  userMood?: 'struggling' | 'overwhelmed' | 'disappointed' | 'anxious' | 'tired';
  recentChallenge?: string;
}

export default function CompassionMode({ 
  isVisible, 
  onClose, 
  userMood = 'struggling',
  recentChallenge
}: CompassionModeProps) {
  const [currentPoem, setCurrentPoem] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedSoundscape, setSelectedSoundscape] = useState<string | null>(null);
  const [showBreathingGuide, setShowBreathingGuide] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);

  // Gentle poems and affirmations for difficult moments
  const healingPoetry = [
    {
      title: "This Moment",
      verses: [
        "This moment is not your forever,",
        "Though it feels heavy now.",
        "You have weathered storms before,",
        "And you will find your way somehow."
      ],
      author: "For your brave heart"
    },
    {
      title: "Gentle Reminder",
      verses: [
        "Your worth is not measured",
        "By numbers on a screen.",
        "You are more than glucose readings,",
        "More than what they mean."
      ],
      author: "For your whole self"
    },
    {
      title: "Tomorrow's Promise",
      verses: [
        "Tomorrow holds new chances,",
        "Fresh starts and gentle grace.",
        "Today's struggles are not failures,",
        "Just steps in your own pace."
      ],
      author: "For your journey"
    },
    {
      title: "You Are Enough",
      verses: [
        "In this moment, as you are,",
        "With all your human flaws,",
        "You are worthy of love and kindness,",
        "Deserving of applause."
      ],
      author: "For your spirit"
    }
  ];

  // Mood-specific gentle messages
  const compassionateMessages = {
    struggling: {
      message: "I see you trying, even when it's hard. Your effort matters more than perfect results.",
      color: "#7c3aed",
      icon: Heart
    },
    overwhelmed: {
      message: "Take a deep breath. You don't have to carry everything at once. One small step is enough.",
      color: "#0ea5e9",
      icon: Waves
    },
    disappointed: {
      message: "Disappointment shows you care deeply. That caring heart is your strength, not your weakness.",
      color: "#ec4899",
      icon: Flower
    },
    anxious: {
      message: "Your feelings are valid. Anxiety is your mind trying to protect you. You are safe right now.",
      color: "#8b5cf6",
      icon: Moon
    },
    tired: {
      message: "Rest is not giving up. Rest is how you gather strength for tomorrow's possibilities.",
      color: "#6366f1",
      icon: Star
    }
  };

  // Calming soundscapes
  const soundscapes = [
    { id: 'rain', name: 'Gentle Rain', icon: Cloud, description: 'Soft rainfall on leaves' },
    { id: 'ocean', name: 'Ocean Waves', icon: Waves, description: 'Rhythmic waves on shore' },
    { id: 'forest', name: 'Forest Whispers', icon: Leaf, description: 'Wind through trees' },
    { id: 'birds', name: 'Morning Birds', icon: Sun, description: 'Peaceful bird songs' },
    { id: 'stream', name: 'Babbling Brook', icon: Mountain, description: 'Flowing water sounds' }
  ];

  // Breathing exercise timer
  useEffect(() => {
    if (showBreathingGuide) {
      const timer = setInterval(() => {
        setBreathingCount(prev => {
          if (prev === 1) {
            setBreathingPhase(current => {
              if (current === 'inhale') return 'hold';
              if (current === 'hold') return 'exhale';
              return 'inhale';
            });
            return breathingPhase === 'hold' ? 2 : 4; // Hold for 2, inhale/exhale for 4
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showBreathingGuide, breathingPhase]);

  const currentMessage = compassionateMessages[userMood];

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.headerIcon}>
                  <Heart size={24} color="#ffffff" />
                </View>
                <View>
                  <Text style={styles.headerTitle}>Compassion Mode</Text>
                  <Text style={styles.headerSubtitle}>A gentle space for your heart</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Personalized Message */}
            <View style={[styles.messageCard, { backgroundColor: currentMessage.color }]}>
              <View style={styles.messageIconContainer}>
                <currentMessage.icon size={32} color="#ffffff" />
              </View>
              <Text style={styles.messageText}>{currentMessage.message}</Text>
              {recentChallenge && (
                <Text style={styles.challengeText}>
                  I noticed you're working through: {recentChallenge}
                </Text>
              )}
            </View>

            {/* Breathing Exercise */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Gentle Breathing</Text>
              
              {!showBreathingGuide ? (
                <View style={styles.breathingIntro}>
                  <Text style={styles.breathingText}>
                    Let's breathe together. A simple practice to find your center.
                  </Text>
                  <TouchableOpacity 
                    style={styles.breathingButton}
                    onPress={() => setShowBreathingGuide(true)}
                  >
                    <Text style={styles.breathingButtonText}>Begin Breathing Exercise</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.breathingGuide}>
                  <View style={styles.breathingCircleContainer}>
                    <View style={[
                      styles.breathingCircle,
                      breathingPhase === 'inhale' && styles.breathingCircleInhale,
                      breathingPhase === 'hold' && styles.breathingCircleHold,
                      breathingPhase === 'exhale' && styles.breathingCircleExhale
                    ]}>
                      <Text style={styles.breathingPhaseText}>{breathingPhase}</Text>
                      <Text style={styles.breathingCountText}>{breathingCount}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.breathingInstructionText}>
                    {breathingPhase === 'inhale' && 'Breathe in slowly and deeply...'}
                    {breathingPhase === 'hold' && 'Hold gently...'}
                    {breathingPhase === 'exhale' && 'Release and let go...'}
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.breathingFinishButton}
                    onPress={() => setShowBreathingGuide(false)}
                  >
                    <Text style={styles.breathingFinishText}>Finish Exercise</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Poetry Section */}
            <View style={styles.sectionCard}>
              <View style={styles.poetryHeader}>
                <Text style={styles.sectionTitle}>Healing Words</Text>
                <View style={styles.poetryNavigation}>
                  <TouchableOpacity 
                    style={styles.poetryNavButton}
                    onPress={() => setCurrentPoem(Math.max(0, currentPoem - 1))}
                    disabled={currentPoem === 0}
                  >
                    <Text style={[
                      styles.poetryNavButtonText,
                      currentPoem === 0 && styles.poetryNavButtonDisabled
                    ]}>←</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.poetryNavButton}
                    onPress={() => setCurrentPoem(Math.min(healingPoetry.length - 1, currentPoem + 1))}
                    disabled={currentPoem === healingPoetry.length - 1}
                  >
                    <Text style={[
                      styles.poetryNavButtonText,
                      currentPoem === healingPoetry.length - 1 && styles.poetryNavButtonDisabled
                    ]}>→</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.poemContainer}>
                <Text style={styles.poemTitle}>{healingPoetry[currentPoem].title}</Text>
                {healingPoetry[currentPoem].verses.map((verse, index) => (
                  <Text key={index} style={styles.poemVerse}>{verse}</Text>
                ))}
                <Text style={styles.poemAuthor}>— {healingPoetry[currentPoem].author}</Text>
              </View>
            </View>

            {/* Soundscape Section */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Calming Sounds</Text>
              
              <View style={styles.soundscapeGrid}>
                {soundscapes.map((soundscape) => (
                  <TouchableOpacity
                    key={soundscape.id}
                    style={[
                      styles.soundscapeCard,
                      selectedSoundscape === soundscape.id && styles.soundscapeCardSelected
                    ]}
                    onPress={() => setSelectedSoundscape(
                      selectedSoundscape === soundscape.id ? null : soundscape.id
                    )}
                  >
                    <View style={styles.soundscapeIconContainer}>
                      <soundscape.icon size={24} color="#ffffff" />
                    </View>
                    <Text style={styles.soundscapeName}>{soundscape.name}</Text>
                    <Text style={styles.soundscapeDescription}>{soundscape.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {selectedSoundscape && (
                <View style={styles.audioControls}>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => setIsPlayingAudio(!isPlayingAudio)}
                  >
                    {isPlayingAudio ? (
                      <Pause size={24} color="#ffffff" />
                    ) : (
                      <Play size={24} color="#ffffff" />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.audioStatusText}>
                    {isPlayingAudio ? 'Playing' : 'Paused'} • {soundscapes.find(s => s.id === selectedSoundscape)?.name}
                  </Text>
                </View>
              )}
            </View>

            {/* Gentle Reminders */}
            <View style={styles.remindersCard}>
              <Text style={styles.sectionTitle}>Gentle Reminders</Text>
              
              <View style={styles.remindersGrid}>
                <View style={styles.reminderItem}>
                  <Star size={20} color="#fcd34d" />
                  <Text style={styles.reminderText}>
                    Progress isn't always linear. Some days are for rest and recovery.
                  </Text>
                </View>
                
                <View style={styles.reminderItem}>
                  <Heart size={20} color="#fb7185" />
                  <Text style={styles.reminderText}>
                    You deserve the same kindness you give to others.
                  </Text>
                </View>
                
                <View style={styles.reminderItem}>
                  <Sparkles size={20} color="#c4b5fd" />
                  <Text style={styles.reminderText}>
                    Every small step forward is worth celebrating.
                  </Text>
                </View>
                
                <View style={styles.reminderItem}>
                  <Leaf size={20} color="#86efac" />
                  <Text style={styles.reminderText}>
                    Transformation happens slowly, gently, in its own time.
                  </Text>
                </View>
              </View>
            </View>

            {/* Return to Journey */}
            <View style={styles.returnSection}>
              <Text style={styles.returnText}>
                Take all the time you need. When you're ready, your journey continues.
              </Text>
              <TouchableOpacity
                style={styles.returnButton}
                onPress={onClose}
              >
                <Text style={styles.returnButtonText}>Return to My Journey</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flex: 1,
    backgroundColor: '#1e1b4b', // Deep indigo background
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#c4b5fd', // Light purple
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  messageCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  messageIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  messageText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 12,
  },
  challengeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  breathingIntro: {
    alignItems: 'center',
  },
  breathingText: {
    fontSize: 16,
    color: '#c4b5fd',
    textAlign: 'center',
    marginBottom: 20,
  },
  breathingButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  breathingButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  breathingGuide: {
    alignItems: 'center',
  },
  breathingCircleContainer: {
    marginBottom: 20,
  },
  breathingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingCircleInhale: {
    transform: [{ scale: 1.1 }],
    borderColor: '#ffffff',
  },
  breathingCircleHold: {
    transform: [{ scale: 1.1 }],
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  breathingCircleExhale: {
    transform: [{ scale: 0.9 }],
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  breathingPhaseText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  breathingCountText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
  },
  breathingInstructionText: {
    fontSize: 16,
    color: '#c4b5fd',
    marginBottom: 20,
  },
  breathingFinishButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  breathingFinishText: {
    color: '#ffffff',
    fontSize: 14,
  },
  poetryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  poetryNavigation: {
    flexDirection: 'row',
    gap: 8,
  },
  poetryNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poetryNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  poetryNavButtonDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  poemContainer: {
    alignItems: 'center',
  },
  poemTitle: {
    fontSize: 24,
    fontWeight: '300', // Light weight for elegance
    color: '#ffffff',
    marginBottom: 20,
  },
  poemVerse: {
    fontSize: 18,
    color: '#e9d5ff', // Light purple
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  poemAuthor: {
    fontSize: 16,
    color: '#c4b5fd',
    fontStyle: 'italic',
    marginTop: 16,
  },
  soundscapeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  soundscapeCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  soundscapeCardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  soundscapeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  soundscapeName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  soundscapeDescription: {
    color: '#c4b5fd',
    fontSize: 12,
    textAlign: 'center',
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 30,
    marginRight: 16,
  },
  audioStatusText: {
    color: '#ffffff',
    fontSize: 16,
  },
  remindersCard: {
    backgroundColor: 'rgba(219, 39, 119, 0.3)', // Pink background
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  remindersGrid: {
    gap: 16,
  },
  reminderItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reminderText: {
    color: '#ffffff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  returnSection: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 40,
  },
  returnText: {
    color: '#c4b5fd',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  returnButton: {
    backgroundColor: 'rgba(219, 39, 119, 0.8)', // Pink button
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  returnButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});