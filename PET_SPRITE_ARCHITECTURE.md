# Arquitetura do PetSprite (Engine v2.0 - Tweening e Modularidade)

Este documento explica como o componente principal do mascote (Aggie) está estruturado após a atualização para a arquitetura de Interpolação Matemática (LERP) e módulos de animação separados.

## 📂 Estrutura de Arquivos

Toda a lógica de renderização e comportamento visual está centralizada em `frontend/src/components/PetSprite/`:

- **`constants.js`**: Guarda todas as variáveis globais (Cores, Tamanhos, Velocidades de cada Ação).
- **`PetSprite.jsx`**: É o wrapper React. Ele cuida do Canvas, do Game Loop (`requestAnimationFrame`) e do **Motor LERP**. É aqui que a matemática faz as transições de estado serem suaves em 60fps.
- **`renderCat.js`**: É o renderizador base. Ele pega o estado LERP atual (escala, rotação, posição Y) e aplica no Canvas Context (`translate`, `rotate`, `scale`) antes de desenhar o corpo base.
- **`directions.js`**: Contém instruções específicas de desenho (`drawDown`, `drawUp`, `drawLeft`, `drawRight`). 
- **`animations/`**: A nova pasta modular! Contém o `AnimationEngine.js` (o cérebro central) e as subpastas `actions/` e `sequences/` contendo cada animação em arquivos separados.

---

## 🛠️ Como adicionar uma nova animação/ação?

Graças à nova arquitetura, o motor de animação é **totalmente modular**. Você não precisa mais fazer `if/else` gigantes nos arquivos principais do Game Loop.

### Passo 1: Definir a velocidade da animação
Abra o arquivo `constants.js` e adicione a velocidade da sua nova ação no dicionário `SPEEDS` (ex: `EAT_TREAT: 8`). Quanto menor o número, mais rápido os frames vão rodar.

### Passo 2: Criar o Arquivo da Animação
Na pasta `animations/actions/` (ou `sequences/` se for um fluxo encadeado temporalmente), crie um novo arquivo, por exemplo `EatTreat.js`.

Este arquivo deve exportar um objeto com até 3 funções opcionais, permitindo que a ação sobrescreva comportamentos padrão:

```javascript
export const EatTreat = {
  // 1. Define os alvos matemáticos (LERP) para esticar, achatar, pular ou rodar
  getTargets: (action, frame) => {
    // Exemplo: Senta e estica um pouquinho para cima
    return { sitDrop: 2, stretchY: 1.1 };
  },

  // 2. (Opcional) Força o gato a olhar para um lado específico, ignorando o setDirection
  getDirectionOverride: (direction, frame) => {
    return 'DOWN';
  },

  // 3. (Opcional) Desenha pixels extras no Canvas (ex: particulas, patas soltas, acessórios)
  drawExtras: (ctx, direction, frame, size, orange) => {
    ctx.fillStyle = '#ff0000';
    // Lógica para desenhar um petisco no chão
  }
};
```

### Passo 3: Registrar na Engine
Abra o arquivo `animations/AnimationEngine.js` e importe o seu novo arquivo. Adicione a sua nova ação no dicionário `actionMap`:

```javascript
import { EatTreat } from './actions/EatTreat';

const actionMap = {
  // ... outras ações já existentes
  EAT_TREAT: EatTreat
};
```
Pronto! A Engine fará todo o resto de forma automática. O corpo vai interagir com as escalas suavemente.

---

## 🎨 Adicionando Expressões ou Efeitos (Mood)

Se você quiser adicionar uma gota de suor, um balão de fala ou mudar os olhos com base no `mood`, siga estas regras:
- **Efeitos fora do corpo** (ex: emojis/balões em HTML/CSS): modifique o `PetSprite.jsx` e adicione divs flutuantes (como a div `mood-indicator`).
- **Efeitos globais baseados na Ação**: Adicione nos arquivos modulares individuais dentro do método `drawExtras`.
- **Expressões faciais atreladas ao Humor**: Modifique `directions.js` na parte onde os olhos e boca são desenhados e verifique a string da prop `mood`.
