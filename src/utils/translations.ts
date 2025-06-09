export interface Translation {
  // Navigation
  dashboard: string;
  tracking: string;
  predictions: string;
  community: string;
  petCompanion: string;
  achievements: string;
  
  // Header
  appName: string;
  appSubtitle: string;
  recentGlucoseReading: string;
  connected: string;
  disconnected: string;
  connectionStatus: string;
  
  // Dashboard
  welcomeBack: string;
  healthOverview: string;
  systemStatus: string;
  systemStatusOptimal: string;
  allSystemsActive: string;
  healthProfile: string;
  updateProfile: string;
  years: string;
  sinceDiagnosis: string;
  currentGlucose: string;
  timeInRange: string;
  loggingStreak: string;
  healthScore: string;
  days: string;
  
  // Quick Actions
  quickActions: string;
  logMeal: string;
  scanFood: string;
  aiChat: string;
  viewTrends: string;
  
  // Forms
  mealName: string;
  carbohydrates: string;
  calories: string;
  time: string;
  save: string;
  cancel: string;
  
  // AI
  flowSenseAI: string;
  intelligentHealthAssistant: string;
  aiPoweredInsights: string;
  
  // Predictions
  aiPredictionsAnalytics: string;
  advancedGlucoseModeling: string;
  predictionAccuracy: string;
  modelConfidence: string;
  dataPoints: string;
  
  // Profile
  profileSettings: string;
  managePersonalInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  diabetesType: string;
  
  // Common
  male: string;
  female: string;
  type1: string;
  type2: string;
  gestational: string;
  excellent: string;
  good: string;
  fair: string;
  poor: string;
  
  // Units
  mgdl: string;
  hours: string;
  minutes: string;
  grams: string;
}

export const translations: Record<string, Translation> = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    tracking: "Tracking",
    predictions: "Predictions",
    community: "Community",
    petCompanion: "Pet Companion",
    achievements: "Achievements",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "AI-Powered Diabetes Management",
    recentGlucoseReading: "Recent Glucose Reading",
    connected: "Connected",
    disconnected: "Disconnected",
    connectionStatus: "Connection Status",
    
    // Dashboard
    welcomeBack: "Welcome back",
    healthOverview: "Here's your health overview for today.",
    systemStatus: "System Status: Optimal",
    systemStatusOptimal: "All monitoring systems active. Glucose levels stable.",
    allSystemsActive: "All systems active",
    healthProfile: "Health Profile",
    updateProfile: "Update Profile",
    years: "years",
    sinceDiagnosis: "Since diagnosis",
    currentGlucose: "Current Glucose",
    timeInRange: "Time in Range",
    loggingStreak: "Logging Streak",
    healthScore: "Health Score",
    days: "days",
    
    // Quick Actions
    quickActions: "Quick Actions",
    logMeal: "Log Meal",
    scanFood: "Scan Food",
    aiChat: "AI Chat",
    viewTrends: "View Trends",
    
    // Forms
    mealName: "Meal Name",
    carbohydrates: "Carbohydrates",
    calories: "Calories",
    time: "Time",
    save: "Save",
    cancel: "Cancel",
    
    // AI
    flowSenseAI: "FlowSense AI",
    intelligentHealthAssistant: "Your intelligent health assistant",
    aiPoweredInsights: "AI-Powered Insights",
    
    // Predictions
    aiPredictionsAnalytics: "AI Predictions & Analytics",
    advancedGlucoseModeling: "Advanced glucose modeling with comprehensive parameter analysis",
    predictionAccuracy: "Prediction Accuracy",
    modelConfidence: "Model Confidence",
    dataPoints: "Data Points",
    
    // Profile
    profileSettings: "Profile Settings",
    managePersonalInfo: "Manage your personal information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    dateOfBirth: "Date of Birth",
    address: "Address",
    diabetesType: "Diabetes Type",
    
    // Common
    male: "Male",
    female: "Female",
    type1: "Type 1",
    type2: "Type 2",
    gestational: "Gestational",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    
    // Units
    mgdl: "mg/dL",
    hours: "hours",
    minutes: "min",
    grams: "g",
  },
  
  es: {
    // Navigation
    dashboard: "Panel",
    tracking: "Seguimiento",
    predictions: "Predicciones",
    community: "Comunidad",
    petCompanion: "Mascota",
    achievements: "Logros",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "Gestión de Diabetes con IA",
    recentGlucoseReading: "Lectura Reciente de Glucosa",
    connected: "Conectado",
    disconnected: "Desconectado",
    connectionStatus: "Estado de Conexión",
    
    // Dashboard
    welcomeBack: "Bienvenido de nuevo",
    healthOverview: "Aquí está tu resumen de salud para hoy.",
    systemStatus: "Estado del Sistema: Óptimo",
    systemStatusOptimal: "Todos los sistemas de monitoreo activos. Niveles de glucosa estables.",
    allSystemsActive: "Todos los sistemas activos",
    healthProfile: "Perfil de Salud",
    updateProfile: "Actualizar Perfil",
    years: "años",
    sinceDiagnosis: "Desde el diagnóstico",
    currentGlucose: "Glucosa Actual",
    timeInRange: "Tiempo en Rango",
    loggingStreak: "Racha de Registro",
    healthScore: "Puntuación de Salud",
    days: "días",
    
    // Quick Actions
    quickActions: "Acciones Rápidas",
    logMeal: "Registrar Comida",
    scanFood: "Escanear Comida",
    aiChat: "Chat IA",
    viewTrends: "Ver Tendencias",
    
    // Forms
    mealName: "Nombre de la Comida",
    carbohydrates: "Carbohidratos",
    calories: "Calorías",
    time: "Hora",
    save: "Guardar",
    cancel: "Cancelar",
    
    // AI
    flowSenseAI: "FlowSense IA",
    intelligentHealthAssistant: "Tu asistente inteligente de salud",
    aiPoweredInsights: "Insights Impulsados por IA",
    
    // Predictions
    aiPredictionsAnalytics: "Predicciones y Análisis de IA",
    advancedGlucoseModeling: "Modelado avanzado de glucosa con análisis integral de parámetros",
    predictionAccuracy: "Precisión de Predicción",
    modelConfidence: "Confianza del Modelo",
    dataPoints: "Puntos de Datos",
    
    // Profile
    profileSettings: "Configuración de Perfil",
    managePersonalInfo: "Gestiona tu información personal",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo",
    phone: "Teléfono",
    dateOfBirth: "Fecha de Nacimiento",
    address: "Dirección",
    diabetesType: "Tipo de Diabetes",
    
    // Common
    male: "Masculino",
    female: "Femenino",
    type1: "Tipo 1",
    type2: "Tipo 2",
    gestational: "Gestacional",
    excellent: "Excelente",
    good: "Bueno",
    fair: "Regular",
    poor: "Malo",
    
    // Units
    mgdl: "mg/dL",
    hours: "horas",
    minutes: "min",
    grams: "g",
  },
  
  fr: {
    // Navigation
    dashboard: "Tableau de Bord",
    tracking: "Suivi",
    predictions: "Prédictions",
    community: "Communauté",
    petCompanion: "Animal de Compagnie",
    achievements: "Réalisations",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "Gestion du Diabète par IA",
    recentGlucoseReading: "Lecture Récente de Glucose",
    connected: "Connecté",
    disconnected: "Déconnecté",
    connectionStatus: "État de Connexion",
    
    // Dashboard
    welcomeBack: "Bon retour",
    healthOverview: "Voici votre aperçu santé pour aujourd'hui.",
    systemStatus: "État du Système: Optimal",
    systemStatusOptimal: "Tous les systèmes de surveillance actifs. Niveaux de glucose stables.",
    allSystemsActive: "Tous les systèmes actifs",
    healthProfile: "Profil de Santé",
    updateProfile: "Mettre à Jour le Profil",
    years: "ans",
    sinceDiagnosis: "Depuis le diagnostic",
    currentGlucose: "Glucose Actuel",
    timeInRange: "Temps dans la Plage",
    loggingStreak: "Série d'Enregistrement",
    healthScore: "Score de Santé",
    days: "jours",
    
    // Quick Actions
    quickActions: "Actions Rapides",
    logMeal: "Enregistrer Repas",
    scanFood: "Scanner Nourriture",
    aiChat: "Chat IA",
    viewTrends: "Voir Tendances",
    
    // Forms
    mealName: "Nom du Repas",
    carbohydrates: "Glucides",
    calories: "Calories",
    time: "Heure",
    save: "Sauvegarder",
    cancel: "Annuler",
    
    // AI
    flowSenseAI: "FlowSense IA",
    intelligentHealthAssistant: "Votre assistant santé intelligent",
    aiPoweredInsights: "Insights Alimentés par IA",
    
    // Predictions
    aiPredictionsAnalytics: "Prédictions et Analyses IA",
    advancedGlucoseModeling: "Modélisation avancée du glucose avec analyse complète des paramètres",
    predictionAccuracy: "Précision de Prédiction",
    modelConfidence: "Confiance du Modèle",
    dataPoints: "Points de Données",
    
    // Profile
    profileSettings: "Paramètres de Profil",
    managePersonalInfo: "Gérez vos informations personnelles",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    dateOfBirth: "Date de Naissance",
    address: "Adresse",
    diabetesType: "Type de Diabète",
    
    // Common
    male: "Masculin",
    female: "Féminin",
    type1: "Type 1",
    type2: "Type 2",
    gestational: "Gestationnel",
    excellent: "Excellent",
    good: "Bon",
    fair: "Correct",
    poor: "Mauvais",
    
    // Units
    mgdl: "mg/dL",
    hours: "heures",
    minutes: "min",
    grams: "g",
  },
  
  de: {
    // Navigation
    dashboard: "Dashboard",
    tracking: "Verfolgung",
    predictions: "Vorhersagen",
    community: "Gemeinschaft",
    petCompanion: "Haustier",
    achievements: "Erfolge",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "KI-gestütztes Diabetes-Management",
    recentGlucoseReading: "Aktuelle Glukose-Messung",
    connected: "Verbunden",
    disconnected: "Getrennt",
    connectionStatus: "Verbindungsstatus",
    
    // Dashboard
    welcomeBack: "Willkommen zurück",
    healthOverview: "Hier ist Ihre Gesundheitsübersicht für heute.",
    systemStatus: "Systemstatus: Optimal",
    systemStatusOptimal: "Alle Überwachungssysteme aktiv. Glukosewerte stabil.",
    allSystemsActive: "Alle Systeme aktiv",
    healthProfile: "Gesundheitsprofil",
    updateProfile: "Profil Aktualisieren",
    years: "Jahre",
    sinceDiagnosis: "Seit Diagnose",
    currentGlucose: "Aktuelle Glukose",
    timeInRange: "Zeit im Bereich",
    loggingStreak: "Protokollierungssträhne",
    healthScore: "Gesundheitswert",
    days: "Tage",
    
    // Quick Actions
    quickActions: "Schnellaktionen",
    logMeal: "Mahlzeit Protokollieren",
    scanFood: "Essen Scannen",
    aiChat: "KI Chat",
    viewTrends: "Trends Anzeigen",
    
    // Forms
    mealName: "Mahlzeitname",
    carbohydrates: "Kohlenhydrate",
    calories: "Kalorien",
    time: "Zeit",
    save: "Speichern",
    cancel: "Abbrechen",
    
    // AI
    flowSenseAI: "FlowSense KI",
    intelligentHealthAssistant: "Ihr intelligenter Gesundheitsassistent",
    aiPoweredInsights: "KI-gestützte Einblicke",
    
    // Predictions
    aiPredictionsAnalytics: "KI-Vorhersagen & Analysen",
    advancedGlucoseModeling: "Erweiterte Glukosemodellierung mit umfassender Parameteranalyse",
    predictionAccuracy: "Vorhersagegenauigkeit",
    modelConfidence: "Modellvertrauen",
    dataPoints: "Datenpunkte",
    
    // Profile
    profileSettings: "Profileinstellungen",
    managePersonalInfo: "Verwalten Sie Ihre persönlichen Informationen",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefon",
    dateOfBirth: "Geburtsdatum",
    address: "Adresse",
    diabetesType: "Diabetes-Typ",
    
    // Common
    male: "Männlich",
    female: "Weiblich",
    type1: "Typ 1",
    type2: "Typ 2",
    gestational: "Gestational",
    excellent: "Ausgezeichnet",
    good: "Gut",
    fair: "Mäßig",
    poor: "Schlecht",
    
    // Units
    mgdl: "mg/dL",
    hours: "Stunden",
    minutes: "Min",
    grams: "g",
  }
};

export const useTranslation = (language: string) => {
  return translations[language] || translations.en;
};