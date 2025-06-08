import React, { useState } from 'react';
import { Plus, Camera, MessageCircle, TrendingUp, X, Save, Bot, BarChart3 } from 'lucide-react';

const QuickActions = () => {
  const [showMealForm, setShowMealForm] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [mealData, setMealData] = useState({
    name: '',
    carbs: '',
    calories: '',
    time: new Date().toTimeString().slice(0, 5)
  });
  const [chatMessage, setChatMessage] = useState('');

  const actions = [
    { 
      icon: Plus, 
      label: 'Log Meal', 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowMealForm(true)
    },
    { 
      icon: Camera, 
      label: 'Scan Food', 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => console.log('Food scanning feature')
    },
    { 
      icon: MessageCircle, 
      label: 'AI Chat', 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowAIChat(true)
    },
    { 
      icon: TrendingUp, 
      label: 'View Trends', 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowTrends(true)
    }
  ];

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Meal logged from Quick Actions:', mealData);
    setMealData({ name: '', carbs: '', calories: '', time: new Date().toTimeString().slice(0, 5) });
    setShowMealForm(false);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('AI Chat message:', chatMessage);
    setChatMessage('');
    // Here you would typically send the message to your AI service
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      {/* Meal Logging Modal */}
      {showMealForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Log Meal</h3>
              <button 
                onClick={() => setShowMealForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleMealSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
                <input
                  type="text"
                  value={mealData.name}
                  onChange={(e) => setMealData({...mealData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="e.g., Grilled Chicken Salad"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={mealData.carbs}
                    onChange={(e) => setMealData({...mealData, carbs: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="15"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                  <input
                    type="number"
                    value={mealData.calories}
                    onChange={(e) => setMealData({...mealData, calories: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="350"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={mealData.time}
                  onChange={(e) => setMealData({...mealData, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMealForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Chat Modal */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-900 p-2 rounded-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">FlowSense AI</h3>
                  <p className="text-sm text-gray-500">Your health assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIChat(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 min-h-[200px]">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-700">
                    <strong>AI:</strong> Hello! I'm here to help with your diabetes management. 
                    You can ask me about glucose patterns, meal suggestions, exercise recommendations, or any health questions.
                  </p>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Suggested questions:</strong>
                  </p>
                  <ul className="text-xs text-gray-500 mt-1 space-y-1">
                    <li>• "What should I eat for lunch to keep my glucose stable?"</li>
                    <li>• "Why did my glucose spike after breakfast?"</li>
                    <li>• "What exercise is best for my current glucose level?"</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleChatSubmit} className="flex space-x-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Ask me anything about your health..."
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Trends Modal */}
      {showTrends && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-900 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Health Trends</h3>
                  <p className="text-sm text-gray-500">Your progress overview</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTrends(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">7-Day Average</h4>
                  <p className="text-2xl font-bold text-gray-900">94 mg/dL</p>
                  <p className="text-sm text-green-600">↓ 3% from last week</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Time in Range</h4>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                  <p className="text-sm text-green-600">↑ 5% from last week</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Weekly Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meals logged:</span>
                    <span className="font-medium">21/21</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exercise sessions:</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Glucose readings:</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg daily carbs:</span>
                    <span className="font-medium">145g</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">AI Insights</h4>
                <p className="text-sm text-blue-800">
                  Your glucose control has improved significantly this week. The combination of consistent meal logging 
                  and regular exercise is showing positive results. Consider maintaining your current routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-2`}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;