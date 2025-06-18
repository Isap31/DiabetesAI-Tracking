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
  Book,
  Heart,
  Star,
  Moon,
  Sun,
  Cloud,
  Smile,
  Frown,
  Meh,
  Edit3,
  Save,
  Calendar,
  Clock,
  X,
  Sparkles,
} from 'lucide-react-native';

interface JournalEntry {
  id: string;
  date: string;
  time: string;
  mood: 'joyful' | 'content' | 'neutral' | 'challenging' | 'difficult';
  energy: number; // 1-5
  gratitude: string[];
  reflection: string;
  glucoseNote?: string;
  weatherIcon: 'sun' | 'cloud' | 'moon' | 'star';
  tags: string[];
}

interface AuroraJournalProps {
  isVisible: boolean;
  onClose: () => void;
  entries?: JournalEntry[];
  onAddEntry?: (entry: Omit<JournalEntry, 'id'>) => void;
}

export default function AuroraJournal({ 
  isVisible, 
  onClose,
  entries = [],
  onAddEntry
}: AuroraJournalProps) {
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    mood: 'content',
    energy: 3,
    gratitude: ['', '', ''],
    reflection: '',
    weatherIcon: 'sun',
    tags: []
  });
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  // Gentle writing prompts
  const reflectionPrompts = [
    {
      category: 'Gratitude',
      prompts: [
        "What small moment brought you joy today?",
        "Who or what are you grateful for right now?",
        "What part of your body served you well today?",
        "What simple pleasure did you enjoy?"
      ]
    },
    {
      category: 'Growth',
      prompts: [
        "How did you show kindness to yourself today?",
        "What did you learn about your body's needs?",
        "How did you adapt when things didn't go as planned?",
        "What strength did you discover in yourself?"
      ]
    },
    {
      category: 'Wellness',
      prompts: [
        "How did your glucose levels make you feel today?",
        "What foods nourished you well?",
        "How did movement feel in your body?",
        "What helped you feel most balanced?"
      ]
    },
    {
      category: 'Connection',
      prompts: [
        "How did you connect with others today?",
        "What support did you give or receive?",
        "How did you honor your relationships?",
        "What made you feel understood?"
      ]
    }
  ];

  const moodEmojis = {
    joyful: { emoji: '😊', color: '#f59e0b', bg: '#fef3c7' },
    content: { emoji: '😌', color: '#10b981', bg: '#d1fae5' },
    neutral: { emoji: '😐', color: '#6b7280', bg: '#f3f4f6' },
    challenging: { emoji: '😔', color: '#f97316', bg: '#ffedd5' },
    difficult: { emoji: '😢', color: '#ef4444', bg: '#fee2e2' }
  };

  const weatherIcons = {
    sun: { icon: Sun, color: '#f59e0b' },
    cloud: { icon: Cloud, color: '#6b7280' },
    moon: { icon: Moon, color: '#8b5cf6' },
    star: { icon: Star, color: '#3b82f6' }
  };

  const handleSaveEntry = () => {
    if (!onAddEntry) return;
    
    const entry: Omit<JournalEntry, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: currentEntry.mood || 'content',
      energy: currentEntry.energy || 3,
      gratitude: currentEntry.gratitude?.filter(g => g.trim()) || [],
      reflection: currentEntry.reflection || '',
      glucoseNote: currentEntry.glucoseNote,
      weatherIcon: currentEntry.weatherIcon || 'sun',
      tags: currentEntry.tags || []
    };
    
    onAddEntry(entry);
    setIsWriting(false);
    setCurrentEntry({
      mood: 'content',
      energy: 3,
      gratitude: ['', '', ''],
      reflection: '',
      weatherIcon: 'sun',
      tags: []
    });
  };

  const getEnergyDescription = (energy: number) => {
    const descriptions = {
      1: 'Resting gently',
      2: 'Quietly present',
      3: 'Balanced and steady',
      4: 'Vibrant and alive',
      5: 'Radiating energy'
    };
    return descriptions[energy as keyof typeof descriptions] || descriptions[3];
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIcon}>
                <Book size={24} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Aurora Journal</Text>
                <Text style={styles.headerSubtitle}>Your sanctuary of reflection and growth</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* New Entry Button */}
          {!isWriting && (
            <View style={styles.newEntryContainer}>
              <TouchableOpacity
                style={styles.newEntryButton}
                onPress={() => setIsWriting(true)}
              >
                <Edit3 size={20} color="#ffffff" />
                <Text style={styles.newEntryText}>Begin Today's Reflection</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Writing Interface */}
          {isWriting && (
            <View style={styles.writingCard}>
              <View style={styles.writingHeader}>
                <Text style={styles.writingTitle}>Today's Gentle Reflection</Text>
                <View style={styles.dateTimeContainer}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.dateTimeText}>{new Date().toLocaleDateString()}</Text>
                  <Clock size={14} color="#6b7280" style={styles.clockIcon} />
                  <Text style={styles.dateTimeText}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>

              {/* Mood Selection */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>How is your heart feeling?</Text>
                <View style={styles.moodSelector}>
                  {Object.entries(moodEmojis).map(([mood, config]) => (
                    <TouchableOpacity
                      key={mood}
                      onPress={() => setCurrentEntry({ ...currentEntry, mood: mood as any })}
                      style={[
                        styles.moodOption,
                        currentEntry.mood === mood && styles.moodSelected,
                        { backgroundColor: currentEntry.mood === mood ? config.bg : '#f9fafb' }
                      ]}
                    >
                      <Text style={styles.moodEmoji}>{config.emoji}</Text>
                      <Text style={styles.moodLabel}>{mood}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Energy Level */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Your energy feels...</Text>
                <View style={styles.energyContainer}>
                  <View style={styles.energySlider}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <TouchableOpacity
                        key={level}
                        style={[
                          styles.energyOption,
                          currentEntry.energy === level && styles.energySelected
                        ]}
                        onPress={() => setCurrentEntry({ ...currentEntry, energy: level })}
                      >
                        <Text style={styles.energyText}>{level}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.energyDescription}>
                    {getEnergyDescription(currentEntry.energy || 3)}
                  </Text>
                </View>
              </View>

              {/* Weather Icon */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Today feels like...</Text>
                <View style={styles.weatherSelector}>
                  {Object.entries(weatherIcons).map(([weather, config]) => (
                    <TouchableOpacity
                      key={weather}
                      onPress={() => setCurrentEntry({ ...currentEntry, weatherIcon: weather as any })}
                      style={[
                        styles.weatherOption,
                        currentEntry.weatherIcon === weather && styles.weatherSelected
                      ]}
                    >
                      <config.icon size={24} color={config.color} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Gratitude Section */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Three gentle gratitudes</Text>
                <View style={styles.gratitudeContainer}>
                  {currentEntry.gratitude?.map((gratitude, index) => (
                    <TextInput
                      key={index}
                      style={styles.gratitudeInput}
                      value={gratitude}
                      onChangeText={(text) => {
                        const newGratitude = [...(currentEntry.gratitude || ['', '', ''])];
                        newGratitude[index] = text;
                        setCurrentEntry({ ...currentEntry, gratitude: newGratitude });
                      }}
                      placeholder={`Gratitude ${index + 1}...`}
                      placeholderTextColor="#9ca3af"
                    />
                  ))}
                </View>
              </View>

              {/* Reflection Prompts */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Gentle prompts for reflection</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptsScroll}>
                  {reflectionPrompts.map((category) => (
                    <View key={category.category} style={styles.promptCategory}>
                      <Text style={styles.promptCategoryTitle}>{category.category}</Text>
                      {category.prompts.map((prompt, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.promptButton}
                          onPress={() => setSelectedPrompt(prompt)}
                        >
                          <Text style={styles.promptText}>{prompt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </ScrollView>
                
                {selectedPrompt && (
                  <View style={styles.selectedPrompt}>
                    <Text style={styles.selectedPromptText}>"{selectedPrompt}"</Text>
                  </View>
                )}
              </View>

              {/* Main Reflection */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Your reflection</Text>
                <TextInput
                  style={styles.reflectionInput}
                  value={currentEntry.reflection}
                  onChangeText={(text) => setCurrentEntry({ ...currentEntry, reflection: text })}
                  placeholder="Let your thoughts flow gently onto the page..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              {/* Glucose Note */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>A note about your glucose journey (optional)</Text>
                <TextInput
                  style={styles.glucoseInput}
                  value={currentEntry.glucoseNote || ''}
                  onChangeText={(text) => setCurrentEntry({ ...currentEntry, glucoseNote: text })}
                  placeholder="How did your body feel today? Any patterns you noticed?"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveEntry}
                >
                  <Save size={18} color="#ffffff" />
                  <Text style={styles.saveButtonText}>Save Reflection</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsWriting(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Journal Entries */}
          <View style={styles.entriesContainer}>
            {entries.map((entry) => {
              const moodConfig = moodEmojis[entry.mood];
              const WeatherIcon = weatherIcons[entry.weatherIcon].icon;
              
              return (
                <View key={entry.id} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryHeaderLeft}>
                      <View style={[styles.entryMoodIcon, { backgroundColor: moodConfig.bg }]}>
                        <Text style={styles.entryMoodEmoji}>{moodConfig.emoji}</Text>
                      </View>
                      <View>
                        <Text style={styles.entryDate}>{entry.date}</Text>
                        <Text style={styles.entryTime}>{entry.time}</Text>
                      </View>
                    </View>
                    <WeatherIcon size={24} color={weatherIcons[entry.weatherIcon].color} />
                  </View>

                  {entry.gratitude.length > 0 && (
                    <View style={styles.entrySection}>
                      <Text style={styles.entrySectionTitle}>Gratitudes</Text>
                      {entry.gratitude.map((item, index) => (
                        <View key={index} style={styles.gratitudeItem}>
                          <Sparkles size={12} color="#f59e0b" style={styles.gratitudeIcon} />
                          <Text style={styles.gratitudeText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {entry.reflection && (
                    <View style={styles.entrySection}>
                      <Text style={styles.entrySectionTitle}>Reflection</Text>
                      <Text style={styles.reflectionText}>{entry.reflection}</Text>
                    </View>
                  )}

                  {entry.glucoseNote && (
                    <View style={styles.entrySection}>
                      <Text style={styles.entrySectionTitle}>Glucose Journey</Text>
                      <View style={styles.glucoseNote}>
                        <Text style={styles.glucoseNoteText}>{entry.glucoseNote}</Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.entryFooter}>
                    <Text style={styles.entryEnergy}>Energy: {getEnergyDescription(entry.energy)}</Text>
                    <Text style={styles.entryMoodText}>{entry.mood} day</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {entries.length === 0 && !isWriting && (
            <View style={styles.emptyState}>
              <Book size={64} color="#d1d5db" />
              <Text style={styles.emptyStateTitle}>Your journal awaits</Text>
              <Text style={styles.emptyStateText}>Begin your journey of gentle reflection and self-discovery.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff', // Light purple background
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#8b5cf6', // Purple header
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
  newEntryContainer: {
    alignItems: 'center',
    padding: 24,
  },
  newEntryButton: {
    backgroundColor: '#8b5cf6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 12,
  },
  newEntryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  writingCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  writingHeader: {
    marginBottom: 16,
  },
  writingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  clockIcon: {
    marginLeft: 12,
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 8,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    width: '18%',
  },
  moodSelected: {
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    color: '#4b5563',
    textTransform: 'capitalize',
  },
  energyContainer: {
    alignItems: 'center',
  },
  energySlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  energyOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  energySelected: {
    backgroundColor: '#8b5cf6',
  },
  energyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },
  energyDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  weatherSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherOption: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  weatherSelected: {
    backgroundColor: '#ddd6fe',
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  gratitudeContainer: {
    gap: 8,
  },
  gratitudeInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  promptsScroll: {
    maxHeight: 120,
    marginBottom: 12,
  },
  promptCategory: {
    width: 200,
    marginRight: 16,
  },
  promptCategoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  promptButton: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  promptText: {
    fontSize: 12,
    color: '#4b5563',
  },
  selectedPrompt: {
    backgroundColor: '#f3e8ff',
    padding: 12,
    borderRadius: 8,
  },
  selectedPromptText: {
    fontSize: 14,
    color: '#6b21a8',
    fontStyle: 'italic',
  },
  reflectionInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
    height: 120,
  },
  glucoseInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
  },
  entriesContainer: {
    padding: 16,
    gap: 16,
  },
  entryCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryMoodIcon: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  entryMoodEmoji: {
    fontSize: 20,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  entryTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  entrySection: {
    marginBottom: 12,
  },
  entrySectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 8,
  },
  gratitudeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  gratitudeIcon: {
    marginRight: 8,
  },
  gratitudeText: {
    fontSize: 14,
    color: '#4b5563',
  },
  reflectionText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  glucoseNote: {
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 8,
  },
  glucoseNoteText: {
    fontSize: 14,
    color: '#1e40af',
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  entryEnergy: {
    fontSize: 12,
    color: '#6b7280',
  },
  entryMoodText: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});