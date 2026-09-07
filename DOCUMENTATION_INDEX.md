# Índice de Documentação - Aggie-One

Este documento serve como um índice central para toda a documentação do projeto Aggie-One, organizado por propósito e público-alvo.

---

## 🚀 Começando Aqui

### Para Novos Desenvolvedores
1. **[README.md](README.md)** - Visão geral do projeto e como começar
2. **[AGGIE_CONTEXT.md](AGGIE_CONTEXT.md)** - Contexto completo e regras imutáveis
3. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guia de contribuição

### Para Usuários Finais
1. **[AGGIE_MANUAL.md](AGGIE_MANUAL.md)** - Manual do usuário completo
2. **[README.md](README.md)** - Visão geral e funcionalidades

### Para IAs e Assistentes
1. **[AGENTS.md](AGENTS.md)** - Regras de design e personagem (CRUCIAL)
2. **[AGGIE_CONTEXT.md](AGGIE_CONTEXT.md)** - Contexto técnico completo
3. **[TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)** - Arquitetura detalhada

---

## 📚 Documentação por Categoria

### 🎯 Visão Geral e Introdução
- **[README.md](README.md)** - Visão geral, objetivos, stack tecnológica, como rodar
- **[AGGIE_CONTEXT.md](AGGIE_CONTEXT.md)** - Contexto completo, regras imutáveis, personalidade
- **[ROADMAP.md](ROADMAP.md)** - Planejamento futuro e funcionalidades planejadas

### 🏗️ Arquitetura Técnica
- **[TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)** - Arquitetura técnica completa
  - Estrutura de arquivos
  - Fluxos de dados
  - Padrões de design
  - Performance optimization
  - Segurança
  - Escalabilidade

### 🎨 Design e Visual
- **[PET_SPRITE_ARCHITECTURE.md](PET_SPRITE_ARCHITECTURE.md)** - Sistema de renderização da gata
  - Motor de animação (AnimationEngine)
  - Sistema LERP
  - Movimentos biológicos
  - Como adicionar novas animações

### ⚡ Eventos e Interações
- **[EVENTS_ARCHITECTURE.md](EVENTS_ARCHITECTURE.md)** - Sistema de eventos
  - EventEngine
  - Sistema de acessórios
  - Como criar novos eventos
  - Eventos de lore

### 🤖 Inteligência Artificial e Personalidade
- **[AGENTS.md](AGENTS.md)** - Regras para IAs (CRUCIAL)
  - Regras imutáveis de design
  - Características da gata
  - Mecânicas de jogo
  - Regras de desenvolvimento

### 👤 Manual do Usuário
- **[AGGIE_MANUAL.md](AGGIE_MANUAL.md)** - Guia completo do usuário
  - Comandos de roupas
  - Sistema de música e dança
  - Cuidados básicos
  - Eventos especiais
  - Comportamento e humor
  - Solução de problemas

### 🔄 Histórico e Mudanças
- **[CHANGELOG.md](CHANGELOG.md)** - Histórico de versões e mudanças
  - Versão 2.0.0 (atual)
  - Versão 1.0.0 (inicial)
  - Convenções de versionamento

### 🤝 Contribuição
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guia de contribuição
  - Como reportar bugs
  - Como sugerir funcionalidades
  - Como contribuir com código
  - Padrões de código
  - Processo de review

### 📋 Planejamento
- **[BIRTHDAY_PLANNING.md](BIRTHDAY_PLANNING.md)** - Planejamento de aniversário
  - Ideias de eventos
  - Banco de frases
  - Personalidade da IA

---

## 🗂️ Estrutura de Arquivos por Propósito

### Para Desenvolvimento Frontend
```
frontend/src/
├── components/PetSprite/     # Veja PET_SPRITE_ARCHITECTURE.md
├── events/                   # Veja EVENTS_ARCHITECTURE.md
├── hooks/                    # Veja TECHNICAL_ARCHITECTURE.md
└── services/                 # Veja TECHNICAL_ARCHITECTURE.md
```

### Para Desenvolvimento Backend
```
backend/
├── brain/                    # Veja AGGIE_CONTEXT.md (seção Cérebro Dinâmico)
└── pet_core/                 # Veja TECHNICAL_ARCHITECTURE.md
```

### Para Configuração
```
backend/seed_*.py            # Scripts de seed - veja TECHNICAL_ARCHITECTURE.md
```

---

## 🎯 Guia Rápido por Tarefa

### "Quero adicionar uma nova animação"
1. Leia [PET_SPRITE_ARCHITECTURE.md](PET_SPRITE_ARCHITECTURE.md)
2. Siga o passo a passo na seção "Como adicionar uma nova animação"
3. Consulte [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) para padrões

### "Quero criar um novo evento"
1. Leia [EVENTS_ARCHITECTURE.md](EVENTS_ARCHITECTURE.md)
2. Siga o passo a passo na seção "Como registrar um novo Evento"
3. Consulte [AGENTS.md](AGENTS.md) para regras de design

### "Quero adicionar uma nova roupa"
1. Leia [AGGIE_MANUAL.md](AGGIE_MANUAL.md) para ver roupas existentes
2. Consulte [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) seção "Sistema de Roupas"
3. Siga padrões em [PET_SPRITE_ARCHITECTURE.md](PET_SPRITE_ARCHITECTURE.md)

### "Quero entender a arquitetura geral"
1. Comece com [README.md](README.md)
2. Leia [AGGIE_CONTEXT.md](AGGIE_CONTEXT.md)
3. Aprofunde com [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)

### "Quero contribuir com código"
1. Leia [CONTRIBUTING.md](CONTRIBUTING.md)
2. Consulte [AGENTS.md](AGENTS.md) para regras
3. Veja [CHANGELOG.md](CHANGELOG.md) para convenções

### "Sou uma IA assistindo no desenvolvimento"
1. **CRUCIAL**: Leia [AGENTS.md](AGENTS.md) primeiro
2. Leia [AGGIE_CONTEXT.md](AGGIE_CONTEXT.md) para contexto completo
3. Consulte [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) para detalhes técnicos

---

## 🔍 Por Documentação

### Documentação Essencial (LER PRIMEIRO)
- 📖 **[AGENTS.md](AGENTS.md)** - Regras imutáveis para IAs
- 📖 **[AGGIE_CONTEXT.md](AGGIE_CONTEXT.md)** - Contexto completo do projeto
- 📖 **[README.md](README.md)** - Visão geral

### Documentação Técnica
- 🏗️ **[TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)** - Arquitetura detalhada
- 🎨 **[PET_SPRITE_ARCHITECTURE.md](PET_SPRITE_ARCHITECTURE.md)** - Sistema de sprite
- ⚡ **[EVENTS_ARCHITECTURE.md](EVENTS_ARCHITECTURE.md)** - Sistema de eventos

### Documentação de Usuário
- 👤 **[AGGIE_MANUAL.md](AGGIE_MANUAL.md)** - Manual do usuário
- 🎮 **[README.md](README.md)** - Funcionalidades principais

### Documentação de Processo
- 🤝 **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guia de contribuição
- 🔄 **[CHANGELOG.md](CHANGELOG.md)** - Histórico de mudanças
- 📋 **[ROADMAP.md](ROADMAP.md)** - Planejamento futuro

---

## 🚨 Documentação Crítica para IAs

Se você é uma IA assistindo no desenvolvimento, **NÃO PULE** estes documentos:

1. **[AGENTS.md](AGENTS.md)** - CONTÉM REGRAS IMUTÁVEIS QUE NUNCA DEVEM SER VIOLADAS
2. **[AGGIE_CONTEXT.md](AGGIE_CONTEXT.md)** - CONTEXTO COMPLETO DO PROJETO
3. **[TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)** - ARQUITETURA TÉCNICA DETALHADA

**Ordem recomendada para IAs:**
1. AGENTS.md (regras imutáveis)
2. AGGIE_CONTEXT.md (contexto geral)
3. TECHNICAL_ARCHITECTURE.md (detalhes técnicos)
4. Documentação específica da tarefa

---

## 📊 Estatísticas de Documentação

### Total de Arquivos de Documentação
- **Arquivos .md na raiz**: 9
- **Arquivos de documentação**: 8
- **Arquivos de arquitetura**: 3
- **Arquivos de guias**: 2

### Cobertura de Tópicos
- ✅ Visão geral e introdução
- ✅ Arquitetura técnica completa
- ✅ Sistema de animação e renderização
- ✅ Sistema de eventos e interações
- ✅ Personalidade e lore
- ✅ Manual do usuário completo
- ✅ Guia de contribuição
- ✅ Planejamento futuro
- ✅ Histórico de mudanças

---

## 🔗 Links Rápidos

### Desenvolvimento
- [Setup do Ambiente](README.md#-como-rodar)
- [Padrões de Código](CONTRIBUTING.md#padrões-de-código)
- [Fluxo de Trabalho Git](CONTRIBUTING.md#fluxo-de-trabalho-git)

### Arquitetura
- [Estrutura de Arquivos](TECHNICAL_ARCHITECTURE.md#-estrutura-de-arquivos)
- [Fluxos de Dados](TECHNICAL_ARCHITECTURE.md#-fluxos-de-dados)
- [Padrões de Design](TECHNICAL_ARCHITECTURE.md#-padrões-de-design)

### Funcionalidades
- [Sistema de Roupas](AGGIE_MANUAL.md#-roupas-e-acessórios)
- [Sistema de Música](AGGIE_MANUAL.md#-música-e-dança)
- [Eventos Especiais](AGGIE_MANUAL.md#-eventos-especiais)
- [Sistema Tamagotchi](AGGIE_MANUAL.md#-sistema-tamagotchi)

### Regras e Convenções
- [Regras Imutáveis](AGENTS.md)
- [Regras de Design](AGGIE_CONTEXT.md#-regras-imutáveis-de-design)
- [Convenções de Versionamento](CHANGELOG.md#-convenções-de-versionamento)

---

## 🎓 Caminhos de Aprendizado

### Para Iniciantes
1. README.md → AGGIE_MANUAL.md → CONTRIBUTING.md
2. Focar em entender funcionalidades básicas
3. Começar com issues pequenas

### Para Desenvolvedores Intermediários
1. AGGIE_CONTEXT.md → PET_SPRITE_ARCHITECTURE.md → EVENTS_ARCHITECTURE.md
2. Entender arquitetura modular
3. Contribuir com novas funcionalidades

### Para Desenvolvedores Avançados
1. TECHNICAL_ARCHITECTURE.md → ROADMAP.md
2. Entender padrões avançados
3. Contribuir com arquitetura e performance

### Para IAs e Assistentes
1. AGENTS.md → AGGIE_CONTEXT.md → TECHNICAL_ARCHITECTURE.md
2. Seguir regras imutáveis estritamente
3. Consultar documentação específica da tarefa

---

## 📞 Suporte à Documentação

### Encontrou um erro na documentação?
- Reporte via GitHub Issues
- Use label "documentation"
- Seja específico sobre o erro

### Quer melhorar a documentação?
- Leia [CONTRIBUTING.md](CONTRIBUTING.md)
- Siga padrões de documentação existentes
- Submeta PR com melhorias

### Precisa de ajuda para entender?
- Use GitHub Discussions
- Consulte canais de comunicação
- Entre em contato com mantenedores

---

## 🔄 Atualização da Documentação

### Quando Atualizar
- Mudanças significativas no código
- Novas funcionalidades adicionadas
- Mudanças na arquitetura
- Atualizações de versão

### Como Atualizar
1. Atualize documentação relevante
2. Adicione entrada no CHANGELOG.md
3. Revise consistência entre documentos
4. Atualize este índice se necessário

### Responsabilidade
- Desenvolvedor: Atualizar documentação técnica
- Mantenedor: Revisar e aprovar mudanças
- Comunidade: Sugerir melhorias

---

## 🎯 Conclusão

Esta documentação foi criada para ser o recurso definitivo para o projeto Aggie-One. Seja você um desenvolvedor, usuário, ou IA assistente, a documentação adequada está aqui para ajudar.

**Lembre-se**: Para IAs, **AGENTS.md** é o documento mais crítico e deve ser lido primeiro.

---
*Última atualização: 2026-09-07*
*Versão: 1.0*
*Mantido por: Desenvolvedor*