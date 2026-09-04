export const Hunting = {
  getTargets: (action, frame) => {
    if (action === 'CROUCH_WIGGLE') {
      return { 
        sitDrop: 4, 
        crouchAmount: 1,
        wiggleAngle: (frame % 2 === 0 ? 0.1 : -0.1)
      };
    }
    if (action === 'POUNCE') {
      return { jumpLift: -6 };
    }
    if (action === 'ROLL') {
      return { sitDrop: 2, rollAngle: Math.PI * 2 };
    }
    return {};
  }
};
