from ninja import Router, Schema
from .models import PetState, PersonaTrait, ScriptedPhrase, MemoryContext, ThoughtRule
import random
from .ai_service import generate_aggie_response
from .selectors import get_active_persona_context

router = Router()

class PetStateSchema(Schema):
    mood: str
    energy: int
    hunger: int
    boredom: int
    affection: int
    anger: int
    back_pain_level: int
    active_accessory: str | None = None

class InteractionSchema(Schema):
    message: str
    local_time: str | None = None
    last_event: str | None = None

class CommandSchema(Schema):
    type: str   # "EQUIP_ACCESSORY" | "TRIGGER_EVENT" | "SET_MOOD"
    payload: dict

class InteractResponseSchema(Schema):
    reply: str
    commands: list[CommandSchema] = []

class ResponseSchema(Schema):
    reply: str

@router.get("/state", response=PetStateSchema)
def get_state(request):
    state, created = PetState.objects.get_or_create(id=1)
    return state

class PetStatePatchSchema(Schema):
    energy: int
    hunger: int
    boredom: int
    affection: int
    anger: int
    active_accessory: str | None = None

@router.patch("/state", response=PetStateSchema)
def update_state(request, payload: PetStatePatchSchema):
    state, _ = PetState.objects.get_or_create(id=1)
    for field, value in payload.dict().items():
        setattr(state, field, value)
    state.save()
    return state

@router.get("/talk", response=ResponseSchema)
def random_talk(request, context: str = None):
    if not context:
        state, _ = PetState.objects.get_or_create(id=1)
        context = "RANDOM"
        
        # Pega as regras ativas ordenadas por prioridade
        rules = ThoughtRule.objects.filter(is_active=True)
        
        for rule in rules:
            # Pega o valor do campo no estado da gata
            state_val = getattr(state, rule.condition_field, None)
            if state_val is None:
                continue
                
            condition_met = False
            
            # Avalia a condição
            try:
                if rule.condition_operator == '<':
                    condition_met = float(state_val) < float(rule.condition_value)
                elif rule.condition_operator == '>':
                    condition_met = float(state_val) > float(rule.condition_value)
                elif rule.condition_operator == '==':
                    condition_met = str(state_val) == str(rule.condition_value)
                elif rule.condition_operator == 'in':
                    condition_met = str(state_val) in [x.strip() for x in rule.condition_value.split(',')]
            except ValueError:
                pass # Ignora erro de conversão
                
            if condition_met:
                # Testa a chance de ativação
                if random.random() <= rule.activation_chance:
                    context = rule.context_trigger
                    break # Para na primeira regra de maior prioridade que passar


    # Tenta achar frases do contexto
    phrases = list(ScriptedPhrase.objects.filter(context_trigger=context))
    
    # Fallback se não tiver frase do contexto
    if not phrases:
        phrases = list(ScriptedPhrase.objects.filter(context_trigger="RANDOM"))
    
    if phrases:
        chosen = random.choice(phrases)
        return {"reply": chosen.phrase_text}
        
    return {"reply": "*Suspira* Minha coluna está doendo hoje..."}

@router.post("/interact", response=InteractResponseSchema)
def interact(request, payload: InteractionSchema):
    persona_context = get_active_persona_context()
    state, _ = PetState.objects.get_or_create(id=1)
    ai_data = generate_aggie_response(
        payload.message, 
        state, 
        persona_context, 
        payload.local_time, 
        payload.last_event
    )
    
    reply = ai_data.get("reply", "...")
    commands = ai_data.get("commands", [])

    # Salva no histórico
    MemoryContext.objects.create(user_message=payload.message, aggie_response=reply)
    
    return {"reply": reply, "commands": commands}
