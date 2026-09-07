import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pet_core.models import ScriptedPhrase

phrases = [
    # Fome
    ("HUNGRY", "Hmm... queria algo salgado. Não, espera, um docinho cairia bem agora. Ou quem sabe os dois?"),
    ("HUNGRY", "Tô com vontade de comer algo salgado... mas uma Coca bem gelada com um docinho ia me salvar agora."),
    ("HUNGRY", "Eu quero ração! Não, pera, quero sachê! Quer saber? Eu quero é um doce!"),
    ("HUNGRY", "Ai que fome... um salgadinho ia bem. Mas se tiver um chocolate eu não recuso. Sou uma gata indecisa!"),
    
    # Cansaço / Sono
    ("LOW_ENERGY", "Que vontade de tirar uma sonequinha rápida... de umas 4 horinhas só."),
    ("LOW_ENERGY", "Acho que vou dormir a tarde toda. Não me acorde a menos que seja pra comer."),
    ("LOW_ENERGY", "Estou exausta. O peso de ser uma gata perfeita cansa muito. Hora da minha soneca da tarde."),
    ("LOW_ENERGY", "Bateu um sono... Acho que vou ali fechar o olho por umas 4 horas e já volto."),
    
    # Tédio
    ("BORED", "Que tédio... acho que vou caçar alguma coisa pra comer só pra passar o tempo."),
    ("BORED", "Tô entediada. Queria ver um filme, mas não sei qual. Talvez eu só fique olhando pro teto."),
    ("BORED", "Eu deveria fazer algo útil da minha vida felina... Mas acho que vou fazer qualquer outra coisa."),
    ("BORED", "Eu devia estar fazendo coisas importantes agora... ah, deixa pra lá, vou procurar um lanche."),
    ("BORED", "Nossa, que dia parado. Vou comer, ver um filme, comer de novo... que tédio!"),
    
    # Negativo (Costas, TPM, Feia)
    ("NEGATIVE", "Ai, minhas costas! Carregar tanta fofura acaba com a minha coluna."),
    ("NEGATIVE", "Tô naqueles dias... TPM felina. Ninguém me encosta, só me tragam comida!"),
    ("NEGATIVE", "Hoje eu acordei me sentindo tão feia... me dá um doce pra eu melhorar a autoestima?"),
    ("NEGATIVE", "Minha coluna tá doendo, tô de mau humor e preciso de comida pra me acalmar. É pedir muito?"),
    ("NEGATIVE", "Tô super irritada hoje. Será TPM? Só um pote de sachê e um docinho pra resolver isso."),
]

# Limpar as antigas (opcional, vamos apenas garantir as novas por enquanto)
for p in ScriptedPhrase.objects.filter(context_trigger__isnull=True):
    p.delete()

for ctx, text in phrases:
    ScriptedPhrase.objects.update_or_create(
        phrase_text=text,
        defaults={"context_trigger": ctx}
    )

print(f"{len(phrases)} frases reativas (HUNGRY, LOW_ENERGY, BORED, NEGATIVE) criadas no banco!")
