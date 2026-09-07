import { useEffect, useRef } from 'react';

export function useDragAndDrop(petContext) {
  const { isDragging, setIsDragging, setPosition, setAction, showChat, setStats } = petContext;
  
  const dragCountRef = useRef(0);
  const dragResetTimeoutRef = useRef(null);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      let clientX, clientY;
      
      // Suporte para eventos de toque puro (Safari antigo) ou PointerEvents
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (clientX === undefined || clientY === undefined) return;

      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      
      const newX = ((clientX - vw / 2) / vw) * 100;
      const newY = ((clientY - vh / 2) / vh) * 100;
      
      if (!isNaN(newX) && !isNaN(newY)) {
        setPosition({ x: newX, y: newY });
      }
    };

    const handleDrop = (e) => {
      // Evita soltar imediatamente no mesmo evento de clique duplo
      if (Date.now() - lastClickTimeRef.current < 400) return;

      setIsDragging(false);
      setAction('IDLE');
      
      dragCountRef.current += 1;
      clearTimeout(dragResetTimeoutRef.current);
      
      if (dragCountRef.current >= 3) {
         showChat("Me põe no chão!! 😾", true);
         setStats(p => ({ ...p, anger: Math.min(100, p.anger + 20) }));
         dragCountRef.current = 0;
      } else {
         dragResetTimeoutRef.current = setTimeout(() => {
           dragCountRef.current = 0;
         }, 5000); 
      }
    };

    // Eventos unificados (Mouse, Pen, Touch)
    window.addEventListener('pointermove', handleMove, { passive: false });
    window.addEventListener('pointerdown', handleDrop); // Qualquer clique na tela solta ela
    
    // Fallback explícito para touch (iOS Safari)
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchstart', handleDrop); // Toque na tela solta ela

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDrop);
      
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchstart', handleDrop);
    };
  }, [isDragging, setPosition, setIsDragging, setAction, showChat, setStats]);

  const handlePetPointerDown = (e) => {
    // Evita comportamentos nativos
    if (e.cancelable) e.preventDefault();
    e.stopPropagation(); // Evita que o evento suba para a janela
    
    // Duplo clique para ativar o modo pegar!
    const now = Date.now();
    if (now - lastClickTimeRef.current < 300) {
      if (!isDragging) {
        setIsDragging(true);
        setAction('JUMP'); 
      }
    }
    lastClickTimeRef.current = now;
  };

  return { handlePetPointerDown };
}
