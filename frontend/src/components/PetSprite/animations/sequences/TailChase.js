export const TailChase = {
  getDirectionOverride: (direction, frame) => {
    const spinDirections = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    return spinDirections[frame % 4];
  }
};
