from django.contrib import admin
from .models import PetState, PersonaTrait, ScriptedPhrase, MemoryContext

@admin.register(PetState)
class PetStateAdmin(admin.ModelAdmin):
    list_display = ('mood', 'energy', 'back_pain_level', 'last_interaction')

@admin.register(PersonaTrait)
class PersonaTraitAdmin(admin.ModelAdmin):
    list_display = ('trait_name', 'is_active')
    list_filter = ('is_active',)

@admin.register(ScriptedPhrase)
class ScriptedPhraseAdmin(admin.ModelAdmin):
    list_display = ('phrase_text', 'context_trigger')
    search_fields = ('phrase_text',)

@admin.register(MemoryContext)
class MemoryContextAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'user_message', 'aggie_response')
    readonly_fields = ('timestamp',)
