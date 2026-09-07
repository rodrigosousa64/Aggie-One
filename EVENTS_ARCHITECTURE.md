# Arquitetura de Eventos (Event Engine) e Acessórios

Este documento explica como funciona a captura de eventos, acionamentos visuais e a lógica de acessórios no Front-end React da Aggie. 

---

## ⚙️ 1. O Motor de Eventos (`EventEngine.js`)
Localizado em: `frontend/src/events/EventEngine.js`

O `EventEngine` é um interceptador central. Toda vez que o usuário envia uma mensagem no chat (através do `App.jsx`), a mensagem passa primeiro por ele **antes de ser enviada para a API/IA do backend**.

Se a mensagem contiver uma palavra-chave registrada (ex: "sachê", "hack", "aniversário"), a Engine intercepta a comunicação, roda um evento no frontend e **aborta** o envio para a IA, retornando `true`.

### Como registrar um novo Evento:
```javascript
// Dentro de EventEngine.js
import { triggerNovoEvento } from './NovoEvento';

export const handleKeywordEvents = (message, callbacks) => {
  const lowerMsg = message.toLowerCase();

  // Checando palavras-chave
  if (['palavra1', 'palavra2'].some(w => lowerMsg.includes(w))) {
    return triggerNovoEvento(callbacks);
  }

  return false; // Continua normalmente para o backend (API)
};
```

---

## 🛠️ 2. Criando um Arquivo de Evento
Os arquivos de evento ficam na pasta `frontend/src/events/`. 
Um evento é apenas uma função que recebe um objeto `callbacks` (passado pelo `App.jsx`) e altera o estado do jogo.

**Os callbacks disponíveis são:**
- `showChat(text, keepAction)`: Faz a gata falar algo no balão.
- `setEffects(prev => ...)`: Controla overlays na sala (balões, bolo, matrixRain, floatingHearts).
- `triggerSequence(seqName)`: Inicia uma animação complexa (ex: `HUNTING`, `WAKE_UP`, `BIRTHDAY_EAT`).
- `setDirection(dir)`: Força a gata a olhar para `UP`, `DOWN`, `LEFT`, ou `RIGHT`.
- `setAction(action)`: Muda a ação base (ex: `CROUCH`, `ZOOMIES`).
- `setStats(prev => ...)`: Altera as barras da Tamagotchi (fome, energia, carinho).
- `equipAccessory(id, durationMs)`: Equipa uma roupa/chapéu temporariamente (usa o sistema visual).

**Exemplo Prático (`FeedEvent.js`):**
```javascript
export const triggerFeed = ({ triggerSequence, setStats, showChat }) => {
  showChat("Sachê!! *bate a cauda*");
  triggerSequence('BIRTHDAY_EAT'); // Puxa animação
  
  // Atualiza as necessidades da gata
  setStats(prev => ({
    ...prev,
    hunger: Math.max(0, prev.hunger - 30),
    energy: Math.min(100, prev.energy + 15),
  }));
  
  return true; // Retorna true para evitar request HTTP
};
```

---

## 👗 3. Sistema de Acessórios (`/visual`)
Localizado em: `frontend/src/visual/`

A Aggie possui um sistema de acessórios modulares que são desenhados diretamente no Canvas por cima dela.

### Como funciona?
Existe um registro (`index.js`) que guarda todos os acessórios do jogo (ex: Chapéu de Aniversário, Óculos da Matrix). O `App.jsx` controla qual está ativo via estado `accessory` e passa isso como `prop` para o `PetSprite.jsx`. O `PetSprite` busca o código de desenho no registro e roda.

### Estrutura de um Acessório:
```javascript
// frontend/src/visual/ThugGlasses.js
export const ThugGlasses = {
  id: 'THUG_GLASSES',         // ID único
  label: 'Óculos Thug Life',  // Nome legível
  defaultDuration: 10000,     // Duração em milisegundos
  hasSceneEffect: true,       // Usado como flag se mexe no CSS geral
  draw: (ctx, sizeMultiplier, direction) => {
    // Código Canvas (2D Context) para desenhar.
    // Você usa o `direction` para ajustar a posição (frente vs perfil)
  }
};
```

---

## 📜 4. Eventos de Lore (Sem Acessório)
Alguns eventos não possuem animações extravagantes, mas servem para expandir o universo da Aggie (ex: quem é a Agatha, quem é o Criador).
Eles estão em `LoreEvent.js`. Como eles rodam 100% no Front-end, poupamos requisições para a IA no Back-end caso a resposta seja fixa/ensaiada.

> **Regra de Ouro:**
> - Se for uma resposta mecânica/divertida e com animação, crie via `EventEngine.js`.
> - Se for um papo orgânico ("como você está hoje?", "me conte uma história"), deixe retornar `false` para o EventEngine ignorar e o Backend (`api.py` -> LLM) assumir a resposta.
