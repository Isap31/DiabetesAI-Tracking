import React, { useState } from 'react';
import { Target, Calendar, Trophy, Plus, X, Save, Edit2, Check, Trash2 } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface Goal {
  id: number;
  title: string;
  description: string;
  type: 'weekly' | 'monthly' | 'yearly';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
}

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

const GoalsModal: React.FC<GoalsModalProps> = ({ isOpen, onClose, language }) => {
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Log 21 meals',
      description: 'Track all meals with carb content',
      type: 'weekly',
      target: 21,
      current: 18,
      unit: 'meals',
      deadline: '2024-01-21',
      completed: false
    },
    {
      id: 2,
      title: 'Exercise 5 times',
      description: 'Complete 30+ minute exercise sessions',
      type: 'weekly',
      target: 5,
      current: 3,
      unit: 'sessions',
      deadline: '2024-01-21',
      completed: false
    },
    {
      id: 3,
      title: 'Maintain 85% TIR',
      description: 'Keep glucose in target range',
      type: 'monthly',
      target: 85,
      current: 87,
      unit: '% TIR',
      deadline: '2024-01-31',
      completed: true
    },
    {
      id: 4,
      title: 'HbA1c under 7%',
      description: 'Achieve target HbA1c level',
      type: 'yearly',
      target: 7,
      current: 6.8,
      unit: '% HbA1c',
      deadline: '2024-12-31',
      completed: true
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: '',
    unit: '',
    deadline: ''
  });

  const filteredGoals = goals.filter(goal => goal.type === activeTab);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      type: activeTab,
      target: parseFloat(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      completed: false
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ title: '', description: '', target: '', unit: '', deadline: '' });
    setShowAddForm(false);
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const handleUpdateProgress = (id: number, newCurrent: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, current: newCurrent, completed: newCurrent >= goal.target }
        : goal
    ));
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTabIcon = (type: 'weekly' | 'monthly' | 'yearly') => {
    switch (type) {
      case 'weekly': return Calendar;
      case 'monthly': return Target;
      case 'yearly': return Trophy;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 p-2 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Health Goals</h3>
              <p className="text-sm text-gray-500">Set and track your health objectives</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {(['weekly', 'monthly', 'yearly'] as const).map((tab) => {
            const Icon = getTabIcon(tab);
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="capitalize">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Add Goal Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-slate-400 hover:text-slate-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Goal</span>
            </button>
          </div>

          {/* Add Goal Form */}
          {showAddForm && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-3">New {activeTab} Goal</h4>
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Goal title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="Target"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="Unit"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddGoal}
                    className="flex-1 bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Goal</span>
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Goals List */}
          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <div key={goal.id} className={`p-4 rounded-lg border-2 transition-all ${
                goal.completed 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-white hover:border-slate-300'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium ${goal.completed ? 'text-green-900' : 'text-gray-900'}`}>
                        {goal.title}
                      </h4>
                      {goal.completed && <Check className="h-4 w-4 text-green-600" />}
                    </div>
                    {goal.description && (
                      <p className={`text-sm ${goal.completed ? 'text-green-700' : 'text-gray-600'}`}>
                        {goal.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingGoal(editingGoal === goal.id ? null : goal.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={goal.completed ? 'text-green-700' : 'text-gray-600'}>
                      Progress: {goal.current} / {goal.target} {goal.unit}
                    </span>
                    <span className={`font-medium ${goal.completed ? 'text-green-700' : 'text-gray-900'}`}>
                      {Math.round(getProgressPercentage(goal.current, goal.target))}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        goal.completed ? 'bg-green-500' : 'bg-slate-600'
                      }`}
                      style={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                    ></div>
                  </div>
                  
                  {/* Update Progress */}
                  {editingGoal === goal.id && !goal.completed && (
                    <div className="mt-3 flex items-center space-x-2">
                      <input
                        type="number"
                        value={goal.current}
                        onChange={(e) => handleUpdateProgress(goal.id, parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                        step="0.1"
                        min="0"
                        max={goal.target}
                      />
                      <span className="text-sm text-gray-500">/ {goal.target} {goal.unit}</span>
                    </div>
                  )}
                </div>

                {/* Deadline */}
                <div className="mt-3 text-xs text-gray-500">
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </div>
            ))}

            {filteredGoals.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No {activeTab} goals set yet.</p>
                <p className="text-sm">Add your first goal to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsModal;