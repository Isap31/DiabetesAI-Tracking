import React, { useState } from 'react';
import { Plus, Camera, MessageCircle, TrendingUp, X, Save, Bot, BarChart3 } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface QuickActionsProps {
  onDataLogged?: (data: any) => void;
  language: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onDataLogged, language }) => {
  const t = useTranslation(language);
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
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hello! I'm FlowSense AI, your diabetes management assistant. I can help you with glucose patterns, meal suggestions, exercise recommendations, and answer any health questions you have.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const actions = [
    { 
      icon: Plus, 
      label: t.logMeal, 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowMealForm(true)
    },
    { 
      icon: Camera, 
      label: t.scanFood, 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => console.log('Food scanning feature')
    },
    { 
      icon: MessageCircle, 
      label: t.aiChat, 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowAIChat(true)
    },
    { 
      icon: TrendingUp, 
      label: t.viewTrends, 
      color: 'bg-slate-600 hover:bg-slate-700',
      action: () => setShowTrends(true)
    }
  ];

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMealLog = {
      id: Date.now(),
      type: 'meal',
      data: {
        mealName: mealData.name,
        carbs: mealData.carbs,
        calories: mealData.calories,
        time: mealData.time
      },
      time: mealData.time,
      date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Meal logged from Quick Actions:', newMealLog);
    
    // Notify parent component about new data
    if (onDataLogged) {
      onDataLogged(newMealLog);
    }
    
    setMealData({ name: '', carbs: '', calories: '', time: new Date().toTimeString().slice(0, 5) });
    setShowMealForm(false);
  };

  const generateAIResponse = (userMessage: string) => {
    const responses = {
      glucose: [
        "Based on your recent patterns, your glucose levels have been stable. The reading of 94 mg/dL is excellent and within your target range.",
        "Your glucose trends show good control. Consider maintaining your current meal timing and portion sizes.",
        "I notice your glucose has been consistently in range. This suggests your current management strategy is working well."
      ],
      meal: [
        "For stable glucose levels, I recommend focusing on lean proteins, non-starchy vegetables, and complex carbohydrates. A grilled chicken salad with quinoa would be ideal.",
        "Based on your current glucose reading, a balanced meal with 15-20g of carbs would be appropriate. Consider adding fiber-rich vegetables.",
        "Your meal timing looks good. For your next meal, try pairing carbohydrates with protein to help maintain stable glucose levels."
      ],
      exercise: [
        "Light to moderate exercise like a 20-30 minute walk would be perfect right now. Your current glucose level is ideal for physical activity.",
        "Based on your glucose patterns, post-meal walks have been very effective for you. I'd recommend continuing this routine.",
        "Your glucose is stable, making this a great time for exercise. Consider resistance training or yoga for variety."
      ],
      general: [
        "Your overall diabetes management has been excellent. Keep up the consistent logging and monitoring.",
        "I'm analyzing your data patterns. Your time in range has improved by 5% this week - great progress!",
        "Remember to stay hydrated and maintain regular meal times. Your current routine is showing positive results."
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('glucose') || lowerMessage.includes('blood sugar') || lowerMessage.includes('reading')) {
      return responses.glucose[Math.floor(Math.random() * responses.glucose.length)];
    } else if (lowerMessage.includes('meal') || lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('lunch') || lowerMessage.includes('dinner') || lowerMessage.includes('breakfast')) {
      return responses.meal[Math.floor(Math.random() * responses.meal.length)];
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('walk') || lowerMessage.includes('activity')) {
      return responses.exercise[Math.floor(Math.random() * responses.exercise.length)];
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    const userMsg = {
      type: 'user',
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        message: generateAIResponse(chatMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatHistory(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "What should I eat for lunch?",
    "Why did my glucose spike?",
    "Best exercise for my current level?",
    "How are my trends looking?"
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
      
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
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.mealName}</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.carbohydrates} ({t.grams})</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.calories}</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.time}</label>
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
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{t.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Chat Modal */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-900 p-2 rounded-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t.flowSenseAI}</h3>
                  <p className="text-sm text-gray-500">{t.intelligentHealthAssistant}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIChat(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Chat History */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-slate-600 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-slate-200' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick Questions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setChatMessage(question)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="flex space-x-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Ask me anything about your health..."
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !chatMessage.trim()}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <p className="text-2xl font-bold text-gray-900">94 {t.mgdl}</p>
                  <p className="text-sm text-green-600">↓ 3% from last week</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{t.timeInRange}</h4>
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
                    <span className="font-medium">145{t.grams}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">{t.aiPoweredInsights}</h4>
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