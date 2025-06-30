import React, { useState } from 'react';
import {
  User,
  Heart,
  Activity,
  Calendar,
  Users,
  Stethoscope,
  Target,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Info,
  Utensils,
  Moon,
  Cigarette,
  Wine,
  Brain,
  Smartphone,
  Award,
  X,
  Save,
  ArrowLeft
} from 'lucide-react';

interface OnboardingSurveyPageProps {
  onComplete: (surveyData: SurveyData) => void;
  onSkip: () => void;
}

interface SurveyData {
  // Demographics
  age: string;
  gender: string;
  ethnicity: string;
  
  // Medical History
  diabetesType: string;
  diagnosisDate: string;
  currentMedications: string[];
  complications: string[];
  familyHistory: {
    parents: { diabetes: boolean; type?: string };
    siblings: { diabetes: boolean; type?: string };
    grandparents: { diabetes: boolean; type?: string };
  };
  comorbidities: string[];
  
  // Lifestyle
  dietaryHabits: string;
  physicalActivity: string;
  smokingStatus: string;
  alcoholConsumption: string;
  stressLevel: string;
  sleepQuality: string;
  sleepDuration: string;
  
  // Current Tools
  currentDevices: string[];
  currentApps: string[];
  techComfort: string;
  
  // Goals & Challenges
  primaryGoals: string[];
  biggestChallenges: string[];
  motivationFactors: string[];
}

const OnboardingSurveyPage: React.FC<OnboardingSurveyPageProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    age: '',
    gender: '',
    ethnicity: '',
    diabetesType: '',
    diagnosisDate: '',
    currentMedications: [],
    complications: [],
    familyHistory: {
      parents: { diabetes: false },
      siblings: { diabetes: false },
      grandparents: { diabetes: false }
    },
    comorbidities: [],
    dietaryHabits: '',
    physicalActivity: '',
    smokingStatus: '',
    alcoholConsumption: '',
    stressLevel: '',
    sleepQuality: '',
    sleepDuration: '',
    currentDevices: [],
    currentApps: [],
    techComfort: '',
    primaryGoals: [],
    biggestChallenges: [],
    motivationFactors: []
  });

  const totalSteps = 7;

  const updateSurveyData = (field: string, value: any) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: string, value: string, checked: boolean) => {
    setSurveyData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof SurveyData] as string[]), value]
        : (prev[field as keyof SurveyData] as string[]).filter(item => item !== value)
    }));
  };

  const updateFamilyHistory = (member: string, field: string, value: any) => {
    setSurveyData(prev => ({
      ...prev,
      familyHistory: {
        ...prev.familyHistory,
        [member]: {
          ...prev.familyHistory[member as keyof typeof prev.familyHistory],
          [field]: value
        }
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    onComplete(surveyData);
  };

  const steps = [
    {
      title: "Personal Information",
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Why we ask this</h4>
                <p className="text-sm text-blue-800">Demographics help us understand risk factors and provide personalized recommendations. Some ethnic groups have higher diabetes prevalence rates.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={surveyData.age}
                onChange={(e) => updateSurveyData('age', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your age"
                min="1"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={surveyData.gender}
                onChange={(e) => updateSurveyData('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ethnicity</label>
            <select
              value={surveyData.ethnicity}
              onChange={(e) => updateSurveyData('ethnicity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select ethnicity</option>
              <option value="white">White/Caucasian</option>
              <option value="black">Black/African American</option>
              <option value="hispanic">Hispanic/Latino</option>
              <option value="asian">Asian</option>
              <option value="native-american">Native American</option>
              <option value="pacific-islander">Pacific Islander</option>
              <option value="mixed">Mixed/Multiple ethnicities</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: "Diabetes History",
      icon: Stethoscope,
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-start space-x-3">
              <Heart className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900">Medical Information</h4>
                <p className="text-sm text-red-800">This information helps us provide accurate predictions and personalized care recommendations.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diabetes Type</label>
              <select
                value={surveyData.diabetesType}
                onChange={(e) => updateSurveyData('diabetesType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="type-1">Type 1</option>
                <option value="type-2">Type 2</option>
                <option value="gestational">Gestational</option>
                <option value="prediabetes">Prediabetes</option>
                <option value="mody">MODY</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Diagnosis</label>
              <input
                type="date"
                value={surveyData.diagnosisDate}
                onChange={(e) => updateSurveyData('diagnosisDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Current Medications (select all that apply)</label>
            <div className="grid grid-cols-2 gap-3">
              {['Insulin (rapid-acting)', 'Insulin (long-acting)', 'Metformin', 'Sulfonylureas', 'SGLT2 inhibitors', 'GLP-1 agonists', 'DPP-4 inhibitors', 'Other'].map((med) => (
                <label key={med} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.currentMedications.includes(med)}
                    onChange={(e) => updateArrayField('currentMedications', med, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{med}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Existing Complications (select all that apply)</label>
            <div className="grid grid-cols-2 gap-3">
              {['Neuropathy', 'Retinopathy', 'Kidney disease', 'Heart disease', 'Foot problems', 'None', 'Other'].map((comp) => (
                <label key={comp} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.complications.includes(comp)}
                    onChange={(e) => updateArrayField('complications', comp, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{comp}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Family Medical History",
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Genetic Risk Assessment</h4>
                <p className="text-sm text-purple-800">Family history is crucial for understanding your genetic predisposition to diabetes and related complications.</p>
              </div>
            </div>
          </div>
          
          {['parents', 'siblings', 'grandparents'].map((member) => (
            <div key={member} className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3 capitalize">{member}</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.familyHistory[member as keyof typeof surveyData.familyHistory].diabetes}
                    onChange={(e) => updateFamilyHistory(member, 'diabetes', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Has/had diabetes</span>
                </label>
                
                {surveyData.familyHistory[member as keyof typeof surveyData.familyHistory].diabetes && (
                  <div className="ml-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type of diabetes</label>
                    <select
                      value={surveyData.familyHistory[member as keyof typeof surveyData.familyHistory].type || ''}
                      onChange={(e) => updateFamilyHistory(member, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="type-1">Type 1</option>
                      <option value="type-2">Type 2</option>
                      <option value="gestational">Gestational</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Other Family Health Conditions (select all that apply)</label>
            <div className="grid grid-cols-2 gap-3">
              {['Hypertension', 'High cholesterol', 'Heart disease', 'PCOS', 'Obesity', 'Stroke', 'Kidney disease', 'None'].map((condition) => (
                <label key={condition} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.comorbidities.includes(condition)}
                    onChange={(e) => updateArrayField('comorbidities', condition, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{condition}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Lifestyle Factors",
      icon: Activity,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <Activity className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Lifestyle Assessment</h4>
                <p className="text-sm text-green-800">Your daily habits significantly impact diabetes management and our AI predictions.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Utensils className="inline h-4 w-4 mr-1" />
                Dietary Habits
              </label>
              <select
                value={surveyData.dietaryHabits}
                onChange={(e) => updateSurveyData('dietaryHabits', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select diet type</option>
                <option value="omnivore">Omnivore</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Ketogenic</option>
                <option value="low-carb">Low-carb</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="diabetic-diet">Diabetic diet</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Activity className="inline h-4 w-4 mr-1" />
                Physical Activity Level
              </label>
              <select
                value={surveyData.physicalActivity}
                onChange={(e) => updateSurveyData('physicalActivity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select activity level</option>
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="lightly-active">Lightly active (1-3 days/week)</option>
                <option value="moderately-active">Moderately active (3-5 days/week)</option>
                <option value="very-active">Very active (6-7 days/week)</option>
                <option value="extremely-active">Extremely active (2x/day or intense)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Cigarette className="inline h-4 w-4 mr-1" />
                Smoking Status
              </label>
              <select
                value={surveyData.smokingStatus}
                onChange={(e) => updateSurveyData('smokingStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select status</option>
                <option value="never">Never smoked</option>
                <option value="former">Former smoker</option>
                <option value="current">Current smoker</option>
                <option value="occasional">Occasional smoker</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Wine className="inline h-4 w-4 mr-1" />
                Alcohol Consumption
              </label>
              <select
                value={surveyData.alcoholConsumption}
                onChange={(e) => updateSurveyData('alcoholConsumption', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select frequency</option>
                <option value="never">Never</option>
                <option value="rarely">Rarely (few times/year)</option>
                <option value="occasionally">Occasionally (1-2 times/month)</option>
                <option value="moderately">Moderately (1-2 times/week)</option>
                <option value="frequently">Frequently (3+ times/week)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Brain className="inline h-4 w-4 mr-1" />
                Stress Level
              </label>
              <select
                value={surveyData.stressLevel}
                onChange={(e) => updateSurveyData('stressLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select level</option>
                <option value="very-low">Very low</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
                <option value="very-high">Very high</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Moon className="inline h-4 w-4 mr-1" />
                Sleep Quality
              </label>
              <select
                value={surveyData.sleepQuality}
                onChange={(e) => updateSurveyData('sleepQuality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select quality</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="very-poor">Very poor</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Duration</label>
              <select
                value={surveyData.sleepDuration}
                onChange={(e) => updateSurveyData('sleepDuration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select hours</option>
                <option value="less-than-5">Less than 5 hours</option>
                <option value="5-6">5-6 hours</option>
                <option value="6-7">6-7 hours</option>
                <option value="7-8">7-8 hours</option>
                <option value="8-9">8-9 hours</option>
                <option value="more-than-9">More than 9 hours</option>
              </select>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Current Technology",
      icon: Smartphone,
      content: (
        <div className="space-y-6">
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
            <div className="flex items-start space-x-3">
              <Smartphone className="h-5 w-5 text-cyan-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-cyan-900">Technology Integration</h4>
                <p className="text-sm text-cyan-800">Understanding your current tools helps us provide better integration and recommendations.</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Current Diabetes Devices (select all that apply)</label>
            <div className="grid grid-cols-2 gap-3">
              {['Continuous Glucose Monitor (CGM)', 'Traditional glucose meter', 'Insulin pump', 'Insulin pen', 'Smart insulin pen', 'Fitness tracker', 'Smartwatch', 'None'].map((device) => (
                <label key={device} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.currentDevices.includes(device)}
                    onChange={(e) => updateArrayField('currentDevices', device, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{device}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Current Health Apps (select all that apply)</label>
            <div className="grid grid-cols-2 gap-3">
              {['MyFitnessPal', 'Glucose Buddy', 'Diabetes:M', 'Carb Manager', 'Dexcom app', 'Freestyle LibreLink', 'Apple Health', 'Google Fit', 'Other', 'None'].map((app) => (
                <label key={app} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.currentApps.includes(app)}
                    onChange={(e) => updateArrayField('currentApps', app, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{app}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technology Comfort Level</label>
            <select
              value={surveyData.techComfort}
              onChange={(e) => updateSurveyData('techComfort', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select comfort level</option>
              <option value="beginner">Beginner (prefer simple interfaces)</option>
              <option value="intermediate">Intermediate (comfortable with most apps)</option>
              <option value="advanced">Advanced (enjoy trying new tech)</option>
              <option value="expert">Expert (early adopter, tech-savvy)</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: "Health Goals",
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900">Personalized Goals</h4>
                <p className="text-sm text-amber-800">Your goals help us customize features and provide relevant recommendations and motivation.</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Primary Health Goals (select all that apply)</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                'Lower A1C levels',
                'Achieve better time in range',
                'Lose weight',
                'Gain weight',
                'Prevent complications',
                'Improve energy levels',
                'Better sleep quality',
                'Reduce medication dependence',
                'Increase physical fitness',
                'Improve mental health',
                'Better meal planning',
                'Consistent glucose monitoring'
              ].map((goal) => (
                <label key={goal} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.primaryGoals.includes(goal)}
                    onChange={(e) => updateArrayField('primaryGoals', goal, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Challenges & Motivation",
      icon: Award,
      content: (
        <div className="space-y-6">
          <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
            <div className="flex items-start space-x-3">
              <Award className="h-5 w-5 text-rose-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-rose-900">Understanding Your Journey</h4>
                <p className="text-sm text-rose-800">Knowing your challenges helps us provide targeted support and motivation strategies.</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Biggest Challenges (select all that apply)</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                'Remembering to check glucose',
                'Carb counting accuracy',
                'Managing glucose spikes',
                'Nighttime glucose control',
                'Exercise and glucose management',
                'Meal planning and prep',
                'Medication adherence',
                'Stress management',
                'Sleep quality',
                'Social situations and food',
                'Travel and routine disruption',
                'Healthcare costs',
                'Family support',
                'Work-life balance'
              ].map((challenge) => (
                <label key={challenge} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.biggestChallenges.includes(challenge)}
                    onChange={(e) => updateArrayField('biggestChallenges', challenge, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{challenge}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">What Motivates You? (select all that apply)</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                'Seeing progress in numbers',
                'Gamification and achievements',
                'Community support',
                'Family and loved ones',
                'Preventing complications',
                'Feeling more energetic',
                'Professional goals',
                'Personal independence',
                'Setting a good example',
                'Competitive challenges',
                'Educational content',
                'Positive reinforcement'
              ].map((motivation) => (
                <label key={motivation} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={surveyData.motivationFactors.includes(motivation)}
                    onChange={(e) => updateArrayField('motivationFactors', motivation, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{motivation}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <currentStepData.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome to AuroraFlow</h2>
                <p className="text-blue-100">Let's personalize your diabetes management experience</p>
              </div>
            </div>
            <button
              onClick={onSkip}
              className="text-white/80 hover:text-white transition-colors flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{currentStepData.title}</h3>
          </div>
          
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {currentStep === totalSteps - 1 ? (
              <button
                onClick={handleComplete}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Check className="h-4 w-4" />
                <span>Complete Setup</span>
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900">Medical Disclaimer</h4>
            <p className="text-sm text-blue-800">
              The information collected in this survey is used to personalize your experience and improve our AI predictions. 
              It is not intended for diagnostic purposes. Always consult with your healthcare provider before making any changes 
              to your diabetes management routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSurveyPage;