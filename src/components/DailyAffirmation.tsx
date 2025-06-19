import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw, Star, Sun, Sparkles, Moon } from 'lucide-react';
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
    ],
    // ...other languages omitted for brevity...
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
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <TimeIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">✨ Daily Inspiration ✨</h3>
              <p className="text-sm text-purple-100">Your moment of positivity 🌈</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-all duration-200"
            title="Get new affirmation"
          >
            <RefreshCw className={`h-4 w-4 text-white transition-transform duration-300 ${isAnimating ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div className="text-lg font-semibold text-white text-center min-h-[48px] flex items-center justify-center">
          {currentAffirmations[currentAffirmation]}
        </div>
      </div>
    </div>
  );
};

export default DailyAffirmation; 