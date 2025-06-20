import React, { useState } from 'react';
import { ShoppingCart, Plus, X, Save, Trash2, DollarSign, TrendingDown, Star, Check, Brain, Filter, Search } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredItems = groceryList.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCost = groceryList
    .filter(item => !item.purchased)
    .reduce((sum, item) => sum + item.estimatedPrice, 0);

  const budgetFriendlyCount = groceryList
    .filter(item => !item.purchased && item.budgetFriendly)
    .length;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl mx-4 rounded-2xl shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Smart Grocery List</h3>
              <p className="text-sm text-green-100">Budget-friendly, diabetes-conscious shopping</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Estimated Total</span>
              </div>
              <p className="text-2xl font-bold text-green-600">${totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Budget Items</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{budgetFriendlyCount}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Total Items</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{groceryList.length}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </button>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">AI Budget Recommendations</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{rec.item}</h5>
                    <span className="text-sm font-bold text-green-600">${rec.price.toFixed(2)}</span>
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

          {/* Grocery List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Your List ({filteredItems.length} items)</span>
            </h4>
            {filteredItems.map((item) => (
              <div key={item.id} className={`border rounded-lg p-4 transition-all duration-200 ${
                item.purchased ? 'bg-gray-50 border-gray-300 opacity-75' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => handleTogglePurchased(item.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.purchased 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {item.purchased && <Check className="h-3 w-3" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className={`font-medium ${item.purchased ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.name}
                        </h5>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {item.category}
                        </span>
                        {item.budgetFriendly && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                            Budget
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{item.quantity}</span>
                        <span className="font-semibold text-green-600">${item.estimatedPrice.toFixed(2)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.glucoseImpact === 'low' ? 'bg-green-100 text-green-700' :
                          item.glucoseImpact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.glucoseImpact} impact
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic">{item.notes}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Budget Tips */}
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-3">💡 Budget Shopping Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {budgetTips.map((tip, index) => (
                <p key={index} className="text-sm text-yellow-800">{tip}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Add Item Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Add New Item</h4>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Whole Wheat Bread"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Glucose Impact</label>
                    <select
                      value={newItem.glucoseImpact}
                      onChange={(e) => setNewItem({...newItem, glucoseImpact: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.estimatedPrice}
                      onChange={(e) => setNewItem({...newItem, estimatedPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="2.99"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="text"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="1 loaf"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea
                    value={newItem.notes}
                    onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Any special notes..."
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceryListModal;