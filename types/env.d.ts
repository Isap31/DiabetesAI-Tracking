declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_ELEVENLABS_API_KEY: string;
      EXPO_PUBLIC_ELEVENLABS_VOICE_ID: string;
    }
  }
}

export {};