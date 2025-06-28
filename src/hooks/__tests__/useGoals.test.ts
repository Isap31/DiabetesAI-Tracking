import { renderHook, act } from '@testing-library/react';
import { useGoals } from '../useGoals';

describe('useGoals Hook', () => {
  const mockInitialGoals = [
    {
      id: 1,
      title: 'Test Goal',
      description: 'A test goal',
      type: 'weekly' as const,
      target: 100,
      current: 50,
      unit: 'steps',
      deadline: '2024-01-01',
      completed: false,
      category: 'exercise' as const
    }
  ];

  it('initializes with provided goals', () => {
    const { result } = renderHook(() => useGoals(mockInitialGoals));

    expect(result.current.goals).toHaveLength(1);
    expect(result.current.goals[0].title).toBe('Test Goal');
  });

  it('initializes with empty array when no goals provided', () => {
    const { result } = renderHook(() => useGoals());

    expect(result.current.goals).toHaveLength(0);
  });

  it('adds a new goal', () => {
    const { result } = renderHook(() => useGoals());

    act(() => {
      result.current.addGoal({
        title: 'New Goal',
        description: 'A new goal',
        type: 'monthly',
        target: 200,
        unit: 'calories',
        deadline: '2024-02-01',
        category: 'nutrition'
      });
    });

    expect(result.current.goals).toHaveLength(1);
    expect(result.current.goals[0].title).toBe('New Goal');
    expect(result.current.goals[0].current).toBe(0);
    expect(result.current.goals[0].completed).toBe(false);
  });

  it('updates goal progress', () => {
    const { result } = renderHook(() => useGoals(mockInitialGoals));

    act(() => {
      result.current.updateProgress(1, 75);
    });

    expect(result.current.goals[0].current).toBe(75);
    expect(result.current.goals[0].completed).toBe(false);
  });

  it('marks goal as completed when target is reached', () => {
    const { result } = renderHook(() => useGoals(mockInitialGoals));

    act(() => {
      result.current.updateProgress(1, 100);
    });

    expect(result.current.goals[0].current).toBe(100);
    expect(result.current.goals[0].completed).toBe(true);
  });

  it('deletes a goal', () => {
    const { result } = renderHook(() => useGoals(mockInitialGoals));

    act(() => {
      result.current.deleteGoal(1);
    });

    expect(result.current.goals).toHaveLength(0);
  });

  it('updates goal details', () => {
    const { result } = renderHook(() => useGoals(mockInitialGoals));

    act(() => {
      result.current.updateGoal(1, {
        title: 'Updated Goal',
        description: 'Updated description',
        target: 150
      });
    });

    expect(result.current.goals[0].title).toBe('Updated Goal');
    expect(result.current.goals[0].description).toBe('Updated description');
    expect(result.current.goals[0].target).toBe(150);
  });

  it('calculates completion percentage correctly', () => {
    const { result } = renderHook(() => useGoals(mockInitialGoals));

    act(() => {
      result.current.updateProgress(1, 75);
    });

    const goal = result.current.goals[0];
    const percentage = (goal.current / goal.target) * 100;
    expect(percentage).toBe(75);
  });

  it('handles multiple goals correctly', () => {
    const { result } = renderHook(() => useGoals());

    act(() => {
      result.current.addGoal({
        title: 'Goal 1',
        description: 'First goal',
        type: 'weekly',
        target: 100,
        unit: 'steps',
        deadline: '2024-01-01',
        category: 'exercise'
      });
      result.current.addGoal({
        title: 'Goal 2',
        description: 'Second goal',
        type: 'monthly',
        target: 200,
        unit: 'calories',
        deadline: '2024-02-01',
        category: 'nutrition'
      });
    });

    expect(result.current.goals).toHaveLength(2);
    expect(result.current.goals[0].title).toBe('Goal 1');
    expect(result.current.goals[1].title).toBe('Goal 2');
  });

  it('generates unique IDs for new goals', () => {
    const { result } = renderHook(() => useGoals());

    // Mock Date.now to return different values
    const originalDateNow = Date.now;
    let callCount = 0;
    Date.now = jest.fn(() => {
      callCount++;
      return 1000000000000 + callCount;
    });

    act(() => {
      result.current.addGoal({
        title: 'Goal 1',
        description: 'First goal',
        type: 'weekly',
        target: 100,
        unit: 'steps',
        deadline: '2024-01-01',
        category: 'exercise'
      });
      result.current.addGoal({
        title: 'Goal 2',
        description: 'Second goal',
        type: 'monthly',
        target: 200,
        unit: 'calories',
        deadline: '2024-02-01',
        category: 'nutrition'
      });
    });

    const ids = result.current.goals.map(goal => goal.id);
    expect(ids[0]).not.toBe(ids[1]);

    // Restore original Date.now
    Date.now = originalDateNow;
  });

  it('handles invalid goal ID gracefully', () => {
    const { result } = renderHook(() => useGoals(mockInitialGoals));

    act(() => {
      result.current.updateProgress(999, 100);
    });

    expect(result.current.goals[0].current).toBe(50); // Should remain unchanged
  });

  it('maintains goal order after updates', () => {
    const { result } = renderHook(() => useGoals(mockInitialGoals));

    act(() => {
      result.current.updateProgress(1, 75);
      result.current.updateGoal(1, { title: 'Updated Title' });
    });

    expect(result.current.goals[0].title).toBe('Updated Title');
    expect(result.current.goals[0].current).toBe(75);
  });
}); 