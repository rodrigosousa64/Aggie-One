---
name: clean-architecture-and-poo
description: Use esta skill para orientar a organização estrutural de pastas, apps, arquivos e decisões de design de software (quando usar Classes/POO vs Funções simples, onde colocar lógicas de negócio, selectors e services) no ecossistema Django + React.
---

# Guia de Arquitetura Limpa e Design de Código (POO vs Funções)

Este guia serve como bússola para organizar código sem complexidade desnecessária, mantendo cada responsabilidade no lugar certo.

---

## 1. O Mapa de Responsabilidades no Backend (Django)

Em vez de colocar tudo dentro de `views.py` ou `api.py` (o chamado código espaguete), separe o app em camadas claras:

```text
backend/meu_app/
├── models.py      # Camada de Dados: Definição das tabelas do banco de dados.
├── schemas.py     # Contratos da API: Schemas Pydantic (validação de entrada e saída).
├── api.py         # Camada de Entrega: Routers HTTP do Ninja (apenas valida e responde).
├── services.py    # Regras de Negócio / Ações: Lógica de escrita, mutação, cálculos pesados.
├── selectors.py   # Consultas e Leituras: Filtros complexos, queries otimizadas.
└── utils.py       # Funções Utilitárias: Funções puras sem dependência de banco (ex: normalizar texto).
```

### O que vai em cada arquivo?

| Arquivo | Responsabilidade | Exemplo Prático |
| :--- | :--- | :--- |
| **`models.py`** | Estrutura de dados | `class CourseOffering(models.Model)` |
| **`schemas.py`** | Validação de payloads HTTP | `class BuscQuotasQuery(Schema)` |
| **`api.py`** | Receber requisição HTTP e devolver resposta | `@router.get(...) def buscar(...)` |
| **`selectors.py`** | Fazer consultas com filtros complexos | `def filtrar_cursos_por_cota(filtros) -> QuerySet` |
| **`services.py`** | Executar cálculos ou operações de negócio | `def calcular_probabilidade_aprovacao(nota, cota)` |
| **`utils.py`** | Operações utilitárias gerais | `def remove_accents(texto: str) -> str` |

---

## 2. POO (Classes) vs Funções Simples: Quando usar cada uma?

Não transforme tudo em classe apenas por formalismo. Python e JavaScript funcionam muito bem com **funções puras**.

### Quando usar Funções Simples (KISS — Keep It Simple):
Use funções puras sempre que você tiver uma entrada e quiser uma saída direta, sem guardar estado:
* Normalizações de texto (`remove_accents`).
* Endpoints do Django Ninja (o Ninja foi projetado para funções!).
* Consultas simples e filtros no banco (`selectors.py`).
* Cálculos matemáticos diretos.

```python
# BOM: Simples, rápido e fácil de testar
def calcular_nota_final(redacao: float, pesos: dict) -> float:
    return sum(nota * pesos[mat] for mat, nota in notas.items())
```

### Quando usar Classes (POO):
Use Classes quando houver **estado mutável acumulado** ou **polimorfismo** (comportamentos diferentes compartilhando a mesma interface):

1. **Modelos de Dados do Django:** `models.Model` e `admin.ModelAdmin` (obrigatório do framework).
2. **Estratégias / Polimorfismo:** Quando você tem diferentes regras para um mesmo conceito:
   ```python
   # Exemplo de POO bem aplicada: Estratégias de Bonificação Regional
   class BaseBonusPolicy:
       def aplicar(self, nota: float) -> float:
           return nota

   class BonusRegionalInclusao(BaseBonusPolicy):
       def __init__(self, percentual: float = 0.10):
           self.percentual = percentual

       def aplicar(self, nota: float) -> float:
           return nota * (1 + self.percentual)
   ```
3. **Parsers ou Importadores de Dados:** Um objeto que lê um arquivo CSV/JSON grande e vai mantendo contadores de erros, linhas processadas e registros importados.

---

## 3. Onde moram as coisas no Frontend (React)

```text
frontend/src/
├── components/   # Blocos visuais reaproveitáveis (Cards, Botões, Badges, Modais)
├── pages/        # Telas inteiras (Home, VagasSobrando, DetalhesCurso)
├── hooks/        # Lógica de negócio e estado no cliente (useTRI, useFiltros)
├── services/     # Funções puras que chamam o backend (api.js, vagasService.js)
└── utils/        # Formatadores de moeda, notas, datas
```

### Regras Práticas para o React:
1. **Componentes pequenos:** Se um componente passou de 200 linhas, separe pedaços dele em componentes menores dentro de `components/`.
2. **Função do Componente:** Um componente React deve apenas receber dados via props e renderizar JSX. Não coloque cálculos matemáticos longos ou queries de API no meio do JSX.
3. **Hooks para lógica:** Se você tem lógica com `useState` e `useEffect` que calcula notas ou faz buscas, mova para um Custom Hook (`useCalculoNota.js`).

---

## 4. Checklist Rápido de Boa Prática

- [ ] A API (`api.py`) apenas orquestra: recebe requisição, chama o selector/service e devolve resposta.
- [ ] A lógica pesada ou filtros complexos estão em `services.py` ou `selectors.py`.
- [ ] Não crie classes vazias ou classes com apenas um método `def execute()`; prefira uma função simples.
- [ ] O frontend não faz `fetch` solto no meio do JSX; as chamadas moram na pasta `services/`.
