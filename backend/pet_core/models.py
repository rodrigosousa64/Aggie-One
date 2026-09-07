from django.db import models

class PetState(models.Model):
    mood = models.CharField(max_length=50, default="feliz", help_text="feliz, brava, com fome, dormindo")
    energy = models.IntegerField(default=100)
    hunger = models.IntegerField(default=80)
    boredom = models.IntegerField(default=30)
    affection = models.IntegerField(default=70)
    anger = models.IntegerField(default=0)
    back_pain_level = models.IntegerField(default=0, help_text="0 a 100 de dor na coluna")
    active_accessory = models.CharField(max_length=50, null=True, blank=True, help_text="ID do acessório equipado (ex: DETECTIVE_HAT)")
    last_interaction = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Aggie (Humor: {self.mood} | Energia: {self.energy})"

class PersonaTrait(models.Model):
    trait_name = models.CharField(
        max_length=100,
        help_text="Rótulo curto (ex: Dona, Humor, Comida). Aparece no prompt da IA.",
    )
    description = models.TextField(
        help_text="Instrução completa enviada à IA em TODA mensagem. Escreva como regra de personagem.",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Só traits ativos entram no contexto do chat.",
    )

    class Meta:
        verbose_name = "Persona Trait (contexto da IA)"
        verbose_name_plural = "Persona Traits (contexto da IA)"
        ordering = ["id"]

    def __str__(self):
        return self.trait_name

CONTEXT_CHOICES = [
    ("HUNGRY", "Fome (HUNGRY)"),
    ("LOW_ENERGY", "Cansaço / Sono (LOW_ENERGY)"),
    ("BORED", "Tédio (BORED)"),
    ("NEGATIVE", "Dor/TPM/Triste (NEGATIVE)"),
    ("RANDOM", "Aleatório / Lore (RANDOM)"),
    ("ACTION_PET", "Ao receber carinho (ACTION_PET)"),
    ("ACTION_EAT", "Ao ser alimentada (ACTION_EAT)"),
    ("ACTION_WAKE", "Ao acordar (ACTION_WAKE)"),
    ("ACTION_SLEEP", "Ao ir dormir (ACTION_SLEEP)"),
    ("ACTION_ZOOMIES", "Ao entrar em modo turbo (ACTION_ZOOMIES)"),
    ("TAB_RETURN", "Ao voltar para a aba do navegador (TAB_RETURN)"),
]

class ScriptedPhrase(models.Model):
    phrase_text = models.CharField(max_length=255)
    context_trigger = models.CharField(max_length=50, blank=True, null=True, choices=CONTEXT_CHOICES, help_text="Em qual momento usar (opcional)")
    
    def __str__(self):
        return self.phrase_text

class MemoryContext(models.Model):
    user_message = models.TextField()
    aggie_response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"Interação em {self.timestamp.strftime('%d/%m %H:%M')}"

class ThoughtRule(models.Model):
    rule_name = models.CharField(max_length=100, help_text="Nome da regra (ex: Fome Crítica)")
    context_trigger = models.CharField(max_length=50, choices=CONTEXT_CHOICES, help_text="Qual contexto essa regra ativa?")
    
    condition_field = models.CharField(max_length=50, choices=[
        ('hunger', 'Fome'), 
        ('energy', 'Energia'), 
        ('boredom', 'Tédio'), 
        ('anger', 'Raiva'), 
        ('back_pain_level', 'Dor na Coluna'), 
        ('mood', 'Humor')
    ])
    condition_operator = models.CharField(max_length=5, choices=[
        ('<', 'Menor que (<)'), 
        ('>', 'Maior que (>)'), 
        ('==', 'Igual a (==)'),
        ('in', 'Contém na lista separada por vírgula (in)')
    ])
    condition_value = models.CharField(max_length=100, help_text="Valor para comparar (ex: 40, ou 'brava,triste' se usar 'in')")
    
    priority = models.IntegerField(default=10, help_text="Prioridade da regra. Maior = avaliada primeiro.")
    activation_chance = models.FloatField(default=1.0, help_text="Chance de 0.0 a 1.0 de ativar caso a condição seja verdadeira.")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Regra de Pensamento (Thought Rule)"
        verbose_name_plural = "Regras de Pensamento (Thought Rules)"
        ordering = ['-priority']

    def __str__(self):
        return f"[{self.priority}] {self.rule_name} -> {self.context_trigger} ({self.activation_chance*100}%)"
