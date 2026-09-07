import React, { useState, useEffect } from 'react';
import PetSprite from '../PetSprite/PetSprite';
import './CinematicOverlay.css';

export default function CinematicOverlay({ onComplete, petContext }) {
  const { setAction, setDirection } = petContext;
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [localAction, setLocalAction] = useState('IDLE');
  const [localDirection, setLocalDirection] = useState('UP');

  const lines = [
    "...",
    "Você é a Agatha, certo?",
    "Feliz Aniversário! Me disseram que hoje é seu dia.",
    "Eu sou o seu presente. Meu nome é Aggie, e eu moro aqui agora.",
    "Você pode me fazer carinho, me alimentar no menu, ou me puxar pela sala (duplo clique!).",
    "Prometo não morder muito. Vamos brincar!"
  ];

  // Efeito de Typewriter
  useEffect(() => {
    let timeout;
    if (currentLineIndex < lines.length) {
      const fullText = lines[currentLineIndex];
      if (displayedText.length < fullText.length) {
        setIsTyping(true);
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 50); // Velocidade de digitação
      } else {
        setIsTyping(false);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, currentLineIndex]);

  // Coordenação de Animações
  useEffect(() => {
    let newAction = 'IDLE';
    let newDirection = 'DOWN';

    if (currentLineIndex === 0) {
      newAction = 'IDLE';
      newDirection = 'UP'; // Olhando para trás/tela (depende do referencial, DOWN é para o usuário)
    } else if (currentLineIndex === 1) {
      newDirection = 'DOWN'; // Olha para o usuário
    } else if (currentLineIndex === 2) {
      newAction = 'JUMP';
    } else if (currentLineIndex === 3) {
      newAction = 'SIT';
    } else if (currentLineIndex === 4) {
      newAction = 'WALK';
    } else if (currentLineIndex === 5) {
      newAction = 'DANCE';
    }

    setAction(newAction);
    setDirection(newDirection);
    setLocalAction(newAction);
    setLocalDirection(newDirection);
  }, [currentLineIndex, setAction, setDirection]);

  const handleNext = () => {
    if (isTyping) {
      // Pula a animação de digitação
      setDisplayedText(lines[currentLineIndex]);
      setIsTyping(false);
    } else {
      if (currentLineIndex < lines.length - 1) {
        setDisplayedText('');
        setCurrentLineIndex(prev => prev + 1);
      } else {
        // Finaliza cinemática
        setIsFading(true);
        setTimeout(() => {
          onComplete();
        }, 1000); // 1s para o fade-out
      }
    }
  };

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className={`cinematic-overlay ${isFading ? 'fade-out' : ''}`}>
      <div className="cinematic-content">
        <div className="cinematic-sprite-container">
          <PetSprite 
            action={localAction} 
            direction={localDirection} 
            mood="neutra" 
            accessory="NONE" 
          />
        </div>
        <div className="cinematic-text-box">
          <p className="cinematic-text">{displayedText}</p>
          {!isTyping && currentLineIndex < lines.length - 1 && (
            <span className="cinematic-blink">▼</span>
          )}
        </div>
        
        <div className="cinematic-controls">
          <button className="cinematic-btn" onClick={handleNext}>
            {isTyping ? "..." : (currentLineIndex < lines.length - 1 ? "Avançar" : "Concluir")}
          </button>
          <button className="cinematic-skip-btn" onClick={handleSkip}>
            Pular Introdução
          </button>
        </div>
      </div>
    </div>
  );
}
