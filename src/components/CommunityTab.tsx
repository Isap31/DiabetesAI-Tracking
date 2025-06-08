import React from 'react';
import { MessageCircle, Users, Heart, ThumbsUp, Send, Bot } from 'lucide-react';

const CommunityTab = () => {
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

  return (
    <div className="space-y-6">
      {/* AI Chat Quick Access */}
      <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl p-4 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold">FlowSense AI</h3>
            <p className="text-sm text-purple-100">Your 24/7 health companion</p>
          </div>
        </div>
        <button className="w-full bg-white bg-opacity-20 text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200">
          Start AI Chat
        </button>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-3">Community</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-purple-50 p-3 rounded-lg mb-2">
              <Users className="h-5 w-5 text-purple-600 mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-900">12.5K</p>
            <p className="text-xs text-gray-500">Members</p>
          </div>
          <div className="text-center">
            <div className="bg-teal-50 p-3 rounded-lg mb-2">
              <MessageCircle className="h-5 w-5 text-teal-600 mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-900">1.2K</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <div className="text-center">
            <div className="bg-pink-50 p-3 rounded-lg mb-2">
              <Heart className="h-5 w-5 text-pink-600 mx-auto" />
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
              <div className="bg-gradient-to-r from-purple-500 to-teal-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
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
                    'bg-purple-100 text-purple-700'
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
          <div className="bg-gradient-to-r from-purple-500 to-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
            S
          </div>
          <input 
            type="text" 
            placeholder="Share your progress or ask a question..."
            className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-gradient-to-r from-purple-500 to-teal-500 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;