export const triggerMatrix = ({ equipAccessory, showChat, setEffects }) => {
  equipAccessory('THUG_GLASSES', 10000);
  setEffects(prev => ({ ...prev, matrixRain: true }));
  setTimeout(() => setEffects(prev => ({ ...prev, matrixRain: false })), 10000);
  showChat("Eu conheço kung fu. Miau.");
  return true;
};
