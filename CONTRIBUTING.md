# Guia de Contribuição - Aggie-One

Este guia fornece instruções detalhadas sobre como contribuir com o projeto Aggie-One, seja com código, documentação, ideias ou feedback.

---

## 🤝 Como Contribuir

### 1. Reportando Bugs

Antes de reportar um bug, verifique se já existe uma issue semelhante.

**Como reportar um bug:**
1. Use o template de bug no GitHub Issues
2. Forneça um título descritivo
3. Descreva o problema em detalhes
4. Inclua passos para reproduzir
5. Adicione screenshots se aplicável
6. Especifique o ambiente (OS, navegador, versão)

**Template de Bug:**
```markdown
## Descrição
Breve descrião do problema.

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '....'
3. Role para '....'
4. Veja o erro

## Comportamento Esperado
Descrição do comportamento esperado.

## Capturas de Tela
Se aplicável, adicione capturas de tela.

## Ambiente
- OS: [ex: Windows 10]
- Navegador: [ex: Chrome 91]
- Versão: [ex: 2.0.0]

## Contexto Adicional
Informações adicionais sobre o problema.
```

### 2. Sugerindo Funcionalidades

Use o GitHub Issues para sugerir novas funcionalidades.

**Como sugerir uma funcionalidade:**
1. Verifique se a funcionalidade já foi sugerida
2. Use o template de feature request
3. Descreva a funcionalidade em detalhes
4. Explique o problema que ela resolve
5. Sugira possíveis soluções

**Template de Feature Request:**
```markdown
## Descrição da Funcionalidade
Descrição clara e concisa da funcionalidade.

## Problema que Resolve
Qual problema essa funcionalidade resolve?

## Solução Proposta
Descrição detalhada da solução proposta.

## Alternativas Consideradas
Quais alternativas você considerou?

## Contexto Adicional
Informações adicionais ou contexto.
```

### 3. Contribuindo com Código

#### Setup do Ambiente de Desenvolvimento

**Pré-requisitos:**
- Python 3.11+
- Node.js 18+
- Git

**Clonando o repositório:**
```bash
git clone https://github.com/seu-usuario/Aggie-One.git
cd Aggie-One
```

**Setup do Backend:**
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
cd backend
python manage.py migrate
python manage.py runserver
```

**Setup do Frontend:**
```bash
cd frontend
npm install
npm run dev
```

#### Fluxo de Trabalho Git

1. **Crie uma branch:**
```bash
git checkout -b feature/nova-funcionalidade
```

2. **Faça suas mudanças:**
- Siga os padrões de código existentes
- Escreva testes para novas funcionalidades
- Atualize a documentação se necessário

3. **Commit suas mudanças:**
```bash
git add .
git commit -m "feat: adicionar nova funcionalidade"
```

**Convenções de Commit:**
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `style:` mudanças de formatação
- `refactor:` refatoração de código
- `test:` adição de testes
- `chore:` manutenção geral

4. **Push e crie Pull Request:**
```bash
git push origin feature/nova-funcionalidade
```

#### Padrões de Código

**Frontend (React):**
- Use Functional Components
- Siga hooks patterns
- Use TypeScript quando possível
- Siga convenções de nomenclatura React
- Escreva componentes pequenos e focados

**Backend (Django):**
- Siga Django best practices
- Use Django Ninja para APIs
- Escreva models com campos bem documentados
- Use migrations para mudanças no banco
- Siga PEP 8 para Python

**Canvas 2D:**
- Siga padrões existentes no PetSprite
- Use coordenadas relativas ao size multiplier
- Mantenha funções de desenho puras
- Documente efeitos visuais complexos

#### Testes

**Frontend Tests:**
```bash
cd frontend
npm test
```

**Backend Tests:**
```bash
cd backend
python manage.py test
```

**Escrevendo Testes:**
- Testes unitários para funções puras
- Testes de integração para componentes
- Testes E2E para fluxos críticos
- Mantenha testes rápidos e confiáveis

### 4. Contribuindo com Documentação

A documentação é tão importante quanto o código.

**Áreas que precisam de documentação:**
- Novas funcionalidades
- Mudanças na API
- Padrões de arquitetura
- Guias de uso
- Troubleshooting

**Como melhorar a documentação:**
1. Leia a documentação existente
2. Identifique áreas que precisam de melhorias
3. Faça suas mudanças
4. Siga o estilo existente
5. Revise e submeta PR

**Arquivos de Documentação:**
- `README.md` - Visão geral
- `AGGIE_CONTEXT.md` - Contexto técnico
- `AGGIE_MANUAL.md` - Manual do usuário
- `TECHNICAL_ARCHITECTURE.md` - Arquitetura detalhada
- `ROADMAP.md` - Planejamento futuro
- `CHANGELOG.md` - Histórico de mudanças

### 5. Contribuindo com Design

**Design System:**
- Cores: Laranja (#f97316), Preto (#0a0a0a)
- Estilo: Pixel art procedural
- Mobile-First approach
- Minimalismo e simplicidade

**Assets:**
- Use Canvas 2D para gráficos
- Evite imagens pré-renderizadas
- Mantenha consistência visual
- Otimize para performance

---

## 📋 Processo de Review

### Pull Request Checklist

Antes de submeter um PR, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Changelog foi atualizado
- [ ] Commits seguem convenções
- [ ] Sem merge conflicts
- [ ] Build passa sem erros
- [ ] Linting não reporta problemas

### Processo de Review

1. **Revisão Automática:**
   - CI/CD checks
   - Linting
   - Testes automatizados

2. **Revisão Manual:**
   - Revisão de código
   - Revisão de design
   - Revisão de documentação
   - Testes manuais se necessário

3. **Aprovação:**
   - 1 aprovação mínima necessária
   - Todas as issues de review resolvidas
   - CI/CD passando

4. **Merge:**
   - Squash merge para branches de feature
   - Rebase para branches de longa duração
   - Delete branch após merge

---

## 🎯 Áreas de Contribuição Prioritárias

### Alta Prioridade
- Testes automatizados
- Documentação de API
- Melhorias de performance
- Acessibilidade

### Média Prioridade
- Novas roupas e acessórios
- Melhorias na IA
- Traduções
- Exemplos de uso

### Baixa Prioridade
- Pequenas refatorações
- Melhorias cosméticas
- Documentação de legacy code

---

## 🚀 Getting Started para Novos Contribuidores

### Primeiros Passos

1. **Leia a Documentação:**
   - Comece com README.md
   - Leia AGGIE_CONTEXT.md
   - Revise AGGIE_MANUAL.md

2. **Setup o Ambiente:**
   - Siga as instruções de setup
   - Rode o projeto localmente
   - Familiarize-se com o código

3. **Escolha uma Issue:**
   - Procure issues com label "good first issue"
   - Comente na issue que deseja trabalhar
   - Espere atribuição

4. **Faça suas Contribuições:**
   - Siga o fluxo de trabalho Git
   - Escreva código de qualidade
   - Teste suas mudanças

5. **Submeta PR:**
   - Descreva suas mudanças
   - Referencie issues relacionadas
   - Responda feedback de review

---

## 💬 Comunicação

### Canais de Comunicação
- **GitHub Issues**: Para bugs e funcionalidades
- **GitHub Discussions**: Para perguntas e discussões
- **Discord**: Para chat em tempo real (se disponível)
- **Email**: Para questões privadas

### Código de Conduta
- Seja respeitoso e inclusivo
- Aceite feedback construtivo
- Foque no que é melhor para a comunidade
- Mostre empatia com outros contribuidores

---

## 🏆 Reconhecimento

### Contribuidores
Todos os contribuidores serão reconhecidos no README.md e em documentos apropriados.

### Tipos de Contribuição
- Código
- Documentação
- Design
- Testes
- Traduções
- Feedback
- Divulgação

---

## 📚 Recursos Adicionais

### Documentação Técnica
- [React Documentation](https://react.dev)
- [Django Documentation](https://docs.djangoproject.com)
- [Django Ninja Documentation](https://django-ninja.rest-framework.com)
- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

### Ferramentas
- [VS Code](https://code.visualstudio.com) - Editor recomendado
- [Git](https://git-scm.com) - Controle de versão
- [Postman](https://www.postman.com) - Testes de API
- [Chrome DevTools](https://developer.chrome.com/docs/devtools) - Debugging

### Aprendizado
- [React Patterns](https://reactpatterns.com)
- [Django Best Practices](https://django-best-practices.readthedocs.io)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Refactoring](https://refactoring.guru)

---

## ❓ Perguntas Frequentes

### Preciso de permissão para contribuir?
Não! Qualquer pessoa pode contribuir. Basta seguir este guia.

### Posso contribuir com uma funcionalidade grande?
Sim, mas recomendamos começar com issues menores para se familiarizar com o códigobase.

### Como posso testar minhas mudanças?
Siga as instruções de setup e rode os testes. Para mudanças visuais, teste manualmente no navegador.

### E se eu quebrar algo?
Não se preocupe! Isso acontece. Reporte o problema e trabalharemos juntos para corrigir.

### Posso contribuir com documentação apenas?
Sim! Documentação é muito valorizada e essencial para o projeto.

---

## 🎉 Obrigado por Contribuir!

Agradecemos seu interesse em contribuir com o Aggie-One. Cada contribuição, não importa o tamanho, ajuda a tornar o projeto melhor para todos.

---
*Última atualização: 2026-09-07*
*Versão: 1.0*