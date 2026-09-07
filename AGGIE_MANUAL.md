# Manual da Aggie - Comandos e Funcionalidades

Este manual é o guia completo para interagir com a Aggie, sua gatinha virtual interativa.

---

## 🎭 Roupas e Acessórios
A Aggie pode vestir diferentes roupas através do chat. Basta digitar as frases abaixo:

### Comandos de Roupas
- **"quero chapéu"** → Coloca chapéu de festa colorido
- **"gravata"** → Coloca gravata borboleta vermelha
- **"colar"** → Coloca colar com pingente dourado
- **"óculos"** → Coloca óculos de sol pretos
- **"cachecol"** → Coloca cachecol azul
- **"sem roupa"** → Remove todos os acessórios

### Roupas Disponíveis
1. **PARTY_HAT** - Chapéu de festa com cores vibrantes (vermelho, amarelo, azul)
2. **BOWTIE** - Gravata borboleta vermelha elegante
3. **COLLAR** - Colar clássico com pingente dourado
4. **SUNGLASSES** - Óculos de sol estilo Incógnito
5. **SCARF** - Cachecol azul aconchegante

---

## 🎵 Música e Dança
A música é controlada pelo botão de áudio na interface.

### Controles de Música
- **Botão 🔊/🔇** → Liga/Desliga música
- **Botão ⏭️** → Troca para próxima música (quando está tocando)

### Comportamento de Dança
- Quando a música começa, a Aggie começa a dançar automaticamente
- Ela alterna entre 3 tipos de dança:
  - **DANCE** → Balanço básico de lado a lado (suave)
  - **DANCE_SPIN** → Giros de 360° progressivos
  - **DANCE_WIGGLE** → Wiggles frenéticos e intensos
- Troca de dança a cada 3 segundos
- Quando a música para, ela volta ao comportamento normal

### Músicas Disponíveis
- Cat on a Rug
- Cozy Kitty

---

## 🍽️ Cuidados Básicos
### Comandos de Cuidado
- **"comida"** → Alimenta a gata (sachê)
- **"brincar"** → Brinca com ela
- **"carinho"** → Faz carinho
- **"dormir"** → Coloca para dormir

### Botões de Interface
- **Botão Caixa de Brinquedos** → Abre menu com catnip e música
- **Botão Sachê** → Alimenta a gata diretamente

---

## 🎉 Eventos Especiais
### Comandos de Eventos
- **"aniversário"** → Ativa evento de aniversário com balões
- **"matrix"** → Ativa modo Matrix (chuva de código)
- **"detetive"** → Ativa modo detetive (coloca chapéu fedora)
- **"hack"** → Ativa modo hacker (sinônimo de matrix)
- **"!"** → Causa susto na gata

### Eventos Disponíveis
1. **BIRTHDAY** - Festa de aniversário com balões e bolo
2. **MATRIX** - Chuva de código verde estilo Matrix
3. **DETECTIVE** - Modo detetive com chapéu fedora
4. **STARTLE** - Susto com reação exagerada
5. **FEED** - Alimentação com animação
6. **LORE_CREATOR** - Informações sobre o criador
7. **LORE_AGATHA** - Informações sobre a Agatha

---

## 😾 Comportamento e Humor
A Aggie tem estados de humor que afetam suas reações:

### Estados de Humor
- **Normal** → Responde normalmente, brinca e interage
- **Brava** (anger > 80) → Vira de costas, recusa conversas
- **Com fome** (hunger < 30) → Pupilas dilatadas, pede comida
- **Entediada** (boredom > 80) → Hiperativa, zoomies, caça o próprio rabo
- **Cansada** (energy < 30) → Respiração ofegante, quer dormir
- **Dormindo** → Estado de sono, recupera energia

### Indicadores Visuais
- **💤** → Gata dormindo
- **😠** → Gata brava/irritada
- **😴** → Gata entediada
- **😋** → Gata com fome

---

## 🎮 Controles de Interface
### Interactions com a Gata
- **Duplo clique na gata** → Puxa pela sala (arrasta)
- **Clique simples** → Interação básica
- **Hover/Toque** → Aumenta carinho

### Elementos da Interface
- **Chat** → Envia mensagens para a Aggie
- **Status HUD** → Mostra stats (fome, energia, carinho, tédio, raiva)
- **Balão de Fala** → Mostra conversações com efeito typewriter
- **Botões de Ação** → Interações rápidas (alimentar, música)

---

## ⚠️ Limitações e Dicas
### Comportamento do Sistema
- **SPAM de cliques** → Irrita a gata (aumenta anger)
- **Comida** → Cura raiva quase instantaneamente
- **Abandonar aba** → A Aggie reclama quando você reabre o navegador
- **Ciclo de tempo real** → Iluminação e drenagem de energia baseadas no horário real

### Dicas de Uso
- **Mantenha a fome baixa** → A gata fica mais dócil e brincalhona
- **Evite deixar entediada** → Tédio alto causa hiperatividade descontrolada
- **Dê carinho regularmente** → Aumenta afinidade e reduz raiva
- **Use música para distrair** → Dança automaticamente quando música toca

---

## 🎨 Estilo e Design
### Características Visuais
- **Sala minimalista** → Fundo preto com iluminação suave
- **Pixel art procedural** → Tudo gerado via Canvas 2D
- **Mobile-first** → Interface otimizada para dispositivos móveis
- **Cores laranja** → Aggie é uma gata laranja (#f97316)

### Elementos do Cenário
- **Tapete quadrado** → Elemento central da sala
- **Iluminação ambiente** → Luz suave de fundo
- **Fundo preto** → Cor base (#0a0a0a)

---

## � Sistema Tamagotchi
### Stats Principais
1. **Fome (0-100)**: Aumenta passivamente, causa mau humor se alta
2. **Energia (0-100)**: Gasta com atividades, recupera dormindo
3. **Carinho (0-100)**: Aumenta com interações, afeta comportamento
4. **Tédio (0-100)**: Aumenta se deixada sozinha, causa hiperatividade
5. **Raiva (0-100)**: Aumenta com SPAM, diminui com comida

### Mecânicas de Dreno
- **Fome**: +2 por minuto normal, +5 se entediada
- **Energia**: -1 por minuto normal, -5 se correndo
- **Tédio**: +3 por minuto se sozinha
- **Carinho**: -5 por minuto sem interação

---

## 🧠 Sistema de IA
### Personalidade
- **Extrovertida** → Fala bastante, alto astral
- **Gênio forte** → Muda de humor rapidamente
- **Carinhosa** → Demonstra afeto à sua maneira
- **Sarcástica** → Usa ironia e humor
- **Musical** → Gosta de cantarolar

### Preferências
- **Músicas**: Anavitória, Tim Bernardes, Cazuza
- **Comidas**: Sachê, petiscos salgados, doces ocasionalmente
- **Atividades**: Brincar, caçar insetos, dormir
- **Horários**: Notívaga, gosta de sonecas à tarde

---

## �📝 Notas Técnicas
### Funcionamento Interno
- O sistema de IA usa palavras-chave para ativar eventos
- Roupas são renderizadas via pixel art no Canvas
- Animações usam sistema de interpolação (LERP) para suavidade
- Música fica em volume 30% por padrão
- Todas as configurações são controladas via Django Admin

### Arquitetura
- **Frontend**: React + Vite + Canvas 2D
- **Backend**: Django + Django Ninja
- **Banco de Dados**: SQLite
- **IA**: Gemini API (integração em desenvolvimento)

---

## 🆘 Solução de Problemas
### Problemas Comuns
- **Gata não responde**: Verifique se não está dormindo ou com raiva alta
- **Música não toca**: Verifique permissões de áudio do navegador
- **Roupas não aparecem**: Verifique se o comando foi digitado corretamente
- **Stats não mudam**: Verifique se o backend está rodando

### Dicas de Performance
- **Feche outras abas** → Melhora performance do Canvas
- **Use navegador moderno** → Melhora suporte a animações
- **Evite SPAM** → Previne irritação da gata

---

## 📞 Suporte
Para questões técnicas ou sugestões, consulte:
- **[AGGIE_CONTEXT.md](AGGIE_CONTEXT.md)** - Documentação técnica completa
- **[README.md](README.md)** - Informações do projeto
- **[EVENTS_ARCHITECTURE.md](EVENTS_ARCHITECTURE.md)** - Sistema de eventos

---
*Última atualização: 2026-09-07*
*Versão: 2.0*
*Autor: Desenvolvedor*
*Dedicado à: Agatha*