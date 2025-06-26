import React, { useState } from 'react';

interface GoalFormProps {
  initialGoal: {
    title: string;
    description: string;
    type: 'weekly' | 'monthly' | 'yearly';
    target: string;
    unit: string;
    deadline: string;
    category: 'glucose' | 'exercise' | 'nutrition' | 'lifestyle';
  };
  onSave: (goal: typeof initialGoal) => void;
  onCancel: () => void;
  loading?: boolean;
}

const GoalForm: React.FC<GoalFormProps> = ({ initialGoal, onSave, onCancel, loading }) => {
  const [goal, setGoal] = useState(initialGoal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(goal);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Goal Form" role="form">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-title">Goal Title</label>
        <input
          id="goal-title"
          name="title"
          type="text"
          value={goal.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Daily Exercise"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-description">Description</label>
        <textarea
          id="goal-description"
          name="description"
          value={goal.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your goal..."
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-category">Category</label>
          <select
            id="goal-category"
            name="category"
            value={goal.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="glucose">Glucose</option>
            <option value="exercise">Exercise</option>
            <option value="nutrition">Nutrition</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-type">Type</label>
          <select
            id="goal-type"
            name="type"
            value={goal.type}
            onChange={handleChange}
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
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-target">Target</label>
          <input
            id="goal-target"
            name="target"
            type="number"
            value={goal.target}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-unit">Unit</label>
          <input
            id="goal-unit"
            name="unit"
            type="text"
            value={goal.unit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="steps, %, hours"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-deadline">Deadline</label>
        <input
          id="goal-deadline"
          name="deadline"
          type="date"
          value={goal.deadline}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Goal'}
        </button>
      </div>
    </form>
  );
};

export default GoalForm; 