import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from brain.models import ChatCommand

commands = [
    ("Lore Risoto", "faz risoto pra mim,o risoto de camarao,risoto da agatha,faz um risoto,quero comer risoto", "LORE_RISOTO", ""),
    ("Lore Direito", "processos da faculdade,abrir o vade mecum,estudar direito agora,doutora agatha advogada,livro de direito", "LORE_DIREITO", ""),
    ("Lore Bolo", "pedaco de bolo de cenoura,bolo de cenoura com chocolate,vamos comer doce,fez bolo de cenoura", "LORE_BOLO", ""),
    ("Lore Sono", "acorda agatha dorminhoca,dormir ate meio dia,hora de levantar da cama,dor nas costas hoje,minha coluna ta doendo", "LORE_SONO", ""),
    ("Lore Series", "assistir la casa de papel,maratona de serie,filme vestido para casar,vamos ver serie,assistir um filme", "LORE_SERIES", ""),
    ("Lore Musica", "toca tim bernardes,canta uma musica,canta pra agatha,coloca anavitoria,toca cazuza", "LORE_MUSICA", ""),
    ("Lore Amor", "voce me ama agatha,quem e a mamae,eu sou sua mae,te amo muito,minha gatinha linda", "LORE_AMOR", ""),
]

for name, keywords, evt_type, reply in commands:
    ChatCommand.objects.update_or_create(
        name=name,
        defaults={"keywords": keywords, "event_type": evt_type, "reply_text": reply, "is_active": True}
    )

print("Agatha lore commands seeded successfully!")
