import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface ChatMessage {
  id: string;
  created_at: string;
  user_id: string;
  message_content: string;
  message_type: 'user' | 'ai';
  session_id?: string;
}

export interface GlucoseReading {
  id: string;
  created_at: string;
  user_id: string;
  glucose_value: number;
  context: string;
  notes?: string;
}

export interface MealLog {
  id: string;
  created_at: string;
  user_id: string;
  meal_name: string;
  carbohydrates: number;
  protein?: number;
  calories?: number;
  alcohol?: number;
}

export interface ExerciseLog {
  id: string;
  created_at: string;
  user_id: string;
  exercise_type: string;
  duration_minutes: number;
  intensity: 'light' | 'moderate' | 'vigorous';
}

export interface UserProfile {
  id: string;
  created_at: string;
  user_id: string;
  age: number;
  gender: 'male' | 'female';
  diabetes_type: string;
  height_cm: number;
  weight_kg: number;
  sleep_quality: number;
  sleep_duration: number;
  stress_level: number;
  is_menopause?: boolean;
  last_menstrual_period?: string;
}