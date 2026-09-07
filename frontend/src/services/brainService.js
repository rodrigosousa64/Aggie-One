const BASE_URL = '/api/brain';

let cachedConfig = null;

export async function getBrainConfig() {
  if (cachedConfig) return cachedConfig;

  try {
    const response = await fetch(`${BASE_URL}/config`);
    if (!response.ok) {
      throw new Error('Falha ao buscar configurações do cérebro');
    }
    cachedConfig = await response.json();
    return cachedConfig;
  } catch (error) {
    console.error('Erro na API Brain:', error);
    // Fallback padrão se o servidor estiver offline
    cachedConfig = {
      probabilities: [
        { action_name: 'WALK', weight: 40 },
        { action_name: 'IDLE', weight: 25 },
        { action_name: 'SIT_LOAF', weight: 10 },
        { action_name: 'GROOM', weight: 10 },
        { action_name: 'SIT', weight: 10 },
        { action_name: 'JUMP', weight: 2 },
        { action_name: 'ZOOMIES', weight: 1 },
      ],
      phrases: [],
      settings: [
        { key: 'GROOM_STOP_CHANCE', value: 0.6 },
        { key: 'SIT_STOP_CHANCE', value: 0.4 },
        { key: 'STATE_CHANGE_CHANCE', value: 0.6 },
      ],
      commands: []
    };
    return cachedConfig;
  }
}

export function getCachedBrainConfig() {
  return cachedConfig;
}
