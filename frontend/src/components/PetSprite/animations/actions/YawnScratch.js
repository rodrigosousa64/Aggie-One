export const Yawn = {
  getTargets: (action, frame) => {
    // Cabeça levemente pra trás (torsoScaleY e stretchY), sentada.
    return {
      sitDrop: 1, // Sentada
      stretchY: 1.1, // Levanta o peito/cabeça
      crouchAmount: 0,
      stretchX: 1,
      // Passamos a informação para fechar os olhos no directions.js e abrir a boca
    };
  }
};

export const Scratch = {
  getTargets: (action, frame) => {
    return {
      sitDrop: 1,
      crouchAmount: 0.2, // Levemente encolhida
      stretchY: 0.9,
      // A patinha sobe a cada 2 frames (movimento muito rápido)
      scratchPaw: frame % 2 === 0 ? 1 : 0
    };
  }
};
