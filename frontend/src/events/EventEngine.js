import { triggerStartle } from './StartleEvent';
import { triggerBirthday } from './BirthdayEvent';
import { triggerFeed } from './FeedEvent';
import { triggerLore } from './LoreEvent';
import { triggerMatrix } from './MatrixEvent';
import { triggerDetective } from './DetectiveEvent';
import { triggerClothing } from './ClothingEvent';
import { getCachedBrainConfig } from '../services/brainService';

export const handleKeywordEvents = (message, callbacks) => {
  const lowerMsg = message.toLowerCase();
  
  const brain = getCachedBrainConfig();
  if (!brain || !brain.commands) return false;

  for (const cmd of brain.commands) {
    // Separa as palavras-chave (ex: "hack,matrix,frio")
    const keywords = cmd.keywords.split(',').map(k => k.trim().toLowerCase());
    
    // Verifica se a mensagem contém alguma das palavras-chave
    if (keywords.some(k => lowerMsg.includes(k))) {
      
      // Se houver uma frase cadastrada no banco, faz a gata falar na hora
      if (cmd.reply_text) {
        callbacks.showChat(cmd.reply_text, true);
      }
      
      // Roteador de Eventos Frontend
      switch (cmd.event_type) {
        case 'BIRTHDAY':
          return triggerBirthday(callbacks);
        case 'STARTLE':
          return triggerStartle(callbacks);
        case 'FEED':
          return triggerFeed(callbacks);
        case 'LORE_CREATOR':
          return triggerLore(callbacks, 'CREATOR');
        case 'LORE_AGATHA':
          return triggerLore(callbacks, 'AGATHA');
        case 'LORE_RISOTO':
          return triggerLore(callbacks, 'RISOTO');
        case 'LORE_DIREITO':
          return triggerLore(callbacks, 'DIREITO');
        case 'LORE_BOLO':
          return triggerLore(callbacks, 'BOLO');
        case 'LORE_SONO':
          return triggerLore(callbacks, 'SONO');
        case 'LORE_SERIES':
          return triggerLore(callbacks, 'SERIES');
        case 'LORE_MUSICA':
          return triggerLore(callbacks, 'MUSICA');
        case 'LORE_AMOR':
          return triggerLore(callbacks, 'AMOR');
        case 'MATRIX':
          return triggerMatrix(callbacks);
        case 'DETECTIVE':
          return triggerDetective(callbacks);
        case 'CLOTHING_PARTY_HAT':
          return triggerClothing(callbacks, 'party_hat');
        case 'CLOTHING_BOWTIE':
          return triggerClothing(callbacks, 'bowtie');
        case 'CLOTHING_COLLAR':
          return triggerClothing(callbacks, 'collar');
        case 'CLOTHING_SUNGLASSES':
          return triggerClothing(callbacks, 'sunglasses');
        case 'CLOTHING_SCARF':
          return triggerClothing(callbacks, 'scarf');
        case 'CLOTHING_NONE':
          return triggerClothing(callbacks, 'none');
        default:
          return false;
      }
    }
  }

  return false; // Nenhum evento interceptou
};
