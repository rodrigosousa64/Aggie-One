import { useEffect } from 'react';
import { getPetTalk, sendPetInteraction, updatePetState } from '../services/petService';
import { handleKeywordEvents } from '../events/EventEngine';

export function useChatAndEvents(petContext, triggerSequence) {
  const {
    action, setAction,
    stats, setStats,
    accessory, equipAccessory,
    setEffects,
    setDirection,
    setPetState,
    showChat, hideChat,
    chatVisibleRef, petMoodRef, statsRef
  } = petContext;

  // Loop de fala aleatória
  useEffect(() => {
    const talkInterval = setInterval(() => {
      if (Math.random() > 0.7 && !chatVisibleRef.current && petMoodRef.current !== 'dormindo') {
        const st = statsRef.current;
        let context = "RANDOM";
        if (st.hunger < 40) context = "HUNGRY";
        else if (st.energy < 30) context = "LOW_ENERGY";
        else if (st.anger > 50 || petMoodRef.current === 'brava' || petMoodRef.current === 'triste') context = "NEGATIVE";
        else if (st.boredom > 70) context = "BORED";

        getPetTalk(context)
          .then(data => showChat(data.reply))
          .catch(err => console.log("Sem resposta do backend", err));
      }
    }, 5000);
    return () => clearInterval(talkInterval);
  }, [chatVisibleRef, petMoodRef, statsRef, showChat]);

  // Page Visibility API
  useEffect(() => {
    let hideTime = 0;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        hideTime = Date.now();
      } else {
        if (hideTime > 0) {
          const timeHidden = Date.now() - hideTime;
          if (timeHidden > 60000) { // 1 minuto fora da aba
            setTimeout(() => {
              getPetTalk("TAB_RETURN")
                .then(data => showChat(data.reply, true))
                .catch(() => showChat("Ah, lembrou de mim?", true));
            }, 1000);
          }
          hideTime = 0;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [showChat]);

  const handleSendMessage = async (message) => {
    hideChat();
    
    // Despacha a mensagem para a EventEngine interceptar palavras-chave
    const isIntercepted = handleKeywordEvents(message, {
      showChat,
      setEffects,
      triggerSequence,
      setDirection,
      setAction,
      setStats,
      equipAccessory
    });

    if (isIntercepted) return;

    // Recusa mensagens se estiver muito brava
    if (statsRef.current.anger >= 80 || petMoodRef.current === 'brava') {
      if (Math.random() > 0.6) {
        setDirection('UP');
        showChat("...", false, true, true);
        setTimeout(() => showChat("Não quero conversar com você agora.", true), 1500);
        return;
      }
    }

    // Reduz tédio ao interagir
    setStats(prev => ({ ...prev, boredom: Math.max(0, prev.boredom - 20) }));

    // Sync de stats com o backend
    try {
      await updatePetState(stats, accessory);
    } catch (err) {
      console.warn("Sync de stats falhou, continuando...", err);
    }

    showChat("Pensando...", false, true, true); // Ativa o loading

    const localTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const lastEvent = accessory ? `Usando acessório: ${accessory}` : (action !== 'IDLE' ? `Fazendo ação: ${action}` : 'Nada de especial');

    sendPetInteraction(message, localTime, lastEvent)
      .then(data => {
        showChat(data.reply, message.includes('!'), false, true);
        if (data.commands && data.commands.length > 0) {
          data.commands.forEach(cmd => {
            if (cmd.type === 'EQUIP_ACCESSORY') equipAccessory(cmd.payload.id);
            if (cmd.type === 'TRIGGER_EVENT') triggerSequence(cmd.payload.name);
            if (cmd.type === 'SET_MOOD') setPetState(prev => ({ ...prev, mood: cmd.payload.mood }));
          });
        }
      })
      .catch(err => {
        console.error(err);
        showChat("Ih... perdi a conexão. Minha memória tá péssima.");
      });
  };

  return { handleSendMessage };
}
