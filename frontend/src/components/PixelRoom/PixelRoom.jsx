import React from 'react';
import './PixelRoom.css';

/**
 * Cenário: Sala preta minimalista com apenas um tapete quadrado.
 * 100% CSS, zero imagens.
 */
export default function PixelRoom({ children }) {
  return (
    <div className="cat-room">
      {/* Iluminação ambiente suave */}
      <div className="ambient-light" />

      {/* Tapete quadrado central */}
      <div className="square-rug">
        <div className="rug-pattern" />
      </div>

      {/* Area onde o pet anda */}
      <div className="pet-area">
        {children}
      </div>
    </div>
  );
}
