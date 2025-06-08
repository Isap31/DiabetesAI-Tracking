import React, { useState } from 'react';
import { MessageCircle, Users, Heart, ThumbsUp, Send, Bot, X, Mic, Paperclip } from 'lucide-react';

const CommunityTab = () => {
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hello! I'm FlowSense AI, your diabetes management assistant. I can help you with glucose patterns, meal suggestions, exercise recommendations, and answer any health questions you have.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const communityPosts = [
    {
      user: 'Sarah M.',
      avatar: 'SM',
      time: '2h ago',
      content: 'Just hit my 30-day streak! My pet is so happy and I feel amazing. This app has changed my life! 🎉',
      likes: 12,
      comments: 3,
      category: 'milestone'
    },
    {
      user: 'Mike R.',
      avatar: 'MR',
      time: '4h ago',
      content: 'Anyone have tips for managing glucose during exercise? My readings spike after workouts.',
      likes: 8,
      comments: 7,
      category: 'question'
    },
    {
      user: 'Dr. Lisa',
      avatar: 'DL',
      time: '6h ago',
      content: 'Remember: small consistent changes lead to big results. Your pet companion is there to remind you that every healthy choice matters! 💚',
      likes: 24,
      comments: 5,
      category: 'tip',
      verified: true
    }
  ];

  const generateAIResponse = (userMessage: string) => {
    const responses = {
      glucose: [
        "Based on your recent patterns, your glucose levels have been stable. The reading of 94 mg/dL is excellent and within your target range.",
        "Your glucose trends show good control. Consider maintaining your current meal timing and portion sizes.",
        "I notice your glucose has been consistently in range. This suggests your current management strategy is working well.",
        "Your glucose variability has decreased this week, which is a great sign of improved control."
      ],
      meal: [
        "For stable glucose levels, I recommend focusing on lean proteins, non-starchy vegetables, and complex carbohydrates. A grilled chicken salad with quinoa would be ideal.",
        "Based on your current glucose reading, a balanced meal with 15-20g of carbs would be appropriate. Consider adding fiber-rich vegetables.",
        "Your meal timing looks good. For your next meal, try pairing carbohydrates with protein to help maintain stable glucose levels.",
        "Consider the plate method: 1/2 non-starchy vegetables, 1/4 lean protein, 1/4 complex carbohydrates."
      ],
      exercise: [
        "Light to moderate exercise like a 20-30 minute walk would be perfect right now. Your current glucose level is ideal for physical activity.",
        "Based on your glucose patterns, post-meal walks have been very effective for you. I'd recommend continuing this routine.",
        "Your glucose is stable, making this a great time for exercise. Consider resistance training or yoga for variety.",
        "Exercise timing is important. Your data shows best results with activity 1-2 hours after meals."
      ],
      community: [
        "The community here is incredibly supportive! Sharing your experiences helps others on their diabetes journey.",
        "I see you're engaging with the community - that's fantastic for motivation and learning from others' experiences.",
        "Community support is proven to improve diabetes outcomes. Keep sharing and learning from others!",
        "Your participation in the community helps create a supportive environment for everyone managing diabetes."
      ],
      general: [
        "Your overall diabetes management has been excellent. Keep up the consistent logging and monitoring.",
        "I'm analyzing your data patterns. Your time in range has improved by 5% this week - great progress!",
        "Remember to stay hydrated and maintain regular meal times. Your current routine is showing positive results.",
        "Your consistency with logging is impressive. This data helps me provide better personalized recommendations.",
        "Based on your patterns, you're doing an excellent job managing your diabetes. Keep up the great work!"
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('glucose') || lowerMessage.includes('blood sugar') || lowerMessage.includes('reading') || lowerMessage.includes('level')) {
      return responses.glucose[Math.floor(Math.random() * responses.glucose.length)];
    } else if (lowerMessage.includes('meal') || lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('lunch') || lowerMessage.includes('dinner') || lowerMessage.includes('breakfast') || lowerMessage.includes('carb')) {
      return responses.meal[Math.floor(Math.random() * responses.meal.length)];
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('walk') || lowerMessage.includes('activity') || lowerMessage.includes('gym')) {
      return responses.exercise[Math.floor(Math.random() * responses.exercise.length)];
    } else if (lowerMessage.includes('community') || lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('share')) {
      return responses.community[Math.floor(Math.random() * responses.community.length)];
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
    "How can I connect with others?",
    "What should I share with the community?",
    "Tips for staying motivated?",
    "How to help other members?",
    "Best practices for glucose control?",
    "Meal ideas for stable levels?"
  ];

  return (
    <div className="space-y-6">
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
                  <h3 className="text-lg font-semibold text-gray-900">FlowSense AI</h3>
                  <p className="text-sm text-gray-500">Your intelligent health assistant</p>
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
                        : 'bg-white border border-gray-200 shadow-sm'
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
                    <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
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
              <p className="text-sm font-medium text-gray-700 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setChatMessage(question)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors border border-gray-200 hover:border-gray-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Enhanced Chat Input */}
            <div className="border-t border-gray-200 pt-4">
              <form onSubmit={handleChatSubmit} className="space-y-3">
                {/* Main Input Area */}
                <div className="relative">
                  <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-3 border border-gray-200 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200">
                    {/* Text Input */}
                    <div className="flex-1">
                      <textarea
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="w-full bg-transparent resize-none focus:outline-none text-sm placeholder-gray-500 min-h-[20px] max-h-[120px]"
                        placeholder="Type your message here... Ask about glucose patterns, meal suggestions, exercise tips, or community advice."
                        disabled={isTyping}
                        rows={1}
                        style={{ paddingTop: '8px' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleChatSubmit(e);
                          }
                        }}
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-start space-x-2 pt-1">
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Attach file"
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Voice message"
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                      <button
                        type="submit"
                        disabled={isTyping || !chatMessage.trim()}
                        className="p-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Send message"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Input Helper Text */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                  <span className={`${chatMessage.length > 500 ? 'text-orange-500' : ''}`}>
                    {chatMessage.length}/1000
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Quick Access */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl p-4 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold">FlowSense AI</h3>
            <p className="text-sm text-slate-200">Your 24/7 health companion</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAIChat(true)}
          className="w-full bg-white bg-opacity-20 text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200"
        >
          Start AI Chat
        </button>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-3">Community</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-slate-50 p-3 rounded-lg mb-2">
              <Users className="h-5 w-5 text-slate-600 mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-900">12.5K</p>
            <p className="text-xs text-gray-500">Members</p>
          </div>
          <div className="text-center">
            <div className="bg-slate-50 p-3 rounded-lg mb-2">
              <MessageCircle className="h-5 w-5 text-slate-600 mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-900">1.2K</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <div className="text-center">
            <div className="bg-slate-50 p-3 rounded-lg mb-2">
              <Heart className="h-5 w-5 text-slate-600 mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-900">8.9K</p>
            <p className="text-xs text-gray-500">Support given</p>
          </div>
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        {communityPosts.map((post, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-slate-600 to-slate-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{post.user}</span>
                  {post.verified && (
                    <div className="bg-blue-500 text-white rounded-full p-0.5">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">{post.time}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    post.category === 'milestone' ? 'bg-green-100 text-green-700' :
                    post.category === 'question' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {post.category}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Post */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-slate-600 to-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
            S
          </div>
          <input 
            type="text" 
            placeholder="Share your progress or ask a question..."
            className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button className="bg-gradient-to-r from-slate-600 to-slate-800 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;