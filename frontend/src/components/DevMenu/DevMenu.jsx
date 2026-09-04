import React, { useState } from 'react';
import './DevMenu.css';

export default function DevMenu({ setAction, setDirection, setPetState, triggerSequence }) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = ['IDLE', 'WALK', 'RUN', 'SIT', 'SIT_LOAF', 'GROOM', 'TIRED', 'JUMP', 'TAIL_CHASE', 'ZOOMIES', 'BUG_CATCH', 'CROUCH', 'LUNGE'];
  const directions = ['DOWN', 'UP', 'LEFT', 'RIGHT'];
  const moods = ['feliz', 'brava', 'com-fome', 'dormindo'];

  if (!isOpen) {
    return (
      <button className="dev-menu-toggle" onClick={() => setIsOpen(true)}>
        🛠️ Dev
      </button>
    );
  }

  return (
    <div className="dev-menu-panel">
      <div className="dev-menu-header">
        <span>🛠️ Dev Menu</span>
        <button className="dev-menu-close" onClick={() => setIsOpen(false)}>×</button>
      </div>

      <div className="dev-menu-section">
        <label>Sequences:</label>
        <div className="dev-menu-buttons">
          <button onClick={() => triggerSequence('WAKE_UP')}>Wake Up</button>
          <button onClick={() => triggerSequence('HUNTING')}>Hunting</button>
          <button onClick={() => triggerSequence('AMBUSH')}>Ambush</button>
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Ação:</label>
        <div className="dev-menu-buttons">
          {actions.map(act => (
            <button key={act} onClick={() => setAction(act)}>{act}</button>
          ))}
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Direção:</label>
        <div className="dev-menu-buttons">
          {directions.map(dir => (
            <button key={dir} onClick={() => setDirection(dir)}>{dir}</button>
          ))}
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Humor:</label>
        <div className="dev-menu-buttons">
          {moods.map(mood => (
            <button key={mood} onClick={() => setPetState(prev => ({ ...prev, mood }))}>{mood}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
