import React, { useState } from 'react';
import PetCompanion from './PetCompanion';
import { Gift, Star, Heart, Zap, Crown, Bone } from 'lucide-react';

const PetTab = () => {
  const [petStats, setPetStats] = useState({
    health: 85,
    happiness: 92,
    level: 12,
    energy: 78,
    coins: 2450
  });

  const [feedbacks, setFeedbacks] = useState<string[]>([]);

  const petItems = [
    { icon: Heart, name: 'Health Treat', cost: 50, description: 'Boost your pet\'s health', color: 'bg-red-500' },
    { icon: Star, name: 'Happy Toy', cost: 75, description: 'Increase happiness', color: 'bg-yellow-500' },
    { icon: Zap, name: 'Energy Boost', cost: 100, description: 'Level up faster', color: 'bg-blue-500' },
    { icon: Bone, name: 'Premium Treat', cost: 125, description: 'Special dog/cat treat', color: 'bg-amber-500' },
    { icon: Crown, name: 'Royal Collar', cost: 200, description: 'Stylish accessory', color: 'bg-purple-500' },
    { icon: Gift, name: 'Mystery Box', cost: 150, description: 'Random surprise!', color: 'bg-pink-500' }
  ];

  const handlePetAction = (action: 'feed' | 'play' | 'care') => {
    let newStats = { ...petStats };
    let feedback = '';
    let coinCost = 0;

    switch (action) {
      case 'feed':
        if (petStats.coins >= 25) {
          newStats.health = Math.min(100, petStats.health + 10);
          newStats.happiness = Math.min(100, petStats.happiness + 5);
          coinCost = 25;
          feedback = 'Aurora enjoyed the healthy meal! Health +10, Happiness +5';
        } else {
          feedback = 'Not enough coins to feed Aurora. Keep logging your meals to earn more!';
        }
        break;
      
      case 'play':
        if (petStats.coins >= 15) {
          newStats.happiness = Math.min(100, petStats.happiness + 15);
          newStats.energy = Math.max(0, petStats.energy - 10);
          coinCost = 15;
          feedback = 'Aurora had a great time playing! Happiness +15, but she\'s a bit tired now.';
        } else {
          feedback = 'Not enough coins to play with Aurora. Log some exercise to earn more coins!';
        }
        break;
      
      case 'care':
        if (petStats.coins >= 35) {
          newStats.health = Math.min(100, petStats.health + 5);
          newStats.happiness = Math.min(100, petStats.happiness + 10);
          newStats.energy = Math.min(100, petStats.energy + 15);
          coinCost = 35;
          feedback = 'Aurora feels loved and cared for! All stats improved.';
        } else {
          feedback = 'Not enough coins for care session. Keep tracking your glucose to earn more!';
        }
        break;
    }

    if (coinCost > 0) {
      newStats.coins -= coinCost;
      setPetStats(newStats);
    }

    // Add feedback and remove after 3 seconds
    setFeedbacks(prev => [...prev, feedback]);
    setTimeout(() => {
      setFeedbacks(prev => prev.slice(1));
    }, 3000);
  };

  const handlePurchase = (item: any) => {
    if (petStats.coins >= item.cost) {
      let newStats = { ...petStats };
      newStats.coins -= item.cost;
      
      // Apply item effects
      switch (item.name) {
        case 'Health Treat':
          newStats.health = Math.min(100, newStats.health + 20);
          break;
        case 'Happy Toy':
          newStats.happiness = Math.min(100, newStats.happiness + 25);
          break;
        case 'Energy Boost':
          newStats.energy = Math.min(100, newStats.energy + 30);
          break;
        case 'Premium Treat':
          newStats.health = Math.min(100, newStats.health + 15);
          newStats.happiness = Math.min(100, newStats.happiness + 15);
          break;
        case 'Royal Collar':
          newStats.happiness = Math.min(100, newStats.happiness + 30);
          break;
        case 'Mystery Box':
          const randomBoost = Math.floor(Math.random() * 20) + 10;
          newStats.health = Math.min(100, newStats.health + randomBoost);
          newStats.happiness = Math.min(100, newStats.happiness + randomBoost);
          break;
      }
      
      setPetStats(newStats);
      setFeedbacks(prev => [...prev, `Aurora loves the ${item.name}! 🎉`]);
      setTimeout(() => {
        setFeedbacks(prev => prev.slice(1));
      }, 3000);
    } else {
      setFeedbacks(prev => [...prev, `Not enough coins for ${item.name}. Need ${item.cost - petStats.coins} more coins!`]);
      setTimeout(() => {
        setFeedbacks(prev => prev.slice(1));
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Messages */}
      {feedbacks.length > 0 && (
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
              <p className="text-sm">{feedback}</p>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Pet Companion */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center mb-6">
          {/* Pet Avatar */}
          <div className="relative inline-block">
            <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl ${
              petStats.happiness >= 80 ? 'bg-green-100' :
              petStats.happiness >= 60 ? 'bg-gray-100' :
              petStats.happiness >= 40 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              🐕
            </div>
            
            {/* Level Badge */}
            <div className="absolute -top-2 -right-2 bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {petStats.level}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aurora</h3>
          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            {petStats.happiness >= 80 && petStats.health >= 80 
              ? "Aurora is thriving! Your consistent health management is paying off."
              : petStats.happiness >= 60 
              ? "Aurora feels great when your glucose is in range!"
              : "Aurora is here to support your health journey."}
          </p>
        </div>

        {/* Pet Stats */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Health</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{petStats.health}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${petStats.health}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Happiness</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{petStats.happiness}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-500"
                style={{ width: `${petStats.happiness}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Energy</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{petStats.energy}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${petStats.energy}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pet Care Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handlePetAction('feed')}
            className="bg-slate-600 text-white p-3 rounded-lg flex flex-col items-center space-y-1 hover:bg-slate-700 transition-colors duration-200"
          >
            <Heart className="h-4 w-4" />
            <span className="text-xs font-medium">Feed</span>
            <span className="text-xs text-slate-200">25 coins</span>
          </button>
          <button 
            onClick={() => handlePetAction('play')}
            className="bg-slate-600 text-white p-3 rounded-lg flex flex-col items-center space-y-1 hover:bg-slate-700 transition-colors duration-200"
          >
            <Zap className="h-4 w-4" />
            <span className="text-xs font-medium">Play</span>
            <span className="text-xs text-slate-200">15 coins</span>
          </button>
          <button 
            onClick={() => handlePetAction('care')}
            className="bg-slate-600 text-white p-3 rounded-lg flex flex-col items-center space-y-1 hover:bg-slate-700 transition-colors duration-200"
          >
            <Star className="h-4 w-4" />
            <span className="text-xs font-medium">Care</span>
            <span className="text-xs text-slate-200">35 coins</span>
          </button>
        </div>
      </div>

      {/* Pet Care Tips */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-3">Pet Care Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <Heart className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Keep glucose in range</p>
              <p className="text-xs text-gray-600">Aurora's health improves when your glucose stays between 70-140 mg/dL</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <Star className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Log meals regularly</p>
              <p className="text-xs text-gray-600">Consistent logging makes Aurora happier and helps her grow</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
            <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Exercise together</p>
              <p className="text-xs text-gray-600">Physical activity boosts both your health and Aurora's energy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pet Store */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Pet Store</h3>
          <div className="flex items-center space-x-2 bg-slate-600 text-white px-3 py-1 rounded-full">
            <Star className="h-4 w-4" />
            <span className="text-sm font-bold">{petStats.coins} coins</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {petItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className={`${item.color} p-2 rounded-lg w-fit mb-2`}>
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
              <p className="text-xs text-gray-600 mb-2">{item.description}</p>
              <button 
                onClick={() => handlePurchase(item)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                  petStats.coins >= item.cost 
                    ? 'bg-slate-600 text-white hover:bg-slate-700 hover:shadow-lg' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={petStats.coins < item.cost}
              >
                {item.cost} coins
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetTab;