---
name: mobile-first-responsive
description: >
  Use esta skill ao lidar com layout, responsividade e UX mobile no frontend React com Vanilla CSS.
  Orienta sobre media queries mobile-first, touch targets, safe areas, z-index stacking,
  posicionamento de FABs, bottom navigation, sticky ads e prevenção de CLS.
---

# Mobile-First Responsive — Skill de Referência

## 1. Filosofia: Mobile-First

Sempre escreva CSS base para **telas pequenas** primeiro (celular). Depois, use `@media (min-width: ...)` para **adicionar** complexidade em telas maiores.

```css
/* BASE = Mobile */
.card-grid {
  grid-template-columns: 1fr;
}

/* Tablet pra cima */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop pra cima */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

> ⚠️ **NUNCA** use `max-width` como breakpoint principal. Isso é abordagem desktop-first e gera CSS desnecessário.

---

## 2. Breakpoints Padrão do Projeto

| Token        | Valor       | Contexto                     |
|--------------|-------------|------------------------------|
| `sm`         | `480px`     | Celulares pequenos           |
| `md`         | `768px`     | Tablets / Celulares grandes  |
| `lg`         | `992px`     | Tablets landscape / Desktop  |
| `xl`         | `1200px`    | Desktop largo                |

---

## 3. Z-Index Stacking Order (CRÍTICO)

Manter uma tabela de z-index **centralizada** evita encavalamento:

| Camada                    | z-index | Descrição                           |
|---------------------------|---------|-------------------------------------|
| Bottom Nav                | `800`   | Barra de navegação inferior fixa    |
| Sticky Ad                 | `900`   | Anúncio fixo acima da bottom nav    |
| Sidebar                   | `1002`  | Menu lateral (slide-in)             |
| Sidebar Overlay           | `1001`  | Fundo escuro atrás da sidebar       |
| FABs (botões flutuantes)  | `1500`  | Floating Action Buttons             |
| Modals / Bottom Sheets    | `2000`  | Modais que cobrem tudo              |

---

## 4. Empilhamento Vertical de Elementos Fixos no Mobile

No mobile, o rodapé da tela tem vários elementos fixos empilhados. **Calcular a posição `bottom` de cada um é crítico**:

```
┌─────────────────────────┐
│                         │
│    Conteúdo da Página   │
│                         │
├─────────────────────────┤  ← FABs (bottom: 130px)
│   [Perfil] [TRI] [Menu] │
├─────────────────────────┤  ← Sticky Ad (bottom: 60px, height: ~60px)
│     [  Publicidade  ]   │
├─────────────────────────┤  ← Bottom Nav (bottom: 0, height: 60px)
│  Inicio Buscar Sobras   │
└─────────────────────────┘
```

### Regra de Ouro:
```
bottom_do_elemento = soma_das_alturas_de_todos_os_elementos_abaixo_dele
```

### Valores do projeto:
- **Bottom Nav**: `bottom: 0` / `height: 60px`
- **Sticky Ad**: `bottom: 60px` / `height: ~60px` (acima da nav)
- **FABs**: `bottom: 130px` (acima do ad + nav = 60 + 60 + 10 margem)
- **Conteúdo (padding-bottom)**: `≥ 140px` para nada ficar escondido

---

## 5. Touch Targets — Acessibilidade Mínima

Todo elemento interativo (botão, link, checkbox, input) precisa de:

```css
.interactive-element {
  min-height: 48px;
  min-width: 48px;
  -webkit-tap-highlight-color: transparent; /* Remove flash azul no Android */
}
```

---

## 6. Safe Areas (Notch / Barra de Navegação do Sistema)

Para iPhones com notch e celulares com barra de gestos:

```css
.bottom-element {
  padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
}
```

---

## 7. Prevenção de CLS (Cumulative Layout Shift)

O AdSense e imagens que carregam depois quebram o layout. **SEMPRE reserve o espaço antes de carregar**:

```css
/* Reserva espaço fixo para o anúncio */
.ad-slot--banner .ad-slot__inner {
  width: 100%;
  height: 80px; /* Fixo. Não usar auto ou min-height */
}

/* Para imagens */
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}
```

### AdSense no React — Regras:
1. **Nunca** use `data-ad-format="auto"` em espaços com altura fixa (banner, sticky).
2. **Nunca** use `data-full-width-responsive="true"` no sticky ad — ele vai expandir e quebrar tudo.
3. **Somente** use esses atributos em anúncios que podem crescer livremente (in-feed, skyscraper).

---

## 8. Tipografia Fluida

Use `clamp()` para fontes que escalam suavemente:

```css
h1 {
  font-size: clamp(1.2rem, 2.5vw + 0.5rem, 2rem);
}

p {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1rem);
}
```

---

## 9. Classes Utilitárias de Visibilidade

```css
/* Esconder no desktop, mostrar no mobile */
.mobile-only {
  display: none;
}

/* Esconder no mobile, mostrar no desktop */
.desktop-only {
  display: block;
}

@media (max-width: 992px) {
  .mobile-only {
    display: flex; /* ou block, conforme necessidade */
  }
  .desktop-only {
    display: none;
  }
}
```

---

## 10. Checklist Antes de Mandar pra Produção

- [ ] Testei no emulador mobile do DevTools (iPhone SE, Pixel 5)?
- [ ] Nenhum botão flutuante está encavalado com outro?
- [ ] A barra de pesquisa sticky respeita o `top` do header mobile?
- [ ] O conteúdo tem `padding-bottom` suficiente para não ficar atrás da bottom nav?
- [ ] Os anúncios do AdSense não estão expandindo além do espaço reservado?
- [ ] Touch targets têm no mínimo 48x48px?
- [ ] Modais usam `env(safe-area-inset-bottom)` no padding inferior?
