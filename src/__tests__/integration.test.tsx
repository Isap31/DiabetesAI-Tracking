import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock import.meta.env for Vite environment variables before any other imports
if (!('import' in global)) {
  Object.defineProperty(global, 'import', {
    value: {
      meta: {
        env: {
          VITE_REVENUECAT_API_KEY: 'test-revenuecat-key',
          VITE_ELEVENLABS_API_KEY: 'test-elevenlabs-key',
          VITE_ELEVENLABS_VOICE_ID: 'test-voice-id',
          VITE_SUPABASE_URL: 'http://localhost:54321',
          VITE_SUPABASE_ANON_KEY: 'test-supabase-key'
        }
      }
    },
    writable: true
  });
}

// Mock all external services
jest.mock('../services/authService');
jest.mock('../services/predictiveModelService');
jest.mock('../services/elevenLabsService');
jest.mock('../services/revenueCatService');
jest.mock('../lib/supabase');

// Mock the ElevenLabs Conversation
jest.mock('@elevenlabs/client', () => ({
  Conversation: {
    startSession: jest.fn()
  }
}));

// Mock navigator.mediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn()
  },
  writable: true
});

describe('AuroraFlow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockResolvedValue({});
  });

  it('renders the main app with all core components', () => {
    render(<App />);
    
    // Check for main app elements
    expect(screen.getByText('AuroraFlow')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered Diabetes Management')).toBeInTheDocument();
  });

  it('handles tab navigation correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to different tabs
    const trackingTab = screen.getByText('Tracking');
    await user.click(trackingTab);
    
    // Should show tracking interface
    expect(screen.getByText('Log Meal')).toBeInTheDocument();
    expect(screen.getByText('Log Exercise')).toBeInTheDocument();
    expect(screen.getByText('Log Glucose')).toBeInTheDocument();
  });

  it('handles data logging flow', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to tracking tab
    const trackingTab = screen.getByText('Tracking');
    await user.click(trackingTab);
    
    // Log a meal
    const mealNameInput = screen.getByLabelText('Meal Name');
    const carbsInput = screen.getByLabelText('Carbohydrates (g)');
    const saveButton = screen.getByText('Save');
    
    await user.type(mealNameInput, 'Breakfast');
    await user.type(carbsInput, '45');
    await user.click(saveButton);
    
    // Should show success or update UI
    await waitFor(() => {
      expect(mealNameInput).toHaveValue('');
    });
  });

  it('handles authentication flow', async () => {
    const user = userEvent.setup();
    const mockAuthService = require('../services/authService');
    mockAuthService.default.prototype.signIn.mockResolvedValue({
      user: { id: '1', email: 'test@example.com' },
      error: null
    });
    
    render(<App />);
    
    // Open auth modal
    const signInButton = screen.getByText('Sign In');
    await user.click(signInButton);
    
    // Fill in credentials
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign In');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    // Should call auth service
    await waitFor(() => {
      expect(mockAuthService.default.prototype.signIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('handles glucose prediction flow', async () => {
    const user = userEvent.setup();
    const mockPredictiveService = require('../services/predictiveModelService');
    mockPredictiveService.predictGlucose.mockResolvedValue({
      predicted_glucose_30min: 125.5
    });
    
    render(<App />);
    
    // Navigate to predictions tab
    const predictionsTab = screen.getByText('Predictions');
    await user.click(predictionsTab);
    
    // Should show prediction interface
    expect(screen.getByText('AI Predictions Analytics')).toBeInTheDocument();
  });

  it('handles FlowSense AI conversation flow', async () => {
    const user = userEvent.setup();
    const mockStartSession = require('@elevenlabs/client').Conversation.startSession;
    mockStartSession.mockResolvedValue({
      endSession: jest.fn(),
      sendUserMessage: jest.fn()
    });
    
    render(<App />);
    
    // Navigate to FlowSense AI tab
    const flowsenseTab = screen.getByText('FlowSense AI');
    await user.click(flowsenseTab);
    
    // Start conversation
    const startButton = screen.getByText('Start Conversation');
    await user.click(startButton);
    
    // Should show connected status
    await waitFor(() => {
      expect(screen.getByText('Status: Connected')).toBeInTheDocument();
    });
  });

  it('handles language switching', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Find language selector and change language
    const languageSelector = screen.getByRole('combobox', { name: /language/i });
    await user.selectOptions(languageSelector, 'es');
    
    // Should update UI language
    await waitFor(() => {
      expect(screen.getByText('Panel de Control')).toBeInTheDocument();
    });
  });

  it('handles dark mode toggle', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Find theme toggle and click it
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(themeToggle);
    
    // Should apply dark mode classes
    const appContainer = screen.getByText('AuroraFlow').closest('div');
    expect(appContainer).toHaveClass('dark');
  });

  it('handles accessibility settings', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Open accessibility settings
    const accessibilityButton = screen.getByRole('button', { name: /accessibility/i });
    await user.click(accessibilityButton);
    
    // Should show accessibility options
    expect(screen.getByText('Accessibility Settings')).toBeInTheDocument();
    expect(screen.getByText('Font Size')).toBeInTheDocument();
    expect(screen.getByText('High Contrast')).toBeInTheDocument();
  });

  it('handles subscription flow', async () => {
    const user = userEvent.setup();
    const mockRevenueCatService = require('../services/revenueCatService');
    mockRevenueCatService.default.prototype.purchasePackage.mockResolvedValue({
      originalAppUserId: '1',
      entitlements: { active: { premium: true } }
    });
    
    render(<App />);
    
    // Open subscription modal
    const upgradeButton = screen.getByText('Upgrade');
    await user.click(upgradeButton);
    
    // Should show subscription plans
    expect(screen.getByText('Premium Plans')).toBeInTheDocument();
  });

  it('handles error states gracefully', async () => {
    const user = userEvent.setup();
    const mockPredictiveService = require('../services/predictiveModelService');
    mockPredictiveService.predictGlucose.mockRejectedValue(new Error('API Error'));
    
    render(<App />);
    
    // Navigate to predictions tab
    const predictionsTab = screen.getByText('Predictions');
    await user.click(predictionsTab);
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/Prediction unavailable/)).toBeInTheDocument();
    });
  });

  it('handles offline state', async () => {
    // Mock offline state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });
    
    render(<App />);
    
    // Should show offline indicator
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('handles data persistence', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Log some data
    const trackingTab = screen.getByText('Tracking');
    await user.click(trackingTab);
    
    const mealNameInput = screen.getByLabelText('Meal Name');
    const carbsInput = screen.getByLabelText('Carbohydrates (g)');
    const saveButton = screen.getByText('Save');
    
    await user.type(mealNameInput, 'Test Meal');
    await user.type(carbsInput, '30');
    await user.click(saveButton);
    
    // Navigate away and back
    const homeTab = screen.getByText('Dashboard');
    await user.click(homeTab);
    await user.click(trackingTab);
    
    // Data should persist
    await waitFor(() => {
      expect(screen.getByText('Test Meal')).toBeInTheDocument();
    });
  });

  it('handles responsive design', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 375
    });
    
    render(<App />);
    
    // Should show mobile navigation
    expect(screen.getByRole('navigation')).toHaveClass('lg:hidden');
  });
}); 