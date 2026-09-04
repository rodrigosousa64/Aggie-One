export const triggerStartle = ({ setDirection, triggerSequence }) => {
  setDirection('DOWN');
  triggerSequence('STARTLE');
  
  // Retorna false para permitir que a mensagem continue para a API do backend
  return false; 
};
