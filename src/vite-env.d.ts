/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REVENUECAT_API_KEY: string
  readonly VITE_ELEVENLABS_API_KEY: string
  readonly VITE_ELEVENLABS_VOICE_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
