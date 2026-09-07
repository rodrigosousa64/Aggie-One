import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from brain.models import ActionProbability

# Novos pesos para deixar a gata mais ativa
weights = {
    "WALK": 40.0,
    "RUN": 30.0,        # Ação nova adicionada!
    "ZOOMIES": 15.0,    
    "GROOM": 10.0,      # Reduzido
    "SIT": 10.0,        # Reduzido
    "YAWN": 10.0,
    "SCRATCH": 10.0,
    "IDLE": 5.0,
    "SIT_LOAF": 5.0,
    "TAIL_CHASE": 10.0,
    "HUNTING": 25.0,    # Aumentado muito (era 5)
    "JUMP": 15.0        # Aumentado muito (era 2)
}

for action_name, weight in weights.items():
    ActionProbability.objects.update_or_create(
        action_name=action_name,
        defaults={"weight": weight}
    )

print("Pesos do cérebro atualizados com sucesso!")
