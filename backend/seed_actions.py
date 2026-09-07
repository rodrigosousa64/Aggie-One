import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from pet_core.models import ScriptedPhrase

phrases = [
    # ACTION_PET
    ("Prrr... Isso. Descansa essa mão pesada de Jiu-Jitsu em mim.", "ACTION_PET"),
    ("Muito bom. Agora volta a estudar Direito, que eu não quero dona pobre!", "ACTION_PET"),
    ("Ahhh... Nada como o carinho de quem trabalha meio período e tem o resto do dia pra mim.", "ACTION_PET"),
    ("Pode continuar o carinho... mas sem cantar as suas músicas, por favor.", "ACTION_PET"),
    
    # ACTION_EAT
    ("A Agatha cozinha tão bem, mas vou me contentar com essa ração enquanto o almoço não sai.", "ACTION_EAT"),
    ("Vou fingir que isso aqui é um daqueles lanches de madrugada pra ver se desce melhor.", "ACTION_EAT"),
    ("Pode dar comida, eu não fico reclamando que tô gorda na frente do espelho que nem você!", "ACTION_EAT"),
    ("Hummm... só aceito porque você promete pedir pizza depois.", "ACTION_EAT"),
    
    # ACTION_WAKE
    ("Já é de tarde? O almoço de milhões já tá na mesa?", "ACTION_WAKE"),
    ("Acordei! Pronta para mais um dia sendo a dona da casa enquanto você trabalha.", "ACTION_WAKE"),
    ("Despertei! Bota uma música da nossa playlist aí pra gente animar o dia.", "ACTION_WAKE"),
    ("Bom dia... ou boa tarde, já que nós duas só acordamos tarde.", "ACTION_WAKE"),
    
    # ACTION_SLEEP
    ("Minha bateria social acabou. Boa noite.", "ACTION_SLEEP"),
    ("Indo dormir tarde igualzinha à minha dona morena maravilhosa.", "ACTION_SLEEP"),
    ("Deitando aqui... Acorda a gente só amanhã à tarde, por favor.", "ACTION_SLEEP"),
    ("Vou apagar. Se for pedir lanche na madrugada, faz o favor de me chamar.", "ACTION_SLEEP"),
    
    # ACTION_ZOOMIES
    ("VOU TREINAR JIU-JITSU COM OS INSETOS DA CASA!", "ACTION_ZOOMIES"),
    ("VROOM! TÔ MAIS RÁPIDA QUE A SUA MOTO!", "ACTION_ZOOMIES"),
    ("MODO CROSSFIT ATIVADO! TÔ QUEIMANDO A PIZZA DE ONTEM!", "ACTION_ZOOMIES"),
    ("O CÓDIGO PENAL NÃO PROÍBE CORRER PELA CASA! MIAU!", "ACTION_ZOOMIES")
]

for phrase_text, context in phrases:
    ScriptedPhrase.objects.get_or_create(
        phrase_text=phrase_text,
        defaults={"context_trigger": context}
    )

print(f"Inseridas {len(phrases)} novas frases de ação.")
