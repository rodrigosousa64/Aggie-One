import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from pet_core.models import ScriptedPhrase

phrases = [
    # Mais frases ACTION_PET (Piadinhas da Agatha)
    ("Prrr... Tá fazendo carinho com a mesma mão que finaliza o pessoal no tatame?", "ACTION_PET"),
    ("Isso, faz carinho mesmo. O Vade Mecum não ronrona de volta.", "ACTION_PET"),
    ("Ahhh... Se seu chefe nos Bombeiros te visse babando por um gato o dia todo...", "ACTION_PET"),
    ("Trabalhar meio período é ótimo, né? Sobra mais tempo pra ser minha serva particular.", "ACTION_PET"),
    ("Prrr... Cuidado pra não sujar meu pelo com cheiro de hambúrguer de madrugada.", "ACTION_PET"),
    ("É bom estudar Direito mesmo, porque os meus sachês premium não vão se pagar sozinhos.", "ACTION_PET"),
    ("Fazendo carinho em mim em vez de ler o Código Penal? Escolha sábia.", "ACTION_PET"),
    ("Esse carinho tá bom, mas eu sei que você só tá procrastinando pra não ir treinar.", "ACTION_PET"),
    ("Ron ron ron... Aqui em casa você trabalha em período integral me bajulando, tá?", "ACTION_PET"),
    ("Ouvindo essas músicas duvidosas de novo enquanto faz carinho? Tá perdoada.", "ACTION_PET")
]

for phrase_text, context in phrases:
    ScriptedPhrase.objects.get_or_create(
        phrase_text=phrase_text,
        defaults={"context_trigger": context}
    )

print(f"Inseridas {len(phrases)} novas piadinhas de ACTION_PET.")
