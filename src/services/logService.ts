import { supabase, GlucoseReading, MealLog, ExerciseLog, isSupabaseConfigured } from '../lib/supabase';

export async function fetchUserLogs(userId: string) {
  if (!isSupabaseConfigured || !supabase) {
    // Return demo/local data
    return [];
  }
  try {
    // Fetch glucose readings
    const { data: glucoseReadings, error: glucoseError } = await supabase
      .from('glucose_readings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Fetch meal logs
    const { data: mealLogs, error: mealError } = await supabase
      .from('meal_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Fetch exercise logs
    const { data: exerciseLogs, error: exerciseError } = await supabase
      .from('exercise_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (glucoseError || mealError || exerciseError) {
      throw glucoseError || mealError || exerciseError;
    }

    // Normalize logs to match allLogs format
    const logs = [
      ...((glucoseReadings || []) as GlucoseReading[]).map(g => ({
        id: g.id,
        type: 'glucose',
        data: g,
        time: g.created_at,
        date: new Date(g.created_at).toISOString().split('T')[0]
      })),
      ...((mealLogs || []) as MealLog[]).map(m => ({
        id: m.id,
        type: 'meal',
        data: m,
        time: m.created_at,
        date: new Date(m.created_at).toISOString().split('T')[0]
      })),
      ...((exerciseLogs || []) as ExerciseLog[]).map(e => ({
        id: e.id,
        type: 'exercise',
        data: e,
        time: e.created_at,
        date: new Date(e.created_at).toISOString().split('T')[0]
      })),
    ];

    // Sort all logs by created_at descending
    logs.sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1));
    return logs;
  } catch (error) {
    console.error('Error fetching user logs:', error);
    throw error;
  }
} 