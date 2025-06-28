import { useState, useMemo, useCallback } from 'react';

export interface GroceryItem {
  id: number;
  name: string;
  category: string;
  estimatedPrice: number;
  glucoseImpact: 'low' | 'medium' | 'high';
  budgetFriendly: boolean;
  quantity: string;
  notes?: string;
  purchased: boolean;
}

export function useGroceryList(initialList: GroceryItem[] = []) {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(initialList);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addItem = useCallback((item: Omit<GroceryItem, 'id' | 'purchased'>) => {
    setGroceryList(prev => [
      ...prev,
      {
        ...item,
        id: Date.now(),
        purchased: false
      }
    ]);
  }, []);

  const removeItem = useCallback((id: number) => {
    setGroceryList(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateItem = useCallback((id: number, updates: Partial<Omit<GroceryItem, 'id'>>) => {
    setGroceryList(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, []);

  const deleteItem = useCallback((id: number) => {
    setGroceryList(prev => prev.filter(item => item.id !== id));
  }, []);

  const togglePurchased = useCallback((id: number) => {
    setGroceryList(prev => prev.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  }, []);

  const filteredItems = useMemo(() => {
    return groceryList.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [groceryList, selectedCategory, searchTerm]);

  const totalCost = useMemo(() => {
    return groceryList.filter(item => !item.purchased).reduce((sum, item) => sum + item.estimatedPrice, 0);
  }, [groceryList]);

  const budgetFriendlyCount = useMemo(() => {
    return groceryList.filter(item => !item.purchased && item.budgetFriendly).length;
  }, [groceryList]);

  return {
    groceryList,
    setGroceryList,
    addItem,
    removeItem,
    updateItem,
    deleteItem,
    togglePurchased,
    filteredItems,
    totalCost,
    budgetFriendlyCount,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm
  };
} 