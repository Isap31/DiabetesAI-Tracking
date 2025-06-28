import React, { useState } from 'react';
import { Gift, Star, Heart, Zap, Crown, Bone, ChevronDown, Sparkles, Trophy, Info } from 'lucide-react';

const PetTab = () => {
  const [petStats, setPetStats] = useState({
    health: 85,
    happiness: 92,
    level: 12,
    energy: 78,
    coins: 2450
  });

  const [selectedPetType, setSelectedPetType] = useState<'dog' | 'horse' | 'turtle'>('dog');
  const [showPetSelector, setShowPetSelector] = useState(false);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);

  const petTypes = {
    dog: { emoji: '🐕', name: 'Aurora the Dog', description: 'Loyal and energetic companion' },
    horse: { emoji: '🐎', name: 'Thunder the Horse', description: 'Majestic and strong companion' },
    turtle: { emoji: '🐢', name: 'Sage the Turtle', description: 'Wise and steady companion' }
  };

  const petItems = [
    { icon: Heart, name: 'Health Treat', cost: 50, description: 'Boost your pet\'s health', color: 'bg-red-500' },
    { icon: Star, name: 'Happy Toy', cost: 75, description: 'Increase happiness', color: 'bg-yellow-500' },
    { icon: Zap, name: 'Energy Boost', cost: 100, description: 'Level up faster', color: 'bg-blue-500' },
    { icon: Bone, name: 'Premium Treat', cost: 125, description: 'Special companion treat', color: 'bg-amber-500' },
    { icon: Crown, name: 'Royal Accessory', cost: 200, description: 'Stylish companion gear', color: 'bg-purple-500' },
    { icon: Gift, name: 'Mystery Box', cost: 150, description: 'Random surprise!', color: 'bg-pink-500' }
  ];

  const handlePetAction = (action: 'feed' | 'play' | 'care') => {
    let newStats = { ...petStats };
    let feedback = '';
    let coinCost = 0;

    const petName = petTypes[selectedPetType].name.split(' ')[0];

    switch (action) {
      case 'feed':
        if (petStats.coins >= 25) {
          newStats.health = Math.min(100, petStats.health + 10);
          newStats.happiness = Math.min(100, petStats.happiness + 5);
          coinCost = 25;
          feedback = `${petName} enjoyed the healthy meal! Health +10, Happiness +5`;
        } else {
          feedback = `Not enough coins to feed ${petName}. Keep logging your meals to earn more!`;
        }
        break;
      
      case 'play':
        if (petStats.coins >= 15) {
          newStats.happiness = Math.min(100, petStats.happiness + 15);
          newStats.energy = Math.max(0, petStats.energy - 10);
          coinCost = 15;
          feedback = `${petName} had a great time playing! Happiness +15, but they're a bit tired now.`;
        } else {
          feedback = `Not enough coins to play with ${petName}. Log some exercise to earn more coins!`;
        }
        break;
      
      case 'care':
        if (petStats.coins >= 35) {
          newStats.health = Math.min(100, petStats.health + 5);
          newStats.happiness = Math.min(100, petStats.happiness + 10);
          newStats.energy = Math.min(100, petStats.energy + 15);
          coinCost = 35;
          feedback = `${petName} feels loved and cared for! All stats improved.`;
        } else {
          feedback = `Not enough coins for care session. Keep tracking your glucose to earn more!`;
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
    const petName = petTypes[selectedPetType].name.split(' ')[0];
    
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
        case 'Royal Accessory':
          newStats.happiness = Math.min(100, newStats.happiness + 30);
          break;
        case 'Mystery Box':
          const randomBoost = Math.floor(Math.random() * 20) + 10;
          newStats.health = Math.min(100, newStats.health + randomBoost);
          newStats.happiness = Math.min(100, newStats.happiness + randomBoost);
          break;
      }
      
      setPetStats(newStats);
      setFeedbacks(prev => [...prev, `${petName} loves the ${item.name}! 🎉`]);
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

  const currentPet = petTypes[selectedPetType];

  return (
    <div className="space-y-6 pb-20">
      {/* Explanation Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-start space-x-4">
          <div className="bg-purple-500 p-3 rounded-xl">
            <Info className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Virtual Health Companion</h2>
            <p className="text-gray-700 leading-relaxed">
              Meet your personal health companion! This virtual pet grows and thrives based on your diabetes management habits. 
              The better you take care of yourself by logging meals, checking glucose levels, and staying active, the happier 
              and healthier your companion becomes. It's a fun, motivating way to stay consistent with your health routine.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <strong className="text-purple-700">Earn Coins:</strong> Log meals, glucose readings, and exercise to earn coins for pet care.
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <strong className="text-purple-700">Pet Growth:</strong> Your companion's health reflects your diabetes management consistency.
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <strong className="text-purple-700">Motivation:</strong> A happy pet means you're doing great with your health goals!
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Modern Pet Companion Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Companion</h3>
              <p className="text-sm text-purple-600">Level {petStats.level} • {petStats.coins} coins</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowPetSelector(!showPetSelector)}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
            >
              <span className="text-2xl">{currentPet.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{selectedPetType.charAt(0).toUpperCase() + selectedPetType.slice(1)}</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
            
            {showPetSelector && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {Object.entries(petTypes).map(([type, pet]) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedPetType(type as 'dog' | 'horse' | 'turtle');
                      setShowPetSelector(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                      selectedPetType === type ? 'bg-purple-50 border-l-4 border-purple-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{pet.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-900">{pet.name}</div>
                        <div className="text-sm text-gray-500">{pet.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modern Pet Avatar */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className={`w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl ${
              petStats.happiness >= 80 ? 'bg-gradient-to-br from-green-100 to-green-200' :
              petStats.happiness >= 60 ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
              petStats.happiness >= 40 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' : 
              'bg-gradient-to-br from-red-100 to-red-200'
            } shadow-xl border-4 border-white`}>
              {currentPet.emoji}
            </div>
            
            {/* Level Badge with modern design */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold shadow-lg border-4 border-white">
              {petStats.level}
            </div>

            {/* Mood indicator */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                petStats.happiness >= 80 ? 'bg-green-500 text-white' :
                petStats.happiness >= 60 ? 'bg-blue-500 text-white' :
                petStats.happiness >= 40 ? 'bg-yellow-500 text-white' : 
                'bg-red-500 text-white'
              }`}>
                {petStats.happiness >= 80 ? '😊 Happy' :
                 petStats.happiness >= 60 ? '😌 Content' :
                 petStats.happiness >= 40 ? '😐 Okay' : '😔 Sad'}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentPet.name}</h3>
          <p className="text-sm text-gray-600 bg-white bg-opacity-70 rounded-lg p-3 border border-purple-200">
            {petStats.happiness >= 80 && petStats.health >= 80 
              ? `${currentPet.name.split(' ')[0]} is thriving! Your consistent health management is paying off.`
              : petStats.happiness >= 60 
              ? `${currentPet.name.split(' ')[0]} feels great when your glucose is in range!`
              : `${currentPet.name.split(' ')[0]} is here to support your health journey.`}
          </p>
        </div>

        {/* Modern Stats Display */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <Heart className="h-5 w-5 text-red-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900">{petStats.health}%</div>
            <div className="text-xs text-gray-500">Health</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${petStats.health}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900">{petStats.happiness}%</div>
            <div className="text-xs text-gray-500">Happiness</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${petStats.happiness}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <Zap className="h-5 w-5 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900">{petStats.energy}%</div>
            <div className="text-xs text-gray-500">Energy</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${petStats.energy}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Modern Care Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handlePetAction('feed')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <Heart className="h-5 w-5" />
            <span className="text-sm font-medium">Feed</span>
            <span className="text-xs text-green-100">25 coins</span>
          </button>
          <button 
            onClick={() => handlePetAction('play')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <Zap className="h-5 w-5" />
            <span className="text-sm font-medium">Play</span>
            <span className="text-xs text-blue-100">15 coins</span>
          </button>
          <button 
            onClick={() => handlePetAction('care')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl flex flex-col items-center space-y-2 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <Star className="h-5 w-5" />
            <span className="text-sm font-medium">Care</span>
            <span className="text-xs text-purple-100">35 coins</span>
          </button>
        </div>
      </div>

      {/* Pet Care Tips */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Pet Care Tips</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <Heart className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Keep glucose in range</p>
              <p className="text-xs text-gray-600">Your companion's health improves when your glucose stays between 70-140 mg/dL</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Star className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Log meals regularly</p>
              <p className="text-xs text-gray-600">Consistent logging makes your companion happier and helps them grow</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Exercise together</p>
              <p className="text-xs text-gray-600">Physical activity boosts both your health and your companion's energy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pet Store */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900 flex items-center space-x-2">
            <Gift className="h-5 w-5 text-purple-500" />
            <span>Pet Store</span>
          </h3>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-sm">
            <Star className="h-4 w-4" />
            <span className="text-sm font-bold">{petStats.coins} coins</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {petItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-purple-300">
              <div className={`${item.color} p-3 rounded-xl w-fit mb-3 shadow-sm`}>
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{item.name}</h4>
              <p className="text-xs text-gray-600 mb-3">{item.description}</p>
              <button 
                onClick={() => handlePurchase(item)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                  petStats.coins >= item.cost 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transform hover:-translate-y-0.5' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={petStats.coins < item.cost}
              >
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{item.cost} coins</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetTab;