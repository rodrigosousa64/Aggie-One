export const DanceWiggle = {
  getTargets: (action, frame) => {
    // Dança frenética: wiggles rápidos e intensos agachadinha (twerk/shake)
    const wiggleAmount = (frame % 2 === 0) ? 0.25 : -0.25;
    
    return {
      wiggleAngle: wiggleAmount,
      sitDrop: 0.8, // Agachada para dar sustentação
      stretchX: 1.15, // Bem esticada pros lados
      stretchY: 0.85 // Bem achatada
    };
  }
};
