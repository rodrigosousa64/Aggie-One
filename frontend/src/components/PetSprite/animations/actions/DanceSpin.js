export const DanceSpin = {
  getDirectionOverride: (direction, frame) => {
    // Gira mudando a direção do sprite progressivamente
    const dirs = ['DOWN', 'LEFT', 'UP', 'RIGHT'];
    return dirs[frame % 4];
  },

  getTargets: (action, frame) => {
    return {
      sitDrop: (frame % 2 === 0) ? 0.3 : 0, // Um pequeno pulinho a cada giro
      stretchY: 0.95,
      stretchX: 1.05
    };
  }
};
