import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from brain.models import ChatCommand

def seed_clothing_commands():
    commands = [
        {
            "name": "Comando Chapéu de Festa",
            "keywords": "coloca o chapeu de festa,quero ver o chapeu,bota o chapeu de festa",
            "event_type": "CLOTHING_PARTY_HAT",
            "reply_text": "Olha meu chapéu de festa! 🎉",
            "is_active": True
        },
        {
            "name": "Comando Gravata",
            "keywords": "coloca uma gravata elegante,quero ver a gravata,bota a gravata preta",
            "event_type": "CLOTHING_BOWTIE",
            "reply_text": "Estou elegante hoje, né? 😎",
            "is_active": True
        },
        {
            "name": "Comando Colar",
            "keywords": "coloca o seu colar,quero ver seu colar,bota o colar dourado",
            "event_type": "CLOTHING_COLLAR",
            "reply_text": "Gostei do colar!",
            "is_active": True
        },
        {
            "name": "Comando Óculos",
            "keywords": "coloca o oculos de sol,quero ver seu oculos,bota o oculos escuro",
            "event_type": "CLOTHING_SUNGLASSES",
            "reply_text": "Agora estou Incógnito... 😎",
            "is_active": True
        },
        {
            "name": "Comando Cachecol",
            "keywords": "coloca o seu cachecol,quero ver o cachecol,bota o cachecol nela",
            "event_type": "CLOTHING_SCARF",
            "reply_text": "Está um pouco frio, mas está bom!",
            "is_active": True
        },
        {
            "name": "Comando Sem Roupa",
            "keywords": "fica sem roupa nenhuma,tira esse acessorio dai,tira essa roupa logo",
            "event_type": "CLOTHING_NONE",
            "reply_text": "Pronto, sem roupa agora.",
            "is_active": True
        }
    ]
    
    for cmd_data in commands:
        command, created = ChatCommand.objects.get_or_create(
            name=cmd_data["name"],
            defaults={
                "keywords": cmd_data["keywords"],
                "event_type": cmd_data["event_type"],
                "reply_text": cmd_data["reply_text"],
                "is_active": cmd_data["is_active"]
            }
        )
        
        if created:
            print(f"Criado: {command.name}")
        else:
            # Atualiza se já existir
            command.keywords = cmd_data["keywords"]
            command.event_type = cmd_data["event_type"]
            command.reply_text = cmd_data["reply_text"]
            command.is_active = cmd_data["is_active"]
            command.save()
            print(f"Atualizado: {command.name}")

if __name__ == "__main__":
    print("Seedando comandos de roupas...")
    seed_clothing_commands()
    print("Seed de comandos de roupas concluido!")