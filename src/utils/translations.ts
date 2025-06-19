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
  
  // Device Labels
  bloodGlucoseMeter: string;
  bluetooth: string;
  internet: string;
  
  // New key
  enterDataToSeePredictions: string;
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
    
    // Device Labels
    bloodGlucoseMeter: "Blood Glucose Meter",
    bluetooth: "Bluetooth",
    internet: "Internet",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
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
    
    // Device Labels
    bloodGlucoseMeter: "Medidor de Glucosa",
    bluetooth: "Bluetooth",
    internet: "Internet",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
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
    
    // Device Labels
    bloodGlucoseMeter: "Glucomètre",
    bluetooth: "Bluetooth",
    internet: "Internet",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
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
    
    // Device Labels
    bloodGlucoseMeter: "Blutzuckermessgerät",
    bluetooth: "Bluetooth",
    internet: "Internet",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
  },
  
  zh: {
    // Navigation
    dashboard: "仪表板",
    tracking: "跟踪",
    predictions: "预测",
    community: "社区",
    petCompanion: "宠物伙伴",
    achievements: "成就",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "AI驱动的糖尿病管理",
    recentGlucoseReading: "最近血糖读数",
    connected: "已连接",
    disconnected: "已断开",
    connectionStatus: "连接状态",
    
    // Dashboard
    welcomeBack: "欢迎回来",
    healthOverview: "这是您今天的健康概览。",
    systemStatus: "系统状态：最佳",
    systemStatusOptimal: "所有监控系统活跃。血糖水平稳定。",
    allSystemsActive: "所有系统活跃",
    healthProfile: "健康档案",
    updateProfile: "更新档案",
    years: "年",
    sinceDiagnosis: "自诊断以来",
    currentGlucose: "当前血糖",
    timeInRange: "目标范围时间",
    loggingStreak: "记录连续天数",
    healthScore: "健康评分",
    days: "天",
    
    // Quick Actions
    quickActions: "快速操作",
    logMeal: "记录餐食",
    scanFood: "扫描食物",
    aiChat: "AI聊天",
    viewTrends: "查看趋势",
    
    // Forms
    mealName: "餐食名称",
    carbohydrates: "碳水化合物",
    calories: "卡路里",
    time: "时间",
    save: "保存",
    cancel: "取消",
    
    // AI
    flowSenseAI: "FlowSense AI",
    intelligentHealthAssistant: "您的智能健康助手",
    aiPoweredInsights: "AI驱动的洞察",
    
    // Predictions
    aiPredictionsAnalytics: "AI预测与分析",
    advancedGlucoseModeling: "先进的血糖建模与综合参数分析",
    predictionAccuracy: "预测准确性",
    modelConfidence: "模型置信度",
    dataPoints: "数据点",
    
    // Profile
    profileSettings: "档案设置",
    managePersonalInfo: "管理您的个人信息",
    firstName: "名",
    lastName: "姓",
    email: "邮箱",
    phone: "电话",
    dateOfBirth: "出生日期",
    address: "地址",
    diabetesType: "糖尿病类型",
    
    // Common
    male: "男性",
    female: "女性",
    type1: "1型",
    type2: "2型",
    gestational: "妊娠期",
    excellent: "优秀",
    good: "良好",
    fair: "一般",
    poor: "较差",
    
    // Units
    mgdl: "mg/dL",
    hours: "小时",
    minutes: "分钟",
    grams: "克",
    
    // Device Labels
    bloodGlucoseMeter: "血糖仪",
    bluetooth: "蓝牙",
    internet: "互联网",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
  },
  
  ja: {
    // Navigation
    dashboard: "ダッシュボード",
    tracking: "トラッキング",
    predictions: "予測",
    community: "コミュニティ",
    petCompanion: "ペット",
    achievements: "実績",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "AI駆動糖尿病管理",
    recentGlucoseReading: "最新血糖値",
    connected: "接続済み",
    disconnected: "切断済み",
    connectionStatus: "接続状態",
    
    // Dashboard
    welcomeBack: "おかえりなさい",
    healthOverview: "今日の健康概要です。",
    systemStatus: "システム状態：最適",
    systemStatusOptimal: "すべての監視システムが稼働中。血糖値は安定しています。",
    allSystemsActive: "すべてのシステムが稼働中",
    healthProfile: "健康プロフィール",
    updateProfile: "プロフィール更新",
    years: "年",
    sinceDiagnosis: "診断から",
    currentGlucose: "現在の血糖値",
    timeInRange: "目標範囲時間",
    loggingStreak: "記録連続日数",
    healthScore: "健康スコア",
    days: "日",
    
    // Quick Actions
    quickActions: "クイックアクション",
    logMeal: "食事記録",
    scanFood: "食品スキャン",
    aiChat: "AIチャット",
    viewTrends: "トレンド表示",
    
    // Forms
    mealName: "食事名",
    carbohydrates: "炭水化物",
    calories: "カロリー",
    time: "時間",
    save: "保存",
    cancel: "キャンセル",
    
    // AI
    flowSenseAI: "FlowSense AI",
    intelligentHealthAssistant: "あなたの知的健康アシスタント",
    aiPoweredInsights: "AI駆動インサイト",
    
    // Predictions
    aiPredictionsAnalytics: "AI予測・分析",
    advancedGlucoseModeling: "包括的パラメータ分析による高度な血糖モデリング",
    predictionAccuracy: "予測精度",
    modelConfidence: "モデル信頼度",
    dataPoints: "データポイント",
    
    // Profile
    profileSettings: "プロフィール設定",
    managePersonalInfo: "個人情報を管理",
    firstName: "名",
    lastName: "姓",
    email: "メール",
    phone: "電話",
    dateOfBirth: "生年月日",
    address: "住所",
    diabetesType: "糖尿病タイプ",
    
    // Common
    male: "男性",
    female: "女性",
    type1: "1型",
    type2: "2型",
    gestational: "妊娠性",
    excellent: "優秀",
    good: "良好",
    fair: "普通",
    poor: "不良",
    
    // Units
    mgdl: "mg/dL",
    hours: "時間",
    minutes: "分",
    grams: "g",
    
    // Device Labels
    bloodGlucoseMeter: "血糖測定器",
    bluetooth: "Bluetooth",
    internet: "インターネット",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
  },
  
  ko: {
    // Navigation
    dashboard: "대시보드",
    tracking: "추적",
    predictions: "예측",
    community: "커뮤니티",
    petCompanion: "펫 동반자",
    achievements: "성취",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "AI 기반 당뇨병 관리",
    recentGlucoseReading: "최근 혈당 수치",
    connected: "연결됨",
    disconnected: "연결 해제됨",
    connectionStatus: "연결 상태",
    
    // Dashboard
    welcomeBack: "다시 오신 것을 환영합니다",
    healthOverview: "오늘의 건강 개요입니다.",
    systemStatus: "시스템 상태: 최적",
    systemStatusOptimal: "모든 모니터링 시스템이 활성화되어 있습니다. 혈당 수치가 안정적입니다.",
    allSystemsActive: "모든 시스템 활성화",
    healthProfile: "건강 프로필",
    updateProfile: "프로필 업데이트",
    years: "년",
    sinceDiagnosis: "진단 이후",
    currentGlucose: "현재 혈당",
    timeInRange: "목표 범위 시간",
    loggingStreak: "기록 연속 일수",
    healthScore: "건강 점수",
    days: "일",
    
    // Quick Actions
    quickActions: "빠른 작업",
    logMeal: "식사 기록",
    scanFood: "음식 스캔",
    aiChat: "AI 채팅",
    viewTrends: "트렌드 보기",
    
    // Forms
    mealName: "식사 이름",
    carbohydrates: "탄수화물",
    calories: "칼로리",
    time: "시간",
    save: "저장",
    cancel: "취소",
    
    // AI
    flowSenseAI: "FlowSense AI",
    intelligentHealthAssistant: "당신의 지능형 건강 도우미",
    aiPoweredInsights: "AI 기반 인사이트",
    
    // Predictions
    aiPredictionsAnalytics: "AI 예측 및 분석",
    advancedGlucoseModeling: "포괄적인 매개변수 분석을 통한 고급 혈당 모델링",
    predictionAccuracy: "예측 정확도",
    modelConfidence: "모델 신뢰도",
    dataPoints: "데이터 포인트",
    
    // Profile
    profileSettings: "프로필 설정",
    managePersonalInfo: "개인 정보 관리",
    firstName: "이름",
    lastName: "성",
    email: "이메일",
    phone: "전화",
    dateOfBirth: "생년월일",
    address: "주소",
    diabetesType: "당뇨병 유형",
    
    // Common
    male: "남성",
    female: "여성",
    type1: "1형",
    type2: "2형",
    gestational: "임신성",
    excellent: "우수",
    good: "좋음",
    fair: "보통",
    poor: "나쁨",
    
    // Units
    mgdl: "mg/dL",
    hours: "시간",
    minutes: "분",
    grams: "g",
    
    // Device Labels
    bloodGlucoseMeter: "혈당 측정기",
    bluetooth: "블루투스",
    internet: "인터넷",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
  },
  
  ar: {
    // Navigation
    dashboard: "لوحة التحكم",
    tracking: "التتبع",
    predictions: "التنبؤات",
    community: "المجتمع",
    petCompanion: "الحيوان الأليف",
    achievements: "الإنجازات",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "إدارة السكري بالذكاء الاصطناعي",
    recentGlucoseReading: "قراءة الجلوكوز الأخيرة",
    connected: "متصل",
    disconnected: "غير متصل",
    connectionStatus: "حالة الاتصال",
    
    // Dashboard
    welcomeBack: "مرحباً بعودتك",
    healthOverview: "إليك نظرة عامة على صحتك لليوم.",
    systemStatus: "حالة النظام: مثلى",
    systemStatusOptimal: "جميع أنظمة المراقبة نشطة. مستويات الجلوكوز مستقرة.",
    allSystemsActive: "جميع الأنظمة نشطة",
    healthProfile: "الملف الصحي",
    updateProfile: "تحديث الملف",
    years: "سنوات",
    sinceDiagnosis: "منذ التشخيص",
    currentGlucose: "الجلوكوز الحالي",
    timeInRange: "الوقت في النطاق",
    loggingStreak: "سلسلة التسجيل",
    healthScore: "نقاط الصحة",
    days: "أيام",
    
    // Quick Actions
    quickActions: "الإجراءات السريعة",
    logMeal: "تسجيل الوجبة",
    scanFood: "مسح الطعام",
    aiChat: "محادثة الذكاء الاصطناعي",
    viewTrends: "عرض الاتجاهات",
    
    // Forms
    mealName: "اسم الوجبة",
    carbohydrates: "الكربوهيدرات",
    calories: "السعرات الحرارية",
    time: "الوقت",
    save: "حفظ",
    cancel: "إلغاء",
    
    // AI
    flowSenseAI: "FlowSense AI",
    intelligentHealthAssistant: "مساعدك الصحي الذكي",
    aiPoweredInsights: "رؤى مدعومة بالذكاء الاصطناعي",
    
    // Predictions
    aiPredictionsAnalytics: "تنبؤات وتحليلات الذكاء الاصطناعي",
    advancedGlucoseModeling: "نمذجة متقدمة للجلوكوز مع تحليل شامل للمعاملات",
    predictionAccuracy: "دقة التنبؤ",
    modelConfidence: "ثقة النموذج",
    dataPoints: "نقاط البيانات",
    
    // Profile
    profileSettings: "إعدادات الملف",
    managePersonalInfo: "إدارة معلوماتك الشخصية",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    dateOfBirth: "تاريخ الميلاد",
    address: "العنوان",
    diabetesType: "نوع السكري",
    
    // Common
    male: "ذكر",
    female: "أنثى",
    type1: "النوع الأول",
    type2: "النوع الثاني",
    gestational: "الحملي",
    excellent: "ممتاز",
    good: "جيد",
    fair: "مقبول",
    poor: "ضعيف",
    
    // Units
    mgdl: "مجم/ديسيلتر",
    hours: "ساعات",
    minutes: "دقائق",
    grams: "جرام",
    
    // Device Labels
    bloodGlucoseMeter: "جهاز قياس السكر",
    bluetooth: "البلوتوث",
    internet: "الإنترنت",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
  },
  
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    tracking: "ट्रैकिंग",
    predictions: "भविष्यवाणियां",
    community: "समुदाय",
    petCompanion: "पालतू साथी",
    achievements: "उपलब्धियां",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "AI-संचालित मधुमेह प्रबंधन",
    recentGlucoseReading: "हाल की ग्लूकोज रीडिंग",
    connected: "जुड़ा हुआ",
    disconnected: "डिस्कनेक्ट",
    connectionStatus: "कनेक्शन स्थिति",
    
    // Dashboard
    welcomeBack: "वापसी पर स्वागत",
    healthOverview: "यहाँ आज के लिए आपका स्वास्थ्य अवलोकन है।",
    systemStatus: "सिस्टम स्थिति: इष्टतम",
    systemStatusOptimal: "सभी निगरानी प्रणालियां सक्रिय। ग्लूकोज का स्तर स्थिर।",
    allSystemsActive: "सभी सिस्टम सक्रिय",
    healthProfile: "स्वास्थ्य प्रोफ़ाइल",
    updateProfile: "प्रोफ़ाइल अपडेट करें",
    years: "वर्ष",
    sinceDiagnosis: "निदान के बाद से",
    currentGlucose: "वर्तमान ग्लूकोज",
    timeInRange: "रेंज में समय",
    loggingStreak: "लॉगिंग स्ट्रीक",
    healthScore: "स्वास्थ्य स्कोर",
    days: "दिन",
    
    // Quick Actions
    quickActions: "त्वरित कार्य",
    logMeal: "भोजन लॉग करें",
    scanFood: "भोजन स्कैन करें",
    aiChat: "AI चैट",
    viewTrends: "रुझान देखें",
    
    // Forms
    mealName: "भोजन का नाम",
    carbohydrates: "कार्बोहाइड्रेट",
    calories: "कैलोरी",
    time: "समय",
    save: "सेव करें",
    cancel: "रद्द करें",
    
    // AI
    flowSenseAI: "FlowSense AI",
    intelligentHealthAssistant: "आपका बुद्धिमान स्वास्थ्य सहायक",
    aiPoweredInsights: "AI-संचालित अंतर्दृष्टि",
    
    // Predictions
    aiPredictionsAnalytics: "AI भविष्यवाणी और विश्लेषण",
    advancedGlucoseModeling: "व्यापक पैरामीटर विश्लेषण के साथ उन्नत ग्लूकोज मॉडलिंग",
    predictionAccuracy: "भविष्यवाणी सटीकता",
    modelConfidence: "मॉडल विश्वास",
    dataPoints: "डेटा पॉइंट्स",
    
    // Profile
    profileSettings: "प्रोफ़ाइल सेटिंग्स",
    managePersonalInfo: "अपनी व्यक्तिगत जानकारी प्रबंधित करें",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    email: "ईमेल",
    phone: "फोन",
    dateOfBirth: "जन्म तिथि",
    address: "पता",
    diabetesType: "मधुमेह प्रकार",
    
    // Common
    male: "पुरुष",
    female: "महिला",
    type1: "टाइप 1",
    type2: "टाइप 2",
    gestational: "गर्भकालीन",
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    fair: "ठीक",
    poor: "खराब",
    
    // Units
    mgdl: "mg/dL",
    hours: "घंटे",
    minutes: "मिनट",
    grams: "ग्राम",
    
    // Device Labels
    bloodGlucoseMeter: "रक्त शर्करा मीटर",
    bluetooth: "ब्लूटूथ",
    internet: "इंटरनेट",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
  },
  
  pt: {
    // Navigation
    dashboard: "Painel",
    tracking: "Rastreamento",
    predictions: "Previsões",
    community: "Comunidade",
    petCompanion: "Animal de Estimação",
    achievements: "Conquistas",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "Gestão de Diabetes com IA",
    recentGlucoseReading: "Leitura Recente de Glicose",
    connected: "Conectado",
    disconnected: "Desconectado",
    connectionStatus: "Status da Conexão",
    
    // Dashboard
    welcomeBack: "Bem-vindo de volta",
    healthOverview: "Aqui está sua visão geral de saúde para hoje.",
    systemStatus: "Status do Sistema: Ótimo",
    systemStatusOptimal: "Todos os sistemas de monitoramento ativos. Níveis de glicose estáveis.",
    allSystemsActive: "Todos os sistemas ativos",
    healthProfile: "Perfil de Saúde",
    updateProfile: "Atualizar Perfil",
    years: "anos",
    sinceDiagnosis: "Desde o diagnóstico",
    currentGlucose: "Glicose Atual",
    timeInRange: "Tempo na Faixa",
    loggingStreak: "Sequência de Registro",
    healthScore: "Pontuação de Saúde",
    days: "dias",
    
    // Quick Actions
    quickActions: "Ações Rápidas",
    logMeal: "Registrar Refeição",
    scanFood: "Escanear Comida",
    aiChat: "Chat IA",
    viewTrends: "Ver Tendências",
    
    // Forms
    mealName: "Nome da Refeição",
    carbohydrates: "Carboidratos",
    calories: "Calorias",
    time: "Hora",
    save: "Salvar",
    cancel: "Cancelar",
    
    // AI
    flowSenseAI: "FlowSense IA",
    intelligentHealthAssistant: "Seu assistente inteligente de saúde",
    aiPoweredInsights: "Insights Alimentados por IA",
    
    // Predictions
    aiPredictionsAnalytics: "Previsões e Análises de IA",
    advancedGlucoseModeling: "Modelagem avançada de glicose com análise abrangente de parâmetros",
    predictionAccuracy: "Precisão da Previsão",
    modelConfidence: "Confiança do Modelo",
    dataPoints: "Pontos de Dados",
    
    // Profile
    profileSettings: "Configurações do Perfil",
    managePersonalInfo: "Gerencie suas informações pessoais",
    firstName: "Primeiro Nome",
    lastName: "Sobrenome",
    email: "Email",
    phone: "Telefone",
    dateOfBirth: "Data de Nascimento",
    address: "Endereço",
    diabetesType: "Tipo de Diabetes",
    
    // Common
    male: "Masculino",
    female: "Feminino",
    type1: "Tipo 1",
    type2: "Tipo 2",
    gestational: "Gestacional",
    excellent: "Excelente",
    good: "Bom",
    fair: "Regular",
    poor: "Ruim",
    
    // Units
    mgdl: "mg/dL",
    hours: "horas",
    minutes: "min",
    grams: "g",
    
    // Device Labels
    bloodGlucoseMeter: "Medidor de Glicose",
    bluetooth: "Bluetooth",
    internet: "Internet",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
  },
  
  ru: {
    // Navigation
    dashboard: "Панель",
    tracking: "Отслеживание",
    predictions: "Прогнозы",
    community: "Сообщество",
    petCompanion: "Питомец",
    achievements: "Достижения",
    
    // Header
    appName: "AuroraFlow",
    appSubtitle: "ИИ-управление диабетом",
    recentGlucoseReading: "Последнее измерение глюкозы",
    connected: "Подключено",
    disconnected: "Отключено",
    connectionStatus: "Статус подключения",
    
    // Dashboard
    welcomeBack: "Добро пожаловать обратно",
    healthOverview: "Вот ваш обзор здоровья на сегодня.",
    systemStatus: "Статус системы: Оптимальный",
    systemStatusOptimal: "Все системы мониторинга активны. Уровень глюкозы стабилен.",
    allSystemsActive: "Все системы активны",
    healthProfile: "Профиль здоровья",
    updateProfile: "Обновить профиль",
    years: "лет",
    sinceDiagnosis: "С момента диагноза",
    currentGlucose: "Текущая глюкоза",
    timeInRange: "Время в диапазоне",
    loggingStreak: "Серия записей",
    healthScore: "Оценка здоровья",
    days: "дней",
    
    // Quick Actions
    quickActions: "Быстрые действия",
    logMeal: "Записать прием пищи",
    scanFood: "Сканировать еду",
    aiChat: "ИИ чат",
    viewTrends: "Просмотр трендов",
    
    // Forms
    mealName: "Название блюда",
    carbohydrates: "Углеводы",
    calories: "Калории",
    time: "Время",
    save: "Сохранить",
    cancel: "Отмена",
    
    // AI
    flowSenseAI: "FlowSense ИИ",
    intelligentHealthAssistant: "Ваш умный помощник по здоровью",
    aiPoweredInsights: "Аналитика на основе ИИ",
    
    // Predictions
    aiPredictionsAnalytics: "ИИ прогнозы и аналитика",
    advancedGlucoseModeling: "Продвинутое моделирование глюкозы с комплексным анализом параметров",
    predictionAccuracy: "Точность прогноза",
    modelConfidence: "Доверие модели",
    dataPoints: "Точки данных",
    
    // Profile
    profileSettings: "Настройки профиля",
    managePersonalInfo: "Управление личной информацией",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Электронная почта",
    phone: "Телефон",
    dateOfBirth: "Дата рождения",
    address: "Адрес",
    diabetesType: "Тип диабета",
    
    // Common
    male: "Мужской",
    female: "Женский",
    type1: "Тип 1",
    type2: "Тип 2",
    gestational: "Гестационный",
    excellent: "Отлично",
    good: "Хорошо",
    fair: "Удовлетворительно",
    poor: "Плохо",
    
    // Units
    mgdl: "мг/дл",
    hours: "часов",
    minutes: "мин",
    grams: "г",
    
    // Device Labels
    bloodGlucoseMeter: "Глюкометр",
    bluetooth: "Bluetooth",
    internet: "Интернет",
    
    // New key
    enterDataToSeePredictions: "Enter your data to see predictions.",
  }
};

export const useTranslation = (language: string) => {
  return translations[language] || translations.en;
};