import React from 'react';
import './PixelRoom.css';

/**
 * Cenário: Sala preta minimalista com apenas um tapete quadrado.
 * 100% CSS, zero imagens.
 */
export default function PixelRoom({ children, isLightOn }) {
  return (
    <div className={`cat-room ${isLightOn ? 'light-on' : ''}`}>
      {/* Iluminação ambiente suave */}
      <div className="ambient-light" />

      {/* Tapete quadrado central */}
      <div className="square-rug">
        <div className="rug-pattern" />
      </div>

      {/* Setup Gamer no canto superior esquerdo */}
      <div className="gaming-setup">
        <div className="monitor" />
        <div className="desk" />
      </div>

      {/* Area onde o pet anda */}
      <div className="pet-area">
        {children}
      </div>


    </div>
  );
}
