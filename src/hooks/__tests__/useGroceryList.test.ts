import { renderHook, act } from '@testing-library/react';
import { useGroceryList, GroceryItem } from '../useGroceryList';

describe('useGroceryList Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty list', () => {
    const { result } = renderHook(() => useGroceryList());

    expect(result.current.groceryList).toEqual([]);
    expect(result.current.filteredItems).toEqual([]);
    expect(result.current.totalCost).toBe(0);
    expect(result.current.budgetFriendlyCount).toBe(0);
  });

  it('initializes with provided list', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    expect(result.current.groceryList).toEqual(initialList);
    expect(result.current.filteredItems).toEqual(initialList);
    expect(result.current.totalCost).toBe(5.99);
    expect(result.current.budgetFriendlyCount).toBe(1);
  });

  it('adds new item to list', () => {
    const { result } = renderHook(() => useGroceryList());

    act(() => {
      result.current.addItem({
        name: 'Bananas',
        category: 'Fruits',
        estimatedPrice: 3.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bunch',
      });
    });

    expect(result.current.groceryList).toHaveLength(1);
    expect(result.current.groceryList[0].name).toBe('Bananas');
    expect(result.current.groceryList[0].purchased).toBe(false);
    expect(result.current.totalCost).toBe(3.99);
  });

  it('removes item from list', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.removeItem(1);
    });

    expect(result.current.groceryList).toHaveLength(0);
    expect(result.current.totalCost).toBe(0);
  });

  it('updates item in list', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.updateItem(1, { name: 'Updated Apples' });
    });

    expect(result.current.groceryList[0].name).toBe('Updated Apples');
  });

  it('toggles purchased status', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.togglePurchased(1);
    });

    expect(result.current.groceryList[0].purchased).toBe(true);
    expect(result.current.totalCost).toBe(0); // Purchased items don't count toward total
  });

  it('filters items by category', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
      {
        id: 2,
        name: 'Bread',
        category: 'Grains',
        estimatedPrice: 3.99,
        glucoseImpact: 'medium',
        budgetFriendly: true,
        quantity: '1 loaf',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.setSelectedCategory('Fruits');
    });

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('Apples');
  });

  it('filters items by search term', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
      {
        id: 2,
        name: 'Bananas',
        category: 'Fruits',
        estimatedPrice: 3.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bunch',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.setSearchTerm('apple');
    });

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('Apples');
  });

  it('combines category and search filters', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
      {
        id: 2,
        name: 'Bananas',
        category: 'Fruits',
        estimatedPrice: 3.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bunch',
        purchased: false,
      },
      {
        id: 3,
        name: 'Bread',
        category: 'Grains',
        estimatedPrice: 3.99,
        glucoseImpact: 'medium',
        budgetFriendly: true,
        quantity: '1 loaf',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.setSelectedCategory('Fruits');
      result.current.setSearchTerm('apple');
    });

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('Apples');
  });

  it('calculates total cost correctly', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
      {
        id: 2,
        name: 'Bread',
        category: 'Grains',
        estimatedPrice: 3.99,
        glucoseImpact: 'medium',
        budgetFriendly: true,
        quantity: '1 loaf',
        purchased: true, // This should not count toward total
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    expect(result.current.totalCost).toBe(5.99);
  });

  it('counts budget friendly items correctly', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
      {
        id: 2,
        name: 'Bread',
        category: 'Grains',
        estimatedPrice: 3.99,
        glucoseImpact: 'medium',
        budgetFriendly: false,
        quantity: '1 loaf',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    expect(result.current.budgetFriendlyCount).toBe(1);
  });

  it('generates unique IDs for new items', () => {
    const { result } = renderHook(() => useGroceryList());

    // Mock Date.now to return different values
    const mockDateNow = jest.spyOn(Date, 'now');
    mockDateNow.mockReturnValueOnce(1000);
    mockDateNow.mockReturnValueOnce(2000);

    act(() => {
      result.current.addItem({
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
      });
    });

    act(() => {
      result.current.addItem({
        name: 'Bananas',
        category: 'Fruits',
        estimatedPrice: 3.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bunch',
      });
    });

    const ids = result.current.groceryList.map(item => item.id);
    expect(ids[0]).not.toBe(ids[1]);

    mockDateNow.mockRestore();
  });

  it('handles invalid item ID gracefully', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.updateItem(999, { name: 'Updated Apples' });
    });

    expect(result.current.groceryList[0].name).toBe('Apples'); // Should remain unchanged
  });

  it('handles empty search term', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.setSearchTerm('');
    });

    expect(result.current.filteredItems).toEqual(initialList);
  });

  it('handles case insensitive search', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.setSearchTerm('APPLES');
    });

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('Apples');
  });

  it('resets category filter to show all items', () => {
    const initialList: GroceryItem[] = [
      {
        id: 1,
        name: 'Apples',
        category: 'Fruits',
        estimatedPrice: 5.99,
        glucoseImpact: 'low',
        budgetFriendly: true,
        quantity: '1 bag',
        purchased: false,
      },
      {
        id: 2,
        name: 'Bread',
        category: 'Grains',
        estimatedPrice: 3.99,
        glucoseImpact: 'medium',
        budgetFriendly: true,
        quantity: '1 loaf',
        purchased: false,
      },
    ];

    const { result } = renderHook(() => useGroceryList(initialList));

    act(() => {
      result.current.setSelectedCategory('Fruits');
    });

    expect(result.current.filteredItems).toHaveLength(1);

    act(() => {
      result.current.setSelectedCategory('all');
    });

    expect(result.current.filteredItems).toHaveLength(2);
  });
}); 