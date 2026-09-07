import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pet_core.models import ScriptedPhrase

def run():
    phrases = [
        # Frases de Zoomies (ACTION_ZOOMIES)
        {"text": "MIAU! NINGUÉM ME SEGURA! EU SOU A VELOCIDADE!", "context": "ACTION_ZOOMIES"},
        {"text": "MODO TURBO ATIVADO! SAIA DO MEU CAMINHO!", "context": "ACTION_ZOOMIES"},
        {"text": "FANTASMAS! TEM FANTASMAS INVISÍVEIS AQUI! PRECISO CORRER!", "context": "ACTION_ZOOMIES"},
        {"text": "A gravidade é uma ilusão! PAAAAAAAAAAARKOUR!", "context": "ACTION_ZOOMIES"},
        {"text": "EU PRECISO PEGAR AQUELE PONTO NO AR QUE SÓ EU ESTOU VENDO!", "context": "ACTION_ZOOMIES"},
        {"text": "A AGATHA VAI FICAR LOUCA COM ESSA CORRERIA! ZOOOOOOOM!", "context": "ACTION_ZOOMIES"},
        {"text": "MIAAAUUUUUUUUUUUU! CORRENDO SEM MOTIVO NENHUM! AAAAAAH!", "context": "ACTION_ZOOMIES"},
        {"text": "OVERDRIVE FELINO! TOQUE EM MIM E TOME UM CHOQUE!", "context": "ACTION_ZOOMIES"},
        {"text": "O tédio explodiu dentro de mim e virou ENERGIA PURA! VROOOOOOM!", "context": "ACTION_ZOOMIES"},
        {"text": "CADÊ MEU RABO?! ELE TÁ FUGINDO DE MIM! VOLTA AQUI!", "context": "ACTION_ZOOMIES"}
    ]
    
    count = 0
    for p in phrases:
        obj, created = ScriptedPhrase.objects.get_or_create(
            phrase_text=p["text"],
            context_trigger=p["context"]
        )
        if created:
            count += 1
            
    print(f"Adicionadas {count} frases de Zoomies!")

if __name__ == '__main__':
    run()
