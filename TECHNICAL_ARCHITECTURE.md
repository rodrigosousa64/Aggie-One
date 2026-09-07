# Arquitetura Técnica - Aggie-One

Este documento descreve a arquitetura técnica completa do projeto Aggie-One, incluindo estrutura de arquivos, fluxos de dados, padrões de design e decisões técnicas.

---

## 🏗️ Visão Geral da Arquitetura

Aggie-One segue uma arquitetura de **separação de responsabilidades** com frontend e backend totalmente desacoplados, comunicando-se via API REST.

```
┌─────────────────┐         HTTP/REST         ┌─────────────────┐
│   Frontend      │◄─────────────────────────►│   Backend       │
│   (React/Vite)  │                           │   (Django)      │
└─────────────────┘                           └─────────────────┘
        │                                             │
        │ Canvas 2D                                   │ SQLite
        │ CSS Procedural                              │ Gemini API
        │ Custom Hooks                                │ Django Admin
        └─────────────────────────────────────────────┘
```

---

## 📂 Estrutura de Arquivos

### Frontend (React + Vite)
```
frontend/
├── src/
│   ├── components/           # Componentes React
│   │   ├── PetSprite/        # Sistema de renderização da gata
│   │   │   ├── animations/   # Motor de animações modular
│   │   │   │   ├── AnimationEngine.js    # Cérebro das animações
│   │   │   │   ├── actions/               # Animações simples
│   │   │   │   │   ├── Dance.js           # Animação de dança
│   │   │   │   │   ├── DanceSpin.js       # Animação de giro
│   │   │   │   │   ├── DanceWiggle.js     # Animação de wiggle
│   │   │   │   │   ├── Jump.js            # Animação de pulo
│   │   │   │   │   ├── SitGroom.js        # Animação de lamber
│   │   │   │   │   ├── SitLoaf.js         # Animação de pãozinho
│   │   │   │   │   ├── EatTreat.js        # Animação de comer
│   │   │   │   │   └── YawnScratch.js     # Animação de bocejo/coçar
│   │   │   │   └── sequences/             # Sequências complexas
│   │   │   │       ├── WakingUp.js        # Sequência de acordar
│   │   │   │       ├── Hunting.js         # Sequência de caça
│   │   │   │       ├── Ambush.js          # Sequência de emboscada
│   │   │   │       ├── TailChase.js       # Sequência de perseguir rabo
│   │   │   │       ├── Zoomies.js         # Sequência de zoomies
│   │   │   │       ├── BugCatch.js        # Sequência de caçar inseto
│   │   │   │       └── Startle.js         # Sequência de susto
│   │   │   ├── renderCat.js    # Renderizador principal
│   │   │   ├── directions.js    # Desenho por direção (UP/DOWN/LEFT/RIGHT)
│   │   │   ├── constants.js     # Cores, tamanhos, velocidades
│   │   │   └── PetSprite.jsx    # Componente wrapper React
│   │   ├── PixelRoom/          # Cenário (CSS procedural)
│   │   ├── ChatBubble/         # Sistema de chat
│   │   ├── AudioManager/       # Sistema de música
│   │   │   └── AudioManager.jsx
│   │   ├── MobileUIOverlay/    # Interface mobile
│   │   ├── StatusHUD/          # HUD de status
│   │   ├── PlayerActions/      # Botões de ação
│   │   ├── DevMenu/            # Menu de desenvolvimento
│   │   ├── WelcomeScreen/      # Tela de boas-vindas
│   │   └── PixelIcon/          # Ícones pixel art
│   ├── events/                # Sistema de eventos
│   │   ├── EventEngine.js     # Motor de eventos
│   │   ├── ClothingEvent.js   # Eventos de roupas
│   │   ├── BirthdayEvent.js   # Evento de aniversário
│   │   ├── MatrixEvent.js     # Evento Matrix
│   │   ├── DetectiveEvent.js  # Evento detetive
│   │   ├── StartleEvent.js    # Evento de susto
│   │   ├── FeedEvent.js       # Evento de alimentação
│   │   └── LoreEvent.js       # Eventos de lore
│   ├── hooks/                 # Custom Hooks React
│   │   ├── usePetState.js     # Gerenciamento de estado
│   │   ├── useGameLoop.js     # Loop de jogo
│   │   ├── useWanderAI.js     # IA autônoma
│   │   ├── useDanceManager.js # Gerenciador de danças
│   │   ├── useChatAndEvents.js # Chat e eventos
│   │   ├── useSequenceEngine.js # Motor de sequências
│   │   ├── useDragAndDrop.js  # Arrastar e soltar
│   │   └── useInteractions.js # Interações do usuário
│   ├── services/              # Comunicação com backend
│   │   ├── petService.js      # Serviços do pet
│   │   └── brainService.js    # Serviços do cérebro
│   ├── App.jsx                # Componente principal
│   └── App.css                # Estilos globais
└── package.json
```

### Backend (Django + Django Ninja)
```
backend/
├── config/                   # Configurações Django
│   ├── settings.py          # Settings principais
│   ├── urls.py              # URLs principais
│   └── wsgi.py              # WSGI config
├── brain/                   # App do cérebro dinâmico
│   ├── models.py            # Modelos: ActionProbability, AggiePhrase, BrainSetting, ChatCommand
│   ├── api.py               # API: /api/brain/config
│   ├── admin.py             # Admin interface
│   ├── schemas.py           # Schemas Pydantic
│   └── migrations/          # Migrations do banco
├── pet_core/                # App principal do pet
│   ├── models.py            # Modelos: PetState, PersonaTrait, ScriptedPhrase, MemoryContext
│   ├── api.py               # API: /api/pet/state, /api/pet/talk, /api/pet/interact
│   ├── admin.py             # Admin interface
│   ├── ai_service.py        # Serviço de IA (Gemini)
│   └── migrations/          # Migrations do banco
├── seed_*.py               # Scripts de seed de dados
└── manage.py               # Django manage script
```

---

## 🔄 Fluxos de Dados

### 1. Fluxo de Renderização (Canvas 2D)
```
App.jsx
  ↓
PetSprite.jsx (Game Loop 60 FPS)
  ↓
AnimationEngine.getTargets() → targets LERP
  ↓
lerpState.current += (targets - current) * speed
  ↓
renderCat() com lerpState aplicado
  ↓
directions.js (drawDown/drawUp/drawLeft/drawRight)
  ↓
Canvas 2D Context
```

### 2. Fluxo de Comportamento (Wander AI)
```
useWanderAI (tick a cada 2.5s)
  ↓
getBrainConfig() do backend
  ↓
Calcula probabilidades baseadas em stats
  ↓
Seleciona ação baseada em pesos
  ↓
setAction() → Atualiza estado
  ↓
AnimationEngine processa nova ação
```

### 3. Fluxo de Eventos (Chat)
```
User digita mensagem
  ↓
useChatAndEvents.handleSendMessage()
  ↓
EventEngine.handleKeywordEvents()
  ↓
Se palavra-chave encontrada:
  → triggerEvento() → Frontend only
  → Retorna true (cancela backend)
Se não:
  → sendPetInteraction() → Backend API
  → IA Gemini processa
  → Retorna resposta
```

### 4. Fluxo de Música e Dança
```
User clica botão música
  ↓
AudioManager.togglePlay()
  ↓
onMusicStart() callback
  ↓
useDanceManager.startDancing()
  ↓
setAction('DANCE') random
  ↓
Intervalo troca dança a cada 3s
  ↓
User para música
  ↓
onMusicStop() callback
  ↓
useDanceManager.stopDancing()
  ↓
setAction('IDLE')
```

---

## 🎨 Sistema de Animação (AnimationEngine)

### Arquitetura Modular
Cada animação é um módulo independente com 3 funções opcionais:

```javascript
export const MinhaAnimacao = {
  // 1. Define alvos matemáticos para LERP
  getTargets: (action, frame) => ({
    sitDrop: 2,        // Quanto sentar
    stretchY: 1.1,     // Esticar verticalmente
    wiggleAngle: 0.15  // Balanço lateral
  }),
  
  // 2. Override de direção (opcional)
  getDirectionOverride: (direction, frame) => 'DOWN',
  
  // 3. Efeitos visuais extras (opcional)
  drawExtras: (ctx, direction, frame, size, orange) => {
    // Desenhar partículas, efeitos especiais
  }
};
```

### Sistema LERP (Linear Interpolation)
```javascript
// No PetSprite.jsx - game loop
const lerpSpeed = 0.15; // Velocidade de interpolação
s.sitDrop += (targetState.sitDrop - s.sitDrop) * lerpSpeed;
s.wiggleAngle += (targetState.wiggleAngle - s.wiggleAngle) * 0.3;
```

### Movimentos Biológicos
- **Respiração**: `torsoScaleY = 1 + Math.sin(time/freq) * amp`
- **Piscar**: Sistema assíncrono com chance de piscar duplo
- **Orelhas**: Tiques aleatórios com movimento suave
- **Cauda**: Ondas senoidais com frequência baseada no humor

---

## 🧠 Cérebro Dinâmico (Backend)

### Modelos Principais

#### ActionProbability
```python
class ActionProbability(models.Model):
    action_name = models.CharField(max_length=50)  # "WALK", "RUN", etc
    weight = models.FloatField(default=1.0)        # Peso da probabilidade
    is_active = models.BooleanField(default=True)
```

#### AggiePhrase
```python
class AggiePhrase(models.Model):
    category = models.CharField(max_length=50)     # "HUNGRY", "BORED", etc
    text = models.CharField(max_length=255)         # "Tô com fome..."
    weight = models.FloatField(default=10.0)       # Chance desta frase
    is_active = models.BooleanField(default=True)
```

#### BrainSetting
```python
class BrainSetting(models.Model):
    key = models.CharField(max_length=50)          # "WANDER_INTERVAL_MS"
    value = models.FloatField(default=0.5)         # Valor numérico
    description = models.CharField(max_length=255) # Descrição
```

#### ChatCommand
```python
class ChatCommand(models.Model):
    name = models.CharField(max_length=50)         # "Comando Chapéu"
    keywords = models.CharField(max_length=255)    # "chapéu,party hat"
    event_type = models.CharField(max_length=50)   # "CLOTHING_PARTY_HAT"
    reply_text = models.CharField(max_length=255)  # "Olha meu chapéu!"
    is_active = models.BooleanField(default=True)
```

### API de Configuração
```python
@router.get("/config", response=BrainConfigSchema)
def get_brain_config(request):
    return {
        "probabilities": list(ActionProbability.objects.filter(is_active=True)),
        "phrases": list(AggiePhrase.objects.filter(is_active=True)),
        "settings": list(BrainSetting.objects.all()),
        "commands": list(ChatCommand.objects.filter(is_active=True))
    }
```

---

## 🎮 Sistema de Estado (Tamagotchi)

### Estrutura de Estado
```javascript
const petState = {
  mood: 'feliz',           // Estado emocional
  action: 'IDLE',          // Ação atual
  direction: 'DOWN',       // Direção que está olhando
  position: { x: 50, y: 50 } // Posição na tela (vw/vh)
}

const stats = {
  hunger: 30,              // 0-100 (100 = faminta)
  energy: 80,              // 0-100 (100 = cheia de energia)
  affection: 70,           // 0-100 (100 = muito carinho)
  boredom: 20,             // 0-100 (100 = muito entediada)
  anger: 10                // 0-100 (100 = muito brava)
}
```

### Mecânicas de Dreno
```javascript
// No useGameLoop.js
useEffect(() => {
  const interval = setInterval(() => {
    setStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + hungerDrain),
      energy: Math.max(0, prev.energy - energyDrain),
      boredom: Math.min(100, prev.boredom + boredomDrain),
      affection: Math.max(0, prev.affection - affectionDrain)
    }));
  }, 1000); // A cada segundo
}, []);
```

---

## 👗 Sistema de Roupas

### Arquitetura de Renderização
```javascript
// No directions.js
const drawAccessory = (ctx, size, accessory, headX, headY, eyeY, direction) => {
  if (!accessory) return;
  
  if (accessory === 'PARTY_HAT') {
    // Desenhar chapéu de festa
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(headX - 1*size, headY - size, 2*size, size);
    // ... mais detalhes
  }
  
  if (accessory === 'BOWTIE') {
    // Desenhar gravata
    // ...
  }
  
  // ... outras roupas
};
```

### Sistema de Eventos
```javascript
// No ClothingEvent.js
export const triggerClothing = (callbacks, clothingType) => {
  const { showChat, equipAccessory } = callbacks;
  
  const clothingMap = {
    'party_hat': 'PARTY_HAT',
    'bowtie': 'BOWTIE',
    // ... outros mapeamentos
  };
  
  const accessoryId = clothingMap[clothingType];
  equipAccessory(accessoryId);
  showChat(responses[accessoryId], true);
  
  return true;
};
```

---

## 🎵 Sistema de Áudio

### AudioManager Component
```javascript
export default function AudioManager({ onMusicStart, onMusicStop }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  
  const tracks = [catOnARug, cozyKitty];
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      onMusicStart(); // Callback para iniciar dança
    } else {
      audioRef.current.pause();
      onMusicStop(); // Callback para parar dança
    }
  }, [isPlaying, onMusicStart, onMusicStop]);
}
```

### DanceManager Hook
```javascript
export function useDanceManager(setAction, isDancingRef) {
  const startDancing = () => {
    isDancingRef.current = true;
    setAction('DANCE'); // Começa com dança aleatória
    
    danceIntervalRef.current = setInterval(() => {
      const dances = ['DANCE', 'DANCE_SPIN', 'DANCE_WIGGLE'];
      const randomDance = dances[Math.floor(Math.random() * dances.length)];
      setAction(randomDance);
    }, 3000); // Troca a cada 3s
  };
  
  const stopDancing = () => {
    isDancingRef.current = false;
    clearInterval(danceIntervalRef.current);
    setAction('IDLE');
  };
  
  return { startDancing, stopDancing };
}
```

---

## 🔧 Padrões de Design

### 1. Separation of Concerns
- **Renderização**: Isolada em `PetSprite/`
- **Lógica de Jogo**: Isolada em `hooks/`
- **Eventos**: Isolados em `events/`
- **Serviços**: Isolados em `services/`

### 2. Custom Hooks Pattern
```javascript
// Padrão padrão para hooks
export function useFeature(context) {
  const { state, setState } = context;
  
  useEffect(() => {
    // Lógica do hook
  }, [dependencies]);
  
  return { functions, values };
}
```

### 3. Event-Driven Architecture
- **EventEngine**: Centraliza interceptação de eventos
- **Callbacks**: Padrão de injeção de dependências
- **Modularidade**: Cada evento é um arquivo independente

### 4. Configuration as Code
- **Brain Config**: Todas as configurações no banco de dados
- **Seed Scripts**: Populam configurações iniciais
- **Admin Interface**: Interface para ajustes em tempo real

---

## 🚀 Performance Optimization

### Canvas 2D Optimization
- **requestAnimationFrame**: Loop de animação otimizado
- **LERP Interpolation**: Transições suaves sem overhead
- **Procedural Generation**: Sem carregamento de imagens
- **Batch Rendering**: Múltiplas operações em único frame

### React Optimization
- **useMemo**: Cache de cálculos pesados
- **useCallback**: Estabilização de funções
- **useRef**: Referências mutáveis sem re-renders
- **Context API**: Estado global eficiente

### API Optimization
- **Debouncing**: Prevenir múltiplas requisições
- **Caching**: Configurações em cache local
- **Lazy Loading**: Carregamento sob demanda
- **Error Boundaries**: Tratamento de erros gracioso

---

## 🔒 Segurança

### Frontend Security
- **Input Sanitization**: Limpeza de inputs do usuário
- **XSS Prevention**: Escape de HTML dinâmico
- **CORS Configuration**: Restrição de origens
- **Content Security Policy**: Políticas de conteúdo

### Backend Security
- **Authentication**: Sistema de autenticação (quando necessário)
- **Authorization**: Controle de permissões
- **SQL Injection Prevention**: ORM Django
- **Rate Limiting**: Limitação de requisições

---

## 📊 Monitoramento e Debugging

### Developer Tools
- **DevMenu**: Menu de desenvolvimento para testes
- **Console Logging**: Logs estruturados
- **Error Tracking**: Captura de erros
- **Performance Monitoring**: Métricas de performance

### Debugging Tools
- **React DevTools**: Inspeção de componentes
- **Canvas Inspector**: Visualização de Canvas
- **Network Tab**: Monitoramento de requisições
- **Django Debug Toolbar**: Debug backend

---

## 🧪 Testing Strategy

### Frontend Testing
- **Unit Tests**: Testes de hooks e funções puras
- **Integration Tests**: Testes de componentes
- **E2E Tests**: Testes de fluxo completo
- **Visual Regression**: Testes de interface

### Backend Testing
- **Unit Tests**: Testes de modelos e funções
- **API Tests**: Testes de endpoints
- **Integration Tests**: Testes de fluxo completo
- **Load Tests**: Testes de performance

---

## 📈 Escalabilidade

### Horizontal Scaling
- **Frontend**: CDN para assets estáticos
- **Backend**: Load balancing com múltiplas instâncias
- **Database**: Replicação e sharding

### Vertical Scaling
- **Optimization**: Melhoria de código e algoritmos
- **Caching**: Redis para cache distribuído
- **Database**: Índices e otimizações de queries

---

## 🔄 CI/CD Pipeline

### Frontend Pipeline
```yaml
# Exemplo de pipeline
build:
  - npm install
  - npm run build
  - npm run test
  
deploy:
  - build output to CDN
  - update version
```

### Backend Pipeline
```yaml
# Exemplo de pipeline
test:
  - python manage.py test
  - python manage.py migrate
  
deploy:
  - collectstatic
  - restart server
  - health check
```

---

## 📝 Convenções de Código

### Frontend Conventions
- **Component Naming**: PascalCase para componentes
- **File Naming**: camelCase para arquivos JavaScript
- **CSS Naming**: BEM methodology
- **Comments**: JSDoc para documentação

### Backend Conventions
- **Model Naming**: Singular para modelos
- **View Naming**: Descrição e verbos
- **API Naming**: RESTful conventions
- **Comments**: Docstrings para documentação

---

## 🎯 Futuras Melhorias

### Short Term
- [ ] Testes automatizados completos
- [ ] Sistema de logging avançado
- [ ] Monitoramento de performance em tempo real
- [ ] Sistema de cache distribuído

### Medium Term
- [ ] Integração real com Gemini API
- [ ] Sistema de persistência de estado
- [ ] Sistema de achievements/conquistas
- [ ] Multiplayer real-time

### Long Term
- [ ] Transformação em biblioteca embeddable
- [ ] Suporte a múltiplos pets
- [ ] Sistema de economia virtual
- [ ] Integração com calendário real

---

## 📚 Referências

### Documentação Interna
- [AGGIE_CONTEXT.md](AGGIE_CONTEXT.md) - Contexto do projeto
- [AGGIE_MANUAL.md](AGGIE_MANUAL.md) - Manual do usuário
- [PET_SPRITE_ARCHITECTURE.md](PET_SPRITE_ARCHITECTURE.md) - Arquitetura do sprite
- [EVENTS_ARCHITECTURE.md](EVENTS_ARCHITECTURE.md) - Arquitetura de eventos

### Documentação Externa
- [React Documentation](https://react.dev)
- [Django Documentation](https://docs.djangoproject.com)
- [Django Ninja Documentation](https://django-ninja.rest-framework.com)
- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---
*Última atualização: 2026-09-07*
*Versão: 1.0*
*Mantenedor: Desenvolvedor*