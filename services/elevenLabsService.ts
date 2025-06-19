export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export interface ElevenLabsResponse {
  audio_base64?: string;
  error?: string;
}

class ElevenLabsService {
  private apiKey: string;
  private voiceId: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';

  constructor() {
    this.apiKey = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY || '';
    this.voiceId = process.env.EXPO_PUBLIC_ELEVENLABS_VOICE_ID || '';
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
        // Fallback to native speech synthesis
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
      const audioBase64 = await this.blobToBase64(audioBlob);
      
      return audioBase64;
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      
      // Fallback to native speech synthesis
      return null;
    }
  }

  async playAudio(audioBase64: string): Promise<void> {
    try {
      // Web audio playback
      const audio = new window.Audio(`data:audio/mpeg;base64,${audioBase64}`);
      await audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }

  async speakText(text: string): Promise<void> {
    try {
      const audioBase64 = await this.textToSpeech(text);
      if (audioBase64) {
        await this.playAudio(audioBase64);
      }
    } catch (error) {
      console.error('Speak text error:', error);
    }
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix to get just the base64 data
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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