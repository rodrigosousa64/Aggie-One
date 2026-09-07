import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from brain.models import ActionProbability, AggiePhrase, BrainSetting, ChatCommand

actions = [
    ("WALK", 40),
    ("IDLE", 25),
    ("SIT_LOAF", 10),
    ("GROOM", 10),
    ("SIT", 10),
    ("JUMP", 2),
    ("YAWN", 5),
    ("SCRATCH", 8),
    ("TAIL_CHASE", 1),
    ("ZOOMIES", 1),
    ("HUNTING", 1),
]

for action_name, weight in actions:
    ActionProbability.objects.update_or_create(
        action_name=action_name,
        defaults={"weight": weight, "is_active": True}
    )

phrases = [
    ("TAIL_CHASE", "Tem alguma coisa na minha cauda!!", 10),
    ("FOME", "Miau... tô com fominha...", 10),
]

for category, text, weight in phrases:
    AggiePhrase.objects.update_or_create(
        category=category,
        text=text,
        defaults={"weight": weight, "is_active": True}
    )

settings = [
    ("GROOM_STOP_CHANCE", 0.6, "Chance da gata parar de se lamber (0.0 a 1.0)"),
    ("SIT_STOP_CHANCE", 0.4, "Chance da gata levantar quando está sentada (0.0 a 1.0)"),
    ("STATE_CHANGE_CHANCE", 0.2, "Chance limitadora de trocar de estado (0.0 a 1.0). Menor = Mais ações!"),
]

for key, val, desc in settings:
    BrainSetting.objects.update_or_create(
        key=key,
        defaults={"value": val, "description": desc}
    )

commands = [
    ("Evento Matrix", "quero entrar na matrix,mostra a matrix pra mim,faz o hack da matrix", "MATRIX", "Entrando na matrix..."),
    ("Evento Detetive", "bancar o detetive agora,procurar uma pista aí,quero ver você de detetive", "DETECTIVE", "Alguém falou em detetive? *coloca o chapéu*"),
    ("Evento Festa", "feliz aniversario aggie,vamos fazer uma festa,hoje e dia de festa", "BIRTHDAY", "Eba, festa!"),
    ("Evento Susto", "buuu tomar um susto,dar um susto nela", "STARTLE", "Miau!! Que susto!"),
    ("Evento Comida", "vem comer um sache,toma um petisco gostoso,quero te dar comida", "FEED", "Nhami nhami!"),
    ("Lore Criador", "quem foi que te criou,quem e seu criador,fala quem te fez", "LORE_CREATOR", "Fui codificada com muito amor..."),
    ("Lore Agatha", "fala da sua dona,quem e a agatha,conta sobre a agatha", "LORE_AGATHA", "A Agatha é a melhor dona do mundo!"),
]

for name, keywords, evt_type, reply in commands:
    ChatCommand.objects.update_or_create(
        name=name,
        defaults={"keywords": keywords, "event_type": evt_type, "reply_text": reply, "is_active": True}
    )

print("Brain seeded successfully.")
