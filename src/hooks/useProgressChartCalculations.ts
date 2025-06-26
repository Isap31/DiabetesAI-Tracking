import { useMemo, useCallback } from 'react';

type GlucoseDataPoint = {
  time: number;
  glucose: number | null;
  predicted: number;
  day: string;
  label: string;
  factors: string[];
  realPrediction?: boolean;
};

interface UseProgressChartCalculationsProps {
  selectedPeriod: string;
  realPrediction: number | null;
  allParamsFilled: boolean;
  predictionParams: Record<string, string>;
  useDemoData: boolean;
}

export function useProgressChartCalculations({
  selectedPeriod,
  realPrediction,
  allParamsFilled,
  predictionParams,
  useDemoData
}: UseProgressChartCalculationsProps) {
  // User profile (could be parameterized in the future)
  const userProfile = useMemo(() => ({
    age: 34,
    diabetesType: 'Type 1',
    height: 165,
    weight: 68,
    bmi: 25.0,
    yearsSinceDiagnosis: 9,
    currentStress: 3,
    gender: 'female',
    isPregnant: false,
    menstrualCycleDay: 14,
    menstrualCycleLength: 28,
    sleepQuality: 7, // 1-10 scale
    sleepDuration: 7.5, // hours
    bedtime: '22:30',
    wakeTime: '06:00'
  }), []);

  const getHormonalInfluence = useCallback((cycleDay: number) => {
    if (userProfile.gender !== 'female' || userProfile.isPregnant) return 0;
    if (cycleDay >= 12 && cycleDay <= 16) return 15;
    if (cycleDay >= 17) return 10;
    if (cycleDay <= 5) return 8;
    return -5;
  }, [userProfile.gender, userProfile.isPregnant]);

  const getSleepInfluence = useCallback((quality: number, duration: number) => {
    const qualityImpact = (10 - quality) * 2;
    const durationImpact = Math.abs(duration - 7.5) * 3;
    return qualityImpact + durationImpact;
  }, []);

  const getStressInfluence = useCallback((stressLevel: number) => {
    return (stressLevel - 1) * 3;
  }, []);

  const getExperienceInfluence = useCallback((years: number) => {
    return Math.max(0, 10 - years);
  }, []);

  const getMealTimingInfluence = useCallback((hoursSinceMeal: number) => {
    if (hoursSinceMeal < 1) return 20;
    if (hoursSinceMeal < 2) return 15;
    if (hoursSinceMeal < 3) return 8;
    return 0;
  }, []);

  const getExerciseInfluence = useCallback((hoursSinceExercise: number, intensity: string) => {
    if (hoursSinceExercise > 4) return 0;
    const intensityMultiplier: Record<string, number> = {
      'light': -3,
      'moderate': -8,
      'vigorous': -12
    };
    const timeDecay = Math.max(0, 1 - (hoursSinceExercise / 4));
    return (intensityMultiplier[intensity] || 0) * timeDecay;
  }, []);

  const getXAxisLabels = useCallback((): string[] => {
    if (selectedPeriod === 'days') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    } else if (selectedPeriod === 'weeks') {
      return ['W1', 'W2', 'W3', 'W4'];
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    }
  }, [selectedPeriod]);

  const getParameterInfluencedStats = useCallback(() => {
    const hormonalInfluence = userProfile.gender === 'female' ? getHormonalInfluence(userProfile.menstrualCycleDay) : 0;
    const sleepInfluence = getSleepInfluence(userProfile.sleepQuality, userProfile.sleepDuration);
    const stressInfluence = getStressInfluence(userProfile.currentStress);
    const experienceBonus = Math.max(0, userProfile.yearsSinceDiagnosis - 5) * 2;
    return {
      accuracy: Math.min(96, 87 + experienceBonus + (hormonalInfluence > 0 ? 3 : 0) + (sleepInfluence < 5 ? 2 : 0)),
      timeInRange: Math.max(75, 82 - Math.abs(hormonalInfluence) * 0.5 - stressInfluence * 0.3 - sleepInfluence * 0.4 + experienceBonus),
      avgTime: 4.2 + (experienceBonus * 0.1) + (sleepInfluence < 5 ? 0.3 : -0.2),
      tir: Math.max(70, 82 - Math.abs(hormonalInfluence) * 0.4 - stressInfluence * 0.2 - sleepInfluence * 0.3)
    };
  }, [userProfile, getHormonalInfluence, getSleepInfluence, getStressInfluence]);

  const getMenstrualPhase = useCallback(() => {
    if (userProfile.gender !== 'female' || userProfile.isPregnant) return null;
    const day = userProfile.menstrualCycleDay;
    if (day <= 5) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day <= 15) return 'Ovulation';
    return 'Luteal';
  }, [userProfile.gender, userProfile.isPregnant, userProfile.menstrualCycleDay]);

  const originalGetGlucoseData = useCallback((): GlucoseDataPoint[] => {
    const hormonalInfluence = userProfile.gender === 'female' ? getHormonalInfluence(userProfile.menstrualCycleDay) : 0;
    const sleepInfluence = getSleepInfluence(userProfile.sleepQuality, userProfile.sleepDuration);
    const stressInfluence = getStressInfluence(userProfile.currentStress);
    const experienceInfluence = getExperienceInfluence(userProfile.yearsSinceDiagnosis);
    if (selectedPeriod === 'days') {
      return [
        { time: 6, glucose: 95, predicted: 98 + hormonalInfluence * 0.3 + sleepInfluence * 0.2, day: 'Mon', label: '6:00 AM', factors: ['Fasting', 'Sleep: 7.5h', userProfile.gender === 'female' ? 'Hormonal: +' + hormonalInfluence + '%' : 'Male profile'] },
        { time: 8, glucose: 110, predicted: 105 + hormonalInfluence * 0.5 + 15, day: 'Mon', label: '8:00 AM', factors: ['Post-meal', 'Carbs: 25g', userProfile.gender === 'female' ? 'Hormonal impact' : 'No hormonal factors'] },
        { time: 12, glucose: 88, predicted: 92 - 5, day: 'Mon', label: '12:00 PM', factors: ['Pre-meal', 'Exercise effect', 'Good sleep recovery'] },
        { time: 18, glucose: 102, predicted: 99 + hormonalInfluence * 0.4, day: 'Mon', label: '6:00 PM', factors: ['Post-dinner', 'Stress: Level ' + userProfile.currentStress, 'Sleep quality: ' + userProfile.sleepQuality + '/10'] },
        { time: 22, glucose: 94, predicted: 96 + stressInfluence * 0.2 + sleepInfluence * 0.1, day: 'Mon', label: '10:00 PM', factors: ['Bedtime', 'Daily stress impact', 'Pre-sleep'] },
        { time: 30, glucose: 87, predicted: 89 + hormonalInfluence * 0.2 + sleepInfluence * 0.15, day: 'Tue', label: '6:00 AM', factors: ['Fasting', userProfile.gender === 'female' ? 'Cycle day: ' + userProfile.menstrualCycleDay : 'Male baseline', 'Sleep recovery'] },
        { time: 32, glucose: 115, predicted: 108 + hormonalInfluence * 0.6, day: 'Tue', label: '8:00 AM', factors: ['Post-meal', userProfile.gender === 'female' ? 'Hormonal resistance' : 'Standard response'] },
        { time: 36, glucose: 91, predicted: 93 - experienceInfluence, day: 'Tue', label: '12:00 PM', factors: ['Pre-meal', 'Experience: ' + userProfile.yearsSinceDiagnosis + ' years', 'Sleep quality impact'] },
        { time: 42, glucose: 98, predicted: 101 + hormonalInfluence * 0.3, day: 'Tue', label: '6:00 PM', factors: ['Post-dinner', 'BMI: ' + userProfile.bmi, 'Sleep duration: ' + userProfile.sleepDuration + 'h'] },
        { time: 46, glucose: 89, predicted: 91 + stressInfluence * 0.3 + sleepInfluence * 0.1, day: 'Tue', label: '10:00 PM', factors: ['Bedtime', 'Stress level impact', 'Sleep preparation'] },
        { time: 54, glucose: 92, predicted: 95 + hormonalInfluence * 0.4 + sleepInfluence * 0.2, day: 'Wed', label: '6:00 AM', factors: ['Fasting', userProfile.gender === 'female' ? 'Mid-cycle effects' : 'Stable male pattern', 'Sleep quality'] },
        { time: 56, glucose: 108, predicted: 103 + hormonalInfluence * 0.7, day: 'Wed', label: '8:00 AM', factors: ['Post-meal', userProfile.gender === 'female' ? 'Peak hormonal impact' : 'Standard meal response'] },
        { time: 60, glucose: 85, predicted: 88 - 8, day: 'Wed', label: '12:00 PM', factors: ['Pre-meal', 'Exercise: 30min moderate', 'Good sleep recovery'] },
        { time: 66, glucose: 96, predicted: 98 + hormonalInfluence * 0.2, day: 'Wed', label: '6:00 PM', factors: ['Post-dinner', 'Age: ' + userProfile.age, 'Sleep pattern stable'] },
        { time: 70, glucose: 91, predicted: 93 + stressInfluence * 0.1 + sleepInfluence * 0.05, day: 'Wed', label: '10:00 PM', factors: ['Bedtime', 'Low stress day', 'Optimal sleep timing'] },
        { time: 78, glucose: 99, predicted: 102 + hormonalInfluence * 0.5 + sleepInfluence * 0.3, day: 'Thu', label: '6:00 AM', factors: ['Fasting', userProfile.gender === 'female' ? 'Ovulation phase' : 'Male baseline', 'Sleep impact'] },
        { time: 80, glucose: 112, predicted: 107 + hormonalInfluence * 0.8, day: 'Thu', label: '8:00 AM', factors: ['Post-meal', userProfile.gender === 'female' ? 'High insulin resistance' : 'Normal response'] },
        { time: 84, glucose: 88, predicted: 91 - 6, day: 'Thu', label: '12:00 PM', factors: ['Pre-meal', 'Walking effect', 'Sleep quality benefit'] },
        { time: 90, glucose: 94, predicted: 97 + hormonalInfluence * 0.3, day: 'Thu', label: '6:00 PM', factors: ['Post-dinner', 'Type 1 diabetes', 'Sleep duration optimal'] },
        { time: 94, glucose: 87, predicted: 89 + stressInfluence * 0.2 + sleepInfluence * 0.1, day: 'Thu', label: '10:00 PM', factors: ['Bedtime', 'Moderate stress', 'Pre-sleep glucose'] },
        { time: 102, glucose: 93, predicted: 95 + hormonalInfluence * 0.3 + sleepInfluence * 0.2, day: 'Fri', label: '6:00 AM', factors: ['Fasting', userProfile.gender === 'female' ? 'Current cycle day' : 'Male pattern', 'Last night sleep: ' + userProfile.sleepQuality + '/10'] },
        { time: 104, glucose: 109, predicted: 104 + hormonalInfluence * 0.6 + 12, day: 'Fri', label: '8:00 AM', factors: ['Post-meal', 'Oatmeal 25g carbs', userProfile.gender === 'female' ? 'Hormonal peak' : 'Standard response'] },
        { time: 108, glucose: null, predicted: 89 - 8 + sleepInfluence * 0.1, day: 'Fri', label: '12:00 PM', factors: ['Predicted', 'Exercise benefit', 'Sleep recovery factor'] },
        { time: 114, glucose: null, predicted: 95 + hormonalInfluence * 0.4, day: 'Fri', label: '6:00 PM', factors: ['Predicted', 'Dinner impact', userProfile.gender === 'female' ? 'Cycle phase' : 'Male baseline'] },
        { time: 118, glucose: null, predicted: 91 + stressInfluence * 0.2 + sleepInfluence * 0.1, day: 'Fri', label: '10:00 PM', factors: ['Predicted', 'End of day', 'Sleep preparation'] },
      ] as GlucoseDataPoint[];
    } else if (selectedPeriod === 'weeks') {
      return [
        { time: 20, glucose: 92, predicted: 94 + hormonalInfluence * 0.2, day: 'W1', label: 'Week 1', factors: ['Weekly avg', userProfile.gender === 'female' ? 'Follicular phase' : 'Stable week'] },
        { time: 40, glucose: 89, predicted: 91 + hormonalInfluence * 0.4, day: 'W2', label: 'Week 2', factors: ['Weekly avg', userProfile.gender === 'female' ? 'Ovulation week' : 'Normal patterns'] },
        { time: 60, glucose: 95, predicted: 97 + hormonalInfluence * 0.3, day: 'W3', label: 'Week 3', factors: ['Weekly avg', userProfile.gender === 'female' ? 'Luteal phase' : 'Consistent control'] },
        { time: 80, glucose: 88, predicted: 90 + hormonalInfluence * 0.1, day: 'W4', label: 'Week 4', factors: ['Weekly avg', userProfile.gender === 'female' ? 'Pre-menstrual' : 'Stable patterns'] },
        { time: 100, glucose: null, predicted: 93 + hormonalInfluence * 0.3, day: 'W5', label: 'Week 5', factors: ['Predicted', userProfile.gender === 'female' ? 'New cycle start' : 'Continued stability'] },
      ] as GlucoseDataPoint[];
    } else {
      return [
        { time: 30, glucose: 98, predicted: 100 + hormonalInfluence * 0.1, day: 'Jan', label: 'January', factors: ['Monthly avg', 'Winter patterns', 'Sleep schedule'] },
        { time: 50, glucose: 94, predicted: 96 + hormonalInfluence * 0.2, day: 'Feb', label: 'February', factors: ['Monthly avg', userProfile.gender === 'female' ? 'Cycle variations' : 'Stable control'] },
        { time: 70, glucose: 91, predicted: 93 + hormonalInfluence * 0.3, day: 'Mar', label: 'March', factors: ['Monthly avg', 'Spring activity', 'Sleep improvement'] },
        { time: 90, glucose: 87, predicted: 89 + hormonalInfluence * 0.2, day: 'Apr', label: 'April', factors: ['Monthly avg', 'Improved control', 'Better sleep'] },
        { time: 110, glucose: 89, predicted: 91 + hormonalInfluence * 0.1, day: 'May', label: 'May', factors: ['Monthly avg', 'Stable patterns', 'Optimal sleep'] },
        { time: 130, glucose: null, predicted: 85 + hormonalInfluence * 0.2, day: 'Jun', label: 'June', factors: ['Predicted', 'Summer trends', 'Sleep consistency'] },
      ] as GlucoseDataPoint[];
    }
  }, [userProfile, getHormonalInfluence, getSleepInfluence, getStressInfluence, getExperienceInfluence, selectedPeriod]);

  const getGlucoseData = useCallback((): GlucoseDataPoint[] => {
    if (!useDemoData && !allParamsFilled) {
      return [];
    }
    const base = originalGetGlucoseData();
    if (realPrediction !== null && base.length > 0) {
      const lastIdx = base.length - 1;
      base[lastIdx] = {
        ...base[lastIdx],
        predicted: realPrediction,
        realPrediction: true,
      } as GlucoseDataPoint;
    }
    return base;
  }, [useDemoData, allParamsFilled, originalGetGlucoseData, realPrediction]);

  return {
    userProfile,
    getHormonalInfluence,
    getSleepInfluence,
    getStressInfluence,
    getExperienceInfluence,
    getMealTimingInfluence,
    getExerciseInfluence,
    getXAxisLabels,
    getParameterInfluencedStats,
    getMenstrualPhase,
    originalGetGlucoseData,
    getGlucoseData
  };
} 