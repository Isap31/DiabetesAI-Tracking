import React, { useState } from 'react';
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
  Zap,
  Droplets,
  Flower,
  Leaf,
  Mountain,
  Waves,
  Sparkles,
  Edit3,
  Save,
  Calendar,
  Clock,
  Mic,
  Camera,
  Palette,
  Music,
  Volume2,
  VolumeX
} from 'lucide-react';

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
  voiceNote?: string;
  photo?: string;
}

interface AuroraJournalProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  soundscapeEnabled: boolean;
  onToggleSoundscape: () => void;
}

const AuroraJournal: React.FC<AuroraJournalProps> = ({
  entries,
  onAddEntry,
  soundscapeEnabled,
  onToggleSoundscape
}) => {
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
    joyful: { emoji: '😊', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    content: { emoji: '😌', color: 'text-green-500', bg: 'bg-green-100' },
    neutral: { emoji: '😐', color: 'text-gray-500', bg: 'bg-gray-100' },
    challenging: { emoji: '😔', color: 'text-orange-500', bg: 'bg-orange-100' },
    difficult: { emoji: '😢', color: 'text-red-500', bg: 'bg-red-100' }
  };

  const weatherIcons = {
    sun: { icon: Sun, color: 'text-yellow-500' },
    cloud: { icon: Cloud, color: 'text-gray-500' },
    moon: { icon: Moon, color: 'text-purple-500' },
    star: { icon: Star, color: 'text-blue-500' }
  };

  const handleSaveEntry = () => {
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
    return descriptions[energy as keyof typeof descriptions];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      {/* Header with Soundscape */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
            <Book className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Aurora Journal</h1>
            <p className="text-gray-600">Your sanctuary of reflection and growth</p>
          </div>
        </div>
        
        <button
          onClick={onToggleSoundscape}
          className={`p-3 rounded-full transition-all ${
            soundscapeEnabled 
              ? 'bg-green-500 text-white' 
              : 'bg-white text-gray-600 border border-gray-300'
          }`}
        >
          {soundscapeEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </button>
      </div>

      {/* New Entry Button */}
      {!isWriting && (
        <div className="text-center mb-8">
          <button
            onClick={() => setIsWriting(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <Edit3 className="h-5 w-5" />
              <span className="font-medium">Begin Today's Reflection</span>
            </div>
          </button>
        </div>
      )}

      {/* Writing Interface */}
      {isWriting && (
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Gentle Reflection</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Mood Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">How is your heart feeling?</h3>
            <div className="flex space-x-3">
              {Object.entries(moodEmojis).map(([mood, config]) => (
                <button
                  key={mood}
                  onClick={() => setCurrentEntry({ ...currentEntry, mood: mood as any })}
                  className={`p-3 rounded-xl transition-all ${
                    currentEntry.mood === mood
                      ? `${config.bg} ring-2 ring-purple-400`
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-2xl">{config.emoji}</div>
                  <div className="text-xs mt-1 capitalize">{mood}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Your energy feels...</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="5"
                value={currentEntry.energy}
                onChange={(e) => setCurrentEntry({ ...currentEntry, energy: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-sm text-gray-600 min-w-[120px]">
                {getEnergyDescription(currentEntry.energy || 3)}
              </div>
            </div>
          </div>

          {/* Weather Icon */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Today feels like...</h3>
            <div className="flex space-x-3">
              {Object.entries(weatherIcons).map(([weather, config]) => (
                <button
                  key={weather}
                  onClick={() => setCurrentEntry({ ...currentEntry, weatherIcon: weather as any })}
                  className={`p-3 rounded-xl transition-all ${
                    currentEntry.weatherIcon === weather
                      ? 'bg-blue-100 ring-2 ring-blue-400'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <config.icon className={`h-6 w-6 ${config.color}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Gratitude Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Three gentle gratitudes</h3>
            <div className="space-y-3">
              {currentEntry.gratitude?.map((gratitude, index) => (
                <input
                  key={index}
                  type="text"
                  value={gratitude}
                  onChange={(e) => {
                    const newGratitude = [...(currentEntry.gratitude || ['', '', ''])];
                    newGratitude[index] = e.target.value;
                    setCurrentEntry({ ...currentEntry, gratitude: newGratitude });
                  }}
                  placeholder={`Gratitude ${index + 1}...`}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              ))}
            </div>
          </div>

          {/* Reflection Prompts */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Gentle prompts for reflection</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {reflectionPrompts.map((category) => (
                <div key={category.category}>
                  <h4 className="text-xs font-medium text-gray-500 mb-2">{category.category}</h4>
                  {category.prompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPrompt(prompt)}
                      className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-purple-50 rounded-lg mb-1 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            
            {selectedPrompt && (
              <div className="bg-purple-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-purple-800 italic">"{selectedPrompt}"</p>
              </div>
            )}
          </div>

          {/* Main Reflection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Your reflection</h3>
            <textarea
              value={currentEntry.reflection}
              onChange={(e) => setCurrentEntry({ ...currentEntry, reflection: e.target.value })}
              placeholder="Let your thoughts flow gently onto the page..."
              className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
            />
          </div>

          {/* Glucose Note */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">A note about your glucose journey (optional)</h3>
            <input
              type="text"
              value={currentEntry.glucoseNote || ''}
              onChange={(e) => setCurrentEntry({ ...currentEntry, glucoseNote: e.target.value })}
              placeholder="How did your body feel today? Any patterns you noticed?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleSaveEntry}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Reflection</span>
            </button>
            <button
              onClick={() => setIsWriting(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Journal Entries */}
      <div className="space-y-6">
        {entries.map((entry) => {
          const moodConfig = moodEmojis[entry.mood];
          const WeatherIcon = weatherIcons[entry.weatherIcon].icon;
          
          return (
            <div key={entry.id} className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${moodConfig.bg}`}>
                    <span className="text-xl">{moodConfig.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{entry.date}</h3>
                    <p className="text-sm text-gray-500">{entry.time}</p>
                  </div>
                </div>
                <WeatherIcon className={`h-6 w-6 ${weatherIcons[entry.weatherIcon].color}`} />
              </div>

              {entry.gratitude.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Gratitudes</h4>
                  <ul className="space-y-1">
                    {entry.gratitude.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <Sparkles className="h-3 w-3 text-yellow-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.reflection && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Reflection</h4>
                  <p className="text-gray-600 leading-relaxed">{entry.reflection}</p>
                </div>
              )}

              {entry.glucoseNote && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Glucose Journey</h4>
                  <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">{entry.glucoseNote}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Energy: {getEnergyDescription(entry.energy)}</span>
                <span className="capitalize">{entry.mood} day</span>
              </div>
            </div>
          );
        })}
      </div>

      {entries.length === 0 && !isWriting && (
        <div className="text-center py-12">
          <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your journal awaits</h3>
          <p className="text-gray-600 mb-6">Begin your journey of gentle reflection and self-discovery.</p>
        </div>
      )}
    </div>
  );
};

export default AuroraJournal;