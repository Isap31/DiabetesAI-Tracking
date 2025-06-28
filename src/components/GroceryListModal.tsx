import React, { useState } from 'react';
import { ShoppingCart, Plus, X, Save, Trash2, DollarSign, TrendingDown, Star, Check, Brain, Filter, Search } from 'lucide-react';
import GroceryItemForm from './GroceryItemForm';
import { useGroceryList, GroceryItem } from '../hooks/useGroceryList';

interface GroceryListModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const GroceryListModal: React.FC<GroceryListModalProps> = ({ isVisible, onClose }) => {
  const initialList: GroceryItem[] = [
    {
      id: 1,
      name: 'Dried Black Beans',
      category: 'Protein',
      estimatedPrice: 1.50,
      glucoseImpact: 'low',
      budgetFriendly: true,
      quantity: '1 lb bag',
      notes: 'High fiber, slow-release carbs',
      purchased: false
    },
    {
      id: 2,
      name: 'Rolled Oats',
      category: 'Grains',
      estimatedPrice: 3.00,
      glucoseImpact: 'medium',
      budgetFriendly: true,
      quantity: '42 oz container',
      notes: 'Beta-glucan helps with glucose control',
      purchased: false
    },
    {
      id: 3,
      name: 'Frozen Mixed Vegetables',
      category: 'Vegetables',
      estimatedPrice: 1.25,
      glucoseImpact: 'low',
      budgetFriendly: true,
      quantity: '1 lb bag',
      notes: 'Year-round availability, no prep waste',
      purchased: true
    },
    {
      id: 4,
      name: 'Eggs',
      category: 'Protein',
      estimatedPrice: 2.50,
      glucoseImpact: 'low',
      budgetFriendly: true,
      quantity: '1 dozen',
      notes: 'Complete protein, versatile',
      purchased: false
    },
    {
      id: 5,
      name: 'Peanut Butter',
      category: 'Protein',
      estimatedPrice: 3.50,
      glucoseImpact: 'low',
      budgetFriendly: true,
      quantity: '18 oz jar',
      notes: 'Natural, no added sugar variety',
      purchased: false
    }
  ];
  const {
    groceryList,
    addItem,
    deleteItem,
    togglePurchased,
    filteredItems,
    totalCost,
    budgetFriendlyCount,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm
  } = useGroceryList(initialList);
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['all', 'Vegetables', 'Protein', 'Grains', 'Dairy', 'Fruits', 'Pantry'];

  const aiRecommendations = [
    {
      item: 'Canned Tuna',
      reason: 'High protein, omega-3s, $1/can, glucose-friendly',
      category: 'Protein',
      price: 1.00
    },
    {
      item: 'Sweet Potatoes',
      reason: 'Complex carbs, fiber, vitamin A, $1/lb',
      category: 'Vegetables',
      price: 1.00
    },
    {
      item: 'Lentils (dried)',
      reason: 'Plant protein, fiber, iron, $1.50/lb',
      category: 'Protein',
      price: 1.50
    },
    {
      item: 'Cabbage',
      reason: 'Low carb, high fiber, vitamin C, $0.50/lb',
      category: 'Vegetables',
      price: 0.50
    },
    {
      item: 'Brown Rice',
      reason: 'Whole grain, B vitamins, $2/2lb bag',
      category: 'Grains',
      price: 2.00
    }
  ];

  const budgetTips = [
    "🛒 Shop sales and use store apps for digital coupons",
    "📅 Plan meals around seasonal produce for best prices",
    "🛒 Buy generic/store brands - often 20-30% cheaper",
    "❄️ Frozen vegetables are nutritious and budget-friendly",
    "🌾 Buy grains and legumes in bulk for maximum savings",
    "🥚 Eggs are one of the cheapest complete proteins available"
  ];

  const handleAddRecommendation = (recommendation: any) => {
    const item: GroceryItem = {
      id: Date.now(),
      name: recommendation.item,
      category: recommendation.category,
      estimatedPrice: recommendation.price,
      glucoseImpact: 'low',
      budgetFriendly: true,
      quantity: '1 unit',
      notes: recommendation.reason,
      purchased: false
    };

    addItem(item);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4" role="dialog" aria-modal="true" aria-label="Grocery List Modal">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-4xl mx-auto rounded-2xl shadow-xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="bg-white bg-opacity-20 p-1.5 md:p-2 rounded-lg">
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Smart Grocery List</h3>
              <p className="text-xs md:text-sm text-green-100">Budget-friendly, diabetes-conscious shopping</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white bg-opacity-20 p-1.5 md:p-2 rounded-lg hover:bg-opacity-30 transition-colors">
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 md:p-4 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                <span className="text-xs md:text-sm font-medium text-green-900 dark:text-green-100">Estimated Total</span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">${totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs md:text-sm font-medium text-blue-900 dark:text-blue-100">Budget Items</span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">{budgetFriendlyCount}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-xs md:text-sm font-medium text-purple-900 dark:text-purple-100">Total Items</span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">{groceryList.length}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 md:py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
            <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
              ))}
            </div>
          </div>

          {/* Grocery Items */}
          <div className="space-y-3 md:space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 p-3 md:p-4 transition-all duration-200 ${
                  item.purchased ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-semibold text-sm md:text-base truncate ${
                        item.purchased 
                          ? 'text-gray-500 dark:text-gray-400 line-through' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {item.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.glucoseImpact === 'low' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : item.glucoseImpact === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {item.glucoseImpact}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.quantity}</span>
                      <span>•</span>
                      <span className="font-medium text-green-600 dark:text-green-400">${item.estimatedPrice.toFixed(2)}</span>
                      {item.budgetFriendly && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">Budget-friendly</span>
                        </>
                      )}
                    </div>
                    {item.notes && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-3">
                    <button
                      onClick={() => togglePurchased(item.id)}
                      className={`p-1.5 rounded-full transition-colors ${
                        item.purchased 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                          : 'bg-gray-100 text-gray-400 dark:bg-slate-600 dark:text-gray-500 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900 dark:hover:text-green-400'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                      className="p-1.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Recommendations */}
          <div className="mt-6 md:mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {aiRecommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-3 md:p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">{recommendation.item}</h4>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">${recommendation.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">{recommendation.reason}</p>
                  <button
                    onClick={() => handleAddRecommendation(recommendation)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm font-medium py-1.5 md:py-2 px-3 rounded-lg transition-colors"
                  >
                    Add to List
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Tips */}
          <div className="mt-6 md:mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget Tips</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {budgetTips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-sm text-blue-900 dark:text-blue-100"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Item Button */}
        <div className="p-4 md:p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600">
                <button 
            onClick={() => setShowAddForm(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
            <Plus className="h-5 w-5" />
            <span>Add Custom Item</span>
                </button>
              </div>
      </div>

      {/* Add Item Form Modal */}
      {showAddForm && (
              <GroceryItemForm
                initialItem={{
                  name: '',
                  category: 'Vegetables',
                  estimatedPrice: '',
                  glucoseImpact: 'low',
                  quantity: '',
                  notes: ''
                }}
          onSave={(item) => {
                  addItem({
                    ...item,
              id: Date.now(),
              estimatedPrice: parseFloat(item.estimatedPrice) || 0,
              budgetFriendly: true,
              purchased: false
                  });
                  setShowAddForm(false);
                }}
                onCancel={() => setShowAddForm(false)}
              />
        )}
    </div>
  );
};

export default GroceryListModal;