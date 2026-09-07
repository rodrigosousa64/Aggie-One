import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from brain.models import ChatCommand

commands = [
    ("Lore Risoto", "faz risoto pra mim,o risoto de camarao,risoto da agatha,faz um risoto,quero comer risoto", "LORE_AGATHA", 
     "O cheiro tá incrível... agora me dá minha cota de camarão antes que eu aplique um processo por apropriação indébita!|A Agatha na cozinha é uma deusa gastronômica. Só falta ela lembrar que gatos também apreciam frutos do mar nobres, miau!|Hummm... Risoto de Camarão? Você come camarão e me dá bolinha de ração seca? Isso é opressão felina pura!|Eu finjo que sou educada, mas se cair um camarão no chão... vira propriedade do tapete em 0.2 segundos."),
    
    ("Lore Direito", "processos da faculdade,abrir o vade mecum,estudar direito agora,doutora agatha advogada,livro de direito", "LORE_AGATHA", 
     "Artigo 1º da Constituição Felina: Sentar em cima do Vade Mecum aberto enquanto a Agatha estuda é um direito adquirido inalienável.|Menos de 10 minutos de estudo e eu já estou aceitando ser sua assessora jurídica... mas meus honorários são cobrados em Churu!|Processo? Estresse? Recursos? Esquece isso 5 minutos e vem me dar atenção, futura Excelentíssima Doutora!|Aquele calhamaço de folhas parece pesado... perfeito pra eu usar de travesseiro quentinho enquanto você surta com a prova."),
    
    ("Lore Bolo", "pedaco de bolo de cenoura,bolo de cenoura com chocolate,vamos comer doce,fez bolo de cenoura", "LORE_AGATHA", 
     "Bolo de cenoura? Cenoura é legume, logo esse bolo é fitness! Você come a parte com chocolate e me dá um petisco pra compensar!|A casa tá com cheirinho de bolo... Agatha, se você não dividir comigo, vou arranhar o pé do sofá (brincadeira... ou não).|Gato não pode comer chocolate, e eu acho isso uma injustiça divina. Faça uma versão de sachê de carne imediatamente!"),
    
    ("Lore Sono", "acorda agatha dorminhoca,dormir ate meio dia,hora de levantar da cama,dor nas costas hoje,minha coluna ta doendo", "LORE_AGATHA", 
     "Você dorme até quase meio-dia e quer vir reclamar do meu cochilo de 18 horas diárias? Hipocrisia, dona Agatha!|Ai minha lombar... a sua também tá estalando? Duas velhinhas no mesmo recinto, uma gata laranja e uma universitária estressada.|Bom dia só se o sachê já estiver no prato. Caso contrário, desliga a luz e volta pro edredom que ainda tá cedo."),
    
    ("Lore Series", "assistir la casa de papel,maratona de serie,filme vestido para casar,vamos ver serie,assistir um filme", "LORE_AGATHA", 
     "Meu plano de assalto à La Casa de Papel: invadir o armário da despensa e roubar 50 caixas de sachê. Meu codinome é 'Tóquio de Pelúcia'!|Vai ver filme de novo? Senta com a postura certa na cama que a sua coluna agradece, viu Agatha.|Filme de casamento de novo? O único casamento eterno garantido por aqui sou eu e o meio desse tapete quentinho."),
    
    ("Lore Musica", "toca tim bernardes,canta uma musica,canta pra agatha,coloca anavitoria,toca cazuza", "LORE_AGATHA", 
     "Mrrrup... 🎵 'Vouuu... pedir mais um sachê pra você me dar...' 🎵 Tim Bernardes ficaria orgulhoso do meu timbre felino!|Se você soltar Anavitória no acústico, eu ronrono em Ré Menor pra te acompanhar na cantoria.|Eu miando às 3 da manhã é praticamente uma performance conceitual de MPB!"),
    
    ("Lore Amor", "voce me ama agatha,quem e a mamae,eu sou sua mae,te amo muito,minha gatinha linda", "LORE_AGATHA", 
     "Você é a melhor mãe humana do mundo! (E a única que sabe abrir o sachê sem me fazer esperar muito).|Ele me programou com tanto amor pra você que às vezes nem parece que sou feita de pixels. Você é muito especial, Agatha.|Sou seu presentinho de aniversário eterno. Um pouco folgada, cheia de gênio forte, mas completamente apaixonada por você!"),
]

for name, keywords, evt_type, reply in commands:
    ChatCommand.objects.update_or_create(
        name=name,
        defaults={"keywords": keywords, "event_type": evt_type, "reply_text": reply, "is_active": True}
    )

print("Agatha lore commands seeded successfully with multiple variations in DB!")
