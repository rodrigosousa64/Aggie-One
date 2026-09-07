import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pet_core.models import ScriptedPhrase

def run():
    phrases = [
        # Frases de Carinho (ACTION_PET)
        {"text": "Purrrrr... A Agatha tem as melhores mãos pra carinho do universo.", "context": "ACTION_PET"},
        {"text": "Aí sim... Isso compensa o fato da Agatha ter me deixado sozinha ontem.", "context": "ACTION_PET"},
        {"text": "Ron-ron... Se a Agatha continuar fazendo carinho assim, eu até deixo ela em paz de madrugada.", "context": "ACTION_PET"},
        {"text": "Mais pra esquerda, mamãe! Isso... perfeito. A Agatha me entende.", "context": "ACTION_PET"},
        
        # Frases Aleatórias / Tédio / Saudade da Agatha (RANDOM)
        {"text": "No próximo show que a Agatha for, ela bem que podia me levar na bolsa, né?", "context": "RANDOM"},
        {"text": "Será que a Agatha já comprou meu ingresso pro próximo show que ela vai? Gatos amam música alta, confia.", "context": "RANDOM"},
        {"text": "A Agatha sai pra curtir showzinho e me deixa aqui jogando no tapete. É muita injustiça.", "context": "RANDOM"},
        {"text": "Será que a Agatha tá pensando em mim? Provavelmente. Eu sou incrível.", "context": "RANDOM"},
        {"text": "Queria estar no colo da Agatha agora... mas ela deve estar ocupada. Humpf.", "context": "RANDOM"},
        
        # Frases de Tédio Específicas
        {"text": "Tô entediada... A Agatha bem que podia chegar com um brinquedo novo ou um VIP de algum show.", "context": "BORED"}
    ]
    
    count = 0
    for p in phrases:
        obj, created = ScriptedPhrase.objects.get_or_create(
            phrase_text=p["text"],
            context_trigger=p["context"]
        )
        if created:
            count += 1
            
    print(f"Adicionadas {count} frases sobre o carinho da Agatha e shows!")

if __name__ == '__main__':
    run()
