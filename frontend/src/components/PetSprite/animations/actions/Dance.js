export const Dance = {
  getTargets: (action, frame) => {
    // Dança básica em pé: balanço lateral e pulinhos suaves
    const isEven = frame % 2 === 0;
    
    return {
      wiggleAngle: isEven ? 0.15 : -0.15,
      sitDrop: isEven ? 0.4 : 0, // Pula e agacha no ritmo da música
      stretchY: isEven ? 0.95 : 1.05, // Efeito sanfona (squash and stretch)
      stretchX: isEven ? 1.05 : 0.95
    };
  }
};
