import React, { useEffect, useRef } from 'react';
import './PetSprite.css';
import { SPEEDS } from './constants';
import { renderCat } from './renderCat';
import { AnimationEngine } from './animations/AnimationEngine';

export default function PetSprite({ mood, action, direction }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const timerRef = useRef(0);
  
  // Estado contínuo para Tweening (Interpolação Matemática)
  const lerpState = useRef({
    sitDrop: 0,
    jumpLift: 0,
    stretchX: 1,
    stretchY: 1,
    rollAngle: 0,
    wiggleAngle: 0,
    crouchAmount: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let lastTime = performance.now();

    const gameLoop = (time) => {
      const dt = time - lastTime;
      lastTime = time;

      // Controle de FPS da animação
      const speedLimit = SPEEDS[action] || SPEEDS.DEFAULT;
      timerRef.current += dt * 0.06; 
      if (timerRef.current > speedLimit) {
        frameRef.current = (frameRef.current + 1) % 4;
        timerRef.current = 0;
      }

      // 1. Definir o Target (Alvo) baseado na ação chamando a Engine Modular
      const engineTargets = AnimationEngine.getTargets(action, frameRef.current);
      
      const targetState = {
        sitDrop: 0,
        jumpLift: 0,
        stretchX: 1,
        stretchY: 1,
        rollAngle: 0,
        wiggleAngle: 0,
        crouchAmount: 0,
        ...engineTargets
      };

      // Reset do ROLL para poder girar de novo
      if (action !== 'ROLL' && lerpState.current.rollAngle > Math.PI) {
        lerpState.current.rollAngle = 0;
      }

      // 2. Aplicar LERP (Interpolação Linear)
      const lerpSpeed = 0.15;
      const s = lerpState.current;
      
      s.sitDrop += (targetState.sitDrop - s.sitDrop) * lerpSpeed;
      s.jumpLift += (targetState.jumpLift - s.jumpLift) * (action === 'POUNCE' ? 0.3 : lerpSpeed);
      s.stretchX += (targetState.stretchX - s.stretchX) * lerpSpeed;
      s.stretchY += (targetState.stretchY - s.stretchY) * lerpSpeed;
      s.rollAngle += (targetState.rollAngle - s.rollAngle) * lerpSpeed;
      s.wiggleAngle += (targetState.wiggleAngle - s.wiggleAngle) * 0.3; // Wiggle é rápido
      s.crouchAmount += (targetState.crouchAmount - s.crouchAmount) * lerpSpeed;

      // 3. Desenhar frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Sombra
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 15, 20, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      renderCat(ctx, cx, cy, direction, frameRef.current, action, mood, s);
      
      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [action, mood, direction]);

  return (
    <div className="pet-canvas-container">
      {mood === 'dormindo' && <div className="mood-indicator sleep-mark" style={{ top: -10 }}>💤</div>}
      <canvas 
        ref={canvasRef} 
        width={120} 
        height={120} 
        className="pet-canvas"
      />
    </div>
  );
}

