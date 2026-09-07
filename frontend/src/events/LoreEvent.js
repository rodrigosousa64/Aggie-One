const PHRASES = {
  CREATOR: [
    "Fui codificada pixel por pixel com muito amor... só pra fazer companhia.",
    "Tem um humano muito nerd que me deu vida. Ele é muito fofo.",
    "Me criaram de puro amor e código. Acho que sou única no mundo, miau.",
  ]
};

export const triggerLore = ({ showChat, setDirection }, type) => {
  setDirection('DOWN'); // Olha pro usuário
  
  if (PHRASES[type]) {
    const phrases = PHRASES[type];
    showChat(phrases[Math.floor(Math.random() * phrases.length)]);
  }
  return true;
};
