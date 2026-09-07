# Changelog - Aggie-One

Este documento registra todas as mudanças significativas no projeto Aggie-One, organizadas por versão.

---

## [2.0.0] - 2026-09-07

### 🎉 Lançamento Major - Sistema de Dança e Roupas

### 🎵 Adicionado
- **Sistema de Música e Dança**
  - Novas animações de dança: `DANCE`, `DANCE_SPIN`, `DANCE_WIGGLE`
  - Integração automática com AudioManager
  - DanceManager hook para gerenciar danças
  - Troca dinâmica de tipos de dança a cada 3 segundos
  - Comportamento automático: dança quando música toca, para quando música para

- **Sistema de Roupas via Chat**
  - 5 novas roupas disponíveis:
    - `PARTY_HAT` - Chapéu de festa colorido
    - `BOWTIE` - Gravata borboleta vermelha
    - `COLLAR` - Colar com pingente dourado
    - `SUNGLASSES` - Óculos de sol pretos
    - `SCARF` - Cachecol azul
  - Sistema de ativação via frases no chat
  - Renderização procedural via Canvas 2D
  - Respostas temáticas para cada roupa
  - Comandos configuráveis via banco de dados

- **Backend - Cérebro Dinâmico**
  - Novos tipos de eventos no `EVENT_CHOICES`
  - Script de seed para comandos de roupas
  - 6 novos comandos de chat configurados
  - Atualização de migrations do banco de dados

### 🛠️ Melhorado
- **AnimationEngine**
  - Sistema modular expandido
  - Suporte a 3 novas ações de dança
  - Velocidades específicas para cada tipo de dança
  - Integração melhorada com sistema de LERP

- **Documentação**
  - README.md atualizado com novas funcionalidades
  - AGGIE_CONTEXT.md expandido com sistema de dança e roupas
  - AGGIE_MANUAL.md melhorado com guia completo
  - Novo arquivo TECHNICAL_ARCHITECTURE.md com arquitetura detalhada
  - Novo arquivo ROADMAP.md com planejamento futuro
  - Novo arquivo CHANGELOG.md para histórico de mudanças

### 🐛 Corrigido
- **Erro de referência no App.jsx**
  - Corrigida ordem de inicialização do useDanceManager
  - setAction agora é extraído do petContext antes de ser usado

### 📂 Arquivos Novos
- `frontend/src/components/PetSprite/animations/actions/Dance.js`
- `frontend/src/components/PetSprite/animations/actions/DanceSpin.js`
- `frontend/src/components/PetSprite/animations/actions/DanceWiggle.js`
- `frontend/src/hooks/useDanceManager.js`
- `frontend/src/events/ClothingEvent.js`
- `backend/seed_clothing_commands.py`
- `TECHNICAL_ARCHITECTURE.md`
- `ROADMAP.md`
- `CHANGELOG.md`

### 📝 Arquivos Modificados
- `frontend/src/components/PetSprite/animations/AnimationEngine.js`
- `frontend/src/components/PetSprite/constants.js`
- `frontend/src/components/PetSprite/directions.js`
- `frontend/src/components/PetSprite/renderCat.js`
- `frontend/src/components/AudioManager/AudioManager.jsx`
- `frontend/src/hooks/useWanderAI.js`
- `frontend/src/components/PlayerActions/PlayerActions.jsx`
- `frontend/src/App.jsx`
- `frontend/src/events/EventEngine.js`
- `backend/brain/models.py`
- `README.md`
- `AGGIE_CONTEXT.md`
- `AGGIE_MANUAL.md`

---

## [1.0.0] - 2026-09-01

### 🎉 Lançamento Inicial

### 🎨 Adicionado
- **Arquitetura Base**
  - API REST com Django + Django Ninja
  - Frontend React + Vite
  - Separação completa de responsabilidades
  - Mobile-First design

- **Sistema Tamagotchi**
  - 5 stats principais: fome, energia, carinho, tédio, raiva
  - Dreno passivo de stats
  - Sistema de interações
  - Ciclo de sono

- **Motor de Animações**
  - AnimationEngine modular
  - Sistema LERP para transições suaves
  - Movimentos biológicos (respiração, piscar, orelhas)
  - Física procedural da cauda
  - Sequências complexas (Hunting, Zoomies, etc)

- **Renderização Procedural**
  - Canvas 2D com pixel art
  - 4 direções de movimento
  - Expressões faciais baseadas em humor
  - Sistema de acessórios básico

- **Sistema de Eventos**
  - EventEngine com interceptação de palavras-chave
  - Eventos frontend (Matrix, Detetive, Aniversário)
  - Sistema de callbacks modular
  - Integração com chat

- **Comportamento Autônomo**
  - WanderAI com cérebro dinâmico
  - Configuração via Django Admin
  - Probabilidades configuráveis
  - Frases contextuais

- **Interface Mobile-First**
  - StatusHUD com stats
  - PlayerActions com botões
  - ChatBubble com efeito typewriter
  - PixelRoom com CSS procedural
  - AudioManager básico

- **Documentação**
  - README.md inicial
  - AGGIE_CONTEXT.md com regras imutáveis
  - AGGIE_MANUAL.md básico
  - PET_SPRITE_ARCHITECTURE.md
  - EVENTS_ARCHITECTURE.md
  - AGENTS.md para IAs

### 🧠 Personalidade
- Definição da personalidade da Aggie
- Traços de humor e comportamentos
- Preferências musicais (Anavitória, Tim Bernardes, Cazuza)
- Sistema de lore (Agatha, Criador)

---

## Próximas Versões Planejadas

### [2.1.0] - Planejado
- Tela de bloqueio melhorada com estética pixel art
- Cinematografia de introdução
- Integração real com Gemini API
- Sistema de persistência de estado

### [2.2.0] - Planejado
- Novas roupas adicionais
- Sistema de conquistas (achievements)
- Melhorias de performance
- Sistema de notificações

### [3.0.0] - Planejado
- Multiplayer real-time
- Sistema de economia virtual
- Integração com calendário real
- Modo story/campaign

---

## 📝 Convenções de Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/):

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Funcionalidades adicionadas de forma compatível
- **PATCH**: Correções de bugs compatíveis

### Tipos de Mudanças
- **Adicionado**: Novas funcionalidades
- **Melhorado**: Melhorias em funcionalidades existentes
- **Corrigido**: Correções de bugs
- **Removido**: Funcionalidades removidas
- **Alterado**: Mudanças em funcionalidades existentes
- **Segurança**: Correções de segurança

---

## 🤝 Contribuindo

Para contribuir com o changelog:
1. Adicione entradas na seção apropriada
2. Siga o formato estabelecido
3. Inclua data e versão
4. Seja específico sobre mudanças
5. Documente breaking changes

---
*Última atualização: 2026-09-07*
*Mantido por: Desenvolvedor*