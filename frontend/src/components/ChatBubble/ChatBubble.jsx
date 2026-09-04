import React, { useEffect, useState } from 'react';
import './ChatBubble.css';

export default function ChatBubble({ text, isVisible, onHide }) {
  const [displayedText, setDisplayedText] = useState('');

  // Efeito de digitação (Typewriter)
  useEffect(() => {
    if (isVisible && text) {
      setDisplayedText('');
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 30); // Velocidade de digitação
      
      // Auto-esconder depois de um tempo
      const timeout = setTimeout(() => {
        onHide();
      }, 5000 + (text.length * 50)); 
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isVisible, text, onHide]);

  if (!isVisible) return null;

  return (
    <div className="chat-bubble-container">
      <div className="chat-bubble">
        <p>{displayedText}</p>
        <div className="chat-tail"></div>
      </div>
    </div>
  );
}
