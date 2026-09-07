import { useEffect, useRef } from 'react';
import { getPetTalk } from '../services/petService';

export function useGameLoop(stateMethods, triggerSequence, aiLocked) {
  const {
    stats, setStats,
    petState, setPetState,
    action, setAction,
    chatVisibleRef,
    petMoodRef,
    showChat
  } = stateMethods;

  // Game Loop (Passivo de Stats)
  useEffect(() => {
    if (aiLocked) return;
    
    const gameLoopInterval = setInterval(() => {
      setStats(prev => {
        let newHunger = prev.hunger - 1; 
        
        // Tédio aumenta muito mais rápido agora (Volátil: +5)
        let newBoredom = prev.boredom + 5;
        
        // Energia drena mais rápido de tarde (Lore da Agatha)
        const hour = new Date().getHours();
        const isAfternoon = hour >= 12 && hour <= 17;
        const drainRate = isAfternoon ? 2 : 1;
        let newEnergy = prev.energy - drainRate;
        
        let newAffection = prev.affection - 0.3;
        
        // Tédio alto faz ela ficar com fome mais rápido
        if (newBoredom > 70) newHunger -= 0.5;

        let newAnger = Math.max(0, prev.anger - 2); // Raiva esfria com o tempo

        // Se a raiva caiu naturalmente abaixo de 80 e ela estava brava, ela se acalma
        if (newAnger < 80 && petMoodRef.current === 'brava') {
          setTimeout(() => setPetState(p => ({ ...p, mood: 'feliz' })), 0);
        }

        return {
          hunger: Math.min(100, Math.max(0, newHunger)),
          boredom: Math.min(100, Math.max(0, newBoredom)),
          energy: Math.min(100, Math.max(0, newEnergy)),
          affection: Math.min(100, Math.max(0, newAffection)),
          anger: newAnger
        };
      });
    }, 5000); // Tick a cada 5 segundos para ser rápido!
    return () => clearInterval(gameLoopInterval);
  }, [setStats]);

  const isFallingAsleepRef = useRef(false);
  const isComplainingRef = useRef(false);
  const isBoredRef = useRef(false);

  // Monitoramento de Punições
  useEffect(() => {
    if (aiLocked) return;
    
    if (stats.hunger < 10 && !chatVisibleRef.current && !isComplainingRef.current) {
      if (Math.random() > 0.5) {
         isComplainingRef.current = true;
         getPetTalk("HUNGRY")
           .then(data => {
             showChat(data.reply, true);
             setTimeout(() => { isComplainingRef.current = false; }, 10000); // 10s cooldown
           })
           .catch(err => {
             console.log(err);
             isComplainingRef.current = false;
           });
      }
    }

    // Tédio Crítico (Ataca a tela se ignorada por muito tempo)
    if (stats.boredom > 90 && !chatVisibleRef.current && !isBoredRef.current && petState.mood !== 'dormindo') {
      if (Math.random() > 0.4) {
        isBoredRef.current = true;
        triggerSequence('LUNGE'); // Bote na tela de frustração
        getPetTalk("BORED")
          .then(data => {
            showChat(data.reply, true);
            setTimeout(() => { isBoredRef.current = false; }, 15000); // 15s cooldown
          })
          .catch(() => {
            isBoredRef.current = false;
          });
      }
    }

    if (stats.energy < 15 && !(petState.mood === 'dormindo' && action === 'SIT_LOAF') && !isFallingAsleepRef.current) {
      isFallingAsleepRef.current = true;
      
      // Ela avisa que vai dormir
      getPetTalk("ACTION_SLEEP")
        .then(data => showChat(data.reply, true))
        .catch(err => console.log(err));

      // Espera 5 segundos para a pessoa ler, e aí ela dorme de verdade
      setTimeout(() => {
        setPetState(prev => ({ ...prev, mood: 'dormindo' }));
        setAction('SIT_LOAF');
        isFallingAsleepRef.current = false;
      }, 5000);
    }
  }, [stats.hunger, stats.energy, chatVisibleRef, action, petState.mood, setPetState, setAction, showChat]);

  // Recarga de Energia durante o Sono
  useEffect(() => {
    if (aiLocked) return;
    let sleepInterval;
    if (petState.mood === 'dormindo' && action === 'SIT_LOAF') {
      sleepInterval = setInterval(() => {
        setStats(prev => {
          const newEnergy = Math.min(100, prev.energy + 5); 
          if (newEnergy >= 95) {
            setPetState(p => ({ ...p, mood: 'feliz' }));
            // Acorda já no modo turbo!
            setAction('ZOOMIES'); 
          }
          return { ...prev, energy: newEnergy };
        });
      }, 1000); 
    }
    return () => clearInterval(sleepInterval);
  }, [petState.mood, action, setPetState, setAction, setStats, showChat]);
}
