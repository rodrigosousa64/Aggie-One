import { COLORS } from './constants';

const drawBirthdayHat = (ctx, size, headX, headY) => {
  // Base Rosa
  ctx.fillStyle = '#ec4899'; 
  ctx.fillRect(headX - 1.5*size, headY - size, 3*size, size);
  // Meio Amarelo (Listra)
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(headX - 1*size, headY - 2*size, 2*size, size);
  // Topo Rosa
  ctx.fillStyle = '#ec4899'; 
  ctx.fillRect(headX - 0.5*size, headY - 3*size, 1*size, size);
  // Pom-pom Branco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(headX - 0.5*size, headY - 4*size, 1*size, 1*size);
};

export const drawDown = (ctx, size, frame, action, mood, offsets) => {
  const { pantBob, groomBob, groomPaw, isSitting, isMoving, isCrouching, bodyColor, darkBodyColor } = offsets;
  const { black } = COLORS;
  const orange = bodyColor || COLORS.orange;
  const darkOrange = darkBodyColor || COLORS.darkOrange;

  ctx.fillStyle = orange;
  ctx.fillRect(-4*size, (-6 + pantBob + groomBob)*size, 2*size, 3*size); // orelha esq
  ctx.fillRect(2*size, (-6 + pantBob + groomBob)*size, 2*size, 3*size);  // orelha dir
  
  ctx.fillStyle = darkOrange;
  ctx.fillRect(-3*size, (-4 + pantBob + groomBob)*size, 6*size, 4*size); // rosto interno
  
  if (isCrouching) {
    // Big glowing eyes staring from the dark
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-2.5*size, (-3.5 + pantBob + groomBob)*size, 2*size, 2*size);
    ctx.fillRect(0.5*size, (-3.5 + pantBob + groomBob)*size, 2*size, 2*size);
    ctx.fillStyle = black;
    ctx.fillRect(-1.5*size, (-3.5 + pantBob + groomBob)*size, 0.5*size, 2*size);
    ctx.fillRect(1.5*size, (-3.5 + pantBob + groomBob)*size, 0.5*size, 2*size);
  } else {
    ctx.fillStyle = black;
    const eyesClosed = action === 'SLEEPING' || action === 'STRETCH' || mood === 'dormindo';
    if (eyesClosed) {
      ctx.fillRect(-2*size, (-2.5 + pantBob + groomBob)*size, 1.5*size, 0.5*size);
      ctx.fillRect(1*size, (-2.5 + pantBob + groomBob)*size, 1.5*size, 0.5*size);
    } else {
      ctx.fillRect(-2*size, (-3 + pantBob + groomBob)*size, 1.5*size, 1.5*size); // olho esq
      ctx.fillRect(1*size, (-3 + pantBob + groomBob)*size, 1.5*size, 1.5*size);  // olho dir
      if (mood === 'brava') {
        ctx.beginPath();
        ctx.moveTo(-2.5*size, (-4 + pantBob + groomBob)*size);
        ctx.lineTo(-0.5*size, (-3.5 + pantBob + groomBob)*size);
        ctx.moveTo(0.5*size, (-3.5 + pantBob + groomBob)*size);
        ctx.lineTo(2.5*size, (-4 + pantBob + groomBob)*size);
        ctx.strokeStyle = black;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  
  ctx.fillStyle = orange;
  
  if (action !== 'SIT_LOAF') {
    if (isSitting) {
      // Patas dianteiras retas
      ctx.fillRect(-3*size, 3*size, 2*size, 2*size);
      if (action === 'GROOM') {
        ctx.fillRect(1*size, (3 + groomPaw)*size, 2*size, 2*size); // lambendo patinha direita
      } else {
        ctx.fillRect(1*size, 3*size, 2*size, 2*size);
      }
      // Patinhas traseiras levemente visíveis na lateral
      ctx.fillRect(-5.5*size, 2*size, 2*size, 3*size);
      ctx.fillRect(3.5*size, 2*size, 2*size, 3*size);
      // Rabo enrolado
      ctx.fillRect(4.5*size, 0, 3*size, size);
    } else {
      const leftLegY = isMoving && (frame === 1 || frame === 2) ? 4*size : 3*size;
      const rightLegY = isMoving && (frame === 3 || frame === 0) ? 4*size : 3*size;
      ctx.fillRect(-3*size, leftLegY, 2*size, 2*size);
      ctx.fillRect(1*size, rightLegY, 2*size, 2*size);
      ctx.fillRect(4*size, (-4 + pantBob)*size, size, 4*size); // rabo
    }
  }

  // Desenhar Chapéu de Aniversário no topo da cabeça!
  drawBirthdayHat(ctx, size, 0, (-4 + pantBob + groomBob) * size);
};

export const drawUp = (ctx, size, frame, action, mood, offsets) => {
  const { pantBob, isSitting, isMoving, bodyColor, darkBodyColor } = offsets;
  const orange = bodyColor || COLORS.orange;
  const darkOrange = darkBodyColor || COLORS.darkOrange;

  ctx.fillStyle = orange;
  ctx.fillRect(-4*size, (-6 + pantBob)*size, 2*size, 3*size);
  ctx.fillRect(2*size, (-6 + pantBob)*size, 2*size, 3*size);
  
  ctx.fillStyle = darkOrange;
  ctx.fillRect(-3*size, (-4 + pantBob)*size, 6*size, 4*size);
  
  ctx.fillStyle = orange;
  if (action !== 'SIT_LOAF') {
    if (isSitting) {
      // Sentado de costas
      ctx.fillRect(-5.5*size, 2*size, 2*size, 3*size);
      ctx.fillRect(3.5*size, 2*size, 2*size, 3*size);
      // Rabo enrolado ou balançando
      ctx.fillRect(1*size, 3*size, 5*size, size); // rabo curvado
    } else {
      const tailBob = isMoving && (frame === 1 || frame === 3) ? -1 : 0;
      ctx.fillRect(-1*size, (-7 + pantBob)*size + tailBob*size, 2*size, 5*size);
      const leftLegY = isMoving && (frame === 1 || frame === 2) ? 4*size : 3*size;
      const rightLegY = isMoving && (frame === 3 || frame === 0) ? 4*size : 3*size;
      ctx.fillRect(-3*size, leftLegY, 2*size, 2*size);
      ctx.fillRect(1*size, rightLegY, 2*size, 2*size);
    }
  }

  drawBirthdayHat(ctx, size, 0, (-4 + pantBob) * size);
};

export const drawRight = (ctx, size, frame, action, mood, offsets) => {
  const { pantBob, groomBob, groomPaw, isSitting, isMoving, isCrouching, bodyColor } = offsets;
  const { black } = COLORS;
  const orange = bodyColor || COLORS.orange;

  ctx.fillStyle = orange;
  ctx.fillRect(2*size, (-4 + pantBob + groomBob)*size, 4*size, 4*size); // rosto
  ctx.fillRect(1*size, (-6 + pantBob + groomBob)*size, 2*size, 2*size); // orelha
  ctx.fillRect(4*size, (-6 + pantBob + groomBob)*size, 2*size, 2*size); // orelha
  
  if (isCrouching) {
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(3.5*size, (-3.5 + pantBob + groomBob)*size, 2*size, 2*size);
    ctx.fillStyle = black;
    ctx.fillRect(4.5*size, (-3.5 + pantBob + groomBob)*size, 0.5*size, 2*size);
  } else {
    ctx.fillStyle = black;
    const eyesClosed = action === 'SLEEPING' || action === 'STRETCH' || mood === 'dormindo';
    if (eyesClosed) {
      ctx.fillRect(4*size, (-2.5 + pantBob + groomBob)*size, 1.5*size, 0.5*size);
    } else {
      ctx.fillRect(4*size, (-3 + pantBob + groomBob)*size, 1.5*size, 1.5*size);
      if (mood === 'brava') {
        ctx.beginPath();
        ctx.moveTo(3.5*size, (-4 + pantBob + groomBob)*size);
        ctx.lineTo(5.5*size, (-3.5 + pantBob + groomBob)*size);
        ctx.strokeStyle = black;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  
  ctx.fillStyle = orange;
  if (action !== 'SIT_LOAF') {
    if (isSitting) {
      // Rabo enrolado
      ctx.fillRect(-6*size, 1*size, 3*size, 2*size);
      ctx.fillRect(-8*size, 0, 2*size, 3*size);
      // Patas dianteiras
      if (action === 'GROOM') {
        ctx.fillRect(3*size, (3 + groomPaw)*size, 2*size, 2*size); // lambendo
      } else if (action !== 'BUG_CATCH') {
        ctx.fillRect(3*size, 3*size, 2*size, 2*size);
      }
      // Pata traseira dobrada
      ctx.fillRect(-3*size, 1*size, 4*size, 4*size);
    } else {
      const tailBob = isMoving && (frame === 1 || frame === 3) ? -1 : 0;
      ctx.fillRect(-7*size, (-4 + pantBob)*size + tailBob*size, 4*size, 2*size);
      ctx.fillRect(-7*size, (-5 + pantBob)*size + tailBob*size, 2*size, 2*size);
      const frontLegX = isMoving && frame % 2 === 0 ? 3*size : 2*size;
      const backLegX = isMoving && frame % 2 !== 0 ? -3*size : -2*size;
      ctx.fillRect(frontLegX, 3*size, 2*size, 2*size);
      ctx.fillRect(backLegX, 3*size, 2*size, 2*size);
    }
  }

  drawBirthdayHat(ctx, size, 4*size, (-4 + pantBob + groomBob) * size);
};

export const drawLeft = (ctx, size, frame, action, mood, offsets) => {
  const { pantBob, groomBob, groomPaw, isSitting, isMoving, isCrouching, bodyColor } = offsets;
  const { black } = COLORS;
  const orange = bodyColor || COLORS.orange;

  ctx.fillStyle = orange;
  ctx.fillRect(-6*size, (-4 + pantBob + groomBob)*size, 4*size, 4*size); // rosto
  ctx.fillRect(-3*size, (-6 + pantBob + groomBob)*size, 2*size, 2*size); // orelha
  ctx.fillRect(-6*size, (-6 + pantBob + groomBob)*size, 2*size, 2*size); // orelha
  
  if (isCrouching) {
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-5.5*size, (-3.5 + pantBob + groomBob)*size, 2*size, 2*size);
    ctx.fillStyle = black;
    ctx.fillRect(-5*size, (-3.5 + pantBob + groomBob)*size, 0.5*size, 2*size);
  } else {
    ctx.fillStyle = black;
    const eyesClosed = action === 'SLEEPING' || action === 'STRETCH' || mood === 'dormindo';
    if (eyesClosed) {
      ctx.fillRect(-5.5*size, (-2.5 + pantBob + groomBob)*size, 1.5*size, 0.5*size);
    } else {
      ctx.fillRect(-5.5*size, (-3 + pantBob + groomBob)*size, 1.5*size, 1.5*size);
      if (mood === 'brava') {
        ctx.beginPath();
        ctx.moveTo(-3.5*size, (-4 + pantBob + groomBob)*size);
        ctx.lineTo(-5.5*size, (-3.5 + pantBob + groomBob)*size);
        ctx.strokeStyle = black;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  
  ctx.fillStyle = orange;
  if (action !== 'SIT_LOAF') {
    if (isSitting) {
      // Rabo enrolado
      ctx.fillRect(3*size, 1*size, 3*size, 2*size);
      ctx.fillRect(6*size, 0, 2*size, 3*size);
      // Patas dianteiras
      if (action === 'GROOM') {
        ctx.fillRect(-5*size, (3 + groomPaw)*size, 2*size, 2*size); // lambendo
      } else if (action !== 'BUG_CATCH') {
        ctx.fillRect(-5*size, 3*size, 2*size, 2*size);
      }
      // Pata traseira dobrada
      ctx.fillRect(-1*size, 1*size, 4*size, 4*size);
    } else {
      const tailBob = isMoving && (frame === 1 || frame === 3) ? -1 : 0;
      ctx.fillRect(3*size, (-4 + pantBob)*size + tailBob*size, 4*size, 2*size);
      ctx.fillRect(5*size, (-5 + pantBob)*size + tailBob*size, 2*size, 2*size);
      const frontLegX = isMoving && frame % 2 === 0 ? -5*size : -4*size;
      const backLegX = isMoving && frame % 2 !== 0 ? 1*size : 0*size;
      ctx.fillRect(frontLegX, 3*size, 2*size, 2*size);
      ctx.fillRect(backLegX, 3*size, 2*size, 2*size);
    }
  }

  drawBirthdayHat(ctx, size, -4*size, (-4 + pantBob + groomBob) * size);
};
