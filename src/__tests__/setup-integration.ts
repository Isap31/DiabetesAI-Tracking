// Mock import.meta for Vite environment variables - must be before any imports
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_REVENUECAT_API_KEY: 'test-revenuecat-key',
        VITE_ELEVENLABS_API_KEY: 'test-elevenlabs-key',
        VITE_ELEVENLABS_VOICE_ID: 'test-voice-id'
      }
    }
  },
  writable: true
});

// Also mock it on the global object
(global as any).import = {
  meta: {
    env: {
      VITE_REVENUECAT_API_KEY: 'test-revenuecat-key',
      VITE_ELEVENLABS_API_KEY: 'test-elevenlabs-key',
      VITE_ELEVENLABS_VOICE_ID: 'test-voice-id'
    }
  }
}; 