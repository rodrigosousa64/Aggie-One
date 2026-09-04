# 🐱 Aggie-One

**Um pet virtual 2D interativo com IA, criado como presente de aniversário.**

Aggie é uma gatinha atrevida inspirada na personalidade da Agatha. Pensada com foco **Mobile-First**, ela vive solta navegando pelos ecossistemas dos meus sites e sistemas. Ela anda sozinha pela tela, fala besteira, reclama da coluna e estuda Direito — tudo controlado por uma API REST e integração com IA generativa.

---

## 🎯 Objetivo do Projeto

Criar um **pet virtual inteligente** que:

1. **Fale sozinha** — A Aggie solta frases aleatórias baseadas na personalidade cadastrada no banco de dados, sem precisar de interação.
2. **Converse com IA** — Quando o usuário digita algo, a resposta é gerada por IA (Gemini API), temperada com os traços de personalidade da Agatha.
3. **Viva em qualquer lugar** — O projeto foi arquitetado como uma API REST separada do frontend, para que no futuro o pet possa ser embutido como um widget/biblioteca em outros sites e sistemas.
4. **Seja flexível sem código** — Toda a personalidade, roteiros de falas e estado do pet são controlados via banco de dados (Django Admin), permitindo atualizações em tempo real sem tocar no código.

---

## 🧠 Personalidade da Aggie

| Traço | Detalhe |
|---|---|
| 🗣️ Extrovertida | Fala bastante, alto astral, fala besteira |
| 😤 Gênio forte | Sempre alegre ou brava, muda de opinião fácil |
| 💛 Carinhosa à sua maneira | Não demonstra amor, mas se importa |
| 📚 Estudante de Direito | Usa termos jurídicos às vezes |
| 🍔 Ama comer besteira | Vive com fome |
| 😴 Dorme tarde / de tarde | Hábitos noturnos |
| 🦴 Dor na coluna | Reclama com frequência |
| 🧠 Péssima memória | Esquece coisas (feature, não bug) |

---

## 🏗️ Arquitetura

```
Aggie-One/
├── backend/                  # Django + Django Ninja (API REST)
│   ├── config/               # Settings, URLs
│   └── pet_core/             # App principal
│       ├── models.py         # PetState, PersonaTrait, ScriptedPhrase, MemoryContext
│       ├── api.py            # Endpoints: /state, /talk, /interact
│       └── admin.py          # Painel de controle (Django Admin)
│
├── frontend/                 # React + Vite (Mobile-First)
│   └── src/
│       ├── components/
│       │   ├── PetSprite/    # Gatinha desenhada via Canvas 2D (procedural pixel art)
│       │   ├── PixelRoom/    # Cenário base feito 100% com CSS
│       │   ├── ChatBubble/   # Balão de fala com efeito typewriter
│       │   └── MobileUIOverlay/ # Barra de interação (input + enviar)
│       └── App.jsx           # Container principal com lógica de movimentação
│
└── README.md
```

### Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/pet/state` | Retorna o estado atual (humor, energia, dor na coluna) |
| `GET` | `/api/pet/talk` | Retorna uma fala aleatória (do banco ou da IA) |
| `POST` | `/api/pet/interact` | Recebe mensagem do usuário e retorna resposta da IA |

---

## 🛠️ Stack Tecnológica

- **Frontend**: React (Vite) + Vanilla CSS + Canvas 2D
- **Backend**: Python + Django + Django Ninja
- **Banco de Dados**: SQLite
- **IA**: Gemini API (em integração)

---

## 🚀 Como Rodar

### Pré-requisitos
- Python 3.11+
- Node.js 18+

### Backend
```bash
cd Aggie-One
python -m venv venv
.\venv\Scripts\activate        # Windows
pip install django django-ninja django-cors-headers
cd backend
python manage.py migrate
python manage.py runserver
```
Acesse o painel admin em `http://localhost:8000/admin` para cadastrar personalidades e roteiros.

### Frontend
```bash
cd Aggie-One/frontend
npm install
npm run dev
```

---

## 🗺️ Roadmap

- [x] Estrutura base (API REST + Frontend separados)
- [x] Modelos dinâmicos (PersonaTrait, ScriptedPhrase)
- [x] Interface base e layout Mobile-First (CSS puro)
- [x] Gatinha procedural em Canvas 2D com 4 direções
- [x] Sistema de fala (balão com typewriter)
- [ ] Integração real com Gemini API
- [ ] Mecânicas de cuidado (alimentar, brincar)
- [ ] Roteiros e interações com contexto
- [ ] Transformar em biblioteca/widget embeddable
- [ ] Deploy

---

## 📝 Licença

Projeto pessoal. Feito para a Agatha.
