import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import FlowSenseAI from '../FlowSenseAI';
import { Conversation } from '@elevenlabs/client';

// Mock ElevenLabs client
jest.mock('@elevenlabs/client', () => ({
  Conversation: {
    startSession: jest.fn(),
  },
}));

// Mock navigator.mediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn(),
  },
  writable: true,
});

describe('FlowSenseAI Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<FlowSenseAI />);
    expect(screen.getByText('FlowSense AI')).toBeInTheDocument();
  });

  it('shows initial connection status as disconnected', () => {
    render(<FlowSenseAI />);
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Disconnected/i)).toBeInTheDocument();
  });

  it('shows agent status as listening initially', () => {
    render(<FlowSenseAI />);
    expect(screen.getByText(/Agent is/i)).toBeInTheDocument();
    expect(screen.getByText(/listening/i)).toBeInTheDocument();
  });

  it('renders start conversation button', () => {
    render(<FlowSenseAI />);
    expect(screen.getByRole('button', { name: /start conversation/i })).toBeInTheDocument();
  });

  it('renders stop conversation button', () => {
    render(<FlowSenseAI />);
    expect(screen.getByRole('button', { name: /stop conversation/i })).toBeInTheDocument();
  });

  it('renders text input field', () => {
    render(<FlowSenseAI />);
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
  });

  it('renders send button', () => {
    render(<FlowSenseAI />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows initial chat message', () => {
    render(<FlowSenseAI />);
    expect(screen.getByText(/start a conversation with flowSense AI/i)).toBeInTheDocument();
  });

  it('input is disabled when not connected', () => {
    render(<FlowSenseAI />);
    const input = screen.getByPlaceholderText(/type your message/i);
    expect(input).toBeDisabled();
  });

  it('send button is disabled when not connected', () => {
    render(<FlowSenseAI />);
    const sendButton = screen.getByRole('button', { name: /send message/i });
    expect(sendButton).toBeDisabled();
  });

  it('handles text input changes when connected', async () => {
    const user = userEvent.setup();
    
    // Mock the conversation to be connected
    const mockConversation = {
      sendUserMessage: jest.fn(),
      endSession: jest.fn()
    };
    
    // Mock the Conversation.startSession to return a connected conversation
    (Conversation.startSession as jest.Mock).mockImplementation((options) => {
      // Call onConnect to set connection status
      if (options.onConnect) {
        options.onConnect();
      }
      return Promise.resolve(mockConversation);
    });
    
    render(<FlowSenseAI />);
    
    // Start conversation to enable input
    const startButton = screen.getByRole('button', { name: /start conversation/i });
    await act(async () => {
      await user.click(startButton);
    });
    
    // Wait for connection to be established
    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
    });
    
    const input = screen.getByLabelText('Type your message');
    await act(async () => {
      await user.type(input, 'Hello AI');
    });
    
    expect(input).toHaveValue('Hello AI');
  });

  it('enables send button when text is entered and connected', async () => {
    const user = userEvent.setup();
    
    // Mock the conversation to be connected
    const mockConversation = {
      sendUserMessage: jest.fn(),
      endSession: jest.fn()
    };
    
    // Mock the Conversation.startSession to return a connected conversation
    (Conversation.startSession as jest.Mock).mockImplementation((options) => {
      // Call onConnect to set connection status
      if (options.onConnect) {
        options.onConnect();
      }
      return Promise.resolve(mockConversation);
    });
    
    render(<FlowSenseAI />);
    
    // Start conversation to enable input
    const startButton = screen.getByRole('button', { name: /start conversation/i });
    await act(async () => {
      await user.click(startButton);
    });
    
    // Wait for connection to be established
    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
    });
    
    const input = screen.getByLabelText('Type your message');
    const sendButton = screen.getByLabelText('Send message');
    
    // Type text
    await act(async () => {
      await user.type(input, 'Hello');
    });
    
    expect(sendButton).not.toBeDisabled();
  });

  it('handles start conversation button click', async () => {
    const user = userEvent.setup();
    const mockEndSession = jest.fn();
    
    (Conversation.startSession as jest.Mock).mockImplementation((options) => {
      // Call onConnect to set connection status
      if (options.onConnect) {
        options.onConnect();
      }
      return Promise.resolve({
        sessionId: 'test-session',
        sendUserMessage: jest.fn(),
        endSession: mockEndSession,
      });
    });

    (navigator.mediaDevices.getUserMedia as jest.Mock).mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    });

    render(<FlowSenseAI />);

    const startButton = screen.getByRole('button', { name: /start conversation/i });
    
    await act(async () => {
      await user.click(startButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Connected/i)).toBeInTheDocument();
    });
  });

  it('handles microphone permission denial', async () => {
    const user = userEvent.setup();
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockRejectedValue(new Error('Permission denied'));

    render(<FlowSenseAI />);

    const startButton = screen.getByRole('button', { name: /start conversation/i });
    
    await act(async () => {
      await user.click(startButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Failed to start conversation/i)).toBeInTheDocument();
    });
  });

  it('handles conversation session errors', async () => {
    const user = userEvent.setup();
    (Conversation.startSession as jest.Mock).mockRejectedValue(new Error('Connection failed'));

    render(<FlowSenseAI />);

    const startButton = screen.getByRole('button', { name: /start conversation/i });
    
    await act(async () => {
      await user.click(startButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Failed to start conversation/i)).toBeInTheDocument();
    });
  });

  it('handles stop conversation', async () => {
    const user = userEvent.setup();
    const mockEndSession = jest.fn();
    
    (Conversation.startSession as jest.Mock).mockImplementation((options) => {
      // Call onConnect to set connection status
      if (options.onConnect) {
        options.onConnect();
      }
      return Promise.resolve({
        sessionId: 'test-session',
        sendUserMessage: jest.fn(),
        endSession: mockEndSession,
      });
    });

    (navigator.mediaDevices.getUserMedia as jest.Mock).mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    });

    render(<FlowSenseAI />);

    const startButton = screen.getByRole('button', { name: /start conversation/i });
    
    await act(async () => {
      await user.click(startButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Connected/i)).toBeInTheDocument();
    });

    const stopButton = screen.getByRole('button', { name: /stop conversation/i });
    
    await act(async () => {
      await user.click(stopButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Disconnected/i)).toBeInTheDocument();
    });
  });

  it('handles send message functionality', async () => {
    const user = userEvent.setup();
    const mockSendUserMessage = jest.fn();
    let onMessageCallback: ((msg: { message: string; source: 'user' | 'ai' }) => void) | null = null;
    
    // Mock the conversation to be connected
    const mockConversation = {
      sendUserMessage: mockSendUserMessage,
      endSession: jest.fn()
    };
    
    // Mock the Conversation.startSession to capture the onMessage callback
    (Conversation.startSession as jest.Mock).mockImplementation((options) => {
      // Call onConnect to set connection status
      if (options.onConnect) {
        options.onConnect();
      }
      onMessageCallback = options.onMessage;
      return Promise.resolve(mockConversation);
    });
    
    render(<FlowSenseAI />);
    
    // Start conversation to enable input
    const startButton = screen.getByRole('button', { name: /start conversation/i });
    await act(async () => {
      await user.click(startButton);
    });
    
    // Wait for connection to be established
    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
    });
    
    const input = screen.getByLabelText('Type your message');
    const sendButton = screen.getByLabelText('Send message');
    
    // Type and send message
    await act(async () => {
      await user.type(input, 'Hello AI');
      await user.click(sendButton);
    });
    
    expect(mockSendUserMessage).toHaveBeenCalledWith('Hello AI');
    // Simulate the AI echoing the user's message
    act(() => {
      if (onMessageCallback) {
        onMessageCallback({ message: 'Hello AI', source: 'user' });
      }
    });
    
    // Check that the message appears in chat history
    await waitFor(() => {
      expect(screen.getByText('Hello AI')).toBeInTheDocument();
    });
  });

  it('handles enter key to send message', async () => {
    const user = userEvent.setup();
    const mockSendUserMessage = jest.fn();
    let onMessageCallback: ((msg: { message: string; source: 'user' | 'ai' }) => void) | null = null;
    
    // Mock the conversation to be connected
    const mockConversation = {
      sendUserMessage: mockSendUserMessage,
      endSession: jest.fn()
    };
    
    // Mock the Conversation.startSession to capture the onMessage callback
    (Conversation.startSession as jest.Mock).mockImplementation((options) => {
      // Call onConnect to set connection status
      if (options.onConnect) {
        options.onConnect();
      }
      onMessageCallback = options.onMessage;
      return Promise.resolve(mockConversation);
    });
    
    render(<FlowSenseAI />);
    
    // Start conversation to enable input
    const startButton = screen.getByRole('button', { name: /start conversation/i });
    await act(async () => {
      await user.click(startButton);
    });
    
    // Wait for connection to be established
    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
    });
    
    const input = screen.getByLabelText('Type your message');
    
    // Type message and press Enter
    await act(async () => {
      await user.type(input, 'Hello AI');
      await user.keyboard('{Enter}');
    });
    
    expect(mockSendUserMessage).toHaveBeenCalledWith('Hello AI');
    // Simulate the AI echoing the user's message
    act(() => {
      if (onMessageCallback) {
        onMessageCallback({ message: 'Hello AI', source: 'user' });
      }
    });
    
    // Check that the message appears in chat history
    await waitFor(() => {
      expect(screen.getByText('Hello AI')).toBeInTheDocument();
    });
  });

  it('displays chat messages correctly', async () => {
    const user = userEvent.setup();
    const mockSendUserMessage = jest.fn();
    const mockStartSession = require('@elevenlabs/client').Conversation.startSession;
    const mockEndSession = jest.fn();
    let onMessageCallback: any;
    
    mockStartSession.mockImplementation(({ onMessage }: any) => {
      onMessageCallback = onMessage;
      return Promise.resolve({
        sessionId: 'test-session',
        sendUserMessage: mockSendUserMessage,
        endSession: mockEndSession,
      });
    });

    (navigator.mediaDevices.getUserMedia as jest.Mock).mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    });

    render(<FlowSenseAI />);

    const startButton = screen.getByRole('button', { name: /start conversation/i });
    
    await act(async () => {
      await user.click(startButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Connected/i)).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/type your message/i);
    
    await act(async () => {
      await user.type(input, 'Hello AI');
      await user.keyboard('{Enter}');
    });

    // Simulate the AI echoing the user's message
    act(() => {
      onMessageCallback({ message: 'Hello AI', source: 'user' });
    });
    expect(screen.getByText('Hello AI')).toBeInTheDocument();
  });

  it('cleans up resources on unmount', () => {
    const mockEndSession = jest.fn();
    const mockStartSession = require('@elevenlabs/client').Conversation.startSession;
    
    mockStartSession.mockResolvedValue({
      sessionId: 'test-session',
      sendUserMessage: jest.fn(),
      endSession: mockEndSession,
    });

    const { unmount } = render(<FlowSenseAI />);
    unmount();
    // Component should unmount without errors
  });
}); 