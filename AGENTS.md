# Regras de Design e Personagem (Aggie)

Este documento guarda as características fundamentais do projeto que **NUNCA devem ser alteradas ou pedidas novamente**, a menos que o usuário solicite explicitamente.

## 1. O Cenário (A Sala)
- **Estilo**: Sala preta e minimalista.
- **Fundo**: Preto (`#0a0a0a`), com iluminação ambiente suave.
- **Elemento Central**: **Apenas um tapete quadrado** no meio da tela.
- **Proibições no cenário**: Sem paredes visíveis, sem portas, sem brinquedos espalhados, sem caixa de areia, sem torre de gato. **NÃO adicionar objetos extras.**

## 2. A Gata (Aggie)
- **Sprite**: Pixel art procedural (Canvas 2D).
- **Cor**: **Laranja** (`orange = '#f97316'`, `darkOrange = '#ea580c'`).
- **Tamanho**: **Pequeno**.
  - O multiplicador de tamanho (`size`) deve ser mantido em **`3`**.
  - O Canvas (`CANVAS_WIDTH`, `CANVAS_HEIGHT`) deve ser mantido em **`120x120`**.
- **Aparência Base**: Mantida no estilo "simples", com animações biológicas (respiração, piscar, orelhas) via sistema procedural. Anda nas 4 direções e expressa humor via balão/sinais.

## 3. UI e Estilo Geral
- **Foco**: 100% Mobile-First.
- **Técnica**: Interface construída usando 100% CSS. Zero uso de imagens pre-renderizadas para o cenário ou para a gata (tudo via CSS/Canvas procedural).
- **HUD e Ícones**: Todos os ícones de status (`energy`, `hunger`, `affection`, `boredom`, `anger`, etc) e balões flutuantes de emoção (`EmotionBubble`) devem ser renderizados usando **SVG procedural ou Pixel Art gerado via CSS**. Proibido usar emojis de sistema (`🍗`, `⚡`) para representar mecânicas centrais da UI.

## 4. Mecânicas de Jogo e Vida (Stats)
- **Tédio (Boredom) Volátil**: O tédio sobe extremamente rápido de forma passiva. Causa hiperatividade (zoomies, caçar o próprio rabo) e botes de frustração na tela (`LUNGE`) se passar de 90.
- **Limites de Irritação (Anger)**: Fazer SPAM de cliques na tela irrita a gata, fazendo-a virar de costas (`UP`) e negar conversas. Comida cura a raiva quase instantaneamente.
- **Ciclo de Tempo Real**: A iluminação da sala e a drenagem de energia são baseadas no relógio real do sistema local (ex: drena mais rápido de tarde).
- **Quebra da 4ª Parede**: A gata reclama se a aba do navegador for abandonada e reaberta, usando a `Page Visibility API`.

## 5. Sistema de Animação e Movimento
- **Motor de Animação**: Usa AnimationEngine modular com sistema LERP para transições suaves
- **Movimentos Biológicos**: Respiração procedural, piscar assíncrono, tiques de orelha, cauda procedural
- **Animações de Dança**: Sistema de 3 tipos de dança (DANCE, DANCE_SPIN, DANCE_WIGGLE) ativadas automaticamente com música
- **Sequências Complexas**: Animações encadeadas via SequenceEngine (Hunting, Zoomies, etc)
- **Física Procedural**: Cauda com ondas senoidais, partículas de poeira, profundidade visual

## 6. Sistema de Roupas e Acessórios
- **Renderização Procedural**: Todas as roupas desenhadas via Canvas 2D (sem imagens pré-renderizadas)
- **Ativação via Chat**: Sistema de palavras-chave configuráveis via banco de dados
- **Roupas Disponíveis**: Chapéu de festa, gravata borboleta, colar, óculos de sol, cachecol
- **Respostas Temáticas**: Cada roupa tem uma frase específica que a Aggie fala ao vestir
- **Integração Visual**: Roupas se integram com sistema de direções e animações

## 7. Sistema de Música e Áudio
- **AudioManager**: Componente React que controla reprodução de músicas
- **Integração com Dança**: Música ativa automaticamente animações de dança
- **Volume Padrão**: 30% para não incomodar
- **Callbacks**: Sistema de callbacks para início/parada de música
- **Músicas Disponíveis**: Cat on a Rug, Cozy Kitty (expandível via código)

## 8. Sistema de Eventos e Inteligência
- **EventEngine**: Interceptador de palavras-chave no chat antes da IA
- **Cérebro Dinâmico**: Todas as configurações via Django Admin (sem magic numbers)
- **Probabilidades Configuráveis**: Chances de cada ação ajustáveis via banco de dados
- **Frases Contextuais**: Respostas baseadas em estado atual (fome, energia, tédio)
- **Eventos Frontend**: Matrix, Detetive, Aniversário, Roupas, etc

## 9. Personalidade e Lore
- **Nome**: Aggie (gata laranja, pequena, pixel art)
- **Dona/Mãe**: Agatha (Aggie deve exaltar a dona)
- **Criador**: Desenvolvedor (quebra 4ª parede quando perguntado)
- **Traços**: Extrovertida, gênio forte, carinhosa à sua maneira, sarcástica
- **Preferências Musicais**: Anavitória, Tim Bernardes, Cazuza
- **Comportamentos**: Reclama da coluna, péssima memória, TPM ocasional, notívaga
- **Fome**: Vive com fome, ama coisas salgadas mas gosta de doces

## 10. Regras de Desenvolvimento para IAs
- **Mobile-First**: Sempre desenvolver pensando em mobile primeiro
- **Modularidade**: Manter componentes/hooks com responsabilidade única
- **Sem Magic Numbers**: Usar configurações do banco de dados sempre que possível
- **Performance**: Otimizar para 60 FPS nas animações Canvas
- **Consistência**: Seguir padrões existentes de código e nomenclatura
- **Documentação**: Atualizar documentação quando fizer mudanças significativas
- **Testabilidade**: Escrever código que seja fácil de testar isoladamente
