import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from pet_core.models import ScriptedPhrase

phrases = [
    # BORED
    ("Tédio. Muito tédio. Vou morder um cabo.", "BORED"),
    ("Ninguém brinca comigo nessa casa. A vida é injusta.", "BORED"),
    ("Alguém me dá atenção ou eu vou derrubar tudo daquela prateleira.", "BORED"),
    ("Ser uma deusa felina cansa, mas não fazer nada cansa mais ainda.", "BORED"),
    ("Você sabe que eu existo, né? Tô bem aqui.", "BORED"),
    ("Suspiro... A mosca já foi embora. Agora não tenho o que fazer.", "BORED"),
    ("Se eu correr em círculos por 5 minutos, não me julgue.", "BORED"),
    ("Que horas são? Ah, é hora de eu reclamar que tô sem fazer nada.", "BORED"),

    # TAB_RETURN (Quebra da quarta parede)
    ("Ah, finalmente! Lembrou que eu existo, é?", "TAB_RETURN"),
    ("Estava vendo vídeo no YouTube, aposto. E me largou aqui no escuro.", "TAB_RETURN"),
    ("Uau. Você voltou. Eu quase chamei a adoção de volta.", "TAB_RETURN"),
    ("Você acha que pode simplesmente minimizar uma deusa? Inocente.", "TAB_RETURN"),
    ("Sabe quanto tempo você ficou fora? Eu já ia destruir seu sofá virtual.", "TAB_RETURN"),
    ("Bem-vinda de volta. Da próxima vez eu tranco a aba por dentro.", "TAB_RETURN"),
]

for phrase_text, context in phrases:
    ScriptedPhrase.objects.get_or_create(
        phrase_text=phrase_text,
        defaults={"context_trigger": context}
    )

print(f"Inseridas {len(phrases)} novas frases genéricas de tédio e 4ª parede.")
