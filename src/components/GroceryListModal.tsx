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

  const filteredItems = selectedCategory === 'all' 
    ? groceryList 
    : groceryList.filter(item => item.category === selectedCategory);

  const totalCost = groceryList
    .filter(item => !item.purchased)
    .reduce((sum, item) => sum + item.estimatedPrice, 0);

  const budgetFriendlyCount = groceryList
    .filter(item => !item.purchased && item.budgetFriendly)
    .length;

  // ...rest of the component omitted for brevity...

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-xl p-8 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Grocery List</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* ...rest of the modal content... */}
      </div>
    </div>
  );
};

export default GroceryListModal; 