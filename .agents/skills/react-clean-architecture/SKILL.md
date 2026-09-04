---
name: react-clean-architecture
description: Use esta skill ao desenvolver componentes, páginas, hooks e comunicação de API no frontend React com Vite. Orienta sobre separação de responsabilidades, consumo limpo de APIs REST e organização de estado e CSS.
---

# Diretrizes de Clean Architecture no React + Vite

Esta skill estabelece a estrutura e as boas práticas para criar um frontend desacoplado limpo, previsível e sustentável.

---

## 1. Estrutura de Pastas Recomendada

Mantenha `frontend/src/` organizado por papel arquitetural:

```text
src/
├── assets/          # Imagens, fontes, SVGs estáticos
├── components/      # Componentes de UI reutilizáveis (botões, cards, modais, headers)
│   ├── Card/
│   │   ├── Card.jsx
│   │   └── Card.css
│   └── Header/
├── pages/           # Telas completas associadas às rotas
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   └── VagasSobrando/
├── hooks/           # Lógica de estado e integração reutilizável (ex: useTRI, useVagas)
├── services/        # Funções puras que fazem requisições HTTP (fetch/axios) para o Django Ninja
│   └── api.js       # Cliente HTTP configurado com baseUrl
├── utils/           # Funções utilitárias puras (formatação de notas, datas, strings)
├── Router.jsx       # Definição das rotas (react-router-dom)
└── index.css        # Variáveis globais, reset e tipografia
```

---

## 2. A Regra de Ouro: Nunca faça `fetch()` solto dentro do JSX

Separar **Visualização (UI)** da **Comunicação de Dados** é o que torna o código profissional:

### Passo 1: O Serviço HTTP (`src/services/cursosService.js`)
```javascript
// Funções puras de chamada à API
const BASE_URL = '/api'; // Graças ao proxy do Vite ou URL direta

export async function getVagasSobrando(filtros = {}) {
  const params = new URLSearchParams(filtros).toString();
  const response = await fetch(`${BASE_URL}/vagas-sobrando/?${params}`);
  if (!response.ok) {
    throw new Error('Falha ao carregar vagas sobrando');
  }
  return response.json();
}
```

### Passo 2: O Hook Customizado (`src/hooks/useVagasSobrando.js`)
```javascript
import { useState, useEffect } from 'react';
import { getVagasSobrando } from '../services/cursosService';

export function useVagasSobrando(filtros) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getVagasSobrando(filtros)
      .then(res => {
        if (isMounted) setData(res);
      })
      .catch(err => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [JSON.stringify(filtros)]);

  return { data, loading, error };
}
```

### Passo 3: O Componente / Página apenas consome
```javascript
// O componente fica limpo, legível e focado apenas no visual
export function VagasSobrando() {
  const { data: vagas, loading, error } = useVagasSobrando();

  if (loading) return <div className="spinner">Carregando vagas...</div>;
  if (error) return <div className="erro">{error}</div>;

  return (
    <div className="vagas-grid">
      {vagas.map(vaga => <CursoSobrasCard key={vaga.id} curso={vaga} />)}
    </div>
  );
}
```

---

## 3. Gerenciamento de Estado (KISS: Keep It Simple)

1. **Estado Local (`useState`):** Use para coisas exclusivas do componente (ex: `isExpanded`, dropdown aberto, input de texto).
2. **Subir o Estado (*Lifting State Up*):** Se dois componentes irmãos precisam da mesma informação, coloque o estado no componente pai e passe via props.
3. **Estado Global (`Context API`):** Use apenas para informações globais de verdade (ex: usuário autenticado, tema Dark/Light, notas do ENEM salvas na sessão). Evite colocar tudo no Context para não causar re-renders pesados.

---

## 4. Organização do CSS

* Como você já domina CSS, agrupe o arquivo `.css` ao lado do componente (`Card.jsx` e `Card.css`).
* Para evitar que uma classe `.titulo` afete a página inteira, use prefixos (metodologia BEM simples):
  - `.curso-card`
  - `.curso-card__header`
  - `.curso-card__badge--ativo`
