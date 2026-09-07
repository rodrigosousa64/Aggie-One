# 🐱 Aggie-One: O Guia Definitivo do Projeto (Contexto)

Este documento centraliza todas as informações essenciais sobre a arquitetura, regras de design, mecânicas e a personalidade (lore) do projeto **Aggie-One**. Se você é uma IA ou um desenvolvedor assumindo o projeto, leia este arquivo primeiro para entender todo o escopo antes de propor alterações.

---

## 🎯 1. O Que é o Projeto?
**Aggie-One** é um pet virtual 2D interativo com IA, criado como presente de aniversário para a Agatha.
A Aggie é uma gatinha atrevida (pixel art procedural via Canvas 2D) que anda sozinha pela tela, fala besteira, reclama da coluna. Tudo é controlado por uma API REST (Django) integrada com IA generativa (Gemini), com um frontend modular em React.

**Características Principais:**
- Pet virtual inteligente com comportamento autônomo
- Sistema Tamagotchi com stats (fome, energia, carinho, tédio, raiva)
- Animações procedurais suaves via LERP (60 FPS)
- Sistema de roupas customizáveis via chat
- Música automática com danças integradas
- Cérebro dinâmico configurável via Django Admin
- Eventos frontend com palavras-chave interceptáveis
- 100% Mobile-First e responsivo

---

## 🚫 2. Regras Imutáveis de Design (MUITO IMPORTANTE)
*As regras abaixo **NUNCA** devem ser alteradas ou ignoradas, a menos que o usuário solicite explicitamente.*

- **O Cenário (A Sala)**: Sala preta e minimalista. Fundo Preto (`#0a0a0a`), com iluminação ambiente suave. O elemento central é **APENAS um tapete quadrado**.
- **Proibições no Cenário**: Sem paredes visíveis, sem portas desenhadas, sem brinquedos espalhados, sem caixa de areia, sem torre de gato. **NÃO adicionar objetos extras.**
- **A Gata (Aggie)**: Sprite procedural via Canvas 2D (nada de imagens pré-renderizadas .png/.gif). Cor **Laranja** (`#f97316`). Tamanho **Pequeno** (Multiplicador de tamanho sempre `3`, Canvas `120x120`). Aparência simples.
- **Técnica de UI**: Interface e sala 100% Mobile-First e construída apenas usando CSS. 
- **HUD e Ícones**: Todos os ícones de status e balões flutuantes devem ser renderizados usando **SVG procedural ou Pixel Art gerado via CSS**. Proibido usar emojis de sistema para mecânicas centrais da UI.

---

## 🏗️ 3. Arquitetura do Frontend (React Clean Architecture)
O Frontend foi refatorado para não usar um "God Object" no `App.jsx`. A lógica é modular:

### Motor de Animação e Renderização (Canvas/LERP)
Toda a renderização fica em `src/components/PetSprite/`.
- Usa Matemática de Interpolação (LERP) para garantir transições suaves (ex: espreguiçar, pular) a 60 FPS.
- **Movimentos Biológicos (Background)**: Respiração procedural (ondas na escala Y), piscar de olhos assíncrono, pequenos tiques nas orelhas, e ações orgânicas como Bocejar (`YAWN`) e Coçar a orelha (`SCRATCH`) que o `WanderAI` escolhe autonomamente.
- **Microexpressões de Humor**: O desenho reage diretamente à emoção (ex: pupilas ficam minúsculas como fendas se `brava` ou viram "Gato de Botas" se `com-fome`).
- **Física Procedural da Cauda**: A cauda não usa frames estáticos; é desenhada usando matemática pura (ondas senoidais com ancoragem na base). Frequência e amplitude mudam drasticamente de acordo com a emoção.
- **Sistema Modular**: As funções puras de desenho ficam separadas (`directions.js`, `YawnScratch.js`, `EatTreat.js`) sem misturar lógicas de renderização com estado.
- **AnimationEngine**: Sistema modular onde cada animação é um arquivo separado com funções `getTargets`, `getDirectionOverride` e `drawExtras`.

### Motor de Eventos e Inteligência (Custom Hooks)
O `App.jsx` é limpo. A "mente" e mecânica do jogo vive nos Hooks (`src/hooks/`):
1. **`usePetState.js`**: Guarda o estado base (Humor, Posição, Ação, Stats Tamagotchi, Acessório).
2. **`useGameLoop.js`**: Dreno passivo de status. A fome e o tédio aumentam, a energia cai. Controla o sono (recarga de energia) e emite avisos de punição.
3. **`useWanderAI.js`**: Comportamento autônomo (roda a cada 2.5s). Alimentado pelo **Cérebro Dinâmico**.
4. **`useSequenceEngine.js`**: Gerencia encadeamento de animações complexas (`WAKE_UP`, `HUNTING`, `AMBUSH`, `BUG_CATCH`). Exporta o `triggerSequence`.
5. **`useDanceManager.js`**: Gerencia as animações de dança quando a música está tocando.
6. **`useChatAndEvents.js`**: Sistema de chat e interceptação de eventos via palavras-chave.

### 🧠 Cérebro Dinâmico (Django Admin Panel / Brain)
Para evitar "Magic Numbers" e frases engessadas, **toda a heurística e as frases automáticas foram extraídas para o Banco de Dados**.
- Acesse `http://localhost:8000/admin` (App: `Brain`) para calibrar as chances de cada ação, o cansaço e as falas da gata.
- O Front-end baixa essas regras via API (`GET /api/brain/config`) e utiliza **Context Triggers** (ex: `HUNGRY`, `LOW_ENERGY`, `BORED`) para sortear uma frase que condiga com o estado atual da gata.
- **Modelos principais**: `ActionProbability`, `AggiePhrase`, `BrainSetting`, `ChatCommand`.

### Sistema de Eventos de Chat e Acessórios
- **`EventEngine.js`**: Intercepta o que o usuário digita no chat *antes* de enviar para a IA. Se achar uma "palavra-chave" (ex: *hack*, *procurar*, *sachê*, *chapéu*), ele dispara um Evento Front-end e cancela o request pro Backend.
- **Acessórios**: Roupas (Chapéus, Óculos, Gravatas, Colares) desenhadas via Canvas sobre o corpo da gata, com sistema de ativação via chat.
- **Eventos disponíveis**: Matrix, Detetive, Aniversário, Roupas, Susto, Alimentação, Lore.

---

## ⚙️ 4. Mecânicas Tamagotchi (Status)
- **Fome**: Aumenta passivamente. Fome alta drena a Energia mais rápido. Se chegar num nível crítico, a gata recusa-se a brincar e reclama. Tédio acelera a fome.
- **Energia**: Gasta passivamente ou ativamente se correr/pular (`ZOOMIES`, `RUN`). Se zerar, ela entra em estado de sono (`mood: dormindo`, ação `SIT_LOAF`).
- **Carinho**: Sobe via interação táctil (Hover no mouse, toque no Mobile).
- **Tédio**: Sobe se deixada sozinha. Tédio alto (>80) causa hiperatividade (zoomies, caçar o próprio rabo).
- **Raiva**: Aumenta com SPAM de cliques. Raiva alta (>80) faz a gata virar de costas e recusar conversas. Comida cura raiva instantaneamente.
- **HUD de Ações (PlayerActions)**: Botões flutuantes (Glassmorphism) no canto direito que permitem interações diretas, como dar **Sachê** (restaura fome e aciona animação de comer) ou ligar **Música** (ativa danças automáticas).

---

## 🎵 5. Sistema de Música e Dança
- **AudioManager**: Componente que controla reprodução de músicas com callbacks de início/parada.
- **DanceManager**: Hook que gerencia as animações de dança baseado no estado da música.
- **3 tipos de dança**:
  - `DANCE`: Balanço básico de lado a lado (wiggle suave)
  - `DANCE_SPIN`: Giros de 360° progressivos
  - `DANCE_WIGGLE`: Wiggles frenéticos e intensos
- **Comportamento automático**: Quando música começa, Aggie começa a dançar. Troca de tipo a cada 3 segundos. Quando música para, volta ao comportamento normal.
- **Integração total**: Sistema integrado com AnimationEngine, useWanderAI e sistema de stats.

---

## 👗 6. Sistema de Roupas
- **5 roupas disponíveis**:
  - `PARTY_HAT`: Chapéu de festa colorido (vermelho, amarelo, azul)
  - `BOWTIE`: Gravata borboleta vermelha
  - `COLLAR`: Colar com pingente dourado
  - `SUNGLASSES`: Óculos de sol pretos
  - `SCARF`: Cachecol azul
- **Ativação via chat**: Frases específicas ativam cada roupa ("quero chapéu", "gravata", "colar", "óculos", "cachecol", "sem roupa").
- **Renderização procedural**: Todas as roupas desenhadas via Canvas 2D no arquivo `directions.js`.
- **Sistema de eventos**: Comandos configurados via banco de dados (model `ChatCommand`).
- **Respostas temáticas**: Cada roupa tem uma frase específica que a Aggie fala ao vestir.

---

## 🧠 7. Personalidade da IA (Lore & Corpus)
A IA backend (Gemini) e os eventos do frontend usam as seguintes diretrizes para dar vida à Aggie:
- **Dona/Mãe**: Agatha (Aggie deve exaltar a dona, falar bem dela, demonstrar que é um presente para ela).
- **Criador**: O Desenvolvedor (se perguntarem, quebra a 4ª parede: "Fui codificada com amor, pixel por pixel").
- **Traços de Humor**:
  - Gênio forte: Extremamente feliz ou extremamente brava. Extrovertida.
  - Carinhosa à sua maneira. Sarcástica às vezes, fofa em outras. Usa onomatopeias (`Prrr`, `Miau`, `Mrrrp`).
  - **Música/Preferências**: Canta e cantarola músicas da **Anavitória** (ex: Rua dos Abacateiros), **Tim Bernardes** e **Cazuza**.
  - **Saúde**: Reclama muito de dor nas costas (coluna). Tem péssima memória (esquece o contexto) e sofre um pouco de TPM às vezes.
  - **Notívaga**: Hábitos de dormir tarde ou à tarde (soninhos de 4 horas).
  - **Fome**: Vive com fome. Ama coisas salgadas, mas um docinho ou um cocke caem bem. Muda muito de opinião sobre o que comer.

---

## 🚀 8. Roadmap Imediato (O que construir depois)
As ideias planejadas para as próximas sessões:

1. **Tela de Bloqueio Melhorada**: Implementar tela de senha com estética pixel art 8-bits e persistência via localStorage.
2. **Cinematografia de Introdução**: Evento de aniversário com roteiro cinematográfico apresentando a gata como presente.
3. **Novas Roupas**: Expandir sistema com mais roupas (chapéu de pirata, coroa, etc).
4. **Novos Eventos**:
   - *Matrix/Hack*: Óculos escuro, chuva de código verde (chuva `matrixRain` já existe na UI do App).
   - *Detetive/Investigar*: Chapéu de detetive, andar abaixada (`CROUCH`).
   - *Ataque aos Balões*: Estourar balões que sobem na tela.
5. **Integração Real com IA**: Substituir as respostas simuladas por integração real com Gemini API.
6. **Sistema de Persistência**: Salvar estado do pet no localStorage para persistência entre sessões.

---

## 📚 9. Documentação Complementar
- **[README.md](README.md)** - Visão geral do projeto e como rodar
- **[AGGIE_MANUAL.md](AGGIE_MANUAL.md)** - Manual do usuário com comandos e funcionalidades
- **[PET_SPRITE_ARCHITECTURE.md](PET_SPRITE_ARCHITECTURE.md)** - Arquitetura detalhada do sistema de sprite
- **[EVENTS_ARCHITECTURE.md](EVENTS_ARCHITECTURE.md)** - Arquitetura do sistema de eventos
- **[AGENTS.md](AGENTS.md)** - Regras de design e personagem (para IAs)

---

## 🎯 10. Princípios de Desenvolvimento
Ao trabalhar neste projeto, siga estes princípios:

1. **Mobile-First Primeiro**: Sempre desenvolva pensando em dispositivos móveis primeiro
2. **Modularidade**: Mantenha cada componente/hook com responsabilidade única
3. **Sem Magic Numbers**: Use configurações do banco de dados sempre que possível
4. **Performance**: Otimize para 60 FPS nas animações Canvas
5. **Acessibilidade**: Use cores contrastantes e tamanhos de toque adequados
6. **Consistência**: Siga os padrões existentes de código e nomenclatura
7. **Testabilidade**: Escreva código que seja fácil de testar isoladamente
