export const triggerBirthday = ({ showChat, setEffects, triggerSequence, setDirection }) => {
  // 1. Reação imediata
  setDirection('DOWN');
  showChat("Miau! Onde estão meus balões e meu bolo?!", true);
  
  // 2. Dispara Balões no React DOM
  setEffects(prev => ({ ...prev, balloons: true }));
  
  // Remove os balões do DOM depois de 7s para não pesar memória e permitir rodar de novo
  setTimeout(() => {
    setEffects(prev => ({ ...prev, balloons: false }));
  }, 7000);

  // 3. Zoomies de pura alegria (corre freneticamente)
  triggerSequence('ZOOMIES');
  
  // 4. Depois que o Zoomies acalma, o bolo dropa
  setTimeout(() => {
    setEffects(prev => ({ ...prev, cake: true }));
    showChat("BOLO!!! 🐟", true);
    triggerSequence('BIRTHDAY_EAT');

    // 5. Some o bolo depois dela comer e ela volta ao normal
    setTimeout(() => {
      setEffects(prev => ({ ...prev, cake: false }));
      showChat("Prrr... Estava delicioso!", false); // false fará o cat voltar ao WALK e depois IDLE
    }, 4500);

  }, 4500);

  return true;
};
