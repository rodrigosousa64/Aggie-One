export const SitGroom = {
  getTargets: (action, frame) => {
    return { 
      sitDrop: 1.5, 
      stretchY: 0.95, // Abaixa a cabecinha levemente
      // Levanta a pata até o rosto devagar (1 e 2 sobe, 0 e 3 desce)
      scratchPaw: (frame === 1 || frame === 2) ? 0.7 : 0.2
    };
  }
};
