import React, { useEffect, useState } from 'react';
import './ChatBubble.css';

export default function ChatBubble({ text, isVisible, onHide, isLoading }) {
  const [displayedText, setDisplayedText] = useState('');
  
  // Ref estável para onHide — evita que o useEffect reinicie quando o App re-renderiza
  const onHideRef = React.useRef(onHide);
  const activeTextRef = React.useRef('');

  useEffect(() => { 
    onHideRef.current = onHide; 
  }, [onHide]);

  // Efeito de digitação (Typewriter)
  useEffect(() => {
    if (!isVisible || !text) {
      setDisplayedText('');
      activeTextRef.current = '';
      return;
    }

    // Se já estiver exibindo exatamente esse texto (e não for um loading eterno), não reinicia do zero
    if (activeTextRef.current === text && !isLoading) {
      return;
    }
    activeTextRef.current = text;
    setDisplayedText('');

    if (isLoading) {
      setDisplayedText(text); // Mostra o texto de carregamento imediatamente
      return; // Oculta automaticamente apena quando a requisição terminar
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30); // Velocidade de digitação
    
    // Auto-esconder depois de um tempo maior para dar tempo de ler frases grandes
    const timeout = setTimeout(() => {
      onHideRef.current(); // chama via ref — não é dependência
    }, 7000 + (text.length * 70)); 
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isVisible, text, isLoading]);

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
