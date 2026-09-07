import React, { useState } from 'react';
import PixelIcon from '../PixelIcon';
import './StatusHUD.css';

const StatusHUD = ({ stats }) => {
  const [showSubstats, setShowSubstats] = useState(false);

  return (
    <>
      {/* Top HUD (Always Visible) */}
      <div className="status-hud-top">
        <div className="stat-bar-container">
          <span className="stat-icon"><PixelIcon name="energy" color="#22d3ee" size={16}/></span>
          <div className="stat-bar-bg">
            <div 
              className="stat-bar-fill energy" 
              style={{ width: `${stats.energy}%` }}
            ></div>
          </div>
        </div>
        <div className="stat-bar-container">
          <span className="stat-icon"><PixelIcon name="hunger" color="#f97316" size={16}/></span>
          <div className="stat-bar-bg">
            <div 
              className="stat-bar-fill hunger" 
              style={{ width: `${stats.hunger}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Substats Toggle Button */}
      <button 
        className="substats-toggle-btn"
        onClick={() => setShowSubstats(!showSubstats)}
        aria-label="Toggle extra status"
      >
        <PixelIcon name="paw" color="#ffffff" size={24}/>
      </button>

      {/* Substats Bottom Sheet */}
      <div className={`substats-bottom-sheet ${showSubstats ? 'open' : ''}`}>
        <div className="substats-header" onClick={() => setShowSubstats(false)}>
          <div className="substats-handle"></div>
        </div>
        <div className="substats-content">
          <div className="stat-bar-container large">
            <span className="stat-icon"><PixelIcon name="affection" color="#f43f5e" size={20}/></span>
            <div className="stat-label">Carinho</div>
            <div className="stat-bar-bg">
              <div 
                className="stat-bar-fill affection" 
                style={{ width: `${stats.affection}%` }}
              ></div>
            </div>
            <span className="stat-value">{Math.round(stats.affection)}%</span>
          </div>

          <div className="stat-bar-container large">
            <span className="stat-icon"><PixelIcon name="boredom" color="#a78bfa" size={20}/></span>
            <div className="stat-label">Tédio</div>
            <div className="stat-bar-bg">
              <div 
                className="stat-bar-fill boredom" 
                style={{ width: `${stats.boredom}%` }}
              ></div>
            </div>
            <span className="stat-value">{Math.round(stats.boredom)}%</span>
          </div>

          <div className="stat-bar-container large">
            <span className="stat-icon"><PixelIcon name="anger" color="#ef4444" size={20}/></span>
            <div className="stat-label">Raiva</div>
            <div className="stat-bar-bg">
              <div 
                className="stat-bar-fill anger" 
                style={{ width: `${stats.anger}%` }}
              ></div>
            </div>
            <span className="stat-value">{Math.round(stats.anger)}%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusHUD;
