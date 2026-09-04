import React, { useState, useEffect } from 'react'
import PixelRoom from './components/PixelRoom/PixelRoom'
import PetSprite from './components/PetSprite/PetSprite'
import ChatBubble from './components/ChatBubble/ChatBubble'
import MobileUIOverlay from './components/MobileUIOverlay/MobileUIOverlay'
import DevMenu from './components/DevMenu/DevMenu'
import { handleKeywordEvents } from './events/EventEngine'
import './App.css'

function App() {
  const [petState, setPetState] = useState({ mood: 'feliz', energy: 100 })
  const [chat, setChat] = useState({ text: '', isVisible: false })
  const [effects, setEffects] = useState({ balloons: false, cake: false })
  const [action, setAction] = useState('IDLE') // IDLE, WALK, RUN, SIT, GROOM, TIRED
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [direction, setDirection] = useState('DOWN')

  const API_URL = 'http://localhost:8000/api/pet'

  // Busca o estado inicial
  useEffect(() => {
    fetch(`${API_URL}/state`)
      .then(res => res.json())
      .then(data => setPetState(data))
      .catch(err => console.error("API offline, usando estado padrão", err))
  }, [])

  // Faz o pet "falar sozinho" a cada X segundos
  useEffect(() => {
    const talkInterval = setInterval(() => {
      if (Math.random() > 0.9 && !chat.isVisible) {
        fetch(`${API_URL}/talk`)
          .then(res => res.json())
          .then(data => showChat(data.reply))
          .catch(err => console.log("Sem resposta do backend", err))
      }
    }, 5000);
    return () => clearInterval(talkInterval)
  }, [chat.isVisible])

  // Lógica de ações aleatórias (Andar, Correr, Sentar, Lamber, Cansar)
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      if (chat.isVisible || action === 'RUN' || action === 'ZOOMIES' || action === 'CROUCH' || action === 'LUNGE') return;

      // Se ela estiver ocupada com uma ação longa, tem chance de parar
      if (action === 'TIRED' && Math.random() > 0.5) { setAction('IDLE'); return; }
      if (action === 'GROOM' && Math.random() > 0.6) { setAction('IDLE'); return; }
      if (action === 'SIT' && Math.random() > 0.4) { setAction('IDLE'); return; }

      // 40% de chance de iniciar uma nova ação se estiver IDLE ou WALK
      if (Math.random() > 0.6) {
        const rand = Math.random();
        
        if (rand < 0.1) {
          triggerSequence('WAKE_UP');
        } else if (rand < 0.2) {
          triggerSequence('HUNTING');
        } else if (rand < 0.3) {
          triggerSequence('AMBUSH');
        } else if (rand < 0.4) {
          triggerSequence('BUG_CATCH');
        } else if (rand < 0.45) {
          setAction('TAIL_CHASE');
          setTimeout(() => setAction('TIRED'), 3000);
        } else if (rand < 0.5) {
          setAction('ZOOMIES');
        } else if (rand < 0.55) {
          setAction('JUMP');
          setTimeout(() => setAction('IDLE'), 1000);
        } else if (rand < 0.65) {
          setAction('GROOM');
        } else if (rand < 0.72) {
          setAction('SIT_LOAF');
        } else if (rand < 0.78) {
          setAction('SIT');
        } else {
          // Vai se mover (WALK ou RUN)
          const isRun = rand > 0.8;
          setAction(isRun ? 'RUN' : 'WALK');
          
          // Limites do tapete
          const limitX = 25;
          const limitY = 20;
          const randomX = Math.floor(Math.random() * limitX * 2) - limitX;
          const randomY = Math.floor(Math.random() * limitY * 2) - limitY;

          const dx = randomX - position.x;
          const dy = randomY - position.y;
          
          let newDir = 'DOWN';
          if (Math.abs(dx) > Math.abs(dy)) {
            newDir = dx > 0 ? 'RIGHT' : 'LEFT';
          } else {
            newDir = dy > 0 ? 'DOWN' : 'UP';
          }

          setDirection(newDir);
          setPosition({ x: randomX, y: randomY });

          const moveTime = isRun ? 800 : 2000;
          setTimeout(() => {
            setAction(isRun ? 'TIRED' : 'IDLE');
          }, moveTime);
        }
      }
    }, 2500);
    return () => clearInterval(wanderInterval);
  }, [action, chat.isVisible, position])

  // Efeito especial: Zoomies (Corrida errática em zigue-zague)
  useEffect(() => {
    let zoomInterval;
    let stopTimeout;

    if (action === 'ZOOMIES') {
      const limitX = 25;
      const limitY = 20;
      
      zoomInterval = setInterval(() => {
        const randomX = Math.floor(Math.random() * limitX * 2) - limitX;
        const randomY = Math.floor(Math.random() * limitY * 2) - limitY;

        setPosition(prev => {
          const dx = randomX - prev.x;
          const dy = randomY - prev.y;
          if (Math.abs(dx) > Math.abs(dy)) {
            setDirection(dx > 0 ? 'RIGHT' : 'LEFT');
          } else {
            setDirection(dy > 0 ? 'DOWN' : 'UP');
          }
          return { x: randomX, y: randomY };
        });
      }, 250); // Muda de direção a cada 250ms! Muito rápido!

      stopTimeout = setTimeout(() => {
        clearInterval(zoomInterval);
        setAction('TIRED'); // Fica cansada após o surto de energia
      }, 3000); // Zoomies duram 3 segundos
    }

    return () => {
      clearInterval(zoomInterval);
      clearTimeout(stopTimeout);
    };
  }, [action])

  // Efeito especial quando começa a perseguir o rabo
  useEffect(() => {
    if (action === 'TAIL_CHASE') {
      showChat("Tem alguma coisa na minha cauda!!", true)
    }
  }, [action])

  const showChat = (text, keepAction = false) => {
    setChat({ text, isVisible: true })
    if (!keepAction) {
      setAction('WALK') // Só pra mexer um pouquinho
      setTimeout(() => setAction('IDLE'), 2000)
    }
  }

  const hideChat = () => {
    setChat(prev => ({ ...prev, isVisible: false }))
  }

  const triggerSequence = (seqName) => {
    if (seqName === 'WAKE_UP') {
      setAction('SLEEPING');
      setDirection('RIGHT'); // Gato dormindo de lado fica melhor (modo pãozinho)
      setTimeout(() => setAction('WAKE_UP'), 2500);
      setTimeout(() => setAction('STRETCH'), 4500);
      setTimeout(() => {
        setAction('IDLE');
        setDirection('DOWN'); // Acorda e olha pro usuário
      }, 7000);
    }
    if (seqName === 'HUNTING') {
      setAction('CROUCH_WIGGLE');
      setDirection('RIGHT');
      setTimeout(() => {
        setAction('POUNCE');
        setPosition(prev => ({ x: prev.x + (direction === 'RIGHT' ? 10 : -10), y: prev.y }));
      }, 2000);
      setTimeout(() => setAction('ROLL'), 2500);
      setTimeout(() => setAction('IDLE'), 3500);
    }
    if (seqName === 'AMBUSH') {
      const isRightEdge = Math.random() > 0.5;
      const edgeX = isRightEdge ? 28 : -28;
      const edgeY = Math.floor(Math.random() * 40) - 20;
      
      setAction('RUN');
      setDirection(isRightEdge ? 'RIGHT' : 'LEFT');
      setPosition({ x: edgeX, y: edgeY });

      setTimeout(() => {
        setDirection(isRightEdge ? 'LEFT' : 'RIGHT');
        setAction('CROUCH');

        setTimeout(() => {
          setAction('LUNGE');
          setPosition({ x: 0, y: 0 });

          setTimeout(() => {
            setAction('TIRED');
          }, 400); 
        }, 3000); 
      }, 800); 
    }
    if (seqName === 'BUG_CATCH') {
      const limitX = 25;
      const limitY = 20;
      const randomX = Math.floor(Math.random() * limitX * 2) - limitX;
      const randomY = Math.floor(Math.random() * limitY * 2) - limitY;

      const dx = randomX - position.x;
      const dy = randomY - position.y;
      
      let newDir = 'DOWN';
      if (Math.abs(dx) > Math.abs(dy)) {
        newDir = dx > 0 ? 'RIGHT' : 'LEFT';
      } else {
        newDir = dy > 0 ? 'DOWN' : 'UP';
      }

      setAction('RUN');
      setDirection(newDir);
      setPosition({ x: randomX, y: randomY });

      setTimeout(() => {
        setAction('BUG_CATCH');
        if (newDir === 'UP' || newDir === 'DOWN') setDirection('RIGHT');
        setTimeout(() => setAction('IDLE'), 3000); 
      }, 800); 
    }
    if (seqName === 'STARTLE') {
      setAction('STARTLE_JUMP');
      setTimeout(() => setAction('CROUCH'), 800); 
    }
    if (seqName === 'BIRTHDAY_EAT') {
      setAction('WALK'); // Simula ela andando pro bolo
      setTimeout(() => {
        setAction('EAT_TREAT');
      }, 1000); 
    }
  };

  const handleSendMessage = (message) => {
    hideChat()
    
    // Despacha a mensagem para a EventEngine interceptar palavras-chave
    const isIntercepted = handleKeywordEvents(message, {
      showChat,
      setEffects,
      triggerSequence,
      setDirection,
      setAction
    });

    if (isIntercepted) return; // Se a Engine retornar true, não precisamos do backend (ex: Festa)

    fetch(`${API_URL}/interact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
      .then(res => res.json())
      .then(data => showChat(data.reply, message.includes('!')))
      .catch(err => {
        console.error(err)
        showChat("Ih... perdi a conexão. Minha memória tá péssima.")
      })
  }

  // Define a transição CSS baseada na ação
  const getTransitionStyle = () => {
    if (action === 'ZOOMIES') return 'transform 0.25s cubic-bezier(0.17, 0.67, 0.23, 1.25)'; // Bouncy zig-zag
    if (action === 'LUNGE') return 'transform 0.3s cubic-bezier(0.1, 0.9, 0.2, 1)'; // Bote muito rápido
    if (action === 'POUNCE') return 'transform 0.5s linear'; // O pulo parabólico é feito pelo LERP, o translado é linear
    if (action === 'RUN') return 'transform 0.8s linear';
    return 'transform 2s linear';
  };

  return (
    <div className="app-container">
      <DevMenu 
        setAction={setAction}
        setDirection={setDirection}
        setPetState={setPetState}
        triggerSequence={triggerSequence}
      />
      <PixelRoom>
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
          className="pet-wrapper"
          style={{
            transform: `translate(${position.x}vw, ${position.y}vh)`,
            transition: getTransitionStyle()
          }}
        >
          <ChatBubble
            text={chat.text}
            isVisible={chat.isVisible}
            onHide={hideChat}
          />

          {effects.cake && (
            <div className="cake-container">
              🎂
            </div>
          )}

          <div className="interaction-hitbox" onClick={() => triggerSequence('WAKE_UP')}></div>
          <PetSprite
            mood={petState.mood}
            action={action}
            direction={chat.isVisible ? 'DOWN' : direction}
          />
        </div>
      </PixelRoom>

      <MobileUIOverlay onSendMessage={handleSendMessage} />
    </div>
  )
}


export default App
