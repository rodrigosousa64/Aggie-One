export const Startle = {
  getTargets: (action, frame) => {
    // Pulo vertical incrivelmente alto
    return { jumpLift: -8 };
  },
  
  drawExtras: (ctx, direction, frame, size, orange) => {
    // Efeito de pelos espetados (Halloween cat)
    ctx.fillStyle = orange;
    
    // Pequenos triângulos/blocos ao redor do corpo todo para simular pelos ouriçados
    const spikes = [
      [-5, -4], [-4.5, -5], [-3, -6], [-1, -6], [1, -6], [3, -6], [4.5, -5], [5, -4],
      [-5.5, -2], [5.5, -2], [-5.5, 0], [5.5, 0], [-5.5, 2], [5.5, 2]
    ];
    
    spikes.forEach(([x, y]) => {
      ctx.fillRect(x * size, y * size, 1.5 * size, 1.5 * size);
    });

    // Olhos arregalados de susto (Brancos enormes com pupila minúscula)
    if (direction === 'DOWN') {
      ctx.fillStyle = '#ffffff';
      // Olho esquerdo arregalado
      ctx.fillRect(-2.5*size, -4*size, 2.5*size, 2.5*size);
      // Olho direito arregalado
      ctx.fillRect(0.5*size, -4*size, 2.5*size, 2.5*size);
      
      // Pupilas minúsculas
      ctx.fillStyle = '#000000';
      ctx.fillRect(-1.5*size, -3*size, 0.5*size, 0.5*size);
      ctx.fillRect(1.5*size, -3*size, 0.5*size, 0.5*size);
    }
  }
};
