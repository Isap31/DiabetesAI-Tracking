import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw, Star, Sun, Sparkles } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface DailyAffirmationProps {
  language: string;
}

const DailyAffirmation: React.FC<DailyAffirmationProps> = ({ language }) => {
  const t = useTranslation(language);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const affirmations = {
    en: [
      "You are stronger than your challenges and more resilient than you know.",
      "Every healthy choice you make today is an investment in your future self.",
      "Your commitment to managing your health shows incredible strength and wisdom.",
      "You have the power to create positive change in your life, one day at a time.",
      "Your body is amazing and capable of healing and thriving with your care.",
      "Each glucose reading is valuable data that helps you understand your body better.",
      "You are not defined by your diabetes - you are defined by your courage and determination.",
      "Progress, not perfection, is what matters on your health journey.",
      "You deserve to feel proud of every step you take toward better health.",
      "Your dedication to tracking and managing your health is truly inspiring."
    ],
    es: [
      "Eres más fuerte que tus desafíos y más resistente de lo que crees.",
      "Cada elección saludable que haces hoy es una inversión en tu futuro.",
      "Tu compromiso con el manejo de tu salud muestra una fuerza y sabiduría increíbles.",
      "Tienes el poder de crear cambios positivos en tu vida, un día a la vez.",
      "Tu cuerpo es increíble y capaz de sanar y prosperar con tu cuidado.",
      "Cada lectura de glucosa es información valiosa que te ayuda a entender mejor tu cuerpo.",
      "No te define tu diabetes - te define tu coraje y determinación.",
      "El progreso, no la perfección, es lo que importa en tu viaje de salud.",
      "Mereces sentirte orgulloso de cada paso que das hacia una mejor salud.",
      "Tu dedicación para rastrear y manejar tu salud es verdaderamente inspiradora."
    ],
    fr: [
      "Vous êtes plus fort que vos défis et plus résilient que vous ne le pensez.",
      "Chaque choix sain que vous faites aujourd'hui est un investissement dans votre futur.",
      "Votre engagement à gérer votre santé montre une force et une sagesse incroyables.",
      "Vous avez le pouvoir de créer des changements positifs dans votre vie, un jour à la fois.",
      "Votre corps est incroyable et capable de guérir et de prospérer avec vos soins.",
      "Chaque lecture de glucose est une donnée précieuse qui vous aide à mieux comprendre votre corps.",
      "Vous n'êtes pas défini par votre diabète - vous êtes défini par votre courage et votre détermination.",
      "Le progrès, pas la perfection, est ce qui compte dans votre parcours de santé.",
      "Vous méritez d'être fier de chaque pas que vous faites vers une meilleure santé.",
      "Votre dévouement au suivi et à la gestion de votre santé est vraiment inspirant."
    ],
    de: [
      "Sie sind stärker als Ihre Herausforderungen und widerstandsfähiger als Sie denken.",
      "Jede gesunde Entscheidung, die Sie heute treffen, ist eine Investition in Ihr zukünftiges Selbst.",
      "Ihr Engagement für das Management Ihrer Gesundheit zeigt unglaubliche Stärke und Weisheit.",
      "Sie haben die Macht, positive Veränderungen in Ihrem Leben zu schaffen, einen Tag nach dem anderen.",
      "Ihr Körper ist erstaunlich und fähig zu heilen und zu gedeihen mit Ihrer Pflege.",
      "Jeder Glukosewert ist wertvolle Information, die Ihnen hilft, Ihren Körper besser zu verstehen.",
      "Sie werden nicht durch Ihren Diabetes definiert - Sie werden durch Ihren Mut und Ihre Entschlossenheit definiert.",
      "Fortschritt, nicht Perfektion, ist was auf Ihrer Gesundheitsreise zählt.",
      "Sie verdienen es, stolz auf jeden Schritt zu sein, den Sie zu besserer Gesundheit machen.",
      "Ihre Hingabe zur Verfolgung und Verwaltung Ihrer Gesundheit ist wirklich inspirierend."
    ]
  };

  const currentAffirmations = affirmations[language as keyof typeof affirmations] || affirmations.en;

  // Get daily affirmation based on date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentAffirmation(dayOfYear % currentAffirmations.length);
  }, [language, currentAffirmations.length]);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAffirmation((prev) => (prev + 1) % currentAffirmations.length);
      setIsAnimating(false);
    }, 300);
  };

  const getTimeBasedIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) return Sun;
    if (hour < 18) return Star;
    return Sparkles;
  };

  const TimeIcon = getTimeBasedIcon();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <TimeIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Daily Inspiration</h3>
              <p className="text-sm text-purple-100">Your moment of positivity</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-all duration-200"
            title="Get new affirmation"
          >
            <RefreshCw className={`h-4 w-4 text-white transition-transform duration-300 ${isAnimating ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
          <p className="text-lg font-medium text-white leading-relaxed mb-4">
            "{currentAffirmations[currentAffirmation]}"
          </p>
          
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-pink-200" />
            <span className="text-sm text-purple-100">
              Affirmation {currentAffirmation + 1} of {currentAffirmations.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAffirmation;