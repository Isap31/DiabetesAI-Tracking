import React, { useState } from 'react';
import { ShoppingCart, Plus, X, Save, Trash2, DollarSign, TrendingDown, Star, Check, Brain } from 'lucide-react';

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  estimatedPrice: number;
  glucoseImpact: 'low' | 'medium' | 'high';
  budgetFriendly: boolean;
  quantity: string;
  notes?: string;
  purchased: boolean;
}

interface GroceryListModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const GroceryListModal: React.FC<GroceryListModalProps> = ({ isVisible, onClose }) => {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([
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
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Vegetables',
    estimatedPrice: '',
    glucoseImpact: 'low' as 'low' | 'medium' | 'high',
    quantity: '',
    notes: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    "🥫 Buy generic/store brands - often 20-30% cheaper",
    "❄️ Frozen vegetables are nutritious and budget-friendly",
    "🌾 Buy grains and legumes in bulk for maximum savings",
    "🥚 Eggs are one of the cheapest complete proteins available"
  ];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.estimatedPrice) return;

    const item: GroceryItem = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      estimatedPrice: parseFloat(newItem.estimatedPrice),
      glucoseImpact: newItem.glucoseImpact,
      budgetFriendly: parseFloat(newItem.estimatedPrice) <= 3.00,
      quantity: newItem.quantity,
      notes: newItem.notes,
      purchased: false
    };

    setGroceryList(prev => [...prev, item]);
    setNewItem({
      name: '',
      category: 'Vegetables',
      estimatedPrice: '',
      glucoseImpact: 'low',
      quantity: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleTogglePurchased = (id: number) => {
    setGroceryList(prev => prev.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const handleDeleteItem = (id: number) => {
    setGroceryList(prev => prev.filter(item => item.id !== id));
  };

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

    setGroceryList(prev => [...prev, item]);
  };

  const filteredItems = selectedCategory === 'all' 
    ? groceryList 
    : groceryList.filter(item => item.category === selectedCategory);

  const totalCost = groceryList
    .filter(item => !item.purchased)
    .reduce((sum, item) => sum + item.estimatedPrice, 0);

  const budgetFriendlyCount = groceryList
    .filter(item => !item.purchased && item.budgetFriendly)
    .length;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Smart Grocery List</h3>
              <p className="text-sm text-green-100">AI-powered budget-friendly diabetes nutrition</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Main Grocery List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Estimated Total</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">${totalCost.toFixed(2)}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Budget Items</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{budgetFriendlyCount}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Total Items</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">{groceryList.length}</p>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Items' : category}
                  </button>
                ))}
              </div>

              {/* Add Item Button */}
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Item</span>
              </button>

              {/* Add Item Form */}
              {showAddForm && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Add New Item</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Quinoa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.slice(1).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Price ($)</label>
                      <input
                        type="number"
                        value={newItem.estimatedPrice}
                        onChange={(e) => setNewItem({...newItem, estimatedPrice: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="2.50"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Glucose Impact</label>
                      <select
                        value={newItem.glucoseImpact}
                        onChange={(e) => setNewItem({...newItem, glucoseImpact: e.target.value as 'low' | 'medium' | 'high'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Low Impact</option>
                        <option value="medium">Medium Impact</option>
                        <option value="high">High Impact</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="text"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1 lb, 2 cans, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <input
                        type="text"
                        value={newItem.notes}
                        onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Optional notes"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={handleAddItem}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Add Item</span>
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Grocery Items List */}
              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <div key={item.id} className={`p-4 rounded-lg border transition-all ${
                    item.purchased 
                      ? 'bg-gray-50 border-gray-200 opacity-75' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <button
                          onClick={() => handleTogglePurchased(item.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            item.purchased
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {item.purchased && <Check className="h-3 w-3 text-white" />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-medium ${item.purchased ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {item.name}
                            </h4>
                            {item.budgetFriendly && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Budget-Friendly
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.glucoseImpact === 'low' ? 'bg-green-100 text-green-800' :
                              item.glucoseImpact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.glucoseImpact} glucose impact
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{item.category}</span>
                            <span>{item.quantity}</span>
                            <span className="font-medium text-green-600">${item.estimatedPrice.toFixed(2)}</span>
                          </div>
                          {item.notes && (
                            <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations & Tips Sidebar */}
            <div className="space-y-6">
              {/* AI Recommendations */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">AI Recommendations</h4>
                </div>
                <div className="space-y-3">
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-blue-100">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-gray-900 text-sm">{rec.item}</h5>
                        <span className="text-sm font-medium text-green-600">${rec.price.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{rec.reason}</p>
                      <button
                        onClick={() => handleAddRecommendation(rec)}
                        className="w-full bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700 transition-colors"
                      >
                        Add to List
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Tips */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-3">💰 Budget Tips</h4>
                <div className="space-y-2">
                  {budgetTips.map((tip, index) => (
                    <div key={index} className="text-sm text-green-800 leading-relaxed">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Diabetes-Friendly Shopping Guide */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-3">🩺 Diabetes-Friendly Guide</h4>
                <div className="space-y-2 text-sm text-purple-800">
                  <div><strong>Low Glucose Impact:</strong> Non-starchy vegetables, lean proteins, nuts</div>
                  <div><strong>Medium Impact:</strong> Whole grains, legumes, fruits</div>
                  <div><strong>High Impact:</strong> Refined grains, sugary foods (limit these)</div>
                  <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                    <strong>💡 Pro Tip:</strong> Pair carbs with protein or fiber to slow glucose absorption
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryListModal;