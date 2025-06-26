import React, { useState } from 'react';

interface GroceryItemFormProps {
  initialItem: {
    name: string;
    category: string;
    estimatedPrice: string;
    glucoseImpact: 'low' | 'medium' | 'high';
    quantity: string;
    notes: string;
  };
  onSave: (item: typeof initialItem) => void;
  onCancel: () => void;
  loading?: boolean;
}

const GroceryItemForm: React.FC<GroceryItemFormProps> = ({ initialItem, onSave, onCancel, loading }) => {
  const [item, setItem] = useState(initialItem);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(item);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Grocery Item Form" role="form">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="item-name">Item Name</label>
        <input
          id="item-name"
          name="name"
          type="text"
          value={item.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="e.g., Eggs"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="item-category">Category</label>
          <select
            id="item-category"
            name="category"
            value={item.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Vegetables">Vegetables</option>
            <option value="Protein">Protein</option>
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
            <option value="Fruits">Fruits</option>
            <option value="Pantry">Pantry</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="item-glucoseImpact">Glucose Impact</label>
          <select
            id="item-glucoseImpact"
            name="glucoseImpact"
            value={item.glucoseImpact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="item-quantity">Quantity</label>
          <input
            id="item-quantity"
            name="quantity"
            type="text"
            value={item.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., 1 dozen"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="item-estimatedPrice">Estimated Price</label>
          <input
            id="item-estimatedPrice"
            name="estimatedPrice"
            type="number"
            min="0"
            step="0.01"
            value={item.estimatedPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="2.50"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="item-notes">Notes</label>
        <textarea
          id="item-notes"
          name="notes"
          value={item.notes}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="e.g., Natural, no added sugar"
          rows={2}
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
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Item'}
        </button>
      </div>
    </form>
  );
};

export default GroceryItemForm; 