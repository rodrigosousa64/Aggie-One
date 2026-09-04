export const Ambush = {
  getTargets: (action, frame) => {
    if (action === 'CROUCH') {
      return { sitDrop: 4, crouchAmount: 1 };
    }
    // LUNGE defaults to empty targets since it's just a dash
    return {};
  }
};
