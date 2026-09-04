from ninja import Router, Schema
from .models import PetState, PersonaTrait, ScriptedPhrase, MemoryContext
import random

router = Router()

class PetStateSchema(Schema):
    mood: str
    energy: int
    back_pain_level: int

class InteractionSchema(Schema):
    message: str

class ResponseSchema(Schema):
    reply: str

@router.get("/state", response=PetStateSchema)
def get_state(request):
    state, created = PetState.objects.get_or_create(id=1)
    return state

@router.get("/talk", response=ResponseSchema)
def random_talk(request):
    # Lógica simples para puxar do BD
    phrases = list(ScriptedPhrase.objects.all())
    if phrases:
        chosen = random.choice(phrases)
        return {"reply": chosen.phrase_text}
    return {"reply": "*Suspira* Minha coluna está doendo hoje..."}

@router.post("/interact", response=ResponseSchema)
def interact(request, payload: InteractionSchema):
    # Aqui seria a integração com o Gemini
    # Por enquanto, mockamos a resposta baseada nos traços
    traits = PersonaTrait.objects.filter(is_active=True)
    traits_desc = ", ".join([t.trait_name for t in traits])
    
    reply = f"Você disse '{payload.message}'. Hmmm... (Lembre-se que eu sou: {traits_desc or 'apenas a Aggie'})"
    
    # Salva no histórico
    MemoryContext.objects.create(user_message=payload.message, aggie_response=reply)
    
    return {"reply": reply}
