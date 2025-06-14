import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw, Star, Sun, Sparkles, Moon } from 'lucide-react';
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
      "🌟 You are stronger than your challenges and more resilient than you know! 💪",
      "🌱 Every healthy choice you make today is an investment in your future self! 💚",
      "🏆 Your commitment to managing your health shows incredible strength and wisdom! ✨",
      "🌈 You have the power to create positive change in your life, one day at a time! 🌸",
      "💖 Your body is amazing and capable of healing and thriving with your care! 🌺",
      "📊 Each glucose reading is valuable data that helps you understand your body better! 🧠",
      "🦋 You are not defined by your diabetes - you are defined by your courage and determination! 🌟",
      "🎯 Progress, not perfection, is what matters on your health journey! 🚀",
      "🎉 You deserve to feel proud of every step you take toward better health! 👏",
      "💝 Your dedication to tracking and managing your health is truly inspiring! ⭐"
    ],
    es: [
      "🌟 ¡Eres más fuerte que tus desafíos y más resistente de lo que crees! 💪",
      "🌱 ¡Cada elección saludable que haces hoy es una inversión en tu futuro! 💚",
      "🏆 ¡Tu compromiso con el manejo de tu salud muestra una fuerza y sabiduría increíbles! ✨",
      "🌈 ¡Tienes el poder de crear cambios positivos en tu vida, un día a la vez! 🌸",
      "💖 ¡Tu cuerpo es increíble y capaz de sanar y prosperar con tu cuidado! 🌺",
      "📊 ¡Cada lectura de glucosa es información valiosa que te ayuda a entender mejor tu cuerpo! 🧠",
      "🦋 ¡No te define tu diabetes - te define tu coraje y determinación! 🌟",
      "🎯 ¡El progreso, no la perfección, es lo que importa en tu viaje de salud! 🚀",
      "🎉 ¡Mereces sentirte orgulloso de cada paso que das hacia una mejor salud! 👏",
      "💝 ¡Tu dedicación para rastrear y manejar tu salud es verdaderamente inspiradora! ⭐"
    ],
    fr: [
      "🌟 Vous êtes plus fort que vos défis et plus résilient que vous ne le pensez! 💪",
      "🌱 Chaque choix sain que vous faites aujourd'hui est un investissement dans votre futur! 💚",
      "🏆 Votre engagement à gérer votre santé montre une force et une sagesse incroyables! ✨",
      "🌈 Vous avez le pouvoir de créer des changements positifs dans votre vie, un jour à la fois! 🌸",
      "💖 Votre corps est incroyable et capable de guérir et de prospérer avec vos soins! 🌺",
      "📊 Chaque lecture de glucose est une donnée précieuse qui vous aide à mieux comprendre votre corps! 🧠",
      "🦋 Vous n'êtes pas défini par votre diabète - vous êtes défini par votre courage et votre détermination! 🌟",
      "🎯 Le progrès, pas la perfection, est ce qui compte dans votre parcours de santé! 🚀",
      "🎉 Vous méritez d'être fier de chaque pas que vous faites vers une meilleure santé! 👏",
      "💝 Votre dévouement au suivi et à la gestion de votre santé est vraiment inspirant! ⭐"
    ],
    de: [
      "🌟 Sie sind stärker als Ihre Herausforderungen und widerstandsfähiger als Sie denken! 💪",
      "🌱 Jede gesunde Entscheidung, die Sie heute treffen, ist eine Investition in Ihr zukünftiges Selbst! 💚",
      "🏆 Ihr Engagement für das Management Ihrer Gesundheit zeigt unglaubliche Stärke und Weisheit! ✨",
      "🌈 Sie haben die Macht, positive Veränderungen in Ihrem Leben zu schaffen, einen Tag nach dem anderen! 🌸",
      "💖 Ihr Körper ist erstaunlich und fähig zu heilen und zu gedeihen mit Ihrer Pflege! 🌺",
      "📊 Jeder Glukosewert ist wertvolle Information, die Ihnen hilft, Ihren Körper besser zu verstehen! 🧠",
      "🦋 Sie werden nicht durch Ihren Diabetes definiert - Sie werden durch Ihren Mut und Ihre Entschlossenheit definiert! 🌟",
      "🎯 Fortschritt, nicht Perfektion, ist was auf Ihrer Gesundheitsreise zählt! 🚀",
      "🎉 Sie verdienen es, stolz auf jeden Schritt zu sein, den Sie zu besserer Gesundheit machen! 👏",
      "💝 Ihre Hingabe zur Verfolgung und Verwaltung Ihrer Gesundheit ist wirklich inspirierend! ⭐"
    ],
    zh: [
      "🌟 你比你的挑战更强大，比你知道的更有韧性！💪",
      "🌱 你今天做出的每一个健康选择都是对未来自己的投资！💚",
      "🏆 你对健康管理的承诺显示了令人难以置信的力量和智慧！✨",
      "🌈 你有能力在生活中创造积极的改变，一天一天地进步！🌸",
      "💖 你的身体很神奇，在你的照顾下能够愈合和茁壮成长！🌺",
      "📊 每一次血糖读数都是宝贵的数据，帮助你更好地了解自己的身体！🧠",
      "🦋 糖尿病不能定义你 - 你的勇气和决心才能定义你！🌟",
      "🎯 在你的健康之旅中，进步比完美更重要！🚀",
      "🎉 你值得为迈向更好健康的每一步感到自豪！👏",
      "💝 你对跟踪和管理健康的奉献精神真正令人鼓舞！⭐"
    ],
    ja: [
      "🌟 あなたは困難よりも強く、自分が思っているよりも回復力があります！💪",
      "🌱 今日行う健康的な選択はすべて、将来の自分への投資です！💚",
      "🏆 健康管理への取り組みは、信じられないほどの強さと知恵を示しています！✨",
      "🌈 一日一日、人生に前向きな変化を起こす力があります！🌸",
      "💖 あなたの体は素晴らしく、あなたのケアで癒し、繁栄することができます！🌺",
      "📊 各血糖値の測定は、体をより良く理解するのに役立つ貴重なデータです！🧠",
      "🦋 糖尿病があなたを定義するのではありません - あなたの勇気と決意があなたを定義します！🌟",
      "🎯 健康の旅では、完璧さではなく進歩が重要です！🚀",
      "🎉 より良い健康に向けて踏み出すすべてのステップを誇りに思う価値があります！👏",
      "💝 健康の追跡と管理への献身は本当に感動的です！⭐"
    ],
    ko: [
      "🌟 당신은 도전보다 강하고 생각보다 회복력이 있습니다！💪",
      "🌱 오늘 하는 모든 건강한 선택은 미래의 자신에 대한 투자입니다！💚",
      "🏆 건강 관리에 대한 당신의 헌신은 놀라운 힘과 지혜를 보여줍니다！✨",
      "🌈 하루하루 삶에 긍정적인 변화를 만들어낼 힘이 있습니다！🌸",
      "💖 당신의 몸은 놀랍고 당신의 돌봄으로 치유되고 번영할 수 있습니다！🌺",
      "📊 각 혈당 수치는 몸을 더 잘 이해하는 데 도움이 되는 귀중한 데이터입니다！🧠",
      "🦋 당신을 정의하는 것은 당뇨병이 아니라 용기와 결단력입니다！🌟",
      "🎯 건강 여정에서 중요한 것은 완벽함이 아니라 진전입니다！🚀",
      "🎉 더 나은 건강을 향해 내딛는 모든 걸음을 자랑스러워할 자격이 있습니다！👏",
      "💝 건강을 추적하고 관리하는 당신의 헌신은 정말 감동적입니다！⭐"
    ],
    ar: [
      "🌟 أنت أقوى من تحدياتك وأكثر مرونة مما تعرف！💪",
      "🌱 كل خيار صحي تتخذه اليوم هو استثمار في ذاتك المستقبلية！💚",
      "🏆 التزامك بإدارة صحتك يُظهر قوة وحكمة لا تصدق！✨",
      "🌈 لديك القوة لخلق تغيير إيجابي في حياتك، يوماً بعد يوم！🌸",
      "💖 جسدك مذهل وقادر على الشفاء والازدهار برعايتك！🌺",
      "📊 كل قراءة للجلوكوز هي بيانات قيمة تساعدك على فهم جسدك بشكل أفضل！🧠",
      "🦋 لا يُعرّفك السكري - يُعرّفك شجاعتك وعزيمتك！🌟",
      "🎯 التقدم، وليس الكمال، هو ما يهم في رحلة صحتك！🚀",
      "🎉 تستحق أن تشعر بالفخر لكل خطوة تخطوها نحو صحة أفضل！👏",
      "💝 تفانيك في تتبع وإدارة صحتك ملهم حقاً！⭐"
    ],
    hi: [
      "🌟 आप अपनी चुनौतियों से अधिक मजबूत हैं और जितना आप जानते हैं उससे अधिक लचीले हैं！💪",
      "🌱 आज आप जो भी स्वस्थ विकल्प बनाते हैं वह आपके भविष्य के स्वयं में निवेश है！💚",
      "🏆 आपके स्वास्थ्य प्रबंधन की प्रतिबद्धता अविश्वसनीय शक्ति और बुद्धि दिखाती है！✨",
      "🌈 आपके पास अपने जीवन में सकारात्मक बदलाव लाने की शक्ति है, एक दिन में एक बार！🌸",
      "💖 आपका शरीर अद्भुत है और आपकी देखभाल से ठीक होने और फलने-फूलने में सक्षम है！🌺",
      "📊 प्रत्येक ग्लूकोज रीडिंग मूल्यवान डेटा है जो आपको अपने शरीर को बेहतर समझने में मदद करता है！🧠",
      "🦋 आपको मधुमेह परिभाषित नहीं करता - आपकी साहस और दृढ़ता आपको परिभाषित करती है！🌟",
      "🎯 आपकी स्वास्थ्य यात्रा में प्रगति मायने रखती है, पूर्णता नहीं！🚀",
      "🎉 आप बेहतर स्वास्थ्य की दिशा में उठाए गए हर कदम पर गर्व महसूस करने के हकदार हैं！👏",
      "💝 आपके स्वास्थ्य को ट्रैक करने और प्रबंधित करने की समर्पणा वास्तव में प्रेरणादायक है！⭐"
    ],
    pt: [
      "🌟 Você é mais forte que seus desafios e mais resiliente do que imagina！💪",
      "🌱 Cada escolha saudável que você faz hoje é um investimento em seu futuro！💚",
      "🏆 Seu compromisso com o gerenciamento de sua saúde mostra força e sabedoria incríveis！✨",
      "🌈 Você tem o poder de criar mudanças positivas em sua vida, um dia de cada vez！🌸",
      "💖 Seu corpo é incrível e capaz de curar e prosperar com seus cuidados！🌺",
      "📊 Cada leitura de glicose é um dado valioso que ajuda você a entender melhor seu corpo！🧠",
      "🦋 Você não é definido pelo seu diabetes - você é definido por sua coragem e determinação！🌟",
      "🎯 Progresso, não perfeição, é o que importa em sua jornada de saúde！🚀",
      "🎉 Você merece se orgulhar de cada passo que dá em direção a uma saúde melhor！👏",
      "💝 Sua dedicação ao rastreamento e gerenciamento de sua saúde é verdadeiramente inspiradora！⭐"
    ],
    ru: [
      "🌟 Вы сильнее своих вызовов и более устойчивы, чем думаете！💪",
      "🌱 Каждый здоровый выбор, который вы делаете сегодня, - это инвестиция в ваше будущее！💚",
      "🏆 Ваша приверженность управлению здоровьем показывает невероятную силу и мудрость！✨",
      "🌈 У вас есть сила создавать позитивные изменения в своей жизни, день за днем！🌸",
      "💖 Ваше тело удивительно и способно исцеляться и процветать под вашей заботой！🌺",
      "📊 Каждое измерение глюкозы - это ценные данные, которые помогают вам лучше понять свое тело！🧠",
      "🦋 Вас не определяет диабет - вас определяют ваша смелость и решимость！🌟",
      "🎯 В вашем путешествии к здоровью важен прогресс, а не совершенство！🚀",
      "🎉 Вы заслуживаете гордиться каждым шагом к лучшему здоровью！👏",
      "💝 Ваша преданность отслеживанию и управлению здоровьем действительно вдохновляет！⭐"
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
    if (hour < 6) return Moon;
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
              <h3 className="font-bold text-white">✨ Daily Inspiration ✨</h3>
              <p className="text-sm text-purple-100">Your moment of positivity 🌈</p>
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
              Affirmation {currentAffirmation + 1} of {currentAffirmations.length} 💫
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAffirmation;