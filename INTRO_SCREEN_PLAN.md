# Plano: Tela de Login Pixel Art e Cinemática de Introdução

Este plano detalha a implementação da tela de login estilo pixel art, sistema de persistência e cinemática de introdução para o Aggie-One.

---

## 🎯 Objetivo

Criar uma experiência de entrada memorável e temática que:
1. Apareça apenas no primeiro acesso (persistência via localStorage)
2. Tenha estética pixel art 8-bits consistente com o projeto
3. Apresente a Aggie como presente de aniversário através de cinemática
4. Transição suave para a experiência principal do jogo

---

## 🎨 1. Tela de Login Pixel Art (WelcomeScreen)

### Design Visual
- **Estilo**: Caixa retrô de 8-bits
- **Cores**: Preto (#0a0a0a), cinza escuro (#1a1a1a), laranja (#f97316)
- **Remover**: Efeito blur genérico de vidro
- **Adicionar**: Bordas grossas e quadradas estilo pixel

### Elementos da Interface

#### Container Principal
```css
.welcome-screen {
  background: #0a0a0a;
  border: 4px solid #1a1a1a;
  box-shadow: 8px 8px 0px #f97316; /* Sombra pixel art */
}
```

#### Caixa de Login
```css
.login-box {
  border: 4px solid #333;
  background: #111;
  box-shadow: 4px 4px 0px #f97316;
}
```

#### Campo de Senha
```css
.password-input {
  background: #0a0a0a;
  border: 2px solid #333;
  font-family: 'Courier New', monospace; /* Fonte retrô */
  color: #f97316;
  letter-spacing: 4px; /* Espaçamento estilo terminal */
}
```

#### Botão de Entrar
```css
.enter-button {
  background: #f97316;
  border: 4px solid #ea580c;
  box-shadow: 4px 4px 0px #1a1a1a;
  transition: all 0.1s;
}

.enter-button:active {
  transform: translate(4px, 4px); /* Efeito de afundar */
  box-shadow: 0px 0px 0px #1a1a1a;
}
```

#### Título e Texto
```css
.title {
  font-family: 'Courier New', monospace;
  color: #f97316;
  text-shadow: 2px 2px 0px #1a1a1a; /* Sombra pixel */
}
```

### Comportamento
- **Validação**: Senha correta = "17/06/2027"
- **Feedback**: 
  - Senha incorreta: Mensagem de erro estilo pixel
  - Senha correta: Transição suave para cinemática
- **Animações**: 
  - Título com efeito de glitch sutil
  - Botão com hover state pixelado
  - Input com foco retrô

---

## 💾 2. Persistência de Login (Local Storage)

### Implementação no App.jsx

#### Verificação Inicial
```javascript
const [isUnlocked, setIsUnlocked] = React.useState(() => {
  return localStorage.getItem('aggie_unlocked') === 'true';
});
```

#### Salvamento ao Desbloquear
```javascript
const handleUnlock = () => {
  localStorage.setItem('aggie_unlocked', 'true');
  setIsUnlocked(true);
  // Trigger cinemática de introdução se for primeiro acesso
  if (!hasSeenIntro) {
    triggerIntroCinematic();
  }
};
```

#### Reset para Testes (DevMenu)
```javascript
const resetLogin = () => {
  localStorage.removeItem('aggie_unlocked');
  localStorage.removeItem('aggie_intro_seen');
  window.location.reload();
};
```

### Flags de Local Storage
- `aggie_unlocked`: boolean - indica se já desbloqueou
- `aggie_intro_seen`: boolean - indica se já viu cinemática

---

## 🎬 3. Cinemática de Introdução

### Estrutura da Cinemática

#### Estado de Cinemática
```javascript
const [cinematicState, setCinematicState] = React.useState({
  isActive: false,
  currentLine: 0,
  isTyping: false,
  lines: [
    "...",
    "Você é a Agatha, certo?",
    "Feliz Aniversário! Me disseram que hoje é seu dia.",
    "Eu sou o seu presente. Meu nome é Aggie, e eu moro aqui agora.",
    "Você pode me fazer carinho, me alimentar no menu, ou me puxar pela sala (duplo clique!).",
    "Prometo não morder muito. Vamos brincar!"
  ]
});
```

#### Componente CinematicOverlay
```javascript
function CinematicOverlay({ onComplete }) {
  // Overlay preto com texto pixel art
  // Efeito typewriter para cada linha
  // Botão "Continuar" ou clique para avançar
  // Transição suave ao final
}
```

### Sequência de Eventos

#### 1. Tela Preta com Fade In
```css
.cinematic-overlay {
  background: #0a0a0a;
  animation: fadeIn 1s ease-in;
}
```

#### 2. Texto Typewriter Pixel
```javascript
const typeText = (text, index) => {
  // Efeito de digitação letra por letra
  // Fonte monospace retrô
  // Cor laranja #f97316
};
```

#### 3. Agressões da Aggie Durante Cinemática
- **Linha 1 ("...")**: Aggie em IDLE, olhando para tela
- **Linha 2**: Aggie vira para DOWN (olha para usuário)
- **Linha 3**: Aggie faz pequeno pulo (JUMP)
- **Linha 4**: Aggie senta (SIT) e balança cauda
- **Linha 5**: Aggie anda um pouco (WALK)
- **Linha 6**: Aggie entra em DANCE (pequena celebração)

#### 4. Transição Final
- Fade out do overlay
- Aggie em posição inicial
- Ativação completa da IA
- HUD aparece suavemente

### Comportamento da IA Durante Cinemática
```javascript
// Travamento temporário da IA
const [aiLocked, setAiLocked] = React.useState(true);

// Desbloqueio após cinemática
const handleCinematicComplete = () => {
  setAiLocked(false);
  localStorage.setItem('aggie_intro_seen', 'true');
  // Ativar comportamento normal
};
```

---

## 📂 Estrutura de Arquivos

### Arquivos a Criar
```
frontend/src/components/
├── WelcomeScreen/
│   ├── WelcomeScreen.jsx (atualizar)
│   ├── WelcomeScreen.css (recriar pixel art)
│   └── CinematicOverlay.jsx (novo)
├── CinematicOverlay/
│   ├── CinematicOverlay.jsx (novo)
│   └── CinematicOverlay.css (novo)
```

### Arquivos a Modificar
```
frontend/src/
├── App.jsx (adicionar lógica de persistência e cinemática)
├── hooks/
│   └── useCinematic.js (novo hook para gerenciar cinemática)
```

---

## 🔧 Implementação Técnica

### Passo 1: Recriar WelcomeScreen.css
- Remover todos os efeitos de blur/glass
- Implementar bordas pixel art grossas
- Adicionar sombras estilo 8-bits
- Usar fontes monospace retrô
- Cores: preto, cinza escuro, laranja

### Passo 2: Atualizar WelcomeScreen.jsx
- Adicionar validação de senha "17/06/2027"
- Implementar feedback visual de erro
- Adicionar efeitos sonoros (opcional)
- Transição para cinemática ao sucesso

### Passo 3: Criar CinematicOverlay
- Overlay Fullscreen preto
- Sistema de typewriter effect
- Sequenciamento de linhas
- Coordenação com animações da Aggie
- Sistema de skip (opcional)

### Passo 4: Implementar useCinematic Hook
```javascript
export function useCinematic(petContext) {
  const { setAction, setDirection, showChat } = petContext;
  
  const startCinematic = () => {
    // Sequência de falas e animações
    // Travamento temporário da IA
    // Coordenação com CinematicOverlay
  };
  
  return { startCinematic };
}
```

### Passo 5: Integrar no App.jsx
- Verificação localStorage no mount
- Lógica de desbloqueio
- Trigger de cinemática
- Desbloqueio da IA após cinemática

---

## 🎯 Estilo e Consistência

### Cores
- **Fundo**: #0a0a0a (preto)
- **Bordas**: #1a1a1a (cinza escuro)
- **Acentos**: #f97316 (laranja Aggie)
- **Texto**: #f97316 (laranja) / #ddd (cinza claro)
- **Erro**: #ef4444 (vermelho pixel)

### Fontes
- **Primária**: 'Courier New', monospace
- **Fallback**: 'Consolas', monospace
- **Estilo**: Retrô, pixel art

### Efeitos
- **Sombras**: 4px 4px 0px (hard shadow)
- **Bordas**: 4px solid (thick borders)
- **Transições**: 0.1s (snappy, não smooth)
- **Hover**: Transform translate (pixel movement)

---

## 🧪 Testes

### Casos de Teste
1. **Primeiro Acesso**
   - Tela de login aparece
   - Senha incorreta mostra erro
   - Senha correta desbloqueia
   - Cinemática roda
   - localStorage salva

2. **Acessos Posteriores**
   - Tela de login não aparece
   - Vai direto para experiência principal
   - Cinemática não roda novamente

3. **Reset de Testes**
   - DevMenu com botão "Reset Login"
   - Limpa localStorage
   - Recarrega página

4. **Skip de Cinemática**
   - Opção de pular cinemática (opcional)
   - Botão "Pular" durante cinemática
   - Salva que já viu cinemática

---

## 📋 Cronograma de Implementação

### Fase 1: Design Visual (1-2 horas)
- [ ] Recriar WelcomeScreen.css estilo pixel art
- [ ] Implementar bordas e sombras 8-bits
- [ ] Testar responsividade mobile
- [ ] Ajustar cores e fontes

### Fase 2: Lógica de Login (1 hora)
- [ ] Implementar validação de senha
- [ ] Adicionar feedback de erro
- [ ] Integrar persistência localStorage
- [ ] Testar fluxo completo

### Fase 3: Cinemática (2-3 horas)
- [ ] Criar componente CinematicOverlay
- [ ] Implementar efeito typewriter
- [ ] Criar useCinematic hook
- [ ] Coordenar animações da Aggie
- [ ] Implementar sequência de falas

### Fase 4: Integração (1 hora)
- [ ] Integrar no App.jsx
- [ ] Testar fluxo completo
- [ ] Ajustar transições
- [ ] Testar persistência

### Fase 5: Polimento (1 hora)
- [ ] Ajustar timing da cinemática
- [ ] Adicionar efeitos sonoros (opcional)
- [ ] Testar em diferentes dispositivos
- [ ] Otimizar performance

**Total Estimado**: 6-8 horas

---

## 🎨 Mockup Visual

### Tela de Login
```
┌─────────────────────────────────┐
│  🐱 AGGIE-ONE                   │
│  ┌───────────────────────────┐  │
│  │  PRESENTE DE ANIVERSÁRIO │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │  DATA DO ANIVERSÁRIO:     │  │
│  │  [ ____ / __ / ____ ]    │  │
│  └───────────────────────────┘  │
│                                 │
│  [  ENTRAR  ]                  │
│                                 │
│  Data: 17/06/2027              │
└─────────────────────────────────┘
```

### Cinemática
```
[TELA PRETA - FADE IN]

    "..."

    [Aggie olha para tela]

    "Você é a Agatha, certo?"

    [Aggie vira para você]

    "Feliz Aniversário! Me disseram que hoje é seu dia."

    [Aggie faz pequeno pulo]

    "Eu sou o seu presente. Meu nome é Aggie, e eu moro aqui agora."

    [Aggie senta e balança cauda]

    "Você pode me fazer carinho, me alimentar no menu, ou me puxar pela sala (duplo clique!)."

    [Aggie anda um pouco]

    "Prometo não morder muito. Vamos brincar!"

    [Aggie faz pequena dança]

    [FADE OUT - TRANSIÇÃO PARA JOGO]
```

---

## 🔮 Extensões Futuras

### Opcionais para V2.0
- [ ] Efeitos sonoros na cinemática
- [ ] Música temática de introdução
- [ ] Animações mais complexas da Aggie
- [ ] Sistema de skip com resumo
- [ ] Personalização da data (configurável)
- [ ] Múltiplas cinemáticas (feriados, eventos)

---

## 📝 Notas Importantes

### Regras de Design
- **MANTER**: Estilo pixel art consistente
- **MANTER**: Cores do projeto (preto, laranja)
- **MANTER**: Mobile-first approach
- **EVITAR**: Efeitos de blur/glass
- **EVITAR**: Animações suaves demais
- **FOCAR**: Estilo retrô 8-bits

### Performance
- Cinemática deve ser leve
- Evitar carregamento de assets externos
- Usar CSS puro para efeitos
- Otimizar para dispositivos móveis

### Acessibilidade
- Fontes legíveis em mobile
- Contraste adequado
- Feedback claro de ações
- Opção de pular cinemática

---

## ✅ Critérios de Sucesso

- [ ] Tela de login aparece apenas no primeiro acesso
- [ ] Estilo pixel art 8-bits consistente
- [ ] Senha "17/06/2027" funciona corretamente
- [ ] Cinemática roda suavemente após login
- [ ] Roteiro completo é exibido
- [ ] Aggie coordena animações com falas
- [ ] Transição para jogo é fluida
- [ ] Persistência funciona corretamente
- [ ] Reset funciona para testes
- [ ] Mobile-first responsive

---

## 🚀 Próximos Passos

Após aprovação deste plano:
1. Implementar WelcomeScreen.css pixel art
2. Atualizar WelcomeScreen.jsx com validação
3. Criar CinematicOverlay component
4. Implementar useCinematic hook
5. Integrar no App.jsx
6. Testar fluxo completo
7. Ajustar e polir

---
*Data do Plano: 2026-09-07*
*Versão: 1.0*
*Status: Aguardando Aprovação*