export const triggerBirthday = ({ showChat, setEffects, triggerSequence, setDirection }) => {
  setDirection('DOWN');
  
  // 1. Dispara Balões e dá um pulinho
  setEffects(prev => ({ ...prev, balloons: true }));
  triggerSequence('JUMP');
  setTimeout(() => {
    setEffects(prev => ({ ...prev, balloons: false }));
  }, 25000); // 25s - Os balões vão ficar caindo durante quase toda a cena!

  // 2. Sequência de Falas (Diálogo Customizado)
  showChat("Feliz aniversário, Agatha!!! 21 aninhos, hein? 🎉", true, false, true);
  
  setTimeout(() => {
    showChat("O seu criador passou dias codando a Aggie (eu mesma) só pra ser o seu presente!", true, false, true);
    triggerSequence('GROOM_SHORT'); // Dá uma lambida de orgulho
  }, 4500);

  setTimeout(() => {
    showChat("Sou a melhor gata cibernética que você poderia ter ganhado. Miau!", true, false, true);
    triggerSequence('ROLL_SHORT'); // Rola no chão fofa
  }, 9500);

  // 3. Zoomies de pura alegria
  setTimeout(() => {
    triggerSequence('ZOOMIES');
  }, 13000);
  
  // 4. Depois do Zoomies, Dropa o bolo!
  setTimeout(() => {
    setEffects(prev => ({ ...prev, cake: true }));
    showChat("Mas enfim... CADE O MEU BOLO?! 🐟", true, false, true);
    triggerSequence('BIRTHDAY_EAT');
    
    // 5. Some o bolo depois de comer
    setTimeout(() => {
      setEffects(prev => ({ ...prev, cake: false }));
      showChat("Prrr... Agora vai lá comemorar seus 21! Te amo! ❤️", false, false, true); 
      triggerSequence('JUMP'); // Pulinho final de despedida
    }, 4500);

  }, 17500);

  return true;
};
