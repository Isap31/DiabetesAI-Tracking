import React, { useState, useEffect } from 'react';
import {
  Heart,
  Moon,
  Star,
  Flower,
  Waves,
  Cloud,
  Sun,
  Sparkles,
  Leaf,
  Mountain,
  TreePine,
  Feather,
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  Mic,
  Book,
  Coffee,
  Smile,
  Hug,
  Rainbow,
  Butterfly
} from 'lucide-react';

interface CompassionModeProps {
  isActive: boolean;
  onToggle: () => void;
  userMood: 'struggling' | 'overwhelmed' | 'disappointed' | 'anxious' | 'tired';
  recentChallenge?: string;
}

const CompassionMode: React.FC<CompassionModeProps> = ({
  isActive,
  onToggle,
  userMood,
  recentChallenge
}) => {
  // ... full component code as in backup ...
};

export default CompassionMode; 