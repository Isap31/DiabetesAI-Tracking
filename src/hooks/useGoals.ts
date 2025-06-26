import { useState, useMemo, useCallback } from 'react';

export interface Goal {
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

export function useGoals(initialGoals: Goal[] = []) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'completed' | 'current'>) => {
    setGoals(prev => [
      ...prev,
      {
        ...goal,
        id: Date.now(),
        completed: false,
        current: 0
      }
    ]);
  }, []);

  const updateGoal = useCallback((goalId: number, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => goal.id === goalId ? { ...goal, ...updates } : goal));
  }, []);

  const deleteGoal = useCallback((goalId: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  }, []);

  const completeGoal = useCallback((goalId: number) => {
    setGoals(prev => prev.map(goal => goal.id === goalId ? { ...goal, completed: true, current: goal.target } : goal));
  }, []);

  const getProgressPercentage = useCallback((goal: Goal) => {
    return Math.min(100, (goal.current / goal.target) * 100);
  }, []);

  const getProgressColor = useCallback((percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  }, []);

  const completedGoals = useMemo(() => goals.filter(g => g.completed), [goals]);
  const inProgressGoals = useMemo(() => goals.filter(g => !g.completed && g.current > 0), [goals]);
  const successRate = useMemo(() => goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0, [completedGoals.length, goals.length]);

  return {
    goals,
    setGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    completeGoal,
    getProgressPercentage,
    getProgressColor,
    completedGoals,
    inProgressGoals,
    successRate
  };
} 