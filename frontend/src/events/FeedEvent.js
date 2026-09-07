export const triggerFeed = ({ triggerSequence, setStats, showChat }) => {
  const phrases = [
    "Sachê!! *bate a cauda*",
    "Finalmente! Tava definhando aqui...",
    "Mrrrp! Era hora!",
  ];
  showChat(phrases[Math.floor(Math.random() * phrases.length)]);
  
  triggerSequence('BIRTHDAY_EAT'); // Usando BIRTHDAY_EAT que já tem animação
  
  setStats(prev => ({
    ...prev,
    hunger:    Math.min(100, prev.hunger    + 30),
    energy:    Math.min(100, prev.energy    + 15),
    affection: Math.min(100, prev.affection + 10),
  }));
  
  return true;
};
