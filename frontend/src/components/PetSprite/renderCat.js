import { COLORS, DIMENSIONS } from './constants';
import { drawDown, drawUp, drawRight, drawLeft } from './directions';
import { AnimationEngine } from './animations/AnimationEngine';

export const renderCat = (ctx, x, y, direction, frame, action, mood, lerpState = {}, accessory = null) => {
  const { size } = DIMENSIONS;
  const { orange, sweatBlue } = COLORS;

  const isCrouching = action === 'CROUCH';
  const isLunge = action === 'LUNGE' || action === 'POUNCE';
  const isBugCatching = action === 'BUG_CATCH';
  const isMoving = action === 'WALK' || action === 'RUN' || isLunge;
  const isEating = action === 'EAT_TREAT';
  const isSitting = action === 'SIT' || action === 'SIT_LOAF' || action === 'GROOM' || isBugCatching || isCrouching || action === 'SLEEPING' || action === 'WAKE_UP' || action === 'YAWN' || action === 'SCRATCH' || isEating;
  const isTired = false;
  
  // Animation calculations
  const pantBob = 0;
  const chewBob = isEating && frame % 2 !== 0;
  const groomBob = (action === 'GROOM' && frame % 2 !== 0) || chewBob ? 1 : 0;
  const groomPaw = action === 'GROOM' && frame % 2 !== 0 ? -2 : 0;
  // Pega variáveis interpoladas do lerpState, com fallbacks caso não existam
  const { 
    sitDrop = isSitting ? (isCrouching ? 4 : 2) : 0, 
    jumpLift = action === 'JUMP' && (frame === 1 || frame === 2) ? -4 : 0,
    stretchX = 1,
    stretchY = 1,
    rollAngle = 0,
    wiggleAngle = 0,
    crouchAmount = isCrouching ? 1 : 0,
    scratchPaw = 0,
    torsoScaleY = 1,
    blinkScaleY = 1,
    earTwitchLeft = 0,
    earTwitchRight = 0
  } = lerpState;

  // For crouching colors, blend based on crouchAmount
  const bodyColor = crouchAmount > 0.5 ? '#0a0a0a' : orange;
  const darkBodyColor = crouchAmount > 0.5 ? '#000000' : COLORS.darkOrange;

  let pupilMode = 'normal';
  if (mood === 'brava' || action === 'AMBUSH' || action === 'HUNTING') {
    pupilMode = 'slit';
  } else if (mood === 'com-fome') {
    pupilMode = 'dilated';
  }

  const time = Date.now();

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
    scratchPaw,
    bodyColor,
    darkBodyColor,
    action,
    blinkScaleY,
    earTwitchLeft,
    earTwitchRight,
    pupilMode,
    time
  };

  let currentDirection = AnimationEngine.getDirectionOverride(action, direction, frame);

  ctx.save();
  // 1. Move para o centro (aplicando os offsets verticais suaves)
  ctx.translate(x, y + sitDrop * size + jumpLift * size);
  
  // 2. Aplica rotações suaves (Wiggle e Roll)
  ctx.rotate(wiggleAngle + rollAngle);

  // 3. Aplica o alongamento (Stretch)
  ctx.scale(stretchX, stretchY);

  ctx.save();
  ctx.scale(1, torsoScaleY);
  ctx.fillStyle = bodyColor;
  if (isSitting && !isEating) {
    // Corpo mais "gordinho/baixo" quando senta
    ctx.fillRect(-4.5 * size, -2 * size, 9 * size, 5 * size);
  } else {
    // Corpo normal
    ctx.fillRect(-4 * size, (-3 + pantBob) * size, 8 * size, 6 * size);
  }
  ctx.restore();

  // Draw direction specific features
  switch (currentDirection) {
    case 'DOWN':
      drawDown(ctx, size, frame, action, mood, offsets, accessory);
      break;
    case 'UP':
      drawUp(ctx, size, frame, action, mood, offsets, accessory);
      break;
    case 'RIGHT':
      drawRight(ctx, size, frame, action, mood, offsets, accessory);
      break;
    case 'LEFT':
      drawLeft(ctx, size, frame, action, mood, offsets, accessory);
      break;
    default:
      drawDown(ctx, size, frame, action, mood, offsets, accessory);
      break;
  }

  // Extra Effects from Modular Engine
  AnimationEngine.drawExtras(ctx, action, currentDirection, frame, size, orange);

  ctx.restore();
};
