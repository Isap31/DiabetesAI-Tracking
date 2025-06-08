import React from 'react';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import ProgressChart from './ProgressChart';
import PredictiveInsights from './PredictiveInsights';
import { Droplets, Target, Clock, Heart, TrendingUp } from 'lucide-react';

const HomeTab = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome back, Sarah. Here's your health overview for today.</p>
      </div>

      {/* Current Status Alert */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900">System Status: Optimal</h3>
            <p className="text-sm text-green-700">All monitoring systems active. Glucose levels stable.</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Current Glucose"
          value="94"
          unit="mg/dL"
          trend="stable"
          icon={Droplets}
          color="blue"
        />
        <StatsCard
          title="Time in Range"
          value="87"
          unit="%"
          trend="up"
          icon={Target}
          color="green"
        />
        <StatsCard
          title="Logging Streak"
          value="12"
          unit="days"
          trend="up"
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Health Score"
          value="8.4"
          unit="/10"
          trend="up"
          icon={Heart}
          color="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <ProgressChart />
          <PredictiveInsights />
        </div>

        {/* Right Column - Actions & Activity */}
        <div className="space-y-6">
          <QuickActions />
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Logged breakfast</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Glucose reading: 94 mg/dL</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Fed Aurora the Dog</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;