export const EatTreat = {
  getTargets: (action, frame) => {
    // Senta perto do chão (sitDrop 3)
    // Faz a escala Y subir e descer rapidamente simulando mastigação
    const eatBob = frame % 2 === 0 ? 0.95 : 1.05;
    return { 
      sitDrop: 3, 
      stretchY: eatBob, 
      stretchX: 1.05 // Fica levemente "gordinha" comendo
    };
  }
};
