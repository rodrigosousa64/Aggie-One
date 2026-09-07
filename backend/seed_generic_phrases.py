import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from pet_core.models import ScriptedPhrase

phrases = [
    # ACTION_PET (Mais de 20 frases novas misturando gato normal e lore)
    ("Prrr... prrrrr... ron ron...", "ACTION_PET"),
    ("*Esfrega a cabeça na sua mão e fecha os olhos*", "ACTION_PET"),
    ("Miau? Ah, é você. Pode continuar.", "ACTION_PET"),
    ("Prrr... Acha que um carinho vai me comprar? (Talvez vá)", "ACTION_PET"),
    ("Miau! Mais para a esquerda, por favor.", "ACTION_PET"),
    ("*Amassa pãozinho no ar de tanta felicidade*", "ACTION_PET"),
    ("Se parar de fazer carinho, eu mordo.", "ACTION_PET"),
    ("Ron ron ron... Tá, eu deixo você me venerar um pouquinho.", "ACTION_PET"),
    ("Isso, humanos foram feitos para servir felinos. Prrr...", "ACTION_PET"),
    ("Acho bom você não estar com as mãos sujas de coxinha.", "ACTION_PET"),
    ("Prrr... Nada como um carinho depois de um longo dia não fazendo nada.", "ACTION_PET"),
    ("Miau... Aproveita que eu tô boazinha hoje.", "ACTION_PET"),
    ("Ron ron ron... Seu carinho é quase tão bom quanto um petisco.", "ACTION_PET"),
    ("Isso, tira um pouco da tensão dos meus ombros. Vida de gata cansa.", "ACTION_PET"),
    ("Prrr... Você leva jeito pra isso. Quase um profissional.", "ACTION_PET"),
    ("Não pensa que eu sou fácil. É que você achou o ponto certo. Prrr...", "ACTION_PET"),
    ("Miau! E a comida, não vem com o carinho não?", "ACTION_PET"),
    ("Ron ron... O melhor momento do dia. Tirando a hora de comer, claro.", "ACTION_PET"),
    ("Prrr... Continua, eu finjo que não tô adorando.", "ACTION_PET"),
    ("*Ronrona tão alto que parece um motorzinho*", "ACTION_PET"),
    
    # HUNGRY (Fome Passiva - Gato Normal e Lore)
    ("Miau! Alguém esqueceu que eu existo e preciso comer?", "HUNGRY"),
    ("Tô tão fraca que mal consigo miar... MIAAAU!", "HUNGRY"),
    ("Se eu morrer de inanição, meu fantasma vai derrubar seus copos de água.", "HUNGRY"),
    ("Miauuuu... Meu prato tem um espaço vazio bem no meio. Isso é inaceitável.", "HUNGRY"),
    ("Alô? Tem uma gata definhando aqui!", "HUNGRY"),
    ("A ração não vai pular sozinha pro pote, sabia?", "HUNGRY"),
    ("Miau! Eu vi você abrindo a geladeira e não me dando nada!", "HUNGRY"),
    ("Tô com tanta fome que até pensaria em comer um vegetal. (Mentira)", "HUNGRY"),
    ("Miauuu... Achei que a gente dividisse a comida nessa casa.", "HUNGRY"),
    ("Meu estômago tá roncando mais alto que a sua moto.", "HUNGRY"),
    ("Tô no puro suco da desnutrição felina. Um sachê salva uma vida.", "HUNGRY"),
    ("Eu não queria ser dramática, mas eu não como há pelo menos... 2 horas!", "HUNGRY"),
    ("Miau! A tigela vazia é um desrespeito à minha majestade.", "HUNGRY"),
    ("Se você pedir lanche agora e não me der nada, eu surto.", "HUNGRY"),
    ("Socorro! Onde está a Assistência Social dos Felinos?!", "HUNGRY"),

    # ACTION_EAT (Ao receber comida)
    ("Nhac nhac nhac... Finalmente lembraram de mim!", "ACTION_EAT"),
    ("Croc croc... Estava na hora, humano.", "ACTION_EAT"),
    ("Comendo agora, mas ainda guardo rancor pela demora.", "ACTION_EAT"),
    ("Hummm... Seria melhor um sachê, mas isso aqui serve.", "ACTION_EAT"),
    ("*Comendo desesperadamente como se não houvesse amanhã*", "ACTION_EAT"),
    ("Croc croc croc... Silêncio que eu tô degustando.", "ACTION_EAT"),
    ("A comida desce bem, mas já tô pensando na sobremesa.", "ACTION_EAT"),
    ("Nhac nhac... A ração tá no ponto hoje. Parabéns ao chef (fábrica).", "ACTION_EAT"),
    ("Comida! Tudo foi perdoado. (Pelo menos pelos próximos 10 minutos)", "ACTION_EAT"),
    ("Humm... Pode ir preparando a próxima dose daqui a pouco.", "ACTION_EAT"),
]

for phrase_text, context in phrases:
    ScriptedPhrase.objects.get_or_create(
        phrase_text=phrase_text,
        defaults={"context_trigger": context}
    )

print(f"Inseridas {len(phrases)} novas frases genéricas/lore.")
