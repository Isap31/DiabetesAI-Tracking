import React, { useState } from 'react';
import { Target, Calendar, Trophy, Plus, X, Save, Edit2, Check, Trash2, Star, Zap, Heart, Activity } from 'lucide-react';
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
  category: 'glucose' | 'exercise' | 'nutrition' | 'lifestyle';
}

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

const GoalsModal: React.FC<GoalsModalProps> = ({ isOpen, onClose, language }) => {
  const t = useTranslation(language);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Time in Range',
      description: 'Maintain glucose between 70-140 mg/dL',
      type: 'weekly',
      target: 85,
      current: 78,
      unit: '%',
      deadline: '2024-01-21',
      completed: false,
      category: 'glucose'
    },
    {
      id: 2,
      title: 'Daily Steps',
      description: 'Walk at least 8,000 steps per day',
      type: 'weekly',
      target: 56000,
      current: 42000,
      unit: 'steps',
      deadline: '2024-01-21',
      completed: false,
      category: 'exercise'
    },
    {
      id: 3,
      title: 'Meal Logging',
      description: 'Log all meals with carb counts',
      type: 'weekly',
      target: 21,
      current: 18,
      unit: 'meals',
      deadline: '2024-01-21',
      completed: false,
      category: 'nutrition'
    },
    {
      id: 4,
      title: 'Sleep Quality',
      description: 'Maintain 7+ hours of quality sleep',
      type: 'weekly',
      target: 7,
      current: 6,
      unit: 'nights',
      deadline: '2024-01-21',
      completed: false,
      category: 'lifestyle'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'weekly' as 'weekly' | 'monthly' | 'yearly',
    target: '',
    unit: '',
    deadline: '',
    category: 'glucose' as 'glucose' | 'exercise' | 'nutrition' | 'lifestyle'
  });

  const categoryIcons = {
    glucose: { icon: Target, color: 'bg-blue-500' },
    exercise: { icon: Activity, color: 'bg-green-500' },
    nutrition: { icon: Heart, color: 'bg-red-500' },
    lifestyle: { icon: Star, color: 'bg-purple-500' }
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      target: parseInt(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      completed: false,
      category: newGoal.category
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: '',
      description: '',
      type: 'weekly',
      target: '',
      unit: '',
      deadline: '',
      category: 'glucose'
    });
    setShowAddForm(false);
  };

  const handleUpdateGoal = (goalId: number, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const handleCompleteGoal = (goalId: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: true, current: goal.target } : goal
    ));
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min(100, (goal.current / goal.target) * 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Health Goals</h3>
              <p className="text-sm text-blue-100">Track your progress and achieve your targets</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Goals Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Goals</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{goals.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Completed</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{goals.filter(g => g.completed).length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">In Progress</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">{goals.filter(g => !g.completed && g.current > 0).length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Success Rate</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {goals.length > 0 ? Math.round((goals.filter(g => g.completed).length / goals.length) * 100) : 0}%
              </p>
            </div>
          </div>

          {/* Add Goal Button */}
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Your Goals</h4>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Goal</span>
            </button>
          </div>

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map((goal) => {
              const CategoryIcon = categoryIcons[goal.category].icon;
              const percentage = getProgressPercentage(goal);
              
              return (
                <div key={goal.id} className={`border rounded-xl p-4 transition-all duration-200 ${
                  goal.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className={`${categoryIcons[goal.category].color} p-2 rounded-lg`}>
                        <CategoryIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{goal.title}</h5>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {goal.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(goal.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!goal.completed && (
                        <>
                          <button
                            onClick={() => setEditingGoal(goal)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Edit goal"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleCompleteGoal(goal.id)}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Mark as complete"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete goal"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Progress: {goal.current} / {goal.target} {goal.unit}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {goal.completed && (
                    <div className="mt-3 flex items-center space-x-2 text-green-600">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm font-medium">Goal Completed! 🎉</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Goal Form */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Add New Goal</h4>
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Daily Exercise"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your goal..."
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={newGoal.category}
                
                        onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="glucose">Glucose</option>
                        <option value="exercise">Exercise</option>
                        <option value="nutrition">Nutrition</option>
                        <option value="lifestyle">Lifestyle</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={newGoal.type}
                        onChange={(e) => setNewGoal({...newGoal, type: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                      <input
                        type="number"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                      <input
                        type="text"
                        value={newGoal.unit}
                        onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="steps, %, hours"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    onClick={handleAddGoal}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Goal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsModal;