import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';
import { Conversation } from '@elevenlabs/client';

const AGENT_ID = 'agent_01jyjvweh0e3caa8h03ms6zzrm';

const FlowSenseAI: React.FC = () => {
  const [micAllowed, setMicAllowed] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'Disconnected' | 'Connected'>('Disconnected');
  const [agentStatus, setAgentStatus] = useState<'listening' | 'speaking' | ''>('listening');
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; message: string }[]>([]);
  const conversationRef = useRef<any>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  // To prevent duplicate user messages in chat
  const lastUserMessageRef = useRef<string | null>(null);

  // Ensure chat auto-scrolls to bottom
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Clean up conversation on unmount
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession();
      }
    };
  }, []);

  const handleStartConversation = async () => {
    setIsLoading(true);
    setMicError(null);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
      conversationRef.current = await Conversation.startSession({
        agentId: AGENT_ID,
        onConnect: () => {
          setConnectionStatus('Connected');
        },
        onDisconnect: () => {
          setConnectionStatus('Disconnected');
        },
        onError: (error: any) => {
          setMicError('Error: ' + (error?.message || error));
        },
        onModeChange: (mode: any) => {
          setAgentStatus(mode.mode === 'speaking' ? 'speaking' : 'listening');
        },
        onMessage: (msg: { message: string; source: 'user' | 'ai' }) => {
          // Only add user message if it's not a duplicate of the last sent typed message
          if (msg.source === 'user') {
            if (lastUserMessageRef.current === msg.message) {
              lastUserMessageRef.current = null; // reset after match
              setChatHistory(prev => [...prev, { type: 'user', message: msg.message }]);
            } else if (!lastUserMessageRef.current) {
              setChatHistory(prev => [...prev, { type: 'user', message: msg.message }]);
            }
          } else {
            setChatHistory(prev => [...prev, { type: 'ai', message: msg.message }]);
          }
        },
      });
    } catch (error: any) {
      setMicError('Failed to start conversation: ' + (error?.message || error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopConversation = async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
      setConnectionStatus('Disconnected');
      setAgentStatus('listening');
    }
  };

  const handleSend = () => {
    if (chatInput.trim() && conversationRef.current) {
      // Store the last typed user message to prevent duplicate in onMessage
      lastUserMessageRef.current = chatInput;
      conversationRef.current.sendUserMessage(chatInput);
      setChatInput('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 text-white">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
        <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 shadow-glow">
          <Mic className="h-6 w-6 md:h-7 md:w-7 text-white" />
        </span>
        <span className="text-white">FlowSense AI</span>
      </h2>
      <div className="mb-6 md:mb-8 text-base md:text-lg text-center">
        <p>Status: <span className={connectionStatus === 'Connected' ? 'text-emerald-400' : 'text-rose-400'}>{connectionStatus}</span></p>
        <p>Agent is <span className="text-blue-400">{agentStatus}</span></p>
      </div>
      {/* Chat History */}
      <div
        ref={chatHistoryRef}
        className="w-full max-w-xl flex-1 overflow-y-auto mb-4 md:mb-6 bg-slate-800 rounded-xl p-3 md:p-4 space-y-3 shadow-inner min-h-[150px] md:min-h-[200px] max-h-60 md:max-h-72"
        aria-label="Chat history"
        tabIndex={0}
      >
        {chatHistory.length === 0 && (
          <div className="text-center text-gray-400 italic py-6 md:py-8">Start a conversation with FlowSense AI...</div>
        )}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-2 md:p-3 rounded-2xl text-sm md:text-base shadow-lg break-words ${msg.type === 'user' ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white' : 'bg-gray-100 text-gray-900'}`}
              aria-label={msg.type === 'user' ? 'You' : 'AI'}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      {/* Text Input */}
      <div className="w-full max-w-xl flex items-center space-x-2">
        <input
          type="text"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg shadow text-gray-900"
          placeholder="Type your message..."
          disabled={connectionStatus !== 'Connected'}
          aria-label="Type your message"
        />
        <button
          className="p-2 md:p-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-colors shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={!chatInput.trim() || connectionStatus !== 'Connected'}
          aria-label="Send message"
        >
          <Send className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
      {/* Start/Stop Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 md:mt-8 w-full max-w-xl">
        <button
          id="startButton"
          className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleStartConversation}
          disabled={isLoading || connectionStatus === 'Connected'}
        >
          {isLoading ? 'Starting...' : 'Start Conversation'}
        </button>
        <button
          id="stopButton"
          className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleStopConversation}
          disabled={connectionStatus !== 'Connected'}
        >
          Stop Conversation
        </button>
      </div>
      {micError && <p className="mt-4 md:mt-6 text-rose-400 font-bold animate-pulse text-center px-4" role="alert">{micError}</p>}
    </div>
  );
};

export default FlowSenseAI; 