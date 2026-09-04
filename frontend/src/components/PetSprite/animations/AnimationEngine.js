import { WakingUp } from './sequences/WakingUp';
import { Hunting } from './sequences/Hunting';
import { Ambush } from './sequences/Ambush';
import { TailChase } from './sequences/TailChase';
import { Zoomies } from './sequences/Zoomies';
import { BugCatch } from './actions/BugCatch';
import { Jump } from './actions/Jump';
import { SitGroom } from './actions/SitGroom';
import { SitLoaf } from './actions/SitLoaf';
import { EatTreat } from './actions/EatTreat';
import { Startle } from './sequences/Startle';

const actionMap = {
  SLEEPING: WakingUp,
  WAKE_UP: WakingUp,
  STRETCH: WakingUp,
  CROUCH_WIGGLE: Hunting,
  POUNCE: Hunting,
  ROLL: Hunting,
  CROUCH: Ambush,
  LUNGE: Ambush,
  TAIL_CHASE: TailChase,
  ZOOMIES: Zoomies,
  STARTLE_JUMP: Startle,
  BUG_CATCH: BugCatch,
  JUMP: Jump,
  SIT: SitGroom,
  SIT_LOAF: SitLoaf,
  GROOM: SitGroom,
  EAT_TREAT: EatTreat
};

export const AnimationEngine = {
  getTargets: (action, frame) => {
    const module = actionMap[action];
    if (module && module.getTargets) {
      return module.getTargets(action, frame);
    }
    return {}; 
  },
  
  getDirectionOverride: (action, direction, frame) => {
    const module = actionMap[action];
    if (module && module.getDirectionOverride) {
      return module.getDirectionOverride(direction, frame);
    }
    return direction;
  },
  
  drawExtras: (ctx, action, direction, frame, size, orange) => {
    const module = actionMap[action];
    if (module && module.drawExtras) {
      module.drawExtras(ctx, direction, frame, size, orange);
    }
  }
};
