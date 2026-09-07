const API_URL = '/api/pet';

export const getPetState = async () => {
  const response = await fetch(`${API_URL}/state`);
  if (!response.ok) throw new Error('Falha ao carregar estado do pet');
  return response.json();
};

export const updatePetState = async (stats, accessory) => {
  const response = await fetch(`${API_URL}/state`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...stats, active_accessory: accessory })
  });
  if (!response.ok) throw new Error('Falha ao atualizar estado do pet');
  return response.json();
};

export const getPetTalk = async (context = null) => {
  const url = context ? `${API_URL}/talk?context=${context}` : `${API_URL}/talk`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Falha ao gerar fala');
  return response.json();
};

export const sendPetInteraction = async (message, localTime, lastEvent) => {
  const response = await fetch(`${API_URL}/interact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      message, 
      local_time: localTime, 
      last_event: lastEvent 
    })
  });
  if (!response.ok) throw new Error('Falha na interação');
  return response.json();
};
