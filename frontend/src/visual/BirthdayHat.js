export const BirthdayHat = {
  id: 'BIRTHDAY_HAT',
  label: 'Chapéu de Aniversário',
  defaultDuration: null,
  hasSceneEffect: true,
  draw: (ctx, size, direction) => {
    // Mapa de posição da cabeça por direção (espelha os valores reais de directions.js)
    // DOWN: orelhas em (-4,-6) e (2,-6) → centro x=0
    // RIGHT: rosto em (2,-4,4,4), orelhas em (1,-6) e (4,-6) → centro x=4
    // LEFT: rosto em (-6,-4,4,4), orelhas em (-3,-6) e (-6,-6) → centro x=-4
    const head = {
      DOWN:  { x: 0,          topY: -6 * size },
      UP:    { x: 0,          topY: -6 * size },
      RIGHT: { x: 4 * size,   topY: -6 * size },
      LEFT:  { x: -4 * size,  topY: -6 * size },
    }[direction] || { x: 0, topY: -6 * size };

    ctx.save();
    // Chapéu cônico acima da cabeça
    ctx.fillStyle = '#3b82f6'; // azul
    ctx.beginPath();
    ctx.moveTo(head.x,           head.topY - 4 * size); // ponta
    ctx.lineTo(head.x - 2*size,  head.topY);            // base esq
    ctx.lineTo(head.x + 2*size,  head.topY);            // base dir
    ctx.fill();
    // Aba
    ctx.fillRect(head.x - 2.5*size, head.topY, 5*size, 0.7*size);
    // Pompom
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(head.x - 0.5*size, head.topY - 5*size, size, size);
    ctx.restore();
  }
};
