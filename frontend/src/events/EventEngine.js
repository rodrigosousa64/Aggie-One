import { triggerStartle } from './StartleEvent';
import { triggerBirthday } from './BirthdayEvent';

export const handleKeywordEvents = (message, callbacks) => {
  const lowerMsg = message.toLowerCase();
  
  // Checa eventos de aniversário
  if (lowerMsg.includes('aniversario') || lowerMsg.includes('aniversário')) {
    return triggerBirthday(callbacks);
  }

  // Checa susto
  if (lowerMsg.includes('!')) {
    return triggerStartle(callbacks);
  }

  return false; // Nenhum evento interceptou
};
