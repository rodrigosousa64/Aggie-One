import { useRef } from 'react';
import { getPetTalk } from '../services/petService';

export function useInteractions(petContext, triggerSequence) {
  const {
    setStats,
    setPetState,
    setEffects,
    showChat,
    setDirection,
    petMoodRef,
    statsRef
  } = petContext;

  const clickTimestampsRef = useRef([]);

  const handleCatnip = () => {
    setStats(prev => ({ ...prev, boredom: 0, energy: 100 }));
    triggerSequence('ZOOMIES');
    setEffects(prev => ({ ...prev, floatingHearts: true }));
    setTimeout(() => setEffects(prev => ({ ...prev, floatingHearts: false })), 2000);
    showChat("MAAAAIAU!!! (Catnip!)", true);
  };

  const handleFeed = () => {
    triggerSequence('EAT_TREAT');
    setStats(prev => {
      const newAnger = Math.max(0, prev.anger - 50); // Comida acalma MUITO a gata
      
      // Se a raiva cair abaixo de 80 e ela estava brava, volta a ficar feliz
      if (newAnger < 80 && petMoodRef.current === 'brava') {
        setPetState(p => ({ ...p, mood: 'feliz' }));
      }

      return {
        ...prev,
        hunger: Math.min(100, prev.hunger + 20),
        affection: Math.min(100, prev.affection + 5),
        anger: newAnger
      };
    });
    setEffects(prev => ({ ...prev, floatingHearts: true }));
    setTimeout(() => setEffects(prev => ({ ...prev, floatingHearts: false })), 2000);

    getPetTalk("ACTION_EAT")
      .then(data => showChat(data.reply, true))
      .catch(err => console.log(err));
  };

  const handlePetInteraction = () => {
    const now = Date.now();
    const timestamps = clickTimestampsRef.current;
    timestamps.push(now);
    
    const recentClicks = timestamps.filter(t => now - t < 2000);
    clickTimestampsRef.current = recentClicks;

    if (recentClicks.length >= 5) {
      // SPAM! Irrita a gata
      setStats(prev => {
        const newAnger = Math.min(100, prev.anger + 30);
        if (newAnger >= 80 && petMoodRef.current !== 'brava') {
          setPetState(p => ({ ...p, mood: 'brava' }));
          setDirection('UP');
          showChat("ME DEIXA EM PAZ!", true);
        }
        return { ...prev, anger: newAnger };
      });
      return; 
    }

    if ((petMoodRef.current === 'brava' || statsRef.current.anger >= 80) && Math.random() > 0.4) {
      setDirection('UP');
      showChat("Tira a mão. Tô irritada.", true);
      return;
    }

    // Reduz tédio ao receber carinho
    setStats(prev => ({ ...prev, boredom: Math.max(0, prev.boredom - 15) }));

    if (petMoodRef.current === 'dormindo') {
      triggerSequence('WAKE_UP');
      getPetTalk("ACTION_WAKE")
        .then(data => showChat(data.reply, true, false, true))
        .catch(err => console.log(err));
    } else {
      getPetTalk("ACTION_PET")
        .then(data => showChat(data.reply, true, false, true))
        .catch(err => console.log(err));
    }
    setStats(prev => ({ ...prev, affection: Math.min(100, prev.affection + 5), anger: Math.max(0, prev.anger - 5) }));
    setEffects(prev => ({ ...prev, floatingHearts: true }));
    setTimeout(() => setEffects(prev => ({ ...prev, floatingHearts: false })), 2000);
  };

  return { handleCatnip, handleFeed, handlePetInteraction };
}
