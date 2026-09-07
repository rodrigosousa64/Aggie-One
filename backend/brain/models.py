from django.db import models

ACTION_CHOICES = [
    ("WALK", "Andar (WALK)"),
    ("RUN", "Correr (RUN)"),
    ("IDLE", "Parada (IDLE)"),
    ("SIT_LOAF", "Deitar pãozinho (SIT_LOAF)"),
    ("GROOM", "Lamber-se (GROOM)"),
    ("SIT", "Sentar (SIT)"),
    ("JUMP", "Pular (JUMP)"),
    ("TAIL_CHASE", "Perseguir o rabo (TAIL_CHASE)"),
    ("ZOOMIES", "Zoomies (Corrida Maluca)"),
    ("HUNTING", "Caçando (HUNTING)"),
    ("WAKE_UP", "Acordar (WAKE_UP)"),
    ("AMBUSH", "Emboscada (AMBUSH)"),
    ("BUG_CATCH", "Caçar Inseto (BUG_CATCH)"),
    ("YAWN", "Bocejar (YAWN)"),
    ("SCRATCH", "Coçar a Orelha (SCRATCH)"),
    ("FOME", "Reclamação de Fome (FOME)"),
]

EVENT_CHOICES = [
    ("MATRIX", "Matrix (Hack)"),
    ("DETECTIVE", "Detetive (Investigar)"),
    ("BIRTHDAY", "Festa de Aniversário"),
    ("STARTLE", "Susto (!)"),
    ("FEED", "Alimentar (Comida/Sachê)"),
    ("LORE_CREATOR", "Lore: Criador"),
    ("LORE_AGATHA", "Lore: Agatha"),
    ("LORE_RISOTO", "Lore: Risoto de Camarão"),
    ("LORE_DIREITO", "Lore: Direito / Vade Mecum"),
    ("LORE_BOLO", "Lore: Bolo de Cenoura"),
    ("LORE_SONO", "Lore: Sono / Coluna"),
    ("LORE_SERIES", "Lore: Séries / Filmes"),
    ("LORE_MUSICA", "Lore: Música / Cantoria"),
    ("LORE_AMOR", "Lore: Amor / Presente"),
    ("CLOTHING_PARTY_HAT", "Roupa: Chapéu de Festa"),
    ("CLOTHING_BOWTIE", "Roupa: Gravata Borboleta"),
    ("CLOTHING_COLLAR", "Roupa: Colar"),
    ("CLOTHING_SUNGLASSES", "Roupa: Óculos de Sol"),
    ("CLOTHING_SCARF", "Roupa: Cachecol"),
    ("CLOTHING_NONE", "Roupa: Remover Acessório"),
]

SETTING_CHOICES = [
    ("GROOM_STOP_CHANCE", "Chance de parar de lamber (GROOM)"),
    ("SIT_STOP_CHANCE", "Chance de levantar (SIT)"),
    ("STATE_CHANGE_CHANCE", "Impaciência: Mudar estado (IDLE/WALK)"),
    ("WANDER_INTERVAL_MS", "Intervalo de pensamento (Wander AI em ms)"),
    ("RUN_MOVE_TIME_MS", "Tempo correndo na ação RUN (ms)"),
    ("WALK_MOVE_TIME_MS", "Tempo andando na ação WALK (ms)"),
    ("BOREDOM_HYPER_THRESHOLD", "Limite de Tédio p/ Hiperatividade (0-100)"),
    ("BOREDOM_STATE_CHANGE", "Impaciência Alta (quando entediada)"),
]

class ActionProbability(models.Model):
    action_name = models.CharField(max_length=50, unique=True, choices=ACTION_CHOICES, help_text="Nome da ação no frontend")
    weight = models.FloatField(default=1.0, help_text="Peso da probabilidade (quanto maior, mais frequente)")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.action_name} (Peso: {self.weight})"

    class Meta:
        verbose_name = "Action Probability"
        verbose_name_plural = "Action Probabilities"
        ordering = ['-weight']

class AggiePhrase(models.Model):
    category = models.CharField(max_length=50, choices=ACTION_CHOICES, help_text="Categoria/Ação onde a frase pode ser dita (ex: TAIL_CHASE)")
    text = models.CharField(max_length=255, help_text="A frase que a gata vai falar")
    weight = models.FloatField(default=10.0, help_text="Chances de escolher esta frase (se houver mais de uma na categoria)")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"[{self.category}] {self.text[:30]}"

    class Meta:
        verbose_name = "Aggie Phrase"
        verbose_name_plural = "Aggie Phrases"
        ordering = ['category', '-weight']

class BrainSetting(models.Model):
    key = models.CharField(max_length=50, unique=True, choices=SETTING_CHOICES, help_text="Chave da configuração de Pacing")
    value = models.FloatField(default=0.5, help_text="Valor numérico (ex: 0.6 para 60%)")
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.key}: {self.value}"

    class Meta:
        verbose_name = "Brain Setting (Pacing)"
        verbose_name_plural = "Brain Settings (Pacing)"
        ordering = ['key']

class ChatCommand(models.Model):
    name = models.CharField(max_length=50, unique=True, help_text="Nome do evento (ex: Evento Matrix)")
    keywords = models.CharField(max_length=255, help_text="Palavras-chave separadas por vírgula (ex: matrix,hack,frio)")
    event_type = models.CharField(max_length=50, choices=EVENT_CHOICES, help_text="Tipo de evento a disparar")
    reply_text = models.CharField(max_length=255, blank=True, help_text="Frase opcional para a gata falar quando disparar")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Chat Command (Event)"
        verbose_name_plural = "Chat Commands (Events)"
        ordering = ['name']
