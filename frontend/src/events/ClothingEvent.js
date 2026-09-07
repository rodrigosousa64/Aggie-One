export const triggerClothing = (callbacks, clothingType) => {
  const { showChat, equipAccessory } = callbacks;
  
  // Mapeamento de tipos de roupas para IDs de acessórios
  const clothingMap = {
    'party_hat': 'PARTY_HAT',
    'bowtie': 'BOWTIE',
    'collar': 'COLLAR',
    'sunglasses': 'SUNGLASSES',
    'scarf': 'SCARF',
    'none': null
  };
  
  const accessoryId = clothingMap[clothingType];
  
  if (accessoryId) {
    equipAccessory(accessoryId);
    
    // Mensagens de resposta baseadas na roupa
    const responses = {
      'PARTY_HAT': 'Olha meu chapéu de festa! 🎉',
      'BOWTIE': 'Estou elegante hoje, né? 😎',
      'COLLAR': 'Gostei do colar!',
      'SUNGLASSES': 'Agora estou Incógnito... 😎',
      'SCARF': 'Está um pouco frio, mas está bom!'
    };
    
    showChat(responses[accessoryId] || 'Roupa trocada!', true);
  } else if (clothingType === 'none') {
    equipAccessory(null);
    showChat('Pronto, sem roupa agora.', true);
  }
  
  return true;
};