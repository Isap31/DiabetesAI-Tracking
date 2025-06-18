import React, { useState, useEffect } from 'react';
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
  TreePine,
  Feather,
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  Mic,
  Book,
  Coffee,
  Smile,
  Hug,
  Rainbow,
  Butterfly
} from 'lucide-react';

interface CompassionModeProps {
  isActive: boolean;
  onToggle: () => void;
  userMood: 'struggling' | 'overwhelmed' | 'disappointed' | 'anxious' | 'tired';
  recentChallenge?: string;
}

const CompassionMode: React.FC<CompassionModeProps> = ({
  isActive,
  onToggle,
  userMood,
  recentChallenge
}) => {
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
      color: "from-blue-400 to-purple-500",
      icon: Heart
    },
    overwhelmed: {
      message: "Take a deep breath. You don't have to carry everything at once. One small step is enough.",
      color: "from-green-400 to-blue-500",
      icon: Waves
    },
    disappointed: {
      message: "Disappointment shows you care deeply. That caring heart is your strength, not your weakness.",
      color: "from-pink-400 to-purple-500",
      icon: Flower
    },
    anxious: {
      message: "Your feelings are valid. Anxiety is your mind trying to protect you. You are safe right now.",
      color: "from-purple-400 to-pink-500",
      icon: Moon
    },
    tired: {
      message: "Rest is not giving up. Rest is how you gather strength for tomorrow's possibilities.",
      color: "from-indigo-400 to-blue-500",
      icon: Star
    }
  };

  // Calming soundscapes
  const soundscapes = [
    { id: 'rain', name: 'Gentle Rain', icon: Cloud, description: 'Soft rainfall on leaves' },
    { id: 'ocean', name: 'Ocean Waves', icon: Waves, description: 'Rhythmic waves on shore' },
    { id: 'forest', name: 'Forest Whispers', icon: TreePine, description: 'Wind through trees' },
    { id: 'birds', name: 'Morning Birds', icon: Feather, description: 'Peaceful bird songs' },
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
            return current === 'hold' ? 2 : 4; // Hold for 2, inhale/exhale for 4
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showBreathingGuide, breathingPhase]);

  const currentMessage = compassionateMessages[userMood];

  if (!isActive) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-20 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-50"
      >
        <Heart className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Compassion Mode</h1>
              <p className="text-purple-200">A gentle space for your heart</p>
            </div>
          </div>
          
          <button
            onClick={onToggle}
            className="bg-white bg-opacity-20 p-3 rounded-full text-white hover:bg-opacity-30 transition-all"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Personalized Message */}
          <div className={`bg-gradient-to-r ${currentMessage.color} bg-opacity-20 rounded-2xl p-6 text-center backdrop-blur-sm`}>
            <currentMessage.icon className="h-12 w-12 text-white mx-auto mb-4" />
            <p className="text-xl text-white leading-relaxed font-light">
              {currentMessage.message}
            </p>
            {recentChallenge && (
              <p className="text-purple-200 mt-4 text-sm">
                I noticed you're working through: {recentChallenge}
              </p>
            )}
          </div>

          {/* Breathing Exercise */}
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Gentle Breathing</h3>
            
            {!showBreathingGuide ? (
              <div className="text-center">
                <p className="text-purple-200 mb-6">
                  Let's breathe together. A simple practice to find your center.
                </p>
                <button
                  onClick={() => setShowBreathingGuide(true)}
                  className="bg-white bg-opacity-20 text-white px-8 py-3 rounded-full hover:bg-opacity-30 transition-all"
                >
                  Begin Breathing Exercise
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className={`absolute inset-0 rounded-full border-4 border-white transition-all duration-1000 ${
                    breathingPhase === 'inhale' ? 'scale-110 border-opacity-100' :
                    breathingPhase === 'hold' ? 'scale-110 border-opacity-60' :
                    'scale-90 border-opacity-40'
                  }`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white text-lg font-medium capitalize">{breathingPhase}</p>
                      <p className="text-purple-200 text-3xl font-bold">{breathingCount}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-purple-200 mb-4">
                  {breathingPhase === 'inhale' && 'Breathe in slowly and deeply...'}
                  {breathingPhase === 'hold' && 'Hold gently...'}
                  {breathingPhase === 'exhale' && 'Release and let go...'}
                </p>
                
                <button
                  onClick={() => setShowBreathingGuide(false)}
                  className="bg-white bg-opacity-20 text-white px-6 py-2 rounded-full hover:bg-opacity-30 transition-all"
                >
                  Finish Exercise
                </button>
              </div>
            )}
          </div>

          {/* Poetry Section */}
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Healing Words</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPoem(Math.max(0, currentPoem - 1))}
                  className="bg-white bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-30 transition-all"
                  disabled={currentPoem === 0}
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentPoem(Math.min(healingPoetry.length - 1, currentPoem + 1))}
                  className="bg-white bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-30 transition-all"
                  disabled={currentPoem === healingPoetry.length - 1}
                >
                  →
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-2xl font-light text-white mb-6">{healingPoetry[currentPoem].title}</h4>
              <div className="space-y-3 mb-6">
                {healingPoetry[currentPoem].verses.map((verse, index) => (
                  <p key={index} className="text-lg text-purple-100 leading-relaxed">
                    {verse}
                  </p>
                ))}
              </div>
              <p className="text-purple-300 italic">— {healingPoetry[currentPoem].author}</p>
            </div>
          </div>

          {/* Soundscape Section */}
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Calming Sounds</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {soundscapes.map((soundscape) => (
                <button
                  key={soundscape.id}
                  onClick={() => setSelectedSoundscape(
                    selectedSoundscape === soundscape.id ? null : soundscape.id
                  )}
                  className={`p-4 rounded-xl transition-all ${
                    selectedSoundscape === soundscape.id
                      ? 'bg-white bg-opacity-30 ring-2 ring-white'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  }`}
                >
                  <soundscape.icon className="h-8 w-8 text-white mx-auto mb-2" />
                  <h4 className="text-white font-medium text-sm">{soundscape.name}</h4>
                  <p className="text-purple-200 text-xs">{soundscape.description}</p>
                </button>
              ))}
            </div>
            
            {selectedSoundscape && (
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="bg-white bg-opacity-20 p-3 rounded-full text-white hover:bg-opacity-30 transition-all"
                  >
                    {isPlayingAudio ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  <p className="text-white">
                    {isPlayingAudio ? 'Playing' : 'Paused'} • {soundscapes.find(s => s.id === selectedSoundscape)?.name}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Gentle Reminders */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Gentle Reminders</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                <Smile className="h-6 w-6 text-yellow-300 mb-2" />
                <p className="text-white text-sm">
                  Progress isn't always linear. Some days are for rest and recovery.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                <Hug className="h-6 w-6 text-pink-300 mb-2" />
                <p className="text-white text-sm">
                  You deserve the same kindness you give to others.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                <Rainbow className="h-6 w-6 text-purple-300 mb-2" />
                <p className="text-white text-sm">
                  Every small step forward is worth celebrating.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                <Butterfly className="h-6 w-6 text-blue-300 mb-2" />
                <p className="text-white text-sm">
                  Transformation happens slowly, gently, in its own time.
                </p>
              </div>
            </div>
          </div>

          {/* Return to Journey */}
          <div className="text-center pb-8">
            <p className="text-purple-200 mb-6">
              Take all the time you need. When you're ready, your journey continues.
            </p>
            <button
              onClick={onToggle}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Return to My Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompassionMode;