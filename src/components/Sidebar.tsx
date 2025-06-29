import React from 'react';
import { 
  Home, 
  Activity, 
  Target, 
  Users, 
  Trophy, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Crown,
  Sparkles,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true, gradient: 'from-blue-500 to-purple-600' },
    { icon: Activity, label: 'Tracking', active: false, gradient: 'from-emerald-500 to-teal-600' },
    { icon: Target, label: 'Goals', active: false, gradient: 'from-orange-500 to-red-600' },
    { icon: Users, label: 'Community', active: false, gradient: 'from-pink-500 to-rose-600' },
    { icon: Trophy, label: 'Achievements', active: false, gradient: 'from-yellow-500 to-amber-600' },
    { icon: BarChart3, label: 'Analytics', active: false, gradient: 'from-indigo-500 to-blue-600' },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: 'Settings', gradient: 'from-gray-500 to-gray-600' },
    { icon: HelpCircle, label: 'Help', gradient: 'from-slate-500 to-slate-600' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 glass-strong border-r border-white/10
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">DiabetesAI</h2>
                <p className="text-xs text-white/60">Smart Health Tracking</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                  transition-all duration-300 group relative overflow-hidden
                  ${item.active 
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 shadow-lg' 
                    : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                  }
                `}
              >
                {/* Gradient background on hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10
                  transition-opacity duration-300 rounded-xl
                `} />
                
                {/* Icon */}
                <div className={`
                  relative z-10 p-2 rounded-lg transition-all duration-300
                  ${item.active 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 shadow-lg' 
                    : 'bg-gradient-to-r ' + item.gradient + ' opacity-60 group-hover:opacity-100'
                  }
                `}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                
                {/* Label */}
                <span className={`
                  relative z-10 font-medium transition-colors duration-300
                  ${item.active ? 'text-white' : 'text-white/80 group-hover:text-white'}
                `}>
                  {item.label}
                </span>

                {/* Active indicator */}
                {item.active && (
                  <div className="absolute right-3 w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Premium Section */}
          <div className="px-4 pb-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-pulse" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-amber-300">Premium</span>
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                </div>
                <p className="text-xs text-white/80 mb-3">
                  Unlock advanced features and insights
                </p>
                <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-105">
                  <Zap className="w-4 h-4" />
                  <span>Upgrade Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Menu */}
          <div className="px-4 pb-6 space-y-2">
            {bottomMenuItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 pb-6">
            <div className="p-3 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-white/60">Connected</span>
              </div>
              <p className="text-xs text-white/40 mt-1">v2.1.0 • All systems operational</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;