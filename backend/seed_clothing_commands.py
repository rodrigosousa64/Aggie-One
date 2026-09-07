import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from brain.models import ChatCommand

def seed_clothing_commands():
    commands = [
        {
            "name": "Comando Chapéu de Festa",
            "keywords": "chapéu,party hat,festa,quero chapéu",
            "event_type": "CLOTHING_PARTY_HAT",
            "reply_text": "Olha meu chapéu de festa! 🎉",
            "is_active": True
        },
        {
            "name": "Comando Gravata",
            "keywords": "gravata,bowtie,elegante",
            "event_type": "CLOTHING_BOWTIE",
            "reply_text": "Estou elegante hoje, né? 😎",
            "is_active": True
        },
        {
            "name": "Comando Colar",
            "keywords": "colar,necklace,pingente",
            "event_type": "CLOTHING_COLLAR",
            "reply_text": "Gostei do colar!",
            "is_active": True
        },
        {
            "name": "Comando Óculos",
            "keywords": "óculos,sunglasses,óculos de sol,sol",
            "event_type": "CLOTHING_SUNGLASSES",
            "reply_text": "Agora estou Incógnito... 😎",
            "is_active": True
        },
        {
            "name": "Comando Cachecol",
            "keywords": "cachecol,scarf,frio",
            "event_type": "CLOTHING_SCARF",
            "reply_text": "Está um pouco frio, mas está bom!",
            "is_active": True
        },
        {
            "name": "Comando Sem Roupa",
            "keywords": "sem roupa,nu,sem acessório,remove,tirar",
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