interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

class ElevenLabsService {
  private apiKey: string;
  private voiceId: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
    this.voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID || '';
  }

  async textToSpeech(
    text: string,
    voiceSettings: VoiceSettings = {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.0,
      use_speaker_boost: true
    }
  ): Promise<string | null> {
    try {
      if (!this.apiKey || !this.voiceId) {
        console.warn('ElevenLabs API key or Voice ID not configured');
        return null;
      }

      const response = await fetch(`${this.baseUrl}/text-to-speech/${this.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: voiceSettings,
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      return audioUrl;
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      return null;
    }
  }

  async playAudio(audioUrl: string): Promise<void> {
    try {
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }

  async speakText(text: string): Promise<void> {
    try {
      const audioUrl = await this.textToSpeech(text);
      if (audioUrl) {
        await this.playAudio(audioUrl);
      }
    } catch (error) {
      console.error('Speak text error:', error);
    }
  }

  // Get available voices
  async getVoices(): Promise<any[]> {
    try {
      if (!this.apiKey) {
        return [];
      }

      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.status}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching voices:', error);
      return [];
    }
  }

  // Check if service is configured
  isConfigured(): boolean {
    return !!(this.apiKey && this.voiceId);
  }
}

export const elevenLabsService = new ElevenLabsService();