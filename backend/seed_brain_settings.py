import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from brain.models import BrainSetting

# Novos pesos para configurações de Pacing de Tempo
settings = {
    "WANDER_INTERVAL_MS": 1500.0,
    "RUN_MOVE_TIME_MS": 1500.0,
    "WALK_MOVE_TIME_MS": 3500.0,
}

for key, value in settings.items():
    BrainSetting.objects.update_or_create(
        key=key,
        defaults={"value": value}
    )

print("Configurações de Pacing adicionadas ao banco com sucesso!")
