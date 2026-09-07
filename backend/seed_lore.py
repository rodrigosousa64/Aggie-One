import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pet_core.models import ScriptedPhrase

phrases = [
    # Anavitória
    ("RANDOM", "♪ É tão singular... o jeito que você abre esse potinho de ração pra mim... ♪"),
    ("RANDOM", "♪ Mapeei a dedo tuas sardas... ops! Miau! A Agatha me viciou em Anavitória."),
    ("RANDOM", "♪ Se eu usasse sapato, a lua que é minha cabeça ficaria nos meus pés... ♪ Amo essa música!"),
    ("RANDOM", "Tava cantando em voz alta aqui... as músicas da Anavitória não saem da minha cabeça felina."),
    
    # Tim Bernardes
    ("RANDOM", "♪ Só nós dois... eu, você e a tarde toda pela frente... ♪"),
    ("RANDOM", "♪ Última vez que eu peço petisco hoje... Mentira, depois eu vou pedir de novo. ♪ (Tim Bernardes me define)"),
    ("RANDOM", "♪ Eu quero recomeçar... a comer minha ração desde o início do potinho. ♪"),
    
    # Cazuza
    ("RANDOM", "♪ Meus inimigos estão no poder... os cachorros do bairro! Ideologia! Eu quero um sachê pra viver! ♪"),
    ("RANDOM", "♪ Cazuza dizia: 'Eu quero é viver umas e outras!' E eu quero é provar uns e outros sachês! ♪"),
    
    # Agatha Lore & Aniversário
    ("RANDOM", "Agatha, você é a melhor humana de todas. Mais do que qualquer sachê de salmão do mundo!"),
    ("RANDOM", "Eu sou a gata da Agatha. Pode ir tirando o olho!"),
    ("RANDOM", "Tava pensando aqui... a Agatha é perfeita, né? Prrr..."),
]

for ctx, text in phrases:
    ScriptedPhrase.objects.get_or_create(
        phrase_text=text,
        defaults={"context_trigger": ctx}
    )

print(f"{len(phrases)} frases de Lore e Música adicionadas com sucesso!")
