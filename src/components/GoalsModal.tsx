import React, { useState } from 'react';
import { Target, Calendar, Trophy, Plus, X, Save, Edit2, Check, Trash2, Star, Zap, Heart, Activity } from 'lucide-react';
import { useTranslation } from '../utils/translations';
import GoalForm from './GoalForm';
import { useGoals, Goal } from '../hooks/useGoals';

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

const GoalsModal: React.FC<GoalsModalProps> = ({ isOpen, onClose, language }) => {
  const t = useTranslation(language);
  const initialGoals: Goal[] = [
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
  ];
  const {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    completeGoal,
    getProgressPercentage,
    getProgressColor,
    completedGoals,
    inProgressGoals,
    successRate
  } = useGoals(initialGoals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const categoryIcons = {
    glucose: { icon: Target, color: 'bg-blue-500' },
    exercise: { icon: Activity, color: 'bg-green-500' },
    nutrition: { icon: Heart, color: 'bg-red-500' },
    lifestyle: { icon: Star, color: 'bg-purple-500' }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-label="Goals Modal">
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
              <p className="text-2xl font-bold text-green-600">{completedGoals.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">In Progress</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">{inProgressGoals.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Success Rate</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {successRate}%
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
                            onClick={() => completeGoal(goal.id)}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Mark as complete"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteGoal(goal.id)}
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
                <GoalForm
                  initialGoal={{
                    title: '',
                    description: '',
                    type: 'weekly',
                    target: '',
                    unit: '',
                    deadline: '',
                    category: 'glucose'
                  }}
                  onSave={goal => {
                    addGoal({
                      ...goal,
                      target: parseInt(goal.target, 10),
                    });
                    setShowAddForm(false);
                  }}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsModal;