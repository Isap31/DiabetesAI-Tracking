import React from 'react';
import { X } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-xl p-8 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>
        {children || <div className="text-center">Subscription details go here.</div>}
      </div>
    </div>
  );
};

export default SubscriptionModal; 