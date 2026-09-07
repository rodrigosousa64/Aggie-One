import React, { useState } from 'react';
import './DevMenu.css';

export default function DevMenu({ setAction, setDirection, setPetState, triggerSequence, equipAccessory, getPetTalk, showChat }) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    'IDLE', 'WALK', 'RUN', 'SIT', 'SIT_LOAF', 'GROOM', 
    'JUMP', 'TAIL_CHASE', 'ZOOMIES', 'BUG_CATCH', 'CROUCH', 
    'LUNGE', 'EAT_TREAT', 'SLEEPING', 'WAKE_UP', 'STRETCH', 
    'POUNCE', 'ROLL', 'HUNTING', 'AMBUSH', 'STARTLE_JUMP', 
    'YAWN', 'SCRATCH', 'DANCE', 'DANCE_SPIN', 'DANCE_WIGGLE'
  ];
  const directions = ['DOWN', 'UP', 'LEFT', 'RIGHT'];
  const moods = ['feliz', 'brava', 'com-fome', 'dormindo'];

  const testTalk = (context) => {
    if (getPetTalk && showChat) {
      getPetTalk(context)
        .then(data => showChat(data.reply, true, false, true))
        .catch(err => console.log(err));
    }
  };

  const resetLogin = () => {
    localStorage.removeItem('aggie_unlocked');
    localStorage.removeItem('aggie_intro_seen');
    window.location.reload();
  };

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
        <label>Sistema de Login:</label>
        <div className="dev-menu-buttons">
          <button onClick={resetLogin} style={{background: '#ef4444', color: '#fff'}}>Resetar Login e Intro</button>
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Falas Temáticas (Lore):</label>
        <div className="dev-menu-buttons">
          <button onClick={() => testTalk('HUNGRY')}>Fome</button>
          <button onClick={() => testTalk('ACTION_PET')}>Carinho</button>
          <button onClick={() => testTalk('ACTION_EAT')}>Comer</button>
          <button onClick={() => testTalk('ACTION_WAKE')}>Acordar</button>
          <button onClick={() => testTalk('ACTION_SLEEP')}>Dormir</button>
          <button onClick={() => testTalk('ACTION_ZOOMIES')}>Zoomies</button>
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Testar Comandos de Roupas (Chat):</label>
        <div className="dev-menu-buttons">
          <button onClick={() => testTalk('CLOTHING_PARTY_HAT')}>Cmd: Party Hat</button>
          <button onClick={() => testTalk('CLOTHING_BOWTIE')}>Cmd: Gravata</button>
          <button onClick={() => testTalk('CLOTHING_COLLAR')}>Cmd: Colar</button>
          <button onClick={() => testTalk('CLOTHING_SUNGLASSES')}>Cmd: Óculos</button>
          <button onClick={() => testTalk('CLOTHING_SCARF')}>Cmd: Cachecol</button>
          <button onClick={() => testTalk('CLOTHING_NONE')}>Cmd: Sem Roupa</button>
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Sequences:</label>
        <div className="dev-menu-buttons">
          <button onClick={() => triggerSequence('SLEEP')}>Soneca (Sleep)</button>
          <button onClick={() => triggerSequence('WAKE_UP')}>Wake Up</button>
          <button onClick={() => triggerSequence('HUNTING')}>Hunting</button>
          <button onClick={() => triggerSequence('AMBUSH')}>Ambush</button>
          <button onClick={() => triggerSequence('BUG_CATCH')}>Bug Catch</button>
          <button onClick={() => triggerSequence('STARTLE')}>Startle</button>
          <button onClick={() => triggerSequence('BIRTHDAY_EAT')}>Eat Treat</button>
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Animações de Dança:</label>
        <div className="dev-menu-buttons">
          <button onClick={() => triggerSequence('DANCE')}>Dance (Balanço)</button>
          <button onClick={() => triggerSequence('DANCE_SPIN')}>Dance Spin (Giro)</button>
          <button onClick={() => triggerSequence('DANCE_WIGGLE')}>Dance Wiggle (Frenético)</button>
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Novas Animações (Em Teste):</label>
        <div className="dev-menu-buttons">
          <button onClick={() => setAction('YAWN')}>Bocejar (YAWN)</button>
          <button onClick={() => setAction('SCRATCH')}>Coçar Orelha (SCRATCH)</button>
          <button onClick={() => setAction('SIT_LOAF')}>Deitar Pão (LOAF)</button>
          <button onClick={() => setAction('BUG_CATCH')}>Caçar Mosca</button>
          <button onClick={() => triggerSequence('JUMP')}>Pulo Seco</button>
        </div>
      </div>

      <div className="dev-menu-section">
        <label>Acessórios:</label>
        <div className="dev-menu-buttons">
          <button onClick={() => equipAccessory(null)}>Remover</button>
          <button onClick={() => equipAccessory('BIRTHDAY_HAT')}>Chapéu Festa</button>
          <button onClick={() => equipAccessory('THUG_GLASSES')}>Óculos Matrix</button>
          <button onClick={() => equipAccessory('DETECTIVE_HAT')}>Detetive</button>
          <button onClick={() => equipAccessory('PARTY_HAT')}>Party Hat</button>
          <button onClick={() => equipAccessory('BOWTIE')}>Gravata</button>
          <button onClick={() => equipAccessory('COLLAR')}>Colar</button>
          <button onClick={() => equipAccessory('SUNGLASSES')}>Óculos Sol</button>
          <button onClick={() => equipAccessory('SCARF')}>Cachecol</button>
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
