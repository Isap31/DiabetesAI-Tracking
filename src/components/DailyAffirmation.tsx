import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw, Star, Sun, Sparkles, Moon, Zap, Rainbow } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface DailyAffirmationProps {
  language: string;
}

const DailyAffirmation: React.FC<DailyAffirmationProps> = ({ language }) => {
  const t = useTranslation(language);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const affirmations = {
    en: [
      "🌟 You are stronger than your challenges and more resilient than you know! 💪",
      "🌱 Every healthy choice you make today is an investment in your future self! 💚",
      "🏆 Your commitment to managing your health shows incredible strength and wisdom! ✨",
      "🌈 You have the power to create positive change in your life, one day at a time! 🌸",
      "💖 Your body is amazing and capable of healing and thriving with your care! 🌺",
      "📊 Each glucose reading is valuable data that helps you understand your body better! 🧠",
      "🦋 You are not defined by your diabetes - you are defined by your courage and determination! 🌟",
      "🎯 Progress, not perfection, is what matters on your health journey! 🚀",
      "🎉 You deserve to feel proud of every step you take toward better health! 👏",
      "💝 Your dedication to tracking and managing your health is truly inspiring! ⭐"
    ]
  };

  const currentAffirmations = affirmations[language as keyof typeof affirmations] || affirmations.en;

  // Get daily affirmation based on date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentAffirmation(dayOfYear % currentAffirmations.length);
  }, [language, currentAffirmations.length]);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAffirmation((prev) => (prev + 1) % currentAffirmations.length);
      setIsAnimating(false);
    }, 300);
  };

  const getTimeBasedIcon = () => {
    const hour = new Date().getHours();
    if (hour < 6) return Moon;
    if (hour < 12) return Sun;
    if (hour < 18) return Star;
    return Sparkles;
  };

  const TimeIcon = getTimeBasedIcon();

  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
      {/* Enhanced background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-pulse-slow" style={{animationDelay: '3s'}}></div>
      
      {/* Floating sparkles */}
      <div className="absolute top-8 left-8">
        <Sparkles className="h-4 w-4 text-white text-opacity-60 animate-pulse" />
      </div>
      <div className="absolute bottom-8 right-8">
        <Star className="h-5 w-5 text-white text-opacity-60 animate-pulse" style={{animationDelay: '1s'}} />
      </div>
      <div className="absolute top-16 right-16">
        <Heart className="h-3 w-3 text-white text-opacity-60 animate-pulse" style={{animationDelay: '2s'}} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-2xl backdrop-blur-sm shadow-lg">
              <TimeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">✨ Daily Inspiration ✨</h3>
              <p className="text-sm text-purple-100 font-medium">Your moment of positivity 🌈</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-white bg-opacity-20 p-3 rounded-2xl hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            title="Get new affirmation"
          >
            <RefreshCw className={`h-5 w-5 text-white transition-transform duration-500 ${isAnimating ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className={`text-xl font-semibold text-white text-center min-h-[60px] flex items-center justify-center leading-relaxed transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {currentAffirmations[currentAffirmation]}
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {currentAffirmations.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentAffirmation 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white bg-opacity-40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyAffirmation;