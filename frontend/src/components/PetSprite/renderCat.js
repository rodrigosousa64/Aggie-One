import { COLORS, DIMENSIONS } from './constants';
import { drawDown, drawUp, drawRight, drawLeft } from './directions';
import { AnimationEngine } from './animations/AnimationEngine';

export const renderCat = (ctx, x, y, direction, frame, action, mood, lerpState = {}) => {
  const { size } = DIMENSIONS;
  const { orange, sweatBlue } = COLORS;

  const isCrouching = action === 'CROUCH';
  const isLunge = action === 'LUNGE' || action === 'POUNCE';
  const isBugCatching = action === 'BUG_CATCH';
  const isMoving = action === 'WALK' || action === 'RUN' || isLunge;
  const isSitting = action === 'SIT' || action === 'SIT_LOAF' || action === 'GROOM' || isBugCatching || isCrouching || action === 'SLEEPING' || action === 'WAKE_UP';
  const isTired = action === 'TIRED';
  
  // Animation calculations
  const pantBob = isTired && frame % 2 === 0 ? 1 : 0;
  const groomBob = action === 'GROOM' && frame % 2 !== 0 ? 1 : 0;
  const groomPaw = action === 'GROOM' && frame % 2 !== 0 ? -2 : 0;
  // Pega variáveis interpoladas do lerpState, com fallbacks caso não existam
  const { 
    sitDrop = isSitting ? (isCrouching ? 4 : 2) : 0, 
    jumpLift = action === 'JUMP' && (frame === 1 || frame === 2) ? -4 : 0,
    stretchX = 1,
    stretchY = 1,
    rollAngle = 0,
    wiggleAngle = 0,
    crouchAmount = isCrouching ? 1 : 0
  } = lerpState;

  // For crouching colors, blend based on crouchAmount
  const bodyColor = crouchAmount > 0.5 ? '#0a0a0a' : orange;
  const darkBodyColor = crouchAmount > 0.5 ? '#000000' : COLORS.darkOrange;

  const offsets = {
    pantBob,
    groomBob,
    groomPaw,
    sitDrop,
    jumpLift,
    isSitting,
    isMoving,
    isTired,
    isCrouching,
    crouchAmount,
    bodyColor,
    darkBodyColor,
    action
  };

  let currentDirection = AnimationEngine.getDirectionOverride(action, direction, frame);

  ctx.save();
  // 1. Move para o centro (aplicando os offsets verticais suaves)
  ctx.translate(x, y + sitDrop * size + jumpLift * size);
  
  // 2. Aplica rotações suaves (Wiggle e Roll)
  ctx.rotate(wiggleAngle + rollAngle);

  // 3. Aplica o alongamento (Stretch)
  ctx.scale(stretchX, stretchY);

  // Draw Base Body normal
  ctx.fillStyle = bodyColor;
  if (isSitting) {
    // Corpo mais "gordinho/baixo" quando senta
    ctx.fillRect(-4.5 * size, -2 * size, 9 * size, 5 * size);
  } else {
    // Corpo normal
    ctx.fillRect(-4 * size, (-3 + pantBob) * size, 8 * size, 6 * size);
  }

  // Draw direction specific features
  switch (currentDirection) {
    case 'DOWN':
      drawDown(ctx, size, frame, action, mood, offsets);
      break;
    case 'UP':
      drawUp(ctx, size, frame, action, mood, offsets);
      break;
    case 'RIGHT':
      drawRight(ctx, size, frame, action, mood, offsets);
      break;
    case 'LEFT':
      drawLeft(ctx, size, frame, action, mood, offsets);
      break;
    default:
      drawDown(ctx, size, frame, action, mood, offsets);
      break;
  }

  // Extra Effects from Modular Engine
  AnimationEngine.drawExtras(ctx, action, currentDirection, frame, size, orange);
  
  if (isTired) {
    ctx.fillStyle = sweatBlue;
    if (currentDirection === 'DOWN' || currentDirection === 'RIGHT') {
      ctx.fillRect(2 * size, (-7 + pantBob) * size, size, 1.5 * size);
    } else if (currentDirection === 'LEFT') {
      ctx.fillRect(-3 * size, (-7 + pantBob) * size, size, 1.5 * size);
    }
  }

  ctx.restore();
};
