import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pet_core.models import ScriptedPhrase

def run():
    phrases = [
        "A poeira no chão tá mais interessante que a minha vida agora.",
        "Se o tédio matasse, eu já teria perdido minhas 7 vidas hoje.",
        "Já brinquei com minha cauda três vezes. Ela venceu duas. Preciso de novidades.",
        "Sério que a Agatha vai me deixar mofando aqui nesse tapete?",
        "Tô quase batendo na tela do computador só pra ver se alguém me nota.",
        "Acho que vou derrubar um copo de água só pra ter um pouco de entretenimento...",
        "Nem pra passar um inseto voador pra eu caçar, que chatice!"
    ]
    
    count = 0
    for p in phrases:
        obj, created = ScriptedPhrase.objects.get_or_create(
            phrase_text=p,
            context_trigger="BORED"
        )
        if created:
            count += 1
            
    print(f"Adicionadas {count} frases de tédio extremas!")

if __name__ == '__main__':
    run()
