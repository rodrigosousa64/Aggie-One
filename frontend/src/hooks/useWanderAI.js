import { useEffect, useRef } from 'react';
import { getBrainConfig } from '../services/brainService';
import { getPetTalk } from '../services/petService';

export function useWanderAI(stateMethods, triggerSequence, aiLocked) {
  const {
    action, setAction,
    chatVisibleRef,
    position, setPosition,
    petState, setPetState,
    stats, setStats,
    setDirection,
    lastTailChaseRef,
    showChat,
    isDraggingRef
  } = stateMethods;

  const brainConfigRef = useRef(null);

  // Carrega as configurações do cérebro no boot
  useEffect(() => {
    getBrainConfig().then(config => {
      brainConfigRef.current = config;
    });
  }, []);

  // Lógica de ações aleatórias (Andar, Correr, Sentar, Lamber, Cansar)
  useEffect(() => {
    let timeoutId;

    const getSetting = (key, fallback) => {
      if (!brainConfigRef.current || !brainConfigRef.current.settings) return fallback;
      const s = brainConfigRef.current.settings.find(x => x.key === key);
      return s ? s.value : fallback;
    };

    const tick = () => {
      // Re-agenda o próximo tick com base no config
      const nextInterval = getSetting('WANDER_INTERVAL_MS', 1500);
      timeoutId = setTimeout(tick, nextInterval);

      if (chatVisibleRef.current || aiLocked || isDraggingRef?.current) return;

      // Se energia muito baixa ou já estiver dormindo
      if (petState.mood === 'dormindo' || action === 'SIT_LOAF' || action === 'WAKE_UP') return;

      const groomStopChance = getSetting('GROOM_STOP_CHANCE', 0.6);
      const sitStopChance = getSetting('SIT_STOP_CHANCE', 0.4);
      let stateChangeChance = getSetting('STATE_CHANGE_CHANCE', 0.3);
      const hyperThreshold = getSetting('BOREDOM_HYPER_THRESHOLD', 45);

      if (stats.boredom > hyperThreshold) {
        // Se a chance no admin for 0.1, quer dizer que tem (1 - 0.1 = 0.9) 90% de chance de mudar!
        stateChangeChance = getSetting('BOREDOM_STATE_CHANGE', 0.1); 
      }

      // Controle de estados contínuos
      if (action === 'GROOM') {
        if (Math.random() > groomStopChance) setAction('IDLE');
        return; // Só pode mudar para IDLE
      }
      if (action === 'SIT') {
        if (Math.random() > sitStopChance) setAction('IDLE');
        return; // Só pode mudar para IDLE
      }

      // Se ela não estiver em IDLE, ela está executando alguma ação com tempo ou sequência.
      // Devemos esperar essa ação terminar antes de sortear uma nova!
      if (action !== 'IDLE') return;

      // X% de chance de mudar de estado se estiver IDLE ou WALK
      if (Math.random() > stateChangeChance) {
        
        // Verifica se a API já carregou o cérebro
        if (!brainConfigRef.current || !brainConfigRef.current.probabilities) return;
        
        // Criar uma cópia profunda para poder alterar os pesos temporariamente
        const probs = JSON.parse(JSON.stringify(brainConfigRef.current.probabilities));

        // Se tédio alto: Gata inquieta e hiperativa
        if (stats.boredom > hyperThreshold) {
           const tailChase = probs.find(p => p.action_name === 'TAIL_CHASE');
           const jump = probs.find(p => p.action_name === 'JUMP');
           const zoomies = probs.find(p => p.action_name === 'ZOOMIES');
           const walk = probs.find(p => p.action_name === 'WALK');
           const idle = probs.find(p => p.action_name === 'IDLE');
           const sit = probs.find(p => p.action_name === 'SIT');
           const loaf = probs.find(p => p.action_name === 'SIT_LOAF');
           
           // Adiciona peso de corrida se ela estiver entediada
           probs.push({ action_name: 'RUN', weight: 40 });

           if (tailChase) tailChase.weight += 60;
           if (jump) jump.weight += 40;
           if (zoomies) zoomies.weight += 20;
           if (walk) walk.weight += 60; // Muito mais propensa a andar pelo quarto
           
           // Não consegue ficar parada de tédio
           if (idle) idle.weight = Math.max(0, idle.weight - 20);
           if (sit) sit.weight = 0;
           if (loaf) loaf.weight = 0;
        } 
        // Se carinho alto (e não entediada): Gata carinhosa e tranquila
        else if (stats.affection > 80) {
           const loaf = probs.find(p => p.action_name === 'SIT_LOAF');
           const groom = probs.find(p => p.action_name === 'GROOM');
           if (loaf) loaf.weight += 60;
           if (groom) groom.weight += 40;
        }

        // SORTEIO PONDERADO (Weighted Random)
        const totalWeight = probs.reduce((sum, item) => sum + item.weight, 0);
        let randomNum = Math.random() * totalWeight;
        let selectedAction = 'IDLE';

        for (const item of probs) {
          randomNum -= item.weight;
          if (randomNum <= 0) {
            selectedAction = item.action_name;
            break;
          }
        }
        
        const sequences = ['WAKE_UP', 'HUNTING', 'AMBUSH', 'BUG_CATCH'];
        
        if (sequences.includes(selectedAction)) {
          triggerSequence(selectedAction);
        } else if (selectedAction === 'WALK' || selectedAction === 'RUN') {
          // Lógica de Movimento
          const isRun = selectedAction === 'RUN';
          
          let finalAction = selectedAction;
          if (isRun && stats.energy < 30) {
             finalAction = 'WALK'; 
          }
          
          setAction(finalAction);
          if (finalAction === 'RUN') {
             setStats(prev => ({ ...prev, energy: Math.max(0, prev.energy - 5) }));
          }
          
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

          const runMoveTimeMs = getSetting('RUN_MOVE_TIME_MS', 1500);
          const walkMoveTimeMs = getSetting('WALK_MOVE_TIME_MS', 3500);
          const moveTime = isRun ? runMoveTimeMs : walkMoveTimeMs;

          setTimeout(() => {
            setAction('IDLE');
          }, moveTime);
          
        } else {
          // Ações normais (SIT, GROOM, TAIL_CHASE, ZOOMIES)
          setAction(selectedAction);
          
          if (selectedAction === 'TAIL_CHASE') {
            setTimeout(() => setAction('IDLE'), 3000);
          } else if (selectedAction === 'JUMP') {
            setTimeout(() => setAction('IDLE'), 1000);
          } else if (selectedAction === 'YAWN' || selectedAction === 'SCRATCH') {
            setTimeout(() => setAction('IDLE'), 2000); // Bocejo e coçada duram 2s
          }
        }
      }
    };

    // Inicia o primeiro tick
    timeoutId = setTimeout(tick, 1500);

    return () => clearTimeout(timeoutId);
  }, [action, chatVisibleRef, position, petState.mood, stats.hunger, stats.energy, setAction, setDirection, setPosition, setStats, triggerSequence, aiLocked]);

  // Efeito especial: Zoomies (Corrida errática em zigue-zague)
  useEffect(() => {
    let zoomInterval;
    let stopTimeout;

    if (action === 'ZOOMIES') {
      setStats(prev => ({ ...prev, energy: Math.max(0, prev.energy - 10) }));
      
      getPetTalk("ACTION_ZOOMIES")
        .then(data => showChat(data.reply, true))
        .catch(err => console.log(err));
      
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
        setStats(prev => {
          const newEnergy = Math.max(0, prev.energy - 25);
          if (newEnergy < 15) {
            setPetState(p => ({ ...p, mood: 'dormindo' }));
            setAction('SIT_LOAF');
          } else {
            setAction('IDLE');
          }
          return { ...prev, energy: newEnergy };
        });
      }, 3000); // Zoomies duram 3 segundos
    }

    return () => {
      clearInterval(zoomInterval);
      clearTimeout(stopTimeout);
    };
  }, [action, setStats, setPosition, setDirection, setPetState, setAction]);

  // Efeito especial para falar frases baseado na ação
  const previousActionRef = useRef(action);
  
  useEffect(() => {
    if (action !== previousActionRef.current) {
      previousActionRef.current = action;
      
      if (brainConfigRef.current && brainConfigRef.current.phrases) {
        // Tenta achar frases onde a categoria seja exatamente o nome da Ação atual (ex: 'SIT', 'TAIL_CHASE')
        const phrases = brainConfigRef.current.phrases.filter(p => p.category === action);
        
        if (phrases.length > 0) {
          // Sorteio ponderado entre as frases daquela ação
          const totalWeight = phrases.reduce((sum, item) => sum + item.weight, 0);
          let randomNum = Math.random() * totalWeight;
          let phrase = phrases[0].text;
          
          for (const item of phrases) {
            randomNum -= item.weight;
            if (randomNum <= 0) {
              phrase = item.text;
              break;
            }
          }
          
          showChat(phrase, true);
        }
      }
    }
  }, [action, showChat]);

}
