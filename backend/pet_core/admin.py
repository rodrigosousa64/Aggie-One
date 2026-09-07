from django.contrib import admin
from .models import PetState, PersonaTrait, ScriptedPhrase, MemoryContext, ThoughtRule

@admin.register(PetState)
class PetStateAdmin(admin.ModelAdmin):
    list_display = ('mood', 'energy', 'back_pain_level', 'last_interaction')

@admin.register(PersonaTrait)
class PersonaTraitAdmin(admin.ModelAdmin):
    list_display = ("trait_name", "is_active", "short_description")
    list_filter = ("is_active",)
    search_fields = ("trait_name", "description")
    list_editable = ("is_active",)

    @admin.display(description="Instrução (contexto da IA)")
    def short_description(self, obj):
        text = (obj.description or "").strip()
        if len(text) <= 80:
            return text
        return f"{text[:77]}..."

@admin.register(ScriptedPhrase)
class ScriptedPhraseAdmin(admin.ModelAdmin):
    list_display = ('phrase_text', 'context_trigger')
    search_fields = ('phrase_text',)

@admin.register(MemoryContext)
class MemoryContextAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'user_message', 'aggie_response')
    readonly_fields = ('timestamp',)

@admin.register(ThoughtRule)
class ThoughtRuleAdmin(admin.ModelAdmin):
    list_display = ('rule_name', 'priority', 'context_trigger', 'condition_field', 'condition_operator', 'condition_value', 'activation_chance', 'is_active')
    list_editable = ('priority', 'is_active', 'activation_chance')
    list_filter = ('is_active', 'context_trigger', 'condition_field')
    search_fields = ('rule_name',)
