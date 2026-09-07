# 🐱 Aggie-One

**Um pet virtual 2D interativo com IA, criado como presente de aniversário.**

Aggie é uma gatinha atrevida inspirada na personalidade da Agatha. Pensada com foco **Mobile-First**, ela vive solta navegando pelos ecossistemas dos meus sites e sistemas. Ela anda sozinha pela tela, fala besteira, reclama da coluna e estuda Direito — tudo controlado por uma API REST e integração com IA generativa.

---

## 🎯 Objetivo do Projeto

Criar um **pet virtual inteligente** que:

1. **Fale sozinha** — A Aggie solta frases aleatórias baseadas na personalidade cadastrada no banco de dados, sem precisar de interação.
2. **Converse com IA** — Quando o usuário digita algo, a resposta é gerada por IA (Gemini API), temperada com os traços de personalidade da Agatha.
3. **Viva em qualquer lugar** — O projeto foi arquitetado como uma API REST separada do frontend, para que no futuro o pet possa ser embutido como um widget/biblioteca em outros sites e sistemas.
4. **Seja flexível sem código** — Toda a personalidade, roteiros de falas e estado do pet são controlados via banco de dados (Django Admin), permitindo atualizações em tempo real sem tocar no código.

---

## 🧠 Personalidade da Aggie

| Traço | Detalhe |
|---|---|
| 🗣️ Extrovertida | Fala bastante, alto astral, fala besteira |
| 😤 Gênio forte | Sempre alegre ou brava, muda de opinião fácil |
| 💛 Carinhosa à sua maneira | Não demonstra amor, mas se importa |
| 📚 Estudante de Direito | Usa termos jurídicos às vezes |
| 🍔 Ama comer besteira | Vive com fome |
| 😴 Dorme tarde / de tarde | Hábitos noturnos |
| 🦴 Dor na coluna | Reclama com frequência |
| 🧠 Péssima memória | Esquece coisas (feature, não bug) |
| 🎵 Ama música | Gosta de Anavitória, Tim Bernardes e Cazuza |

---

## 🏗️ Arquitetura

```
Aggie-One/
├── backend/                  # Django + Django Ninja (API REST)
│   ├── config/               # Settings, URLs
│   ├── brain/                # Cérebro dinâmico (configurações de IA)
│   │   ├── models.py         # ActionProbability, AggiePhrase, BrainSetting, ChatCommand
│   │   ├── api.py            # Endpoints: /config
│   │   └── admin.py          # Painel de controle do cérebro
│   └── pet_core/             # App principal
│       ├── models.py         # PetState, PersonaTrait, ScriptedPhrase, MemoryContext
│       ├── api.py            # Endpoints: /state, /talk, /interact
│       └── admin.py          # Painel de controle (Django Admin)
│
├── frontend/                 # React + Vite (Mobile-First)
│   └── src/
│       ├── components/
│       │   ├── PetSprite/    # Gatinha desenhada via Canvas 2D (procedural pixel art)
│       │   │   ├── animations/ # Sistema modular de animações
│       │   │   │   ├── AnimationEngine.js
│       │   │   │   ├── actions/ # Animações simples (Dance, Jump, etc)
│       │   │   │   └── sequences/ # Sequências complexas (Hunting, Zoomies)
│       │   │   ├── renderCat.js # Renderizador principal
│       │   │   ├── directions.js # Desenho por direção
│       │   │   └── constants.js # Cores, tamanhos, velocidades
│       │   ├── PixelRoom/    # Cenário base feito 100% com CSS
│       │   ├── ChatBubble/   # Balão de fala com efeito typewriter
│       │   ├── AudioManager/ # Sistema de música e dança
│       │   ├── MobileUIOverlay/ # Barra de interação (input + enviar)
│       │   ├── StatusHUD/    # HUD de status Tamagotchi
│       │   └── PlayerActions/ # Botões de ação (alimentar, música)
│       ├── events/            # Sistema de eventos frontend
│       │   ├── EventEngine.js # Motor de eventos
│       │   ├── ClothingEvent.js # Eventos de roupas
│       │   ├── BirthdayEvent.js # Evento de aniversário
│       │   └── MatrixEvent.js # Evento Matrix
│       ├── hooks/             # Custom Hooks React
│       │   ├── usePetState.js # Gerenciamento de estado
│       │   ├── useGameLoop.js # Loop de jogo e dreno de stats
│       │   ├── useWanderAI.js # IA de comportamento autônomo
│       │   ├── useDanceManager.js # Gerenciador de danças
│       │   ├── useChatAndEvents.js # Sistema de chat e eventos
│       │   └── useSequenceEngine.js # Motor de sequências
│       └── services/          # Comunicação com backend
│           ├── petService.js # Serviços do pet
│           └── brainService.js # Serviços do cérebro
│
├── AGGIE_CONTEXT.md          # Contexto completo do projeto
├── AGGIE_MANUAL.md           # Manual do usuário
├── PET_SPRITE_ARCHITECTURE.md # Arquitetura do sprite
├── EVENTS_ARCHITECTURE.md     # Arquitetura de eventos
└── README.md
```

### Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/pet/state` | Retorna o estado atual (humor, energia, dor na coluna) |
| `GET` | `/api/pet/talk` | Retorna uma fala aleatória (do banco ou da IA) |
| `POST` | `/api/pet/interact` | Recebe mensagem do usuário e retorna resposta da IA |
| `GET` | `/api/brain/config` | Retorna configuração do cérebro (probabilidades, frases, comandos) |

---

## 🛠️ Stack Tecnológica

- **Frontend**: React (Vite) + Vanilla CSS + Canvas 2D
- **Backend**: Python + Django + Django Ninja
- **Banco de Dados**: SQLite
- **IA**: Gemini API (em integração)
- **Animações**: Canvas 2D com LERP (Interpolação Linear)
- **Áudio**: HTML5 Audio API

---

## 🎮 Funcionalidades Principais

### 🎵 Sistema de Música e Dança
- **Música automática**: Quando ativada, a Aggie começa a dançar automaticamente
- **3 tipos de dança**: DANCE (balanço), DANCE_SPIN (giros), DANCE_WIGGLE (wiggles frenéticos)
- **Troca dinâmica**: Alterna entre danças a cada 3 segundos
- **Integração**: Sistema totalmente integrado com AudioManager e AnimationEngine

### � Sistema de Roupas
- **5 roupas disponíveis**: Chapéu de festa, Gravata borboleta, Colar, Óculos de sol, Cachecol
- **Ativação por chat**: Frases específicas no chat ativam cada roupa
- **Renderização procedural**: Todas as roupas desenhadas via Canvas 2D
- **Respostas temáticas**: Cada roupa tem uma frase específica da Aggie

### 🧠 Cérebro Dinâmico
- **Configuração via Admin**: Todas as probabilidades e frases controladas via Django Admin
- **Palavras-chave**: Sistema de comandos configurável via banco de dados
- **Frases contextuais**: Respostas baseadas no estado atual (fome, energia, tédio)
- **Atualização em tempo real**: Mudanças no banco refletem imediatamente no frontend

### 🎯 Sistema de Eventos
- **Eventos frontend**: Interceptação de palavras-chave antes da IA
- **Animações complexas**: Sequências encadeadas de animações
- **Efeitos visuais**: Balões, matrix rain, corações flutuantes
- **Acessórios temporários**: Chapéus e óculos com duração configurável

### 📊 Sistema Tamagotchi
- **5 stats principais**: Fome, Energia, Carinho, Tédio, Raiva
- **Dreno passivo**: Stats diminuem/aumentam com o tempo
- **Interações**: Alimentar, brincar, fazer carinho
- **Ciclo de sono**: Energia zerada entra em modo sono
- **Comportamento reativo**: Stats afetam comportamento e aparência

---

## �🚀 Como Rodar

### Pré-requisitos
- Python 3.11+
- Node.js 18+

### Backend
```bash
cd Aggie-One
python -m venv venv
.\venv\Scripts\activate        # Windows
pip install django django-ninja django-cors-headers
cd backend
python manage.py migrate
python manage.py runserver
```
Acesse o painel admin em `http://localhost:8000/admin` para cadastrar personalidades e roteiros.

### Frontend
```bash
cd Aggie-One/frontend
npm install
npm run dev
```

### Seed de Dados
```bash
cd backend
python seed_brain.py              # Configurações básicas do cérebro
python seed_clothing_commands.py  # Comandos de roupas
```

---

## 🗺️ Roadmap

### ✅ Concluído
- [x] Estrutura base (API REST + Frontend separados)
- [x] Modelos dinâmicos (PersonaTrait, ScriptedPhrase)
- [x] Interface base e layout Mobile-First (CSS puro)
- [x] Gatinha procedural em Canvas 2D com 4 direções
- [x] Sistema de fala (balão com typewriter)
- [x] Sistema Tamagotchi (stats, dreno, interações)
- [x] Motor de animações modular (AnimationEngine)
- [x] Sistema de eventos frontend (EventEngine)
- [x] Sistema de roupas via chat
- [x] Sistema de música e dança automática
- [x] Cérebro dinâmico configurável via Admin
- [x] Movimentos biológicos (respiração, piscar, orelhas)
- [x] Física procedural da cauda

### 🚧 Em Progresso
- [ ] Integração real com Gemini API
- [ ] Sistema de persistência de estado
- [ ] Tela de login/bloqueio melhorada

### 📋 Planejado
- [ ] Roteiros e interações com contexto
- [ ] Transformar em biblioteca/widget embeddable
- [ ] Deploy em produção
- [ ] Sistema de conquistas/achievements
- [ ] Multiplayer (múltiplos pets na mesma tela)
- [ ] Integração com calendário real (aniversários, feriados)

---

## 📚 Documentação

- **[AGGIE_CONTEXT.md](AGGIE_CONTEXT.md)** - Contexto completo do projeto e regras imutáveis
- **[AGGIE_MANUAL.md](AGGIE_MANUAL.md)** - Manual do usuário com comandos e funcionalidades
- **[PET_SPRITE_ARCHITECTURE.md](PET_SPRITE_ARCHITECTURE.md)** - Arquitetura detalhada do sistema de sprite
- **[EVENTS_ARCHITECTURE.md](EVENTS_ARCHITECTURE.md)** - Arquitetura do sistema de eventos
- **[AGENTS.md](AGENTS.md)** - Regras de design e personagem (para IAs)

---

## 📝 Licença

Projeto pessoal. Feito para a Agatha.
