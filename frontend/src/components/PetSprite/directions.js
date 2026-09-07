import { COLORS } from './constants';

const drawEye = (ctx, x, y, width, height, blinkScaleY, pupilMode, isCrouch = false) => {
  const h = height * blinkScaleY;
  const cy = y + height / 2;
  const topY = cy - h / 2;

  if (isCrouch) {
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x, topY, width, h);
    ctx.fillStyle = COLORS.black;
    if (pupilMode === 'dilated') {
      ctx.beginPath();
      ctx.ellipse(x + width/2, cy, width*0.4, h*0.4, 0, 0, Math.PI*2);
      ctx.fill();
    } else {
      ctx.fillRect(x + width/2 - width*0.125, topY, width*0.25, h);
    }
    return;
  }

  if (pupilMode === 'slit') {
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x, topY, width, h);
    ctx.fillStyle = COLORS.black;
    ctx.fillRect(x + width/2 - width*0.15, topY, width*0.3, h);
  } else if (pupilMode === 'dilated') {
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x, topY, width, h);
    ctx.fillStyle = COLORS.black;
    ctx.beginPath();
    ctx.ellipse(x + width/2, cy, width*0.45, h*0.45, 0, 0, Math.PI*2);
    ctx.fill();
  } else {
    ctx.fillStyle = COLORS.black;
    ctx.fillRect(x, topY, width, h);
  }
};

const drawProceduralTail = (ctx, size, startX, startY, direction, action, mood, time, bodyColor) => {
  if (action === 'SIT_LOAF') {
    return; // Em SIT_LOAF a cauda fica completamente escondida
  }

  let speed = 0.002;
  let amplitude = 1.5 * size;
  let frequency = 0.05;
  let tailLength = 4 * size; // Cauda reduzida (um quadrado a menos)

  if (mood === 'brava') {
    speed = 0.015;
    amplitude = 0.5 * size;
    frequency = 0.15;
  } else if (mood === 'feliz') {
    speed = 0.002;
    amplitude = 3 * size;
    frequency = 0.08;
  }

  // Se estiver de lado (LEFT/RIGHT), o movimento da cauda deve ser bem mais sutil e contido
  if (direction === 'LEFT' || direction === 'RIGHT') {
    amplitude *= 0.3; // Reduz bastante o sobe-e-desce da onda
    frequency *= 0.7; // Suaviza a curva
  }

  ctx.fillStyle = bodyColor || COLORS.orange;
  
  if (direction === 'DOWN') {
    // Isso garante que a cauda seja desenhada ATRÁS do corpo,
    // então se ela balançar para a esquerda, ela vai para trás das costas dela e não por cima do rosto!
    ctx.globalCompositeOperation = 'destination-over';
    tailLength -= 3 * size; // Deixando ainda MENOR a pedido do usuário (apenas 1 quadrado restante)
  }

  const steps = 15; // Quantidade de bloquinhos (pixels)
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const currentLength = t * tailLength;
    // Multiplicamos por 't' para ancorar a base da cauda (offset = 0 na base) e balançar mais a ponta
    const offset = Math.sin(time * speed + i * frequency) * amplitude * t;
    
    let px = startX;
    let py = startY;

    if (direction === 'DOWN') {
      py -= currentLength * 0.9; // Sobe
      px += currentLength * 0.2 + offset; // Curva levemente para a direita para não ficar um bastão reto
    } else if (direction === 'UP') {
      py -= currentLength; // Sobe reto (visto de costas)
      px += offset;
    } else if (direction === 'RIGHT') {
      px -= currentLength;
      py -= offset + currentLength * 0.2;
    } else if (direction === 'LEFT') {
      px += currentLength;
      py -= offset + currentLength * 0.2;
    }

    // Grid snap para ficar pixel art (chunky)
    const gridX = Math.round(px / size) * size;
    const gridY = Math.round(py / size) * size;
    ctx.fillRect(gridX, gridY, 2*size, 2*size);
  }
  
  if (direction === 'DOWN') {
    ctx.globalCompositeOperation = 'source-over'; // Muito importante resetar para o próximo frame!
  }
};

// ============================================================
// Helper de Acessórios — hardcoded junto das funções de direção
// para que os offsets de pantBob/groomBob sejam aplicados corretamente.
// headX e headY são o ponto de referência do topo da cabeça, já
// calculados por cada função de direção antes de chamar este helper.
// ============================================================
const drawAccessory = (ctx, size, accessory, headX, headY, eyeY, direction) => {
  if (!accessory) return;

  if (accessory === 'BIRTHDAY_HAT') {
    // Chapéu cônico rosa e amarelo
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(headX - 1.5*size, headY - size,  3*size, size); // base
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(headX - 1*size,   headY - 2*size, 2*size, size); // meio
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(headX - 0.5*size, headY - 3*size, 1*size, size); // topo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX - 0.5*size, headY - 4*size, 1*size, 1*size); // pompom
  }

  if (accessory === 'THUG_GLASSES') {
    if (direction === 'UP') return;
    ctx.fillStyle = '#111';
    if (direction === 'RIGHT') {
      // olho em (4,-3): lente frente
      ctx.fillRect(eyeY !== null ? headX - 0.5*size : headX - 0.5*size, eyeY, 3*size, 1.5*size);
      ctx.fillRect(headX - 2.5*size, eyeY + 0.5*size, 2*size, 0.5*size); // haste
    } else if (direction === 'LEFT') {
      // olho em (-5.5,-3)
      ctx.fillRect(headX - 2.5*size, eyeY, 3*size, 1.5*size); // lente
      ctx.fillRect(headX + 0.5*size, eyeY + 0.5*size, 2*size, 0.5*size); // haste
    } else { // DOWN
      // olhos em (-2,-3) e (1,-3)
      ctx.fillRect(-3.5*size, eyeY, 3*size, 1.5*size); // lente esq
      ctx.fillRect(0.5*size,  eyeY, 3*size, 1.5*size); // lente dir
      ctx.fillRect(-0.5*size, eyeY + 0.5*size, 1*size, 0.5*size); // ponte
    }
  }

  if (accessory === 'DETECTIVE_HAT') {
    // Chapéu Fedora estilo noir — cinza escuro bem distinto da cor laranja da Aggie
    ctx.fillStyle = '#374151'; // cinza chumbo
    ctx.fillRect(headX - 4*size,   headY,          8*size, 1*size);   // aba
    ctx.fillRect(headX - 2.5*size, headY - 2.5*size, 5*size, 2.5*size); // coroa
    ctx.fillStyle = '#1f2937'; // cinza mais escuro
    ctx.fillRect(headX - 2.5*size, headY - 1*size, 5*size, 0.8*size); // faixa
    // Detalhe branco na faixa (clássico fedora)
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(headX - 1*size, headY - 1*size, 2*size, 0.4*size);
    if (direction === 'RIGHT') {
      ctx.fillStyle = '#4b5563';
      ctx.fillRect(headX - 4*size, headY - 1*size, 1.5*size, 1*size);
    } else if (direction === 'LEFT') {
      ctx.fillStyle = '#4b5563';
      ctx.fillRect(headX + 2.5*size, headY - 1*size, 1.5*size, 1*size);
    }
  }

  if (accessory === 'PARTY_HAT') {
    // Chapéu de festa colorido (diferente do BIRTHDAY_HAT)
    ctx.fillStyle = '#ef4444'; // vermelho
    ctx.fillRect(headX - 1*size, headY - size, 2*size, size); // base
    ctx.fillStyle = '#fbbf24'; // amarelo
    ctx.fillRect(headX - 0.8*size, headY - 2*size, 1.6*size, size); // meio
    ctx.fillStyle = '#3b82f6'; // azul
    ctx.fillRect(headX - 0.5*size, headY - 3*size, 1*size, size); // topo
    ctx.fillStyle = '#ffffff'; // pompom
    ctx.fillRect(headX - 0.4*size, headY - 3.8*size, 0.8*size, 0.8*size);
  }

  if (accessory === 'BOWTIE') {
    // Gravata borboleta preta
    if (direction === 'UP') return;
    ctx.fillStyle = '#111111';
    
    if (direction === 'RIGHT') {
      ctx.fillRect(headX + 1.5*size, headY + 3.8*size, 0.6*size, 0.6*size); // Centro
      ctx.fillRect(headX + 0.5*size, headY + 3.5*size, 1*size, 1.2*size); // Asa trás
      ctx.fillRect(headX + 2.1*size, headY + 3.5*size, 0.8*size, 1.2*size); // Asa frente
    } else if (direction === 'LEFT') {
      ctx.fillRect(headX - 2.1*size, headY + 3.8*size, 0.6*size, 0.6*size); // Centro
      ctx.fillRect(headX - 2.9*size, headY + 3.5*size, 0.8*size, 1.2*size); // Asa frente
      ctx.fillRect(headX - 1.5*size, headY + 3.5*size, 1*size, 1.2*size); // Asa trás
    } else { // DOWN
      ctx.fillRect(headX - 0.4*size, headY + 3.8*size, 0.8*size, 0.8*size); // Centro
      ctx.fillRect(headX - 1.6*size, headY + 3.5*size, 1.2*size, 1.4*size); // Lado esquerdo
      ctx.fillRect(headX + 0.4*size, headY + 3.5*size, 1.2*size, 1.4*size); // Lado direito
    }
  }

  if (accessory === 'COLLAR') {
    // Colar com pingente dourado
    ctx.fillStyle = '#dc2626'; // vermelho escuro
    if (direction === 'RIGHT') {
      ctx.fillRect(headX - 2*size, headY + 3.8*size, 4*size, 0.6*size); // colar
      ctx.fillStyle = '#fbbf24'; // Pingente
      ctx.fillRect(headX + 1.3*size, headY + 4.2*size, 0.8*size, 0.8*size);
    } else if (direction === 'LEFT') {
      ctx.fillRect(headX - 2*size, headY + 3.8*size, 4*size, 0.6*size); // colar
      ctx.fillStyle = '#fbbf24'; // Pingente
      ctx.fillRect(headX - 2.1*size, headY + 4.2*size, 0.8*size, 0.8*size);
    } else if (direction === 'UP') {
      ctx.fillRect(headX - 2.5*size, headY + 3.8*size, 5*size, 0.6*size); // apenas o colar
    } else { // DOWN
      ctx.fillRect(headX - 2.5*size, headY + 3.8*size, 5*size, 0.6*size); // colar
      ctx.fillStyle = '#fbbf24'; // Pingente
      ctx.fillRect(headX - 0.5*size, headY + 4.2*size, 1*size, 1*size);
    }
  }

  if (accessory === 'SUNGLASSES') {
    // Óculos de sol pretos redondinhos
    if (direction === 'UP') return;
    ctx.fillStyle = '#000000';
    if (direction === 'RIGHT') {
      ctx.fillRect(headX - 0.5*size, eyeY - 0.5*size, 3*size, 2*size); // lente
      ctx.fillRect(headX - 2.5*size, eyeY, 2*size, 0.5*size); // haste
    } else if (direction === 'LEFT') {
      ctx.fillRect(headX - 2.5*size, eyeY - 0.5*size, 3*size, 2*size); // lente
      ctx.fillRect(headX + 0.5*size, eyeY, 2*size, 0.5*size); // haste
    } else { // DOWN
      ctx.fillRect(-3.5*size, eyeY - 0.5*size, 3*size, 2*size); // lente esq
      ctx.fillRect(0.5*size, eyeY - 0.5*size, 3*size, 2*size); // lente dir
      ctx.fillRect(-0.5*size, eyeY + 0.2*size, 1*size, 0.5*size); // ponte
    }
  }

  if (accessory === 'SCARF') {
    // Cachecol azul
    ctx.fillStyle = '#3b82f6';
    // Ao redor do pescoço
    ctx.fillRect(headX - 2.5*size, headY + 3.5*size, 5*size, 1.2*size);
    // Ponta pendurada
    if (direction === 'RIGHT') {
      ctx.fillRect(headX - 1*size, headY + 4*size, 1.2*size, 3*size);
    } else if (direction === 'LEFT') {
      ctx.fillRect(headX - 0.2*size, headY + 4*size, 1.2*size, 3*size);
    } else { // DOWN
      ctx.fillRect(headX - 0.6*size, headY + 4.5*size, 1.2*size, 3*size);
    }
  }
};

export const drawDown = (ctx, size, frame, action, mood, offsets, accessory = null) => {
  const { pantBob, groomBob, groomPaw, isSitting, isMoving, isCrouching, bodyColor, darkBodyColor, blinkScaleY, earTwitchLeft, earTwitchRight, pupilMode, time } = offsets;
  const { black } = COLORS;
  const orange = bodyColor || COLORS.orange;
  const darkOrange = darkBodyColor || COLORS.darkOrange;

  ctx.fillStyle = orange;
  // orelha esq
  ctx.save();
  ctx.translate(-3*size, (-6 + pantBob + groomBob)*size + 3*size);
  ctx.rotate(earTwitchLeft);
  ctx.fillRect(-1*size, -3*size, 2*size, 3*size);
  ctx.restore();

  // orelha dir
  ctx.save();
  ctx.translate(3*size, (-6 + pantBob + groomBob)*size + 3*size);
  ctx.rotate(earTwitchRight);
  ctx.fillRect(-1*size, -3*size, 2*size, 3*size);
  ctx.restore();
  
  ctx.fillStyle = darkOrange;
  ctx.fillRect(-3*size, (-4 + pantBob + groomBob)*size, 6*size, 4*size); // rosto interno
  
  if (isCrouching) {
    // Big glowing eyes staring from the dark
    const eyeCenterY2 = (-3.5 + pantBob + groomBob) * size + 1 * size;
    drawEye(ctx, -2.5*size, eyeCenterY2 - size, 2*size, 2*size, blinkScaleY, pupilMode, true);
    drawEye(ctx, 0.5*size, eyeCenterY2 - size, 2*size, 2*size, blinkScaleY, pupilMode, true);
  } else {
    ctx.fillStyle = black;
    const eyesClosed = action === 'SLEEPING' || action === 'STRETCH' || action === 'YAWN' || mood === 'dormindo';
    if (eyesClosed) {
      ctx.fillRect(-2*size, (-2.5 + pantBob + groomBob)*size, 1.5*size, 0.5*size);
      ctx.fillRect(1*size, (-2.5 + pantBob + groomBob)*size, 1.5*size, 0.5*size);
    } else {
      const eyeCenterY = (-3 + pantBob + groomBob) * size + 0.75 * size;
      drawEye(ctx, -2*size, eyeCenterY - 0.75*size, 1.5*size, 1.5*size, blinkScaleY, pupilMode, false);
      drawEye(ctx, 1*size, eyeCenterY - 0.75*size, 1.5*size, 1.5*size, blinkScaleY, pupilMode, false);
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
      } else if (action === 'SCRATCH') {
        ctx.fillRect(1*size, 3*size, 2*size, 2*size); 
        ctx.fillRect(3.5*size, (1 - offsets.scratchPaw * 3)*size, 2*size, 2*size); // Pata traseira coçando
      } else if (action === 'EAT_TREAT') {
        ctx.fillRect(1 * size, (3 + offsets.scratchPaw * 2.2) * size, 2 * size, 2 * size);
      } else {
        ctx.fillRect(1*size, 3*size, 2*size, 2*size);
      }
      // Patinhas traseiras levemente visíveis na lateral
      if (action !== 'SCRATCH') {
        ctx.fillRect(-5.5*size, 2*size, 2*size, 3*size);
        ctx.fillRect(3.5*size, 2*size, 2*size, 3*size);
      } else {
        ctx.fillRect(-5.5*size, 2*size, 2*size, 3*size);
      }
      // Rabo enrolado
      ctx.fillRect(4.5*size, 0, 3*size, size);
    } else {
      const leftLegY = isMoving && (frame === 1 || frame === 2) ? 4*size : 3*size;
      const rightLegY = isMoving && (frame === 3 || frame === 0) ? 4*size : 3*size;
      ctx.fillRect(-3*size, leftLegY, 2*size, 2*size);
      ctx.fillRect(1*size, rightLegY, 2*size, 2*size);
      // Cauda DOWN conectada à lateral direita do corpo
      drawProceduralTail(ctx, size, 3.5*size, (-1 + pantBob)*size, 'DOWN', action, mood, time, bodyColor);
    }
  } else {
    // Cauda DOWN em pé (IDLE/WALK)
    drawProceduralTail(ctx, size, 3.5*size, 0, 'DOWN', action, mood, time, bodyColor);
  }

  // headX=0, headY=topo das orelhas acompanhando os bobs
  drawAccessory(ctx, size, accessory, 0, (-4 + pantBob + groomBob)*size, (-3 + pantBob + groomBob)*size, 'DOWN');
};

export const drawUp = (ctx, size, frame, action, mood, offsets, accessory = null) => {
  const { pantBob, isSitting, isMoving, bodyColor, darkBodyColor, earTwitchLeft, earTwitchRight, pupilMode, time } = offsets;
  const orange = bodyColor || COLORS.orange;
  const darkOrange = darkBodyColor || COLORS.darkOrange;

  ctx.fillStyle = orange;
  ctx.save();
  ctx.translate(-3*size, (-6 + pantBob)*size + 3*size);
  ctx.rotate(earTwitchLeft);
  ctx.fillRect(-1*size, -3*size, 2*size, 3*size);
  ctx.restore();

  ctx.save();
  ctx.translate(3*size, (-6 + pantBob)*size + 3*size);
  ctx.rotate(earTwitchRight);
  ctx.fillRect(-1*size, -3*size, 2*size, 3*size);
  ctx.restore();
  
  ctx.fillStyle = darkOrange;
  ctx.fillRect(-3*size, (-4 + pantBob)*size, 6*size, 4*size);
  
  ctx.fillStyle = orange;
  if (action !== 'SIT_LOAF') {
    if (isSitting) {
      // Sentado de costas
      if (action === 'SCRATCH') {
        ctx.fillRect(-5.5*size, 2*size, 2*size, 3*size);
        ctx.fillRect(3.5*size, (1 - offsets.scratchPaw * 3)*size, 2*size, 3*size); // Pata direita coçando
      } else {
        ctx.fillRect(-5.5*size, 2*size, 2*size, 3*size);
        ctx.fillRect(3.5*size, 2*size, 2*size, 3*size);
      }
      // Rabo enrolado ou balançando
      ctx.fillRect(1*size, 3*size, 5*size, size); // rabo curvado
    } else {
      const tailBob = isMoving && (frame === 1 || frame === 3) ? -1 : 0;
      // Cauda UP sai da base da coluna e sobe (em frente às costas)
      drawProceduralTail(ctx, size, 0, (3 + pantBob)*size + tailBob*size, 'UP', action, mood, time, bodyColor);
      const leftLegY = isMoving && (frame === 1 || frame === 2) ? 4*size : 3*size;
      const rightLegY = isMoving && (frame === 3 || frame === 0) ? 4*size : 3*size;
      ctx.fillRect(-3*size, leftLegY, 2*size, 2*size);
      ctx.fillRect(1*size, rightLegY, 2*size, 2*size);
    }
  } else {
    drawProceduralTail(ctx, size, 0, 3*size, 'UP', action, mood, time, bodyColor);
  }

  drawAccessory(ctx, size, accessory, 0, (-4 + pantBob)*size, null, 'UP');
};

export const drawRight = (ctx, size, frame, action, mood, offsets, accessory = null) => {
  const { pantBob, groomBob, groomPaw, isSitting, isMoving, isCrouching, bodyColor, blinkScaleY, earTwitchLeft, earTwitchRight, pupilMode, time } = offsets;
  const { black } = COLORS;
  const orange = bodyColor || COLORS.orange;

  ctx.fillStyle = orange;
  ctx.fillRect(2*size, (-4 + pantBob + groomBob)*size, 4*size, 4*size); // rosto
  
  // esq (back)
  ctx.save();
  ctx.translate(2*size, (-4 + pantBob + groomBob)*size);
  ctx.rotate(earTwitchLeft);
  ctx.fillRect(-1*size, -2*size, 2*size, 2*size);
  ctx.restore();

  // dir (front)
  ctx.save();
  ctx.translate(5*size, (-4 + pantBob + groomBob)*size);
  ctx.rotate(earTwitchRight);
  ctx.fillRect(-1*size, -2*size, 2*size, 2*size);
  ctx.restore();
  
  if (isCrouching) {
    const eyeCenterY2 = (-3.5 + pantBob + groomBob) * size + 1 * size;
    drawEye(ctx, 3.5*size, eyeCenterY2 - size, 2*size, 2*size, blinkScaleY, pupilMode, true);
  } else {
    ctx.fillStyle = black;
    const eyesClosed = action === 'SLEEPING' || action === 'STRETCH' || action === 'YAWN' || mood === 'dormindo';
    if (eyesClosed) {
      ctx.fillRect(4*size, (-2.5 + pantBob + groomBob)*size, 1.5*size, 0.5*size);
    } else {
      const eyeCenterY = (-3 + pantBob + groomBob) * size + 0.75 * size;
      drawEye(ctx, 4*size, eyeCenterY - 0.75*size, 1.5*size, 1.5*size, blinkScaleY, pupilMode, false);
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
      } else if (action === 'SCRATCH') {
        ctx.fillRect(3*size, 3*size, 2*size, 2*size);
        ctx.fillRect(3.5*size, (1 - offsets.scratchPaw * 3)*size, 2*size, 2*size); // traseira levantando para orelha
      } else if (action !== 'BUG_CATCH') {
        ctx.fillRect(3*size, 3*size, 2*size, 2*size);
      }
      // Pata traseira dobrada
      if (action !== 'SCRATCH') {
        ctx.fillRect(-3*size, 1*size, 4*size, 4*size);
      } else {
        ctx.fillRect(-3*size, 2*size, 3*size, 3*size);
      }
    } else {
      const tailBob = isMoving && (frame === 1 || frame === 3) ? -1 : 0;
      drawProceduralTail(ctx, size, -4*size, (-2 + pantBob)*size + tailBob*size, 'RIGHT', action, mood, time, bodyColor);
      const frontLegX = isMoving && frame % 2 === 0 ? 3*size : 2*size;
      const backLegX = isMoving && frame % 2 !== 0 ? -3*size : -2*size;
      ctx.fillRect(frontLegX, 3*size, 2*size, 2*size);
      ctx.fillRect(backLegX, 3*size, 2*size, 2*size);
    }
  } else {
    drawProceduralTail(ctx, size, -4*size, 0, 'RIGHT', action, mood, time, bodyColor);
  }

  // headX=4*size (centro do rosto pra direita), headY acompanha pantBob+groomBob
  drawAccessory(ctx, size, accessory, 4*size, (-4 + pantBob + groomBob)*size, (-3 + pantBob + groomBob)*size, 'RIGHT');
};

export const drawLeft = (ctx, size, frame, action, mood, offsets, accessory = null) => {
  const { pantBob, groomBob, groomPaw, isSitting, isMoving, isCrouching, bodyColor, blinkScaleY, earTwitchLeft, earTwitchRight, pupilMode, time } = offsets;
  const { black } = COLORS;
  const orange = bodyColor || COLORS.orange;

  ctx.fillStyle = orange;
  ctx.fillRect(-6*size, (-4 + pantBob + groomBob)*size, 4*size, 4*size); // rosto
  
  // front (esq)
  ctx.save();
  ctx.translate(-5*size, (-4 + pantBob + groomBob)*size);
  ctx.rotate(earTwitchLeft);
  ctx.fillRect(-1*size, -2*size, 2*size, 2*size);
  ctx.restore();

  // back (dir)
  ctx.save();
  ctx.translate(-2*size, (-4 + pantBob + groomBob)*size);
  ctx.rotate(earTwitchRight);
  ctx.fillRect(-1*size, -2*size, 2*size, 2*size);
  ctx.restore();
  
  if (isCrouching) {
    const eyeCenterY2 = (-3.5 + pantBob + groomBob) * size + 1 * size;
    drawEye(ctx, -5.5*size, eyeCenterY2 - size, 2*size, 2*size, blinkScaleY, pupilMode, true);
  } else {
    ctx.fillStyle = black;
    const eyesClosed = action === 'SLEEPING' || action === 'STRETCH' || action === 'YAWN' || mood === 'dormindo';
    if (eyesClosed) {
      ctx.fillRect(-5.5*size, (-2.5 + pantBob + groomBob)*size, 1.5*size, 0.5*size);
    } else {
      const eyeCenterY = (-3 + pantBob + groomBob) * size + 0.75 * size;
      drawEye(ctx, -5.5*size, eyeCenterY - 0.75*size, 1.5*size, 1.5*size, blinkScaleY, pupilMode, false);
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
      } else if (action === 'SCRATCH') {
        ctx.fillRect(-5*size, 3*size, 2*size, 2*size);
        ctx.fillRect(-5.5*size, (1 - offsets.scratchPaw * 3)*size, 2*size, 2*size); // Perna coçando
      } else if (action !== 'BUG_CATCH') {
        ctx.fillRect(-5*size, 3*size, 2*size, 2*size);
      }
      // Pata traseira dobrada
      if (action !== 'SCRATCH') {
        ctx.fillRect(-1*size, 1*size, 4*size, 4*size);
      } else {
        ctx.fillRect(0*size, 2*size, 3*size, 3*size);
      }
    } else {
      const tailBob = isMoving && (frame === 1 || frame === 3) ? -1 : 0;
      drawProceduralTail(ctx, size, 4*size, (-2 + pantBob)*size + tailBob*size, 'LEFT', action, mood, time, bodyColor);
      const frontLegX = isMoving && frame % 2 === 0 ? -5*size : -4*size;
      const backLegX = isMoving && frame % 2 !== 0 ? 1*size : 0*size;
      ctx.fillRect(frontLegX, 3*size, 2*size, 2*size);
      ctx.fillRect(backLegX, 3*size, 2*size, 2*size);
    }
  } else {
    drawProceduralTail(ctx, size, 4*size, 0, 'LEFT', action, mood, time, bodyColor);
  }

  // headX=-4*size (centro do rosto pra esquerda)
  drawAccessory(ctx, size, accessory, -4*size, (-4 + pantBob + groomBob)*size, (-3 + pantBob + groomBob)*size, 'LEFT');
};

