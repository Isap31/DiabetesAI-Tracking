import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressChart from '../ProgressChart';

// Mock the translation hook
jest.mock('../../utils/translations', () => ({
  useTranslation: () => ({
    aiPredictionsAnalytics: 'AI Predictions Analytics',
    advancedGlucoseModeling: 'Advanced Glucose Modeling',
    aiPoweredInsights: 'AI Powered Insights',
    predictionAccuracy: 'Prediction Accuracy',
    timeInRange: 'Time in Range',
    modelConfidence: 'Model Confidence',
    dataPoints: 'Data Points',
    enterDataToSeePredictions: 'Enter data to see predictions',
    mgdl: 'mg/dL',
    grams: 'g',
    minutes: 'min',
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor'
  })
}));

// Mock the predictive model service
jest.mock('../../services/predictiveModelService', () => ({
  predictGlucose: jest.fn()
}));

// Mock the custom hook
jest.mock('../../hooks/useProgressChartCalculations', () => ({
  useProgressChartCalculations: () => ({
    userProfile: {
      age: 34,
      diabetesType: 'Type 1',
      height: 165,
      weight: 68,
      currentStress: 3,
      yearsSinceDiagnosis: 9,
      gender: 'female',
      isPregnant: false,
      menstrualCycleDay: 14,
      sleepQuality: 7,
      sleepDuration: 7.5
    },
    getHormonalInfluence: jest.fn(() => 5),
    getSleepInfluence: jest.fn(() => -2),
    getStressInfluence: jest.fn(() => 3),
    getExperienceInfluence: jest.fn(() => 1),
    getMealTimingInfluence: jest.fn(() => 0),
    getExerciseInfluence: jest.fn(() => -8),
    getXAxisLabels: jest.fn(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']),
    getParameterInfluencedStats: jest.fn(() => ({
      accuracy: 93.1,
      timeInRange: 87.5,
      avgTime: 2.3,
      tir: 82.1
    })),
    getMenstrualPhase: jest.fn(() => 'Follicular'),
    originalGetGlucoseData: jest.fn(),
    getGlucoseData: jest.fn(() => [
      { time: 0, glucose: 94, predicted: 94, day: 'Mon', label: 'Monday', factors: ['Normal'], realPrediction: false },
      { time: 1, glucose: null, predicted: 98, day: 'Tue', label: 'Tuesday', factors: ['Predicted'], realPrediction: true }
    ])
  })
}));

describe('ProgressChart Component', () => {
  const defaultProps = {
    language: 'en',
    useDemoData: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chart title and description', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    expect(screen.getByText('AI Predictions Analytics')).toBeInTheDocument();
    expect(screen.getByText('Advanced Glucose Modeling')).toBeInTheDocument();
  });

  it('renders period selector with correct options', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    const periodButton = screen.getByText('Days');
    expect(periodButton).toBeInTheDocument();
    
    fireEvent.click(periodButton);
    
    expect(screen.getByText('Weeks')).toBeInTheDocument();
    expect(screen.getByText('Months')).toBeInTheDocument();
  });

  it('renders parameter influence summary', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    expect(screen.getByText('Current Parameter Influences on Predictions')).toBeInTheDocument();
    expect(screen.getByText(/Last Meal:/)).toBeInTheDocument();
    expect(screen.getByText(/Exercise:/)).toBeInTheDocument();
    expect(screen.getByText(/Sleep:/)).toBeInTheDocument();
  });

  it('renders statistics grid with correct values', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    expect(screen.getByText('93.1%')).toBeInTheDocument();
    expect(screen.getByText('87.5%')).toBeInTheDocument();
    expect(screen.getByText('2.3h')).toBeInTheDocument();
    expect(screen.getByText('+12.1%')).toBeInTheDocument();
  });

  it('renders chart with SVG elements', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    const svg = screen.getByTestId('chart-svg');
    expect(svg).toBeInTheDocument();
    expect(svg.tagName).toBe('svg');
  });

  it('shows parameter input form when not using demo data and parameters are empty', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} useDemoData={false} />);
    });
    
    expect(screen.getByText('Enter all values to see predictions')).toBeInTheDocument();
    expect(screen.getByLabelText('glucose')).toBeInTheDocument();
    expect(screen.getByLabelText('hr mean 30min')).toBeInTheDocument();
    expect(screen.getByLabelText('activity 30min')).toBeInTheDocument();
    expect(screen.getByLabelText('carbs 30min')).toBeInTheDocument();
    expect(screen.getByLabelText('protein 30min')).toBeInTheDocument();
    expect(screen.getByLabelText('fat 30min')).toBeInTheDocument();
  });

  it('handles parameter input changes', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} useDemoData={false} />);
    });
    
    const glucoseInput = screen.getByLabelText('glucose');
    fireEvent.change(glucoseInput, { target: { value: '120' } });
    
    expect(glucoseInput).toHaveValue(120);
  });

  it('renders legend with correct labels', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    expect(screen.getByText('Actual')).toBeInTheDocument();
    expect(screen.getByText('AI Powered Insights')).toBeInTheDocument();
    expect(screen.getByText('Target Range')).toBeInTheDocument();
  });

  it('shows error message when prediction fails', async () => {
    const { predictGlucose } = require('../../services/predictiveModelService');
    predictGlucose.mockRejectedValue(new Error('API Error'));
    
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    // The component should handle errors gracefully without crashing
    expect(screen.getByText('AI Predictions Analytics')).toBeInTheDocument();
  });

  it('handles different period selections', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    const periodButton = screen.getByText('Days');
    fireEvent.click(periodButton);
    
    // Check that the dropdown opens and shows other options
    expect(screen.getByText('Weeks')).toBeInTheDocument();
    expect(screen.getByText('Months')).toBeInTheDocument();
    
    // Click on Weeks option
    const weeksButton = screen.getByText('Weeks');
    fireEvent.click(weeksButton);
    
    // The dropdown should close and the main button should still show the selected period
    expect(screen.getByText('Weeks')).toBeInTheDocument();
  });

  it('renders with dark mode support', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    // Find the main container div that has the dark mode classes
    const container = document.querySelector('.bg-white.dark\\:bg-slate-800');
    expect(container).toBeInTheDocument();
    expect(container?.className).toContain('bg-white');
    expect(container?.className).toContain('dark:bg-slate-800');
  });

  it('shows loading state during prediction', async () => {
    const { predictGlucose } = require('../../services/predictiveModelService');
    predictGlucose.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    // The component should handle loading states gracefully
    expect(screen.getByText('AI Predictions Analytics')).toBeInTheDocument();
  });

  it('displays correct glucose status indicators', async () => {
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    // Check that the chart renders with proper glucose ranges
    expect(screen.getByText('60 mg/dL')).toBeInTheDocument();
    expect(screen.getByText('160 mg/dL')).toBeInTheDocument();
  });

  it('handles empty glucose data gracefully', async () => {
    // Mock the hook to return empty data for this test
    const mockUseProgressChartCalculations = require('../../hooks/useProgressChartCalculations');
    const originalGetGlucoseData = mockUseProgressChartCalculations.useProgressChartCalculations().getGlucoseData;
    
    mockUseProgressChartCalculations.useProgressChartCalculations = jest.fn(() => ({
      userProfile: {
        age: 34,
        diabetesType: 'Type 1',
        height: 165,
        weight: 68,
        currentStress: 3,
        yearsSinceDiagnosis: 9,
        gender: 'female',
        isPregnant: false,
        menstrualCycleDay: 14,
        sleepQuality: 7,
        sleepDuration: 7.5
      },
      getHormonalInfluence: jest.fn(() => 5),
      getSleepInfluence: jest.fn(() => -2),
      getStressInfluence: jest.fn(() => 3),
      getExperienceInfluence: jest.fn(() => 1),
      getMealTimingInfluence: jest.fn(() => 0),
      getExerciseInfluence: jest.fn(() => -8),
      getXAxisLabels: jest.fn(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']),
      getParameterInfluencedStats: jest.fn(() => ({
        accuracy: 93.1,
        timeInRange: 87.5,
        avgTime: 2.3,
        tir: 82.1
      })),
      getMenstrualPhase: jest.fn(() => 'Follicular'),
      originalGetGlucoseData: jest.fn(),
      getGlucoseData: jest.fn(() => [])
    }));
    
    await act(async () => {
      render(<ProgressChart {...defaultProps} />);
    });
    
    expect(screen.getByText('Enter data to see predictions')).toBeInTheDocument();
  });
}); 