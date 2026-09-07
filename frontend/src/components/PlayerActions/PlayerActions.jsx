import React, { useState } from 'react';
import PixelIcon from '../PixelIcon';
import AudioManager from '../AudioManager/AudioManager';
import './PlayerActions.css';

export default function PlayerActions({ onFeed, onCatnip, onMusicStart, onMusicStop, onOpenManual }) {
  const [toysOpen, setToysOpen] = useState(false);

  return (
    <div className="player-actions-hud">
      {toysOpen && (
        <div className="toy-menu">
          <button className="toy-btn" onClick={() => { onOpenManual(); setToysOpen(false); }} title="Manual da Aggie">
            <PixelIcon name="book" color="#3b82f6" size={20}/>
          </button>
          <button className="toy-btn" onClick={() => { onCatnip(); setToysOpen(false); }} title="Catnip">
            <PixelIcon name="leaf" color="#22c55e" size={20}/>
          </button>
          <AudioManager onMusicStart={onMusicStart} onMusicStop={onMusicStop} />
        </div>
      )}
      
      <button 
        className="hud-btn toybox-btn"
        onClick={() => setToysOpen(!toysOpen)}
        title="Caixa de Brinquedos"
      >
        <PixelIcon name="box" color="#fbbf24" size={24}/>
      </button>

      <button 
        className="hud-btn feed-btn"
        onClick={onFeed}
        title="Dar Sachê"
      >
        <PixelIcon name="fish" color="#f97316" size={24}/>
      </button>
    </div>
  );
}
