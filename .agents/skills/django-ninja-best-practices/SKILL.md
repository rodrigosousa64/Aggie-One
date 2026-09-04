---
name: django-ninja-best-practices
description: Use esta skill ao criar, refatorar ou consultar APIs REST construídas com Django Ninja. Ela orienta sobre schemas Pydantic, routers modulares, otimização de queries ORM e respostas HTTP semânticas.
---

# Diretrizes de Excelência com Django Ninja

O Django Ninja traz tipagem moderna (via Pydantic) e alta performance para o Django. Siga estas diretrizes para manter as APIs escaláveis, rápidas e tipadas.

---

## 1. Arquitetura de Routers (Centralizado vs Apps)

**Regra:** O arquivo central (ex: `core/api.py` ou `core/urls.py`) instancia o `NinjaAPI()`. Cada app possui seu próprio `Router()`.

```python
# backend/notas/api.py
from ninja import Router
from typing import List
from .models import CourseOffering
from .schemas import CourseOfferingSchema

router = Router(tags=["Notas"])

@router.get("/courses-offerings", response=List[CourseOfferingSchema])
def list_courses(request):
    return CourseOffering.objects.all().prefetch_related('quotas')
```

E no núcleo do projeto (`backend/core/api.py`):
```python
from ninja import NinjaAPI
from notas.api import router as notas_router
from vagas_sobrando.api import router as vagas_router

api = NinjaAPI(
    title="Capi Busque API",
    version="1.0.0",
    description="API desacoplada para busca de cursos e vagas"
)

api.add_router("/notas", notas_router)
api.add_router("/vagas-sobrando", vagas_router)
```

---

## 2. Pydantic Schemas (Entrada e Saída Estritos)

Sempre separe os schemas de entrada (`In` ou `Query`) dos schemas de saída (`Out`):

* **`Schema` de Saída:** Nunca exponha o modelo Django diretamente sem schema. O schema garante que senhas, campos sensíveis ou dados desnecessários não vazem para o frontend.
* **`ModelSchema` do Ninja:** Use quando a saída mapeia quase 1-para-1 com o modelo do Django:
  ```python
  from ninja import ModelSchema
  from .models import CourseOffering

  class CourseOfferingSchema(ModelSchema):
      class Meta:
          model = CourseOffering
          fields = ['id', 'course_name', 'institution', 'campus', 'shift']
  ```
* **Schemas para Filtros de Busca:** Use `Query(...)` com campos opcionais tipados:
  ```python
  from ninja import Schema
  from typing import Optional

  class CourseFilterSchema(Schema):
      search: Optional[str] = None
      cidade: Optional[str] = None
      page: int = 1
      limit: int = 20
  ```

---

## 3. Otimização de Queries (Prevenção do Problema N+1)

Django Ninja serializa os dados iterando sobre os registros. Se um schema acessa chaves estrangeiras ou relações reversas (`ReverseForeignKey` / `ManyToManyField`), o ORM fará uma nova query para CADA item se você não otimizar:

* **Para `ForeignKey` e `OneToOne`:** Use `.select_related('relacao')`
* **Para `ManyToManyField` e `ReverseForeignKey`:** Use `.prefetch_related('quotas')`
* **Para listas grandes:** Use `.only('id', 'name')` ou paginação em vez de carregar tabelas gigantes na memória.

---

## 4. Tratamento de Erros e Códigos HTTP

Use códigos HTTP corretos em vez de retornar `{ "error": "msg" }` com status 200:

```python
from ninja.errors import HttpError

@router.get("/cursos/{curso_id}")
def get_curso(request, curso_id: int):
    try:
        curso = CourseOffering.objects.get(id=curso_id)
        return curso
    except CourseOffering.DoesNotExist:
        raise HttpError(404, "Curso não encontrado")
```

Status usuais:
* `200 OK`: Sucesso em leitura/atualização.
* `201 Created`: Criação de novo recurso.
* `400 Bad Request`: Erro de regra de negócio.
* `404 Not Found`: Recurso não existe.
* `422 Unprocessable Entity`: O Django Ninja gera automaticamente quando o payload não bate com o Schema Pydantic.
