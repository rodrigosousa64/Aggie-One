import React, { useState } from 'react';
import './MobileUIOverlay.css';

export default function MobileUIOverlay({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="mobile-overlay-container">
      <form className="interaction-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Fale com a Aggie..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="interaction-input"
        />
        <button type="submit" className="interaction-button" disabled={!message.trim()}>
          Enviar
        </button>
      </form>
    </div>
  );
}
