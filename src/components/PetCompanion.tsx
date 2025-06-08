import React from 'react';
import { Heart, Star, Zap } from 'lucide-react';

interface PetCompanionProps {
  petHealth: number;
  petHappiness: number;
  petLevel: number;
  petName: string;
  glucoseInRange: boolean;
  streakDays: number;
  petType?: 'dog' | 'cat';
}

const PetCompanion: React.FC<PetCompanionProps> = ({
  petHealth,
  petHappiness,
  petLevel,
  petName,
  glucoseInRange,
  streakDays,
  petType = 'dog'
}) => {
  const getPetMood = () => {
    if (petHappiness >= 80) return 'happy';
    if (petHappiness >= 60) return 'neutral';
    if (petHappiness >= 40) return 'sad';
    return 'sick';
  };

  const getPetMessage = () => {
    if (glucoseInRange && streakDays >= 7) {
      return `${petName} is thriving! Your consistent health management is paying off.`;
    }
    if (glucoseInRange) {
      return `${petName} feels great when your glucose is in range!`;
    }
    if (streakDays >= 3) {
      return `${petName} appreciates your consistency. Keep it up!`;
    }
    return `${petName} is here to support your health journey.`;
  };

  const mood = getPetMood();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="text-center mb-6">
        {/* Simplified Pet Avatar */}
        <div className="relative inline-block">
          <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl ${
            mood === 'happy' ? 'bg-green-100' :
            mood === 'neutral' ? 'bg-gray-100' :
            mood === 'sad' ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            {petType === 'dog' ? '🐕' : '🐱'}
          </div>
          
          {/* Level Badge */}
          <div className="absolute -top-2 -right-2 bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {petLevel}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{petName}</h3>
        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          {getPetMessage()}
        </p>
      </div>

      {/* Pet Stats */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Health</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{petHealth}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${petHealth}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Happiness</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{petHappiness}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${petHappiness}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Simple Care Actions */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <button className="bg-slate-600 text-white p-3 rounded-lg flex flex-col items-center space-y-1 hover:bg-slate-700 transition-colors duration-200">
          <Heart className="h-4 w-4" />
          <span className="text-xs font-medium">Feed</span>
        </button>
        <button className="bg-slate-600 text-white p-3 rounded-lg flex flex-col items-center space-y-1 hover:bg-slate-700 transition-colors duration-200">
          <Zap className="h-4 w-4" />
          <span className="text-xs font-medium">Play</span>
        </button>
        <button className="bg-slate-600 text-white p-3 rounded-lg flex flex-col items-center space-y-1 hover:bg-slate-700 transition-colors duration-200">
          <Star className="h-4 w-4" />
          <span className="text-xs font-medium">Care</span>
        </button>
      </div>
    </div>
  );
};

export default PetCompanion;