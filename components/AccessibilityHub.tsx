import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Type,
  Palette,
  Mic,
  Settings,
  Sun,
  Moon,
  Contrast,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Languages,
  Headphones,
  Hand,
  Heart,
  Shield,
  Book,
  HelpCircle,
  X,
} from 'lucide-react-native';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrast: 'normal' | 'high' | 'extra-high';
  theme: 'light' | 'dark' | 'auto';
  colorBlindFriendly: boolean;
  voiceNavigation: boolean;
  screenReader: boolean;
  soundEffects: boolean;
  backgroundSounds: boolean;
  reducedMotion: boolean;
  simplifiedInterface: boolean;
  largeButtons: boolean;
  voiceInstructions: boolean;
  language: string;
  readingLevel: 'simple' | 'standard' | 'detailed';
}

interface AccessibilityHubProps {
  isVisible: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (settings: Partial<AccessibilitySettings>) => void;
}

export default function AccessibilityHub({
  isVisible,
  onClose,
  settings,
  onUpdateSettings
}: AccessibilityHubProps) {
  const [activeSection, setActiveSection] = useState<'vision' | 'hearing' | 'motor' | 'cognitive'>('vision');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const accessibilityCategories = [
    {
      id: 'vision',
      title: 'Vision Support',
      icon: Eye,
      description: 'Text size, contrast, and visual aids',
      color: '#3b82f6'
    },
    {
      id: 'hearing',
      title: 'Hearing Support',
      icon: Volume2,
      description: 'Audio settings and alternatives',
      color: '#10b981'
    },
    {
      id: 'motor',
      title: 'Motor Support',
      icon: Hand,
      description: 'Touch, gesture, and navigation aids',
      color: '#8b5cf6'
    },
    {
      id: 'cognitive',
      title: 'Cognitive Support',
      icon: Book,
      description: 'Simplified interface and reading aids',
      color: '#f59e0b'
    }
  ];

  const getFontSizePreview = (size: string) => {
    switch (size) {
      case 'small': return 12;
      case 'medium': return 14;
      case 'large': return 18;
      case 'extra-large': return 24;
      default: return 14;
    }
  };

  const getContrastColors = (contrast: string) => {
    switch (contrast) {
      case 'normal': return { bg: '#ffffff', text: '#1f2937', border: '#d1d5db' };
      case 'high': return { bg: '#000000', text: '#fcd34d', border: '#fcd34d' };
      case 'extra-high': return { bg: '#000000', text: '#ffffff', border: '#ffffff' };
      default: return { bg: '#ffffff', text: '#1f2937', border: '#d1d5db' };
    }
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Eye size={24} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Accessibility & Comfort</Text>
              <Text style={styles.headerSubtitle}>Customize your experience for optimal comfort</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Category Navigation */}
          <View style={styles.sidebar}>
            <Text style={styles.sidebarTitle}>Support Categories</Text>
            <View style={styles.categoryList}>
              {accessibilityCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    activeSection === category.id && styles.activeCategoryButton,
                    activeSection === category.id && { borderColor: category.color }
                  ]}
                  onPress={() => setActiveSection(category.id as any)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <category.icon size={20} color="#ffffff" />
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryDescription}>{category.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Settings Content */}
          <ScrollView style={styles.settingsContent} showsVerticalScrollIndicator={false}>
            {/* Vision Support */}
            {activeSection === 'vision' && (
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Vision Support Settings</Text>

                {/* Font Size */}
                <View style={styles.settingCard}>
                  <Text style={styles.settingTitle}>Text Size</Text>
                  <View style={styles.fontSizeOptions}>
                    {['small', 'medium', 'large', 'extra-large'].map((size) => (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.fontSizeOption,
                          settings.fontSize === size && styles.selectedOption,
                          settings.fontSize === size && { borderColor: '#3b82f6' }
                        ]}
                        onPress={() => onUpdateSettings({ fontSize: size as any })}
                      >
                        <Text style={[
                          styles.fontSizeLabel,
                          { fontSize: getFontSizePreview(size) }
                        ]}>
                          Aa
                        </Text>
                        <Text style={styles.fontSizeDescription}>{size}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={[
                    styles.previewBox,
                    { 
                      backgroundColor: getContrastColors(settings.contrast).bg,
                      borderColor: getContrastColors(settings.contrast).border
                    }
                  ]}>
                    <Text style={[
                      styles.previewText,
                      { 
                        fontSize: getFontSizePreview(settings.fontSize),
                        color: getContrastColors(settings.contrast).text
                      }
                    ]}>
                      Preview: This is how text will appear with your settings.
                    </Text>
                  </View>
                </View>

                {/* Contrast */}
                <View style={styles.settingCard}>
                  <Text style={styles.settingTitle}>Contrast Level</Text>
                  <View style={styles.contrastOptions}>
                    {[
                      { key: 'normal', label: 'Normal' },
                      { key: 'high', label: 'High' },
                      { key: 'extra-high', label: 'Extra High' }
                    ].map((contrast) => {
                      const colors = getContrastColors(contrast.key);
                      return (
                        <TouchableOpacity
                          key={contrast.key}
                          style={[
                            styles.contrastOption,
                            settings.contrast === contrast.key && styles.selectedOption,
                            settings.contrast === contrast.key && { borderColor: '#3b82f6' }
                          ]}
                          onPress={() => onUpdateSettings({ contrast: contrast.key as any })}
                        >
                          <View style={[
                            styles.contrastPreview,
                            { backgroundColor: colors.bg }
                          ]}>
                            <Text style={[
                              styles.contrastPreviewText,
                              { color: colors.text }
                            ]}>
                              Sample Text
                            </Text>
                          </View>
                          <Text style={styles.contrastLabel}>{contrast.label}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Color Blind Support */}
                <View style={styles.settingCard}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>Color Blind Friendly</Text>
                      <Text style={styles.settingDescription}>Use patterns and shapes in addition to colors</Text>
                    </View>
                    <Switch
                      value={settings.colorBlindFriendly}
                      onValueChange={(value) => onUpdateSettings({ colorBlindFriendly: value })}
                      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
                      thumbColor={settings.colorBlindFriendly ? '#3b82f6' : '#9ca3af'}
                    />
                  </View>
                </View>
              </View>
            )}

            {/* Hearing Support */}
            {activeSection === 'hearing' && (
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Hearing Support Settings</Text>

                <View style={styles.settingCard}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>Voice Instructions</Text>
                      <Text style={styles.settingDescription}>Spoken guidance for navigation and actions</Text>
                    </View>
                    <Switch
                      value={settings.voiceInstructions}
                      onValueChange={(value) => onUpdateSettings({ voiceInstructions: value })}
                      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
                      thumbColor={settings.voiceInstructions ? '#3b82f6' : '#9ca3af'}
                    />
                  </View>
                </View>

                <View style={styles.settingCard}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>Sound Effects</Text>
                      <Text style={styles.settingDescription}>Audio feedback for interactions</Text>
                    </View>
                    <Switch
                      value={settings.soundEffects}
                      onValueChange={(value) => onUpdateSettings({ soundEffects: value })}
                      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
                      thumbColor={settings.soundEffects ? '#3b82f6' : '#9ca3af'}
                    />
                  </View>
                </View>

                <View style={styles.settingCard}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>Background Sounds</Text>
                      <Text style={styles.settingDescription}>Calming ambient sounds</Text>
                    </View>
                    <Switch
                      value={settings.backgroundSounds}
                      onValueChange={(value) => onUpdateSettings({ backgroundSounds: value })}
                      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
                      thumbColor={settings.backgroundSounds ? '#3b82f6' : '#9ca3af'}
                    />
                  </View>
                </View>
              </View>
            )}

            {/* Motor Support */}
            {activeSection === 'motor' && (
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Motor Support Settings</Text>

                <View style={styles.settingCard}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>Large Touch Targets</Text>
                      <Text style={styles.settingDescription}>Bigger buttons and touch areas</Text>
                    </View>
                    <Switch
                      value={settings.largeButtons}
                      onValueChange={(value) => onUpdateSettings({ largeButtons: value })}
                      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
                      thumbColor={settings.largeButtons ? '#3b82f6' : '#9ca3af'}
                    />
                  </View>
                </View>

                <View style={styles.settingCard}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>Voice Navigation</Text>
                      <Text style={styles.settingDescription}>Control the app with voice commands</Text>
                    </View>
                    <Switch
                      value={settings.voiceNavigation}
                      onValueChange={(value) => onUpdateSettings({ voiceNavigation: value })}
                      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
                      thumbColor={settings.voiceNavigation ? '#3b82f6' : '#9ca3af'}
                    />
                  </View>
                </View>

                <View style={styles.settingCard}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>Reduced Motion</Text>
                      <Text style={styles.settingDescription}>Minimize animations and transitions</Text>
                    </View>
                    <Switch
                      value={settings.reducedMotion}
                      onValueChange={(value) => onUpdateSettings({ reducedMotion: value })}
                      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
                      thumbColor={settings.reducedMotion ? '#3b82f6' : '#9ca3af'}
                    />
                  </View>
                </View>
              </View>
            )}

            {/* Cognitive Support */}
            {activeSection === 'cognitive' && (
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Cognitive Support Settings</Text>

                <View style={styles.settingCard}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>Simplified Interface</Text>
                      <Text style={styles.settingDescription}>Reduce visual complexity and distractions</Text>
                    </View>
                    <Switch
                      value={settings.simplifiedInterface}
                      onValueChange={(value) => onUpdateSettings({ simplifiedInterface: value })}
                      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
                      thumbColor={settings.simplifiedInterface ? '#3b82f6' : '#9ca3af'}
                    />
                  </View>
                </View>

                <View style={styles.settingCard}>
                  <Text style={styles.settingTitle}>Reading Level</Text>
                  <View style={styles.readingLevelOptions}>
                    {[
                      { key: 'simple', label: 'Simple', desc: '5th grade level' },
                      { key: 'standard', label: 'Standard', desc: '8th grade level' },
                      { key: 'detailed', label: 'Detailed', desc: 'Full information' }
                    ].map((level) => (
                      <TouchableOpacity
                        key={level.key}
                        style={[
                          styles.readingLevelOption,
                          settings.readingLevel === level.key && styles.selectedOption,
                          settings.readingLevel === level.key && { borderColor: '#3b82f6' }
                        ]}
                        onPress={() => onUpdateSettings({ readingLevel: level.key as any })}
                      >
                        <Text style={styles.readingLevelTitle}>{level.label}</Text>
                        <Text style={styles.readingLevelDescription}>{level.desc}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.settingCard}>
                  <Text style={styles.settingTitle}>Language</Text>
                  <View style={styles.languageOptions}>
                    {languages.map((lang) => (
                      <TouchableOpacity
                        key={lang.code}
                        style={[
                          styles.languageOption,
                          settings.language === lang.code && styles.selectedOption,
                          settings.language === lang.code && { borderColor: '#3b82f6' }
                        ]}
                        onPress={() => onUpdateSettings({ language: lang.code })}
                      >
                        <Text style={styles.languageFlag}>{lang.flag}</Text>
                        <Text style={styles.languageName}>{lang.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.securityNote}>
            <Shield size={16} color="#6b7280" />
            <Text style={styles.securityText}>All settings are saved automatically and privately</Text>
          </View>
          <View style={styles.footerActions}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                // Reset to defaults
                onUpdateSettings({
                  fontSize: 'medium',
                  contrast: 'normal',
                  theme: 'light',
                  colorBlindFriendly: false,
                  voiceNavigation: false,
                  screenReader: false,
                  soundEffects: true,
                  backgroundSounds: false,
                  reducedMotion: false,
                  simplifiedInterface: false,
                  largeButtons: false,
                  voiceInstructions: false,
                  language: 'en',
                  readingLevel: 'standard'
                });
              }}
            >
              <Text style={styles.resetButtonText}>Reset to Defaults</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={onClose}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3b82f6',
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
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '40%',
    backgroundColor: '#f3f4f6',
    padding: 12,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  categoryList: {
    gap: 8,
  },
  categoryButton: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeCategoryButton: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryInfo: {
    
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  settingsContent: {
    flex: 1,
    padding: 16,
  },
  settingsSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  settingCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  fontSizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  fontSizeOption: {
    width: '23%',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedOption: {
    backgroundColor: '#dbeafe',
    borderWidth: 2,
  },
  fontSizeLabel: {
    color: '#1f2937',
    marginBottom: 4,
  },
  fontSizeDescription: {
    fontSize: 10,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  previewBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
  },
  previewText: {
    textAlign: 'center',
  },
  contrastOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  contrastOption: {
    width: '31%',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  contrastPreview: {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  contrastPreviewText: {
    fontSize: 12,
  },
  contrastLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  readingLevelOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  readingLevelOption: {
    width: '31%',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  readingLevelTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  readingLevelDescription: {
    fontSize: 10,
    color: '#6b7280',
  },
  languageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 12,
  },
  languageOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  languageName: {
    fontSize: 14,
    color: '#1f2937',
  },
  footer: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#6b7280',
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  resetButtonText: {
    fontSize: 14,
    color: '#4b5563',
  },
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  doneButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
});