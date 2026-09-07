import React, { useState } from 'react';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove tudo que não for dígito
    const cleanPass = password.replace(/\D/g, '');
    
    // Variações aceitas para 17/06/2027
    const validPasswords = [
      '17062027', // 17/06/2027
      '1762027',  // 17/6/2027
      '170627',   // 17/06/27
      '17627',    // 17/6/27
      '1706',     // 17/06
      '176'       // 17/6
    ];

    if (validPasswords.includes(cleanPass)) {
      setError(false);
      setIsFading(true);
      // Aguarda a animação de fade-out antes de desmontar o componente
      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else {
      setError(true);
      // Treme o input em caso de erro
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className={`welcome-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="login-box">
        <h1 className="welcome-title">Área Restrita</h1>
        <p className="welcome-subtitle">Insira uma data muito importante para acessar o seu presente.</p>
        
        <form onSubmit={handleSubmit} className="welcome-form">
          <input
            type="text"
            className={`password-input ${error ? 'shake error' : ''}`}
            placeholder="DD/MM/AAAA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" className="enter-button">ENTRAR</button>
        </form>
      </div>
    </div>
  );
}
