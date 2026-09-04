export const BugCatch = {
  getTargets: () => {
    return {
      sitDrop: 2, 
      stretchY: 1.25,
      jumpLift: -1.2
    };
  },
  getDirectionOverride: (direction, frame) => {
    if (direction === 'UP' || direction === 'DOWN') {
      return 'RIGHT';
    }
    return direction;
  },
  drawExtras: (ctx, direction, frame, size, orange) => {
    ctx.fillStyle = orange;
    // Patinhas balançando no ar rapidamente
    const swatY1 = frame % 2 === 0 ? -5 * size : -7 * size;
    const swatY2 = frame % 2 === 0 ? -7 * size : -5 * size;
    
    if (direction === 'RIGHT') {
      ctx.fillRect(4 * size, swatY1, 2 * size, 2 * size);
      ctx.fillRect(6 * size, swatY2, 2 * size, 2 * size);
    } else if (direction === 'LEFT') {
      ctx.fillRect(-5 * size, swatY1, 2 * size, 2 * size);
      ctx.fillRect(-7 * size, swatY2, 2 * size, 2 * size);
    }
  }
};
