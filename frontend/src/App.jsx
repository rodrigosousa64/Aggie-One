import React, { useEffect } from 'react';
import PixelRoom from './components/PixelRoom/PixelRoom';
import PetSprite from './components/PetSprite/PetSprite';
import ChatBubble from './components/ChatBubble/ChatBubble';
import PixelIcon from './components/PixelIcon';
import MobileUIOverlay from './components/MobileUIOverlay/MobileUIOverlay';
import DevMenu from './components/DevMenu/DevMenu';
import StatusHUD from './components/StatusHUD/StatusHUD';
import PlayerActions from './components/PlayerActions/PlayerActions';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import CinematicOverlay from './components/CinematicOverlay/CinematicOverlay';
import AggieManual from './components/AggieManual/AggieManual';

// Custom Hooks Refatorados
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useInteractions } from './hooks/useInteractions';
import { useChatAndEvents } from './hooks/useChatAndEvents';
import './App.css';

// Hooks
import { usePetState } from './hooks/usePetState';
import { useSequenceEngine } from './hooks/useSequenceEngine';
import { useGameLoop } from './hooks/useGameLoop';
import { useWanderAI } from './hooks/useWanderAI';
import { useDanceManager } from './hooks/useDanceManager';

// Services
import { getPetState, getPetTalk } from './services/petService';
import { getCachedBrainConfig } from './services/brainService';

function App() {
  const [isUnlocked, setIsUnlocked] = React.useState(() => {
    return localStorage.getItem('aggie_unlocked') === 'true';
  });
  const [isIntroSeen, setIsIntroSeen] = React.useState(() => {
    return localStorage.getItem('aggie_intro_seen') === 'true';
  });
  const [isManualOpen, setIsManualOpen] = React.useState(false);

  const petContext = usePetState();
  const { triggerSequence } = useSequenceEngine(petContext);
  
  const aiLocked = !isIntroSeen;
  useGameLoop(petContext, triggerSequence, aiLocked);
  useWanderAI(petContext, triggerSequence, aiLocked);

  const {
    petState, setPetState,
    chat,
    effects, setEffects,
    action, setAction,
    position, setPosition,
    direction, setDirection,
    stats, setStats,
    accessory, equipAccessory,
    showChat, hideChat,
    chatVisibleRef, petMoodRef, statsRef,
    isDragging, setIsDragging
  } = petContext;

  // --- Custom Hooks de Lógica ---
  const { handleCatnip, handleFeed, handlePetInteraction } = useInteractions(petContext, triggerSequence);
  const { handleSendMessage } = useChatAndEvents(petContext, triggerSequence);
  const { handlePetPointerDown } = useDragAndDrop(petContext);
  
  const isDancingRef = React.useRef(false);
  const { startDancing, stopDancing } = useDanceManager(setAction, isDancingRef);

  // Initial Fetch
  useEffect(() => {
    getPetState()
      .then(data => {
        setPetState(data);
        if (data.energy !== undefined) {
           setStats(prev => ({
             ...prev,
             energy: data.energy ?? prev.energy,
             hunger: data.hunger ?? prev.hunger,
             affection: data.affection ?? prev.affection,
             boredom: data.boredom ?? prev.boredom,
             anger: data.anger ?? prev.anger
           }));
        }
        if (data.active_accessory) {
           equipAccessory(data.active_accessory);
        }
      })
      .catch(err => console.error("API offline, usando estado padrão", err));
  }, [setPetState, setStats, equipAccessory]);

  const [isLightOn, setIsLightOn] = React.useState(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18; // Luz acesa entre 6h e 18h
  });

  const getTransitionStyle = () => {
    const config = getCachedBrainConfig();
    const getSetting = (key, fallback) => {
      if (!config || !config.settings) return fallback;
      const s = config.settings.find(x => x.key === key);
      return s ? s.value : fallback;
    };

    if (action === 'ZOOMIES') return 'transform 0.25s cubic-bezier(0.17, 0.67, 0.23, 1.25)'; // Bouncy zig-zag
    if (action === 'LUNGE') return 'transform 0.3s cubic-bezier(0.1, 0.9, 0.2, 1)'; // Bote muito rápido
    if (action === 'POUNCE') return 'transform 0.5s linear'; // O pulo parabólico é feito pelo LERP, o translado é linear
    
    if (action === 'RUN') {
      const runTime = getSetting('RUN_MOVE_TIME_MS', 1500) / 1000;
      return `transform ${runTime}s linear`;
    }
    
    if (action === 'WALK') {
      const walkTime = getSetting('WALK_MOVE_TIME_MS', 3500) / 1000;
      return `transform ${walkTime}s linear`;
    }
    
    // Quando ela parar (IDLE, SIT, SLEEPING, etc), zera a transição 
    // para evitar que ela "deslize" com o tempo residual de outras animações.
    if (petContext.isDragging) return 'filter 0.2s ease'; // Mantém transição da sombra, mas zera o transform para arrasto instantâneo
    if (petContext.isDragging) return 'filter 0.2s ease'; // Mantém transição da sombra, mas zera o transform para arrasto instantâneo
    return 'transform 0s linear';
  };

  return (
    <>
      {!isUnlocked && <WelcomeScreen onUnlock={() => {
        localStorage.setItem('aggie_unlocked', 'true');
        setIsUnlocked(true);
      }} />}
      
      {isUnlocked && !isIntroSeen && (
        <CinematicOverlay 
          petContext={petContext}
          onComplete={() => {
            localStorage.setItem('aggie_intro_seen', 'true');
            setIsIntroSeen(true);
          }}
        />
      )}
      
      {isUnlocked && (
        <div className="app-container">
          {isManualOpen && <AggieManual onClose={() => setIsManualOpen(false)} />}
          {stats.is_admin && (
            <DevMenu 
              setAction={setAction}
              setDirection={setDirection}
              setPetState={setPetState}
              triggerSequence={triggerSequence}
              equipAccessory={equipAccessory}
              getPetTalk={getPetTalk}
              showChat={showChat}
            />
          )}
      <StatusHUD stats={stats} />
      <PlayerActions 
        onFeed={handleFeed}
        onCatnip={handleCatnip}
        onMusicStart={startDancing}
        onMusicStop={stopDancing}
        onOpenManual={() => setIsManualOpen(true)}
      />
      <PixelRoom isLightOn={isLightOn}>
        {effects.matrixRain && (
          <div className="matrix-overlay">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="matrix-code"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${1.5 + Math.random()}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                10101100101101
              </div>
            ))}
          </div>
        )}
        
        {effects.balloons && (
          <div className="balloons-container">
            <div className="balloon b1">🎈</div>
            <div className="balloon b2">🎈</div>
            <div className="balloon b3">🎈</div>
            <div className="balloon b4">🎈</div>
            <div className="balloon b5">🎈</div>
            <div className="balloon b6">🎈</div>
            <div className="balloon b7">🎈</div>
            <div className="balloon b8">🎈</div>
            <div className="balloon b9">🎈</div>
            <div className="balloon b10">🎈</div>
          </div>
        )}
        <div
          className={`pet-wrapper ${petContext.isDragging ? 'dragging' : ''}`}
          style={{
            transform: `translate(${position.x}vw, ${position.y}vh)`,
            transition: getTransitionStyle()
          }}
        >
          <ChatBubble
            text={chat.text}
            isVisible={chat.isVisible}
            isLoading={chat.isLoading}
            onHide={hideChat}
          />
          
          {!chat.isVisible && (
            <div className="emotion-bubble-container">
              {petState.mood === 'dormindo' ? (
                <div className="emotion-bubble sleep"><PixelIcon name="sleep" color="#60a5fa" size={24}/></div>
              ) : stats.anger > 80 || petState.mood === 'brava' ? (
                <div className="emotion-bubble anger"><PixelIcon name="anger" color="#ef4444" size={24}/></div>
              ) : stats.boredom > 80 ? (
                <div className="emotion-bubble boredom"><PixelIcon name="boredom" color="#a78bfa" size={24}/></div>
              ) : stats.hunger < 30 ? (
                <div className="emotion-bubble hunger"><PixelIcon name="hunger" color="#f97316" size={24}/></div>
              ) : null}
            </div>
          )}

          {effects.cake && (
            <div className="cake-container">
              🎂
            </div>
          )}

          <div className="interaction-hitbox" 
            onPointerDown={handlePetPointerDown}
            onPointerDown={handlePetPointerDown}
            onClick={handlePetInteraction}
            onMouseEnter={handlePetInteraction}
          ></div>
          
          {effects.floatingHearts && (
            <div className="floating-hearts">
              <div className="heart-particle">❤️</div>
              <div className="heart-particle" style={{ animationDelay: '0.2s', left: '20px' }}>❤️</div>
              <div className="heart-particle" style={{ animationDelay: '0.4s', left: '-20px' }}>❤️</div>
            </div>
          )}
          
          <PetSprite
            mood={petState.mood}
            action={action}
            direction={(chat.isVisible && chat.isInteractive) ? 'DOWN' : direction}
            accessory={accessory}
          />
        </div>
      </PixelRoom>

          <MobileUIOverlay onSendMessage={handleSendMessage} />
        </div>
      )}
    </>
  );
}

export default App;
