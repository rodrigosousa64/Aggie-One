export const ThugGlasses = {
  id: 'THUG_GLASSES',
  label: 'Óculos Thug Life',
  defaultDuration: null,
  hasSceneEffect: true,
  draw: (ctx, size, direction) => {
    if (direction === 'UP') return; // Não aparece de costas

    // Mapa de posição dos olhos por direção (espelha directions.js)
    // DOWN:  olho esq em (-2,-3), olho dir em (1,-3)
    // RIGHT: olho em (4,-3)
    // LEFT:  olho em (-5.5,-3)
    ctx.save();
    ctx.fillStyle = '#111';

    if (direction === 'RIGHT') {
      const eyeX = 4 * size;
      const eyeY = -3 * size;
      ctx.fillRect(eyeX - 0.5*size, eyeY, 2.5*size, 1.5*size); // lente
      ctx.fillRect(eyeX - 2.5*size, eyeY + 0.5*size, 2*size, 0.5*size); // haste
    } else if (direction === 'LEFT') {
      const eyeX = -5.5 * size;
      const eyeY = -3 * size;
      ctx.fillRect(eyeX - 0.5*size, eyeY, 2.5*size, 1.5*size); // lente
      ctx.fillRect(eyeX + 2*size, eyeY + 0.5*size, 2*size, 0.5*size); // haste
    } else { // DOWN
      const eyeY = -3 * size;
      ctx.fillRect(-3.5*size, eyeY, 3*size, 1.5*size); // lente esq  (cobre olho em -2,-3)
      ctx.fillRect(0.5*size,  eyeY, 3*size, 1.5*size); // lente dir (cobre olho em 1,-3)
      ctx.fillRect(-0.5*size, eyeY + 0.5*size, 1*size, 0.5*size); // ponte
    }
    ctx.restore();
  }
};
