import React from 'react';
import PetCompanion from './PetCompanion';
import { Gift, Star, Heart, Zap, Crown, Bone } from 'lucide-react';

const PetTab = () => {
  const petItems = [
    { icon: Heart, name: 'Health Treat', cost: 50, description: 'Boost your pet\'s health', color: 'bg-red-500' },
    { icon: Star, name: 'Happy Toy', cost: 75, description: 'Increase happiness', color: 'bg-yellow-500' },
    { icon: Zap, name: 'Energy Boost', cost: 100, description: 'Level up faster', color: 'bg-blue-500' },
    { icon: Bone, name: 'Premium Treat', cost: 125, description: 'Special dog/cat treat', color: 'bg-amber-500' },
    { icon: Crown, name: 'Royal Collar', cost: 200, description: 'Stylish accessory', color: 'bg-purple-500' },
    { icon: Gift, name: 'Mystery Box', cost: 150, description: 'Random surprise!', color: 'bg-pink-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Pet Companion */}
      <PetCompanion
        petHealth={85}
        petHappiness={92}
        petLevel={12}
        petName="Aurora"
        glucoseInRange={true}
        streakDays={12}
        petType="dog"
      />

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
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white px-3 py-1 rounded-full">
            <Star className="h-4 w-4" />
            <span className="text-sm font-bold">2,450 coins</span>
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
              <button className="w-full bg-gradient-to-r from-purple-500 to-teal-500 text-white py-2 px-3 rounded-lg text-xs font-bold hover:shadow-lg transition-all duration-200">
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