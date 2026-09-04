export const Jump = {
  getTargets: (action, frame) => {
    if (frame === 1 || frame === 2) {
      return { jumpLift: -4 };
    }
    return {};
  }
};
