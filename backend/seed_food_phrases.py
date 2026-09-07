import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pet_core.models import ScriptedPhrase

def run():
    phrases = [
        "Estou faminta... Daria tudo por aquele Estrogonofe perfeito da Agatha agora.",
        "Sachê é bom, mas o Bolo de Cenoura da Agatha é uma obra de arte.",
        "Se a Agatha fizesse aquele Risoto de Camarão hoje, eu juro que perdoaria qualquer coisa.",
        "Ninguém faz um Estrogonofe igual ao da minha dona. Tô com fome só de lembrar!",
        "Pensando aqui... um pedacinho daquele Risoto de Camarão da Agatha ia salvar meu dia.",
        "Até sonhei com o Bolo de Cenoura da Agatha. Que crueldade acordar com fome!"
    ]
    
    count = 0
    for phrase in phrases:
        obj, created = ScriptedPhrase.objects.get_or_create(
            phrase_text=phrase,
            context_trigger="HUNGRY"
        )
        if created:
            count += 1
            
    print(f"Adicionadas {count} frases exclusivas de fome sobre as comidas da Agatha!")

if __name__ == '__main__':
    run()
