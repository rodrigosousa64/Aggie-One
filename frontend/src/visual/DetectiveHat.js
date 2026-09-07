export const DetectiveHat = {
  id: 'DETECTIVE_HAT',
  label: 'Chapéu de Detetive',
  defaultDuration: null,
  hasSceneEffect: false,
  draw: (ctx, size, direction) => {
    // Mapa de posição da cabeça por direção (espelha directions.js)
    // DOWN/UP: centro x=0, topo y=-6
    // RIGHT: centro x=4, topo y=-6
    // LEFT:  centro x=-4, topo y=-6
    const head = {
      DOWN:  { x: 0,          topY: -6 * size },
      UP:    { x: 0,          topY: -6 * size },
      RIGHT: { x: 4 * size,   topY: -6 * size },
      LEFT:  { x: -4 * size,  topY: -6 * size },
    }[direction] || { x: 0, topY: -6 * size };

    ctx.save();
    ctx.fillStyle = '#d97706'; // amber
    // Aba
    ctx.fillRect(head.x - 4*size, head.topY, 8*size, 1*size);
    // Coroa
    ctx.fillRect(head.x - 2.5*size, head.topY - 2.5*size, 5*size, 2.5*size);
    // Faixa
    ctx.fillStyle = '#92400e';
    ctx.fillRect(head.x - 2.5*size, head.topY - 1*size, 5*size, 0.8*size);
    // Detalhe de aba virada na perspectiva lateral
    if (direction === 'RIGHT') {
      ctx.fillStyle = '#b45309';
      ctx.fillRect(head.x - 4*size, head.topY - 1*size, 1.5*size, 1*size);
    } else if (direction === 'LEFT') {
      ctx.fillStyle = '#b45309';
      ctx.fillRect(head.x + 2.5*size, head.topY - 1*size, 1.5*size, 1*size);
    }
    ctx.restore();
  }
};
