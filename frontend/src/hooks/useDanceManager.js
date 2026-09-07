import { useCallback, useRef } from 'react';

export function useDanceManager(setAction, isDancingRef) {
  const danceIntervalRef = useRef(null);
  const previousActionRef = useRef('IDLE');

  const startDancing = useCallback(() => {
    if (isDancingRef.current) return; // Evita criar múltiplos intervalos
    
    // Salva a ação anterior para poder restaurar depois
    previousActionRef.current = 'IDLE'; 
    isDancingRef.current = true;
    
    // Começa com uma dança aleatória
    const danceActions = ['DANCE', 'DANCE_SPIN', 'DANCE_WIGGLE'];
    const randomDance = danceActions[Math.floor(Math.random() * danceActions.length)];
    setAction(randomDance);
    
    if (danceIntervalRef.current) clearInterval(danceIntervalRef.current);
    
    // Troca de dança periodicamente
    danceIntervalRef.current = setInterval(() => {
      const nextDance = danceActions[Math.floor(Math.random() * danceActions.length)];
      setAction(nextDance);
    }, 3000); 
  }, [setAction, isDancingRef]);

  const stopDancing = useCallback(() => {
    if (!isDancingRef.current) return; // Já parou
    isDancingRef.current = false;
    
    // Limpa o intervalo de troca de dança
    if (danceIntervalRef.current) {
      clearInterval(danceIntervalRef.current);
      danceIntervalRef.current = null;
    }
    
    // Volta para a ação anterior ou IDLE
    setAction(previousActionRef.current);
  }, [setAction, isDancingRef]);

  return { startDancing, stopDancing };
}