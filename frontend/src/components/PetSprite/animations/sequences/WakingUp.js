export const WakingUp = {
  getTargets: (action, frame) => {
    if (action === 'SLEEPING') {
      return { sitDrop: 4 }; // Mantém o formato original, apenas abaixa
    }
    if (action === 'WAKE_UP') {
      return { sitDrop: 2 }; // Senta normal
    }
    if (action === 'STRETCH') {
      return { sitDrop: 1 }; // Apenas levanta o corpo ligeiramente para simular o espreguiçar, sem distorcer os pixels
    }
    return {};
  }
};
