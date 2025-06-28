import { predictGlucose, PredictGlucoseInput } from '../predictiveModelService';

// Mock fetch globally
global.fetch = jest.fn();

describe('Predictive Model Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('makes a successful prediction with valid input', async () => {
    const mockResponse = { predicted_glucose_30min: 120 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const input: PredictGlucoseInput = {
      glucose: 100,
      hr_mean_30min: 72,
      activity_30min: 3.2,
      carbs_30min: 40,
      protein_30min: 15,
      fat_30min: 10,
      time_sin: 0.5,
      time_cos: 0.866,
    };

    const result = await predictGlucose(input);

    expect(fetch).toHaveBeenCalledWith(
      'https://bg-predictive-model.onrender.com/predict',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it('handles network errors', async () => {
    const networkError = new Error('Network error');
    (fetch as jest.Mock).mockRejectedValueOnce(networkError);

    const input: PredictGlucoseInput = {
      glucose: 100,
      hr_mean_30min: 72,
      activity_30min: 3.2,
      carbs_30min: 40,
      protein_30min: 15,
      fat_30min: 10,
      time_sin: 0.5,
      time_cos: 0.866,
    };

    await expect(predictGlucose(input)).rejects.toThrow('Network error');
  });

  it('handles HTTP error responses', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const input: PredictGlucoseInput = {
      glucose: 100,
      hr_mean_30min: 72,
      activity_30min: 3.2,
      carbs_30min: 40,
      protein_30min: 15,
      fat_30min: 10,
      time_sin: 0.5,
      time_cos: 0.866,
    };

    await expect(predictGlucose(input)).rejects.toThrow('Prediction API error');
  });

  it('handles malformed JSON responses', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const input: PredictGlucoseInput = {
      glucose: 100,
      hr_mean_30min: 72,
      activity_30min: 3.2,
      carbs_30min: 40,
      protein_30min: 15,
      fat_30min: 10,
      time_sin: 0.5,
      time_cos: 0.866,
    };

    await expect(predictGlucose(input)).rejects.toThrow('Invalid JSON');
  });

  it('handles request timeout', async () => {
    const timeoutError = new Error('Request timeout');
    (fetch as jest.Mock).mockImplementationOnce(() => {
      return new Promise((_, reject) => {
        setTimeout(() => reject(timeoutError), 100);
      });
    });

    const input: PredictGlucoseInput = {
      glucose: 100,
      hr_mean_30min: 72,
      activity_30min: 3.2,
      carbs_30min: 40,
      protein_30min: 15,
      fat_30min: 10,
      time_sin: 0.5,
      time_cos: 0.866,
    };

    await expect(predictGlucose(input)).rejects.toThrow('Request timeout');
  });

  it('validates input parameters', async () => {
    const mockResponse = { predicted_glucose_30min: 120 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const input: PredictGlucoseInput = {
      glucose: 150,
      hr_mean_30min: 85,
      activity_30min: 5.0,
      carbs_30min: 60,
      protein_30min: 25,
      fat_30min: 20,
      time_sin: 0.707,
      time_cos: 0.707,
    };

    const result = await predictGlucose(input);

    expect(result.predicted_glucose_30min).toBe(120);
    expect(fetch).toHaveBeenCalledWith(
      'https://bg-predictive-model.onrender.com/predict',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }
    );
  });

  it('handles edge case values', async () => {
    const mockResponse = { predicted_glucose_30min: 80 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const input: PredictGlucoseInput = {
      glucose: 50, // Very low glucose
      hr_mean_30min: 45, // Very low heart rate
      activity_30min: 0, // No activity
      carbs_30min: 0, // No carbs
      protein_30min: 0, // No protein
      fat_30min: 0, // No fat
      time_sin: 0,
      time_cos: 1,
    };

    const result = await predictGlucose(input);

    expect(result.predicted_glucose_30min).toBe(80);
  });

  it('handles high values', async () => {
    const mockResponse = { predicted_glucose_30min: 300 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const input: PredictGlucoseInput = {
      glucose: 400, // Very high glucose
      hr_mean_30min: 120, // High heart rate
      activity_30min: 10, // High activity
      carbs_30min: 100, // High carbs
      protein_30min: 50, // High protein
      fat_30min: 40, // High fat
      time_sin: 1,
      time_cos: 0,
    };

    const result = await predictGlucose(input);

    expect(result.predicted_glucose_30min).toBe(300);
  });

  it('handles CORS errors', async () => {
    const corsError = new Error('CORS error');
    (fetch as jest.Mock).mockRejectedValueOnce(corsError);

    const input: PredictGlucoseInput = {
      glucose: 100,
      hr_mean_30min: 72,
      activity_30min: 3.2,
      carbs_30min: 40,
      protein_30min: 15,
      fat_30min: 10,
      time_sin: 0.5,
      time_cos: 0.866,
    };

    await expect(predictGlucose(input)).rejects.toThrow('CORS error');
  });

  it('handles rate limiting', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
    });

    const input: PredictGlucoseInput = {
      glucose: 100,
      hr_mean_30min: 72,
      activity_30min: 3.2,
      carbs_30min: 40,
      protein_30min: 15,
      fat_30min: 10,
      time_sin: 0.5,
      time_cos: 0.866,
    };

    await expect(predictGlucose(input)).rejects.toThrow('Prediction API error');
  });
}); 