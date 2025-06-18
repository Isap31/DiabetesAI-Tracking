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
  HelpCircle
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

interface AccessibilityHubProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (settings: Partial<AccessibilitySettings>) => void;
  onClose: () => void;
}

const AccessibilityHub: React.FC<AccessibilityHubProps> = ({
  settings,
  onUpdateSettings,
  onClose
}) => {
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

  const getContrastPreview = () => {
    const previews = {
      normal: 'bg-white text-gray-900 border-gray-300',
      high: 'bg-black text-yellow-400 border-yellow-400',
      'extra-high': 'bg-black text-white border-white'
    };
    return previews[settings.contrast];
  };

  const getFontSizePreview = () => {
    const sizes = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      'extra-large': 'text-2xl'
    };
    return sizes[settings.fontSize];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Accessibility & Comfort</h2>
                <p className="text-blue-100">Customize your experience for optimal comfort</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-all"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Category Navigation */}
          <div className="w-1/3 bg-gray-50 p-4 border-r">
            <h3 className="font-semibold text-gray-900 mb-4">Support Categories</h3>
            <div className="space-y-2">
              {accessibilityCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveSection(category.id as any)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    activeSection === category.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.title}</h4>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Vision Support */}
            {activeSection === 'vision' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Vision Support Settings</h3>

                {/* Font Size */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Text Size</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {['small', 'medium', 'large', 'extra-large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => onUpdateSettings({ fontSize: size as any })}
                        className={`p-3 rounded-lg border transition-all ${
                          settings.fontSize === size
                            ? 'border-blue-500 bg-blue-100'
                            : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className={`text-center ${
                          size === 'small' ? 'text-sm' :
                          size === 'medium' ? 'text-base' :
                          size === 'large' ? 'text-lg' : 'text-xl'
                        }`}>
                          Aa
                        </div>
                        <p className="text-xs text-gray-600 mt-1 capitalize">{size}</p>
                      </button>
                    ))}
                  </div>
                  <div className={`mt-3 p-3 border rounded-lg ${getContrastPreview()} ${getFontSizePreview()}`}>
                    Preview: This is how text will appear with your settings.
                  </div>
                </div>

                {/* Contrast */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Contrast Level</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'normal', label: 'Normal', preview: 'bg-white text-gray-900' },
                      { key: 'high', label: 'High', preview: 'bg-black text-yellow-400' },
                      { key: 'extra-high', label: 'Extra High', preview: 'bg-black text-white' }
                    ].map((contrast) => (
                      <button
                        key={contrast.key}
                        onClick={() => onUpdateSettings({ contrast: contrast.key as any })}
                        className={`p-3 rounded-lg border transition-all ${
                          settings.contrast === contrast.key
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className={`p-2 rounded text-center text-sm ${contrast.preview}`}>
                          Sample Text
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{contrast.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Blind Support */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Color Blind Friendly</h4>
                      <p className="text-sm text-gray-600">Use patterns and shapes in addition to colors</p>
                    </div>
                    <button
                      onClick={() => onUpdateSettings({ colorBlindFriendly: !settings.colorBlindFriendly })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.colorBlindFriendly ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.colorBlindFriendly ? 'translate-x-6' : 'translate-x-0.5'
                      } mt-0.5`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Hearing Support */}
            {activeSection === 'hearing' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Hearing Support Settings</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Voice Instructions</h4>
                        <p className="text-sm text-gray-600">Spoken guidance for navigation and actions</p>
                      </div>
                      <button
                        onClick={() => onUpdateSettings({ voiceInstructions: !settings.voiceInstructions })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.voiceInstructions ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.voiceInstructions ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Sound Effects</h4>
                        <p className="text-sm text-gray-600">Audio feedback for interactions</p>
                      </div>
                      <button
                        onClick={() => onUpdateSettings({ soundEffects: !settings.soundEffects })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.soundEffects ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.soundEffects ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Background Sounds</h4>
                        <p className="text-sm text-gray-600">Calming ambient sounds</p>
                      </div>
                      <button
                        onClick={() => onUpdateSettings({ backgroundSounds: !settings.backgroundSounds })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.backgroundSounds ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.backgroundSounds ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Motor Support */}
            {activeSection === 'motor' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Motor Support Settings</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Large Touch Targets</h4>
                        <p className="text-sm text-gray-600">Bigger buttons and touch areas</p>
                      </div>
                      <button
                        onClick={() => onUpdateSettings({ largeButtons: !settings.largeButtons })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.largeButtons ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.largeButtons ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Voice Navigation</h4>
                        <p className="text-sm text-gray-600">Control the app with voice commands</p>
                      </div>
                      <button
                        onClick={() => onUpdateSettings({ voiceNavigation: !settings.voiceNavigation })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.voiceNavigation ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.voiceNavigation ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Reduced Motion</h4>
                        <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                      </div>
                      <button
                        onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.reducedMotion ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cognitive Support */}
            {activeSection === 'cognitive' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Cognitive Support Settings</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Simplified Interface</h4>
                        <p className="text-sm text-gray-600">Reduce visual complexity and distractions</p>
                      </div>
                      <button
                        onClick={() => onUpdateSettings({ simplifiedInterface: !settings.simplifiedInterface })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.simplifiedInterface ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.simplifiedInterface ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Reading Level</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'simple', label: 'Simple', desc: '5th grade level' },
                        { key: 'standard', label: 'Standard', desc: '8th grade level' },
                        { key: 'detailed', label: 'Detailed', desc: 'Full information' }
                      ].map((level) => (
                        <button
                          key={level.key}
                          onClick={() => onUpdateSettings({ readingLevel: level.key as any })}
                          className={`p-3 rounded-lg border transition-all ${
                            settings.readingLevel === level.key
                              ? 'border-blue-500 bg-blue-100'
                              : 'border-gray-300 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <h5 className="font-medium text-gray-900">{level.label}</h5>
                          <p className="text-xs text-gray-600">{level.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Language</h4>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => onUpdateSettings({ language: lang.code })}
                          className={`flex items-center space-x-2 p-2 rounded-lg border transition-all ${
                            settings.language === lang.code
                              ? 'border-blue-500 bg-blue-100'
                              : 'border-gray-300 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>All settings are saved automatically and privately</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
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
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset to Defaults
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityHub;