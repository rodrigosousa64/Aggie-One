import { useCallback } from 'react';

export function useSequenceEngine(stateMethods) {
  const { setPetState, setAction, setDirection, setPosition, direction, position } = stateMethods;

  const triggerSequence = useCallback((seqName) => {
    if (seqName === 'SLEEP') {
      setPetState(prev => ({ ...prev, mood: 'dormindo' }));
      setAction('SIT_LOAF');
      return;
    }
    if (seqName === 'WAKE_UP') {
      setAction('WAKE_UP');
      setPetState(prev => ({ ...prev, mood: 'feliz' }));
      setDirection('RIGHT'); 
      setTimeout(() => setAction('STRETCH'), 2000);
      setTimeout(() => {
        setAction('IDLE');
        setDirection('DOWN'); 
      }, 4500);
    }
    if (seqName === 'HUNTING') {
      setAction('CROUCH_WIGGLE');
      setDirection('RIGHT');
      setTimeout(() => {
        setAction('POUNCE');
        setPosition(prev => ({ x: prev.x + (direction === 'RIGHT' ? 10 : -10), y: prev.y }));
      }, 2000);
      setTimeout(() => setAction('ROLL'), 2500);
      setTimeout(() => setAction('IDLE'), 3500);
    }
    if (seqName === 'AMBUSH') {
      const isRightEdge = Math.random() > 0.5;
      const edgeX = isRightEdge ? 28 : -28;
      const edgeY = Math.floor(Math.random() * 40) - 20;
      
      setAction('RUN');
      setDirection(isRightEdge ? 'RIGHT' : 'LEFT');
      setPosition({ x: edgeX, y: edgeY });

      setTimeout(() => {
        setDirection(isRightEdge ? 'LEFT' : 'RIGHT');
        setAction('CROUCH');

        setTimeout(() => {
          setAction('LUNGE');
          setPosition({ x: 0, y: 0 });

          setTimeout(() => {
            setAction('IDLE');
          }, 400); 
        }, 3000); 
      }, 800); 
    }
    if (seqName === 'BUG_CATCH') {
      const limitX = 25;
      const limitY = 20;
      const randomX = Math.floor(Math.random() * limitX * 2) - limitX;
      const randomY = Math.floor(Math.random() * limitY * 2) - limitY;

      const dx = randomX - position.x;
      const dy = randomY - position.y;
      
      let newDir = 'DOWN';
      if (Math.abs(dx) > Math.abs(dy)) {
        newDir = dx > 0 ? 'RIGHT' : 'LEFT';
      } else {
        newDir = dy > 0 ? 'DOWN' : 'UP';
      }

      setAction('RUN');
      setDirection(newDir);
      setPosition({ x: randomX, y: randomY });

      setTimeout(() => {
        setAction('BUG_CATCH');
        if (newDir === 'UP' || newDir === 'DOWN') setDirection('RIGHT');
        setTimeout(() => setAction('IDLE'), 3000); 
      }, 800); 
    }
    if (seqName === 'STARTLE') {
      setAction('STARTLE_JUMP');
      setTimeout(() => setAction('CROUCH'), 800); 
    }
    if (seqName === 'BIRTHDAY_EAT') {
      setAction('WALK');
      setTimeout(() => setAction('EAT_TREAT'), 800);
      setTimeout(() => setAction('GROOM'), 4000);
    }
    if (seqName === 'EAT_TREAT') {
      setAction('EAT_TREAT');
      setTimeout(() => {
        setAction('GROOM');
        // Termina de se lamber após comer em 3 segundos
        setTimeout(() => setAction('IDLE'), 3000);
      }, 3200);
    }
    if (seqName === 'JUMP') {
      setAction('JUMP');
      setTimeout(() => setAction('IDLE'), 1000);
    }
    if (seqName === 'GROOM_SHORT') {
      setAction('GROOM');
      setTimeout(() => setAction('IDLE'), 2500);
    }
    if (seqName === 'ROLL_SHORT') {
      setAction('ROLL');
      setTimeout(() => setAction('IDLE'), 2000);
    }
    if (seqName === 'DANCE') {
      setAction('DANCE');
      setTimeout(() => setAction('IDLE'), 5000);
    }
    if (seqName === 'DANCE_SPIN') {
      setAction('DANCE_SPIN');
      setTimeout(() => {
        setAction('IDLE');
        setDirection('DOWN'); // Garante que volte de frente após girar
      }, 5000);
    }
    if (seqName === 'DANCE_WIGGLE') {
      setAction('DANCE_WIGGLE');
      setTimeout(() => setAction('IDLE'), 5000);
    }
    if (seqName === 'ZOOMIES') {
      setAction('ZOOMIES');
      // Acelera pelas bordas
      const randX = Math.floor(Math.random() * 40) - 20;
      const randY = Math.floor(Math.random() * 30) - 15;
      setPosition({ x: randX, y: randY });
      setTimeout(() => {
        setPosition({ x: -randX, y: -randY });
      }, 1500);
      setTimeout(() => {
        setPosition({ x: 0, y: 0 });
        setAction('IDLE');
      }, 3500);
    }
  }, [setPetState, setAction, setDirection, setPosition, direction, position]);

  return { triggerSequence };
}
