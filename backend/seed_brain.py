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
    ("STATE_CHANGE_CHANCE", 0.6, "Chance de trocar de estado quando está IDLE/WALK (0.0 a 1.0)"),
]

for key, val, desc in settings:
    BrainSetting.objects.update_or_create(
        key=key,
        defaults={"value": val, "description": desc}
    )

commands = [
    ("Evento Matrix", "hack,matrix,frio", "MATRIX", "Entrando na matrix..."),
    ("Evento Detetive", "procurar,investigar,procura,detetive", "DETECTIVE", "Alguém falou em detetive? *coloca o chapéu*"),
    ("Evento Festa", "aniversario,aniversário,festa", "BIRTHDAY", "Eba, festa!"),
    ("Evento Susto", "!", "STARTLE", "Miau!! Que susto!"),
    ("Evento Comida", "sachê,petisco,comida,toma,come,ração,sache", "FEED", "Nhami nhami!"),
    ("Lore Criador", "quem te criou,quem fez você,fez você", "LORE_CREATOR", "Fui codificada com muito amor..."),
    ("Lore Agatha", "agatha,sua dona,dona", "LORE_AGATHA", "A Agatha é a melhor dona do mundo!"),
]

for name, keywords, evt_type, reply in commands:
    ChatCommand.objects.update_or_create(
        name=name,
        defaults={"keywords": keywords, "event_type": evt_type, "reply_text": reply, "is_active": True}
    )

print("Brain seeded successfully.")
