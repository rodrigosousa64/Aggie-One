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
  ],
  RISOTO: [
    "O cheiro tá incrível... agora me dá minha cota de camarão antes que eu aplique um processo por apropriação indébita!",
    "A Agatha na cozinha é uma deusa gastronômica. Só falta ela lembrar que gatos também apreciam frutos do mar nobres, miau!",
    "Hummm... Risoto de Camarão? Você come camarão e me dá bolinha de ração seca? Isso é opressão felina pura!",
    "Eu finjo que sou educada, mas se cair um camarão no chão... vira propriedade do tapete em 0.2 segundos."
  ],
  DIREITO: [
    "Artigo 1º da Constituição Felina: Sentar em cima do Vade Mecum aberto enquanto a Agatha estuda é um direito adquirido inalienável.",
    "Menos de 10 minutos de estudo e eu já estou aceitando ser sua assessora jurídica... mas meus honorários são cobrados em Churu!",
    "Processo? Estresse? Recursos? Esquece isso 5 minutos e vem me dar atenção, futura Excelentíssima Doutora!",
    "Aquele calhamaço de folhas parece pesado... perfeito pra eu usar de travesseiro quentinho enquanto você surta com a prova."
  ],
  BOLO: [
    "Bolo de cenoura? Cenoura é legume, logo esse bolo é fitness! Você come a parte com chocolate e me dá um petisco pra compensar!",
    "A casa tá com cheirinho de bolo... Agatha, se você não dividir comigo, vou arranhar o pé do sofá (brincadeira... ou não).",
    "Gato não pode comer chocolate, e eu acho isso uma injustiça divina. Faça uma versão de sachê de carne imediatamente!"
  ],
  SONO: [
    "Você dorme até quase meio-dia e quer vir reclamar do meu cochilo de 18 horas diárias? Hipocrisia, dona Agatha!",
    "Ai minha lombar... a sua também tá estalando? Duas velhinhas no mesmo recinto, uma gata laranja e uma universitária estressada.",
    "Bom dia só se o sachê já estiver no prato. Caso contrário, desliga a luz e volta pro edredom que ainda tá cedo."
  ],
  SERIES: [
    "Meu plano de assalto à La Casa de Papel: invadir o armário da despensa e roubar 50 caixas de sachê. Meu codinome é 'Tóquio de Pelúcia'!",
    "Vai ver filme de novo? Senta com a postura certa na cama que a sua coluna agradece, viu Agatha.",
    "Filme de casamento de novo? O único casamento eterno garantido por aqui sou eu e o meio desse tapete quentinho."
  ],
  MUSICA: [
    "Mrrrup... 🎵 'Vouuu... pedir mais um sachê pra você me dar...' 🎵 Tim Bernardes ficaria orgulhoso do meu timbre felino!",
    "Se você soltar Anavitória no acústico, eu ronrono em Ré Menor pra te acompanhar na cantoria.",
    "Eu miando às 3 da manhã é praticamente uma performance conceitual de MPB!"
  ],
  AMOR: [
    "Você é a melhor mãe humana do mundo! (E a única que sabe abrir o sachê sem me fazer esperar muito).",
    "Ele me programou com tanto amor pra você que às vezes nem parece que sou feita de pixels. Você é muito especial, Agatha.",
    "Sou seu presentinho de aniversário eterno. Um pouco folgada, cheia de gênio forte, mas completamente apaixonada por você!"
  ]
};

export const triggerLore = ({ showChat, setDirection }, type) => {
  setDirection('DOWN'); // Olha pro usuário
  const phrases = PHRASES[type];
  showChat(phrases[Math.floor(Math.random() * phrases.length)]);
  return true;
};
