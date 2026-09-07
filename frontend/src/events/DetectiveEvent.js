export const triggerDetective = ({ equipAccessory, showChat, setAction }) => {
  equipAccessory('DETECTIVE_HAT', 12000);
  setAction('CROUCH');
  showChat("Hmm... tem inseto suspeito por aqui.");
  setTimeout(() => setAction('IDLE'), 4000);
  return true;
};
