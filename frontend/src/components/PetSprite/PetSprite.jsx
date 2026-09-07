import React, { useEffect, useRef } from 'react';
import './PetSprite.css';
import { SPEEDS } from './constants';
import { renderCat } from './renderCat';
import { AnimationEngine } from './animations/AnimationEngine';

export default function PetSprite({ mood, action, direction, accessory }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const timerRef = useRef(0);
  const particlesRef = useRef([]);
  const lastActionRef = useRef(action);
  const bioStateRef = useRef({
    torsoScaleY: 1,
    blinkScaleY: 1,
    earTwitchLeft: 0,
    earTwitchRight: 0,
    nextBlinkTime: 0,
    isBlinking: false,
    blinkEndTime: 0,
    pendingDoubleBlink: false,
    earTwitchEndTime: 0,
    twitchingEar: null,
    zoomiesCooldown: 0
  });
  
  // Estado contínuo para Tweening (Interpolação Matemática)
  const lerpState = useRef({
    sitDrop: 0,
    jumpLift: 0,
    stretchX: 1,
    stretchY: 1,
    rollAngle: 0,
    wiggleAngle: 0,
    crouchAmount: 0,
    scratchPaw: 0
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
        scratchPaw: 0,
        ...engineTargets
      };

      // Reset do ROLL para poder girar de novo
      if (action !== 'ROLL' && lerpState.current.rollAngle > Math.PI) {
        lerpState.current.rollAngle = 0;
      }

      // --- MOVIMENTOS BIOLÓGICOS (Respiração, Piscar, Orelhas) ---
      const now = Date.now();
      const bio = bioStateRef.current;

      // Respiração Procedimental
      if (action === 'ZOOMIES') {
        bio.zoomiesCooldown = now + 5000;
      }
      const isPanting = (mood === 'cansada' || now < bio.zoomiesCooldown);
      const freq = isPanting ? 250 : 500;
      const amp = isPanting ? 0.04 : 0.02;
      bio.torsoScaleY = 1 + (Math.sin(now / freq) * amp);

      // Piscar Assíncrono
      if (!bio.isBlinking && now > bio.nextBlinkTime) {
        bio.isBlinking = true;
        bio.blinkEndTime = now + 100;
        bio.blinkScaleY = 0.1;
      }
      if (bio.isBlinking && now > bio.blinkEndTime) {
        bio.isBlinking = false;
        bio.blinkScaleY = 1;
        if (bio.pendingDoubleBlink) {
          bio.pendingDoubleBlink = false;
          bio.nextBlinkTime = now + 150;
        } else {
          bio.nextBlinkTime = now + 2000 + Math.random() * 4000;
          if (Math.random() < 0.2) bio.pendingDoubleBlink = true;
        }
      }

      // Movimento de Orelha (Tiques)
      if (!bio.twitchingEar && Math.random() < 0.002) { // aprox 5% chance por segundo em 60fps
        bio.twitchingEar = Math.random() < 0.5 ? 'left' : 'right';
        bio.earTwitchEndTime = now + 200;
      }
      
      if (bio.twitchingEar) {
        const timeLeft = bio.earTwitchEndTime - now;
        if (timeLeft > 0) {
          const angle = Math.sin((200 - timeLeft) / 200 * Math.PI) * (15 * Math.PI / 180);
          if (bio.twitchingEar === 'left') {
            bio.earTwitchLeft = angle;
            bio.earTwitchRight = 0;
          } else {
            bio.earTwitchRight = -angle;
            bio.earTwitchLeft = 0;
          }
        } else {
          bio.twitchingEar = null;
          bio.earTwitchLeft = 0;
          bio.earTwitchRight = 0;
        }
      }

      // 3. Desenhar frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Gerar partículas de poeira na transição de estado
      if (action !== lastActionRef.current) {
        if (['LUNGE', 'JUMP', 'ZOOMIES'].includes(action)) {
          const numParticles = 3 + Math.floor(Math.random() * 2);
          for (let i = 0; i < numParticles; i++) {
            // Aproximação das patas traseiras baseado na direção
            let offsetX = 0;
            let offsetY = 12; 
            if (direction === 'LEFT') offsetX = 10;
            if (direction === 'RIGHT') offsetX = -10;
            if (direction === 'UP') offsetY = 15;
            if (direction === 'DOWN') offsetY = 5;

            particlesRef.current.push({
              x: cx + offsetX + (Math.random() - 0.5) * 12,
              y: cy + offsetY + (Math.random() - 0.5) * 8,
              radius: 2 + Math.random() * 2,
              alpha: 0.8,
              framesLife: 10,
              maxFrames: 10
            });
          }
        }
        lastActionRef.current = action;
      }

      // Atualizar partículas
      particlesRef.current = particlesRef.current.filter(p => {
        p.framesLife -= 1;
        p.radius += 0.5; // Expande
        p.alpha = (p.framesLife / p.maxFrames) * 0.8; // Reduz opacidade
        return p.framesLife > 0;
      });

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
      s.scratchPaw += (targetState.scratchPaw - s.scratchPaw) * 0.5; // Scratch é rápido

      // Sombra
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 15, 20, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Desenhar partículas (poeira)
      particlesRef.current.forEach(p => {
        ctx.fillStyle = `rgba(180, 180, 180, ${Math.max(0, p.alpha)})`; // Cor da poeira
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      const combinedState = { ...s, ...bio };
      renderCat(ctx, cx, cy, direction, frameRef.current, action, mood, combinedState, accessory);
      
      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [action, mood, direction, accessory]);

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

