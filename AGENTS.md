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
- **Aparência Base**: Mantida no estilo "simples", sem animações complexas de idle (respiração). Apenas anda nas 4 direções e expressa humor via balão/sinais.

## 3. UI e Estilo Geral
- **Foco**: 100% Mobile-First.
- **Técnica**: Interface construída usando 100% CSS. Zero uso de imagens pre-renderizadas para o cenário ou para a gata (tudo via CSS/Canvas procedural).
