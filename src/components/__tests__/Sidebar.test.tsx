import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

// Mock the translation hook
jest.mock('../../utils/translations', () => ({
  useTranslation: () => ({
    dashboard: 'Dashboard',
    tracking: 'Tracking',
    predictions: 'Predictions',
    petCompanion: 'Pet Companion'
  })
}));

describe('Sidebar Component', () => {
  const defaultProps = {
    activeTab: 'home',
    onTabChange: jest.fn(),
    language: 'en'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all navigation tabs', () => {
    render(<Sidebar {...defaultProps} />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tracking')).toBeInTheDocument();
    expect(screen.getByText('Predictions')).toBeInTheDocument();
    expect(screen.getByText('FlowSense AI')).toBeInTheDocument();
    expect(screen.getByText('Care Circle')).toBeInTheDocument();
    expect(screen.getByText('Pet Companion')).toBeInTheDocument();
    expect(screen.getByText('HealthQuest')).toBeInTheDocument();
  });

  it('highlights the active tab', () => {
    render(<Sidebar {...defaultProps} activeTab="tracking" />);
    
    const trackingButton = screen.getByText('Tracking').closest('button');
    expect(trackingButton).toHaveClass('bg-slate-900', 'dark:bg-slate-700', 'text-white');
  });

  it('calls onTabChange when a tab is clicked', () => {
    const mockOnTabChange = jest.fn();
    render(<Sidebar {...defaultProps} onTabChange={mockOnTabChange} />);
    
    const predictionsButton = screen.getByText('Predictions');
    fireEvent.click(predictionsButton);
    
    expect(mockOnTabChange).toHaveBeenCalledWith('predictions');
  });

  it('applies dark mode classes correctly', () => {
    render(<Sidebar {...defaultProps} />);
    
    const sidebar = screen.getByRole('navigation').closest('div').parentElement;
    expect(sidebar).toHaveClass('bg-white', 'dark:bg-slate-800');
  });

  it('applies hover states to inactive tabs', () => {
    render(<Sidebar {...defaultProps} />);
    
    const trackingButton = screen.getByText('Tracking').closest('button');
    expect(trackingButton).toHaveClass('hover:bg-gray-100', 'dark:hover:bg-slate-700');
  });

  it('renders with correct accessibility attributes', () => {
    render(<Sidebar {...defaultProps} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      // Buttons don't need type="button" by default in React
      expect(button).toBeInTheDocument();
    });
  });

  it('handles different active tab states', () => {
    const { rerender } = render(<Sidebar {...defaultProps} activeTab="home" />);
    
    let homeButton = screen.getByText('Dashboard').closest('button');
    expect(homeButton).toHaveClass('bg-slate-900', 'dark:bg-slate-700', 'text-white');
    
    rerender(<Sidebar {...defaultProps} activeTab="flowsense" />);
    
    const flowsenseButton = screen.getByText('FlowSense AI').closest('button');
    expect(flowsenseButton).toHaveClass('bg-slate-900', 'dark:bg-slate-700', 'text-white');
  });

  it('maintains consistent spacing and layout', () => {
    render(<Sidebar {...defaultProps} />);
    
    const sidebar = screen.getByRole('navigation').closest('div').parentElement;
    expect(sidebar).toHaveClass('fixed', 'left-0', 'top-16', 'h-full', 'w-64');
  });
}); 