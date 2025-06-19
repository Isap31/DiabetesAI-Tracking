import React, { useState, useRef } from 'react';
import { Mic, Send, StopCircle } from 'lucide-react';
import { Conversation } from '@elevenlabs/client';

const AGENT_ID = 'agent_01jx7qvt4zez38683ke9ad4eke';

const FlowSenseAI: React.FC = () => {
  const [micAllowed, setMicAllowed] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; message: string }[]>([]);
  const [sessionActive, setSessionActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'Disconnected' | 'Connected'>('Disconnected');
  const [agentStatus, setAgentStatus] = useState<'listening' | 'speaking' | ''>('');
  const conversationRef = useRef<any>(null);

  const handleExplainMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
    } catch (err) {
      setMicError('Microphone access denied or unavailable. Please allow microphone access to use FlowSense AI.');
    }
  };

  const handleStartVoice = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
      const conversation = await Conversation.startSession({
        agentId: AGENT_ID,
        onConnect: () => {
          setConnectionStatus('Connected');
          setSessionActive(true);
        },
        onDisconnect: () => {
          setConnectionStatus('Disconnected');
          setSessionActive(false);
        },
        onError: (error: any) => {
          setMicError('Error: ' + (error?.message || error));
        },
        onModeChange: (mode: any) => {
          setAgentStatus(mode.mode === 'speaking' ? 'speaking' : 'listening');
        },
        onMessage: (msg: { message: string; source: 'user' | 'ai' }) => {
          setChatHistory((prev) => [...prev, { type: msg.source, message: msg.message }]);
        },
      });
      conversationRef.current = conversation;
    } catch (err) {
      setMicError('Failed to start voice session.');
    }
  };

  const handleEndVoice = async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
      setSessionActive(false);
      setAgentStatus('');
      setConnectionStatus('Disconnected');
    }
  };

  const handleSend = () => {
    if (chatInput.trim() && conversationRef.current) {
      conversationRef.current.sendUserMessage(chatInput);
      setChatInput('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
        <span>🤖</span>
        <span>FlowSense AI</span>
      </h2>
      <div className="flex items-center space-x-6 mb-4">
        <div>
          <span className={`font-semibold ${connectionStatus === 'Connected' ? 'text-green-600' : 'text-red-500'}`}>Status: {connectionStatus}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-700">Agent: {agentStatus || 'idle'}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>{msg.message}</div>
          </div>
        ))}
      </div>
      {!micAllowed ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <p className="text-gray-700 text-center">To use FlowSense AI, please allow microphone access. This is required for voice conversation with the agent.</p>
          {micError && <p className="text-red-500 text-center">{micError}</p>}
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={handleExplainMic}
          >
            Allow Microphone
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              disabled={!sessionActive}
            />
            <button
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSend}
              disabled={!chatInput.trim() || !sessionActive}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {!sessionActive ? (
              <button
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={handleStartVoice}
              >
                <Mic className="h-5 w-5 inline-block mr-2" /> Start Voice Conversation
              </button>
            ) : (
              <button
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
                onClick={handleEndVoice}
              >
                <StopCircle className="h-5 w-5 mr-2" /> End Voice Conversation
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FlowSenseAI; 