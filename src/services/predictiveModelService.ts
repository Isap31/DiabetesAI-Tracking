// Centralized service for glucose prediction API

export interface PredictGlucoseInput {
  glucose: number;
  hr_mean_30min: number;
  activity_30min: number;
  carbs_30min: number;
  protein_30min: number;
  fat_30min: number;
  time_sin: number;
  time_cos: number;
}

export interface PredictGlucoseResult {
  predicted_glucose_30min: number;
}

export async function predictGlucose(input: PredictGlucoseInput): Promise<PredictGlucoseResult> {
  try {
    const response = await fetch('https://bg-predictive-model.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error('Prediction API error');
    return await response.json();
  } catch (error) {
    console.error('Glucose prediction error:', error);
    throw error;
  }
}

export default { predictGlucose }; 