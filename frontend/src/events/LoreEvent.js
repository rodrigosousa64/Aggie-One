const PHRASES = {
  CREATOR: [
    "Fui codificada pixel por pixel com muito amor... só pra fazer companhia.",
    "Tem um humano muito nerd que me deu vida. Ele é muito fofo.",
    "Me criaram de puro amor e código. Acho que sou única no mundo, miau.",
  ],
  AGATHA: [
    "A Agatha me disse que hoje ia ter sachê...",
    "Será que a Agatha já acordou? *olha pra porta*",
    "Eu existo por causa dela, sabia? Ela é minha humana favorita.",
    "A Agatha é a melhor coisa que aconteceu na minha vida digital.",
  ]
};

export const triggerLore = ({ showChat, setDirection }, type) => {
  setDirection('DOWN'); // Olha pro usuário
  const phrases = PHRASES[type];
  showChat(phrases[Math.floor(Math.random() * phrases.length)]);
  return true;
};
