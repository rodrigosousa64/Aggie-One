import { useState, useRef, useEffect, useCallback } from 'react';

export function usePetState() {
  const [petState, setPetState] = useState({ mood: 'feliz', energy: 100 });
  const [chat, setChat] = useState({ text: '', isVisible: false, isLoading: false, isInteractive: false });
  const [effects, setEffects] = useState({ balloons: false, cake: false, matrixRain: false, floatingHearts: false });
  const [action, setAction] = useState('IDLE'); // IDLE, WALK, RUN, SIT, GROOM, SLEEPING
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('DOWN');
  const [isDragging, setIsDragging] = useState(false);
  
  const [stats, setStats] = useState({
    energy: 100,
    hunger: 80, // 100 = cheia, 0 = morrendo de fome
    affection: 70,
    boredom: 30,
    anger: 0,
  });
  
  const [accessory, setAccessory] = useState(null); // null | 'BIRTHDAY_HAT' | 'THUG_GLASSES' | 'DETECTIVE_HAT'
  
  // Refs para evitar closures stale em setInterval/setTimeout (muito usado no EventEngine e WanderAI)
  const chatVisibleRef = useRef(false);
  const petMoodRef = useRef(petState.mood);
  const lastTailChaseRef = useRef(false);
  const statsRef = useRef(stats);
  const isDraggingRef = useRef(isDragging);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    petMoodRef.current = petState.mood;
  }, [petState.mood]);

  useEffect(() => {
    chatVisibleRef.current = chat.isVisible;
  }, [chat.isVisible]);

  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  const equipAccessory = useCallback((id, duration) => {
    setAccessory(id);
    if (duration) setTimeout(() => setAccessory(null), duration);
  }, []);

  const showChat = useCallback((text, keepAction = false, isLoading = false, isInteractive = false) => {
    setChat({ text, isVisible: true, isLoading, isInteractive });
    if (!keepAction) {
      setAction(prev => {
        if (prev === 'SIT_LOAF') return prev;
        return 'WALK';
      });
      setTimeout(() => setAction(prev => prev === 'WALK' ? 'IDLE' : prev), 2000);
    }
  }, []);

  const hideChat = useCallback(() => {
    setChat(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    petState, setPetState,
    chat, setChat,
    effects, setEffects,
    action, setAction,
    position, setPosition,
    direction, setDirection,
    stats, setStats,
    accessory, setAccessory,
    equipAccessory,
    showChat,
    hideChat,
    isDragging, setIsDragging,
    // Refs expostas para uso em hooks de Game Loop e Wander AI
    chatVisibleRef,
    petMoodRef,
    lastTailChaseRef,
    statsRef,
    isDraggingRef
  };
}
