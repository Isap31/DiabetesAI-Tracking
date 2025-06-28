import React, { useState } from 'react';
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
  Save,
  X
} from 'lucide-react';

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

interface AccessibilitySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (settings: Partial<AccessibilitySettings>) => void;
}

const AccessibilitySettingsModal: React.FC<AccessibilitySettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [activeSection, setActiveSection] = useState<'vision' | 'hearing' | 'motor' | 'cognitive'>('vision');
  const [localSettings, setLocalSettings] = useState<AccessibilitySettings>(settings);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onClose();
  };

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
      color: 'bg-blue-500'
    },
    {
      id: 'hearing',
      title: 'Hearing Support',
      icon: Volume2,
      description: 'Audio settings and alternatives',
      color: 'bg-green-500'
    },
    {
      id: 'motor',
      title: 'Motor Support',
      icon: Hand,
      description: 'Touch, gesture, and navigation aids',
      color: 'bg-purple-500'
    },
    {
      id: 'cognitive',
      title: 'Cognitive Support',
      icon: Book,
      description: 'Simplified interface and reading aids',
      color: 'bg-orange-500'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Accessibility Settings</h2>
                <p className="text-indigo-100">Customize AuroraFlow for your needs</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <div className="space-y-2">
              {accessibilityCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveSection(category.id as any)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    activeSection === category.id
                      ? 'bg-white shadow-sm border border-gray-200'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className={`${category.color} p-2 rounded-lg`}>
                    <category.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{category.title}</div>
                    <div className="text-xs text-gray-500">{category.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === 'vision' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Vision Support</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Type className="inline h-4 w-4 mr-2" />
                      Font Size
                    </label>
                    <div className="space-y-2">
                      {['small', 'medium', 'large', 'extra-large'].map((size) => (
                        <label key={size} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="fontSize"
                            value={size}
                            checked={localSettings.fontSize === size}
                            onChange={(e) => updateSetting('fontSize', e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`capitalize ${
                            size === 'small' ? 'text-sm' :
                            size === 'medium' ? 'text-base' :
                            size === 'large' ? 'text-lg' : 'text-xl'
                          }`}>
                            {size.replace('-', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Contrast className="inline h-4 w-4 mr-2" />
                      Contrast Level
                    </label>
                    <div className="space-y-2">
                      {['normal', 'high', 'extra-high'].map((contrast) => (
                        <label key={contrast} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="contrast"
                            value={contrast}
                            checked={localSettings.contrast === contrast}
                            onChange={(e) => updateSetting('contrast', e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="capitalize">{contrast.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Palette className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Color Blind Friendly</div>
                        <div className="text-sm text-gray-500">Use patterns and shapes in addition to colors</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.colorBlindFriendly}
                        onChange={(e) => updateSetting('colorBlindFriendly', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Screen Reader Support</div>
                        <div className="text-sm text-gray-500">Enhanced compatibility with screen readers</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.screenReader}
                        onChange={(e) => updateSetting('screenReader', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'hearing' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Hearing Support</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Sound Effects</div>
                        <div className="text-sm text-gray-500">Button clicks and notification sounds</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.soundEffects}
                        onChange={(e) => updateSetting('soundEffects', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Headphones className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Background Sounds</div>
                        <div className="text-sm text-gray-500">Calming ambient sounds during use</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.backgroundSounds}
                        onChange={(e) => updateSetting('backgroundSounds', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mic className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Voice Instructions</div>
                        <div className="text-sm text-gray-500">Spoken guidance for navigation and actions</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.voiceInstructions}
                        onChange={(e) => updateSetting('voiceInstructions', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'motor' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Motor Support</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Hand className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Large Buttons</div>
                        <div className="text-sm text-gray-500">Increase button size for easier tapping</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.largeButtons}
                        onChange={(e) => updateSetting('largeButtons', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mic className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Voice Navigation</div>
                        <div className="text-sm text-gray-500">Navigate using voice commands</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.voiceNavigation}
                        onChange={(e) => updateSetting('voiceNavigation', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Reduced Motion</div>
                        <div className="text-sm text-gray-500">Minimize animations and transitions</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.reducedMotion}
                        onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'cognitive' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Cognitive Support</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Book className="inline h-4 w-4 mr-2" />
                    Reading Level
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'simple', label: 'Simple', desc: 'Basic language, shorter sentences' },
                      { value: 'standard', label: 'Standard', desc: 'Normal complexity' },
                      { value: 'detailed', label: 'Detailed', desc: 'Technical terms, comprehensive explanations' }
                    ].map((level) => (
                      <label key={level.value} className="flex items-start space-x-2">
                        <input
                          type="radio"
                          name="readingLevel"
                          value={level.value}
                          checked={localSettings.readingLevel === level.value}
                          onChange={(e) => updateSetting('readingLevel', e.target.value)}
                          className="text-blue-600 focus:ring-blue-500 mt-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{level.label}</div>
                          <div className="text-sm text-gray-500">{level.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">Simplified Interface</div>
                        <div className="text-sm text-gray-500">Hide advanced features and options</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.simplifiedInterface}
                        onChange={(e) => updateSetting('simplifiedInterface', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Languages className="inline h-4 w-4 mr-2" />
                    Language
                  </label>
                  <select
                    value={localSettings.language}
                    onChange={(e) => updateSetting('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Settings are saved automatically and apply immediately
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettingsModal;