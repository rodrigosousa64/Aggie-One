let sessionStart = 0;
let lastTick = 0;

function eatElapsed() {
  const now = Date.now();
  if (now - lastTick > 500) sessionStart = now;
  lastTick = now;
  return (now - sessionStart) / 1000;
}

export const EatTreat = {
  getDirectionOverride: () => "DOWN",

  getTargets: () => {
    const t = eatElapsed();

    if (t < 0.45) {
      const lean = t / 0.45;
      return {
        sitDrop: 3,
        stretchX: 1.06 + lean * 0.04,
        stretchY: 0.94 - lean * 0.05,
        scratchPaw: lean * 0.35,
        wiggleAngle: 0,
      };
    }

    if (t < 0.9) {
      const scoop = Math.sin(((t - 0.45) / 0.45) * Math.PI);
      return {
        sitDrop: 3,
        stretchX: 1.1,
        stretchY: 0.9,
        scratchPaw: 0.35 + scoop * 0.85,
        wiggleAngle: scoop * 0.05,
      };
    }

    if (t < 2.6) {
      const chew = Math.sin(t * 16);
      return {
        sitDrop: 3,
        stretchX: 1.12 + chew * 0.035,
        stretchY: 0.93 + chew * 0.1,
        scratchPaw: 0.2 + Math.max(0, chew) * 0.15,
        wiggleAngle: chew * 0.07,
      };
    }

    return {
      sitDrop: 3.15,
      stretchX: 1.18,
      stretchY: 0.86,
      scratchPaw: 0,
      wiggleAngle: 0,
    };
  },

  drawExtras: (ctx, direction, frame, size) => {
    const t = eatElapsed();
    const treatLeft =
      t < 0.9 ? 1 : t < 2.6 ? Math.max(0.12, 1 - (t - 0.9) / 1.7) : 0;

    if (treatLeft > 0.08) {
      const w = 3.2 * size * treatLeft;
      const h = 1.8 * size * treatLeft;
      const x = -w / 2;
      const y = 6.2 * size;
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#fda4af";
      ctx.fillRect(x + 0.4 * size * treatLeft, y + 0.35 * size * treatLeft, w * 0.45, h * 0.4);
      ctx.fillStyle = "#fff7ed";
      ctx.fillRect(x + w * 0.62, y + 0.25 * size * treatLeft, 0.45 * size, 0.45 * size);
    }

    if (t >= 0.9 && t < 2.6) {
      ctx.fillStyle = "#fdba74";
      for (let i = 0; i < 4; i++) {
        const a = t * 9 + i * 1.7;
        const px = Math.round((Math.sin(a) * 3.2 * size) / size) * size;
        const py = Math.round((3.8 * size + Math.abs(Math.cos(a * 0.8)) * 2.4 * size) / size) * size;
        ctx.fillRect(px, py, size, size);
      }
    }
  },
};
