import { useTranslation } from '../translations';

describe('Translations Utility', () => {
  it('returns English translations by default', () => {
    const t = useTranslation('en');
    
    expect(t.dashboard).toBe('Dashboard');
    expect(t.tracking).toBe('Tracking');
    expect(t.predictions).toBe('Predictions');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('AI-Powered Diabetes Management');
  });

  it('returns Spanish translations when language is set to es', () => {
    const t = useTranslation('es');
    
    expect(t.dashboard).toBe('Panel');
    expect(t.tracking).toBe('Seguimiento');
    expect(t.predictions).toBe('Predicciones');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('Gestión de Diabetes con IA');
  });

  it('returns French translations when language is set to fr', () => {
    const t = useTranslation('fr');
    
    expect(t.dashboard).toBe('Tableau de Bord');
    expect(t.tracking).toBe('Suivi');
    expect(t.predictions).toBe('Prédictions');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('Gestion du Diabète par IA');
  });

  it('returns German translations when language is set to de', () => {
    const t = useTranslation('de');
    
    expect(t.dashboard).toBe('Dashboard');
    expect(t.tracking).toBe('Verfolgung');
    expect(t.predictions).toBe('Vorhersagen');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('KI-gestütztes Diabetes-Management');
  });

  it('returns Chinese translations when language is set to zh', () => {
    const t = useTranslation('zh');
    
    expect(t.dashboard).toBe('仪表板');
    expect(t.tracking).toBe('跟踪');
    expect(t.predictions).toBe('预测');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('AI驱动的糖尿病管理');
  });

  it('returns Japanese translations when language is set to ja', () => {
    const t = useTranslation('ja');
    
    expect(t.dashboard).toBe('ダッシュボード');
    expect(t.tracking).toBe('トラッキング');
    expect(t.predictions).toBe('予測');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('AI駆動糖尿病管理');
  });

  it('returns Korean translations when language is set to ko', () => {
    const t = useTranslation('ko');
    
    expect(t.dashboard).toBe('대시보드');
    expect(t.tracking).toBe('추적');
    expect(t.predictions).toBe('예측');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('AI 기반 당뇨병 관리');
  });

  it('returns Arabic translations when language is set to ar', () => {
    const t = useTranslation('ar');
    
    expect(t.dashboard).toBe('لوحة التحكم');
    expect(t.tracking).toBe('التتبع');
    expect(t.predictions).toBe('التنبؤات');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('إدارة السكري بالذكاء الاصطناعي');
  });

  it('returns Hindi translations when language is set to hi', () => {
    const t = useTranslation('hi');
    
    expect(t.dashboard).toBe('डैशबोर्ड');
    expect(t.tracking).toBe('ट्रैकिंग');
    expect(t.predictions).toBe('भविष्यवाणियां');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('AI-संचालित मधुमेह प्रबंधन');
  });

  it('returns Portuguese translations when language is set to pt', () => {
    const t = useTranslation('pt');
    
    expect(t.dashboard).toBe('Painel');
    expect(t.tracking).toBe('Rastreamento');
    expect(t.predictions).toBe('Previsões');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('Gestão de Diabetes com IA');
  });

  it('returns Russian translations when language is set to ru', () => {
    const t = useTranslation('ru');
    
    expect(t.dashboard).toBe('Панель');
    expect(t.tracking).toBe('Отслеживание');
    expect(t.predictions).toBe('Прогнозы');
    expect(t.appName).toBe('AuroraFlow');
    expect(t.appSubtitle).toBe('ИИ-управление диабетом');
  });

  it('falls back to English for unknown language codes', () => {
    const t = useTranslation('unknown');
    
    expect(t.dashboard).toBe('Dashboard');
    expect(t.tracking).toBe('Tracking');
    expect(t.predictions).toBe('Predictions');
  });

  it('includes all required translation keys', () => {
    const t = useTranslation('en');
    
    const requiredKeys = [
      'dashboard', 'tracking', 'predictions', 'community', 'petCompanion', 'achievements',
      'appName', 'appSubtitle', 'recentGlucoseReading', 'connected', 'disconnected',
      'welcomeBack', 'healthOverview', 'systemStatus', 'currentGlucose', 'timeInRange',
      'loggingStreak', 'healthScore', 'quickActions', 'logMeal', 'scanFood', 'aiChat',
      'mealName', 'carbohydrates', 'calories', 'time', 'save', 'cancel',
      'flowSenseAI', 'intelligentHealthAssistant', 'aiPoweredInsights',
      'aiPredictionsAnalytics', 'advancedGlucoseModeling', 'predictionAccuracy',
      'modelConfidence', 'dataPoints', 'enterDataToSeePredictions'
    ];
    
    requiredKeys.forEach(key => {
      expect(t[key as keyof typeof t]).toBeDefined();
      expect(typeof t[key as keyof typeof t]).toBe('string');
    });
  });

  it('handles special characters correctly in different languages', () => {
    const t = useTranslation('zh');
    
    // Chinese should have proper characters
    expect(t.dashboard).toMatch(/[\u4e00-\u9fff]/);
    expect(t.tracking).toMatch(/[\u4e00-\u9fff]/);
    
    const tJa = useTranslation('ja');
    // Japanese should have proper characters
    expect(tJa.dashboard).toMatch(/[\u3040-\u309f\u30a0-\u30ff]/);
  });

  it('maintains consistent key structure across languages', () => {
    const languages = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ar', 'hi', 'pt', 'ru'];
    
    languages.forEach(lang => {
      const t = useTranslation(lang);
      
      // Check that all languages have the same keys
      expect(t).toHaveProperty('dashboard');
      expect(t).toHaveProperty('tracking');
      expect(t).toHaveProperty('predictions');
      expect(t).toHaveProperty('appName');
      expect(t).toHaveProperty('appSubtitle');
    });
  });
}); 