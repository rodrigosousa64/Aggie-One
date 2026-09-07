import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

# Configuração (Recomenda-se setar GEMINI_API_KEY no arquivo .env)
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

# Schema explícito para economizar tokens e forçar a estrutura do JSON
response_schema = {
    "type": "OBJECT",
    "properties": {
        "reply": {"type": "STRING", "description": "Fala da Aggie"},
        "commands": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "type": {"type": "STRING", "description": "EQUIP_ACCESSORY, TRIGGER_EVENT ou SET_MOOD"},
                    "payload": {
                        "type": "OBJECT",
                        "properties": {
                            "id": {"type": "STRING", "description": "ID do acessório (ex: THUG_GLASSES)"},
                            "name": {"type": "STRING", "description": "Nome do evento (ex: HUNTING)"},
                            "mood": {"type": "STRING", "description": "Novo mood"}
                        }
                    }
                },
                "required": ["type", "payload"]
            }
        }
    },
    "required": ["reply", "commands"]
}

def generate_aggie_response(user_message, state, persona_context, local_time=None, last_event=None):
    if not api_key:
         return {"reply": "(Aviso: GEMINI_API_KEY não configurada no .env na pasta backend)", "commands": []}

    persona_block = persona_context.strip() if persona_context else (
        "Gata laranja virtual, sarcástica e carinhosa. Responda no personagem."
    )
    
    time_ctx = f"Hora local da Agatha: {local_time}." if local_time else ""
    event_ctx = f"Última coisa que aconteceu: {last_event}." if last_event else ""

    system_instruction = (
        "Você é Aggie. Responda SEMPRE no personagem, em português, de forma BREVE.\n"
        "Siga à risca o bloco de personalidade abaixo:\n"
        f"{persona_block}\n"
        f"CONTEXTO TEMPORAL/EVENTO: {time_ctx} {event_ctx} Se for de madrugada, reclame do sono. Se for de dia, seja ativa.\n"
        "Gatilhos (use commands se fizer sentido na conversa): "
        "Acessórios (EQUIP_ACCESSORY -> id): THUG_GLASSES, BIRTHDAY_HAT, MATRIX_GLASSES. "
        "Eventos (TRIGGER_EVENT -> name): WAKE_UP, EAT_TREAT, HUNTING, ZOOMIES, BUG_CATCH. "
        "Humor (SET_MOOD -> mood): feliz, brava, triste, normal, dormindo."
    )

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash", # Voltando para flash pois o 3.1 PRO exige chave paga
        system_instruction=system_instruction,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema=response_schema,
            temperature=0.7
        )
    )

    # Prompt super reduzido
    prompt = f"Estado:[E:{state.energy},F:{state.hunger},T:{state.boredom},M:{state.mood}] Msg:{user_message}"
    
    try:
        response = model.generate_content(prompt)
        return json.loads(response.text)
    except Exception as e:
        print(f"AI Error: {e}")
        return {"reply": "*Sem sinal de internet no tapete* (Erro interno)", "commands": []}
