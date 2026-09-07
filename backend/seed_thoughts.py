import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pet_core.models import ThoughtRule

def run():
    print("Limpando regras antigas...")
    ThoughtRule.objects.all().delete()

    regras = [
        {
            "rule_name": "Mau Humor (Brava/Triste)",
            "context_trigger": "NEGATIVE",
            "condition_field": "mood",
            "condition_operator": "in",
            "condition_value": "brava,triste",
            "priority": 110,
            "activation_chance": 0.9,
        },
        {
            "rule_name": "Fome Crítica",
            "context_trigger": "HUNGRY",
            "condition_field": "hunger",
            "condition_operator": "<",
            "condition_value": "40",
            "priority": 100,
            "activation_chance": 0.6,
        },
        {
            "rule_name": "Tédio Alto",
            "context_trigger": "BORED",
            "condition_field": "boredom",
            "condition_operator": ">",
            "condition_value": "70",
            "priority": 90,
            "activation_chance": 0.6,
        },
        {
            "rule_name": "Cansaço",
            "context_trigger": "LOW_ENERGY",
            "condition_field": "energy",
            "condition_operator": "<",
            "condition_value": "30",
            "priority": 80,
            "activation_chance": 0.8,
        }
    ]

    print("Semeando novas regras...")
    for r in regras:
        obj, created = ThoughtRule.objects.get_or_create(**r)
        if created:
            print(f"Criado: {obj.rule_name}")

    print("Semente de ThoughtRules plantada com sucesso!")

if __name__ == '__main__':
    run()
