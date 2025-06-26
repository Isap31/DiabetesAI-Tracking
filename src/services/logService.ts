import { supabase, GlucoseReading, MealLog, ExerciseLog } from '../lib/supabase';

export async function fetchUserLogs(userId: string) {
  try {
    // Fetch glucose readings
    const { data: glucose, error: glucoseError } = await supabase
      .from<GlucoseReading>('glucose_readings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Fetch meal logs
    const { data: meals, error: mealError } = await supabase
      .from<MealLog>('meal_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Fetch exercise logs
    const { data: exercises, error: exerciseError } = await supabase
      .from<ExerciseLog>('exercise_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (glucoseError || mealError || exerciseError) {
      throw glucoseError || mealError || exerciseError;
    }

    // Normalize logs to match allLogs format
    const logs = [
      ...(glucose || []).map(g => ({
        id: g.id,
        type: 'glucose',
        data: {
          glucose: g.glucose_value,
          context: g.context,
          notes: g.notes,
          time: new Date(g.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        time: new Date(g.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date(g.created_at).toISOString().split('T')[0]
      })),
      ...(meals || []).map(m => ({
        id: m.id,
        type: 'meal',
        data: {
          mealName: m.meal_name,
          carbs: m.carbohydrates,
          calories: m.calories,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date(m.created_at).toISOString().split('T')[0]
      })),
      ...(exercises || []).map(e => ({
        id: e.id,
        type: 'exercise',
        data: {
          exerciseType: e.exercise_type,
          duration: e.duration_minutes,
          intensity: e.intensity,
          time: new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        time: new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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