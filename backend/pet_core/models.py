from django.db import models

class PetState(models.Model):
    mood = models.CharField(max_length=50, default="feliz", help_text="feliz, brava, com fome, dormindo")
    energy = models.IntegerField(default=100)
    back_pain_level = models.IntegerField(default=0, help_text="0 a 100 de dor na coluna")
    last_interaction = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Aggie (Humor: {self.mood} | Energia: {self.energy})"

class PersonaTrait(models.Model):
    trait_name = models.CharField(max_length=100, help_text="Ex: Estudante de Direito")
    description = models.TextField(help_text="Instrução para a IA. Ex: 'Você estuda Direito, então use termos jurídicos às vezes.'")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.trait_name

class ScriptedPhrase(models.Model):
    phrase_text = models.CharField(max_length=255)
    context_trigger = models.CharField(max_length=50, blank=True, null=True, help_text="Em qual momento usar (opcional)")
    
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
